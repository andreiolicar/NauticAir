import { useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, X } from 'lucide-react';
import AlertSeverityBadge from './AlertSeverityBadge';
import AlertMetricGrid from './AlertMetricGrid';
import AlertTimelineInfo from './AlertTimelineInfo';

const AlertDetailsDrawer = ({
  isOpen,
  alertId,
  alertData,
  isLoading,
  error,
  onClose,
  onRetry
}) => {
  const panelRef = useRef(null);
  const previousActiveRef = useRef(null);

  const focusableElements = useMemo(
    () =>
      panelRef.current
        ? panelRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        : [],
    [isOpen]
  );

  useEffect(() => {
    if (!isOpen) return;

    previousActiveRef.current = document.activeElement;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key === 'Tab' && focusableElements.length > 0) {
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    setTimeout(() => {
      const firstButton = panelRef.current?.querySelector('button');
      firstButton?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousActiveRef.current instanceof HTMLElement) {
        previousActiveRef.current.focus();
      }
    };
  }, [focusableElements, isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-950/50"
            onClick={onClose}
            aria-label="Fechar painel de detalhes"
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-details-title"
            initial={{ opacity: 0, x: 420 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 420 }}
            transition={{ duration: 0.25 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col border-l border-gray-200 bg-white shadow-xl"
          >
            <header className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 id="alert-details-title" className="text-lg font-bold font-['Manrope'] text-gray-900">
                  Detalhes do alerta
                </h2>
                {alertId && (
                  <p className="mt-1 text-xs font-medium font-['Manrope'] text-gray-500">
                    Referencia: {alertId}
                  </p>
                )}
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
                  <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
                  <div className="h-24 animate-pulse rounded-lg bg-gray-100" />
                </div>
              )}

              {!isLoading && error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold font-['Manrope']">
                    <AlertTriangle size={16} />
                    Erro ao carregar detalhes.
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

              {!isLoading && !error && alertData && (
                <>
                  <section className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="inline-flex w-full items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold font-['Manrope'] text-gray-900">{alertData.title}</p>
                        <p className="mt-1 text-xs font-medium font-['Manrope'] text-gray-500">{alertData.timeLabel}</p>
                      </div>
                      <AlertSeverityBadge status={alertData.status} />
                    </div>
                  </section>

                  <AlertMetricGrid alert={alertData} />
                  <AlertTimelineInfo alert={alertData} />
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlertDetailsDrawer;
