import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import HistoryStatusBadge from './HistoryStatusBadge';

const RouteDetailsDrawer = ({ isOpen, data, onClose }) => {
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
      {isOpen && data && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-zinc-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-label="Fechar detalhes da rota"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="route-details-title"
            initial={{ opacity: 0, x: 420 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 420 }}
            transition={{ duration: 0.25 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col border-l border-gray-200 bg-white shadow-xl"
          >
            <header className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 id="route-details-title" className="text-lg font-bold font-['Manrope'] text-gray-900">
                  Detalhes da rota
                </h2>
                <p className="mt-1 text-xs font-medium font-['Manrope'] text-gray-500">Referencia: {data.id}</p>
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
              <section className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold font-['Manrope'] text-gray-900">{data.route}</p>
                    <p className="mt-1 text-xs font-medium font-['Manrope'] text-gray-500">{`${data.departurePort} -> ${data.arrivalPort}`}</p>
                  </div>
                  <HistoryStatusBadge status={data.status} label={data.statusLabel} />
                </div>
              </section>

              <section className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold font-['Manrope'] text-gray-900">Informacoes operacionais</h3>
                <dl className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Responsavel</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.captain}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Dispositivo</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.deviceId}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Embarcacao</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.vessel}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Duracao</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.duration}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Partida</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.departureAt}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Chegada</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.arrivalAt}</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold font-['Manrope'] text-gray-900">Metricas da viagem</h3>
                <dl className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Creditos CO2</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.credits}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">CO2 total (kg)</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.totalCo2Kg}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Combustivel</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.fuelType}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Velocidade media</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.avgSpeedKn}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium font-['Manrope'] text-gray-500">Clima predominante</dt>
                    <dd className="text-xs font-semibold font-['Manrope'] text-gray-900">{data.weather}</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-2 text-sm font-semibold font-['Manrope'] text-gray-900">Observacoes</h3>
                <p className="text-sm font-medium font-['Manrope'] text-gray-600">{data.notes}</p>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default RouteDetailsDrawer;
