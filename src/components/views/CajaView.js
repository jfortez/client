import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import services from "../../services/caja";
const CajaView = () => {
  const { isCollapsed } = useValues();
  const [cajaActual, setCajaActual] = useState({ caja_inicio: "", cierre_caja: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isCierre, setIsCierre] = useState(false);
  // const [caja, setCaja] = useState([]);
  useEffect(() => {
    const verificarCaja = async () => {
      const ultimaCaja = await services.getCajaByMaxId();
      if (ultimaCaja[0].last_id === null || ultimaCaja[0].estado_caja === "CERRADO") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    // const getMovimientos = async () => {
    //   const movimientos = await services.getCajaMovimientos();
    //   setCaja(movimientos);
    // };
    // getMovimientos();
    verificarCaja();
  }, [isOpen]);
  const switchCierre = () => {
    setIsCierre(true);
  };
  const cerrarCaja = async () => {
    const test = {
      a: 2,
      b: "x",
      c: "yasd2",
    };
    const test2 = {
      a: 2,
      b: "x",
      c: "yasd2",
    };

    await services.createCaja({ test });
    await services.cierreCaja({ test2 });
  };
  const abrirCaja = async () => {
    await services.createCaja();
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Caja</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Caja</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h4>Ingresar Caja</h4>
          {isOpen ? (
            <div>
              <label htmlFor="caja_inicio">Caja Actual</label>
              <input
                type="text"
                value={cajaActual.caja_inicio}
                onChange={(e) => setCajaActual({ ...cajaActual, caja_inicio: e.target.value })}
              />
            </div>
          ) : (
            <h4>ya hay dinero en caja</h4>
          )}
        </div>
        <button onClick={switchCierre}>Cerrar Caja</button>
        {isCierre ? (
          <div>
            <label htmlFor="cierre">Cierre de Caja</label>
            <input
              type="text"
              value={cajaActual.cierre_caja}
              onChange={(e) => setCajaActual({ ...cajaActual, cierre_caja: e.target.value })}
            />
            <button onClick={cerrarCaja}>Cerrar Caja</button>
          </div>
        ) : (
          <h4>No desea cerrar caja</h4>
        )}
      </div>
    </>
  );
};

export default CajaView;
