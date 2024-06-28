import { useContext, useState } from "react";
import { predefinedSkillsList } from "../../data/data";
import { FormContext } from "../../context/FormContext";
import crossWhite from '../../assets/x-thin-svgrepo-com (2).svg';

function WorkExpDropDown({ id, skills }) {
  const { formData: { workExperiences }, formErrorData, updateFormData } = useContext(FormContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [onfocus, setOnfocus] = useState(false);
  const [options, setOptions] = useState(predefinedSkillsList);

  function handleSkillAdd(skill) {
    console.log(workExperiences);
    const updatedWorkExperiences = workExperiences?.map(workExperience => {
      if (workExperience.id === id) {
        let newSkills = [...workExperience.skills, skill]
        return { ...workExperience, skills: newSkills };
      }
      return workExperience;
    });

    updateFormData({ workExperiences: updatedWorkExperiences });

    setOnfocus(false);
    setSearchTerm('');

    let newOptions = options.filter((option) => option != skill);
    setOptions(newOptions);

    console.log(workExperiences);
  }

  function handleSkillRemove(removeSkill) {
    const updatedWorkExperiences = workExperiences?.map(workExperience => {
      if (workExperience.id === id) {
        let filteredSkills = workExperience.skills.filter((skill) => removeSkill != skill);
        return { ...workExperience, skills: filteredSkills };
      }
      return workExperience;
    });

    updateFormData({ workExperiences: updatedWorkExperiences });

    setOptions([...options, removeSkill]);

    console.log(workExperiences);
  }

  function handleCreateOption() {
    if (searchTerm && !options.includes(searchTerm)) {
      const updatedWorkExperiences = workExperiences?.map(workExperience => {
        if (workExperience.id === id) {
          let newSkills = [...workExperience.skills, searchTerm]
          return { ...workExperience, skills: newSkills };
        }
        return workExperience;
      });

      updateFormData({ workExperiences: updatedWorkExperiences });
      setSearchTerm('');
      setOnfocus(false);
    }
  }

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        {
          skills?.length !== 0 && (
            <ul className="flex flex-wrap">
              {
                skills?.map(skill => (
                  <div key={skill}>
                    <li className="flex items-center px-3 py-1 my-2 mx-1 rounded-lg bg-black text-white">
                      {skill}
                      <span onClick={() => handleSkillRemove(skill)} className="border cursor-pointer border-white ml-2 p-1 rounded-full">
                        <img src={crossWhite} alt="crossWhite Img" height={10} width={10} />
                      </span>
                    </li>
                  </div>
                ))
              }
            </ul>
          )
        }
      </div>
      <div>
        <input
          type="text"
          placeholder="search skills"
          onFocus={() => { setOnfocus(true) }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {
          onfocus && (
            <ul>
              {
                filteredOptions?.map((skill) => (
                  <li key={skill} onClick={() => { handleSkillAdd(skill) }}>{skill}</li>
                ))
              }
              {
                searchTerm && !filteredOptions.includes(searchTerm) && (
                  <li onClick={handleCreateOption}> create '{searchTerm}' </li>
                )
              }
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default WorkExpDropDown;