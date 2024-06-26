import { stepDetails } from "../../data/data";

function ProgressBar({ currentStep }){
    return (
        <div>
            <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                {
                    stepDetails.map((step) => {
                        return (
                            <li key={step.stepNumber} className={`flex items-center ${step.stepNumber === currentStep ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                                <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${step.stepNumber === currentStep ? 'border-blue-600 dark:border-blue-500' : ''} rounded-full shrink-0`}>
                                    {step.stepNumber}
                                </span>
                                {step.title}
                                {
                                    step.stepNumber !== stepDetails.length &&
                                    (
                                        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                                        </svg>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}

export default ProgressBar;