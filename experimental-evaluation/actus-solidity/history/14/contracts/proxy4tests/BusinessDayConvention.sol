pragma experimental ABIEncoderV2;
import "../Core/Conventions/BusinessDayConvention.sol";

contract ProxyBusinessDayConvention  is BusinessDayConvention  {

       function testshiftCalcTime(uint256  timestamp, BusinessDayConvention  convention, Calendar  calendar) public pure returns (uint256 ){
    return shiftCalcTime(timestamp,convention,calendar);
   }

   function testshiftEventTime(uint256  timestamp, BusinessDayConvention  convention, Calendar  calendar) public pure returns (uint256 ){
    return shiftEventTime(timestamp,convention,calendar);
   }

   function testgetClosestBusinessDaySameDayOrFollowing(uint256  timestamp, Calendar  calendar) public pure returns (uint256 ){
    return getClosestBusinessDaySameDayOrFollowing(timestamp,calendar);
   }

   function testgetClosestBusinessDaySameDayOrPreceeding(uint256  timestamp, Calendar  calendar) public pure returns (uint256 ){
    return getClosestBusinessDaySameDayOrPreceeding(timestamp,calendar);
   }


}