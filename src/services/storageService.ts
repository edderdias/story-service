import {
  EmpresaConfig,
  Produto,
  OrdemDeServico,
  Cliente,
  Tecnico,
  User,
  RegistroFinanceiro,
  VendaPresencial,
  StatusOS
} from '../types';
import {
  INITIAL_EMPRESA_CONFIG,
  INITIAL_USERS,
  INITIAL_PRODUTOS,
  INITIAL_CLIENTES,
  INITIAL_TECNICOS,
  INITIAL_ORDENS_SERVICO,
  INITIAL_VENDAS,
  INITIAL_FINANCEIRO
} from './mockData';

const KEYS = {
  CONFIG: 'techfix_config_v1',
  USERS: 'techfix_users_v1',
  CURRENT_USER: 'techfix_current_user_v1',
  PRODUTOS: 'techfix_produtos_v1',
  CLIENTES: 'techfix_clientes_v1',
  TECNICOS: 'techfix_tecnicos_v1',
  OS: 'techfix_os_v1',
  VENDAS: 'techfix_vendas_v1',
  FINANCEIRO: 'techfix_financeiro_v1',
};

function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Storage get error for key: ${key}`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Storage save error for key: ${key}`, e);
  }
}

export const storageService = {
  getConfig(): EmpresaConfig {
    return getFromStorage<EmpresaConfig>(KEYS.CONFIG, INITIAL_EMPRESA_CONFIG);
  },
  saveConfig(config: EmpresaConfig): void {
    saveToStorage(KEYS.CONFIG, config);
  },

  getUsers(): User[] {
    return getFromStorage<User[]>(KEYS.USERS, INITIAL_USERS);
  },
  getCurrentUser(): User | null {
    return getFromStorage<User | null>(KEYS.CURRENT_USER, INITIAL_USERS[0]);
  },
  setCurrentUser(user: User | null): void {
    saveToStorage(KEYS.CURRENT_USER, user);
  },

  getProdutos(): Produto[] {
    return getFromStorage<Produto[]>(KEYS.PRODUTOS, INITIAL_PRODUTOS);
  },
  saveProdutos(produtos: Produto[]): void {
    saveToStorage(KEYS.PRODUTOS, produtos);
  },
  getProdutoById(id: string): Produto | undefined {
    const produtos = this.getProdutos();
    return produtos.find((p) => p.id === id);
  },

  getOrdensServico(): OrdemDeServico[] {
    return getFromStorage<OrdemDeServico[]>(KEYS.OS, INITIAL_ORDENS_SERVICO);
  },
  saveOrdensServico(osList: OrdemDeServico[]): void {
    saveToStorage(KEYS.OS, osList);
  },
  getOSByNumero(numero: string): OrdemDeServico | undefined {
    const list = this.getOrdensServico();
    const cleanSearch = numero.trim().toUpperCase().replace(/\s+/g, '');
    return list.find((item) => {
      const cleanOS = item.numeroOS.toUpperCase().replace(/\s+/g, '');
      const numberOnly = item.numeroOS.replace(/\D/g, '');
      const searchNumberOnly = cleanSearch.replace(/\D/g, '');
      return cleanOS === cleanSearch || (searchNumberOnly && numberOnly === searchNumberOnly);
    });
  },

  updateOSStatus(osId: string, novoStatus: StatusOS, usuarioNome: string, observacao?: string): OrdemDeServico | null {
    const list = this.getOrdensServico();
    const index = list.findIndex((os) => os.id === osId);
    if (index === -1) return null;

    const agora = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updated = { ...list[index] };
    updated.status = novoStatus;
    updated.historico = [
      ...updated.historico,
      {
        id: `hist_${Date.now()}`,
        status: novoStatus,
        dataHora: agora,
        usuarioNome,
        observacao: observacao || `Status alterado para ${novoStatus}`
      }
    ];

    list[index] = updated;
    this.saveOrdensServico(list);
    return updated;
  },

  getClientes(): Cliente[] {
    return getFromStorage<Cliente[]>(KEYS.CLIENTES, INITIAL_CLIENTES);
  },
  saveClientes(clientes: Cliente[]): void {
    saveToStorage(KEYS.CLIENTES, clientes);
  },

  getTecnicos(): Tecnico[] {
    return getFromStorage<Tecnico[]>(KEYS.TECNICOS, INITIAL_TECNICOS);
  },
  saveTecnicos(tecnicos: Tecnico[]): void {
    saveToStorage(KEYS.TECNICOS, tecnicos);
  },

  getVendas(): VendaPresencial[] {
    return getFromStorage<VendaPresencial[]>(KEYS.VENDAS, INITIAL_VENDAS);
  },
  saveVendas(vendas: VendaPresencial[]): void {
    saveToStorage(KEYS.VENDAS, vendas);
  },

  getFinanceiro(): RegistroFinanceiro[] {
    return getFromStorage<RegistroFinanceiro[]>(KEYS.FINANCEIRO, INITIAL_FINANCEIRO);
  },
  saveFinanceiro(registros: RegistroFinanceiro[]): void {
    saveToStorage(KEYS.FINANCEIRO, registros);
  },

  resetToDefaults(): void {
    saveToStorage(KEYS.CONFIG, INITIAL_EMPRESA_CONFIG);
    saveToStorage(KEYS.USERS, INITIAL_USERS);
    saveToStorage(KEYS.CURRENT_USER, INITIAL_USERS[0]);
    saveToStorage(KEYS.PRODUTOS, INITIAL_PRODUTOS);
    saveToStorage(KEYS.CLIENTES, INITIAL_CLIENTES);
    saveToStorage(KEYS.TECNICOS, INITIAL_TECNICOS);
    saveToStorage(KEYS.OS, INITIAL_ORDENS_SERVICO);
    saveToStorage(KEYS.VENDAS, INITIAL_VENDAS);
    saveToStorage(KEYS.FINANCEIRO, INITIAL_FINANCEIRO);
  }
};
