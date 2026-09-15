import { 
  EmpresaConfig, 
  Produto, 
  OrdemDeServico, 
  Cliente, 
  Tecnico, 
  User, 
  RegistroFinanceiro, 
  VendaPresencial 
} from '../types';

export const INITIAL_EMPRESA_CONFIG: EmpresaConfig = {
  nome: 'TechFix Pro',
  slogan: 'Assistência Técnica Especializada em Informática e Celulares',
  cnpj: '45.892.311/0001-90',
  telefone: '(11) 3456-7890',
  whatsapp: '5511987654321', // Formato internacional para link wa.me
  email: 'contato@techfixpro.com.br',
  endereco: {
    logradouro: 'Av. Paulista',
    numero: '1500',
    complemento: 'Loja 12 - Térreo',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01310-100',
  },
  horarioFuncionamento: 'Segunda a Sexta: 08:30 às 18:30 | Sábado: 09:00 às 14:00',
  redesSociais: {
    instagram: 'techfixpro_oficial',
    facebook: 'techfixprobr',
  },
  chavePix: '45.892.311/0001-90',
  numeroInicialOS: 1001,
  moeda: 'BRL',
  avisoLojaFisica: 'Os produtos são vendidos presencialmente em nossa loja. Consulte a disponibilidade antes de se deslocar.',
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_admin',
    name: 'Carlos Mendes',
    email: 'admin@techfixpro.com.br',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '(11) 98765-4321'
  },
  {
    id: 'usr_gerente',
    name: 'Mariana Souza',
    email: 'gerente@techfixpro.com.br',
    role: 'GERENTE',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    phone: '(11) 97654-3210'
  },
  {
    id: 'usr_tecnico',
    name: 'Lucas Ferreira',
    email: 'lucas.tech@techfixpro.com.br',
    role: 'TECNICO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '(11) 99887-6655'
  },
  {
    id: 'usr_vendedor',
    name: 'Beatriz Lima',
    email: 'vendas@techfixpro.com.br',
    role: 'VENDEDOR',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '(11) 91234-5678'
  }
];

