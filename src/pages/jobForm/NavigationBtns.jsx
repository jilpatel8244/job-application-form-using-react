import ButtonComponent from "../../components/form/ButtonComponent";
import { stepDetails } from "../../data/data";

function NavigationBtns({currentStep, nextBtnHandler, prevBtnHandler}) {
  return (
    <div className="flex justify-center">
      {currentStep > 1 && (
        <ButtonComponent
          type="button"
          btnText="Prev"
          onClick={prevBtnHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        />
      )}
      {currentStep <= Object.keys(stepDetails)?.length && (
        <ButtonComponent
          type="button"
          btnText={currentStep === Object.keys(stepDetails)?.length ? 'Submit' : 'Next'}
          onClick={nextBtnHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        />
      )}
    </div>
  );
}

export default NavigationBtns;
