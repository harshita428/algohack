# System Design: Gamified Savings Vault on Algorand

## Overview

This document describes the architecture and module design for the Algohack gamified savings vault. The system is built as a monorepo with two main components:

- `projects/algohack-contracts`: Algorand smart contract backend
- `projects/algohack-frontend`: React-based wallet frontend

The vault is designed to let users deposit ALGO, track savings goals, and interact with a reward-enabled contract through wallet-signed transactions.

## Architecture

### High-level architecture

1. `User Wallet` interacts with the frontend.
2. `Frontend App` connects to the Algorand network using supported wallet providers.
3. `Smart Contract` runs on Algorand and manages vault logic, state, and rewards.
4. `AlgoKit` orchestrates build and deployment across the monorepo.

### Data flow

- User connects wallet and selects the target network.
- Frontend loads contract client artifacts and wallet signer.
- User submits a savings vault action (deposit, withdraw, view progress).
- Frontend builds and signs transactions using the wallet.
- Signed transactions are committed to the Algorand network.
- Smart contract executes vault logic and updates state.
- Frontend reads updated state and displays savings progress.

## Modules

### 1. Smart Contracts Module

Path: `projects/algohack-contracts/smart_contracts/saving_app`

Components:

- `contract.py`
  - Defines the base `SavingApp` contract.
  - Implements contract methods, entry points, and state storage.
  - Currently includes a starter method `hello` for ABI compatibility.

- `deploy_config.py`
  - Defines contract deployment settings and parameters.
  - Specifies creation-time arguments and deployment options.

Responsibilities:

- Vault state management
- Savings goal tracking
- Reward/milestone logic
- Transaction validation and authorization
- Application lifecycle management

### 2. Frontend Module

Path: `projects/algohack-frontend`

Components:

- `src/App.tsx`
  - Initializes supported wallets and network configuration.
  - Wraps the app in `WalletProvider` and `SnackbarProvider`.

- `src/Home.tsx`
  - Main UI entrypoint for displaying account status and contract interactions.

- `src/contracts/`
  - Contains generated typed clients for smart contract methods.
  - Enables strongly-typed contract calls from React.

- `src/utils/network/getAlgoClientConfigs.ts`
  - Reads Vite environment variables.
  - Provides Algod/KMD connection settings for LocalNet and live networks.

Responsibilities:

- Wallet connection and session management
- Network configuration and environment handling
- UI for savings vault interactions
- Typed contract client generation and use

### 3. Build and Dev Workflow

Path: repository root

Components:

- `algokit project bootstrap all`
  - Installs dependencies for both Python and frontend modules.

- `algokit project run build`
  - Builds smart contract artifacts and frontend application.

- `algokit project deploy localnet`
  - Deploys the smart contract to LocalNet.

- `npm run dev`
  - Starts the frontend development server.

Responsibilities:

- Multi-project dependency bootstrap
- Contract compilation and artifact generation
- LocalNet deployment orchestration
- Frontend development workflow

## Key design principles

- **Separation of concerns**: smart contract logic is isolated in `projects/algohack-contracts`; UI and wallet integration live in `projects/algohack-frontend`.
- **Modular extension**: the base contract and frontend scaffold can be extended independently.
- **Localnet-first development**: default configuration targets Algorand LocalNet for safe testing.
- **Wallet-native interaction**: the frontend uses `@txnlab/use-wallet-react` for a standard Algorand wallet experience.

## Recommended future modules

- `saving_app/logic.py`
  - Vault deposit/withdraw reward algorithms
  - Goal progress and milestone scoring

- `src/components/SavingsDashboard.tsx`
  - Savings goals, progress bars, and reward badges

- `src/contractClients/savingAppClient.ts`
  - Strongly-typed wrapper around the generated client for business logic

- `src/state/hooks/useVaultState.ts`
  - Custom React hook for contract state fetching and caching

## Deployment targets

- LocalNet: default development environment
- TestNet: for public sandbox testing
- MainNet: for production deployment once contract and UI are complete

## Notes

- The current starter contract is a template and must be extended to implement actual savings vault behavior.
- Generated contract clients should be refreshed after smart contract changes with `npm run generate:app-clients`.
- For a gamified savings vault, core contract logic should include deposit rules, goal progress, reward tiers, and secure state validation.
