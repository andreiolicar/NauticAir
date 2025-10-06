// src/components/Footer/Footer.jsx
import { motion } from 'framer-motion';
import Logo from '../Header/Logo';
import ScrollToTopButton from './ScrollToTopButton';
import SocialLink from './SocialLink';
import { socialLinks, legalLinks } from './footerData';
import { scrollReveal, staggerContainer, staggerItem } from '../../utils/animations';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      className="min-h-72 flex flex-col justify-start items-center gap-6 md:gap-10 px-4 md:px-0 py-8 md:py-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scrollReveal}
    >
      {/* Logo centralizado com botão de scroll */}
      <div className="w-full max-w-[905px] flex justify-between items-start">
        {/* Spacer invisível para desktop */}
        <div className="hidden md:block p-2.5 opacity-0">
          <div className="w-3.5 h-3.5" />
        </div>

        <Logo />
        <ScrollToTopButton onClick={scrollToTop} />
      </div>

      {/* Links sociais - Grid responsivo */}
      <motion.div 
        className="flex flex-col md:flex-row justify-start items-center gap-4 md:gap-5"
        variants={staggerContainer}
      >
        {socialLinks.map((social, index) => (
          <motion.div key={index} variants={staggerItem}>
            <SocialLink
              icon={social.icon}
              label={social.label}
              link={social.link}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Links legais - Grid responsivo */}
      <motion.nav 
        className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
        variants={staggerContainer}
      >
        {legalLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            className="text-grey-600 text-sm font-normal font-['Manrope'] hover:text-blue-600 transition-colors"
            variants={staggerItem}
            whileTap={{ opacity: 0.7 }}
          >
            {link.label}
          </motion.a>
        ))}
      </motion.nav>

      {/* Copyright */}
      <div className="text-center text-grey-600 text-sm font-normal font-['Manrope'] px-4">
        © 2025 NauticAir, Todos os direitos reservados
      </div>

      <div className="h-5" />
    </motion.footer>
  );
};

export default Footer;