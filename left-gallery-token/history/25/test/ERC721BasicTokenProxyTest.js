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

contract("contractProxyERC721BasicToken",(accounts)=>{
    let contractProxyERC721BasicToken = null;
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
    contractERC721Token = await ERC721Token.new("lgbmocr","lgtumpin",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("lgbmocr","lgtumpin",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("lgt","left gallery token",1532892063,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("lgt","left gallery token",1532892063,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
      contractProxyERC721BasicToken = await ProxyERC721BasicToken.new({ from: accounts[0] });
});
  
  it('Should execute testisApprovedOrOwner(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testisApprovedOrOwner(accounts[9], 31,{from: accounts[0]});
  });
  it('Should execute test_mint(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.test_mint(accounts[3], 65,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721BasicToken.test_mint("0x0000000000000000000000000000000000000000", 65,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burn(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.test_burn(accounts[1], 2,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[1], 1532892063,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[1], 1532892062,{from: accounts[0]});
  });
  it('Should execute testaddTokenTo(address,uint256) WHEN tokenOwner==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testaddTokenTo(accounts[2], 29,{from: accounts[0]});
  });
  it('Should execute testremoveTokenFrom(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testremoveTokenFrom(accounts[8], 2014223714,{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[2], accounts[4], 101, [198,226,15,144,193,56,36,157,171,231,69,194,107,109,157,242,78,80,193,228,115,22,191,110,40,232,126,38,214,102,176,209],{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[0], accounts[7], 97, [147,32,31,102,218,237,210,114,220,63,183,166,87,251,28,32,99,85,127,109,103,54,110,126,67,152,165,40,7,56,199,212],{from: accounts[0]});
  });
});
