import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
// import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NuevoPacientes from "./views/NuevoPacientes";
import PacientesView from "./views/PacientesView";
import PageTest from "./views/PageTest";
import PersonalView from "./views/PersonalView";
import UsuariosView from "./views/UsuariosView";
import PublicRoute from "../utils/PublicRoute";
import PrivateRoute from "../utils/PrivateRoute";
import { getToken, removeUserSession, setUserSession } from "../utils/Common";
import axios from "axios";
import PacientesEdit from "./views/PacientesEdit";
import AccountPage from "./pages/AccountPage";
import ClienteView from "./views/ClienteView";
import ProductosView from "./views/ProductosView";
import ServiciosView from "./views/ServiciosView";
import AgendaView from "./views/AgendaView";
import CalendarioView from "./views/CalendarioView";
import ConfigView from "./views/ConfigView";
import ReportView from "./views/ReportView";
import InventarioView from "./views/InventarioView";

const Routes = () => {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios
      .get(`http://localhost:5000/api/usuarios/verifytoken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading();
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);
  if (authLoading && getToken()) {
    return <div className="content"> Cheking Authentication...</div>;
  }
  return (
    <>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/test" component={PageTest} />
        <PrivateRoute exact path="/dashboard/personal" component={PersonalView} />
        <PrivateRoute exact path="/dashboard/pacientes" component={PacientesView} />
        <PrivateRoute
          exact
          path="/dashboard/pacientes/:pacienteId/edit"
          component={PacientesEdit}
        />
        <PrivateRoute exact path="/dashboard/pacientes/create" component={NuevoPacientes} />
        <PrivateRoute exact path="/dashboard/usuarios" component={UsuariosView} />
        <PrivateRoute exact path="/dashboard/usuarios" component={UsuariosView} />
        <PrivateRoute exact path="/dashboard/clientes" component={ClienteView} />
        <PrivateRoute exact path="/dashboard/account" component={AccountPage} />
        <PrivateRoute exact path="/dashboard/productos" component={ProductosView} />
        <PrivateRoute exact path="/dashboard/servicios" component={ServiciosView} />
        <PrivateRoute exact path="/dashboard/agenda" component={AgendaView} />
        <PrivateRoute exact path="/dashboard/calendario" component={CalendarioView} />
        <PrivateRoute exact path="/dashboard/reporteria" component={ReportView} />
        <PrivateRoute exact path="/dashboard/inventario" component={InventarioView} />
        <PrivateRoute exact path="/dashboard/settings" component={ConfigView} />
        <Route path="/*" component={ErrorPage} />
      </Switch>
    </>
  );
};

export default Routes;
