# AgriChain

AgriChain is a decentralized agricultural marketplace where farmers list harvests and buyers purchase them directly with crypto. It combines a Next.js web app, a Solidity contract on Base Sepolia, IPFS storage, and optional AI-assisted produce analysis.

> Built for learning and demonstration on the Base Sepolia testnet. It is not a production escrow or payment platform.

## What problem does it solve?

Agricultural marketplaces can involve many intermediaries, making prices and payments difficult to track. AgriChain explores a direct marketplace model with transparent on-chain listings and purchases.

## Features

### Farmers

* Connect MetaMask or Coinbase Wallet.
* Register a grower profile with name and location.
* Upload a harvest image, quantity, price, and description.
* Get optional Gemini suggestions for grade, freshness score, title, description, notes, and tags.
* Review or edit every AI suggestion before publishing.
* Store the harvest image and metadata on IPFS through Pinata.
* Receive payment when a buyer purchases the harvest.

### Buyers

* Browse harvests read from the smart contract.
* View IPFS-hosted images and listing metadata.
* Purchase an available harvest with Base Sepolia ETH.
* See the purchase recorded on-chain.

## Important notes

* AI is assistive only; it does not guarantee produce quality and farmers can edit all generated content.
* On purchase, the contract marks a harvest as sold and transfers the payment directly to the farmer. The current contract does not provide escrow, delivery tracking, refunds, or dispute resolution.
* AI requests have an in-memory, per-wallet rate limit. It resets when the server restarts and should use persistent storage in production.

## Tech stack

| Area         | Technology                          |
| ------------ | ----------------------------------- |
| Frontend     | Next.js 16, React 19, TypeScript    |
| Styling      | Tailwind CSS, Framer Motion, Lucide |
| Web3         | Wagmi, Viem, TanStack Query         |
| Wallets      | MetaMask and Coinbase Wallet        |
| Blockchain   | Solidity on Base Sepolia            |
| Storage      | IPFS through Pinata                 |
| AI           | Google Gemini vision API            |
| Contact form | Web3Forms                           |

## Architecture

```text
Farmer / Buyer
      |
      v
Next.js frontend
  |          |             |
  v          v             v
Base Sepolia  Pinata/IPFS   Server API route -> Google Gemini
smart contract
```

The app uploads an image to IPFS first, then stores JSON metadata containing the image CID. The metadata CID is saved in the smart contract, keeping large files off-chain while preserving an on-chain reference.

## Project structure

```text
frontend/
  src/
    app/
      api/analyze-produce/   # Server-side Gemini endpoint
      about/                 # About page
      contact/               # Contact form
      dashboard/             # Marketplace and listing flow
    components/              # Shared UI components
    lib/
      contract.ts            # Contract address and ABI
      ipfs.ts                # Pinata/IPFS helpers
      wagmi.ts               # Wallet and Base Sepolia configuration
  public/
  .env.example
  package.json

../contracts/src/AgriChain.sol  # Marketplace smart contract
```

## Smart-contract flow

1. A farmer calls `registerFarmer(name, location)` once.
2. The farmer uploads the harvest image and metadata to IPFS.
3. The farmer calls `uploadHarvest(cropName, quantity, pricePerUnit, metadataCid)`.
4. Buyers read listings with `getAllHarvests()`.
5. A buyer calls `purchaseHarvest(harvestId)` and sends ETH equal to or greater than `quantity x pricePerUnit`.
6. The contract marks the harvest as sold and transfers the payment to the farmer.

## Getting started

### Prerequisites

* Node.js 18+
* npm
* MetaMask or Coinbase Wallet
* Base Sepolia ETH for test transactions
* A deployed AgriChain contract on Base Sepolia
* Pinata account
* Google AI Studio API key (optional)
* Web3Forms access key (optional)

### Install and run

```bash
git clone https://github.com/Janhavi312003/AgriChain.git
cd AgriChain/frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
# Base Sepolia smart contract
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address

# Pinata IPFS
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token
NEXT_PUBLIC_PINATA_GATEWAY=your_pinata_gateway_url

# Google Gemini: server-side only, never use NEXT_PUBLIC_
GEMINI_API_KEY=your_gemini_api_key_here

# Web3Forms contact form
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here

# Optional production site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> Never commit real keys. Gemini is server-side only. The current Pinata upload flow exposes its token to the browser, so use a restricted Pinata key and move uploads to a server route before a production deployment.

## Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Serve the production build
```

## Live demo

Open https://agri-chain-seven.vercel.app/

## Interview talking points

### Why blockchain?

It creates a tamper-evident record of farmer registrations, harvest listings, and purchases.

### Why IPFS?

Images are expensive to store on-chain. IPFS stores them off-chain while the smart contract stores their CID reference.

### Why Wagmi and Viem?

Wagmi supplies React hooks for wallet and contract state, while Viem handles typed Ethereum and RPC interaction.

### How is AI used safely?

Gemini returns structured suggestions server-side. Farmers can edit them, and manual listing works if AI is unavailable.

### How are payments handled?

The buyer sends ETH with `purchaseHarvest`; the contract validates the listing, marks it sold, and sends payment directly to the farmer.

### What would you improve for production?

Add escrow and disputes, delivery confirmation, moderation, server-side IPFS uploads, persistent rate limiting, automated tests, a security audit, and search/indexing.

## Learning outcomes

AgriChain demonstrates Solidity development, wallet integration, contract reads and writes, IPFS storage, AI API integration, server-side API design, and modern React application development.

## License

For educational and portfolio use.
