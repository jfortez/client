import React, { useEffect, useState } from "react";
import services from "../../services/venta";
import clienteServices from "../../services/cliente";
import { useHistory } from "react-router";
import { Loader } from "../../elements/Loader";
import { Visibility } from "@material-ui/icons";

const ReporteriaVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [test, setTest] = useState("");
  const [filtroValues, setFiltroValues] = useState({ cliente: "", fecha: "", factura: "" });
  const history = useHistory();
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getReporteVentas = async () => {
      try {
        const reporteVentas = await services.getReporteVentas(source);
        if (!unmounted) {
          setVentas(reporteVentas);
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
    getReporteVentas();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, []);
  const showVenta = (id) => {
    history.push(`/dashboard/reporteria/ventas/reporte/${id}`);
  };
  const switchFilter = () => {
    setIsFilter(!isFilter);
    if (!isFilter) {
      getClientes();
    } else {
      setClientes(null);
      setFiltroValues({ cliente: "", fecha: "", factura: "" });
    }
  };
  const getClientes = async () => {
    const clientes = await clienteServices.listClientes();
    setClientes(clientes);
  };

  useEffect(() => {
    // setVentas(ventas.filter((item) => item.ruc === test));
  }, [test, ventas]);
  return (
    <div>
      <h3 className="titulo">Ventas</h3>
      <button onClick={switchFilter}>Filtrar</button>
      {isFilter ? (
        <div>
          {/* Filtrar por Cliente */}
          <div>
            <label htmlFor="">Cliente</label>
            <select
              type="text"
              value={test}
              onChange={(e) => setTest(e.target.value)}
              // value={filtroValues.cliente}
              // onChange={(e) => setFiltroValues({ ...filtroValues, cliente: e.target.value })}
            >
              <option value="0"></option>
              {clientes
                ? clientes.map((item) => {
                    return (
                      <option value={item.ruc} key={item.id}>
                        {item.nombres} {item.apellidos}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          {/* Filtrar por Fecha */}
          <div>
            <label htmlFor="">Fecha</label>
            <input
              type="text"
              value={filtroValues.fecha}
              onChange={(e) => setFiltroValues({ ...filtroValues, fecha: e.target.value })}
            />
          </div>
          {/* Filtrar por Factura */}
          <div>
            <label htmlFor="">Factura No.</label>
            <input
              type="text"
              value={filtroValues.factura}
              onChange={(e) => setFiltroValues({ ...filtroValues, factura: e.target.value })}
            />
          </div>
        </div>
      ) : null}
      <table className="paleBlueRows">
        <thead>
          <tr>
            <th>#</th>
            <th>No. Venta</th>
            <th>No. Factura</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Cantidad de Productos</th>
            <th>Total de Venta</th>
            <th>Realizado Por</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : ventas ? (
            ventas.map((item, index) => {
              return (
                <tr key={item.idVenta} className="rowData">
                  <td>{index + 1}</td>
                  <td>{item.num_venta}</td>
                  <td>{item.num_recibo}</td>
                  <td>{new Date(item.fecha).toLocaleString()}</td>
                  <td>
                    {item.nombres} {item.apellidos}
                  </td>
                  <td>{item.cantidad}</td>
                  <td>{item.total}</td>
                  <td>{item.usuario}</td>
                  <td className="botones">
                    <button onClick={() => showVenta(item.idVenta)} className="button show">
                      <Visibility />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteriaVentas;
