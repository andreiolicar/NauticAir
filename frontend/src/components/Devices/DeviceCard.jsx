import { motion } from 'framer-motion';
import DeviceStatusBadge from './DeviceStatusBadge';
import DeviceInfoChip from './DeviceInfoChip';

const DeviceCard = ({ device, onOpenDetails }) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="w-full rounded-lg border border-zinc-100 bg-white px-6 py-5 md:w-64"
    >
      <article className="flex flex-col gap-6">
        <header className="inline-flex items-center gap-3">
          <img className="h-16 w-16 rounded-full" src={device.image} alt={`Imagem de ${device.id}`} />
          <div className="inline-flex flex-col gap-1.5">
            <h3 className="text-sm font-medium font-['Manrope'] leading-5 text-slate-900">{device.id}</h3>
            <DeviceStatusBadge status={device.status} />
          </div>
        </header>

        <div className="h-px w-full bg-zinc-100" />

        <ul className="flex flex-col gap-3" aria-label={`Informacoes de ${device.id}`}>
          <li>
            <DeviceInfoChip type="schedule" label={device.schedule} />
          </li>
          <li>
            <DeviceInfoChip type="hour" label={device.hours} />
          </li>
          <li>
            <DeviceInfoChip type="cost" label={device.cost} />
          </li>
        </ul>

        <div className="h-px w-full bg-zinc-100" />

        <button
          type="button"
          onClick={() => onOpenDetails(device.id)}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold font-['Manrope'] leading-5 text-white hover:bg-blue-700"
        >
          Ver detalhes
        </button>
      </article>
    </motion.li>
  );
};

export default DeviceCard;
