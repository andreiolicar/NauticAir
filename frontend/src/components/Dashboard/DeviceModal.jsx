import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import InputField from '../common/InputField';
import FormButton from '../common/FormButton';

const DeviceModal = ({ isOpen, formData, errors, loading, onClose, onChange, onSubmit }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cadastro de dispositivo"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold font-['Manrope'] text-gray-900">Novo dispositivo</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <InputField
                label="ID do dispositivo"
                name="deviceId"
                placeholder="Ex: ID-0003"
                value={formData.deviceId}
                onChange={onChange}
                error={errors.deviceId}
                required
              />
              <InputField
                label="Descricao"
                name="description"
                placeholder="Dispositivo"
                value={formData.description}
                onChange={onChange}
                error={errors.description}
                required
              />

              <div className="flex gap-3">
                <FormButton type="button" variant="secondary" onClick={onClose} fullWidth>
                  Cancelar
                </FormButton>
                <FormButton type="submit" loading={loading} fullWidth>
                  Salvar
                </FormButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeviceModal;
