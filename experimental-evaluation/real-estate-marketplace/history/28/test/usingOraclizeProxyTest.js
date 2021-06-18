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
    contractERC721MintableComplete = await ERC721MintableComplete.new("ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC","Capstones",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC","Capstones",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(88,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("P",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Transaction successfully verified.", 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("0", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(31, "wm3a0b", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(15, "[", "u35v7l", 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("L", "Capstones", 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("[", "ERC1820_ACCEPT_MAGIC", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(161, "ERC1820_ACCEPT_MAGIC", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(96, "0", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "wm3a0b", 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("\x19Ethereum Signed Message:\n32", "Transaction successfully verified.", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("wm3a0b", ["0","[","P","[","0","\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1024, "Capstones", ["lm7bes"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(2014223716, "[", ["0"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("ERC1820_ACCEPT_MAGIC", ["Transaction successfully verified.","u35v7l","0","u35v7l","0"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("ERC1820_ACCEPT_MAGIC", ["["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(200000, "[", ["Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(5, "ERC1820_ACCEPT_MAGIC", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("P", ["lm7bes"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("lm7bes", ["[","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(98, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["wm3a0b","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(98, "Transaction successfully verified.", ["wm3a0b","\x19Ethereum Signed Message:\n32"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["P","Transaction successfully verified."], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("0", ["u35v7l","lm7bes","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(0, "L", ["L","P","lm7bes"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(254, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["Transaction successfully verified.","wm3a0b","u35v7l"], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("u35v7l", ["Capstones","u35v7l","0"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("P", ["Transaction successfully verified.","1nba0s","L","lmtyb"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(71, "u35v7l", ["[","ERC1820_ACCEPT_MAGIC","Transaction successfully verified.","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(63, "Transaction successfully verified.", ["P","lm7bes","lmtyb","["], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("L", ["lm7bes","[","Capstones","0"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("Capstones", ["L","u35v7l","[","lm7bes","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(2, "Transaction successfully verified.", ["L","lm7bes","[","lmtyb","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(254, "g68o5g", ["L","wm3a0b","P","[","u35v7l"], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("L", ["g68o5g","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","Transaction successfully verified.","u35v7l"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("u4185e", [[98,29,218,199,116,191,30,43,214,255,173,110,252,221,186,228,196,33,247,167,17,129,212,231,28,53,43,87,36,168,2,138]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(61, "u4185e", [[89,199,160,227,93,176,135,188,22,227,246,250,11,48,166,106,184,196,21,3,116,166,51,194,164,147,65,90,15,205,139,152],[213,97,136,200,91,78,60,224,74,141,124,133,103,76,178,160,50,26,131,208,204,191,56,54,61,148,209,73,244,89,245,74],[155,157,235,107,112,76,60,80,142,12,96,198,208,253,37,7,167,182,0,11,162,3,51,65,139,213,79,255,138,133,114,0],[241,39,27,188,131,243,255,137,15,7,220,153,56,255,234,191,195,111,96,90,32,132,49,139,120,141,77,188,45,251,26,117],[147,173,100,103,55,97,89,140,66,28,136,8,45,98,97,215,186,53,223,148,148,166,23,194,149,97,137,43,73,87,44,22],[18,151,247,56,237,121,11,34,58,45,82,168,157,135,197,20,140,174,46,130,216,78,109,132,15,158,12,123,198,167,55,104],[183,29,59,47,92,71,153,163,121,210,112,128,147,55,226,240,21,216,42,124,13,107,125,227,240,193,58,59,158,192,249,47],[73,199,129,108,43,231,40,54,233,246,39,34,120,168,227,239,170,166,100,188,233,118,29,238,35,15,54,111,57,41,88,105],[226,172,12,24,79,214,16,145,190,158,57,117,193,160,172,9,57,26,225,33,217,72,97,106,191,187,185,232,128,62,33,5],[141,149,248,132,138,12,245,3,173,135,82,22,134,69,176,115,197,59,153,250,38,12,201,199,225,46,105,52,229,211,90,14]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(88, "0", [[175,247,89,2,41,86,50,66,74,180,130,145,86,238,171,109,251,192,210,197,110,16,196,64,166,29,93,39,123,156,138,130]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("1nba0s", [[37,197,128,199,154,29,26,221,192,71,232,243,60,229,28,141,163,51,247,120,68,65,248,96,233,175,245,24,28,141,78,227],[98,235,138,7,175,4,74,31,26,28,169,212,191,129,250,131,184,127,0,199,233,249,70,216,193,161,136,206,195,179,221,51],[4,179,57,69,94,85,116,59,43,124,246,45,156,111,119,116,161,36,46,6,183,198,61,211,54,169,63,245,252,22,30,221],[234,205,70,129,121,208,251,83,80,69,222,130,170,143,100,135,255,249,143,168,208,243,22,99,150,243,55,31,32,142,67,215],[76,186,169,253,57,142,10,123,115,58,47,214,96,229,147,213,87,236,191,50,47,15,118,139,101,124,218,46,111,158,99,136],[108,121,48,70,197,223,36,26,58,186,13,59,123,14,60,171,181,194,41,82,148,200,14,116,156,132,193,146,87,111,113,71],[162,94,255,18,88,219,200,32,166,201,170,110,10,149,17,253,9,151,4,57,206,67,253,228,233,25,61,80,215,136,62,117],[71,125,176,32,72,100,127,127,211,179,144,86,218,248,220,151,14,83,234,0,1,168,192,51,250,125,165,111,13,24,186,228],[47,113,170,62,165,169,210,119,159,253,112,14,35,121,98,10,122,58,198,138,117,240,111,96,115,59,175,238,207,28,60,210]], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("on5thc", [[93,131,255,112,209,252,19,154,148,75,24,33,115,213,11,211,118,248,9,215,68,64,134,223,128,218,241,178,47,67,108,146]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(19, "Capstones", [[224,9,83,88,251,222,72,189,138,112,155,33,32,47,99,207,243,155,185,127,178,135,112,165,188,188,192,236,5,4,128,121]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(33, "[", [[13,82,166,64,222,89,194,5,47,78,147,145,78,183,244,85,69,227,101,111,57,255,235,142,162,244,14,0,118,205,179,146]], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("u4185e", [[30,77,165,124,234,183,152,122,53,109,254,86,38,241,176,58,239,49,207,47,120,190,99,20,234,120,38,218,157,133,133,5]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("Capstones", [[171,198,191,242,19,65,102,220,62,28,34,151,41,27,77,252,239,92,32,194,174,243,87,161,52,1,23,177,248,17,55,105],[246,48,72,248,141,74,190,219,69,20,43,42,90,116,208,218,197,13,249,81,59,74,67,65,134,129,160,94,8,8,222,17]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(1, "P", [[70,214,46,193,39,23,122,79,162,180,94,155,171,89,98,63,43,148,156,187,109,237,67,38,73,167,109,61,75,247,173,170],[237,210,13,170,225,57,90,33,36,121,205,158,52,218,20,227,58,118,85,69,127,188,171,136,91,144,230,83,144,59,254,153]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(5, "Transaction successfully verified.", [[130,52,154,57,41,236,218,144,251,37,72,227,112,3,52,30,75,220,14,59,1,195,83,119,183,5,73,46,172,5,95,247],[86,235,123,38,235,196,140,237,125,203,68,233,173,154,27,242,11,187,28,231,14,48,184,12,244,36,30,80,48,200,156,49]], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("wm3a0b", [[137,53,228,231,165,35,217,217,163,205,126,93,245,146,25,18,132,107,253,19,118,181,68,167,73,77,138,42,238,91,8,89],[133,75,243,196,49,146,70,69,31,21,117,206,187,105,172,67,152,99,178,224,218,91,93,230,147,150,134,72,96,24,4,213]], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("u4185e", [[178,32,142,35,30,116,81,88,66,65,150,229,5,138,110,159,87,243,27,200,31,110,19,229,246,56,18,8,115,39,189,226],[202,93,50,228,203,238,200,38,27,8,67,120,190,42,249,62,67,109,84,79,234,85,216,163,177,1,113,254,222,136,176,19],[252,177,151,145,126,91,138,139,65,4,195,187,192,120,103,106,155,107,108,84,37,5,15,28,32,243,192,153,165,107,72,164]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(0, "e88yy", [[95,80,106,233,80,72,131,75,3,62,179,73,101,59,11,223,43,104,68,56,41,116,36,63,137,143,131,40,48,79,218,145],[105,251,71,109,181,84,62,123,116,20,221,162,16,7,161,200,117,202,98,155,222,84,16,99,214,59,122,218,103,151,74,255],[19,90,68,25,193,150,229,53,194,250,11,138,64,190,122,55,60,142,1,42,75,73,181,172,92,9,164,223,154,94,89,139]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(9, "P", [[107,202,237,62,101,136,71,218,45,32,146,2,135,19,127,251,211,41,198,9,212,117,108,251,49,187,181,154,75,6,101,183],[74,113,157,149,193,243,55,239,172,5,252,23,55,42,99,87,168,228,59,229,108,54,40,60,166,17,207,112,52,199,153,61],[172,202,237,108,13,174,238,72,166,144,227,193,210,182,253,81,139,74,107,163,212,222,68,82,124,234,13,241,40,176,191,57]], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("ERC1820_ACCEPT_MAGIC", [[215,123,49,244,86,147,191,179,109,90,136,159,13,133,172,190,219,217,246,47,218,234,8,6,36,64,114,149,188,116,41,137],[203,169,36,214,75,125,146,212,40,103,120,43,247,83,0,149,56,11,129,240,218,63,41,183,230,176,190,22,0,45,101,211],[166,100,134,21,73,182,253,210,49,191,202,58,193,248,233,7,159,252,25,229,164,215,25,226,104,94,160,123,36,213,115,135]], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("[", [[2,156,26,200,9,100,203,229,18,0,118,101,82,94,160,235,180,201,247,124,21,19,249,43,30,75,220,199,41,111,233,121],[249,158,219,242,142,132,198,22,124,185,217,186,147,32,23,213,43,247,11,190,213,237,39,75,122,225,94,133,76,97,42,183],[46,209,221,49,220,253,51,94,172,37,249,197,72,40,37,249,212,205,155,143,24,38,193,224,203,113,141,221,247,50,107,151],[154,171,183,221,51,45,253,104,13,238,45,251,160,203,198,234,108,69,2,220,165,99,38,71,246,226,59,224,10,32,23,8]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(16, "lmtyb", [[242,71,111,244,202,33,34,33,146,19,43,188,230,55,195,232,220,84,37,121,73,88,253,157,20,248,147,169,84,70,172,118],[126,52,51,214,41,98,139,104,40,225,42,198,67,254,122,203,136,37,93,199,37,201,192,115,37,34,170,98,43,121,142,240],[150,105,180,162,71,9,64,187,251,48,225,240,19,157,254,214,90,14,24,83,56,55,213,76,244,179,90,225,190,58,176,226],[122,16,71,184,176,93,26,99,148,139,68,212,246,212,149,49,121,70,174,73,189,240,165,24,64,134,62,152,186,60,190,2]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(5, "P", [[204,93,8,41,232,9,167,86,228,226,0,195,40,131,144,210,154,221,210,246,155,131,159,23,13,125,7,27,16,187,200,199],[89,191,155,197,99,170,36,104,97,122,173,231,254,57,220,1,196,51,59,19,198,89,183,144,19,27,152,237,63,150,8,9],[184,104,82,198,127,233,41,121,246,141,113,253,151,99,224,85,212,158,158,147,136,90,40,200,188,193,32,230,205,104,98,96],[150,72,11,42,30,240,147,247,145,107,123,63,109,61,194,230,67,13,103,67,64,215,133,87,136,126,250,51,213,47,148,30]], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("me41cl", [[171,112,86,188,224,81,49,159,186,201,88,224,137,69,14,147,121,101,250,108,110,210,119,93,255,120,65,244,215,120,94,132],[172,196,153,211,22,207,97,30,102,67,87,17,104,96,89,223,23,118,197,65,233,202,175,92,223,179,170,32,0,138,249,91],[100,13,212,159,92,203,119,94,226,94,87,24,12,78,188,120,54,68,245,212,208,33,71,211,114,22,61,236,24,183,194,24],[114,215,217,49,72,26,131,143,170,157,119,179,223,223,0,75,226,62,135,49,110,1,131,189,134,111,5,187,39,92,233,48]], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("Capstones", [[184,59,42,216,141,40,44,104,158,77,55,208,35,176,39,57,124,243,13,93,34,205,178,87,7,207,146,142,177,136,167,134],[210,163,126,32,225,35,148,78,36,107,77,186,47,212,249,175,134,157,204,139,89,95,157,90,16,95,48,194,70,26,74,155],[58,84,103,79,42,31,96,207,6,69,182,244,146,79,238,153,252,137,218,187,244,23,212,85,31,80,16,218,121,104,236,120],[247,108,1,59,111,192,226,44,129,101,251,96,106,171,36,48,100,117,234,194,55,95,107,241,244,203,150,243,83,44,220,138],[166,12,233,238,55,112,235,176,43,32,222,160,246,26,23,3,205,53,11,173,250,96,112,227,124,129,71,16,175,14,1,214]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(162, "ERC1820_ACCEPT_MAGIC", [[69,10,243,133,21,92,0,113,37,50,12,91,254,110,248,69,216,187,27,178,125,78,33,83,53,220,103,218,111,94,110,117],[195,27,194,95,95,241,129,104,213,149,75,234,226,231,86,37,52,121,56,44,21,132,70,199,169,57,23,146,197,132,185,43],[115,199,186,46,115,34,214,55,171,139,223,118,253,22,181,208,145,36,108,162,150,82,97,149,73,5,39,123,115,242,229,8],[207,106,188,26,1,64,234,183,240,144,0,113,226,5,103,70,131,141,176,210,30,117,203,189,58,111,229,199,232,206,143,52],[129,40,98,105,37,152,153,219,186,142,128,180,126,199,21,153,72,48,108,208,51,103,162,196,92,0,194,70,51,87,49,73]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(0, "ERC1820_ACCEPT_MAGIC", [[191,112,155,147,254,164,169,4,65,251,221,95,178,118,190,139,65,216,68,245,158,96,68,233,26,69,12,18,207,164,62,128],[169,147,227,210,38,116,94,143,18,157,59,228,179,10,60,22,196,98,23,203,85,4,229,82,65,245,51,204,161,251,137,228],[188,87,159,221,28,244,47,254,179,90,233,186,29,209,53,52,226,55,113,79,40,18,64,147,99,148,213,253,73,117,83,79],[82,84,23,189,192,125,4,247,19,252,248,127,209,218,108,253,119,248,114,239,160,208,243,17,100,55,179,115,227,53,99,132],[171,5,132,96,20,237,205,31,68,169,0,185,225,82,77,175,213,104,28,117,1,167,110,169,159,102,117,209,176,52,201,142]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("\x19Ethereum Signed Message:\n32", [[127,44,220,60,186,164,254,83,74,252,91,4,173,149,120,99,25,111,120,35,173,19,82,122,147,213,98,122,219,159,233,184],[111,214,62,146,135,7,54,35,60,247,50,120,98,0,104,221,135,177,95,125,95,242,211,102,250,157,173,110,37,254,194,145],[107,60,245,213,166,239,236,164,210,209,5,13,24,32,87,153,75,107,76,51,153,130,47,14,81,101,229,227,184,208,169,243],[64,108,124,242,135,209,16,83,144,139,117,46,191,12,32,71,78,208,191,204,153,186,59,41,14,150,58,150,120,133,213,203],[131,160,187,249,142,143,21,208,90,47,16,36,71,65,29,1,96,168,51,190,81,153,222,169,8,69,176,174,182,96,88,56]], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([35],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[9],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(20,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("847kz",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Capstones", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("[", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("w53lc", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("g68o5g", "0", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("1nba0s", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "u35v7l", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("[", "847kz", "e88yy", "[", "P",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("u35v7l",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("w53lc", 3,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("wm3a0b", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("wm3a0b",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("i5ti0k", 5,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("\x19Ethereum Signed Message:\n32", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(1025,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0","847kz","w53lc","u4185e","Capstones","Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[26,136,129,141,187,168,173,189,184,88,209,27,55,55,127,25,163,234,141,181,24,203,86,146,250,216,173,217,89,122,139,87],[148,73,152,179,244,146,30,189,26,85,112,26,15,66,130,149,63,145,53,59,166,2,19,254,129,35,56,156,131,60,67,148]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(97, 1024, 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([26,191,233,4,200,17,2,92,230,1,88,225,169,180,10,209,81,105,64,56,218,249,219,159,52,148,7,5,233,20,167,99], [78,125,225,17,164,234,34,179,15,218,82,255,16,8,34,248,215,252,32,241,141,109,150,74,136,187,77,174,209,17,1,109],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([245,154,165,30,123,245,12,77,112,229,122,179,5,16,216,136,75,135,69,12,19,28,196,211,243,92,199,109,63,114,22,119], [202,148,99,244,33,105,51,35,121,204,152,179,137,24,237,145,253,167,1,217,218,92,179,68,71,251,31,173,113,136,215,35], [208,255,2,155,201,145,210,58,60,63,223,177,45,138,61,126,166,199,121,65,201,224,98,47,221,146,209,88,174,186,136,58],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([131,83,254,216,20,19,82,246,111,155,135,205,119,4,60,163,254,138,114,58,133,231,2,130,226,3,6,183,110,43,70,91], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([149,207,224,142,221,152,45,25,78,37,110,211,43,205,67,227,122,197,4,204,184,133,252,58,47,139,188,10,189,181,193,77], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([75,105,11,87,132,207,100,182,185,65,214,132,42,198,0,198,162,64,77,226,179,159,155,131,44,72,227,74,184,103,7,148], "1nba0s", [69,85,114,10,252,138,175,140,217,178,8,131,4,144,231,229,104,149,50,184,158,106,150,222,24,194,184,73,50,178,207,141],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([201,216,14,42,56,194,179,161,55,241,75,77,116,146,148,116,114,204,8,159,205,24,56,72,61,109,51,53,193,224,250,85], "\x19Ethereum Signed Message:\n32", [135,237,173,51,140,127,51,64,97,46,91,208,82,68,183,7,28,33,203,17,219,242,126,7,81,118,75,141,61,237,107,78],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([2,0,205,42,229,213,116,237,141,52,191,164,109,74,26,134,86,89,192,173,233,122,136,167,202,82,27,204,147,97,140,129], [52,240,110,85,162,114,253,54,85,241,2,124,127,87,210,78,174,57,2,244,3,105,204,90,210,37,199,156,142,185,81,105], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([2,0,205,42,229,213,116,237,141,52,191,164,109,74,26,134,86,89,192,173,233,122,136,167,202,82,27,204,147,97,140,129], [240,87,63,226,239,119,117,80,196,15,162,36,210,42,115,239,126,170,0,52,215,69,4,216,14,246,90,177,37,254,159,17,20], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([26,164,28,62,109,229,44,211,232,106,143,55,241,172,213,73,68,95,171,201,159,57,36,200,78,213,30,202,71,8,23,215], [209,222,61,238,229,153,78,245,220,43,170,167,63,135,8,50,249,53,147,34,8,114,47,123,133,83,31,24,215,110,73,125], [177,156,52,14,120,208,26,50,218,255,142,213,137,26,239,94,134,14,46,109,200,69,125,177,62,56,88,250,210,207,239,171], "on5thc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([131,162,118,117,141,93,164,249,128,168,18,44,222,32,33,216,97,214,252,215,94,14,188,118,199,17,33,181,110,31,17,169], [193,242,243,32,212,190,237,78,87,194,42,11,166,152,49,35,132,144,164,192,202,167,40,242,76,248,212,89,186,178,106,11], [215,151,244,129,238,245,8,66,193,84,118,20,113,224,151,197,154,46,115,65,104,177,14,135,235,104,164,170,115,229,231,102], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([23,30,254,12,6,232,42,200,192,221,99,138,169,37,123,250,35,180,244,113,167,57,175,203,85,209,204,53,147,139,58,67], [214,190,171,236,98,57,7,94,242,33,177,143,72,99,146,213,108,58,86,38,23,234,147,73,193,74,166,164,2,179,209,20], [147,63,161,188,178,242,211,50,187,229,10,134,120,209,236,243,61,245,77,49,231,54,237,134,117,210,22,209,50,87,30,154], "on5thc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([51,140,57,48,37,74,40,164,11,194,210,251,16,4,226,89,209,187,248,8,207,144,160,33,238,22,202,106,93,178,238,218], [73,1,243,166,54,50,88,113,230,162,58,202,214,33,193,132,32,249,243,5,154,212,127,134,11,30,98,212,160,53,87,16], [253,183,23,2,138,202,251,95,246,91,107,166,156,5,46,132,154,154,39,237,94,105,151,194,99,110,122,152,221,31,69,172], "wm3a0b",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([214,133,64,226,163,255,164,97,163,35,247,166,181,120,34,190,82,97,169,109,242,31,44,154,115,152,5,204,57,20,190,176], [109,254,74,107,42,89,200,143,232,53,75,19,213,37,174,65,225,240,178,155,79,66,174,97,56,160,36,200,237,65,239,57], [73,73,81,163,130,205,75,113,68,86,221,43,88,23,240,189,31,42,167,155,150,188,15,254,251,245,243,154,38,254,143,229], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([61,132,212,155,249,145,108,233,71,67,20,42,67,198,131,250,245,152,134,38,111,113,193,114,199,3,230,126,54,226,135,197], [222,40,255,136,237,15,31,170,85,177,107,220,64,43,97,77,133,101,170,42,197,161,245,97,78,73,121,35,13,171,124,136], [180,93,142,206,81,201,167,83,40,77,177,123,143,36,101,202,166,200,117,157,179,111,83,106,0,33,204,228,119,231,123,51], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([42,235,208,18,179,192,229,1,219,171,213,127,91,86,31,231,117,193,90,23,219,251,120,195,1,206,241,214,1,254,249,117], [125,210,210,82,225,123,83,240,139,21,23,81,54,68,107,128,250,80,1,157,237,144,94,208,129,177,21,199,154,173,249,84], [194,210,38,120,100,192,68,16,155,9,111,19,174,227,233,73,86,15,13,228,223,160,118,147,46,55,7,157,4,217,56,147], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([22,67,149,4,238,187,57,105,117,201,161,247,102,69,133,55,5,168,152,231,248,18,224,35,248,234,51,241,157,166,103,145], [241,73,195,235,210,130,251,61,172,127,63,132,24,132,194,29,17,125,119,212,97,166,10,239,234,62,33,7,164,255,247,120], [94,170,116,43,195,237,77,20,73,73,34,116,87,89,166,223,193,73,46,157,120,121,94,133,58,101,117,88,235,88,153,15], "me41cl",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([49,78,172,31,197,78,203,0,59,24,20,255,167,36,255,120,100,212,98,224,6,53,254,254,198,59,235,244,11,99,27,73], 47, 10, [137,170,34,156,201,68,127,90,173,99,13,120,85,168,158,138,202,9,185,33,35,42,189,10,216,236,129,244,111,105,169,228], 200001,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([91,70,164,104,167,213,22,42,245,117,219,77,3,173,252,227,66,71,181,73,157,112,45,98,93,39,142,236,170,162,215,228], 61, [134,150,177,233,16,20,196,71,219,229,243,22,225,66,238,149,194,61,148,133,24,79,74,131,139,97,30,210,48,216,222,136], [228,54,160,47,30,116,112,217,114,49,232,30,139,86,225,167,91,228,157,144,234,158,146,1,54,201,191,187,167,40,201,17],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([240,99,206,143,28,17,235,132,189,110,160,139,217,254,56,72,228,236,180,199,250,228,191,102,197,175,126,127,221,224,196,161], [133,16,125,97,219,43,12,133,218,204,159],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([207,194,189,37,229,253,243,76,242,17,102,140,201,143,237,48,157,68,213,37,18,102,188,185,109,33,222,179,2,232,149,2], [94,89,29,164,69,229,154,111,109,129,96,35,201,96,255,159,108,128,218,68,81,85,218,228,204,35,80,157,143,29,204,107,43,8,115,26,71,145,128,225,8,203,62,156,7,136,248,203,203,210,254,11,154,103,71,125,27,135,231,138,146,245,207,172,72],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
