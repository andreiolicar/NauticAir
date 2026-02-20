import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import FormButton from '../common/FormButton';
import { slideDown } from '../../utils/animations';

const SettingsPageHeader = ({ isDirty, isSaving, onSave, onDiscard }) => {
  return (
    <motion.header
      variants={slideDown}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 bg-neutral-50 pb-3 md:flex-row md:items-end md:justify-between"
    >
      <div className="space-y-6">
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1 text-xs font-semibold font-['Manrope']">
          <span className="text-gray-400">Menu Principal</span>
          <ChevronRight size={14} className="text-blue-600" />
          <span className="font-bold text-blue-600">Configuracoes</span>
        </nav>

        <div>
          <h1 className="text-2xl font-bold font-['Manrope'] leading-8 text-slate-900">Configuracoes</h1>
          <p className="mt-0.5 text-sm font-medium font-['Manrope'] leading-5 text-slate-500">
            Gerencie preferencias operacionais, alertas e comportamento do sistema.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
        <FormButton type="button" variant="secondary" fullWidth={false} onClick={onDiscard} disabled={!isDirty || isSaving}>
          Descartar
        </FormButton>
        <FormButton type="button" fullWidth={false} onClick={onSave} disabled={!isDirty} loading={isSaving}>
          Salvar alteracoes
        </FormButton>
      </div>
    </motion.header>
  );
};

export default SettingsPageHeader;
