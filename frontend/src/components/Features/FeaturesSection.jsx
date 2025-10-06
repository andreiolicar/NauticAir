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
      className="flex flex-col justify-start items-center gap-10"
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
        <p className="text-center text-grey-600 text-base font-medium font-['Manrope'] leading-snug max-w-[600px]">
          Solução completa de monitoramento de emissões de carbono com tecnologia de ponta
        </p>
      </motion.div>

      {/* Grid de recursos - 3 colunas x 2 linhas */}
      <motion.div 
        className="w-[1320px] grid grid-cols-3 gap-6"
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
        className="mt-4 flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-center text-grey-600 text-base font-medium font-['Manrope'] leading-snug">
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