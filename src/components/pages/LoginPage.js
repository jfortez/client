import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../../utils/Common";
import { URL } from "../../utils/values";
import useValues from "../../provider/useValues";
const LoginPage = (props) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useValues();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await axios
      .post(`${URL}/usuarios/signin`, {
        usuario,
        contraseña,
      })
      .then((response) => {
        setError(null);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/dashboard");
        login(response.data.user);
      })
      .catch((err) => {
        setLoading(false);
        if (error.response.status === 401 || error.response.status === 400) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong. please try again later.p");
        }
        console.error("error>>> ", error);
      });
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
                  value={usuario}
                  name="username"
                  className="form-control"
                  placeholder="Usuario"
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  value={contraseña}
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setContraseña(e.target.value)}
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
