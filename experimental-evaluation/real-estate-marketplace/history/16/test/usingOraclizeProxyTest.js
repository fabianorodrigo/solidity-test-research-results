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
    contractERC721MintableComplete = await ERC721MintableComplete.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("0","0","P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("0","0","P",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(1,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Transaction successfully verified.", 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("P", "ng66ct",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(21, "ERC1820_ACCEPT_MAGIC", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(57, "p1z7xb", "L", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "L", 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Capstones", "p1z7xb", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(16, "L", "L", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(31, "0", "ng66ct", "[", 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("p1z7xb", "0", "\x19Ethereum Signed Message:\n32", 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("P", ["P","cdz7fo","cdz7fo","Capstones","ng66ct","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(22, "[", ["P","ERC1820_ACCEPT_MAGIC","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","\x19Ethereum Signed Message:\n32","cdz7fo","p1z7xb"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(26, "[", ["cdz7fo","0","p1z7xb","L","Transaction successfully verified.","ERC1820_ACCEPT_MAGIC","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC","0"], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("cdz7fo", ["Transaction successfully verified.","Capstones","p1z7xb"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(65, "ng66ct", ["Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(71, "L", ["P"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("ERC1820_ACCEPT_MAGIC", ["P"], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("Capstones", ["ERC1820_ACCEPT_MAGIC","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(33, "ERC1820_ACCEPT_MAGIC", ["Transaction successfully verified.","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(28, "6eh0m", ["L","ng66ct"], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("6eh0m", ["\x19Ethereum Signed Message:\n32","0"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("0", ["cdz7fo","Transaction successfully verified.","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(102, "[", ["ng66ct","\x19Ethereum Signed Message:\n32","6eh0m"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(27, "jv6jqj", ["\x19Ethereum Signed Message:\n32","0","jv6jqj"], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("cdz7fo", ["P","L","["], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Transaction successfully verified.", ["6eh0m","kbdqae","kbdqae","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(31, "ERC1820_ACCEPT_MAGIC", ["ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32","6eh0m","cdz7fo"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(26, "\x19Ethereum Signed Message:\n32", ["Transaction successfully verified.","1tfqi","ng66ct","Capstones"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("ng66ct", ["P","Transaction successfully verified.","6eh0m","1tfqi"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("5glqk9", ["0","Capstones","[","1tfqi","6eh0m"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(56, "jv6jqj", ["0","cdz7fo","\x19Ethereum Signed Message:\n32","[","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(63, "Transaction successfully verified.", ["ERC1820_ACCEPT_MAGIC","Capstones","L","jv6jqj","1tfqi"], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("ov576p", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ng66ct","jv6jqj","Transaction successfully verified.","L"], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("p1z7xb", [[250,59,238,27,17,195,213,182,66,68,16,44,193,122,151,35,65,72,97,68,98,32,144,9,187,62,209,138,144,109,119,127],[1,100,157,161,239,203,165,77,24,188,189,60,20,14,188,73,174,254,11,122,62,96,96,178,63,202,149,21,163,185,15,69]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(66, "P", [[224,246,157,182,114,119,179,216,241,94,177,51,184,55,147,61,87,55,207,51,165,173,46,34,76,189,5,98,217,198,66,223],[90,40,52,171,245,147,156,244,22,5,24,142,188,152,188,236,154,155,79,92,250,89,220,246,131,184,2,216,138,5,231,133],[248,228,16,48,213,5,247,171,125,24,130,46,233,230,92,8,90,23,147,202,76,46,46,241,12,130,237,59,109,111,221,13],[243,218,103,138,49,85,92,60,133,128,126,196,159,246,173,122,105,155,242,77,135,94,121,92,101,118,173,17,137,86,162,210],[140,42,191,54,236,128,251,196,55,230,255,68,162,160,82,65,150,125,137,212,48,247,133,203,109,231,62,128,164,40,19,230]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(5, "1tfqi", [[56,171,168,34,98,133,211,169,116,218,206,206,65,16,3,102,222,246,46,7,192,5,110,98,50,249,120,214,190,213,32,144],[253,222,176,107,242,134,116,156,60,34,92,213,190,107,107,0,56,144,172,191,71,107,180,82,233,99,58,64,250,66,168,133],[145,108,146,208,228,200,209,106,41,181,32,248,75,11,121,134,36,26,9,65,88,123,99,211,155,155,155,21,37,178,65,160],[47,251,161,210,35,56,223,143,53,4,45,118,146,69,7,8,175,206,166,215,25,155,229,221,183,87,220,136,226,32,34,119],[20,3,191,154,42,81,97,28,244,248,126,236,227,205,108,205,251,164,91,172,108,180,73,18,2,182,169,109,182,158,207,129],[119,138,239,12,101,165,9,123,104,74,250,45,41,228,142,39,3,239,231,99,8,193,135,26,22,107,126,205,7,48,69,235],[27,79,52,107,104,179,93,178,56,5,87,160,166,198,172,139,83,178,45,218,27,144,26,113,39,153,172,106,228,109,138,86]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ov576p", [[67,183,190,58,0,108,119,195,33,114,93,99,36,190,23,255,131,225,242,90,56,206,121,229,116,224,72,10,111,203,149,6]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("ov576p", [[188,36,246,24,66,1,145,25,93,228,247,170,109,185,115,25,166,75,237,177,211,152,162,46,225,239,96,74,222,140,161,116]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(1023, "5glqk9", [[38,84,93,38,242,221,12,6,127,45,144,18,6,195,210,114,40,122,195,19,254,234,137,120,125,103,61,4,80,114,91,58]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(97, "jv6jqj", [[244,34,200,7,135,92,189,42,136,114,163,206,151,222,12,64,53,104,113,47,207,214,147,59,237,181,148,209,238,36,6,84]], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("5glqk9", [[167,203,119,224,123,5,137,4,69,179,226,127,17,40,10,209,43,163,220,142,19,233,96,10,4,254,248,203,171,218,170,196]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("kbdqae", [[84,195,84,61,237,11,59,225,183,43,221,3,7,48,86,42,12,116,92,218,152,40,97,148,232,142,198,56,64,58,208,48],[71,31,29,0,8,132,226,136,136,150,36,229,89,135,93,233,101,221,179,175,180,31,180,67,153,78,162,228,18,211,125,112]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(30, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[210,64,240,89,51,17,53,25,79,68,161,210,239,125,211,99,37,166,15,143,216,57,170,210,73,70,20,54,96,34,171,118],[43,125,175,238,192,9,252,139,225,218,2,216,147,33,231,29,251,147,54,211,248,19,79,194,101,229,6,111,162,141,166,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(2014223715, "ov576p", [[179,113,228,238,254,38,102,69,238,38,15,188,88,14,73,251,94,168,48,157,173,169,164,36,166,157,101,92,190,219,42,100],[234,120,237,8,237,180,24,145,35,215,82,254,226,173,161,78,144,210,226,95,127,79,5,54,2,140,112,233,162,109,157,158]], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("ng66ct", [[76,146,45,125,67,134,106,62,33,217,109,134,20,110,126,53,58,108,168,91,240,220,33,52,74,203,173,79,93,152,226,138],[54,142,131,208,29,116,198,29,185,185,194,164,84,118,245,153,20,8,214,229,227,33,92,124,0,169,61,5,40,44,198,182]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("kbdqae", [[225,16,35,151,147,75,167,230,84,24,253,163,113,136,166,84,109,227,35,187,101,16,222,68,41,81,94,37,123,204,232,226],[46,103,212,18,159,216,69,255,21,146,168,167,46,61,109,81,205,213,67,118,99,247,90,177,80,186,225,128,4,202,120,7],[40,132,115,191,31,235,84,220,56,112,141,236,123,233,56,56,254,137,138,98,68,192,156,153,6,33,144,140,51,44,3,188]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(56, "L", [[53,93,3,226,6,220,235,120,190,85,130,129,75,83,76,150,56,155,21,45,239,86,45,70,89,104,65,84,55,11,64,135],[210,40,18,31,219,93,243,202,149,32,3,180,86,190,12,161,221,195,164,232,49,119,179,240,186,186,201,167,42,199,74,53],[53,154,106,56,42,55,241,68,226,191,53,31,133,87,53,12,88,179,242,187,195,130,92,7,8,136,6,166,82,115,219,22]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(69, "kbdqae", [[193,251,63,65,1,96,249,79,218,142,140,158,58,143,186,196,139,40,63,170,166,130,10,109,60,123,156,249,6,77,237,80],[11,54,109,87,252,57,126,179,49,201,149,46,115,205,147,144,210,243,205,123,62,80,184,9,147,203,194,137,96,77,225,117],[228,85,89,69,10,179,186,62,64,181,45,57,109,215,102,194,214,5,42,76,244,245,192,51,67,176,55,109,113,125,129,183]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("0", [[145,173,66,222,216,234,0,183,40,88,149,244,199,255,92,107,215,227,55,215,69,244,95,120,180,205,142,199,102,55,68,189],[136,109,220,184,165,146,204,243,133,155,190,247,27,26,149,143,219,134,158,0,2,158,61,131,224,129,204,136,33,85,24,24],[127,138,231,146,71,183,93,247,72,71,113,197,171,232,22,93,85,209,1,95,56,133,227,197,186,150,8,170,162,65,27,59]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("5glqk9", [[22,33,101,50,214,245,250,80,199,139,251,235,64,118,43,246,188,146,173,1,33,92,64,32,89,200,23,63,203,161,137,17],[39,181,107,66,233,7,252,147,78,155,206,255,113,223,130,41,37,73,199,179,176,115,114,74,174,160,173,68,235,49,22,90],[82,237,126,200,20,1,107,215,215,73,36,223,193,108,21,168,88,123,53,108,249,237,42,235,70,182,201,113,56,193,201,56],[62,192,242,195,175,140,9,195,212,234,14,145,231,94,212,5,57,47,126,142,148,249,41,47,2,219,230,20,222,21,240,7]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(254, "cdz7fo", [[201,167,132,137,58,8,80,236,249,153,225,180,136,89,105,59,87,25,15,9,101,112,70,111,152,122,58,191,105,145,54,253],[166,157,65,120,169,73,226,125,214,64,189,69,29,217,20,104,230,9,95,90,161,118,155,83,17,48,237,184,70,84,124,241],[127,236,116,53,53,245,85,125,79,125,213,190,89,117,238,131,245,63,20,41,8,215,115,240,41,125,101,245,51,54,195,251],[254,200,104,7,3,213,96,0,42,3,114,190,28,122,42,70,152,71,167,223,167,95,226,236,129,190,250,210,214,252,209,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(70, "Capstones", [[99,76,219,10,30,190,165,40,176,54,239,144,185,229,191,164,201,162,138,41,112,223,242,235,64,140,146,66,192,31,18,40],[172,237,150,169,79,179,0,234,215,81,29,211,103,107,71,35,101,14,250,199,183,25,101,30,25,9,49,184,65,19,105,172],[137,23,114,116,170,249,144,174,72,154,176,130,37,21,12,200,200,158,157,219,127,108,205,12,55,183,18,240,218,124,218,70],[42,40,161,235,222,64,184,173,156,124,11,174,101,247,18,251,212,32,144,19,140,33,75,115,54,151,171,230,54,207,107,231]], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[216,234,87,183,226,189,229,158,190,209,32,230,112,190,9,67,13,191,2,95,216,197,28,170,131,128,211,186,107,27,243,210],[223,107,88,223,9,179,195,116,3,131,249,255,34,200,75,207,135,184,207,98,55,60,65,32,27,244,104,14,201,91,221,22],[62,130,120,233,131,169,236,139,24,6,116,254,14,59,85,187,224,35,236,64,131,170,71,87,104,65,217,225,41,254,250,57],[68,148,236,216,108,7,98,141,72,172,205,5,178,177,24,121,97,136,235,235,150,70,237,211,72,133,165,70,112,238,199,0]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ng66ct", [[56,73,133,7,95,104,146,227,146,194,138,86,99,80,137,88,178,131,82,158,255,148,129,181,173,136,187,0,162,112,101,65],[208,206,240,38,104,112,134,93,138,120,121,20,60,12,237,171,98,197,32,197,157,72,203,227,169,221,103,171,7,152,159,106],[255,165,33,87,76,202,99,243,145,37,46,30,46,39,138,214,83,84,80,31,100,235,192,160,118,129,96,17,66,198,214,32],[116,2,35,4,230,31,228,71,61,167,190,186,20,47,41,66,253,58,173,108,75,129,220,128,211,224,96,50,14,52,90,220],[4,151,204,43,219,20,13,226,143,249,107,248,54,85,31,203,200,226,94,12,189,236,15,82,56,143,23,81,197,239,204,121]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(199999, "6eh0m", [[240,180,31,143,142,151,181,33,118,148,236,194,251,249,125,138,160,1,39,77,125,181,102,229,247,230,153,42,147,202,29,254],[167,12,186,246,11,219,245,252,179,62,150,237,48,16,134,10,177,16,2,223,154,22,55,85,202,47,76,178,226,200,197,90],[34,97,103,132,75,129,78,223,235,70,129,145,57,84,233,114,92,123,239,198,33,140,141,153,221,97,229,71,187,21,230,8],[57,18,210,45,19,254,142,232,86,46,97,52,6,236,186,208,59,179,101,204,17,220,142,209,90,82,91,231,126,46,168,138],[138,3,48,173,219,250,244,21,104,59,126,83,192,45,83,150,107,103,248,196,234,139,150,216,203,195,82,241,138,107,168,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(64, "jv6jqj", [[182,93,20,143,79,124,222,248,123,52,140,26,8,107,164,62,100,4,124,83,118,250,150,123,112,170,163,245,228,94,77,84],[184,149,28,118,241,88,80,150,194,83,13,181,102,139,28,125,37,141,138,55,37,243,208,193,58,130,166,171,0,211,235,104],[187,72,36,91,248,202,169,231,95,137,98,244,106,56,23,202,210,9,144,32,183,140,81,5,175,141,205,27,15,215,35,255],[48,191,150,158,193,169,236,98,96,211,236,241,21,247,89,220,129,165,106,151,5,132,42,95,76,245,65,248,239,252,170,228],[2,159,207,182,80,155,79,160,205,247,2,17,78,5,67,214,12,33,1,255,26,4,227,14,162,137,172,252,109,252,135,60]], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("\x19Ethereum Signed Message:\n32", [[247,33,21,77,210,31,44,229,127,149,241,28,24,116,93,3,101,26,195,44,90,48,60,201,44,252,79,158,77,14,180,204],[165,110,221,214,112,18,209,220,98,81,143,202,79,93,254,254,44,200,240,104,117,21,250,179,179,235,194,227,113,146,153,107],[19,156,120,134,86,160,1,119,106,222,105,57,191,231,252,159,114,227,184,183,42,84,137,157,182,144,143,143,162,52,127,201],[132,47,97,130,162,158,66,79,42,184,160,98,234,204,80,191,177,220,30,182,125,19,220,220,157,75,248,250,152,53,23,93],[149,22,193,44,20,32,82,167,247,73,120,189,155,168,186,103,160,24,53,247,205,98,235,179,16,244,53,17,8,1,170,193]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([159],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[1],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(97,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("jv6jqj",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("cdz7fo", "ov576p",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("ov576p", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("L", "ng66ct",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("\x19Ethereum Signed Message:\n32", "cdz7fo", "ng66ct",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("ERC1820_ACCEPT_MAGIC", "0", "P", "jv6jqj",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("ng66ct", "0l3euu", "ng66ct", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("ov576p",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("nqkvvq", 97,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("P", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ov576p", 49,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("jv6jqj", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(23,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["5glqk9","0l3euu"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[238,135,67,45,117,234,32,11,30,42,20,226,122,219,248,125,224,221,190,91,125,95,38,211,128,113,187,157,155,212,53,92],[228,12,143,168,137,75,240,41,249,70,150,162,110,117,217,253,58,79,193,110,5,91,37,232,100,238,179,56,69,109,236,137],[255,130,197,61,96,146,246,230,88,97,146,51,147,5,80,30,158,179,190,81,151,238,237,235,34,7,170,141,198,68,102,150]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(128, 60, 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([145,171,215,173,132,143,41,190,33,114,245,159,114,36,35,81,219,193,209,194,56,143,195,50,100,2,237,103,47,175,236,124], [174,226,165,14,234,109,14,206,86,73,86,1,1,225,218,37,69,108,208,253,61,217,213,221,85,101,137,27,162,182,193,239],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([192,28,40,116,164,120,180,29,234,117,176,250,32,37,254,94,66,150,252,38,248,122,104,73,194,118,199,76,191,135,85,93], [38,104,182,5,156,183,189,46,28,87,198,137,250,96,150,202,114,8,101,165,158,144,55,22,253,125,156,164,201,224,37,55], [126,188,110,23,232,130,21,247,221,230,183,99,70,238,5,219,183,115,157,214,13,35,234,174,243,219,143,89,59,59,84,108],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([238,19,170,206,12,205,83,235,82,211,69,113,51,177,174,235,156,135,127,149,91,75,9,55,193,63,79,34,247,140,81,119], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([72,218,50,34,158,216,112,185,45,197,4,148,53,120,19,26,159,98,58,97,17,143,13,110,153,211,23,8,239,17,182,113], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([81,43,68,129,7,19,49,135,250,60,229,165,28,136,66,38,181,196,226,39,64,19,125,182,24,95,125,125,178,157,222,39], "1tfqi", [181,238,26,239,119,44,63,224,103,112,73,84,230,45,187,239,239,4,155,229,125,105,35,208,237,3,200,101,196,82,202,71],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([188,101,131,211,64,33,232,34,142,143,201,0,103,220,210,153,40,127,69,69,117,109,184,54,49,35,35,11,73,128,204,14], "Transaction successfully verified.", [202,103,80,78,194,56,246,120,236,85,198,76,16,240,168,249,32,35,134,226,227,60,134,214,151,144,169,145,216,2,204,135],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([124,207,122,245,54,236,103,72,118,196,35,75,199,157,157,206,2,43,25,9,159,178,1,247,109,201,13,2,45,54,221,57], [154,40,122,167,151,86,205,245,200,130,176,254,234,124,208,157,138,128,190,75,51,38,135,243,199,244,250,101,215,245,44,24], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([124,207,122,245,54,236,103,72,118,196,35,75,199,157,157,206,2,43,25,9,159,178,1,247,109,201,13,2,45,54,221,57], [60,198,235,59,241,15,9,217,14,8,131,191,234,66,242,235,63,102,67,20,208,225,35,78,55,87,135,127,218,238,12,178,93], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([62,158,96,115,232,108,66,144,135,255,250,23,200,44,4,182,253,243,42,229,187,57,152,146,192,141,179,248,93,155,40,174], [196,100,17,45,218,60,143,173,83,119,150,235,99,207,221,74,108,41,1,209,110,131,232,150,220,67,181,151,38,248,126,150], [247,15,244,69,48,35,210,206,140,211,13,150,9,70,169,12,95,50,234,54,240,143,65,55,72,254,152,67,72,6,140,162], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([105,147,222,132,68,168,92,4,196,158,72,13,156,38,39,19,63,53,246,188,13,44,80,194,250,134,46,22,98,0,45,26], [153,1,36,163,52,32,132,62,97,152,32,141,27,63,247,99,179,43,93,90,97,67,127,204,163,11,193,95,43,12,66,214], [78,120,158,138,185,211,218,7,122,186,188,109,111,184,17,13,61,187,233,104,183,243,90,145,83,246,211,237,13,195,35,245], "1tfqi",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([56,70,44,253,191,232,246,109,44,9,118,17,28,78,226,77,22,40,215,1,229,13,43,178,216,53,255,24,123,7,19,236], [186,125,221,108,226,22,12,121,132,44,39,117,226,214,5,36,90,205,129,117,202,70,70,91,191,2,253,37,166,114,218,13], [236,202,116,47,39,75,55,72,0,222,58,66,116,121,88,207,183,69,128,60,79,123,117,222,159,174,224,181,224,131,173,16], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([213,58,173,37,8,208,77,121,112,147,178,16,71,82,75,31,3,66,222,91,118,21,140,163,46,114,255,107,218,57,220,6], [1,66,84,36,192,31,83,157,38,131,127,154,134,158,2,108,33,128,198,127,239,196,14,119,24,144,149,19,121,161,67,93], [161,147,80,15,96,214,72,175,64,133,226,230,93,135,126,62,49,17,158,226,251,78,227,40,11,208,105,154,183,154,10,207], "kbdqae",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([174,167,111,71,105,93,3,133,251,26,170,157,230,209,55,205,40,153,23,71,193,65,177,80,234,32,6,49,121,255,76,224], [123,17,202,135,141,44,217,238,200,60,67,84,238,36,131,228,204,180,162,86,32,206,22,158,64,9,57,144,139,167,70,216], [189,212,248,210,170,43,210,60,251,190,15,148,104,172,148,137,195,61,202,118,113,49,97,195,190,155,143,35,168,89,212,242], "0l3euu",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([79,236,88,30,132,86,209,231,28,158,168,141,18,18,103,171,71,64,157,21,102,85,198,47,131,248,163,195,151,78,86,183], [44,99,141,163,14,160,243,230,44,175,132,193,138,218,72,184,131,18,72,144,66,109,167,9,155,157,53,218,29,215,3,143], [152,86,57,58,193,151,29,217,0,232,160,206,119,170,26,247,33,187,163,164,3,81,185,221,1,179,217,176,78,117,131,23], "0l3euu",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([92,111,238,231,47,141,51,202,208,68,209,95,161,119,44,28,72,145,144,128,76,55,241,206,4,102,187,213,153,120,208,63], [86,122,189,216,175,203,78,150,221,104,168,175,120,151,204,111,130,61,250,146,242,30,50,31,186,60,150,43,227,191,78,195], [23,200,227,34,193,158,87,4,133,10,134,163,30,111,201,166,193,91,195,205,9,159,132,56,24,252,152,206,57,204,38,41], "p1z7xb",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([149,30,83,197,67,3,1,161,46,99,137,138,202,119,42,134,26,134,192,44,127,237,244,104,4,143,171,113,211,211,161,211], [207,18,52,236,201,126,4,208,212,214,38,47,241,14,22,105,51,152,67,236,216,74,64,25,242,62,196,98,60,86,250,58], [214,71,65,115,85,115,85,29,151,68,63,221,140,201,249,25,29,122,213,223,244,110,68,93,216,56,188,232,75,187,78,130], "ov576p",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([106,219,177,102,11,3,191,167,204,14,122,125,93,234,208,80,158,128,167,128,160,38,43,202,126,165,80,145,176,131,200,184], 5, 7, [101,151,207,56,8,150,4,154,103,28,119,4,81,82,116,149,174,5,161,138,194,53,71,225,1,188,186,103,248,17,151,21], 46,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([191,247,203,230,179,140,207,88,210,43,45,218,104,36,202,84,200,11,250,62,27,72,234,167,12,37,234,119,117,143,13,241], 97, [69,217,180,121,136,20,134,202,192,173,178,22,193,25,8,57,77,154,218,186,192,218,81,62,13,185,232,235,39,20,25,221], [214,40,184,13,118,42,243,212,30,224,91,161,211,125,25,133,101,172,70,247,213,32,99,132,40,45,145,127,28,22,146,22],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([52,63,179,216,37,214,171,169,65,80,231,248,206,225,243,126,14,221,134,251,97,201,222,213,226,198,67,150,57,143,253,89], [195,241,104,5,61,198,87,132,65,230,217,10,64,72,186,247,167,142,82,236,60,13,237,90,53,94,81,170,24,69,176,84,136,250,243,28,181,94,195,34,143,15,113,225,141,129,106,117,129,199,67,109,77,79,42,23,67,180,48,200,216,151,43,86,117,14,187,172,206,58,202,74,112,160,176,57,17,76,33,176,69,106,19,29,212,144,38,208,102,88,112,142,233,185,240,252,241,135,179,97,0,200,153,204,48,233,166,113,91,194,110,47,173,221,143,254,237,57,94,113,99,72,205,24,194,152,7,8],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([111,10,104,178,250,183,190,239,3,3,58,197,18,251,81,125,80,103,76,108,175,57,134,135,8,43,156,152,151,56,29,24], [233,126,117,166,150,102,11,1,237,52,16,207,82,120,115,208,57,80,154,34,91,226,239,13,33,220,88,222,218,186,178,24,117,245,48,33,210,41,141,93,146,6,87,52,242,116,144,42,0,252,58,10,160,67,145,226,158,48,65,164,179,218,138,20,212],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
