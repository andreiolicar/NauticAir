import { BellRing } from 'lucide-react';
import InputField from '../common/InputField';
import SettingsSectionCard from './SettingsSectionCard';
import SettingsSwitch from './SettingsSwitch';

const AlertSettingsForm = ({ values, errors, onChange, onToggle }) => {
  return (
    <SettingsSectionCard
      title="Configuracoes de Alertas"
      description="Ative canais e niveis de severidade para notificacoes automaticas."
      icon={BellRing}
    >
      <div className="space-y-3">
        <SettingsSwitch
          id="email-enabled"
          label="Email habilitado"
          description="Permite envio de alertas por email."
          checked={values.emailEnabled}
          onChange={(nextValue) => onToggle('emailEnabled', nextValue)}
        />
        <SettingsSwitch
          id="inapp-enabled"
          label="Notificacoes in-app"
          description="Mostra alertas em tempo real dentro da plataforma."
          checked={values.inAppEnabled}
          onChange={(nextValue) => onToggle('inAppEnabled', nextValue)}
        />
        <SettingsSwitch
          id="quiet-enabled"
          label="Horario silencioso"
          description="Pausa notificacoes em uma janela definida."
          checked={values.quietHoursEnabled}
          onChange={(nextValue) => onToggle('quietHoursEnabled', nextValue)}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <InputField
          label="Email de recebimento"
          name="recipientEmail"
          type="email"
          value={values.recipientEmail}
          onChange={(event) => onChange('recipientEmail', event.target.value)}
          error={errors['alerts.recipientEmail']}
          required={values.emailEnabled}
        />

        <div className="grid gap-4 grid-cols-2 md:col-span-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quiet-start" className="text-gray-700 text-sm font-medium font-['Manrope'] leading-tight">
              Inicio do silencio
            </label>
            <input
              id="quiet-start"
              type="time"
              value={values.quietStart}
              onChange={(event) => onChange('quietStart', event.target.value)}
              className={`w-full rounded-lg bg-white px-3.5 py-2.5 text-base font-normal font-['Manrope'] text-gray-900 outline outline-1 outline-offset-[-1px] ${
                errors['alerts.quietStart'] ? 'outline-red-500' : 'outline-gray-300'
              }`}
            />
            {errors['alerts.quietStart'] && <p className="text-red-500 text-xs font-normal font-['Manrope'] leading-tight">{errors['alerts.quietStart']}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="quiet-end" className="text-gray-700 text-sm font-medium font-['Manrope'] leading-tight">
              Fim do silencio
            </label>
            <input
              id="quiet-end"
              type="time"
              value={values.quietEnd}
              onChange={(event) => onChange('quietEnd', event.target.value)}
              className={`w-full rounded-lg bg-white px-3.5 py-2.5 text-base font-normal font-['Manrope'] text-gray-900 outline outline-1 outline-offset-[-1px] ${
                errors['alerts.quietEnd'] ? 'outline-red-500' : 'outline-gray-300'
              }`}
            />
            {errors['alerts.quietEnd'] && <p className="text-red-500 text-xs font-normal font-['Manrope'] leading-tight">{errors['alerts.quietEnd']}</p>}
          </div>
        </div>
      </div>
    </SettingsSectionCard>
  );
};

export default AlertSettingsForm;
