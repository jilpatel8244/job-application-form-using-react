import { useContext, useRef, useState } from "react";
import { predefinedSkillsList } from "../../data/data";
import { FormContext } from "../../context/FormContext";
import crossWhite from '../../assets/x-thin-svgrepo-com (2).svg';

function WorkExpDropDown({ id, skills, errorObj }) {
  const { formData: { workExperiences }, updateFormData } = useContext(FormContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(() => {
    let userWorkExperience = workExperiences.filter((workExperience) => workExperience.id === id);
    console.log(userWorkExperience[0].skills);

    let filteredOptions = predefinedSkillsList.filter(predefinedSkill => {
      return !userWorkExperience[0]?.skills?.includes(predefinedSkill) && predefinedSkill
    });

    return filteredOptions
  });
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  function handleSkillAdd(skill) {
    const updatedWorkExperiences = workExperiences?.map(workExperience => {
      if (workExperience.id === id) {
        let newSkills = [...workExperience.skills, skill]
        return { ...workExperience, skills: newSkills };
      }
      return workExperience;
    });

    updateFormData({ workExperiences: updatedWorkExperiences });
    setSearchTerm('');

    let newOptions = options.filter((option) => option != skill);
    setOptions(newOptions);
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
  }

  function handleCreateOption() {
    if (searchTerm && !options.includes(searchTerm) && !skills.includes(searchTerm)) {
      const updatedWorkExperiences = workExperiences?.map(workExperience => {
        if (workExperience.id === id) {
          let newSkills = [...workExperience.skills, searchTerm]
          return { ...workExperience, skills: newSkills };
        }
        return workExperience;
      });

      updateFormData({ workExperiences: updatedWorkExperiences });
      setSearchTerm('');
    }
  }

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function onChangeHandler(event) {
    setHighlightedIndex(0);
    setSearchTerm(event.target.value)
  }

  const handleKeyPress = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex === filteredOptions.length - 1 && searchTerm ? prevIndex + 1 : prevIndex
        );
        break;
      case 'ArrowUp':
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        break;
      case 'Enter':
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSkillAdd(filteredOptions[highlightedIndex]);
        } else if (searchTerm && !filteredOptions.includes(searchTerm)) {
          handleCreateOption();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex mb-5">
      <div className="mx-5 relative" onKeyDown={handleKeyPress}>
        <input
          type="text"
          placeholder="search skills"
          onFocus={() => { setIsOpen(true) }}
          onBlur={() => {
            setSearchTerm('')
            setIsOpen(false)
          }}
          // ref={inputElement}
          value={searchTerm}
          onChange={(e) => onChangeHandler(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {
          isOpen && (
            <ul className="absolute w-[240px] z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg">
              {
                filteredOptions?.map((skill, index) => (
                  <li
                    key={skill}
                    onClick={() => { handleSkillAdd(skill) }}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                  >{skill}</li>
                ))
              }
              {
                searchTerm && !filteredOptions?.includes(searchTerm) && !skills?.includes(searchTerm) && (
                  <li
                    onClick={handleCreateOption}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${highlightedIndex === filteredOptions.length ? 'bg-gray-200' : ''}`}
                  > create '{searchTerm}' </li>
                )
              }
            </ul>
          )
        }
      </div>
      <div className="mx-5 w-[650px]">
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
      <div className={`${errorObj?.errorStatus ? '' : 'hidden'}`}>
        <span className="text-red-600">
          {errorObj?.title}
        </span>
      </div>
    </div>
  );
}

export default WorkExpDropDown;