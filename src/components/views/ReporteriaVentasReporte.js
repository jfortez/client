import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import "./DashboardView.css";
import ventaServices from "../../services/venta";
import { useEffect, useState } from "react";
import { Loader } from "../../elements/Loader";
import { Link, useParams } from "react-router-dom";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import empresaServices from "../../services/empresa";
import { Print } from "@material-ui/icons";

const ReporteriaVentasReporte = () => {
  const { isCollapsed } = useValues();
  const [reporteDetalleVentas, setReporteDetalleVentas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [empresa, setEmpresa] = useState([]);
  useEffect(() => {
    const getEmpresa = async () => {
      const compañia = await empresaServices.optionEmpresa();
      setEmpresa(compañia);
    };
    getEmpresa();
  }, []);
  useEffect(() => {
    let source = ventaServices.Axios.CancelToken.source();
    let unmounted = false;
    const getReporteDetalleVentas = async () => {
      try {
        const reporteDtVentas = await ventaServices.getReporteDetalleVentas(source, id);
        if (!unmounted) {
          setReporteDetalleVentas(reporteDtVentas);
          setIsLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          if (ventaServices.Axios.isCancel(error)) {
            console.log("AxiosCancel: caught cancel", error.message);
          } else {
            console.log("throw error", error.message);
          }
        }
      }
    };
    getReporteDetalleVentas();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [id]);
  const fecha = new Date(reporteDetalleVentas[0]?.fecha);
  var props = {
    outputType: "save",
    returnJsPDFDocObject: true,
    fileName: `Factura${reporteDetalleVentas[0]?.num_recibo}${fecha.getDate()}${
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
      name: `${reporteDetalleVentas[0]?.nombres} ${reporteDetalleVentas[0]?.apellidos}`,
      phone: `Dirección: ${reporteDetalleVentas[0]?.direccion}`,
      address: `RUC: ${reporteDetalleVentas[0]?.ruc}`,
      otherInfo: `Telefono: ${reporteDetalleVentas[0]?.telefono}`,
      email: `Correo: ${reporteDetalleVentas[0]?.email}`,
    },
    invoice: {
      label: "Factura #: ",
      num: reporteDetalleVentas[0]?.num_recibo,
      invDate: `Fecha Emisión: ${fecha.toLocaleString()}`,
      invGenDate: "",
      headerBorder: false,
      tableBodyBorder: false,
      header: ["#", "COD", "Producto", "Cantidad", "Precio", "Total"],
      table: reporteDetalleVentas.map((item, index) => [
        index + 1,
        item.cod_producto,
        item.nombre,
        item.cantidad,
        Number(item.precio).toFixed(2),
        Number(item.total).toFixed(2),
      ]),
      invTotalLabel: "Total:",
      invTotal: `$${Number(reporteDetalleVentas[0]?.total_venta).toFixed(2)}`,
      // invCurrency: "ALL",
      row1: {
        col1: "Importe:",
        col2: `$${Number(reporteDetalleVentas[0]?.importe).toFixed(2)}`,
        col3: "",
        style: {
          fontSize: 10, //OPTIONAL, DEFAULT 12
        },
      },
      row2: {
        col1: "Devolución:",
        col2: `$${Number(reporteDetalleVentas[0]?.devolucion).toFixed(2)}`,
        col3: "",
        style: {
          fontSize: 10, //optional, default 12
        },
      },
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
        <h3 className="titulo">Reportería</h3>
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
                <Link to="/dashboard/reporteria/ventas" className="navegacion__redirect">
                  Reporte de Ventas
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Venta No.</b>
                {reporteDetalleVentas[0]?.num_venta}
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h3>Fecha de Emisión: {fecha.toLocaleString()}</h3>
          <h4>Datos del Recibo</h4>
          <ul>
            <li>
              <strong>Facturacion No.: </strong>
              {reporteDetalleVentas[0]?.num_recibo}
            </li>
            <li>
              <strong>RUC Cliente: </strong>
              {reporteDetalleVentas[0]?.ruc}
            </li>
            <li>
              <strong>Datos del Cliente: </strong>
              {reporteDetalleVentas[0]?.nombres} {reporteDetalleVentas[0]?.apellidos}
            </li>
            <li>
              <strong>Importe: </strong>
              {reporteDetalleVentas[0]?.importe}
            </li>
            <li>
              <strong>Devolución: </strong>
              {reporteDetalleVentas[0]?.devolucion}
            </li>
          </ul>

          <p>
            <strong>Responsable:</strong> {reporteDetalleVentas[0]?.usuario}
          </p>
        </div>
        <div className="crear-item">
          <button className="button crear" onClick={handleCreatePdf}>
            <span className="button__icon">
              <Print className="icon" />
            </span>
            <span className="button__text">Imprimir Detalle</span>
          </button>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>Cod. Producto</th>
                <th>Nombre del Producto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : reporteDetalleVentas ? (
                reporteDetalleVentas.map((item, index) => {
                  return (
                    <tr key={item.idDetalleVenta} className="rowData">
                      <td>{index + 1}</td>
                      <td>{item.cod_producto}</td>
                      <td>{item.nombre}</td>
                      <td>{item.cat_nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.precio}</td>
                      <td>{item.total}</td>
                    </tr>
                  );
                })
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReporteriaVentasReporte;
