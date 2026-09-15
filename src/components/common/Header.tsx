import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  Wrench, 
  Search, 
  ShoppingBag, 
  FileSearch, 
  Menu, 
  X, 
  MessageSquare, 
  ShieldCheck, 
  UserCheck,
  Smartphone,
  Laptop
} from 'lucide-react';
import { buildGeneralSupportUrl } from '../../services/whatsappService';

export const Header: React.FC = () => {
  const { empresa, currentUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickOSQuery, setQuickOSQuery] = useState('');

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleQuickSearchOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickOSQuery.trim()) {
      navigate(`/acompanhar-os?os=${encodeURIComponent(quickOSQuery.trim())}`);
      setQuickOSQuery('');
      setMobileMenuOpen(false);
    }
  };

  const whatsappUrl = buildGeneralSupportUrl(empresa, 'Atendimento Geral / Dúvidas');

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-sm">
      {/* Top micro banner with hours & phone */}
      <div className="hidden md:flex justify-between items-center px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-slate-400 bg-slate-950/80 border-b border-slate-800/80">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Loja Aberta: {empresa.horarioFuncionamento.split('|')[0]}
          </span>
          <span className="text-slate-600">•</span>
          <span>{empresa.endereco.cidade} - {empresa.endereco.uf}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Telefone: {empresa.telefone}</span>
          <span className="text-slate-600">•</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            WhatsApp: {empresa.telefone}
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link 
            to="/" 
            id="brand-logo-link"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                  TECH<span className="text-cyan-400">FIX</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800/50 px-1.5 py-0.5 rounded">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none tracking-tight">
                Assistência & Loja
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              id="nav-home"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-cyan-400 bg-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Início
            </Link>
            <Link
              to="/produtos"
              id="nav-produtos"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/produtos')
                  ? 'text-cyan-400 bg-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Catálogo de Produtos
            </Link>
            <Link
              to="/acompanhar-os"
              id="nav-acompanhar-os"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/acompanhar-os')
                  ? 'text-cyan-400 bg-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileSearch className="w-4 h-4 text-amber-400" />
              Consultar OS
            </Link>
          </nav>

          {/* Quick OS input on desktop */}
          <form
            onSubmit={handleQuickSearchOS}
            className="hidden md:flex items-center relative max-w-xs w-full"
            id="quick-os-form"
          >
            <input
              type="text"
              placeholder="Digite o nº da OS (ex: 1001)..."
              value={quickOSQuery}
              onChange={(e) => setQuickOSQuery(e.target.value)}
              className="w-full bg-slate-800/90 text-xs text-white placeholder-slate-400 rounded-lg pl-3 pr-8 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <button
              type="submit"
              id="btn-quick-search-os"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Buscar Ordem de Serviço"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-cta"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {currentUser ? (
              <Link
                to="/admin"
                id="header-admin-user-btn"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <span>Painel Admin</span>
              </Link>
            ) : (
              <Link
                to="/login"
                id="header-login-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium border border-slate-700/60 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Área Restrita</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/acompanhar-os"
              className="p-2 text-slate-300 hover:text-cyan-400 bg-slate-800 rounded-lg"
              title="Consultar OS"
            >
              <FileSearch className="w-5 h-5" />
            </Link>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="sm:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-6 space-y-3"
        >
          <form onSubmit={handleQuickSearchOS} className="relative">
            <input
              type="text"
              placeholder="Consultar Ordem de Serviço (nº)..."
              value={quickOSQuery}
              onChange={(e) => setQuickOSQuery(e.target.value)}
              className="w-full bg-slate-800 text-sm text-white placeholder-slate-400 rounded-lg pl-3 pr-10 py-2.5 border border-slate-700 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-cyan-400"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col gap-1 pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                location.pathname === '/' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Início
            </Link>
            <Link
              to="/produtos"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                location.pathname.startsWith('/produtos') ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Catálogo de Produtos
              </span>
              <span className="text-xs bg-slate-800 text-cyan-400 px-2 py-0.5 rounded-full">Loja Física</span>
            </Link>
            <Link
              to="/acompanhar-os"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                location.pathname === '/acompanhar-os' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <FileSearch className="w-4 h-4 text-amber-400" />
              Acompanhar Ordem de Serviço
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              Chamar no WhatsApp
            </a>

            {currentUser ? (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700 text-sm font-semibold"
              >
                <ShieldCheck className="w-4 h-4" />
                Acessar Painel Administrativo ({currentUser.role})
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-sm font-semibold"
              >
                <UserCheck className="w-4 h-4" />
                Login de Funcionários
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
