// src/components/common/FormButton.jsx
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const FormButton = ({ 
  children, 
  type = 'button',
  variant = 'primary', // 'primary' ou 'secondary'
  onClick,
  disabled = false,
  loading = false,
  fullWidth = true
}) => {
  const isPrimary = variant === 'primary';

  const baseClasses = `
    px-4 py-2.5 rounded-lg 
    shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]
    inline-flex justify-center items-center gap-2
    font-semibold font-['Manrope'] text-base leading-normal
    transition-all duration-200
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const variantClasses = isPrimary
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-white text-gray-700 outline outline-1 outline-offset-[-1px] outline-gray-300 hover:bg-gray-50';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses}`}
      whileHover={!disabled && !loading ? { scale: 1.01 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.99 } : {}}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default FormButton;
