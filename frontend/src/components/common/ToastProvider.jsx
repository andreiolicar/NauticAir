import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';

const ToastContext = createContext(null);

const variantMap = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-green-600',
    borderClass: 'border-green-200',
    bgClass: 'bg-green-50/60'
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-red-600',
    borderClass: 'border-red-200',
    bgClass: 'bg-red-50/60'
  },
  warning: {
    icon: TriangleAlert,
    iconClass: 'text-yellow-600',
    borderClass: 'border-yellow-200',
    bgClass: 'bg-yellow-50/60'
  },
  info: {
    icon: Info,
    iconClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    bgClass: 'bg-blue-50/60'
  }
};

const ToastViewport = ({ toasts, onClose }) => {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[80] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const visual = variantMap[toast.variant] || variantMap.info;
          const Icon = visual.icon;

          return (
            <motion.article
              key={toast.id}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto rounded-lg border ${visual.borderClass} ${visual.bgClass} bg-white p-4 shadow-[0px_12px_24px_-8px_rgba(10,13,18,0.18)]`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 ${visual.iconClass}`}>
                  <Icon size={18} />
                </span>

                <div className="min-w-0 flex-1">
                  {toast.title && (
                    <p className="text-sm font-bold font-['Manrope'] text-slate-900">{toast.title}</p>
                  )}
                  <p className="text-sm font-medium font-['Manrope'] text-slate-700">{toast.message}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onClose(toast.id)}
                  className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Fechar notificacao"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const closeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((options) => {
    const id = crypto.randomUUID();
    const duration = options.duration ?? 3500;

    setToasts((prev) => [
      ...prev,
      {
        id,
        variant: options.variant ?? 'info',
        title: options.title ?? '',
        message: options.message ?? ''
      }
    ]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const value = useMemo(() => ({ addToast, closeToast }), [addToast, closeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onClose={closeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider.');
  }
  return context;
};
