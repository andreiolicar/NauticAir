// src/components/Header/Logo.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ship } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/">
      <motion.div 
        className="inline-flex flex-col justify-start items-start gap-2.5"
        whileHover={{ 
          opacity: 0.8,
          transition: { duration: 0.2 }
        }}
        whileTap={{ opacity: 0.7 }}
      >
        <div className="inline-flex justify-start items-center gap-1.5">
          <motion.div 
            className="w-7 h-7 bg-blue-600 rounded-md inline-flex flex-col justify-center items-center gap-9 overflow-hidden"
            whileHover={{ 
              backgroundColor: "#2563eb",
              transition: { duration: 0.2 }
            }}
          >
            <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center">
              <Ship className="w-4 h-4 text-white" />
            </div>
          </motion.div>
          <div className="justify-start text-slate-900 text-xl font-bold font-['Nunito'] leading-loose">
            NauticAir
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;