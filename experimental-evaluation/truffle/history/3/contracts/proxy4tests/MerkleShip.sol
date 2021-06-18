pragma experimental ABIEncoderV2;
import "../MerkleShip.sol";

contract ProxyMerkleShip  is MerkleShip  {

       function test_reveal(uint32  _id, bytes32[6] memory _proof, string memory _leafData) public  {
    _reveal(_id,_proof,_leafData);
   }

   function test_checkForVictoryByHit(uint32  _id) public  {
    _checkForVictoryByHit(_id);
   }

   function test_zeroOutStorage(uint32  _id) public  {
    _zeroOutStorage(_id);
   }

   function test_checkShipCount(string[64] memory _data) public view returns (bool ){
    return _checkShipCount(_data);
   }

   function test_checkShipLength(string[64] memory _data) public view returns (bool ){
    return _checkShipLength(_data);
   }

   function test_hashEach(string[64] memory _data) public pure returns (bytes32[] memory){
    return _hashEach(_data);
   }

   function test_sortArray(bytes32[] memory _data) public pure returns (bytes32[] memory){
    return _sortArray(_data);
   }

   function test_quickSort(bytes32[] memory _arr, int  _left, int  _right) public pure {
    _quickSort(_arr,_left,_right);
   }

   function test_computeMerkleTree(bytes32[] memory _data) public pure returns (bytes32 ){
    return _computeMerkleTree(_data);
   }

   function test_verifyMerkleProof(bytes32[6] memory _proof, bytes32  _root, string memory _leafData) public pure returns (bool ){
    return _verifyMerkleProof(_proof,_root,_leafData);
   }

   function test_isCoordinateValid(uint8  _x, uint8  _y) public view returns (bool ){
    return _isCoordinateValid(_x,_y);
   }

   function test_coordinateToIndex(uint8  _x, uint8  _y) public view returns (uint8 ){
    return _coordinateToIndex(_x,_y);
   }

   function test_subString(string memory _inputStr, uint256  _index) public pure returns (bytes1 ){
    return _subString(_inputStr,_index);
   }

   function test_isStringValid(string memory _inputStr) public pure returns (bool ){
    return _isStringValid(_inputStr);
   }


}