import "../Redemptions/FixedPriceTender.sol";

contract ProxyFixedPriceTender  is FixedPriceTender  {

      constructor(uint256   _paymentPerSecurity,IERC20   _paymentToken,IERC20   _securityToken,address   _issuer,uint256   _totalToRepurchase,uint256   _offerEndTime) public FixedPriceTender(_paymentPerSecurity,_paymentToken,_securityToken,_issuer,_totalToRepurchase,_offerEndTime) {}
   function testrepurchaseTender() public  {
    repurchaseTender();
   }

   function testreturnTender() public  {
    returnTender();
   }


}