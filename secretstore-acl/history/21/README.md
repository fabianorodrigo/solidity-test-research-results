[![Build Status][travis-image]][travis-url]
[![Solidity Coverage Status][coveralls-image]][coveralls-url]

[travis-image]: https://travis-ci.org/parity-contracts/secretstore-acl.svg?branch=master
[travis-url]: https://travis-ci.org/parity-contracts/secretstore-acl
[coveralls-image]: https://coveralls.io/repos/github/parity-contracts/secretstore-acl/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/parity-contracts/secretstore-acl?branch=master

# secretstore-acl
Secret Store permissioning contracts.

## OnceTransferrablePermission

### Deployments

| Chain | Address                                    |
|-------|--------------------------------------------|
| Kovan | [0xd0651Cd95a6224a9AeDEB39A37465f92DD017C78](https://kovan.etherscan.io/address/0xd0651Cd95a6224a9AeDEB39A37465f92DD017C78)

### ABI

```json
[{"constant":false,"inputs":[{"name":"serverKeyId","type":"bytes32"}],"name":"createKey","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"requester","type":"address"},{"name":"serverKeyId","type":"bytes32"}],"name":"checkPermissions","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"serverKeyId","type":"bytes32"},{"name":"newOwner","type":"address"}],"name":"transferPermission","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

### Bytecode

Compiler: `0.4.21+commit.dfe3193c.Emscripten.clang`

Enable optimization: `true`

```json
0x6060604052341561000f57600080fd5b61022a8061001e6000396000f3006060604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416639cd19074811461005b578063b36a9a7c14610073578063ec9cb2ce146100a9575b600080fd5b341561006657600080fd5b6100716004356100cb565b005b341561007e57600080fd5b610095600160a060020a0360043516602435610117565b604051901515815260200160405180910390f35b34156100b457600080fd5b610071600435600160a060020a0360243516610137565b60008181526020819052604090208054600160a060020a0316156100ee57600080fd5b805473ffffffffffffffffffffffffffffffffffffffff191633600160a060020a031617905550565b600090815260208190526040902054600160a060020a0391821691161490565b6000600160a060020a038216151561014e57600080fd5b506000828152602081905260409020805474010000000000000000000000000000000000000000900460ff161580156101945750805433600160a060020a039081169116145b151561019f57600080fd5b80547401000000000000000000000000000000000000000074ff0000000000000000000000000000000000000000199091161773ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055505600a165627a7a7230582070b1abc6117d03210910080ca42582541f94995f0a995f219b7cb5375e73f17d0029
```