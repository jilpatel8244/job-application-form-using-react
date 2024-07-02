import { createContext, useEffect, useState } from "react";
import { initialFormData, initialFormErrorData } from "../data/data";

export const FormContext = createContext();

export default function FormProvider({ children }) {
    const [formData, setFormData] = useState(initialFormData);
    const [formErrorData, setFormErrorData] = useState(initialFormErrorData);
    
    function updateFormData(stepData) {
        setFormData((prevData) => {
          return {
            ...prevData,
            ...stepData,
          };
        });
      }

    return (
        <FormContext.Provider value={{formData, setFormData, formErrorData, setFormErrorData, updateFormData}}>
            {children}
        </FormContext.Provider>
    )
}