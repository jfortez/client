import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/receta`;

const getReceta = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const listReceta = async () => {
  const { data } = await Axios.get(baseUrl);
  return data;
};
const listRecetaById = async (id) => {
  const { data } = await Axios.get(`${baseUrl}/${id}`);
  return data;
};
const createReceta = async (newData) => {
  const { data } = await Axios.post(`${baseUrl}/create`, newData);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getReceta, listReceta, Axios, createReceta, listRecetaById };
