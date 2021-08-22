import React, { useEffect, useState } from "react";
import services from "../../services/venta";
import { useHistory } from "react-router";
import { Loader } from "../../elements/Loader";
import { FilterList, Visibility } from "@material-ui/icons";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
const ReporteriaVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [filtroCliente, setFiltroCliente] = useState({ campo: "", valido: null });
  const [filtroFactura, setFiltroFactura] = useState({ campo: "", valido: null });
  const [ventasByClienteFiltro, setVentasByClienteFiltro] = useState([]);
  const [ventasByFactFiltro, setVentasByFactFiltro] = useState([]);
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
    setFiltroCliente({ campo: "", valido: null });
    setFiltroFactura({ campo: "", valido: null });
  };
  useEffect(() => {
    const filtro_cliente = ventas.filter((item) => {
      return (
        item.nombres
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .includes(filtroCliente.campo.toLowerCase().trim()) ||
        item.apellidos
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .includes(filtroCliente.campo.toLowerCase().trim()) ||
        item.ruc === filtroCliente.campo
      );
    });
    if (filtro_cliente.length > 0) {
      setVentasByClienteFiltro(filtro_cliente);
    } else {
      setVentasByClienteFiltro(ventas);
    }
  }, [ventas, filtroCliente.campo]);
  useEffect(() => {
    const filtro_factura = ventasByClienteFiltro.filter((item) => {
      return item.num_recibo === parseInt(filtroFactura.campo);
    });
    if (isFilter) {
      if (filtro_factura.length > 0) {
        setVentasByFactFiltro(filtro_factura);
      } else {
        setVentasByFactFiltro(ventasByClienteFiltro);
        if (filtro_factura.length === 0 && !ventasByClienteFiltro) {
          setVentasByFactFiltro([]);
        }
      }
    } else {
      setVentasByFactFiltro(ventasByClienteFiltro);
    }
  }, [ventasByClienteFiltro, isFilter, filtroFactura.campo]);
  return (
    <div>
      <div className="crear-item">
        <button className="button crear" onClick={switchFilter}>
          <span className="button__icon">
            <FilterList className="icon" />
          </span>
          <span className="button__text">Filtrar</span>
        </button>
      </div>
      {isFilter ? (
        <div className="ingresar__productos filtro__busqueda">
          <Formulario>
            <ComponentInput
              state={filtroCliente} //value
              setState={setFiltroCliente} //onChange
              title="Cliente"
              type="text"
              name="descripcion"
              placeholder="Cliente"
            />
            <ComponentInput
              state={filtroFactura} //value
              setState={setFiltroFactura} //onChange
              title="Factura #"
              type="text"
              name="descripcion"
              placeholder="#"
            />
          </Formulario>
        </div>
      ) : null}

      <table className="paleBlueRows">
        <thead>
          <tr>
            <th>#</th>
            {/* <th>No. Venta</th> */}
            <th>No. Factura</th>
            <th>Fecha Emisión</th>
            <th>Cliente</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Realizado Por</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : ventas ? (
            ventasByFactFiltro.map((item, index) => {
              return (
                <tr key={item.idVenta} className="rowData">
                  <td>{index + 1}</td>
                  {/* <td>{item.num_venta}</td> */}
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
