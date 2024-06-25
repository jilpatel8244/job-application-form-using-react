const formBasicDetailsFields = [
    { name: "firstName", rules: ["required", "string"] },
    { name: "lastName", rules: ["required", "string"] },
    { name: "email", rules: ["required", "email"] },
    { name: "phoneNumber", rules: ["required", "phone"] },
    { name: "designation", rules: ["required", "string"] },
    { name: "gender", rules: ["required"] },
    { name: "dob", rules: ["required"] }
];

const formPreferencesFields = [
    { name: "currentCTC", rules: ["required", "number"] },
    { name: "expectedCTC", rules: ["required", "number"] },
    { name: "noticePeriod", rules: ["required", "number"] },
    { name: "department", rules: ["required"] },
    { name: "preferedLocations", rules: ["required"] },
];

const formReferenceFields = [
    { name: "companyName", rules: ["string"] },
    { name: "designation", rules: ["string"] },
    { name: "from", rules: [] },
    { name: "to", rules: [] }
];

const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
};

const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(String(password));
};

const isNumber = (number) => {
    return !isNaN(number)
}

const isString = value => typeof value === 'string' && /^[a-zA-Z]+$/.test(value);


export { validateEmail, validatePhone, validatePassword, isNumber, isString, formReferenceFields, formBasicDetailsFields, formPreferencesFields };
