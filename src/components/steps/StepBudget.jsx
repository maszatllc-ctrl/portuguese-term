import React from 'react';
import { motion } from 'framer-motion';
import OptionCard from '@/components/OptionCard';
import { Wallet, Coins, Gem, Landmark, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const StepBudget = ({ formData, updateFormData, nextStep, prevStep }) => {
  const options = [
    { 
      value: 'Up to $30/mo', 
      icon: Wallet, 
      title: 'Up to $30/mo', 
      subtitle: 'Affordable basic coverage' 
    },
    { 
      value: '$30-$50/mo', 
      icon: Coins, 
      title: '$30 - $50/mo', 
      subtitle: 'Popular choice for families' 
    },
    { 
      value: '$50-$100/mo', 
      icon: Gem, 
      title: '$50 - $100/mo', 
      subtitle: 'Enhanced protection' 
    },
    { 
      value: '$100+/mo', 
      icon: Landmark, 
      title: '$100+/mo', 
      subtitle: 'Maximum coverage options' 
    }
  ];

  const handleSelect = (value) => {
    updateFormData('budget', value);
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
        Back
      </Button>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="p-2 bg-green-100 rounded-full">
                <PiggyBank className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
            </span>
            What monthly budget feels comfortable?
        </h2>
        <p className="text-sm md:text-base text-gray-600 pl-14">
          We have plans for every budget.
        </p>
      </motion.div>

      <div className="space-y-3 md:space-y-4">
        {options.map((option, index) => (
          <OptionCard
            key={option.value}
            icon={option.icon}
            title={option.title}
            subtitle={option.subtitle}
            selected={formData.budget === option.value}
            onClick={() => handleSelect(option.value)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default StepBudget;