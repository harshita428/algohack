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

## Frontend - Static HTML Dashboard
- Located in `projects/algohack-frontend`.
- Main UI implemented in `projects/algohack-frontend/index.html`.
- Uses inline JavaScript and `algosdk` for wallet simulation and vault interactions.
- `src/` contains legacy React source files that are not the current entrypoint.

## Interaction Flow
1. User opens `projects/algohack-frontend/index.html` in the browser.
2. User connects the simulated wallet and makes a deposit request.
3. Frontend updates local state and displays the vault balance.
4. The app updates milestones, streaks, and transaction history.
5. The frontend reflects updated vault state immediately.

## Extensions
- Goal tracking for multiple vaults.
- Multi-wallet support.
- Milestone and reward logic enhancements.
- Deploy to TestNet or MainNet by updating environment and AlgoKit configuration.
