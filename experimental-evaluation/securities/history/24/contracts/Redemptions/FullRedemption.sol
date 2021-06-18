pragma solidity 0.5.0; 

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./RedeemableToken.sol";

contract FullRedemption is Ownable {
    using SafeMath for uint256;

    IERC20 paymentToken;
    RedeemableToken securityToken;
    address paymentOwner;
    uint256 paymentPerSecurity;

    bool public isSetUp = false;

    modifier contractIsSetUp {
        require(isSetUp, "The setup function has not been called");
        _;
    } 

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
        require(_paymentPerSecurity > 0, "No payment amount provided");

        paymentToken = _paymentToken;
        securityToken = _securityToken;
        paymentOwner = _paymentOwner;
        paymentPerSecurity = _paymentPerSecurity;
    }

    function setup() public {
        require(!isSetUp, "Setup has already happened");
        // Check this contract has access to enough payment tokens.
        uint256 totalPaymentNeeded = securityToken.totalSupply() * paymentPerSecurity;
        require(
            paymentToken.allowance(paymentOwner, address(this)) >= totalPaymentNeeded,
            "Redemption contract does not have access to enough tokens"
        );
        isSetUp = true;
    }

    /**
	* @dev Function to redeem the tokens of a group of security holders.
    * @param _holders A list of addresses of security holders.
    */
    function redeemTokens(address[] memory _holders) public onlyOwner contractIsSetUp {
        require(_holders.length > 0, "Empty array provided");

        // Loops through the list of holders, redeeming their tokens.
        for (uint256 i = 0; i < _holders.length; i++) {
            uint256 balance = securityToken.balanceOf(_holders[i]);

            // Redeem the securities and transfer the payment.
            securityToken.redeemAllTokens(_holders[i]);
            paymentToken.transferFrom(paymentOwner, _holders[i], balance*paymentPerSecurity);
        }
    }

}
