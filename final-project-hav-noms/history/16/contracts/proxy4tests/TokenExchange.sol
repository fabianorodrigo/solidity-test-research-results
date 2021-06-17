pragma experimental ABIEncoderV2;
import "../TokenExchange.sol";

contract ProxyTokenExchange  is TokenExchange  {

       function testremoveTradeListing(uint  listingID) public  {
    removeTradeListing(listingID);
   }


}