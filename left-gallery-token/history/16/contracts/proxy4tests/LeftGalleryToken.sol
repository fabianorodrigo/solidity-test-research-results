import "../works/FamilyMaker.sol";

contract ProxyLeftGalleryToken  is LeftGalleryToken  {

       function test_setTokenURI(uint256  _tokenId, string  _uri) public  {
    _setTokenURI(_tokenId,_uri);
   }

   function testaddTokenTo(address  _to, uint256  _tokenId) public  {
    addTokenTo(_to,_tokenId);
   }

   function testremoveTokenFrom(address  _from, uint256  _tokenId) public  {
    removeTokenFrom(_from,_tokenId);
   }

   function test_mint(address  _to, uint256  _tokenId) public  {
    _mint(_to,_tokenId);
   }

   function test_burn(address  _owner, uint256  _tokenId) public  {
    _burn(_owner,_tokenId);
   }


}