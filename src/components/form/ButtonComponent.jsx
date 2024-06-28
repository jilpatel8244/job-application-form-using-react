function ButtonComponent({type = "button", className, btnText, onClick = null}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
}

export default ButtonComponent;
