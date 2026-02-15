import { motion } from 'framer-motion';
import InputField from '../common/InputField';
import FormButton from '../common/FormButton';
import { scrollReveal } from '../../utils/animations';

const SettingsForm = ({ formData, errors, loading, onChange, onSubmit }) => {
  return (
    <motion.section
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-lg border border-gray-200 bg-white p-5"
      aria-labelledby="settings-title"
    >
      <h2 id="settings-title" className="mb-4 text-base font-bold font-['Manrope'] text-gray-900">
        Configuracoes
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <InputField
          label="Limite de emissao (PPM)"
          name="emissionLimit"
          type="text"
          placeholder="Ex: 50"
          value={formData.emissionLimit}
          onChange={onChange}
          error={errors.emissionLimit}
          required
        />
        <InputField
          label="Email para alertas"
          name="alertEmail"
          type="email"
          placeholder="voce@empresa.com"
          value={formData.alertEmail}
          onChange={onChange}
          error={errors.alertEmail}
          required
        />

        <FormButton type="submit" loading={loading} fullWidth={false}>
          Salvar configuracoes
        </FormButton>
      </form>
    </motion.section>
  );
};

export default SettingsForm;
