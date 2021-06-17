pragma experimental ABIEncoderV2;
import "../Core/Core.sol";

contract ProxyCore  is Core  {

       function testsignum(int  value) public pure returns (int256 ){
    return signum(value);
   }

   function testgetEpochOffset(EventType  eventType) public pure returns (uint256 ){
    return getEpochOffset(eventType);
   }


}