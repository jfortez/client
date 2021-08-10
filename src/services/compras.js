import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/compras`;

const getCompras = async (src) => {
  const { data } = await Axios.get(baseUrl, {
    cancelToken: src.token,
  });
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCompras, Axios };
