import React, { useState } from "react";
import "./index.css";
import { setUserSession } from "../../utils/Common";
import services from "../../services/login";
import { useHistory } from "react-router-dom";
import useValues from "../../provider/useValues";
const LoginPage = () => {
  const { login, setAuthLoading } = useValues();
  const history = useHistory();
  const [signin, setSignIn] = useState({ usuario: "", contraseña: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const userLogged = {
      usuario: signin.usuario,
      contraseña: signin.contraseña,
    };
    const logged = await services.login(userLogged);
    if (logged) {
      setError(null);
      setUserSession(logged.token, logged.user);
      login(logged.user);
      setAuthLoading(false);
      history.push("/dashboard");
    } else {
      setLoading(false);
      setError("Something went wrong. please try again later.");
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
            {error && <div className="error">{error}</div>}
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
