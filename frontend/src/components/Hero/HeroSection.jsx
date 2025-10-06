// src/components/Hero/HeroSection.jsx
import { motion } from 'framer-motion';
import SectionBadge from '../common/SectionBadge';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';
import CTAButtons from '../common/CTAButtons';

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-6 md:gap-10 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <SectionBadge 
          icon="WindArrowDown"
          text="Diminua suas Emissões de Carbono!"
          bgColor="bg-active-clue"
          outlineColor="outline-blue-600/20"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <HeroTitle />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <HeroDescription />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.9,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        <CTAButtons 
          primaryText="Começar agora!"
          primaryLink="/registro"
          secondaryText="Ver como funciona"
          secondaryLink="#como-funciona"
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;