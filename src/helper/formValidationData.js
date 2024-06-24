const formFields = [
    { name: "firstName", rules: ["required"] },
    { name: "lastName", rules: ["required"] },
    { name: "email", rules: ["required", "email"] },
    { name: "phoneNumber", rules: ["required", "phone"] },
    { name: "designation", rules: ["required"] },
    { name: "gender", rules: ["required"] },
    { name: "dob", rules: ["required"] }
];

export default formFields;