import Axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/odontologos";

const getOdontologos = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};

const createOdontologo = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const deleteOdontologo = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
const setIdUsuario = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/setUser`, objectData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getOdontologos, createOdontologo, deleteOdontologo, setIdUsuario, Axios };
