import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/personal";
let source = axios.CancelToken.source();

const getPersonal = async () => {
  const { data } = await axios.get(baseUrl, {
    cancelToken: source.token,
  });
  return data;
};

const createPersonal = async (objectData) => {
  const { data } = await axios.post(`${baseUrl}/create`, objectData);
  return data;
};

const deletePersonal = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getPersonal, createPersonal, deletePersonal, source, axios };
