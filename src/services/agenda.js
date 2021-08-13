import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/agenda`;
const colaAgenda = `${Url}/colaagenda`;

const getAgenda = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getAgendaById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const getAgendaByResponsable = async (src, id) => {
  const { data } = await Axios.get(`${baseUrl}/odontologo/${id}`, {
    cancelToken: src.token,
  });
  return data;
};
const estadoAgenda = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/estadoagenda/${id}`, objectData);
  return data;
};

const createAgenda = async (newData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, newData);
  return data;
};
const createColaAgenda = async (newData) => {
  const { data } = await Axios.post(`${colaAgenda}/create`, newData);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAgenda,
  Axios,
  createAgenda,
  estadoAgenda,
  createColaAgenda,
  getAgendaById,
  getAgendaByResponsable,
};
