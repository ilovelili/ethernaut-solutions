# Day 5 - Token

No integer over/underflow protection. Always use safemath libraries. As long as you pass a value > 20, the condition in the first require statement will underflow and it will always pass.

```js
await contract.transfer(instance, 25);
```
