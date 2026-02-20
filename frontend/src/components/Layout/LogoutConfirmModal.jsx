import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, X } from 'lucide-react';

const LogoutConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onCancel?.();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-zinc-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <button
            type="button"
            className="fixed inset-0 z-40"
            onClick={onCancel}
            aria-label="Fechar confirmacao de logout"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-confirm-title"
              className="w-[92%] max-w-md overflow-hidden rounded-2xl bg-white shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.10)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.25 }}
            >
              <header className="relative px-6 pt-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600">
                  <LogOut size={20} />
                </div>

                <div className="mt-4">
                  <h2 id="logout-confirm-title" className="text-lg font-semibold font-['Inter'] leading-7 text-gray-900">
                    Confirmar logout
                  </h2>
                  <p className="text-sm font-normal font-['Inter'] leading-5 text-gray-600">
                    Voce realmente deseja sair da plataforma agora?
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onCancel}
                  className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              </header>

              <div className="flex flex-col gap-3 px-6 pb-6 pt-5 md:flex-row">
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base font-semibold font-['Manrope'] text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={onConfirm}
                  className="w-full rounded-lg border border-red-600 bg-red-600 px-4 py-2.5 text-base font-semibold font-['Manrope'] text-white transition-colors hover:bg-red-700"
                >
                  Sair
                </button>
              </div>
            </motion.section>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutConfirmModal;
