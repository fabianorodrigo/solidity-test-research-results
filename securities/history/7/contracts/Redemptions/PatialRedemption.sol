pragma solidity 0.5.0; 

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./RedeemableToken.sol";

contract PartialRedemption is Ownable {
    using SafeMath for uint256;

    uint256 paymentPerSecurity;
    IERC20 paymentToken;
    RedeemableToken securityToken;
    address paymentOwner;

    /**
	* @dev Constructor to initialize the contract.
    * @param _paymentToken The token to be used as payment.
    * @param _securityToken The security token itself.
    * @param _paymentOwner The address where the payment tokens are stored. 
    * @param _paymentPerSecurity Value to pay per security redeemed.
    */
    constructor (
        IERC20 _paymentToken,
        RedeemableToken _securityToken,
        address _paymentOwner,
        uint256 _paymentPerSecurity
    ) public {
        require(address(_paymentToken) != address(0), "Payment token contract required");
        require(address(_securityToken) != address(0), "Security token contract required");
        require(address(_paymentOwner) != address(0), "Payment owner address required");
        require(_paymentPerSecurity > 0, "No payment per security provided");

        paymentToken = _paymentToken;
        securityToken = _securityToken;
        paymentOwner = _paymentOwner;
        paymentPerSecurity = _paymentPerSecurity;
    }

    /**
	* @dev Function to partially redeem the tokens of a group of security holders.
	* @dev _holders[i] is to have _numberOfTokens[i] tokens redeemed.
    * @param _holders A list of addresses of security holders.
    * @param _numberOfTokens The number of tokens to redeem from each holder in turn.
    */
    function redeemTokens(address[] memory _holders, uint256[] memory _numberOfTokens) public onlyOwner {
        require(_holders.length == _numberOfTokens.length, "The arrays must be the same length");
        require(_holders.length > 0, "The arrays must not be empty");

        // Loops through the list of holders, redeeming their tokens.
        for (uint256 i = 0; i < _holders.length; i++) {
            securityToken.redeemPartialTokens(_holders[i], _numberOfTokens[i]);
            paymentToken.transferFrom(paymentOwner, _holders[i], _numberOfTokens[i]*paymentPerSecurity);
        }
    }

}
