pragma solidity 0.5.10;

import "./ITokenReceiver.sol";
import "./NOIAToken.sol";
/**
    This contract is only an example of automatic burner contract which can perform actions before burning tokens 
 */
contract CanonicalBurner is ITokenReceiver {

    address public token;

    constructor(address _token) public {
        token = _token;
        NOIAToken(token).register();
    }

    function tokensReceived(address, address, uint256 amount) external {
        require(msg.sender == token, "Only NOIA Token can notify");
        NOIAToken(token).burn(amount);
    }
}