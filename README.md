# Repositório Aplicacao Web - Simulando um Sistema de Gerenciamento Empresarial

Este repositório engloba uma aplicacao web simples criada em Node com Express JS, com 2 principais tableas de Empregados e de Localizações para a gerência simulada. Esta plataforma foi desenvolvida com Node.js, Express, Sequelize e PostgreSQL.

## 📋 Índice

- [Estrutura do Repositório](#estrutura-do-repositório)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
- [Funcionalidades](#funcionalidades)
- [Configuração e Execução](#configuração-e-execução)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Interface do Usuário](#interface-do-usuário)

## 🗂️ Estrutura do Repositório

```
Aplicacao-Web/
├── node-app/                          
│   ├── config/                        
│   │   ├── config.js                  
│   │   └── config.json                
│   ├── controllers/                   
│   │   └── htmlController.js          
│   ├── models/                        
│   │   ├── index.js                   
│   │   ├── employee.js                
│   │   └── location.js                
│   ├── views/                         
│   │   ├── index.ejs                  
│   │   ├── locations.ejs              
│   │   ├── employees.ejs              
│   ├── scripts/                       
│   │   └── sync-db.js                 
│   ├── migrations/                    
│   ├── seeders/                       
│   ├── public/                        
│   ├── app.js                         
│   ├── package.json                   
│   ├── Dockerfile                     
│   ├── docker-compose.yml             
│   └── .sequelizerc                   
└── README.md                          
```

## Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Sequelize** - ORM para JavaScript
- **PostgreSQL** - Sistema de gerenciamento de banco de dados
- **EJS** - Template engine para renderização de páginas

### Dependências Principais
- **@sequelize/postgres** - Driver PostgreSQL para Sequelize
- **body-parser** - Middleware para parsing de requisições HTTP
- **pg** - Cliente PostgreSQL para Node.js
- **pg-hstore** - Serialização/deserialização de dados hstore

### Ferramentas de Desenvolvimento
- **sequelize-cli** - Interface de linha de comando do Sequelize
- **dotenv** - Gerenciamento de variáveis de ambiente

### Containerização
- **Docker** - Plataforma de containerização
- **Docker Compose** - Orquestração de múltiplos containers

## Arquitetura da Aplicação

### Estrutura MVC (Model-View-Controller)

#### Models (Modelos)
Localizado em `/models/`, define a estrutura dos dados:

- **employee.js**: Modelo para funcionários
  - `nome` (STRING) - Nome do funcionário
  - `sobrenome` (STRING) - Sobrenome do funcionário
  - `idade` (INTEGER) - Idade do funcionário
  - `cargo` (STRING) - Cargo/função do funcionário
  - `endereço` (STRING, opcional) - Endereço residencial

- **location.js**: Modelo para localizações
  - `nome` (STRING) - Nome da localização
  - `endereco` (STRING) - Endereço da localização
  - `num_employees` (INTEGER) - Número de funcionários
  - `data_de_compra` (DATE) - Data de aquisição da localização

- **index.js**: Inicialização do Sequelize e configuração dos modelos

#### Views (Visualizações)
Templates EJS localizados em `/views/`:

- **index.ejs**: Dashboard principal com navegação para outras seções
- **locations.ejs**: Interface para visualizar e adicionar localizações
- **employees.ejs**: Interface para visualizar e adicionar funcionários

#### Controllers (Controladores)
Localizado em `/controllers/htmlController.js`, gerencia:

- **Rotas GET**: Renderização de páginas com dados do banco
- **Rotas POST**: Processamento de formulários e criação de registros
- **Validação**: Verificação de dados antes da inserção
- **Tratamento de Erros**: Gestão de erros e redirecionamentos 

### Configuração
- **config.js**: Configuração dinâmica do banco de dados
- **.sequelizerc**: Configuração de caminhos do Sequelize CLI

## Funcionalidades

### Dashboard Principal
- Visão geral do sistema com estatísticas
- Navegação intuitiva entre seções
- Design responsivo e moderno
- Contadores dinâmicos de funcionários e localizações

### Gerenciamento de Localizações
- **Visualização**: Lista todas as localizações em formato tabular
- **Adição**: Formulário para cadastrar novas localizações
- **Campos**: Nome, endereço, número de funcionários, data de aquisição
- **Validação**: Verificação de campos obrigatórios

### Gerenciamento de Funcionários
- **Visualização**: Lista todos os funcionários com informações detalhadas
- **Adição**: Formulário completo para cadastro de funcionários
- **Campos**: Nome, sobrenome, idade, cargo, endereço (opcional)
- **Dropdown**: Seleção de cargos pré-definidos

### Interface do Usuário
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Temas Diferenciados**: Cores específicas para cada seção
- **Animações**: Transições suaves e efeitos hover
- **Navegação**: Botões "Voltar ao Início" em todas as páginas
- **Acessibilidade**: Estrutura semântica e foco adequado

## Configuração e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- PostgreSQL
- Docker (opcional)

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/leonardovbf/Aplicacao-Web.git
cd Aplicacao-Web/node-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env baseado nas suas configurações de banco
```

4. **Execute a aplicação**
```bash
node app.js
```

### Execução com Docker

1. **Build e execução**
```bash
cd node-app
docker-compose up --build
```

2. **Acesso**
- Aplicação: http://localhost:3000

### Scripts Disponíveis
- `npm run db:sync` - Sincroniza o banco de dados com os modelos

## Estrutura do Banco de Dados

### Tabela: employees
```sql
- id (PRIMARY KEY, AUTO_INCREMENT)
- nome (VARCHAR, NOT NULL)
- sobrenome (VARCHAR, NOT NULL)
- idade (INTEGER, NOT NULL)
- cargo (VARCHAR, NOT NULL)
- endereço (VARCHAR, NULLABLE)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Tabela: locations
```sql
- id (PRIMARY KEY, AUTO_INCREMENT)
- nome (VARCHAR, NOT NULL)
- endereco (VARCHAR, NOT NULL)
- num_employees (INTEGER, NOT NULL)
- data_de_compra (DATE, NOT NULL)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

## Scripts e Utilitários

### sync-db.js
Script para sincronização do banco de dados:
- Estabelece conexão com o banco
- Sincroniza modelos com as tabelas
- Útil para desenvolvimento e testes

### Configuração do Sequelize
- **.sequelizerc**: Define caminhos para modelos, migrações e seeds
- **Ambientes**: Suporte para development, test e production
- **CLI**: Comandos disponíveis via sequelize-cli

## Containerização

### Dockerfile
- **Base**: Node.js 24 Alpine (imagem leve)
- **Workdir**: /app
- **Usuário**: node (segurança)
- **Porta**: 3000
- **Comando**: node app.js

### Docker Compose
- **Serviço app**: Container da aplicação
- **Volumes**: Código fonte mapeado para desenvolvimento
- **Redes**: Rede bridge isolada
- **Portas**: 3000:3000 (host:container)
