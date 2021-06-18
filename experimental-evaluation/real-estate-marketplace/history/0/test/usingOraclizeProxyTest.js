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
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(24,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("pcmevm",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("\x19Ethereum Signed Message:\n32", 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("ERC1820_ACCEPT_MAGIC", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(30, "Capstones", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(129, "ERC1820_ACCEPT_MAGIC", "\x19Ethereum Signed Message:\n32", 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("\x19Ethereum Signed Message:\n32", "ERC1820_ACCEPT_MAGIC", 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("L", "pcmevm", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(128, "0", "pcmevm", "pcmevm",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(31, "[", "pcmevm", "Transaction successfully verified.", 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("Capstones", "ERC1820_ACCEPT_MAGIC", "0", 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("ERC1820_ACCEPT_MAGIC", ["2sm0r6","0","P","ERC1820_ACCEPT_MAGIC","scn4e","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC","[","7kxci"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(28, "L", ["Capstones","[","0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","scn4e","ERC1820_ACCEPT_MAGIC","2sm0r6"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(200001, "scn4e", ["ERC1820_ACCEPT_MAGIC","7kxci","0","[","0","pcmevm","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("9y1ahr", ["\x19Ethereum Signed Message:\n32","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","2sm0r6","pcmevm","Transaction successfully verified.","9y1ahr","f4eoa7q","Capstones"], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("P", ["pcmevm"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(2014223714, "ERC1820_ACCEPT_MAGIC", ["pcmevm"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(5, "pcmevm", ["2sm0r6"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("scn4e", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("t4t6aa", ["pcmevm","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(11, "ERC1820_ACCEPT_MAGIC", ["scn4e","scn4e"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(160, "t4t6aa", ["\x19Ethereum Signed Message:\n32","sq8lh"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("scn4e", ["scn4e","mxu3g"], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("mxu3g", ["2sm0r6","sq8lh","2sm0r6"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1025, "9y1ahr", ["\x19Ethereum Signed Message:\n32","P","t4t6aa"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(55, "Capstones", ["d7f2q","[","Capstones"], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("7kxci", ["9y1ahr","2sm0r6","P"], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("sq8lh", ["f4eoa7q","[","in65de","pcmevm"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(200001, "P", ["kxb98","pcmevm","d7f2q","u64ve"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(5, "pcmevm", ["9y1ahr","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","\x19Ethereum Signed Message:\n32","d7f2q"], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("t4t6aa", ["9y1ahr","P","in65de","["], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("4mgwof", ["sq8lh","4mgwof","pcmevm","scn4e","9y1ahr"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(7, "g2obtk", ["pcmevm","sq8lh","P","L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(21, "Capstones", ["scn4e","0","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","f4eoa7q"], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("7kxci", ["Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","mxu3g","g2obtk","Capstones"], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("0", [[183,98,108,141,219,97,1,79,67,155,169,33,252,237,251,220,120,233,193,3,56,221,13,211,234,185,43,65,141,24,99,11],[143,223,115,176,96,93,35,41,29,105,67,93,43,6,229,210,203,157,22,8,160,155,33,15,191,44,163,67,117,84,88,20]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(2014223716, "Capstones", [[47,77,172,42,61,225,42,18,16,163,113,147,78,151,30,111,46,85,95,203,237,120,125,184,52,128,179,217,85,191,242,151],[72,100,71,94,172,228,202,54,56,86,53,187,100,186,60,94,209,49,91,176,87,133,106,114,58,228,17,62,4,17,31,58]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(86, "mxu3g", [[102,19,154,24,243,57,106,95,253,5,58,153,153,19,230,103,69,78,97,139,68,222,10,216,3,225,193,230,71,60,158,230],[16,243,60,134,106,132,222,245,87,172,154,202,173,186,224,22,91,128,228,37,3,89,121,169,217,24,178,255,49,136,106,204],[71,191,59,121,123,168,206,19,83,95,51,134,196,160,164,14,58,67,226,80,52,38,51,88,227,58,189,86,191,213,54,120],[176,126,78,54,203,93,67,121,16,49,55,97,193,186,239,56,2,255,77,18,106,13,200,59,58,95,214,185,82,24,194,248],[239,85,197,193,39,215,223,222,53,71,175,182,235,9,60,241,208,20,237,118,1,190,212,199,143,227,199,40,115,177,181,101],[43,148,98,91,137,20,249,76,185,253,158,164,76,244,12,0,48,213,75,16,65,219,201,13,16,46,122,19,224,187,43,38],[183,36,237,41,100,20,103,138,29,233,72,211,214,145,61,153,253,82,70,200,185,195,63,152,152,217,201,233,126,242,137,61],[232,199,121,83,26,74,242,102,255,135,121,10,158,232,143,226,86,202,20,255,251,22,195,248,81,130,10,0,161,140,71,13]], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("d7f2q", [[244,74,214,152,167,251,27,225,222,225,136,249,181,249,193,115,193,72,226,90,130,12,230,173,117,176,240,228,100,46,225,85],[70,58,145,63,55,62,61,211,69,53,221,131,238,145,80,131,136,163,94,33,189,179,96,172,175,6,17,81,183,134,140,60],[199,235,95,190,175,3,63,205,138,236,44,152,203,78,190,253,108,171,62,97,44,55,177,79,145,136,223,242,225,135,89,92],[147,90,155,255,65,73,197,72,68,170,23,171,101,40,62,50,198,241,96,220,84,183,102,80,228,250,115,169,78,68,133,35],[150,3,31,234,109,237,182,70,9,22,166,115,77,247,139,212,253,9,92,146,82,208,234,73,86,27,140,85,255,103,19,172],[168,240,143,94,76,242,118,111,219,247,201,189,113,17,30,187,55,119,134,201,7,225,218,103,127,232,225,214,158,145,252,70]], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("ERC1820_ACCEPT_MAGIC", [[63,189,117,110,86,251,88,92,109,87,58,228,8,104,21,105,27,36,112,118,50,84,96,95,166,84,241,188,135,152,56,231]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(30, "g2obtk", [[185,112,222,0,188,231,195,90,55,102,17,106,131,228,237,43,64,200,170,157,136,43,39,215,10,97,22,0,214,180,55,166]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(86, "7kxci", [[40,72,124,241,85,41,127,137,205,91,91,153,160,57,101,209,105,151,38,251,90,194,229,124,153,209,233,157,127,76,69,251]], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("f4eoa7q", [[53,191,32,188,19,243,237,9,63,132,127,102,41,51,1,180,68,111,96,204,204,6,72,93,203,172,116,220,51,6,154,36]], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("scn4e", [[215,223,81,50,134,66,238,159,190,43,92,213,16,11,203,0,60,75,106,225,77,234,205,220,177,21,93,78,140,36,191,30],[199,23,165,19,131,144,25,96,229,73,115,223,111,140,54,72,56,117,180,199,170,156,233,81,193,8,47,49,49,73,60,90]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(7, "Transaction successfully verified.", [[14,46,54,6,186,252,135,129,32,215,129,17,77,35,76,97,129,37,254,117,203,151,77,104,142,117,123,152,172,32,229,20],[88,69,46,196,111,69,64,224,50,243,253,173,180,36,157,76,236,229,9,207,60,159,124,20,154,5,4,85,83,215,147,40]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(1025, "L", [[193,80,202,196,160,211,245,44,227,76,87,241,223,208,51,57,51,243,255,84,190,235,172,52,230,136,87,121,135,199,207,215],[181,235,109,143,164,238,180,123,43,11,148,185,122,137,71,53,96,250,96,125,197,158,6,89,155,232,229,168,77,67,172,112]], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("g2obtk", [[171,239,239,83,179,39,115,116,181,63,75,40,43,218,197,167,80,31,133,166,226,65,115,228,133,46,169,231,164,111,155,16],[153,13,49,70,20,24,21,24,16,43,159,171,104,94,179,80,91,177,181,188,143,184,171,230,197,239,62,98,60,169,16,90]], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("[", [[64,183,178,246,69,60,214,199,92,35,136,58,128,236,9,205,244,1,249,85,201,111,47,36,126,114,85,235,3,19,180,67],[25,202,125,62,75,228,253,242,116,19,43,137,147,251,170,185,25,251,15,27,112,228,10,240,232,236,210,151,250,240,224,78],[105,112,221,197,210,137,18,248,118,111,217,209,85,237,207,42,56,128,124,213,76,214,42,250,58,155,213,206,168,181,201,34]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(30, "9y1ahr", [[47,121,86,213,105,220,175,29,191,20,118,203,169,55,100,109,70,2,106,249,41,183,215,111,20,29,235,166,127,150,96,170],[30,204,242,182,110,238,200,40,33,245,69,79,51,122,56,4,87,146,111,79,239,47,253,210,20,235,246,51,110,210,1,13],[80,113,27,45,94,88,243,123,220,6,220,5,146,78,102,229,27,102,119,58,75,225,239,152,157,164,17,213,209,127,162,216]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(29, "P", [[220,255,22,14,168,145,48,170,202,235,126,179,251,213,201,24,66,77,167,113,96,98,58,195,196,43,39,250,255,60,29,12],[124,178,199,67,220,52,88,73,135,68,247,231,200,46,146,238,91,166,87,140,211,166,235,163,226,115,81,221,109,115,26,193],[205,48,107,115,109,244,42,238,127,113,191,42,98,40,24,21,164,71,58,128,164,170,128,229,226,180,33,57,145,190,35,197]], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("u64ve", [[97,112,14,96,42,221,103,216,199,165,36,204,190,124,247,48,154,218,246,192,231,221,200,197,39,175,213,155,224,37,3,185],[44,22,219,60,8,85,0,209,133,207,180,33,63,187,142,173,221,169,199,138,161,149,150,5,239,64,3,97,169,32,9,48],[96,96,210,124,155,247,91,122,93,152,122,12,150,109,255,196,16,217,174,138,222,35,114,90,92,3,43,108,234,70,55,42]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("mxu3g", [[185,186,227,113,182,21,96,150,20,149,193,192,59,135,248,29,215,56,50,205,199,44,99,50,248,91,137,244,124,99,74,209],[55,218,51,157,199,247,62,120,4,104,252,30,15,86,53,243,103,14,27,193,221,3,9,197,241,184,172,226,16,175,93,21],[132,254,14,121,89,45,104,51,151,115,255,243,194,167,243,45,48,12,215,197,97,50,52,102,204,216,50,161,151,105,87,76],[224,134,16,143,3,164,145,101,20,244,111,156,26,68,87,101,153,151,189,37,33,40,161,135,113,139,26,8,187,45,204,11]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(96, "L", [[244,204,162,183,216,0,248,34,172,229,91,221,95,213,0,64,136,4,239,204,112,182,168,228,84,175,204,250,99,96,13,220],[211,251,100,132,52,21,219,130,157,41,95,76,20,181,75,184,234,220,132,238,127,250,123,142,148,38,192,70,75,214,249,78],[109,25,21,158,138,16,221,146,72,241,114,159,16,209,186,170,199,236,198,125,209,34,172,92,49,202,228,191,71,16,235,87],[197,159,153,170,140,228,17,219,156,86,170,15,128,219,218,82,243,127,102,195,28,29,96,230,207,27,196,48,196,181,253,21]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(128, "2sm0r6", [[220,82,15,209,143,117,25,72,212,245,219,142,28,101,208,42,125,139,225,136,159,18,175,168,48,109,199,181,211,254,148,188],[193,88,75,84,188,110,99,200,233,181,176,61,249,167,134,34,185,51,112,107,83,8,159,245,218,6,196,38,160,23,100,91],[0,137,15,57,218,13,164,100,205,145,204,131,155,149,39,154,253,6,160,214,58,26,242,82,245,229,125,94,157,202,33,139],[23,78,126,193,19,120,177,218,197,63,181,3,222,61,212,127,69,183,227,245,20,169,202,194,27,45,7,137,99,142,61,182]], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("0", [[170,198,202,50,60,49,227,94,233,38,246,253,118,151,144,222,9,231,73,37,51,111,60,103,50,235,184,49,40,37,36,142],[154,117,239,17,203,203,246,45,224,173,3,178,31,73,165,137,38,119,125,217,158,104,175,179,37,112,94,75,100,13,167,247],[136,70,104,150,238,29,231,35,240,146,202,148,90,228,186,43,142,2,16,186,186,150,9,232,88,165,61,8,17,135,135,201],[100,26,201,211,71,36,39,137,21,141,112,63,107,58,66,172,215,234,219,47,16,101,133,166,154,2,220,205,11,70,189,39]], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("kxb98", [[16,175,137,134,168,213,75,77,60,173,137,9,72,233,156,189,123,194,148,105,71,116,248,25,177,142,60,95,39,90,44,238],[18,27,165,15,1,26,210,40,11,115,2,124,82,8,172,180,73,3,247,2,86,135,137,163,255,0,59,221,71,72,252,113],[119,6,63,34,104,37,222,64,70,75,86,134,94,28,71,66,207,235,80,54,223,87,254,81,163,242,93,228,161,221,178,178],[199,225,98,5,42,207,216,214,151,227,34,118,244,31,89,105,11,238,230,55,79,48,111,46,48,255,205,131,200,204,206,18],[122,236,161,9,232,156,57,172,114,180,129,179,22,136,121,8,47,69,126,167,159,251,48,15,141,225,190,48,110,222,148,59]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(27, "0", [[150,64,198,85,4,136,178,4,7,84,252,14,127,105,66,218,178,45,140,207,212,208,88,137,80,34,105,120,252,0,234,54],[217,134,149,225,215,142,177,104,242,245,104,180,239,157,77,20,205,244,202,99,130,73,39,195,130,103,7,134,78,153,186,10],[245,48,0,112,207,224,70,43,57,203,55,227,85,102,206,121,57,161,94,57,211,244,83,123,185,30,201,175,43,121,45,136],[132,191,255,15,91,37,190,21,12,16,242,222,180,33,144,38,14,247,4,12,244,162,129,57,92,9,135,247,116,46,197,187],[165,238,41,123,131,175,136,101,117,224,73,24,1,56,184,180,88,128,254,249,124,188,39,237,107,18,106,44,179,164,43,123]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(2014223714, "t4t6aa", [[31,99,156,178,21,131,183,10,168,54,245,87,231,50,106,57,100,96,185,40,156,15,208,200,254,109,111,62,203,117,136,160],[75,80,141,46,255,164,105,35,26,42,45,219,41,89,132,154,120,118,192,238,73,19,139,191,84,227,168,68,164,24,237,164],[141,106,209,150,46,68,4,161,150,152,13,114,214,83,189,20,204,82,1,4,231,74,178,245,202,75,130,113,163,87,218,141],[140,41,28,118,157,66,199,203,167,2,105,161,95,83,223,50,197,58,207,28,16,91,40,70,71,222,247,194,222,178,211,152],[128,225,140,35,208,32,40,120,100,65,82,84,151,219,165,144,222,88,224,180,173,56,238,103,240,125,162,102,19,67,120,146]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("9y1ahr", [[47,89,7,202,63,210,179,114,154,141,234,236,180,85,95,131,49,89,100,158,158,40,169,37,164,64,199,255,165,202,33,156],[169,88,121,229,242,178,197,8,23,37,116,164,172,169,59,94,225,90,212,208,20,23,54,180,27,16,19,91,79,32,36,219],[126,115,185,82,159,224,238,138,148,166,116,249,183,144,114,62,87,164,109,185,138,168,190,33,79,120,174,127,194,234,60,213],[249,85,188,253,112,9,76,0,228,238,14,83,89,228,62,111,99,23,109,110,66,47,176,27,16,249,82,179,112,41,61,34],[19,170,62,252,66,34,230,242,81,93,159,135,44,160,135,66,82,217,45,186,82,42,84,30,241,227,253,122,233,194,143,31]], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([212],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[1],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(88,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("kxb98",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("9y1ahr", "9y1ahr",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("g2obtk", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("7kxci", "g2obtk",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "4mgwof", "f4eoa7q",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("u64ve", "pcmevm", "7kxci", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("sq8lh", "7kxci", "in65de", "pcmevm", "u64ve",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("sq8lh",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("pcmevm", 24,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("u64ve", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("g2obtk",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("kxb98", 199999,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(256,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["mxu3g","g2obtk","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","t4t6aa","u64ve","sq8lh","P"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[11,9,90,73,11,35,143,77,232,206,102,215,15,247,154,93,248,120,163,43,26,131,127,48,174,166,53,69,73,203,185,236]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(128, 15, 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([121,88,103,211,158,237,164,226,168,2,159,160,210,151,112,19,94,68,170,74,180,218,42,87,144,117,239,173,12,104,229,224], [57,131,130,101,250,16,50,48,133,115,45,246,46,119,206,90,102,130,78,43,115,62,116,113,247,139,221,63,122,55,237,106],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([232,153,254,207,14,45,81,97,10,185,127,61,24,43,62,92,169,61,6,236,84,193,177,20,126,251,235,184,138,228,153,222], [249,152,46,34,14,158,97,50,102,50,86,187,147,10,219,73,144,182,130,176,5,144,126,88,46,75,3,33,229,23,186,209], [181,6,228,59,26,154,36,210,37,98,106,170,239,19,101,198,212,19,42,24,36,215,130,21,135,188,221,75,4,146,252,151],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([49,39,10,154,160,56,210,198,12,18,7,62,140,24,244,41,174,19,213,171,15,37,175,24,215,7,198,219,62,101,118,220], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([98,190,251,97,23,181,205,65,87,169,195,168,173,216,27,27,234,28,27,22,227,152,162,190,203,107,231,53,94,152,176,203], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([153,5,14,221,167,249,36,177,5,195,251,219,2,49,229,117,29,116,95,50,239,225,222,187,246,124,83,147,107,9,16,178], "[", [162,194,107,41,121,124,168,35,6,38,32,106,140,122,182,8,86,206,168,240,193,219,20,180,87,150,237,7,90,22,154,30],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([101,224,95,255,21,240,179,87,157,187,156,6,88,224,43,165,193,187,123,182,225,182,101,94,25,47,221,126,254,1,243,9], "7kxci", [32,113,109,168,210,194,64,133,185,120,184,14,144,220,29,28,134,204,24,18,230,29,29,255,94,204,125,37,169,167,72,191],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([40,186,126,126,14,214,207,46,236,106,23,240,88,182,192,91,41,99,222,170,85,242,127,171,255,98,55,132,148,241,179,149], [184,56,106,56,138,92,134,80,240,131,85,75,43,170,105,211,145,185,78,190,177,134,32,82,168,88,80,187,166,20,2,120], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([40,186,126,126,14,214,207,46,236,106,23,240,88,182,192,91,41,99,222,170,85,242,127,171,255,98,55,132,148,241,179,149], [7,140,60,246,113,175,76,131,140,34,4,129,199,231,158,0,103,174,184,166,51,250,25,32,52,123,165,217,38,37,165,110,176], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([78,182,133,5,29,112,222,242,194,195,142,152,81,69,184,79,118,6,181,38,74,163,0,55,12,38,15,220,118,141,62,201], [202,199,196,71,87,30,222,52,55,19,122,190,42,21,81,63,66,122,197,91,213,122,217,32,250,127,47,230,94,19,113,24], [33,39,173,160,244,225,126,169,217,167,124,193,68,52,119,60,144,145,108,163,245,157,175,130,216,40,82,248,47,29,129,130], "mxu3g",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([148,60,47,95,202,147,14,183,100,200,154,86,222,116,98,242,82,70,33,0,205,230,115,225,39,76,147,116,117,51,95,113], [206,90,61,22,181,63,103,117,131,226,183,109,203,65,58,35,156,251,166,73,20,101,129,119,55,131,127,238,42,11,130,31], [37,27,245,151,67,115,224,71,14,110,221,232,134,1,210,185,104,134,220,191,135,244,100,75,228,225,221,143,131,79,198,165], "t4t6aa",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([144,10,202,126,240,38,57,63,59,254,191,157,166,4,179,250,251,6,159,116,147,65,100,209,89,15,213,187,108,13,22,116], [142,167,71,197,19,177,67,137,188,63,30,245,184,132,195,4,149,131,242,61,84,115,147,242,121,37,186,48,136,202,39,128], [105,81,50,33,136,114,173,51,209,80,223,155,61,155,221,14,243,198,142,75,247,68,15,164,140,138,42,232,111,252,48,215], "2sm0r6",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([218,186,21,205,229,81,153,233,235,57,108,229,153,229,42,14,36,20,114,64,116,206,249,139,228,177,167,186,112,45,52,246], [255,34,158,41,166,97,246,54,158,152,32,113,161,180,88,116,113,236,210,158,124,70,133,57,22,234,114,172,168,117,249,201], [99,131,64,7,234,249,201,164,51,217,179,134,206,145,88,193,215,246,108,40,131,73,85,236,14,45,98,102,211,244,45,138], "pcmevm",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([216,158,246,182,104,120,142,1,74,215,0,59,20,104,250,0,246,62,216,140,253,182,235,230,170,112,161,43,217,112,201,26], [186,105,61,27,77,221,120,250,96,218,233,248,165,112,118,168,155,202,92,103,245,118,246,146,67,96,252,32,73,199,46,74], [57,119,162,246,16,124,23,113,107,107,90,202,245,67,36,65,58,154,168,224,172,126,6,111,222,178,142,92,11,248,25,100], "in65de",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([2,198,223,45,89,141,180,195,223,172,181,210,141,18,191,112,81,241,177,179,158,37,48,241,185,250,132,158,187,78,118,107], [101,124,140,15,157,159,15,85,48,151,37,41,98,108,243,83,255,165,222,192,209,180,237,228,249,131,188,49,71,189,200,44], [99,24,132,224,203,171,142,26,182,189,174,42,71,194,119,14,115,206,54,134,153,184,225,74,13,211,129,123,170,128,143,112], "scn4e",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([178,0,117,255,29,255,242,101,64,42,148,211,116,34,41,195,129,128,215,159,249,78,157,212,102,124,243,204,44,5,80,145], [61,13,151,132,164,145,216,236,13,103,105,238,70,51,139,254,15,188,248,3,48,51,27,92,96,95,213,139,92,0,73,178], [52,255,252,15,157,248,69,22,79,53,31,12,24,0,208,165,239,95,248,100,225,161,162,150,156,140,210,97,18,147,186,204], "q7rwor",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([115,132,130,2,219,194,12,221,248,248,135,120,174,134,208,38,119,162,16,246,92,84,49,121,44,189,123,69,226,4,23,82], [117,220,223,169,116,136,15,241,197,169,143,20,221,111,152,116,162,71,92,115,43,103,64,149,73,201,162,228,199,250,87,52], [104,202,12,88,238,19,252,79,128,195,91,69,43,73,202,34,160,184,5,110,90,33,211,62,206,139,225,123,15,177,160,113], "d7f2q",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([100,237,29,185,186,190,190,95,131,20,177,162,243,92,180,253,230,136,8,172,240,73,4,177,130,229,57,227,90,44,228,213], 95, 86, [98,245,105,13,178,66,14,34,93,200,100,33,53,227,44,174,181,232,94,97,192,248,126,63,213,41,143,140,60,51,125,200], 97,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([113,197,74,64,223,68,220,169,162,79,115,249,13,238,67,206,201,161,195,19,99,134,59,249,51,10,45,78,169,72,187,160], 20, [94,127,157,228,51,125,229,144,246,182,143,88,24,242,119,168,120,8,171,117,180,183,53,243,135,169,126,139,85,95,22,10], [220,103,182,121,99,75,20,201,178,107,52,143,131,110,190,84,220,59,32,4,101,23,152,13,103,99,107,9,15,85,127,58],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([254,44,251,104,99,112,74,108,10,106,13,54,150,155,60,149,129,186,101,142,162,231,171,143,222,41,35,65,215,239,59,129], [43,98,162,41,55,31,114,6,101,140,105,5,33,150,95,0,23,149,152,82,13,149,59,216,226,252,211,70,228,122,243,235],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([53,47,112,160,108,203,29,75,205,75,1,77,225,184,75,44,39,47,24,216,173,124,252,42,218,180,225,7,68,8,113,177], [193,135,159,47,175,211,137,250,23,136,65,3,83,114,83,62,170,179,116,23,45,191,37,125,100,32,243,115,69,141,130,22,31,174,114,25,241,38,33,24,228,200,152,202,185,63,249,28,163,255,182,67,62,226,207,231,70,100,82,59,61,174,239,190,102],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
