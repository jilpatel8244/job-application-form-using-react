import React from "react";
import "../../assets/css/Alert.css";
import { createPortal } from "react-dom";
import alertImg from "../../assets/caution.png";
import successImg from "../../assets/checked.png";

const Alert = ({
  title,
  message,
  icon,
  resolve,
  showConfirmButton,
  showCancelButton,
  confirmButtonText,
  cancelButtonText,
}) => { 

  const handleConfirm = () => {
    resolve(true);
  };

  const handleCancel = () => {
    resolve(false);
  };

  return createPortal(
    <div className="alert-overlay">
      <div className="alert-box">
        <div>
          {icon && <img className="m-auto" src={icon==="success" ? successImg : alertImg} width={50} height={50} />}
        </div>
        <h2 className="font-bold">{title}</h2>
        <p>{message}</p>
        <div className="alert-buttons">
          {showConfirmButton && (
            <button className="alert-confirm" onClick={handleConfirm}>
              {confirmButtonText}
            </button>
          )}
          {showCancelButton && (
            <button className="alert-cancel" onClick={handleCancel}>
              {cancelButtonText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("popup")
  );
};

export default Alert;
