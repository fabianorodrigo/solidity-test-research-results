pragma experimental ABIEncoderV2;
import "../Oraclize.sol";

contract ProxyCBOR  {

      using CBOR for Buffer.buffer;

   function testencodeUInt(Buffer.buffer memory _buf, uint  _value) public pure {
    _buf.encodeUInt(_value);
   }

   function testencodeInt(Buffer.buffer memory _buf, int  _value) public pure {
    _buf.encodeInt(_value);
   }

   function testencodeBytes(Buffer.buffer memory _buf, bytes memory _value) public pure {
    _buf.encodeBytes(_value);
   }

   function testencodeString(Buffer.buffer memory _buf, string memory _value) public pure {
    _buf.encodeString(_value);
   }

   function teststartArray(Buffer.buffer memory _buf) public pure {
    _buf.startArray();
   }

   function teststartMap(Buffer.buffer memory _buf) public pure {
    _buf.startMap();
   }

   function testendSequence(Buffer.buffer memory _buf) public pure {
    _buf.endSequence();
   }


}