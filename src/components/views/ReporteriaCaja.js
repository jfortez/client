import React, { useEffect } from "react";
import { useState } from "react";
import services from "../../services/caja";
import { Loader } from "../../elements/Loader";
import { useHistory } from "react-router";
import { FilterList, Visibility } from "@material-ui/icons";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";

const ReporteriaCaja = () => {
  const [caja, setCaja] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [filtroInicio, setFiltroInicio] = useState({ campo: "", valido: null });
  const [filtroFin, setFiltroFin] = useState({ campo: "", valido: null });
  const history = useHistory();
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getCaja = async () => {
      try {
        const listCaja = await services.getCaja(source);
        if (!unmounted) {
          setCaja(listCaja);
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
    getCaja();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, []);
  const showCaja = (id) => {
    history.push(`/dashboard/reporteria/caja/${id}/view`);
  };
  const switchFilter = () => {
    setIsFilter(!isFilter);
  };
  return (
    <div>
      {/* <h3 className="titulo">Caja</h3> */}
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
              state={filtroInicio} //value
              setState={setFiltroInicio} //onChange
              title="Fecha Inicio"
              type="date"
              name="descripcion"
              placeholder="Cliente"
            />
            <ComponentInput
              state={filtroFin} //value
              setState={setFiltroFin} //onChange
              title="Fecha Cierre"
              type="date"
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
            <th>Fecha y Hora Apertura</th>
            <th>Apertura Caja</th>
            <th>Fecha y Hora Cierre</th>
            <th>Cierre Caja</th>
            <th>Estado Caja</th>
            <th>Vendedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : caja ? (
            caja.map((item, index) => {
              return (
                <tr key={item.id_caja} className="rowData">
                  <td>{index + 1}</td>
                  <td>{new Date(item.fecha).toLocaleString()}</td>
                  <td>${item.caja_inicio}</td>
                  <td>{new Date(item.fecha_cierre).toLocaleString()}</td>
                  <td>${item.caja_inicio}</td>
                  <td>{item.estado_caja}</td>
                  <td>{item.usuario}</td>
                  <td className="botones">
                    <button onClick={() => showCaja(item.id_caja)} className="button show">
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

export default ReporteriaCaja;
