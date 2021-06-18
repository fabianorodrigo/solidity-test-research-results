pragma experimental ABIEncoderV2;
import "../Core/FloatMath.sol";

contract ProxyFloatMath  {

      using FloatMath for int256;

   function testfloatMult(int256  a, int256  b) public pure returns (int256 ){
    return a.floatMult(b);
   }

   function testfloatDiv(int256  a, int256  b) public pure returns (int256 ){
    return a.floatDiv(b);
   }


}