import Axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/usuarios";

const getUsuarios = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};

const createUsuarios = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};

const deleteUsuarios = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getUsuarios, createUsuarios, deleteUsuarios, Axios };
