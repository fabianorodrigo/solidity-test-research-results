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

contract("contractProxyPairing",(accounts)=>{
    let contractProxyPairing = null;
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
    contractERC721MintableComplete = await ERC721MintableComplete.new("\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]}');
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
      ProxyPairing.link('Pairing', contractPairing.address);
    contractProxyPairing = await ProxyPairing.new({ from: accounts[0] });
});
  
  it('Should execute testP1()', async () => {
    let result = await contractProxyPairing.testP1({from: accounts[0]});
  });
  it('Should execute testP2()', async () => {
    let result = await contractProxyPairing.testP2({from: accounts[0]});
  });
  it('Should execute testnegate(Pairing.G1Point) WHEN p.X==0,p.Y==0', async () => {
    let result = await contractProxyPairing.testnegate({"X": 0,"Y": 0},{from: accounts[0]});
  });
  it('Should execute testnegate(Pairing.G1Point) WHEN p.X!=0', async () => {
    let result = await contractProxyPairing.testnegate({"X": 31,"Y": 32},{from: accounts[0]});
  });
  it('Should execute testaddition0(Pairing.G1Point,Pairing.G1Point)', async () => {
    let result = await contractProxyPairing.testaddition0({"X": 129,"Y": 199999}, {"X": 55,"Y": 70},{from: accounts[0]});
  });
  it('Should execute testaddition1(Pairing.G2Point,Pairing.G2Point)', async () => {
    let result = await contractProxyPairing.testaddition1({"X": [98,26],"Y": [103,64]}, {"X": [1532892064,46],"Y": [54,63]},{from: accounts[0]});
  });
  it('Should execute testscalar_mul(Pairing.G1Point,uint)', async () => {
    let result = await contractProxyPairing.testscalar_mul({"X": 97,"Y": 7}, 3,{from: accounts[0]});
  });
  it('Should execute testpairing(Pairing.G1Point[],Pairing.G2Point[]) WHEN p1.length==p2.length', async () => {
    let result = await contractProxyPairing.testpairing([{"X": 59,"Y": 27},{"X": 33,"Y": 55},{"X": 70,"Y": 1023},{"X": 88,"Y": 61},{"X": 96,"Y": 4},{"X": 57,"Y": 3},{"X": 1023,"Y": 88},{"X": 98,"Y": 2014223716}], [{"X": [162,23],"Y": [11,64]},{"X": [24,3],"Y": [71,26]},{"X": [47,20],"Y": [162,86]},{"X": [1532892062,24],"Y": [127,97]},{"X": [2014223714,3],"Y": [27,3]},{"X": [3,48],"Y": [102,128]},{"X": [49,2014223715],"Y": [54,256]},{"X": [200001,64],"Y": [29,22]}],{from: accounts[0]});
  });
  it('Should fail testpairing(Pairing.G1Point[],Pairing.G2Point[]) when NOT comply with: p1.length == p2.length', async () => {
    let result = await truffleAssert.fails(contractProxyPairing.testpairing([{"X": 97,"Y": 87},{"X": 199999,"Y": 17},{"X": 63,"Y": 64},{"X": 55,"Y": 64},{"X": 96,"Y": 33},{"X": 10,"Y": 199999},{"X": 19,"Y": 200001},{"X": 31,"Y": 254},{"X": 1532892064,"Y": 21}], [{"X": [162,23],"Y": [11,64]},{"X": [24,3],"Y": [71,26]},{"X": [47,20],"Y": [162,86]},{"X": [1532892062,24],"Y": [127,97]},{"X": [2014223714,3],"Y": [27,3]},{"X": [3,48],"Y": [102,128]},{"X": [49,2014223715],"Y": [54,256]},{"X": [200001,64],"Y": [29,22]}],{from: accounts[0]}),'revert');
  });
  it('Should execute testpairingProd2(Pairing.G1Point,Pairing.G2Point,Pairing.G1Point,Pairing.G2Point)', async () => {
    let result = await contractProxyPairing.testpairingProd2({"X": 60,"Y": 56}, {"X": [2014223715,56],"Y": [22,101]}, {"X": 17,"Y": 63}, {"X": [256,49],"Y": [87,101]},{from: accounts[0]});
  });
  it('Should execute testpairingProd3(Pairing.G1Point,Pairing.G2Point,Pairing.G1Point,Pairing.G2Point,Pairing.G1Point,Pairing.G2Point)', async () => {
    let result = await contractProxyPairing.testpairingProd3({"X": 46,"Y": 7}, {"X": [128,1532892062],"Y": [128,98]}, {"X": 29,"Y": 27}, {"X": [256,4],"Y": [87,64]}, {"X": 23,"Y": 96}, {"X": [65,1532892064],"Y": [47,1024]},{from: accounts[0]});
  });
});
