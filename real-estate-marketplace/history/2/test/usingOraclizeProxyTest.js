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

contract("contractProxyusingOraclize",(accounts)=>{
    let contractProxyusingOraclize = null;
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
    contractERC721MintableComplete = await ERC721MintableComplete.new("L","Transaction successfully verified.",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("L","Transaction successfully verified.",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("ERC1820_ACCEPT_MAGIC","L","ipkqsw",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("ERC1820_ACCEPT_MAGIC","L","ipkqsw",{from:accounts[0]}');
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
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(23,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("P",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Capstones", 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("ipkqsw", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(1025, "ERC1820_ACCEPT_MAGIC", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(55, "[", "\x19Ethereum Signed Message:\n32", 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "L", 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("L", "L", "ipkqsw",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(29, "Transaction successfully verified.", "P", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(257, "[", "0ttfam", "ipkqsw", 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("\x19Ethereum Signed Message:\n32", "[", "ipkqsw", 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("[", ["P","Capstones","L","ipkqsw","ERC1820_ACCEPT_MAGIC","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1532892062, "P", ["P","L","ipkqsw","0","0","bofzyb","0","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(2014223714, "[", ["0","ERC1820_ACCEPT_MAGIC","Transaction successfully verified.","ipkqsw","ipkqsw"], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("jy9vyf", ["0","f58xqj"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("bofzyb", ["bofzyb"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(0, "L", ["\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(2014223716, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["0"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["jy9vyf"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("0", ["Capstones","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(200001, "bofzyb", ["L","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(66, "[", ["0","L"], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("ipkqsw", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("2873r9", ["2873r9","\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(29, "0", ["bofzyb","Capstones","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(54, "0ttfam", ["f58xqj","0ttfam","0"], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("Capstones", ["P","[","f58xqj"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("jy9vyf", ["0","[","0","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(102, "2873r9", ["ipkqsw","0","L","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(160, "ipkqsw", ["Capstones","Capstones","ipkqsw","["], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("2873r9", ["L","ipkqsw","Capstones","\x19Ethereum Signed Message:\n32"], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("ERC1820_ACCEPT_MAGIC", ["ERC1820_ACCEPT_MAGIC","[","2873r9","jy9vyf","0ttfam"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(1, "f58xqj", ["f58xqj","2i02go","ipkqsw","0","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(6, "f58xqj", ["0ra89w","\x19Ethereum Signed Message:\n32","ipkqsw","2i02go","0yjdnu"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("0ra89w", ["ipkqsw","[","9sbed","Capstones","l51da"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("ERC1820_ACCEPT_MAGIC", [[238,240,235,254,191,2,54,187,14,12,41,21,220,62,133,222,182,83,198,126,39,83,237,28,220,33,42,89,5,227,32,253],[46,25,190,201,12,223,231,23,144,147,246,200,38,148,139,229,230,94,22,43,252,59,118,192,162,66,80,139,38,155,175,222],[207,85,56,75,14,78,121,190,45,230,35,254,82,161,133,43,58,19,47,143,5,163,12,64,74,210,51,154,126,191,247,96],[229,242,97,184,164,225,215,121,184,107,96,80,153,136,168,60,226,100,110,162,3,148,16,243,100,13,180,154,55,230,110,104],[25,106,40,42,129,226,27,158,96,186,209,12,85,234,198,7,103,232,46,157,235,129,182,73,139,121,113,150,121,107,195,214],[243,19,22,236,1,130,135,186,247,105,157,88,198,160,134,6,152,5,130,249,168,133,103,154,49,110,81,54,193,104,46,251],[245,41,11,224,6,91,243,150,235,122,83,142,187,224,138,234,118,50,30,44,172,65,232,240,41,218,10,105,116,202,88,54],[120,154,140,114,181,46,216,247,118,49,161,46,179,244,169,74,213,255,36,140,144,254,44,48,115,85,53,186,4,30,93,134],[198,3,25,75,153,195,121,239,71,37,154,213,248,104,122,58,74,118,103,44,218,76,61,230,240,249,100,56,155,95,62,118]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(1532892063, "2873r9", [[215,205,89,211,149,168,13,208,110,113,118,44,201,172,113,47,204,147,242,9,247,72,31,110,53,55,191,67,50,244,64,239],[215,9,49,228,52,67,148,10,14,203,134,253,139,186,232,28,253,56,114,213,212,149,1,80,189,43,129,129,141,225,62,255],[124,134,14,244,106,70,104,207,29,171,117,112,68,183,77,44,85,254,8,223,188,82,34,84,221,194,237,230,33,157,147,89],[247,128,68,181,147,138,83,181,151,237,143,179,109,53,228,72,179,115,7,144,213,79,212,169,58,35,17,9,181,146,114,65],[117,142,0,34,39,74,27,98,45,201,35,196,146,58,2,142,90,40,45,173,195,137,106,23,219,69,33,149,232,135,50,113],[189,123,142,243,107,154,10,196,210,147,79,125,105,7,156,38,192,251,77,66,227,209,149,6,22,5,220,7,181,195,225,172],[125,204,52,88,164,35,223,179,149,206,40,178,122,70,3,226,69,66,31,75,13,159,246,22,2,202,1,224,134,17,196,252],[254,248,0,10,192,238,19,16,149,45,209,205,70,186,174,175,255,156,24,4,181,198,42,218,167,28,191,142,0,78,207,200]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(3, "Transaction successfully verified.", [[246,16,3,181,43,11,83,40,132,137,79,225,34,133,66,203,182,117,102,115,13,54,209,84,25,245,248,139,177,65,162,27],[246,82,9,36,96,31,23,248,119,0,162,111,181,165,153,175,34,126,35,47,144,112,120,94,26,217,47,133,242,252,236,112],[51,161,235,100,60,31,212,135,34,131,80,156,161,21,225,146,183,84,114,19,58,176,80,12,11,30,167,24,1,89,14,194],[83,112,153,138,244,47,242,18,160,5,123,60,11,161,136,110,195,202,73,30,25,196,184,110,214,152,115,249,93,80,140,63],[138,189,98,31,36,215,34,209,13,125,138,190,116,40,190,81,116,197,74,28,193,8,125,131,13,76,2,62,79,3,93,251],[200,71,172,178,218,166,114,229,11,178,225,62,219,203,211,250,163,145,45,19,113,19,67,35,1,96,158,131,211,10,134,167],[86,188,245,22,87,86,104,165,114,95,77,140,81,216,86,183,113,104,116,50,191,145,85,34,235,34,96,39,150,20,178,77]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("0ttfam", [[50,110,70,72,203,64,69,183,0,68,65,14,175,129,213,164,224,71,204,172,202,197,129,212,68,100,155,79,225,164,99,55]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("2i02go", [[152,205,92,181,119,213,167,48,218,162,156,31,52,21,1,40,56,108,88,32,191,17,38,142,243,163,35,71,28,237,112,52]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(256, "9sbed", [[80,23,169,101,181,39,187,107,200,247,86,153,234,116,125,214,231,14,1,95,86,251,46,8,255,77,0,152,249,81,42,132]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(160, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[114,52,90,139,217,191,21,44,140,247,169,91,48,16,97,255,19,20,96,26,250,229,216,223,57,107,40,25,211,246,47,13]], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("Transaction successfully verified.", [[93,221,219,205,139,252,28,108,25,22,112,24,119,79,247,160,158,158,166,2,243,220,161,152,16,189,67,193,232,22,143,236]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("jy9vyf", [[41,216,159,178,79,70,40,122,62,52,40,37,90,75,224,58,127,2,201,45,212,46,78,63,14,184,90,137,241,41,106,85],[196,253,162,206,116,162,252,63,117,248,99,228,164,44,251,133,21,60,229,87,235,48,175,83,44,156,87,189,145,147,185,119]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(60, "l51da", [[72,249,233,10,83,60,236,169,8,175,255,21,195,222,0,79,251,22,169,37,111,79,82,57,156,107,245,217,186,99,55,30],[135,152,113,36,252,221,122,228,254,230,65,253,176,66,31,149,15,163,49,82,38,105,66,156,184,5,243,124,194,210,125,189]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(1532892062, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[145,235,31,250,118,254,11,7,36,96,195,121,42,177,136,79,18,116,116,52,166,42,84,222,4,175,214,159,65,202,128,129],[21,95,55,43,43,11,88,42,66,146,233,208,33,8,159,215,89,137,156,76,134,43,76,226,62,48,6,196,183,91,86,214]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("L", [[90,255,41,32,85,50,87,161,167,239,2,23,94,137,127,165,133,79,242,135,145,167,206,212,82,237,236,146,41,41,2,202],[176,5,78,163,10,187,189,158,131,174,254,72,214,194,161,206,207,236,166,225,215,158,41,33,150,154,228,58,78,103,13,166]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("0ttfam", [[109,116,251,85,65,105,81,59,79,161,3,206,235,166,205,223,36,220,189,102,10,18,92,69,186,209,178,161,75,188,83,220],[206,128,170,242,33,175,242,87,60,233,139,71,127,199,154,144,133,213,134,10,214,252,202,194,63,247,57,72,137,32,136,169],[165,168,192,218,16,227,90,169,247,199,35,15,44,191,26,252,249,44,12,129,10,25,199,1,152,140,68,82,166,101,192,77]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(21, "i9ita", [[129,161,85,130,254,35,54,19,231,40,2,21,194,59,92,72,153,201,145,5,231,116,212,199,73,231,137,9,32,129,138,156],[213,1,84,119,159,92,183,39,66,4,110,128,222,250,72,18,106,29,27,4,188,118,11,93,117,210,79,237,154,246,5,204],[154,84,68,128,229,69,153,47,175,249,106,217,161,204,83,82,69,134,95,31,223,226,233,133,79,89,254,115,118,155,240,126]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(64, "2873r9", [[22,186,195,18,55,247,112,172,174,35,55,154,189,25,25,236,7,85,139,214,20,27,190,170,54,137,154,143,140,240,199,197],[75,109,228,209,40,213,38,15,21,93,161,29,231,60,46,109,74,51,73,5,207,244,147,40,76,0,246,81,126,65,183,177],[47,52,94,66,234,129,8,69,3,56,130,251,28,209,95,120,8,240,214,43,125,77,54,217,111,144,84,208,255,234,119,165]], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("[", [[236,78,97,46,28,54,199,83,224,244,224,90,96,140,126,1,8,159,204,88,126,200,24,44,89,227,119,107,64,187,230,25],[153,101,48,78,78,22,166,0,59,128,207,91,234,161,177,182,198,160,243,232,61,160,28,80,239,210,152,164,148,58,41,107],[46,88,76,74,166,31,173,55,10,179,90,123,162,39,100,160,154,217,24,210,239,38,116,54,31,179,66,219,57,157,198,74]], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("i9ita", [[175,56,240,173,5,21,89,152,76,37,168,129,81,209,218,77,48,150,114,166,41,114,182,123,215,216,6,50,231,188,157,207],[24,30,64,214,189,92,79,136,111,247,150,169,184,87,129,99,86,95,205,117,110,55,95,20,195,171,94,143,200,218,216,132],[5,31,1,1,239,234,162,135,75,12,249,110,115,143,112,8,124,39,61,47,79,156,59,105,108,104,126,168,111,153,85,29],[53,203,155,37,156,201,231,91,142,81,29,125,226,190,239,223,107,127,199,23,67,16,73,110,41,207,76,80,204,18,181,151]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(58, "Transaction successfully verified.", [[211,50,180,65,171,150,131,145,35,45,234,156,114,50,144,15,177,67,16,6,253,89,31,239,80,100,243,69,220,79,104,224],[131,239,201,15,218,113,42,7,240,32,194,112,230,189,208,143,242,248,98,242,162,25,225,26,253,207,2,81,73,139,101,17],[16,249,202,86,168,35,107,243,181,14,107,208,170,40,171,153,66,90,69,7,135,189,145,96,212,242,96,117,216,163,96,71],[94,254,91,49,88,76,240,75,129,109,151,82,88,10,241,36,12,233,65,57,175,255,157,130,216,194,195,219,21,120,167,34]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(200000, "P", [[123,253,84,119,49,109,119,89,124,140,31,192,40,153,113,1,209,79,72,222,16,165,187,24,103,189,45,6,241,170,239,131],[191,56,138,210,74,89,113,175,132,228,214,93,92,156,32,174,225,187,45,107,88,77,11,92,220,206,64,101,26,145,228,112],[22,210,125,27,192,61,209,38,252,98,226,224,26,78,4,229,0,69,119,97,110,34,40,227,38,219,197,28,86,164,215,5],[8,108,147,125,59,125,153,93,16,251,166,40,39,25,148,247,112,135,173,77,130,218,12,55,227,66,10,82,33,199,233,222]], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("[", [[105,159,89,76,85,97,230,186,216,197,188,89,206,169,20,120,243,120,223,185,30,234,138,81,70,30,39,189,132,203,123,252],[227,247,161,53,165,205,147,105,139,23,238,152,35,14,139,73,181,85,190,136,89,17,199,40,108,237,229,250,175,194,109,251],[207,194,67,86,198,218,108,78,221,248,40,126,158,149,1,160,216,227,152,160,70,200,82,100,67,235,216,150,11,110,146,68],[103,251,22,50,56,41,57,65,10,153,181,141,5,161,159,82,99,11,88,117,148,10,211,209,218,78,125,74,69,174,228,74]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("i9ita", [[143,82,145,72,47,186,235,23,204,194,182,57,31,139,205,43,150,155,205,21,171,91,90,171,124,93,77,5,107,251,65,233],[142,5,121,203,120,9,172,37,117,235,114,22,106,254,191,50,17,32,253,68,59,82,47,236,139,110,144,29,121,65,66,159],[72,149,242,243,107,186,229,17,8,245,33,35,153,71,0,77,65,100,246,81,58,5,31,224,135,134,217,125,246,60,15,253],[100,121,211,98,174,98,91,148,242,91,40,229,243,230,97,152,14,89,211,206,243,220,189,185,211,29,183,6,141,93,106,72],[10,182,126,228,226,211,252,69,39,114,171,220,52,102,48,233,54,65,198,16,123,192,153,255,253,192,130,239,168,118,230,186]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(97, "0ra89w", [[88,125,75,6,4,228,110,19,76,97,126,119,174,239,124,99,133,156,236,210,173,111,109,149,169,42,156,178,236,179,21,164],[62,194,209,98,176,242,6,108,76,220,247,69,99,205,140,157,43,150,76,17,135,166,219,49,94,239,83,51,179,220,185,22],[151,155,164,174,48,41,181,136,136,176,14,234,94,56,218,241,194,42,41,229,199,232,186,178,31,154,7,52,57,156,246,133],[122,199,185,9,61,145,53,125,128,181,74,135,242,197,67,38,100,22,232,27,205,101,145,84,21,241,68,192,111,120,150,224],[175,117,108,107,18,12,19,189,120,41,43,190,32,121,24,52,175,105,34,179,250,236,179,19,231,55,251,23,112,131,95,147]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(127, "0ra89w", [[50,146,223,146,177,49,23,185,10,135,121,185,253,126,238,27,145,225,96,132,120,229,24,49,250,217,226,94,140,170,87,230],[95,202,58,196,139,158,210,164,87,106,107,26,24,116,11,153,250,25,235,189,158,165,128,217,143,81,155,233,84,46,235,246],[31,106,26,78,149,244,71,31,54,26,200,103,61,190,116,96,24,77,140,180,196,58,1,113,231,250,51,36,154,208,78,90],[178,231,93,51,16,8,11,93,247,101,175,106,96,121,8,150,11,132,76,64,19,5,137,209,240,237,62,216,149,241,84,33],[0,75,244,168,62,249,231,125,60,121,137,216,14,161,51,75,210,48,206,216,175,70,146,47,170,73,244,32,76,227,216,54]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("P", [[162,34,191,72,28,78,224,62,62,90,159,220,87,105,17,15,218,116,222,208,5,228,40,2,220,119,216,177,254,249,62,84],[105,23,173,131,135,2,198,236,35,52,137,30,187,72,177,157,31,9,76,93,148,243,119,115,36,30,93,87,248,247,188,72],[221,198,73,132,121,76,146,81,45,35,199,44,68,185,215,224,106,93,218,13,117,170,45,176,8,138,66,0,246,14,26,250],[152,103,241,247,197,38,84,217,62,195,237,233,27,155,139,140,180,211,214,177,10,75,237,219,234,125,148,38,95,233,223,91],[93,110,2,205,213,239,137,162,80,199,112,182,6,210,17,90,37,80,122,237,25,25,100,245,99,115,206,188,111,46,42,145]], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([56],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[7],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(48,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("0ttfam",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Capstones", "2873r9",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("P", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("9sbed", "2i02go",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("ipkqsw", "bofzyb", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("P", "l51da", "f58xqj", "jy9vyf",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("Capstones", "l51da", "bofzyb", "i9ita", "[",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("pcalb",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("L", 254,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("2873r9", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("[",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("2i02go", 1532892062,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("P", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(127,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["l51da","0ttfam","i9ita"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[11,69,221,104,155,13,116,153,218,246,153,183,109,130,255,60,156,169,33,162,198,200,139,161,223,215,11,190,161,70,56,122],[36,19,134,143,61,194,36,255,199,100,8,196,135,199,220,123,73,96,55,120,121,222,153,154,71,252,147,196,232,94,78,20],[164,228,176,229,176,44,177,96,42,62,87,146,70,90,238,44,180,222,181,118,109,217,244,181,107,58,73,75,251,235,106,202]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(8, 8, 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([254,147,81,1,173,214,248,198,95,77,226,140,56,42,249,138,189,226,216,96,172,28,33,196,163,22,169,87,197,160,19,235], [116,28,59,79,83,0,216,55,216,132,239,183,162,159,213,102,254,74,98,72,72,135,224,24,232,37,139,159,94,132,14,61],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([167,42,161,81,140,50,84,144,173,151,128,49,79,216,153,169,135,165,111,91,183,168,239,210,35,217,218,152,102,80,25,218], [182,115,192,227,164,70,7,224,219,217,140,77,108,42,45,90,164,134,160,144,244,81,71,212,165,28,86,108,109,129,249,58], [104,206,60,55,119,72,47,213,193,81,28,157,154,67,124,31,162,145,19,181,66,213,52,82,40,206,28,102,76,217,20,153],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([135,4,30,27,159,108,117,26,236,39,9,194,197,109,145,171,151,111,30,234,121,46,112,252,71,100,3,180,3,157,223,80], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([74,147,170,64,145,136,140,234,2,188,106,229,141,69,61,57,167,216,166,148,247,163,111,129,23,222,137,106,12,106,155,39], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([80,129,13,144,142,142,104,191,51,162,138,212,161,137,195,55,38,9,162,154,248,39,3,199,210,199,58,254,252,45,187,165], "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [145,42,152,233,246,11,127,246,150,139,243,231,135,13,128,94,77,39,196,205,69,201,3,148,220,113,213,91,118,175,82,29],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([3,147,146,31,21,242,81,27,237,153,119,49,85,219,129,68,144,229,43,251,61,201,100,92,93,228,232,35,230,19,17,216], "L", [254,107,61,150,67,159,58,154,89,65,83,189,160,131,148,145,128,217,206,181,38,253,148,135,71,104,152,160,123,25,218,71],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([219,28,165,219,82,107,244,91,118,130,3,29,74,167,152,227,51,40,242,248,206,60,83,71,194,27,64,7,60,93,43,242], [79,137,101,245,9,12,178,185,178,5,32,191,97,146,63,219,227,243,77,196,19,220,21,190,187,177,167,137,88,38,180,122], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([219,28,165,219,82,107,244,91,118,130,3,29,74,167,152,227,51,40,242,248,206,60,83,71,194,27,64,7,60,93,43,242], [33,57,27,79,57,174,242,86,58,77,156,191,138,122,155,191,223,120,40,196,160,6,206,52,93,101,181,69,244,103,71,162,117], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([185,94,42,92,158,210,147,93,70,192,115,113,172,226,169,105,101,27,242,186,91,76,212,155,153,196,27,58,37,242,107,171], [70,238,104,246,139,187,99,111,111,225,208,48,0,172,149,208,215,229,208,184,236,142,175,196,47,79,67,221,201,115,97,182], [67,161,185,240,19,127,184,29,5,234,75,203,210,45,101,107,26,180,172,113,131,212,30,215,50,219,23,57,102,124,214,60], "0ra89w",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([237,187,139,88,100,203,202,28,181,49,253,71,92,224,106,80,246,152,168,118,82,9,222,41,47,31,89,239,185,124,211,230], [60,7,115,236,192,23,100,108,10,32,219,138,23,166,252,37,167,90,35,225,71,79,216,150,187,134,251,135,62,225,189,62], [69,34,236,54,180,135,110,11,43,168,215,181,78,157,246,58,219,191,240,82,62,167,182,150,47,159,118,173,55,207,168,117], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([35,237,98,139,147,48,115,110,67,225,29,233,72,168,111,182,65,244,30,126,241,166,182,82,87,242,110,115,63,88,111,167], [97,147,132,250,105,157,238,30,97,127,1,0,109,138,194,122,107,166,77,183,83,183,132,111,199,176,102,162,195,184,202,185], [179,65,72,83,0,227,19,253,8,4,65,86,179,42,47,171,94,29,202,201,217,157,233,145,9,49,143,200,168,58,161,56], "bofzyb",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([231,123,6,139,50,24,149,115,164,146,154,206,193,139,180,160,106,91,217,141,124,220,176,244,142,196,30,1,233,130,52,153], [29,250,45,36,148,186,130,102,245,136,144,199,210,189,92,96,127,236,32,208,83,55,66,98,79,96,215,189,63,184,12,58], [126,56,76,169,71,30,134,96,28,132,226,236,133,136,231,103,155,250,231,41,103,4,191,230,164,139,139,143,246,19,63,235], "0ra89w",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([11,196,165,233,151,222,161,55,238,31,8,107,71,205,151,150,26,175,97,111,185,22,146,75,79,185,122,98,8,226,205,0], [200,84,203,31,22,28,67,135,94,100,181,69,111,183,31,57,52,105,135,248,11,113,251,132,172,49,109,108,243,110,39,101], [107,205,184,99,101,26,196,139,231,100,65,24,209,80,19,133,46,90,145,55,2,48,176,95,132,120,44,129,232,218,6,177], "f58xqj",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([202,75,67,176,120,184,245,221,208,224,141,233,223,150,141,142,252,148,146,194,161,201,20,137,181,155,176,131,146,57,180,145], [227,138,211,130,101,116,199,204,231,125,216,37,239,65,64,216,173,50,211,3,56,192,234,192,163,215,243,101,119,235,151,218], [100,87,202,248,88,214,234,191,191,114,3,47,4,146,232,171,71,24,193,28,154,198,168,41,254,36,200,94,150,43,196,202], "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([51,210,223,235,25,208,190,174,53,97,103,162,99,223,123,230,135,32,107,36,245,110,220,38,240,67,167,169,189,151,132,51], [224,40,121,57,91,64,245,75,90,54,83,37,43,11,36,139,32,210,193,117,39,238,102,217,235,237,236,148,96,211,20,71], [13,129,243,168,98,74,248,79,16,154,113,129,225,92,236,220,0,91,213,154,187,65,14,249,181,52,193,97,41,121,20,196], "l51da",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([90,41,121,79,114,159,128,247,78,120,209,229,149,255,39,63,37,11,216,25,11,112,246,227,215,216,144,113,43,85,6,74], [192,215,164,249,162,148,248,6,8,6,97,29,134,200,103,86,166,108,10,245,50,81,68,240,15,45,12,225,118,141,73,142], [222,191,44,15,237,6,88,106,216,165,139,190,223,182,132,145,86,242,30,194,174,220,143,1,212,24,167,10,79,215,98,191], "Capstones",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([116,2,135,230,134,48,213,26,179,192,249,134,100,137,215,241,203,139,23,235,69,26,51,119,64,136,183,190,223,241,119,37], 19, 21, [211,53,157,13,54,117,215,10,193,18,187,122,58,97,199,142,58,31,147,19,175,230,36,62,252,238,181,254,46,237,167,47], 255,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([119,119,155,159,140,103,149,252,213,81,125,177,53,117,124,237,245,132,211,218,39,139,157,60,86,84,16,190,241,29,150,226], 21, [160,10,68,1,131,228,104,111,118,220,228,194,32,33,185,190,223,217,60,185,103,2,50,254,183,118,66,230,247,126,40,224], [136,59,159,94,140,8,22,141,150,71,50,35,230,248,244,107,21,172,121,35,84,139,20,27,91,229,244,178,154,245,26,129],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([49,221,210,176,140,47,186,99,28,209,12,206,124,89,228,212,5,140,234,57,62,212,234,108,232,88,198,183,2,184,17,236], [166,92,131,209,142,229,174,45,116,20,253,116,118,87,52,210,200,102,171,20,2,106,12,189,103,124,37,20,26,198,114,124,15,172,5,210,77,170,106,122,181,135,93,131,176,55,248,212,127],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([102,73,59,203,155,136,27,81,40,252,45,52,8,152,106,8,89,122,45,64,54,178,86,213,165,101,53,169,238,61,29,181], [217,217,239,185,101,233,150,136,21,155,28,173,248,114,175,144,75,98,89,175,74,212,71,185,164,205,74,121,206,72,102,250,113,195,165,130,57,66,143,57,229,109,131,215,101,67,119,26,145,95,205,160,115,137,248,240,38,120,89,10,59,250,179,206,213],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
