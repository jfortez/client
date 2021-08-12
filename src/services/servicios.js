import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/servicios`;

const getServicios = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getServiciosById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const getServiciosByCod = async (cod) => {
  const { data } = await Axios.post(`${baseUrl}/codigo`, cod);
  return data;
};
const createServicios = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const bajaServicios = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/baja/${id}`);
  return data;
};
const updateServicios = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getServicios,
  createServicios,
  bajaServicios,
  updateServicios,
  getServiciosByCod,
  getServiciosById,
  Axios,
};
