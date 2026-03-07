# BartBank Protocol

> **O Futuro é Ancestral** — A descentralized economy platform on Base blockchain

BartBank é um protocolo de economia alternativa construído como uma primitiva Web3 na rede **Base** (Ethereum Layer 2). Combina visão ancestral com tecnologia blockchain para criar uma plataforma de governança distribuída, mercado NFT, tokenização de ativos com preços inteligentes e venda de tokens.

## 🌍 Features Principais

- **💼 DAO Governance** — Criar e votar em propostas com contratos inteligentes
- **🏪 NFT Marketplace** — Comprar, vender e negociar ativos tokenizados
- **🤖 AI Sentinel v2.0** — Precificação inteligente e multilíngue de ativos
- **💰 Token Sale** — 3 fases de venda (Seed, Private, Public)
- **🎨 Design Editorial** — Interface minimalista e premium
- **🔗 Hybrid Mode** — Funciona com blockchain ou banco de dados (fallback)
- **🌐 Multilíngue** — Suporte para EN, PT, FR, ZH

## 🚀 Começar

### Pré-requisitos
- Node.js 20+
- PostgreSQL
- Wallet (MetaMask, Coinbase, Uniswap Wallet, Phantom)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-username/bartbank-protocol.git
cd bartbank-protocol

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com DATABASE_URL e VITE_WALLETCONNECT_PROJECT_ID

# Iniciar servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173`

## 📋 Páginas & Funcionalidades

| Página | Descrição |
|--------|-----------|
| `/` | Landing page com BART 3D, stats da rede e timeline |
| `/whitepaper` | Documentação e visão do protocolo |
| `/tokenize` | Simulação de tokenização com AI Sentinel |
| `/marketplace` | NFT marketplace com dados persistentes |
| `/profile` | Perfil do usuário e carteira |
| `/dao` | Governança — criar e votar em propostas |
| `/sale` | Venda de tokens BAR em 3 fases |

## 🔗 Arquitetura Técnica

### Frontend
- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Roteamento**: Wouter
- **UI**: shadcn/ui (Radix UI)
- **3D**: React Three Fiber + Drei
- **Web3**: RainbowKit + Wagmi
- **Estilo**: Tailwind CSS v4
- **Animações**: Framer Motion

### Backend
- **Runtime**: Node.js 20 + Express.js (ESM)
- **ORM**: Drizzle ORM
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod

### Blockchain
- **Rede**: Base (Ethereum L2)
- **Linguagem de Contrato**: Solidity 0.8.20
- **Contratos**:
  - `BARToken.sol` — ERC20 (100M supply)
  - `BARDAO.sol` — DAO governance
  - `BARTokenSale.sol` — Token sale (3 phases)

## 📦 Estrutura do Projeto

```
bartbank-protocol/
├── client/              # Frontend React + Vite
│   ├── src/
│   │   ├── pages/      # Rotas principais
│   │   ├── components/ # Componentes UI
│   │   ├── hooks/      # Hooks customizados (Web3, API)
│   │   └── contracts/  # Config ABIs e addresses
│   └── index.html
├── server/             # Backend Express.js
│   ├── routes.ts       # Rotas REST
│   └── storage.ts      # Interface Drizzle ORM
├── shared/             # Tipos e schemas compartilhados
│   └── schema.ts       # Drizzle schema + Zod
├── contracts/          # Contratos Solidity
│   ├── BARToken.sol
│   ├── BARDAO.sol
│   └── BARTokenSale.sol
├── scripts/            # Build e deploy
│   ├── compile.cjs     # Compilar contratos
│   └── deploy.cjs      # Deploy em Base Sepolia/Base
└── artifacts/          # Contratos compilados
```

## 🔐 Variáveis de Ambiente

```env
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/bartbank

# Web3
VITE_WALLETCONNECT_PROJECT_ID=seu_project_id_aqui
DEPLOYER_PRIVATE_KEY=sua_chave_privada_aqui (só para deploy)
```

## 🌐 Deploy

### Modo Desenvolvimento
```bash
npm run dev
```

### Modo Produção
```bash
npm run build
npm start
```

### Deploy de Contratos (Base Sepolia)

1. Obter ETH de teste no [faucet da Alchemy](https://www.alchemy.com/faucets/base-sepolia)
2. Configurar `DEPLOYER_PRIVATE_KEY` no `.env`
3. Rodar deploy:
   ```bash
   node scripts/deploy.cjs
   ```
   Endereços serão salvos em `client/src/contracts/config.ts`

## 💡 Modo Híbrido

O BartBank funciona em dois modos:

1. **Off-Chain Mode** (Desenvolvimento/Demo)
   - Usa PostgreSQL para DAO proposals e marketplace
   - Perfeito para testes e prototipar

2. **On-Chain Mode** (Após Deploy)
   - Lê dados diretamente dos contratos inteligentes
   - Frontend auto-detecta e muda de modo

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais detalhes.

## 👥 Autores

- **Visão & Negócio**: Você
- **Desenvolvimento Técnico**: Replit Agent

## 📞 Contato

Para dúvidas ou sugestões, abra uma [Issue](https://github.com/seu-username/bartbank-protocol/issues).

---

**O Futuro é Ancestral** 🌍
