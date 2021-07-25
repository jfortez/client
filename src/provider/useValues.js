import { useContext } from "react";
import { ValuesContext } from "./ValuesProvider";
export default function useValues() {
  return useContext(ValuesContext);
}
