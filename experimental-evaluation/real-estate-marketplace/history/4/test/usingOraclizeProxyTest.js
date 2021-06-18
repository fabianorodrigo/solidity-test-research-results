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
    contractERC721MintableComplete = await ERC721MintableComplete.new("[","Transaction successfully verified.",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("[","Transaction successfully verified.",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("\x19Ethereum Signed Message:\n32","0","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("\x19Ethereum Signed Message:\n32","0","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(69,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("\x19Ethereum Signed Message:\n32", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(18, "0", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(20, "0", "Capstones", 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "ERC1820_ACCEPT_MAGIC", 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("P", "Capstones", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(1, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(57, "ERC1820_ACCEPT_MAGIC", "L", "L", 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("Transaction successfully verified.", "0", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Transaction successfully verified.", ["\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC","L","Capstones","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(16, "Transaction successfully verified.", ["\x19Ethereum Signed Message:\n32","0","\x19Ethereum Signed Message:\n32","Capstones","0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(7, "Transaction successfully verified.", ["ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P","P"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("P", ["Capstones","["], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("L", ["Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(47, "L", ["kctc4h"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(200001, "em9vdj", ["em9vdj"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("0", ["L"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("[", ["ERC1820_ACCEPT_MAGIC","kctc4h"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(1025, "L", ["em9vdj","em9vdj"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(5, "\x19Ethereum Signed Message:\n32", ["[","0"], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("ndpnxr", ["\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("Transaction successfully verified.", ["ndpnxr","L","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(10, "[", ["\x19Ethereum Signed Message:\n32","P","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(46, "8dtf3p", ["\x19Ethereum Signed Message:\n32","kctc4h","kctc4h"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("L", ["ERC1820_ACCEPT_MAGIC","em9vdj","L"], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("0", ["\x19Ethereum Signed Message:\n32","kctc4h","em9vdj","kctc4h"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(129, "ERC1820_ACCEPT_MAGIC", ["L","kctc4h","ndpnxr","em9vdj"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(200001, "kctc4h", ["Capstones","Transaction successfully verified.","L","ndpnxr"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("P", ["P","kctc4h","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ndpnxr"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("ERC1820_ACCEPT_MAGIC", ["Capstones","Capstones","\x19Ethereum Signed Message:\n32","0","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(28, "0", ["L","0","8dtf3p","L","8dtf3p"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(0, "L", ["8dtf3p","ndpnxr","ndpnxr","8dtf3p","ndpnxr"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("ERC1820_ACCEPT_MAGIC", ["ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC","kctc4h","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","\x19Ethereum Signed Message:\n32"], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("0", [[205,52,182,29,100,234,228,88,235,179,49,63,54,89,164,10,16,79,190,186,11,22,192,110,62,68,237,227,47,197,39,9],[2,211,80,234,175,221,80,144,250,152,232,126,23,53,200,81,220,146,52,190,63,96,226,112,39,182,50,157,202,222,121,50],[88,225,134,2,157,192,218,49,191,216,130,118,200,95,142,143,240,197,31,5,149,24,94,228,172,30,144,227,67,199,20,85],[133,251,150,203,161,2,37,18,231,207,63,238,237,238,248,125,43,107,223,180,9,117,155,163,195,5,138,26,38,134,226,7],[196,26,24,187,205,56,29,206,238,120,225,166,35,154,73,129,195,250,161,241,178,66,69,174,215,109,73,252,159,224,67,95]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(3, "0", [[195,67,132,139,98,47,253,235,225,153,25,54,70,76,67,2,186,250,8,46,191,221,74,6,210,215,21,140,38,249,62,45],[199,161,34,112,146,41,206,11,223,229,114,20,230,249,49,43,233,110,71,80,62,251,159,115,79,88,151,224,181,218,181,40]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(33, "\x19Ethereum Signed Message:\n32", [[199,44,111,65,47,179,170,197,209,109,191,240,71,229,97,18,99,202,122,211,117,96,65,148,202,179,83,181,87,214,108,124],[139,35,122,217,165,133,156,76,31,216,174,149,199,228,161,67,203,229,154,61,10,9,138,185,160,247,3,202,120,28,172,125],[54,167,43,133,221,87,90,47,147,161,35,57,128,60,228,12,231,227,33,122,182,176,103,213,15,255,200,43,226,95,134,114],[150,62,193,82,62,75,97,177,58,179,227,225,41,5,147,147,4,155,19,245,14,249,108,193,25,190,158,201,196,255,141,69],[148,232,193,163,48,223,242,171,102,29,235,92,174,111,42,182,160,9,130,195,126,250,243,35,40,236,235,203,249,187,252,173]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("0", [[68,218,198,97,123,50,245,172,255,1,111,121,110,37,194,253,47,111,128,236,215,80,34,84,191,55,174,155,164,4,143,33],[3,34,200,12,55,200,154,77,1,10,53,199,150,238,154,165,160,66,69,243,57,50,178,241,202,1,203,128,116,15,241,176],[71,187,157,96,20,157,217,161,104,18,105,201,130,135,239,189,157,249,246,106,186,114,61,199,76,251,11,173,201,244,94,66],[129,179,104,94,101,94,119,255,133,1,239,118,239,233,104,203,60,165,64,131,154,40,36,52,75,146,193,183,6,71,179,184],[93,89,80,211,68,54,56,170,213,134,245,162,166,90,228,177,40,200,53,11,25,250,134,170,232,60,9,39,94,205,252,39],[39,166,14,89,121,130,12,69,41,52,224,30,28,73,209,88,56,39,157,218,90,233,102,24,39,103,232,189,212,233,213,62],[154,128,14,72,246,212,183,232,255,159,138,26,219,115,234,207,15,18,209,59,83,125,191,101,203,147,91,191,176,255,81,101],[223,252,116,58,173,169,167,127,107,103,132,249,56,47,166,194,84,6,161,220,253,18,181,40,150,182,84,16,78,108,202,212]], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("kctc4h", [[10,227,120,248,219,194,72,61,61,9,126,157,155,69,197,47,111,132,205,254,204,210,168,17,28,150,193,127,77,214,137,57]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(98, "Transaction successfully verified.", [[137,67,108,233,87,188,24,182,202,85,93,92,164,31,223,179,58,87,23,182,194,177,222,235,178,101,131,155,168,47,146,88]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(102, "0", [[6,205,199,96,32,127,130,115,114,209,76,197,15,141,19,216,33,243,254,62,163,99,144,169,100,111,84,185,125,224,189,44]], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("L", [[179,88,246,187,49,240,247,152,211,74,26,240,2,44,211,9,197,102,77,175,122,111,91,207,35,188,252,143,110,53,239,116]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("em9vdj", [[249,191,153,64,149,203,31,138,90,209,226,217,77,39,169,82,37,95,2,222,6,8,154,249,159,125,231,76,201,172,94,153],[22,110,109,159,165,111,125,96,196,59,224,246,120,5,35,9,242,74,182,202,89,235,175,192,129,72,4,11,251,142,148,1]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(1532892062, "ERC1820_ACCEPT_MAGIC", [[97,214,138,161,207,127,183,24,109,118,84,95,90,157,79,109,236,63,128,66,154,210,238,176,107,82,104,117,23,47,181,114],[213,200,104,161,236,3,74,72,93,40,96,206,66,197,148,14,210,110,118,3,70,99,29,254,38,28,48,64,170,16,175,128]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(2014223715, "Transaction successfully verified.", [[15,67,200,131,31,54,113,67,188,98,251,124,50,107,120,188,154,16,158,113,50,204,3,121,67,77,139,128,229,54,156,52],[132,176,125,166,132,186,88,145,75,172,27,106,99,162,121,181,215,128,204,242,218,37,82,201,217,97,118,113,243,254,22,79]], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("P", [[223,60,126,49,56,190,35,161,224,182,66,102,90,81,53,106,195,196,43,8,109,82,59,92,211,224,66,61,137,192,66,103],[11,196,115,176,45,54,72,192,40,142,76,107,126,80,254,144,245,115,201,14,246,108,7,7,136,131,233,161,54,177,134,205]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("Capstones", [[116,121,186,57,222,64,152,97,212,178,225,52,250,165,38,141,191,175,78,159,165,211,8,234,16,65,210,29,90,107,134,199],[86,141,180,237,219,252,191,88,231,203,69,19,249,218,161,207,53,214,61,45,209,173,59,197,55,76,249,75,188,67,136,236],[21,196,243,201,98,178,224,250,84,133,4,88,143,233,42,103,209,108,157,167,48,214,206,64,126,169,32,208,224,124,170,6]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(26, "Transaction successfully verified.", [[75,123,111,117,179,137,168,200,41,225,150,11,50,195,150,91,17,231,199,24,118,27,190,74,2,252,58,88,175,215,79,155],[128,41,228,216,230,116,245,237,147,223,226,199,93,131,154,83,24,87,28,56,8,140,12,223,146,69,229,90,106,200,49,56],[211,163,92,19,35,66,234,239,246,111,163,194,224,137,27,3,226,174,63,171,183,139,90,41,84,25,62,244,9,196,5,113]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(46, "ERC1820_ACCEPT_MAGIC", [[127,27,31,42,36,206,131,108,223,66,68,212,237,49,125,229,242,28,188,57,126,217,6,108,149,243,186,115,98,211,10,107],[199,96,210,68,27,229,180,122,181,37,208,109,204,105,13,103,61,45,11,152,175,48,80,155,131,89,114,58,24,195,162,4],[134,121,105,65,142,135,129,81,62,80,227,96,226,0,139,109,154,14,60,134,158,3,221,19,173,56,26,53,241,82,243,63]], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("ndpnxr", [[76,95,235,186,233,14,201,219,88,161,163,219,127,131,177,227,3,103,196,8,15,63,61,249,58,5,47,108,76,210,196,157],[77,126,207,45,126,121,215,177,106,123,215,148,92,123,211,35,237,56,11,68,18,147,185,28,117,111,240,81,237,132,49,1],[26,203,56,179,151,252,122,44,230,90,117,82,47,227,64,218,99,66,123,57,112,226,99,95,16,64,247,141,102,231,206,226]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("\x19Ethereum Signed Message:\n32", [[69,246,146,176,199,170,31,219,234,33,214,254,208,253,150,61,115,202,126,108,232,195,74,56,137,5,85,104,51,32,101,151],[3,41,73,15,223,209,207,138,68,63,204,239,225,193,98,213,90,36,204,5,36,70,193,188,208,168,1,63,237,176,132,137],[154,134,2,77,4,71,92,83,163,44,63,26,202,149,167,58,215,204,72,118,251,98,150,95,172,62,211,211,239,245,126,227],[78,143,179,6,189,183,91,237,234,183,63,142,52,137,188,139,215,9,255,237,25,190,206,161,175,6,155,192,174,226,180,26]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(103, "ndpnxr", [[252,163,112,53,203,33,112,208,201,3,107,45,169,41,212,160,245,155,46,214,71,120,84,89,130,135,103,48,240,85,144,10],[69,173,33,40,176,250,14,210,50,174,178,198,211,249,134,15,14,47,226,157,237,183,229,76,130,70,18,168,3,139,236,175],[81,80,148,241,218,96,27,169,115,46,213,3,33,70,108,210,125,119,202,251,202,202,83,198,23,162,72,72,239,85,247,147],[114,54,207,137,111,157,233,122,121,111,114,101,90,197,235,213,71,20,69,91,42,5,198,100,127,226,210,217,168,69,115,14]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(128, "\x19Ethereum Signed Message:\n32", [[43,187,122,25,127,36,95,209,3,176,83,200,156,101,44,79,226,190,92,132,96,181,74,187,196,214,244,106,213,159,158,244],[222,48,215,197,166,32,214,78,107,191,223,37,245,170,92,223,164,164,162,66,65,85,168,70,180,95,67,56,38,118,127,202],[191,129,140,229,186,155,76,155,95,214,205,46,209,182,193,209,157,91,21,41,12,204,91,141,51,11,98,250,109,94,87,191],[192,199,194,96,172,246,212,178,168,0,216,212,178,224,110,52,211,25,61,242,19,211,173,101,148,4,168,157,54,174,198,39]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("8dtf3p", [[0,193,132,166,159,119,158,17,41,141,60,178,177,85,230,120,119,236,67,85,60,146,225,59,186,29,168,101,22,113,119,151],[83,85,169,165,175,243,113,92,108,215,138,213,79,228,161,154,153,27,109,0,160,148,114,224,181,174,197,113,227,31,11,142],[171,101,127,93,182,208,235,88,231,119,190,240,151,49,111,255,178,184,48,160,239,90,80,15,252,110,212,51,146,249,105,51],[170,25,156,230,25,139,50,39,42,240,208,205,195,20,2,135,24,162,154,169,164,55,213,156,177,245,61,135,229,133,130,76]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("Transaction successfully verified.", [[198,136,160,178,238,86,21,134,80,72,221,155,27,99,65,143,39,166,4,217,146,1,3,127,13,49,198,76,57,247,193,102],[244,161,183,58,125,65,187,146,15,98,7,180,147,182,3,105,227,63,231,39,220,198,61,157,218,188,2,46,118,137,27,11],[3,186,165,182,234,236,208,253,51,193,60,239,139,7,151,15,68,133,45,59,15,40,101,45,132,70,110,114,49,224,92,230],[183,226,216,53,90,18,66,212,74,121,100,68,37,215,7,249,116,23,133,50,77,183,182,147,240,104,198,255,136,231,212,201],[186,251,68,145,168,46,230,251,14,14,71,20,109,179,86,237,1,246,174,255,161,252,208,128,222,81,179,239,158,63,183,210]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(87, "P", [[158,49,165,26,226,229,32,250,23,117,54,41,115,49,5,154,29,137,76,93,210,81,65,125,86,199,15,135,166,172,128,160],[178,174,150,225,249,10,49,9,56,240,163,139,211,56,44,135,13,101,134,164,39,152,137,122,27,61,43,8,54,46,152,69],[253,42,214,38,72,191,125,138,242,244,126,180,190,52,94,160,197,198,21,190,184,50,194,58,57,93,9,228,123,137,0,63],[180,213,192,165,83,50,44,116,130,175,32,234,187,7,63,245,122,194,163,104,14,68,247,25,145,126,223,8,120,164,63,66],[155,215,50,199,255,69,28,70,163,164,8,145,217,41,183,28,253,2,100,158,51,255,230,152,215,154,17,149,223,33,253,166]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(2014223714, "[", [[135,167,47,249,148,207,146,135,224,231,56,245,116,31,81,79,201,184,132,133,57,124,216,85,112,75,18,148,65,73,222,196],[130,10,241,205,221,49,188,139,92,182,5,41,8,174,109,166,141,166,220,232,182,87,67,1,114,47,101,40,139,81,180,148],[98,38,140,173,201,231,130,126,108,247,15,155,136,19,179,107,127,240,219,252,62,89,242,40,91,235,149,226,240,35,177,220],[125,23,93,206,2,46,210,233,68,4,93,8,91,43,76,191,20,169,250,248,175,143,128,49,73,160,64,176,175,214,238,104],[162,9,75,195,6,74,187,200,86,18,155,127,8,2,159,37,12,242,124,54,64,184,95,187,107,203,41,156,158,45,193,227]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("8dtf3p", [[160,89,36,188,220,44,166,124,1,228,131,24,196,234,13,146,125,116,205,202,200,116,222,81,109,52,81,166,236,81,164,70],[119,112,0,95,214,61,51,44,124,158,181,86,26,254,36,189,131,154,212,40,77,167,62,246,129,71,192,56,0,149,212,12],[227,216,148,95,9,80,89,164,197,40,240,230,16,128,173,125,163,140,240,176,249,37,87,25,124,202,236,173,113,38,254,222],[69,89,182,243,49,120,134,208,166,159,10,158,168,33,5,25,6,83,33,161,32,233,138,205,240,186,144,162,24,229,63,176],[217,187,59,81,179,200,53,23,117,188,138,149,89,220,79,100,88,164,103,100,175,158,35,16,41,95,24,254,176,116,25,67]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([1],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[9],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(47,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("r96mu8",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("\x19Ethereum Signed Message:\n32", "Capstones",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("Transaction successfully verified.", "ndpnxr",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("Capstones", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("em9vdj", "bv2do", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("ndpnxr", "\x19Ethereum Signed Message:\n32", "\x19Ethereum Signed Message:\n32", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("0", "bv2do", "0kfg6w", "\x19Ethereum Signed Message:\n32", "0kfg6w",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("Capstones",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Transaction successfully verified.", 54,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Transaction successfully verified.", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("L",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 200001,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("mu9pk5", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(25,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["[","Capstones","bv2do","0kfg6w","w0h1mp","r96mu8","kctc4h","Capstones"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[230,203,154,168,131,25,94,205,234,225,61,15,0,207,204,201,102,204,48,178,226,8,178,62,11,203,79,153,55,87,96,217]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(256, 2014223714, 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([32,87,29,102,232,41,166,26,170,133,79,32,161,16,33,93,128,65,173,116,122,129,88,216,152,149,120,183,65,187,36,17], [198,248,48,61,132,1,91,5,244,240,147,242,44,69,120,200,95,164,155,210,169,117,163,126,251,32,212,207,23,82,200,245],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([211,199,177,109,16,157,43,57,88,219,70,14,74,226,78,127,132,79,69,246,168,179,34,6,84,35,44,112,97,112,173,34], [178,73,99,10,107,54,209,110,135,2,95,24,184,166,219,252,105,161,126,52,125,156,196,160,240,205,3,189,116,224,188,175], [244,224,239,236,143,13,59,134,212,62,77,177,215,56,47,121,249,119,59,145,28,218,48,223,114,134,194,248,115,134,123,176],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([235,224,53,191,193,67,241,68,255,174,203,164,19,223,194,198,16,42,130,15,204,122,9,42,121,176,150,184,46,101,234,191], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([207,99,70,113,93,109,38,248,152,188,72,0,63,207,61,59,186,205,237,36,116,132,79,90,241,89,19,17,16,5,240,197], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([90,114,118,176,146,74,144,104,78,112,29,229,42,49,9,18,76,206,211,168,63,239,248,174,187,18,94,46,130,213,15,28], "mu9pk5", [177,57,140,126,168,99,64,109,248,64,199,146,137,13,137,53,163,83,97,55,98,64,150,151,131,12,225,213,99,135,11,122],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([186,133,171,130,0,172,152,50,246,59,209,252,189,214,81,255,37,56,197,63,236,68,52,89,186,54,38,140,98,125,43,31], "kctc4h", [254,172,23,18,227,26,181,229,130,9,184,138,202,188,214,202,159,148,221,180,112,103,61,229,40,168,16,43,61,201,21,100],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([192,229,147,227,194,111,160,226,210,212,98,4,98,40,138,35,64,105,8,124,120,226,87,179,84,64,244,107,143,233,173,82], [158,77,119,187,164,253,154,104,52,93,98,109,252,52,20,107,114,164,239,134,155,35,19,54,53,153,86,113,31,49,213,189], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([192,229,147,227,194,111,160,226,210,212,98,4,98,40,138,35,64,105,8,124,120,226,87,179,84,64,244,107,143,233,173,82], [133,130,36,27,115,130,14,107,31,131,194,2,244,130,100,3,255,70,21,205,4,40,212,100,203,124,59,239,59,217,65,61,180], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([64,181,185,234,34,218,95,35,253,77,150,251,122,106,13,98,237,32,28,171,154,105,45,85,129,252,213,213,56,92,3,151], [165,129,181,195,46,136,216,174,251,47,118,41,207,184,173,48,212,210,67,175,194,101,40,252,81,247,52,20,226,180,135,121], [191,168,250,47,188,24,5,31,131,7,64,132,82,144,206,19,244,251,8,52,86,37,23,173,179,230,163,86,165,206,80,57], "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([21,252,32,249,30,94,186,234,218,28,73,107,155,133,95,104,189,20,5,37,36,118,206,87,34,156,54,7,217,213,13,184], [13,73,105,74,160,236,51,229,146,207,228,24,182,9,185,238,246,199,115,85,187,21,254,136,227,125,233,255,33,77,222,206], [83,184,255,231,115,101,123,187,234,72,187,43,167,186,188,186,29,84,152,155,244,21,232,177,6,169,97,233,70,70,15,207], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([18,174,134,19,229,10,233,236,153,140,160,239,23,200,143,13,168,54,147,189,60,26,187,105,203,108,214,233,94,213,67,156], [124,218,153,167,239,124,74,243,143,187,72,130,112,19,178,113,130,166,2,137,249,118,204,224,203,88,2,236,114,32,85,107], [200,149,65,81,240,185,121,224,147,56,193,156,187,179,22,49,84,150,195,10,154,0,181,39,179,78,128,27,254,83,89,113], "w0h1mp",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([131,140,120,51,222,38,47,36,203,139,81,34,1,242,155,78,190,102,245,74,178,107,41,100,15,165,21,98,52,236,116,42], [58,117,69,24,196,98,97,15,230,212,1,55,17,178,12,20,172,4,243,7,239,230,82,53,194,130,222,3,182,229,130,136], [175,113,149,202,233,224,89,34,62,222,242,66,117,212,147,115,93,223,181,206,46,79,198,19,185,178,253,84,144,128,28,240], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([220,218,15,54,204,79,77,32,132,0,164,71,52,252,59,99,131,158,141,138,178,13,167,5,213,183,115,58,172,146,8,32], [144,59,212,127,51,104,109,118,98,82,52,217,89,192,251,17,221,71,125,64,189,92,106,193,51,113,0,27,70,15,26,109], [206,13,42,7,166,254,87,191,175,56,58,198,3,208,192,241,213,39,1,135,103,83,56,234,216,201,166,2,78,58,106,46], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([62,211,148,226,102,80,99,54,213,115,20,13,146,54,112,112,187,172,92,150,136,70,62,241,139,32,77,181,230,200,73,26], [37,25,128,46,76,20,88,12,95,35,209,169,152,232,183,203,250,240,149,221,166,109,180,240,34,156,116,108,187,227,26,195], [178,215,101,234,196,116,110,11,74,193,21,106,180,68,225,247,215,190,82,142,170,203,55,177,130,22,49,235,10,112,143,195], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([141,232,107,201,78,39,203,250,201,118,12,67,142,2,74,191,240,153,187,4,112,220,157,222,156,183,58,79,165,144,182,15], [29,86,155,147,106,204,73,7,29,171,218,233,45,78,69,127,199,23,211,222,106,25,122,9,121,29,11,52,3,187,61,170], [175,60,238,210,157,7,80,227,93,176,10,120,49,152,3,176,172,208,10,37,168,204,9,223,26,136,151,217,38,106,131,76], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([50,179,122,47,120,208,33,37,204,236,204,70,173,59,78,28,121,43,8,154,223,137,245,198,199,195,248,19,105,65,158,17], [27,144,226,72,86,98,21,148,74,36,167,30,251,161,82,239,232,233,113,66,109,255,23,177,179,104,232,79,135,200,183,49], [167,175,232,77,145,223,20,162,228,85,200,118,213,191,123,138,240,193,59,42,139,100,107,115,156,184,149,104,22,120,79,143], "8dtf3p",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([24,176,125,50,105,152,204,165,79,90,194,55,159,118,60,152,224,19,134,36,40,35,210,111,54,11,2,29,142,232,0,152], 95, 71, [232,248,188,214,222,48,215,69,69,45,162,33,215,15,248,130,29,99,163,157,138,4,95,194,137,5,227,10,129,222,92,87], 58,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([134,114,170,238,166,93,167,205,99,24,97,79,122,50,126,230,46,136,161,196,108,93,54,248,42,194,10,243,99,144,198,85], 66, [34,91,183,149,221,178,17,245,120,88,12,72,73,146,84,120,107,138,218,100,8,21,192,67,6,114,181,9,124,242,134,26], [212,154,15,232,98,172,218,187,91,219,174,55,106,235,98,200,127,59,3,152,199,240,59,26,60,68,104,179,6,4,205,253],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([218,156,22,220,136,89,158,131,175,211,54,128,202,185,79,4,8,3,218,103,59,12,241,20,135,73,210,31,20,160,123,234], [55,62,63,54,208,43,32,208,179,157,46,157,32,53,4,21,76,72,46,190,5,111,202,0,22,106],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([192,143,243,143,0,125,216,79,201,169,225,46,76,197,186,132,249,44,18,66,208,88,234,146,172,189,82,122,52,50,135,187], [148,225,119,145,47,3,138,156,129,4,227,177,77,211,119,64,87,7,247,192,14,15,237,80,3,175,69,212,128,76,198,147,187,225,72,129,7,32,112,195,143,112,134,46,107,77,231,142,197,85,23,138,245,8,80,145,192,183,35,136,101,162,107,15,212],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
