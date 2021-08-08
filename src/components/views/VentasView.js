import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import RucInput from "../layouts/ventaComponents/rucInput";
import CodInput from "../layouts/ventaComponents/CodInput";
import CantidadInput from "../layouts/ventaComponents/CantidadInput";
import VentaDetalle from "../layouts/ventaComponents/VentaDetalle";
import { useEffect, useState } from "react";
import valuesServices from "../../services/values";
import ventaValues from "../../services/venta";
import productoServices from "../../services/productos";
import NavigationVentas from "../layouts/ventaComponents/NavigationVentas";
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
    setProductosVenta,
    productosVenta,
  } = useValues();
  const limpiar = () => {
    setTypes({ ...types, ruc: "", cod_producto: "", cantidad: 1 });
    setDatosVentas({ cliente: [], producto: [] });
    setProductosVenta([]);
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
    if (venta) {
      newVenta(venta);
      //aquí iria la función que modificaría la cantidad del producto dejando la cantidad restante tras la venta realizada
      updateProducto();
      setTypes({ ...types, ruc: "", cod_producto: "", cantidad: 1 });
      setDatosVentas({ cliente: [], producto: [] });
      setProductosVenta([]);
      setDetalleVenta([]);
      updateValues();
    }
  };
  const updateValues = async () => {
    const newValue = { num_venta: values.num_venta + 1 };
    await valuesServices.updateValues(newValue);
    setValues({ ...values, num_venta: values.num_venta + 1 });
  };
  const newVenta = async (nVenta) => {
    const ventaId = await ventaValues.newVenta(nVenta);
    newDetalleVenta(ventaId);
  };
  const newDetalleVenta = async (ventaId) => {
    let ventaDetalle = [];
    for (let i = 0; i < detalleVenta.length; i++) {
      const { id, cantidad, precio, total } = detalleVenta[i];
      const id_Venta = ventaId;
      const id_Producto = id;
      const arr = [id_Venta, id_Producto, precio, cantidad, total];
      ventaDetalle.push(arr);
    }
    await ventaValues.newVentaDetalle({ ventaDetalle });
  };
  const updateProducto = async () => {
    let vDetalle = [];
    const productos = await productoServices.listProducts();
    for (const prd in productos) {
      let total;
      for (const dtv in detalleVenta) {
        if (productos[prd].id === detalleVenta[dtv].id) {
          total = productos[prd].cantidad - detalleVenta[dtv].cantidad;
          const { id } = productos[prd];
          const rs = [id, total];
          vDetalle.push(rs);
        }
      }
    }
    await productoServices.test({ vDetalle });
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <NavigationVentas />
        <h1>Ventas</h1>
        <p>
          <strong>Fecha:</strong> {fecha.toLocaleDateString()}
        </p>
        <p>
          <strong>Venta No: {values.num_venta}</strong>
        </p>
        <button onClick={limpiar}>Limpiar</button>
        <RucInput
          types={types}
          setTypes={setTypes}
          setDatosVentas={setDatosVentas}
          datosVentas={datosVentas}
        />
        <CodInput
          types={types}
          setTypes={setTypes}
          setDatosVentas={setDatosVentas}
          datosVentas={datosVentas}
        />
        <CantidadInput
          types={types}
          setTypes={setTypes}
          setDatosVentas={setDatosVentas}
          datosVentas={datosVentas}
          setProductosVenta={setProductosVenta}
          productosVenta={productosVenta}
        />
        <VentaDetalle
          productosVenta={productosVenta}
          detalleVenta={detalleVenta}
          setDetalleVenta={setDetalleVenta}
        />
        <button onClick={nuevaVenta}>Venta</button>
      </div>
    </>
  );
};

export default VentasView;
