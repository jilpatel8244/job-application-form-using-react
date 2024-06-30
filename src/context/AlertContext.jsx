import { createContext, useContext, useState } from "react";
import Alert from "../components/commonComponents/Alert";

const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [alertOptions, setAlertOptions] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const fire = (options) => {
    return new Promise((resolve) => {
      setAlertOptions({
        ...options,
        resolve: (value) => {
          setShowAlert(false);
          resolve(value);
        },
      });
      setShowAlert(true);

      if (options.timeout) {
        setTimeout(() => {
          setShowAlert(false);
          resolve(true);
        }, options.timeout);
      }
    });
  };

  return (
    <AlertContext.Provider value={{ fire }}>
      {children}
      {showAlert && <Alert {...alertOptions} />}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useSwal must be used within a SwalProvider");
  }
  return context.fire;
};
