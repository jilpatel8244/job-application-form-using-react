import { useState } from "react";
import ProgressBar from "./ProgressBar";
import BasicDetails from "./Step1-BasicDetails";
import EducationDetails from "./Step2-EducationalDetails";
import TechnologyKnown from "./Step3-TechnologyKnown";
import LanguageKnown from "./Step4-LanguageKnown";
import WorkExperience from "./Step5-WorkExperience";
import ReferenceDetails from "./Step6-ReferenceDetails";
import Preferences from "./Step7-Preferences";
import { v4 as uuidv4 } from 'uuid';
import { languageKnown, stepDetails, technologyKnown } from "../helper/data";

function JobForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    basicDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      designation: "",
      gender: "",
      relationshipStatus: "single",
      state: "gujarat",
      city: "surat",
      dob: "",
    },
    educationDetails: {
      ssc: {
        boardName: "",
        passingYear: "",
        percentage: "",
      },
      hsc: {
        boardName: "",
        passingYear: "",
        percentage: "",
      },
      bechlor: {
        courseName: "",
        univercityName: "",
        passingYear: "",
        percentage: "",
      },
      master: {
        courseName: "",
        univercityName: "",
        passingYear: "",
        percentage: "",
      },
    },
    technologyKnown: technologyKnown,
    languageKnown: languageKnown,
    workExperiences: [
      {
        id: "1",
        companyName: "",
        designation: "",
        from: "",
        to: "",
      },
    ],
    referenceDetails: [
      {
        id: "1",
        name: "",
        phoneNumber: "",
        relation: "",
      },
    ],
    preferences: {
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      department: "",
      preferedLocations: [],
    },
  });

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

    let users = [];
    if (localStorage.getItem(users)) {
      console.log("hello ");
      users = JSON.parse(localStorage.getItem(users));
      users.push(formData);
    } else {
      console.log("hello 1");
      users.push(formData);
    }
    localStorage.setItem("users", JSON.stringify(users));

    console.log();
  }

  let component;

  switch (currentStep) {
    case 1:
      component = (
        <BasicDetails
          basicDetails={formData.basicDetails}
          updateFormData={updateFormData}
        />
      );
      break;
    case 2:
      component = (
        <EducationDetails
          educationDetails={formData.educationDetails}
          updateFormData={updateFormData}
        />
      );
      break;
    case 3:
      component = (
        <TechnologyKnown
          technologyKnown={formData.technologyKnown}
          updateFormData={updateFormData}
        />
      );
      break;
    case 4:
      component = (
        <LanguageKnown
          languageKnown={formData.languageKnown}
          updateFormData={updateFormData}
        />
      );
      break;
    case 5:
      component = (
        <WorkExperience
          workExperiences={formData.workExperiences}
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
            handleSubmit(e);
          }}
        >
          <div className="flex justify-center my-5">{component}</div>
          <div className="flex justify-center">
            {currentStep > 1 && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                }}
              >
                Prev
              </button>
            )}
            {currentStep < stepDetails.length && (
              <button
              type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setCurrentStep(currentStep + 1);
                }}
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
