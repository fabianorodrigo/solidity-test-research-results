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
    contractERC721MintableComplete = await ERC721MintableComplete.new("ERC1820_ACCEPT_MAGIC","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("ERC1820_ACCEPT_MAGIC","[",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("0d7ifd","[","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("0d7ifd","[","[",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(28,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("P", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Capstones", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(25, "P", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1025, "[", "ERC1820_ACCEPT_MAGIC", 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("[", "0d7ifd", 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("0d7ifd", "0", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(1, "ERC1820_ACCEPT_MAGIC", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(1, "jxewn6", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Transaction successfully verified.", 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("vxuvzt", "pgu89g", "0d7ifd", 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Capstones", ["P","\x19Ethereum Signed Message:\n32","L","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(45, "Transaction successfully verified.", ["06ews","jgoxap","vxuvzt","pgu89g","L","ERC1820_ACCEPT_MAGIC","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(1, "\x19Ethereum Signed Message:\n32", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","["], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("0", ["Capstones","vxuvzt","jxewn6","0","0","06ews","0d7ifd","vxuvzt","vxuvzt"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("06ews", ["jgoxap"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(59, "pgu89g", ["jgoxap"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(129, "Capstones", ["P"], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("P", ["jxewn6"], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("7maqb", ["jgoxap","06ews"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(86, "0", ["7maqb","jgoxap"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(58, "L", ["vxuvzt","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Transaction successfully verified.", ["0d7ifd","vxuvzt"], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["jxewn6","7maqb","jxewn6"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(8, "vxuvzt", ["0d7ifd","0","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1025, "\x19Ethereum Signed Message:\n32", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC","Transaction successfully verified."], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("[", ["0","0d7ifd","Capstones"], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("06ews", ["[","P","7maqb","mkj5vr"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(22, "[", ["jgoxap","mkj5vr","0d7ifd","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(64, "zjjeks", ["vxuvzt","pgu89g","mkj5vr","jxewn6"], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("thmghb", ["Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","ke0g1b"], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("\x19Ethereum Signed Message:\n32", ["06ews","Capstones","vxuvzt","9s902","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(57, "zjjeks", ["0","xud68y","vxuvzt","mkj5vr","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(61, "jgoxap", ["9s902","vxuvzt","7maqb","jxewn6","thmghb"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("thmghb", ["\x19Ethereum Signed Message:\n32","xud68y","pgu89g","jxewn6","jxewn6"], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("Transaction successfully verified.", [[171,129,233,23,235,87,144,237,38,14,172,26,92,159,246,44,203,10,42,17,93,0,2,16,180,42,71,185,157,61,160,214],[61,156,8,152,91,31,215,39,206,114,37,40,0,160,104,54,4,147,60,39,221,102,181,74,16,133,32,13,26,63,24,201],[236,214,88,80,56,42,42,54,197,125,25,179,144,6,102,56,186,140,0,1,225,16,241,161,174,255,204,78,150,33,196,130],[184,233,244,162,37,225,255,92,47,188,231,245,0,39,148,220,3,246,118,133,57,218,111,113,131,199,168,43,124,129,12,0],[75,121,15,87,51,194,33,121,218,122,213,245,179,165,74,128,64,86,235,129,41,94,109,212,165,163,200,24,122,181,141,44],[228,246,79,62,165,31,32,52,26,132,60,218,40,252,186,201,180,214,94,51,170,117,80,243,144,100,77,59,173,78,67,187],[124,78,83,124,157,69,223,216,9,12,77,30,160,46,230,169,56,53,34,179,0,148,208,14,212,136,237,132,115,38,159,93]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(9, "0d7ifd", [[74,52,214,244,9,178,147,44,176,47,216,102,220,57,70,38,187,177,174,73,85,218,79,239,22,167,90,146,56,76,73,151],[216,49,84,177,214,237,26,8,156,186,20,111,93,53,22,111,24,53,117,25,178,157,72,175,94,167,235,121,69,193,87,144]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(95, "\x19Ethereum Signed Message:\n32", [[30,90,219,84,164,86,223,245,205,56,221,128,109,194,244,88,209,165,44,48,222,63,151,120,36,232,120,177,35,233,19,0],[170,114,4,119,191,231,75,94,39,53,154,133,195,70,237,27,208,226,43,184,148,187,141,43,56,19,169,27,51,156,164,213],[127,67,144,11,54,190,221,106,106,17,216,237,199,141,40,45,131,1,238,148,43,93,153,190,94,40,229,18,69,136,62,56],[223,110,2,138,223,14,241,151,40,166,36,155,125,80,202,172,203,168,151,216,253,21,150,4,21,254,18,234,192,217,29,234],[254,155,66,234,32,107,143,67,189,191,255,81,75,210,230,79,43,140,73,47,74,189,202,149,211,143,9,82,54,31,219,196]], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("P", [[25,66,74,6,60,106,49,236,59,190,98,17,82,236,15,131,52,243,27,254,56,53,113,71,165,80,156,141,205,126,97,142]], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("[", [[131,217,81,136,201,219,45,225,39,32,11,194,176,107,95,242,165,7,4,255,122,132,142,42,222,182,22,128,52,46,187,191]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(15, "Capstones", [[188,161,108,63,82,240,126,45,151,20,168,118,31,91,222,34,16,203,74,193,112,195,7,208,116,205,220,15,237,137,189,42]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(24, "jgoxap", [[147,43,29,193,104,184,131,254,50,197,83,189,58,191,89,15,56,223,143,141,66,125,212,89,25,105,27,30,103,128,64,47]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("mkj5vr", [[186,76,111,130,153,162,72,6,160,83,141,170,147,161,206,163,41,126,32,145,61,36,249,86,87,26,87,62,138,165,14,132]], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ke0g1b", [[90,85,31,127,146,52,253,79,211,208,134,117,51,23,144,164,20,222,195,93,54,254,103,174,191,208,217,65,66,176,214,74],[87,128,128,175,115,147,149,199,253,75,55,155,2,36,31,125,244,164,184,17,221,194,226,47,101,3,153,243,138,68,185,198]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(60, "xud68y", [[180,66,3,151,137,240,254,30,50,212,154,73,54,243,246,141,83,230,231,143,75,110,133,37,86,29,178,132,227,249,199,86],[149,21,47,234,163,48,43,119,100,106,162,150,195,185,39,11,160,50,116,56,56,13,230,4,243,14,113,44,221,110,69,231]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(31, "ke0g1b", [[86,94,138,240,197,77,237,214,198,139,176,207,105,103,237,27,104,76,180,87,72,101,212,137,49,70,185,230,197,1,253,215],[91,220,202,83,74,174,35,159,202,35,182,42,166,195,188,25,243,159,89,125,203,161,29,81,233,61,25,43,139,41,42,3]], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("mkj5vr", [[214,24,8,81,88,32,235,115,69,58,46,75,17,185,184,86,191,231,30,70,91,227,173,81,80,149,2,174,248,204,207,19],[17,195,14,49,102,148,143,199,1,93,109,127,167,245,229,127,186,78,16,233,167,51,17,17,135,197,13,9,218,201,84,127]], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("Capstones", [[33,30,172,76,239,160,183,68,216,69,198,149,244,16,218,86,195,6,58,229,223,211,86,136,242,176,235,97,104,192,164,152],[219,155,197,29,117,72,125,244,250,246,149,30,110,123,24,8,89,245,222,82,88,141,225,63,45,225,130,141,227,105,202,140],[227,214,16,105,206,197,109,80,138,220,5,146,145,222,247,150,140,141,73,197,146,144,7,221,130,87,6,217,177,222,199,92]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(96, "Transaction successfully verified.", [[169,194,190,177,63,166,42,103,34,23,129,135,35,47,96,77,240,93,251,63,150,206,240,197,247,52,61,92,10,232,16,25],[118,182,46,51,184,176,169,226,74,165,233,130,92,243,95,12,150,225,41,17,68,99,202,222,113,220,209,212,63,30,148,204],[193,87,65,41,245,183,92,173,204,217,99,96,117,210,129,183,199,24,78,246,137,66,70,152,234,188,223,2,156,124,113,86]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(8, "vxuvzt", [[50,242,54,234,213,88,232,37,155,152,102,44,49,105,87,164,60,112,253,38,126,45,83,241,10,199,50,169,74,153,219,61],[48,196,62,126,2,223,156,48,50,164,1,27,168,94,130,138,121,137,142,38,210,46,17,95,195,185,60,58,188,203,254,189],[243,176,190,170,237,140,98,103,134,113,90,20,26,202,151,158,147,61,180,228,15,137,53,252,84,120,210,242,14,212,101,243]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("9s902", [[235,36,249,39,49,196,117,244,127,101,98,11,236,20,205,238,113,76,79,41,69,51,0,160,63,105,202,151,41,43,78,28],[192,220,108,177,109,255,81,254,150,2,1,67,4,77,39,235,5,198,194,203,205,46,250,122,94,131,0,110,241,69,92,236],[237,86,152,121,43,188,157,84,26,97,238,182,82,151,185,149,33,54,227,9,131,101,70,95,128,152,133,48,250,33,233,205]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("Transaction successfully verified.", [[181,142,167,64,226,199,135,252,253,191,232,146,104,107,45,163,136,28,3,170,62,35,137,172,216,34,38,29,121,236,116,194],[205,99,192,155,32,115,182,15,104,163,43,144,116,201,97,180,108,51,137,139,170,191,99,149,114,251,242,63,51,220,20,47],[177,79,171,122,54,158,242,51,62,107,0,126,81,35,189,250,43,220,136,89,210,242,52,70,236,31,245,125,116,24,248,94],[9,143,108,222,185,239,12,110,247,229,175,53,37,107,158,39,254,69,216,165,202,40,182,17,127,199,205,121,44,219,165,59]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(9, "0d7ifd", [[229,210,38,190,215,191,28,93,50,105,215,156,191,169,70,120,218,95,203,17,208,101,75,108,99,225,189,194,19,197,213,132],[95,253,26,108,27,214,148,6,248,80,86,107,192,74,70,144,140,44,74,7,199,190,94,175,70,74,176,164,131,220,133,50],[219,168,192,192,185,245,153,129,130,144,240,174,158,107,70,9,97,35,170,87,66,70,139,99,96,31,39,135,82,102,182,28],[80,66,155,71,38,220,177,110,149,41,186,85,2,196,221,228,65,51,10,244,86,75,222,99,224,95,223,82,46,56,38,74]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(66, "thmghb", [[100,108,79,9,160,225,244,48,148,76,54,146,247,56,170,98,232,141,184,177,158,9,216,194,6,100,91,94,215,74,222,150],[189,200,242,104,173,185,143,228,119,88,153,44,18,0,237,151,71,134,233,178,45,96,179,197,195,90,38,224,36,153,171,144],[164,80,132,152,228,250,89,179,161,161,108,67,133,240,118,47,170,119,14,188,246,133,156,166,228,222,237,183,134,237,135,59],[219,230,25,101,151,93,10,152,98,207,228,32,121,37,47,193,222,132,24,247,120,61,23,114,171,102,20,113,213,56,193,86]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("zjjeks", [[193,165,42,176,50,219,224,208,223,111,243,125,101,62,97,136,156,208,91,23,241,1,178,207,21,32,105,187,13,154,41,173],[4,74,86,204,31,157,201,21,78,12,120,230,212,178,217,220,9,233,175,41,245,111,130,253,22,135,252,102,133,184,120,204],[59,249,99,186,124,4,220,29,217,75,162,88,62,75,87,149,232,200,14,178,189,145,233,13,217,31,60,67,95,235,78,46],[53,162,232,160,92,9,177,102,44,136,104,238,124,32,232,0,95,127,108,251,85,97,120,58,87,195,10,93,152,247,141,129]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("4d7kgg", [[230,93,89,173,31,58,92,3,242,12,6,172,241,179,242,72,13,22,23,204,173,206,193,10,246,149,159,135,111,89,225,57],[27,19,198,232,216,165,45,130,205,176,132,255,210,146,4,26,143,98,65,165,202,15,45,166,132,92,213,15,67,5,232,106],[102,234,144,34,117,236,73,102,205,47,20,152,198,218,201,87,92,188,161,200,114,156,60,237,142,90,33,208,143,84,185,36],[13,175,136,21,149,85,72,240,9,32,22,94,172,16,108,70,221,232,124,189,131,207,114,157,148,239,45,183,173,5,183,172],[110,193,131,54,221,180,231,159,79,250,14,229,206,240,173,106,85,231,211,243,51,146,98,7,194,30,238,68,249,148,26,172]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(31, "pgu89g", [[117,44,18,136,162,232,45,36,102,18,149,67,248,41,56,211,73,216,168,169,46,97,164,180,15,132,108,133,195,157,132,212],[57,238,223,109,120,93,115,88,101,198,41,168,179,139,236,208,218,148,33,36,216,132,141,39,13,64,243,35,110,20,59,128],[56,159,146,186,182,138,41,203,159,193,134,206,129,176,222,73,154,172,241,49,148,100,159,125,52,227,135,214,77,200,228,135],[83,12,25,100,64,242,23,169,26,90,89,66,85,213,205,26,80,46,212,138,83,5,117,79,9,31,11,144,23,22,34,159],[92,146,254,87,163,80,95,16,248,92,162,117,241,68,202,59,254,173,206,194,148,235,25,234,205,196,220,228,85,168,207,195]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(18, "9s902", [[188,214,126,69,214,29,128,168,219,117,106,100,172,65,110,107,2,82,212,112,107,36,251,87,85,110,229,232,156,232,103,54],[254,221,207,0,87,252,180,80,155,98,17,234,221,84,147,203,138,17,165,93,8,198,211,228,160,84,159,147,62,39,188,53],[115,67,186,177,144,128,193,220,7,38,190,34,67,78,109,113,78,55,41,249,125,145,145,235,114,111,167,18,182,107,4,0],[81,100,224,162,149,108,76,191,108,83,152,21,67,176,21,43,111,129,228,67,231,33,168,164,75,222,113,159,117,227,149,233],[6,205,244,208,211,65,249,72,234,36,73,37,201,52,184,77,22,30,100,4,191,239,135,138,1,76,75,13,140,228,27,137]], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("Transaction successfully verified.", [[254,73,116,206,229,70,34,194,8,82,88,207,189,162,103,196,25,156,117,85,158,33,97,219,251,31,251,124,210,112,249,81],[194,43,237,3,245,182,74,62,136,3,16,44,94,201,239,2,115,252,169,19,230,60,66,65,250,16,12,203,204,250,98,127],[176,248,26,132,110,173,14,212,185,81,145,168,178,174,108,60,39,135,251,123,150,226,94,251,71,249,228,76,198,233,49,109],[73,233,176,179,125,69,26,81,98,63,155,254,231,135,183,35,98,49,224,9,170,233,231,182,56,210,104,1,196,91,18,150],[215,229,179,188,238,246,27,92,152,249,0,135,155,155,172,21,119,177,213,59,158,60,71,4,164,189,195,110,93,172,159,1]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([52],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[4],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(63,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("thmghb",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("0", "9s902",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("06ews", "pgu89g",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("ke0g1b", "4d7kgg",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("[", "pgu89g", "vxuvzt",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("0", "pgu89g", "9s902", "06ews",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("9s902", "vxuvzt", "jxewn6", "Capstones", "9s902",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("jxewn6",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("9s902", 45,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("zjjeks", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("06ews",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("jxewn6", 1,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("06ews", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(200001,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["zjjeks","\x19Ethereum Signed Message:\n32","0"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[243,248,173,179,231,241,89,197,110,52,186,179,41,8,99,246,222,129,24,165,125,215,123,205,238,32,245,66,185,164,84,141]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(18, 54, 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([232,101,231,237,58,160,23,155,194,3,86,212,83,218,162,200,124,152,100,96,63,25,80,26,9,6,206,154,172,122,224,36], [144,50,133,56,169,121,141,211,213,45,211,129,231,211,197,226,198,50,203,97,145,238,73,67,102,100,133,236,193,16,229,57],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([247,72,183,230,145,153,221,229,78,46,162,40,35,68,190,26,144,205,238,29,127,205,86,131,95,175,2,222,108,212,203,221], [34,13,154,157,246,188,255,77,154,212,34,79,203,43,202,51,10,210,231,49,106,238,35,206,184,116,216,177,119,76,210,215], [16,53,6,114,5,118,90,50,103,132,166,153,241,46,170,65,72,125,151,238,3,7,125,0,235,36,227,82,67,136,200,46],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([94,39,13,66,139,231,81,1,255,40,239,77,159,30,16,68,111,173,227,102,114,239,206,170,50,86,6,134,221,40,140,104], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([236,46,144,63,69,17,73,18,189,101,233,228,153,130,81,171,56,64,6,129,190,166,3,99,194,139,27,78,206,28,56,87], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([226,75,175,125,226,43,198,41,235,70,160,50,15,38,160,243,192,225,239,97,181,233,139,218,204,40,61,213,225,32,86,251], "4d7kgg", [121,51,46,179,139,74,195,87,6,208,136,107,223,201,46,103,38,94,79,36,225,178,88,83,126,0,13,119,34,207,245,59],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([143,129,176,39,161,165,4,249,64,182,245,133,119,66,31,156,21,106,83,84,107,61,20,178,140,178,147,113,66,169,124,94], "Transaction successfully verified.", [254,149,60,230,22,241,253,59,65,130,60,90,10,151,128,149,184,247,139,68,24,2,173,58,187,167,113,29,219,6,138,158],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([124,142,17,130,215,203,32,20,78,161,251,46,116,176,47,78,31,178,175,225,161,130,124,5,57,22,44,7,250,95,179,119], [128,116,83,0,21,233,140,14,78,188,53,125,148,213,93,67,240,161,71,68,102,145,96,39,218,126,241,141,157,225,207,156], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([124,142,17,130,215,203,32,20,78,161,251,46,116,176,47,78,31,178,175,225,161,130,124,5,57,22,44,7,250,95,179,119], [206,247,184,44,54,196,106,201,120,236,189,193,1,148,233,250,157,57,121,120,174,46,165,241,179,159,242,47,15,156,104,101,174], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([156,86,228,146,182,66,240,33,116,169,242,187,103,144,195,129,9,150,207,205,30,205,164,194,168,255,192,243,4,112,206,113], [164,87,232,218,189,118,26,249,170,186,49,216,108,164,62,81,223,99,192,47,8,117,178,80,30,73,119,93,226,117,15,19], [131,247,108,98,28,112,197,162,31,55,32,215,153,92,218,99,1,59,204,44,115,150,254,169,10,125,199,240,112,226,108,126], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([247,162,245,152,23,158,127,180,38,120,132,209,16,179,28,158,210,176,222,34,96,186,169,143,248,36,72,216,220,203,86,89], [132,254,237,102,29,159,56,151,25,51,202,177,23,143,155,27,151,99,218,10,142,75,91,19,6,172,53,155,11,79,15,121], [152,177,10,117,91,232,0,228,65,100,23,81,119,223,52,99,211,54,107,163,210,199,65,105,13,39,115,163,28,150,178,7], "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([87,113,235,174,27,55,98,228,221,237,96,184,18,61,226,181,212,16,63,219,40,249,251,226,156,68,68,217,21,222,18,230], [102,68,172,70,182,45,93,160,113,132,77,58,231,130,166,0,176,92,94,10,25,94,197,56,77,79,109,175,197,218,77,45], [95,248,160,116,174,27,21,163,134,79,125,243,200,147,128,226,229,83,255,198,82,164,222,2,6,113,124,225,3,176,232,125], "zjjeks",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([68,80,204,156,126,240,69,133,233,108,88,127,246,238,212,204,239,213,228,207,39,180,44,133,50,60,126,102,101,246,186,13], [60,206,8,42,33,67,20,204,201,15,118,176,170,142,24,150,248,98,141,230,213,43,185,238,108,193,234,150,205,93,173,217], [12,20,218,207,206,79,97,79,137,218,28,13,224,187,140,173,11,96,4,60,71,108,88,0,71,41,18,48,207,24,102,75], "jxewn6",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([25,51,249,83,117,94,227,191,59,117,104,79,60,138,28,102,251,149,81,183,144,58,235,24,205,117,215,82,217,247,86,57], [107,60,231,56,73,209,236,96,11,59,54,15,192,55,86,87,244,59,241,150,184,237,34,26,46,185,58,45,15,170,212,23], [91,229,218,68,72,252,193,219,104,184,114,187,237,81,72,55,121,82,133,73,17,243,33,132,13,147,156,211,216,6,110,112], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([47,223,125,227,61,198,214,200,38,242,92,93,113,253,168,210,187,224,124,69,240,239,40,15,85,91,22,88,26,72,231,115], [248,74,39,191,79,27,156,144,236,30,191,229,53,90,185,91,1,21,132,154,17,137,8,248,10,68,201,74,56,162,118,147], [69,214,105,167,140,148,73,15,154,221,85,100,88,160,220,139,160,106,15,247,38,165,236,77,14,118,238,186,139,91,148,252], "dbtb6f",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([184,67,22,247,13,44,249,221,15,71,164,242,171,82,119,124,235,101,165,96,4,142,153,51,20,123,96,110,84,41,230,210], [215,200,134,148,208,177,245,164,206,148,140,210,185,211,119,117,93,166,171,185,186,118,212,233,175,201,69,81,70,137,102,100], [219,74,226,42,23,236,106,108,80,35,95,37,135,194,221,251,16,66,239,61,82,154,59,72,154,125,74,244,79,177,227,61], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([245,111,115,47,95,28,9,98,249,209,27,142,50,82,54,153,227,51,1,187,62,99,87,225,241,241,186,50,208,255,13,245], [114,101,187,141,220,195,167,207,209,113,114,77,103,73,127,237,232,228,149,197,238,48,235,184,141,207,243,202,41,84,83,85], [169,130,2,125,7,210,12,166,179,240,164,131,222,234,142,170,237,118,125,190,193,126,163,59,180,29,135,107,234,218,14,80], "Capstones",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([55,40,52,30,111,147,35,192,254,185,134,150,25,35,69,64,165,83,32,206,201,0,61,10,234,208,172,65,130,44,50,200], 29, 256, [66,30,202,203,58,195,59,5,6,10,216,12,244,171,34,119,229,225,26,242,170,193,50,141,208,238,113,137,156,125,159,234], 1,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([26,99,187,178,49,226,95,123,195,27,121,215,26,65,51,184,90,242,59,192,213,98,192,184,210,228,135,139,19,22,17,134], 86, [77,73,97,154,21,10,130,174,92,7,33,174,121,75,153,118,159,250,167,186,232,209,13,2,120,112,17,54,231,2,157,240], [58,56,92,60,137,211,92,161,16,133,238,172,165,185,184,165,64,61,161,202,194,202,19,181,209,225,184,63,90,34,84,99],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([45,10,145,114,80,143,89,96,42,91,52,237,116,251,197,51,96,223,205,148,236,62,124,171,173,130,148,43,187,194,13,32], [152,99,178,59,142,102,216,211,163,10,228,47,54,212,29,78,254,164,26,72,96,151,85,0,82,228,20,123,187,174,213,50,169,219,79,14,42,153,151,152,240,248,255,151,202,254,211,212,183,169,116,232,199,99,90,213,8,95,123,161],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([65,232,221,91,19,47,12,212,120,24,23,64,222,68,99,233,45,100,120,98,153,233,32,192,18,49,44,93,11,189,218,177], [50,50,77,58,35,200,242,214,62,74,224,176,198,37,16,103,75,245,101,169,5,140,207,219,193,162,83,212,128,187,169,121,182,242,111,196,27,107,161,6,211,59,128,151,131,100,181,210,101,132,221,1,23,208,176,71,226,5,245,200,198,209,226,254,35],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
