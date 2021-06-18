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
    contractERC721MintableComplete = await ERC721MintableComplete.new("L","\x19Ethereum Signed Message:\n32",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("L","\x19Ethereum Signed Message:\n32",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("P","\x19Ethereum Signed Message:\n32","dhfvts",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("P","\x19Ethereum Signed Message:\n32","dhfvts",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("64huaw",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("L", "0c3ilt",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(27, "Capstones", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(18, "Capstones", "Capstones", 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("64huaw", "0", 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("ERC1820_ACCEPT_MAGIC", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(8, "Capstones", "0", "2apd5h",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(2014223716, "\x19Ethereum Signed Message:\n32", "2apd5h", "Transaction successfully verified.", 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("6dbesi", "2apd5h", "oxcnb", 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("\x19Ethereum Signed Message:\n32", ["Capstones","64huaw","dhfvts","2apd5h","dhfvts","Transaction successfully verified.","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(254, "P", ["Transaction successfully verified.","64huaw","dhfvts","P","6dbesi","6dbesi","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Transaction successfully verified.","6dbesi"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(127, "\x19Ethereum Signed Message:\n32", ["0c3ilt","dhfvts","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","xz6f0g","xz6f0g","P","ERC1820_ACCEPT_MAGIC"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("\x19Ethereum Signed Message:\n32", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","dhfvts","0c3ilt","ERC1820_ACCEPT_MAGIC","Transaction successfully verified.","xz6f0g","0","Capstones"], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("[", ["L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(254, "\x19Ethereum Signed Message:\n32", ["6dbesi"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(26, "xz6f0g", ["Capstones"], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("\x19Ethereum Signed Message:\n32", ["oxcnb"], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("[", ["\x19Ethereum Signed Message:\n32","dhfvts"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(3, "xz6f0g", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","64huaw"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(3, "xz6f0g", ["64huaw","0c3ilt"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("xz6f0g", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0c3ilt"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("0c3ilt", ["6dbesi","dhfvts","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(56, "oxcnb", ["6dbesi","L","6dbesi"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(21, "L", ["6dbesi","dhfvts","dhfvts"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("0", ["xz6f0g","ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32"], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Transaction successfully verified.", ["dhfvts","oxcnb","dhfvts","2apd5h"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(45, "dhfvts", ["0","xz6f0g","0c3ilt","dhfvts"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(1, "64huaw", ["[","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","L"], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("xz6f0g", ["64huaw","P","0","\x19Ethereum Signed Message:\n32"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("L", ["oxcnb","L","64huaw","L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(1, "0", ["L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","0c3ilt","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(1024, "2apd5h", ["oxcnb","6dbesi","ERC1820_ACCEPT_MAGIC","Capstones","P"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("\x19Ethereum Signed Message:\n32", ["ERC1820_ACCEPT_MAGIC","0c3ilt","2apd5h","L","["], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("L", [[153,146,55,121,36,237,59,182,54,51,183,169,144,144,46,156,111,232,75,69,11,169,142,32,239,230,155,161,100,168,75,118],[31,70,188,156,228,79,205,135,196,190,12,68,58,6,26,149,179,139,194,124,199,128,200,220,71,130,27,123,176,98,128,96],[109,73,77,244,234,49,25,14,12,89,23,160,233,253,63,100,77,33,222,158,103,203,186,153,181,75,117,63,220,208,142,92],[32,249,179,127,47,102,115,132,160,204,127,241,20,24,208,200,125,179,254,248,178,48,148,253,225,183,239,165,1,20,100,99]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(69, "P", [[207,101,194,130,142,153,219,252,39,234,135,16,1,184,251,3,214,216,62,171,227,86,208,175,44,186,129,82,117,214,109,179]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(7, "6dbesi", [[245,143,0,35,103,167,235,74,57,131,6,18,112,231,58,143,155,228,21,165,109,144,37,135,90,150,226,144,224,135,206,199],[208,153,100,246,85,248,7,105,223,119,23,139,102,192,76,163,74,13,81,49,2,98,226,105,97,58,104,127,194,228,38,158],[171,204,254,250,23,36,173,138,5,234,63,168,190,145,251,6,68,136,66,204,75,191,143,44,66,148,133,133,128,53,17,78],[14,175,177,123,139,140,212,220,21,252,60,63,56,7,237,229,79,30,63,26,29,134,92,109,32,2,232,28,38,235,167,113],[165,5,180,93,26,41,33,120,203,253,130,150,155,89,71,29,141,72,0,50,209,55,159,118,18,219,166,63,59,86,181,105]], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("L", [[38,205,10,131,190,65,57,76,118,240,90,46,105,250,52,229,92,197,63,24,241,109,76,69,62,69,104,118,185,158,126,94],[97,146,50,255,246,97,4,168,255,191,90,246,41,7,181,184,108,215,52,76,88,153,202,192,220,229,61,218,56,95,14,147],[26,232,167,96,14,125,241,178,74,10,195,237,252,131,107,128,92,151,30,168,28,126,152,24,240,63,113,179,131,213,26,192],[225,26,113,117,45,111,178,227,17,227,210,25,234,133,118,202,160,190,154,127,152,139,150,186,92,191,99,165,54,50,12,1],[9,82,45,54,56,255,141,68,158,254,91,224,149,145,7,210,168,169,175,89,21,239,197,226,231,178,151,101,228,191,154,87],[144,71,187,228,32,18,200,74,203,68,134,254,98,138,46,179,75,71,189,19,206,208,216,244,202,84,11,6,82,46,133,203],[168,30,22,163,83,116,30,183,162,174,9,116,88,187,20,149,96,251,6,103,92,35,233,149,159,80,228,152,138,147,28,100],[85,109,188,227,168,146,86,236,82,145,19,65,215,199,202,234,55,38,9,74,48,156,76,250,145,39,248,93,51,172,7,38]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("dhfvts", [[77,57,47,154,47,224,222,53,61,248,171,139,70,146,226,211,111,80,170,6,16,126,33,74,79,76,209,183,27,212,107,115]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(1532892062, "0", [[222,242,25,77,71,6,94,129,166,49,22,186,122,7,10,49,204,174,148,26,247,68,201,21,156,10,56,124,53,73,201,31]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(30, "6dbesi", [[201,177,18,16,72,144,219,231,13,121,175,234,172,139,59,248,162,67,209,8,8,145,177,128,233,173,66,142,142,3,73,201]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("0", [[98,47,125,209,21,78,124,129,29,132,186,2,131,9,236,162,181,240,96,18,138,177,193,83,98,254,119,17,139,202,208,187]], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("P", [[10,140,49,193,128,7,135,192,100,106,30,90,24,27,44,238,185,60,191,114,146,207,240,242,237,231,15,163,30,252,121,173],[161,147,200,34,158,152,88,209,18,233,25,217,192,191,67,105,192,61,88,77,120,75,117,54,44,198,139,243,106,185,42,75]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(31, "dhfvts", [[21,244,23,28,212,24,163,252,134,167,154,60,153,24,233,195,20,73,141,88,105,237,73,99,162,174,225,14,124,131,145,31],[236,235,32,81,225,98,176,252,72,213,100,233,105,60,239,247,94,102,49,250,244,244,237,32,96,249,34,167,105,244,4,35]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(27, "0", [[85,149,102,64,10,92,86,21,128,102,216,159,105,60,10,49,200,128,172,35,228,49,233,187,64,99,6,10,187,80,87,219],[177,79,67,220,50,167,103,188,12,47,58,110,174,214,46,180,83,228,179,7,228,163,167,247,240,31,139,28,99,210,116,24]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("0c3ilt", [[23,19,244,225,40,212,192,32,183,165,254,142,210,222,236,88,200,187,9,77,180,220,28,172,14,107,179,51,11,169,174,24],[41,250,153,210,35,121,68,101,16,127,1,18,183,19,234,14,132,48,111,195,141,239,5,218,146,34,106,245,13,175,166,93]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("6dbesi", [[121,57,162,113,155,104,146,250,27,188,135,94,184,249,248,242,202,93,164,120,211,226,170,219,164,85,244,7,180,119,88,37],[169,238,220,22,108,153,126,246,43,86,136,157,159,188,244,54,196,20,234,190,215,217,32,220,27,162,76,113,199,192,236,58],[41,13,238,221,1,204,62,180,114,178,208,73,14,145,47,143,230,245,165,149,63,56,43,52,148,8,104,248,124,175,162,72]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(6, "jkwf5p", [[228,23,50,6,41,136,80,223,16,133,40,143,10,163,32,165,183,203,158,250,104,173,188,79,27,84,93,9,5,195,105,222],[83,82,58,111,199,106,220,197,200,181,111,20,20,92,210,45,200,129,30,65,215,150,133,234,61,32,206,75,179,68,49,49],[45,74,2,217,2,54,194,54,248,41,144,229,236,10,102,204,90,158,146,192,106,146,85,193,6,119,169,182,141,186,102,35]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(10, "Transaction successfully verified.", [[121,79,125,179,160,194,141,170,62,141,74,95,82,80,232,196,75,66,87,60,132,106,138,197,200,163,96,4,134,75,9,147],[182,88,238,224,219,163,249,88,135,186,40,14,146,119,94,126,86,188,62,200,192,18,36,108,148,187,37,232,31,104,83,253],[13,98,47,61,70,97,4,21,163,77,188,42,224,166,57,171,240,70,122,101,27,224,208,42,230,214,131,231,243,213,69,206]], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("oxcnb", [[226,176,2,165,113,119,0,145,11,54,23,26,146,71,151,91,36,93,125,247,254,238,13,204,104,132,108,77,58,178,224,1],[202,111,185,63,57,42,178,134,232,167,150,209,212,76,208,180,8,83,105,173,109,92,244,84,236,68,77,76,193,90,63,255],[224,114,74,234,97,90,173,64,84,217,73,127,229,230,173,53,188,164,241,132,182,46,176,96,169,244,226,169,94,54,197,187]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("\x19Ethereum Signed Message:\n32", [[218,209,179,14,90,114,180,252,168,156,9,58,20,229,201,132,86,41,194,77,218,243,110,67,191,242,167,73,76,219,106,75],[92,44,196,34,156,85,175,141,223,4,163,127,88,239,242,115,104,208,30,146,77,220,131,182,27,7,206,232,145,27,97,207],[59,82,247,103,37,202,227,185,95,44,59,145,170,199,15,119,216,195,48,186,207,54,228,48,170,109,139,43,110,120,112,77],[68,139,135,126,52,68,56,45,134,122,88,105,165,179,188,83,105,209,148,149,91,56,86,62,57,5,7,244,168,126,169,96]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(1024, "P", [[205,151,104,244,122,101,177,139,166,166,17,244,11,37,250,31,105,237,63,15,165,67,155,235,27,19,209,171,20,12,247,35],[127,74,192,208,85,75,118,43,162,221,107,250,220,231,43,44,120,204,3,208,127,104,143,67,211,73,52,170,150,130,43,117],[87,72,218,157,29,117,227,38,138,103,60,247,25,249,116,129,197,94,209,191,147,197,130,200,211,111,109,127,33,111,45,15],[194,186,188,65,68,244,203,49,112,48,119,18,244,121,173,164,84,145,69,96,246,148,51,186,165,21,219,196,39,27,103,114]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(15, "oxcnb", [[110,8,253,94,73,170,94,45,137,31,10,211,112,12,212,178,148,180,51,206,3,190,184,10,52,231,142,87,90,94,208,215],[25,62,62,206,130,137,246,78,14,223,114,192,13,146,92,189,248,215,59,136,67,209,227,43,48,130,172,179,176,109,131,173],[151,8,238,205,50,174,174,79,20,94,185,54,238,227,187,251,207,57,15,2,195,148,34,26,220,194,133,21,45,193,166,13],[34,77,168,108,53,123,43,164,210,79,233,203,37,41,233,120,152,116,23,113,170,211,6,1,245,187,53,191,69,231,94,7]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("64huaw", [[32,68,64,200,201,226,131,30,86,151,73,155,33,210,80,24,117,227,125,61,236,130,9,149,11,53,110,85,49,49,139,135],[139,158,254,23,138,93,100,176,204,54,208,134,76,131,45,55,167,83,22,155,30,142,127,35,195,227,174,239,114,238,197,20],[184,142,152,130,31,151,66,204,199,7,150,160,36,227,16,218,75,177,12,133,0,175,138,162,31,58,254,247,74,242,171,140],[124,82,210,71,60,102,39,162,138,16,214,115,111,173,196,172,120,90,0,18,28,71,50,82,90,218,1,144,82,35,228,159]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("0c3ilt", [[149,244,89,128,78,176,163,12,14,84,46,34,102,241,139,228,119,10,163,57,104,164,15,240,158,225,58,193,20,141,47,71],[129,139,221,79,137,112,229,158,26,11,35,58,37,51,13,57,70,111,58,217,244,162,204,239,142,129,141,158,236,115,251,233],[253,24,15,137,157,67,204,27,58,81,103,217,9,80,141,229,66,54,189,188,173,67,253,190,189,11,96,161,220,52,58,229],[230,103,105,82,138,163,75,252,137,116,253,86,244,208,125,175,37,4,14,137,44,178,180,156,140,80,177,248,68,115,207,114],[118,216,141,201,26,148,81,62,165,75,1,43,87,65,17,41,0,180,217,24,176,198,12,231,166,47,247,21,73,44,2,220]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(61, "bk2jp", [[150,100,109,106,89,118,236,83,42,212,146,46,125,142,137,95,103,161,107,18,81,11,97,230,150,29,99,194,110,223,126,52],[89,175,57,196,78,9,82,106,247,183,215,215,44,101,125,214,88,68,84,87,130,83,73,18,220,217,113,202,61,100,157,51],[34,255,146,182,188,151,122,174,195,212,69,13,240,33,194,249,166,181,240,233,219,211,172,166,214,19,121,117,112,158,135,138],[209,128,229,84,94,49,116,171,104,123,111,128,58,203,119,69,202,92,122,23,66,239,200,137,38,180,155,15,248,6,100,10],[26,13,234,15,82,139,249,25,12,206,254,209,57,36,146,8,238,143,108,45,116,100,44,224,210,82,253,209,71,137,123,80]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(32, "ERC1820_ACCEPT_MAGIC", [[228,80,134,166,195,196,39,127,209,139,186,93,166,28,8,104,205,250,239,232,20,108,46,89,152,232,113,25,31,51,114,86],[241,22,199,131,91,155,155,13,107,77,184,216,67,119,41,123,199,242,184,87,52,68,26,182,229,105,135,32,174,48,146,108],[111,239,231,14,19,47,242,215,140,175,200,254,52,93,77,130,59,47,222,83,128,65,131,220,191,121,93,230,115,244,168,201],[85,174,20,94,1,2,221,43,90,79,19,182,235,211,24,83,160,172,236,84,34,62,15,60,156,18,2,241,12,200,185,135],[185,3,5,196,206,30,105,91,163,197,212,17,249,12,234,54,254,128,118,247,228,36,0,170,6,166,49,147,239,15,42,34]], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("L", [[173,227,229,64,152,252,79,174,69,139,116,61,208,14,221,109,17,104,233,165,122,72,56,211,21,127,216,133,40,11,133,133],[213,79,199,159,211,52,204,146,230,254,135,77,60,171,104,44,72,34,13,10,211,94,130,224,151,140,146,138,8,254,21,176],[171,251,219,190,27,67,215,230,24,236,23,111,4,164,12,211,86,223,95,49,73,13,161,236,249,16,8,100,122,233,117,78],[222,162,233,186,250,161,70,182,39,199,96,236,103,249,20,127,245,22,94,219,15,197,186,249,136,245,181,177,239,86,146,226],[252,115,169,102,242,76,221,157,252,128,216,109,138,5,35,68,235,151,30,47,6,34,206,52,4,72,144,243,71,174,106,227]], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([40],{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testparseAddr("P",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("jkwf5p", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("Capstones", "dhfvts",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("P", "Capstones",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("dhfvts", "oxcnb", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("\x19Ethereum Signed Message:\n32", "bk2jp", "6dbesi", "0c3ilt",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("\x19Ethereum Signed Message:\n32", "Capstones", "0c3ilt", "Transaction successfully verified.", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("0",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("dhfvts", 45,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("64huaw", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("0", 162,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("6dbesi", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(254,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["\x19Ethereum Signed Message:\n32","L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","oxcnb","xz6f0g","L","L","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[12,109,145,205,99,150,190,57,189,221,35,27,139,81,215,203,61,84,111,148,186,66,111,215,95,99,10,123,72,51,53,30],[159,198,167,167,102,166,6,103,235,219,16,197,240,7,17,14,168,153,86,113,191,106,148,63,179,180,65,225,42,0,16,34],[212,94,179,214,229,22,22,207,102,163,7,147,36,134,98,6,242,109,147,246,243,34,155,249,250,60,45,5,217,67,191,15],[129,73,106,179,232,234,194,6,169,78,196,224,96,129,76,240,118,69,143,73,167,240,122,16,7,173,144,141,138,106,174,48],[17,172,22,96,248,74,13,127,184,154,176,254,220,230,105,108,57,210,218,176,88,255,188,246,242,8,113,243,51,75,158,242],[142,206,191,223,104,32,243,21,127,115,221,61,16,227,33,205,77,78,219,123,194,198,38,101,179,146,1,59,157,120,91,229],[104,151,225,221,0,40,78,139,30,231,254,65,47,164,81,125,105,84,12,186,98,76,20,232,176,73,120,140,231,13,63,246],[49,235,178,159,107,212,104,148,181,64,229,18,87,44,102,188,128,7,160,19,4,70,212,248,71,34,225,175,76,138,173,199]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(60, 1, 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([115,103,192,195,39,178,1,163,163,155,92,20,90,130,18,144,111,246,74,239,101,130,68,53,29,87,96,35,124,119,51,15], [195,78,149,183,237,126,216,63,100,231,171,59,231,216,97,188,104,159,87,211,0,180,214,199,9,233,193,148,39,222,172,210],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([128,14,33,57,54,107,205,201,111,142,245,126,126,27,200,64,101,115,85,70,162,173,75,181,76,249,164,111,2,183,133,74], [46,237,148,29,84,8,1,123,57,243,184,136,78,23,1,21,54,235,252,26,65,26,201,19,110,239,45,45,55,134,151,242], [113,143,51,57,181,125,20,99,134,108,152,34,73,127,27,221,199,199,143,190,131,114,106,59,92,63,207,191,82,219,32,247],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([4,199,58,78,58,73,194,214,15,90,147,193,35,71,77,200,245,54,247,123,167,235,9,101,16,134,50,205,31,42,34,16], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([187,178,41,132,2,80,112,234,55,28,202,32,137,102,105,87,83,224,95,72,213,96,176,84,211,44,243,222,188,86,130,131], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([186,131,134,84,67,61,196,24,64,146,0,8,208,208,76,252,24,45,187,225,138,209,69,179,211,133,240,156,40,164,63,59], "ERC1820_ACCEPT_MAGIC", [178,182,168,47,42,244,207,186,94,183,22,112,214,122,50,220,65,172,229,152,163,185,26,19,171,189,132,179,119,117,174,244],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([185,195,189,183,236,142,138,175,89,1,114,33,127,107,138,166,127,112,158,218,53,53,149,44,19,50,40,73,177,124,6,252], "\x19Ethereum Signed Message:\n32", [189,16,5,182,227,208,110,60,14,116,45,216,44,81,136,69,177,143,121,155,193,90,240,214,171,83,5,102,54,149,167,2],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([86,149,36,106,156,61,2,68,232,9,98,150,240,84,144,12,224,29,227,88,249,52,89,226,224,197,109,175,108,42,203,218], [50,250,205,39,47,163,152,197,129,75,31,232,195,162,214,159,67,171,144,23,184,39,186,84,120,163,13,204,108,118,85,158], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([86,149,36,106,156,61,2,68,232,9,98,150,240,84,144,12,224,29,227,88,249,52,89,226,224,197,109,175,108,42,203,218], [181,3,252,36,182,64,141,99,115,41,250,174,191,8,176,99,126,12,190,138,188,164,47,77,252,78,250,134,221,89,113,167,28], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([101,206,243,72,54,219,80,136,53,253,151,11,234,0,68,87,172,102,27,114,244,16,93,208,148,47,248,199,29,22,82,232], [117,191,154,232,27,2,83,69,134,4,84,33,14,251,239,214,234,23,188,208,22,144,252,192,187,119,193,47,74,160,77,169], [60,55,34,15,164,3,112,3,21,125,231,74,158,121,249,95,189,129,104,228,153,239,29,165,159,73,63,49,231,58,21,43], "jkwf5p",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([65,223,187,69,132,97,252,52,249,40,155,82,165,254,7,14,255,240,72,197,69,64,186,32,34,129,220,63,38,56,60,161], [101,62,102,11,187,19,157,28,227,209,79,118,78,197,46,186,241,233,73,129,63,135,108,237,241,209,76,249,87,24,158,150], [28,43,164,47,25,198,232,238,136,228,79,38,125,86,73,48,59,160,163,7,133,225,80,98,8,14,145,236,81,213,141,97], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([90,217,97,200,60,16,151,176,219,17,62,233,157,161,40,75,159,239,49,211,34,115,217,153,131,152,19,162,75,125,78,177], [181,112,10,137,151,25,29,88,29,201,165,129,222,105,142,213,241,60,199,71,201,54,103,62,185,26,106,125,95,30,242,217], [196,165,143,190,137,117,125,219,18,15,179,206,190,130,112,127,20,85,186,53,148,187,199,69,15,106,5,231,117,217,190,163], "saj9a7",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([208,228,70,110,81,203,113,209,68,159,147,41,124,9,242,40,46,26,40,144,129,40,11,207,231,238,142,159,153,32,111,81], [255,51,31,123,236,49,96,171,30,59,0,181,38,148,74,39,109,231,161,193,70,211,221,29,120,45,171,220,216,38,56,209], [40,17,99,97,120,193,31,193,252,99,33,214,237,207,73,130,179,192,109,226,45,236,237,132,77,163,33,147,27,158,125,63], "saj9a7",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([216,148,23,193,40,205,137,242,126,219,71,33,4,184,41,215,147,145,33,241,233,209,164,18,172,100,159,203,56,45,148,19], [10,47,133,27,106,181,10,211,64,135,87,93,162,79,176,102,116,206,148,72,22,90,56,183,205,83,116,178,55,43,236,147], [22,168,88,74,165,137,174,51,16,61,79,156,58,143,226,96,118,9,83,48,188,137,174,52,73,138,47,50,44,1,156,234], "oxcnb",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([141,224,138,250,139,7,223,120,102,232,234,205,137,224,26,236,216,240,69,214,10,189,195,253,107,91,65,64,170,47,69,114], [131,142,135,186,136,76,35,56,111,1,243,97,20,168,139,195,7,6,198,148,38,214,203,173,1,56,213,12,100,204,107,171], [144,11,114,193,245,230,4,168,61,148,189,64,138,245,80,186,82,152,191,156,88,101,158,183,34,150,0,112,206,254,129,247], "8d7gda",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([5,253,43,75,62,97,234,44,94,123,192,226,89,248,61,187,67,13,74,87,43,21,192,13,197,151,23,48,247,105,66,126], [244,179,117,230,43,30,219,23,247,21,224,47,151,239,177,244,73,196,183,179,203,240,197,129,110,69,217,194,194,27,30,116], [143,152,87,72,25,127,225,220,143,46,182,15,134,250,163,228,88,59,78,194,40,87,234,240,183,200,154,252,110,40,75,115], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([116,173,33,88,5,79,96,186,86,238,135,119,220,236,72,86,214,100,69,61,6,56,91,119,8,59,85,186,36,155,140,86], [101,179,237,148,201,16,62,143,216,110,183,224,122,128,231,25,156,9,7,255,74,126,74,107,230,172,70,53,226,10,144,118], [86,195,6,88,121,52,224,30,73,43,195,227,11,54,80,197,210,182,149,233,39,137,248,17,205,160,167,234,242,106,61,146], "jkwf5p",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([43,157,75,129,238,214,158,218,16,227,223,255,217,37,152,70,251,29,241,119,81,235,128,85,77,115,106,81,49,253,247,144], 49, 24, [137,42,171,82,124,203,133,135,142,195,33,46,1,177,145,225,147,53,252,145,122,230,22,240,223,79,74,130,210,177,115,35], 61,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([161,197,198,182,238,130,167,109,203,152,98,133,25,57,141,94,34,203,68,123,210,199,99,78,91,98,61,187,197,91,221,176], 56, [150,115,95,155,165,85,144,104,148,131,207,223,67,106,101,95,243,44,106,216,112,25,138,38,27,108,36,40,251,216,144,124], [178,59,212,108,235,113,66,127,172,251,2,179,172,60,102,127,5,230,71,213,65,242,229,66,236,87,117,81,94,174,25,187],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([34,161,133,29,113,62,63,152,52,152,122,196,13,130,48,138,250,101,144,153,98,71,211,120,90,137,69,132,90,18,102,111], [51,83,200,51,244,88,181,9,195,190,74,123,183,116,77,53,248,20,51,245,255,183],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([0,146,59,22,57,229,63,254,76,171,254,113,49,232,251,98,165,207,108,82,118,82,98,220,166,89,65,93,75,43,1,206], [117,64,155,249,35,0,127,192,21,50,17,85,149,249,159,11,147,22,40,89,76,223,249,110,79,77,184,207,254,47,92,116,124,42,82,205,155,139,9,14,134,51,39,113,28,176,32,160,214,151,183,149,242,119,137,72,109,61,158,235,179,12,235,106,254],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
