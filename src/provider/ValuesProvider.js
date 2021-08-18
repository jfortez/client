import { createContext, useEffect, useState } from "react";
import { getToken, removeUserSession, setUserSession } from "../utils/Common";
import services from "../services/login";
import valuesServices from "../services/values";
export const ValuesContext = createContext();
export default function ValuesProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  //Ventas
  const [datosVentas, setDatosVentas] = useState({ cliente: [], producto: [] });
  const [types, setTypes] = useState({ ruc: "", cod_producto: "", cantidad: 1, importe: 0 });
  const [productosVenta, setProductosVenta] = useState([]);
  const [detalleVenta, setDetalleVenta] = useState([]);
  //Compras
  const [comprasValues, setComprasValues] = useState({
    ruc_proveedor: "",
    fecha: "",
    num_factura: "",
  });
  const [productosCompras, setProductosCompras] = useState([]);
  const [compraDetalle, setCompraDetalle] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  //Agenda
  const [id_agenda, setId_agenda] = useState(0);
  //Globales
  const [values, setValues] = useState([]);
  //logearse
  const login = (usr) => {
    setUser(usr);
  };
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    const verifyToken = async (token) => {
      const verify = await services.verifytoken(token);
      if (verify) {
        setUserSession(verify.token, verify.user);
        setUser(verify.user);
        setAuthLoading(false);
      } else {
        removeUserSession();
        setAuthLoading(true);
        console.log("token no verificado");
      }
    };
    verifyToken(token);
  }, []);
  useEffect(() => {
    const getValues = async () => {
      const numValues = await valuesServices.getValues();
      setValues(numValues[0]);
    };
    getValues();
  }, []);
  const logout = () => {
    setUser(null);
  };
  const collapseSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const valueProvider = {
    isCollapsed,
    collapseSidebar,
    user,
    login,
    logout,
    authLoading,
    setAuthLoading,
    datosVentas,
    setDatosVentas,
    types,
    setTypes,
    productosVenta,
    setProductosVenta,
    detalleVenta,
    setDetalleVenta,
    comprasValues,
    setComprasValues,
    productosCompras,
    setProductosCompras,
    compraDetalle,
    setCompraDetalle,
    proveedor,
    setProveedor,
    id_agenda,
    setId_agenda,
    values,
    setValues,
  };
  return <ValuesContext.Provider value={valueProvider}>{children}</ValuesContext.Provider>;
}
