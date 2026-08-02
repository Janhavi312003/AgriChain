// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgriChain {
    struct Farmer {
        address walletAddress;
        string name;
        string location;
        bool isRegistered;
        uint256 registeredAt;
    }
    
    struct Harvest {
        uint256 id;
        address farmer;
        string cropName;
        uint256 quantity;
        uint256 pricePerUnit;
        string ipfsHash;
        bool sold;
        address buyer;
        uint256 createdAt;
    }
    
    mapping(address => Farmer) public farmers;
    mapping(uint256 => Harvest) public harvests;
    uint256 public harvestCount;
    
    event FarmerRegistered(address indexed farmer, string name, string location);
    event HarvestUploaded(uint256 indexed harvestId, address indexed farmer, string cropName);
    event HarvestPurchased(uint256 indexed harvestId, address indexed buyer, address indexed farmer, uint256 amount);
    
    function registerFarmer(string memory _name, string memory _location) public {
        require(!farmers[msg.sender].isRegistered, "Already registered");
        
        farmers[msg.sender] = Farmer({
            walletAddress: msg.sender,
            name: _name,
            location: _location,
            isRegistered: true,
            registeredAt: block.timestamp
        });
        
        emit FarmerRegistered(msg.sender, _name, _location);
    }
    
    function uploadHarvest(
        string memory _cropName,
        uint256 _quantity,
        uint256 _pricePerUnit,
        string memory _ipfsHash
    ) public {
        require(farmers[msg.sender].isRegistered, "Farmer not registered");
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_pricePerUnit > 0, "Price must be greater than 0");
        
        harvestCount++;
        
        harvests[harvestCount] = Harvest({
            id: harvestCount,
            farmer: msg.sender,
            cropName: _cropName,
            quantity: _quantity,
            pricePerUnit: _pricePerUnit,
            ipfsHash: _ipfsHash,
            sold: false,
            buyer: address(0),
            createdAt: block.timestamp
        });
        
        emit HarvestUploaded(harvestCount, msg.sender, _cropName);
    }
    
    function getAllHarvests() public view returns (Harvest[] memory) {
        Harvest[] memory allHarvests = new Harvest[](harvestCount);
        
        for (uint256 i = 1; i <= harvestCount; i++) {
            allHarvests[i - 1] = harvests[i];
        }
        
        return allHarvests;
    }
    
    function purchaseHarvest(uint256 _harvestId) public payable {
        require(_harvestId > 0 && _harvestId <= harvestCount, "Invalid harvest ID");
        Harvest storage harvest = harvests[_harvestId];
        require(!harvest.sold, "Harvest already sold");
        
        uint256 totalPrice = harvest.pricePerUnit * harvest.quantity;
        require(msg.value >= totalPrice, "Insufficient payment");
        
        harvest.sold = true;
        harvest.buyer = msg.sender;
        
        payable(harvest.farmer).transfer(msg.value);
        
        emit HarvestPurchased(_harvestId, msg.sender, harvest.farmer, msg.value);
    }
    
    function getFarmer(address _farmer) public view returns (Farmer memory) {
        return farmers[_farmer];
    }
}
