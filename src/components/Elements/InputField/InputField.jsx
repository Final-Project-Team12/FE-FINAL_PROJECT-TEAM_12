import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = forwardRef(
  (
    {
      label,
      error,
      type = 'text',
      placeholder,
      rightElement,
      className = '',
      wrapperClassName = '',
      labelClassName = '',
      showPasswordToggle = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle
      ? showPassword
        ? 'text'
        : 'password'
      : type;

    const passwordToggle = showPasswordToggle && (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-gray-400 hover:text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    );

    return (
      <div className={`relative min-h-[76px] ${wrapperClassName}`}>
        {label && (
          <label
            className={`block text-sm font-normal mb-2 text-gray-900 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:border-[#7126B5] ${className}`}
            placeholder={placeholder}
            {...props}
          />
          {(rightElement || passwordToggle) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightElement || passwordToggle}
            </div>
          )}
        </div>
        {error && (
          <p className="absolute text-xs text-red-500 mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
