import "../MathUtils.sol";

contract ProxyMathUtils  {

      using MathUtils for uint256;

   function testvalidPerc(uint256  _amount) public pure returns (bool ){
    return _amount.validPerc();
   }

   function testpercOf0(uint256  _amount, uint256  _fracNum, uint256  _fracDenom) public pure returns (uint256 ){
    return _amount.percOf(_fracNum,_fracDenom);
   }

   function testpercOf1(uint256  _amount, uint256  _fracNum) public pure returns (uint256 ){
    return _amount.percOf(_fracNum);
   }

   function testpercPoints(uint256  _fracNum, uint256  _fracDenom) public pure returns (uint256 ){
    return _fracNum.percPoints(_fracDenom);
   }


}