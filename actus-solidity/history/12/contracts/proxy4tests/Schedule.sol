pragma experimental ABIEncoderV2;
import "../Core/Schedule.sol";

contract ProxySchedule  is Schedule  {

       function testgetNextCycleDate(Definitions.IPS memory cycle, uint256  cycleStart, uint256  cycleIndex) public pure returns (uint256 ){
    return getNextCycleDate(cycle,cycleStart,cycleIndex);
   }

   function testcomputeDatesFromCycleSegment(uint256  cycleStart, uint256  cycleEnd, Definitions.IPS memory cycle, EndOfMonthConvention  eomc, bool  addEndTime, uint256  segmentStart, uint256  segmentEnd) public pure returns (uint256[MAX_CYCLE_SIZE] memory){
    return computeDatesFromCycleSegment(cycleStart,cycleEnd,cycle,eomc,addEndTime,segmentStart,segmentEnd);
   }


}