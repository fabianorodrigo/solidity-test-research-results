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
    contractERC721MintableComplete = await ERC721MintableComplete.new("P","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("P","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("Capstones","Transaction successfully verified.","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("Capstones","Transaction successfully verified.","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(46,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("ketcdf",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("0",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("ERC1820_ACCEPT_MAGIC", 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("P", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(161, "ERC1820_ACCEPT_MAGIC", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(19, "\x19Ethereum Signed Message:\n32", "P", 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "Capstones", 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("0", "0", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(2014223715, "keb89", "[", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(33, "Transaction successfully verified.", "[", "ketcdf", 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("\x19Ethereum Signed Message:\n32", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Capstones", 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("ERC1820_ACCEPT_MAGIC", ["[","L","keb89"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(21, "L", ["Capstones","ketcdf","L","6p87fq","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","48tr7","48tr7","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(200001, "Transaction successfully verified.", ["6p87fq","[","ketcdf","ap9cha","ap9cha","[","\x19Ethereum Signed Message:\n32","P","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("P", ["ap9cha","L","L","48tr7","ap9cha","jyad6i"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["keb89"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(98, "P", ["Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(22, "ERC1820_ACCEPT_MAGIC", ["6p87fq"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("ERC1820_ACCEPT_MAGIC", ["P"], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("jyad6i", ["0","jyad6i"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(11, "Transaction successfully verified.", ["0","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(257, "ERC1820_ACCEPT_MAGIC", ["6p87fq","ERC1820_ACCEPT_MAGIC"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("[", ["P","keb89"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("ap9cha", ["ketcdf","Transaction successfully verified.","jyad6i"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(96, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["mhmmzs","4726v","ketcdf"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(199999, "84fwu", ["keb89","ketcdf","ap9cha"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("48tr7", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","803ay5","ukd78i"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("ukd78i", ["803ay5","ukd78i","ap9cha","keb89"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(69, "Capstones", ["ketcdf","803ay5","\x19Ethereum Signed Message:\n32","48tr7"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(66, "L", ["Transaction successfully verified.","Capstones","ukd78i","P"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("keb89", ["Transaction successfully verified.","Transaction successfully verified.","[","ERC1820_ACCEPT_MAGIC"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("0", ["4726v","mhmmzs","84fwu","f3lvdk","jyad6i"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(70, "ketcdf", ["4yhsrf","ketcdf","ketcdf","L","48tr7"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(101, "mhmmzs", ["P","84fwu","ERC1820_ACCEPT_MAGIC","ap9cha","48tr7"], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("keb89", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","4726v","P","4726v","ERC1820_ACCEPT_MAGIC"], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("[", [[11,135,26,217,120,107,251,158,114,4,149,198,34,71,153,108,41,198,250,130,216,8,124,154,130,13,252,230,147,166,99,30],[140,189,43,29,144,149,241,248,5,70,230,227,65,191,32,85,26,102,24,131,14,48,54,0,64,57,231,73,117,49,140,93],[241,60,137,225,165,223,38,152,121,56,10,234,6,11,62,100,3,171,16,79,107,91,19,202,249,63,132,107,124,69,109,94],[126,211,190,117,101,78,96,49,3,225,41,110,64,107,55,150,166,125,113,107,75,142,152,103,120,7,183,110,66,61,181,250],[81,127,82,89,153,86,129,231,15,85,211,43,168,102,143,199,228,106,77,124,58,165,246,224,43,124,18,1,124,20,102,228],[31,61,11,230,131,73,32,253,190,92,178,124,172,105,97,5,159,221,37,123,8,29,66,209,156,95,136,9,118,100,62,129],[155,96,104,81,97,165,18,245,182,226,95,73,89,172,89,168,134,250,208,88,90,248,164,250,232,116,188,180,61,171,121,155],[248,112,193,74,140,246,40,189,216,244,236,203,206,169,203,194,215,156,143,236,45,179,152,93,94,250,244,133,210,73,3,55]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(26, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[29,39,189,146,242,182,38,97,144,132,79,191,39,78,126,169,41,29,174,209,205,176,26,239,73,98,60,94,72,112,215,31],[54,127,78,231,33,189,130,119,105,223,196,248,93,228,127,179,179,116,69,35,72,54,24,158,191,157,43,10,46,157,227,153],[181,138,167,105,55,226,142,221,21,115,26,86,8,188,40,140,88,230,100,2,45,157,141,216,106,98,120,14,223,119,241,55]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(71, "jyad6i", [[39,198,81,158,251,45,117,145,184,251,145,238,158,86,21,68,231,200,43,72,177,173,61,70,111,219,194,151,22,108,187,69],[27,115,124,244,76,133,80,251,67,175,56,44,178,191,92,153,118,20,41,41,72,25,120,5,181,81,202,78,234,34,60,208]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ketcdf", [[25,167,146,118,168,143,252,38,122,138,123,91,217,193,163,183,202,209,69,195,68,116,111,46,170,114,13,94,197,133,151,149],[117,56,226,155,220,225,65,37,121,247,25,204,168,24,142,118,115,190,11,219,136,53,57,185,143,101,7,186,121,174,111,228],[18,164,52,88,70,174,18,85,120,240,179,107,202,133,125,186,122,121,108,152,78,115,6,16,46,173,44,167,46,93,229,122],[100,136,157,34,216,128,52,235,23,60,48,251,83,210,143,15,106,134,1,24,162,26,59,65,88,248,106,136,213,72,193,97],[36,111,117,208,2,248,31,97,111,100,7,230,246,105,129,19,154,168,248,199,35,242,1,32,137,229,57,103,66,109,48,90],[246,52,188,142,102,66,193,175,55,141,254,65,242,230,132,60,98,168,197,227,21,53,248,240,82,246,115,111,35,146,190,153],[32,203,59,91,191,109,147,42,129,236,98,235,95,96,111,246,165,126,169,59,182,174,141,5,218,115,12,156,161,15,86,35],[114,254,128,118,238,68,16,136,217,201,242,176,48,233,241,107,220,89,59,155,164,252,43,74,232,48,190,115,56,243,92,209],[77,14,232,11,62,24,168,251,77,243,45,196,164,82,123,239,254,133,28,5,64,86,153,30,168,72,133,197,213,152,153,227]], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("803ay5", [[50,174,49,55,66,121,105,223,109,16,39,46,252,81,162,84,222,106,50,126,65,217,232,6,120,234,47,121,13,178,165,182]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(71, "P", [[110,250,7,184,209,244,41,56,146,94,126,182,251,194,219,2,41,166,224,219,153,204,130,218,81,113,151,204,251,42,131,223]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(162, "\x19Ethereum Signed Message:\n32", [[193,236,118,50,89,236,207,216,201,224,138,241,55,175,202,58,237,90,213,50,115,184,107,171,46,121,33,229,250,43,22,12]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("L", [[6,21,234,250,70,211,26,242,87,63,151,84,33,218,245,196,161,120,66,183,164,3,88,90,230,218,163,43,181,203,74,204]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ERC1820_ACCEPT_MAGIC", [[191,188,103,64,221,106,109,125,88,143,244,114,0,145,59,91,200,211,125,144,227,35,222,4,109,162,151,229,75,243,99,209],[91,160,157,39,24,97,186,90,192,37,63,245,252,219,14,66,216,37,36,8,123,128,139,145,52,243,51,92,20,64,154,140]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(102, "ketcdf", [[96,16,95,49,154,128,155,88,251,135,27,234,6,129,36,137,141,147,26,127,100,3,74,196,102,101,212,23,160,237,25,216],[88,197,79,54,54,47,234,94,160,150,247,31,234,78,135,183,166,6,27,121,91,190,50,54,188,185,21,77,67,160,92,201]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(48, "P", [[202,203,120,18,234,126,32,9,84,84,114,13,3,178,49,160,198,5,192,188,42,26,213,248,208,112,155,219,147,70,193,212],[70,98,165,25,82,167,74,19,191,54,113,207,51,247,195,53,194,70,9,160,116,204,205,77,145,208,143,53,12,206,155,129]], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("ketcdf", [[156,5,110,79,242,146,116,142,226,175,190,190,123,107,25,178,46,73,3,46,108,37,122,69,236,97,23,88,206,145,107,183],[208,32,127,217,228,145,164,102,175,150,63,72,95,189,43,105,49,190,22,134,131,30,39,152,147,64,219,193,180,197,67,246]], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[128,13,202,229,121,198,198,63,124,248,87,146,61,89,13,53,46,233,226,245,245,95,97,161,3,164,57,65,236,220,192,251],[21,18,226,238,196,112,185,214,112,178,249,243,58,225,218,12,245,31,122,114,127,235,215,118,236,183,154,130,244,98,67,167],[133,43,228,52,199,171,218,222,222,139,93,29,60,138,87,72,189,217,240,170,80,217,5,96,52,60,199,169,82,185,22,253]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(71, "\x19Ethereum Signed Message:\n32", [[163,56,113,5,235,126,12,68,54,171,68,110,194,21,162,172,140,192,31,156,90,120,154,166,15,83,252,245,44,244,232,12],[227,35,252,53,159,67,49,57,156,9,69,76,53,7,174,55,201,68,175,136,137,61,188,121,145,246,26,168,148,109,118,20],[108,218,120,161,97,217,120,40,176,69,44,97,197,250,127,129,32,154,142,117,0,142,60,87,32,35,223,47,172,94,69,245]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(8, "P", [[204,50,99,175,6,230,244,54,159,213,227,93,156,72,101,191,60,206,62,215,63,71,37,108,160,88,158,44,140,232,60,44],[251,67,101,51,37,119,49,46,41,187,210,250,207,32,219,70,59,86,42,53,34,178,92,21,149,75,10,176,178,135,138,36],[196,214,172,182,231,12,81,169,113,2,220,106,150,122,87,230,119,138,232,54,57,40,253,243,185,74,9,142,128,70,185,151]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("jyad6i", [[133,108,221,235,3,255,249,95,56,93,127,158,103,121,175,141,120,157,60,174,201,228,200,23,24,64,18,230,114,90,46,119],[116,162,7,213,1,243,0,113,19,127,213,202,29,144,164,204,141,103,240,140,5,247,190,72,194,69,146,79,56,164,185,252],[197,229,74,115,92,214,183,171,247,120,236,11,34,105,146,99,2,106,177,11,166,60,141,157,6,92,182,129,26,81,28,115]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("jyad6i", [[230,137,27,131,236,142,109,161,8,253,84,201,13,148,40,71,4,149,243,174,109,46,41,253,137,46,33,232,76,145,176,12],[10,67,88,150,48,132,7,24,137,3,222,247,83,99,221,208,40,199,247,38,102,107,124,50,55,205,57,3,118,66,75,3],[180,101,197,138,34,106,195,230,86,15,164,169,220,76,207,145,156,207,76,56,38,189,20,31,235,20,249,35,166,203,136,6],[95,174,17,46,106,122,249,178,55,195,92,207,130,70,47,38,12,192,175,62,145,240,26,121,99,56,163,106,40,193,254,61]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(6, "ap9cha", [[117,82,204,55,236,189,31,166,63,11,229,254,184,40,190,72,183,101,209,151,33,69,12,123,14,201,232,207,38,123,100,223],[40,21,53,91,63,142,174,37,86,41,167,75,89,144,30,104,106,24,86,175,189,228,143,5,69,9,149,235,83,238,197,13],[84,29,195,81,46,169,164,103,232,148,44,60,139,156,76,146,107,241,75,112,79,142,44,183,160,248,40,99,177,120,231,227],[32,32,28,246,79,194,153,109,251,192,26,234,194,232,84,227,139,32,213,128,252,51,92,136,219,169,191,185,69,245,215,92]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(64, "0", [[52,226,68,68,200,139,235,112,39,194,216,187,48,156,95,243,175,4,193,151,133,59,213,92,72,199,155,79,224,211,249,113],[24,196,227,6,124,46,2,191,1,89,97,246,140,245,235,4,9,179,14,209,241,35,138,18,251,112,13,65,3,211,110,192],[232,138,239,240,64,109,149,217,248,5,85,144,123,210,61,70,81,98,99,143,169,112,224,173,134,55,215,82,93,26,162,2],[197,76,1,233,30,4,222,176,166,226,189,235,193,143,41,135,175,13,220,229,177,11,38,57,22,174,202,35,59,224,112,85]], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[121,71,249,13,162,90,125,73,124,97,16,91,57,21,184,110,202,193,172,253,50,241,30,36,185,55,126,1,204,232,163,15],[214,9,128,93,144,244,111,127,90,180,123,181,26,132,61,129,51,190,238,166,165,25,95,53,107,178,244,73,238,162,180,97],[230,160,127,141,237,245,45,218,209,216,17,26,215,100,77,92,44,118,41,32,78,183,49,219,23,68,199,136,177,28,184,10],[76,181,56,73,239,246,117,5,103,2,71,138,154,223,176,167,95,112,36,185,248,202,56,217,96,116,98,213,188,50,126,215]], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("4726v", [[0,29,71,168,142,193,51,66,211,34,167,91,21,139,51,167,155,151,77,40,169,32,14,126,112,105,1,16,129,222,106,194],[58,144,22,226,115,224,180,161,187,208,95,132,248,209,118,53,82,135,185,95,156,31,227,211,203,84,223,166,103,1,45,10],[100,161,77,94,157,232,45,85,149,34,162,156,125,18,12,136,9,252,162,235,146,176,19,51,37,177,79,220,184,198,29,176],[21,146,240,193,190,197,138,40,87,136,93,113,25,205,109,15,152,40,93,248,17,200,214,253,13,155,193,196,171,248,7,157],[182,202,15,146,140,198,184,120,177,113,120,100,102,29,202,251,112,9,186,123,131,117,98,206,162,70,24,158,122,134,72,55]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(55, "[", [[73,84,115,132,64,89,200,53,22,176,53,10,95,238,18,136,113,30,175,194,4,175,66,73,59,236,171,135,123,178,182,174],[17,161,114,202,160,231,219,77,57,222,245,170,76,249,170,131,33,107,126,23,72,72,75,145,93,214,100,211,18,107,159,64],[205,241,56,30,224,214,11,60,185,193,3,167,75,249,141,57,95,232,71,243,159,152,166,248,230,17,40,3,29,181,77,158],[239,139,20,117,250,191,68,246,75,0,230,245,214,42,122,33,160,230,174,61,241,43,35,73,25,248,49,163,144,163,188,172],[87,7,252,156,201,39,35,208,69,203,146,211,225,59,203,193,160,213,144,54,52,177,134,176,3,228,47,236,29,91,156,199]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(161, "ketcdf", [[105,68,221,211,21,11,8,150,71,133,69,67,142,0,247,52,75,224,200,160,227,18,150,31,226,104,185,230,127,76,59,28],[224,159,229,57,129,109,116,212,59,189,162,140,90,61,204,68,236,111,4,196,198,130,164,46,42,196,109,7,77,71,201,12],[179,242,74,158,99,237,216,54,154,100,38,4,248,167,197,198,122,98,128,140,237,252,253,16,120,8,209,158,83,248,14,57],[185,177,2,129,62,56,134,65,6,156,151,219,8,242,76,35,137,231,170,32,123,209,89,12,52,168,251,107,230,23,183,234],[57,74,90,23,245,245,244,219,8,222,53,58,155,152,113,161,38,201,122,219,0,52,121,132,150,91,156,122,3,214,46,211]], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("ukd78i", [[19,251,202,17,161,80,54,4,127,50,166,39,178,188,52,187,231,153,171,252,221,141,173,44,209,121,41,178,97,81,33,117],[146,75,192,46,191,23,237,204,240,22,115,155,222,165,82,93,162,2,77,188,255,37,109,124,25,198,226,239,53,85,21,17],[120,64,131,220,18,164,112,12,54,29,225,207,31,44,84,177,71,253,211,120,159,17,60,105,48,242,209,227,45,170,254,8],[49,227,37,90,120,9,140,81,156,158,223,126,60,207,66,41,7,17,202,84,219,6,137,93,57,218,197,135,45,144,216,138],[116,0,60,136,154,102,141,10,160,87,223,190,213,232,252,230,45,213,209,191,249,233,177,231,73,216,176,229,250,185,205,19]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([159],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[5],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(102,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("803ay5",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Transaction successfully verified.", "4yhsrf",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("[", "4yhsrf",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("ap9cha", "48tr7",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("ERC1820_ACCEPT_MAGIC", "L", "jyad6i",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("yu8iwp", "Transaction successfully verified.", "0", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("Transaction successfully verified.", "48tr7", "mhmmzs", "84fwu", "yu8iwp",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("Capstones",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("84fwu", 25,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("4726v", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("ap9cha",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("803ay5", 47,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("0", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(95,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["4726v","ukd78i","Transaction successfully verified.","keb89","mhmmzs","6p87fq","0"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[79,5,12,87,23,157,239,54,5,97,207,88,185,102,189,67,241,216,12,3,58,199,176,159,24,130,225,15,163,6,44,170],[46,4,36,189,186,171,27,51,90,76,53,203,110,137,66,211,254,210,148,217,49,239,34,227,89,21,134,0,242,44,197,204],[178,224,235,135,241,248,26,79,109,43,76,40,141,164,96,221,138,26,227,230,155,139,28,183,39,148,223,224,169,184,111,46]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(19, 29, 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([216,11,82,78,31,129,220,36,171,217,93,17,255,39,9,58,180,184,0,78,207,142,50,231,139,139,228,4,89,218,100,36], [43,89,130,249,58,63,240,224,93,242,197,72,156,55,11,182,62,35,248,195,68,145,48,62,182,21,166,231,147,152,147,114],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([235,108,143,222,46,57,75,157,154,218,0,204,195,228,52,113,165,70,7,159,20,41,141,135,77,167,59,122,66,196,172,113], [61,209,216,17,109,204,41,202,105,208,166,7,160,67,50,128,170,227,92,237,211,184,115,248,100,74,103,222,222,238,13,128], [206,212,227,162,213,2,187,5,255,88,167,140,103,167,152,163,130,87,226,210,138,242,93,1,129,223,35,122,130,43,250,118],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([24,73,107,218,198,140,109,235,21,120,34,95,205,74,32,27,233,239,4,69,220,244,54,49,237,154,76,43,173,53,213,114], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([37,206,50,137,41,64,93,179,130,69,62,156,190,145,178,238,111,220,17,6,34,179,138,39,44,209,35,36,59,46,168,42], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([26,118,144,173,80,29,82,236,3,143,235,198,199,149,1,136,101,63,67,188,169,63,127,212,141,176,224,148,241,180,114,82], "6p87fq", [247,197,42,196,108,159,241,52,201,249,179,213,169,9,216,53,163,209,43,112,156,24,134,169,85,185,227,17,45,85,148,168],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([50,103,162,82,184,13,244,194,11,172,16,132,4,184,100,153,120,29,182,174,172,120,195,74,232,69,148,227,136,5,42,73], "ketcdf", [108,104,173,44,118,124,35,104,125,243,163,237,7,140,129,54,132,63,29,250,70,65,111,173,139,108,188,193,63,18,51,184],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([82,102,46,33,86,30,6,84,77,251,65,130,138,54,221,145,104,244,148,242,204,251,15,10,41,238,184,205,223,127,43,27], [187,124,194,145,36,134,141,138,100,138,147,50,50,158,13,104,82,62,108,248,108,126,1,159,67,194,217,190,69,172,60,137], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([82,102,46,33,86,30,6,84,77,251,65,130,138,54,221,145,104,244,148,242,204,251,15,10,41,238,184,205,223,127,43,27], [18,149,153,120,13,151,249,101,153,176,39,236,16,99,227,217,200,244,51,43,173,39,71,110,235,11,90,82,73,199,162,19,96], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([145,77,99,153,145,9,83,77,225,77,232,68,226,164,130,85,0,187,251,209,135,96,34,68,153,65,132,119,117,14,207,49], [195,64,145,86,163,187,126,16,142,37,252,240,210,95,155,5,50,62,14,254,112,241,97,53,129,84,26,112,233,240,64,19], [237,15,254,147,110,227,84,175,195,125,190,182,91,68,105,144,244,105,206,161,94,15,94,252,50,161,163,24,108,253,124,29], "5m5pq",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([226,12,252,38,14,63,81,97,140,127,1,3,171,40,40,126,245,252,158,143,238,108,119,195,9,87,202,118,136,136,71,217], [157,218,54,167,240,27,21,90,98,90,172,184,106,65,170,83,116,28,160,180,138,176,234,66,41,94,105,210,91,119,221,157], [225,42,134,198,80,255,104,67,76,180,221,112,134,174,39,13,71,162,10,157,61,172,10,78,226,187,247,127,227,12,112,137], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([69,152,199,41,248,181,56,76,154,170,158,194,197,139,238,241,246,16,41,238,221,17,166,255,118,158,157,153,183,28,234,146], [9,90,151,250,151,39,0,17,81,169,232,208,99,11,66,94,25,4,170,200,49,55,33,211,22,45,84,250,27,210,227,136], [196,180,77,223,63,116,113,129,49,86,94,89,188,159,37,79,233,147,226,8,115,24,133,175,163,155,121,87,3,53,213,23], "5m5pq",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([203,57,28,243,93,238,231,254,133,54,169,1,1,155,131,1,76,61,147,156,54,194,166,184,37,120,45,47,112,120,242,202], [124,100,170,96,128,135,81,4,140,223,35,62,208,2,4,245,187,49,205,97,27,58,195,76,148,61,239,4,215,154,208,118], [133,126,225,144,48,140,112,188,243,214,237,105,205,51,166,132,158,110,182,209,49,175,12,111,254,177,164,35,221,120,70,132], "84fwu",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([242,220,40,184,85,97,139,124,77,5,55,167,47,43,23,137,56,82,226,115,172,66,20,130,42,208,159,253,50,37,100,227], [164,106,213,78,19,42,121,249,250,53,111,103,50,27,113,32,255,114,62,250,116,42,251,169,3,4,116,207,195,181,187,20], [199,105,202,77,29,23,98,246,174,240,19,185,173,12,17,165,167,252,167,33,235,206,230,35,142,29,252,245,139,216,165,1], "4726v",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([211,180,253,38,105,136,17,53,129,100,100,207,181,152,7,127,45,201,188,253,55,95,106,31,10,93,81,92,26,207,35,136], [76,230,26,164,201,13,42,28,241,107,69,174,184,155,203,174,223,32,245,78,106,232,62,131,111,170,111,26,249,233,56,199], [128,180,138,31,200,124,23,123,64,221,152,105,21,139,180,152,232,91,51,110,131,221,4,160,98,251,182,135,192,249,132,78], "803ay5",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([236,173,62,93,1,93,172,233,138,226,170,210,18,79,96,219,234,234,191,133,77,239,236,60,9,242,138,207,24,230,137,223], [194,177,220,156,91,174,53,129,66,199,118,96,220,23,101,99,95,217,232,40,83,18,4,93,97,22,239,132,173,207,187,144], [28,139,179,48,95,58,43,66,62,91,212,80,84,104,248,238,211,134,22,92,195,73,169,141,150,147,7,161,141,225,98,136], "mhmmzs",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([142,56,225,122,211,151,40,186,159,147,136,203,147,42,53,74,203,108,227,3,151,50,122,23,210,133,133,88,110,249,71,109], [158,170,79,222,8,219,228,23,19,6,51,13,112,205,77,166,118,132,202,199,146,15,16,182,125,63,159,5,75,122,240,150], [178,93,10,64,129,164,153,78,46,59,140,192,147,153,9,186,36,4,214,142,244,178,136,180,218,142,137,227,74,36,107,213], "jyad6i",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([212,132,63,90,48,160,74,29,246,163,85,197,222,24,212,6,212,54,214,112,46,6,208,138,240,34,206,245,198,122,194,98], 18, 59, [163,142,31,140,215,233,140,97,165,142,58,205,10,200,150,48,213,9,91,187,188,199,165,155,138,245,111,224,136,58,203,202], 64,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([44,55,3,225,231,55,33,42,168,23,3,146,128,131,77,81,255,226,43,43,87,131,22,184,246,17,111,82,74,162,126,244], 161, [74,114,72,95,165,233,238,217,254,2,113,199,117,47,9,109,70,120,144,196,246,168,155,73,147,89,186,157,237,23,136,150], [246,187,83,153,25,143,116,175,207,48,81,152,155,91,238,142,1,177,176,58,178,24,37,83,240,133,82,71,132,226,219,178],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([118,47,50,214,102,73,243,15,247,40,84,255,187,14,47,8,54,46,244,102,133,79,139,155,162,159,23,1,84,125,50,137], [115,170,83,62,150,255,226,201,232,177,7,159,206,63,187],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([8,168,104,142,178,218,179,80,205,73,55,188,9,125,13,25,228,169,223,175,98,27,172,81,40,108,227,25,41,138,107,168], [172,20,74,64,34,122,85,234,141,201,157,45,53,28,236,215,155,173,232,228,216,143,242,204,214,139,164,207,191,56,184,194,184,68,185,196,143,161,187,187,239,227,35,25,49,69,251,192,198,54,177,31,208,213,195,206,244,90,184,73,203,10,89,44,133],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
