import "../Splitter.sol";

contract ProxySplitter  is Splitter  {

      constructor() public  {}
   function testcreatePairHash(address  receiver1, address  receiver2) public pure returns (bytes32 ){
    return createPairHash(receiver1,receiver2);
   }


}