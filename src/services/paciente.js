import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/pacientes`;

const getPacientes = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const getPacientesById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/paciente/${id}`);
  return data;
};
const listPacientesByCed = async (cedula) => {
  const { data } = await Axios.post(`${baseUrl}/paciente/ced`, cedula);
  return data;
};
const updatePacientes = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};
const createPacientes = async (objectData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, objectData);
  return data;
};
const bajaPacientes = async (id) => {
  const { data } = await Axios.post(`${baseUrl}/baja/${id}`);
  return data;
};
const deletePacientes = async (id) => {
  const { data } = await Axios.delete(`${baseUrl}/delete/${id}`);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPacientes,
  createPacientes,
  deletePacientes,
  listPacientesByCed,
  bajaPacientes,
  getPacientesById,
  updatePacientes,
  Axios,
};
