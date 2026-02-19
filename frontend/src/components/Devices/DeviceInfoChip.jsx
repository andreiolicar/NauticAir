import { CalendarDays, Clock3, DollarSign } from 'lucide-react';

const iconMap = {
  schedule: CalendarDays,
  hour: Clock3,
  cost: DollarSign
};

const DeviceInfoChip = ({ type, label }) => {
  const Icon = iconMap[type] || CalendarDays;

  return (
    <span className="inline-flex items-center gap-2 rounded-[999px] bg-slate-50 px-3 py-1.5">
      <Icon size={14} className="text-slate-900" aria-hidden="true" />
      <span className="text-xs font-medium font-['Manrope'] leading-4 text-slate-900">{label}</span>
    </span>
  );
};

export default DeviceInfoChip;
