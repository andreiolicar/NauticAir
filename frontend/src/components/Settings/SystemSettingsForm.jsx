import { Cog } from 'lucide-react';
import InputField from '../common/InputField';
import SettingsSectionCard from './SettingsSectionCard';
import SettingsSelect from './SettingsSelect';

const unitOptions = [
  { value: 'metric', label: 'Metrico' },
  { value: 'imperial', label: 'Imperial' }
];

const timezoneOptions = [
  { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'America/New_York' }
];

const languageOptions = [
  { value: 'pt-BR', label: 'Portugues (Brasil)' },
  { value: 'en-US', label: 'English (US)' }
];

const SystemSettingsForm = ({ values, errors, onChange }) => {
  return (
    <SettingsSectionCard
      title="Configuracoes de Sistema"
      description="Defina preferencias globais de exibicao e comportamento da plataforma."
      icon={Cog}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SettingsSelect
          id="unit-system"
          label="Sistema de unidades"
          value={values.unitSystem}
          onChange={(nextValue) => onChange('unitSystem', nextValue)}
          options={unitOptions}
          error={errors['system.unitSystem']}
        />

        <SettingsSelect
          id="timezone"
          label="Fuso horario"
          value={values.timezone}
          onChange={(nextValue) => onChange('timezone', nextValue)}
          options={timezoneOptions}
          error={errors['system.timezone']}
        />

        <SettingsSelect
          id="language"
          label="Idioma da interface"
          value={values.language}
          onChange={(nextValue) => onChange('language', nextValue)}
          options={languageOptions}
          error={errors['system.language']}
        />

        <InputField
          label="Auto-refresh (s)"
          name="autoRefreshSec"
          type="text"
          value={values.autoRefreshSec}
          onChange={(event) => onChange('autoRefreshSec', event.target.value)}
          error={errors['system.autoRefreshSec']}
          required
        />
      </div>
    </SettingsSectionCard>
  );
};

export default SystemSettingsForm;
