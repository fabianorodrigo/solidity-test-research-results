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
    contractERC721Token = await ERC721Token.new("lgu","undelivered (lite) by shawné michaelain holloway, 2016, 4 editions",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("lgu","undelivered (lite) by shawné michaelain holloway, 2016, 4 editions",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("superuser","",1532892062,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("superuser","",1532892062,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
      contractProxyERC721BasicToken = await ProxyERC721BasicToken.new({ from: accounts[0] });
});
  
  it('Should execute testisApprovedOrOwner(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testisApprovedOrOwner(accounts[8], 1331007096,{from: accounts[0]});
  });
  it('Should execute test_mint(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.test_mint(accounts[9], 4038714809,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721BasicToken.test_mint("0x0000000000000000000000000000000000000000", 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burn(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.test_burn(accounts[9], 2,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[5], 27,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[3], 1331007098,{from: accounts[0]});
  });
  it('Should execute testaddTokenTo(address,uint256) WHEN tokenOwner==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testaddTokenTo(accounts[0], 33,{from: accounts[0]});
  });
  it('Should execute testremoveTokenFrom(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testremoveTokenFrom(accounts[8], 1331007096,{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[0], accounts[5], 1532892062, [189,29,219,2,141,134,19,115,106,193,84,252,226,238,253,150,2,145,176,228,22,246,191,106,87,210,35,77,238,187,140,111],{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[9], accounts[7], 1331007096, [7,199,73,170,118,170,102,240,162,8,174,198,28,55,78,26,221,213,68,223,37,94,36,77,92,71,249,110,167,247,227,211],{from: accounts[0]});
  });
});
