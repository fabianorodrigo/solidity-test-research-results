import "../Debuggable.sol";

contract ProxyDebuggable  {

      using Debuggable for string;
  using Debuggable for bytes32;
  using Debuggable for uint256;
  using Debuggable for address;

   function testdebug0(string  value) public  returns (string ){
    return value.debug();
   }

   function testdebug1(bytes32  value) public  returns (bytes32 ){
    return value.debug();
   }

   function testdebug2(uint256  value) public  returns (uint256 ){
    return value.debug();
   }

   function testdebug3(address  value) public  returns (address ){
    return value.debug();
   }

   function testdebugRevert0() public pure {
    Debuggable.debugRevert();
   }

   function testdebugRevert1(string  message) public pure {
    message.debugRevert();
   }

   function testdebugNoop() public  {
    Debuggable.debugNoop();
   }

   function testdebugNoopConstant() public pure {
    Debuggable.debugNoopConstant();
   }


}