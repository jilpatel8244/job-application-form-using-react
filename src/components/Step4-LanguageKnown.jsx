import InputRadio from "./InputRadio";

function LanguageKnown({ languageKnown, languageKnownError, isAtleastOneLanguageSelected, updateFormData }) {
  let languages = Object.keys(languageKnown);

  function handleChange(event) {
    const { name, value, checked } = event.target;

    let newLanguageKnown = { ...languageKnown };

    const [lang, skill] = name.split("_");

    if (skill) {
      newLanguageKnown[lang] = {
        ...newLanguageKnown[lang],
        skills: { ...newLanguageKnown[lang].skills, [skill]: checked },
      };
    } else {
      newLanguageKnown[lang] = {
        ...newLanguageKnown[lang],
        selected: checked,
      };
    }

    updateFormData({ languageKnown: newLanguageKnown })
  }

  return (
    <div>
      {languages.map((language) => {
        return (
          <div key={language} className="flex items-center p-3 gap-3">
            <InputRadio
              type="checkbox"
              name={language}
              id={language}
              className=""
              label={language}
              value={language}
              checked={languageKnown[language].selected}
              handleChange={handleChange}
            />

            {["read", "write", "speak"].map((skill) => (
              <InputRadio
                key={skill}
                type="checkbox"
                name={`${language}_${skill}`}
                id={`${language}_${skill}`}
                className=""
                label={skill}
                value={skill}
                checked={languageKnown[language].skills[skill]}
                disabled={!languageKnown[language].selected}
                handleChange={handleChange}
              />
            ))}

            <div className={`${languageKnownError[language].errorStatus ? '' : 'hidden'}`}>
              <span className="text-red-600">
                {languageKnownError[language].title}
              </span>
            </div>
          </div>
        );
      })}

      <div className={`${!isAtleastOneLanguageSelected?.status ? '' : 'hidden'}`}>
        <span className="text-red-600">
          {isAtleastOneLanguageSelected?.title}
        </span>
      </div>
    </div>
  );
}

export default LanguageKnown;
