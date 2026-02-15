import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, ChevronDown, Clock3, Filter } from 'lucide-react';
import { scrollReveal } from '../../utils/animations';

const statusClasses = {
  positive: 'bg-green-50 text-green-600 border-green-200',
  critical: 'bg-red-50 text-red-600 border-red-200',
  warning: 'bg-yellow-50 text-yellow-600 border-yellow-200'
};

const statusLabel = {
  positive: 'Positivo',
  critical: 'Critico',
  warning: 'Alerta'
};

const filterOptions = [
  { value: 'critical', label: 'Critico' },
  { value: 'positive', label: 'Positivo' },
  { value: 'warning', label: 'Alerta' }
];

const HistoryTable = ({ rows, statusFilter = 'all', onStatusFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedFilter = filterOptions.find((option) => option.value === statusFilter);

  return (
    <motion.section
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-lg border border-gray-200 bg-white p-5"
      aria-labelledby="history-title"
    >
      <header className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex items-center gap-2">
          <Clock3 size={16} className="text-gray-500" />
          <h2 id="history-title" className="text-base font-bold font-['Manrope'] text-gray-900">
            Historico de Emissoes
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-lg px-3 py-2 text-sm font-semibold font-['Manrope'] text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Ver todo o historico"
          >
            Ver todos
          </button>
          <div ref={filterRef} className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold font-['Manrope'] text-gray-900 hover:bg-gray-50"
              aria-label="Filtrar historico"
              aria-expanded={isFilterOpen}
              aria-haspopup="menu"
            >
              <Filter size={16} />
              {selectedFilter ? selectedFilter.label : 'Filtrar'}
              <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 z-20 w-36 rounded-lg border border-gray-200 bg-white p-1"
                >
                  <ul role="menu" aria-label="Filtro de status" className="space-y-1">
                    {filterOptions.map((option) => (
                      <li key={option.value}>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            onStatusFilterChange?.(option.value);
                            setIsFilterOpen(false);
                          }}
                          className="flex h-10 w-full items-center rounded-lg px-3 text-left text-sm font-semibold font-['Manrope'] text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold font-['Manrope'] text-gray-900 hover:bg-gray-50"
            aria-label="Ordenar historico"
          >
            <ArrowUpDown size={16} /> Ordenar
          </button>
        </div>
      </header>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-4 text-xs font-bold font-['Manrope'] text-gray-500">ROTA</th>
              <th className="px-6 py-4 text-xs font-bold font-['Manrope'] text-gray-500">DURACAO</th>
              <th className="px-6 py-4 text-xs font-bold font-['Manrope'] text-gray-500">CREDITOS CO2</th>
              <th className="px-6 py-4 text-xs font-bold font-['Manrope'] text-gray-500">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm font-semibold font-['Manrope'] text-gray-900">{row.route}</td>
                <td className="px-6 py-4 text-sm font-semibold font-['Manrope'] text-gray-900">{row.duration}</td>
                <td className="px-6 py-4 text-sm font-medium font-['Manrope'] text-gray-900">{row.credits}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-bold font-['Manrope'] ${
                      statusClasses[row.status] || statusClasses.warning
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
                    {statusLabel[row.status] || statusLabel.warning}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

export default HistoryTable;
