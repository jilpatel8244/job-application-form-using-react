import { useContext, useEffect, useMemo, useState } from "react";
import ProgressBar from "./ProgressBar";
import BasicDetails from "./Step1-BasicDetails";
import EducationDetails from "./Step2-EducationalDetails";
import TechnologyKnown from "./Step3-TechnologyKnown";
import LanguageKnown from "./Step4-LanguageKnown";
import WorkExperience from "./Step5-WorkExperience";
import ReferenceDetails from "./Step6-ReferenceDetails";
import Preferences from "./Step7-Preferences";
import { toast } from "react-toastify";
import {
  initialFormErrorData,
  stepDetails,
} from "../../data/data";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate, useParams } from "react-router-dom";
import {
  formBasicDetailsFields,
  formPreferencesFields,
  isNumber,
  isString,
  validateEmail,
  validatePhone,
} from "../../utiils/formValidationData";
import { FormContext } from "../../context/FormContext";

function JobForm() {
  const [currentStep, setCurrentStep] = useState(5);
  const { id } = useParams();
  const { getDataById, addData, updateDataById } = useLocalStorage("users");
  const navigate = useNavigate();
  const { formData, formErrorData, setFormData, setFormErrorData } = useContext(FormContext);
  const [validateOnChange, setValidateOnChange] = useState(false);

  useEffect(() => {
    if (id) {
      let data = getDataById(id);
      setFormData(data);
    }
  }, []);

  useEffect(() => {
    if (validateOnChange) {
      switch (currentStep) {
        case 1:
          validateBasicDetails();
          break;
        case 2:
          validateEducationDetails();
          break;
        case 3:
          validateTechnologyKnown();
          break;
        case 4:
          validateLanguageKnown();
          break;
        case 5:
          validateWorkExperience();
          break;
        case 6:
          validateReferenceDetails();
          break;
        case 7:
          validatePreferences();
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

        if (rule === "dateToday" && value && new Date(value) > new Date()) {
          validate = false;
          errorStatus = true;
          errorTitle = `${field.name} must not greater than today!`;
        }

        if (rule === "maxLength" && value && value.trim().length > 20) {
          validate = false;
          errorStatus = true;
          errorTitle = `${field.name} must be less than 20 characters!`;
        }
      });

      setFormErrorData((prevData) => {
        return {
          ...prevData,
          basicDetails: {
            ...prevData.basicDetails,
            [fieldName]: {
              errorStatus: errorStatus,
              title: errorTitle,
            },
          },
        };
      });
    });
    
    return validate;
  }

  function validateEducationDetails() {
    let validate = true;

    const levels = Object.keys(formData.educationDetails);

    levels.forEach((level) => {
      const details = formData.educationDetails[level];
      const fields = Object.keys(details);

      // Check if any field in the current level is filled
      const isAnyFieldFilled = fields.some(
        (field) => details[field].trim() !== ""
      );

      if (isAnyFieldFilled) {
        fields.forEach((field) => {
          let errorStatus = false;
          let title = "";
          if (details[field].trim() === "") {
            validate = false;
            errorStatus = true;
            title = "required !";
          } else {
            if (field === "boardName" || field === "courseName" || field === "univercityName") {
              const namePattern = /^[a-zA-Z\s]+$/; // Only allows letters and spaces
              if (!namePattern.test(details[field])) {
                validate = false;
                errorStatus = true;
                title = "must be a valid string!";
              } else if (details[field].trim().length > 20) {
                validate = false;
                errorStatus = true;
                title = `must be less than 20 characters!`;
              }
            } else if (field === "passingYear") {
              const currentYear = new Date().getFullYear();
              const yearPattern = new RegExp(`^(19[0-9][0-9]|20[0-${currentYear % 10}][0-9]|20${Math.floor(currentYear / 10)}[0-${currentYear % 10}])$`);
              if (!yearPattern.test(details[field]) || Number(details[field]) > currentYear) {
                validate = false;
                errorStatus = true;
                title = "invalid year format !";
              }
            } else if (field === "percentage") {
              const percentagePattern = /^(\d{1,2}(\.\d{1,2})?|100)$/; // Example pattern for percentage 0-100 with up to 2 decimal places
              if (!percentagePattern.test(details[field])) {
                validate = false;
                errorStatus = true;
                title = "invalid percentage format !";
              }
            }
          }
          setFormErrorData((prevData) => {
            return {
              ...prevData,
              educationDetails: {
                ...prevData.educationDetails,
                [level]: {
                  ...prevData.educationDetails[level],
                  [field]: {
                    errorStatus: errorStatus,
                    title: title,
                  },
                },
              },
            };
          });
        });
      } else {
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            educationDetails: {
              ...prevData.educationDetails,
              [level]: initialFormErrorData.educationDetails[level],
            },
          };
        });
      }
    });

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
      title = "Please selct atleast one technology";
    }
    setFormErrorData((prevData) => {
      return {
        ...prevData,
        isAtleastOneTechSelected: {
          status: status,
          title: title,
        },
      };
    });

    for (const [key, value] of Object.entries(formData.technologyKnown)) {
      if (value.selected) {
        let errorStatus = false;
        let title = "";
        if (!value.level) {
          validate = false;
          errorStatus = true;
          title = "please select level";
        }
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            technologyKnown: {
              ...prevData.technologyKnown,
              [key]: {
                errorStatus: errorStatus,
                title: title,
              },
            },
          };
        });
      }
    }

    return validate;
  }

  function validateLanguageKnown() {
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
      title = "Please selct atleast one language";
    }
    setFormErrorData((prevData) => {
      return {
        ...prevData,
        isAtleastOneLanguageSelected: {
          status: status,
          title: title,
        },
      };
    });

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
          title = "please selct one";
        }
      }
      setFormErrorData((prevData) => {
        return {
          ...prevData,
          languageKnown: {
            ...prevData.languageKnown,
            [key]: {
              errorStatus: errorStatus,
              title: title,
            },
          },
        };
      });
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
        if (value.trim()) {
          count = count + 1;
        }
      }

      if (count !== Object.keys(workExperience).length && count !== 1) {
        validate = false;
        for (const [key, value] of Object.entries(workExperience)) {
          let newErrObj;
          if (!value.trim()) {
            newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: true,
                title: "required",
              },
            };
          } else {
            newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: false,
                title: "",
              },
            };
          }
          setFormErrorData((prevData) => {
            return {
              ...prevData,
              workExperiences: {
                ...prevData.workExperiences,
                ...newErrObj,
              },
            };
          });
        }
      } else {
        for (const [key, value] of Object.entries(workExperience)) {
          if (
            Object.keys(formErrorData.workExperiences).includes(`${key}_${id}`)
          ) {
            let newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: false,
                title: "",
              },
            };
            setFormErrorData((prevData) => {
              return {
                ...prevData,
                workExperiences: {
                  ...prevData.workExperiences,
                  ...newErrObj,
                },
              };
            });
          }
        }
      }

      if (workExperience.companyName && !isString(workExperience.companyName) || workExperience.companyName.trim().length > 50) {
        validate = false;
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            workExperiences: {
              ...prevData.workExperiences,
              [`companyName_${id}`]: {
                errorStatus: true,
                title: "company name is not valid string",
              },
            },
          };
        });
      }

      if (workExperience.designation && !isString(workExperience.designation) || workExperience.designation.trim().length > 50) {
        validate = false;
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            workExperiences: {
              ...prevData.workExperiences,
              [`designation_${id}`]: {
                errorStatus: true,
                title: "designation is not valid string",
              },
            },
          };
        });
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
                title: "from date must not greater than today",
              },
            },
          };
        });
      }
      if (workExperience.to && new Date(workExperience.to) > new Date()) {
        validate = false;
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            workExperiences: {
              ...prevData.workExperiences,
              [`to_${id}`]: {
                errorStatus: true,
                title: "to date must not greater than today",
              },
            },
          };
        });
      }
      if (
        workExperience.from &&
        workExperience.to &&
        new Date(workExperience.from) > new Date(workExperience.to)
      ) {
        validate = false;
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            workExperiences: {
              ...prevData.workExperiences,
              [`to_${id}`]: {
                errorStatus: true,
                title: "to date must not less than from",
              },
            },
          };
        });
      }
    });

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
        if (value.trim()) {
          count = count + 1;
        }
      }

      if (count !== Object.keys(singleReferenceDetail).length && count !== 1) {
        validate = false;
        for (const [key, value] of Object.entries(singleReferenceDetail)) {
          let newErrObj;
          if (!value.trim()) {
            newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: true,
                title: "required",
              },
            };
          } else {
            newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: false,
                title: "",
              },
            };
          }
          setFormErrorData((prevData) => {
            return {
              ...prevData,
              referenceDetails: {
                ...prevData.referenceDetails,
                ...newErrObj,
              },
            };
          });
        }
      } else {
        for (const [key, value] of Object.entries(singleReferenceDetail)) {
          if (
            Object.keys(formErrorData.referenceDetails).includes(`${key}_${id}`)
          ) {
            let newErrObj = {
              [`${key}_${id}`]: {
                errorStatus: false,
                title: "",
              },
            };
            setFormErrorData((prevData) => {
              return {
                ...prevData,
                referenceDetails: {
                  ...prevData.referenceDetails,
                  ...newErrObj,
                },
              };
            });
          }
        }
      }

      if (singleReferenceDetail.name && !isString(singleReferenceDetail.name) || singleReferenceDetail.name.trim().length > 50) {
        validate = false;
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            referenceDetails: {
              ...prevData.referenceDetails,
              [`name_${id}`]: {
                errorStatus: true,
                title: "name is not valid string",
              },
            },
          };
        });
      }

      if (
        singleReferenceDetail.relation &&
        !isString(singleReferenceDetail.relation) ||
        singleReferenceDetail.relation.trim().length > 50
      ) {
        validate = false;
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            referenceDetails: {
              ...prevData.referenceDetails,
              [`relation_${id}`]: {
                errorStatus: true,
                title: "relation is not valid string",
              },
            },
          };
        });
      }

      if (
        singleReferenceDetail.phoneNumber &&
        !validatePhone(singleReferenceDetail.phoneNumber)
      ) {
        validate = false;
        setFormErrorData((prevData) => {
          return {
            ...prevData,
            referenceDetails: {
              ...prevData.referenceDetails,
              [`phoneNumber_${id}`]: {
                errorStatus: true,
                title: "phone number is not valid",
              },
            },
          };
        });
      }
    });

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
              title: errorTitle,
            },
          },
        };
      });
    });
    return validate;
  }

  function nextBtnHandler() {
    setValidateOnChange(true);

    let validateStatus = true;
    switch (currentStep) {
      case 1:
        validateStatus = validateBasicDetails();
        break;
      case 2:
        validateStatus = validateEducationDetails();
        break;
      case 3:
        validateStatus = validateTechnologyKnown();
        break;
      case 4:
        validateStatus = validateLanguageKnown();
        break;
      case 5:
        validateStatus = validateWorkExperience();
        break;
      case 6:
        validateStatus = validateReferenceDetails();
        break;
      case 7:
        validateStatus = validatePreferences();
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

  function handleSubmit(event) {
    event.preventDefault();
    setValidateOnChange(true);

    if (validatePreferences()) {
      setValidateOnChange(false);

      addData(formData);

      toast.success("Your Application Created Successfully !", {
        position: 'top-center',
      });

      navigate("/");
    }
  }

  function handleUpdate(event) {
    event.preventDefault();
    setValidateOnChange(true);

    if (validatePreferences()) {
      setValidateOnChange(false);

      updateDataById(id, formData);

      toast.success("Your Application Updated Successfully !", {
        position: 'top-center',
      });

      navigate("/");
    }
  }

  let component = useMemo(() => {
    let component;
    switch (currentStep) {
      case 1:
        return (<BasicDetails />);
      case 2:
        return (<EducationDetails />);
      case 3:
        return (<TechnologyKnown />);
      case 4:
        return (<LanguageKnown />);
      case 5:
        return (<WorkExperience />);
      case 6:
        return (<ReferenceDetails />);
      case 7:
        return (<Preferences />);

      default:
        break;
    }
    return component;
  }, [currentStep])


  return (
    <div>
      <div className="text-center my-5">
        <h1>Job Application Form</h1>
      </div>
      <ProgressBar currentStep={currentStep} />
      <div className="w-full">
        <form
          onSubmit={(e) => {
            id ? handleUpdate(e) : handleSubmit(e);
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
