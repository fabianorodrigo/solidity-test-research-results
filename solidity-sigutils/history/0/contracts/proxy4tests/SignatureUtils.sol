import "../SignatureUtils.sol";

contract ProxySignatureUtils  {

      using SignatureUtils for bytes32;
  using SignatureUtils for bytes;
  using SignatureUtils for uint;

   function testtoEthBytes32SignedMessageHash(bytes32  _msg) public pure returns (bytes32 ){
    return _msg.toEthBytes32SignedMessageHash();
   }

   function testtoEthPersonalSignedMessageHash(bytes  _msg) public pure returns (bytes32 ){
    return _msg.toEthPersonalSignedMessageHash();
   }

   function testuintToString(uint  v) public pure returns (string ){
    return v.uintToString();
   }

   function testparseSignature(bytes  _signatures, uint  _pos) public pure returns (uint8 , bytes32 , bytes32 ){
    return _signatures.parseSignature(_pos);
   }

   function testcountSignatures(bytes  _signatures) public pure returns (uint ){
    return _signatures.countSignatures();
   }

   function testrecoverAddress(bytes32  _hash, bytes  _signatures, uint  _pos) public pure returns (address ){
    return _hash.recoverAddress(_signatures,_pos);
   }

   function testrecoverAddresses(bytes32  _hash, bytes  _signatures) public pure returns (address[] ){
    return _hash.recoverAddresses(_signatures);
   }


}