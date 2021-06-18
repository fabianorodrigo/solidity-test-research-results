import "../Swaps.sol";

contract ProxySwaps  is Swaps  {

      address[] varArrayaddress;
   function test_allBrokersPercent(address  _side, bytes32  _id) public view returns (uint ){
    return _allBrokersPercent(_side,_id);
   }

   function test_swap(bytes32  _id) public  {
    _swap(_id);
   }

   function test_distribute(bytes32  _id, address  _aSide, address  _bSide) public  {
    _distribute(_id,_aSide,_bSide);
   }

   function test_removeInvestor(address[] memory _array, address  _investor) public  {
    _removeInvestor(varArrayaddress,_investor);
   }

   function test_deposit(bytes32  _id, address  _token, address  _from, uint  _amount) public  {
    _deposit(_id,_token,_from,_amount);
   }

   function test_isInvestor(bytes32  _id, address  _token, address  _who) public view returns (bool ){
    return _isInvestor(_id,_token,_who);
   }


}