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
    contractERC721Token = await ERC721Token.new("lgbcs","monaco mix by rita vitorelli and harm van den dorpel, 2016, 100 editions",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Token.new("lgbcs","monaco mix by rita vitorelli and harm van den dorpel, 2016, 100 editions",{from:accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractERC721BasicToken = await ERC721BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC721BasicToken.new({from: accounts[0]}');
    contractLeftGalleryToken = await LeftGalleryToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: LeftGalleryToken.new({from: accounts[0]}');
    contractToken = await Token.new("superuser","autobreeder (lite) by harm van den dorpel, 2016, 100 editions",0,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new("superuser","autobreeder (lite) by harm van den dorpel, 2016, 100 editions",0,{from:accounts[0]}');
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
    let result = await contractERC721BasicToken.ownerOf(64,{from: accounts[0]});
  });
  it('Should execute exists(uint256)', async () => {
    let result = await contractERC721BasicToken.exists(2,{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000,_to!=owner,msg.sender==owner', async () => {
    let result = await contractERC721BasicToken.approve(accounts[5], 101,{from: accounts[1]});
  });
  it('Should execute approve(address,uint256) WHEN _to==0x0000000000000000000000000000000000000000,_to!=owner,msg.sender==owner', async () => {
    let result = await contractERC721BasicToken.approve("0x0000000000000000000000000000000000000000", 96,{from: accounts[1]});
  });
  it('Should execute getApproved(uint256)', async () => {
    let result = await contractERC721BasicToken.getApproved(0,{from: accounts[0]});
  });
  it('Should execute setApprovalForAll(address,bool) WHEN _to!=msg.sender', async () => {
    let result = await contractERC721BasicToken.setApprovalForAll(accounts[2], true,{from: accounts[8]});
  });
  it('Should fail setApprovalForAll(address,bool) when NOT comply with: _to != msg.sender', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.setApprovalForAll(accounts[8], true,{from: accounts[8]}),'revert');
  });
  it('Should execute isApprovedForAll(address,address)', async () => {
    let result = await contractERC721BasicToken.isApprovedForAll(accounts[7], accounts[9],{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN _from!=0x0000000000000000000000000000000000000000,_to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721BasicToken.transferFrom(accounts[2], accounts[3], 2014223714,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.transferFrom("0x0000000000000000000000000000000000000000", accounts[3], 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.transferFrom(accounts[2], "0x0000000000000000000000000000000000000000", 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute safeTransferFrom(address,address,uint256) WHEN _from!=0x0000000000000000000000000000000000000000,_to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256)"](accounts[8], accounts[3], 3,{from: accounts[0]});
  });
  it('Should fail safeTransferFrom(address,address,uint256) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256)"]("0x0000000000000000000000000000000000000000", accounts[3], 3,{from: accounts[0]}),'revert');
  });
  it('Should fail safeTransferFrom(address,address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256)"](accounts[8], "0x0000000000000000000000000000000000000000", 3,{from: accounts[0]}),'revert');
  });
  it('Should execute safeTransferFrom(address,address,uint256,bytes) WHEN _from!=0x0000000000000000000000000000000000000000,_to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256,bytes)"](accounts[0], accounts[5], 4038714811, [33,99,65,112,87,150,185,19,114,207,212,140,118,107,109,78,14,176,92,168,168,39,244,46,118,88,175,158,109,227,60,187],{from: accounts[0]});
  });
  it('Should fail safeTransferFrom(address,address,uint256,bytes) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256,bytes)"]("0x0000000000000000000000000000000000000000", accounts[5], 4038714811, [33,99,65,112,87,150,185,19,114,207,212,140,118,107,109,78,14,176,92,168,168,39,244,46,118,88,175,158,109,227,60,187],{from: accounts[0]}),'revert');
  });
  it('Should fail safeTransferFrom(address,address,uint256,bytes) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721BasicToken.methods["safeTransferFrom(address,address,uint256,bytes)"](accounts[0], "0x0000000000000000000000000000000000000000", 4038714811, [33,99,65,112,87,150,185,19,114,207,212,140,118,107,109,78,14,176,92,168,168,39,244,46,118,88,175,158,109,227,60,187],{from: accounts[0]}),'revert');
  });
});
