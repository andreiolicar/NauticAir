// src/components/Contact/ContactSection.jsx
import { motion } from 'framer-motion';
import SectionBadge from '../common/SectionBadge';
import SectionTitle from '../common/SectionTitle';
import ContactCard from './ContactCard';
import { contactData } from './contactData';
import { scrollReveal, staggerContainer } from '../../utils/animations';

const ContactSection = () => {
  return (
    <motion.section 
      className="flex flex-col justify-start items-center gap-6 md:gap-10 px-4 md:px-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div 
        className="flex flex-col justify-start items-center gap-5"
        variants={scrollReveal}
      >
        <SectionBadge 
          icon="Mail"
          text="Fale Conosco"
        />
        <SectionTitle 
          title="Entre em contato"
        />
        {/* Texto em uma linha para desktop */}
        <p className="text-center text-grey-600 text-sm md:text-base font-medium font-['Manrope'] leading-snug max-w-[90%] lg:whitespace-nowrap lg:max-w-none">
          Estamos aqui para ajudar. Entre em contato conosco por qualquer canal abaixo.
        </p>
      </motion.div>
      
      {/* Grid de contatos - 1 col mobile, 3 cols desktop */}
      <motion.div 
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-[900px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {contactData.map((contact, index) => (
          <ContactCard 
            key={index}
            icon={contact.icon}
            title={contact.title}
            description={contact.description}
            buttonText={contact.buttonText}
            link={contact.link}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;