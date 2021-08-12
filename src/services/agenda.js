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
const createAgenda = async (newData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, newData);
  return data;
};
const createColaAgenda = async (newData) => {
  const { data } = await Axios.post(`${colaAgenda}/create`, newData);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAgenda, Axios, createAgenda, createColaAgenda };
