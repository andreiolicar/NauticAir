import { motion } from 'framer-motion';
import FormButton from '../common/FormButton';

const SettingsSaveBar = ({ isVisible, isSaving, onSave, onDiscard }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-72 right-0 z-20 border-t border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur-sm md:hidden"
    >
      <div className="flex items-center gap-3">
        <FormButton type="button" variant="secondary" onClick={onDiscard} fullWidth>
          Descartar
        </FormButton>
        <FormButton type="button" onClick={onSave} loading={isSaving} fullWidth>
          Salvar
        </FormButton>
      </div>
    </motion.div>
  );
};

export default SettingsSaveBar;
