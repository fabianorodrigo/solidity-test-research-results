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
    contractERC721MintableComplete = await ERC721MintableComplete.new("0","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("0","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("[","P","0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("[","P","0",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(8,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("vafyga",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("4bx8ip",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Transaction successfully verified.", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("0", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(30, "[", "vafyga",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(47, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "L", 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "vafyga", 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Transaction successfully verified.", "4bx8ip", "vafyga",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(56, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "0", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(103, "P", "\x19Ethereum Signed Message:\n32", "ERC1820_ACCEPT_MAGIC", 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("ERC1820_ACCEPT_MAGIC", "jmv21g", "0", 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("4bx8ip", ["0","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(66, "L", ["agpr8d","Capstones","49vjhd","35gio"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(23, "c0azn", ["0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P","49vjhd","L","agpr8d"], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("tdjhe", ["P"], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("57p5en", ["\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(200000, "4bx8ip", ["Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(29, "agpr8d", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("\x19Ethereum Signed Message:\n32", ["tdjhe"], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("vafyga", ["Capstones","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(18, "Capstones", ["vafyga","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(254, "tdjhe", ["L","P"], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("57p5en", ["agpr8d","ohcdyo"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("49vjhd", ["P","57p5en","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(69, "[", ["[","ohcdyo","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(9, "c0azn", ["Capstones","agpr8d","L"], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("35gio", ["Capstones","L","4bx8ip"], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Transaction successfully verified.", ["49vjhd","57p5en","c0azn","vafyga"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(9, "Transaction successfully verified.", ["49vjhd","vafyga","\x19Ethereum Signed Message:\n32","vafyga"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(29, "0", ["ERC1820_ACCEPT_MAGIC","35gio","vafyga","vafyga"], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("tdjhe", ["ERC1820_ACCEPT_MAGIC","c0azn","agpr8d","57p5en"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("wg5p5", ["sdjjek","ERC1820_ACCEPT_MAGIC","[","Capstones","4bx8ip"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(70, "sdjjek", ["L","ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC","c0azn","49vjhd"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(25, "49vjhd", ["ohcdyo","P","ohcdyo","agpr8d","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("0", ["tdjhe","P","49vjhd","[","L"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("57p5en", [[82,226,32,70,180,130,253,77,54,133,97,42,22,74,168,188,184,9,85,57,135,87,202,82,41,134,168,95,60,158,37,18],[71,246,29,237,19,184,106,135,1,73,84,138,135,252,139,221,248,236,116,81,44,17,199,86,194,130,48,204,123,255,143,114],[227,11,224,162,81,99,118,100,146,158,180,240,134,95,144,12,167,206,171,116,95,197,172,132,10,194,144,82,175,251,169,118],[108,183,251,150,128,207,237,101,208,84,99,83,176,149,49,119,1,38,76,90,132,62,100,248,226,76,48,24,250,211,210,173],[141,148,43,145,14,111,121,149,46,207,132,47,134,248,79,26,129,45,172,142,70,148,186,215,223,204,93,139,216,129,47,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(30, "\x19Ethereum Signed Message:\n32", [[195,178,68,222,205,28,84,98,166,133,140,183,246,72,200,50,29,65,131,124,234,16,82,87,200,241,220,190,166,99,38,135],[147,110,89,228,152,125,4,1,56,78,249,212,172,225,70,250,130,153,34,117,146,99,175,250,100,235,88,84,171,142,234,138],[38,64,164,13,178,102,26,229,158,208,71,220,248,74,13,115,212,255,111,252,176,146,232,43,7,111,52,193,100,94,17,199]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(1532892062, "vafyga", [[71,53,219,203,254,20,223,199,43,30,160,236,113,102,180,151,156,192,241,148,78,148,22,13,208,205,41,13,202,88,109,150],[159,245,239,34,140,12,196,62,207,101,226,235,34,221,194,171,52,82,112,151,214,6,174,10,199,205,140,32,34,193,147,162],[123,106,211,209,43,170,115,70,119,23,59,118,218,180,234,234,40,252,105,139,66,104,117,151,132,73,15,127,82,200,57,136],[168,1,206,54,34,41,138,21,92,30,79,201,175,173,158,197,154,128,113,171,18,219,177,196,115,128,117,60,119,26,118,49],[235,161,239,76,116,52,127,182,27,247,47,62,48,53,54,144,174,133,177,60,0,99,132,78,105,237,226,253,99,190,129,196],[61,39,184,252,144,70,140,138,212,65,85,69,165,66,234,85,2,191,46,184,19,22,177,66,221,40,156,253,164,46,170,45],[213,115,117,253,150,32,18,84,250,114,164,204,251,212,135,195,46,72,245,91,27,113,74,116,84,105,68,2,69,153,214,99],[198,170,152,248,207,30,217,242,173,123,136,108,22,127,72,76,96,242,177,16,232,50,216,67,97,247,159,222,55,51,92,116]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("tdjhe", [[111,143,185,158,206,4,96,233,192,93,82,141,17,67,235,130,113,140,109,168,121,174,245,126,85,162,44,183,0,243,43,239],[176,239,183,232,205,189,125,172,162,119,161,109,113,238,136,37,89,202,50,225,16,127,200,95,29,191,93,52,171,46,7,235],[37,123,137,48,255,3,101,15,46,241,191,111,43,68,162,219,91,196,76,137,9,132,129,203,155,52,56,32,50,6,123,149],[102,118,146,77,147,85,152,179,143,211,117,143,19,138,97,127,112,46,113,116,128,26,203,80,130,220,60,0,204,140,211,208],[36,83,253,39,198,189,164,146,190,41,190,164,35,107,109,193,129,41,202,96,191,143,173,212,149,54,209,175,61,99,229,100],[226,105,80,89,192,165,150,88,95,236,101,219,165,254,147,150,246,92,117,172,232,21,86,4,67,84,203,47,217,18,69,118],[216,100,117,74,124,243,241,239,115,93,78,199,71,68,100,91,17,211,242,219,29,132,37,73,146,238,171,10,0,36,207,11],[241,143,173,198,53,156,19,11,162,163,249,65,188,24,172,20,111,149,121,75,19,84,150,11,66,204,46,195,32,47,99,184]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("\x19Ethereum Signed Message:\n32", [[194,120,78,67,209,10,58,70,210,3,95,186,167,173,0,124,251,78,206,144,34,238,107,210,237,31,244,235,63,86,64,1]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(26, "Transaction successfully verified.", [[95,75,21,192,12,152,37,91,159,105,160,164,191,133,105,211,135,183,110,229,251,234,161,171,98,148,14,96,20,156,43,145]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(18, "ERC1820_ACCEPT_MAGIC", [[99,212,227,6,195,16,66,186,89,130,197,242,173,151,206,123,242,35,52,87,60,64,87,34,61,5,156,83,249,247,201,31]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("jmv21g", [[185,229,112,135,253,45,253,21,225,232,242,196,206,223,48,31,191,58,224,29,123,31,249,166,238,160,115,40,14,145,233,216]], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ohcdyo", [[106,213,129,157,37,189,237,212,2,196,129,185,252,110,201,27,72,245,89,94,244,131,79,173,111,16,76,24,83,220,63,189],[177,55,93,92,13,33,61,179,70,148,130,17,204,189,97,85,120,211,193,182,186,174,67,9,30,147,8,61,181,75,25,27]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(96, "Capstones", [[33,107,248,54,14,22,131,73,208,22,134,128,58,227,103,31,34,207,110,74,189,147,166,106,79,231,98,66,130,141,200,175],[219,139,43,110,222,123,198,71,141,147,215,191,87,92,124,35,244,41,36,188,206,216,203,200,88,115,133,142,223,141,216,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(200000, "[", [[225,169,188,231,143,136,122,206,138,102,125,247,20,31,86,153,100,221,65,159,220,69,233,41,234,67,223,161,79,12,199,14],[21,122,62,245,78,33,150,159,114,0,223,210,18,25,57,179,186,56,98,233,160,239,9,160,8,107,253,155,73,246,68,70]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("L", [[235,146,103,220,197,126,41,96,69,76,42,250,237,115,60,190,80,32,237,92,114,30,219,250,137,85,21,94,9,175,110,106],[19,84,91,219,159,104,80,202,85,35,43,153,253,64,91,37,234,224,109,114,200,250,95,238,59,23,114,10,219,9,249,159]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("ERC1820_ACCEPT_MAGIC", [[158,31,39,40,170,77,235,4,82,55,6,19,242,22,92,85,118,155,234,54,23,255,241,106,244,109,196,253,0,192,2,192],[64,186,84,204,159,251,141,51,43,41,76,126,164,168,40,8,58,60,60,214,58,79,191,19,106,244,115,25,38,102,240,109],[56,247,28,119,195,210,38,206,70,255,33,235,140,192,83,253,68,191,105,5,108,189,70,189,205,48,42,190,39,128,148,62]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(257, "P", [[174,103,14,246,142,188,243,124,221,234,65,113,58,84,36,49,228,31,111,73,52,211,144,89,41,90,243,235,202,174,103,43],[64,27,180,36,143,94,142,165,235,191,250,204,100,140,220,171,64,97,54,109,196,47,23,214,59,27,172,50,106,239,106,167],[195,8,211,177,219,153,44,2,212,20,172,72,107,211,44,60,42,192,97,33,204,135,81,224,210,211,119,174,41,138,222,195]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(32, "jmv21g", [[116,214,199,32,177,172,143,184,40,242,5,76,224,43,250,110,6,245,179,220,90,92,15,93,59,70,98,61,113,7,102,136],[114,219,142,251,180,87,7,208,69,139,82,236,21,178,148,230,118,146,157,180,35,78,253,145,192,225,120,178,10,250,155,146],[178,39,142,153,13,45,22,58,152,95,101,91,152,106,51,245,176,55,155,160,90,12,139,70,20,255,178,140,70,198,197,59]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("P", [[76,217,148,213,164,94,84,233,83,36,188,235,145,233,201,98,83,60,4,187,124,227,25,193,97,61,184,45,94,116,199,128],[154,139,138,210,20,212,220,138,197,209,160,168,97,192,173,73,203,198,62,120,68,31,222,214,217,242,170,205,198,168,64,18],[139,196,43,157,40,92,103,49,85,50,98,107,148,183,195,95,104,111,221,206,0,185,25,32,15,8,93,35,229,177,34,254]], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("agpr8d", [[227,181,53,164,251,60,127,181,168,10,219,134,49,15,250,248,226,209,56,102,47,81,175,208,200,241,153,252,16,226,235,85],[1,161,123,102,202,206,151,115,191,75,186,231,117,14,46,6,162,207,72,128,248,3,76,104,121,55,106,66,244,246,25,32],[82,178,124,14,146,113,118,12,179,88,240,161,135,126,23,139,100,247,85,64,197,135,54,220,235,28,126,241,114,183,243,164],[33,188,136,94,14,90,86,0,78,55,32,19,136,200,97,100,137,139,159,233,173,135,219,40,106,79,37,250,225,8,38,72]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(101, "[", [[107,93,40,209,202,167,204,224,137,82,16,67,67,138,232,199,201,113,192,203,16,185,134,71,237,246,189,13,142,194,2,67],[208,116,227,19,27,174,165,249,165,173,87,114,198,216,132,74,163,162,145,11,178,131,73,184,0,135,205,164,43,243,169,65],[185,79,27,212,163,165,78,24,32,175,155,20,211,232,140,239,61,117,148,50,130,65,253,65,150,168,76,97,241,238,233,187],[201,69,117,244,217,62,176,174,197,5,51,140,161,18,32,96,202,11,99,166,253,181,183,219,88,21,231,61,254,85,34,72]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(97, "ohcdyo", [[186,254,32,157,163,141,145,249,192,216,36,79,66,236,86,67,205,98,110,14,220,240,83,227,176,240,90,97,210,195,193,121],[60,68,159,47,199,51,60,139,197,137,126,32,140,212,81,235,228,40,118,48,52,43,72,197,215,235,24,19,231,247,220,175],[87,187,72,254,11,19,0,88,15,211,114,3,52,211,254,200,63,84,66,4,122,114,166,251,89,54,33,192,179,118,1,191],[168,99,121,193,196,189,84,152,116,43,235,112,33,137,18,145,240,73,54,141,201,11,50,74,68,104,169,146,151,177,83,134]], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("4bx8ip", [[216,137,132,47,169,142,44,16,6,11,213,53,105,103,149,219,147,196,130,143,3,72,216,5,108,225,137,159,185,138,154,166],[130,194,173,69,55,35,255,78,48,36,184,105,37,159,183,72,238,32,251,102,43,118,208,10,20,161,72,211,13,240,225,243],[129,25,131,171,61,163,92,2,49,46,102,5,181,13,126,155,16,211,221,145,144,87,7,247,5,162,206,190,47,245,106,236],[189,192,66,213,98,103,248,226,112,194,130,162,46,3,50,100,75,132,148,78,124,137,17,118,210,212,132,95,204,134,204,143]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("L", [[168,109,95,148,248,143,6,117,140,122,196,179,52,205,155,135,71,71,107,62,45,3,71,119,129,120,60,219,206,160,165,183],[154,252,69,152,203,137,130,128,254,20,207,176,227,36,218,128,146,20,141,243,15,198,169,77,1,13,177,186,158,181,48,59],[171,137,66,230,205,222,14,119,232,127,77,234,89,27,81,162,40,59,217,13,22,111,212,93,54,165,139,160,39,230,15,168],[197,125,126,65,75,79,6,231,4,154,80,121,198,149,107,180,131,111,33,189,28,13,72,157,156,46,101,181,200,74,113,195],[84,25,57,18,240,142,211,128,144,88,230,72,70,251,83,83,235,130,58,247,168,160,162,210,180,62,60,182,15,38,200,161]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(22, "vafyga", [[244,181,254,69,227,63,223,217,197,102,147,218,107,69,178,0,221,138,106,92,112,250,233,57,204,235,48,156,216,8,56,244],[85,174,66,169,71,163,252,144,156,50,163,248,32,53,183,54,243,232,40,81,137,142,71,155,49,132,63,26,220,29,226,107],[28,99,174,148,252,148,242,87,205,111,96,89,127,103,45,145,43,91,19,15,239,217,159,177,17,76,32,229,243,167,48,180],[64,169,183,6,137,40,171,227,243,155,131,70,29,191,177,7,103,29,126,50,253,244,17,248,91,218,11,44,131,58,4,80],[132,164,242,239,66,239,252,136,202,149,154,250,16,5,162,57,57,255,29,148,68,38,217,90,50,196,68,205,101,83,148,194]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(102, "35gio", [[141,230,10,122,100,112,164,4,33,239,15,163,87,56,170,149,195,227,139,7,199,220,78,100,8,78,122,21,244,14,219,157],[98,210,173,14,7,166,225,239,22,183,28,39,65,101,74,200,137,209,175,237,237,7,30,106,237,90,176,194,61,197,66,253],[76,21,230,211,181,226,83,14,72,250,119,222,166,0,165,3,162,228,83,198,174,34,57,20,1,129,16,139,186,94,215,104],[197,153,248,156,55,223,43,194,231,179,80,100,153,225,75,202,110,2,10,171,176,110,177,19,224,120,72,242,106,202,16,221],[149,222,225,4,9,144,219,100,74,19,90,94,58,236,115,200,47,138,229,67,149,17,141,17,178,9,19,249,3,196,186,138]], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("tdjhe", [[160,149,154,78,55,150,63,38,85,144,200,141,76,99,66,99,77,42,222,158,203,143,50,155,84,196,47,160,142,226,67,235],[174,3,170,217,152,66,81,219,152,201,165,177,128,39,124,253,17,251,115,253,144,179,252,130,117,184,195,215,171,25,252,109],[202,199,7,31,244,241,250,150,240,254,226,5,93,74,184,103,132,210,201,40,237,214,229,40,160,235,224,224,165,232,163,197],[118,119,70,168,86,213,81,201,20,135,128,4,182,237,215,195,175,144,148,65,41,182,231,166,230,111,113,103,189,219,18,33],[13,43,26,50,60,111,72,22,86,252,40,94,164,63,92,11,157,243,223,15,170,211,94,193,24,203,204,132,108,136,94,228]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([184],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[6],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("[",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("4bx8ip", "ohcdyo",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("[", "vpqcef",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("agpr8d", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("P", "49vjhd", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("ohcdyo", "c0azn", "P", "agpr8d",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("P", "35gio", "sdjjek", "sdjjek", "c0azn",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("57p5en",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ohcdyo", 31,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("jmv21g",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 128,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("\x19Ethereum Signed Message:\n32", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(103,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["[","tdjhe","L","Capstones","vafyga","[","35gio","Capstones","["],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[203,163,192,167,54,186,39,39,134,17,199,186,118,215,212,215,54,21,132,145,132,146,44,199,111,239,214,110,121,21,27,107],[65,111,89,143,12,41,79,1,189,161,248,81,162,186,60,146,96,197,96,67,33,223,130,68,231,155,135,17,126,185,143,248],[170,72,111,225,15,49,186,27,9,190,27,223,211,237,21,232,204,110,73,183,252,135,127,175,227,105,33,179,87,208,104,221]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(95, 20, 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([2,81,194,176,115,151,147,162,0,21,35,174,182,232,133,54,238,65,223,205,23,246,104,189,170,32,92,89,97,221,218,67], [156,1,150,167,39,103,144,110,176,42,174,169,8,91,25,239,1,224,112,10,55,53,209,130,51,102,66,242,206,213,179,83],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([163,134,132,100,233,1,213,76,3,80,222,55,188,223,227,247,123,28,180,88,215,205,94,246,79,165,144,245,106,192,24,216], [232,24,29,14,173,234,88,61,51,193,64,85,82,196,228,108,222,99,152,155,66,142,114,24,162,243,11,1,3,184,228,189], [133,93,20,49,158,66,230,179,39,177,33,152,253,95,110,192,19,151,78,255,7,35,115,24,218,100,38,58,128,253,232,72],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([76,110,216,212,50,149,158,2,215,51,55,211,1,226,50,40,167,254,172,137,252,231,151,244,250,92,77,100,204,111,169,80], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([149,188,148,144,48,46,137,144,165,130,234,228,10,74,223,100,241,145,154,243,130,114,24,82,24,130,132,115,183,184,40,231], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([21,209,124,186,33,117,56,58,147,83,63,205,198,226,222,95,232,97,185,26,82,253,68,215,45,54,87,37,184,237,1,207], "agpr8d", [9,136,99,13,152,106,140,209,234,144,223,236,127,156,168,113,105,114,111,210,158,19,166,142,172,131,152,4,13,175,38,53],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([73,144,71,122,61,137,228,245,107,85,42,99,99,237,105,118,94,42,153,198,21,246,93,9,208,2,229,118,37,219,127,39], "vpqcef", [209,31,216,181,37,173,48,156,180,77,232,48,22,9,174,212,181,210,204,65,84,89,150,158,9,109,148,249,217,168,63,118],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([238,82,218,2,126,166,229,38,172,109,135,68,246,106,249,215,71,115,37,243,85,243,238,78,94,37,193,161,150,177,212,126], [167,96,225,145,80,252,254,32,220,34,228,205,45,159,223,141,81,228,254,140,45,38,246,179,93,130,121,156,241,121,129,253], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([238,82,218,2,126,166,229,38,172,109,135,68,246,106,249,215,71,115,37,243,85,243,238,78,94,37,193,161,150,177,212,126], [141,201,189,152,147,57,51,206,229,212,88,112,205,90,54,139,186,159,234,136,56,66,146,191,5,84,45,223,41,136,53,57,230], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([97,236,48,201,142,81,132,10,197,212,196,155,170,112,21,213,158,45,241,58,90,61,151,101,17,240,197,40,67,251,12,68], [138,0,59,225,122,105,229,252,57,24,247,203,175,87,199,158,57,15,119,152,228,17,106,16,112,53,89,223,61,250,121,21], [68,173,73,108,239,207,218,208,196,218,195,237,137,200,67,75,6,24,14,64,222,203,88,140,147,233,99,255,174,113,248,37], "tdjhe",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([30,168,239,9,44,95,161,168,106,74,185,223,100,175,174,35,228,235,191,190,26,16,222,156,228,243,33,151,177,126,82,32], [128,106,134,80,244,242,113,181,38,118,154,84,188,34,45,22,216,204,115,67,67,79,135,37,255,244,32,50,46,85,153,66], [21,29,253,174,230,170,65,33,227,188,169,91,155,189,140,20,233,189,82,35,236,227,122,84,57,145,53,88,235,38,7,155], "c0azn",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([203,215,9,72,216,232,221,134,66,174,86,2,82,156,8,92,70,210,250,139,127,177,250,250,111,78,41,98,165,150,12,54], [78,46,76,161,55,128,172,119,49,171,86,161,176,27,187,175,33,126,153,60,120,171,216,94,7,131,190,73,227,105,69,21], [193,76,74,217,52,10,70,203,68,169,158,72,1,59,78,177,67,247,253,203,83,80,193,95,242,46,170,92,78,8,241,164], "jmv21g",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([70,200,236,65,152,53,2,61,196,228,254,61,237,247,44,61,38,254,101,242,240,42,91,64,3,140,224,51,141,205,146,30], [115,120,144,103,23,62,13,84,169,96,180,144,89,134,224,68,226,66,240,183,94,255,165,40,63,186,4,50,13,98,14,253], [176,59,45,213,6,4,183,98,163,153,63,117,194,135,93,25,164,204,27,200,15,86,151,204,165,174,194,130,211,198,73,56], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([124,32,180,235,123,248,28,246,255,248,37,121,54,76,129,1,149,33,218,116,43,49,200,108,128,255,48,183,31,166,111,4], [216,246,243,14,44,101,208,14,37,4,56,179,185,104,27,94,186,53,205,51,96,237,12,227,215,236,15,52,106,228,215,0], [38,212,69,111,198,120,2,218,67,50,11,6,146,124,8,4,239,67,97,29,53,217,191,102,222,115,28,46,123,84,173,61], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([170,237,23,196,6,165,66,124,217,41,88,204,20,89,145,173,217,48,112,52,77,124,251,67,86,62,96,190,21,98,249,41], [254,24,0,44,80,215,42,254,98,88,9,27,7,183,60,218,2,47,61,227,129,3,174,3,231,118,178,202,148,105,176,49], [21,34,75,241,247,43,50,66,7,139,233,175,203,159,190,221,156,35,233,29,109,146,25,21,93,32,174,145,83,106,39,93], "57p5en",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([2,148,106,192,152,227,136,226,87,29,143,170,67,80,148,199,158,190,188,18,54,142,223,190,207,26,15,148,7,246,104,57], [196,185,93,76,30,28,207,48,124,29,154,195,78,78,215,141,154,42,229,84,64,165,40,74,215,39,142,124,255,254,94,241], [6,14,254,227,183,105,212,208,110,225,251,187,111,5,77,54,107,238,79,102,77,22,100,94,125,96,86,199,105,220,233,193], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([118,127,17,29,16,46,233,162,215,140,198,140,19,43,243,223,157,245,39,78,91,241,207,33,150,105,185,146,243,207,153,119], [7,124,32,204,230,135,234,247,43,154,21,60,60,186,25,27,221,90,136,153,74,11,17,130,205,228,21,31,240,66,64,33], [92,26,111,199,134,98,104,158,81,154,29,127,97,152,21,41,165,28,99,199,227,137,199,71,126,93,182,93,21,66,137,186], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([83,219,19,61,59,127,196,122,132,36,215,50,146,84,169,95,94,97,74,122,18,11,36,210,16,212,86,26,1,112,205,78], 63, 56, [255,236,8,50,105,134,115,59,56,196,194,191,28,253,103,86,171,100,102,133,137,14,49,231,77,44,217,251,192,62,195,11], 59,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([98,199,194,168,59,72,226,135,186,136,90,17,204,36,217,223,138,128,44,204,196,62,33,225,114,178,151,50,64,51,216,18], 46, [12,166,93,44,69,74,87,254,158,80,143,176,19,242,252,254,123,236,63,56,14,132,81,109,178,215,75,139,241,41,102,216], [222,76,89,152,25,173,86,50,89,216,13,10,251,45,133,178,54,15,67,146,222,18,170,40,193,136,128,136,243,104,72,196],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([238,48,255,25,238,158,164,201,42,164,51,141,126,212,208,196,22,97,200,81,60,53,128,174,254,93,42,72,108,155,93,92], [252,255,106,204,126,190,25,99,56,233,73,79,4,245,36,201,20],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([149,3,91,111,206,19,56,56,189,59,65,72,235,100,190,214,123,79,104,152,150,137,194,192,251,158,99,253,129,172,153,147], [247,175,195,246,104,138,174,26,243,194,250,157,74,202,239,95,199,22,93,77,199,10,117,87,10,158,216,79,103,85,182,45,247,90,100,243,194,177,36,126,54,234,37,177,96,126,93,231,197,232,210,186,142,118,126,92,159,91,242,8,111,23,84,170,200],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