export const INITIAL_PRODUTOS: Produto[] = [
  {
    id: 'prod_1',
    nome: 'Carregador Turbo 65W GaN USB-C Fast Charge',
    sku: 'CAR-GAN-65W',
    codigoBarras: '7898561230012',
    categoria: 'ACESSORIOS_CELULAR',
    marca: 'Baseus',
    modelo: 'GaN5 Pro 65W 3 Portas (2x USB-C + 1x USB-A)',
    descricao: 'Carregador ultracompacto com tecnologia GaN de alta eficiência térmica. Carrega notebooks, MacBooks, iPhones e celulares Android em velocidade máxima.',
    especificacoes: {
      'Potência Máxima': '65W',
      'Portas': '2x USB-C PD 3.0, 1x USB-A QC 4.0',
      'Tecnologia': 'GaN (Nitreto de Gálio)',
      'Compatibilidade': 'Universal (Notebooks, Celulares, Tablets)',
      'Proteções': 'Sobretensão, sobrecorrente e controle de temperatura'
    },
    precoCusto: 85.00,
    precoVenda: 169.90,
    precoPromocional: 149.90,
    estoque: 14,
    estoqueMinimo: 5,
    imagens: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&q=80&w=800'
    ],
    destaque: true,
    visivelCatalogo: true,
    ativo: true,
    garantiaMeses: 12
  },
  {
    id: 'prod_2',
    nome: 'SSD Kingston NV2 1TB NVMe M.2 2280 PCIe 4.0',
    sku: 'SSD-KNG-1TB',
    codigoBarras: '740617329858',
    categoria: 'ARMAZENAMENTO',
    marca: 'Kingston',
    modelo: 'SNV2S/1000G',
    descricao: 'SSD de alta velocidade ideal para upgrades de notebooks e desktops modernos, garantindo inicialização do sistema em segundos e carregamento instantâneo de programas pesados.',
    especificacoes: {
      'Capacidade': '1TB (1000GB)',
      'Interface': 'PCIe 4.0 x4 NVMe',
      'Leitura Sequencial': 'Até 3500 MB/s',
      'Gravação Sequencial': 'Até 2100 MB/s',
      'Fator de Forma': 'M.2 2280'
    },
    precoCusto: 240.00,
    precoVenda: 419.00,
    precoPromocional: 389.00,
    estoque: 8,
    estoqueMinimo: 3,
    imagens: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800'
    ],
    destaque: true,
    visivelCatalogo: true,
    ativo: true,
    garantiaMeses: 36
  },
  {
    id: 'prod_3',
    nome: 'Fone de Ouvido Bluetooth TWS com Cancelamento Ativo de Ruído (ANC)',
    sku: 'AUD-TWS-ANC',
    codigoBarras: '7891234567890',
    categoria: 'ACESSORIOS_CELULAR',
    marca: 'QCY',
    modelo: 'T13 ANC Dual Mic',
    descricao: 'Fones sem fio com cancelamento ativo de ruído de até 28dB, modo transparência, drivers de 10mm para graves profundos e bateria que dura até 30 horas com o estojo.',
    especificacoes: {
      'Conectividade': 'Bluetooth 5.3',
      'Autonomia': '7h contínuas + 23h estojo de recarga',
      'Microfones': '4 microfones com redução de ruído para chamadas',
      'Resistência': 'IPX5 (resistente a suor e respingos)'
    },
    precoCusto: 70.00,
    precoVenda: 159.00,
    estoque: 18,
    estoqueMinimo: 6,
    imagens: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800'
    ],
    destaque: true,
    visivelCatalogo: true,
    ativo: true,
    garantiaMeses: 6
  },
  {
    id: 'prod_4',
    nome: 'Hub USB-C 7 em 1 HDMI 4K + RJ45 Gigabit + SD/TF + USB 3.0',
    sku: 'HUB-7IN1-ALU',
    codigoBarras: '7894561230456',
    categoria: 'CABOS_ADAPTADORES',
    marca: 'Ugreen',
    modelo: 'CM512 Premium Aluminum',
    descricao: 'Adaptador multifuncional em alumínio espacial. Expande portas para notebooks modernos (MacBook, Dell XPS, Lenovo) com saída de vídeo 4K 60Hz, rede cabeada estável e leitor de cartões.',
    especificacoes: {
      'Portas': '1x HDMI 4K@60Hz, 1x RJ45 1000Mbps, 2x USB 3.0, 1x USB-C PD 100W, SD/MicroSD',
      'Material': 'Liga de Alumínio anodizado cinza espacial',
      'Compatibilidade': 'Windows, MacOS, iPadOS, Linux, Android'
    },
    precoCusto: 110.00,
    precoVenda: 229.00,
    estoque: 11,
    estoqueMinimo: 4,
    imagens: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=800'
    ],
    destaque: false,
    visivelCatalogo: true,
    ativo: true,
    garantiaMeses: 12
  },
  {
    id: 'prod_5',
    nome: 'Memória RAM Desktop Kingston Fury Beast 16GB DDR4 3200MHz',
    sku: 'MEM-RAM-16G32',
    codigoBarras: '740617319989',
    categoria: 'PECAS_REPOSICAO',
    marca: 'Kingston',
    modelo: 'KF432C16BB1/16',
    descricao: 'Módulo de memória de alta velocidade com dissipador de calor de perfil baixo. Upgrade perfeito para edição de vídeo, render e jogos fluidos.',
    especificacoes: {
      'Capacidade': '16GB (1x 16GB)',
      'Velocidade': '3200MHz DDR4',
      'Latência': 'CL16',
      'Tensão': '1.35V Intel XMP / AMD Ryzen Ready'
    },
    precoCusto: 160.00,
    precoVenda: 279.00,
    estoque: 6,
    estoqueMinimo: 3,
    imagens: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=800'
    ],
    destaque: true,
    visivelCatalogo: true,
    ativo: true,
    garantiaMeses: 36
  },
  {
    id: 'prod_6',
    nome: 'Roteador Wi-Fi 6 Gigabit Dual Band AX3000 com 4 Antenas',
    sku: 'ROT-AX3000-W6',
    codigoBarras: '6935364089912',
    categoria: 'REDES_WIFI',
    marca: 'TP-Link',
    modelo: 'Archer AX53',
    descricao: 'Conexão ultraveloz para casas e escritórios com dezenas de dispositivos conectados simultaneamente. Suporte a tecnologia OFDMA, MU-MIMO e segurança WPA3.',
    especificacoes: {
      'Velocidade Total': 'Até 3000 Mbps (2402 Mbps em 5GHz + 574 Mbps em 2.4GHz)',
      'Portas': '1x WAN Gigabit + 4x LAN Gigabit',
      'Recursos': 'EasyMesh, Controle dos Pais, VPN Server'
    },
    precoCusto: 210.00,
    precoVenda: 379.00,
    estoque: 5,
    estoqueMinimo: 2,
    imagens: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
    ],
    destaque: false,
    visivelCatalogo: true,
    ativo: true,
    garantiaMeses: 24
  },
  {
    id: 'prod_7',
    nome: 'Cabo Reforçado em Nylon Trançado USB-C para Lightning 1.8m',
    sku: 'CAB-NYL-USBC-LTG',
    codigoBarras: '7891112223334',
    categoria: 'CABOS_ADAPTADORES',
    marca: 'Anker',
    modelo: 'PowerLine+ III MFi Certified',
    descricao: 'Cabo com certificação oficial Apple MFi. Estrutura reforçada capaz de suportar mais de 35.000 dobras sem quebrar ou apresentar mau contato.',
    especificacoes: {
      'Comprimento': '1.8 Metros',
      'Certificação': 'Apple MFi Oficial',
      'Potência suportada': 'Até 30W Power Delivery',
      'Revestimento': 'Nylon balístico duplo trançado'
    },
    precoCusto: 35.00,
    precoVenda: 89.90,
    estoque: 2, // Estoque baixo para testar alerta!
    estoqueMinimo: 5,
    imagens: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
    ],
    destaque: false,
    visivelCatalogo: true,
    ativo: true,
    garantiaMeses: 18
  },
  {
    id: 'prod_8',
    nome: 'Suporte Articulado Ergonômico de Alumínio para Notebook',
    sku: 'SUP-ALU-ERG',
    codigoBarras: '7899988776655',
    categoria: 'PERIFERICOS',
    marca: 'TechStand',
    modelo: 'ErgoPro 360 Heavy Duty',
    descricao: 'Melhora a postura durante o trabalho e ajuda na refrigeração passiva do seu notebook. Estrutura robusta com borrachas antiderrapantes e ajuste milimétrico de altura.',
    especificacoes: {
      'Compatibilidade': 'Notebooks de 11 a 17.3 polegadas',
      'Capacidade de Carga': 'Até 8 kg',
      'Material': 'Alumínio usinado em CNC'
    },
    precoCusto: 65.00,
    precoVenda: 139.90,
    estoque: 1, // Estoque baixo!
    estoqueMinimo: 4,
    imagens: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800'
    ],
    destaque: true,
    visivelCatalogo: true,
    ativo: true,
    garantiaMeses: 12
  }
];

