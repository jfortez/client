import { createContext, useState } from "react";
export const ValuesContext = createContext();
export default function ValuesProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const collapseSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const valueProvider = {
    isCollapsed,
    collapseSidebar,
  };
  return <ValuesContext.Provider value={valueProvider}>{children}</ValuesContext.Provider>;
}
