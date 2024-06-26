function InputText({ type, name, id, className, placeholder, label, value, handleChange, errorObj }) {
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
        onChange={(e) => { handleChange(e) }}
        name={name}
        className={className}
        placeholder={placeholder}
      />
      <div className={`${errorObj?.errorStatus ? '' : 'hidden'}`}>
        <span className="text-red-600">
          {errorObj?.title}
        </span>
      </div>
    </div>
  );
}

export default InputText;
