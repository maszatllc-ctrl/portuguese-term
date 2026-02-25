import React from 'react';
import { motion } from 'framer-motion';
import OptionCard from '@/components/OptionCard';
import { Heart, Baby, Users, Shield, ShieldQuestion } from 'lucide-react';

const StepProtect = ({ formData, updateFormData, nextStep }) => {
  const options = [
    { 
      value: 'spouse', 
      icon: Heart, 
      title: 'Meu cônjuge', 
      subtitle: 'Garanta que seu parceiro esteja financeiramente seguro' 
    },
    { 
      value: 'kids', 
      icon: Baby, 
      title: 'Meus filhos', 
      subtitle: 'Proteja o futuro e a educação deles' 
    },
    { 
      value: 'family', 
      icon: Users, 
      title: 'Toda minha família', 
      subtitle: 'Proteção abrangente para entes queridos' 
    },
    { 
      value: 'other', 
      icon: Shield, 
      title: 'Outro', 
      subtitle: 'Cubra despesas finais ou parceiros de negócios' 
    }
  ];

  const handleSelect = (value) => {
    updateFormData('protect', value);
    setTimeout(() => nextStep(), 400);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="p-2 bg-blue-100 rounded-full">
            <ShieldQuestion className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
          </span>
          Quem você quer proteger?
        </h2>
        <p className="text-sm md:text-base text-gray-600 pl-14">Escolha as pessoas que dependem de você financeiramente.</p>
      </motion.div>

      <div className="space-y-3 md:space-y-4">
        {options.map((option, index) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            subtitle={option.subtitle}
            selected={formData.protect === option.value}
            onClick={() => handleSelect(option.value)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default StepProtect;