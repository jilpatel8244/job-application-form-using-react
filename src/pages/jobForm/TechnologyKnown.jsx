import { useContext, useEffect } from "react";
import InputRadio from "../../components/form/InputRadio";
import { FormContext } from "../../context/FormContext";
import { technologies } from "../../data/data";

function TechnologyKnown() {
  const { formData: { technologyKnown }, formErrorData, updateFormData, isPopupOpen } = useContext(FormContext);
  const technologyKnownError = formErrorData.technologyKnown;

  useEffect(() => {
    if (isPopupOpen) {
      throw formErrorData.technologyKnown
    }
  }, [isPopupOpen])

  function handleChange(event) {
    const { name, checked } = event.target;
    const [tech, level] = name.split("_");

    let newTechnologyKnown = { ...technologyKnown };

    if (checked) {
      newTechnologyKnown[tech] = level
    } else {
      delete newTechnologyKnown[tech];
    }

    updateFormData({ technologyKnown: newTechnologyKnown });
  }

  return (
    <div>
      {technologies.map((technology) => {
        return (
          <div key={technology} className="flex flex-col">
            <div className="flex items-center p-3 gap-3">
              <span className="font-bold">{technology}</span>

              {["Beginer", "Mediator", "Expert"].map((level) => (
                <InputRadio
                  key={level}
                  type="radio"
                  name={`${technology}_${level}`}
                  id={`${technology}_${level}`}
                  className=""
                  label={level}
                  value={level}
                  checked={technologyKnown.hasOwnProperty(technology) && technologyKnown[technology] === level}
                  handleChange={handleChange}
                />
              ))}
            </div>
          </div>
        );
      })}

      <div className={`text-center ${!technologyKnownError?.errorStatus && 'hidden'}`}>
        <span className="text-red-600">
          {technologyKnownError?.title}
        </span>
      </div>
    </div>
  );
}

export default TechnologyKnown;
