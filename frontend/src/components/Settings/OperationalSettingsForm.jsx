import { SlidersHorizontal } from 'lucide-react';
import InputField from '../common/InputField';
import SettingsSectionCard from './SettingsSectionCard';

const OperationalSettingsForm = ({ values, errors, onChange }) => {
  return (
    <SettingsSectionCard
      title="Configuracoes Operacionais"
      description="Defina limites e frequencia de leitura para monitoramento continuo."
      icon={SlidersHorizontal}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Limite de CO (PPM)"
          name="coPpmLimit"
          type="text"
          value={values.coPpmLimit}
          onChange={(event) => onChange('coPpmLimit', event.target.value)}
          error={errors['operational.coPpmLimit']}
          required
        />
        <InputField
          label="Limite de CO2e (g/h)"
          name="co2GphLimit"
          type="text"
          value={values.co2GphLimit}
          onChange={(event) => onChange('co2GphLimit', event.target.value)}
          error={errors['operational.co2GphLimit']}
          required
        />
        <InputField
          label="Teto diario de CO2e (kg)"
          name="dailyCo2CapKg"
          type="text"
          value={values.dailyCo2CapKg}
          onChange={(event) => onChange('dailyCo2CapKg', event.target.value)}
          error={errors['operational.dailyCo2CapKg']}
          required
        />
        <InputField
          label="Intervalo de amostragem (s)"
          name="samplingIntervalSec"
          type="text"
          value={values.samplingIntervalSec}
          onChange={(event) => onChange('samplingIntervalSec', event.target.value)}
          error={errors['operational.samplingIntervalSec']}
          required
        />
      </div>
    </SettingsSectionCard>
  );
};

export default OperationalSettingsForm;
