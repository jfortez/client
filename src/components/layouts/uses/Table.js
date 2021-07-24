import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "../../../utils/values";
const Table = () => {
  const [pacientes, setPacientes] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const getPacientes = () => {
    axios
      .get(`${URL}/pacientes`)
      .then((response) => {
        setPacientes(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    console.log("pacientesEffect");
    getPacientes();
  }, [isListed]);
  const handleDelete = (id) => {
    setIsListed(false);
    axios
      .delete(`${URL}/pacientes/delete/${id}`)
      .then((response) => {
        console.log(response.data.message);
        setIsListed(true);
      })
      .catch((e) => console.log(e));
  };
  const handleUpdate = () => {
    console.log("actualizar paciente");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.id}</td>
              <td>{paciente.nombres}</td>
              <td>{paciente.apellidos}</td>
              <td>{paciente.telefono}</td>
              <td>{paciente.direccion}</td>
              <td>{paciente.edad}</td>
              <td>
                <button onClick={() => handleDelete(paciente.id)}>Eliminar</button>
                <Link to={`/dashboard/pacientes/${paciente.id}/edit`}>
                  <button onClick={() => handleUpdate()}>Actualizar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
