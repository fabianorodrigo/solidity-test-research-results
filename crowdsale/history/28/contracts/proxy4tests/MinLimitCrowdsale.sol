import "../MinLimitCrowdsale.sol";

contract ProxyMinLimitCrowdsale  is Crowdsale,MinLimitCrowdsale  {

      constructor(uint256   rate,address payable  wallet,IERC20   token,uint256   minLimit) public Crowdsale(rate,wallet,token) MinLimitCrowdsale(minLimit) {}
   function test_preValidatePurchase(address  beneficiary, uint256  weiAmount) public view {
    _preValidatePurchase(beneficiary,weiAmount);
   }


}