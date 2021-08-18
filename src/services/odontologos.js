import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/odontologos`;

const getOdontologos = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getOdontologosById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const listOdontologoByCed = async (ced) => {
  const { data } = await Axios.post(`${baseUrl}/cedula`, ced);
  return data;
};
const createOdontologo = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const bajaOdontologo = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/baja/${id}`);
  return data;
};
const deleteOdontologo = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
const setIdUsuario = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/setUser`, objectData);
  return data;
};
const updateOdontologo = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getOdontologos,
  createOdontologo,
  deleteOdontologo,
  setIdUsuario,
  bajaOdontologo,
  listOdontologoByCed,
  getOdontologosById,
  updateOdontologo,
  Axios,
};
