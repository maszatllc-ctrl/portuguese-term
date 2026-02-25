import React from 'react';
import { motion } from 'framer-motion';
import OptionCard from '@/components/OptionCard';
import { DollarSign, TrendingUp, Landmark, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const StepCoverage = ({ formData, updateFormData, nextStep, prevStep }) => {
  const options = [
    { 
      value: '$50,000–$150,000', 
      icon: DollarSign, 
      title: '$50.000–$150.000', 
      subtitle: 'Cobertura básica para necessidades essenciais' 
    },
    { 
      value: '$150,000–$300,000', 
      icon: TrendingUp, 
      title: '$150.000–$300.000', 
      subtitle: 'Escolha popular para famílias' 
    },
    { 
      value: '$300,000–$500,000', 
      icon: Landmark, 
      title: '$300.000–$500.000', 
      subtitle: 'Proteção e segurança aprimoradas' 
    },
    { 
      value: '$500,000+', 
      icon: Crown, 
      title: '$500.000+', 
      subtitle: 'Cobertura máxima para tranquilidade' 
    }
  ];

  const handleSelect = (value) => {
    updateFormData('coverage', value);
    setTimeout(() => nextStep(), 400);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <Button
        variant="ghost"
        onClick={prevStep}
        className="mb-4 -ml-2 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Voltar
      </Button>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="p-2 bg-emerald-100 rounded-full">
            <DollarSign className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />
          </span>
          Quanto de cobertura você está procurando?
        </h2>
        <p className="text-sm md:text-base text-gray-600 pl-14">
          Escolha o valor de cobertura que melhor se adapta às suas necessidades.
        </p>
      </motion.div>

      <div className="space-y-3 md:space-y-4">
        {options.map((option, index) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            subtitle={option.subtitle}
            selected={formData.coverage === option.value}
            onClick={() => handleSelect(option.value)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default StepCoverage;