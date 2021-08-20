import React, { useState } from "react";
import "./index.css";
import { setUserSession } from "../../utils/Common";
import services from "../../services/login";
import { useHistory } from "react-router-dom";
import useValues from "../../provider/useValues";
import notificacion from "../../utils/Notificaciones";

const LoginPage = () => {
  const { login, setAuthLoading } = useValues();
  const history = useHistory();
  const [signin, setSignIn] = useState({ usuario: "", contraseña: "" });
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userLogged = {
      usuario: signin.usuario,
      contraseña: signin.contraseña,
    };
    const userExist = await services.verifiyUser(userLogged);
    if (userExist.message) {
      setLoading(false);
      return notificacion("Error", "Usuario o Contraseña Invalidos", "danger");
    } else {
      const logged = await services.login(userLogged);
      if (logged) {
        setUserSession(logged.token, logged.user);
        login(logged.user);
        setAuthLoading(false);
        notificacion("Inicio de Sesión", "Ingreso realizado con exito", "success");
        history.push("/dashboard");
      }
    }
  };

  return (
    <div className="body">
      <div className="center">
        <h1>Login</h1>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="txt_field">
              <input
                type="text"
                value={signin.usuario}
                name="contraseña"
                required
                onChange={(e) => setSignIn({ ...signin, usuario: e.target.value })}
              />
              <span></span>
              <label>Username</label>
            </div>
            <div className="txt_field">
              <input
                value={signin.contraseña}
                type="password"
                name="contraseña"
                required
                onChange={(e) => setSignIn({ ...signin, contraseña: e.target.value })}
              />
              <span></span>
              <label>Password</label>
            </div>
            <input
              type="submit"
              value={loading ? "Loading..." : "Login"}
              disabled={loading}
              className="btn btn-primary btn-lg"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
