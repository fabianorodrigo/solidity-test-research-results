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
    contractERC721MintableComplete = await ERC721MintableComplete.new("lznjau","Transaction successfully verified.",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("lznjau","Transaction successfully verified.",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("0","L","P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("0","L","P",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(103,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("cby0bh",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("L", 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("[", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(101, "0", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(11, "Transaction successfully verified.", "[", 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("0", "cby0bh", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(98, "P", "ERC1820_ACCEPT_MAGIC", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(10, "[", "Transaction successfully verified.", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("cby0bh", "[", "Transaction successfully verified.", 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("L", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(199999, "Capstones", ["cby0bh","Transaction successfully verified.","[","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(254, "L", ["[","L","L","13120q","0","Capstones","cby0bh","Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("13120q", ["Transaction successfully verified.","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","cby0bh","lznjau","cby0bh","tnq3z","Capstones","t65nq4","L"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("0", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(28, "Transaction successfully verified.", ["P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(69, "[", ["cby0bh"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("[", ["lznjau"], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("t65nq4", ["0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(66, "lznjau", ["cby0bh","tnq3z"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(2014223716, "cby0bh", ["\x19Ethereum Signed Message:\n32","Transaction successfully verified."], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("0", ["ERC1820_ACCEPT_MAGIC","["], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("Capstones", ["13120q","Capstones","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(16, "cby0bh", ["cby0bh","t65nq4","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(48, "cby0bh", ["Transaction successfully verified.","Capstones","L"], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("\x19Ethereum Signed Message:\n32", ["[","0","cby0bh"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Capstones", ["ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32","cby0bh","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(16, "[", ["tnq3z","[","\x19Ethereum Signed Message:\n32","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(18, "L", ["0","Capstones","L","Capstones"], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("13120q", ["ERC1820_ACCEPT_MAGIC","tnq3z","\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC"], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("Transaction successfully verified.", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","lznjau","t65nq4","t65nq4"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(30, "xdsbws", ["tnq3z","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","xdsbws","P","xdb2f"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(127, "xdsbws", ["tnq3z","P","L","cby0bh","tnq3z"], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("[", ["lznjau","xdsbws","tnq3z","t65nq4","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("0", [[39,207,240,151,71,119,166,217,29,216,242,9,122,4,48,177,40,227,78,120,39,169,92,210,90,223,4,231,147,96,149,35],[149,20,18,183,224,167,77,21,209,153,189,207,196,106,44,20,4,180,152,242,48,140,111,80,169,112,59,17,140,91,64,80],[144,160,167,48,64,229,198,204,98,136,129,82,176,78,177,120,135,182,239,155,186,252,142,89,245,105,108,72,240,91,148,198],[112,117,186,154,187,235,190,93,197,47,77,183,219,29,47,153,199,121,164,204,164,107,176,145,58,129,94,7,242,61,169,226],[177,185,174,241,69,26,115,164,248,158,212,117,229,236,0,186,76,96,47,4,69,103,52,135,202,162,236,62,203,8,29,175],[99,54,56,138,153,254,86,4,137,145,124,117,252,31,194,68,14,76,228,86,219,97,208,47,250,198,17,155,182,119,25,88],[33,64,162,150,161,214,216,204,219,216,239,235,162,153,56,160,228,8,158,176,16,42,202,221,174,65,14,245,160,115,136,93],[77,218,182,146,71,96,248,78,8,7,159,221,4,8,103,123,199,238,138,74,10,76,171,119,72,128,218,247,67,45,203,93],[52,26,87,23,220,56,108,34,33,40,255,1,222,3,52,99,78,189,209,182,150,184,27,17,177,65,229,44,1,109,147,1]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(1023, "coh7g", [[92,127,210,189,159,68,204,161,119,165,71,62,147,102,53,103,111,108,193,147,168,14,5,106,253,124,166,58,49,5,137,70],[222,214,53,182,198,127,13,90,72,129,65,181,54,211,20,254,162,154,179,34,178,119,163,228,99,41,107,122,12,147,198,167],[40,206,149,92,150,30,169,69,14,89,111,27,88,231,42,46,160,203,76,69,152,207,30,227,147,36,189,20,199,60,217,113],[249,67,232,136,213,38,164,206,120,9,71,14,243,62,56,92,196,141,90,50,73,31,191,82,40,52,89,146,240,80,45,254],[120,142,17,255,46,49,125,180,249,212,177,141,207,201,56,9,207,140,23,31,105,23,105,247,94,234,194,26,39,225,9,224],[59,38,108,83,29,145,0,49,150,233,113,230,11,120,230,249,16,3,253,148,83,175,162,169,202,197,78,254,132,172,197,210],[127,230,58,103,29,15,24,106,143,120,192,239,119,233,210,154,129,249,128,228,165,72,223,103,208,120,186,49,124,223,22,15],[97,247,194,8,246,111,108,135,44,26,217,226,140,3,158,155,103,72,37,244,82,53,146,122,215,13,244,155,50,230,224,232],[152,150,210,197,130,179,51,237,5,11,210,93,240,63,152,63,163,72,165,116,103,47,253,41,86,57,236,44,27,49,228,86]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(3, "P", [[193,9,19,168,235,51,111,109,50,153,5,92,31,110,197,77,11,4,116,200,255,179,89,21,50,227,62,132,227,74,6,204],[225,48,209,227,141,95,158,61,107,66,226,135,110,43,196,205,69,67,183,152,19,29,254,25,47,22,82,74,217,74,25,89],[190,175,58,188,185,243,5,98,124,119,160,7,138,6,152,12,206,11,187,108,219,157,235,143,81,129,18,219,212,63,145,197],[110,224,190,158,253,98,8,135,2,140,105,86,26,167,38,153,211,241,178,73,75,28,122,18,82,78,3,251,1,35,173,148],[6,65,12,62,93,190,237,183,45,31,106,15,45,96,130,22,41,11,0,45,75,75,201,89,103,98,41,101,10,124,110,22]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ERC1820_ACCEPT_MAGIC", [[25,180,196,167,109,181,60,128,234,112,126,116,15,175,65,204,91,200,88,93,178,119,212,209,193,127,221,86,71,223,37,236],[11,131,94,159,27,126,146,130,181,66,126,27,101,67,145,44,178,194,229,36,29,170,85,137,210,34,123,14,32,51,194,95],[2,170,143,245,202,159,141,20,207,132,230,67,156,153,90,48,84,241,34,17,218,2,178,147,221,8,24,100,214,185,239,9]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("13120q", [[238,67,234,110,114,224,135,92,29,103,183,23,16,42,52,213,38,226,16,94,53,220,92,212,250,38,29,48,81,238,43,13]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(58, "ERC1820_ACCEPT_MAGIC", [[106,181,197,159,190,38,31,186,103,133,55,197,6,240,84,3,200,252,213,209,123,103,125,58,47,207,126,97,59,190,154,48]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(200001, "lznjau", [[214,206,162,52,106,245,0,182,216,150,152,222,20,96,201,89,57,135,128,211,183,218,197,179,207,246,71,41,135,89,19,210]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("cby0bh", [[16,39,215,126,58,15,134,85,126,95,47,110,166,56,110,39,29,124,173,54,21,159,235,218,65,103,222,74,244,123,212,182]], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[225,60,73,27,230,81,98,30,41,94,79,229,197,151,233,41,64,128,101,177,211,109,45,152,188,146,190,124,132,148,233,146],[140,98,44,134,87,189,248,112,240,7,158,160,7,222,116,85,13,49,255,255,201,132,50,249,146,65,220,55,236,242,226,146]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(95, "coh7g", [[122,25,146,115,235,199,245,205,32,243,169,191,50,205,65,190,253,95,8,86,113,130,7,242,31,173,59,210,144,196,99,155],[89,148,12,184,78,36,83,186,82,80,250,213,3,85,199,228,22,206,58,118,183,197,72,202,26,78,160,41,234,170,218,101]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(8, "xdsbws", [[94,47,200,89,86,227,149,141,10,6,218,61,33,66,245,51,25,162,196,21,32,91,104,51,146,143,167,182,229,128,252,118],[167,56,247,127,167,228,68,243,48,217,191,52,186,5,206,58,195,207,78,102,89,227,28,29,2,163,139,239,15,127,229,182]], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("t65nq4", [[105,126,22,183,130,12,93,111,55,246,145,57,20,139,244,218,120,129,239,203,44,207,34,178,92,204,219,201,196,215,24,218],[86,173,123,62,190,97,15,139,67,80,47,1,58,5,250,156,116,149,196,226,177,122,244,143,159,213,20,152,125,144,134,228]], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("lznjau", [[153,164,4,128,127,194,34,180,127,178,66,63,130,61,28,68,218,115,232,153,173,174,210,38,105,55,151,255,152,51,173,233],[10,227,109,117,197,3,206,62,91,34,145,30,251,72,173,246,235,210,189,246,30,248,71,54,131,103,130,133,24,175,218,38],[29,220,243,129,251,63,11,97,94,254,35,237,213,18,216,212,157,84,93,87,169,221,12,16,21,144,222,18,137,51,160,0]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(7, "P", [[166,61,204,25,241,50,238,209,236,146,121,244,34,17,128,85,41,218,107,163,89,51,100,185,35,218,165,2,98,137,95,210],[108,133,209,76,40,246,62,30,252,119,98,248,24,144,180,170,93,43,209,222,33,28,32,49,162,129,163,26,192,220,89,94],[166,9,183,71,250,58,45,3,193,120,191,9,78,0,112,42,150,221,51,24,55,81,180,21,57,189,26,244,174,174,57,109]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(26, "13120q", [[194,37,142,45,87,139,169,209,86,141,219,174,119,238,96,168,230,6,212,129,33,147,53,125,221,176,190,82,249,158,228,54],[136,40,106,139,135,169,190,117,126,209,53,97,59,28,57,186,61,82,81,134,176,224,249,112,9,144,84,200,209,26,239,183],[170,195,101,96,57,31,145,15,241,47,111,172,120,67,40,16,20,60,161,109,64,238,173,254,132,35,210,222,183,77,70,81]], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("0", [[28,165,81,196,106,195,165,122,75,90,168,132,189,157,137,30,210,200,150,200,200,103,144,168,103,25,57,86,122,113,52,235],[75,28,174,4,66,122,48,251,236,193,249,205,191,197,29,200,172,161,154,113,250,236,159,141,170,114,223,247,207,9,249,215],[208,13,51,55,199,58,183,106,247,211,253,132,192,78,241,18,84,223,24,166,220,198,88,3,239,29,106,122,164,6,41,81]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("xdb2f", [[44,187,54,175,44,250,217,225,6,88,22,218,101,74,12,135,126,183,113,247,123,166,12,107,141,141,129,185,223,54,250,147],[114,105,1,204,133,184,212,229,212,34,143,7,249,182,196,63,5,232,239,78,101,27,21,249,60,237,17,40,48,219,45,82],[115,70,2,246,113,214,188,8,51,166,81,228,2,204,250,63,11,231,60,155,59,44,245,195,82,71,127,161,85,56,40,49],[74,197,203,210,4,75,200,59,198,29,125,82,11,117,179,160,64,236,63,24,108,122,105,83,10,203,112,195,20,195,31,250]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(46, "t65nq4", [[181,93,138,169,158,226,33,202,229,132,167,115,26,123,198,209,223,185,36,18,216,183,194,161,225,117,87,24,100,71,88,254],[152,172,199,43,177,130,19,253,252,76,137,48,110,245,14,12,92,23,231,124,158,144,190,166,220,187,181,243,229,146,105,0],[126,183,156,168,209,249,95,185,101,250,148,220,75,15,228,96,240,183,101,50,183,187,240,234,65,83,42,122,144,81,97,171],[45,114,133,186,76,125,0,108,22,162,104,77,36,39,57,187,209,110,170,62,2,106,150,143,22,238,190,203,177,33,90,58]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(161, "t65nq4", [[22,91,52,26,167,239,32,35,223,186,218,71,92,169,4,66,227,148,41,136,129,66,117,103,11,184,48,12,10,217,117,203],[50,233,33,79,104,124,172,160,61,97,107,212,105,21,203,147,9,181,96,60,210,241,30,254,39,79,144,186,98,193,117,51],[82,247,134,63,143,157,57,111,136,38,146,135,166,174,91,175,193,51,213,216,204,48,142,103,180,68,35,18,70,188,23,219],[142,107,143,141,159,178,83,6,119,199,172,175,206,167,38,53,230,100,254,153,70,241,36,235,136,22,51,53,44,214,247,54]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("L", [[196,62,115,213,134,28,137,197,117,114,35,196,209,15,234,77,21,7,118,18,218,185,148,187,21,45,78,113,43,188,30,218],[57,74,232,5,153,57,54,40,151,66,150,158,200,103,33,52,55,11,247,18,88,216,140,133,213,221,255,230,155,167,41,202],[126,210,73,195,52,243,126,212,53,128,133,97,132,147,156,116,159,56,53,174,48,42,192,9,190,155,160,180,172,195,132,209],[170,152,117,54,127,251,150,109,186,123,191,11,107,160,37,6,62,78,5,119,9,93,171,53,97,29,33,121,233,19,254,43]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("[", [[20,39,222,65,151,197,252,205,39,47,73,187,2,178,19,229,203,187,137,129,242,20,133,60,73,96,66,119,82,112,193,202],[135,23,93,161,213,112,198,165,183,63,91,159,219,54,177,63,139,223,145,244,171,87,200,132,153,228,59,143,150,116,171,254],[167,68,219,34,197,157,197,43,92,174,138,32,133,101,228,15,253,31,183,230,17,223,231,231,226,70,197,45,234,23,243,46],[248,153,116,180,54,209,87,228,139,100,152,83,131,240,67,117,93,103,236,99,85,210,208,4,40,46,176,126,236,119,168,166],[52,240,123,57,237,29,97,155,159,152,96,250,201,15,150,55,231,234,222,33,141,16,48,212,218,136,242,38,132,142,61,170]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(2014223715, "[", [[76,73,113,179,93,73,54,253,109,116,193,124,100,19,207,80,2,187,67,196,191,149,28,96,12,194,145,211,86,65,66,241],[58,88,105,131,26,63,84,127,200,120,21,6,237,57,176,153,141,1,184,59,106,159,133,196,241,39,97,238,186,7,118,234],[146,246,158,156,42,206,233,169,239,92,90,3,58,58,202,162,51,145,219,117,31,144,21,70,155,62,47,94,240,150,159,87],[176,204,35,139,138,34,8,187,246,177,246,48,202,170,193,112,230,32,103,204,19,22,52,229,221,1,7,243,38,134,146,80],[72,29,187,91,53,226,77,200,84,85,225,196,248,225,79,81,200,152,86,6,211,170,106,14,120,4,201,20,76,224,46,158]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(71, "[", [[61,70,249,119,34,36,199,198,14,61,216,56,39,98,97,191,252,21,19,32,101,133,98,67,60,180,185,32,48,203,201,37],[112,94,16,198,238,45,237,3,101,98,150,2,7,232,102,50,181,235,172,127,198,105,39,37,5,146,126,138,226,77,187,182],[31,22,191,178,178,250,230,164,162,102,44,11,24,59,222,93,112,126,40,70,144,213,76,148,97,5,158,41,206,157,239,204],[64,200,82,83,161,108,49,150,140,232,101,67,1,213,158,77,92,18,168,175,205,196,66,212,57,70,211,96,128,80,197,162],[238,34,65,249,71,43,78,227,185,58,15,62,159,160,190,74,65,36,95,3,148,54,58,166,173,103,161,239,219,3,107,218]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[75,146,117,109,205,170,162,121,193,53,167,12,58,219,13,41,199,244,102,13,61,241,151,86,9,31,4,175,167,62,82,203],[31,111,55,145,242,138,125,130,233,119,51,176,18,132,164,136,119,94,100,116,3,123,18,105,101,1,8,248,47,93,79,201],[195,104,32,192,243,175,125,153,237,154,15,37,207,76,174,53,100,245,77,222,113,234,168,158,253,40,13,102,81,219,107,110],[45,244,151,96,181,121,58,252,155,170,157,209,197,233,148,29,151,131,244,229,214,134,59,177,47,58,38,252,200,145,160,245],[58,17,240,12,188,236,38,94,254,100,157,192,186,238,53,211,242,194,108,255,201,219,164,200,137,44,183,211,130,137,21,236]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([105],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[3],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(88,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("xdb2f",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("13120q", "L",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("0", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("cby0bh", "lznjau",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "lznjau", "4dkzfv",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("13120q", "xdsbws", "L", "Capstones",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("Transaction successfully verified.", "13120q", "t65nq4", "coh7g", "tnq3z",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("lznjau",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("coh7g", 2014223716,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ERC1820_ACCEPT_MAGIC", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("L",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("4dkzfv", 86,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("coh7g", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(95,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["Capstones","6chbmf","[","P","xdb2f"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[205,181,142,247,10,201,108,64,85,96,111,166,8,247,191,79,36,15,138,155,77,28,30,181,242,178,247,69,175,57,25,138],[225,1,164,57,154,59,93,38,1,114,248,42,246,21,151,235,27,180,14,76,217,126,172,31,219,151,243,166,13,219,34,3],[51,56,192,157,67,120,60,227,231,248,101,252,154,4,105,164,168,226,205,245,101,115,227,188,69,53,90,66,12,63,171,13]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(46, 87, 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([212,130,200,54,101,242,111,135,142,63,227,36,207,17,200,82,129,103,23,38,216,197,91,66,182,215,205,254,126,47,105,126], [184,185,113,66,86,3,223,174,250,100,245,6,51,201,222,17,62,16,151,164,212,131,37,236,191,218,4,90,195,9,46,4],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([208,239,218,153,63,227,111,22,96,129,159,234,133,248,228,132,125,146,162,136,135,69,250,4,178,182,255,149,238,183,186,172], [187,106,214,247,138,12,89,207,0,141,156,120,212,42,178,84,135,81,45,30,146,48,48,105,87,147,249,125,132,0,139,74], [221,80,241,196,91,211,10,124,121,244,200,174,64,145,52,162,89,87,197,89,42,170,31,42,232,17,91,213,79,150,182,21],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([35,100,104,107,198,195,146,42,60,88,101,194,186,19,162,176,84,235,55,254,90,214,128,1,63,226,3,119,203,150,169,68], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([99,160,172,157,213,115,113,62,123,43,212,43,222,235,225,192,110,218,240,27,110,26,144,70,111,49,140,203,239,64,133,144], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([48,224,21,68,79,249,255,153,186,137,110,96,32,32,90,183,175,247,185,131,102,43,186,18,5,182,182,247,44,169,140,231], "xdb2f", [23,98,156,224,132,104,38,81,117,55,16,233,21,173,55,244,138,6,94,163,35,104,95,152,13,221,168,225,11,107,62,2],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([177,25,37,51,249,219,236,189,74,114,15,225,200,214,112,80,103,159,187,25,17,89,159,155,138,232,228,165,44,188,80,236], "Capstones", [149,129,229,81,209,174,86,116,114,79,217,115,46,79,110,6,131,212,190,133,149,204,129,150,101,59,219,204,138,73,205,141],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([120,26,129,167,37,116,167,144,210,194,125,106,106,129,220,196,67,118,121,240,54,78,199,68,16,133,3,238,163,121,66,195], [142,35,37,222,9,63,83,123,190,201,168,80,219,55,27,7,224,234,82,65,25,173,157,76,221,197,8,5,195,41,49,54], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([120,26,129,167,37,116,167,144,210,194,125,106,106,129,220,196,67,118,121,240,54,78,199,68,16,133,3,238,163,121,66,195], [211,126,202,69,113,25,117,166,155,90,147,127,36,164,27,146,76,212,249,34,188,134,184,129,8,32,135,48,206,78,169,103,109], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([96,4,113,118,208,126,170,142,26,157,211,104,234,92,204,95,253,194,136,16,27,184,178,181,54,196,62,250,149,188,31,32], [123,73,229,120,41,188,129,167,89,44,149,131,113,5,37,195,94,80,21,178,179,176,207,230,60,77,66,98,94,84,37,70], [68,128,255,226,45,96,157,217,181,172,226,80,154,1,60,217,8,152,244,37,117,177,156,72,139,90,243,162,140,144,146,11], "xdsbws",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([43,57,132,238,99,85,3,9,59,232,40,174,61,70,160,119,220,97,127,39,220,234,212,134,95,72,77,40,108,54,160,2], [5,156,174,43,83,22,217,75,165,245,154,218,178,132,99,193,64,246,145,158,85,4,235,158,181,42,194,213,1,90,51,177], [49,199,232,94,193,178,197,52,151,62,212,204,112,155,76,161,28,96,150,167,77,18,61,178,17,45,245,77,236,221,143,101], "xdb2f",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([10,155,9,28,164,101,73,151,51,227,167,13,199,143,71,49,151,104,117,55,204,81,193,94,140,153,149,174,175,70,198,241], [63,137,214,71,11,157,138,75,219,126,153,225,134,90,42,190,188,52,190,159,229,0,190,47,101,191,89,171,35,193,59,103], [222,157,209,241,89,85,125,247,55,242,91,133,71,168,252,173,131,114,40,152,115,142,104,216,216,115,62,230,160,115,88,247], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([16,129,251,64,69,76,57,62,211,158,229,187,30,21,39,161,101,218,233,78,161,49,87,152,2,136,174,208,22,184,99,213], [127,67,135,32,203,91,136,222,25,229,33,217,186,108,245,245,242,193,65,26,28,223,199,93,252,74,1,45,60,37,96,57], [38,101,218,34,63,174,9,206,4,77,79,116,129,69,20,94,197,138,125,68,231,14,3,93,129,212,238,10,109,155,232,193], "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([37,138,194,50,172,121,16,117,9,6,138,93,25,184,240,247,254,87,209,38,56,153,73,83,82,30,76,148,51,200,84,152], [65,148,202,235,2,2,118,224,116,199,210,79,79,11,95,253,162,255,40,76,15,41,187,137,7,70,158,208,2,61,94,227], [138,6,7,8,45,96,67,218,183,243,183,189,225,6,155,33,124,219,252,140,48,149,20,243,40,126,172,121,136,11,195,69], "lznjau",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([118,78,22,123,1,216,194,175,91,139,163,170,156,13,66,180,93,109,244,110,36,175,13,61,80,111,54,134,142,187,126,89], [98,118,179,90,244,249,186,116,232,184,205,37,85,157,247,3,229,180,240,246,140,239,60,253,167,87,252,231,11,123,130,143], [47,55,236,188,5,191,15,243,201,209,47,80,90,12,71,41,153,3,204,194,51,159,61,198,223,224,125,236,202,110,42,250], "t65nq4",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([39,208,207,61,227,24,111,84,32,183,70,191,193,26,114,10,150,93,1,142,180,189,214,172,163,211,171,71,188,194,76,215], [2,186,255,113,102,99,158,41,240,153,228,5,190,105,217,107,196,239,139,190,225,64,223,22,198,50,113,255,37,153,191,68], [128,25,35,171,63,179,126,17,53,212,58,190,31,75,227,218,53,97,113,97,179,220,118,25,2,173,227,251,6,34,56,13], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([121,147,214,31,201,174,107,230,137,1,7,210,41,60,77,210,146,227,83,14,48,117,232,123,90,13,143,173,222,35,47,60], [240,164,89,15,116,153,0,169,73,68,15,147,80,11,199,255,83,123,225,127,198,179,254,88,114,221,171,197,6,215,211,228], [123,179,190,33,77,197,173,73,73,109,205,83,43,188,249,21,149,71,246,153,19,155,161,122,253,162,99,199,189,119,200,221], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([159,46,51,193,41,172,56,210,247,11,48,235,255,252,100,132,115,168,115,3,72,45,254,151,208,140,94,140,88,174,158,197], 15, 86, [10,49,70,125,31,14,147,230,148,174,118,152,202,77,233,51,16,116,235,86,231,209,189,38,193,69,5,75,10,126,59,11], 23,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([152,154,20,162,6,224,94,212,42,29,39,122,89,166,139,75,112,100,66,125,227,171,205,137,108,241,247,7,248,126,56,53], 64, [160,167,172,85,101,159,160,214,143,28,219,242,77,191,13,51,188,170,51,108,1,161,95,123,124,225,93,228,91,39,128,56], [243,86,128,188,15,210,234,112,88,243,129,132,149,211,117,122,28,169,78,120,79,176,111,159,142,183,131,30,189,47,222,83],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([87,235,88,206,4,220,26,203,226,98,203,12,214,102,250,221,107,140,57,8,61,231,3,22,169,238,135,5,89,173,255,186], [65,204,141,227,124,113,28,127,105,159,87,23,225,124,62,90,253,92,39,144,92,82,166,30,169,82,56,115,225,35,212,236,208,210,168,77,2,244,87,193,19,126,136,183,236,189,136,89,99,188,250,60,68,185,171,250,114,41,32],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([128,199,33,171,48,24,223,17,243,89,241,16,180,218,32,59,65,127,40,81,191,4,132,48,180,252,190,244,103,134,51,114], [144,161,105,94,219,251,132,29,153,66,253,148,222,70,194,191,109,107,229,219,73,214,70,3,143,116,79,136,41,208,55,131,203,41,244,220,113,43,184,0,185,244,223,198,188,115,30,189,87,223,197,210,168,158,2,109,246,78,90,0,2,146,14,33,60],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
