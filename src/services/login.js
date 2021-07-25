import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/usuarios/signin";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response;
};

export default { login };
