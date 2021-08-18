import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/usuarios`;

const getUsuarios = async (src) => {
  const { data } = await Axios.get(`${baseUrl}/`, {
    cancelToken: src.token,
  });
  return data;
};
const getUsersInUse = async () => {
  const { data } = await Axios.get(`${baseUrl}/all`);
  return data;
};
const getUsersById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const createUsuarios = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const bajaUsuarios = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/baja/${id}`);
  return data;
};
const activarUsuario = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/activar/${id}`);
  return data;
};
const deleteOdUsuario = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/deleteO/${id}`);
  return data;
};
const deletePerUsuario = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/deleteP/${id}`);
  return data;
};
const updateUsuarios = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsuarios,
  createUsuarios,
  deleteOdUsuario,
  bajaUsuarios,
  getUsersById,
  activarUsuario,
  updateUsuarios,
  deletePerUsuario,
  getUsersInUse,
  Axios,
};
