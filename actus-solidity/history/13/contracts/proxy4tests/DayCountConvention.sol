pragma experimental ABIEncoderV2;
import "../Core/Conventions/DayCountConvention.sol";

contract ProxyDayCountConvention  is DayCountConvention  {

       function testyearFraction(uint256  startTimestamp, uint256  endTimestamp, DayCountConvention  ipdc) public pure returns (int256 ){
    return yearFraction(startTimestamp,endTimestamp,ipdc);
   }

   function testactualActualISDA(uint256  startTime, uint256  endTime) public pure returns (int256 ){
    return actualActualISDA(startTime,endTime);
   }

   function testactualThreeSixty(uint256  startTime, uint256  endTime) public pure returns (int256 ){
    return actualThreeSixty(startTime,endTime);
   }

   function testactualThreeSixtyFive(uint256  startTime, uint256  endTime) public pure returns (int256 ){
    return actualThreeSixtyFive(startTime,endTime);
   }

   function testthirtyEThreeSixty(uint256  startTime, uint256  endTime) public pure returns (int256 ){
    return thirtyEThreeSixty(startTime,endTime);
   }


}