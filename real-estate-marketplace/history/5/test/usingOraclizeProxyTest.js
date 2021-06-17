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
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(87,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("[", 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("\x19Ethereum Signed Message:\n32", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(30, "0", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(47, "Transaction successfully verified.", "oqvsz", 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("[", "Transaction successfully verified.", 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Transaction successfully verified.", "Capstones", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(7, "Capstones", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(60, "[", "\x19Ethereum Signed Message:\n32", "ERC1820_ACCEPT_MAGIC", 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "L", "ERC1820_ACCEPT_MAGIC", 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Transaction successfully verified.", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","oqvsz","P","Transaction successfully verified.","Transaction successfully verified.","Transaction successfully verified.","Transaction successfully verified.","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(9, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P","ERC1820_ACCEPT_MAGIC","Transaction successfully verified.","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(21, "Transaction successfully verified.", ["L","\x19Ethereum Signed Message:\n32","oqvsz","0","oqvsz","Capstones","L","ERC1820_ACCEPT_MAGIC","Transaction successfully verified."], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("oqvsz", ["L","P","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","oqvsz","[","L","oqvsz","oqvsz","ERC1820_ACCEPT_MAGIC"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("0", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(96, "0", ["Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1, "Transaction successfully verified.", ["ERC1820_ACCEPT_MAGIC"], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("P", ["egtlv9"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("d5tvi", ["0","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(69, "\x19Ethereum Signed Message:\n32", ["Capstones","egtlv9"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(5, "Transaction successfully verified.", ["Capstones","x068fn"], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("0", ["P","Capstones"], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("x068fn", ["[","ERC1820_ACCEPT_MAGIC","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1532892062, "\x19Ethereum Signed Message:\n32", ["Capstones","\x19Ethereum Signed Message:\n32","d5tvi"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(18, "L", ["egtlv9","d5tvi","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("Transaction successfully verified.", ["oqvsz","ERC1820_ACCEPT_MAGIC","["], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("P", ["L","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","egtlv9"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(18, "x068fn", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","d5tvi","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(58, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["L","Capstones","ERC1820_ACCEPT_MAGIC","d5tvi"], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("Capstones", ["oqvsz","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ibl9i","z2u68"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("[", ["z2u68","[","z2u68","z2u68","d5tvi"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(95, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["0","Capstones","[","L","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(200001, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","osk6s","x068fn"], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("z2u68", ["ibl9i","L","\x19Ethereum Signed Message:\n32","d5tvi","\x19Ethereum Signed Message:\n32"], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("z2u68", [[97,199,216,163,22,151,36,73,102,88,143,10,80,76,76,65,49,0,252,16,115,6,255,136,228,122,255,127,175,49,193,126],[64,234,28,213,209,195,82,108,244,2,2,201,1,160,79,89,202,149,20,85,245,28,181,128,221,23,170,240,37,198,231,96],[52,215,114,69,54,62,214,176,221,43,240,82,233,95,103,186,207,69,221,167,224,91,166,3,190,166,138,240,66,41,10,223]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(47, "Capstones", [[48,87,193,209,215,73,40,120,169,103,244,151,4,10,24,210,209,66,173,109,214,213,226,149,77,86,119,246,26,160,50,212]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(28, "Transaction successfully verified.", [[241,1,143,35,84,37,123,26,93,190,134,87,56,195,158,58,115,184,97,186,236,35,118,232,32,106,172,183,248,172,7,177],[67,18,47,27,151,106,56,40,90,139,38,159,177,1,155,30,137,127,175,248,17,163,202,199,202,55,225,129,90,10,148,72],[159,178,84,164,161,76,111,172,229,94,218,223,249,215,128,27,68,18,242,76,189,91,189,132,208,127,116,230,46,59,130,6],[228,33,65,182,209,10,207,44,249,241,10,114,236,35,97,100,130,254,11,130,195,19,144,63,118,71,17,132,72,99,209,237]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ERC1820_ACCEPT_MAGIC", [[63,66,131,214,178,223,187,78,187,139,254,130,237,5,202,187,159,70,43,183,73,63,8,182,153,124,185,180,100,44,84,166],[235,213,208,116,97,82,3,205,25,16,205,77,56,233,71,22,247,136,169,64,159,190,128,135,148,125,108,56,120,123,45,102],[19,212,39,219,57,140,83,47,20,225,122,159,70,38,90,37,223,146,251,114,19,172,190,47,81,161,113,128,161,146,216,153],[107,184,28,29,105,5,32,207,181,64,226,133,239,74,99,161,158,103,22,185,171,9,233,165,251,201,205,57,70,132,42,119],[130,128,32,125,94,120,181,117,19,18,140,72,236,45,119,191,167,29,149,221,224,93,210,52,140,89,32,11,62,140,98,21],[59,75,228,171,78,46,56,248,35,166,116,37,128,236,247,65,49,170,103,147,255,81,95,254,148,116,10,143,40,151,37,180],[140,166,43,27,31,209,237,147,152,187,115,216,242,210,59,215,28,20,216,82,85,89,31,126,26,212,21,150,103,95,169,147],[18,63,194,65,46,13,140,244,24,70,195,90,13,51,88,194,167,230,220,30,200,153,71,210,185,9,51,203,184,103,154,15]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("egtlv9", [[192,91,71,40,93,74,44,1,61,57,146,216,34,21,150,119,6,80,60,122,19,149,2,21,124,184,146,204,205,25,123,37]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(160, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[120,167,228,142,214,66,184,183,10,20,93,205,210,107,89,64,186,210,152,154,18,231,26,196,49,43,178,205,228,207,111,161]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(70, "L", [[45,33,2,61,199,61,89,116,143,232,154,241,251,220,113,160,48,105,171,102,108,212,162,232,59,110,111,17,253,3,143,238]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("\x19Ethereum Signed Message:\n32", [[177,100,189,110,4,142,173,226,85,99,169,83,56,101,87,69,35,110,213,177,218,155,37,31,157,246,91,229,4,95,246,210]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("d5tvi", [[26,49,45,110,254,31,169,184,50,212,161,130,221,150,184,140,30,92,175,107,97,201,85,15,98,73,142,75,46,20,23,193],[7,10,161,46,159,76,222,100,28,227,33,183,119,95,129,231,116,230,29,102,236,62,216,143,59,5,206,144,248,121,162,125]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(97, "[", [[181,7,51,18,245,171,234,152,64,142,186,40,10,136,188,148,33,68,189,102,121,71,110,35,130,169,62,222,78,231,217,239],[134,92,0,86,199,178,195,125,224,134,175,188,217,69,187,167,43,85,158,7,93,139,188,225,159,105,162,147,93,119,224,133]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(58, "z2u68", [[115,62,210,67,94,23,192,31,166,184,99,232,170,82,65,62,93,23,108,191,165,17,235,213,213,72,42,142,106,243,190,18],[174,24,28,116,191,64,160,68,44,120,31,8,63,22,158,202,215,251,145,238,125,45,115,233,135,107,33,253,181,251,192,233]], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("ERC1820_ACCEPT_MAGIC", [[148,143,104,253,47,55,30,175,65,61,193,155,153,218,229,223,80,13,224,136,210,101,90,66,196,132,144,72,113,116,182,61],[75,69,108,14,87,142,151,62,188,240,250,166,141,232,173,160,195,26,171,111,219,18,144,41,136,93,62,173,79,6,82,71]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("L", [[69,115,20,147,244,214,3,52,116,71,12,72,237,117,161,83,233,217,44,5,109,208,1,85,147,106,6,151,72,70,157,28],[65,199,22,59,17,183,202,0,177,142,228,244,97,240,180,31,30,43,247,27,14,81,127,103,12,163,5,133,216,193,88,243],[205,247,28,117,228,16,180,18,38,245,50,225,205,255,49,45,186,227,61,62,176,78,195,70,152,55,205,137,212,255,71,10]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(161, "P", [[250,220,13,233,237,187,58,238,101,62,60,69,127,177,221,63,249,218,28,83,162,40,123,212,205,195,31,159,102,153,223,137],[15,179,117,255,30,78,188,222,87,251,177,145,215,46,32,72,127,76,54,50,94,75,204,5,90,18,5,223,66,177,13,95],[140,145,249,61,203,130,85,12,235,235,20,17,161,55,138,199,9,176,163,34,91,3,35,189,88,9,184,66,164,152,137,225]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(25, "ERC1820_ACCEPT_MAGIC", [[101,153,230,181,200,28,164,32,212,158,186,139,112,133,96,47,232,142,248,46,250,1,82,62,21,150,185,206,201,9,108,100],[236,119,150,226,109,213,246,38,228,177,165,27,230,108,237,15,50,39,58,238,88,36,244,192,246,158,178,62,238,95,140,55],[175,40,69,198,202,221,88,218,30,112,151,70,13,55,194,108,205,179,143,202,134,209,194,224,230,122,235,192,237,30,158,201]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("\x19Ethereum Signed Message:\n32", [[172,212,189,160,119,84,65,201,124,249,99,201,71,252,6,62,225,119,65,14,180,141,185,30,75,45,59,115,102,132,0,235],[79,156,54,167,1,130,219,228,237,224,207,44,195,180,112,54,154,92,48,117,185,124,32,150,162,12,172,172,14,137,237,22],[94,158,2,116,187,94,76,209,225,20,56,218,185,54,8,153,184,162,43,149,212,147,106,230,14,160,196,32,227,241,112,204]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("ERC1820_ACCEPT_MAGIC", [[205,248,12,122,137,42,233,203,58,51,126,155,217,134,42,95,122,3,4,59,129,127,94,116,224,42,191,127,176,19,85,100],[44,204,60,38,19,207,121,54,50,183,211,17,207,195,112,146,37,56,147,251,19,238,138,87,86,99,44,170,185,138,83,73],[59,221,105,34,146,197,126,54,247,19,29,211,234,239,30,93,207,199,123,99,90,219,133,91,208,223,49,56,83,212,7,48],[138,35,76,64,136,130,223,182,84,66,63,241,222,139,156,110,103,171,104,180,113,163,207,163,70,187,219,119,150,148,68,211]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(2014223714, "ibl9i", [[8,241,83,98,196,137,208,78,57,184,188,175,184,238,159,220,236,60,134,141,209,10,250,15,113,209,70,55,88,84,167,168],[26,53,94,163,232,31,248,238,18,88,182,149,71,128,156,56,209,8,26,164,42,88,47,7,228,207,192,62,132,111,122,91],[83,47,123,49,255,201,193,118,176,198,212,59,63,158,60,57,192,28,32,151,223,247,27,88,221,231,98,177,174,176,74,87],[23,107,193,250,92,35,245,121,176,132,123,188,116,160,87,251,29,139,242,162,93,209,225,144,61,139,189,151,56,130,27,70]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(255, "\x19Ethereum Signed Message:\n32", [[37,131,180,22,2,48,76,31,188,21,165,171,164,220,101,193,31,236,202,66,78,147,1,39,188,253,120,219,65,225,255,93],[94,186,106,247,212,50,121,79,127,138,20,85,233,185,193,38,31,29,222,66,225,83,3,78,214,63,84,51,66,6,236,105],[129,167,91,96,51,251,172,226,217,52,68,120,56,50,109,196,195,52,183,88,61,75,96,223,173,255,236,50,127,162,87,73],[81,166,255,190,169,134,246,195,30,13,65,0,228,133,152,76,184,72,92,222,250,170,177,70,144,203,61,154,209,106,104,240]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("osk6s", [[159,177,95,23,148,146,133,124,119,200,49,111,87,216,30,43,44,61,125,111,27,232,39,70,89,212,12,189,246,8,158,9],[83,227,64,64,209,111,13,101,88,57,161,233,206,153,27,22,192,167,96,19,251,135,201,125,125,173,19,16,208,17,27,215],[33,124,160,37,17,68,89,106,57,213,173,196,253,148,24,151,192,232,140,104,145,179,164,40,158,108,49,49,94,30,224,122],[187,69,78,227,254,20,149,135,66,213,243,246,22,16,162,22,138,118,147,87,131,131,185,105,95,1,214,167,47,168,28,120]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("L", [[32,44,187,34,146,211,45,239,115,184,238,56,153,200,185,68,201,197,239,226,72,60,130,41,113,22,201,250,128,172,128,41],[70,24,236,198,228,87,33,112,66,19,65,162,183,195,38,63,228,166,68,35,39,178,210,47,82,64,148,124,44,37,185,223],[192,245,137,104,107,221,54,23,102,52,112,148,77,136,227,61,210,241,215,245,212,160,84,223,101,132,143,211,200,11,72,187],[156,43,110,155,155,102,92,69,100,206,132,87,188,157,230,140,152,50,19,246,188,137,112,229,142,233,61,47,127,8,87,234],[32,36,150,127,254,214,116,126,174,87,249,97,29,234,246,44,186,107,67,147,14,109,169,49,135,253,55,25,238,125,191,17]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(95, "L", [[41,194,239,212,125,243,31,147,18,96,106,199,208,125,119,183,36,116,247,91,220,162,61,137,232,215,130,83,200,182,32,42],[230,222,207,9,31,26,34,13,162,25,196,243,45,36,242,191,13,35,241,163,186,176,229,201,94,20,114,74,6,102,221,2],[247,66,124,60,141,211,143,227,84,46,105,118,240,145,244,181,177,76,66,14,42,238,57,229,185,41,143,52,224,124,63,84],[126,84,143,25,29,241,119,11,118,155,247,11,63,137,201,83,250,82,126,50,124,224,31,150,195,138,209,243,47,237,141,150],[186,77,69,149,169,245,215,30,77,244,62,165,40,3,126,180,39,203,100,62,92,68,141,9,2,87,140,249,145,73,66,212]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(11, "d5tvi", [[112,153,150,38,19,39,252,78,128,144,50,78,254,12,192,141,68,215,245,239,133,62,136,154,44,65,230,59,111,252,214,226],[61,230,99,152,130,216,103,54,216,165,164,90,9,137,171,170,128,49,230,98,186,103,108,140,84,229,67,251,194,60,80,43],[176,138,145,165,174,21,253,111,224,22,108,238,92,254,252,94,107,3,96,88,127,254,132,110,181,184,189,73,100,16,40,247],[169,182,150,33,226,65,150,28,145,157,120,3,57,74,7,166,199,100,122,18,146,155,13,231,176,27,0,194,124,2,222,60],[69,53,182,247,59,85,59,29,224,234,66,166,147,246,87,199,191,0,73,57,218,105,49,234,216,221,139,211,161,128,166,89]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("x068fn", [[15,2,19,171,203,227,254,78,247,43,222,159,116,206,244,128,70,176,103,147,225,190,90,172,247,136,13,251,139,27,107,17],[69,197,200,193,154,72,113,28,55,59,119,208,201,223,243,202,158,88,168,229,138,180,35,63,25,101,131,226,184,21,15,199],[12,176,254,31,172,194,180,42,156,63,116,2,217,127,139,215,212,29,219,159,49,121,31,245,68,116,55,192,116,225,235,254],[78,53,139,154,153,25,16,196,252,34,49,227,18,218,151,58,108,38,178,98,10,200,225,181,151,202,249,31,56,72,139,56],[255,233,39,150,168,83,206,43,176,58,2,159,17,83,5,245,231,135,245,242,38,129,141,25,122,28,68,73,21,227,22,2]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([177],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[9],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(59,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("ibl9i",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("L", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("egtlv9", "osk6s",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("[", "osk6s",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("x068fn", "ERC1820_ACCEPT_MAGIC", "oqvsz",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("ERC1820_ACCEPT_MAGIC", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "d5tvi", "osk6s",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("osk6s", "L", "oqvsz", "\x19Ethereum Signed Message:\n32", "osk6s",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("z2u68",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("z2u68", 162,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("z2u68", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ERC1820_ACCEPT_MAGIC", 160,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("oqvsz", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(7,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["egtlv9","L","x068fn","oqvsz"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[134,180,171,197,27,169,54,72,202,110,209,96,172,20,212,136,61,132,64,149,85,75,208,98,156,201,77,33,30,46,14,100],[135,163,6,130,233,228,62,119,101,112,51,88,71,97,154,234,244,164,157,101,149,20,228,213,110,177,225,201,169,135,103,71],[13,57,100,231,108,35,199,52,109,51,49,197,147,200,60,3,251,123,119,159,32,240,84,84,246,192,75,225,104,1,138,193],[72,171,168,157,96,87,215,47,38,120,41,160,153,36,32,101,249,101,32,7,172,117,183,6,53,112,92,207,52,141,130,198],[224,134,105,173,41,136,163,234,176,142,84,97,114,203,66,61,232,205,89,21,69,145,114,179,229,6,131,245,50,16,124,218],[254,255,90,42,176,245,6,150,66,102,229,181,50,127,79,106,0,251,118,42,159,243,94,5,105,230,233,127,214,72,168,142],[205,157,194,229,59,220,22,212,164,72,109,103,8,40,225,74,105,184,170,118,56,163,120,147,69,218,160,134,70,245,169,64],[178,217,163,86,199,136,232,131,36,46,112,118,78,223,136,47,11,12,212,186,210,226,235,242,226,125,22,39,161,184,126,183],[192,200,22,180,151,211,250,216,65,149,95,206,207,76,176,49,4,207,65,189,160,50,60,164,145,240,238,67,243,21,172,85]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(46, 30, 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([183,108,100,39,15,200,192,106,6,30,114,110,154,127,77,223,81,74,28,162,185,136,32,76,9,188,20,154,155,168,203,152], [196,205,173,121,17,146,138,215,251,124,58,134,121,153,219,10,108,161,43,63,89,187,146,119,143,76,77,230,105,238,67,244],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([149,153,227,231,217,202,205,226,22,111,42,211,206,122,193,18,204,154,171,65,10,52,126,140,13,108,193,180,170,151,52,207], [142,216,178,151,113,180,249,153,56,163,124,159,28,155,92,197,65,114,23,104,155,232,99,45,30,150,233,64,225,171,80,66], [230,228,210,48,210,211,182,18,105,125,180,64,18,225,131,235,141,235,133,70,49,77,22,104,60,112,76,18,208,214,103,54],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([107,110,15,79,74,6,118,95,165,236,53,18,197,46,25,216,248,153,96,174,132,43,168,174,95,127,21,137,95,69,16,253], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([23,112,99,233,169,221,154,96,27,251,36,75,225,64,115,82,237,15,145,38,166,56,153,26,147,169,191,111,164,136,62,154], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([144,100,39,131,195,224,94,202,77,209,51,199,54,120,88,37,177,134,77,163,98,254,155,133,56,93,89,0,170,85,85,168], "L", [39,148,2,70,99,6,111,112,202,254,232,65,191,40,178,255,192,2,9,243,46,192,126,92,56,100,61,62,10,236,9,109],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([189,11,244,28,156,40,42,113,35,110,219,175,34,18,95,215,206,102,206,64,96,126,89,227,227,60,161,223,108,230,60,230], "ERC1820_ACCEPT_MAGIC", [30,236,209,110,162,59,250,234,37,132,9,83,125,218,119,112,38,172,208,42,136,212,79,73,209,27,234,25,164,179,105,49],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([15,164,63,151,232,211,232,185,165,39,30,109,86,92,215,228,205,94,104,144,107,60,102,235,167,64,154,247,104,203,170,93], [24,239,142,253,186,158,118,176,61,115,251,75,221,223,32,174,22,162,61,102,126,78,197,201,13,154,142,213,177,54,208,218], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([15,164,63,151,232,211,232,185,165,39,30,109,86,92,215,228,205,94,104,144,107,60,102,235,167,64,154,247,104,203,170,93], [123,243,107,73,39,93,249,168,194,206,118,81,172,254,223,112,235,176,59,181,124,66,233,159,77,197,10,77,185,146,211,193,66], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([98,158,192,206,210,251,108,151,31,102,64,146,170,73,180,229,124,228,79,180,6,141,114,31,81,122,239,40,17,222,238,9], [182,236,21,110,140,216,30,142,60,91,111,158,20,21,140,204,63,170,77,103,79,197,199,126,221,65,187,48,157,128,196,237], [9,194,157,239,90,78,240,180,51,93,138,180,1,228,32,100,140,213,177,96,3,1,122,240,132,10,84,58,23,51,195,6], "rqtlrl",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([94,86,156,141,117,24,119,234,120,126,7,61,255,140,119,160,34,133,163,20,98,32,111,249,24,137,226,150,159,168,8,215], [141,118,212,235,110,32,54,47,18,45,164,11,49,31,7,179,200,138,91,70,44,143,150,212,254,164,248,3,23,229,161,12], [128,55,1,2,184,68,22,40,72,250,20,60,99,150,119,247,0,91,176,198,245,122,110,182,174,131,204,63,80,251,101,185], "d5tvi",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([252,60,223,131,94,101,232,148,197,5,69,137,181,52,97,219,220,245,215,197,7,2,9,79,235,234,70,21,157,2,98,226], [123,90,161,173,114,94,189,9,188,170,252,242,23,61,167,194,58,235,120,93,206,158,20,122,252,90,37,131,15,14,41,78], [141,203,36,46,53,39,226,157,237,43,230,101,125,135,181,111,74,49,39,232,55,216,198,248,124,178,158,63,43,101,110,65], "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([71,16,8,0,53,53,90,212,220,10,136,243,70,137,169,72,65,44,126,110,22,201,26,210,131,134,89,102,201,102,1,39], [62,132,4,187,155,74,86,175,116,163,70,84,124,119,59,148,55,103,177,124,55,185,222,113,181,95,51,135,16,128,79,43], [38,61,89,33,100,144,207,33,77,55,176,5,74,31,197,192,153,134,187,122,28,146,45,31,201,38,17,62,72,221,214,197], "ibl9i",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([100,145,0,187,239,218,255,214,121,233,222,76,151,113,157,70,107,69,158,254,184,75,185,208,111,14,15,182,100,243,66,220], [91,16,83,98,110,40,45,43,159,38,29,193,37,236,210,162,131,213,39,183,152,193,74,89,129,201,48,177,153,163,140,113], [71,61,124,140,95,30,130,90,109,149,157,114,25,78,175,46,44,111,171,144,121,140,255,189,231,43,16,130,100,41,126,8], "h83e2s",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([12,138,221,157,26,36,255,255,106,245,189,82,225,204,182,114,136,202,160,158,145,158,155,22,225,88,30,80,199,47,218,8], [86,193,28,34,38,52,236,136,42,9,114,101,218,252,93,160,208,83,120,19,181,187,67,119,57,72,74,240,148,138,161,235], [46,160,148,177,62,208,103,102,48,7,11,74,7,49,215,31,180,136,187,143,14,45,72,41,154,152,190,67,38,75,49,190], "h83e2s",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([230,7,3,151,88,161,252,213,135,190,88,55,179,93,232,125,72,99,46,19,168,241,45,242,176,216,244,92,82,101,154,220], [218,44,162,168,10,162,112,238,243,233,60,64,157,46,77,91,97,185,98,94,72,174,184,19,63,218,115,185,170,183,254,67], [147,82,175,96,2,3,49,94,217,244,121,95,91,177,38,163,106,205,253,197,248,58,158,194,230,202,18,104,180,35,61,46], "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([227,221,148,158,127,175,126,161,21,21,75,156,6,253,49,242,48,240,92,77,38,68,31,208,63,94,247,199,141,197,167,12], [225,171,118,195,117,226,142,95,171,208,86,97,234,74,76,61,227,240,209,45,206,139,178,250,174,251,169,227,115,48,140,114], [42,53,243,205,220,12,115,202,81,23,132,137,225,204,221,126,77,44,33,193,59,206,100,220,118,67,233,103,84,83,71,29], "h83e2s",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([115,130,27,107,147,181,175,163,183,78,172,92,183,39,177,198,121,204,38,123,57,104,248,172,144,234,76,105,21,67,223,172], 65, 49, [149,140,126,94,50,168,108,25,125,212,87,133,177,106,60,24,230,51,231,3,94,3,48,131,86,182,76,158,41,240,111,66], 48,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([16,108,112,96,129,59,26,218,192,178,127,120,120,142,138,179,123,199,20,193,47,38,164,24,240,225,103,111,59,102,83,152], 29, [188,28,64,157,104,246,197,165,137,122,189,15,5,131,29,66,178,68,113,212,175,21,52,151,203,60,249,70,226,20,196,208], [44,31,210,157,5,177,141,220,83,54,190,71,75,131,102,19,94,16,193,179,219,234,122,105,185,38,34,96,26,116,190,193],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([126,79,5,198,9,184,170,151,129,203,212,55,50,115,219,210,247,217,76,48,245,217,191,154,192,82,124,246,248,244,241,6], [40,239,23,183,221,6,3,220,126,166,216,116,81,51,16,67,141,214,24,148,233,196,155,241,38,242],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([22,76,143,178,235,231,114,67,19,52,64,102,248,195,142,155,103,202,33,240,244,87,196,40,180,8,66,82,0,226,240,251], [182,236,11,78,205,23,123,25,168,106,219,118,17,212,115,7,135,202,163,219,18,105,181,233,199,47,107,109,132,219,240,119,164,159,179,120,40,56,97,5,55,147,130,186,7,124,239,89,139,43,251,137,46,188,243,28,76,226,35,33,110,161,242,244,241],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
