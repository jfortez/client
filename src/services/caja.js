import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/caja`;
const movimientos = `${Url}/cajamovimientos`;

const getCaja = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getCajaByMaxId = async () => {
  const { data } = await Axios.get(`${baseUrl}/max`);
  return data;
};
const getCajaMovimientos = async (src) => {
  const { data } = await Axios.get(movimientos);
  return data;
};
const getCajaMovimientosByIdCaja = async (src, id) => {
  const { data } = await Axios.get(`${movimientos}/${id}`, {
    cancelToken: src.token,
  });
  return data;
};
const cierreCaja = async (newData) => {
  const { data } = await Axios.post(`${baseUrl}/cierrecaja`, newData);
  return data;
};
const createCaja = async (newData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, newData);
  return data;
};
const updateCaja = async (newData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, newData);
  return data;
};
const nuevoMovimiento = async (newData) => {
  const { data } = await Axios.post(`${movimientos}/create`, newData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCaja,
  getCajaByMaxId,
  getCajaMovimientos,
  getCajaMovimientosByIdCaja,
  cierreCaja,
  nuevoMovimiento,
  updateCaja,
  Axios,
  createCaja,
};
