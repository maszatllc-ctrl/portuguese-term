import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Phone, Loader2, ShieldCheck, CheckCircle, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// ----------------- Phone helpers -----------------

const extractDigits = value => (value || '').replace(/\D/g, '');

// Simplified for US Only
const getMaxDigitsForCountry = () => 10; // US fixed

const validatePhoneDigits = (digits) => {
  return digits.length === 10;
};

const formatPhoneForDisplay = (digits) => {
  if (!digits) return '';
  // (XXX) XXX-XXXX for US
  const m = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!m) return digits;
  const [, a, b, c] = m;
  if (c) return `(${a}) ${b}-${c}`;
  if (b) return `(${a}) ${b}`;
  if (a) return `(${a}`;
  return '';
};

const getPhonePlaceholder = () => '(555) 555-5555';

const extractInitialPhoneDigits = (formDataPhone) => {
  if (!formDataPhone) return '';
  const digits = extractDigits(formDataPhone);
  // If it starts with 1 (country code), remove it
  if (digits.startsWith('1') && digits.length > 10) {
    return digits.slice(1);
  }
  return digits;
};

// ----------------- Component -----------------

const StepContact = ({
  formData,
  updateFormData,
  nextStep,
  submitLead
}) => {
  // Fixed to US
  const countryCode = '+1';
  
  const [name, setName] = useState(formData.name || '');
  const [phoneDigits, setPhoneDigits] = useState(extractInitialPhoneDigits(formData.phone));
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();

  // Validate phone whenever digits change
  useEffect(() => {
    setIsPhoneValid(validatePhoneDigits(phoneDigits));
  }, [phoneDigits]);

  const handleNameBlur = () => {
    setIsNameValid(name.trim().length >= 2);
  };

  const handlePhoneChange = e => {
    const raw = e.target.value || '';
    const digitsOnly = extractDigits(raw);
    const maxLen = getMaxDigitsForCountry();
    setPhoneDigits(digitsOnly.slice(0, maxLen));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameOk = name.trim().length >= 2;
    const phoneOk = validatePhoneDigits(phoneDigits);
    setIsNameValid(nameOk);
    setIsPhoneValid(phoneOk);
    if (!nameOk || !phoneOk) {
      toast({
        title: 'Entrada Inválida',
        description: 'Por favor, insira seu nome completo e um número de telefone válido dos EUA.',
        variant: 'destructive'
      });
      return;
    }

    // Start loading state to prevent double clicks
    setIsLoading(true);

    // Update form data
    updateFormData('name', name);
    const fullPhoneNumber = `${countryCode}${phoneDigits}`;
    updateFormData('phone', fullPhoneNumber);
    const certUrlInput = document.querySelector('input[name="xxTrustedFormCertUrl"]');
    const certificate_url = certUrlInput ? certUrlInput.value : null;
    
    const leadData = {
      name,
      phone: fullPhoneNumber,
      zip_code: formData.zipCode,
      state: formData.state,
      protect_whom: formData.protect,
      coverage_amount: formData.coverage,
      certificate_url,
      language: 'portuguese'
    };

    // Fire and forget submission - handled by parent component
    submitLead(leadData);

    // Navigate immediately without waiting for API response
    nextStep();
  };
  
  const formattedPhone = formatPhoneForDisplay(phoneDigits);
  const placeholder = getPhonePlaceholder();
  
  return <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        {/* Testimonial */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img className="w-16 h-16 rounded-full object-cover" src="https://images.unsplash.com/photo-1620028901154-2a26028de912" alt="Família feliz" />
            <div>
              <div className="flex justify-center md:justify-start text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="font-bold text-gray-800">Fácil e Acessível</p>
              <p className="text-gray-600 text-sm">
                "Eu estava nervoso sobre conseguir seguro de vida como imigrante,
                mas eles me guiaram por tudo em poucos minutos e consegui
                cobertura imediatamente."
              </p>
              <p className="text-gray-500 text-xs mt-1">Carlos Mendes</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex justify-center gap-4 my-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
            <CheckCircle className="w-4 h-4" />
            Sem Exame Médico
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            Sem Visto Necessário
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">ENCONTRAMOS O MELHOR VALOR PARA VOCÊ</h2>
          <p className="text-gray-600 mt-1">
            Quase lá — onde podemos enviar sua cotação gratuita?
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Seu Nome
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} onBlur={handleNameBlur} placeholder="Nome completo" className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
              {isNameValid && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />}
            </div>
          </div>

          {/* Phone (controlled, fixed US) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Telefone (EUA)
            </label>
            <div className="relative flex items-center bg-white rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
              
              {/* Static US Flag/Code */}
              <div className="flex items-center pl-3 pr-2 border-r border-gray-300 h-full py-3 rounded-l-lg bg-gray-50">
                <span className="text-lg leading-none">🇺🇸</span>
                <span className="text-gray-500 font-medium ml-2 text-sm">+1</span>
              </div>

              <div className="relative flex-grow flex items-center">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input id="phone" type="tel" inputMode="numeric" value={formattedPhone} onChange={handlePhoneChange} placeholder={placeholder} className="w-full pl-10 pr-10 py-3 border-none rounded-r-lg focus:ring-0 text-base" required />
                {isPhoneValid && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />}
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Obter Minha Cotação'}
          </Button>

          {/* Disclaimer */}
          <div className="flex items-center justify-center text-xs text-gray-500 text-center mt-2">
            <span>
              🔒 Seus dados estão seguros. Ao clicar em &quot;Obter Minha Cotação&quot;, você
              concorda em ser contatado por um agente licenciado via telefone ou mensagem de texto.
            </span>
          </div>
        </form>
      </motion.div>
    </div>;
};
export default StepContact;