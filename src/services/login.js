import axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/usuarios`;

const login = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/signin`, credentials);
  return data;
};

const verifiyUser = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/verifyUser`, credentials);
  return data;
};
const verifytoken = async (token) => {
  const { data } = await axios.get(`${baseUrl}/verifytoken?token=${token}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { login, verifytoken, verifiyUser };
