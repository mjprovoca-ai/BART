# BartBank Protocol

## Overview

BartBank is a blockchain-based alternative economy platform built as a Web3 protocol on **Base** (Ethereum Layer 2). The project features wallet connectivity, 3D visualizations, DAO governance, NFT marketplace, asset tokenization with AI pricing, and a premium editorial design aesthetic. Branding: "O Futuro é Ancestral".

## User Preferences

- Preferred communication style: Simple, everyday language (Portuguese).
- Role: The user is the visionary and business lead; the agent is the technical lead/developer.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and data fetching
- **Styling**: Tailwind CSS v4 with shadcn/ui component library (New York style)
- **3D Graphics**: React Three Fiber with Drei helpers for WebGL visualizations (BART text formation effect)
- **Animations**: Framer Motion for page transitions and UI animations
- **Web3 Integration**: RainbowKit + Wagmi for wallet connectivity (supports Ethereum, Polygon, Arbitrum, Base, Sepolia)
- **Error Handling**: Custom `ErrorBoundary` component to prevent blank pages and improve resilience.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: REST endpoints under `/api/` prefix
- **Build System**: Custom build script using esbuild for server bundling and Vite for client

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` with Zod validation via drizzle-zod
- **Tables**: networkStats, marketplaceItems, daoProposals
- **Database Config**: Requires `DATABASE_URL` environment variable

### Blockchain (Base Sepolia / Base)
- **Target Network**: Base (Layer 2 on Ethereum) — cheap transactions, full Ethereum security
- **Smart Contracts** (compiled, ready for deploy):
  - `BARToken.sol` — ERC20 token, 100M supply, governance capabilities
  - `BARDAO.sol` — DAO governance with voting, proposals, treasury
  - `BARTokenSale.sol` — Token sale in 3 phases (Seed $0.01, Private $0.025, Public $0.05)
- **Compilation**: Uses `solc` 0.8.20 with viaIR optimizer. Artifacts in `artifacts/`
- **Deploy Script**: `scripts/deploy.cjs` — deploys all 3 contracts + configures relationships
- **Deployer Wallet**: `0x7Fb5e94153e05426289333B9b11f1A58362091b6` (needs Base Sepolia ETH from faucet)
- **Frontend Integration**: Hybrid mode — reads from blockchain when deployed, falls back to PostgreSQL database
- **Contract Config**: `client/src/contracts/config.ts` — addresses auto-updated by deploy script
- **ABIs**: `client/src/contracts/abis.ts`
- **Hooks**: `client/src/hooks/useContracts.ts` (blockchain), `client/src/hooks/use-dao.ts` (database fallback)

### Key Design Patterns
- **Monorepo Structure**: Client code in `client/`, server in `server/`, shared types in `shared/`
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared directory
- **Component Architecture**: UI primitives from shadcn/ui with Radix UI primitives
- **Hybrid Mode**: Frontend works with both blockchain and database, switching based on contract deployment status

### Pages and Features
- **Home** (`/`): Landing page with slogan "O Futuro é Ancestral", network stats, timeline, and 3D BART formation effect.
- **Whitepaper** (`/whitepaper`): Protocol documentation and vision.
- **Tokenize** (`/tokenize`): Asset tokenization with AI Sentinel v2.0 pricing simulation.
- **Marketplace** (`/marketplace`): NFT marketplace for trading tokenized assets (DB + demo data).
- **Profile** (`/profile`): User profile with wallet balance and NFT holdings.
- **DAO** (`/dao`): Governance page with hybrid on-chain/off-chain mode indicator.
- **Sale** (`/sale`): Token sale page with Seed, Private, and Public phases (hybrid blockchain/demo).
- **Theme System**: Dark/light mode toggle with localStorage persistence.
- **Internationalization**: Full support for English, Portuguese, French, and Mandarin.

## Status e Próximos Passos (Fevereiro 2026)

### Concluído
- WalletConnect Project ID configurado e carteiras funcionando
- PostgreSQL conectado: DAO e Marketplace persistem dados reais
- APIs REST: /api/dao/proposals, /api/marketplace, /api/stats
- IA Sentinela v2.0: Precificação inteligente por categoria com análise multilíngue
- Smart contracts compilados com solc 0.8.20 (BARToken, BARDAO, BARTokenSale)
- Script de deploy criado para Base Sepolia
- Frontend híbrido: funciona com blockchain quando deployed, banco de dados como fallback
- Indicador de rede na DAO page (On-Chain vs Off-Chain Mode)

### Pendente
- Deploy dos contratos na Base Sepolia (precisa de ETH de teste no faucet)
  - Carteira deployer: 0x7Fb5e94153e05426289333B9b11f1A58362091b6
  - Faucet: https://www.base.org/faucet
  - Comando: `node scripts/deploy.cjs` (após ter ETH)
- Após deploy: endereços atualizados automaticamente em config.ts
