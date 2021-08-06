import Axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/configuraciones";

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
