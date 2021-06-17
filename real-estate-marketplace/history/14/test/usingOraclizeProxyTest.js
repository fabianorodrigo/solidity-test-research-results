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
    contractERC721MintableComplete = await ERC721MintableComplete.new("0","98d4za",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("0","98d4za",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("L","P","98d4za",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("L","P","98d4za",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(1,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("0",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("j1m5k",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("1f47n8", 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("ERC1820_ACCEPT_MAGIC", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(98, "0", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(57, "[", "Transaction successfully verified.", 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("[", "Transaction successfully verified.", 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Capstones", "1f47n8", "98d4za",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(1532892063, "P", "Transaction successfully verified.", "0cokis",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(1, "1f47n8", "Transaction successfully verified.", "Capstones", 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("j1m5k", "[", "h7c1ak", 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("[", ["[","0","0cokis","0cokis","Transaction successfully verified.","Transaction successfully verified.","P","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","j1m5k"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(15, "9j2o4", ["\x19Ethereum Signed Message:\n32","pm43br","\x19Ethereum Signed Message:\n32","1f47n8","98d4za","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(101, "98d4za", ["j1m5k","9j2o4","L","9j2o4"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("1f47n8", ["P"], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("Capstones", ["pm43br"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(18, "j1m5k", ["9j2o4"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(49, "0cokis", ["98d4za"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("ERC1820_ACCEPT_MAGIC", ["j1m5k"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("j1m5k", ["ERC1820_ACCEPT_MAGIC","z70nl9"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(98, "\x19Ethereum Signed Message:\n32", ["0cokis","0cokis"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(86, "98d4za", ["L","L"], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("1f47n8", ["ERC1820_ACCEPT_MAGIC","0cokis"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("[", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","1f47n8","pm43br"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(200000, "\x19Ethereum Signed Message:\n32", ["Capstones","98d4za","1f47n8"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1, "1f47n8", ["4qe678","0","Transaction successfully verified."], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["0","j1m5k","P"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("2u4wok", ["[","1f47n8","\x19Ethereum Signed Message:\n32","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(2014223715, "h7c1ak", ["1f47n8","o2al8l","4qe678","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(1023, "[", ["z70nl9","0cokis","Capstones","98d4za"], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("P", ["1f47n8","2u4wok","z70nl9","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("L", ["L","h7c1ak","98d4za","1f47n8","0cokis"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(160, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["o2al8l","j1m5k","z70nl9","z70nl9","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(63, "P", ["2u4wok","P","o2al8l","9j2o4","L"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("o2al8l", ["h7c1ak","L","P","0","1f47n8"], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("98d4za", [[64,250,60,204,139,148,103,178,249,62,167,166,178,189,33,188,154,126,27,67,40,97,191,132,249,253,33,5,164,142,29,37],[142,49,52,100,237,251,133,83,174,110,229,95,45,174,239,224,131,144,163,104,72,7,228,143,72,229,121,75,8,53,209,240],[210,92,255,251,212,63,90,125,94,82,94,133,160,129,37,216,9,40,20,29,103,228,108,159,40,160,184,3,194,232,144,37],[51,232,162,145,115,106,177,77,209,211,239,37,69,142,117,220,192,229,190,7,149,163,15,136,5,79,130,6,108,41,57,163],[221,8,132,190,9,182,131,45,194,4,108,223,219,107,86,75,155,251,86,54,133,211,249,51,174,93,207,12,186,21,231,182]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(1024, "j1m5k", [[10,8,116,213,89,121,70,215,18,156,112,85,174,168,27,244,32,36,15,146,227,83,162,4,42,4,34,126,128,124,180,188]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(161, "xmcitf", [[18,80,104,113,250,207,36,217,220,40,98,69,168,162,134,49,144,245,128,42,24,79,216,32,253,52,65,244,247,41,17,180]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("h7c1ak", [[127,128,215,170,232,23,16,217,189,240,43,17,28,10,153,54,144,83,78,174,197,35,197,98,105,247,145,6,22,115,166,65],[1,96,110,42,252,192,56,209,210,38,151,42,248,104,34,223,169,185,10,186,76,43,121,92,84,87,195,49,229,120,230,52],[16,108,59,75,57,42,15,188,135,14,242,102,28,78,168,129,185,247,126,52,120,147,249,228,162,12,250,3,201,68,195,30],[245,212,220,190,50,233,7,214,177,51,150,94,233,150,193,214,36,1,57,66,235,116,103,242,41,190,67,181,99,35,154,175],[18,222,164,231,32,172,27,105,250,166,114,242,232,17,24,190,66,211,211,185,56,69,65,219,211,48,58,223,97,203,190,173],[43,250,172,190,200,247,123,162,86,26,221,128,193,24,182,98,79,111,214,63,43,181,34,245,18,27,179,248,65,54,245,127],[152,215,135,174,64,189,206,140,176,222,139,8,128,168,143,4,255,141,212,200,30,69,76,182,176,110,221,139,224,151,30,18],[213,182,97,235,235,200,254,104,201,146,163,248,113,5,71,78,182,1,4,176,158,139,152,209,103,204,15,17,148,36,8,32],[103,179,47,11,208,97,241,116,1,64,100,198,88,183,133,191,165,157,77,97,14,75,134,200,134,63,137,58,156,253,218,142],[5,41,61,51,48,123,205,149,187,229,40,253,50,251,249,240,171,52,2,226,230,35,8,17,17,18,157,179,69,228,211,125]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("xmcitf", [[36,118,55,217,64,147,243,202,20,178,145,162,85,112,92,132,52,80,0,215,179,2,161,189,7,138,32,242,76,140,19,232]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(59, "z70nl9", [[94,241,151,91,1,8,208,229,206,7,225,94,31,10,32,198,252,114,159,190,29,58,190,52,66,33,142,43,76,165,198,70]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(65, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[192,23,202,193,139,207,128,133,218,201,163,39,189,92,234,110,123,190,79,127,201,224,116,163,135,151,117,82,161,161,66,112]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("98d4za", [[143,220,190,38,27,96,113,233,139,118,62,73,144,151,28,235,204,74,17,198,46,55,231,242,35,140,186,119,78,202,52,145]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("0", [[207,247,246,14,215,122,48,144,29,96,113,66,239,186,152,242,40,122,221,71,148,236,129,211,223,170,79,245,35,212,84,65],[134,169,159,27,239,119,37,209,246,244,101,91,103,217,231,226,110,203,146,59,159,229,18,249,144,255,76,33,53,147,205,167]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(128, "j1m5k", [[160,7,3,176,97,192,192,183,238,48,129,241,36,251,30,254,169,246,234,121,137,252,167,214,221,193,81,127,144,238,172,248],[32,181,200,176,245,175,194,24,173,252,204,207,240,104,34,57,174,113,90,245,88,27,165,127,24,168,242,202,249,82,242,203]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(18, "[", [[144,118,187,184,57,156,127,246,132,30,11,253,66,90,166,35,221,89,4,75,156,73,61,184,26,176,91,71,148,96,227,52],[125,137,24,54,78,44,43,125,83,196,246,143,111,247,253,31,6,113,183,100,89,24,127,8,4,206,93,61,173,101,219,226]], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("98d4za", [[228,116,199,139,103,48,123,89,193,5,236,230,235,255,131,180,187,183,39,252,182,14,230,172,90,196,84,136,241,28,241,163],[213,34,239,43,24,92,105,72,205,240,228,150,125,220,245,142,30,122,247,222,74,201,72,32,30,114,22,149,167,114,169,142]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("0cokis", [[20,34,27,78,144,52,234,166,237,124,86,212,209,167,153,195,131,112,75,111,36,177,154,31,64,242,176,195,34,252,87,68],[15,67,138,124,111,142,213,59,6,165,68,38,85,179,161,52,252,169,203,239,37,85,160,54,157,226,54,25,87,79,229,245],[141,243,18,85,66,0,23,104,51,11,236,215,220,71,164,215,109,232,239,159,49,12,127,154,128,224,241,207,191,240,124,4]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(56, "1f47n8", [[31,76,111,183,197,190,50,220,231,21,212,172,186,169,114,247,180,85,3,183,173,218,89,125,233,133,157,17,138,116,226,181],[116,101,74,147,172,69,53,150,142,91,84,40,94,108,25,142,20,51,47,200,69,12,217,144,89,99,62,11,222,129,171,103],[136,195,227,191,228,167,118,101,232,126,46,12,79,156,249,152,60,74,113,99,87,189,91,169,24,248,24,207,52,8,61,79]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(95, "[", [[14,143,58,237,121,155,253,247,35,33,148,167,172,155,68,253,184,214,229,219,249,62,75,227,140,37,116,39,28,79,67,88],[9,40,27,114,84,102,110,9,240,226,155,113,197,28,27,210,125,81,160,244,253,61,138,133,96,38,223,171,172,240,33,124],[31,179,16,243,245,203,162,84,107,134,58,165,9,121,166,251,232,40,113,25,98,117,218,159,19,109,219,4,161,6,211,145]], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("vtkc8h", [[250,168,17,178,29,241,186,23,156,168,13,248,52,204,27,95,176,66,22,132,216,219,127,182,241,138,233,6,200,217,49,178],[137,183,107,242,66,125,83,82,175,251,51,161,157,250,74,94,79,174,97,167,250,66,174,33,167,44,55,87,101,179,122,19],[205,114,242,142,10,116,114,60,57,128,19,224,83,117,188,103,57,61,230,82,164,218,79,203,104,196,99,184,196,127,165,138]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("h7c1ak", [[177,9,168,59,30,254,249,204,3,175,164,103,114,254,1,178,106,100,100,10,129,250,109,90,59,83,202,245,128,175,228,45],[184,4,111,241,18,73,235,199,194,225,112,151,109,16,58,1,137,65,214,131,231,31,237,166,229,184,4,244,17,133,7,199],[32,129,239,183,180,113,194,66,108,233,75,5,172,252,177,109,73,151,97,32,91,117,146,236,252,121,177,107,135,160,179,199],[0,4,95,156,134,73,71,89,67,248,29,73,112,27,155,120,10,190,208,7,139,112,237,99,179,219,110,127,190,1,199,250]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(21, "2u4wok", [[81,138,240,181,234,223,8,203,184,152,221,78,239,107,192,189,205,33,157,81,75,30,61,11,10,132,22,241,84,194,5,172],[94,222,194,7,25,90,217,149,50,195,215,35,158,145,69,14,72,21,110,130,200,202,190,158,251,158,48,231,205,247,128,248],[23,116,184,71,1,194,64,192,147,79,54,246,111,160,212,251,235,159,145,124,91,4,151,161,108,136,124,251,166,174,91,178],[244,243,159,153,85,148,62,166,210,134,251,90,55,1,249,194,151,154,27,98,39,83,192,75,5,63,33,32,126,126,188,150]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(21, "Transaction successfully verified.", [[226,100,32,76,240,183,102,203,194,96,242,202,25,178,246,224,247,79,156,127,146,67,86,92,170,142,90,17,190,213,126,71],[56,127,98,231,6,213,220,20,21,152,252,74,148,31,159,32,34,145,14,142,109,137,179,6,242,194,160,44,118,55,86,151],[35,127,109,199,191,24,176,38,168,86,29,114,71,236,215,123,72,37,146,52,74,115,107,0,119,10,229,48,238,121,224,215],[157,102,31,70,132,212,30,76,20,212,254,21,66,228,56,113,0,19,209,147,40,220,184,206,59,27,96,94,217,53,62,82]], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("h7c1ak", [[187,154,91,145,236,228,253,87,88,121,206,16,78,12,123,202,46,34,41,253,77,122,53,144,14,140,2,225,149,63,113,95],[137,11,234,57,150,35,209,245,96,199,126,98,183,249,51,253,17,55,182,82,163,178,117,115,255,169,102,59,1,69,53,37],[188,17,212,199,193,229,208,83,216,250,245,54,140,83,168,78,107,96,181,231,163,4,58,48,62,165,35,228,36,170,3,96],[83,72,253,147,131,152,10,239,182,42,153,161,212,146,157,246,121,139,21,207,49,46,109,174,60,185,38,78,201,162,151,83]], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("0", [[128,218,52,186,44,113,36,157,221,197,161,161,19,140,143,138,81,251,91,92,30,104,166,57,141,158,53,228,196,222,154,54],[231,167,226,65,26,22,175,120,218,78,117,34,152,223,110,244,61,199,121,198,31,21,120,28,94,115,51,0,133,29,33,143],[69,13,163,67,210,168,26,127,105,30,137,192,180,24,248,244,204,234,168,204,4,187,242,71,121,116,48,34,19,222,27,239],[106,93,95,8,211,97,184,88,103,105,147,0,173,150,8,158,167,167,117,17,10,193,0,144,123,128,174,159,249,103,52,61],[50,159,61,78,255,62,22,87,28,226,67,42,48,203,235,232,50,55,146,116,138,88,75,111,38,32,143,241,69,166,90,86]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(6, "vtkc8h", [[203,80,11,96,167,202,152,102,160,150,205,60,41,255,72,215,187,77,48,161,32,8,80,221,192,102,22,230,55,204,221,154],[149,180,170,29,99,62,37,125,155,248,85,61,77,181,132,0,132,222,150,112,101,200,13,139,14,116,9,41,43,249,161,195],[203,15,56,41,77,245,54,2,79,207,212,28,143,177,205,164,33,213,226,19,242,82,30,136,93,191,165,87,42,98,68,212],[197,71,78,80,246,168,124,224,156,26,115,32,181,5,85,222,251,33,237,24,159,49,56,165,10,1,117,164,220,130,153,201],[15,92,56,173,217,122,103,111,186,221,58,216,237,79,27,18,209,97,250,191,86,199,136,8,202,90,34,110,24,197,228,27]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(71, "h7c1ak", [[201,110,189,173,250,252,93,221,254,164,175,155,9,243,253,14,190,79,164,18,12,38,174,246,253,242,96,142,146,135,3,104],[17,101,190,164,92,121,236,25,184,167,174,100,93,95,84,94,242,151,202,169,154,211,183,98,55,168,91,163,250,49,106,93],[246,142,177,113,176,226,55,155,42,27,8,224,115,202,38,179,120,40,139,191,51,205,38,230,95,226,249,171,131,225,118,228],[213,142,151,157,14,162,44,89,50,160,202,106,37,245,16,128,78,72,77,229,173,243,209,210,87,177,19,186,134,89,244,20],[129,101,171,96,87,101,65,121,191,38,170,194,2,144,168,154,51,240,35,0,85,33,3,38,249,3,176,20,92,213,156,10]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("vtkc8h", [[192,21,182,24,7,5,255,144,119,250,255,9,118,120,49,143,60,137,167,82,16,147,94,230,19,65,216,106,67,60,191,224],[78,113,143,20,235,37,150,159,232,28,252,128,197,244,62,184,153,160,78,239,1,51,128,247,30,42,110,140,241,29,167,250],[201,237,176,155,233,130,95,54,73,119,69,208,83,251,33,158,46,137,206,238,184,150,217,78,124,50,132,7,103,165,56,19],[200,66,29,3,158,177,72,238,8,94,40,149,119,11,67,126,210,62,7,49,62,80,132,104,17,103,216,244,231,115,52,111],[145,117,87,45,79,235,12,184,203,40,29,195,76,171,15,142,210,185,108,188,129,226,189,187,102,29,136,207,45,164,94,134]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([87],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[2],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(161,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("0",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Transaction successfully verified.", "pm43br",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("Transaction successfully verified.", "na15j",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("98d4za", "o2al8l",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("na15j", "0cokis", "z70nl9",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("9j2o4", "1f47n8", "vtkc8h", "2u4wok",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("j1m5k", "L", "98d4za", "z70nl9", "vtkc8h",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("[", 26,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("[", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("na15j",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("P", 2014223716,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("2u4wok", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(103,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["9j2o4","1f47n8","pm43br","i80n4s","na15j","0cokis","P","0"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[164,206,198,165,38,113,52,126,236,83,242,209,224,57,99,19,152,184,228,20,249,55,250,73,224,62,59,251,235,119,141,58],[60,69,163,253,175,230,176,61,158,106,145,26,0,223,159,111,137,248,241,15,23,181,158,140,152,138,144,172,157,164,40,215],[126,147,102,60,208,242,227,73,6,88,250,189,192,42,83,31,111,228,204,50,16,46,149,152,129,249,182,148,134,74,144,153],[231,25,110,79,227,56,255,105,181,225,201,7,24,57,219,253,88,61,199,102,105,65,92,73,118,47,135,181,175,109,9,18]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(0, 56, 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([227,2,211,234,188,245,202,229,15,134,93,218,213,33,36,37,94,154,105,137,103,239,176,42,27,1,97,125,205,83,109,195], [201,83,167,188,76,88,211,226,126,212,44,171,20,90,239,227,195,236,69,234,41,142,27,152,144,201,46,128,251,25,11,170],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([75,237,182,179,88,189,140,176,144,178,233,137,101,230,14,193,210,247,91,255,73,98,244,224,158,246,232,24,141,254,191,63], [37,89,244,243,255,225,206,59,237,24,206,83,57,52,30,16,112,104,219,175,180,95,172,120,192,52,70,175,229,166,207,69], [42,122,14,52,22,138,251,37,170,29,188,108,227,96,216,39,203,62,154,207,204,127,121,70,42,0,22,94,107,30,13,133],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([16,6,245,211,177,174,25,132,236,47,56,117,7,59,90,100,108,8,65,166,162,232,32,101,201,211,51,67,218,4,197,154], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([60,213,27,163,35,223,77,153,138,233,206,24,83,179,191,194,219,187,222,151,65,99,189,244,4,118,104,11,193,176,106,53], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([248,37,254,55,200,21,32,171,196,125,49,3,33,84,152,192,221,57,62,111,211,135,87,103,239,210,22,50,73,222,60,114], "L", [60,162,18,62,29,123,44,172,140,138,70,51,232,70,123,207,228,191,127,131,80,39,212,244,129,233,110,26,170,135,71,231],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([223,47,160,243,146,222,198,3,23,237,50,170,147,182,248,185,198,160,6,44,191,58,5,78,168,8,75,204,15,21,107,10], "na15j", [234,89,199,110,140,16,147,78,175,108,61,182,216,48,218,232,149,52,109,86,102,60,46,11,220,20,20,60,146,95,6,13],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([95,34,235,174,224,184,82,16,130,92,239,231,187,218,252,74,148,148,199,107,169,21,207,177,73,229,205,71,169,123,149,102], [90,52,105,175,42,104,137,30,206,76,179,37,38,25,231,51,61,55,86,118,246,42,167,134,81,101,16,140,228,59,122,136], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([95,34,235,174,224,184,82,16,130,92,239,231,187,218,252,74,148,148,199,107,169,21,207,177,73,229,205,71,169,123,149,102], [37,5,13,27,33,41,153,247,160,246,43,199,61,77,101,144,193,141,169,246,225,64,158,20,188,117,150,192,58,148,204,66,232], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([27,216,166,208,12,67,236,142,159,45,9,138,232,100,16,145,152,136,49,210,205,128,77,43,80,86,165,171,182,247,194,166], [234,239,58,143,162,238,121,34,210,197,191,72,42,233,153,161,33,172,194,188,7,21,23,22,8,129,220,34,53,99,43,165], [220,78,43,6,20,134,144,71,25,165,29,114,56,125,117,253,119,167,201,191,216,204,196,133,100,46,102,234,186,29,27,135], "xmcitf",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([18,116,75,183,178,40,194,77,218,164,200,238,8,200,103,53,207,246,80,202,120,111,197,11,165,71,200,206,152,160,109,89], [239,132,87,189,37,14,105,180,177,218,58,224,204,234,191,249,107,4,224,82,36,90,132,118,117,107,194,69,206,97,204,99], [144,249,241,160,196,7,86,174,234,226,19,229,239,81,27,19,97,43,216,13,193,75,234,20,254,199,235,20,224,34,200,96], "9j2o4",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([160,253,68,154,214,116,128,155,93,80,147,27,168,89,72,230,189,47,172,49,223,22,123,72,82,132,29,18,19,136,16,254], [159,45,151,132,43,149,210,100,150,198,87,170,50,101,163,43,66,108,142,182,67,196,3,238,137,89,126,30,220,253,170,202], [109,164,240,223,147,56,220,23,224,34,68,129,146,106,194,184,244,211,110,191,45,98,83,20,228,226,214,77,186,11,103,32], "dxi8ub",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([62,80,189,99,149,108,137,128,17,50,237,225,243,157,158,13,109,118,177,193,70,173,224,107,41,120,211,238,250,160,57,245], [16,25,165,180,150,136,254,38,169,135,47,37,250,242,170,205,139,166,208,173,254,50,169,19,28,101,129,5,106,28,209,98], [75,182,143,81,107,57,160,66,14,48,146,186,208,202,5,163,100,191,70,111,187,225,147,205,227,195,177,35,155,45,250,36], "98d4za",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([81,54,214,9,141,132,232,127,5,77,78,245,35,245,38,219,91,23,94,62,121,144,243,2,21,250,69,39,99,74,61,127], [151,101,179,222,33,96,153,213,158,157,83,180,179,88,120,2,133,41,23,131,159,120,1,77,213,141,64,113,69,176,171,113], [87,60,233,52,7,116,33,48,159,235,191,150,198,47,32,113,155,2,186,106,28,208,97,166,181,197,83,197,148,138,155,163], "j1m5k",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([242,3,34,116,51,170,186,212,44,31,190,228,194,228,193,185,125,105,137,105,236,101,188,89,136,184,233,184,246,64,75,177], [130,10,153,125,124,3,85,90,211,161,184,171,255,224,137,166,154,131,215,109,197,85,24,216,121,248,10,245,109,21,67,81], [203,247,253,86,108,22,54,50,77,55,124,151,94,74,55,68,245,226,20,9,187,252,127,204,130,205,218,26,103,214,195,50], "dxi8ub",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([193,255,20,11,37,207,112,156,77,69,73,17,152,244,99,103,52,5,50,160,101,146,49,115,78,224,43,80,130,80,223,98], [2,94,206,118,108,223,52,206,143,192,0,167,116,85,46,243,178,22,214,14,106,14,23,64,207,15,109,26,12,9,85,168], [151,241,111,175,169,246,251,159,147,163,149,41,86,61,228,4,135,26,253,100,138,96,69,116,16,221,26,145,149,16,224,154], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([96,120,219,178,165,189,162,111,64,71,103,147,15,58,239,225,167,103,84,177,104,157,118,152,153,187,141,222,96,56,109,34], [175,108,142,189,13,44,45,16,182,29,27,1,121,12,245,232,42,215,131,120,67,230,210,196,80,124,242,112,47,34,83,135], [4,233,79,116,157,47,248,107,32,67,231,2,165,229,212,192,199,154,126,198,58,122,101,46,182,54,212,18,211,199,18,237], "26o2gs",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([172,22,170,188,244,161,170,202,139,61,232,6,250,252,14,156,204,163,229,99,14,11,46,123,174,236,164,84,205,0,74,0], 1532892062, 48, [202,234,79,82,43,10,39,185,146,210,149,178,157,98,50,127,34,103,67,206,242,222,223,136,215,174,86,118,175,241,167,38], 58,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([77,216,207,113,243,106,163,50,241,77,123,156,151,142,136,251,113,250,251,48,236,191,199,159,5,79,133,208,127,241,173,155], 7, [26,160,220,136,70,247,54,224,87,7,170,247,80,154,11,3,101,48,57,53,70,161,8,148,178,44,13,69,100,141,171,236], [208,87,14,73,111,4,18,44,141,136,18,82,188,132,139,108,104,205,244,197,145,93,200,254,34,149,225,212,208,111,168,250],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([166,55,194,223,136,204,127,128,17,6,24,13,39,118,191,96,252,217,96,113,170,150,75,180,246,246,3,96,99,109,210,88], [183,153,132,176,229,35,49,155,218,219,166,114,229,125,104,65,145,206,169,138,211,66,205],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([27,245,17,129,146,136,4,185,214,49,48,149,171,217,212,27,96,5,190,152,207,244,147,162,211,114,77,166,90,12,92,28], [42,194,112,250,150,199,136,102,162,85,163,153,81,133,225,168,242,25,240,18,27,134,131,29,182,153,112,120,147,146,60,9,99,183,200,73,221,248,27,254,127,116,41,14,233,162,208,110,218,227,44,7,39,83,191,212,123,20,66,143,49,91,37,195,36],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
