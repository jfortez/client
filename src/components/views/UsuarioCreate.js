import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
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
import { Link, useLocation, useParams } from "react-router-dom";
import personalServices from "../../services/personal";
import personas from "../../services/personas";
import odontologoServices from "../../services/odontologos";
import services from "../../services/usuarios";
const UsuarioCreate = () => {
  const { isCollapsed } = useValues();
  const [ci, setCi] = useState({ campo: "", valido: null });
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
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
  const { id } = useParams();
  const idUser = id;
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/usuarios/${idUser}/edit`) {
      setIsEditing(true);
      const getProveedoresById = async () => {
        const usuarios = await services.getUsersById(idUser);
        const { id, usuario, contraseña, previlegios } = usuarios[0];
        setElementId(id);
        setUsuario({ campo: usuario, valido: null });
        setContraseña({ campo: contraseña, valido: null });
        setPrevilegios({ campo: previlegios, valido: null });
      };
      getProveedoresById();
    }
  }, [idUser, pathname]);
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
      if (dataByCedula !== null) {
        if (dataByCedula[0].id_Personal) {
          await personalServices.setIdUsuario(newUsuario); //da id_Usuario al Personal
        } else {
          await odontologoServices.setIdUsuario(newUsuario); //da id_Usuario al Odontologo
        }
      }
      setFormValid(true);
      setUsuario({ campo: "", valido: null });
      setCi({ campo: "", valido: null });
      setContraseña({ campo: "", valido: null });
      setPrevilegios({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updateData = {
      usuario: usuario.campo,
      contraseña: contraseña.campo,
      previlegios: previlegios.campo,
    };
    await services.updateUsuarios(updateData, elementId);
    setUsuario({ ...usuario, valido: null });
    setContraseña({ ...contraseña, valido: null });
    setPrevilegios({ ...previlegios, valido: null });
  };
  useEffect(() => {
    const getDataByCedula = async () => {
      if (ci.campo.length > 0) {
        const personalBusqueda = await personas.getCedulas();
        const cedula = personalBusqueda.filter((ced) => ced.cedula === ci.campo);
        if (cedula[0]) {
          if (cedula[0].id_Personal) {
            const cedulaBuscado = await personas.getPersonalByCedula({ cedula: ci.campo }); //retorna solametne 1 objeto
            setDataByCedula(cedulaBuscado);
          } else {
            const cedulaBuscado = await personas.getOdontologosByCedula({ cedula: ci.campo }); //retorna solametne 1 objeto
            setDataByCedula(cedulaBuscado);
          }
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
        {isEditing ? <h1>Editar Usuario</h1> : <h1>Nuevo Usuario</h1>}

        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/Usuarios">Usuarios</Link>
              </li>
              <li>{isEditing ? <b>Editar Usuario</b> : <b>Nuevo Usuario</b>}</li>
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
          ) : ci.campo.length > 9 ? (
            <h5>
              No existe un elemento bajo el Ruc ingresado, ¿Desea Crear uno?,{" "}
              <Link to="/dashboard/personal/create">Crear Personal</Link> ó{" "}
              <Link to="/dashboard/odontologos/create">Crear Odontólogo</Link>
            </h5>
          ) : null}
          <Formulario onSubmit={isEditing ? handleUpdate : onSubmit}>
            {isEditing ? null : (
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
            )}
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
            {isEditing ? null : <br />}
            <GrupoInput>
              <Label>Previlegios</Label>
              <Select
                value={previlegios.campo}
                onChange={(e) => setPrevilegios({ campo: e.target.value })}
              >
                <Option value="0">Seleccione</Option>
                <Option value="1">Admin</Option>
                <Option value="2">Odontologo</Option>
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
              {isEditing ? (
                <Boton type="submit">Actualizar</Boton>
              ) : (
                <Boton type="submit">Crear</Boton>
              )}
            </ContenedorBotonCentrado>
          </Formulario>
        </div>
      </div>
    </>
  );
};

export default UsuarioCreate;
