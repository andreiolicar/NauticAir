import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { slideDown } from '../../utils/animations';

const filterOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'critical', label: 'Critico' },
  { value: 'positive', label: 'Positivo' },
  { value: 'warning', label: 'Alerta' }
];

const HistoryPageHeader = ({ filter, onFilterChange, sortDirection, onToggleSort, onReset }) => {
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

  const selectedFilter = useMemo(() => {
    return filterOptions.find((option) => option.value === filter) || filterOptions[0];
  }, [filter]);

  return (
    <motion.header
      variants={slideDown}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 bg-neutral-50 pb-3 md:flex-row md:items-end md:justify-between"
    >
      <div className="space-y-6">
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1 text-xs font-semibold font-['Manrope']">
          <span className="text-gray-400">Menu Principal</span>
          <ChevronRight size={14} className="text-blue-600" />
          <span className="font-bold text-blue-600">Historico</span>
        </nav>

        <div>
          <h1 className="text-2xl font-bold font-['Manrope'] leading-8 text-slate-900">Historico</h1>
          <p className="mt-0.5 text-sm font-medium font-['Manrope'] leading-5 text-slate-500">
            Visualize seu historico completo de emissoes
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg px-4 py-2 text-sm font-semibold font-['Manrope'] text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Ver todos os registros"
        >
          Ver todos
        </button>

        <div ref={filterRef} className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold font-['Manrope'] text-slate-900 hover:bg-gray-50"
            aria-haspopup="menu"
            aria-expanded={isFilterOpen}
            aria-label="Filtrar historico"
          >
            <Filter size={16} />
            {selectedFilter.label}
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
                          onFilterChange(option.value);
                          setIsFilterOpen(false);
                        }}
                        className={`flex h-10 w-full items-center rounded-lg px-3 text-left text-sm font-semibold font-['Manrope'] transition-colors ${
                          option.value === filter
                            ? 'bg-slate-50 text-blue-600'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
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
          onClick={onToggleSort}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold font-['Manrope'] text-slate-900 hover:bg-gray-50"
          aria-label="Ordenar historico"
        >
          <ArrowUpDown size={16} />
          Ordenar: {sortDirection === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>
    </motion.header>
  );
};

export default HistoryPageHeader;
