import Axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/categorias";

const getCategorias = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
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
export default { getCategorias, insertCategorias, deleteCategoria, Axios, optionCategorias };
