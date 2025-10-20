# AgriChain

AgriChain is a decentralized agricultural marketplace connecting farmers directly with buyers using blockchain technology. It ensures transparency, fair pricing, and secure transactions on the Base Sepolia testnet.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### prerequisites
Node.js v18 or higher

MetaMask or Coinbase Wallet

Base Sepolia testnet ETH for transactions

### Run Locally
Clone the repo and navigate to frontend:

```bash
git clone https://github.com/yourusername/agrichain-project.git
cd agrichain-project/frontend
```
### Install dependencies:

```bash
npm install
```
### Create .env and add:

```bash
text
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token
NEXT_PUBLIC_PINATA_GATEWAY=your_pinata_gateway_url
```
### Run dev server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
