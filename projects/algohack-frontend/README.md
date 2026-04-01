# algohack-frontend

This frontend is currently implemented as a standalone static page in `index.html`. The main UI, wallet simulation, deposit flow, milestones, and dashboard logic all run from `projects/algohack-frontend/index.html`.

## Project layout

- `index.html` — main frontend entrypoint and active UI implementation
- `package.json` — Vite scripts for local development and build
- `src/` — legacy React source files present in the repo, but not used by the current frontend entrypoint
- `src/contracts/` — optional generated typed client folder for future smart contract integration

## Run locally

1. Install dependencies: `npm install` or run `algokit project bootstrap all` from the repo root.
2. Start the frontend server: `npm run dev`
3. Open the displayed URL and use the vault dashboard.

## Notes

- The current frontend uses `algosdk` with inline JavaScript in `index.html`.
- The active UI is served from `index.html`, so legacy React entrypoints such as `src/App.tsx` and `src/Home.tsx` are not the main entrypoint.
- If you want to extend the project later, use `src/contracts/` for generated typed contract clients.

# Integrating with smart contracts and application clients

Refer to the guidance in `./src/contracts/README.md` for how to generate typed contract clients. The current frontend entrypoint remains `projects/algohack-frontend/index.html`.
