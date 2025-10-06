// src/components/Footer/SocialLink.jsx
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail } from 'lucide-react';

const iconMap = {
  Instagram,
  MessageCircle,
  Mail
};

const SocialLink = ({ icon, label, link }) => {
  const IconComponent = iconMap[icon];

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-start items-center gap-3.5 transition-colors"
      whileHover={{ 
        backgroundColor: "#f9fafb",
        transition: { duration: 0.2 }
      }}
      whileTap={{ opacity: 0.7 }}
    >
      <div className="p-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-center items-end">
        <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
          <IconComponent className="w-4 h-4 text-grey-600" />
        </div>
      </div>
      <div className="justify-start text-grey-600 text-sm font-medium font-['Manrope'] leading-tight">
        {label}
      </div>
    </motion.a>
  );
};

export default SocialLink;