// src/components/Header/Header.jsx
import { motion } from 'framer-motion';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthButtons from './AuthButtons';
import { slideDown } from '../../utils/animations';

const Header = () => {
  return (
    <motion.div 
      className="w-[1320px] h-20 px-9 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 flex justify-between items-center overflow-hidden"
      variants={slideDown}
      initial="hidden"
      animate="visible"
    >
      <Logo />
      <Navigation />
      <AuthButtons />
    </motion.div>
  );
};

export default Header;