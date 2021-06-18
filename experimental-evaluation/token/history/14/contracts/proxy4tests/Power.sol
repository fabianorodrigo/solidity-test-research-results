import "../Power.sol";

contract ProxyPower  is Power  {

      constructor() public  {}
   function testpower(uint256  _baseN, uint256  _baseD, uint32  _expN, uint32  _expD) public view returns (uint256 , uint8 ){
    return power(_baseN,_baseD,_expN,_expD);
   }

   function testln(uint256  _numerator, uint256  _denominator) public view returns (uint256 ){
    return ln(_numerator,_denominator);
   }

   function testfloorLog2(uint256  _n) public view returns (uint8 ){
    return floorLog2(_n);
   }

   function testfindPositionInMaxExpArray(uint256  _x) public view returns (uint8 ){
    return findPositionInMaxExpArray(_x);
   }

   function testfixedExp(uint256  _x, uint8  _precision) public view returns (uint256 ){
    return fixedExp(_x,_precision);
   }


}