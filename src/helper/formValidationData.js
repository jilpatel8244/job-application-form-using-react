const formFields = [
    { name: "firstName", rules: ["required"] },
    { name: "lastName", rules: ["required"] },
    { name: "email", rules: ["required", "email"] },
    { name: "phoneNumber", rules: ["required", "phone"] },
    { name: "designation", rules: ["required"] },
    { name: "gender", rules: ["required"] },
    { name: "dob", rules: ["required"] }
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

export { validateEmail, validatePhone, validatePassword };

export default formFields;