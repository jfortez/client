import Axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/usuarios";

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
const createUsuarios = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
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
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsuarios,
  createUsuarios,
  deleteOdUsuario,
  deletePerUsuario,
  getUsersInUse,
  Axios,
};
