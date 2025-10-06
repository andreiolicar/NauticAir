// src/components/Features/FeatureCard.jsx
import { motion } from 'framer-motion';
import { Server, Cpu, Monitor, Cloud, Zap, Shield } from 'lucide-react';
import { staggerItem } from '../../utils/animations';

const iconMap = {
  Server,
  Cpu,
  Monitor,
  Cloud,
  Zap,
  Shield
};

const FeatureCard = ({ icon, title, description, index }) => {
  const IconComponent = iconMap[icon];

  return (
    <motion.div 
      className="p-6 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-4 transition-colors"
      variants={staggerItem}
      whileHover={{ 
        backgroundColor: "#f9fafb",
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className="p-3 bg-blue-50 rounded-lg inline-flex justify-center items-center"
        whileHover={{ rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <IconComponent className="w-6 h-6 text-blue-600" />
      </motion.div>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-neutral-800 text-xl font-bold font-['Manrope'] leading-tight">
          {title}
        </h3>
        <p className="text-grey-600 text-sm font-normal font-['Manrope'] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;