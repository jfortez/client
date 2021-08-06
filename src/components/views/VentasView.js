import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import RucInput from "../layouts/ventaComponents.js/rucInput";
import CodInput from "../layouts/ventaComponents.js/CodInput";
import CantidadInput from "../layouts/ventaComponents.js/CantidadInput";
import VentaDetalle from "../layouts/ventaComponents.js/VentaDetalle";
import { useEffect, useState } from "react";
import valuesServices from "../../services/values";
import ventaValues from "../../services/venta";
const VentasView = () => {
  const [values, setValues] = useState([]);
  const {
    isCollapsed,
    setDatosVentas,
    types,
    setTypes,
    detalleVenta,
    setDetalleVenta,
    datosVentas,
    user,
  } = useValues();
  const limpiar = () => {
    setTypes({ ...types, ruc: "", cod_producto: "", cantidad: 1 });
    setDatosVentas({ cliente: [], producto: [] });
    setDetalleVenta([]);
  };
  useEffect(() => {
    const getValues = async () => {
      const numValues = await valuesServices.getValues();
      setValues(numValues[0]);
    };
    getValues();
  }, []);
  const fecha = new Date();
  const nuevaVenta = () => {
    const totCantidad = detalleVenta.reduce((acc, acv) => {
      return acc + acv.cantidad;
    }, 0);
    const valorTotal = detalleVenta.reduce((acc, acv) => {
      return acc + acv.total;
    }, 0);
    const venta = {
      num_venta: values.num_venta,
      fecha,
      cantidad: totCantidad,
      subtotal: valorTotal,
      total: valorTotal,
      id_Cliente: datosVentas.cliente[0].id,
      id_Usuario: user.id,
    };
    console.log(venta);
    if (venta) {
      newVenta(venta);
      setTypes({ ...types, ruc: "", cod_producto: "", cantidad: 1 });
      setDatosVentas({ cliente: [], producto: [] });
      setDetalleVenta([]);
      updateValues();
    }
  };
  const updateValues = async () => {
    const newValue = { num_venta: values.num_venta + 1 };
    await valuesServices.updateValues(newValue);
    setValues({ ...values, num_venta: values.num_venta + 1 });
  };
  const newVenta = async (nuevaVenta) => {
    const nuevo = await ventaValues.newVenta(nuevaVenta);
    console.log(nuevo);
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Ventas</h1>
        <p>
          <strong>Fecha:</strong> {fecha.toLocaleDateString()}
        </p>
        <p>
          <strong>Venta No: {values.num_venta}</strong>
        </p>
        <button onClick={limpiar}>Limpiar</button>
        <RucInput />
        <CodInput />
        <CantidadInput />
        <VentaDetalle />
        <button onClick={nuevaVenta}>Venta</button>
      </div>
    </>
  );
};

export default VentasView;
