import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
// import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PacientesView from "./views/PacientesView";
import PersonalView from "./views/PersonalView";
import UsuariosView from "./views/UsuariosView";
import PublicRoute from "../utils/PublicRoute";
import PrivateRoute from "../utils/PrivateRoute";
import { getToken } from "../utils/Common";
import ProductosCreate from "./views/ProductosCreate";
import CategoryCreate from "./views/CategoryCreate";
import ClienteView from "./views/ClienteView";
import ProductosView from "./views/ProductosView";
import ServiciosView from "./views/ServiciosView";
import AgendaView from "./views/AgendaView";
import CalendarioView from "./views/CalendarioView";
import ConfigView from "./views/ConfigView";
import ReportView from "./views/ReportView";
import OdontologoView from "./views/OdonologoVIew";
import OdontologoCreate from "./views/OdontologoCreate";
import PersonalCreate from "./views/PersonalCreate";
import ClienteCreate from "./views/ClienteCreate";
import PacientesCreate from "./views/PacientesCreate";
import UsuarioCreate from "./views/UsuarioCreate";
import useValues from "../provider/useValues";
import VentasView from "./views/VentasView";
import ProveedoresView from "./views/ProveedoresView";
import ComprasView from "./views/ComprasView";
import ComprasCreate from "./views/ComprasCreate";
import ProveedoresCreate from "./views/ProveedoresCreate";
import ComprasReporte from "./views/ComprasReporte";
import ServiciosCreate from "./views/ServiciosCreate";
import CitasView from "./views/CitasView";
import CitaSeguimiento from "./views/CitaSeguimiento";
import AgendaServicioVenta from "./views/AgendaServicioVenta";
import CajaView from "./views/CajaView";
import CategoryView from "./views/CategoryView";
import ReporteriaCajaView from "./views/ReporteriaCajaView";
import ReporteriaHistorialPacienteView from "./views/ReporteriaHistorialPacienteView";
import ReporteriaVentasReporte from "./views/ReporteriaVentasReporte";
const Routes = () => {
  const { authLoading } = useValues();
  if (authLoading && getToken()) {
    return <div className="content"> Cheking Authentication...</div>;
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/ventas" component={VentasView} />
        <PrivateRoute exact path="/dashboard/ventas/caja" component={CajaView} />
        <PrivateRoute exact path="/dashboard/personal" component={PersonalView} />
        <PrivateRoute exact path="/dashboard/personal/create" component={PersonalCreate} />
        <PrivateRoute exact path="/dashboard/personal/:id/edit" component={PersonalCreate} />
        <PrivateRoute exact path="/dashboard/proveedores" component={ProveedoresView} />
        <PrivateRoute exact path="/dashboard/proveedores/create" component={ProveedoresCreate} />
        <PrivateRoute exact path="/dashboard/proveedores/:id/edit" component={ProveedoresCreate} />
        <PrivateRoute exact path="/dashboard/compras" component={ComprasView} />
        <PrivateRoute exact path="/dashboard/compras/create" component={ComprasCreate} />
        <PrivateRoute exact path="/dashboard/compras/reporte/:id" component={ComprasReporte} />
        <PrivateRoute exact path="/dashboard/pacientes" component={PacientesView} />
        <PrivateRoute exact path="/dashboard/pacientes/create" component={PacientesCreate} />
        <PrivateRoute exact path="/dashboard/pacientes/:id/edit" component={PacientesCreate} />
        <PrivateRoute exact path="/dashboard/usuarios" component={UsuariosView} />
        <PrivateRoute exact path="/dashboard/usuarios/create" component={UsuarioCreate} />
        <PrivateRoute exact path="/dashboard/usuarios/:id/edit" component={UsuarioCreate} />
        <PrivateRoute exact path="/dashboard/clientes" component={ClienteView} />
        <PrivateRoute exact path="/dashboard/clientes/create" component={ClienteCreate} />
        <PrivateRoute exact path="/dashboard/clientes/:id/edit" component={ClienteCreate} />
        <PrivateRoute exact path="/dashboard/odontologos" component={OdontologoView} />
        <PrivateRoute exact path="/dashboard/odontologos/create" component={OdontologoCreate} />
        <PrivateRoute exact path="/dashboard/odontologos/:id/edit" component={OdontologoCreate} />
        <PrivateRoute exact path="/dashboard/productos" component={ProductosView} />
        <PrivateRoute exact path="/dashboard/productos/createProduct" component={ProductosCreate} />
        <PrivateRoute exact path="/dashboard/productos/:id/edit" component={ProductosCreate} />
        <PrivateRoute exact path="/dashboard/productos/categoria" component={CategoryView} />
        <PrivateRoute
          exact
          path="/dashboard/productos/categoria/create"
          component={CategoryCreate}
        />
        <PrivateRoute
          exact
          path="/dashboard/productos/categoria/:id/edit"
          component={CategoryCreate}
        />
        <PrivateRoute exact path="/dashboard/servicios" component={ServiciosView} />
        <PrivateRoute exact path="/dashboard/servicios/create" component={ServiciosCreate} />
        <PrivateRoute exact path="/dashboard/servicios/:id/edit" component={ServiciosCreate} />
        <PrivateRoute exact path="/dashboard/agenda" component={AgendaView} />
        <PrivateRoute
          exact
          path="/dashboard/agenda/ventaservicio"
          component={AgendaServicioVenta}
        />
        <PrivateRoute exact path="/dashboard/cita" component={CitasView} />
        <PrivateRoute exact path="/dashboard/cita/seguimiento/:id" component={CitaSeguimiento} />
        <PrivateRoute exact path="/dashboard/calendario" component={CalendarioView} />
        <PrivateRoute exact path="/dashboard/reporteria" component={ReportView} />
        <PrivateRoute exact path="/dashboard/reporteria/ventas" component={ReportView} />
        <PrivateRoute
          exact
          path="/dashboard/reporteria/ventas/reporte/:id"
          component={ReporteriaVentasReporte}
        />
        <PrivateRoute exact path="/dashboard/reporteria/caja" component={ReportView} />
        <PrivateRoute
          exact
          path="/dashboard/reporteria/caja/:id/view"
          component={ReporteriaCajaView}
        />
        <PrivateRoute exact path="/dashboard/reporteria/historialpaciente" component={ReportView} />
        <PrivateRoute
          exact
          path="/dashboard/reporteria/historialpaciente/:id/view"
          component={ReporteriaHistorialPacienteView}
        />
        <PrivateRoute exact path="/dashboard/settings" component={ConfigView} />
        <PrivateRoute exact path="/dashboard/settings/empresa" component={ConfigView} />
        <PrivateRoute exact path="/dashboard/settings/account" component={ConfigView} />
        <PrivateRoute exact path="/dashboard/settings/backup" component={ConfigView} />
        <Route exact path="/*" component={ErrorPage} />
      </Switch>
    </>
  );
};

export default Routes;
