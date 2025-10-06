// src/components/common/CTAButtons.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTAButtons = ({ 
  primaryText = "Começar agora!",
  primaryLink = "/registro",
  secondaryText = "Ver como funciona",
  secondaryLink = "#como-funciona",
  showSecondary = true 
}) => {
  return (
    <div className="inline-flex justify-center items-start gap-5">
      {showSecondary && (
        <motion.a
          href={secondaryLink}
          className="px-6 py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-colors"
          whileHover={{ 
            backgroundColor: "#f9fafb",
            transition: { duration: 0.2 }
          }}
          whileTap={{ opacity: 0.8 }}
        >
          <div className="self-stretch text-center justify-start text-grey-600 text-base font-medium font-['Manrope']">
            {secondaryText}
          </div>
        </motion.a>
      )}
      
      <motion.div
        whileHover={{ 
          opacity: 0.9,
          transition: { duration: 0.2 }
        }}
        whileTap={{ opacity: 0.8 }}
      >
        <Link
          to={primaryLink}
          className="px-6 py-2.5 bg-blue-600 rounded-lg inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-blue-700 transition-colors"
        >
          <div className="self-stretch text-center justify-start text-white text-base font-medium font-['Manrope']">
            {primaryText}
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default CTAButtons;