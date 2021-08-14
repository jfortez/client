import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import agendaServices from "../../services/agenda";
import clienteServices from "../../services/cliente";
import valuesServices from "../../services/values";
import services from "../../services/servicios";
const AgendaServicioVenta = () => {
  const { isCollapsed, id_agenda, values, setId_agenda, setValues, user } = useValues();
  const [agendaInfo, setAgendaInfo] = useState([]);
  const [entradasVenta, setEntradasVenta] = useState({ ruc: "", importe: 0 });
  const [cliente, setCliente] = useState([]);
  useEffect(() => {
    const getAgendaByID = async () => {
      const agenda = await agendaServices.getAgendaById(id_agenda);
      setAgendaInfo(agenda);
    };
    getAgendaByID();
  }, [id_agenda]);
  const handleSearch = async (event) => {
    event.preventDefault();
    const clienteData = await clienteServices.getRUC({ ruc: entradasVenta.ruc });
    setCliente(clienteData);
  };
  const fecha = new Date().toLocaleDateString();
  const handleVenta = async () => {
    const venta_servicio = {
      num_venta: values.num_venta,
      num_recibo: values.num_recibo,
      fecha,
      id_Agenda: id_agenda,
      importe: Number(entradasVenta.importe),
      devolucion: (Number(entradasVenta.importe) - agendaInfo[0]?.precio_servicio).toFixed(2),
      id_Cliente: cliente[0].id,
      id_Usuario: user.id,
    };
    const ventaserv = await services.createVentaServicios(venta_servicio);
    console.log(ventaserv);
    // if (ventaserv) {
    //   const fact_serv = {
    //     id_venta_servicios: ventaserv,
    //     id_Servicio: agendaInfo[0].id_Servicio,
    //     precio: agendaInfo[0].precio_servicio,
    //     total: agendaInfo[0].precio_servicio,
    //   };
    //   await services.createFactServicios(fact_serv);
    // }
    // updateValues();
    // clean();
  };
  const clean = () => {
    setAgendaInfo([]);
    setEntradasVenta({ ruc: "", importe: 0 });
    setCliente([]);
    setId_agenda(0);
  };
  const updateValues = async () => {
    const newValue = { num_venta: values.num_venta + 1, num_recibo: values.num_recibo + 1 };
    await valuesServices.updateValues(newValue);
    setValues({ num_venta: values.num_venta + 1, num_recibo: values.num_recibo + 1 });
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Página de Servicio Venta</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Pagina Servicio Venta</b>
              </li>
            </ul>
          </nav>
        </div>
        <h3>Venta No: {values.num_venta}</h3>
        <h3>Recibo No: {values.num_recibo}</h3>
        <h3>Fecha: {fecha}</h3>
        <div>
          <div>
            <h4>Datos de Facturación</h4>
            <form onSubmit={handleSearch}>
              <label htmlFor="ruc">RUC:</label>
              <input
                type="text"
                name="ruc"
                id="ruc"
                value={entradasVenta.ruc}
                onChange={(e) => setEntradasVenta({ ...entradasVenta, ruc: e.target.value })}
              />
              <button>Buscar</button>
              {!cliente.message ? (
                cliente.map((data) => {
                  return (
                    <ul key={data.id}>
                      <li>
                        <b>Nombres:</b>
                        {data.nombres} {data.apellidos}
                      </li>
                      <li>
                        <b>Dirección:</b> {data.direccion}
                      </li>
                      <li>
                        <b>Telefono:</b> {data.telefono}
                      </li>
                      <li>
                        <b>email:</b> {data.email}
                      </li>
                    </ul>
                  );
                })
              ) : (
                <p>Cliente no existe</p>
              )}
            </form>
          </div>
          <div>
            <h4>Datos del Paciente</h4>
            <ul>
              <li>
                <strong>Cedula: </strong>
                {agendaInfo[0]?.cedula_paciente}
              </li>
              <li>
                <strong>Nombres: </strong>
                {agendaInfo[0]?.nombres_paciente}
              </li>
              <li>
                <strong>Apellidos: </strong>
                {agendaInfo[0]?.apellidos_paciente}
              </li>
            </ul>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Codigo del Servicio</th>
                  <th>Nombre del Servicio</th>
                  <th>Decripción del Servicio</th>
                  <th>Precio del Servicio</th>
                </tr>
              </thead>
              <tbody>
                {agendaInfo.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.cod_servicio}</td>
                      <td>{item.nombre_servicio}</td>
                      <td>{item.descripcion_servicio}</td>
                      <td>{item.precio_servicio}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <br />
          <div>
            <label htmlFor="importe">Importe</label>
            <input
              type="text"
              name="importe"
              id="importe"
              value={entradasVenta.importe}
              onChange={(e) => setEntradasVenta({ ...entradasVenta, importe: e.target.value })}
            />
          </div>
          <button onClick={handleVenta}>Guardar</button>
        </div>
      </div>
    </>
  );
};

export default AgendaServicioVenta;
