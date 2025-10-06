// src/components/Contact/ContactCard.jsx
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import { staggerItem } from '../../utils/animations';

const iconMap = {
  MessageCircle,
  Mail,
  Phone
};

const ContactCard = ({ icon, title, description, buttonText, link }) => {
  const IconComponent = iconMap[icon];

  return (
    <motion.div 
      className="w-[280px] p-5 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-start items-start gap-3.5 transition-colors"
      variants={staggerItem}
      whileHover={{ 
        backgroundColor: "#f9fafb",
        transition: { duration: 0.2 }
      }}
    >
      <div className="p-3 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-center items-end">
        <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
          <IconComponent className="w-4 h-4 text-grey-600" />
        </div>
      </div>
      
      <div className="text-center justify-start text-neutral-800 text-xl font-bold font-['Manrope'] leading-tight">
        {title}
      </div>
      
      <div className="justify-start text-grey-600 text-sm font-medium font-['Manrope'] leading-tight">
        {description}
      </div>
      
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-center items-center gap-2.5 overflow-hidden transition-colors"
        whileHover={{ 
          backgroundColor: "#f3f4f6",
          transition: { duration: 0.2 }
        }}
        whileTap={{ opacity: 0.8 }}
      >
        <div className="text-center justify-start text-grey-600 text-sm font-medium font-['Manrope']">
          {buttonText}
        </div>
        <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
          <ExternalLink className="w-4 h-4 text-grey-600" />
        </div>
      </motion.a>
    </motion.div>
  );
};

export default ContactCard;