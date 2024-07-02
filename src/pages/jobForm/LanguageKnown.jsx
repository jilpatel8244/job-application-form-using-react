import { useContext, useEffect } from "react";
import InputRadio from "../../components/form/InputRadio";
import { FormContext } from "../../context/FormContext";
import { languages } from "../../data/data";

function LanguageKnown() {
  const { formData: { languageKnown }, formErrorData, updateFormData, isPopupOpen } = useContext(FormContext);
  const languageKnownError = formErrorData.languageKnown;

  useEffect(() => {
    if (isPopupOpen) {
      throw formErrorData.languageKnown
    }
  }, [isPopupOpen])

  function handleChange(event) {
    const { name, checked } = event.target;
    const [lang, skill] = name.split("_");
    
    let newLanguageKnown = { ...languageKnown };

    if (checked) {
      newLanguageKnown[lang] = languageKnown[lang] ? [...languageKnown[lang], skill] : [skill];
    } else {
      newLanguageKnown[lang] = newLanguageKnown[lang].filter(item => item !== skill);
      if (!newLanguageKnown[lang].length) {
        delete newLanguageKnown[lang];
      }
    }

    updateFormData({ languageKnown: newLanguageKnown })
  }

  return (
    <div>
      {languages.map((language) => {
        return (
          <div key={language} className="flex items-center p-3 gap-3">
            <span className="font-bold">{language}</span>

            {["Read", "Write", "Speak"].map((skill) => (
              <InputRadio
                key={skill}
                type="checkbox"
                name={`${language}_${skill}`}
                id={`${language}_${skill}`}
                className=""
                label={skill}
                value={skill}
                checked={languageKnown.hasOwnProperty(language) && languageKnown[language].includes(skill)}
                handleChange={handleChange}
              />
            ))}
          </div>
        );
      })}

      <div className={`text-center ${!languageKnownError?.errorStatus && 'hidden'}`}>
        <span className="text-red-600">
          {languageKnownError?.title}
        </span>
      </div>
    </div>
  );
}

export default LanguageKnown;
