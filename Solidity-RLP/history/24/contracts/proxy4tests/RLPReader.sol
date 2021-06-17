pragma experimental ABIEncoderV2;
import "../RLPReader.sol";

contract ProxyRLPReader  {

      using RLPReader for bytes;
  using RLPReader for RLPReader.RLPItem;

   function testtoRlpItem(bytes memory item) public pure returns (RLPReader.RLPItem memory){
    return item.toRlpItem();
   }

   function testrlpLen(RLPReader.RLPItem memory item) public pure returns (uint ){
    return item.rlpLen();
   }

   function testpayloadLen(RLPReader.RLPItem memory item) public pure returns (uint ){
    return item.payloadLen();
   }

   function testtoList(RLPReader.RLPItem memory item) public pure returns (RLPReader.RLPItem[] memory){
    return item.toList();
   }

   function testisList(RLPReader.RLPItem memory item) public pure returns (bool ){
    return item.isList();
   }

   function testtoRlpBytes(RLPReader.RLPItem memory item) public pure returns (bytes memory){
    return item.toRlpBytes();
   }

   function testtoBoolean(RLPReader.RLPItem memory item) public pure returns (bool ){
    return item.toBoolean();
   }

   function testtoAddress(RLPReader.RLPItem memory item) public pure returns (address ){
    return item.toAddress();
   }

   function testtoUint(RLPReader.RLPItem memory item) public pure returns (uint ){
    return item.toUint();
   }

   function testtoUintStrict(RLPReader.RLPItem memory item) public pure returns (uint ){
    return item.toUintStrict();
   }

   function testtoBytes(RLPReader.RLPItem memory item) public pure returns (bytes memory){
    return item.toBytes();
   }


}