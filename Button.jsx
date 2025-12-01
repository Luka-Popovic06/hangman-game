import { useState } from "react";
const Button = ({ children, btnType, variation, clickAction }) => {
  let btnClass;
  if (variation === "primary") btnClass = "primary-btn";
  if (variation === "primary-red") btnClass = "primary-btn active-red";
  if (variation === "secondary") btnClass = "secondary-btn";

  return (
    <button type={btnType} className={btnClass} onClick={clickAction}>
      {children}
    </button>
  );
};
export default Button;
