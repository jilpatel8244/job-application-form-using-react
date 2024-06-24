import InputRadio from "./InputRadio";

function TechnologyKnown({ technologyKnown, updateFormData }) {
  let technologies = Object.keys(technologyKnown);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    let newTechnologyKnown = {...technologyKnown};

    if (type === "checkbox") {
      newTechnologyKnown[name].selected = checked;
    } else if (type === "radio") {
      const [tech, level] = name.split("_");
      newTechnologyKnown[tech].level = level;
    }

    updateFormData({technologyKnown: newTechnologyKnown});
  }

  return (
    <div>
      {technologies.map((technology) => {
        return (
          <div key={technology} className="flex items-center p-3 gap-3">
            <InputRadio
              type="checkbox"
              name={technology}
              id={technology}
              className=""
              label={technology}
              value={technology}
              checked={technologyKnown[technology].selected}
              handleChange={handleChange}
            />

            {["Beginer", "Mediator", "Expert"].map((level) => (
              <InputRadio
                key={level}
                type="radio"
                name={`${technology}_${level}`}
                id={`${technology}_${level}`}
                className=""
                label={level}
                value={level}
                checked={technologyKnown[technology].level === level}
                handleChange={handleChange}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default TechnologyKnown;
