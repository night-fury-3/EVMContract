// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";
import "./ERC20.sol";


contract MyToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 560000 * 10 ** uint(decimals()));
    }

    // function transfer(address to, uint256 amount) public override returns (bool){
    //     _approve(_msgSender(), to, amount);
    //     _transfer(_msgSender(), to, amount);
    //     return true;
    // }

}