import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/productos";

const getProductos = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};
const createProductos = async (objectData) => {
  const { data } = await axios.post(`${baseUrl}/create`, objectData);
  return data;
};

const deleteProductos = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getProductos, createProductos, deleteProductos };
