import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/cita`;

const getCitas = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getCitasByIdAgenda = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const createCita = async (newData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, newData);
  return data;
};
const updateCita = async (newData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, newData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCitas, Axios, createCita, getCitasByIdAgenda, updateCita };