export const INITIAL_CLIENTES: Cliente[] = [
  {
    id: 'cli_1',
    nome: 'Roberto Albuquerque',
    cpfCnpj: '123.456.789-00',
    telefone: '(11) 98111-2233',
    whatsapp: '5511981112233',
    email: 'roberto.albuquerque@email.com',
    endereco: {
      rua: 'Rua Augusta',
      numero: '1250',
      bairro: 'Consolação',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01304-001'
    },
    observacoes: 'Cliente corporativo frequente. Sempre solicita nota fiscal com CNPJ.',
    dataCadastro: '2025-10-15',
    totalGasto: 1850.00,
    totalOS: 3
  },
  {
    id: 'cli_2',
    nome: 'Camila Fernandes',
    cpfCnpj: '987.654.321-11',
    telefone: '(11) 97222-3344',
    whatsapp: '5511972223344',
    email: 'camila.fernandes@designstudio.com',
    endereco: {
      rua: 'Alameda Santos',
      numero: '450',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01418-000'
    },
    observacoes: 'Designer gráfica, trabalha com MacBook Pro e iPad Pro.',
    dataCadastro: '2026-01-20',
    totalGasto: 890.00,
    totalOS: 2
  },
  {
    id: 'cli_3',
    nome: 'Empresa Nexus Contabilidade LTDA',
    cpfCnpj: '33.444.555/0001-99',
    telefone: '(11) 3211-9988',
    whatsapp: '5511993334455',
    email: 'ti@nexuscontabil.com.br',
    endereco: {
      rua: 'Rua Vergueiro',
      numero: '2080',
      bairro: 'Vila Mariana',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '04102-000'
    },
    observacoes: 'Contrato de manutenção para 12 computadores e 2 impressoras de rede.',
    dataCadastro: '2025-06-10',
    totalGasto: 4620.00,
    totalOS: 8
  }
];

