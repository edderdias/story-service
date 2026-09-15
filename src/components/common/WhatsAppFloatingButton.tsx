import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { MessageSquare } from 'lucide-react';
import { buildGeneralSupportUrl } from '../../services/whatsappService';

export const WhatsAppFloatingButton: React.FC = () => {
  const { empresa } = useApp();
  const whatsappUrl = buildGeneralSupportUrl(empresa, 'Atendimento Rápido WhatsApp');

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp-btn"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-xl shadow-emerald-900/30 hover:scale-105 transition-all group"
      title="Falar com atendente no WhatsApp"
      aria-label="Atendimento via WhatsApp"
    >
      <div className="relative">
        <MessageSquare className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full"></span>
      </div>
      <span className="text-xs font-bold tracking-tight hidden sm:inline-block">
        Fale Conosco
      </span>
    </a>
  );
};
