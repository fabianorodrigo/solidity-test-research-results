import "../BaseSwaps.sol";

contract ProxyBaseSwaps  is BaseSwaps  {

      constructor(address   _owner,address   _baseAddress,address   _quoteAddress,uint   _baseLimit,uint   _quoteLimit,uint   _expirationTimestamp) public BaseSwaps(_owner,_baseAddress,_quoteAddress,_baseLimit,_quoteLimit,_expirationTimestamp) {}
  address[] varArrayaddress;
   function test_refund(address  _token) public  {
    _refund(_token);
   }

   function test_swap() public  {
    _swap();
   }

   function test_distribute(address  _aSide, address  _bSide) public  {
    _distribute(_aSide,_bSide);
   }

   function test_sendTokens(address  _token, address  _to, uint  _amount) public  {
    _sendTokens(_token,_to,_amount);
   }

   function test_removeInvestor(address[] memory _array, address  _investor) public  {
    _removeInvestor(varArrayaddress,_investor);
   }

   function test_depositEther(uint  _amount) public  {
    _depositEther(_amount);
   }

   function test_depositTokens(address  _token, uint  _amount) public  {
    _depositTokens(_token,_amount);
   }

   function test_deposit(address  _token, address  _from, uint  _amount) public  {
    _deposit(_token,_from,_amount);
   }

   function test_isInvestor(address  _token, address  _who) public view returns (bool ){
    return _isInvestor(_token,_who);
   }


}