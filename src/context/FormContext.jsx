import { createContext, useEffect, useState } from "react";
import { initialFormData, initialFormErrorData } from "../data/data";

export const FormContext = createContext();

export default function FormProvider({ children }) {
    const [formData, setFormData] = useState(initialFormData);
    const [formErrorData, setFormErrorData] = useState(initialFormErrorData);
    const [currentStep, setCurrentStep] = useState(1);
    const [validateOnChange, setValidateOnChange] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    function updateFormData(stepData) {
        setFormData((prevData) => {
          return {
            ...prevData,
            ...stepData,
          };
        });
      }

    return (
        <FormContext.Provider value={{currentStep, setCurrentStep, formData, setFormData, formErrorData, setFormErrorData, updateFormData, validateOnChange, setValidateOnChange, isPopupOpen, setIsPopupOpen}}>
            {children}
        </FormContext.Provider>
    )
}