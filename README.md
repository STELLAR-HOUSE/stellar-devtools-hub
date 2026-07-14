# Stellar DevTools Hub

Open-source web toolkit for Stellar developers. The MVP includes address validation, testnet balance inspection, trustline checks, payment QR generation, transaction lookup, Freighter wallet examples, and a Friendbot helper.

## Why This Exists

Stellar developers often need small utilities while learning, testing, or building integrations. Stellar DevTools Hub collects those workflows in one Vercel-friendly Next.js app with clean, modular code that contributors can extend.

## GrantFox Context

This project is being prepared as an open-source Stellar ecosystem project for GrantFox. The goal is to provide a working MVP while keeping the codebase modular and contributor-friendly. Maintainer-led work now includes tested Stellar validation utilities, CI quality gates, documented architecture, and focused contributor issues for the next layer of improvements.

## Features

- Validate Stellar public addresses with Stellar SDK StrKey checks
- Switch between Stellar testnet and mainnet for Horizon-backed tools
- Inspect Stellar wallet balances through Horizon
- Check trustlines for issued Stellar assets
- Generate demo payment QR codes and copyable payment URIs
- Look up transaction hashes on the selected network
- Detect Freighter wallet public keys and wallet network mismatch states
- Fund testnet accounts through Friendbot

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Stellar SDK
- qrcode
- lucide-react

## Screenshots

Screenshots will be added after the first Vercel deployment.

<!-- TODO(issue #14): Add and link a Stellar basics education page covering public keys, trustlines, Horizon, and networks. -->

## Local Setup

```bash
git clone https://github.com/STELLAR-HOUSE/stellar-devtools-hub.git
cd stellar-devtools-hub
npm install
```

Copy the example environment file if you want to customize endpoints:

```bash
cp .env.example .env.local
```

## Environment Variables

```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_TESTNET_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_HORIZON_MAINNET_URL=https://horizon.stellar.org
```

The app uses testnet by default and includes a persisted network switch for Horizon-backed tools. The Friendbot faucet remains testnet-only.

## Commands

```bash
npm run dev
npm run test
npm run build
npm run lint
```

## Quality Gates

The repository includes unit tests for core Stellar validation and payment URI behavior. Pull requests and pushes to `main` run:

```bash
npm run lint
npm run test
npm run build
```

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for the code structure and maintainer expectations.

Security expectations are documented in [SECURITY.md](./SECURITY.md).

## Deploy on Vercel

<!-- TODO(issue #20): Replace this short section with a full Vercel deployment guide, screenshots, env validation, and common errors. -->

1. Import the GitHub repository into Vercel.
2. Use the default Next.js framework preset.
3. Set environment variables from `.env.example` if needed.
4. Keep the build command as `npm run build`.
5. Deploy.

## Contribution

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## Roadmap

See [docs/ROADMAP.md](./docs/ROADMAP.md).

The architecture overview is available in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Issue Ideas

See [docs/ISSUES.md](./docs/ISSUES.md) for contributor-ready GitHub issue ideas.

## Create GitHub Issues

Use GitHub CLI to publish every roadmap item from `docs/ISSUES.md` into the repository Issues tab:

```bash
gh auth login
npm run issues:dry-run
npm run issues:create
```

The script skips issues with titles that already exist and creates labels such as `area:frontend` and `difficulty:advanced`.
