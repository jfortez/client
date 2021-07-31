import axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/cargo";

const getCargo = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCargo };
