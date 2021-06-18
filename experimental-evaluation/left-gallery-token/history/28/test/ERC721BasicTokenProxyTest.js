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
    contractERC721Token = await ERC721Token.new("lgfile","event-listeners",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("lgfile","event-listeners",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("event-listeners","event-listeners",3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("event-listeners","event-listeners",3,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
      contractProxyERC721BasicToken = await ProxyERC721BasicToken.new({ from: accounts[0] });
});
  
  it('Should execute testisApprovedOrOwner(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testisApprovedOrOwner(accounts[7], 3,{from: accounts[0]});
  });
  it('Should execute test_mint(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.test_mint(accounts[0], 5,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721BasicToken.test_mint("0x0000000000000000000000000000000000000000", 5,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burn(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.test_burn(accounts[9], 5,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[2], 100,{from: accounts[0]});
  });
  it('Should execute testclearApproval(address,uint256) WHEN tokenApprovals==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testclearApproval(accounts[4], 32,{from: accounts[0]});
  });
  it('Should execute testaddTokenTo(address,uint256) WHEN tokenOwner==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721BasicToken.testaddTokenTo(accounts[3], 101,{from: accounts[0]});
  });
  it('Should execute testremoveTokenFrom(address,uint256)', async () => {
    let result = await contractProxyERC721BasicToken.testremoveTokenFrom(accounts[4], 1331007098,{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[2], accounts[5], 29, [231,13,237,158,104,163,244,5,32,5,223,205,183,3,124,88,216,243,168,192,229,151,140,232,49,99,120,34,78,238,23,210],{from: accounts[0]});
  });
  it('Should execute testcheckAndCallSafeTransfer(address,address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractProxyERC721BasicToken.testcheckAndCallSafeTransfer(accounts[4], accounts[0], 95, [253,55,65,116,202,172,226,91,87,86,142,151,244,113,6,68,225,160,53,28,235,20,54,234,112,22,49,81,155,165,100,215],{from: accounts[0]});
  });
});
