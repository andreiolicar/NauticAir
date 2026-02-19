import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';

const visualMap = {
  positive: {
    icon: CircleCheck,
    iconWrap: 'bg-emerald-50 text-teal-600',
    progress: 'bg-teal-600'
  },
  warning: {
    icon: CircleAlert,
    iconWrap: 'bg-yellow-50 text-yellow-500',
    progress: 'bg-yellow-500'
  },
  critical: {
    icon: CircleX,
    iconWrap: 'bg-pink-100 text-red-800',
    progress: 'bg-red-800'
  }
};

const labelMap = {
  positive: 'Positivo',
  warning: 'Alerta',
  critical: 'Critico'
};

const AlertSeverityBadge = ({ status = 'warning', withIcon = true, compact = false, showLabel = true }) => {
  const visual = visualMap[status] || visualMap.warning;
  const Icon = visual.icon;

  return (
    <span
      className={`inline-flex items-center rounded-full font-['Manrope'] font-bold ${
        compact ? 'gap-2 px-2.5 py-1 text-xs' : 'gap-2.5 px-3 py-1.5 text-xs'
      } ${visual.iconWrap}`}
    >
      {withIcon && <Icon size={compact ? 14 : 16} strokeWidth={1.8} aria-hidden="true" />}
      {showLabel && (labelMap[status] || labelMap.warning)}
    </span>
  );
};

export default AlertSeverityBadge;
