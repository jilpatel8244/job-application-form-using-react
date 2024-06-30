import { useContext } from "react";
import InputText from "../../components/form/InputText";
import { FormContext } from "../../context/FormContext";

function EducationDetails() {
  const {formData: {educationDetails}, formErrorData, updateFormData} = useContext(FormContext);
  const educationDetailsError = formErrorData.educationDetails;

  function handleChange(event) {
    const {name, value} = event.target;
    const [level, field] = name.split("_");

    updateFormData({
      educationDetails: {
        ...educationDetails,
        [level]: {
          ...educationDetails[level],
          [field]: value
        }
      }
    })
  }

  return (
    <div>
      {Object.keys(educationDetails).map((level) => (
        <div key={level}>
          <div>{level.toUpperCase()}</div>
          <div className="flex gap-3">
            {Object.keys(educationDetails[level]).map((field) => (
              <InputText
                key={field}
                type={field === 'passingYear' || field === 'percentage' ? 'number' : 'text'}
                name={`${level}_${field}`}
                id={`${level}_${field}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                label={field}
                value={educationDetails[level][field]}
                handleChange={handleChange}
                errorObj={educationDetailsError[level][field]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EducationDetails;
