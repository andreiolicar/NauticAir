import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';
import InputField from '../components/common/InputField';
import FormButton from '../components/common/FormButton';
import SettingsSelect from '../components/Settings/SettingsSelect';
import { slideDown } from '../utils/animations';
import { useToast } from '../components/common/ToastProvider';

const initialProfile = {
  initials: 'AC',
  fullName: 'Andrei Carneiro',
  email: 'andreicarneiro@email.com',
  phone: '+55 11 99876-1234',
  company: 'NauticAir',
  role: 'Administrador',
  timezone: 'America/Sao_Paulo',
  language: 'pt-BR'
};

const timezoneOptions = [
  { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'America/New_York' }
];

const languageOptions = [
  { value: 'pt-BR', label: 'Portugues (Brasil)' },
  { value: 'en-US', label: 'English (US)' }
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ProfileEdit = () => {
  const { addToast } = useToast();
  const [profile, setProfile] = useState(initialProfile);
  const [snapshot, setSnapshot] = useState(initialProfile);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const isDirty = useMemo(() => JSON.stringify(profile) !== JSON.stringify(snapshot), [profile, snapshot]);

  const clearError = (key) => {
    if (!errors[key]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const validate = () => {
    const nextErrors = {};

    if (!profile.fullName.trim()) nextErrors.fullName = 'Nome obrigatorio.';
    if (!profile.email.trim()) nextErrors.email = 'Email obrigatorio.';
    else if (!emailRegex.test(profile.email.trim())) nextErrors.email = 'Informe um email valido.';
    if (!profile.phone.trim()) nextErrors.phone = 'Telefone obrigatorio.';
    if (!profile.company.trim()) nextErrors.company = 'Empresa obrigatoria.';
    if (!profile.role.trim()) nextErrors.role = 'Cargo obrigatorio.';
    if (!profile.timezone) nextErrors.timezone = 'Selecione um fuso horario.';
    if (!profile.language) nextErrors.language = 'Selecione um idioma.';

    return nextErrors;
  };

  const handleDiscard = () => {
    setProfile(snapshot);
    setErrors({});
  };

  const handleSave = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      addToast({
        variant: 'error',
        title: 'Falha na validacao',
        message: 'Revise os campos do perfil antes de salvar.'
      });
      return;
    }

    setErrors({});
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setSnapshot(profile);
      addToast({
        variant: 'success',
        title: 'Sucesso',
        message: 'Perfil atualizado com sucesso.'
      });
    } catch {
      addToast({
        variant: 'error',
        title: 'Erro',
        message: 'Nao foi possivel atualizar o perfil. Tente novamente.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4 pb-8">
      <motion.header
        variants={slideDown}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4 bg-neutral-50 pb-3 md:flex-row md:items-end md:justify-between"
      >
        <div className="space-y-6">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1 text-xs font-semibold font-['Manrope']">
            <span className="text-gray-400">Outros</span>
            <ChevronRight size={14} className="text-blue-600" />
            <span className="font-bold text-blue-600">Editar perfil</span>
          </nav>

          <div>
            <h1 className="text-2xl font-bold font-['Manrope'] leading-8 text-slate-900">Editar perfil</h1>
            <p className="mt-0.5 text-sm font-medium font-['Manrope'] leading-5 text-slate-500">
              Atualize seus dados de conta e preferencias de identificacao.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <FormButton type="button" variant="secondary" fullWidth={false} onClick={handleDiscard} disabled={!isDirty || isSaving}>
            Descartar
          </FormButton>
          <FormButton type="button" fullWidth={false} onClick={handleSave} disabled={!isDirty} loading={isSaving}>
            Salvar alteracoes
          </FormButton>
        </div>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-lg border border-zinc-100 bg-white p-5"
      >
        <div className="mb-5 inline-flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-100">
            <span className="text-base font-semibold font-['Manrope'] text-slate-900">{profile.initials}</span>
          </div>
          <div>
            <p className="text-sm font-semibold font-['Manrope'] text-slate-900">Identificador visual</p>
            <p className="text-xs font-medium font-['Manrope'] text-slate-500">Mantido automaticamente por iniciais.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <InputField
              label="Nome completo"
              name="fullName"
              value={profile.fullName}
              onChange={(event) => handleChange('fullName', event.target.value)}
              error={errors.fullName}
              required
            />
          </div>

          <InputField
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={(event) => handleChange('email', event.target.value)}
            error={errors.email}
            required
          />

          <InputField
            label="Telefone"
            name="phone"
            value={profile.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
            error={errors.phone}
            required
          />

          <div className="md:col-span-2">
            <InputField
              label="Empresa"
              name="company"
              value={profile.company}
              onChange={(event) => handleChange('company', event.target.value)}
              error={errors.company}
              required
            />
          </div>

          <InputField
            label="Cargo"
            name="role"
            value={profile.role}
            onChange={(event) => handleChange('role', event.target.value)}
            error={errors.role}
            required
          />

          <SettingsSelect
            id="timezone"
            label="Fuso horario"
            value={profile.timezone}
            onChange={(value) => handleChange('timezone', value)}
            options={timezoneOptions}
            error={errors.timezone}
          />

          <div className="md:col-span-2">
            <SettingsSelect
              id="language"
              label="Idioma"
              value={profile.language}
              onChange={(value) => handleChange('language', value)}
              options={languageOptions}
              error={errors.language}
            />
          </div>
        </div>

      </motion.section>
    </div>
  );
};

export default ProfileEdit;
