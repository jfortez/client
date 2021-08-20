import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import agendaServices from "../../services/agenda";
import clienteServices from "../../services/cliente";
import valuesServices from "../../services/values";
import services from "../../services/servicios";
import cajaServices from "../../services/caja";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import empresaServices from "../../services/empresa";
import notificacion from "../../utils/Notificaciones";

const AgendaServicioVenta = () => {
  const { isCollapsed, id_agenda, values, setId_agenda, setValues, user } = useValues();
  const [agendaInfo, setAgendaInfo] = useState([]);
  const [entradasVenta, setEntradasVenta] = useState({ ruc: "", importe: 0 });
  const [cliente, setCliente] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getEmpresa = async () => {
      const compañia = await empresaServices.optionEmpresa();
      setEmpresa(compañia);
    };
    getEmpresa();
  }, []);
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
  const fecha = new Date();
  const handleVenta = async () => {
    if (!cliente.length > 0) {
      return notificacion("Venta de Servicio", "Debe ingresar un Cliente", "danger");
    }
    if (entradasVenta.importe === 0) {
      return notificacion("Venta de Servicio", "Debe ingresar un Importe", "danger");
    }
    const total = agendaInfo[0].precio_servicio;
    const venta_servicio = {
      num_venta: values.num_venta,
      num_recibo: values.num_recibo,
      fecha: fecha,
      id_Agenda: id_agenda,
      importe: Number(entradasVenta.importe),
      devolucion: (Number(entradasVenta.importe) - agendaInfo[0]?.precio_servicio).toFixed(2),
      id_Cliente: cliente[0].id,
      id_Usuario: user.id,
    };
    const caja = await cajaServices.getCajaByMaxId();
    if (!caja.length > 0) {
      return console.log("no hay una caja activa, debe ingresar");
    }
    if (caja[0]?.estado_caja === "CERRADO") {
      return console.log("debe abrir una caja para proceder");
    }
    const ventaserv = await services.createVentaServicios(venta_servicio);
    if (ventaserv) {
      handleCreatePdf();
      ingresoACaja(caja, total, venta_servicio.num_recibo, ventaserv);
      const fact_serv = {
        id_venta_servicios: ventaserv,
        id_Servicio: agendaInfo[0].id_Servicio,
        precio: agendaInfo[0].precio_servicio,
        total,
      };
      await services.createFactServicios(fact_serv);
      notificacion(
        "Venta de Servicio",
        "Se ha creado Venta de Servicio Satisfatoriamente",
        "success"
      );
      history.push("/dashboard/agenda");
    }
    updateValues();
    clean();
  };
  const ingresoACaja = async (caja, totalVenta, recibo, idvservicio) => {
    const ingreso = {
      id_caja: caja[0]?.id,
      ingreso: totalVenta,
      descripcion: `Venta Servicio Bajo Factura No.: ${recibo}`,
      caja_actual: parseFloat(Number(caja[0].caja_actual + Number(totalVenta)).toFixed(2)),
      id_Usuario: user.id,
      id_venta_servicio: idvservicio,
    };
    await cajaServices.nuevoMovimiento(ingreso);
    await cajaServices.updateCaja({ caja_actual: ingreso.caja_actual }, ingreso.id_caja);
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
  var props = {
    outputType: "save",
    returnJsPDFDocObject: true,
    fileName: `Factura${values?.num_recibo}${fecha.getDate()}${
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
      name: `${cliente[0]?.nombres} ${cliente[0]?.apellidos}`,
      phone: `Dirección: ${cliente[0]?.direccion}`,
      address: `RUC: ${cliente[0]?.ruc}`,
      otherInfo: `Telefono: ${cliente[0]?.telefono}`,
      email: `Correo: ${cliente[0]?.email}`,
    },
    invoice: {
      label: "Factura #: ",
      num: values?.num_recibo,
      invDate: `Fecha Emisión: ${fecha.toLocaleString()}`,
      invGenDate: "",
      headerBorder: false,
      tableBodyBorder: false,
      header: ["#", "COD", "Servicio", "Descripción Servicio", "Total"],
      table: agendaInfo.map((item, index) => [
        index + 1,
        item.cod_servicio,
        item.nombre_servicio,
        item.descripcion_servicio,
        Number(item.precio_servicio).toFixed(2),
      ]),
      invTotalLabel: "Total:",
      invTotal: `$${Number(agendaInfo[0]?.precio_servicio).toFixed(2)}`,
      invCurrency: "",
      // row1: {
      //   col1: "Importe:",
      //   col2: `$${Number(entradasVenta?.importe).toFixed(2)}`,
      //   col3: "",
      //   style: {
      //     fontSize: 10, //OPTIONAL, DEFAULT 12
      //   },
      // },
      // row2: {
      //   col1: "Devolución:",
      //   col2: `$${(Number(entradasVenta.importe) - agendaInfo[0]?.precio_servicio).toFixed(2)}`,
      //   col3: "",
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
        <h3>Fecha: {fecha.toLocaleDateString()}</h3>
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
                      <td>{Number(item.precio_servicio).toFixed(2)}</td>
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
          <button onClick={handleVenta}>Venta</button>
        </div>
      </div>
    </>
  );
};

export default AgendaServicioVenta;
