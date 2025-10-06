// src/components/Header/Navigation.jsx
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';

const navigationItems = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Fale Conosco', href: '#fale-conosco' },
  { label: 'Footer', href: '#footer' }
];

const Navigation = ({ mobile = false, onClose }) => {
  const handleClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    if (mobile && onClose) onClose();
  };

  if (mobile) {
    return (
      <nav className="flex flex-col gap-3">
        {navigationItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="text-grey-600 text-base font-normal font-['Manrope'] hover:text-blue-600 transition-colors cursor-pointer py-2"
          >
            {item.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <motion.nav 
      className="flex justify-start items-center gap-10"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {navigationItems.map((item) => (
        <motion.a
          key={item.label}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className="justify-start text-grey-600 text-sm font-normal font-['Manrope'] hover:text-blue-600 transition-colors cursor-pointer"
          variants={staggerItem}
          whileTap={{ opacity: 0.7 }}
        >
          {item.label}
        </motion.a>
      ))}
    </motion.nav>
  );
};

export default Navigation;