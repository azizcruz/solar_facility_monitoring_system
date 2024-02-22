import { useContext } from "react";
import { DialogContext } from "../context/dialog";

export function useDialog() {
  return useContext(DialogContext);
}
