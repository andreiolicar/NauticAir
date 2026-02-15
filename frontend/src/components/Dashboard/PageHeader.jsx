import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { slideDown } from '../../utils/animations';

const monthOrder = [
  'Janeiro',
  'Fevereiro',
  'Marco',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const PageHeader = ({ title, description, month, baseMonth = 'Maio', onMonthChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const previousMonths = useMemo(() => {
    const currentIndex = monthOrder.indexOf(baseMonth);
    if (currentIndex <= 0) return [];
    return monthOrder.slice(0, currentIndex).reverse();
  }, [baseMonth]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <motion.header
      variants={slideDown}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 bg-gray-50 pb-4 md:flex-row md:items-end md:justify-between"
    >
      <div className="space-y-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs font-semibold font-['Manrope']">
          <span className="text-gray-400">Menu Principal</span>
          <ChevronRight size={14} className="text-blue-600" />
          <span className="font-bold text-blue-600">Dashboard</span>
        </nav>

        <div>
          <h1 className="text-2xl font-semibold font-['Manrope'] text-gray-900">{title}</h1>
          <p className="mt-1 text-sm font-medium font-['Manrope'] text-gray-500">{description}</p>
        </div>
      </div>

      <div ref={dropdownRef} className="relative">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold font-['Manrope'] text-gray-900 transition-colors hover:bg-gray-50"
          aria-label="Selecionar mes de visualizacao"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <span>{month}</span>
          <ChevronDown size={16} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 z-20 w-40 rounded-lg border border-gray-200 bg-white p-1"
            >
              <ul role="menu" aria-label="Meses anteriores" className="space-y-1">
                {previousMonths.map((monthItem) => (
                  <li key={monthItem}>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onMonthChange?.(monthItem);
                        setIsOpen(false);
                      }}
                      className="flex h-10 w-full items-center rounded-lg px-3 text-left text-sm font-semibold font-['Manrope'] text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                      {monthItem}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default PageHeader;
