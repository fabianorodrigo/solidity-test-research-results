pragma experimental ABIEncoderV2;
import "../Core/Utils.sol";

contract ProxyUtils  is Utils  {

       function testgetTimestampPlusPeriod(Definitions.IPS memory cycle, uint256  timestamp) public pure returns (uint256 ){
    return getTimestampPlusPeriod(cycle,timestamp);
   }

   function testsortProtoEventSchedule(Definitions.ProtoEvent[MAX_EVENT_SCHEDULE_SIZE] memory protoEventSchedule, uint256  numberOfProtoEvents) public pure {
    sortProtoEventSchedule(protoEventSchedule,numberOfProtoEvents);
   }

   function testquickSortProtoEventSchedule(Definitions.ProtoEvent[MAX_EVENT_SCHEDULE_SIZE] memory protoEventSchedule, uint  left, uint  right) public pure {
    quickSortProtoEventSchedule(protoEventSchedule,left,right);
   }

   function testisInPeriod(uint256  timestamp, uint256  startTimestamp, uint256  endTimestamp) public pure returns (bool ){
    return isInPeriod(timestamp,startTimestamp,endTimestamp);
   }


}