import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/empresa";

const getEmpresa = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const saveEmpresa = async (objectData, id) => {
  const { data } = await axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getEmpresa, saveEmpresa };
