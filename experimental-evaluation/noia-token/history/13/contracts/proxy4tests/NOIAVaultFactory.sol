import "../NOIAVaultFactory.sol";

contract ProxyNOIAVaultFactory  is NOIAVaultFactory  {

      constructor(address   _noiaVaultAddress,address   _noiaTokenAddress) public NOIAVaultFactory(_noiaVaultAddress,_noiaTokenAddress) {}
   function testcreateClone(address  target) public  returns (address ){
    return createClone(target);
   }


}