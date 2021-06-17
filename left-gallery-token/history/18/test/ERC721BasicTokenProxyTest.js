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
    contractERC721Token = await ERC721Token.new("lgab","superuser",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("lgab","superuser",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("bedroom cuboro stacks by sean lockwood, 2016, 100 editions","bouncer",1331007098,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("bedroom cuboro stacks by sean lockwood, 2016, 100 editions","bouncer",1331007098,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
      contractProxyERC721BasicToken = await ProxyERC721BasicToken.new({ from: accounts[0] });
});
  
  it('Should execute testisApprovedOrOwner(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testisApprovedOrOwner(accounts[0], 5,{from: accounts[0]});
  });
  it('Should execute test_mint(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.test_mint(accounts[7], 29,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721BasicToken.test_mint("0x0000000000000000000000000000000000000000", 29,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burn(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.test_burn(accounts[5], 4,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[9], 1532892064,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[9], 100,{from: accounts[0]});
  });
  it('Should execute testaddTokenTo(address,uint256) WHEN tokenOwner==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testaddTokenTo(accounts[7], 97,{from: accounts[0]});
  });
  it('Should execute testremoveTokenFrom(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testremoveTokenFrom(accounts[8], 2014223716,{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[3], accounts[6], 66, [117,88,239,35,253,2,168,194,63,86,220,32,150,128,164,15,168,77,194,26,137,76,207,112,106,183,24,16,254,42,185,42],{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[7], accounts[5], 1331007098, [173,116,167,197,215,54,249,25,204,23,174,251,86,252,142,248,157,100,167,165,178,68,16,98,49,19,215,210,247,231,119,248],{from: accounts[0]});
  });
});
