pragma solidity ^0.5.4;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "./MinLimitCrowdsale.sol";


contract AtlantisCrowdsale is
    Ownable,
    CappedCrowdsale,
    TimedCrowdsale,
    MinLimitCrowdsale
{
    constructor(
        uint256 tokensPerEth,   // 10000
        address payable wallet,
        IERC20 token,
        uint256 hardcap,        // 1000 ETH
        uint256 openingTime,
        uint256 closingTime,
        uint256 minLimit        // 1 ETH
    )
        public
        Crowdsale(tokensPerEth, wallet, token)
        CappedCrowdsale(hardcap)
        TimedCrowdsale(openingTime, closingTime)
        MinLimitCrowdsale(minLimit)
    {
    }

    function offchainSale(address investor, uint256 tokenAmount) public onlyOwner {
        _deliverTokens(investor, tokenAmount);
    }
}
