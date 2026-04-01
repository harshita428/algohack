# Gamified Savings Vault - System Design

This document outlines the architecture of the Algohack Vault.

## Backend - Smart Contracts
- Written in Python using Algorand SDK.
- Smart contract located in: `projects/algohack-contracts/smart_contracts/saving_app/contract.py`.
- Stores vault states, progress, and rewards in Algorand local/global storage.
- Contract methods include:
  - Deposit ALGO
  - Withdraw ALGO
  - Claim rewards
- Deployable to LocalNet using AlgoKit.

## Frontend - React Application
- Located in `projects/algohack-frontend`.
- Wallet integration using `@txnlab/use-wallet-react`.
- Single-page application (`index.html` + `src/App.tsx`) handling UI.
- Connects with smart contracts through **typed application clients** in `src/contracts`.

## Interaction Flow
1. User connects Algorand wallet.
2. User makes a deposit or withdraw request via frontend.
3. Frontend sends a signed transaction to the smart contract.
4. Contract updates vault state and triggers milestones/rewards.
5. Frontend displays updated vault state and rewards.

## Extensions
- Goal tracking for multiple vaults.
- Multi-wallet support.
- Milestone and reward logic enhancements.
- Deploy to TestNet or MainNet by updating environment and AlgoKit configuration.
