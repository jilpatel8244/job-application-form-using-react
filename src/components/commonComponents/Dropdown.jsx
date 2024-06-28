import React, { useState, useRef, useEffect } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([
    'Task',
    'Lecture',
    'Section',
    'Seminar',
    'Study Group',
    'Reading',
    'Dip',
  ]);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCreateOption = () => {
    if (searchTerm && !options.includes(searchTerm)) {
      setOptions([...options, searchTerm]);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search for an option..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          <div className="p-2">
            <p className="mb-2 text-gray-600">Select an option or create one</p>
            <ul>
              {filteredOptions.map(option => (
                <li
                  key={option}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
              {searchTerm && !filteredOptions.includes(searchTerm) && (
                <li
                  className="p-2 text-blue-500 cursor-pointer hover:bg-gray-200"
                  onClick={handleCreateOption}
                >
                  Create "{searchTerm}"
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
