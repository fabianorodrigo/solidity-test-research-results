const truffleAssert = require('truffle-assertions');
const Ownable = artifacts.require("Ownable");
const ERC721 = artifacts.require("ERC721");
const ERC721Enumerable = artifacts.require("ERC721Enumerable");
const ERC721Metadata = artifacts.require("ERC721Metadata");
const ERC721MintableComplete = artifacts.require("ERC721MintableComplete");
const Buffer = artifacts.require("Buffer");
const CBOR = artifacts.require("CBOR");
const usingOraclize = artifacts.require("usingOraclize");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const BN256G2 = artifacts.require("BN256G2");
const Pairing = artifacts.require("Pairing");
const Verifier = artifacts.require("Verifier");
const Counters = artifacts.require("openzeppelin-solidity/contracts/drafts/Counters.sol");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const Address = artifacts.require("openzeppelin-solidity/contracts/utils/Address.sol");
const ProxyCBOR = artifacts.require("ProxyCBOR");
const ProxyPairing = artifacts.require("ProxyPairing");
const ProxyBN256G2 = artifacts.require("ProxyBN256G2");
const ProxyBuffer = artifacts.require("ProxyBuffer");
const ProxyusingOraclize = artifacts.require("ProxyusingOraclize");
const ProxyVerifier = artifacts.require("ProxyVerifier");

