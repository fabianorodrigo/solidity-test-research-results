pragma solidity 0.5.0;

import "../Redemptions/RedeemableToken.sol";

contract RedeemableTokenMock is RedeemableToken {

    constructor(address _initialAccount, uint256 _initialBalance) public {
        _mint(_initialAccount, _initialBalance);
    }

}