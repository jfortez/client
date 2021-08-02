import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/usuarios";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
  GrupoInput,
  Label,
  Select,
  Option,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
import { Link } from "react-router-dom";
import personalServices from "../../services/personal";
// import odontologoServices from "../../services/odontologos";
const UsuarioCreate = () => {
  const { isCollapsed } = useValues();
  const [ci, setCi] = useState({ campo: "", valido: null });
  const [dataByCedula, setDataByCedula] = useState([]);
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [contraseña, setContraseña] = useState({ campo: "", valido: null });
  const [previlegios, setPrevilegios] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    password: /^.{4,12}$/, // 4 a 12 digitos.
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^\d{5,15}$/, // 9 a 14 numeros.
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      ci.valido === "true" &&
      usuario.valido === "true" &&
      contraseña.valido === "true" &&
      previlegios.campo > 0
    ) {
      const newUsuario = {
        cedula: ci.campo,
        usuario: usuario.campo,
        contraseña: contraseña.campo,
        previlegios: previlegios.campo,
      };
      // await services.createUsuarios(newUsuario);
      await personalServices.setIdUsuario(newUsuario); //da id_Usuario al Personal
      setFormValid(true);
      setUsuario({ campo: "", valido: null });
      setCi({ campo: "", valido: null });
      setContraseña({ campo: "", valido: null });
      setPrevilegios({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  useEffect(() => {
    const getDataByCedula = async () => {
      if (ci.campo.length > 0) {
        const personalBusqueda = await personalServices.getCiValidas();
        const cedula = personalBusqueda.filter((ced) => ced.cedula === ci.campo);
        if (cedula[0]) {
          const cedulaBuscado = await personalServices.getPersonalByCedula({ cedula: ci.campo }); //retorna solametne 1 objeto
          setDataByCedula(cedulaBuscado);
        }
      } else {
        setDataByCedula(null);
      }
    };
    getDataByCedula();
  }, [ci.campo]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Nuevo Usuario</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/Usuarios">Usuarios</Link>
              </li>
              <li>
                <b>Nuevo Usuario</b>
              </li>
            </ul>
          </nav>

          {dataByCedula ? <h3>Información Personal</h3> : null}
          {dataByCedula ? (
            dataByCedula.map((data) => {
              return (
                <ul key={data.id}>
                  <li>
                    <b>Nombres Completos:</b> {data.nombres} {data.apellidos}
                  </li>
                  <li>
                    <b>Cedula:</b> {data.cedula}
                  </li>
                  <li>
                    <b>¿Tiene Usuario?</b> {data.id_Usuario ? "si" : "no"}
                  </li>
                </ul>
              );
            })
          ) : ci.campo.length > 8 ? (
            <h5>
              No existe un elemento bajo el Ruc ingresado, ¿Desea Crear uno?,{" "}
              <Link to="/dashboard/personal/create">Crear Personal</Link> ó{" "}
              <Link to="/dashboard/odontologos/create">Crear Odontólogo</Link>
            </h5>
          ) : null}
          <Formulario onSubmit={onSubmit}>
            <ComponentInput
              state={ci} //value
              setState={setCi} //onChange
              title="Cedula"
              type="text"
              name="cedula"
              placeholder="Cedula"
              error="El campo es requerido y deben incluir numeros"
              expresion={expresiones.numero}
            />
            <ComponentInput
              state={usuario} //value
              setState={setUsuario} //onChange
              title="Usuario"
              type="text"
              name="usuario"
              placeholder="Usuario"
              error="El campo está incompleto"
              expresion={expresiones.usuario}
            />
            <ComponentInput
              state={contraseña} //value
              setState={setContraseña} //onChange
              title="Contraseña"
              type="text"
              name="contraseña"
              placeholder="Contraseña"
              error="El campo está incompleto"
              expresion={expresiones.password}
            />
            <br />
            <GrupoInput>
              <Label>Previlegios</Label>
              <Select
                value={previlegios.campo}
                onChange={(e) => setPrevilegios({ campo: e.target.value })}
              >
                <Option value="0">Seleccione</Option>
                <Option value="1">Super Admin</Option>
                <Option value="2">Admin</Option>
                <Option value="3">Básico</Option>
              </Select>
              <br />
            </GrupoInput>
            {/* Validacion */}
            {formValid === false && (
              <MensajeError>
                <p>
                  <Error />
                  <b>Error: </b> Por favor rellene el formulario correctamente
                </p>
              </MensajeError>
            )}
            <ContenedorBotonCentrado>
              <Boton type="submit">Crear</Boton>
            </ContenedorBotonCentrado>
          </Formulario>
        </div>
      </div>
    </>
  );
};

export default UsuarioCreate;
