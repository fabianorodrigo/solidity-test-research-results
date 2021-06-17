pragma experimental ABIEncoderV2;
import "../Verifier.sol";

contract ProxyBN256G2  {

      using BN256G2 for uint256;

   function testGetFieldModulus() public pure returns (uint256 ){
    return BN256G2.GetFieldModulus();
   }

   function testsubmod(uint256  a, uint256  b, uint256  n) public pure returns (uint256 ){
    return a.submod(b,n);
   }

   function test_FQ2Mul(uint256  xx, uint256  xy, uint256  yx, uint256  yy) public pure returns (uint256 , uint256 ){
    return xx._FQ2Mul(xy,yx,yy);
   }

   function test_FQ2Muc(uint256  xx, uint256  xy, uint256  c) public pure returns (uint256 , uint256 ){
    return xx._FQ2Muc(xy,c);
   }

   function test_FQ2Add(uint256  xx, uint256  xy, uint256  yx, uint256  yy) public pure returns (uint256 , uint256 ){
    return xx._FQ2Add(xy,yx,yy);
   }

   function test_FQ2Sub(uint256  xx, uint256  xy, uint256  yx, uint256  yy) public pure returns (uint256 , uint256 ){
    return xx._FQ2Sub(xy,yx,yy);
   }

   function test_FQ2Div(uint256  xx, uint256  xy, uint256  yx, uint256  yy) public pure returns (uint256 , uint256 ){
    return xx._FQ2Div(xy,yx,yy);
   }

   function test_FQ2Inv(uint256  x, uint256  y) public pure returns (uint256 , uint256 ){
    return x._FQ2Inv(y);
   }

   function test_isOnCurve(uint256  xx, uint256  xy, uint256  yx, uint256  yy) public pure returns (bool ){
    return xx._isOnCurve(xy,yx,yy);
   }

   function test_modInv(uint256  a, uint256  n) public pure returns (uint256 ){
    return a._modInv(n);
   }

   function test_ECTwistMulJacobian(uint256  d, uint256  pt1xx, uint256  pt1xy, uint256  pt1yx, uint256  pt1yy, uint256  pt1zx, uint256  pt1zy) public pure returns (uint256[6] memory){
    return d._ECTwistMulJacobian(pt1xx,pt1xy,pt1yx,pt1yy,pt1zx,pt1zy);
   }


}