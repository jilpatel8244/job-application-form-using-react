import { initialFormErrorData } from "../data/data";
import {
  formBasicDetailsFields,
  formPreferencesFields,
  isNumber,
  isString,
  validateEmail,
  validatePhone,
} from "./formValidationData";
import convertCamelCaseToTitleCase from "../utiils/convertCamelCaseToTitleCase";

export function validateBasicDetails(basicDetails) {
  let errorsObj = {};
  let validate = true;

  formBasicDetailsFields.forEach((field) => {
    let value = basicDetails[field.name];

    let errorStatus = false;
    let nameOfTheField = convertCamelCaseToTitleCase(field.name);
    let title = "";

    field.rules.forEach((rule) => {
      if (
        rule === "required" &&
        (typeof value === "object" ? !value?.length : !value?.trim().length)
      ) {
        validate = false;
        errorStatus = true;
        title = `${nameOfTheField} is required !`;
      }

      if (rule === "email" && value && !validateEmail(value)) {
        validate = false;
        errorStatus = true;
        title = `Please enter valid ${nameOfTheField} !`;
      }

      if (rule === "phone" && value && !validatePhone(value)) {
        validate = false;
        errorStatus = true;
        title = `Please enter valid ${nameOfTheField} !`;
      }

      if (rule === "string" && value && !isString(value)) {
        validate = false;
        errorStatus = true;
        title = `${nameOfTheField} must be a string!`;
      }

      if (rule === "date18" && value) {
        const now = new Date();
        const birthDate = new Date(value);

        const age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();
        const dayDiff = now.getDate() - birthDate.getDate();

        if (
          age < 18 ||
          (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
        ) {
          validate = false;
          errorStatus = true;
          title = `You are not eligible to fill the form as you are under 18`;
        }
      }

      if (rule === "maxLength" && value && value.trim().length > 20) {
        validate = false;
        errorStatus = true;
        title = `${nameOfTheField} must be less than 20 characters!`;
      }
    });

    errorsObj[field.name] = {
      errorStatus: errorStatus,
      title: title,
    };
  });

  return { errorsObj, validate };
}

export function validateEducationDetails(educationDetails) {
  let errorsObj = { ...initialFormErrorData.educationDetails };
  let validate = true;

  const levels = Object.keys(educationDetails);

  levels.forEach((level) => {
    const details = educationDetails[level];
    const fields = Object.keys(details);

    // Check if any field in the current level is filled
    const isAnyFieldFilled = fields.some(
      (field) => details[field].trim() !== ""
    );

    let errorStatus = false;
    let title = "";
    if (isAnyFieldFilled) {
      fields.forEach((field) => {
        if (details[field].trim() === "") {
          validate = false;
          errorStatus = true;
          title = "required !";
        } else {
          errorStatus = false;
          title = "";
        }

        if (
          (details[field].trim() && field === "boardName") ||
          field === "courseName" ||
          field === "univercityName"
        ) {
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
        } else if (details[field].trim() && field === "passingYear") {
          const currentYear = new Date().getFullYear();
          const yearPattern = new RegExp(
            `^(19[0-9][0-9]|20[0-${currentYear % 10}][0-9]|20${Math.floor(
              currentYear / 10
            )}[0-${currentYear % 10}])$`
          );
          if (
            !yearPattern.test(details[field]) ||
            Number(details[field]) > currentYear
          ) {
            validate = false;
            errorStatus = true;
            title = "invalid year format !";
          }
        } else if (details[field].trim() && field === "percentage") {
          const percentagePattern = /^(\d{1,2}(\.\d{1,2})?|100)$/; // Example pattern for percentage 0-100 with up to 2 decimal places
          if (!percentagePattern.test(details[field])) {
            validate = false;
            errorStatus = true;
            title = "invalid percentage format !";
          }
        }

        errorsObj[level][field].errorStatus = errorStatus;
        errorsObj[level][field].title = title;
      });
    }
  });

  return { errorsObj, validate };
}

export function validateLanguageAndTechnology(data, isTechnologyOrLanguage) {
  let errorsObj = {};
  let validate = true;

  let errorStatus = false;
  let title = "";

  if (!Object.keys(data)?.length) {
    validate = false;
    errorStatus = true;
    title = `Please Select Atleast One ${isTechnologyOrLanguage}`;
  }
  errorsObj = {
    errorStatus: errorStatus,
    title: title,
  };

  return { errorsObj, validate };
}

export function validatePreferences(preferences) {
  let errorsObj = {};
  let validate = true;

  formPreferencesFields.forEach((field) => {
    let nameOfTheField = convertCamelCaseToTitleCase(field.name);
    let value = preferences[field.name];

    let errorStatus = false;
    let title;

    field.rules.forEach((rule) => {
      if (
        rule === "required" &&
        (typeof value === "object" ? !value?.length : !value?.trim().length)
      ) {
        validate = false;
        errorStatus = true;
        title = `${nameOfTheField} is required !`;
      }

      if (rule === "number" && value && !isNumber(value)) {
        validate = false;
        errorStatus = true;
        title = `${nameOfTheField} must be a number`;
      }
    });

    errorsObj[field.name] = {
      errorStatus: errorStatus,
      title: title,
    };
  });

  return { errorsObj, validate };
}

export function validateWorkExperience(workExperiences) {
  let validate = true;
  let errorsObj = {};
  let id;

  workExperiences.forEach((experience) => {
    const isFilled = Object.keys(experience).some((key) => {
      const value = experience[key];
      if (key === "id") {
        id = value;
        return false;
      }

      if (Array.isArray(value)) {
        return value.length > 0; // Check if skills array is filled
      }
      return value.trim() !== "";
    });

    if (isFilled) {
      for (const [key, value] of Object.entries(experience)) {
        if (
          (Array.isArray(value) && !value.length) ||
          (!Array.isArray(value) && !value.trim())
        ) {
          validate = false;
          errorsObj = {
            ...errorsObj,
            [`${key}_${id}`]: {
              errorStatus: true,
              title: "required",
            },
          };
        } else {
          errorsObj = {
            ...errorsObj,
            [`${key}_${id}`]: {
              errorStatus: false,
              title: "",
            },
          };
        }
      }
    }

    if (
      (experience.companyName && !isString(experience.companyName)) ||
      experience.companyName.trim().length > 50
    ) {
      validate = false;
      errorsObj = {
        ...errorsObj,
        [`companyName_${id}`]: {
          errorStatus: true,
          title: "Company name must be in valid string format",
        },
      };
    }

    if (
      (experience.designation && !isString(experience.designation)) ||
      experience.designation.trim().length > 50
    ) {
      validate = false;
      errorsObj = {
        ...errorsObj,
        [`designation_${id}`]: {
          errorStatus: true,
          title: "Designation must be in valid string format",
        },
      };
    }

    if (experience.from && new Date(experience.from) > new Date()) {
      validate = false;
      errorsObj = {
        ...errorsObj,
        [`from_${id}`]: {
          errorStatus: true,
          title: "From date must not greater than today",
        },
      };
    }

    if (experience.to && new Date(experience.to) > new Date()) {
      validate = false;
      errorsObj = {
        ...errorsObj,
        [`to_${id}`]: {
          errorStatus: true,
          title: "To date must not greater than today",
        },
      };
    }

    if (
      experience.from &&
      experience.to &&
      new Date(experience.from) > new Date(experience.to)
    ) {
      validate = false;
      errorsObj = {
        ...errorsObj,
        [`to_${id}`]: {
          errorStatus: true,
          title: "To date must not less than from",
        },
      };
    }
  });

  return { errorsObj, validate };
}

export function validateReferenceDetails(referenceDetails) {
  let validate = true;
  let errorsObj = {};
  let id;

  referenceDetails.forEach((singleReferenceDetail) => {
    const isFilled = Object.keys(singleReferenceDetail).some((key) => {
      const value = singleReferenceDetail[key];
      if (key === "id") {
        id = value;
        return false;
      }
      if (Array.isArray(value)) {
        return value.some((phn) => phn.value !== "");
      }
      return value.trim() !== "";
    });

    if (isFilled) {
      for (const [key, value] of Object.entries(singleReferenceDetail)) {
        if (Array.isArray(value)) {
          value.forEach((phn) => {
            if (!phn.value) {
              validate = false;
              errorsObj = {
                ...errorsObj,
                [`${key}_${id}_${phn.id}`]: {
                  errorStatus: true,
                  title: "required",
                },
              };
            } else {
              errorsObj = {
                ...errorsObj,
                [`${key}_${id}_${phn.id}`]: {
                  errorStatus: false,
                  title: "",
                },
              };
            }
          });
        } else if (!Array.isArray(value)) {
          if (!value.trim()) {
            validate = false;
            errorsObj = {
              ...errorsObj,
              [`${key}_${id}`]: {
                errorStatus: true,
                title: "required",
              },
            };
          } else {
            errorsObj = {
              ...errorsObj,
              [`${key}_${id}`]: {
                errorStatus: false,
                title: "",
              },
            };
          }
        }
      }
    }

    if (
      (singleReferenceDetail.name && !isString(singleReferenceDetail.name)) ||
      singleReferenceDetail.name.trim().length > 50
    ) {
      validate = false;
      errorsObj = {
        ...errorsObj,
        [`name_${id}`]: {
          errorStatus: true,
          title: "Please enter valid name",
        },
      };
    }

    if (
      (singleReferenceDetail.relation &&
        !isString(singleReferenceDetail.relation)) ||
      singleReferenceDetail.relation.trim().length > 50
    ) {
      validate = false;
      errorsObj = {
        ...errorsObj,
        [`relation_${id}`]: {
          errorStatus: true,
          title: "Please enter valid relation",
        },
      };
    }

    singleReferenceDetail?.phoneNumber.forEach((phn) => {
      if (phn.value && !validatePhone(phn.value)) {
        validate = false;
        errorsObj = {
          ...errorsObj,
          [`phoneNumber_${id}_${phn.id}`]: {
            errorStatus: true,
            title: "Please enter valid phone number",
          },
        };
      }
    });
  });

  return { errorsObj, validate };
}
