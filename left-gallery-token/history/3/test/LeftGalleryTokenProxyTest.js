const truffleAssert = require('truffle-assertions');
const Token = artifacts.require("Token");
const SafeMath = artifacts.require("SafeMath");
const AddressUtils = artifacts.require("AddressUtils");
const ERC721BasicToken = artifacts.require("ERC721BasicToken");
const Ownable = artifacts.require("Ownable");
const LeftGalleryToken = artifacts.require("LeftGalleryToken");
const SupportsInterfaceWithLookup = artifacts.require("openzeppelin-solidity/contracts/introspection/SupportsInterfaceWithLookup.sol");
const ERC721Token = artifacts.require("openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol");
const ProxySafeMath = artifacts.require("ProxySafeMath");
const ProxyAddressUtils = artifacts.require("ProxyAddressUtils");
const ProxyERC721BasicToken = artifacts.require("ProxyERC721BasicToken");
const ProxyLeftGalleryToken = artifacts.require("ProxyLeftGalleryToken");

contract("contractProxyLeftGalleryToken",(accounts)=>{
    let contractProxyLeftGalleryToken = null;
  let trace = false;
  let contractSupportsInterfaceWithLookup = null;
  let contractERC721Token = null;
  let contractSafeMath = null;
  let contractAddressUtils = null;
  let contractERC721BasicToken = null;
  let contractLeftGalleryToken = null;
  let contractToken = null;
  let contractOwnable = null;
  beforeEach(async () => {
    contractSupportsInterfaceWithLookup = await SupportsInterfaceWithLookup.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: SupportsInterfaceWithLookup.new({from:accounts[0]}');
    contractERC721Token = await ERC721Token.new("monaco mix by rita vitorelli and harm van den dorpel, 2016, 100 editions","lgt",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("monaco mix by rita vitorelli and harm van den dorpel, 2016, 100 editions","lgt",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("lgab","54vkbs",2014223716,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("lgab","54vkbs",2014223716,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
      contractProxyLeftGalleryToken = await ProxyLeftGalleryToken.new({ from: accounts[0] });
});
  
  it('Should execute test_setTokenURI(uint256,string)', async () => {
    let result = await contractProxyLeftGalleryToken.test_setTokenURI(4038714809, "superuser",{from: accounts[0]});
  });
  it('Should execute testaddTokenTo(address,uint256)', async () => {
    let result = await contractProxyLeftGalleryToken.testaddTokenTo(accounts[4], 1331007097,{from: accounts[0]});
  });
  it('Should execute testremoveTokenFrom(address,uint256)', async () => {
    let result = await contractProxyLeftGalleryToken.testremoveTokenFrom(accounts[6], 4038714810,{from: accounts[0]});
  });
  it('Should execute test_mint(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyLeftGalleryToken.test_mint(accounts[7], 1331007096,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyLeftGalleryToken.test_mint("0x0000000000000000000000000000000000000000", 1331007096,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burn(address,uint256)', async () => {
    let result = await contractProxyLeftGalleryToken.test_burn(accounts[2], 26,{from: accounts[0]});
  });
});
