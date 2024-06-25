import { v4 as uuidv4 } from 'uuid';

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
  hindi: { selected: false, skills: { read: false, write: false, speak: false } },
  gujarati: { selected: false, skills: { read: false, write: false, speak: false } },
  english: { selected: false, skills: { read: false, write: false, speak: false } },
  spanish: { selected: false, skills: { read: false, write: false, speak: false } },
}

const initialFormData = {
  id: uuidv4(),
  basicDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    designation: "",
    gender: "",
    relationshipStatus: "single",
    state: "gujarat",
    city: "surat",
    dob: "",
  },
  educationDetails: {
    ssc: {
      boardName: "",
      passingYear: "",
      percentage: "",
    },
    hsc: {
      boardName: "",
      passingYear: "",
      percentage: "",
    },
    bechlor: {
      courseName: "",
      univercityName: "",
      passingYear: "",
      percentage: "",
    },
    master: {
      courseName: "",
      univercityName: "",
      passingYear: "",
      percentage: "",
    },
  },
  technologyKnown: technologyKnown,
  languageKnown: languageKnown,
  workExperiences: [
    {
      id: "1",
      companyName: "",
      designation: "",
      from: "",
      to: "",
    },
  ],
  referenceDetails: [
    {
      id: "1",
      name: "",
      phoneNumber: "",
      relation: "",
    },
  ],
  preferences: {
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    department: "",
    preferedLocations: [],
  },
}

const initialFormErrorData = {
  basicDetails: {
    firstName: {
      errorStatus: false,
      title: ""
    },
    lastName: {
      errorStatus: false,
      title: ""
    },
    email: {
      errorStatus: false,
      title: ""
    },
    phoneNumber: {
      errorStatus: false,
      title: ""
    },
    designation: {
      errorStatus: false,
      title: ""
    },
    gender: {
      errorStatus: false,
      title: ""
    },
    dob: {
      errorStatus: false,
      title: ""
    },
  },
  educationDetails: {
    ssc: {
      boardName: {
        errorStatus: false,
        title: ""
      },
      passingYear: {
        errorStatus: false,
        title: ""
      },
      percentage: {
        errorStatus: false,
        title: ""
      },
    },
    hsc: {
      boardName: {
        errorStatus: false,
        title: ""
      },
      passingYear: {
        errorStatus: false,
        title: ""
      },
      percentage: {
        errorStatus: false,
        title: ""
      },
    },
    bechlor: {
      courseName: {
        errorStatus: false,
        title: ""
      },
      univercityName: {
        errorStatus: false,
        title: ""
      },
      passingYear: {
        errorStatus: false,
        title: ""
      },
      percentage: {
        errorStatus: false,
        title: ""
      },
    },
    master: {
      courseName: {
        errorStatus: false,
        title: ""
      },
      univercityName: {
        errorStatus: false,
        title: ""
      },
      passingYear: {
        errorStatus: false,
        title: ""
      },
      percentage: {
        errorStatus: false,
        title: ""
      },
    },
  },
  technologyKnown: {
    php: {
      errorStatus: false,
      title: ""
    },
    mysql: {
      errorStatus: false,
      title: ""
    },
    node: {
      errorStatus: false,
      title: ""
    },
    react: {
      errorStatus: false,
      title: ""
    }
  },
  languageKnown: {
    hindi: {
      errorStatus: false,
      title: ""
    },
    gujarati: {
      errorStatus: false,
      title: ""
    },
    english: {
      errorStatus: false,
      title: ""
    },
    spanish: {
      errorStatus: false,
      title: ""
    },
  },
  workExperiences: {
    '1': {
      companyName: {
        errorStatus: false,
        title: ""
      },
      designation: {
        errorStatus: false,
        title: ""
      },
      from: {
        errorStatus: false,
        title: ""
      },
      to: {
        errorStatus: false,
        title: ""
      },
    }
  }
}

export {
  stepDetails,
  stateData,
  cityData,
  departmentData,
  officeLocations,
  technologyKnown,
  languageKnown,
  initialFormData,
  initialFormErrorData
};
