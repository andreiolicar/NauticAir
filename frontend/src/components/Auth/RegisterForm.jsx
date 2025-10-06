// src/components/Auth/RegisterForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InputField from '../common/InputField';
import FormButton from '../common/FormButton';
import { fadeIn, slideUp } from '../../utils/animations';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    setTimeout(() => {
      console.log('Registro:', formData);
      setLoading(false);
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
      {/* Ícone - Menor no mobile */}
      <motion.div 
        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center"
        variants={slideUp}
      >
        <LogIn className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
      </motion.div>

      {/* Header do Form - Typography responsivo */}
      <motion.div 
        className="flex flex-col justify-start items-center gap-2"
        variants={slideUp}
      >
        <h1 className="text-center text-gray-900 text-xl md:text-2xl font-semibold font-['Manrope'] leading-normal">
          Registre sua conta
        </h1>
        <p className="text-center text-grey-600 text-xs md:text-sm font-normal font-['Manrope'] leading-tight">
          Seja bem vindo! Insira seus dados.
        </p>
      </motion.div>

      {/* Formulário */}
      <motion.form 
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 md:gap-5"
        variants={slideUp}
      >
        <InputField
          label="Nome"
          name="name"
          type="text"
          placeholder="Insira seu nome"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Insira seu email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <InputField
          label="Senha"
          name="password"
          type="password"
          placeholder="Crie sua senha"
          helperText="No mínimo 8 caracteres"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        {/* Botões - Gap responsivo */}
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

export default RegisterForm;