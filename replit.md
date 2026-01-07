# BartBank Protocol

## Overview

BartBank is a blockchain-based alternative economy platform built as a Web3 protocol. The project presents itself as a decentralized economic primitive built on Substrate (Polkadot ecosystem), featuring wallet connectivity, 3D visualizations, and a premium editorial design aesthetic. The platform includes a landing page with network statistics, timeline visualization, and a whitepaper section explaining the protocol's vision.

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
- **Current State**: Transitioning from in-memory storage to PostgreSQL database persistence for DAO proposals and Marketplace items.
- **Schema Location**: `shared/schema.ts` with Zod validation via drizzle-zod
- **Database Config**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Key Design Patterns
- **Monorepo Structure**: Client code in `client/`, server in `server/`, shared types in `shared/`
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared directory
- **Component Architecture**: UI primitives from shadcn/ui with Radix UI primitives
- **Development Mode**: Vite dev server with HMR, proxied through Express in development

### Pages and Features
- **Home** (`/`): Landing page with slogan "O Futuro é Ancestral", network stats, timeline, and 3D BART formation effect.
- **Whitepaper** (`/whitepaper`): Protocol documentation and vision.
- **Tokenize** (`/tokenize`): Asset tokenization with AI pricing simulation.
- **Marketplace** (`/marketplace`): NFT marketplace for trading tokenized assets.
- **Profile** (`/profile`): User profile with wallet balance and NFT holdings.
- **DAO** (`/dao`): Governance page for creating and voting on proposals.
- **Sale** (`/sale`): Token sale page with Seed, Private, and Public phases.
- **Theme System**: Dark/light mode toggle with localStorage persistence.
- **Internationalization**: Full support for English, Portuguese, French, and Mandarin.

## Status e Próximos Passos (Janeiro 2026)

### Concluído
- Fix: Tela branca resolvida com ErrorBoundaries e tratamento de falhas no Web3Provider.
- Branding: Título de compartilhamento atualizado para "O Futuro é Ancestral".
- Localização: Traduções revisadas para evitar erros de renderização.

### Em Progresso
- Persistência: Conectar DAO e Marketplace ao PostgreSQL.
- IA Sentinela: Refinar lógica de precificação para simulação realista.

### Pendente (Ação do Usuário)
- WalletConnect: Obter Project ID em cloud.reown.com para habilitar funções de carteira.

## Smart Contracts (Ready for Deployment)
... (restante do arquivo mantido)