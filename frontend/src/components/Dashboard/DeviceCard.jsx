import { motion } from 'framer-motion';
import { staggerItem } from '../../utils/animations';

const statusClasses = {
  connected: 'bg-emerald-50 text-teal-600',
  disconnected: 'bg-pink-100 text-red-800'
};

const labelMap = {
  connected: 'Conectado',
  disconnected: 'Desconectado'
};

const DeviceCard = ({ device }) => {
  const classes = statusClasses[device.status] || statusClasses.disconnected;
  const label = labelMap[device.status] || labelMap.disconnected;

  return (
    <motion.li variants={staggerItem} className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <img
          src="https://placehold.co/56x56"
          alt={`Avatar do ${device.id}`}
          className="h-14 w-14 rounded-full"
        />

        <div>
          <p className="text-sm font-medium font-['Manrope'] text-gray-900">{device.id}</p>
          <p className="text-sm font-medium font-['Manrope'] text-gray-400">Dispositivo</p>
        </div>
      </div>

      <span className={`inline-flex items-center gap-2.5 rounded-full px-2.5 py-1 text-xs font-bold font-['Manrope'] ${classes}`}>
        <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
        {label}
      </span>
    </motion.li>
  );
};

export default DeviceCard;
