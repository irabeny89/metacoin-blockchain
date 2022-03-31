// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MetaCoin {
    address owner;
    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    error InsufficientFunds(uint256 balance, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function mint(address receiver, uint256 amount) public {
        require(owner == msg.sender, "Forbidden!");
        balances[receiver] += amount;
        emit Transfer(owner, receiver, amount);
    }

    function sendCoin(address receiver, uint256 amount) public {
        if (balances[msg.sender] < amount)
            revert InsufficientFunds(balances[msg.sender], amount);
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
    }
}
