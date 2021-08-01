import { createContext, useEffect, useState } from "react";
import { getToken, removeUserSession, setUserSession } from "../utils/Common";
import services from "../services/login";
export const ValuesContext = createContext();
export default function ValuesProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
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
  };
  return <ValuesContext.Provider value={valueProvider}>{children}</ValuesContext.Provider>;
}
