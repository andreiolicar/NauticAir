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
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-5 w-full md:w-auto px-4 md:px-0">
      {showSecondary && (
        <motion.a
          href={secondaryLink}
          className="w-full md:w-auto px-6 py-2.5 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-colors"
          whileHover={{ 
            backgroundColor: "#f9fafb",
            transition: { duration: 0.2 }
          }}
          whileTap={{ opacity: 0.8 }}
        >
          <div className="text-center text-grey-600 text-base font-medium font-['Manrope']">
            {secondaryText}
          </div>
        </motion.a>
      )}
      
      <motion.div
        className="w-full md:w-auto"
        whileHover={{ 
          opacity: 0.9,
          transition: { duration: 0.2 }
        }}
        whileTap={{ opacity: 0.8 }}
      >
        <Link
          to={primaryLink}
          className="w-full md:w-auto px-6 py-2.5 bg-blue-600 rounded-lg inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden hover:bg-blue-700 transition-colors"
        >
          <div className="text-center text-white text-base font-medium font-['Manrope']">
            {primaryText}
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default CTAButtons;