export const INITIAL_TECNICOS: Tecnico[] = [
  {
    id: 'tec_1',
    nome: 'Lucas Ferreira',
    telefone: '(11) 99887-6655',
    email: 'lucas.tech@techfixpro.com.br',
    especialidades: ['Microeletrônica', 'Placas de Celular', 'Telas OLED', 'Solda BGA'],
    status: 'DISPONIVEL',
    osConcluidas: 142,
    osPendentes: 3,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'tec_2',
    nome: 'Gabriel Santos',
    telefone: '(11) 98777-1122',
    email: 'gabriel.hardware@techfixpro.com.br',
    especialidades: ['Notebooks', 'MacBooks', 'Recuperação de Dados', 'Upgrades PC Gamer'],
    status: 'EM_ATENDIMENTO',
    osConcluidas: 198,
    osPendentes: 4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'tec_3',
    nome: 'Renan Oliveira',
    telefone: '(11) 97444-5566',
    email: 'renan.redes@techfixpro.com.br',
    especialidades: ['Impressoras Térmicas/Tanque', 'Redes Estruturadas', 'Servidores'],
    status: 'DISPONIVEL',
    osConcluidas: 89,
    osPendentes: 1,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250'
  }
];

export const INITIAL_ORDENS_SERVICO: OrdemDeServico[] = [
  {
    id: 'os_1001',
    numeroOS: 'OS-1001',
    clienteId: 'cli_1',
    clienteNome: 'Roberto Albuquerque',
    clienteTelefone: '(11) 98111-2233',
    clienteCpf: '123.456.789-00',
    equipamento: {
      id: 'eq_1',
      clienteId: 'cli_1',
      tipo: 'SMARTPHONE',
      marca: 'Apple',
      modelo: 'iPhone 13 Pro Max 256GB Grafite',
      numeroSerie: 'DNPG3920LK89',
      imei: '358920112839485',
      cor: 'Grafite',
      estadoFisico: 'Vidro frontal trincado no canto superior esquerdo. Carcaça com marcas leves.',
      acessoriosEntregues: ['Capa de proteção'],
      fotos: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=600'
      ],
      checklist: {
        tela: 'AVARIADO',
        carcaca: 'RISCADO',
        camera: true,
        bateria: 'OK',
        botoes: true,
        conectores: true,
        altoFalante: true,
        microfone: true,
        liga: true,
        observacoes: 'Touch responde em toda a área, apenas o vidro externo e display sofreram impacto.'
      }
    },
    dataEntrada: '2026-08-28 10:30',
    previsaoEntrega: '2026-08-31 17:00',
    problemaRelatado: 'Queda acidental danificou display frontal. Aparelho liga, toca som mas exibe linhas verdes.',
    diagnosticoTecnico: 'Display OLED original com vazamento de cristais e vidro trincado. Necessária substituição completa do módulo frontal original com calibração TrueTone e vedação IP68.',
    solucaoRealizada: 'Troca de frontal OLED Premium com regravação de chip EEPROM TrueTone + vedação adesiva pressurizada.',
    tecnicoResponsavelId: 'tec_1',
    tecnicoResponsavelNome: 'Lucas Ferreira',
    status: 'PRONTA',
    servicos: [
      { id: 'srv_1', descricao: 'Mão de obra especializada em desmontagem e calibração True Tone', valor: 150.00 }
    ],
    pecas: [
      { id: 'pec_1', nome: 'Módulo Frontal OLED iPhone 13 Pro Max Original', quantidade: 1, valorUnitario: 890.00, valorTotal: 890.00 },
      { id: 'pec_2', nome: 'Fita de Vedação Impermeabilizante Original', quantidade: 1, valorUnitario: 40.00, valorTotal: 40.00 }
    ],
    valorTotalServicos: 150.00,
    valorTotalPecas: 930.00,
    valorDesconto: 30.00,
    valorTotal: 1050.00,
    formaPagamento: 'PIX',
    aprovadoPeloCliente: true,
    dataAprovacao: '2026-08-28 14:15',
    garantiaDias: 90,
    historico: [
      { id: 'hist_1', status: 'RECEBIDA', dataHora: '2026-08-28 10:30', usuarioNome: 'Beatriz Lima', observacao: 'Equipamento recebido na recepção com checklist preenchido.' },
      { id: 'hist_2', status: 'DIAGNOSTICO', dataHora: '2026-08-28 11:45', usuarioNome: 'Lucas Ferreira', observacao: 'Bancada de testes confirmou integridade da placa lógica e Face ID.' },
      { id: 'hist_3', status: 'ORCAMENTO', dataHora: '2026-08-28 13:00', usuarioNome: 'Mariana Souza', observacao: 'Orçamento enviado via WhatsApp para o cliente.' },
      { id: 'hist_4', status: 'APROVADA', dataHora: '2026-08-28 14:15', usuarioNome: 'Beatriz Lima', observacao: 'Cliente aprovou via WhatsApp com pagamento via Pix 50% adiantado.' },
      { id: 'hist_5', status: 'EM_MANUTENCAO', dataHora: '2026-08-29 09:00', usuarioNome: 'Lucas Ferreira', observacao: 'Iniciada montagem da tela e testes de calibração.' },
      { id: 'hist_6', status: 'PRONTA', dataHora: '2026-08-30 16:20', usuarioNome: 'Lucas Ferreira', observacao: 'Testes de bateria, câmera, touch e áudio 100% aprovados. Aguardando retirada.' }
    ]
  },
  {
    id: 'os_1002',
    numeroOS: 'OS-1002',
    clienteId: 'cli_2',
    clienteNome: 'Camila Fernandes',
    clienteTelefone: '(11) 97222-3344',
    clienteCpf: '987.654.321-11',
    equipamento: {
      id: 'eq_2',
      clienteId: 'cli_2',
      tipo: 'NOTEBOOK',
      marca: 'Dell',
      modelo: 'Inspiron 15 5000 Intel Core i7 8GB',
      numeroSerie: 'HJG89211',
      cor: 'Prata',
      estadoFisico: 'Bom estado, marcas normais de uso na base.',
      acessoriosEntregues: ['Fonte carregador original 65W'],
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
        observacoes: 'Cooler fazendo ruído alto sob carga.'
      }
    },
    dataEntrada: '2026-08-29 14:00',
    previsaoEntrega: '2026-09-01 12:00',
    problemaRelatado: 'Notebook demora mais de 5 minutos para ligar e trava frequentemente ao abrir o Adobe Photoshop e Illustrator.',
    diagnosticoTecnico: 'HD Mecânico antigo de 1TB com setores defeituosos (bad blocks) e pasta térmica ressecada com estrangulamento térmico (thermal throttling a 95°C).',
    solucaoRealizada: 'Upgrade para SSD Kingston NVMe 1TB + Adição de pente de 16GB RAM + Limpeza completa do dissipador e aplicação de Pasta Térmica Arctic MX-4 + Instalação limpa do Windows 11 Pro e backup dos arquivos.',
    tecnicoResponsavelId: 'tec_2',
    tecnicoResponsavelNome: 'Gabriel Santos',
    status: 'EM_MANUTENCAO',
    servicos: [
      { id: 'srv_201', descricao: 'Limpeza química interna preventiva + Troca de pasta térmica de prata', valor: 140.00 },
      { id: 'srv_202', descricao: 'Instalação do Windows 11 Pro + Drivers oficiais + Migração e Backup de dados', valor: 120.00 }
    ],
    pecas: [
      { id: 'pec_201', produtoId: 'prod_2', nome: 'SSD Kingston NV2 1TB NVMe M.2 2280', quantidade: 1, valorUnitario: 389.00, valorTotal: 389.00 },
      { id: 'pec_202', produtoId: 'prod_5', nome: 'Memória RAM Kingston Fury 16GB DDR4', quantidade: 1, valorUnitario: 279.00, valorTotal: 279.00 }
    ],
    valorTotalServicos: 260.00,
    valorTotalPecas: 668.00,
    valorDesconto: 48.00,
    valorTotal: 880.00,
    formaPagamento: 'CREDITO',
    aprovadoPeloCliente: true,
    dataAprovacao: '2026-08-29 16:30',
    garantiaDias: 180,
    historico: [
      { id: 'hist_21', status: 'RECEBIDA', dataHora: '2026-08-29 14:00', usuarioNome: 'Beatriz Lima' },
      { id: 'hist_22', status: 'DIAGNOSTICO', dataHora: '2026-08-29 15:30', usuarioNome: 'Gabriel Santos' },
      { id: 'hist_23', status: 'ORCAMENTO', dataHora: '2026-08-29 16:00', usuarioNome: 'Gabriel Santos' },
      { id: 'hist_24', status: 'APROVADA', dataHora: '2026-08-29 16:30', usuarioNome: 'Beatriz Lima' },
      { id: 'hist_25', status: 'EM_MANUTENCAO', dataHora: '2026-08-30 10:00', usuarioNome: 'Gabriel Santos', observacao: 'Clonagem de partição e limpeza interna em andamento.' }
    ]
  },
  {
    id: 'os_1003',
    numeroOS: 'OS-1003',
    clienteId: 'cli_3',
    clienteNome: 'Empresa Nexus Contabilidade LTDA',
    clienteTelefone: '(11) 3211-9988',
    clienteCpf: '33.444.555/0001-99',
    equipamento: {
      id: 'eq_3',
      clienteId: 'cli_3',
      tipo: 'IMPRESSORA',
      marca: 'Epson',
      modelo: 'EcoTank L3250 Tanque de Tinta Wi-Fi',
      numeroSerie: 'X89K992018',
      cor: 'Preta',
      estadoFisico: 'Mecanismo externo ok, reservatório com tinta.',
      acessoriosEntregues: ['Cabo de força original'],
      checklist: {
        tela: 'OK',
        carcaca: 'OK',
        camera: false,
        bateria: 'OK',
        botoes: true,
        conectores: true,
        altoFalante: false,
        microfone: false,
        liga: true,
        observacoes: 'Luzes de tinta e papel piscando alternadamente.'
      }
    },
    dataEntrada: '2026-08-30 11:20',
    previsaoEntrega: '2026-09-02 18:00',
    problemaRelatado: 'Impressões saindo com falhas graves em preto e cabeçote bloqueado com mensagem de almofadas cheias.',
    diagnosticoTecnico: 'Almofadas absorventes de tinta em 100% de capacidade (necessário reset de firmware e troca do feltro) + desobstrução química por ultrassom do cabeçote de impressão.',
    solucaoRealizada: '',
    tecnicoResponsavelId: 'tec_3',
    tecnicoResponsavelNome: 'Renan Oliveira',
    status: 'AGUARDANDO_APROVACAO',
    servicos: [
      { id: 'srv_301', descricao: 'Desobstrução química especializada de cabeçote MicroPiezo Epson', valor: 130.00 },
      { id: 'srv_302', descricao: 'Reset de eprom + Instalação de kit dispenser externo', valor: 90.00 }
    ],
    pecas: [
      { id: 'pec_301', nome: 'Kit Almofadas Absorventes e Feltros Epson L3250', quantidade: 1, valorUnitario: 60.00, valorTotal: 60.00 }
    ],
    valorTotalServicos: 220.00,
    valorTotalPecas: 60.00,
    valorDesconto: 0.00,
    valorTotal: 280.00,
    formaPagamento: 'PIX',
    aprovadoPeloCliente: false,
    garantiaDias: 90,
    historico: [
      { id: 'hist_31', status: 'RECEBIDA', dataHora: '2026-08-30 11:20', usuarioNome: 'Beatriz Lima' },
      { id: 'hist_32', status: 'DIAGNOSTICO', dataHora: '2026-08-30 14:00', usuarioNome: 'Renan Oliveira' },
      { id: 'hist_33', status: 'AGUARDANDO_APROVACAO', dataHora: '2026-08-30 15:10', usuarioNome: 'Mariana Souza', observacao: 'Orçamento enviado por e-mail e WhatsApp para o financeiro da empresa.' }
    ]
  },
  {
    id: 'os_1004',
    numeroOS: 'OS-1004',
    clienteId: 'cli_1',
    clienteNome: 'Roberto Albuquerque',
    clienteTelefone: '(11) 98111-2233',
    clienteCpf: '123.456.789-00',
    equipamento: {
      id: 'eq_4',
      clienteId: 'cli_1',
      tipo: 'DESKTOP',
      marca: 'Custom PC',
      modelo: 'Workstation AMD Ryzen 9 5900X / 32GB RAM / RTX 3080',
      numeroSerie: 'PC-2024-CUST',
      cor: 'Preto / Vidro Temperado',
      estadoFisico: 'Gabinete gamer com poeira acumulada.',
      acessoriosEntregues: ['Gabinete completo sem cabos'],
      checklist: {
        tela: 'OK',
        carcaca: 'OK',
        camera: false,
        bateria: 'OK',
        botoes: true,
        conectores: true,
        altoFalante: false,
        microfone: false,
        liga: false,
        observacoes: 'Não liga, fonte dá estalo ao acionar o botão power.'
      }
    },
    dataEntrada: '2026-08-31 08:30',
    previsaoEntrega: '2026-09-03 16:00',
    problemaRelatado: 'Computador desligou repentinamente durante renderização 3D e não voltou a ligar.',
    diagnosticoTecnico: 'Análise de bancada preliminar: curto na linha de 12V da fonte ATX 750W modular. Placa-mãe protegida pelo circuito OVP.',
    tecnicoResponsavelId: 'tec_2',
    tecnicoResponsavelNome: 'Gabriel Santos',
    status: 'DIAGNOSTICO',
    servicos: [],
    pecas: [],
    valorTotalServicos: 0,
    valorTotalPecas: 0,
    valorDesconto: 0,
    valorTotal: 0,
    aprovadoPeloCliente: false,
    garantiaDias: 90,
    historico: [
      { id: 'hist_41', status: 'RECEBIDA', dataHora: '2026-08-31 08:30', usuarioNome: 'Carlos Mendes' },
      { id: 'hist_42', status: 'DIAGNOSTICO', dataHora: '2026-08-31 09:15', usuarioNome: 'Gabriel Santos', observacao: 'Iniciados testes individuais com fonte de bancada.' }
    ]
  }
];

