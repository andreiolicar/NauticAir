import { AnimatePresence, motion } from 'framer-motion';
import AlertsFeedItem from './AlertsFeedItem';
import { scrollReveal } from '../../utils/animations';

const AlertsFeed = ({ alerts, listKey, onOpenDetails }) => {
  return (
    <motion.section
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-lg border border-zinc-100 bg-white px-6 py-5"
      aria-labelledby="alerts-feed-title"
    >
      <h2 id="alerts-feed-title" className="sr-only">
        Lista de alertas
      </h2>

      {alerts.length === 0 ? (
        <div className="py-10 text-center text-sm font-medium font-['Manrope'] text-slate-500">
          Nenhum alerta encontrado para este filtro.
        </div>
      ) : (
        <motion.ul
          key={listKey}
          initial={false}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {alerts.map((alert) => (
              <AlertsFeedItem key={alert.id} alert={alert} onOpenDetails={onOpenDetails} />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </motion.section>
  );
};

export default AlertsFeed;
