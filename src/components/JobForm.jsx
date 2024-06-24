import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import BasicDetails from "./Step1-BasicDetails";
import EducationDetails from "./Step2-EducationalDetails";
import TechnologyKnown from "./Step3-TechnologyKnown";
import LanguageKnown from "./Step4-LanguageKnown";
import WorkExperience from "./Step5-WorkExperience";
import ReferenceDetails from "./Step6-ReferenceDetails";
import Preferences from "./Step7-Preferences";
import { initialFormData, initialFormErrorData, languageKnown, stepDetails } from "../helper/data";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import formFields from "../helper/formValidationData";

function JobForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage('users');
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [formErrorData, setFormErrorData] = useState(initialFormErrorData)
  const [validateOnChange, setValidateOnChange] = useState(false);

  useEffect(() => {
    if (localStorageValue?.length) {
      setFormData(...localStorageValue);
    }
  }, [localStorageValue])

  useEffect(() => {
    if (validateOnChange) {
      switch (currentStep) {
        case 1:
          validateBasicDetails()
          break;
        case 2:
          validateEducationDetails()
          break;
        case 3:
          validateTechnologyKnown()
          break;
        case 4:
          validateLanguageKnown()
          break;
        case 5:
          validateWorkExperience()
          break;

        default:
          break;
      }
    }
  }, [formData]);

  function validateBasicDetails() {
    let validate = true;
    formFields.forEach((field) => {
      let value = formData.basicDetails[field.name];

      let errorStatus = false;
      let fieldName = field.name;
      let errorTitle;

      field.rules.forEach((rule) => {
        if (
          rule === "required" &&
          (typeof value === "object" ? !value?.length : !value?.trim().length)
        ) {
          validate = false;
          errorStatus = true;
          fieldName = field.name;
          errorTitle = "field is required !";
        }
      });
      setFormErrorData((prevData) => {
        return {
          ...prevData,
          basicDetails: {
            ...prevData.basicDetails,
            [fieldName]: {
              errorStatus: errorStatus,
              title: errorTitle
            }
          }
        };
      });
    });

    return validate;
  }

  function validateEducationDetails() {
    let validate = true;

    for (const [key, value] of Object.entries(formData.educationDetails)) {

      let filteredArr = Object.entries(value).filter((childElement) => {
        let [key, value] = childElement;

        return !value
      })

      let errorStatus = false;
      let title = "";

      if (filteredArr.length !== 0 && filteredArr.length !== Object.entries(value).length) {
        validate = false;
        filteredArr.forEach((element) => {
          if (!element[1]) {
            errorStatus = true;
            title = "its required !"
            setFormErrorData((prevData) => {
              return {
                ...prevData,
                educationDetails: {
                  ...prevData.educationDetails,
                  [key]: {
                    ...prevData.educationDetails[key],
                    [element[0]]: {
                      errorStatus: errorStatus,
                      title: title
                    }
                  }
                }
              }
            })
          }
        })
      }
    }

    return validate;
  }

  function validateTechnologyKnown() {
    let validate = true;

    console.log(formData.technologyKnown);

    for (const [key, value] of Object.entries(formData.technologyKnown)) {
      setFormErrorData((prevData) => {
        return {
          ...prevData,
          technologyKnown: {
            ...prevData.technologyKnown,
            [key]: {
              errorStatus: false,
              title: ""
            }
          }
        }
      })

      if (value.selected) {
        if (!value.level) {
          validate = false;
          setFormErrorData((prevData) => {
            return {
              ...prevData,
              technologyKnown: {
                ...prevData.technologyKnown,
                [key]: {
                  errorStatus: true,
                  title: "please select level"
                }
              }
            }
          })
        }
      }
    }

    return validate;
  }

  function validateLanguageKnown() {
    let validate = true;

    for (const [key, value] of Object.entries(formData.languageKnown)) {
      let errorStatus = false;
      let title = "";
      if (value.selected) {
        let atleastOneSelected = false;
        for (const [childKey, childValue] of Object.entries(value)) {
          if (childValue.read || childValue.write || childValue.speak) {
            atleastOneSelected = true;
          }
        }
        if (!atleastOneSelected) {
          validate = false;
          errorStatus = true;
          title = "please selct one"
        }
      }
      setFormErrorData((prevData) => {
        return {
          ...prevData,
          languageKnown: {
            ...prevData.languageKnown,
            [key]: {
              errorStatus: errorStatus,
              title: title
            }
          }
        }
      })
    }

    return validate;
  }

  function validateWorkExperience() {
    let validate = true;

    console.log(formData.workExperiences);

    for (const [key, value] of Object.entries(formData.workExperiences)) {
      
    }

    return false;
  }

  function nextBtnHandler() {
    setValidateOnChange(true);

    let validateStatus = true;
    switch (currentStep) {
      case 1:
        validateStatus = validateBasicDetails()
        break;
      case 2:
        validateStatus = validateEducationDetails()
        break;
      case 3:
        validateStatus = validateTechnologyKnown()
        break;
      case 4:
        validateStatus = validateLanguageKnown()
        break;
      case 5:
        validateStatus = validateWorkExperience()

      default:
        break;
    }
    if (validateStatus) {
      setValidateOnChange(false);
      setCurrentStep(currentStep + 1);
    }
  }

  function prevBtnHandler() {
    setCurrentStep(currentStep - 1);
  }

  function updateFormData(stepData) {
    setFormData((prevData) => {
      return {
        ...prevData,
        ...stepData,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);

    let users = localStorage.getItem('users');

    if (users) {
      users = JSON.parse(localStorage.getItem('users'));
    } else {
      users = [];
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("user stored successfully");
    navigate('/list-users');
  }

  function handleUpdate(event) {
    event.preventDefault();
    console.log(formData);

    let users = JSON.parse(localStorage.getItem('users'));

    let updatedUsers = users.map((user) => {
      if (user.id === formData.id) {
        user = { ...formData }
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log("user updated successfully");
    navigate('/list-users');
  }

  let component;

  switch (currentStep) {
    case 1:
      component = (
        <BasicDetails
          basicDetails={formData.basicDetails}
          basicDetailsError={formErrorData.basicDetails}
          updateFormData={updateFormData}
        />
      );
      break;
    case 2:
      component = (
        <EducationDetails
          educationDetails={formData.educationDetails}
          educationDetailsError={formErrorData.educationDetails}
          updateFormData={updateFormData}
        />
      );
      break;
    case 3:
      component = (
        <TechnologyKnown
          technologyKnown={formData.technologyKnown}
          technologyKnownError={formErrorData.technologyKnown}
          updateFormData={updateFormData}
        />
      );
      break;
    case 4:
      component = (
        <LanguageKnown
          languageKnown={formData.languageKnown}
          languageKnownError={formErrorData.languageKnown}
          updateFormData={updateFormData}
        />
      );
      break;
    case 5:
      component = (
        <WorkExperience
          workExperiences={formData.workExperiences}
          workExperiencesError={formErrorData.workExperiences}
          setFormErrorData={setFormErrorData}
          updateFormData={updateFormData}
        />
      );
      break;
    case 6:
      component = (
        <ReferenceDetails
          referenceDetails={formData.referenceDetails}
          updateFormData={updateFormData}
        />
      );
      break;
    case 7:
      component = (
        <Preferences
          preferences={formData.preferences}
          updateFormData={updateFormData}
        />
      );
      break;

    default:
      break;
  }

  return (
    <div>
      <div className="text-center my-5">
        <h1>Job Application Form</h1>
      </div>
      <ProgressBar currentStep={currentStep} />
      <div className="w-full">
        <form
          onSubmit={(e) => {
            localStorageValue.length ? handleUpdate(e) : handleSubmit(e)
          }}
        >
          <div className="flex justify-center my-5">{component}</div>
          <div className="flex justify-center">
            {currentStep > 1 && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={prevBtnHandler}
              >
                Prev
              </button>
            )}
            {currentStep < stepDetails.length && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={nextBtnHandler}
              >
                Next
              </button>
            )}
            {currentStep === stepDetails.length && (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
