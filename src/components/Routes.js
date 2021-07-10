import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PacientesView from "./views/PacientesView";
import PageTest from "./views/PageTest";
import PersonalView from "./views/PersonalView";
import UsuariosView from "./views/UsuariosView";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/test" component={PageTest} />
        <Route exact path="/dashboard/personal" component={PersonalView} />
        <Route exact path="/dashboard/pacientes" component={PacientesView} />
        <Route exact path="/dashboard/usuarios" component={UsuariosView} />

        <Route path="/*" component={ErrorPage} />
      </Switch>
    </>
  );
};

export default Routes;
