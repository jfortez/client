import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/permisomedico`;

const getPermisos = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};

const createPermisos = async (newData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, newData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPermisos, Axios, createPermisos };
