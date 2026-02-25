import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <Helmet>
        <title>Termos de Uso - Quick Life Rates</title>
        <meta name="description" content="Leia os termos de uso da Quick Life Rates. Ao usar nosso site, você concorda com estes termos e condições." />
      </Helmet>
      <div className="mb-6">
        <Button variant="ghost" asChild className="-ml-2 text-gray-600 hover:text-gray-900">
          <Link to="/">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para Início
          </Link>
        </Button>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Termos de Uso</h1>
      <p className="text-gray-700 mb-4">
        Bem-vindo à Quick Life Rates. Ao acessar ou usar nosso site, você concorda em estar vinculado a estes Termos de Uso e nossa Política de Privacidade.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Aceitação dos Termos</h2>
      <p className="text-gray-700 mb-4">
        Estes Termos de Uso regem seu acesso e uso do site e serviços da Quick Life Rates. Se você não concordar com estes termos, por favor, não use nossos serviços.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Uso dos Serviços</h2>
      <p className="text-gray-700 mb-4">
        A Quick Life Rates fornece uma plataforma online para ajudar os usuários a comparar cotações de seguro de vida. Você concorda em usar nossos serviços apenas para fins legais e de acordo com estes Termos.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Conduta do Usuário</h2>
      <p className="text-gray-700 mb-4">
        Você concorda em não:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
        <li>Usar nossos serviços para qualquer finalidade ilegal ou não autorizada.</li>
        <li>Transmitir quaisquer vírus ou outros códigos maliciosos.</li>
        <li>Interferir ou interromper a integridade ou desempenho de nossos serviços.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Isenção de Garantias</h2>
      <p className="text-gray-700 mb-4">
        Nossos serviços são fornecidos "como estão" e "conforme disponíveis" sem quaisquer garantias de qualquer tipo, expressas ou implícitas. A Quick Life Rates não garante que o serviço será ininterrupto, livre de erros ou seguro.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Limitação de Responsabilidade</h2>
      <p className="text-gray-700 mb-4">
        Em nenhuma circunstância a Quick Life Rates será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Alterações aos Termos</h2>
      <p className="text-gray-700 mb-4">
        Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. Seu uso continuado do serviço após quaisquer alterações constitui sua aceitação dos novos Termos de Uso.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Informações de Contato</h2>
      <p className="text-gray-700">
        Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco.
      </p>
    </div>
  );
};

export default TermsOfUse;