pragma solidity ^0.5.4;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";


contract MinLimitCrowdsale is Crowdsale {
    uint256 private _minLimit;

    constructor(uint256 minLimit) public {
        _minLimit = minLimit;
    }

    function minLimit() public view returns (uint256) {
        return _minLimit;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(weiAmount >= _minLimit);
    }
}
