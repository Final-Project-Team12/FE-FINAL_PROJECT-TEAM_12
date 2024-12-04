const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
    >
      {children}
    </button>
  );
};

export default Button;
