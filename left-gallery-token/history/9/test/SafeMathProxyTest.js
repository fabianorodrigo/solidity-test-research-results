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

contract("contractProxySafeMath",(accounts)=>{
    let contractProxySafeMath = null;
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
    contractERC721Token = await ERC721Token.new("lgmm","lgfile",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("lgmm","lgfile",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("","minter",1532892063,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("","minter",1532892063,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
      ProxySafeMath.link('SafeMath', contractSafeMath.address);
    contractProxySafeMath = await ProxySafeMath.new({ from: accounts[0] });
});
  
  it('Should execute testmul(uint256,uint256) WHEN a==0', async () => {
    let result = await contractProxySafeMath.testmul(0, 5,{from: accounts[0]});
  });
  it('Should execute testmul(uint256,uint256) WHEN a!=0', async () => {
    let result = await contractProxySafeMath.testmul(64, 4,{from: accounts[0]});
  });
  it('Should execute testdiv(uint256,uint256) WHEN b>0', async () => {
    let result = await contractProxySafeMath.testdiv(4038714811, 27,{from: accounts[0]});
  });
  it('Should fail testdiv(uint256,uint256) when NOT comply with: b > 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testdiv(4038714811, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testsub(uint256,uint256) WHEN b<=a', async () => {
    let result = await contractProxySafeMath.testsub(1532892064, 3,{from: accounts[0]});
  });
  it('Should fail testsub(uint256,uint256) when NOT comply with: b <= a', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testsub(1532892064, 1532892065,{from: accounts[0]}),'revert');
  });
  it('Should execute testadd(uint256,uint256)', async () => {
    let result = await contractProxySafeMath.testadd(4038714811, 32,{from: accounts[0]});
  });
});