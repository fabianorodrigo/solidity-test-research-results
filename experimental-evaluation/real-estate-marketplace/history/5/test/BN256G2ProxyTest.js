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

contract("contractProxyBN256G2",(accounts)=>{
    let contractProxyBN256G2 = null;
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
    contractERC721MintableComplete = await ERC721MintableComplete.new("Capstones","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("Capstones","[",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("oqvsz","ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("oqvsz","ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
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
      ProxyBN256G2.link('BN256G2', contractBN256G2.address);
    contractProxyBN256G2 = await ProxyBN256G2.new({ from: accounts[0] });
});
  
  it('Should execute testGetFieldModulus()', async () => {
    let result = await contractProxyBN256G2.testGetFieldModulus({from: accounts[0]});
  });
  it('Should execute testsubmod(uint256,uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.testsubmod(8, 26, 2,{from: accounts[0]});
  });
  it('Should execute test_FQ2Mul(uint256,uint256,uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_FQ2Mul(9, 96, 49, 15,{from: accounts[0]});
  });
  it('Should execute test_FQ2Muc(uint256,uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_FQ2Muc(15, 160, 102,{from: accounts[0]});
  });
  it('Should execute test_FQ2Add(uint256,uint256,uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_FQ2Add(56, 31, 1, 103,{from: accounts[0]});
  });
  it('Should execute test_FQ2Sub(uint256,uint256,uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_FQ2Sub(162, 30, 97, 66,{from: accounts[0]});
  });
  it('Should execute test_FQ2Div(uint256,uint256,uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_FQ2Div(24, 257, 160, 55,{from: accounts[0]});
  });
  it('Should execute test_FQ2Inv(uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_FQ2Inv(1023, 45,{from: accounts[0]});
  });
  it('Should execute test_isOnCurve(uint256,uint256,uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_isOnCurve(16, 24, 256, 58,{from: accounts[0]});
  });
  it('Should execute test_modInv(uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_modInv(200000, 28,{from: accounts[0]});
  });
  it('Should execute test_ECTwistMulJacobian(uint256,uint256,uint256,uint256,uint256,uint256,uint256)', async () => {
    let result = await contractProxyBN256G2.test_ECTwistMulJacobian(1023, 10, 55, 29, 23, 69, 128,{from: accounts[0]});
  });
});