import Axios from "axios";
import Url from "../utils/Url";
const baseUrl = `${Url}/configuraciones`;

const getValues = async () => {
  const { data } = await Axios.get(`${baseUrl}/numValues`);
  return data;
};
const updateValues = async (values) => {
  const { data } = await Axios.post(`${baseUrl}/updateValues`, values);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getValues, updateValues };
