import React from 'react';
import { StatusOS } from '../../types';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  Package, 
  FileText, 
  Sparkles, 
  XCircle, 
  Truck 
} from 'lucide-react';

interface StatusBadgeProps {
  status: StatusOS;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const STATUS_CONFIG: Record<StatusOS, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
  ABERTA: {
    label: 'Aberta',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    icon: <Clock className="w-3.5 h-3.5" />
  },
  RECEBIDA: {
    label: 'Recebido na Loja',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: <Package className="w-3.5 h-3.5" />
  },
  DIAGNOSTICO: {
    label: 'Em Diagnóstico',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    icon: <Wrench className="w-3.5 h-3.5" />
  },
  ORCAMENTO: {
    label: 'Orçamento Gerado',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    icon: <FileText className="w-3.5 h-3.5" />
  },
  AGUARDANDO_APROVACAO: {
    label: 'Aguardando Aprovação',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    icon: <AlertCircle className="w-3.5 h-3.5" />
  },
  APROVADA: {
    label: 'Orçamento Aprovado',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />
  },
  EM_MANUTENCAO: {
    label: 'Em Manutenção',
    bg: 'bg-cyan-50',
    text: 'text-cyan-800',
    border: 'border-cyan-200',
    icon: <Wrench className="w-3.5 h-3.5 animate-spin" />
  },
  AGUARDANDO_PECA: {
    label: 'Aguardando Peça',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    icon: <Package className="w-3.5 h-3.5" />
  },
  PRONTA: {
    label: 'Pronta para Retirada',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    icon: <Sparkles className="w-3.5 h-3.5" />
  },
  ENTREGUE: {
    label: 'Entregue ao Cliente',
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300',
    icon: <Truck className="w-3.5 h-3.5" />
  },
  CANCELADA: {
    label: 'Cancelada',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    icon: <XCircle className="w-3.5 h-3.5" />
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md', 
  showIcon = true 
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.ABERTA;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  }[size];

  return (
    <span
      id={`badge-status-${status.toLowerCase()}`}
      className={`inline-flex items-center rounded-full border whitespace-nowrap ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
};
