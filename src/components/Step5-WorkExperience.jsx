import InputText from "./InputText";
import { v4 as uuidv4 } from 'uuid';

function WorkExperience({ workExperiences, updateFormData }) {
  function handleChange(event) {
    const { name, value, id } = event.target;
    const specificObjId = id.split("_")[1];
    
    const updatedWorkExperiences = workExperiences.map(workExperience => {
      if (workExperience.id === specificObjId) {
        return { ...workExperience, [name]: value };
      }
      return workExperience;
    });
    updateFormData({ workExperiences: updatedWorkExperiences });
  }

  function addAnotherExperience() {
    let newWorkExperience = {
      id: uuidv4(),
      companyName: "",
      designation: "",
      from: "",
      to: "",
    };

    updateFormData({workExperiences: [...workExperiences, newWorkExperience]});
  }

  function deleteExperience(id) {
    if (workExperiences.length > 1) {
      let filterdWorkExperience = workExperiences.filter((workExperience) => {
        return workExperience.id !== id
      });
      
      updateFormData({workExperiences: [...filterdWorkExperience]});
    }
  }

  return (
    <div>
      <button
        type="button"
        className="w-full m-5 flex justify-end"
        onClick={addAnotherExperience}
      >
        Add
      </button>
      {workExperiences.map((workExperience) => {
        return <WorkExperienceLine key={workExperience.id} {...workExperience} handleChange={handleChange} deleteExperience={deleteExperience} />;
      })}
    </div>
  );
}

export default WorkExperience;

function WorkExperienceLine({ id, companyName, designation, from, to, handleChange, deleteExperience }) {
  const inputFields = [
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "designation", label: "Designation", type: "text" },
    { name: "from", label: "From", type: "date" },
    { name: "to", label: "To", type: "date" }
  ];

  return (
    <div className="flex">
      {inputFields.map((field) => (
        <div key={field.name} className="mx-5">
          <InputText
            type={field.type}
            name={field.name}
            id={`${field.name}_${id}`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            label={field.label}
            value={field.name === "companyName" ? companyName : field.name === "designation" ? designation : field.name === "from" ? from : to}
            handleChange={handleChange}
          />
        </div>
      ))}
      <button type="button" onClick={() => { deleteExperience(id) }}>
        delete
      </button>
    </div>
  );
}
