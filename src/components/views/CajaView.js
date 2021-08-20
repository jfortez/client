import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import services from "../../services/caja";
import { Loader } from "../../elements/Loader";
import notificacion from "../../utils/Notificaciones";

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
  };
  const switchIngreso = () => {
    setIsIngreso(!isIngreso);
  };
  const switchEgreso = () => {
    setIsEgreso(!isEgreso);
  };
  const cerrarCaja = async () => {
    if (cajaActual.caja_cierre === "" || cajaActual.caja_cierre === "0") {
      return notificacion("Caja", "Debe ingresar al menos un valor y mayor a 0", "danger");
    }
    const cierre = {
      caja_cierre: cajaActual.caja_cierre,
    };
    await services.cierreCaja(cierre);
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
    notificacion("Caja", "Se ha Aperturado Caja satisfatoriamente", "success");
    limpiar();
    setIsListed(!isListed);
    setIsOpen(!isOpen);
  };
  const addIngreso = async () => {
    if (movimientos.ingreso === 0 || movimientos.descripcion_ingreso === "") {
      return console.log("debe ingresar un valor");
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
    setIsListed(!isListed);
    setIsIngreso(!isIngreso);
    setMovimientos({ ...movimientos, ingreso: 0, descripcion_ingreso: "" });
  };
  const addEgreso = async () => {
    const invalid = Number(movimientos.egreso).toFixed(2) > caja[0].caja_inicio;
    if (invalid) {
      return console.log(
        "el valor ingresado supera a la caja Actual, Caja Actual: ",
        caja[0].caja_inicio
      );
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
        <h1>Caja</h1>
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="navegacion__redirect">
                  Home
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
          ) : !isCierre ? (
            <button onClick={switchCierre}>Cerrar Caja</button>
          ) : null}
        </div>
        {/* Cerrar Caja */}
        {isCierre ? (
          <div>
            <label htmlFor="cierre">Cierre de Caja</label>
            <input
              type="text"
              value={cajaActual.caja_cierre}
              onChange={(e) => setCajaActual({ ...cajaActual, caja_cierre: e.target.value })}
            />
            <button onClick={cerrarCaja}>Cerrar Caja</button>
            <button onClick={switchCierre}>Cancelar</button>
          </div>
        ) : null}
        {/* Añadir Ingresos */}
        {isOpen ? null : (
          <div>
            <h4>Movimientos</h4>
            <button onClick={switchIngreso}>Añadir Ingresos</button>
            {isIngreso ? (
              <div>
                {/* Añadir Ingresos */}
                <label htmlFor="cierre">Añadir un Valor</label>
                <input
                  type="text"
                  value={movimientos.ingreso}
                  onChange={(e) => setMovimientos({ ...movimientos, ingreso: e.target.value })}
                />
                <label htmlFor="cierre">Descripción del Ingreso</label>
                <input
                  type="text"
                  value={movimientos.descripcion_ingreso}
                  onChange={(e) =>
                    setMovimientos({ ...movimientos, descripcion_ingreso: e.target.value })
                  }
                />
                <button onClick={addIngreso}>Ingresar</button>
              </div>
            ) : null}
            {/* Añadir Egresos */}
            <button onClick={switchEgreso}>Añadir Egresos</button>
            {isEgreso ? (
              <div>
                <label htmlFor="cierre">Añadir un Valor</label>
                <input
                  type="text"
                  value={movimientos.egreso}
                  onChange={(e) => setMovimientos({ ...movimientos, egreso: e.target.value })}
                />
                <label htmlFor="cierre">Descripción del Egreso</label>
                <input
                  type="text"
                  value={movimientos.descripcion_egreso}
                  onChange={(e) =>
                    setMovimientos({ ...movimientos, descripcion_egreso: e.target.value })
                  }
                />
                <button onClick={addEgreso}>Egresar</button>
              </div>
            ) : null}
          </div>
        )}
        <div>
          <h3>Movimientos en Caja</h3>
          {caja[0]?.estado_caja === "ABIERTO" ? (
            <>
              <strong>Valor Inicial a la Caja: </strong>${caja[0]?.caja_inicio}
            </>
          ) : null}
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
                      <td>{item.ingreso ? <b>ingreso</b> : <b>Egreso</b>}</td>
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
