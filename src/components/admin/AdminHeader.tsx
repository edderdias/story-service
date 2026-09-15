import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { UserRole } from '../../types';
import { INITIAL_USERS } from '../../services/mockData';
import { 
  Menu, 
  Search, 
  Plus, 
  ExternalLink, 
  Bell, 
  UserCheck, 
  RotateCcw,
  Receipt,
  FileText,
  UserPlus
} from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onOpenQuickOSModal?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar, onOpenQuickOSModal }) => {
  const { currentUser, setCurrentUser, resetAllData, addToast, findOS } = useApp();
  const navigate = useNavigate();
  const [globalSearch, setGlobalSearch] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalSearch.trim()) return;
    const osMatch = findOS(globalSearch);
    if (osMatch) {
      navigate(`/acompanhar-os?os=${encodeURIComponent(osMatch.numeroOS)}`);
      setGlobalSearch('');
    } else {
      navigate(`/produtos?q=${encodeURIComponent(globalSearch.trim())}`);
      setGlobalSearch('');
    }
  };

  const handleSwitchRole = (role: UserRole) => {
    const user = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(user);
    setShowRoleMenu(false);
    addToast('info', 'Perfil Alterado', `Você agora está operando como ${user.name} (${user.role}).`);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-lg">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleGlobalSearch} className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por OS, cliente, produto..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all"
          />
        </form>
      </div>

      {/* Right: Quick Actions & Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset Demo Data Button */}
        <button
          onClick={resetAllData}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors cursor-pointer"
          title="Restaurar dados iniciais de demonstração"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Resetar Demo</span>
        </button>

        {/* Public site link */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-xl font-semibold border border-cyan-200 transition-colors"
          title="Ver loja e site público"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Ver Loja Pública</span>
        </Link>

        {/* Quick Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Perfil:</span>
            <span className="text-cyan-400">{currentUser?.role || 'ADMIN'}</span>
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Alternar Perfil Demo
              </div>
              {INITIAL_USERS.map((usr) => (
                <button
                  key={usr.role}
                  onClick={() => handleSwitchRole(usr.role)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    currentUser?.role === usr.role
                      ? 'bg-cyan-50 text-cyan-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <p className="font-semibold leading-tight">{usr.role}</p>
                    <p className="text-[10px] text-slate-500">{usr.name}</p>
                  </div>
                  {currentUser?.role === usr.role && (
                    <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
