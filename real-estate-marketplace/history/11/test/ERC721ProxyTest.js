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
    contractERC721MintableComplete = await ERC721MintableComplete.new("P","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("P","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("Capstones","Transaction successfully verified.","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("Capstones","Transaction successfully verified.","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
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
    let result = await contractProxyERC721.test_exists(255,{from: accounts[0]});
  });
  it('Should execute test_isApprovedOrOwner(address,uint256)', async () => {
    let result = await contractProxyERC721.test_isApprovedOrOwner(accounts[0], 161,{from: accounts[0]});
  });
  it('Should execute test_mint(address,uint256) WHEN to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721.test_mint(accounts[4], 21,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721.test_mint("0x0000000000000000000000000000000000000000", 21,{from: accounts[0]}),'revert');
  });
  it('Should execute test_transferFrom(address,address,uint256) WHEN from==_tokenOwner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyERC721.test_transferFrom(accounts[2], accounts[8], 1532892062,{from: accounts[0]});
  });
  it('Should fail test_transferFrom(address,address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyERC721.test_transferFrom(accounts[2], "0x0000000000000000000000000000000000000000", 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should execute test_checkOnERC721Received(address,address,uint256,bytes) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyERC721.test_checkOnERC721Received(accounts[9], accounts[6], 24, [254,192,175,9,11,40,225,192,107,254,167,76,179,127,91,132,2,187,8,164,103,70,251,51,192,193,142,127,75,72,67,70],{from: accounts[0]});
  });
  it('Should execute test_checkOnERC721Received(address,address,uint256,bytes) WHEN FunctionCall==true', async () => {
    let result = await contractProxyERC721.test_checkOnERC721Received(accounts[0], accounts[4], 31, [231,223,60,39,129,205,188,15,147,192,198,252,199,175,221,152,113,122,3,219,242,148,121,180,181,122,251,141,161,139,239,87],{from: accounts[0]});
  });
});
