import React, { useState, useEffect, useRef } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [options, setOptions] = useState([
    'Task',
    'Lecture',
    'Section',
    'Seminar',
    'Study Group',
    'Reading',
    'Dip',
  ]);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateOption = () => {
    if (searchTerm && !options.includes(searchTerm)) {
      setOptions([...options, searchTerm]);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const handleSkillAdd = (skill) => {
    setSearchTerm(skill);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
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
    <div className="relative" onKeyDown={handleKeyDown}>
      <input
        type="text"
        placeholder="search skills"
        onFocus={() => { setIsOpen(true) }}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        list="skillOptions"
      />
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {filteredOptions.map((skill, index) => (
            <li
              key={skill}
              onClick={() => handleSkillAdd(skill)}
              className={`p-2 cursor-pointer ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
            >
              {skill}
            </li>
          ))}
          {searchTerm && !filteredOptions.includes(searchTerm) && (
            <li
              onClick={handleCreateOption}
              className={`p-2 cursor-pointer ${highlightedIndex === filteredOptions.length ? 'bg-gray-200' : ''}`}
            >
              create '{searchTerm}'
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
