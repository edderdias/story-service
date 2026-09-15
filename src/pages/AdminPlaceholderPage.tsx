import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { 
  Sparkles, 
  Construction, 
  ArrowLeft, 
  CheckCircle2, 
  Kanban, 
  Users, 
  Boxes, 
  Receipt, 
  DollarSign, 
  BarChart3, 
  UserCog, 
  Settings,
  Layers
} from 'lucide-react';

interface ModuleInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
}

const MODULES_MAP: Record<string, ModuleInfo> = {
  '/admin/os': {
    title: 'Gestão Completa de Ordens de Serviço',
    description: 'Listagem avançada, filtros múltiplos, impressão de comprovantes e laudos técnicos.',
    icon: <Layers className="w-8 h-8 text-cyan-500" />,
    highlights: ['Busca por status, técnico e data', 'Checklist fotográfico e laudo em PDF', 'Disparo automático via WhatsApp'],
  },
  '/admin/kanban': {
    title: 'Quadro Kanban de Ordens de Serviço',
    description: 'Gestão visual do fluxo de trabalho das OS com colunas por status.',
    icon: <Kanban className="w-8 h-8 text-amber-500" />,
    highlights: ['Arrastar e soltar (Drag & Drop) cards', 'Visualização de prazos e atrasos', 'Alocação rápida de bancada por técnico'],
  },
  '/admin/clientes': {
    title: 'Cadastro e Gestão de Clientes',
    description: 'Histórico completo de atendimentos, aparelhos vinculados e mensagens.',
    icon: <Users className="w-8 h-8 text-blue-500" />,
    highlights: ['Histórico de OS e compras de produtos', 'Autocompletar de endereços via CEP', 'Exportação de contatos para WhatsApp'],
  },
  '/admin/equipamentos': {
    title: 'Cadastro de Equipamentos & Aparelhos',
    description: 'Inventário de computadores, notebooks e celulares com números de série e especificações.',
    icon: <Boxes className="w-8 h-8 text-emerald-500" />,
    highlights: ['Rastreamento por IMEI e Serial', 'Histórico de manutenções anteriores', 'Etiquetas de identificação com QR Code'],
  },
  '/admin/produtos': {
    title: 'Gerenciamento de Produtos & Catálogo',
    description: 'Cadastro de itens com fotos, SKU, especificações e visibilidade no catálogo público.',
    icon: <Boxes className="w-8 h-8 text-purple-500" />,
    highlights: ['Definição de preço promocional', 'Upload de múltiplas fotos', 'Controle de garantia de fábrica'],
  },
  '/admin/estoque': {
    title: 'Controle de Estoque & Reposição',
    description: 'Entrada, saída, alertas de estoque mínimo e inventário de peças e acessórios.',
    icon: <Boxes className="w-8 h-8 text-rose-500" />,
    highlights: ['Alerta automático de estoque mínimo', 'Registro de movimentações com motivo', 'Cálculo de custo médio ponderado'],
  },
  '/admin/vendas': {
    title: 'Ponto de Venda (PDV) - Vendas Presenciais',
    description: 'Emissão rápida de vendas de balcão para clientes que visitam a loja física.',
    icon: <Receipt className="w-8 h-8 text-indigo-500" />,
    highlights: ['Seleção rápida de produtos', 'Múltiplas formas de pagamento (PIX, Cartão, Dinheiro)', 'Baixa automática instantânea no estoque'],
  },
  '/admin/financeiro': {
    title: 'Gestão Financeira & Fluxo de Caixa',
    description: 'Controle de receitas de serviços, vendas de produtos, despesas e lucros.',
    icon: <DollarSign className="w-8 h-8 text-teal-500" />,
    highlights: ['DRE Simplificado e fluxo diário', 'Contas a pagar e fornecedores', 'Separação de faturamento por técnico'],
  },
  '/admin/tecnicos': {
    title: 'Técnicos & Produtividade de Bancada',
    description: 'Desempenho da equipe técnica, comissões e tempo médio de reparo.',
    icon: <Users className="w-8 h-8 text-cyan-500" />,
    highlights: ['Métricas de OS resolvidas no prazo', 'Cálculo de comissão por serviço', 'Especialidades por tipo de aparelho'],
  },
  '/admin/fornecedores': {
    title: 'Cadastro de Fornecedores & Peças',
    description: 'Controle de parceiros comerciais, cotações e prazos de entrega.',
    icon: <Boxes className="w-8 h-8 text-amber-500" />,
    highlights: ['Catálogo de peças de reposição', 'Registro de notas fiscais', 'Avaliação de garantia dos fornecedores'],
  },
  '/admin/relatorios': {
    title: 'Relatórios Gerenciais & Exportação',
    description: 'Estatísticas completas, lucratividade por serviço e exportação para PDF/Excel.',
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    highlights: ['Taxa de conversão de orçamentos', 'Ticket médio por cliente e categoria', 'Gráficos de sazonalidade'],
  },
  '/admin/usuarios': {
    title: 'Usuários, Perfis & Permissões',
    description: 'Controle de acessos diferenciados (Administrador, Gerente, Técnico, Vendedor).',
    icon: <UserCog className="w-8 h-8 text-purple-500" />,
    highlights: ['Controle de acesso baseado em papéis (RBAC)', 'Registro de auditoria de alterações', 'Segurança de dados do cliente'],
  },
  '/admin/configuracoes': {
    title: 'Configurações da Empresa & Sistema',
    description: 'Dados da empresa, logotipo, mensagem padrão de WhatsApp e parâmetros gerais.',
    icon: <Settings className="w-8 h-8 text-slate-500" />,
    highlights: ['Personalização do aviso de loja física', 'Definição de prazos padrão de garantia', 'Configuração de chave PIX e dados bancários'],
  },
};

export const AdminPlaceholderPage: React.FC = () => {
  const location = useLocation();
  const info = MODULES_MAP[location.pathname] || {
    title: 'Módulo Administrativo',
    description: 'Este módulo está pronto para a próxima etapa de desenvolvimento conforme planejado.',
    icon: <Construction className="w-8 h-8 text-cyan-600" />,
    highlights: ['Arquitetura desacoplada', 'Pronto para expansão de endpoints', 'Sincronizado com AppContext'],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Back button */}
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-cyan-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para o Dashboard Principal</span>
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
            {info.icon}
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Etapa 1 Concluída • Módulo Modelado</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {info.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {info.description}
            </p>
          </div>
        </div>

        {/* Features preview */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Recursos e Funcionalidades Planejadas para esta Seção:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {info.highlights.map((h, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-800 leading-tight">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick action back to Dashboard */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Você pode testar a gestão de OS e métricas em tempo real no Dashboard.
          </p>
          <Link
            to="/admin"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Ir para o Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
