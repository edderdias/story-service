import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  LayoutDashboard, 
  FileText, 
  Kanban, 
  Users, 
  Laptop, 
  ShoppingBag, 
  Boxes, 
  DollarSign, 
  Wrench, 
  Truck, 
  BarChart3, 
  UserCog, 
  Settings, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Receipt
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { currentUser, setCurrentUser, ordensServico, produtos, addToast } = useApp();
  const navigate = useNavigate();

  const countPendingApproval = ordensServico.filter((os) => os.status === 'AGUARDANDO_APROVACAO').length;
  const countInMaintenance = ordensServico.filter((os) => os.status === 'EM_MANUTENCAO').length;
  const countLowStock = produtos.filter((p) => p.estoque <= p.estoqueMinimo).length;

  const navItems = [
    {
      label: 'Visão Geral',
      path: '/admin',
      icon: <LayoutDashboard className="w-4 h-4" />,
      end: true,
    },
    {
      label: 'Ordens de Serviço',
      path: '/admin/os',
      icon: <FileText className="w-4 h-4" />,
      badge: countInMaintenance > 0 ? `${countInMaintenance}` : undefined,
      badgeColor: 'bg-cyan-900 text-cyan-300 border border-cyan-700',
    },
    {
      label: 'Kanban de OS',
      path: '/admin/kanban',
      icon: <Kanban className="w-4 h-4" />,
      badge: countPendingApproval > 0 ? `${countPendingApproval} pend.` : undefined,
      badgeColor: 'bg-amber-900 text-amber-300 border border-amber-700',
    },
    {
      label: 'Clientes',
      path: '/admin/clientes',
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: 'Equipamentos',
      path: '/admin/equipamentos',
      icon: <Laptop className="w-4 h-4" />,
    },
    {
      label: 'Produtos',
      path: '/admin/produtos',
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      label: 'Estoque',
      path: '/admin/estoque',
      icon: <Boxes className="w-4 h-4" />,
      badge: countLowStock > 0 ? `! ${countLowStock}` : undefined,
      badgeColor: 'bg-rose-900 text-rose-300 border border-rose-700 animate-pulse',
    },
    {
      label: 'Vendas Presenciais (PDV)',
      path: '/admin/vendas',
      icon: <Receipt className="w-4 h-4" />,
    },
    {
      label: 'Financeiro',
      path: '/admin/financeiro',
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      label: 'Técnicos',
      path: '/admin/tecnicos',
      icon: <Wrench className="w-4 h-4" />,
    },
    {
      label: 'Fornecedores',
      path: '/admin/fornecedores',
      icon: <Truck className="w-4 h-4" />,
    },
    {
      label: 'Relatórios',
      path: '/admin/relatorios',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      label: 'Usuários & Permissões',
      path: '/admin/usuarios',
      icon: <UserCog className="w-4 h-4" />,
    },
    {
      label: 'Configurações',
      path: '/admin/configuracoes',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleLogout = () => {
    setCurrentUser(null);
    addToast('info', 'Sessão Encerrada', 'Você saiu do painel administrativo.');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        id="admin-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 border-r border-slate-800 text-white flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Top */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white font-mono">
                TECH<span className="text-cyan-400">FIX</span> PRO
              </span>
            </Link>

            <Link
              to="/"
              target="_blank"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Abrir site público em nova aba"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Navigation Items List */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Menu Administrativo
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-600 text-white font-bold shadow-sm shadow-cyan-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User bottom profile & logout */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950">
          <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-cyan-900/60 border border-cyan-700 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0">
                {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-white truncate">
                  {currentUser?.name || 'Administrador'}
                </h5>
                <span className="text-[10px] text-cyan-400 font-semibold block uppercase">
                  {currentUser?.role || 'ADMIN'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Sair do sistema"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
