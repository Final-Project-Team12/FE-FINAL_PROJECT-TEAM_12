const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  rightElement,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-normal mb-2 text-gray-900">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
