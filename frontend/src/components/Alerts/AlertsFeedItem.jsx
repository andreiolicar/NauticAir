import { motion } from 'framer-motion';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';

const visualMap = {
  positive: {
    icon: CircleCheck,
    iconWrap: 'bg-emerald-50',
    iconColor: 'text-teal-600',
    progress: 'bg-teal-600'
  },
  warning: {
    icon: CircleAlert,
    iconWrap: 'bg-yellow-50',
    iconColor: 'text-yellow-500',
    progress: 'bg-yellow-500'
  },
  critical: {
    icon: CircleX,
    iconWrap: 'bg-pink-100',
    iconColor: 'text-red-800',
    progress: 'bg-red-800'
  }
};

const fallbackProgressMap = {
  positive: 'bg-teal-600',
  warning: 'bg-yellow-500',
  critical: 'bg-red-800'
};

const AlertsFeedItem = ({ alert, onOpenDetails }) => {
  const visual = visualMap[alert.status] || visualMap.warning;
  const Icon = visual.icon;
  const progressClass = fallbackProgressMap[alert.status] || fallbackProgressMap.warning;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg p-1 text-left transition-colors hover:bg-slate-50"
        onClick={() => onOpenDetails(alert.id)}
        aria-label={`Abrir detalhes do alerta ${alert.title}`}
      >
        <span className={`rounded-[999px] p-2.5 ${visual.iconWrap} inline-flex items-center justify-start gap-2.5 overflow-hidden`}>
          <Icon size={20} strokeWidth={1.8} className={visual.iconColor} aria-hidden="true" />
        </span>

        <span className="flex-1">
          <span className="mb-2 inline-flex w-full items-start justify-between gap-2">
            <span className="text-sm font-medium font-['Manrope'] leading-5 text-slate-900">{alert.title}</span>
            <span className="text-sm font-semibold font-['Manrope'] leading-5 text-slate-500">{alert.timeLabel}</span>
          </span>

          <span className="block rounded-[999px] bg-zinc-100">
            <span
              className={`block h-2 rounded-[99px] ${progressClass} ${alert.progressClass || ''}`}
              style={alert.progressClass ? undefined : { width: `${alert.progress}%` }}
            />
          </span>
        </span>
      </button>
    </motion.li>
  );
};

export default AlertsFeedItem;
