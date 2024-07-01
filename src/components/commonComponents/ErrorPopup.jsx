import { createPortal } from "react-dom";
import { stepDetails } from "../../data/data";
import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import convertCamelCaseToTitleCase from "../../utiils/convertCamelCaseToTitleCase";
import getOrdinalSuffix from "../../utiils/getOrdinalSuffix";

function ErrorPopup({ currentStep, onClose }) {
  const { formErrorData } = useContext(FormContext);

  let errorMessages = [];
  switch (currentStep) {
    case 1:
      errorMessages = Object.entries(formErrorData.basicDetails).map(
        ([key, value]) => {
          return (
            value?.errorStatus && (
              <li key={key} className="text-red-600">
                {`${value?.title}`}
              </li>
            )
          );
        }
      );
      break;
    case 2:
      errorMessages = Object.entries(formErrorData.educationDetails).map(
        ([educationLevel, details]) => {
          console.log(details);
          return Object.entries(details).map(([key, value]) => {
            return (
              value?.errorStatus && (
                <li key={key} className="text-red-600">
                  {`In ${educationLevel.toUpperCase()}, ${convertCamelCaseToTitleCase(
                    key
                  )} is ${value?.title}`}
                </li>
              )
            );
          });
        }
      );
      break;
    case 3:
      formErrorData.technologyKnown?.errorStatus &&
        errorMessages.push(
          <li className="text-red-600">
            {formErrorData?.technologyKnown?.title}
          </li>
        );
      break;
    case 4:
      formErrorData.languageKnown?.errorStatus &&
        errorMessages.push(
          <li className="text-red-600">
            {formErrorData?.languageKnown?.title}
          </li>
        );
      break;

    case 5:
      let idToIndexMapForWorkExp = {};

      // Extract field names and ids
      for (const key in formErrorData.workExperiences) {
        if (formErrorData.workExperiences[key].errorStatus) {
          const [fieldName, id] = key.split("_");

          // Map each unique id to a work experience index
          if (!idToIndexMapForWorkExp[id]) {
            idToIndexMapForWorkExp[id] = Object.keys(idToIndexMapForWorkExp).length + 1;
          }

          const workExperienceIndex = idToIndexMapForWorkExp[id];
          const ordinalIndex = getOrdinalSuffix(workExperienceIndex);

          // Add error message to the array
          errorMessages.push(
            <li
              key={key}
              className="text-red-600"
            >{`In ${ordinalIndex} work experience, ${convertCamelCaseToTitleCase(
              fieldName
            )} is ${formErrorData.workExperiences[key].title}`}</li>
          );
        }
      }
      break;
    case 6:
      let idToIndexMapForReference = {};

      // Extract field names and ids
      for (const key in formErrorData.referenceDetails) {
        if (formErrorData.referenceDetails[key].errorStatus) {
          const [fieldName, id] = key.split("_");

          // Map each unique id to a work experience index
          if (!idToIndexMapForReference[id]) {
            idToIndexMapForReference[id] = Object.keys(idToIndexMapForReference).length + 1;
          }

          const referenceIndex = idToIndexMapForReference[id];
          const ordinalIndex = getOrdinalSuffix(referenceIndex);

          // Add error message to the array
          errorMessages.push(
            <li
              key={key}
              className="text-red-600"
            >{`In ${ordinalIndex} reference, ${convertCamelCaseToTitleCase(
              fieldName
            )} is ${formErrorData.referenceDetails[key].title}`}</li>
          );
        }
      }
      break;

    default:
      break;
  }

  console.log(formErrorData[stepDetails[currentStep]?.name]);

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