contract("ERC721",(accounts)=>{
  let trace = false;
  let contractAddress = null;
  let contractSafeMath = null;
  let contractCounters = null;
  let contractBuffer = null;
  let contractCBOR = null;
  let contractPairing = null;
  let contractBN256G2 = null;
  let contractusingOraclize = null;
  let contractVerifier = null;
  let contractSolnSquareVerifier = null;
  let contractERC721 = null;
  let contractERC721MintableComplete = null;
  let contractERC721Metadata = null;
  let contractERC721Enumerable = null;
  let contractOwnable = null;
  beforeEach(async () => {
    contractAddress = await Address.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Address.new({from: accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractCounters = await Counters.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Counters.new({from: accounts[0]}');
    contractBuffer = await Buffer.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Buffer.new({from: accounts[0]}');
    contractCBOR = await CBOR.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: CBOR.new({from: accounts[0]}');
    contractPairing = await Pairing.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Pairing.new({from: accounts[0]}');
    contractBN256G2 = await BN256G2.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BN256G2.new({from: accounts[0]}');
    contractusingOraclize = await usingOraclize.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: usingOraclize.new({from: accounts[0]}');
    contractVerifier = await Verifier.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Verifier.new({from: accounts[0]}');
    SolnSquareVerifier.link("BN256G2",contractBN256G2.address);
     SolnSquareVerifier.link("Pairing",contractPairing.address);
    contractSolnSquareVerifier = await SolnSquareVerifier.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: SolnSquareVerifier.new({from:accounts[0]}');
    ERC721.link("Address",contractAddress.address);
     ERC721.link("Counters",contractCounters.address);
     ERC721.link("SafeMath",contractSafeMath.address);
     ERC721.link("Buffer",contractBuffer.address);
     ERC721.link("CBOR",contractCBOR.address);
    contractERC721 = await ERC721.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721.new({from:accounts[0]}');
    ERC721MintableComplete.link("Address",contractAddress.address);
     ERC721MintableComplete.link("Counters",contractCounters.address);
     ERC721MintableComplete.link("SafeMath",contractSafeMath.address);
     ERC721MintableComplete.link("Buffer",contractBuffer.address);
     ERC721MintableComplete.link("CBOR",contractCBOR.address);
    contractERC721MintableComplete = await ERC721MintableComplete.new("Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("\x19Ethereum Signed Message:\n32","Transaction successfully verified.","lnr2ym",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("\x19Ethereum Signed Message:\n32","Transaction successfully verified.","lnr2ym",{from:accounts[0]}');
    ERC721Enumerable.link("Address",contractAddress.address);
     ERC721Enumerable.link("Counters",contractCounters.address);
     ERC721Enumerable.link("SafeMath",contractSafeMath.address);
     ERC721Enumerable.link("Buffer",contractBuffer.address);
     ERC721Enumerable.link("CBOR",contractCBOR.address);
    contractERC721Enumerable = await ERC721Enumerable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Enumerable.new({from:accounts[0]}');
    Ownable.link("Address",contractAddress.address);
     Ownable.link("Counters",contractCounters.address);
     Ownable.link("SafeMath",contractSafeMath.address);
     Ownable.link("Buffer",contractBuffer.address);
     Ownable.link("CBOR",contractCBOR.address);
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractERC721.balanceOf(accounts[3],{from: accounts[0]});
  });
  it('Should execute ownerOf(uint256)', async () => {
    let result = await contractERC721.ownerOf(46,{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN to!=_tokenOwner,msg.sender!=_owner', async () => {
    await contractERC721.transferOwnership(accounts[3],{from:accounts[0]});
    let result = await contractERC721.approve(accounts[6], 31,{from: accounts[8]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: msg.sender != _owner', async () => {
    await contractERC721.transferOwnership(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractERC721.approve(accounts[6], 31,{from: accounts[3]}),'revert');
  });
  it('Should execute getApproved(uint256)', async () => {
    let result = await contractERC721.getApproved(20,{from: accounts[0]});
  });
  it('Should execute setApprovalForAll(address,bool) WHEN to!=msg.sender', async () => {
    let result = await contractERC721.setApprovalForAll(accounts[3], true,{from: accounts[7]});
  });
  it('Should fail setApprovalForAll(address,bool) when NOT comply with: to != msg.sender', async () => {
    let result = await truffleAssert.fails(contractERC721.setApprovalForAll(accounts[7], true,{from: accounts[7]}),'revert');
  });
  it('Should execute isApprovedForAll(address,address)', async () => {
    let result = await contractERC721.isApprovedForAll(accounts[7], accounts[3],{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN from==_tokenOwner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721.transferFrom(accounts[7], accounts[4], 95,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721.transferFrom(accounts[7], "0x0000000000000000000000000000000000000000", 95,{from: accounts[0]}),'revert');
  });
  it('Should execute safeTransferFrom(address,address,uint256) WHEN from==_tokenOwner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721.methods["safeTransferFrom(address,address,uint256)"](accounts[6], accounts[5], 26,{from: accounts[0]});
  });
  it('Should fail safeTransferFrom(address,address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721.methods["safeTransferFrom(address,address,uint256)"](accounts[6], "0x0000000000000000000000000000000000000000", 26,{from: accounts[0]}),'revert');
  });
  it('Should execute safeTransferFrom(address,address,uint256,bytes) WHEN from==_tokenOwner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC721.methods["safeTransferFrom(address,address,uint256,bytes)"](accounts[2], accounts[4], 15, [141,207,73,6,168,199,177,120,85,11,123,239,76,57,7,59,12,43,149,8,46,233,43,190,228,214,189,232,208,46,133,34],{from: accounts[0]});
  });
  it('Should fail safeTransferFrom(address,address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC721.methods["safeTransferFrom(address,address,uint256,bytes)"](accounts[2], "0x0000000000000000000000000000000000000000", 15, [141,207,73,6,168,199,177,120,85,11,123,239,76,57,7,59,12,43,149,8,46,233,43,190,228,214,189,232,208,46,133,34],{from: accounts[0]}),'revert');
  });
  it('Should execute setPaused(bool) WHEN _paused==true,msg.sender==_owner', async () => {
    let result = await contractERC721.setPaused(true,{from: accounts[0]});
  });
  it('Should fail setPaused(bool) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractERC721.setPaused(true,{from: accounts[9]}),'revert');
  });
  it('Should execute setPaused(bool) WHEN _paused!=true,msg.sender==_owner', async () => {
    let result = await contractERC721.setPaused(false,{from: accounts[0]});
  });
  it('Should fail setPaused(bool) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractERC721.setPaused(false,{from: accounts[9]}),'revert');
  });
  it('Should execute supportsInterface(bytes4)', async () => {
    let result = await contractERC721.supportsInterface([242,68,86,207],{from: accounts[0]});
  });
});
