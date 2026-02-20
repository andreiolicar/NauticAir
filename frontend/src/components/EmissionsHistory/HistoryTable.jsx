import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { fadeIn, staggerContainer, staggerItem } from '../../utils/animations';
import HistoryStatusBadge from './HistoryStatusBadge';

const HistoryTable = ({ rows, onView, currentPage, totalPages, onPageChange }) => {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="rounded-lg border border-zinc-100 bg-white px-6 py-5"
      aria-label="Tabela de historico de emissoes"
    >
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-bold font-['Manrope'] text-slate-500">ROTA</th>
                <th className="px-6 py-4 text-left text-xs font-bold font-['Manrope'] text-slate-500">DURACAO</th>
                <th className="px-6 py-4 text-left text-xs font-bold font-['Manrope'] text-slate-500">RESPONSAVEL</th>
                <th className="px-6 py-4 text-left text-xs font-bold font-['Manrope'] text-slate-500">DISPOSITIVO</th>
                <th className="px-6 py-4 text-left text-xs font-bold font-['Manrope'] text-slate-500">CREDITOS CO2</th>
                <th className="px-6 py-4 text-left text-xs font-bold font-['Manrope'] text-slate-500">STATUS</th>
                <th className="px-6 py-4 text-right text-xs font-bold font-['Manrope'] text-slate-500">ACOES</th>
              </tr>
            </thead>

            <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
              {rows.map((row) => (
                <motion.tr key={row.id} variants={staggerItem} className="border-b border-zinc-100">
                  <td className="px-6 py-4 text-sm font-semibold font-['Manrope'] text-slate-900">{row.route}</td>
                  <td className="px-6 py-4 text-sm font-semibold font-['Manrope'] text-slate-900">{row.duration}</td>
                  <td className="px-6 py-4 text-sm font-medium font-['Manrope'] text-slate-900">{row.captain}</td>
                  <td className="px-6 py-4 text-sm font-medium font-['Manrope'] text-slate-900">{row.deviceId}</td>
                  <td className="px-6 py-4 text-sm font-semibold font-['Manrope'] text-slate-900">{row.credits}</td>
                  <td className="px-6 py-4">
                    <HistoryStatusBadge status={row.status} label={row.statusLabel} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onView(row)}
                      className="inline-flex items-center rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      aria-label={`Ver detalhes da rota ${row.route}`}
                    >
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        <footer className="mt-0 flex items-center justify-between border-t border-zinc-100 px-6 py-4">
          <p className="text-xs font-medium font-['Manrope'] text-slate-500">
            Pagina {currentPage} de {totalPages}
          </p>

          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold font-['Manrope'] text-slate-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold font-['Manrope'] text-slate-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Proxima
            </button>
          </div>
        </footer>
      </div>
    </motion.section>
  );
};

export default HistoryTable;
