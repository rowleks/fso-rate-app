import { useContext } from "react";
import AuthStorageContext from "../context/AuthStorageContext";

const useAuthStorage = () => {
  const context = useContext(AuthStorageContext);
  if (!context) {
    throw new Error(
      "useAuthStorage must be used within an AuthStorageProvider",
    );
  }
  return context;
};

export default useAuthStorage;
