import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import "./DashboardView.css";
import NavigationVentas from "../../components/layouts/ventaComponents/NavigationVentas";
import ventaServices from "../../services/venta";
import { useEffect, useState } from "react";
import { Loader } from "../../elements/Loader";
import { useHistory } from "react-router-dom";

const VentasReporte = () => {
  const { isCollapsed } = useValues();
  const [reporteVentas, setReporteVentas] = useState([]);
  // const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    let source = ventaServices.Axios.CancelToken.source();
    let unmounted = false;
    const getReporteVentas = async () => {
      try {
        const reporteVentas = await ventaServices.getReporteVentas(source);
        if (!unmounted) {
          setReporteVentas(reporteVentas);
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
    getReporteVentas();
    // setIsListed(false);
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, []);
  const showVenta = (id) => {
    history.push(`/dashboard/ventas/reporte/${id}`);
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <NavigationVentas />
        <h1>Reporte de Ventas</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>No. Venta</th>
                <th>No. Factura</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Cantidad de Productos</th>
                <th>Total de Venta</th>
                <th>Realizado Por</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : reporteVentas ? (
                reporteVentas.map((item) => {
                  return (
                    <tr key={item.idVenta}>
                      <td>{item.num_venta}</td>
                      <td>{item.num_recibo}</td>
                      <td>{new Date(item.fecha).toLocaleDateString()}</td>
                      <td>
                        {item.nombres} {item.apellidos}
                      </td>
                      <td>{item.cantidad}</td>
                      <td>{item.total}</td>
                      <td>{item.usuario}</td>
                      <td>
                        <button onClick={() => showVenta(item.idVenta)}>Visualizar</button>
                      </td>
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

export default VentasReporte;
