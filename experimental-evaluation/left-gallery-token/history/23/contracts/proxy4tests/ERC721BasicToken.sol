import "../works/FamilyMaker.sol";

contract ProxyERC721BasicToken  is ERC721BasicToken  {

       function testisApprovedOrOwner(address  _spender, uint256  _tokenId) public view returns (bool ){
    return isApprovedOrOwner(_spender,_tokenId);
   }

   function test_mint(address  _to, uint256  _tokenId) public  {
    _mint(_to,_tokenId);
   }

   function test_burn(address  _owner, uint256  _tokenId) public  {
    _burn(_owner,_tokenId);
   }

   function testclearApproval(address  _owner, uint256  _tokenId) public  {
    clearApproval(_owner,_tokenId);
   }

   function testaddTokenTo(address  _to, uint256  _tokenId) public  {
    addTokenTo(_to,_tokenId);
   }

   function testremoveTokenFrom(address  _from, uint256  _tokenId) public  {
    removeTokenFrom(_from,_tokenId);
   }

   function testcheckAndCallSafeTransfer(address  _from, address  _to, uint256  _tokenId, bytes  _data) public  returns (bool ){
    return checkAndCallSafeTransfer(_from,_to,_tokenId,_data);
   }


}