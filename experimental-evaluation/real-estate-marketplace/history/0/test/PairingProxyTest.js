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
    contractERC721MintableComplete = await ERC721MintableComplete.new("Transaction successfully verified.","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("Transaction successfully verified.","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[",{from:accounts[0]}');
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
    let result = await contractProxyPairing.testnegate({"X": 59,"Y": 7},{from: accounts[0]});
  });
  it('Should execute testaddition0(Pairing.G1Point,Pairing.G1Point)', async () => {
    let result = await contractProxyPairing.testaddition0({"X": 69,"Y": 56}, {"X": 49,"Y": 127},{from: accounts[0]});
  });
  it('Should execute testaddition1(Pairing.G2Point,Pairing.G2Point)', async () => {
    let result = await contractProxyPairing.testaddition1({"X": [88,19],"Y": [162,20]}, {"X": [88,103],"Y": [1025,63]},{from: accounts[0]});
  });
  it('Should execute testscalar_mul(Pairing.G1Point,uint)', async () => {
    let result = await contractProxyPairing.testscalar_mul({"X": 98,"Y": 56}, 29,{from: accounts[0]});
  });
  it('Should execute testpairing(Pairing.G1Point[],Pairing.G2Point[]) WHEN p1.length==p2.length', async () => {
    let result = await contractProxyPairing.testpairing([{"X": 255,"Y": 1532892064},{"X": 49,"Y": 5},{"X": 63,"Y": 98},{"X": 21,"Y": 46},{"X": 19,"Y": 1532892063},{"X": 255,"Y": 56},{"X": 199999,"Y": 2014223715},{"X": 33,"Y": 22},{"X": 66,"Y": 69},{"X": 86,"Y": 128}], [{"X": [63,2],"Y": [1024,160]},{"X": [47,17],"Y": [65,48]},{"X": [127,255],"Y": [45,66]},{"X": [3,31],"Y": [25,59]},{"X": [26,61],"Y": [17,64]},{"X": [32,66],"Y": [1,19]},{"X": [87,160],"Y": [9,23]},{"X": [1532892064,57],"Y": [31,9]},{"X": [71,2],"Y": [54,48]},{"X": [97,56],"Y": [160,2014223714]}],{from: accounts[0]});
  });
  it('Should fail testpairing(Pairing.G1Point[],Pairing.G2Point[]) when NOT comply with: p1.length == p2.length', async () => {
    let result = await truffleAssert.fails(contractProxyPairing.testpairing([{"X": 200000,"Y": 20},{"X": 1532892062,"Y": 128},{"X": 59,"Y": 200001},{"X": 88,"Y": 29},{"X": 70,"Y": 0},{"X": 46,"Y": 49},{"X": 86,"Y": 57},{"X": 98,"Y": 98},{"X": 162,"Y": 95},{"X": 2,"Y": 254},{"X": 161,"Y": 97}], [{"X": [63,2],"Y": [1024,160]},{"X": [47,17],"Y": [65,48]},{"X": [127,255],"Y": [45,66]},{"X": [3,31],"Y": [25,59]},{"X": [26,61],"Y": [17,64]},{"X": [32,66],"Y": [1,19]},{"X": [87,160],"Y": [9,23]},{"X": [1532892064,57],"Y": [31,9]},{"X": [71,2],"Y": [54,48]},{"X": [97,56],"Y": [160,2014223714]}],{from: accounts[0]}),'revert');
  });
  it('Should execute testpairingProd2(Pairing.G1Point,Pairing.G2Point,Pairing.G1Point,Pairing.G2Point)', async () => {
    let result = await contractProxyPairing.testpairingProd2({"X": 254,"Y": 88}, {"X": [160,21],"Y": [20,26]}, {"X": 17,"Y": 95}, {"X": [128,63],"Y": [129,3]},{from: accounts[0]});
  });
  it('Should execute testpairingProd3(Pairing.G1Point,Pairing.G2Point,Pairing.G1Point,Pairing.G2Point,Pairing.G1Point,Pairing.G2Point)', async () => {
    let result = await contractProxyPairing.testpairingProd3({"X": 1025,"Y": 257}, {"X": [2014223714,65],"Y": [59,1532892064]}, {"X": 2014223715,"Y": 4}, {"X": [25,15],"Y": [96,0]}, {"X": 199999,"Y": 86}, {"X": [58,6],"Y": [24,15]},{from: accounts[0]});
  });
});
