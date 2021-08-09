import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/empresa`;

const getEmpresa = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const optionEmpresa = async () => {
  const { data } = await Axios.get(baseUrl);
  return data;
};
const saveEmpresa = async (objectData, id) => {
  const { data } = await Axios.post(`${baseUrl}/update/${id}`, objectData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getEmpresa, saveEmpresa, Axios, optionEmpresa };
