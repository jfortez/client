import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/categorias";

const getCategorias = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const insertCategorias = async (newData) => {
  const { data } = await axios.post(`${baseUrl}/create`, newData);
  return data;
};

const deleteCategoria = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCategorias, insertCategorias, deleteCategoria };
