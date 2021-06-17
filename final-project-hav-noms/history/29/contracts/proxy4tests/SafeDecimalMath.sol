pragma experimental ABIEncoderV2;
import "../SafeDecimalMath.sol";

contract ProxySafeDecimalMath  {

      using SafeDecimalMath for uint;

   function testunit() public pure returns (uint ){
    return SafeDecimalMath.unit();
   }

   function testpreciseUnit() public pure returns (uint ){
    return SafeDecimalMath.preciseUnit();
   }

   function testmultiplyDecimal(uint  x, uint  y) public pure returns (uint ){
    return x.multiplyDecimal(y);
   }

   function testmultiplyDecimalRoundPrecise(uint  x, uint  y) public pure returns (uint ){
    return x.multiplyDecimalRoundPrecise(y);
   }

   function testmultiplyDecimalRound(uint  x, uint  y) public pure returns (uint ){
    return x.multiplyDecimalRound(y);
   }

   function testdivideDecimal(uint  x, uint  y) public pure returns (uint ){
    return x.divideDecimal(y);
   }

   function testdivideDecimalRound(uint  x, uint  y) public pure returns (uint ){
    return x.divideDecimalRound(y);
   }

   function testdivideDecimalRoundPrecise(uint  x, uint  y) public pure returns (uint ){
    return x.divideDecimalRoundPrecise(y);
   }

   function testdecimalToPreciseDecimal(uint  i) public pure returns (uint ){
    return i.decimalToPreciseDecimal();
   }

   function testpreciseDecimalToDecimal(uint  i) public pure returns (uint ){
    return i.preciseDecimalToDecimal();
   }


}