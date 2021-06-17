import "../works/FamilyMaker.sol";

contract ProxyAddressUtils  {

      using AddressUtils for address;

   function testisContract(address  addr) public view returns (bool ){
    return addr.isContract();
   }


}