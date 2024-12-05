const Button = ({
  children,
  type = 'button',
  disabled,
  onClick,
  className = '',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full bg-[#7126B5] text-white py-2 px-4 rounded-lg ${
        !disabled ? 'hover:bg-[#8348c7]' : 'opacity-70 cursor-not-allowed'
      } transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
