import { motion } from 'framer-motion';
import { staggerItem } from '../../utils/animations';

const MetricCard = ({ icon: Icon, title, value }) => {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{
        backgroundColor: '#f9fafb',
        transition: { duration: 0.2 }
      }}
      className="rounded-lg border border-gray-200 bg-white p-5 transition-colors"
    >
      <div className="mb-2 inline-flex items-center gap-2">
        <span className="rounded-full bg-gray-50 p-2 text-blue-600">
          <Icon size={16} aria-hidden="true" />
        </span>
        <h3 className="text-sm font-semibold font-['Manrope'] text-gray-500">{title}</h3>
      </div>

      <p className="text-2xl font-bold font-['Manrope'] text-gray-900">{value}</p>
    </motion.article>
  );
};

export default MetricCard;
