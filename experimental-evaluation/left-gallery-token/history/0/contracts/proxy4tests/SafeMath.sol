import "../works/FamilyMaker.sol";

contract ProxySafeMath  {

      using SafeMath for uint256;

   function testmul(uint256  a, uint256  b) public pure returns (uint256 ){
    return a.mul(b);
   }

   function testdiv(uint256  a, uint256  b) public pure returns (uint256 ){
    return a.div(b);
   }

   function testsub(uint256  a, uint256  b) public pure returns (uint256 ){
    return a.sub(b);
   }

   function testadd(uint256  a, uint256  b) public pure returns (uint256 ){
    return a.add(b);
   }


}