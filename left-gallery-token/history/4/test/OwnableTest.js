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

contract("Ownable",(accounts)=>{
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
    contractERC721Token = await ERC721Token.new("lgbmocr","tumpin by jeffrey alan scudder, 2017, 32 editions",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("lgbmocr","tumpin by jeffrey alan scudder, 2017, 32 editions",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("lgab","tumpin by jeffrey alan scudder, 2017, 32 editions",26,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("lgab","tumpin by jeffrey alan scudder, 2017, 32 editions",26,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
  });
  
  it('Should execute transferOwnership(address) WHEN newOwner!=0x0000000000000000000000000000000000000000,msg.sender==owner', async () => {
    let result = await contractOwnable.transferOwnership(accounts[7],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == owner', async () => {
    let result = await truffleAssert.fails(contractOwnable.transferOwnership(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should execute transferOwnership(address) WHEN newOwner==0x0000000000000000000000000000000000000000,msg.sender==owner', async () => {
    let result = await contractOwnable.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == owner', async () => {
    let result = await truffleAssert.fails(contractOwnable.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[9]}),'revert');
  });
});
