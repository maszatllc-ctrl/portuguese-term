import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <Helmet>
        <title>Política de Privacidade - Quick Life Rates</title>
        <meta name="description" content="Leia a política de privacidade da Quick Life Rates. Estamos comprometidos em proteger suas informações pessoais e privacidade." />
      </Helmet>
      <div className="mb-6">
        <Button variant="ghost" asChild className="-ml-2 text-gray-600 hover:text-gray-900">
          <Link to="/">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para Início
          </Link>
        </Button>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Política de Privacidade</h1>
      <p className="text-gray-700 mb-4">
        Esta Política de Privacidade descreve como a Quick Life Rates ("nós", "nos" ou "nosso") coleta, usa e compartilha suas informações pessoais quando você usa nosso site.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Informações que Coletamos</h2>
      <p className="text-gray-700 mb-4">
        Coletamos informações que você nos fornece diretamente quando usa nossos serviços, como seu nome, endereço de e-mail, número de telefone e informações demográficas relacionadas a cotações de seguro de vida (por exemplo, CEP, estado de saúde).
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Como Usamos Suas Informações</h2>
      <p className="text-gray-700 mb-4">
        Usamos as informações que coletamos para:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
        <li>Fornecer, manter e melhorar nossos serviços.</li>
        <li>Processar suas solicitações de cotações de seguro de vida.</li>
        <li>Comunicar com você sobre suas cotações e serviços relacionados.</li>
        <li>Enviar comunicações de marketing e promocionais (com seu consentimento).</li>
        <li>Cumprir obrigações legais.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Compartilhamento de Suas Informações</h2>
      <p className="text-gray-700 mb-4">
        Podemos compartilhar suas informações pessoais com provedores de seguros terceiros para gerar cotações, bem como com prestadores de serviços que nos auxiliam na operação de nosso site e na condução de nossos negócios. Não vendemos suas informações pessoais a terceiros.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Segurança</h2>
      <p className="text-gray-700 mb-4">
        Implementamos medidas de segurança razoáveis para proteger suas informações contra acesso não autorizado, divulgação, alteração e destruição.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Alterações a Esta Política</h2>
      <p className="text-gray-700 mb-4">
        Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Entre em Contato</h2>
      <p className="text-gray-700">
        Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco.
      </p>
    </div>
  );
};

export default PrivacyPolicy;