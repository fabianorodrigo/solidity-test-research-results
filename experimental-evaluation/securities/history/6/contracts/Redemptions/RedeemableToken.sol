pragma solidity 0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract RedeemableToken is ERC20, Ownable {
    using SafeMath for uint256;

    // The address of the redemption contract that should be able to alter balances
    address redemption;

    // A modifier to ensure redemptions can only occur by instruction of a redemption contract or the token owner
    modifier onlyRedemptionOrOwner {
        require(msg.sender == redemption || msg.sender == owner(), "Only redemption or owner contract can call this function");
        _;
    }

	/**
	* @dev Function to provide the address of a redemption contract.
	* @param _redemption The redemption contract's address.
	*/
    function setRedemption(address _redemption) external onlyOwner {
        require(_redemption != address(0), "Redemption must not have 0 address");
        redemption = _redemption;
    }

	/**
	* @dev Function to redeem all tokens from an address.
	* @param _holder The address from which to redeem all tokens.
	*/
    function redeemAllTokens(address _holder) external onlyRedemptionOrOwner {
        uint256 balance = balanceOf(_holder);
        require(balance > 0, "Holder has no tokens");
        _transfer(_holder, owner(), balance);
    }

	/**
	* @dev Function to redeem a specified number of tokens from an address.
	* @param _holder The address from which to redeem tokens.
    * @param _number The number of tokens to redeem.
	*/
    function redeemPartialTokens(address _holder, uint256 _number) external onlyRedemptionOrOwner {
        require(balanceOf(_holder) >= _number, "Holder does not own sufficient tokens");
        _transfer(_holder, owner(), _number);
    }

}
