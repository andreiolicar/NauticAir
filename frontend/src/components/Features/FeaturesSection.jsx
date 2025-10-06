// src/components/Features/FeaturesSection.jsx
import { motion } from 'framer-motion';
import SectionBadge from '../common/SectionBadge';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from './FeatureCard';
import CTAButtons from '../common/CTAButtons';
import { featuresData } from './featuresData';
import { scrollReveal, staggerContainer } from '../../utils/animations';

const FeaturesSection = () => {
  return (
    <motion.section 
      className="flex flex-col justify-start items-center gap-6 md:gap-10 px-4 md:px-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header da seção */}
      <motion.div 
        className="flex flex-col justify-start items-center gap-5"
        variants={scrollReveal}
      >
        <SectionBadge 
          icon="Mail"
          text="Recursos"
        />
        <SectionTitle 
          title="Recursos para você organizar melhor<br />e ganhar mais clientes"
        />
        {/* Texto em uma linha para desktop */}
        <p className="text-center text-grey-600 text-sm md:text-base font-medium font-['Manrope'] leading-snug max-w-[90%] md:max-w-[600px] lg:whitespace-nowrap lg:max-w-none">
          Solução completa de monitoramento de emissões de carbono com tecnologia de ponta
        </p>
      </motion.div>

      {/* Grid de recursos - Responsivo: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <motion.div 
        className="w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="mt-4 flex flex-col items-center gap-5 px-4 md:px-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Texto em uma linha para desktop */}
        <p className="text-center text-grey-600 text-sm md:text-base font-medium font-['Manrope'] leading-snug max-w-[90%] lg:whitespace-nowrap lg:max-w-none">
          Pronto para transformar seu monitoramento de emissões?
        </p>
        <CTAButtons 
          primaryText="Ver Planos e Preços"
          primaryLink="/planos"
          secondaryText="Ver como funciona"
          secondaryLink="/como-funciona"
        />
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;