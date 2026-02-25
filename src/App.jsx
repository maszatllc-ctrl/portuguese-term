import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';

// Lazy load components for optimized loading speed
const QuizFunnel = lazy(() => import('@/components/QuizFunnel'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('@/pages/TermsOfUse'));

const FACEBOOK_PIXEL_ID = "862212346976951";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Facebook Pixel Initialization
    if (!window.fbq) {
      (function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)})(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      if (window.fbq) {
        window.fbq('init', FACEBOOK_PIXEL_ID);
        window.fbq('track', 'PageView');
      }
    }

    // TrustedForm Script
    const trustedFormScriptId = 'trustedform-script';
    if (!document.getElementById(trustedFormScriptId)) {
        const tf = document.createElement('script');
        tf.id = trustedFormScriptId;
        tf.type = 'text/javascript';
        tf.async = true;
        tf.src = "https://cdn.trustedform.com/trustedform.js";
        tf.onload = () => {
            if (window.xxTrustedForm) {
                window.xxTrustedForm.Initialize_submitting_page_2();
            }
        };
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(tf, s);
    }
  }, []);

  useEffect(() => {
    // Track page views on route change for Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);


  return (
    <>
      <Helmet>
        <title>Cotação de Seguro de Vida - Proteja-se em 2 Minutos | Cotação Grátis</title>
        <meta name="description" content="Obtenha sua cotação personalizada de seguro de vida em apenas 2 minutos. Compare taxas dos principais provedores e proteja o futuro da sua família hoje. Sem obrigações, 100% grátis." />
        <script>
          {`
            (function() {
              var field = 'xxTrustedFormCertUrl';
              var provideReferrer = false;
              var tf = document.createElement('script');
              tf.type = 'text/javascript';
              tf.async = true;
              tf.src = 'http' + ('https:' == document.location.protocol ? 's' : '') +
              '://api.trustedform.com/trustedform.js?provide_referrer=' + escape(provideReferrer) + '&field=' + escape(field) + '&l=' + new Date().getTime() + Math.random();
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(tf, s);
            })();
          `}
        </script>
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <main className="flex-grow flex flex-col items-center justify-center">
          <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<QuizFunnel />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;