export const INITIAL_VENDAS: VendaPresencial[] = [
  {
    id: 'vnd_1',
    codigoVenda: 'VND-2026-089',
    clienteId: 'cli_1',
    clienteNome: 'Roberto Albuquerque',
    itens: [
      {
        produtoId: 'prod_1',
        nome: 'Carregador Turbo 65W GaN USB-C Fast Charge',
        sku: 'CAR-GAN-65W',
        quantidade: 1,
        precoUnitario: 149.90,
        subtotal: 149.90
      },
      {
        produtoId: 'prod_7',
        nome: 'Cabo Reforçado em Nylon USB-C para Lightning',
        sku: 'CAB-NYL-USBC-LTG',
        quantidade: 1,
        precoUnitario: 89.90,
        subtotal: 89.90
      }
    ],
    valorSubtotal: 239.80,
    valorDesconto: 19.80,
    valorTotal: 220.00,
    formaPagamento: 'PIX',
    vendedorId: 'usr_vendedor',
    vendedorNome: 'Beatriz Lima',
    dataHora: '2026-08-30 15:45',
    status: 'CONCLUIDA',
    observacoes: 'Venda presencial no balcão da loja.'
  },
  {
    id: 'vnd_2',
    codigoVenda: 'VND-2026-090',
    clienteId: 'cli_2',
    clienteNome: 'Camila Fernandes',
    itens: [
      {
        produtoId: 'prod_4',
        nome: 'Hub USB-C 7 em 1 HDMI 4K + RJ45 Gigabit',
        sku: 'HUB-7IN1-ALU',
        quantidade: 1,
        precoUnitario: 229.00,
        subtotal: 229.00
      }
    ],
    valorSubtotal: 229.00,
    valorDesconto: 0.00,
    valorTotal: 229.00,
    formaPagamento: 'DEBITO',
    vendedorId: 'usr_vendedor',
    vendedorNome: 'Beatriz Lima',
    dataHora: '2026-08-31 09:10',
    status: 'CONCLUIDA'
  }
];

