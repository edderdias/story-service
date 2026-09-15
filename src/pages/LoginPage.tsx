import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { UserRole } from '../types';
import { INITIAL_USERS } from '../services/mockData';
import { 
  Wrench, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Users,
  HardHat,
  ShoppingBag
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setCurrentUser, currentUser, addToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@techfixpro.com.br');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');

  const rolePresets = [
    {
      role: 'ADMIN' as UserRole,
      title: 'Administrador',
      desc: 'Acesso total a relatórios, configurações e gestão geral',
      user: INITIAL_USERS.find((u) => u.role === 'ADMIN')!,
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
    },
    {
      role: 'GERENTE' as UserRole,
      title: 'Gerente Operacional',
      desc: 'Gestão de ordens de serviço, finanças e clientes',
      user: INITIAL_USERS.find((u) => u.role === 'GERENTE')!,
      icon: <Briefcase className="w-4 h-4 text-emerald-400" />,
    },
    {
      role: 'TECNICO' as UserRole,
      title: 'Técnico de Bancada',
      desc: 'Diagnóstico, execução de reparos e laudos',
      user: INITIAL_USERS.find((u) => u.role === 'TECNICO')!,
      icon: <HardHat className="w-4 h-4 text-amber-400" />,
    },
    {
      role: 'VENDEDOR' as UserRole,
      title: 'Vendedor / Balcão',
      desc: 'Vendas presenciais, estoque e recepção de clientes',
      user: INITIAL_USERS.find((u) => u.role === 'VENDEDOR')!,
      icon: <ShoppingBag className="w-4 h-4 text-indigo-400" />,
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userToLogin = INITIAL_USERS.find((u) => u.role === selectedRole) || INITIAL_USERS[0];
    setCurrentUser(userToLogin);
    addToast('success', 'Bem-vindo(a)!', `Sessão iniciada como ${userToLogin.name} (${userToLogin.role}).`);
    navigate('/admin');
  };

  const handleSelectPreset = (presetRole: UserRole) => {
    setSelectedRole(presetRole);
    const user = INITIAL_USERS.find((u) => u.role === presetRole);
    if (user) {
      setEmail(user.email);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-2xl tracking-tight text-white font-mono">
                TECH<span className="text-cyan-400">FIX</span> PRO
              </span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Painel Administrativo
              </p>
            </div>
          </Link>
          <h2 className="text-xl font-bold text-slate-100 pt-2">
            Acesso Restrito da Empresa
          </h2>
          <p className="text-xs text-slate-400">
            Selecione um perfil de acesso ou digite suas credenciais
          </p>
        </div>

        {/* Quick Role Selection Cards for Demo */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Escolha o perfil para testar o sistema:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {rolePresets.map((preset) => {
              const isSelected = selectedRole === preset.role;
              return (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleSelectPreset(preset.role)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-500 ring-2 ring-cyan-500/20 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="p-1 rounded-lg bg-slate-900 border border-slate-800">
                      {preset.icon}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{preset.title}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{preset.user.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-6 rounded-3xl shadow-xl space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail Corporativo
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 text-sm text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-700 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Senha de Acesso
                </label>
                <span className="text-[11px] text-cyan-400">Qualquer senha no modo demo</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 text-sm text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-700 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              id="btn-submit-login"
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-900/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Entrar no Painel ({selectedRole})</span>
            </button>
          </form>
        </div>

        {/* Public area back link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; Voltar para a página pública</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
