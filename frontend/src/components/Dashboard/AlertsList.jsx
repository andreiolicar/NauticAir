import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import AlertCard from './AlertCard';
import { scrollReveal, staggerContainer } from '../../utils/animations';

const AlertsList = ({ alerts }) => {
  return (
    <motion.section
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-lg border border-gray-200 bg-white p-5"
      aria-labelledby="alerts-title"
    >
      <header className="mb-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <Bell size={16} className="text-slate-500" />
          <h2 id="alerts-title" className="text-base font-bold font-['Manrope'] text-gray-900">
            Alertas
          </h2>
        </div>

        <button
          type="button"
          className="text-sm font-semibold font-['Manrope'] text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Ver todos os alertas"
        >
          Ver todos
        </button>
      </header>

      <div className="mb-4 h-px w-full bg-zinc-100" />

      <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </motion.ul>
    </motion.section>
  );
};

export default AlertsList;
