import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle, Share2, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if iOS
    const isIosDevice = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    
    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  if (!showPrompt && !isIOS) return null;

  return (
    <>
      {/* Small floating banner */}
      <div 
        id="pwa-install-banner"
        className="fixed bottom-20 right-6 z-40 bg-slate-900 border border-cyan-500/30 text-white p-3.5 rounded-2xl shadow-2xl max-w-xs w-full flex items-center justify-between gap-3 animate-fade-in backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Instalar Aplicativo</h5>
            <p className="text-[11px] text-slate-400">Acesse offline e mais rápido</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="btn-install-pwa"
            onClick={handleInstallClick}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar</span>
          </button>
          <button
            onClick={() => {
              setShowPrompt(false);
              setIsIOS(false);
            }}
            className="text-slate-400 hover:text-white p-1"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS instructions modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-base flex items-center gap-2 text-cyan-400">
                <Smartphone className="w-5 h-5" />
                Instalar no iPhone / iPad
              </h4>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Para instalar este aplicativo no seu dispositivo Apple:
            </p>
            <ol className="text-xs text-slate-300 space-y-2.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 text-[10px] font-bold flex items-center justify-center">1</span>
                <span>Toque no botão <strong>Compartilhar</strong> (<Share2 className="w-3.5 h-3.5 inline text-cyan-400" />) no Safari.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 text-[10px] font-bold flex items-center justify-center">2</span>
                <span>Role para baixo e selecione <strong>Adicionar à Tela de Início</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-cyan-400" />).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-900 text-cyan-300 text-[10px] font-bold flex items-center justify-center">3</span>
                <span>Toque em <strong>Adicionar</strong> no canto superior direito.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
};
