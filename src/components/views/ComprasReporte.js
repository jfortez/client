import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import "./DashboardView.css";
import services from "../../services/compras";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../../elements/Loader";

const ComprasReporte = () => {
  const { isCollapsed } = useValues();
  const [reporteDetalleCompras, setReporteDetalleCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getReporteComprasDetalle = async () => {
      try {
        const reporteDetalleCompras = await services.getComprasDetalleByIdCompras(source, id);
        if (!unmounted) {
          setReporteDetalleCompras(reporteDetalleCompras);
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
    getReporteComprasDetalle();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [id]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Compras </h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/compras">Compras</Link>
              </li>
              <li>
                <b>Visualizar Factura</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h2>Factura No.{reporteDetalleCompras[0]?.num_factura}</h2>
          <h3>Fecha: {reporteDetalleCompras[0]?.fecha}</h3>
          <h4>Detalles de Facturación</h4>
          <ul>
            <li>
              <strong>Ruc:</strong>
              {reporteDetalleCompras[0]?.ruc}
            </li>
            <li>
              <strong>Proveedor:</strong>
              {reporteDetalleCompras[0]?.nombre_proveedor}
            </li>
            <li>
              <strong>Total Cantidades:</strong>
              {reporteDetalleCompras[0]?.total_cantidad}
            </li>
            <li>
              <strong>Total Compra:</strong>
              {reporteDetalleCompras[0]?.total_compra}
            </li>
          </ul>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Cod Producto</th>
                <th>Nombre del Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total Compra</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : reporteDetalleCompras ? (
                reporteDetalleCompras.map((item) => {
                  return (
                    <tr key={item.idDetCompra}>
                      <td>{item.cod_producto}</td>
                      <td>{item.nombre_producto}</td>
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

export default ComprasReporte;
