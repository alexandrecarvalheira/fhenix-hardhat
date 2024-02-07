// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract test {

    IERC20 public immutable test;

    constructor (address _test) {
        test = IERC20(_test);
    }

    function addValueEncrypted(inEuint32 calldata _amount) public {
        uint256 amount = uint256(decrytVal(_amount));
        test.transferFrom(msg.sender,address(this),amount);
    }

    function decrytVal( inEuint32 calldata _amount) public pure returns (uint32 x) {
        x = FHE.decrypt(FHE.asEuint32(_amount));
    }

    function addValue(uint256 _amount) public {
        test.transferFrom(msg.sender,address(this),_amount);
    }
}