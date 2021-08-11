import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/proveedores`;

const getProveedores = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getProveedoresbyId = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const getProveedorByRUC = async (ruc) => {
  const { data } = await Axios.post(`${baseUrl}/proveedorruc`, ruc);
  return data;
};
const createProveedores = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const deleteProveedor = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
const bajaProveedor = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/bajaProveedor/${id}`);
  return data;
};
const updateProveedor = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getProveedores,
  createProveedores,
  deleteProveedor,
  bajaProveedor,
  updateProveedor,
  getProveedoresbyId,
  getProveedorByRUC,
  Axios,
};
