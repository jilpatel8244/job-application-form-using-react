import { v4 as uuidv4 } from 'uuid';

// const stepDetails = [
//   {
//     stepNumber: 1,
//     title: "Basic Details",
//   },
//   {
//     stepNumber: 2,
//     title: "Education Details",
//   },
//   {
//     stepNumber: 3,
//     title: "Technology Known",
//   },
//   {
//     stepNumber: 4,
//     title: "Language Known",
//   },
//   {
//     stepNumber: 5,
//     title: "Work Experience",
//   },
//   {
//     stepNumber: 6,
//     title: "Reference Details",
//   },
//   {
//     stepNumber: 7,
//     title: "Preferences",
//   },
// ];

const stepDetails = {
  1: {
    title: "Basic Details",
    name: "basicDetails"
  },
  2: {
    title: "Education Details",
    name: "educationDetails"
  },
  3: {
    stepNumber: 3,
    title: "Technology Known",
    name: "technologyKnown"
  },
  4: {
    stepNumber: 4,
    title: "Language Known",
    name: "languageKnown"
  },
  5: {
    title: "Work Experience",
    name: "workExperiences"
  },
  6: {
    title: "Reference Details",
    name: "referenceDetails"
  },
  7: {
    title: "Preferences",
    name: "preferences"
  },
};


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
    value: "",
    label: "select department",
  },
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

const technologies = [ 'php', 'mysql', 'node', 'react' ];

const languages = [ 'hindi', 'gujarati', 'english', 'spanish'];

const relations = [
  {
    value: "",
    label: "Select Relation",
  },
  {
    value: "brother",
    label: "Brother",
  },
  {
    value: "sister",
    label: "Sister",
  },
  {
    value: "husband",
    label: "Husband",
  },
  {
    value: "mother",
    label: "Mother",
  },
  {
    value: "father",
    label: "Father",
  },
  {
    value: "custom",
    label: "Custom",
  },
];

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
    profileImg: ""
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
  technologyKnown: {},
  languageKnown: {},
  workExperiences: [
    {
      id: "1",
      companyName: "",
      designation: "",
      from: "",
      to: "",
      skills: []
    },
  ],
  referenceDetails: [
    {
      id: "1",
      name: "",
      phoneNumber: [
        {
          id: "1",
          value: ""
        }
      ],
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
    profileImg: {
      errorStatus: false,
      title: ""
    }
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
    errorStatus: false,
    title: ""
  },
  languageKnown: {
    errorStatus: false,
    title: ""
  },
  workExperiences: {},
  referenceDetails: {},
  preferences: {
    currentCTC: {
      errorStatus: false,
      title: ""
    },
    expectedCTC: {
      errorStatus: false,
      title: ""
    },
    noticePeriod: {
      errorStatus: false,
      title: ""
    },
    preferedLocations: {
      errorStatus: false,
      title: ""
    },
  }
}

const predefinedSkillsList = ["node", "react", "angular", "database", "mysql", "express", "sequelize"];

export {
  stepDetails,
  stateData,
  cityData,
  departmentData,
  officeLocations,
  initialFormData,
  initialFormErrorData,
  predefinedSkillsList,
  technologies,
  languages,
  relations
};
