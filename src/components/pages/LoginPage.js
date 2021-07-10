import React, { useState } from "react";
import axios from "axios";

const LoginPage = (props) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/usuarios/login", { usuario, contraseña })
      .then((response) => {
        const loggedUser = response.data.result;
        if (usuario === "" || contraseña === "") {
          console.log("Usuario y Contraseña Vacíos");
        } else {
          if (loggedUser.length > 0) {
            props.history.push("/dashboard");
          } else {
            console.log("usuario o contraseña Incorrectos");
          }
        }
      })
      .catch((err) => console.log(err));
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
              <input
                type="submit"
                value="Login"
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
