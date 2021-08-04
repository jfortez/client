import Axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/clientes";

const getClientes = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
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

const deleteCliente = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getClientes, createCliente, deleteCliente, Axios, getRUC };
