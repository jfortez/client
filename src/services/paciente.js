import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/pacientes";

const getPacientes = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const createPacientes = async (objectData) => {
  const { data } = await axios.post(`${baseUrl}/create`, objectData);
  return data;
};

const deletePacientes = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getPacientes, createPacientes, deletePacientes };
