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
    contractERC721Token = await ERC721Token.new("bouncer","lgt",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("bouncer","lgt",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("lgbcs","lgel",2014223714,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("lgbcs","lgel",2014223714,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
      contractProxyERC721BasicToken = await ProxyERC721BasicToken.new({ from: accounts[0] });
});
  
  it('Should execute testisApprovedOrOwner(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testisApprovedOrOwner(accounts[9], 1532892062,{from: accounts[0]});
  });
  it('Should execute test_mint(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.test_mint(accounts[2], 4038714810,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721BasicToken.test_mint("0x0000000000000000000000000000000000000000", 4038714810,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burn(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.test_burn(accounts[4], 101,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[9], 33,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[0], 2,{from: accounts[0]});
  });
  it('Should execute testaddTokenTo(address,uint256) WHEN tokenOwner==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testaddTokenTo(accounts[5], 65,{from: accounts[0]});
  });
  it('Should execute testremoveTokenFrom(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testremoveTokenFrom(accounts[5], 66,{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[2], accounts[9], 26, [103,166,16,245,75,178,178,28,94,218,117,77,199,180,34,47,137,5,24,49,105,184,112,113,4,164,201,126,81,108,167,11],{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[7], accounts[7], 1532892062, [155,37,173,219,194,9,165,185,101,171,126,74,97,103,77,132,114,54,148,55,72,52,17,67,41,169,17,127,51,38,247,15],{from: accounts[0]});
  });
});
