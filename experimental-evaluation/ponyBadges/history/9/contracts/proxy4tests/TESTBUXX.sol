import "../TESTBUXX.sol";

contract ProxyTESTBUXX  is TESTBUXX  {

      constructor(uint256   initialSupply,string   tokenName,uint8   decimalUnits,string   tokenSymbol) public TESTBUXX(initialSupply,tokenName,decimalUnits,tokenSymbol) {}
   function test_transfer(address  from, address  to, uint  value, bytes  data) public  {
    _transfer(from,to,value,data);
   }


}