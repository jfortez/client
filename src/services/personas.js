import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/personas`;

const getCedulas = async () => {
  const { data } = await Axios.get(`${baseUrl}/ci`);
  return data;
};

const getOdontologosByCedula = async (cedula) => {
  const { data } = await Axios.post(`${baseUrl}/ciOdontologo`, cedula);
  return data;
};

const getPersonalByCedula = async (cedula) => {
  const { data } = await Axios.post(`${baseUrl}/ciPersonal`, cedula);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getCedulas, getOdontologosByCedula, getPersonalByCedula };
