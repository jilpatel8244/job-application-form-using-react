import { cityData, stateData } from "../helper/data";
import InputRadio from "./InputRadio";
import InputText from "./InputText";
import SelectComponent from "./SelectComponent";

function BasicDetails({ basicDetails, basicDetailsError, updateFormData }) {
  function handleChange(event) {
    const { name, value } = event.target;
    updateFormData({ basicDetails: { ...basicDetails, [name]: value } })
  }

  return (
    <div className="max-w-[50%] w-[50%]">
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputText
          type="text"
          name="firstName"
          id="firstName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Jil"
          label="First Name"
          value={basicDetails.firstName}
          handleChange={handleChange}
          errorObj={basicDetailsError.firstName}
        />
        <InputText
          type="text"
          name="lastName"
          id="lastName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Patel"
          label="Last Name"
          value={basicDetails.lastName}
          handleChange={handleChange}
          errorObj={basicDetailsError.lastName}
        />
      </div>
      <InputText
        type="text"
        name="email"
        id="email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="xyz@gmail.com"
        label="Email"
        value={basicDetails.email}
        handleChange={handleChange}
        errorObj={basicDetailsError.email}
      />
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputText
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="enter your mobile number"
          label="Phone number (123-456-7890)"
          value={basicDetails.phoneNumber}
          handleChange={handleChange}
          errorObj={basicDetailsError.phoneNumber}
        />
        <InputText
          type="text"
          name="designation"
          id="designation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="enter your designation"
          label="Designation"
          value={basicDetails.designation}
          handleChange={handleChange}
          errorObj={basicDetailsError.designation}
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Gender
          </span>
          <div className="flex">
            <div className="flex items-center">
              <InputRadio
                type="radio"
                name="gender"
                id="male"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                label="Male"
                value="male"
                checked={basicDetails.gender === "male" ? true : false}
                handleChange={handleChange}
              />
            </div>
            <div>
              <InputRadio
                type="radio"
                name="gender"
                id="female"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                label="Female"
                value="female"
                checked={basicDetails.gender === "female" ? true : false}
                handleChange={handleChange}
              />
            </div>
          </div>
          <div className={`${basicDetailsError.gender.errorStatus ? '' : 'hidden'}`}>
            <span className="text-red-600">
              {basicDetailsError.gender.title}
            </span>
          </div>
        </div>
        <SelectComponent
          name="relationshipStatus"
          id="relationshipStatus"
          label="Relationship Status"
          options={[
            { value: "single", label: "Single" },
            { value: "marrid", label: "Marrid" },
          ]}
          value={basicDetails.relationshipStatus}
          handleChange={handleChange}
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <SelectComponent
          name="state"
          id="state"
          label="State"
          value={basicDetails.state}
          options={stateData}
          handleChange={handleChange}
        />
        <SelectComponent
          name="city"
          id="city"
          label="City"
          value={basicDetails.city}
          options={cityData}
          handleChange={handleChange}
        />
      </div>

      <InputText
        type="date"
        name="dob"
        id="dob"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
        label="Date Of Birth"
        value={basicDetails.dob}
        handleChange={handleChange}
        errorObj={basicDetailsError.dob}
      />
    </div>
  );
}

export default BasicDetails;
