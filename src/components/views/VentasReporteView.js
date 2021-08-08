import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import "./DashboardView.css";
import NavigationVentas from "../../components/layouts/ventaComponents/NavigationVentas";
import ventaServices from "../../services/venta";
import { useEffect, useState } from "react";
import { Loader } from "../../elements/Loader";
import { useParams } from "react-router-dom";
const VentasReporteView = () => {
  const { isCollapsed } = useValues();
  const [reporteDetalleVentas, setReporteDetalleVentas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
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
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <NavigationVentas />
        <h1>Venta No: {reporteDetalleVentas[0]?.num_venta}</h1>
        <div>
          <h3>Fecha: {new Date(reporteDetalleVentas[0]?.fecha).toLocaleDateString()}</h3>
          <h4>Datos del Recibo</h4>

          <ul>
            <li>
              <strong>RUC Cliente:</strong>
              {reporteDetalleVentas[0]?.ruc}
            </li>
            <li>
              <strong>Datos del Cliente:</strong>
              {reporteDetalleVentas[0]?.nombres} {reporteDetalleVentas[0]?.apellidos}
            </li>
          </ul>

          <p>
            <strong>Responsable:</strong> {reporteDetalleVentas[0]?.usuario}
          </p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Cod. Producto</th>
                <th>Nombre del Producto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Realizado Por</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : reporteDetalleVentas ? (
                reporteDetalleVentas.map((item) => {
                  return (
                    <tr key={item.idDetalleVenta}>
                      <td>{item.cod_producto}</td>
                      <td>{item.nombre}</td>
                      <td>{item.cat_nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.precio}</td>
                      <td>{item.total}</td>
                      <td>{item.usuario}</td>
                      <td>{new Date(item.fecha).toLocaleDateString()}</td>
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

export default VentasReporteView;
