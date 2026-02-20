import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SettingsPageHeader from '../components/Settings/SettingsPageHeader';
import OperationalSettingsForm from '../components/Settings/OperationalSettingsForm';
import AlertSettingsForm from '../components/Settings/AlertSettingsForm';
import SystemSettingsForm from '../components/Settings/SystemSettingsForm';
import SettingsSaveBar from '../components/Settings/SettingsSaveBar';
import { staggerContainer } from '../utils/animations';
import { useToast } from '../components/common/ToastProvider';

const initialSettings = {
  operational: {
    coPpmLimit: '50',
    co2GphLimit: '460',
    dailyCo2CapKg: '3.68',
    samplingIntervalSec: '30'
  },
  alerts: {
    emailEnabled: true,
    inAppEnabled: true,
    criticalEnabled: true,
    warningEnabled: true,
    positiveEnabled: false,
    quietHoursEnabled: true,
    quietStart: '22:00',
    quietEnd: '07:00',
    recipientEmail: 'alerts@nauticair.com'
  },
  system: {
    unitSystem: 'metric',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    autoRefreshSec: '15'
  }
};

const isPositiveNumber = (value) => {
  const normalized = String(value ?? '').replace(',', '.').trim();
  if (!normalized) return false;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0;
};

const validateSettings = (settings) => {
  const nextErrors = {};

  if (!isPositiveNumber(settings.operational.coPpmLimit)) {
    nextErrors['operational.coPpmLimit'] = 'Informe um valor numerico maior que zero.';
  }

  if (!isPositiveNumber(settings.operational.co2GphLimit)) {
    nextErrors['operational.co2GphLimit'] = 'Informe um valor numerico maior que zero.';
  }

  if (!isPositiveNumber(settings.operational.dailyCo2CapKg)) {
    nextErrors['operational.dailyCo2CapKg'] = 'Informe um valor numerico maior que zero.';
  }

  if (!isPositiveNumber(settings.operational.samplingIntervalSec)) {
    nextErrors['operational.samplingIntervalSec'] = 'Informe um valor numerico maior que zero.';
  }

  if (settings.alerts.emailEnabled) {
    const email = settings.alerts.recipientEmail.trim();
    if (!email) {
      nextErrors['alerts.recipientEmail'] = 'Email obrigatorio quando canal por email esta ativo.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        nextErrors['alerts.recipientEmail'] = 'Informe um email valido.';
      }
    }
  }

  if (settings.alerts.quietHoursEnabled) {
    if (!settings.alerts.quietStart) {
      nextErrors['alerts.quietStart'] = 'Informe o horario inicial.';
    }
    if (!settings.alerts.quietEnd) {
      nextErrors['alerts.quietEnd'] = 'Informe o horario final.';
    }
  }

  if (!settings.system.unitSystem) nextErrors['system.unitSystem'] = 'Selecione um sistema de unidades.';
  if (!settings.system.timezone) nextErrors['system.timezone'] = 'Selecione um fuso horario.';
  if (!settings.system.language) nextErrors['system.language'] = 'Selecione um idioma.';

  if (!isPositiveNumber(settings.system.autoRefreshSec)) {
    nextErrors['system.autoRefreshSec'] = 'Informe um valor numerico maior que zero.';
  }

  return nextErrors;
};

const Settings = () => {
  const { addToast } = useToast();
  const [settings, setSettings] = useState(initialSettings);
  const [initialSnapshot, setInitialSnapshot] = useState(initialSettings);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const isDirty = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(initialSnapshot);
  }, [settings, initialSnapshot]);

  const clearError = (key) => {
    if (!errors[key]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleOperationalChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      operational: {
        ...prev.operational,
        [field]: value
      }
    }));
    clearError(`operational.${field}`);
  };

  const handleAlertChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [field]: value
      }
    }));
    clearError(`alerts.${field}`);
  };

  const handleAlertToggle = (field, checked) => {
    setSettings((prev) => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [field]: checked
      }
    }));
    clearError(`alerts.${field}`);
  };

  const handleSystemChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        [field]: value
      }
    }));
    clearError(`system.${field}`);
  };

  const handleDiscard = () => {
    setSettings(initialSnapshot);
    setErrors({});
  };

  const handleSave = async () => {
    const nextErrors = validateSettings(settings);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      addToast({
        variant: 'error',
        title: 'Falha na validacao',
        message: 'Corrija os campos destacados antes de salvar.'
      });
      return;
    }

    setErrors({});
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setInitialSnapshot(settings);
      addToast({
        variant: 'success',
        title: 'Sucesso',
        message: 'Configuracoes salvas com sucesso.'
      });
    } catch {
      addToast({
        variant: 'error',
        title: 'Erro',
        message: 'Nao foi possivel salvar as configuracoes. Tente novamente.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleSave();
  };

  return (
    <div className="space-y-4 pb-16 md:pb-0">
      <SettingsPageHeader isDirty={isDirty} isSaving={isSaving} onSave={handleSave} onDiscard={handleDiscard} />

      <motion.form
        onSubmit={handleSubmit}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <OperationalSettingsForm
          values={settings.operational}
          errors={errors}
          onChange={handleOperationalChange}
        />

        <AlertSettingsForm
          values={settings.alerts}
          errors={errors}
          onChange={handleAlertChange}
          onToggle={handleAlertToggle}
        />

        <SystemSettingsForm
          values={settings.system}
          errors={errors}
          onChange={handleSystemChange}
        />
      </motion.form>

      <SettingsSaveBar
        isVisible={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
};

export default Settings;
