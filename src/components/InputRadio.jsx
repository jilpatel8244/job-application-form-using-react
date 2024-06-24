function InputRadio({ type, name, id, className, label, value, checked, handleChange }) {
    return (
        <>
          <input
            checked={checked}
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={(e) => {handleChange(e)}}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={id}
            className="ms-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
          </label>
      </>
    )
}

export default InputRadio;