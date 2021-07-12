import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../../utils/Common";

const LoginPage = (props) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    await axios
      .post("http://localhost:5000/api/usuarios/signin", {
        usuario,
        contraseña,
      })
      .then((response) => {
        setError(null);
        setUserSession(response.data.token, response.data.user);
        console.log("response>>> ", response);
        props.history.push("/dashboard");
        // const loggedUser = response.data.result;
        // if (usuario === "" || contraseña === "") {
        //   console.log("Usuario y Contraseña Vacíos");
        // } else {
        //   if (loggedUser.length > 0) {
        //     props.history.push("/dashboard");
        //   } else {
        //     console.log("usuario o contraseña Incorrectos");
        //   }
        // }
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
            <form>
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
                type="button"
                value={loading ? "Loading..." : "Login"}
                disabled={loading}
                onClick={handleLogin}
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
