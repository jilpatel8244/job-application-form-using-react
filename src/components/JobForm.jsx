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
import { formBasicDetailsFields, formPreferencesFields, formReferenceFields, isNumber, isString, validateEmail, validatePhone } from "../helper/formValidationData";

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
        case 6:
          validateReferenceDetails()
          break;
        case 7:
          validatePreferences()
          break;

        default:
          break;
      }
    }
  }, [formData]);

  function validateBasicDetails() {
    let validate = true;
    formBasicDetailsFields.forEach((field) => {
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
          errorTitle = "field is required !";
        }

        if (rule === "email" && value && !validateEmail(value)) {
          validate = false;
          errorStatus = true;
          errorTitle = `Please enter valid ${field.name} !`;
        }

        if (rule === "phone" && value && !validatePhone(value)) {
          validate = false;
          errorStatus = true;
          errorTitle = `Please enter valid ${field.name} !`;
        }

        if (rule === "string" && value && !isString(value)) {
          validate = false;
          errorStatus = true;
          errorTitle = `${field.name} must be a string!`;
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

    console.log(validate);

    return validate;
  }

  function validateEducationDetails() {
    let validate = true;

    for (const [key, value] of Object.entries(formData.educationDetails)) {

      let filteredArr = Object.entries(value).filter((childElement) => {
        let [key, value] = childElement;

        console.log(value);

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
          }
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
        })
      }
    }



    return validate;
  }

  function validateTechnologyKnown() {
    let validate = true;

    let atleastOneSelected = false;
    for (const [key, value] of Object.entries(formData.technologyKnown)) {
      if (value.selected) {
        atleastOneSelected = true;
      }
    }

    let status = true;
    let title = "";

    if (!atleastOneSelected) {
      validate = false;
      status = false;
      title = "Please selct atleast one technology"
    }
    setFormErrorData((prevData) => {
      return {
        ...prevData,
        isAtleastOneTechSelected: {
          status: status,
          title: title
        }
      }
    })

    for (const [key, value] of Object.entries(formData.technologyKnown)) {
      if (value.selected) {
        let errorStatus = false;
        let title = "";
        if (!value.level) {
          validate = false;
          errorStatus = true;
          title = "please select level"
        }
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            technologyKnown: {
              ...prevData.technologyKnown,
              [key]: {
                errorStatus: errorStatus,
                title: title
              }
            }
          }
        })
      }
    }

    return validate;
  }

  function validateLanguageKnown() {
    console.log(formData.languageKnown);
    let validate = true;

    let atleastOneSelected = false;
    for (const [key, value] of Object.entries(formData.languageKnown)) {
      if (value.selected) {
        atleastOneSelected = true;
      }
    }

    let status = true;
    let title = "";

    if (!atleastOneSelected) {
      validate = false;
      status = false;
      title = "Please selct atleast one language"
    }
    setFormErrorData((prevData) => {
      return {
        ...prevData,
        isAtleastOneLanguageSelected: {
          status: status,
          title: title
        }
      }
    })

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

    formData.workExperiences.forEach((workExperience) => {
      let count = 0;
      let id;
      for (const [key, value] of Object.entries(workExperience)) {
        if (key === "id") {
          id = value;
        }
        if (value) {
          count = count + 1;
        }
      }

      if (count !== Object.keys(workExperience).length && count !== 1) {
        validate = false;
        for (const [key, value] of Object.entries(workExperience)) {
          let newErrObj;
          if (!value) {
            newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: true,
                title: "required"
              }
            }
          } else {
            newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: false,
                title: ""
              }
            }
          }
          setFormErrorData((prevData) => {
            return {
              ...prevData,
              workExperiences: {
                ...prevData.workExperiences,
                ...newErrObj
              }
            }
          })
        }
        console.log(count);
      } else {
        for (const [key, value] of Object.entries(workExperience)) {
          if (Object.keys(formErrorData.workExperiences).includes(`${key}_${id}`)) {
            let newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: false,
                title: ""
              }
            }
            setFormErrorData((prevData) => {
              return {
                ...prevData,
                workExperiences: {
                  ...prevData.workExperiences,
                  ...newErrObj
                }
              }
            })
          }
        }
      }

        if (workExperience.from && new Date(workExperience.from) > new Date()) {
          validate = false;          
          setFormErrorData((prevData) => {
            return {
              ...prevData,
              workExperiences: {
                ...prevData.workExperiences,
                [`from_${id}`]: {
                  errorStatus: true,
                  title: "from date must not greater than today"
                }
              }
            }
          })
        }
        if ((workExperience.from && workExperience.to) && (new Date(workExperience.from) > new Date(workExperience.to))) {
          validate = false;          
          setFormErrorData((prevData) => {
            return {
              ...prevData,
              workExperiences: {
                ...prevData.workExperiences,
                [`to_${id}`]: {
                  errorStatus: true,
                  title: "to date must not greater than from"
                }
              }
            }
          })
        }
      
    })

    return validate;
  }

  function validateReferenceDetails() {
    let validate = true;

    formData.referenceDetails.forEach((singleReferenceDetail) => {
      let count = 0;
      let id;
      for (const [key, value] of Object.entries(singleReferenceDetail)) {
        if (key === "id") {
          id = value;
        }
        if (value) {
          count = count + 1;
        }
      }

      if (count !== Object.keys(singleReferenceDetail).length && count !== 1) {
        validate = false;
        for (const [key, value] of Object.entries(singleReferenceDetail)) {
          let newErrObj;
          if (!value) {
            newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: true,
                title: "required"
              }
            }
          } else {
            newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: false,
                title: ""
              }
            }
          }
          setFormErrorData((prevData) => {
            return {
              ...prevData,
              referenceDetails: {
                ...prevData.referenceDetails,
                ...newErrObj
              }
            }
          })
        }
        console.log(count);
      } else {
        for (const [key, value] of Object.entries(singleReferenceDetail)) {
          if (Object.keys(formErrorData.referenceDetails).includes(`${key}_${id}`)) {
            let newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: false,
                title: ""
              }
            }
            setFormErrorData((prevData) => {
              return {
                ...prevData,
                referenceDetails: {
                  ...prevData.referenceDetails,
                  ...newErrObj
                }
              }
            })
          }
        }
      }
    })

    return validate;
  }

  function validatePreferences() {
    let validate = true;

    formPreferencesFields.forEach((field) => {
      let value = formData.preferences[field.name];

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
          errorTitle = "field is required !";
        }

        if (rule === "number" && value && !isNumber(value)) {
          validate = false;
          errorStatus = true;
          errorTitle = `${field.name} must be a number`;
        }
      });
      setFormErrorData((prevData) => {
        return {
          ...prevData,
          preferences: {
            ...prevData.preferences,
            [fieldName]: {
              errorStatus: errorStatus,
              title: errorTitle
            }
          }
        };
      });
    });

    console.log(validate);
    return validate;
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
        break;
      case 6:
        validateStatus = validateReferenceDetails()
        break;
      case 7:
        validateStatus = validatePreferences()
        break;

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
    setValidateOnChange(true);

    if (validatePreferences()) {
      setValidateOnChange(false);

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
      navigate('/');
    }

  }

  function handleUpdate(event) {
    event.preventDefault();
    setValidateOnChange(true);

    if (validatePreferences()) {
      setValidateOnChange(false);

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
      navigate('/');
    }
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
          isAtleastOneTechSelected={formErrorData.isAtleastOneTechSelected}
          updateFormData={updateFormData}
        />
      );
      break;
    case 4:
      component = (
        <LanguageKnown
          languageKnown={formData.languageKnown}
          languageKnownError={formErrorData.languageKnown}
          isAtleastOneLanguageSelected={formErrorData.isAtleastOneLanguageSelected}
          updateFormData={updateFormData}
        />
      );
      break;
    case 5:
      component = (
        <WorkExperience
          workExperiences={formData.workExperiences}
          workExperiencesError={formErrorData.workExperiences}
          updateFormData={updateFormData}
        />
      );
      break;
    case 6:
      component = (
        <ReferenceDetails
          referenceDetails={formData.referenceDetails}
          referenceDetailsError={formErrorData.referenceDetails}
          updateFormData={updateFormData}
        />
      );
      break;
    case 7:
      component = (
        <Preferences
          preferences={formData.preferences}
          preferencesError={formErrorData.preferences}
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
