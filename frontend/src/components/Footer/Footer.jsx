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
      className="h-72 flex flex-col justify-start items-center gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scrollReveal}
    >
      {/* Logo centralizado com botão de scroll */}
      <div className="w-[905px] inline-flex justify-between items-start">
        <div className="p-2.5 opacity-0 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
          <div className="w-3.5 h-3.5 relative overflow-hidden">
            <div className="w-2 h-2 left-[2.92px] top-[2.92px] absolute outline outline-1 outline-offset-[-0.58px] outline-grey-600" />
          </div>
        </div>

        <Logo />
        <ScrollToTopButton onClick={scrollToTop} />
      </div>

      {/* Links sociais */}
      <motion.div 
        className="inline-flex justify-start items-start gap-5"
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

      {/* Links legais */}
      <motion.nav 
        className="inline-flex justify-start items-center gap-10"
        variants={staggerContainer}
      >
        {legalLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            className="justify-start text-grey-600 text-sm font-normal font-['Manrope'] hover:text-blue-600 transition-colors"
            variants={staggerItem}
            whileTap={{ opacity: 0.7 }}
          >
            {link.label}
          </motion.a>
        ))}
      </motion.nav>

      {/* Copyright */}
      <div className="justify-start text-grey-600 text-sm font-normal font-['Manrope']">
        © 2025 NauticAir, Todos os direitos reservados
      </div>

      <div className="self-stretch h-5" />
    </motion.footer>
  );
};

export default Footer;