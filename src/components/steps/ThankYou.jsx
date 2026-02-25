import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, MessageSquare } from 'lucide-react';

const ThankYou = ({
  formData
}) => {
  return <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <motion.div initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      type: "spring",
      duration: 0.6
    }} className="flex justify-center mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-green-600" />
        </div>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }} className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Obrigado! 🎉
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6">Recebemos suas informações e estamos preparando sua cotação</p>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="space-y-4 mb-8">
        <h3 className="font-semibold text-lg text-gray-900 mb-4 text-center">O que acontece agora?</h3>
        
        <div className="flex gap-4 items-start">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Espere uma Ligação em Breve</h4>
            <p className="text-sm text-gray-600">Um agente licenciado ligará para você em breve para revisar suas melhores opções</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Verifique Suas Mensagens de Texto</h4>
            <p className="text-sm text-gray-600">Nosso agente enviará um SMS para discutir os próximos passos</p>
          </div>
        </div>
      </motion.div>
    </div>;
};

export default ThankYou;