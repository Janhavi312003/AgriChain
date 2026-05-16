# AgriChain – Decentralized Agricultural Marketplace

AgriChain is a decentralized agricultural marketplace built using blockchain technology that connects farmers directly with buyers. The platform aims to improve transparency, reduce dependency on intermediaries, and enable secure peer-to-peer transactions using cryptocurrency.

The application is deployed on the Base Sepolia testnet and integrates decentralized storage using IPFS.

---

# Problem Statement

Traditional agricultural marketplaces often involve multiple intermediaries, delayed payments, and limited transparency for farmers.

AgriChain solves these issues by:
- Connecting farmers directly with buyers
- Providing transparent product listings
- Enabling secure blockchain-based payments
- Using decentralized storage for product data
- Reducing dependence on centralized systems

---

# Features

## Farmer Features
- List agricultural products on the marketplace
- Upload product images and metadata
- Receive direct crypto payments from buyers
- Manage product listings

## Buyer Features
- Browse available agricultural products
- Purchase products using crypto wallet
- View transparent product information
- Interact directly with sellers

## Blockchain Features
- Smart contract-based product management
- Transparent on-chain transactions
- Decentralized storage using IPFS
- Wallet authentication with MetaMask

---

# Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js + TypeScript |
| Styling | Tailwind CSS |
| Smart Contracts | Solidity |
| Blockchain Network | Base Sepolia |
| Web3 Integration | Ethers.js |
| Wallet | MetaMask / Coinbase Wallet |
| Storage | IPFS (Pinata) |

---

# Project Structure

```bash
AgriChain/
├── contracts/          # Solidity smart contracts
├── frontend/           # Next.js frontend
├── public/             # Static assets
├── app/                # Next.js app router pages
├── components/         # Reusable UI components
└── package.json
```
---
# How AgriChain Works
## High-Level Workflow
- Farmer connects wallet using MetaMask
- Product details and image are uploaded
- Product image/metadata stored on IPFS via Pinata
- Smart contract stores product reference and details
- Buyers browse listed products
- Buyer initiates blockchain transaction to purchase product
- Payment is transferred securely through smart contract
- Transaction becomes publicly verifiable on blockchain
  
## Smart Contract Responsibilities

The Solidity smart contract handles:

- Product registration
- Product ownership tracking
- Product purchase logic
- Secure transaction handling
- Blockchain-based transparency

  ---
  
## Why IPFS?

Large files like images are expensive to store directly on blockchain.

IPFS is used because:

- It provides decentralized storage
- Reduces blockchain storage cost
- Makes uploaded data tamper-resistant
- Improves scalability

Pinata is used as the IPFS gateway service.

---

## Wallet Integration

The DApp integrates MetaMask and Coinbase Wallet for:

- User authentication
- Transaction signing
- Blockchain interaction
- Payment execution

Ethers.js is used to:

- Connect frontend with smart contracts
- Read blockchain data
- Send transactions
- Handle smart contract interactions

  ---
  
# Getting Started
## Prerequisites
- Node.js v18 or higher
- MetaMask or Coinbase Wallet
- Base Sepolia testnet ETH

## Clone Repository
```bash
git clone https://github.com/Janhavi312003/AgriChain.git
cd AgriChain/frontend
```
##Install Dependencies
```bash
npm install
```
## Configure Environment Variables

Create a .env file and add:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token
NEXT_PUBLIC_PINATA_GATEWAY=your_pinata_gateway_url
```
## Run Development Server
```bash
npm run dev

or

yarn dev

or

pnpm dev

or

bun dev
```

Open:
```bash
http://localhost:3000
```

# Deployment
- Smart contracts deployed on Base Sepolia testnet
- Frontend deployed on Vercel
  
## Live Demo

https://agri-chain-237kxxjmg-janhavis-projects-94ce3bb4.vercel.app/
---

# Challenges Faced

## During development, key challenges included:

- Handling asynchronous blockchain transactions
- Managing wallet connection states
- Integrating IPFS uploads with frontend workflow
- Smart contract deployment and testing
- Handling transaction confirmation delays
  
  ---
  
# Learning Outcomes

## This project helped in understanding:

- Solidity smart contract development
- Blockchain transaction flow
- IPFS decentralized storage
- Web3 wallet integration
- Frontend and blockchain interaction
- Decentralized application architecture
