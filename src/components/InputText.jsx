function InputText({ type, name, id, className, placeholder, label, value, handleChange }) {
  return (
      <div className="mb-5">
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => {handleChange(e)}}
          name={name}
          className={className}
          placeholder={placeholder}
        />
    </div>
  );
}

export default InputText;
