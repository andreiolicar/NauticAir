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
      className="flex flex-col justify-start items-center gap-10"
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
        <p className="text-center justify-start text-grey-600 text-base font-medium font-['Manrope'] leading-snug">
          Estamos aqui para ajudar. Entre em contato conosco por qualquer canal abaixo.
        </p>
      </motion.div>
      
      <motion.div 
        className="inline-flex justify-start items-start gap-10"
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