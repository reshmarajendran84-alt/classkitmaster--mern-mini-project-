// src/components/context/useAdmin.js
import { useContext } from "react";
import AdminContext from "./AdminContext";

export const useAdmin = () => useContext(AdminContext);
