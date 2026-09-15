import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { StatusOS, OrdemDeServico } from '../types';
import { StatusBadge, STATUS_CONFIG } from '../components/common/StatusBadge';
import { 
  Search, 
  FileSearch, 
  Clock, 
  Calendar, 
  User, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  Package, 
  Printer, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  Info,
  Check
} from 'lucide-react';
import { formatCurrency, buildOrderTrackingUrl, buildApproveQuoteUrl } from '../services/whatsappService';
import { Modal } from '../components/common/Modal';

const TIMELINE_STEPS: { status: StatusOS; label: string; desc: string }[] = [
  { status: 'RECEBIDA', label: 'Recebido', desc: 'Entrada na loja e checklist físico' },
  { status: 'DIAGNOSTICO', label: 'Em Diagnóstico', desc: 'Testes em bancada e testes elétricos' },
  { status: 'ORCAMENTO', label: 'Orçamento', desc: 'Cálculo de peças e serviços' },
  { status: 'AGUARDANDO_APROVACAO', label: 'Aguardando Aprovação', desc: 'Aguardando validação do cliente' },
  { status: 'EM_MANUTENCAO', label: 'Em Manutenção', desc: 'Reparo e substituição de componentes' },
  { status: 'PRONTA', label: 'Pronto', desc: 'Testes de qualidade e aguardando retirada' },
  { status: 'ENTREGUE', label: 'Entregue', desc: 'Equipamento retirado com garantia' },
];

