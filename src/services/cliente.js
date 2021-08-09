import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/clientes`;

const getClientes = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getClienteById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const getRUC = async (ruc) => {
  const { data } = await Axios.post(`${baseUrl}/ruc`, ruc);
  return data;
};
const createCliente = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const updateCliente = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};
const deleteCliente = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getClientes,
  createCliente,
  deleteCliente,
  Axios,
  getRUC,
  getClienteById,
  updateCliente,
};
