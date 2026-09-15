import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-sky-500 shrink-0" />;
    }
  };

  const getBg = (tipo: string) => {
    switch (tipo) {
      case 'success':
        return 'border-emerald-200 bg-white shadow-emerald-500/10';
      case 'error':
        return 'border-rose-200 bg-white shadow-rose-500/10';
      case 'warning':
        return 'border-amber-200 bg-white shadow-amber-500/10';
      default:
        return 'border-sky-200 bg-white shadow-sky-500/10';
    }
  };

  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg ${getBg(
              toast.tipo
            )}`}
          >
            {getIcon(toast.tipo)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-800 leading-tight">
                {toast.titulo}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {toast.mensagem}
              </p>
            </div>
            <button
              id={`toast-close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg transition-colors cursor-pointer"
              title="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
