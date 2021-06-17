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
    contractERC721MintableComplete = await ERC721MintableComplete.new("sgf9vh","P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("sgf9vh","P",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("L","sgf9vh","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("L","sgf9vh","[",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(24,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("L",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("L", 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("[", "hydw1r",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(64, "ERC1820_ACCEPT_MAGIC", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(16, "Capstones", "Capstones", 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Capstones", "pcikeh", 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("pcikeh", "P", "sgf9vh",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(1, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Transaction successfully verified.", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(2014223716, "ERC1820_ACCEPT_MAGIC", "sgf9vh", "fg98bm", 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("pcikeh", "P", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("ERC1820_ACCEPT_MAGIC", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","fg98bm","q3uec8","[","pcikeh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(55, "[", ["q3uec8","dn4xb","Capstones","sgf9vh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(60, "hydw1r", ["Transaction successfully verified.","q3uec8","fg98bm","fg98bm","L","ERC1820_ACCEPT_MAGIC"], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("dn4xb", ["q3uec8","P","o5it6k","sgf9vh","Capstones"], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("ERC1820_ACCEPT_MAGIC", ["Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(6, "o5it6k", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1, "Transaction successfully verified.", ["L"], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("ERC1820_ACCEPT_MAGIC", ["hydw1r"], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("P", ["0","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(8, "dn4xb", ["o5it6k","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(8, "coanwp", ["ERC1820_ACCEPT_MAGIC","r6stb"], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("\x19Ethereum Signed Message:\n32", ["L","o5it6k"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("fg98bm", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","sgf9vh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(64, "q3uec8", ["sgf9vh","hydw1r","coanwp"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(56, "sgf9vh", ["sgf9vh","Capstones","dn4xb"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("coanwp", ["pcikeh","[","dn4xb"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("L", ["q3uec8","0","\x19Ethereum Signed Message:\n32","hydw1r"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(1532892063, "dn4xb", ["P","hydw1r","ERC1820_ACCEPT_MAGIC","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(254, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["[","hydw1r","r6stb","Transaction successfully verified."], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("Capstones", ["0","Capstones","\x19Ethereum Signed Message:\n32","q3uec8"], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("0", ["P","0","P","hydw1r","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(59, "r6stb", ["dn4xb","[","0","Transaction successfully verified.","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(200000, "\x19Ethereum Signed Message:\n32", ["o5it6k","an4z0d","r6stb","erbjq","an4z0d"], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("an4z0d", ["\x19Ethereum Signed Message:\n32","9mi4ep","\x19Ethereum Signed Message:\n32","an4z0d","\x19Ethereum Signed Message:\n32"], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("ERC1820_ACCEPT_MAGIC", [[103,143,237,181,201,239,119,227,187,140,172,229,33,115,55,173,37,194,56,60,80,162,30,107,74,150,20,154,158,63,127,18],[199,7,134,222,109,78,63,228,14,51,92,140,100,145,168,199,234,121,88,232,94,174,229,160,98,200,79,184,18,128,33,3],[45,132,27,211,199,56,76,203,17,93,139,130,18,197,109,52,97,8,183,175,242,124,76,62,237,246,195,16,29,153,19,208],[164,217,240,5,68,89,228,45,26,157,138,218,81,29,254,14,228,128,157,248,204,118,33,54,146,213,170,232,63,30,55,89],[145,41,102,217,185,27,221,113,221,243,165,44,121,205,108,114,145,155,173,199,52,186,97,150,133,78,73,231,254,227,59,168],[121,158,143,74,124,125,240,81,117,3,228,27,236,253,134,236,130,254,59,168,32,41,49,182,208,137,215,178,124,156,91,0]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(47, "pcikeh", [[86,16,176,21,136,146,90,248,29,24,79,54,229,203,228,31,243,212,126,102,167,49,115,246,189,149,97,86,62,64,79,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(64, "L", [[248,181,124,92,239,13,187,34,46,180,144,90,100,172,147,17,26,142,43,178,252,102,219,17,39,70,104,206,65,194,132,187],[220,172,103,72,45,230,209,110,203,149,82,160,218,224,179,24,11,235,115,198,183,83,49,80,232,4,109,47,109,17,106,14],[180,87,223,211,56,223,207,218,142,8,115,26,150,56,89,1,121,182,77,235,202,162,235,2,171,182,98,224,96,111,102,70]], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("wunls", [[45,142,115,89,204,6,25,2,55,18,53,127,226,44,24,111,70,93,80,83,59,63,158,35,126,63,72,74,193,166,67,37],[121,177,203,68,42,184,217,99,83,65,131,160,212,183,143,91,250,250,4,247,121,145,212,19,194,5,182,149,221,115,19,210],[120,199,56,226,113,161,190,218,159,6,223,14,185,85,42,208,191,69,244,231,38,253,20,195,57,23,245,91,165,95,79,183],[100,106,250,69,89,154,75,240,67,202,88,66,58,129,188,206,78,137,173,142,253,50,98,105,99,124,125,230,237,6,232,254],[48,0,253,138,140,76,9,23,213,101,119,164,221,100,233,145,127,229,205,133,107,15,2,143,69,38,62,33,112,242,243,76],[19,200,60,7,224,158,190,84,98,162,176,255,73,80,247,224,79,220,1,228,102,196,240,68,69,247,163,125,249,139,193,60],[204,99,238,112,120,40,88,38,40,181,69,224,226,54,87,60,170,19,149,20,247,167,23,145,112,236,169,164,179,73,143,181],[215,68,9,33,248,46,135,250,63,203,236,250,97,207,26,223,147,172,240,235,119,187,62,9,217,201,96,44,88,183,59,251]], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("hydw1r", [[226,169,75,239,151,235,4,98,178,106,217,124,93,125,12,75,178,153,145,39,198,183,240,3,148,2,160,135,229,239,122,173]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(4, "pcikeh", [[27,88,189,129,247,250,156,124,24,80,35,182,138,109,120,232,98,125,130,168,109,92,46,27,99,39,74,123,103,129,215,110]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(19, "an4z0d", [[74,170,66,175,34,171,94,137,60,119,202,3,161,197,113,169,202,94,144,225,5,198,22,224,219,174,187,94,4,56,199,148]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("P", [[222,19,213,8,211,237,118,76,137,106,210,212,211,217,35,164,13,174,139,128,42,7,128,12,84,155,152,66,28,19,150,72]], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ERC1820_ACCEPT_MAGIC", [[3,117,216,62,81,220,221,85,226,204,106,237,235,66,48,223,102,2,33,96,177,144,168,207,83,69,95,103,195,36,251,244],[157,55,95,204,214,203,156,16,141,242,250,33,82,188,63,175,87,152,217,163,221,254,228,253,166,246,189,184,136,164,143,67]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(66, "wunls", [[121,83,21,71,89,184,8,205,133,36,221,250,239,2,104,24,190,133,227,131,125,24,239,57,242,15,60,62,97,122,101,185],[60,56,148,170,68,78,236,177,20,0,152,43,87,106,2,24,96,112,11,38,74,137,161,245,16,56,73,136,38,28,113,60]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(22, "pcikeh", [[243,84,19,110,5,189,196,8,70,172,101,83,68,45,245,189,109,229,245,137,208,147,198,50,18,71,77,19,208,109,192,154],[209,220,4,95,54,12,94,167,138,89,59,240,143,7,39,63,238,59,66,153,74,173,52,238,255,26,109,171,29,117,196,121]], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("Capstones", [[133,212,160,24,232,183,202,90,223,20,193,159,160,38,88,235,252,111,157,205,182,175,195,143,132,184,194,183,199,232,228,235],[143,181,69,18,107,160,9,111,126,77,235,62,243,213,176,205,147,90,121,76,55,252,217,101,250,241,44,253,40,73,117,157]], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("\x19Ethereum Signed Message:\n32", [[127,39,102,144,219,142,209,102,15,219,125,5,211,17,216,217,47,27,137,46,25,9,18,141,213,128,77,200,183,211,126,197],[153,130,44,81,20,203,151,143,232,124,248,104,178,197,82,134,238,106,240,22,248,129,7,235,146,199,146,215,255,166,167,175],[238,228,145,19,82,46,117,149,8,25,21,222,218,145,93,176,97,144,44,136,27,63,7,190,162,171,53,164,13,139,95,235]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(162, "ERC1820_ACCEPT_MAGIC", [[31,203,247,233,241,70,196,173,191,68,181,125,248,171,45,68,161,252,96,65,69,10,157,132,33,98,146,201,192,218,198,111],[181,230,30,3,235,101,253,187,176,135,69,189,48,127,20,48,14,170,49,212,6,71,44,147,62,247,176,30,173,73,148,101],[119,90,75,249,20,83,88,172,139,145,127,172,74,9,225,2,122,129,136,146,43,190,184,190,201,40,202,34,214,231,187,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(1, "fg98bm", [[47,37,181,186,91,205,86,122,188,32,153,224,228,25,48,237,27,126,238,90,201,201,166,45,242,136,75,216,49,2,224,16],[96,204,172,171,25,202,247,4,170,47,239,205,220,143,123,208,234,214,119,220,2,195,102,82,63,172,165,124,124,106,92,228],[41,201,141,242,103,25,197,150,182,200,85,110,66,5,57,160,63,164,74,201,230,131,90,158,176,202,138,41,3,225,11,121]], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("wunls", [[148,48,162,115,40,93,167,159,21,151,160,234,219,176,61,10,153,138,140,167,250,229,179,33,145,101,28,111,125,195,193,154],[86,43,93,207,58,42,64,206,161,163,176,94,195,58,109,128,90,238,21,165,94,130,114,114,124,141,120,173,108,33,227,135],[34,103,164,99,26,170,34,61,156,162,121,145,74,234,13,222,156,175,89,142,230,16,136,173,180,197,42,29,172,223,90,110]], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("0", [[155,124,174,123,152,74,53,101,46,246,81,147,231,115,218,83,143,29,188,166,31,252,81,227,106,176,165,207,30,111,50,108],[250,34,252,46,107,60,248,213,225,246,255,162,99,163,20,240,137,109,188,194,214,199,175,188,108,52,103,98,174,23,30,26],[143,229,242,3,243,123,79,110,174,7,20,181,54,244,50,140,236,142,18,107,210,102,217,16,106,153,218,83,64,222,255,180],[164,167,208,52,169,23,49,205,127,11,135,204,129,238,220,125,235,121,31,228,194,35,152,136,25,71,125,143,115,11,196,47]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(15, "erbjq", [[248,47,228,188,200,235,74,111,194,111,55,146,16,34,32,70,251,132,247,224,160,82,35,168,246,16,202,22,221,230,99,63],[124,66,36,130,141,193,170,64,243,2,67,104,192,122,22,121,140,225,33,86,163,175,35,69,14,168,44,43,174,122,106,100],[143,15,233,210,210,128,248,20,248,80,128,5,28,194,242,231,104,218,225,22,40,254,245,187,178,11,14,69,160,78,239,125],[228,156,135,250,21,157,251,222,77,87,70,90,83,192,136,152,212,35,195,46,151,159,182,1,100,118,99,20,27,93,69,167]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(49, "erbjq", [[228,39,68,111,112,138,48,199,221,107,69,139,128,143,6,24,97,182,205,36,68,23,131,198,208,212,151,79,156,240,71,12],[102,141,4,0,77,67,217,130,78,128,52,22,241,10,201,29,7,187,180,190,230,100,35,153,251,170,167,247,148,68,159,218],[111,9,103,95,34,46,138,42,72,119,67,162,106,79,59,71,216,170,106,155,36,141,141,108,25,110,129,173,2,125,146,12],[57,228,232,125,194,59,104,228,54,58,25,8,192,174,118,227,205,251,53,200,209,38,134,78,23,23,63,166,102,84,116,47]], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("0", [[95,183,183,64,70,44,78,212,160,161,26,53,181,91,157,63,56,205,13,96,248,188,58,241,78,65,196,170,166,199,252,215],[181,85,86,170,6,79,124,70,179,176,18,120,2,230,215,163,250,121,138,129,24,84,183,126,76,244,235,95,76,85,220,217],[48,163,124,47,109,38,36,153,66,31,239,45,25,143,58,112,75,249,4,157,223,28,161,156,0,53,167,147,61,225,117,206],[184,252,240,246,139,59,218,221,1,23,93,167,249,226,108,179,92,129,111,93,125,31,135,168,70,11,164,149,187,44,17,74]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("coanwp", [[32,214,91,247,25,23,44,27,36,213,166,29,108,150,202,136,246,114,113,223,227,102,98,180,65,94,119,200,250,113,40,129],[74,165,152,176,104,29,57,111,126,207,102,147,132,162,253,134,158,9,61,99,192,223,73,146,97,193,121,252,216,120,63,129],[123,99,34,62,158,81,203,93,45,46,4,160,15,183,103,128,162,106,103,201,28,56,85,79,203,102,249,174,57,176,88,129],[71,194,212,65,88,84,156,250,17,236,120,209,144,95,200,53,38,10,110,61,40,12,178,120,125,228,211,157,56,120,59,169],[140,49,157,47,247,42,128,129,243,156,22,79,137,243,18,204,60,90,227,227,85,109,189,198,244,149,34,208,42,1,4,233]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(29, "hydw1r", [[48,86,53,225,197,39,167,178,73,60,219,5,59,250,163,143,115,184,251,151,166,119,215,81,250,245,113,148,0,179,14,166],[212,173,151,140,34,181,64,191,179,203,11,200,213,247,9,190,32,228,18,224,161,6,219,206,182,103,158,31,13,245,186,60],[4,245,147,17,53,119,187,117,14,221,80,44,53,31,94,253,22,209,230,166,206,58,123,13,119,189,14,174,106,201,20,221],[83,197,133,209,177,159,136,197,153,72,112,0,100,75,147,212,206,182,226,8,4,91,179,176,102,137,116,150,73,51,15,146],[240,115,176,72,9,114,231,98,190,148,182,87,2,60,207,54,178,108,106,191,229,100,36,211,14,223,217,231,204,228,223,61]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(86, "0ujr6e", [[69,26,25,174,184,113,152,168,41,179,131,224,110,189,17,41,36,70,122,57,171,32,145,207,88,94,20,80,121,90,140,106],[162,246,75,137,184,151,195,98,71,230,214,254,189,112,240,46,239,87,122,84,153,79,244,234,236,239,87,212,89,198,222,200],[69,159,129,79,119,58,21,245,173,30,123,52,247,82,113,119,180,124,158,184,85,72,152,221,250,182,97,101,139,152,176,22],[182,180,34,210,253,105,142,196,245,86,39,182,43,106,6,70,121,245,163,106,74,195,124,20,97,230,24,90,112,30,165,161],[186,3,147,182,233,222,43,169,41,165,48,18,193,136,120,30,120,173,65,24,132,11,222,236,101,150,123,67,36,224,64,197]], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("erbjq", [[226,116,21,178,141,104,20,155,161,135,23,50,149,239,37,160,197,48,46,201,110,129,65,3,4,34,181,7,158,138,53,71],[1,51,253,136,179,213,210,1,113,7,182,148,95,21,221,30,83,247,50,232,136,107,174,26,234,190,233,226,62,176,25,14],[94,71,57,28,236,221,37,135,194,142,26,130,31,230,115,30,33,39,3,40,33,12,209,144,6,224,37,169,206,29,194,8],[106,19,183,219,11,101,64,66,40,87,10,245,62,70,107,78,118,131,91,21,149,229,111,176,8,96,151,217,243,64,242,122],[121,82,245,164,112,240,90,239,109,112,149,104,224,102,179,12,18,140,45,225,157,200,172,58,122,10,244,226,109,129,93,69]], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([202],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[0],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("P",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("9mi4ep", "q3uec8",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("[", "sgf9vh",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("0ujr6e", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("dn4xb", "q3uec8", "an4z0d",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("q3uec8", "q3uec8", "fg98bm", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("fg98bm", "L", "sgf9vh", "an4z0d", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("erbjq",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("hkfeq1", 48,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Transaction successfully verified.", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("0",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 256,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("fg98bm", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(11,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["Capstones","coanwp","0ujr6e","r6stb","0","q3uec8","L","an4z0d"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[206,218,135,244,143,150,52,167,142,203,28,130,139,10,58,177,7,89,189,214,45,201,241,55,91,20,107,172,231,85,71,205],[151,145,47,237,8,24,36,115,131,190,63,1,51,216,47,69,10,22,141,209,138,249,224,26,187,76,170,56,219,47,170,228],[64,46,177,232,134,235,211,31,254,114,253,157,89,87,12,31,233,115,195,133,248,105,199,13,188,227,89,39,84,232,150,36],[187,83,164,222,202,241,239,83,73,105,177,47,214,176,44,91,46,187,40,78,149,193,249,176,97,235,229,192,72,46,170,130],[58,193,13,125,147,205,239,233,7,173,28,202,16,143,244,37,213,32,117,27,177,133,27,252,56,163,96,171,83,54,144,133],[139,236,40,100,177,252,177,107,17,227,69,169,113,72,32,207,103,17,203,2,186,25,179,112,243,220,41,246,82,161,78,221],[69,24,86,62,110,25,58,64,40,118,255,72,130,196,211,101,233,64,173,62,75,251,244,14,106,81,118,94,99,176,137,17],[104,240,185,19,230,102,9,39,209,99,236,124,182,111,98,207,153,153,1,14,153,201,134,84,168,177,242,248,196,101,147,59]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(22, 8, 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([159,76,16,74,212,182,116,160,238,67,245,96,198,122,205,55,156,123,211,81,248,92,91,107,203,185,100,164,115,225,148,188], [55,109,76,197,161,70,221,10,193,196,4,136,119,12,54,167,219,45,235,40,214,17,196,177,67,41,67,255,252,33,22,19],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([140,33,202,91,10,153,156,180,215,74,199,81,77,227,100,74,243,11,61,50,42,212,7,65,160,197,177,237,137,218,59,225], [115,172,101,143,250,154,238,190,216,140,37,115,64,31,25,39,224,188,111,14,150,210,179,18,77,34,196,111,142,40,76,184], [67,121,145,22,116,205,140,250,234,60,143,13,225,35,196,29,40,217,44,244,240,99,172,105,74,57,162,79,82,95,87,79],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([42,216,81,68,197,93,97,120,103,125,253,46,107,48,68,14,10,73,225,45,60,228,57,114,86,226,236,24,7,135,215,208], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([213,118,247,191,213,181,183,30,203,178,190,91,144,169,205,81,225,13,13,229,158,88,244,241,129,174,60,44,120,58,159,147], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([32,172,161,84,210,162,188,62,2,52,137,5,106,30,142,174,23,236,17,179,75,95,226,198,216,247,41,204,250,65,207,242], "Capstones", [189,19,98,10,139,151,64,109,246,180,31,148,99,6,243,2,55,104,206,162,51,77,153,122,244,11,60,90,112,154,211,192],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([153,51,175,11,3,140,139,113,203,64,92,26,240,55,246,76,87,119,142,244,44,209,123,195,50,232,168,200,131,23,164,42], "hydw1r", [151,195,180,3,51,112,15,51,175,47,132,128,48,145,237,28,50,38,156,103,193,61,58,152,247,244,181,210,151,226,178,142],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([87,137,11,180,243,34,156,132,1,107,191,72,172,93,175,126,203,27,224,34,212,251,73,226,161,64,18,223,246,4,205,161], [93,82,95,84,149,1,234,127,159,96,126,147,154,10,101,236,115,175,115,10,184,89,103,123,177,38,139,57,5,129,13,72], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([87,137,11,180,243,34,156,132,1,107,191,72,172,93,175,126,203,27,224,34,212,251,73,226,161,64,18,223,246,4,205,161], [246,38,9,175,178,176,249,191,54,56,13,139,52,83,86,3,226,24,17,74,153,211,106,177,165,244,218,100,9,162,152,37,136], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([141,115,20,194,52,228,217,212,196,194,32,147,192,103,118,227,127,232,141,13,206,157,68,192,114,61,110,64,95,233,19,247], [224,119,210,84,204,45,113,151,40,37,189,109,33,5,0,245,233,14,25,246,212,122,61,243,224,177,231,188,131,45,90,228], [72,98,35,62,171,229,61,103,69,254,21,123,218,118,92,100,89,103,20,38,110,105,218,96,100,240,58,55,7,138,93,144], "r6stb",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([119,77,1,14,74,233,57,186,212,56,35,106,13,133,64,235,164,57,121,236,18,227,23,78,37,102,30,240,71,143,131,136], [54,202,45,184,212,200,154,215,48,117,155,19,22,151,141,197,14,85,74,19,9,113,217,40,250,96,218,18,9,60,173,171], [250,38,228,25,3,145,22,251,26,229,24,25,27,110,81,199,9,213,203,192,22,73,154,116,160,121,165,73,208,112,202,11], "hkfeq1",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([139,239,123,159,56,141,80,94,252,232,165,62,55,143,212,18,160,119,143,250,124,197,137,236,109,107,205,84,55,18,120,86], [91,11,138,60,19,222,130,198,194,147,184,105,234,70,202,46,211,96,136,32,78,27,252,176,145,24,170,224,194,71,224,164], [106,43,79,123,80,249,242,192,245,21,102,161,65,241,13,236,61,67,66,130,59,148,92,127,229,158,20,164,189,59,130,112], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([50,187,189,245,32,84,189,243,153,167,109,191,73,225,48,44,186,98,56,139,145,21,186,245,22,92,132,113,1,115,210,171], [71,57,237,196,139,70,132,108,106,253,139,16,178,63,228,31,230,241,244,134,110,201,163,210,11,147,5,63,239,102,253,103], [152,193,209,160,163,235,11,229,158,144,159,133,62,30,109,237,213,237,138,69,18,119,122,30,60,157,139,11,83,28,173,130], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([72,195,237,63,87,196,35,5,243,193,60,163,150,235,1,205,104,180,206,184,164,23,131,5,215,34,202,33,75,108,177,80], [166,90,103,210,30,37,73,228,36,90,162,176,124,21,119,55,243,11,145,240,5,66,26,83,202,231,112,151,81,218,0,157], [76,91,254,212,114,2,26,174,191,149,18,124,196,242,27,111,35,140,220,125,101,106,6,46,146,14,159,138,151,5,71,77], "8kic",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([31,249,37,6,245,217,119,17,91,247,78,225,243,246,197,59,42,89,157,186,3,131,184,167,173,234,135,104,164,185,178,148], [247,138,35,72,37,241,176,146,155,69,121,139,123,149,164,125,205,183,65,189,115,17,101,223,67,150,121,84,86,127,227,107], [57,76,58,121,201,75,133,72,106,232,116,32,196,78,68,25,198,184,101,112,233,72,33,20,176,87,240,93,209,204,233,213], "q3uec8",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([193,31,1,40,254,143,29,97,181,19,207,42,224,159,50,200,214,42,13,149,142,53,192,99,69,190,137,74,114,138,80,89], [159,212,67,85,83,19,162,206,244,186,57,61,116,103,203,194,130,184,154,175,220,193,165,61,194,173,147,107,202,232,214,148], [186,214,246,22,10,224,139,202,60,5,134,145,195,155,154,160,21,79,70,51,241,119,101,164,147,172,77,147,59,229,41,212], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([254,137,93,41,197,197,246,59,84,75,147,116,236,5,129,81,76,126,242,32,39,145,203,151,117,215,62,0,67,38,171,144], [21,173,77,117,99,106,36,207,231,42,215,169,12,183,232,185,216,30,188,12,143,249,101,66,220,184,151,81,121,219,140,173], [49,117,31,140,62,79,239,15,123,40,174,83,222,246,156,177,115,82,184,133,178,18,118,99,248,0,103,80,194,0,253,171], "7ipanr",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([130,200,38,189,50,220,60,133,148,61,6,31,25,83,70,78,251,227,147,62,41,84,122,172,67,150,134,162,13,94,60,121], 254, 64, [88,58,7,97,189,24,223,7,132,75,105,180,240,105,17,220,40,230,92,233,114,57,8,83,184,111,218,200,86,172,138,226], 59,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([72,166,229,229,251,178,61,105,224,204,48,141,127,228,133,55,177,144,87,28,164,149,125,3,226,232,128,35,130,235,68,90], 16, [223,172,189,156,120,209,162,179,73,116,18,107,239,189,1,84,132,82,83,215,158,56,12,207,154,110,178,163,212,149,144,249], [123,163,188,217,210,215,40,201,45,252,187,180,157,17,72,50,23,34,208,212,91,156,143,225,248,29,79,136,212,209,81,255],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([242,166,115,12,54,124,18,218,211,227,112,176,247,134,227,230,26,197,116,5,148,253,145,218,185,248,127,76,64,203,251,32], [73,178,139,194,221,241,27,222,78,51,248,181,255,20,149,95,53,117,13,135,5,101,64],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([104,0,158,230,130,95,76,86,28,73,70,203,226,220,0,151,208,158,129,235,65,48,49,34,211,9,98,190,157,116,227,101], [97,9,79,205,47,56,255,93,64,22,176,108,230,33,233,55,123,199,170,147,201,249,221,255,2,228,103,88,161,159,89,15,53,90,218,98,99,50,40,232,183,64,209,230,26,7,150,189,86,141,218,167,154,215,197,20,188,48,227,213,146,142,221,219,212],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
