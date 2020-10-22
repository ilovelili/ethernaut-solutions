# Day 15 - Naught Coin

## Security issues that accompanied ERC20

- **Batchoverflow**: because ERC20 did not enforce SafeMath, it was possible to underflow integers. this meant that depleting your tokens under 0 would give you 2^256 - 1 tokens (day 5)

- **Transfer “bug”**: makers of ERC20 intended for developers to use approve() & transferfrom() function combination to move tokens around. But this was never clearly stated in documentation, nor did they warn against using transfer() (which was also available). Many developers used transfer() instead, which locked many tokens forever. (you can’t guarantee 3rd contracts will receive your transfer. If you transfer tokens into non-receiving parties, you will lose tokens forever, since the token contract already decremented your own account’s balance - day 9)

- **Poor ERC20 inheritance**: some token contracts did not properly implement the ERC interface, which led to many issues. For example, Golem’s GNT didn’t even implement the crucial `approve()` function, leaving `transfer()` as the only, problematic option

## Solution

### Notice the following

- You can use both `transfer()` and `transferFrom()` to move tokens around

- The `lockTokens()` modifier is only applied to the transfer() function

Just approve another address to take the coins out on behalf of player. Note that you will need to know how to generate the data payload using `web3.eth.encodeFunctionCall`. Once you have the data payload, you need to initiate the `web3.eth.sendTransaction` while the selected account on metamask is the spender's account. The reason for this is because transferFrom() checks the allowance of msg.sender.

```js
await contract.approve(player, (await contract.INITIAL_SUPPLY()).toString());
await contract.transferFrom(player, instance, (await contract.INITIAL_SUPPLY()).toString());
```
