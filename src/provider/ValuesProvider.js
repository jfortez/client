import { createContext, useState } from "react";
export const ValuesContext = createContext();
export default function ValuesProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState([]);
  //logearse
  const login = (usr) => {
    setUser(usr);
  };
  const collapseSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const valueProvider = {
    isCollapsed,
    collapseSidebar,
    user,
    login,
  };
  return <ValuesContext.Provider value={valueProvider}>{children}</ValuesContext.Provider>;
}
