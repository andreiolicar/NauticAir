// src/components/Footer/ScrollToTopButton.jsx
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="p-2.5 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden cursor-pointer bg-white"
      whileHover={{ 
        scale: 1.1,
        backgroundColor: "#f3f4f6",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.9 }}
      animate={{ 
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }}
      aria-label="Voltar ao topo"
    >
      <div className="w-3.5 h-3.5 relative overflow-hidden flex items-center justify-center">
        <ArrowUp className="w-4 h-4 text-grey-600" />
      </div>
    </motion.button>
  );
};

export default ScrollToTopButton;