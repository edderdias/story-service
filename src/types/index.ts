export type UserRole = 'ADMIN' | 'GERENTE' | 'TECNICO' | 'VENDEDOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export type StatusOS = 
  | 'ABERTA'
  | 'RECEBIDA'
  | 'DIAGNOSTICO'
  | 'ORCAMENTO'
  | 'AGUARDANDO_APROVACAO'
  | 'APROVADA'
  | 'EM_MANUTENCAO'
  | 'AGUARDANDO_PECA'
  | 'PRONTA'
  | 'ENTREGUE'
  | 'CANCELADA';

export interface HistoricoStatusOS {
  id: string;
  status: StatusOS;
  dataHora: string;
  usuarioNome: string;
  observacao?: string;
}

export interface ServicoOS {
  id: string;
  descricao: string;
  valor: number;
  tempoEstimadoMinutos?: number;
}

export interface PecaOS {
  id: string;
  produtoId?: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface ChecklistEquipamento {
  tela: boolean | 'AVARIADO' | 'OK' | 'NAO_TESTADO';
  carcaca: 'OK' | 'RISCADO' | 'AMASSADO' | 'QUEBRADO';
  camera: boolean;
  bateria: 'OK' | 'VICIADA' | 'ESTUFADA' | 'NAO_TESTADO';
  botoes: boolean;
  conectores: boolean;
  altoFalante: boolean;
  microfone: boolean;
  liga: boolean;
  observacoes?: string;
}

export interface Equipamento {
  id: string;
  clienteId: string;
  tipo: 'SMARTPHONE' | 'NOTEBOOK' | 'DESKTOP' | 'TABLET' | 'IMPRESSORA' | 'OUTRO';
  marca: string;
  modelo: string;
  numeroSerie?: string;
  imei?: string;
  cor?: string;
  estadoFisico?: string;
  acessoriosEntregues?: string[]; // Carregador, cabo, capa, fone
  fotos?: string[];
  checklist?: ChecklistEquipamento;
  observacoes?: string;
}

export interface Cliente {
  id: string;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  whatsapp: string;
  email: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  observacoes?: string;
  dataCadastro: string;
  totalGasto: number;
  totalOS: number;
}

export interface OrdemDeServico {
  id: string;
  numeroOS: string; // Ex: OS-2026-0010
  clienteId: string;
  clienteNome: string;
  clienteTelefone: string;
  clienteCpf: string;
  equipamento: Equipamento;
  dataEntrada: string;
  previsaoEntrega: string;
  dataEntrega?: string;
  problemaRelatado: string;
  diagnosticoTecnico?: string;
  solucaoRealizada?: string;
  tecnicoResponsavelId?: string;
  tecnicoResponsavelNome?: string;
  status: StatusOS;
  servicos: ServicoOS[];
  pecas: PecaOS[];
  valorTotalServicos: number;
  valorTotalPecas: number;
  valorDesconto: number;
  valorTotal: number;
  formaPagamento?: 'DINHEIRO' | 'PIX' | 'DEBITO' | 'CREDITO' | 'A_PRAZO';
  aprovadoPeloCliente: boolean;
  dataAprovacao?: string;
  historico: HistoricoStatusOS[];
  garantiaDias: number; // Ex: 90 dias
  observacoesInternas?: string;
}

export type CategoriaProduto = 
  | 'SMARTPHONES' 
  | 'NOTEBOOKS_PCS' 
  | 'ACESSORIOS_CELULAR' 
  | 'PERIFERICOS' 
  | 'CABOS_ADAPTADORES' 
  | 'ARMAZENAMENTO' 
  | 'REDES_WIFI' 
  | 'PECAS_REPOSICAO';

export interface Produto {
  id: string;
  nome: string;
  sku: string;
  codigoBarras?: string;
  categoria: CategoriaProduto;
  marca: string;
  modelo?: string;
  descricao: string;
  especificacoes?: { [key: string]: string };
  precoCusto: number;
  precoVenda: number;
  precoPromocional?: number;
  estoque: number;
  estoqueMinimo: number;
  imagens: string[];
  destaque: boolean;
  visivelCatalogo: boolean;
  ativo: boolean;
  garantiaMeses: number;
}

export interface MovimentacaoEstoque {
  id: string;
  produtoId: string;
  produtoNome: string;
  tipo: 'ENTRADA' | 'SAIDA_VENDA' | 'SAIDA_OS' | 'AJUSTE';
  quantidade: number;
  motivo: string;
  dataHora: string;
  usuarioNome: string;
  referenciaId?: string; // ID da venda ou da OS
}

export interface ItemVenda {
  produtoId: string;
  nome: string;
  sku: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface VendaPresencial {
  id: string;
  codigoVenda: string;
  clienteId?: string;
  clienteNome?: string;
  itens: ItemVenda[];
  valorSubtotal: number;
  valorDesconto: number;
  valorTotal: number;
  formaPagamento: 'DINHEIRO' | 'PIX' | 'DEBITO' | 'CREDITO';
  vendedorId: string;
  vendedorNome: string;
  dataHora: string;
  status: 'CONCLUIDA' | 'CANCELADA';
  observacoes?: string;
}

export interface Tecnico {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  especialidades: string[];
  status: 'DISPONIVEL' | 'EM_ATENDIMENTO' | 'FERIAS' | 'INATIVO';
  osConcluidas: number;
  osPendentes: number;
  avatar?: string;
}

export interface Fornecedor {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
  contato: string;
  produtosFornecidos: string[];
  observacoes?: string;
}

export interface RegistroFinanceiro {
  id: string;
  tipo: 'RECEITA' | 'DESPESA';
  descricao: string;
  categoria: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: 'PAGO' | 'PENDENTE' | 'ATRASADO';
  formaPagamento?: 'DINHEIRO' | 'PIX' | 'DEBITO' | 'CREDITO' | 'BOLETO';
  referenciaTipo?: 'OS' | 'VENDA' | 'FORNECEDOR' | 'FIXA';
  referenciaId?: string;
}

export interface EmpresaConfig {
  nome: string;
  slogan: string;
  cnpj: string;
  telefone: string;
  whatsapp: string;
  email: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  horarioFuncionamento: string;
  redesSociais: {
    instagram?: string;
    facebook?: string;
  };
  chavePix: string;
  numeroInicialOS: number;
  moeda: string;
  avisoLojaFisica: string;
}

export interface ToastMessage {
  id: string;
  tipo: 'success' | 'error' | 'info' | 'warning';
  titulo: string;
  mensagem: string;
  duracao?: number;
}
