import React, { useState } from "react";
import { setUserSession } from "../../utils/Common";
import services from "../../services/login";
import { useHistory } from "react-router-dom";
import useValues from "../../provider/useValues";
const LoginPage = () => {
  const { login } = useValues();
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
      history.push("/dashboard");
    } else {
      setLoading(false);
      setError("Something went wrong. please try again later.");
    }
  };

  return (
    <>
      <div className="container-md mt-4">
        <div className="card">
          <div className="card-head">
            <h1>Login</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  value={signin.usuario}
                  name="contraseña"
                  className="form-control"
                  placeholder="Usuario"
                  onChange={(e) => setSignIn({ ...signin, usuario: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  value={signin.contraseña}
                  // type="password"
                  name="contraseña"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setSignIn({ ...signin, contraseña: e.target.value })}
                />
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
    </>
  );
};

export default LoginPage;
