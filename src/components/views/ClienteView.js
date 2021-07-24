import React, { useEffect, useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import clienteService from "../../services/cliente";
const ClienteView = () => {
  const [clientes, setClientes] = useState([]);
  const getClientes = async () => {
    const cliente = await clienteService.getClientes();
    setClientes(cliente);
    console.log(cliente);
  };
  useEffect(() => {
    getClientes();
  }, []);
  return (
    <>
      <Topbar />
      <div className="wrapper">
        <h3>Clientes</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>RUC / Cedula</th>
              <th>Nombres Completos</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => {
              return (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.num_documento}</td>
                  <td>
                    {cliente.nombres} {cliente.apellidos}
                  </td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td>{new Date(cliente.fecha_registro).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClienteView;
