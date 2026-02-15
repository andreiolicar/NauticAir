import { motion } from 'framer-motion';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import { staggerItem } from '../../utils/animations';

const variantMap = {
  success: {
    icon: CircleCheck,
    container: 'bg-emerald-50 text-teal-600',
    progress: 'bg-teal-600'
  },
  warning: {
    icon: CircleAlert,
    container: 'bg-yellow-50 text-yellow-500',
    progress: 'bg-yellow-600'
  },
  critical: {
    icon: CircleX,
    container: 'bg-pink-100 text-red-800',
    progress: 'bg-red-800'
  }
};

const AlertCard = ({ alert }) => {
  const visual = variantMap[alert.variant] || variantMap.warning;
  const Icon = visual.icon;

  return (
    <motion.li
      variants={staggerItem}
      className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-slate-50 cursor-pointer"
    >
      <div className={`rounded-[999px] p-2.5 ${visual.container}`}>
        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium font-['Manrope'] text-gray-900">{alert.title}</p>
          <span className="text-sm font-semibold font-['Manrope'] text-gray-500">{alert.time}</span>
        </div>

        <div className="h-2 rounded-[999px] bg-zinc-100">
          <div
            className={`h-2 rounded-full ${visual.progress} ${alert.progressClass || ''}`}
            style={alert.progressClass ? undefined : { width: `${alert.progress}%` }}
          />
        </div>
      </div>
    </motion.li>
  );
};

export default AlertCard;
