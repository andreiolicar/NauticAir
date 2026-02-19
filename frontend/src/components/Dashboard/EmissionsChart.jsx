import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { fadeIn, scrollReveal } from '../../utils/animations';

const EmissionsChart = ({ data, selectedRange, onRangeChange }) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const opacityClasses = [
    'bg-blue-600/60',
    'bg-blue-600/75',
    'bg-blue-600',
    'bg-blue-600/75',
    'bg-blue-600/90',
    'bg-blue-600',
    'bg-blue-600/75'
  ];
  const topRatios = [0.24, 0.3, 0.2, 0.56, 0.15, 0.16, 0.18];

  return (
    <motion.section
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-lg border border-gray-200 bg-white p-5"
      aria-labelledby="emissions-chart-title"
    >
      <header className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex items-center gap-2">
          <BarChart3 size={16} className="text-gray-500" />
          <h2 id="emissions-chart-title" className="text-base font-bold font-['Manrope'] text-gray-900">
            Niveis de Emissao
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Periodo do grafico">
          {['Ultimos 3 meses', 'Ultimos 30 dias', 'Ultimos 7 dias'].map((range) => {
            const active = selectedRange === range;

            return (
              <motion.button
                key={range}
                type="button"
                variants={fadeIn}
                onClick={() => onRangeChange(range)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold font-['Manrope'] transition-colors ${active
                    ? 'border border-gray-200 bg-gray-50 text-gray-900'
                    : 'border border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                aria-pressed={active}
              >
                {range}
              </motion.button>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-[auto_1fr] gap-4">
        <ul className="flex h-72 flex-col justify-between text-xs font-normal font-['Manrope'] text-gray-900" aria-hidden="true">
          <li>500</li>
          <li>300</li>
          <li>100</li>
          <li>0</li>
        </ul>

        <div className="grid h-72 grid-cols-7 items-end gap-6">
          {data.map((item, index) => {
            const totalHeight = Math.max((item.value / maxValue) * 100, 8);
            const topHeight = Math.max(totalHeight * topRatios[index], 6);
            const bottomHeight = Math.max(totalHeight - topHeight, 6);
            const barColor = opacityClasses[index] || 'bg-blue-600/75';

            return (
              <div key={item.day} className="flex h-full flex-col items-center justify-end gap-6">
                <div className="group relative flex h-full w-full flex-col justify-end">
                  <span
                    className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs font-medium font-['Manrope'] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ bottom: `calc(${totalHeight}% + 8px)` }}
                  >
                    {item.value}
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${topHeight}%` }}
                    transition={{ duration: 0.5 }}
                    className={`w-full rounded-tl-lg rounded-tr-lg ${barColor}`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bottomHeight}%` }}
                    transition={{ duration: 0.5 }}
                    className={`w-full rounded-bl-lg rounded-br-lg ${barColor}`}
                  />
                </div>
                <span className="text-xs font-normal font-['Manrope'] text-gray-500">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default EmissionsChart;
