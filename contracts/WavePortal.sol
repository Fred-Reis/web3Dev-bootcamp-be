// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves; // declared variable with the total number of waves
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) private lastWaveAt;

    constructor() payable {
        console.log("This Smart contract is running baby!");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        require(
            lastWaveAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 30 seconds more!"
        );

        lastWaveAt[msg.sender] = block.timestamp;

        totalWaves++;
        console.log("%s has waved", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Randomic seed generated: %d", seed);

        if (seed <= 50) {
            console.log("%s Has a winner!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;

            require(
                prizeAmount <= address(this).balance,
                "This contract doesn't have enough funds!"
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to get funds!");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("Total Waves: %d", totalWaves);
        return totalWaves;
    }
}
