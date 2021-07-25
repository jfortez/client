import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/clientes";

const getClientes = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getClientes };
