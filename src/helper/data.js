const stepDetails = [
  {
    stepNumber: 1,
    title: "Basic Details",
  },
  {
    stepNumber: 2,
    title: "Education Details",
  },
  {
    stepNumber: 3,
    title: "Technology Known",
  },
  {
    stepNumber: 4,
    title: "Language Known",
  },
  {
    stepNumber: 5,
    title: "Work Experience",
  },
  {
    stepNumber: 6,
    title: "Reference Details",
  },
  {
    stepNumber: 7,
    title: "Preferences",
  },
];

const stateData = [
  {
    label: "Gujarat",
    value: "gujarat"
  },
  {
    label: "Maharastra",
    value: "maharastra",
  },
  {
    label: "J&K",
    value: "J&K",
  },
  {
    label: "Madhya Pradesh",
    value: "madhya pradesh"
  },
];

const cityData = [
  {
    label: "Surat",
    value: "surat"
  },
  {
    label: "Ahemdabad",
    value: "ahemdabad",
  },
  {
    label: "J&K",
    value: "J&K",
  },
  {
    label: "Madhya Pradesh",
    value: "madhya pradesh"
  },
];

const departmentData = [
  {
    value: "design",
    label: "Design",
  },
  {
    value: "development",
    label: "Development",
  },
];

const officeLocations = [
  { value: "surat", label: "Surat" },
  {
    value: "ahemdabad",
    label: "Ahemdabad",
  },
  {
    value: "vadodara",
    label: "Vadodara",
  },
];

const technologyKnown = {
  php: { selected: false, level: "" },
  mysql: { selected: false, level: "" },
  node: { selected: false, level: "" },
  react: { selected: false, level: "" }
}

const languageKnown = {
  hindi: { selected: false, skills: {read: false, write: false, speak: false} },
  gujarati: { selected: false, skills: {read: false, write: false, speak: false} },
  english: { selected: false, skills: {read: false, write: false, speak: false} },
  spanish: { selected: false, skills: {read: false, write: false, speak: false} },
}

export {
  stepDetails,
  stateData,
  cityData,
  departmentData,
  officeLocations,
  technologyKnown,
  languageKnown,
};
