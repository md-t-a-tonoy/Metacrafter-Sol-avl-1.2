// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public value1;
    string public value2;

    function setValue1(uint256 newValue) public {
        value1 = newValue;
    }

    function setValue2(string memory newValue) public {
        value2 = newValue;
    }
}
