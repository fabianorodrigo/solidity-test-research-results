pragma experimental ABIEncoderV2;
import "../Oraclize.sol";

contract ProxyBuffer  {

      using Buffer for Buffer.buffer;

   function testinit(Buffer.buffer memory _buf, uint  _capacity) public pure {
    _buf.init(_capacity);
   }

   function testappend0(Buffer.buffer memory _buf, bytes memory _data) public pure returns (Buffer.buffer memory){
    return _buf.append(_data);
   }

   function testappend1(Buffer.buffer memory _buf, uint8  _data) public pure {
    _buf.append(_data);
   }

   function testappendInt(Buffer.buffer memory _buf, uint  _data, uint  _len) public pure returns (Buffer.buffer memory){
    return _buf.appendInt(_data,_len);
   }


}