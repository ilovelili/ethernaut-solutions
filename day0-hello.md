# Day 0 - Hello

- Get contract password

```js
await contract.password();
```

- Auth with password

```js
await contract.authenticate("[password here]");
```

- Check level passed or not

```js
await contract.getCleared();
```

[Reference](https://hackernoon.com/ethernaut-lvl-0-walkthrough-abis-web3-and-how-to-abuse-them-d92a8842d71b)
