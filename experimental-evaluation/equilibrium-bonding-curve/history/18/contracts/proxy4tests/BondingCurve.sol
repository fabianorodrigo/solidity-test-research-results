import "../BondingCurve.sol";

contract ProxyBondingCurve  is BondingCurve  {

      constructor(address   _tokenAddress) public BondingCurve(_tokenAddress) {}
   function testfindNextHolder() public view returns (address ){
    return findNextHolder();
   }


}