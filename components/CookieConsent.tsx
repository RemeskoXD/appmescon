"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    } else if (consent === "granted") {
      // Ensure consent is updated on subsequent page loads
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        });
      }
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "granted");
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
    setShow(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", "denied");
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 pointer-events-none"
      >
        <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-sm text-slate-300">
            <h3 className="text-white font-bold text-base mb-2">Respektujeme vaše soukromí 🍪</h3>
            <p>
              Tento web používá soubory cookie k vylepšení vašeho zážitku, analýze návštěvnosti (Google Analytics, Microsoft Clarity) a personalizaci obsahu. 
              Kliknutím na „Přijmout vše“ souhlasíte s používáním všech cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={rejectAll}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Pouze nezbytné
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-[#5885fa] hover:bg-[#406ee0] transition-colors shadow-lg shadow-[#5885fa]/20"
            >
              Přijmout vše
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
