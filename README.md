# 🛠️ Sistema de Assistência Técnica

Sistema web/PWA desenvolvido para gerenciamento de **assistência técnica de informática e celulares**, com controle de clientes, equipamentos, ordens de serviço, técnicos, estoque, produtos, vendas presenciais e financeiro.

O projeto também possui uma área pública para apresentação dos serviços e divulgação de produtos e acessórios comercializados pela empresa.

> **Importante:** o catálogo de produtos não possui checkout ou pagamento online. Os produtos são apresentados com seus respectivos preços e a venda é finalizada presencialmente na empresa.

---

## 📌 Sobre o projeto

A proposta do sistema é centralizar as principais operações de uma assistência técnica em uma única plataforma.

A empresa poderá controlar desde a entrada de um equipamento para manutenção até a entrega ao cliente, além de administrar produtos, estoque e vendas realizadas na loja.

Na área pública, o cliente poderá:

* Conhecer os serviços oferecidos;
* Consultar produtos e acessórios;
* Visualizar preços;
* Demonstrar interesse em um produto através do WhatsApp;
* Consultar o andamento de uma Ordem de Serviço.

Na área administrativa, a empresa poderá gerenciar toda a operação.

---

## 🚀 Funcionalidades

### 👤 Clientes

* Cadastro de clientes;
* Dados pessoais e de contato;
* Histórico de atendimentos;
* Histórico de ordens de serviço;
* Histórico de compras.

### 💻 Equipamentos

Cadastro dos equipamentos deixados para manutenção:

* Computadores;
* Notebooks;
* Celulares;
* Tablets;
* Impressoras;
* Outros dispositivos.

Informações como:

* Marca;
* Modelo;
* Número de série;
* IMEI;
* Estado físico;
* Acessórios entregues;
* Observações;
* Fotos do equipamento.

---

### 🔧 Ordens de Serviço

Controle completo das assistências técnicas.

Possibilidades:

* Abertura de OS;
* Cadastro do problema informado pelo cliente;
* Diagnóstico técnico;
* Orçamento;
* Aprovação do orçamento;
* Registro de serviços;
* Registro de peças;
* Fotos;
* Técnico responsável;
* Previsão de entrega;
* Histórico de alterações;
* Impressão da OS;
* Acompanhamento pelo cliente.

### Status da OS

```text
Recebida
   ↓
Em diagnóstico
   ↓
Orçamento
   ↓
Aguardando aprovação
   ↓
Em manutenção
   ↓
Aguardando peça
   ↓
Pronta
   ↓
Entregue
```

Também são considerados os status de:

* Recusada;
* Cancelada.

---

## 📋 Kanban de Assistências

Visualização das Ordens de Serviço através de um painel Kanban.

Colunas principais:

* Recebidas;
* Em diagnóstico;
* Aguardando aprovação;
* Em manutenção;
* Aguardando peça;
* Prontas.

As OS podem ser movimentadas entre as etapas, mantendo o histórico das alterações.

---

## 🛍️ Catálogo de Produtos

Área pública destinada à divulgação dos produtos comercializados pela empresa.

Podem ser cadastrados:

* Cabos;
* Carregadores;
* Fones;
* Headsets;
* Teclados;
* Mouses;
* Adaptadores;
* Pendrives;
* Cartões de memória;
* Películas;
* Capinhas;
* Fontes;
* Memórias;
* SSDs;
* HDs;
* Acessórios para celulares;
* Acessórios para computadores.

Cada produto pode possuir:

* Foto;
* Nome;
* Descrição;
* Marca;
* Modelo;
* Categoria;
* Preço;
* Estoque;
* Destaque;
* Status de publicação.

### 🛒 O sistema não é um e-commerce

O catálogo possui apenas finalidade informativa e comercial.

Não existe:

* Carrinho;
* Checkout;
* Pagamento online;
* Cálculo de frete;
* Finalização de compra pelo site.

O cliente visualiza o produto e pode entrar em contato com a empresa pelo WhatsApp.

A venda é realizada presencialmente e registrada no sistema administrativo.

---

## 📦 Estoque

Controle de movimentação dos produtos e peças utilizados pela empresa.

Funcionalidades:

* Entrada de produtos;
* Saída de produtos;
* Ajuste de estoque;
* Estoque mínimo;
* Alertas de estoque baixo;
* Histórico de movimentações;
* Controle de peças utilizadas em OS.

O sistema poderá realizar a baixa automática do estoque quando:

* Uma peça for utilizada em uma OS;
* Uma venda presencial for finalizada.

---

## 💰 Vendas Presenciais

Módulo destinado ao registro das vendas realizadas fisicamente na empresa.

Permite:

* Selecionar cliente;
* Adicionar produtos;
* Alterar quantidades;
* Aplicar descontos;
* Selecionar forma de pagamento;
* Finalizar venda;
* Atualizar estoque;
* Registrar movimentação financeira.

### Formas de pagamento

* Dinheiro;
* PIX;
* Débito;
* Crédito;
* Outras formas configuráveis.

---

## 🧾 Venda vinculada à OS

Uma Ordem de Serviço poderá possuir serviços e produtos utilizados no atendimento.

Exemplo:

```text
Formatação................ R$ 100,00
SSD 480 GB................ R$ 280,00
------------------------------------
Total..................... R$ 380,00
```

Dessa forma, o serviço e as peças utilizadas ficam vinculados ao atendimento do cliente.

---

## 👨‍🔧 Técnicos

Cadastro e gerenciamento dos técnicos da empresa.

Informações:

* Nome;
* Telefone;
* E-mail;
* Especialidades;
* Status;
* Usuário de acesso.

