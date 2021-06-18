# NOIA ERC-20 Token Smart Contract

## Testing

Run tests with `npm test` command

## Deployment

1. Recheck token name and symbol in NOIAToken.sol (lines 14, 15).
2. Deploy token smart contract using `truffle migrate` or manually by using some other tool (for example https://myetherwallet.com)

## Token functionality

* NOIA Token is ERC20 token 

* Token decimal count is *18*

* Tokens can be minted using `mint()` function.

* Tokens cannot be minted to zero address (0x0)

* Tokens can be minted only by token contract owner.

* Maximum token amount is limited to *1 000 000 000* tokens

* Token supports smart-contract notification when tokens are transfered to smart-contract address. Subscription to notifications is performed by calling `register()` function on token contract. To unsubscribe from notifications smart-contract must call `unregister()` function on token contract. Smart-contract must implement `ITokenReceiver` interface to receive notifications.

* Token burning is enabled only after all *1 000 000 000* tokens are minted

* Token burning can only be performed by `burnAddress` account which can be set using `setBurnAddress()` function

* `setBurnAddress()` can be called only by token contract owner

* Token supports token recovery if somebody, accidentially, transfers tokens to the token contract address. Owner can call `recoverTokens(ERC20Basic token, address to, uint256 amount)` function where:
  * `token` - token contract address
  * `to` - the address where tokens will be transfer
  * `amount` - amount of tokens to recover