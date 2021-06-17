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
const ProxyERC721 = artifacts.require("ProxyERC721");

contract("contractProxyERC721",(accounts)=>{
    let contractProxyERC721 = null;
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
    contractERC721MintableComplete = await ERC721MintableComplete.new("L","P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("L","P",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("L","58lwua","0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("L","58lwua","0",{from:accounts[0]}');
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
      ProxyERC721.link("Address",contractAddress.address);
    ProxyERC721.link("Counters",contractCounters.address);
    ProxyERC721.link("SafeMath",contractSafeMath.address);
    ProxyERC721.link("Buffer",contractBuffer.address);
    ProxyERC721.link("CBOR",contractCBOR.address);
    contractProxyERC721 = await ProxyERC721.new({ from: accounts[0] });
});
  
  it('Should execute test_exists(uint256)', async () => {
    let result = await contractProxyERC721.test_exists(2014223714,{from: accounts[0]});
  });
  it('Should execute test_isApprovedOrOwner(address,uint256)', async () => {
    let result = await contractProxyERC721.test_isApprovedOrOwner(accounts[3], 29,{from: accounts[0]});
  });
  it('Should execute test_mint(address,uint256) WHEN to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721.test_mint(accounts[5], 25,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721.test_mint("0x0000000000000000000000000000000000000000", 25,{from: accounts[0]}),'revert');
  });
  it('Should execute test_transferFrom(address,address,uint256) WHEN from==_tokenOwner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721.test_transferFrom(accounts[6], accounts[0], 1025,{from: accounts[0]});
  });
  it('Should fail test_transferFrom(address,address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721.test_transferFrom(accounts[6], "0x0000000000000000000000000000000000000000", 1025,{from: accounts[0]}),'revert');
  });
  it('Should execute test_checkOnERC721Received(address,address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyERC721.test_checkOnERC721Received(accounts[4], accounts[3], 22, [220,47,200,35,65,85,38,219,35,44,240,154,180,86,197,169,139,42,143,53,230,100,134,92,91,238,52,242,182,51,178,194],{from: accounts[0]});
  });
  it('Should execute test_checkOnERC721Received(address,address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractProxyERC721.test_checkOnERC721Received(accounts[9], accounts[5], 71, [91,90,213,122,146,74,173,19,113,249,155,237,128,91,219,144,172,175,189,82,218,87,145,149,0,35,155,94,238,195,39,13],{from: accounts[0]});
  });
});
