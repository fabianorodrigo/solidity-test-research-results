pragma experimental ABIEncoderV2;
import "../Address.sol";

contract ProxyAddress  {

      using Address for address;

   function testisContract(address  account) public view returns (bool ){
    return account.isContract();
   }


}