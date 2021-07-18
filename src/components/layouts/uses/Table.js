import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Table = () => {
  const [pacientes, setPacientes] = useState([]);
  // const [listUpdate, setListUpdate] = useState(false);
  const getPacientes = () => {
    axios
      .get("http://localhost:5000/api/pacientes")
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => console.error(error));
  };
  getPacientes();
  // useEffect(() => {
  //   getPacientes();
  //   // setListUpdate(false);
  // }, []);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/pacientes/delete/${id}`)
      .then((response) => {
        console.log(response.data.message);
      });
    getPacientes();
    // setListUpdate(true);
  };
  const handleUpdate = () => {
    console.log("actualizar paciente");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
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
              <td>{paciente.nombres}</td>
              <td>{paciente.apellidos}</td>
              <td>{paciente.telefono}</td>
              <td>{paciente.direccion}</td>
              <td>{paciente.edad}</td>
              <td>
                <button onClick={() => handleDelete(paciente.id)}>
                  Eliminar
                </button>
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
