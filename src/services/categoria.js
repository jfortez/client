import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/categorias`;

const getCategorias = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getCategoriasById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const optionCategorias = async () => {
  const { data } = await Axios.get(baseUrl);
  return data;
};
const insertCategorias = async (newData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, newData);
  return data;
};

const deleteCategoria = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCategorias,
  insertCategorias,
  deleteCategoria,
  Axios,
  optionCategorias,
  getCategoriasById,
};