export const TrackOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { findOS, empresa, approveOSQuote, addToast } = useApp();

  const [numeroOSInput, setNumeroOSInput] = useState(searchParams.get('os') || '');
  const [cpfOuTelefoneInput, setCpfOuTelefoneInput] = useState('');
  const [searchedOS, setSearchedOS] = useState<OrdemDeServico | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Auto-search on query param
  useEffect(() => {
    const osParam = searchParams.get('os');
    if (osParam) {
      setNumeroOSInput(osParam);
      const res = findOS(osParam);
      setSearchedOS(res);
      setHasSearched(true);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroOSInput.trim()) {
      addToast('warning', 'Campo Obrigatório', 'Por favor, informe o número da Ordem de Serviço.');
      return;
    }

    setSearchParams({ os: numeroOSInput.trim() });
    const result = findOS(numeroOSInput, cpfOuTelefoneInput);
    setSearchedOS(result);
    setHasSearched(true);

    if (!result) {
      addToast('error', 'OS Não Encontrada', `Não encontramos registros com o número "${numeroOSInput}". Verifique os dados e tente novamente.`);
    }
  };

  const handleQuickDemo = (osNum: string) => {
    setNumeroOSInput(osNum);
    setCpfOuTelefoneInput('');
    setSearchParams({ os: osNum });
    const result = findOS(osNum);
    setSearchedOS(result);
    setHasSearched(true);
  };

  // Determine current timeline progress index
  const getTimelineProgressIndex = (currentStatus: StatusOS): number => {
    if (currentStatus === 'CANCELADA') return -1;
    if (currentStatus === 'ABERTA') return 0;
    
    // Map status directly
    const directIdx = TIMELINE_STEPS.findIndex((s) => s.status === currentStatus);
    if (directIdx !== -1) return directIdx;

    if (currentStatus === 'APROVADA') return 3; // Equivalent to approved
    if (currentStatus === 'AGUARDANDO_PECA') return 4; // Inside maintenance
    return 0;
  };

  const activeStepIdx = searchedOS ? getTimelineProgressIndex(searchedOS.status) : -1;

  const handleApproveOnline = () => {
    if (searchedOS) {
      approveOSQuote(searchedOS.id);
      const updated = findOS(searchedOS.numeroOS);
      setSearchedOS(updated);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      {/* Header / Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
          <FileSearch className="w-4 h-4 text-amber-600" />
          <span>Consulta Pública em Tempo Real</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Acompanhe sua Ordem de Serviço
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Informe o número da OS para consultar o diagnóstico técnico, previsão de entrega e aprovar orçamentos.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Número da OS <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: OS-1001 ou 1001"
                  value={numeroOSInput}
                  onChange={(e) => setNumeroOSInput(e.target.value)}
                  className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 rounded-xl pl-4 pr-3 py-3 border border-slate-300 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                CPF ou Telefone <span className="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ex: 123.456... ou (11) 9..."
                value={cpfOuTelefoneInput}
                onChange={(e) => setCpfOuTelefoneInput(e.target.value)}
                className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 rounded-xl pl-4 pr-3 py-3 border border-slate-300 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            id="btn-buscar-os-pagina"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-cyan-900/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Consultar Situação do Equipamento</span>
          </button>
        </form>

        {/* Quick Demo Pre-fill Links */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
          <p className="font-semibold text-slate-700">Ordens de serviço de teste no sistema:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleQuickDemo('1001')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold hover:bg-emerald-100 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              OS-1001 (iPhone 13 - Pronta)
            </button>
            <button
              onClick={() => handleQuickDemo('1002')}
              className="px-3 py-1.5 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold hover:bg-cyan-100 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" />
              OS-1002 (Dell - Em Manutenção)
            </button>
            <button
              onClick={() => handleQuickDemo('1003')}
              className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold hover:bg-amber-100 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              OS-1003 (Epson - Aguardando Aprovação)
            </button>
          </div>
        </div>
      </div>

      {/* Result Section */}
      {searchedOS && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Main Status Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900">
                    {searchedOS.numeroOS}
                  </span>
                  <StatusBadge status={searchedOS.status} size="lg" />
                </div>
                <p className="text-xs text-slate-500">
                  Cadastrada em: {searchedOS.dataEntrada} • Garantia de {searchedOS.garantiaDias} dias
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
                  title="Visualizar Comprovante da OS"
                >
                  <Printer className="w-4 h-4" />
                  <span>Comprovante</span>
                </button>

                <a
                  href={buildOrderTrackingUrl(searchedOS, empresa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Suporte no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Visual 7-Stage Timeline */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Linha do Tempo do Atendimento
              </h3>

              <div className="relative">
                {/* Horizontal progress on desktop */}
                <div className="hidden lg:grid grid-cols-7 gap-2 relative">
                  {/* Background track line */}
                  <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0" />
                  <div
                    className="absolute top-4 left-6 h-1 bg-cyan-600 transition-all duration-500 -z-0"
                    style={{
                      width: `${(Math.max(0, activeStepIdx) / (TIMELINE_STEPS.length - 1)) * 92}%`,
                    }}
                  />

                  {TIMELINE_STEPS.map((step, idx) => {
                    const isCompleted = idx < activeStepIdx;
                    const isCurrent = idx === activeStepIdx;
                    return (
                      <div key={step.status} className="flex flex-col items-center text-center relative z-10">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isCurrent
                              ? 'bg-cyan-600 text-white ring-4 ring-cyan-100 scale-110'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <h4 className={`text-xs font-bold mt-2 ${isCurrent ? 'text-cyan-700 font-extrabold' : 'text-slate-700'}`}>
                          {step.label}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-tight max-w-[95px]">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical list on mobile */}
                <div className="lg:hidden space-y-4 relative pl-6 border-l-2 border-slate-200">
                  {TIMELINE_STEPS.map((step, idx) => {
                    const isCompleted = idx < activeStepIdx;
                    const isCurrent = idx === activeStepIdx;
                    return (
                      <div key={step.status} className="relative">
                        <div
                          className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCurrent
                              ? 'bg-cyan-600 text-white ring-2 ring-cyan-200'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <div>
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-cyan-700' : 'text-slate-800'}`}>
                            {step.label} {isCurrent && '(Etapa Atual)'}
                          </h4>
                          <p className="text-[11px] text-slate-500 leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Special Approval Banner if status is AGUARDANDO_APROVACAO */}
            {searchedOS.status === 'AGUARDANDO_APROVACAO' && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-amber-950">
                      Orçamento Pronto: Aguardando sua Aprovação
                    </h4>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      Nosso técnico finalizou o diagnóstico. O valor total do serviço com peças é de <strong>{formatCurrency(searchedOS.valorTotal)}</strong>. Você pode aprovar diretamente por aqui ou falar com a gente no WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleApproveOnline}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aprovar Orçamento Online Agora</span>
                  </button>

                  <a
                    href={buildApproveQuoteUrl(searchedOS, empresa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Aprovar via WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* Information Grid: Equipment, Diagnostic, Problem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              {/* Equipment Info */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-cyan-600" />
                  Dados do Equipamento
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  <p>
                    <strong>Aparelho:</strong> {searchedOS.equipamento.marca} {searchedOS.equipamento.modelo} ({searchedOS.equipamento.tipo})
                  </p>
                  {searchedOS.equipamento.numeroSerie && (
                    <p>
                      <strong>Nº de Série:</strong> {searchedOS.equipamento.numeroSerie}
                    </p>
                  )}
                  {searchedOS.equipamento.estadoFisico && (
                    <p>
                      <strong>Estado Físico:</strong> {searchedOS.equipamento.estadoFisico}
                    </p>
                  )}
                  {searchedOS.equipamento.acessoriosEntregues && searchedOS.equipamento.acessoriosEntregues.length > 0 && (
                    <p>
                      <strong>Acessórios Deixados:</strong> {searchedOS.equipamento.acessoriosEntregues.join(', ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Customer & Technical Delivery Info */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-600" />
                  Cliente & Previsão
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  <p>
                    <strong>Cliente:</strong> {searchedOS.clienteNome}
                  </p>
                  <p>
                    <strong>Técnico Responsável:</strong> {searchedOS.tecnicoResponsavelNome || 'Bancada Geral'}
                  </p>
                  <p>
                    <strong>Previsão de Entrega:</strong>{' '}
                    <span className="font-bold text-cyan-700">{searchedOS.previsaoEntrega}</span>
                  </p>
                  <p>
                    <strong>Garantia Legal:</strong> {searchedOS.garantiaDias} dias contra defeitos de fabricação/serviço
                  </p>
                </div>
              </div>
            </div>

            {/* Problem Relatado & Diagnóstico Técnico */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <strong className="text-slate-900 block font-bold">
                  Defeito Relatado na Entrada:
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  {searchedOS.problemaRelatado}
                </p>
              </div>

              {searchedOS.diagnosticoTecnico && (
                <div className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-200 text-xs space-y-1">
                  <strong className="text-cyan-950 block font-bold flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-cyan-700" />
                    Diagnóstico Técnico & Laudo de Bancada:
                  </strong>
                  <p className="text-cyan-900 leading-relaxed">
                    {searchedOS.diagnosticoTecnico}
                  </p>
                </div>
              )}
            </div>

            {/* Financial Breakdown Table */}
            {(searchedOS.servicos.length > 0 || searchedOS.pecas.length > 0) && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-600" />
                  Demonstrativo de Valores do Orçamento
                </h4>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Item / Descrição</th>
                        <th className="p-3 text-center">Tipo</th>
                        <th className="p-3 text-center">Qtd</th>
                        <th className="p-3 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {searchedOS.servicos.map((srv) => (
                        <tr key={srv.id}>
                          <td className="p-3 font-medium text-slate-800">{srv.descricao}</td>
                          <td className="p-3 text-center">
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                              Serviço
                            </span>
                          </td>
                          <td className="p-3 text-center">1</td>
                          <td className="p-3 text-right font-mono font-medium text-slate-800">
                            {formatCurrency(srv.valor)}
                          </td>
                        </tr>
                      ))}
                      {searchedOS.pecas.map((peca) => (
                        <tr key={peca.id}>
                          <td className="p-3 font-medium text-slate-800">{peca.nome}</td>
                          <td className="p-3 text-center">
                            <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-semibold">
                              Peça Original
                            </span>
                          </td>
                          <td className="p-3 text-center">{peca.quantidade}</td>
                          <td className="p-3 text-right font-mono font-medium text-slate-800">
                            {formatCurrency(peca.valorTotal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t-2 border-slate-200 text-xs font-bold">
                      {searchedOS.valorDesconto > 0 && (
                        <tr>
                          <td colSpan={3} className="p-2.5 text-right text-slate-500">Desconto:</td>
                          <td className="p-2.5 text-right text-emerald-600 font-mono">
                            -{formatCurrency(searchedOS.valorDesconto)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan={3} className="p-3 text-right text-slate-900 font-extrabold text-sm">
                          Total da Ordem de Serviço:
                        </td>
                        <td className="p-3 text-right text-cyan-700 font-mono text-base font-black">
                          {formatCurrency(searchedOS.valorTotal)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* History logs */}
            {searchedOS.historico.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  Histórico de Registros
                </h4>
                <div className="space-y-2">
                  {searchedOS.historico.map((h) => (
                    <div
                      key={h.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                    >
                      <div className="flex items-center gap-2">
                        <StatusBadge status={h.status} size="sm" />
                        <span className="text-slate-700 font-medium">{h.observacao}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {h.dataHora} • {h.usuarioNome}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {searchedOS && (
        <Modal
          isOpen={showPrintModal}
          onClose={() => setShowPrintModal(false)}
          title={`Comprovante de Ordem de Serviço - ${searchedOS.numeroOS}`}
          subtitle="Documento para impressão e controle"
          maxWidth="2xl"
        >
          <div className="space-y-6 text-slate-800 text-xs" id="print-area">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-black font-mono text-slate-900">{empresa.nome}</h2>
                <p className="text-slate-500">{empresa.slogan}</p>
                <p className="text-slate-500">CNPJ: {empresa.cnpj} • Tel: {empresa.telefone}</p>
                <p className="text-slate-500">{empresa.endereco.logradouro}, {empresa.endereco.numero} - {empresa.endereco.cidade}/{empresa.endereco.uf}</p>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold font-mono text-cyan-700">{searchedOS.numeroOS}</span>
                <p className="text-slate-500 mt-1">Data: {searchedOS.dataEntrada}</p>
                <StatusBadge status={searchedOS.status} size="sm" />
              </div>
            </div>

            {/* Client & Device */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
              <div>
                <strong className="block text-slate-900 font-bold mb-1">CLIENTE:</strong>
                <p>{searchedOS.clienteNome}</p>
                <p>CPF/CNPJ: {searchedOS.clienteCpf}</p>
                <p>Telefone: {searchedOS.clienteTelefone}</p>
              </div>
              <div>
                <strong className="block text-slate-900 font-bold mb-1">EQUIPAMENTO:</strong>
                <p>{searchedOS.equipamento.marca} {searchedOS.equipamento.modelo}</p>
                <p>S/N: {searchedOS.equipamento.numeroSerie || 'N/A'}</p>
                <p>Previsão: {searchedOS.previsaoEntrega}</p>
              </div>
            </div>

            {/* Defect */}
            <div className="space-y-1">
              <strong className="block text-slate-900 font-bold">Defeito Informado / Constatado:</strong>
              <p className="bg-slate-50 p-2.5 rounded-lg text-slate-600">{searchedOS.problemaRelatado}</p>
            </div>

            {/* Financials */}
            <div className="space-y-2">
              <strong className="block text-slate-900 font-bold">Serviços e Peças:</strong>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="p-2">Descrição</th>
                      <th className="p-2 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {searchedOS.servicos.map((s) => (
                      <tr key={s.id}>
                        <td className="p-2">{s.descricao}</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(s.valor)}</td>
                      </tr>
                    ))}
                    {searchedOS.pecas.map((p) => (
                      <tr key={p.id}>
                        <td className="p-2">{p.nome} (Qtd: {p.quantidade})</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(p.valorTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                    <tr>
                      <td className="p-2 text-right">Total:</td>
                      <td className="p-2 text-right font-mono text-cyan-700">{formatCurrency(searchedOS.valorTotal)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Signature & Legal Notice */}
            <div className="pt-4 border-t border-slate-200 space-y-6">
              <p className="text-[10px] text-slate-500 leading-tight">
                Garantia legal de 90 dias conforme Art. 26 do Código de Defesa do Consumidor para peças e mão de obra executadas. O não comparecimento para retirada do equipamento após 90 dias da notificação de conclusão poderá acarretar cobrança de taxa diária de guarda.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="text-center border-t border-slate-400 pt-2 text-[11px]">
                  Assinatura do Técnico / Responsável
                </div>
                <div className="text-center border-t border-slate-400 pt-2 text-[11px]">
                  Assinatura do Cliente
                </div>
              </div>
            </div>

            {/* Print button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimir Documento
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
