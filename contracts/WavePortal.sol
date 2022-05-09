// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves; // declared variable with the total number of waves

    constructor() {
        console.log("It's my first smart contract on Web3Dev bootcamp!");
    }

    function wave() public {
        totalWaves++;
        console.log("%s has waved", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("Total Waves: %d", totalWaves);
        return totalWaves;
    }
}
