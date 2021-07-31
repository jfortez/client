import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/usuarios";

const getUsuarios = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const createUsuarios = async (objectData) => {
  const { data } = await axios.post(`${baseUrl}/create`, objectData);
  return data;
};

const deleteUsuarios = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getUsuarios, createUsuarios, deleteUsuarios };