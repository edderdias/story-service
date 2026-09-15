import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EmpresaConfig,
  Produto,
  OrdemDeServico,
  Cliente,
  Tecnico,
  User,
  RegistroFinanceiro,
  VendaPresencial,
  ToastMessage,
  StatusOS
} from '../types';
import { storageService } from '../services/storageService';

interface AppContextType {
  empresa: EmpresaConfig;
  setEmpresa: (config: EmpresaConfig) => void;
  produtos: Produto[];
  setProdutos: (produtos: Produto[]) => void;
  ordensServico: OrdemDeServico[];
  setOrdensServico: (osList: OrdemDeServico[]) => void;
  clientes: Cliente[];
  tecnicos: Tecnico[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  vendas: VendaPresencial[];
  financeiro: RegistroFinanceiro[];
  toasts: ToastMessage[];
  addToast: (tipo: 'success' | 'error' | 'info' | 'warning', titulo: string, mensagem: string) => void;
  removeToast: (id: string) => void;
  updateOSStatus: (osId: string, status: StatusOS, observacao?: string) => void;
  approveOSQuote: (osId: string) => void;
  findOS: (numeroOS: string, docOrPhone?: string) => OrdemDeServico | null;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [empresa, setEmpresaState] = useState<EmpresaConfig>(() => storageService.getConfig());
  const [produtos, setProdutosState] = useState<Produto[]>(() => storageService.getProdutos());
  const [ordensServico, setOrdensServicoState] = useState<OrdemDeServico[]>(() => storageService.getOrdensServico());
  const [clientes, setClientesState] = useState<Cliente[]>(() => storageService.getClientes());
  const [tecnicos, setTecnicosState] = useState<Tecnico[]>(() => storageService.getTecnicos());
  const [currentUser, setCurrentUserState] = useState<User | null>(() => storageService.getCurrentUser());
  const [vendas, setVendasState] = useState<VendaPresencial[]>(() => storageService.getVendas());
  const [financeiro, setFinanceiroState] = useState<RegistroFinanceiro[]>(() => storageService.getFinanceiro());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Keep storage in sync
  const setEmpresa = (cfg: EmpresaConfig) => {
    setEmpresaState(cfg);
    storageService.saveConfig(cfg);
  };

  const setProdutos = (prods: Produto[]) => {
    setProdutosState(prods);
    storageService.saveProdutos(prods);
  };

  const setOrdensServico = (list: OrdemDeServico[]) => {
    setOrdensServicoState(list);
    storageService.saveOrdensServico(list);
  };

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    storageService.setCurrentUser(user);
  };

  const addToast = (tipo: 'success' | 'error' | 'info' | 'warning', titulo: string, mensagem: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, tipo, titulo, mensagem, duracao: 4500 };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateOSStatus = (osId: string, status: StatusOS, observacao?: string) => {
    const userNome = currentUser ? currentUser.name : 'Sistema';
    const updated = storageService.updateOSStatus(osId, status, userNome, observacao);
    if (updated) {
      setOrdensServico(storageService.getOrdensServico());
      addToast('success', 'Status Atualizado', `A OS ${updated.numeroOS} foi alterada para ${status}.`);
    }
  };

  const approveOSQuote = (osId: string) => {
    const list = [...ordensServico];
    const idx = list.findIndex((o) => o.id === osId);
    if (idx !== -1) {
      const agora = new Date().toISOString().replace('T', ' ').substring(0, 16);
      list[idx].aprovadoPeloCliente = true;
      list[idx].dataAprovacao = agora;
      list[idx].status = 'APROVADA';
      list[idx].historico.push({
        id: `hist_${Date.now()}`,
        status: 'APROVADA',
        dataHora: agora,
        usuarioNome: 'Cliente (Portal)',
        observacao: 'Orçamento aprovado pelo cliente através do portal de acompanhamento.'
      });
      setOrdensServico(list);
      addToast('success', 'Orçamento Aprovado!', `O orçamento da OS ${list[idx].numeroOS} foi aprovado com sucesso.`);
    }
  };

  const findOS = (numeroOS: string, docOrPhone?: string): OrdemDeServico | null => {
    if (!numeroOS) return null;
    const cleanNum = numeroOS.trim().toUpperCase().replace(/\s+/g, '');
    const cleanNumDigits = numeroOS.replace(/\D/g, '');

    const found = ordensServico.find((os) => {
      const osClean = os.numeroOS.toUpperCase().replace(/\s+/g, '');
      const osDigits = os.numeroOS.replace(/\D/g, '');
      const matchesNum = osClean === cleanNum || (cleanNumDigits.length > 0 && osDigits === cleanNumDigits);
      
      if (!matchesNum) return false;

      // If document or phone was also provided, verify match
      if (docOrPhone && docOrPhone.trim().length > 0) {
        const searchDoc = docOrPhone.replace(/\D/g, '');
        const osCpf = os.clienteCpf.replace(/\D/g, '');
        const osPhone = os.clienteTelefone.replace(/\D/g, '');
        return osCpf.includes(searchDoc) || osPhone.includes(searchDoc) || searchDoc.length < 3;
      }
      return true;
    });

    return found || null;
  };

  const resetAllData = () => {
    storageService.resetToDefaults();
    setEmpresaState(storageService.getConfig());
    setProdutosState(storageService.getProdutos());
    setOrdensServicoState(storageService.getOrdensServico());
    setClientesState(storageService.getClientes());
    setTecnicosState(storageService.getTecnicos());
    setCurrentUserState(storageService.getCurrentUser());
    setVendasState(storageService.getVendas());
    setFinanceiroState(storageService.getFinanceiro());
    addToast('info', 'Dados Restaurados', 'Todos os dados de demonstração foram restaurados com sucesso.');
  };

  return (
    <AppContext.Provider
      value={{
        empresa,
        setEmpresa,
        produtos,
        setProdutos,
        ordensServico,
        setOrdensServico,
        clientes,
        tecnicos,
        currentUser,
        setCurrentUser,
        vendas,
        financeiro,
        toasts,
        addToast,
        removeToast,
        updateOSStatus,
        approveOSQuote,
        findOS,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
