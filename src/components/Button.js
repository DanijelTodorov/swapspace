const Button = ({ type, label, handleClick, className }) => {
  if ((type == 0))
    return (
      <div
        className={`border-[1px] border-[#e35760] h-[50px] flex items-center justify-center rounded-md ${className}`}
        onClick={() => handleClick}
      >
        {label}
      </div>
    );
  else if ((type == 1))
    return (
      <div
        className={`bg-[#e35760] h-[50px] flex items-center justify-center rounded-md ${className}`}
        onClick={() => handleClick}
      >
        {label}
      </div>
    );
};

export default Button;
