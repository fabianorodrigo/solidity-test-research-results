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

contract("ERC721BasicToken",(accounts)=>{
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
    contractERC721Token = await ERC721Token.new("lgab","monaco mix by rita vitorelli and harm van den dorpel, 2016, 100 editions",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("lgab","monaco mix by rita vitorelli and harm van den dorpel, 2016, 100 editions",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("lgt","lgbmocr",1532892062,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("lgt","lgbmocr",1532892062,{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address) WHEN _owner!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721BasicToken.balanceOf(accounts[0],{from: accounts[0]});
  });
  it('Should fail balanceOf(address) when NOT comply with: _owner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.balanceOf("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute ownerOf(uint256) WHEN owner!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721BasicToken.ownerOf(1,{from: accounts[0]});
  });
  it('Should execute exists(uint256)', async () => {
    let result = await contractERC721BasicToken.exists(97,{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000,_to!=owner,msg.sender==owner', async () => {
    let result = await contractERC721BasicToken.approve(accounts[3], 1,{from: accounts[3]});
  });
  it('Should execute approve(address,uint256) WHEN _to==0x0000000000000000000000000000000000000000,_to!=owner,msg.sender==owner', async () => {
    let result = await contractERC721BasicToken.approve("0x0000000000000000000000000000000000000000", 1331007096,{from: accounts[2]});
  });
  it('Should execute getApproved(uint256)', async () => {
    let result = await contractERC721BasicToken.getApproved(5,{from: accounts[0]});
  });
  it('Should execute setApprovalForAll(address,bool) WHEN _to!=msg.sender', async () => {
    let result = await contractERC721BasicToken.setApprovalForAll(accounts[6], false,{from: accounts[5]});
  });
  it('Should fail setApprovalForAll(address,bool) when NOT comply with: _to != msg.sender', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.setApprovalForAll(accounts[5], false,{from: accounts[5]}),'revert');
  });
  it('Should execute isApprovedForAll(address,address)', async () => {
    let result = await contractERC721BasicToken.isApprovedForAll(accounts[4], accounts[4],{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN _from!=0x0000000000000000000000000000000000000000,_to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721BasicToken.transferFrom(accounts[1], accounts[0], 1,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.transferFrom("0x0000000000000000000000000000000000000000", accounts[0], 1,{from: accounts[0]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.transferFrom(accounts[1], "0x0000000000000000000000000000000000000000", 1,{from: accounts[0]}),'revert');
  });
  it('Should execute safeTransferFrom(address,address,uint256) WHEN _from!=0x0000000000000000000000000000000000000000,_to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256)"](accounts[1], accounts[5], 1331007096,{from: accounts[0]});
  });
  it('Should fail safeTransferFrom(address,address,uint256) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256)"]("0x0000000000000000000000000000000000000000", accounts[5], 1331007096,{from: accounts[0]}),'revert');
  });
  it('Should fail safeTransferFrom(address,address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256)"](accounts[1], "0x0000000000000000000000000000000000000000", 1331007096,{from: accounts[0]}),'revert');
  });
  it('Should execute safeTransferFrom(address,address,uint256,bytes) WHEN _from!=0x0000000000000000000000000000000000000000,_to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256,bytes)"](accounts[5], accounts[4], 28, [60,145,141,245,112,253,164,119,73,71,151,172,243,171,7,240,68,231,161,231,61,213,113,7,84,86,93,133,33,87,163,70],{from: accounts[0]});
  });
  it('Should fail safeTransferFrom(address,address,uint256,bytes) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", accounts[4], 28, [60,145,141,245,112,253,164,119,73,71,151,172,243,171,7,240,68,231,161,231,61,213,113,7,84,86,93,133,33,87,163,70],{from: accounts[0]}),'revert');
  });
  it('Should fail safeTransferFrom(address,address,uint256,bytes) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256,bytes)"](accounts[5], "0x0000000000000000000000000000000000000000", 28, [60,145,141,245,112,253,164,119,73,71,151,172,243,171,7,240,68,231,161,231,61,213,113,7,84,86,93,133,33,87,163,70],{from: accounts[0]}),'revert');
  });
});
