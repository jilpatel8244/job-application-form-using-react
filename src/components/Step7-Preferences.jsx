import { departmentData, officeLocations } from "../helper/data";
import InputText from "./InputText";
import SelectComponent from "./SelectComponent";

function Preferences({ preferences, updateFormData }) {
  function handleChange(event) {
    const { name, value } = event.target;
    let newValue = value;

    if (name === "preferedLocations") {
      newValue = Array.from(event.target.options).filter(option => option.selected).map(option => option.value);
    }
    updateFormData({ preferences: { ...preferences, [name]: newValue } });
  }

  return (  
    <div className="max-w-[50%] w-[50%]">
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputText
          type="text"
          name="currentCTC"
          id="currentCTC"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          label="Current CTC"
          value={preferences.currentCTC}
          handleChange={handleChange}
        />
        <InputText
          type="text"
          name="expectedCTC"
          id="expectedCTC"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          label="Expected CTC"
          value={preferences.expectedCTC}
          handleChange={handleChange}
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputText
          type="text"
          name="noticePeriod"
          id="noticePeriod"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          label="Notice Period"
          value={preferences.noticePeriod}
          handleChange={handleChange}
        />
        <SelectComponent
          name="department"
          id="department"
          label="Department"
          options={departmentData}
          value={preferences.department}
          handleChange={handleChange}
        />
      </div>
      <SelectComponent
        name="preferedLocations"
        id="preferedLocations"
        label="Prefered Locations"
        options={officeLocations}
        multiple="true"
        value={preferences.preferedLocations}
        handleChange={handleChange}
      />
    </div>
  );
}

export default Preferences;
