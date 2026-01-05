# BART Protocol

## Overview

BART (BarT) is a blockchain-based alternative economy platform built as a Web3 protocol. The project presents itself as a decentralized economic primitive built on Substrate (Polkadot ecosystem), featuring wallet connectivity, 3D visualizations, and a premium editorial design aesthetic. The platform includes a landing page with network statistics, timeline visualization, and a whitepaper section explaining the protocol's vision.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and data fetching
- **Styling**: Tailwind CSS v4 with shadcn/ui component library (New York style)
- **3D Graphics**: React Three Fiber with Drei helpers for WebGL visualizations (BART text formation effect)
- **Animations**: Framer Motion for page transitions and UI animations
- **Web3 Integration**: RainbowKit + Wagmi for wallet connectivity (supports Ethereum, Polygon, Arbitrum, Base, Sepolia)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: REST endpoints under `/api/` prefix
- **Build System**: Custom build script using esbuild for server bundling and Vite for client

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Current State**: Using in-memory storage (`MemStorage` class) for network statistics
- **Schema Location**: `shared/schema.ts` with Zod validation via drizzle-zod
- **Database Config**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Key Design Patterns
- **Monorepo Structure**: Client code in `client/`, server in `server/`, shared types in `shared/`
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared directory
- **Component Architecture**: UI primitives from shadcn/ui with Radix UI primitives
- **Development Mode**: Vite dev server with HMR, proxied through Express in development

### Pages and Features
- **Home** (`/`): Landing page with hero section, network stats, timeline, and 3D BART formation effect
- **Whitepaper** (`/whitepaper`): Protocol documentation and vision
- **Tokenize** (`/tokenize`): Asset tokenization with AI pricing simulation
- **Marketplace** (`/marketplace`): NFT marketplace for trading tokenized assets
- **Profile** (`/profile`): User profile with wallet balance and NFT holdings
- **DAO** (`/dao`): Governance page for creating and voting on proposals
- **Sale** (`/sale`): Token sale page with Seed, Private, and Public phases
- **Theme System**: Dark/light mode toggle with localStorage persistence
- **Internationalization**: Full support for English, Portuguese, French, and Mandarin

### Smart Contracts (Ready for Deployment)
Located in `contracts/` folder:
- **BARToken.sol**: ERC-20 token with 100M total supply, team vesting (2 years), and burn mechanics
- **BARTokenSale.sol**: Multi-phase token sale (Seed $0.01, Private $0.025, Public $0.05) with whitelist support
- **BARDAO.sol**: Governance contract with proposal creation, voting (1 BAR = 1 vote), and 10% quorum

### Contract Integration
- **ABIs**: Located in `client/src/contracts/abis.ts`
- **Config**: Network addresses and tokenomics in `client/src/contracts/config.ts`
- **Hooks**: Wagmi hooks for contract interaction in `client/src/hooks/useContracts.ts`
- **Status**: Contracts need to be deployed to Base/Base Sepolia; frontend uses mock data until deployment

## External Dependencies

### Web3 Services
- **WalletConnect**: Requires `VITE_WALLETCONNECT_PROJECT_ID` environment variable for wallet connectivity
- **Supported Networks**: Ethereum Mainnet, Polygon, Arbitrum, Base, Sepolia testnet

### Database
- **PostgreSQL**: Required for production (configured via `DATABASE_URL`)
- **Drizzle Kit**: Used for database migrations (`npm run db:push`)

### Third-Party APIs
- Network statistics endpoint (`/api/stats`) - currently returns mock data from in-memory storage

### Build and Development Tools
- **Replit Plugins**: Vite plugins for Replit integration (cartographer, dev-banner, runtime-error-modal)
- **Meta Images Plugin**: Custom plugin for OpenGraph image handling in deployments