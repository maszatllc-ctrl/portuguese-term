import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '@/components/ProgressBar';
import StepProtect from '@/components/steps/StepProtect';
import StepCoverage from '@/components/steps/StepCoverage';
import StepSix from '@/components/steps/StepSix';
import StepLoading from '@/components/steps/StepLoading';
import StepContact from '@/components/steps/StepContact';
import ThankYou from '@/components/steps/ThankYou';
import SocialProof from '@/components/SocialProof';
import Badges from '@/components/Badges';
import { supabase } from '@/lib/customSupabaseClient';

// ----------------- Webhook helper -----------------
const sendLeadWebhook = async (leadData, eventId) => {
  const webhookSent = sessionStorage.getItem('webhookSent');
  if (webhookSent === 'true') {
    console.log('Webhook already sent for this session. Skipping.');
    return {
      success: true,
      message: 'Webhook already sent.'
    };
  }
  try {
    const {
      data: secrets
    } = await supabase.functions.invoke('get-secret', {
      body: {
        secret_name: 'LEAD_CONNECTOR_WEBHOOK_URL'
      }
    });
    if (!secrets || !secrets.LEAD_CONNECTOR_WEBHOOK_URL) {
      throw new Error('Webhook URL not found');
    }
    
    // Send leadData directly as it now contains language field
    const response = await fetch(secrets.LEAD_CONNECTOR_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });
    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.statusText}`);
    }
    const result = await response.json();
    
    // Updated to use the new high-life function
    const {
      error: fbError
    } = await supabase.functions.invoke('send-facebook-lead-high-life', {
      body: {
        leadData,
        event_id: eventId
      }
    });
    if (fbError) {
      console.error('Facebook CAPI invocation failed:', fbError.message);
    }
    sessionStorage.setItem('webhookSent', 'true');
    console.log('Webhook and CAPI sent successfully.', result);
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Error sending lead to webhook/CAPI:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const QuizFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    protect: '',
    coverage: '',
    zipCode: '',
    state: '',
    name: '',
    phone: ''
  });

  useEffect(() => {
    // Clear webhook session storage on first load
    sessionStorage.removeItem('webhookSent');
  }, []);

  const totalSteps = 5;
  const showHeader = currentStep === 0;

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handle background submission to ensure immediate UI navigation
  const submitLead = async (leadData) => {
    const eventId = crypto.randomUUID();
    try {
      // 1. Insert into Supabase
      const { error: dbError } = await supabase.from('leads').insert([leadData]);
      if (dbError) throw dbError;

      // 2. Send Webhook & CAPI
      await sendLeadWebhook(leadData, eventId);

      // 3. Track Client-side Pixel
      if (window.fbq) {
        window.fbq('track', 'Lead', {}, {
          eventID: eventId
        });
      }
    } catch (error) {
      console.error('Background submission error:', error);
      // We don't show error to user here because they are already on Thank You page
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepProtect formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 1:
        return <StepCoverage formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <StepSix formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepLoading nextStep={nextStep} />;
      case 4:
        return <StepContact 
          formData={formData} 
          updateFormData={updateFormData} 
          nextStep={nextStep} 
          prevStep={prevStep}
          submitLead={submitLead}
        />;
      case 5:
        return <ThankYou formData={formData} />;
      default:
        return null;
    }
  };

  const isThankYouStep = currentStep === totalSteps;
  const isContactStep = currentStep === 4;
  const isLoadingStep = currentStep === 3;

  return (
    <div className="py-4 md:py-8 px-4 w-full">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <AnimatePresence>
            {showHeader && !isThankYouStep && (
              <motion.div
                exit={{
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                <SocialProof className="mb-4" />
                <div className="text-center mb-6 md:mb-8">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Obtenha Até $1.000.000 em Seguro de Vida Por $1/Dia</h1>
                  </div>
                  <p className="text-base md:text-lg text-gray-600">Sem necessidade de SSN • Sem exame médico • Sem risco de imigração. Descubra para o que você se qualifica em 60 segundos</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isThankYouStep && !isLoadingStep && (
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps - 1} isLastStep={isContactStep} />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {!isContactStep && !isThankYouStep && !isLoadingStep && (
          <Badges className="mt-8" />
        )}
      </div>
    </div>
  );
};

export default QuizFunnel;