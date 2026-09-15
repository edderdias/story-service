import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { StatusOS, OrdemDeServico } from '../types';
import { StatusBadge, STATUS_CONFIG } from '../components/common/StatusBadge';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  DollarSign, 
  TrendingUp, 
  ShoppingBag, 
  Plus, 
  Search, 
  MessageSquare, 
  FileText, 
  Boxes, 
  Receipt, 
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Package
} from 'lucide-react';
import { formatCurrency, buildOrderTrackingUrl } from '../services/whatsappService';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Modal } from '../components/common/Modal';

export const AdminDashboardPage: React.FC = () => {
  const { 
    ordensServico, 
    produtos, 
    vendas, 
    financeiro, 
    empresa, 
    currentUser, 
    updateOSStatus,
    setOrdensServico,
    addToast
  } = useApp();

  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('TODAS');
  const [selectedOSToEdit, setSelectedOSToEdit] = useState<OrdemDeServico | null>(null);
  const [quickNewStatus, setQuickNewStatus] = useState<StatusOS>('EM_MANUTENCAO');
  const [statusNote, setStatusNote] = useState('');
  const [showNewOSModal, setShowNewOSModal] = useState(false);

  // New OS Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientCpf, setNewClientCpf] = useState('');
  const [newEquipType, setNewEquipType] = useState<'SMARTPHONE' | 'NOTEBOOK' | 'DESKTOP' | 'TABLET' | 'IMPRESSORA' | 'OUTRO'>('SMARTPHONE');
  const [newEquipBrand, setNewEquipBrand] = useState('');
  const [newEquipModel, setNewEquipModel] = useState('');
  const [newEquipSerial, setNewEquipSerial] = useState('');
  const [newProblem, setNewProblem] = useState('');

  // 1. Calculate Metrics
  const osAbertas = ordensServico.filter((os) => !['ENTREGUE', 'CANCELADA'].includes(os.status)).length;
  const osEmManutencao = ordensServico.filter((os) => os.status === 'EM_MANUTENCAO').length;
  const osAguardandoAprovacao = ordensServico.filter((os) => os.status === 'AGUARDANDO_APROVACAO').length;
  const osProntas = ordensServico.filter((os) => os.status === 'PRONTA').length;

  const vendasDoDiaTotal = useMemo(() => {
    return vendas.reduce((acc, curr) => acc + curr.valorTotal, 0);
  }, [vendas]);

  const faturamentoMensal = useMemo(() => {
    return financeiro
      .filter((f) => f.tipo === 'RECEITA')
      .reduce((acc, curr) => acc + curr.valor, 0);
  }, [financeiro]);

  const produtosEstoqueBaixo = useMemo(() => {
    return produtos.filter((p) => p.estoque <= p.estoqueMinimo);
  }, [produtos]);

  // 2. Chart Data: Faturamento Semanal/Mensal
  const revenueChartData = [
    { dia: 'Seg', receitaOS: 1050, vendasBalcao: 220 },
    { dia: 'Ter', receitaOS: 880, vendasBalcao: 350 },
    { dia: 'Qua', receitaOS: 1420, vendasBalcao: 490 },
    { dia: 'Qui', receitaOS: 950, vendasBalcao: 280 },
    { dia: 'Sex', receitaOS: 1680, vendasBalcao: 610 },
    { dia: 'Sáb', receitaOS: 1200, vendasBalcao: 780 },
  ];

  // 3. Chart Data: OS por Status
  const osStatusChartData = useMemo(() => {
    const counts: Record<string, number> = {
      'Em Diagnóstico': ordensServico.filter((o) => o.status === 'DIAGNOSTICO').length,
      'Aguardando Aprovação': ordensServico.filter((o) => o.status === 'AGUARDANDO_APROVACAO').length,
      'Em Manutenção': ordensServico.filter((o) => o.status === 'EM_MANUTENCAO').length,
      'Prontas para Retirada': ordensServico.filter((o) => o.status === 'PRONTA').length,
      'Entregues': ordensServico.filter((o) => o.status === 'ENTREGUE').length,
    };
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [ordensServico]);

  const PIE_COLORS = ['#6366f1', '#f59e0b', '#06b6d4', '#10b981', '#64748b'];

  // 4. Top Services Data
  const topServicesData = [
    { name: 'Troca de Tela OLED', total: 42 },
    { name: 'Upgrade SSD + Formatação', total: 38 },
    { name: 'Limpeza Preventiva & Pasta Térmica', total: 29 },
    { name: 'Troca de Bateria Original', total: 24 },
    { name: 'Desobstrução Cabeçote Impressora', total: 15 },
  ];

  // 5. Top Products Data
  const topProductsData = [
    { name: 'Carregador GaN 65W', qtd: 28 },
    { name: 'SSD NVMe 1TB Kingston', qtd: 22 },
    { name: 'Fone TWS Bluetooth ANC', qtd: 19 },
    { name: 'Hub USB-C 7 em 1', qtd: 14 },
    { name: 'Memória 16GB DDR4', qtd: 12 },
  ];

  // Filtered recent orders
  const filteredRecentOrders = useMemo(() => {
    if (statusFilter === 'TODAS') return ordensServico;
    return ordensServico.filter((os) => os.status === statusFilter);
  }, [ordensServico, statusFilter]);

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOSToEdit) {
      updateOSStatus(selectedOSToEdit.id, quickNewStatus, statusNote);
      setSelectedOSToEdit(null);
      setStatusNote('');
    }
  };

  const handleCreateNewOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newEquipBrand || !newProblem) {
      addToast('error', 'Campos Obrigatórios', 'Preencha os dados do cliente, aparelho e defeito.');
      return;
    }

    const nextNumber = ordensServico.length + 1001;
    const numeroOS = `OS-${nextNumber}`;
    const agora = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newOS: OrdemDeServico = {
      id: `os_${Date.now()}`,
      numeroOS,
      clienteId: `cli_${Date.now()}`,
      clienteNome: newClientName,
      clienteTelefone: newClientPhone || '(11) 90000-0000',
      clienteCpf: newClientCpf || '000.000.000-00',
      equipamento: {
        id: `eq_${Date.now()}`,
        clienteId: `cli_${Date.now()}`,
        tipo: newEquipType,
        marca: newEquipBrand,
        modelo: newEquipModel || 'Modelo Padrão',
        numeroSerie: newEquipSerial,
        estadoFisico: 'Equipamento recebido na recepção.',
        checklist: {
          tela: 'OK',
          carcaca: 'OK',
          camera: true,
          bateria: 'OK',
          botoes: true,
          conectores: true,
          altoFalante: true,
          microfone: true,
          liga: true,
        },
      },
      dataEntrada: agora,
      previsaoEntrega: 'A definir após diagnóstico',
      problemaRelatado: newProblem,
      tecnicoResponsavelNome: 'Bancada Geral',
      status: 'RECEBIDA',
      servicos: [],
      pecas: [],
      valorTotalServicos: 0,
      valorTotalPecas: 0,
      valorDesconto: 0,
      valorTotal: 0,
      aprovadoPeloCliente: false,
      garantiaDias: 90,
      historico: [
        {
          id: `hist_${Date.now()}`,
          status: 'RECEBIDA',
          dataHora: agora,
          usuarioNome: currentUser?.name || 'Recepção',
          observacao: 'Ordem de serviço aberta na recepção.',
        },
      ],
    };

    setOrdensServico([newOS, ...ordensServico]);
    addToast('success', 'OS Criada com Sucesso!', `A Ordem de Serviço ${numeroOS} foi registrada no sistema.`);
    setShowNewOSModal(false);
    // Reset inputs
    setNewClientName('');
    setNewClientPhone('');
    setNewClientCpf('');
    setNewEquipBrand('');
    setNewEquipModel('');
    setNewEquipSerial('');
    setNewProblem('');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header / Greeting & Quick New OS Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>Visão Geral do Negócio</span>
            <span>•</span>
            <span className="text-cyan-700 font-bold">{empresa.nome}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Administrativo
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewOSModal(true)}
            id="btn-admin-nova-os"
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-md shadow-cyan-900/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Ordem de Serviço</span>
          </button>
        </div>
      </div>

      {/* 7 Core KPI Metric Cards (Matching Section #9) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        {/* 1. OS Abertas */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              OS Abertas
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{osAbertas}</span>
            <span className="text-[10px] text-slate-400 block">no laboratório</span>
          </div>
        </div>

        {/* 2. OS em Manutenção */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Em Reparo
            </span>
            <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-cyan-700">{osEmManutencao}</span>
            <span className="text-[10px] text-slate-400 block">em bancada</span>
          </div>
        </div>

        {/* 3. OS Aguardando Aprovação */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Aguard. Aprov.
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-amber-600">{osAguardandoAprovacao}</span>
            <span className="text-[10px] text-slate-400 block">orçamentos</span>
          </div>
        </div>

        {/* 4. OS Prontas */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              OS Prontas
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-emerald-600">{osProntas}</span>
            <span className="text-[10px] text-slate-400 block">aguarda retirada</span>
          </div>
        </div>

        {/* 5. Vendas do Dia */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Vendas Loja
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-black text-slate-900">
              {formatCurrency(vendasDoDiaTotal)}
            </span>
            <span className="text-[10px] text-slate-400 block">balcão presencial</span>
          </div>
        </div>

        {/* 6. Faturamento Mensal */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Faturamento
            </span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-black text-slate-900">
              {formatCurrency(faturamentoMensal)}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block">+18.5% no mês</span>
          </div>
        </div>

        {/* 7. Estoque Baixo */}
        <div className={`p-4 rounded-2xl border shadow-xs flex flex-col justify-between space-y-2 ${
          produtosEstoqueBaixo.length > 0
            ? 'bg-rose-50/70 border-rose-200 text-rose-900'
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
              Estoque Baixo
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-rose-700">
              {produtosEstoqueBaixo.length}
            </span>
            <span className="text-[10px] text-rose-600 font-semibold block">itens críticos</span>
          </div>
        </div>
      </div>

      {/* Charts Grid (Faturamento + Status Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Faturamento Semanal/Mensal (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Evolução do Faturamento (Serviços OS vs Vendas Balcão)
              </h3>
              <p className="text-xs text-slate-500">Receita por categoria na semana atual</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              R$ 8.650,00 total
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="colorOS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBalcao" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="dia" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `R$${v}`} />
                <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                <Area type="monotone" dataKey="receitaOS" name="Serviços OS" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorOS)" />
                <Area type="monotone" dataKey="vendasBalcao" name="Venda Acessórios" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorBalcao)" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribuição de OS por Status (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Distribuição de OS por Status
            </h3>
            <p className="text-xs text-slate-500">Volume atual de aparelhos em fluxo</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={osStatusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {osStatusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Analytical Cards: Top Services & Top Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Serviços Mais Realizados */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-600" />
              Serviços Mais Realizados no Mês
            </h3>
            <span className="text-[11px] text-slate-400">Total: 148 ordens</span>
          </div>

          <div className="space-y-3 pt-2">
            {topServicesData.map((srv, idx) => (
              <div key={srv.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{srv.name}</span>
                  <span className="font-bold text-slate-900">{srv.total} reparos</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    style={{ width: `${(srv.total / 45) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Produtos Mais Vendidos */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              Produtos & Acessórios Mais Vendidos
            </h3>
            <span className="text-[11px] text-slate-400">Total: 95 un.</span>
          </div>

          <div className="space-y-3 pt-2">
            {topProductsData.map((prod, idx) => (
              <div key={prod.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{prod.name}</span>
                  <span className="font-bold text-slate-900">{prod.qtd} vendidos</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                    style={{ width: `${(prod.qtd / 30) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Stock Alerts List */}
      {produtosEstoqueBaixo.length > 0 && (
        <div className="bg-rose-50/80 border border-rose-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Atenção: Produtos com Estoque Crítico / Necessitam Reposição</span>
            </div>
            <span className="text-xs text-rose-700 font-semibold">
              {produtosEstoqueBaixo.length} produtos abaixo do mínimo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {produtosEstoqueBaixo.map((p) => (
              <div
                key={p.id}
                className="bg-white p-3.5 rounded-2xl border border-rose-200/80 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {p.marca} • SKU: {p.sku}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 truncate">{p.nome}</h5>
                  <p className="text-[11px] text-rose-600 font-semibold mt-0.5">
                    Estoque Atual: {p.estoque} (Mínimo: {p.estoqueMinimo})
                  </p>
                </div>
                <Link
                  to={`/produtos/${p.id}`}
                  className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold rounded-lg shrink-0 transition-colors"
                >
                  Ver
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders Table (Gestão Rápida de OS) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Ordens de Serviço em Andamento
            </h3>
            <p className="text-xs text-slate-500">
              Controle rápido de status, laudos e atendimento ao cliente
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'TODAS', label: 'Todas' },
              { id: 'RECEBIDA', label: 'Recebidas' },
              { id: 'DIAGNOSTICO', label: 'Diagnóstico' },
              { id: 'AGUARDANDO_APROVACAO', label: 'Aguard. Aprovação' },
              { id: 'EM_MANUTENCAO', label: 'Em Manutenção' },
              { id: 'PRONTA', label: 'Prontas' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  statusFilter === f.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="border border-slate-200 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Nº OS</th>
                <th className="p-3.5">Cliente</th>
                <th className="p-3.5">Equipamento</th>
                <th className="p-3.5">Defeito / Problema</th>
                <th className="p-3.5">Status Atual</th>
                <th className="p-3.5 text-right">Valor Total</th>
                <th className="p-3.5 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecentOrders.map((os) => {
                const waUrl = buildOrderTrackingUrl(os, empresa);
                return (
                  <tr key={os.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-cyan-700">
                      <Link to={`/acompanhar-os?os=${os.numeroOS}`} className="hover:underline">
                        {os.numeroOS}
                      </Link>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{os.clienteNome}</div>
                      <div className="text-[10px] text-slate-400">{os.clienteTelefone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">
                        {os.equipamento.marca} {os.equipamento.modelo}
                      </div>
                      <div className="text-[10px] text-slate-400">{os.equipamento.tipo}</div>
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <p className="text-slate-600 truncate">{os.problemaRelatado}</p>
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={os.status} size="sm" />
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                      {formatCurrency(os.valorTotal)}
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Change Status Button */}
                        <button
                          onClick={() => {
                            setSelectedOSToEdit(os);
                            setQuickNewStatus(os.status);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                          title="Alterar status da OS"
                        >
                          Mudar Status
                        </button>

                        {/* WhatsApp Customer Button */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Falar com cliente no WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Alterar Status de OS */}
      {selectedOSToEdit && (
        <Modal
          isOpen={!!selectedOSToEdit}
          onClose={() => setSelectedOSToEdit(null)}
          title={`Atualizar Status: ${selectedOSToEdit.numeroOS}`}
          subtitle={`Cliente: ${selectedOSToEdit.clienteNome} • ${selectedOSToEdit.equipamento.marca} ${selectedOSToEdit.equipamento.modelo}`}
          maxWidth="md"
        >
          <form onSubmit={handleUpdateStatusSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 uppercase">
                Novo Status
              </label>
              <select
                value={quickNewStatus}
                onChange={(e) => setQuickNewStatus(e.target.value as StatusOS)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:outline-none focus:border-cyan-500"
              >
                {Object.keys(STATUS_CONFIG).map((st) => (
                  <option key={st} value={st}>
                    {STATUS_CONFIG[st as StatusOS].label} ({st})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5 uppercase">
                Observação Técnica do Histórico
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Peça chegou do fornecedor e foi instalada com sucesso nos testes..."
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedOSToEdit(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold cursor-pointer shadow-sm"
              >
                Salvar Alteração
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Nova Ordem de Serviço */}
      <Modal
        isOpen={showNewOSModal}
        onClose={() => setShowNewOSModal(false)}
        title="Cadastrar Nova Ordem de Serviço"
        subtitle="Entrada de equipamento na loja com checklist e emissão imediata"
        maxWidth="xl"
      >
        <form onSubmit={handleCreateNewOS} className="space-y-4 text-xs">
          {/* Customer info */}
          <div className="space-y-3 pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-cyan-700">
              1. Dados do Cliente
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Eduardo Silveira"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Telefone / WhatsApp *</label>
                <input
                  type="text"
                  placeholder="Ex: (11) 98888-7766"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Equipment info */}
          <div className="space-y-3 pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-cyan-700">
              2. Dados do Equipamento
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tipo</label>
                <select
                  value={newEquipType}
                  onChange={(e) => setNewEquipType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none"
                >
                  <option value="SMARTPHONE">Smartphone</option>
                  <option value="NOTEBOOK">Notebook</option>
                  <option value="DESKTOP">Computador</option>
                  <option value="TABLET">Tablet</option>
                  <option value="IMPRESSORA">Impressora</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Marca *</label>
                <input
                  type="text"
                  placeholder="Ex: Apple, Samsung, Dell"
                  value={newEquipBrand}
                  onChange={(e) => setNewEquipBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Modelo Completo</label>
                <input
                  type="text"
                  placeholder="Ex: iPhone 14 Pro 128GB Roxo"
                  value={newEquipModel}
                  onChange={(e) => setNewEquipModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Problem & Checklist */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] text-cyan-700">
              3. Defeito Relatado na Entrada
            </h4>
            <textarea
              rows={3}
              placeholder="Descreva detalhadamente o problema relatado pelo cliente (ex: caiu na água, não liga, tela piscando)..."
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowNewOSModal(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-bold cursor-pointer shadow-md shadow-cyan-900/20"
            >
              Gerar Ordem de Serviço
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
