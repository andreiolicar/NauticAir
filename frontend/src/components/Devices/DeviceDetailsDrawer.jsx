import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, X } from 'lucide-react';
import DeviceStatusBadge from './DeviceStatusBadge';

const DeviceDetailsDrawer = ({
  isOpen,
  deviceId,
  deviceData,
  isLoading,
  error,
  onClose,
  onRetry
}) => {
  const previousActiveRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveRef.current = document.activeElement;

    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      if (previousActiveRef.current instanceof HTMLElement) {
        previousActiveRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-zinc-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Fechar painel de detalhes"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="device-details-title"
            initial={{ opacity: 0, x: 420 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 420 }}
            transition={{ duration: 0.25 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col border-l border-gray-200 bg-white shadow-xl"
          >
            <header className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 id="device-details-title" className="text-lg font-bold font-['Manrope'] text-gray-900">
                  Detalhes do dispositivo
                </h2>
                <p className="mt-1 text-xs font-medium font-['Manrope'] text-gray-500">Referencia: {deviceId}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {isLoading && (
                <div className="space-y-3" aria-live="polite">
                  <div className="h-16 animate-pulse rounded-lg bg-gray-100" />
                  <div className="h-28 animate-pulse rounded-lg bg-gray-100" />
                  <div className="h-24 animate-pulse rounded-lg bg-gray-100" />
                </div>
              )}

              {!isLoading && error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold font-['Manrope']">
                    <AlertTriangle size={16} /> Erro ao carregar detalhes.
                  </div>
                  <p className="mt-2 text-sm font-medium font-['Manrope']">{error}</p>
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold font-['Manrope'] text-red-700 hover:bg-red-100"
                  >
                    <RefreshCcw size={14} /> Tentar novamente
                  </button>
                </div>
              )}

              {!isLoading && !error && deviceData && (
                <>
                  <section className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="inline-flex w-full items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-3">
                        <img src={deviceData.image} alt={`Imagem de ${deviceData.id}`} className="h-14 w-14 rounded-full" />
                        <div>
                          <p className="text-sm font-semibold font-['Manrope'] text-gray-900">{deviceData.id}</p>
                          <p className="text-xs font-medium font-['Manrope'] text-gray-500">Atualizado em {new Date(deviceData.createdAt).toLocaleString('pt-BR')}</p>
                        </div>
                      </div>
                      <DeviceStatusBadge status={deviceData.status} />
                    </div>
                  </section>

                  <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 text-sm font-semibold font-['Manrope'] text-gray-900">Informacoes operacionais</h3>
                    <dl className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Informacao 1</dt>
                        <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{deviceData.info1}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Informacao 2</dt>
                        <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{deviceData.info2}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Informacao 3</dt>
                        <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{deviceData.info3}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Agenda</dt>
                        <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{deviceData.schedule}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Horario</dt>
                        <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{deviceData.hours}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Custo</dt>
                        <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{deviceData.cost}</dd>
                      </div>
                    </dl>
                  </section>

                  <section className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-2 text-sm font-semibold font-['Manrope'] text-gray-900">Descricao</h3>
                    <p className="text-sm font-medium font-['Manrope'] text-gray-600">{deviceData.description}</p>
                  </section>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeviceDetailsDrawer;
