import { useState } from "react";
import "./ErrorPopup.css";

export function ErrorPopUp({ errorMessage, setError }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setError(false);
    }, 300);
  };

  return (
    <div id="PopupContainer" className={isClosing ? "slide-out" : "slide-in"}>
      <h3>⚠️ Thông báo lỗi</h3>
      <p>{errorMessage}</p>
      <button onClick={handleClose}>Đóng</button>
    </div>
  );
}