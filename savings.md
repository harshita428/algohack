# Gamified Savings Vault on Algorand

This document describes the gamified savings vault template built with Algorand smart contracts and a React wallet frontend.

## Purpose

The savings vault is a prototype for turning saving into an engaging blockchain experience. It combines a contract-based vault on Algorand with a wallet-enabled frontend to support:

- deposits into a savings vault
- goal tracking and milestone progress
- reward tiers or gamified saving mechanics
- wallet interaction through Pera, Defly, Exodus, or localnet KMD

## Project layout

- `projects/algohack-contracts/`
  - contains the smart contract source and deployment setup
  - `smart_contracts/saving_app/contract.py` is the base contract implementation
  - `smart_contracts/saving_app/deploy_config.py` defines deployment configuration
- `projects/algohack-frontend/`
  - React frontend with wallet integration
  - `src/App.tsx` initializes supported wallets
  - `src/Home.tsx` is the main UI entry point
  - `src/contracts/` holds generated contract clients

## What the template provides

- a starter Algorand app contract written in Algorand Python
- a frontend scaffold with `@txnlab/use-wallet-react` wallet connection support
- automatic typed client generation via `algokit project link --all`
- LocalNet-friendly environment configuration

## Setup and run

1. Bootstrap the repository:
   - `algokit project bootstrap all`
2. Generate the localnet env file for contracts:
   - `cd projects/algohack-contracts`
   - `algokit generate env-file -a target_network localnet`
3. Start LocalNet:
   - `algokit localnet start`
4. Build the workspace:
   - `algokit project run build`
5. Deploy the smart contract to localnet:
   - `algokit project deploy localnet`
6. Start the frontend:
   - `cd projects/algohack-frontend`
   - `npm run dev`

## Recommended extensions

To turn this into a full gamified savings vault, add:

- deposit, withdraw, and reward claim methods in `saving_app/contract.py`
- goal state and progress tracking in contract global/local storage
- badge, streak, and milestone UI in `src/Home.tsx`
- wallet flow for sign, opt-in, and app calls

## Notes

- This template targets Algorand LocalNet by default.
- For TestNet or MainNet, update your environment variables and wallet provider settings.
- Use `npm run generate:app-clients` before building the frontend after contract changes.
