import { createPortal } from "react-dom";
import { stepDetails } from "../../data/data";
import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import convertCamelCaseToTitleCase from "../../utiils/convertCamelCaseToTitleCase";
import getOrdinalSuffix from "../../utiils/getOrdinalSuffix";

function ErrorPopup({ error, onClose }) {
  const { formErrorData } = useContext(FormContext);

  console.log(error);

  let errorMessages = [];
  // switch (currentStep) {
  //   case 1:
  //   case 7:
  //     errorMessages = Object.entries(formErrorData[stepDetails[currentStep]?.name]).map(
  //       ([key, value]) => {
  //         return (
  //           value?.errorStatus && (
  //             <li key={key} className="text-red-600">
  //               {`${value?.title}`}
  //             </li>
  //           )
  //         );
  //       }
  //     );
  //     break;
  //   case 2:
  //     errorMessages = Object.entries(formErrorData.educationDetails).map(
  //       ([educationLevel, details]) => {
  //         return Object.entries(details).map(([key, value]) => {
  //           return (
  //             value?.errorStatus && (
  //               <li key={key} className="text-red-600">
  //                 {`In ${educationLevel.toUpperCase()}, ${convertCamelCaseToTitleCase(
  //                   key
  //                 )} is ${value?.title}`}
  //               </li>
  //             )
  //           );
  //         });
  //       }
  //     );
  //     break;
  //   case 3:
  //   case 4:
  //     formErrorData[stepDetails[currentStep]?.name]?.errorStatus &&
  //       errorMessages.push(
  //         <li key={1} className="text-red-600">
  //           {formErrorData[stepDetails[currentStep]?.name]?.title}
  //         </li>
  //       );
  //     break;
  //   case 5:
  //   case 6:
  //     let idToIndexMap = {};

  //     // Extract field names and ids
  //     for (const key in formErrorData[stepDetails[currentStep]?.name]) {
  //       if (formErrorData[stepDetails[currentStep]?.name][key].errorStatus) {
  //         const [fieldName, id] = key.split("_");

  //         // Map each unique id to a work experience index
  //         if (!idToIndexMap[id]) {
  //           idToIndexMap[id] = Object.keys(idToIndexMap).length + 1;
  //         }

  //         const index = idToIndexMap[id];
  //         const ordinalIndex = getOrdinalSuffix(index);

  //         // Add error message to the array
  //         errorMessages.push(
  //           <li
  //             key={key}
  //             className="text-red-600"
  //           >{`In ${ordinalIndex} ${stepDetails[currentStep]?.title}, ${convertCamelCaseToTitleCase(
  //             fieldName
  //           )} is ${formErrorData[stepDetails[currentStep]?.name][key].title}`}</li>
  //         );
  //       }
  //     }
  //     break;

  //   default:
  //     break;
  // }

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Errors</h2>
        <ul className="list-disc pl-5">{errorMessages}</ul>
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
