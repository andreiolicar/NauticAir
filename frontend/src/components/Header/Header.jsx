// src/components/Header/Header.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthButtons from './AuthButtons';
import { slideDown } from '../../utils/animations';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <motion.div 
        className="hidden lg:flex w-full max-w-[1320px] h-20 px-9 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 justify-between items-center overflow-hidden"
        variants={slideDown}
        initial="hidden"
        animate="visible"
      >
        <Logo />
        <Navigation />
        <AuthButtons />
      </motion.div>

      {/* Mobile/Tablet Header */}
      <motion.div 
        className="flex lg:hidden w-full max-w-[90%] h-16 px-5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 justify-between items-center"
        variants={slideDown}
        initial="hidden"
        animate="visible"
      >
        <Logo />
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-grey-600 hover:text-blue-600 transition-colors"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          className="lg:hidden w-full max-w-[90%] mt-2 p-5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex flex-col gap-4">
            <Navigation mobile onClose={() => setMobileMenuOpen(false)} />
            <div className="pt-4 border-t border-gray-200">
              <AuthButtons mobile />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;