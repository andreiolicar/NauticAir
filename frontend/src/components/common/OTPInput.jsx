// src/components/common/OTPInput.jsx
import { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, onComplete, error }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Auto-focus no primeiro input ao montar
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Aceita apenas números
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Pega apenas o último dígito digitado
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move para o próximo input se houver valor
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Chama callback se todos os campos estiverem preenchidos
    const otpString = newOtp.join('');
    if (otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace: limpa e volta para input anterior
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
    // Arrow keys: navegação entre inputs
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Valida se contém apenas números
    if (!/^\d+$/.test(pastedData)) return;

    const pastedArray = pastedData.slice(0, length).split('');
    const newOtp = [...otp];
    
    pastedArray.forEach((value, index) => {
      if (index < length) {
        newOtp[index] = value;
      }
    });

    setOtp(newOtp);

    // Foca no último input preenchido ou no próximo vazio
    const nextIndex = Math.min(pastedArray.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    // Chama callback se completo
    const otpString = newOtp.join('');
    if (otpString.length === length) {
      onComplete(otpString);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3">
      {/* Primeiro grupo: 3 dígitos */}
      {otp.slice(0, 3).map((digit, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`
            w-12 h-14 md:w-16 md:h-20
            bg-white rounded-lg
            shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]
            outline outline-1 outline-offset-[-1px]
            ${error ? 'outline-red-500' : 'outline-gray-300'}
            text-gray-900 text-2xl md:text-4xl font-bold
            text-center
            focus:outline-blue-600 focus:ring-2 focus:ring-blue-100
            transition-all duration-200
          `}
          aria-label={`Dígito ${index + 1}`}
        />
      ))}

      {/* Separador visual */}
      <div className="w-3 h-0.5 bg-gray-300 mx-1" />

      {/* Segundo grupo: 3 dígitos */}
      {otp.slice(3, 6).map((digit, index) => {
        const actualIndex = index + 3;
        return (
          <input
            key={actualIndex}
            ref={(ref) => (inputRefs.current[actualIndex] = ref)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(actualIndex, e.target.value)}
            onKeyDown={(e) => handleKeyDown(actualIndex, e)}
            onPaste={handlePaste}
            className={`
              w-12 h-14 md:w-16 md:h-20
              bg-white rounded-lg
              shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]
              outline outline-1 outline-offset-[-1px]
              ${error ? 'outline-red-500' : 'outline-gray-300'}
              text-gray-900 text-2xl md:text-4xl font-bold
              text-center
              focus:outline-blue-600 focus:ring-2 focus:ring-blue-100
              transition-all duration-200
            `}
            aria-label={`Dígito ${actualIndex + 1}`}
          />
        );
      })}
    </div>
  );
};

export default OTPInput;