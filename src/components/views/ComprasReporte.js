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
  const individualData = [reporteDetalleCompras[0]];
  const cantidadTotal = reporteDetalleCompras?.reduce((a, b) => {
    return a + b.cantidad;
  }, 0);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Detalle de Compras</h3>
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
                <Link to="/dashboard/compras" className="navegacion__redirect">
                  Compras
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Detalle de Compras</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row__ventaActual">
          <div>
            <span className="venta__title">
              Fecha Emisión: <span className="venta__dato">{reporteDetalleCompras[0]?.fecha}</span>
            </span>
          </div>
          {reporteDetalleCompras[0]?.num_factura ? (
            <div>
              <span className="venta__title">
                FACTURA No.:{" "}
                <span className="venta__dato">{reporteDetalleCompras[0]?.num_factura}</span>
              </span>
            </div>
          ) : null}
        </div>
        <div className="container">
          <div className="item-1 vista__1 reporteventa ">
            <span>Información Proveedor</span>
            {reporteDetalleCompras.length > 0 ? (
              <table className="paleBlueRows venta">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>RUC</th>
                    <th>Nombres</th>
                    <th>Dirección</th>
                    <th>Telefono</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {reporteDetalleCompras.length > 0
                    ? individualData.map((item, index) => {
                        return (
                          <tr key={index} className="rowData">
                            <td>{index + 1}</td>
                            <td>{item.ruc}</td>
                            <td>{item.nombre_proveedor}</td>
                            <td>{item.dir_proveedor}</td>
                            <td>{item.tel_proveedor}</td>
                            <td>{item.email_proveedor}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : (
              <h1 className="title__info">Ingrese un RUC para visualizar</h1>
            )}
          </div>
          <div className="item-2 vista__2 reporteventa ">
            <span>Detalle de Compra</span>
            {reporteDetalleCompras.length > 0 ? (
              <table className="paleBlueRows venta">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Factura No.</th>
                    <th># Productos</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reporteDetalleCompras.length > 0
                    ? individualData.map((item, index) => {
                        return (
                          <tr key={index} className="rowData">
                            <td>{index + 1}</td>
                            <td>{item.num_factura}</td>
                            <td>{cantidadTotal}</td>
                            <td>${Number(item.total_compra).toFixed(2)}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : (
              <h1 className="title__info">Ingrese un RUC para visualizar</h1>
            )}
          </div>
        </div>
        <div>
          <table className="paleBlueRows venta">
            <thead>
              <tr>
                <th>#</th>
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
                reporteDetalleCompras.map((item, index) => {
                  return (
                    <tr key={item.idDetCompra} className="rowData">
                      <td>{index + 1}</td>
                      <td>{item.cod_producto}</td>
                      <td>{item.nombre_producto}</td>
                      <td>{item.cantidad}</td>
                      <td>${item.precio.toFixed(2)}</td>
                      <td>${item.total.toFixed(2)}</td>
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
