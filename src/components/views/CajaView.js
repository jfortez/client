import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import services from "../../services/caja";
import { Loader } from "../../elements/Loader";
import notificacion from "../../utils/Notificaciones";
import { AttachMoney, MoneyOff, CancelPresentation } from "@material-ui/icons";
import swal from "sweetalert";

const CajaView = () => {
  const { isCollapsed, user } = useValues();
  const [caja, setCaja] = useState([]);
  const [cajaActual, setCajaActual] = useState({ caja_inicio: 0, caja_cierre: 0 });
  const [movimientos, setMovimientos] = useState({
    ingreso: 0,
    descripcion_ingreso: "",
    egreso: 0,
    descripcion_egreso: "",
  });
  const [cajaMovimientos, setCajaMovimientos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isListed, setIsListed] = useState(false);
  const [isCierre, setIsCierre] = useState(false);
  const [isIngreso, setIsIngreso] = useState(false);
  const [isEgreso, setIsEgreso] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;

    const getCajaActual = async () => {
      const ultimaCaja = await services.getCajaByMaxId();
      setCaja(ultimaCaja);
      try {
        const movimientos = await services.getCajaMovimientosByIdCaja(source, ultimaCaja[0]?.id);
        if (!unmounted) {
          setCajaMovimientos(movimientos);

          setIsLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          if (services.Axios.isCancel(error)) {
            console.log("AxiosCancel: caught cancel", error.message);
          } else {
            console.log("throw error", error.message);
          }
        }
      }
    };
    getCajaActual();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed]);
  useEffect(() => {
    const verificarCaja = async () => {
      const ultimaCaja = await services.getCajaByMaxId();
      if (!ultimaCaja.length > 0 || ultimaCaja[0]?.estado_caja === "CERRADO") {
        setIsOpen(true);
      }
    };
    verificarCaja();
  }, [isOpen]);
  const switchCierre = () => {
    setIsCierre(!isCierre);
    setCajaActual({ ...cajaActual, caja_cierre: 0 });
  };
  const switchIngreso = () => {
    if (isOpen) {
      //false default
      return notificacion("Error", "Debe Abrir una caja para proceder", "danger");
    }
    if (!isCierre) {
      setIsIngreso(!isIngreso);
    } else {
      setIsIngreso(isIngreso);
    }
    setMovimientos({ ...movimientos, ingreso: 0, descripcion_ingreso: "" });
  };
  const switchEgreso = () => {
    if (isOpen) {
      //false
      return notificacion("Error", "Debe Abrir una caja para proceder", "danger");
    }
    if (!isCierre) {
      setIsEgreso(!isEgreso);
    } else {
      setIsEgreso(isEgreso);
    }
    setMovimientos({ ...movimientos, egreso: 0, descripcion_egreso: "" });
  };
  const cerrarCaja = async () => {
    if (cajaActual.caja_cierre === "" || cajaActual.caja_cierre === 0) {
      return notificacion("Caja", "Debe ingresar al menos un valor y mayor a 0", "danger");
    }
    const cierre = {
      caja_cierre: cajaActual.caja_cierre,
    };
    await services.cierreCaja(cierre);
    const cierreCaja = {
      id_caja: caja[0].id,
      descripcion: "CIERRE DE CAJA",
      caja_actual: caja[0].caja_actual,
      id_Usuario: user.id,
    };
    await services.nuevoMovimiento(cierreCaja);
    swal("Se ha Cerrado al Caja con Exito", {
      icon: "success",
    });
    limpiar();
    setIsListed(!isListed);
    setIsCierre(!isCierre);
    setIsOpen(!isOpen);
    setIsIngreso(false);
    setIsEgreso(false);
  };
  const abrirCaja = async () => {
    if (cajaActual.caja_inicio === "") {
      return notificacion("Caja", "Debe ingresar al menos un valor y mayor a 0", "danger");
    }
    const nuevo = {
      caja_inicio: cajaActual.caja_inicio,
      caja_actual: cajaActual.caja_inicio,
      id_Usuario: user.id,
    };
    await services.createCaja(nuevo);
    const apertura = {
      id_caja: caja[0].id + 1,
      ingreso: cajaActual.caja_inicio,
      descripcion: "APERTURA DE CAJA",
      caja_actual: cajaActual.caja_inicio,
      id_Usuario: user.id,
    };
    await services.nuevoMovimiento(apertura);
    notificacion("Caja", "Se ha Aperturado Caja satisfatoriamente", "success");
    limpiar();
    setIsListed(!isListed);
    setIsOpen(!isOpen);
  };
  const addIngreso = async () => {
    if (movimientos.ingreso === 0) {
      return notificacion("Error", "Debe Ingresar un valor en los campos", "danger");
    }
    const ingreso = {
      id_caja: caja[0].id,
      ingreso: Number(movimientos.ingreso),
      descripcion: movimientos.descripcion_ingreso,
      caja_actual: parseFloat(Number(caja[0].caja_actual + Number(movimientos.ingreso)).toFixed(2)),
      id_Usuario: user.id,
    };
    await services.nuevoMovimiento(ingreso);
    await services.updateCaja({ caja_actual: ingreso.caja_actual }, ingreso.id_caja);
    swal("Se ha Ingresado un  valor a Caja Satisfatoriamente", {
      icon: "success",
    });
    setIsListed(!isListed);
    setIsIngreso(!isIngreso);
    setMovimientos({ ...movimientos, ingreso: 0, descripcion_ingreso: "" });
  };
  const addEgreso = async () => {
    if (movimientos.egreso === 0) {
      return notificacion("Error", "Debe Ingresar un valor en los campos", "danger");
    }
    const invalid = Number(movimientos.egreso).toFixed(2) > caja[0].caja_actual;
    if (invalid) {
      return notificacion("Error", `el valor ingresado supera a la caja Actual`, "danger");
    }
    const egreso = {
      id_caja: caja[0].id,
      egreso: Number(movimientos.egreso),
      descripcion: movimientos.descripcion_egreso,
      caja_actual: parseFloat(Number(caja[0].caja_actual - Number(movimientos.egreso)).toFixed(2)),
      id_Usuario: user.id,
    };
    await services.nuevoMovimiento(egreso);
    await services.updateCaja({ caja_actual: egreso.caja_actual }, egreso.id_caja);
    swal("Se ha Egreasdo un valor a Caja Satisfatoriamente", {
      icon: "success",
    });
    setIsListed(!isListed);
    setIsEgreso(!isEgreso);
    setMovimientos({ ...movimientos, egreso: 0, descripcion_egreso: "" });
  };
  const limpiar = () => {
    setCajaActual({ caja_inicio: "", caja_cierre: "" });
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="venta__manual">
          <div className="venta__btns">
            {!isEgreso ? (
              <button className="button crear crear_venta" onClick={switchIngreso}>
                <span className="button__icon">
                  <AttachMoney className="icon" />
                </span>
                <span className="button__text">Ingreso</span>
              </button>
            ) : null}
            {!isIngreso ? (
              <button className="button limpiar" onClick={switchEgreso}>
                <span className="button__icon">
                  <MoneyOff className="icon" />
                </span>
                <span className="button__text">Egreso</span>
              </button>
            ) : null}
          </div>
        </div>
        <h1>Caja</h1>
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="navegacion__redirect">
                  Inicio
                </Link>
              </li>
              <li> / </li>
              <li>
                <Link to="/dashboard/ventas" className="navegacion__redirect">
                  Ventas
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Caja</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          {caja[0]?.estado_caja === "ABIERTO" ? (
            <div>
              <h3>Saldo en Caja: ${caja[0]?.caja_actual}</h3>
            </div>
          ) : null}
          {/* Ingresar Caja */}
          {isOpen ? (
            <div className="caja__abrir">
              <div className="caja__ingresar">
                <h4 className="caja__title">Ingresar Caja</h4>
                <label htmlFor="caja_inicio" className="caja__input">
                  Caja Actual
                </label>
                <input
                  className="caja__input input"
                  type="text"
                  id="caja_inicio"
                  value={cajaActual.caja_inicio}
                  onChange={(e) => setCajaActual({ ...cajaActual, caja_inicio: e.target.value })}
                />
                <button onClick={abrirCaja} className="button crear abrir">
                  Ingresar Caja
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {isIngreso || isEgreso ? (
          <div className="caja__abrir">
            <div className="caja__ingresar">
              <h4 className="caja__title">{isIngreso ? "Ingresar Caja" : "Egresar Caja"}</h4>
              <label htmlFor="caja_movimiento" className="caja__input">
                {isIngreso ? "Ingresar Caja" : "Egresar Caja"}
              </label>
              <input
                className="caja__input input"
                type="text"
                id="caja_movimiento"
                value={isIngreso ? movimientos.ingreso : isEgreso ? movimientos.egreso : null}
                onChange={(e) =>
                  isIngreso
                    ? setMovimientos({ ...movimientos, ingreso: e.target.value })
                    : isEgreso
                    ? setMovimientos({ ...movimientos, egreso: e.target.value })
                    : null
                }
              />
              <label htmlFor="caja_inicio" className="caja__input">
                {isIngreso ? "Descripción o Motivo de Ingreso" : "Descripción o Motivo Egreso"}
              </label>
              <input
                className="caja__input input"
                type="text"
                id="caja_inicio"
                value={
                  isIngreso
                    ? movimientos.descripcion_ingreso
                    : isEgreso
                    ? movimientos.descripcion_egreso
                    : null
                }
                onChange={(e) =>
                  isIngreso
                    ? setMovimientos({ ...movimientos, descripcion_ingreso: e.target.value })
                    : isEgreso
                    ? setMovimientos({ ...movimientos, descripcion_egreso: e.target.value })
                    : null
                }
              />
              <div className="grp_bttn">
                <button
                  onClick={isIngreso ? switchIngreso : isEgreso ? switchEgreso : null}
                  className="button cancel abrir"
                >
                  Cancelar
                </button>
                <button
                  onClick={isIngreso ? addIngreso : isEgreso ? addEgreso : null}
                  className={`button ${isIngreso ? "crear" : "egresar"} abrir`}
                >
                  {isIngreso ? "Ingresar Caja" : "Egresar Caja"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {isCierre ? (
          <div className="caja__abrir">
            <div className="caja__ingresar">
              <h4 className="caja__title">Cierre de Caja</h4>
              <label htmlFor="caja_inicio" className="caja__input">
                ¿Cuanto dinero hay en Caja?
              </label>
              <input
                className="caja__input input"
                type="text"
                id="caja_inicio"
                value={cajaActual.caja_cierre}
                onChange={(e) => setCajaActual({ ...cajaActual, caja_cierre: e.target.value })}
              />
              <div className="grp_bttn">
                <button onClick={switchCierre} className="button cancel abrir">
                  Cancelar
                </button>
                <button onClick={cerrarCaja} className="button crear abrir">
                  Cerrar Caja
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {!isOpen && !isCierre ? (
          <button
            className="button close"
            style={{ display: isEgreso || isIngreso ? "none" : "" }}
            onClick={switchCierre}
          >
            <span className="button__icon">
              <CancelPresentation className="icon" />
            </span>
            <span className="button__text">Cerrar Caja</span>
          </button>
        ) : null}
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha y Hora del movimiento</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Descripción</th>
                <th>Caja Actual</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : caja[0]?.estado_caja === "ABIERTO" && cajaMovimientos ? (
                cajaMovimientos.map((item, index) => {
                  return (
                    <tr key={index} className="rowData">
                      <td>{index + 1}</td>
                      <td>{new Date(item.fechaMovimiento).toLocaleString()}</td>
                      <td>{item.ingreso ? <b>INGRESO</b> : <b>EGRESO</b>}</td>
                      <td>
                        {item.ingreso ? <span>${item.ingreso}</span> : <span>${item.egreso}</span>}
                      </td>
                      <td>{item.descripcion}</td>
                      <td>${item.caja_actual}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No se Observan Movimientos en Caja</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CajaView;
