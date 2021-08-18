import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/productos`;

const getProductos = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const listProducts = async () => {
  const { data } = await Axios.get(baseUrl);
  return data;
};
const getProductosById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const test = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/test`, objectData);
  return data;
};
const bajaProductos = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/baja/${id}`);
  return data;
};
const updateByCompras = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/actualizarByCompras`, objectData);
  return data;
};
const getProductoByCod = async (cod) => {
  const { data } = await Axios.post(`${baseUrl}/cod`, cod);
  return data;
};
const updateProductos = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};
const createProductos = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const multipleCreateProd = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/createmultiple`, objectData);
  return data;
};
const deleteProductos = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getProductos,
  createProductos,
  deleteProductos,
  getProductoByCod,
  listProducts,
  getProductosById,
  bajaProductos,
  updateProductos,
  Axios,
  updateByCompras,
  multipleCreateProd,
  test,
};
