import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/productos";

const getProductos = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getProductos };
