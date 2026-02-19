import { motion } from 'framer-motion';
import { ChevronRight, Plus } from 'lucide-react';
import { slideDown } from '../../utils/animations';

const DevicesPageHeader = ({ onCreate }) => {
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
          <span className="font-bold text-blue-600">Dispositivos</span>
        </nav>

        <div>
          <h1 className="text-2xl font-bold font-['Manrope'] leading-8 text-slate-900">Dispositivos</h1>
          <p className="mt-0.5 text-sm font-medium font-['Manrope'] leading-5 text-slate-500">
            Visualize seus dispositivos conectados e desconectados
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold font-['Manrope'] leading-5 text-white hover:bg-blue-700"
      >
        <Plus size={16} />
        Adicionar dispositivo
      </button>
    </motion.header>
  );
};

export default DevicesPageHeader;
