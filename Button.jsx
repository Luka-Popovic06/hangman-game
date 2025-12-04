const Button = ({ children, btnType, variation, clickAction }) => {
  let btnClass;
  if (variation === "primary") btnClass = "primary-btn";
  if (variation === "primary-red") btnClass = "primary-btn active-red";
  if (variation === "secondary") btnClass = "secondary-btn";
  if (variation === "") btnClass = "btn";
  if (variation === "secondary-red") btnClass = "secondary-red-btn";

  return (
    <button
      type={btnType}
      disabled={btnClass === "secondary-red-btn" ? true : false}
      className={btnClass}
      onClick={clickAction}
    >
      {children}
    </button>
  );
};
export default Button;
