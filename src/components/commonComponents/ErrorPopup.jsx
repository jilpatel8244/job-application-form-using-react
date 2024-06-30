import { createPortal } from "react-dom";
import { stepDetails } from "../../data/data";
import { useContext } from "react";
import { FormContext } from "../../context/FormContext";

function ErrorPopup({ currentStep, onClose }) {
  const {formErrorData} = useContext(FormContext);

  console.log(formErrorData[stepDetails[currentStep]?.name]);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Errors</h2>
        <ul className="list-disc pl-5">
          {
            Object.entries(formErrorData[stepDetails[currentStep]?.name]).map(([key, value]) => {
              return (
                value?.errorStatus && <li key={key} className="text-red-600">{key} : {value?.title}</li>
              )
            })
          }
        </ul>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("popup")
  );
}

export default ErrorPopup;
