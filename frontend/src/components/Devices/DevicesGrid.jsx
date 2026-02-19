import { AnimatePresence, motion } from 'framer-motion';
import DeviceCard from './DeviceCard';

const DevicesGrid = ({ devices, onOpenDetails }) => {
  if (devices.length === 0) {
    return (
      <section className="rounded-lg border border-zinc-100 bg-white px-6 py-10 text-center text-sm font-medium font-['Manrope'] text-slate-500">
        Nenhum dispositivo encontrado.
      </section>
    );
  }

  return (
    <section aria-label="Lista de dispositivos">
      <motion.ul className="flex flex-wrap items-start gap-4" layout>
        <AnimatePresence mode="popLayout" initial={false}>
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} onOpenDetails={onOpenDetails} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
};

export default DevicesGrid;
