import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/compras`;
const compraDetalle = `${Url}/comprasdetalle`;

const getCompras = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getComprasDetalleByIdCompras = async (src, id) => {
  const { data } = await Axios.get(`${compraDetalle}/${id}`, {
    cancelToken: src.token,
  });
  return data;
};
const bajaCompras = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/bajaCompra/${id}`);
  return data;
};
const createCompras = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const updateCompras = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};
const newCompraDetalle = async (values) => {
  const { data } = await Axios.post(`${compraDetalle}/createDetalleCompras`, values);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCompras,
  bajaCompras,
  createCompras,
  updateCompras,
  newCompraDetalle,
  getComprasDetalleByIdCompras,
  Axios,
};
