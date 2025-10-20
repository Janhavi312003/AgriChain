export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_location","type": "string"}],
    "name": "registerFarmer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string","name": "_cropName","type": "string"},{"internalType": "uint256","name": "_quantity","type": "uint256"},{"internalType": "uint256","name": "_pricePerUnit","type": "uint256"},{"internalType": "string","name": "_ipfsHash","type": "string"}],
    "name": "uploadHarvest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllHarvests",
    "outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "address","name": "farmer","type": "address"},{"internalType": "string","name": "cropName","type": "string"},{"internalType": "uint256","name": "quantity","type": "uint256"},{"internalType": "uint256","name": "pricePerUnit","type": "uint256"},{"internalType": "string","name": "ipfsHash","type": "string"},{"internalType": "bool","name": "sold","type": "bool"},{"internalType": "address","name": "buyer","type": "address"},{"internalType": "uint256","name": "createdAt","type": "uint256"}],"internalType": "struct AgriChain.Harvest[]","name": "","type": "tuple[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_harvestId","type": "uint256"}],
    "name": "purchaseHarvest",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "_farmer","type": "address"}],
    "name": "getFarmer",
    "outputs": [{"components": [{"internalType": "address","name": "walletAddress","type": "address"},{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "location","type": "string"},{"internalType": "bool","name": "isRegistered","type": "bool"},{"internalType": "uint256","name": "registeredAt","type": "uint256"}],"internalType": "struct AgriChain.Farmer","name": "","type": "tuple"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true,"internalType": "address","name": "farmer","type": "address"},{"indexed": false,"internalType": "string","name": "name","type": "string"},{"indexed": false,"internalType": "string","name": "location","type": "string"}],
    "name": "FarmerRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true,"internalType": "uint256","name": "harvestId","type": "uint256"},{"indexed": true,"internalType": "address","name": "farmer","type": "address"},{"indexed": false,"internalType": "string","name": "cropName","type": "string"}],
    "name": "HarvestUploaded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true,"internalType": "uint256","name": "harvestId","type": "uint256"},{"indexed": true,"internalType": "address","name": "buyer","type": "address"},{"indexed": true,"internalType": "address","name": "farmer","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],
    "name": "HarvestPurchased",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "harvestCount",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const
