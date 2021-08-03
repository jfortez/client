import Axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/personal";

const getPersonal = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};

const createPersonal = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
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

const updatePersonal = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/update/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPersonal,
  createPersonal,
  deletePersonal,
  // getPersonalByCedula,
  // getCiValidas,
  updatePersonal,
  setIdUsuario,
  Axios,
};
