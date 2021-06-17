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
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(47,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("[",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("\x19Ethereum Signed Message:\n32", 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Capstones", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(98, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(0, "P", "4f68ak", 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("4f68ak", "[", 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("7g033", "ERC1820_ACCEPT_MAGIC", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(2014223714, "ERC1820_ACCEPT_MAGIC", "ERC1820_ACCEPT_MAGIC", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(161, "Capstones", "P", "58lwua", 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("\x19Ethereum Signed Message:\n32", "L", "58lwua", 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("7g033", ["Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","939v","7g033","\x19Ethereum Signed Message:\n32","[","7g033","0","0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(45, "0", ["[","939v","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(66, "Capstones", ["\x19Ethereum Signed Message:\n32","[","Capstones","0","939v","P","yylc1n","939v","Transaction successfully verified.","6jx0oo"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("\x19Ethereum Signed Message:\n32", ["[","6jx0oo","Transaction successfully verified.","Transaction successfully verified.","6jx0oo","P","58lwua","4f68ak"], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("P", ["7g033"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(2014223715, "0", ["Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(5, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["4f68ak"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("[", ["\x19Ethereum Signed Message:\n32"], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("939v", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(46, "7g033", ["P","4f68ak"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(257, "ryws7", ["7zsfsu","Transaction successfully verified."], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("7g033", ["L","ryws7"], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("yylc1n", ["Capstones","6jx0oo","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1532892064, "L", ["939v","\x19Ethereum Signed Message:\n32","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(66, "939v", ["939v","\x19Ethereum Signed Message:\n32","7zsfsu"], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("4f68ak", ["6jx0oo","yylc1n","939v"], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("939v", ["4f68ak","lgetno","\x19Ethereum Signed Message:\n32","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(88, "4f68ak", ["7zsfsu","[","7g033","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(26, "7zsfsu", ["7zsfsu","727mbt","L","4f68ak"], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("Transaction successfully verified.", ["P","58lwua","P","lgetno"], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("\x19Ethereum Signed Message:\n32", ["7g033","727mbt","939v","Capstones","727mbt"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(97, "7zsfsu", ["7g033","Transaction successfully verified.","Transaction successfully verified.","939v","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(65, "Capstones", ["7zsfsu","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC","bcpn7u"], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("6jx0oo", ["yylc1n","ERC1820_ACCEPT_MAGIC","7zsfsu","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","["], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("ERC1820_ACCEPT_MAGIC", [[4,40,111,132,65,142,15,245,25,210,150,215,66,146,106,51,38,225,210,243,174,39,170,207,47,7,49,219,199,75,188,199],[78,228,235,88,160,179,74,34,176,117,82,101,50,242,172,214,92,157,47,162,163,162,247,170,195,2,182,157,203,113,146,152],[233,220,197,175,93,231,73,74,233,62,252,203,226,113,49,101,90,216,37,55,213,225,210,33,92,157,129,177,111,160,60,222],[255,91,163,19,118,20,16,76,126,65,188,98,13,42,188,109,20,173,249,253,205,182,6,184,124,151,239,53,93,173,195,37]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(2, "bcpn7u", [[9,100,44,151,216,40,224,237,50,106,25,62,106,221,246,18,30,111,28,20,150,217,90,121,200,45,17,124,67,27,134,202]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(7, "Transaction successfully verified.", [[96,234,193,209,182,198,31,118,216,252,51,82,168,189,215,133,24,51,86,196,82,171,40,97,46,128,36,61,87,188,139,236],[115,154,148,190,67,19,76,80,252,28,142,2,182,224,211,97,196,50,21,208,254,199,149,102,86,222,137,74,10,234,8,240],[224,75,90,248,27,107,46,128,101,116,91,5,77,116,10,177,171,170,74,60,101,123,25,122,99,200,244,78,194,241,247,226]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[183,112,180,139,35,166,243,56,8,41,254,243,255,83,186,10,64,10,132,246,105,93,210,192,66,56,113,155,115,121,237,4],[114,250,50,190,97,109,248,0,104,103,10,126,14,194,80,49,2,15,89,93,51,74,94,205,5,100,66,89,214,237,67,163],[240,251,113,133,86,52,250,254,176,93,65,210,218,138,214,162,122,153,43,130,202,2,17,148,3,4,102,222,112,243,119,190],[46,176,174,67,1,68,126,180,53,192,66,89,154,110,35,4,18,87,2,170,78,211,35,199,30,155,213,125,72,189,76,41],[154,209,114,189,123,235,226,145,28,98,128,66,115,242,62,3,142,92,193,99,39,196,178,26,17,77,86,156,242,249,133,199],[41,248,253,178,126,124,57,159,37,86,55,168,61,245,235,105,199,201,237,240,122,6,19,133,254,16,2,53,162,184,23,237]], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("6jx0oo", [[23,234,219,47,45,125,154,107,36,248,161,62,110,12,234,95,56,218,2,23,228,115,65,252,108,203,152,165,38,165,214,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(101, "yylc1n", [[82,244,255,193,122,214,229,141,212,91,225,184,169,65,211,54,103,106,47,50,133,112,196,196,229,81,181,58,43,135,86,224]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(55, "58lwua", [[45,107,255,46,3,203,126,185,91,87,244,105,145,91,6,185,194,121,241,65,64,189,206,54,71,147,150,202,22,147,74,94]], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("L", [[193,87,215,63,100,192,181,99,33,91,155,152,64,121,188,32,156,79,98,145,235,148,242,68,186,21,254,52,208,152,166,236]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("yylc1n", [[1,225,121,233,29,234,254,154,180,127,125,186,252,225,17,43,79,106,130,39,91,116,223,198,179,216,16,205,253,7,178,18],[153,79,246,255,224,138,59,152,90,131,21,252,171,85,246,128,201,58,108,222,115,94,37,231,216,239,56,63,160,70,80,43]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(20, "P", [[137,129,228,138,28,8,130,167,8,38,47,46,208,109,234,73,176,139,153,249,225,54,112,161,155,140,220,89,102,190,108,252],[252,123,174,135,38,134,137,212,105,150,162,22,38,42,222,18,209,22,96,171,68,54,251,188,28,103,103,190,205,182,90,49]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(0, "Capstones", [[15,83,59,38,62,30,231,96,14,254,172,82,191,172,219,191,11,187,232,124,115,2,16,216,62,230,19,146,188,243,125,66],[30,46,215,104,226,136,1,94,22,171,255,86,79,244,160,66,213,36,158,48,178,77,111,246,174,178,52,174,206,209,23,255]], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("7g033", [[216,225,96,196,68,103,184,95,206,98,99,100,107,174,115,5,161,31,102,169,186,129,245,251,92,238,38,70,247,43,208,147],[60,25,128,110,183,144,97,131,83,89,178,241,197,213,104,182,130,62,198,162,92,151,182,210,103,165,219,33,45,7,223,193]], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("6jx0oo", [[112,123,119,88,59,36,16,6,108,52,191,23,30,107,196,217,221,76,38,196,173,60,192,238,235,247,200,116,112,33,227,26],[1,161,153,46,56,69,211,78,6,254,193,77,77,175,68,131,35,21,10,236,36,166,204,33,22,165,192,61,166,209,134,161],[103,159,97,151,216,93,165,136,118,181,254,24,31,235,200,164,187,250,126,96,4,143,84,230,82,151,125,161,198,27,123,43]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(17, "\x19Ethereum Signed Message:\n32", [[232,123,151,16,228,177,243,68,32,145,87,38,184,212,228,44,97,174,167,90,48,151,10,88,114,8,180,21,153,63,170,196],[192,109,205,104,62,120,51,220,160,61,70,249,87,238,215,21,80,110,95,95,189,234,141,186,44,199,158,64,111,79,187,203],[13,49,246,69,54,253,176,122,54,117,255,192,152,81,91,14,76,36,99,80,58,89,19,248,187,203,245,251,138,231,135,94]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(48, "yylc1n", [[237,30,55,66,115,39,77,192,13,46,37,130,247,168,138,6,127,99,223,156,115,235,169,142,156,149,8,13,82,207,165,248],[150,43,28,220,249,86,146,243,90,48,224,112,146,232,152,247,66,79,70,47,162,253,29,26,246,209,112,78,85,192,70,218],[175,39,43,8,247,58,195,216,151,89,155,238,193,6,101,212,71,52,30,158,134,151,226,56,126,128,66,137,33,29,59,69]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("P", [[199,249,140,42,143,46,178,106,146,199,130,172,137,231,77,101,142,48,239,65,35,235,225,82,212,90,189,61,127,197,174,151],[97,233,204,190,18,107,206,230,178,214,73,91,216,78,113,119,217,120,182,45,251,12,1,225,18,154,198,20,71,98,3,164],[94,180,221,76,252,213,36,53,41,13,61,213,173,171,53,240,250,255,85,238,192,244,203,249,55,41,235,243,146,62,166,91]], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("yylc1n", [[158,72,33,180,60,54,246,113,126,4,14,169,162,216,38,125,215,148,192,71,231,127,173,215,29,195,169,137,180,216,17,128],[110,130,96,115,155,122,90,104,31,151,62,108,177,140,122,169,47,251,176,37,34,31,7,60,157,159,60,10,214,26,146,252],[195,69,237,166,13,125,179,126,96,230,45,224,184,181,100,59,124,213,159,199,100,91,177,138,199,180,106,241,216,143,234,118],[73,37,212,47,224,56,83,23,11,62,152,56,83,30,217,142,7,26,128,165,200,35,0,181,154,236,140,101,193,30,154,125]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(96, "gpffaj", [[215,119,161,129,226,218,176,88,238,75,214,32,124,35,88,128,161,25,189,115,209,28,78,253,105,206,242,19,95,202,188,21],[116,219,86,2,52,141,196,30,85,23,11,46,242,154,79,255,247,116,39,77,143,11,130,28,98,231,139,206,175,102,11,73],[119,116,34,69,152,191,40,73,238,12,208,29,81,120,192,141,1,42,74,20,171,255,199,105,105,251,162,201,2,218,87,17],[80,180,23,30,240,227,124,94,233,66,161,32,150,191,67,242,184,203,43,53,52,175,191,122,98,211,49,250,175,152,211,175]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(57, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[202,120,215,10,15,2,162,24,171,41,250,118,126,50,242,175,81,107,131,206,43,15,101,155,196,239,43,245,200,246,248,88],[227,40,73,221,9,211,31,91,29,136,218,195,160,30,204,114,242,47,28,33,198,228,61,211,10,187,85,29,239,140,232,181],[110,89,210,40,245,95,171,146,15,236,27,160,191,89,63,214,240,215,121,207,96,76,31,12,221,113,68,205,44,15,51,185],[122,9,93,115,188,232,85,99,90,1,48,236,190,34,249,67,247,244,196,86,144,126,205,28,245,246,176,78,131,65,165,236]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("yylc1n", [[198,57,241,25,155,43,28,28,249,122,170,167,55,20,142,131,131,85,197,215,33,251,122,118,79,236,216,50,40,5,27,32],[107,112,122,53,152,38,61,56,255,229,150,155,244,151,157,238,5,102,112,126,150,51,19,109,109,119,185,215,125,138,229,167],[109,134,57,13,219,97,216,1,40,24,26,200,105,92,162,191,103,220,191,173,2,121,144,204,118,251,67,228,136,163,102,129],[19,167,201,51,235,47,235,49,86,187,173,45,125,14,34,209,193,177,83,40,19,211,133,27,81,165,200,184,201,178,230,53]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ryws7", [[178,71,107,124,14,175,88,87,238,91,198,120,77,24,90,97,118,77,121,62,168,208,92,136,144,205,199,121,90,135,226,13],[253,186,196,224,72,170,186,216,243,99,196,198,6,136,183,38,100,16,200,57,213,133,83,221,89,5,216,131,61,43,113,255],[73,59,102,174,22,42,70,42,211,181,18,111,113,236,181,221,152,214,56,35,189,13,93,217,52,33,95,54,245,108,129,96],[19,123,104,66,170,24,130,20,143,92,137,218,127,32,198,52,137,151,121,114,56,190,19,37,201,161,191,181,81,55,213,156],[117,156,236,140,139,16,226,160,187,56,229,127,53,157,250,192,235,88,43,121,32,184,159,130,189,14,109,66,7,178,103,32]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(49, "4f68ak", [[77,72,244,148,32,71,153,133,0,133,236,243,3,248,45,83,254,111,7,18,207,161,115,120,18,217,56,82,93,6,103,80],[32,6,21,128,46,147,202,40,99,83,250,115,59,191,33,28,232,63,172,172,182,169,175,88,196,240,10,161,114,82,88,98],[201,96,125,180,140,112,136,112,232,247,105,153,152,150,121,193,255,126,197,59,237,148,125,204,177,135,190,21,169,243,168,81],[145,193,188,0,34,150,70,146,78,51,37,164,36,134,120,243,46,35,79,210,82,28,203,191,29,1,77,99,162,12,217,242],[186,136,190,95,217,101,179,104,8,244,92,247,233,161,50,31,158,100,187,192,99,71,108,238,133,227,234,157,84,89,234,97]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(69, "ERC1820_ACCEPT_MAGIC", [[206,207,102,137,165,99,148,233,143,213,195,201,228,179,230,20,18,136,68,217,189,179,176,128,247,238,70,162,78,21,37,182],[227,235,184,32,145,231,96,73,83,154,96,35,70,157,62,1,178,62,24,138,209,194,2,112,113,19,161,10,18,66,240,76],[104,203,107,2,136,154,116,133,20,180,250,47,210,81,43,44,105,127,237,117,41,231,58,170,86,43,203,138,187,203,85,175],[78,159,13,231,173,171,142,69,92,217,231,98,16,5,75,244,238,153,12,114,17,228,133,15,196,84,178,244,74,222,157,52],[121,173,133,213,193,117,88,122,153,21,67,81,241,202,239,5,5,158,182,127,174,91,138,119,254,142,50,124,60,192,213,18]], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("vqznh6", [[78,236,37,53,250,235,41,96,79,26,7,73,114,61,12,171,148,3,4,75,17,33,54,132,90,245,0,226,201,111,186,250],[60,168,203,89,81,63,190,189,231,109,108,221,202,93,6,211,228,85,124,220,166,123,152,138,17,30,220,201,102,15,69,137],[90,48,25,171,221,44,108,219,57,47,196,80,130,135,177,249,87,184,233,197,45,70,168,126,94,76,12,243,129,202,58,57],[162,169,189,11,213,13,250,238,130,120,218,53,208,105,54,35,157,150,188,185,233,90,89,16,140,12,204,112,174,176,55,108],[120,64,112,206,189,251,48,234,81,163,67,90,197,75,47,4,72,189,186,167,215,226,80,227,216,176,104,119,244,166,239,187]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([187],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[2],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(256,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("gpffaj", "6jx0oo",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("58lwua", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("bcpn7u", "7zsfsu",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("[", "6jx0oo", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("7g033", "P", "939v", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("yylc1n", "L", "gpffaj", "7zsfsu", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("939v", 1025,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("7zsfsu", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("939v", 1,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("yylc1n", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(1,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["7zsfsu","\x19Ethereum Signed Message:\n32","yylc1n","727mbt","939v"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[244,192,46,70,136,161,52,41,4,123,28,67,172,135,47,39,194,212,101,71,221,21,210,242,21,252,88,65,236,156,240,57],[126,110,2,118,134,94,98,91,118,84,86,10,59,151,7,221,55,193,162,100,159,189,80,99,235,35,146,167,26,197,186,251]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(1023, 66, 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([75,158,148,64,128,68,20,58,0,121,73,190,28,236,101,252,24,78,183,46,174,117,71,60,193,78,35,118,128,34,44,209], [218,137,29,230,85,121,37,222,74,53,120,69,253,60,57,119,215,47,218,39,185,236,45,164,149,12,149,219,228,225,183,36],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([53,217,112,240,51,189,217,164,234,44,192,205,187,23,204,69,247,36,51,182,62,127,61,176,250,218,155,185,33,44,152,40], [172,188,166,205,153,140,78,58,109,23,55,5,109,192,218,242,38,15,235,171,167,236,68,184,230,162,142,195,120,92,131,142], [220,140,191,61,176,77,114,18,253,104,46,166,198,112,189,75,13,118,111,238,198,191,196,226,122,34,26,21,27,22,76,17],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([176,63,25,238,221,145,99,210,245,12,22,52,60,112,216,10,83,155,45,128,248,162,27,87,225,195,140,243,102,146,113,138], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([117,238,110,170,93,162,62,221,106,171,232,35,195,187,233,160,122,16,186,87,128,122,88,165,194,185,141,227,174,193,2,225], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([116,66,102,202,177,100,84,186,223,126,215,167,76,235,252,41,169,114,83,211,17,151,152,115,108,140,46,57,75,130,128,157], "gpffaj", [124,240,115,236,182,40,158,248,253,74,163,63,189,45,167,220,242,62,141,244,166,186,227,179,45,110,148,204,68,104,88,168],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([229,134,111,31,152,74,26,138,55,247,118,24,173,75,207,253,41,160,246,157,73,137,248,230,246,17,160,34,23,38,73,66], "0", [110,123,219,165,220,67,85,78,39,213,149,181,228,210,166,158,150,26,167,35,68,52,158,208,234,117,109,233,58,213,247,5],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([62,176,131,225,207,40,188,21,216,113,142,93,118,14,127,254,239,10,71,225,19,87,207,182,88,131,173,197,251,105,159,12], [230,85,8,106,147,40,29,28,173,106,138,42,229,30,187,240,235,161,175,250,142,192,120,241,178,162,140,59,207,39,103,145], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([62,176,131,225,207,40,188,21,216,113,142,93,118,14,127,254,239,10,71,225,19,87,207,182,88,131,173,197,251,105,159,12], [42,213,103,93,101,152,223,43,233,222,96,233,184,146,95,55,40,163,213,146,24,46,119,132,0,172,125,72,215,239,127,204,177], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([177,91,43,216,230,148,151,51,18,153,160,181,93,69,59,154,231,17,67,160,248,198,249,26,135,117,168,88,47,199,240,118], [251,176,238,45,139,252,148,10,24,116,49,20,23,175,96,219,147,55,190,63,213,17,188,105,94,69,21,222,6,28,222,207], [249,17,49,169,237,104,250,165,60,42,23,158,101,176,74,232,254,107,230,102,160,233,13,89,239,173,222,224,221,61,105,137], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([87,188,15,226,184,238,214,200,77,161,183,72,203,64,227,159,143,101,171,75,222,219,137,202,192,83,232,6,153,17,196,251], [228,156,224,153,24,34,179,164,203,125,202,191,214,165,49,159,231,119,32,120,250,14,255,143,25,211,17,99,83,110,140,144], [56,16,30,36,180,157,204,119,216,166,64,106,122,57,54,28,211,198,135,252,73,244,175,220,126,220,254,51,48,132,250,243], "ryws7",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([36,155,151,83,187,55,135,31,71,255,162,191,20,238,61,146,213,173,90,228,221,184,103,61,55,152,81,111,133,40,200,137], [215,219,114,46,37,24,18,168,77,127,171,214,104,35,201,88,204,179,119,250,242,247,241,95,74,75,37,18,193,179,206,87], [253,225,61,36,58,178,45,151,240,76,52,73,150,8,171,51,161,171,135,9,236,142,93,193,116,126,5,41,116,160,56,255], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([32,237,166,56,59,91,150,53,77,252,149,92,225,138,6,119,7,117,115,129,80,121,120,38,9,154,3,206,113,167,238,3], [151,55,253,49,146,48,134,32,41,193,159,82,26,146,145,172,124,45,153,222,58,182,248,128,244,149,48,4,38,77,173,209], [72,170,221,59,219,199,41,184,124,98,71,79,226,96,246,60,55,241,56,34,237,166,202,105,162,125,44,143,229,228,51,170], "4f68ak",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([114,67,225,129,22,115,73,50,195,96,226,64,79,229,173,78,201,26,101,150,70,13,10,242,99,18,83,167,217,148,252,76], [166,196,207,38,100,183,84,26,95,53,229,119,52,10,125,253,197,75,212,10,165,65,123,138,249,157,84,101,16,173,99,224], [207,130,83,11,179,172,45,231,254,247,105,30,246,246,251,77,68,25,162,128,157,78,187,218,29,117,245,25,221,192,24,88], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([127,221,39,250,119,157,70,78,237,145,57,48,65,60,161,40,232,219,77,219,233,206,44,117,173,27,173,188,249,38,42,181], [197,1,83,44,57,180,32,200,245,63,23,101,150,117,175,158,184,245,85,108,179,52,65,255,58,83,78,42,53,245,62,230], [155,151,67,169,254,133,16,244,183,64,167,107,72,37,91,169,59,35,223,36,99,187,21,181,80,187,170,34,147,73,160,64], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([6,92,155,208,28,26,11,52,3,35,4,138,180,226,80,237,133,240,178,158,42,179,187,55,74,189,153,90,241,212,63,3], [191,47,214,21,132,44,116,73,120,252,114,10,209,202,59,106,81,83,1,126,192,208,30,104,228,137,233,174,177,207,96,105], [92,90,3,228,28,54,33,29,218,43,187,206,71,187,83,241,39,152,26,19,96,244,53,103,162,209,185,162,157,210,169,30], "lgetno",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([41,32,107,75,188,2,254,87,175,232,194,30,53,253,74,207,172,169,103,226,83,247,154,221,210,224,83,164,91,90,192,163], [205,187,188,254,35,101,43,243,44,64,146,157,247,24,185,234,49,207,170,64,51,5,17,169,2,77,51,97,162,122,151,75], [119,79,123,0,6,151,99,255,5,115,9,89,218,19,236,85,219,251,5,216,150,8,234,219,112,170,249,155,166,121,113,88], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([121,167,144,226,61,102,45,148,24,73,200,216,148,112,219,45,165,9,138,125,12,103,5,231,134,137,235,53,128,144,39,11], 63, 256, [251,87,11,163,79,101,93,17,52,238,29,105,142,126,80,212,44,200,216,146,173,141,127,40,217,6,19,184,245,63,35,67], 54,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([74,63,50,94,198,171,133,15,228,139,116,230,116,115,237,185,228,35,70,213,67,133,126,17,137,136,185,128,241,109,53,88], 58, [251,124,219,38,18,252,179,48,99,36,185,82,205,129,119,190,42,91,236,25,198,208,52,228,30,99,16,238,155,142,98,130], [169,14,110,6,245,139,171,32,137,5,86,97,34,254,156,233,23,43,124,145,253,79,77,230,118,31,104,217,233,38,109,2],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([209,204,60,179,155,230,12,238,12,225,31,247,190,138,1,191,123,140,229,244,106,21,54,88,202,121,6,77,190,103,215,120], [60,255,195,24,246,86,131,167,120,24,30,142,136,59,88,71,84,193,103,157,144,50,14,43,228,69,90,174,228,164,52,179,219,244,106,191,250,232,74,5,227,153,88,208,103,130,19,142,145,214,135,202,84,239,141,29,131,50,208,188,98,184,2,94,21,205],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([11,147,3,1,125,254,89,51,81,40,128,140,130,24,136,96,138,81,56,86,46,57,211,126,37,167,236,67,146,200,19,139], [174,150,100,52,133,243,104,83,178,145,108,82,35,235,188,56,23,215,26,164,55,86,80,150,138,151,186,167,169,157,162,37,62,99,6,35,249,167,107,51,237,35,105,224,141,44,70,255,228,240,255,119,182,254,8,243,90,64,196,168,12,186,110,55,148],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
