import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/ventas`;
const ventaDetalle = `${Url}/ventasdetalle`;

const getVentas = async () => {
  const { data } = await Axios.get(`${baseUrl}`);
  return data;
};
const getReporteVentas = async (src) => {
  const { data } = await Axios.get(`${baseUrl}/reporteVentas`, {
    cancelToken: src.token,
  });
  return data;
};
const getReporteDetalleVentas = async (src, id) => {
  const { data } = await Axios.get(`${baseUrl}/reporteDetalleVenta/${id}`, {
    cancelToken: src.token,
  });
  return data;
};
const newVenta = async (values) => {
  const { data } = await Axios.post(`${baseUrl}/create`, values);
  return data;
};

const newVentaDetalle = async (values) => {
  const { data } = await Axios.post(`${ventaDetalle}/create`, values);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getVentas,
  newVenta,
  newVentaDetalle,
  getReporteVentas,
  getReporteDetalleVentas,
  Axios,
};
