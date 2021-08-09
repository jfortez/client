import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/cargo`;

const getCargo = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};
const optionCargo = async () => {
  const { data } = await Axios.get(baseUrl);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getCargo, Axios, optionCargo };
