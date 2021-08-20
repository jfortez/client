import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import RucInput from "../layouts/ventaComponents/rucInput";
import CodInput from "../layouts/ventaComponents/CodInput";
import CantidadInput from "../layouts/ventaComponents/CantidadInput";
import VentaDetalle from "../layouts/ventaComponents/VentaDetalle";
import valuesServices from "../../services/values";
import ventaValues from "../../services/venta";
import productoServices from "../../services/productos";
import cajaServices from "../../services/caja";
//Importes para faturación
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import empresaServices from "../../services/empresa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import notificacion from "../../utils/Notificaciones";
import swal from "sweetalert";

const VentasView = () => {
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
    values,
    setValues,
  } = useValues();
  const limpiar = () => {
    setTypes({ ...types, ruc: "", cod_producto: "", cantidad: 1, importe: 0 });
    setDatosVentas({ cliente: [], producto: [] });
    setProductosVenta([]);
    setDetalleVenta([]);
  };
  const [empresa, setEmpresa] = useState([]);
  useEffect(() => {
    const getEmpresa = async () => {
      const compañia = await empresaServices.optionEmpresa();
      setEmpresa(compañia);
    };
    getEmpresa();
  }, []);
  const fecha = new Date();
  const nuevaVenta = async () => {
    if (!datosVentas.cliente.length > 0) {
      return notificacion("Nueva Venta", "Debe Ingresar un Cliente para continuar", "danger");
    }
    if (!detalleVenta.length > 0) {
      return notificacion("Nueva Venta", "Debe Ingresar al menos un producto", "danger");
    }
    if (types.importe === 0) {
      return notificacion("Nueva Venta", "Debe Ingresar un Importe para continuar", "danger");
    }
    const totCantidad = detalleVenta.reduce((acc, acv) => {
      return acc + acv.cantidad;
    }, 0);
    const valorTotal = detalleVenta.reduce((acc, acv) => {
      return acc + Number(acv.total);
    }, 0);
    const venta = {
      num_venta: values.num_venta,
      num_recibo: values.num_recibo,
      fecha,
      cantidad: totCantidad,
      subtotal: valorTotal,
      total: Number(valorTotal).toFixed(2),
      importe: types.importe,
      devolucion: (Number(types.importe) - valorTotal).toFixed(2),
      id_Cliente: datosVentas.cliente[0].id,
      id_Usuario: user.id,
    };
    if (venta) {
      const caja = await cajaServices.getCajaByMaxId();
      if (!caja.length > 0) {
        return notificacion("Nueva Venta", "No hay una caja activa", "danger");
      }
      if (caja[0]?.estado_caja === "CERRADO") {
        return notificacion("Nueva Venta", "Debe abrir una caja para proceder", "danger");
      }
      newVenta(caja, venta, venta.total, venta.num_recibo);
      swal("Venta generada satisfatoriamente", {
        icon: "success",
      });
      updateProducto();
      handleCreatePdf();
      setTypes({ ...types, ruc: "", cod_producto: "", cantidad: 1, importe: 0 });
      setDatosVentas({ cliente: [], producto: [] });
      setProductosVenta([]);
      setDetalleVenta([]);
      updateValues();
    }
  };
  const newVenta = async (caja, nVenta, totalVenta, recibo) => {
    const ventaId = await ventaValues.newVenta(nVenta);
    newDetalleVenta(ventaId);
    ingresoACaja(caja, ventaId, totalVenta, recibo);
  };
  const ingresoACaja = async (caja, ventaId, totalVenta, recibo) => {
    const ingreso = {
      id_caja: caja[0]?.id,
      ingreso: totalVenta,
      descripcion: `Venta Bajo Factura No.: ${recibo}`,
      caja_actual: parseFloat(Number(caja[0]?.caja_actual + Number(totalVenta)).toFixed(2)),
      id_Usuario: user.id,
      id_venta: ventaId,
    };
    await cajaServices.nuevoMovimiento(ingreso);
    await cajaServices.updateCaja({ caja_actual: ingreso.caja_actual }, ingreso.id_caja);
  };
  const updateValues = async () => {
    const newValue = { num_venta: values.num_venta + 1, num_recibo: values.num_recibo + 1 };
    await valuesServices.updateValues(newValue);
    setValues({ num_venta: values.num_venta + 1, num_recibo: values.num_recibo + 1 });
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
  const totalCuenta = detalleVenta.reduce((acc, acv) => {
    return acc + Number(acv.total);
  }, 0);
  var props = {
    outputType: "save",
    returnJsPDFDocObject: true,
    fileName: `Factura${values.num_recibo}${fecha.getDate()}${
      fecha.getMonth() + 1
    }${fecha.getFullYear()}`,
    orientationLandscape: false,
    logo: {
      src: "https://raw.githubusercontent.com/jfortez/vitasmile/main/logo.png",
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: empresa[0]?.nombre,
      address: `RUC: ${empresa[0]?.ruc}`,
      phone: `Dirección: ${empresa[0]?.direccion}`,
      email: `Telefono: ${empresa[0]?.telefono}`,
      email_1: "",
      website: "",
    },
    contact: {
      label: "Factura emitida a:",
      name: `${datosVentas.cliente[0]?.nombres} ${datosVentas.cliente[0]?.apellidos}`,
      phone: `Dirección: ${datosVentas.cliente[0]?.direccion}`,
      address: `RUC: ${datosVentas.cliente[0]?.ruc}`,
      otherInfo: `Telefono: ${datosVentas.cliente[0]?.telefono}`,
      email: `Correo: ${datosVentas.cliente[0]?.email}`,
    },
    invoice: {
      label: "Factura #: ",
      num: values?.num_recibo,
      invDate: `Fecha Emisión: ${fecha.toLocaleString()}`,
      invGenDate: "",
      headerBorder: false,
      tableBodyBorder: false,
      header: ["#", "COD", "Producto", "Cantidad", "Precio", "Total"],
      table: detalleVenta.map((item, index) => [
        index + 1,
        item.cod_producto,
        item.nombre,
        item.cantidad,
        Number(item.precio).toFixed(2),
        Number(item.total).toFixed(2),
      ]),
      invTotalLabel: "Total:",
      invTotal: `$${Number(totalCuenta).toFixed(2)}`,
      // invCurrency: "ALL",
      // row1: {
      //   col1: "VAT:",
      //   col2: "20",
      //   col3: "%",
      //   style: {
      //     fontSize: 10, //optional, default 12
      //   },
      // },
      // row2: {
      //   col1: "SubTotal:",
      //   col2: "116,199.90",
      //   col3: "ALL",
      //   style: {
      //     fontSize: 10, //optional, default 12
      //   },
      // },
      // invDescLabel: "Invoice Note",
      // invDesc:
      // "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    // footer: {
    //   text: "The invoice is created on a computer and is valid without the signature and stamp.",
    // },
    pageEnable: true,
    pageLabel: "Page ",
  };
  const handleCreatePdf = () => {
    jsPDFInvoiceTemplate(props);
  };

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <nav className="menu-bar">
          <div className="group">
            <span className="item title">Ventas</span>
          </div>
          <div className="group">
            <Link to="/dashboard/ventas/caja" className="item link">
              Caja
            </Link>
            <Link to="/dashboard/reporteria/ventas" className="item link">
              Reporte Ventas
            </Link>
          </div>
        </nav>
        <p>
          <strong>Fecha:</strong> {fecha.toLocaleDateString()}
        </p>
        <p>
          <strong>Venta No: {values?.num_venta}</strong>
          <br />
          <strong>Factura No: {values?.num_recibo}</strong>
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
        <h4>Total Venta: {Number(totalCuenta).toFixed(2)}</h4>
        <div>
          <h4>Importe Cliente</h4>
          <label htmlFor="importe">Importe:</label>
          <input
            type="text"
            name="importe"
            id="importe"
            value={types.importe}
            onChange={(e) => setTypes({ ...types, importe: e.target.value })}
          />
        </div>
        <button onClick={nuevaVenta}>Venta</button>
      </div>
    </>
  );
};

export default VentasView;
