// src/components/common/InputField.jsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ 
  label, 
  type = 'text',
  name,
  placeholder,
  helperText,
  required = false,
  value,
  onChange,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
      <label 
        htmlFor={name}
        className="text-gray-700 text-sm font-medium font-['Manrope'] leading-tight"
      >
        {label}{required && '*'}
      </label>
      
      <div className="relative w-full">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-3 md:px-3.5 py-2 md:py-2.5 bg-white rounded-lg 
            shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] 
            outline outline-1 outline-offset-[-1px]
            ${error ? 'outline-red-500' : 'outline-gray-300'}
            text-gray-900 text-sm md:text-base font-normal font-['Manrope'] 
            leading-normal placeholder:text-gray-500
            focus:outline-blue-600 focus:ring-2 focus:ring-blue-100
            transition-all duration-200
          `}
        />
        
        {/* Toggle Password Visibility */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff size={18} className="md:w-5 md:h-5" /> : <Eye size={18} className="md:w-5 md:h-5" />}
          </button>
        )}
      </div>

      {/* Helper Text ou Error Message */}
      {helperText && !error && (
        <p className="text-gray-600 text-xs md:text-sm font-normal font-['Manrope'] leading-tight">
          {helperText}
        </p>
      )}
      
      {error && (
        <p className="text-red-500 text-xs md:text-sm font-normal font-['Manrope'] leading-tight">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
