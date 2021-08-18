import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/personal`;

const getPersonal = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};

const getPersonalById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};

const createPersonal = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const bajaPersonal = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/baja/${id}`);
  return data;
};
const setIdUsuario = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/setUser`, objectData);
  return data;
};
const deletePersonal = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};

const updatePersonal = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPersonal,
  createPersonal,
  deletePersonal,
  getPersonalById,
  updatePersonal,
  bajaPersonal,
  setIdUsuario,
  Axios,
};