export const INITIAL_FINANCEIRO: RegistroFinanceiro[] = [
  {
    id: 'fin_1',
    tipo: 'RECEITA',
    descricao: 'OS-1001 - Reparo iPhone 13 Pro Max',
    categoria: 'SERVICOS_OS',
    valor: 1050.00,
    dataVencimento: '2026-08-30',
    dataPagamento: '2026-08-30',
    status: 'PAGO',
    formaPagamento: 'PIX',
    referenciaTipo: 'OS',
    referenciaId: 'os_1001'
  },
  {
    id: 'fin_2',
    tipo: 'RECEITA',
    descricao: 'Venda VND-2026-089 (Carregador GaN + Cabo)',
    categoria: 'VENDA_PRODUTOS',
    valor: 220.00,
    dataVencimento: '2026-08-30',
    dataPagamento: '2026-08-30',
    status: 'PAGO',
    formaPagamento: 'PIX',
    referenciaTipo: 'VENDA',
    referenciaId: 'vnd_1'
  },
  {
    id: 'fin_3',
    tipo: 'RECEITA',
    descricao: 'Venda VND-2026-090 (Hub USB-C 7 em 1)',
    categoria: 'VENDA_PRODUTOS',
    valor: 229.00,
    dataVencimento: '2026-08-31',
    dataPagamento: '2026-08-31',
    status: 'PAGO',
    formaPagamento: 'DEBITO',
    referenciaTipo: 'VENDA',
    referenciaId: 'vnd_2'
  },
  {
    id: 'fin_4',
    tipo: 'DESPESA',
    descricao: 'Lote de Telas e Peças Fornecedor AlphaTech',
    categoria: 'COMPRA_PECAS',
    valor: 1850.00,
    dataVencimento: '2026-09-05',
    status: 'PENDENTE',
    formaPagamento: 'BOLETO',
    referenciaTipo: 'FORNECEDOR'
  },
  {
    id: 'fin_5',
    tipo: 'DESPESA',
    descricao: 'Energia Elétrica Comercial Enel',
    categoria: 'CUSTOS_FIXOS',
    valor: 485.50,
    dataVencimento: '2026-09-10',
    status: 'PENDENTE',
    formaPagamento: 'BOLETO',
    referenciaTipo: 'FIXA'
  }
];
