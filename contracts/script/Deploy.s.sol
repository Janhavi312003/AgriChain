// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AgriChain} from "../src/AgriChain.sol";

contract DeployAgriChain is Script {
    function run() external returns (AgriChain) {
        // Read private key as bytes32, convert to uint256 for vm.startBroadcast
        uint256 deployerPrivateKey = uint256(vm.envBytes32("PRIVATE_KEY"));
        
        vm.startBroadcast(deployerPrivateKey);
        
        AgriChain agriChain = new AgriChain();
        
        vm.stopBroadcast();

        console.log("AgriChain deployed to:", address(agriChain));
        return agriChain;
    }
}
