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
import { LocalMall, Search } from "@material-ui/icons";
import swal from "sweetalert";

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
    if (entradasVenta.ruc === "") {
      return notificacion("Campo Vacio", "Debe Ingresar un Cliente", "warning");
    }
    const clienteData = await clienteServices.getRUC({ ruc: entradasVenta.ruc });
    if (!clienteData.message) {
      setCliente(clienteData);
    } else {
      return notificacion("Error", "Cliente no Existe", "danger");
    }
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
      return notificacion("Nueva Venta", "No hay una caja activa", "danger");
    }
    if (caja[0]?.estado_caja === "CERRADO") {
      return notificacion("Nueva Venta", "Debe abrir una caja para proceder", "danger");
    }
    const ventaserv = await services.createVentaServicios(venta_servicio);
    if (ventaserv) {
      history.push("/dashboard/agenda");
      swal("Venta generada satisfatoriamente", {
        icon: "success",
      });
      handleCreatePdf();
      ingresoACaja(caja, total, venta_servicio.num_recibo, ventaserv);
      const fact_serv = {
        id_venta_servicios: ventaserv,
        id_Servicio: agendaInfo[0].id_Servicio,
        precio: agendaInfo[0].precio_servicio,
        total,
      };
      await services.createFactServicios(fact_serv);
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
  const devolucion = (Number(entradasVenta.importe) - agendaInfo[0]?.precio_servicio).toFixed(2);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Venta de Servicio</h3>
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
                <Link to="/dashboard/agenda" className="navegacion__redirect">
                  Agenda
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Venta de Servicio</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row__ventaActual">
          <div>
            <span className="venta__title">
              VENTA No.: <span className="venta__dato">{values?.num_venta} </span>
            </span>
            /{" "}
            <span className="venta__title">
              FACTURA No.: <span className="venta__dato">{values?.num_venta}</span>
            </span>
          </div>
          <div>
            <span className="venta__title">
              FECHA: <span className="venta__dato">{fecha.toLocaleDateString()}</span>
            </span>
          </div>
        </div>
        <form onSubmit={handleSearch}>
          <div className="venta__cliente">
            <div className="search__info">
              <label htmlFor="ruc" className="label__info">
                Clientes
              </label>
              <input
                type="text"
                name="ruc"
                id="ruc"
                value={entradasVenta.ruc}
                onChange={(e) => setEntradasVenta({ ...entradasVenta, ruc: e.target.value })}
              />
              <button>
                <Search />
              </button>
            </div>
            <div className="info__cliente">
              <div className="contenido">
                {cliente.length > 0 ? (
                  <table className="paleBlueRows venta">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cliente.length > 0
                        ? cliente.map((item, index) => {
                            return (
                              <tr key={index} className="rowData">
                                <td>{index + 1}</td>
                                <td>
                                  {item.nombres} {item.apellidos}
                                </td>
                                <td>{item.direccion}</td>
                                <td>{item.telefono}</td>
                                <td>{item.email}</td>
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
          </div>
        </form>
        <div className="container">
          <div className="item-1 vista__1">
            <span>Datos del Paciente</span>
            {agendaInfo.length > 0 ? (
              <table className="paleBlueRows venta">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cedula</th>
                    <th>Nombres</th>
                    <th>Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  {agendaInfo.length > 0
                    ? agendaInfo.map((item, index) => {
                        return (
                          <tr key={index} className="rowData">
                            <td>{index + 1}</td>
                            <td>{item.cedula_paciente}</td>
                            <td>
                              {item.nombres_paciente} {item.apellidos_paciente}
                            </td>
                            <td>{item.email}</td>
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

          <div className="item-2 vista__2">
            <span>Datos del Servicio</span>
            {agendaInfo.length > 0 ? (
              <table className="paleBlueRows venta">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cod Servicio</th>
                    <th>Nombre Servicio</th>
                    <th>Descripción Servicio</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {agendaInfo.length > 0
                    ? agendaInfo.map((item, index) => {
                        return (
                          <tr key={index} className="rowData">
                            <td>{index + 1}</td>
                            <td>{item.cod_servicio}</td>
                            <td>{item.nombre_servicio}</td>
                            <td>{item.descripcion_servicio}</td>
                            <td>${Number(item.precio_servicio).toFixed(2)}</td>
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
        <div className="venta__manual">
          <div className="venta__importe">
            <label htmlFor="importe" className="label__info">
              Importe
            </label>
            <input
              type="text"
              name="importe"
              id="importe"
              value={entradasVenta.importe}
              onChange={(e) => setEntradasVenta({ ...entradasVenta, importe: e.target.value })}
            />
          </div>
          <div className="venta__importe devolucion">
            <label htmlFor="cambio" className="label__info">
              Cambio
            </label>
            <input
              type="text"
              name="cambio"
              id="cambio"
              disabled
              value={
                entradasVenta.importe >= Number(agendaInfo[0]?.precio_servicio)
                  ? devolucion
                  : "0.00"
              }
            />
          </div>
          <div className="venta__btns">
            <button className="button crear crear_venta" onClick={handleVenta}>
              <span className="button__icon">
                <LocalMall className="icon" />
              </span>
              <span className="button__text">Generar Venta</span>
            </button>
            {/* <button className="button limpiar" onClick={limpiar}>
              <span className="button__icon">
                <ClearAll className="icon" />
              </span>
              <span className="button__text">Limpiar</span>
            </button> */}
          </div>
        </div>
        <div>
          <div>
            <table className="paleBlueRows venta">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Codigo del Servicio</th>
                  <th>Nombre del Servicio</th>
                  <th>Decripción del Servicio</th>
                  <th>Precio del Servicio</th>
                </tr>
              </thead>
              <tbody>
                {agendaInfo.map((item, index) => {
                  return (
                    <tr key={index} className="rowData">
                      <td>{index + 1}</td>
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
        </div>
      </div>
    </>
  );
};

export default AgendaServicioVenta;
