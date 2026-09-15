import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { 
  Wrench, 
  Smartphone, 
  Laptop, 
  Monitor, 
  Tablet, 
  Printer, 
  Wifi, 
  HardDrive, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Clock, 
  Award, 
  Sparkles, 
  MessageSquare, 
  AlertCircle,
  HelpCircle,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { buildGeneralSupportUrl, buildProductInterestUrl, formatCurrency } from '../services/whatsappService';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { empresa, produtos } = useApp();
  const navigate = useNavigate();
  const [searchOS, setSearchOS] = useState('');
  const [searchError, setSearchError] = useState(false);

  const featuredProducts = produtos.filter((p) => p.destaque && p.visivelCatalogo && p.ativo).slice(0, 4);

  const handleSearchOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOS.trim()) {
      setSearchError(true);
      return;
    }
    navigate(`/acompanhar-os?os=${encodeURIComponent(searchOS.trim())}`);
  };

  const services = [
    {
      id: 'srv-smartphones',
      title: 'Celulares & Smartphones',
      icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
      desc: 'Troca de telas OLED/LCD, substituição de baterias originais, conectores de carga, botões e reparos em placas.',
      tags: ['iPhone', 'Samsung', 'Motorola', 'Xiaomi'],
    },
    {
      id: 'srv-notebooks',
      title: 'Notebooks & MacBooks',
      icon: <Laptop className="w-6 h-6 text-blue-400" />,
      desc: 'Reparo de carcaças e dobradiças, upgrade de SSD NVMe e memória RAM, troca de telas, teclado e bateria.',
      tags: ['Dell', 'Apple MacBook', 'Lenovo', 'Acer', 'Asus'],
    },
    {
      id: 'srv-desktops',
      title: 'Computadores & PCs Gamer',
      icon: <Monitor className="w-6 h-6 text-indigo-400" />,
      desc: 'Montagem especializada, limpeza preventiva profunda, troca de pasta térmica de prata e diagnóstico de placas de vídeo.',
      tags: ['Ryzen', 'Intel Core', 'RTX', 'Workstations'],
    },
    {
      id: 'srv-tablets',
      title: 'Tablets & iPads',
      icon: <Tablet className="w-6 h-6 text-teal-400" />,
      desc: 'Troca de vidro touch e displays completos, recuperação de conectores USB-C/Lightning e baterias.',
      tags: ['iPad', 'Galaxy Tab', 'Lenovo Tab'],
    },
    {
      id: 'srv-impressoras',
      title: 'Impressoras Tanque de Tinta',
      icon: <Printer className="w-6 h-6 text-amber-400" />,
      desc: 'Desobstrução ultrassônica de cabeçotes, reset de almofadas de tinta, instalação de dispenser e reparo mecânico.',
      tags: ['Epson EcoTank', 'HP Ink Tank', 'Canon'],
    },
    {
      id: 'srv-redes',
      title: 'Redes & Infraestrutura',
      icon: <Wifi className="w-6 h-6 text-emerald-400" />,
      desc: 'Configuração de roteadores Wi-Fi 6 Mesh, cabeamento estruturado Cat6, servidores de arquivos e segurança de rede.',
      tags: ['Wi-Fi 6', 'Mesh', 'Roteadores', 'Switches'],
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Você traz o equipamento',
      desc: 'Recebemos seu aparelho na loja com checklist detalhado de entrada e emissão imediata da Ordem de Serviço.',
    },
    {
      number: '02',
      title: 'Diagnóstico transparente',
      desc: 'Nossa bancada técnica realiza testes eletrônicos avançados para identificar a causa exata da falha.',
    },
    {
      number: '03',
      title: 'Aprovação do orçamento',
      desc: 'Você recebe o orçamento detalhado via WhatsApp ou consulta online e só paga se autorizar o serviço.',
    },
    {
      number: '04',
      title: 'Execução do reparo',
      desc: 'Utilizamos peças de alta qualidade, ferramentas profissionais e rigorosos testes de bancada.',
    },
    {
      number: '05',
      title: 'Retirada e garantia',
      desc: 'Você retira seu equipamento 100% testado com certificado de garantia por escrito de até 90 dias.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 lg:pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-cyan-600/15 to-blue-600/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tecnologia & Confiabilidade com Laboratório Próprio</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Assistência técnica especializada para sua{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                tecnologia
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Consertamos, configuramos e cuidamos dos seus equipamentos com segurança, agilidade e total transparência. Notebooks, celulares, computadores e venda de acessórios premium.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={buildGeneralSupportUrl(empresa, 'Solicitação de Assistência Técnica')}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-btn-solicitar"
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>Solicitar Assistência</span>
              </a>

              <Link
                to="/acompanhar-os"
                id="hero-btn-acompanhar"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Acompanhar OS</span>
              </Link>

              <Link
                to="/produtos"
                id="hero-btn-produtos"
                className="px-5 py-3 rounded-xl bg-transparent hover:bg-slate-800/60 border border-slate-700/80 text-slate-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
              >
                <span>Ver Catálogo</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Key trust badges */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>90 Dias de Garantia</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Diagnóstico Rápido</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Peças Selecionadas</span>
              </div>
            </div>
          </div>

          {/* Right Card: Instant OS Tracking Form */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Acompanhamento Rápido de OS
                  </h3>
                  <p className="text-xs text-slate-400">
                    Consulte em tempo real o status do seu aparelho
                  </p>
                </div>
              </div>

              <form onSubmit={handleSearchOS} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Número da Ordem de Serviço
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ex: OS-1001 ou 1001"
                      value={searchOS}
                      onChange={(e) => {
                        setSearchOS(e.target.value);
                        setSearchError(false);
                      }}
                      className="w-full bg-slate-900 text-sm text-white placeholder-slate-500 rounded-xl pl-4 pr-10 py-3 border border-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors cursor-pointer"
                      title="Buscar OS"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {searchError && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Por favor, digite o número da sua OS.
                    </p>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                  <p className="font-semibold text-slate-300">Exemplos para testar no demo:</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setSearchOS('1001')}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[10px] transition-colors"
                    >
                      OS-1001 (Pronta)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchOS('1002')}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[10px] transition-colors"
                    >
                      OS-1002 (Manutenção)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchOS('1003')}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[10px] transition-colors"
                    >
                      OS-1003 (Aprovação)
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-consultar-os-hero"
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-900/40 cursor-pointer"
                >
                  Consultar OS
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="servicos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
            Especialidades
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Serviços Especializados de Alta Precisão
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Trabalhamos com equipamentos de ponta para diagnosticar e reparar com segurança os mais diversos dispositivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              id={srv.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  {srv.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 mt-6 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {srv.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={buildGeneralSupportUrl(empresa, `Orçamento para ${srv.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                >
                  <span>Orçar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION (5 STEPS) */}
      <section id="como-funciona" className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Fluxo Transparente
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Como funciona o nosso atendimento
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Processo simplificado e seguro para você acompanhar cada etapa do seu reparo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 relative flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold text-sm flex items-center justify-center mb-3">
                    {step.number}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (LOJA DE ACESSÓRIOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Loja Física & Acessórios
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Produtos em Destaque
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Acessórios e hardware com procedência e garantia. Retirada presencial na loja.
            </p>
          </div>

          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 px-4 py-2 rounded-xl transition-colors border border-cyan-200"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Store notice */}
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            {empresa.avisoLojaFisica} Clique em <strong>"Tenho interesse"</strong> para falar diretamente com nosso atendente no WhatsApp.
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => {
            const waUrl = buildProductInterestUrl(prod, empresa);
            return (
              <div
                key={prod.id}
                id={`product-card-${prod.id}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={prod.imagens[0]}
                      alt={prod.nome}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {prod.estoque <= prod.estoqueMinimo && (
                      <span className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        Últimas unidades
                      </span>
                    )}
                    <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {prod.marca}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <Link
                      to={`/produtos/${prod.id}`}
                      className="text-sm font-bold text-slate-900 hover:text-cyan-700 line-clamp-2 transition-colors leading-snug"
                    >
                      {prod.nome}
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {prod.descricao}
                    </p>
                  </div>
                </div>

                {/* Footer Price & WhatsApp CTA */}
                <div className="p-4 pt-0 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-slate-900">
                      {formatCurrency(prod.precoPromocional || prod.precoVenda)}
                    </span>
                    {prod.precoPromocional && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatCurrency(prod.precoVenda)}
                      </span>
                    )}
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-interesse-${prod.id}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Tenho interesse</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. LOCATION & CONTACT QUICK SUMMARY */}
      <section id="contato" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Visite Nossa Loja Física
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Prontos para atender você com excelência
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Traga seu equipamento para um diagnóstico rápido em bancada ou venha conhecer nosso showroom de acessórios e periféricos.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <strong>Endereço:</strong> {empresa.endereco.logradouro}, {empresa.endereco.numero} - {empresa.endereco.bairro}, {empresa.endereco.cidade} - {empresa.endereco.uf}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <strong>Horário:</strong> {empresa.horarioFuncionamento}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <a
              href={buildGeneralSupportUrl(empresa, 'Como Chegar / Horário')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chamar Atendente no WhatsApp</span>
            </a>
            <Link
              to="/acompanhar-os"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Consultar Minha OS</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
