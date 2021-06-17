import "../NOIAToken.sol";

contract ProxyNOIAToken  is NOIAToken  {

       function test_postTransfer(address  from, address  to, uint256  value) public  {
    _postTransfer(from,to,value);
   }

   function test_burn(address  account, uint256  value) public  {
    _burn(account,value);
   }


}