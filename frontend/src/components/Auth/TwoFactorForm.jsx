// src/components/Auth/TwoFactorForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OTPInput from '../common/OTPInput';
import FormButton from '../common/FormButton';
import { fadeIn, slideUp } from '../../utils/animations';

const TwoFactorForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleOTPComplete = (otpCode) => {
    setCode(otpCode);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Por favor, insira o código completo');
      return;
    }

    setLoading(true);
    setError('');
    
    // TODO: Integração com API
    setTimeout(() => {
      console.log('Código 2FA:', code);
      setLoading(false);
      // Simular erro (remover em produção)
      // setError('Código inválido. Tente novamente.');
      // navigate('/dashboard'); // Redirecionar após sucesso
    }, 2000);
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setResendCooldown(60);
    
    // TODO: Integração com API para reenviar código
    console.log('Reenviando código...');

    // Countdown
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <motion.div 
      className="w-full max-w-[90%] md:max-w-[540px] px-5 md:px-8 py-8 md:py-10 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 shadow-[0px_8px_8px_-4px_rgba(10,13,18,0.04)] shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.10)] flex flex-col justify-start items-center gap-6 md:gap-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {/* Ícone */}
      <motion.div 
        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center"
        variants={slideUp}
      >
        <Lock className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
      </motion.div>

      {/* Header do Form */}
      <motion.div 
        className="flex flex-col justify-start items-center gap-2"
        variants={slideUp}
      >
        <h1 className="text-center text-gray-900 text-xl md:text-2xl font-semibold font-['Manrope'] leading-normal">
          Autenticação de dois fatores
        </h1>
        <p className="text-center text-grey-600 text-xs md:text-sm font-normal font-['Manrope'] leading-tight">
          Para autorizar o login, insira o código enviado em seu email.
        </p>
      </motion.div>

      {/* Formulário */}
      <motion.form 
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 md:gap-6"
        variants={slideUp}
      >
        {/* Label */}
        <div className="flex flex-col gap-3">
          <label className="text-gray-700 text-sm font-medium font-['Manrope'] leading-tight text-center">
            Código de verificação
          </label>
          
          {/* OTP Input */}
          <OTPInput 
            length={6}
            onComplete={handleOTPComplete}
            error={error}
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-xs md:text-sm font-normal font-['Manrope'] text-center mt-2">
              {error}
            </p>
          )}
        </div>

        {/* Resend Link */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm">
          <span className="text-gray-600 font-normal font-['Manrope']">
            Não recebeu o código?
          </span>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendCooldown > 0}
            className={`
              font-medium font-['Manrope']
              ${resendCooldown > 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 hover:text-blue-700 transition-colors'
              }
            `}
          >
            {resendCooldown > 0 
              ? `Reenviar em ${resendCooldown}s`
              : 'Clique aqui para reenviar'
            }
          </button>
        </div>

        {/* Botões */}
        <div className="flex flex-col md:flex-row gap-3 mt-2">
          <FormButton
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
            fullWidth
          >
            Cancelar
          </FormButton>

          <FormButton
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading || code.length !== 6}
            fullWidth
          >
            Confirmar
          </FormButton>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default TwoFactorForm;