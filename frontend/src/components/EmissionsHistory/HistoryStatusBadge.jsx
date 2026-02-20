const statusMap = {
  positive: {
    wrap: 'bg-emerald-50 text-teal-600',
    dot: 'bg-teal-600'
  },
  warning: {
    wrap: 'bg-yellow-50 text-yellow-500',
    dot: 'bg-yellow-500'
  },
  critical: {
    wrap: 'bg-pink-100 text-red-800',
    dot: 'bg-red-800'
  }
};

const HistoryStatusBadge = ({ status, label }) => {
  const visual = statusMap[status] || statusMap.positive;

  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full px-2.5 py-1 text-xs font-bold font-['Manrope'] leading-4 ${visual.wrap}`}>
      <span className={`h-2 w-2 rounded-full ${visual.dot}`} aria-hidden="true" />
      {label}
    </span>
  );
};

export default HistoryStatusBadge;
