// src/components/Auth/LoginForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../common/InputField';
import FormButton from '../common/FormButton';
import { fadeIn, slideUp } from '../../utils/animations';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // TODO: Integração com API
    setTimeout(() => {
      console.log('Login:', formData);
      setLoading(false);
      // navigate('/dashboard'); // Redirecionar após sucesso
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <motion.div 
      className="w-full max-w-[90%] md:max-w-[440px] px-5 md:px-8 py-8 md:py-10 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 shadow-[0px_8px_8px_-4px_rgba(10,13,18,0.04)] shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.10)] flex flex-col justify-start items-center gap-6 md:gap-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {/* Ícone */}
      <motion.div 
        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center"
        variants={slideUp}
      >
        <LogIn className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
      </motion.div>

      {/* Header do Form */}
      <motion.div 
        className="flex flex-col justify-start items-center gap-2"
        variants={slideUp}
      >
        <h1 className="text-center text-gray-900 text-xl md:text-2xl font-semibold font-['Manrope'] leading-normal">
          Realize login
        </h1>
        <p className="text-center text-grey-600 text-xs md:text-sm font-normal font-['Manrope'] leading-tight">
          Seja bem vindo de volta!
        </p>
      </motion.div>

      {/* Formulário */}
      <motion.form 
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 md:gap-5"
        variants={slideUp}
      >
        {/* Campo Email */}
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        {/* Campo Password */}
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        {/* Remember Me + Forgot Password */}
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
            />
            <span className="text-gray-700 text-xs md:text-sm font-normal font-['Manrope'] leading-tight">
              Relembre por 30 dias
            </span>
          </label>

          <Link
            to="/forgot-password"
            className="text-blue-600 text-xs md:text-sm font-medium font-['Manrope'] leading-tight hover:text-blue-700 transition-colors"
          >
            Esqueci minha senha
          </Link>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-2.5 md:gap-3 mt-2 md:mt-3">
          <FormButton
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            Confirmar
          </FormButton>

          <FormButton
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </FormButton>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default LoginForm;