import {
  Suspense,
  lazy,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ProgressBar from "./ProgressBar";
import { toast } from "react-toastify";
import { initialFormData } from "../../data/data";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate, useParams } from "react-router-dom";
import { FormContext } from "../../context/FormContext";
import NavigationBtns from "./NavigationBtns";
import Loader from "../../components/commonComponents/Loader";
import {
  validateBasicDetails,
  validateEducationDetails,
  validateLanguageAndTechnology,
  validatePreferences,
  validateReferenceDetails,
  validateWorkExperience,
} from "../../utiils/validateJobForm";
import { stepDetails } from "../../data/data";

const ErrorPopup = lazy(() =>
  import("../../components/commonComponents/ErrorPopup")
);
const BasicDetails = lazy(() => import("./BasicDetails"));
const EducationDetails = lazy(() => import("./EducationalDetails"));
const TechnologyKnown = lazy(() => import("./TechnologyKnown"));
const LanguageKnown = lazy(() => import("./LanguageKnown"));
const WorkExperience = lazy(() => import("./WorkExperience"));
const ReferenceDetails = lazy(() => import("./ReferenceDetails"));
const Preferences = lazy(() => import("./Preferences"));

function JobForm() {
  const [currentStep, setCurrentStep] = useState(2);
  const { id } = useParams();
  const { getDataById, addData, updateDataById } = useLocalStorage("users");
  const navigate = useNavigate();
  const { formData, formErrorData, setFormData, setFormErrorData } =
    useContext(FormContext);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (id) {
      let data = getDataById(id);
      setFormData(data);
    } else {
      setFormData(initialFormData);
    }
  }, []);

  useEffect(() => {
    if (validateOnChange) {
      validateForm();
    }
  }, [formData]);

  function validateForm() {
    let errorData;

    switch (currentStep) {
      case 1:
        errorData = validateBasicDetails(formData.basicDetails);
        break;
      case 2:
        errorData = validateEducationDetails(formData.educationDetails);
        break;
      case 3:
        errorData = validateLanguageAndTechnology(
          formData.technologyKnown,
          "Technology"
        );
        break;
      case 4:
        errorData = validateLanguageAndTechnology(
          formData.languageKnown,
          "Language"
        );
        break;
      case 5:
        errorData = validateWorkExperience(formData.workExperiences);
        break;
      case 6:
        errorData = validateReferenceDetails(formData.referenceDetails);
        break;
      case 7:
        errorData = validatePreferences(formData.preferences);
        break;

      default:
        break;
    }

    console.log(errorData);
    console.log(formErrorData);

    setFormErrorData((prevData) => {
      return {
        ...prevData,
        [stepDetails[currentStep].name]: errorData?.errorsObj,
      };
    });

    return errorData?.validate;
  }

  function nextBtnHandler() {
    setValidateOnChange(true);

    if (validateForm()) {
      if (currentStep === Object.keys(stepDetails)?.length) {
        handleSubmit();
      } else {
        setValidateOnChange(false);
        setCurrentStep(currentStep + 1);
      }
    } else {
      setIsPopupOpen(true);
    }
  }

  function prevBtnHandler() {
    setCurrentStep(currentStep - 1);
  }

  function handleSubmit() {
    id ? updateDataById(id, formData) : addData(formData);

    toast.success(
      `Your Application ${id ? "Updated" : "Created"} Successfully !`,
      {
        position: "top-center",
      }
    );

    navigate("/");
  }

  let component = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <BasicDetails />;
      case 2:
        return <EducationDetails />;
      case 3:
        return <TechnologyKnown />;
      case 4:
        return <LanguageKnown />;
      case 5:
        return <WorkExperience />;
      case 6:
        return <ReferenceDetails />;
      case 7:
        return <Preferences />;

      default:
        break;
    }
  }, [currentStep]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div className="text-center my-5">
        <h1>Job Application Form</h1>
      </div>
      <ProgressBar currentStep={currentStep} />
      <div className="w-full">
        <form>
          <div className="flex justify-center my-5">
            <Suspense fallback={<Loader />}>{component}</Suspense>
          </div>
          <NavigationBtns
            currentStep={currentStep}
            nextBtnHandler={nextBtnHandler}
            prevBtnHandler={prevBtnHandler}
          />
        </form>
      </div>
      {isPopupOpen && (
        <Suspense fallback={<Loader />}>
          <ErrorPopup currentStep={currentStep} onClose={handleClosePopup} />
        </Suspense>
      )}
    </div>
  );
}

export default JobForm;
