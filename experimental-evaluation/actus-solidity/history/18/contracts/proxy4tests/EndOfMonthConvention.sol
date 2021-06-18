pragma experimental ABIEncoderV2;
import "../Core/Conventions/EndOfMonthConvention.sol";

contract ProxyEndOfMonthConvention  is EndOfMonthConvention  {

       function testshiftEndOfMonth(uint256  timestamp) public pure returns (uint256 ){
    return shiftEndOfMonth(timestamp);
   }

   function testshiftSameDay(uint256  timestamp) public pure returns (uint256 ){
    return shiftSameDay(timestamp);
   }


}