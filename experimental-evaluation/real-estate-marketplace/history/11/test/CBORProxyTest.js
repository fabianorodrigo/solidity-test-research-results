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

contract("contractProxyCBOR",(accounts)=>{
    let contractProxyCBOR = null;
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
      ProxyCBOR.link('CBOR', contractCBOR.address);
    contractProxyCBOR = await ProxyCBOR.new({ from: accounts[0] });
});
  
  it('Should execute testencodeUInt(Buffer.buffer,uint)', async () => {
    let result = await contractProxyCBOR.testencodeUInt({"buf": [10,36,237,189,131,205,18,201,139,54,200,146,213,62,81,61,236,228,46,117,27,251,84,65,94,14,53,68,185,79,213,222],"capacity": 65}, 97,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value>=0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [198,213,56,156,25,3,107,176,101,250,2,90,108,179,164,113,91,111,19,187,125,8,143,148,26,154,252,32,144,53,69,142],"capacity": 55}, 22,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value<0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [201,243,126,183,185,171,90,221,44,56,75,215,183,147,141,44,229,39,237,128,130,52,159,64,215,59,177,24,201,206,1,28],"capacity": 54}, -1,{from: accounts[0]});
  });
  it('Should execute testencodeBytes(Buffer.buffer,bytes)', async () => {
    let result = await contractProxyCBOR.testencodeBytes({"buf": [88,95,86,216,149,72,221,0,248,26,65,122,104,135,94,57,159,52,183,91,246,20,216,105,244,58,167,211,196,0,200,111],"capacity": 48}, [130,117,189,192,133,104,180,82,41,76,47,40,18,241,72,14,216,6,123,228,149,13,74,0,115,55,77,1,192,65,246,241],{from: accounts[0]});
  });
  it('Should execute testencodeString(Buffer.buffer,string)', async () => {
    let result = await contractProxyCBOR.testencodeString({"buf": [118,214,212,203,138,48,74,235,61,251,255,54,13,32,164,172,107,29,74,123,186,164,129,79,75,153,172,169,62,113,132,235],"capacity": 31}, "Capstones",{from: accounts[0]});
  });
  it('Should execute teststartArray(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartArray({"buf": [10,170,5,165,214,243,229,26,79,177,218,208,96,28,74,100,230,70,187,255,198,187,83,138,251,57,178,103,215,99,246,207],"capacity": 6},{from: accounts[0]});
  });
  it('Should execute teststartMap(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartMap({"buf": [131,7,222,193,144,37,241,1,111,27,217,25,247,142,0,240,129,151,90,124,254,118,148,201,183,168,84,216,79,2,182,139],"capacity": 21},{from: accounts[0]});
  });
  it('Should execute testendSequence(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.testendSequence({"buf": [201,53,221,3,66,53,38,4,104,141,136,106,112,43,25,78,109,185,80,206,235,173,209,126,164,201,44,56,39,79,152,220],"capacity": 16},{from: accounts[0]});
  });
});
