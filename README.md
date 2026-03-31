# Algohack: Gamified Savings Vault on Algorand

A full-stack Algorand dApp prototype for a gamified savings vault. This project combines a smart contract vault backend with a React wallet frontend to help users save ALGO, track goals, and unlock rewards.

## What this project includes

- `projects/algohack-contracts`: Python-based Algorand smart contract source and deployment configuration.
- `projects/algohack-frontend`: React frontend with Algorand wallet integration via `@txnlab/use-wallet-react`.
- `projects/algohack-frontend/src/contracts`: generated typed application clients for smart contract interaction.
- `projects/algohack-contracts/smart_contracts/saving_app`: the starter SavingApp contract, ready to extend into a gamified savings vault.

## Core idea

The gamified savings vault is designed to turn saving into an engaging experience:

- save funds into a vault contract
- associate deposits with savings goals
- earn progress milestones or reward tiers
- interact from a wallet-enabled React frontend

The current template includes a base Algorand smart contract and React wallet UI. You can extend the contract and frontend to implement vault rules, goal tracking, reward logic, and user-friendly saving flows.

## Prerequisites

- Docker
- AlgoKit CLI
- Node.js 20+ and npm 9+
- Python 3.12+

## Setup

1. Clone the repository.
2. From the repository root, install dependencies with AlgoKit:
   - `algokit project bootstrap all`
3. Create the localnet env file for contracts:
   - `cd projects/algohack-contracts`
   - `algokit generate env-file -a target_network localnet`
4. Start LocalNet:
   - `algokit localnet start`

## Build and run

From the repository root:

1. Build the full workspace:
   - `algokit project run build`
2. Deploy the smart contract to localnet:
   - `algokit project deploy localnet`
3. Start the frontend:
   - `cd projects/algohack-frontend`
   - `npm run dev`

## Project structure

- `projects/algohack-contracts/`
  - `pyproject.toml` / `poetry.toml`
  - `smart_contracts/saving_app/contract.py`
  - `smart_contracts/saving_app/deploy_config.py`
- `projects/algohack-frontend/`
  - `package.json`
  - `src/App.tsx`
  - `src/Home.tsx`
  - `src/utils/network/getAlgoClientConfigs.ts`

## How it works

- The backend contract is written in Algorand Python and compiled via AlgoKit.
- The frontend connects to Algorand wallets using `use-wallet` and sends signed transactions.
- Typed application clients are generated automatically before building the frontend.

## Extend the gamified vault

To evolve this template into a full savings vault:

- add deposit / withdraw / claim reward methods in `saving_app/contract.py`
- store progress and vault state in contract global/local storage
- add goal tracking and milestone badges in the frontend
- support multiple wallet providers in `src/App.tsx`
- generate typed clients with `npm run generate:app-clients`

## Notes

- This project is built for LocalNet by default.
- You can adapt the same workflow to TestNet or MainNet by updating environment configuration and wallet provider settings.

## Helpful commands

- `algokit project bootstrap all`
- `algokit localnet start`
- `algokit project run build`
- `algokit project deploy localnet`
- `cd projects/algohack-frontend && npm run dev`

Enjoy building your Algorand-powered gamified savings vault!