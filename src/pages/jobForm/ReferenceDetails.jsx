import { useContext, useState } from "react";
import InputText from "../../components/form/InputText";
import { v4 as uuidv4 } from 'uuid';
import { FormContext } from "../../context/FormContext";
import { relations } from "../../data/data";
import SelectComponent from "../../components/form/SelectComponent";

function ReferenceDetails() {
  const { formData: { referenceDetails }, formErrorData, updateFormData } = useContext(FormContext);
  const referenceDetailsError = formErrorData.referenceDetails;

  function handleChange(event) {
    const { name, value, id } = event.target;
    const [field, specificObjId, phoneNumberId] = id.split("_");

    const updatedReferenceDetails = referenceDetails.map((reference) => {
      if (reference.id === specificObjId) {
        if (phoneNumberId) {
          let updatedPhoneNumber = reference.phoneNumber.map((phn) => {
            if (phn.id === phoneNumberId) {
              return {...phn, value: value}
            }
            return phn
          });
          return { ...reference, phoneNumber: updatedPhoneNumber }
        } else {
          return { ...reference, [name]: value };
        }
      }
      return reference;
    });

    updateFormData({ referenceDetails: updatedReferenceDetails });
    console.log(referenceDetails);
  }

  function addAnotherReference() {
    const newReference = {
      id: uuidv4(),
      name: "",
      phoneNumber: [{
        id: "1",
        value: ""
      }],
      relation: ""
    }
    updateFormData({ referenceDetails: [...referenceDetails, newReference] });
  }

  function deleteReference(id) {
    if (referenceDetails.length > 1) {
      let filteredReference = referenceDetails.filter((reference) => {
        return reference.id != id;
      });
      updateFormData({ referenceDetails: filteredReference })
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
          return <ReferenceDetailsLine key={referenceDetail.id} referenceDetailsError={referenceDetailsError} {...referenceDetail} deleteReference={deleteReference} handleChange={handleChange} />
        })
      }
    </div>
  );
}

export default ReferenceDetails;

function ReferenceDetailsLine({ id, name, phoneNumber, relation, deleteReference, handleChange, referenceDetailsError }) {
  const { formData: { referenceDetails }, updateFormData } = useContext(FormContext);
  const [isRelationCustom, setIsRelationCustom] = useState();

  function handleRelation(event) {
    let { type, name, value } = event.target;

    if (type === "select-one" && value === "custom") {
      setIsRelationCustom(true);
      value = ""
    }

    const updatedReferenceDetails = referenceDetails.map((reference) => {
      if (reference.id === id) {
        return { ...reference, [name]: value };
      }
      return reference;
    });
    updateFormData({ referenceDetails: updatedReferenceDetails });
  }

  function addNewPhoneNumberField() {
    const updatedReferenceDetails = referenceDetails?.map(singleReference => {
      if (singleReference.id === id) {
        let newPhoneNumbers = [...singleReference.phoneNumber, {
          id: uuidv4(),
          value: ""
        }]
        return { ...singleReference, phoneNumber: newPhoneNumbers };
      }
      return singleReference;
    });

    updateFormData({ referenceDetails: updatedReferenceDetails });
    console.log(referenceDetails);
  }

  function deletePhoneNumber(deletedPhnId) {
    const updatedReferenceDetails = referenceDetails?.map(singleReference => {
      if (singleReference.id === id) {
        let filteredPhoneNumbers = singleReference.phoneNumber.filter((phn) => phn.id !== deletedPhnId);
        return { ...singleReference, phoneNumber: filteredPhoneNumbers };
      }
      return singleReference;
    });

    updateFormData({ referenceDetails: updatedReferenceDetails });
    console.log(referenceDetails);
  }

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
          errorObj={referenceDetailsError[`name_${id}`]}
        />
      </div>
      <div className="mx-5">
        {
          isRelationCustom ? (
            <InputText
              type="text"
              name="relation"
              id={`relation_${id}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              label="Relation"
              value={relation}
              handleChange={handleRelation}
              errorObj={referenceDetailsError[`relation_${id}`]}
            />
          ) :
            (
              <SelectComponent
                name="relation"
                id={`relation_${id}`}
                label="Relation"
                value={relation}
                options={relations}
                handleChange={handleRelation}
                errorObj={referenceDetailsError[`relation_${id}`]}
              />
            )
        }

      </div>
      <div className="mx-5">
        {
          phoneNumber.map((phn) => (
            <InputText
              key={phn.id}
              type="number"
              name={`phoneNumber_${phn.id}`}
              id={`phoneNumber_${id}_${phn.id}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              label="Phone Number"
              value={phn.value}
              handleChange={handleChange}
              errorObj={referenceDetailsError[`phoneNumber_${id}_${phn.id}`]}
            >
              <button type="button" onClick={() => { deletePhoneNumber(phn.id) }}>delete contact</button>
            </InputText>

          ))
        }
        <button type="button" onClick={() => { addNewPhoneNumberField() }}>Add another phone number</button>
      </div>
      <button type="button" onClick={() => { deleteReference(id) }}>
        delete
      </button>
    </div>
  );
}