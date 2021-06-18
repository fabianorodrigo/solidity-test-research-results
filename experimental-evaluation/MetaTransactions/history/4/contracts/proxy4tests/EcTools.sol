import "../EcTools.sol";

contract ProxyEcTools  {

      using EcTools for bytes32;

   function testrecover(bytes32  originalMessage, bytes  signedMessage) public pure returns (address ){
    return originalMessage.recover(signedMessage);
   }

   function testtoEthereumSignedMessage(bytes32  _msg) public view returns (bytes32 ){
    return _msg.toEthereumSignedMessage();
   }

   function testprefixedRecover(bytes32  _msg, bytes  sig) public view returns (address ){
    return _msg.prefixedRecover(sig);
   }


}