Também será possível acompanhar as OS atribuídas a cada técnico.

---

## 💵 Financeiro

Controle financeiro básico da operação.

### Contas a receber

* Vendas;
* Serviços;
* Ordens de Serviço;
* Cliente;
* Valor;
* Vencimento;
* Forma de pagamento;
* Status.

### Contas a pagar

* Fornecedor;
* Descrição;
* Categoria;
* Valor;
* Vencimento;
* Status.

---

## 📊 Dashboard

Painel administrativo com informações resumidas da operação.

Indicadores:

* OS abertas;
* OS em manutenção;
* OS aguardando aprovação;
* OS prontas;
* Vendas do dia;
* Faturamento;
* Produtos com estoque baixo.

Também serão disponibilizados gráficos para acompanhamento da operação.

---

## 📈 Relatórios

Relatórios planejados:

* Ordens de Serviço;
* Serviços realizados;
* Produtos vendidos;
* Estoque;
* Vendas;
* Faturamento;
* Técnicos;
* Clientes;
* Financeiro.

Filtros por período e demais informações relevantes poderão ser utilizados para análise dos dados.

---

## 📱 PWA

O projeto será desenvolvido como **Progressive Web App**, permitindo sua utilização em computadores e dispositivos móveis.

Recursos previstos:

* Instalação no dispositivo;
* Responsividade;
* Ícone próprio;
* Manifest;
* Service Worker;
* Cache;
* Experiência semelhante a um aplicativo.

---

## 💬 WhatsApp

O sistema será preparado para facilitar o contato com os clientes através do WhatsApp.

Possíveis utilizações:

* Interesse em produtos;
* Envio de orçamento;
* Aviso de aprovação;
* Aviso de equipamento pronto;
* Comunicação sobre a Ordem de Serviço.

Inicialmente, a comunicação poderá utilizar links do WhatsApp, mantendo a estrutura preparada para uma futura integração com a API oficial.

---

## 🧑‍💻 Tecnologias

### Front-end

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* PWA

### Back-end

Planejado:

* Node.js
* NestJS
* REST API

### Banco de dados

Planejado:

* PostgreSQL
* Prisma ORM

### Infraestrutura

Planejado:

* Docker
* Variáveis de ambiente
* API independente
* Ambiente de produção

---

## 🏗️ Estrutura do projeto

A estrutura será organizada para separar responsabilidades e facilitar a manutenção.

```text
src/
├── assets/
├── components/
├── contexts/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── types/
├── utils/
└── main.tsx
```

A aplicação deverá evitar regras de negócio diretamente nos componentes de interface, mantendo uma estrutura preparada para integração com uma API.

---

## 🔐 Usuários e permissões

O sistema deverá trabalhar com diferentes níveis de acesso.

### Administrador

Acesso completo ao sistema.

### Gerente

Acesso aos principais módulos administrativos.

### Técnico

Acesso às Ordens de Serviço relacionadas ao seu trabalho.

### Vendedor

Acesso a produtos, estoque e vendas.

---

## 🗺️ Roadmap

### Fase 1 — Interface

* [x] Estrutura inicial;
* [ ] Landing Page;
* [ ] Catálogo;
* [ ] Página de produto;
* [ ] Acompanhamento de OS;
* [ ] Login;
* [ ] Dashboard;
* [ ] PWA.

### Fase 2 — Assistência Técnica

* [ ] Clientes;
* [ ] Equipamentos;
* [ ] Ordens de Serviço;
* [ ] Orçamentos;
* [ ] Aprovação;
* [ ] Kanban;
* [ ] Técnicos.

### Fase 3 — Produtos e Estoque

* [ ] Cadastro de produtos;
* [ ] Categorias;
* [ ] Fornecedores;
* [ ] Entrada de estoque;
* [ ] Saída de estoque;
* [ ] Estoque mínimo.

### Fase 4 — Vendas

* [ ] Venda presencial;
* [ ] Produtos;
* [ ] Descontos;
* [ ] Formas de pagamento;
* [ ] Venda vinculada à OS;
* [ ] Comprovante.

### Fase 5 — Financeiro

* [ ] Contas a receber;
* [ ] Contas a pagar;
* [ ] Fluxo financeiro;
* [ ] Dashboard financeiro.

### Fase 6 — Relatórios e integrações

* [ ] Relatórios;
* [ ] Exportação;
* [ ] WhatsApp;
* [ ] Impressão;
* [ ] Integrações externas.

---

## ⚙️ Instalação

Clone o projeto:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta:

```bash
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

Execute em ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite.

---

## 🔧 Variáveis de ambiente

Criar um arquivo:

```text
.env
```

Exemplo:

```env
VITE_API_URL=http://localhost:3000
VITE_WHATSAPP_NUMBER=
```

As credenciais e informações sensíveis não devem ser armazenadas diretamente no código-fonte.

---

## 📌 Status do projeto

🚧 **Em desenvolvimento**

O projeto está sendo desenvolvido de forma incremental, começando pela interface e estrutura da aplicação e posteriormente avançando para a API, banco de dados e regras de negócio.

---

## 🎯 Objetivo

O objetivo é disponibilizar uma solução centralizada para pequenas e médias empresas de assistência técnica, permitindo controlar:

**Clientes → Equipamentos → Ordens de Serviço → Técnicos → Peças → Estoque → Vendas → Financeiro → Relatórios**

Além disso, o sistema oferece uma presença digital para a empresa através do catálogo público de produtos e apresentação dos serviços.

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido por **Eder Dias**.

> Projeto desenvolvido para fins de estudo, desenvolvimento e aplicação prática de conhecimentos em desenvolvimento de sistemas.
