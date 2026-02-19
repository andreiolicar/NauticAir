import { AnimatePresence, motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import InputField from '../common/InputField';
import FormButton from '../common/FormButton';

const DeviceCreateModal = ({
  isOpen,
  formData,
  errors,
  loading,
  onChange,
  onImageChange,
  onClose,
  onSubmit
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-zinc-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <button
            type="button"
            className="fixed inset-0 z-40"
            onClick={onClose}
            aria-label="Fechar modal"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="device-create-title"
              className="w-[92%] max-w-[640px] overflow-hidden rounded-2xl bg-white shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.10)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.25 }}
            >
              <header className="relative px-6 pt-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
                <Upload size={20} className="text-slate-900" />
              </div>

              <div className="mt-4">
                <h2 id="device-create-title" className="text-lg font-semibold font-['Inter'] leading-7 text-gray-900">
                  Adicionar dispositivo
                </h2>
                <p className="text-sm font-normal font-['Inter'] leading-5 text-gray-600">
                  Insira as respectivas informacoes para concluir esta acao.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
              </header>

              <form onSubmit={onSubmit} className="space-y-5 px-6 pb-6 pt-5">
              <div className="space-y-1.5">
                <p className="text-sm font-medium font-['Inter'] leading-5 text-gray-700">Imagem*</p>
                <label className="block cursor-pointer rounded-xl border border-gray-200 bg-white px-6 py-4 text-center hover:bg-gray-50">
                  <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-neutral-100 outline outline-[6px] outline-neutral-50">
                    <Upload size={18} className="text-blue-600" />
                  </div>
                  <p className="mt-3 text-sm font-semibold font-['Inter'] text-blue-600">Clique para realizar o upload</p>
                  <p className="text-xs font-normal font-['Inter'] text-gray-600">PNG ou JPG (max. 800x400px)</p>
                  <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={onImageChange} />
                </label>
              </div>

              <InputField
                label="Nome"
                name="name"
                placeholder="Como este dispositivo ira se chamar?"
                value={formData.name}
                onChange={onChange}
                error={errors.name}
                required
              />

              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  label="Informacao 1"
                  name="info1"
                  placeholder="Busque ou insira"
                  value={formData.info1}
                  onChange={onChange}
                  error={errors.info1}
                  required
                />
                <InputField
                  label="Informacao 2"
                  name="info2"
                  placeholder="Busque ou insira"
                  value={formData.info2}
                  onChange={onChange}
                  error={errors.info2}
                  required
                />
              </div>

              <InputField
                label="Informacao 3"
                name="info3"
                placeholder="Qual sera a informacao?"
                value={formData.info3}
                onChange={onChange}
                error={errors.info3}
                required
              />

              <div className="space-y-1.5">
                <label htmlFor="description" className="text-sm font-medium font-['Inter'] leading-5 text-gray-700">
                  Descricao
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  className="h-28 w-full resize-none rounded-lg border border-zinc-300 px-3.5 py-3 text-base font-normal font-['Inter'] text-gray-900 placeholder:text-gray-500"
                  placeholder="Adicione um texto breve para este dispositivo (nao sera exibido)."
                />
              </div>

              <div className="flex flex-col gap-3 pt-3 md:flex-row">
                <FormButton type="button" variant="secondary" onClick={onClose}>
                  Cancelar
                </FormButton>
                <FormButton type="submit" loading={loading}>
                  Confirmar
                </FormButton>
              </div>
              </form>
            </motion.section>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeviceCreateModal;
