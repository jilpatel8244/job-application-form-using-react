import InputText from "./InputText";
import { v4 as uuidv4 } from 'uuid';

function ReferenceDetails({referenceDetails, updateFormData}) {

  function handleChange(event) {
    const {name, value, id} = event.target;
    const specificObjId = id.split("_")[1];

    const updatedReferenceDetails = referenceDetails.map((reference) => {
      if (reference.id === specificObjId) {
        return {...reference, [name]: value};
      }

      return reference;
    });

    updateFormData({referenceDetails: updatedReferenceDetails})
  }

  function addAnotherReference() {
    const newReference = {
      id: uuidv4(),
      name: "",
      phoneNumber: "",
      relation: ""
    }

    updateFormData({referenceDetails: [...referenceDetails, newReference]});
  }

  function deleteReference(id) {
    if (referenceDetails.length > 1) {
      let filteredReference = referenceDetails.filter((reference) => {
        return reference.id != id;
      });
      updateFormData({referenceDetails: filteredReference})
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={addAnotherReference}
        className="w-full m-5 flex justify-end"
      >
        Add
      </button>
      {
        referenceDetails.map((referenceDetail) => {
          return <ReferenceDetailsLine key={referenceDetail.id} {...referenceDetail} deleteReference={deleteReference} handleChange={handleChange} />
        })
      }
    </div>
  );
}

export default ReferenceDetails;

function ReferenceDetailsLine({id, name, phoneNumber, relation, deleteReference, handleChange}) {
  return (
    <div className="flex">
      <div className="mx-5">
        <InputText
          type="text"
          name="name"
          id={`name_${id}`}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          label="Name"
          value={name}
          handleChange={handleChange}
        />
      </div>
      <div className="mx-5">
        <InputText
          type="number"
          name="phoneNumber"
          id={`phoneNumber_${id}`}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          label="Phone Number"
          value={phoneNumber}
          handleChange={handleChange}
        />
      </div>
      <div className="mx-5">
        <InputText
          type="text"
          name="relation"
          id={`relation_${id}`}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          label="Relation"
          value={relation}
          handleChange={handleChange}
        />
      </div>
      <button type="button" onClick={() => {deleteReference(id)}}>
        delete
      </button>
    </div>
  );
}