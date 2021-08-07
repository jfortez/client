import Axios from "axios";
const baseUrl = "http://192.168.0.104:5000/api/ventas";
const ventaDetalle = "http://192.168.0.104:5000/api/ventasdetalle";

const getVentas = async () => {
  const { data } = await Axios.get(`${baseUrl}`);
  return data;
};
const newVenta = async (values) => {
  const { data } = await Axios.post(`${baseUrl}/create`, values);
  return data;
};

const newVentaDetalle = async (values) => {
  const { data } = await Axios.post(`${ventaDetalle}/create`, values);
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getVentas, newVenta, newVentaDetalle };
