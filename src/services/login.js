import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/usuarios";

const login = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/signin`, credentials);
  return data;
};

const verifytoken = async (token) => {
  const { data } = await axios.get(`${baseUrl}/verifytoken?token=${token}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { login, verifytoken };
