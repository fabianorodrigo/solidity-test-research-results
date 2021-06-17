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
    contractERC721MintableComplete = await ERC721MintableComplete.new("Transaction successfully verified.","Transaction successfully verified.",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("Transaction successfully verified.","Transaction successfully verified.",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("[","Capstones","31sqo",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("[","Capstones","31sqo",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(3,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("0",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Transaction successfully verified.", 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("0", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(27, "\x19Ethereum Signed Message:\n32", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(18, "Capstones", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("[", "31sqo", 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("31sqo", "Capstones", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(87, "31sqo", "\x19Ethereum Signed Message:\n32", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(70, "cr43sa", "Capstones", "0", 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("qpj32e", "L", "31sqo", 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["3rcoep","Capstones","0","0","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(7, "qpj32e", ["Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(70, "\x19Ethereum Signed Message:\n32", ["P","cr43sa","3rcoep","L","P","["], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("L", ["[","mprxf","\x19Ethereum Signed Message:\n32"], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("Capstones", ["gfhr2"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(45, "mprxf", ["["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(49, "L", ["ERC1820_ACCEPT_MAGIC"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["Transaction successfully verified."], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("L", ["\x19Ethereum Signed Message:\n32","si4ooh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(101, "mprxf", ["Transaction successfully verified.","si4ooh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(61, "Capstones", ["cr43sa","Capstones"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("mprxf", ["\x19Ethereum Signed Message:\n32","si4ooh"], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("3mw527", ["3mw527","3rcoep","mprxf"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1023, "[", ["cr43sa","cr43sa","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(56, "si4ooh", ["cr43sa","P","cr43sa"], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("3rcoep", ["3rcoep","31sqo","P"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Transaction successfully verified.", ["L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","gfhr2","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(60, "Transaction successfully verified.", ["L","[","\x19Ethereum Signed Message:\n32","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(1532892063, "Capstones", ["cr43sa","L","ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32"], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("cr43sa", ["ERC1820_ACCEPT_MAGIC","oklu3a","P","cr43sa"], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("gfhr2", ["Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","\x19Ethereum Signed Message:\n32","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(1532892062, "a3skl6", ["si4ooh","0","Capstones","a3skl6","gfhr2"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(129, "mprxf", ["qpj32e","31sqo","cr43sa","a3skl6","Capstones"], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("si4ooh", ["oklu3a","P","si4ooh","\x19Ethereum Signed Message:\n32","a3skl6"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("gfhr2", [[204,40,193,16,130,85,182,2,81,186,172,85,199,105,10,166,119,252,27,20,199,221,121,28,154,2,196,135,128,57,120,41],[135,144,144,143,198,54,132,154,219,145,52,175,4,74,112,242,145,254,200,1,183,102,174,77,88,238,44,96,166,94,11,32],[98,203,108,67,154,103,245,129,102,249,252,165,227,103,77,130,3,86,67,122,21,254,191,183,197,202,46,121,82,136,3,125]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(10, "31sqo", [[119,139,240,243,125,169,191,20,2,185,172,111,57,224,8,122,26,148,31,134,150,250,236,98,5,82,251,60,251,139,128,196],[153,20,110,19,197,91,196,85,220,90,115,158,162,58,19,178,65,163,71,89,83,125,134,179,229,44,92,1,154,44,223,116],[41,152,190,11,0,190,179,159,142,77,66,126,30,226,166,250,167,162,9,104,77,163,97,181,222,164,149,220,125,170,165,79],[77,141,116,126,255,16,116,119,177,187,230,93,53,9,173,208,104,82,26,179,35,175,23,227,119,145,229,147,182,5,215,218],[229,103,120,54,30,174,91,217,211,106,47,39,254,25,195,191,169,9,139,152,74,116,92,130,115,110,209,104,142,154,80,244]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(64, "3mw527", [[76,164,149,93,222,101,109,86,39,203,241,252,71,160,214,45,103,237,35,109,208,36,82,121,145,183,255,143,124,102,161,81],[17,116,62,80,118,114,49,190,120,201,245,130,13,51,13,165,129,236,253,45,189,114,196,35,122,117,24,77,72,198,186,204],[65,82,10,225,183,2,135,137,187,200,38,172,31,239,245,58,214,63,179,203,150,53,121,34,11,227,142,214,138,120,29,112],[189,118,134,164,197,65,193,73,210,119,169,230,212,95,130,236,120,120,10,17,252,187,35,178,71,236,57,154,105,62,114,12],[78,233,224,163,133,178,212,13,97,153,102,18,135,8,55,213,14,216,178,223,100,214,162,108,131,48,0,163,204,220,33,33],[68,248,120,198,140,234,175,245,169,198,28,102,89,204,245,132,87,36,76,97,169,90,254,190,255,44,28,109,99,4,238,108],[73,91,167,122,162,207,169,148,156,145,194,196,51,158,228,210,47,137,141,212,78,200,168,171,114,103,251,156,82,254,79,52]], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("[", [[241,39,48,174,250,191,172,114,201,233,110,50,127,215,82,84,14,43,5,86,158,209,158,41,125,42,197,232,131,193,214,221],[207,71,223,31,83,18,56,124,251,179,184,173,141,58,106,81,241,237,177,66,34,194,177,135,54,207,80,87,82,46,50,91],[14,185,125,51,141,152,156,217,164,228,198,207,139,68,171,166,74,15,166,107,105,175,158,170,188,218,202,228,253,171,10,235],[170,95,224,226,80,73,175,209,124,71,194,96,65,81,163,6,254,39,19,224,27,187,214,170,217,167,160,180,74,219,118,124]], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("a3skl6", [[160,188,70,28,62,114,164,90,243,122,157,95,137,144,71,52,191,205,214,65,184,85,124,68,78,6,43,199,42,137,105,253]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(24, "3mw527", [[138,161,194,167,136,154,240,168,226,31,207,42,162,10,72,63,142,246,249,236,104,209,188,191,51,75,238,37,240,33,143,19]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(30, "Capstones", [[35,246,33,0,89,185,44,135,217,41,64,234,115,10,4,248,159,181,108,174,135,86,91,247,104,83,125,130,83,14,241,66]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("oklu3a", [[111,177,247,157,94,185,190,220,132,171,99,54,248,231,212,235,173,76,174,220,117,175,55,77,28,254,223,116,95,86,145,126]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("P", [[138,164,62,128,80,52,77,73,209,249,44,234,137,206,4,224,198,43,124,50,160,82,148,129,8,137,109,79,190,103,6,188],[246,216,230,236,9,38,170,99,92,13,20,243,211,52,208,101,223,210,216,203,116,12,17,154,241,231,99,120,54,174,25,187]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(69, "[", [[200,65,165,232,238,82,194,150,20,65,243,46,239,138,111,61,31,36,138,153,199,5,156,42,54,93,46,152,117,158,238,176],[132,149,183,23,207,91,122,147,33,141,91,6,6,126,226,6,228,217,68,58,112,7,124,8,98,233,229,16,32,167,88,25]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(57, "cr43sa", [[235,19,151,26,88,251,232,233,255,173,76,232,140,168,190,77,149,103,189,117,225,30,106,146,157,37,49,225,198,77,91,54],[177,221,211,119,126,5,69,172,106,96,230,239,24,76,196,25,140,212,74,109,8,148,179,42,116,115,157,52,59,211,196,227]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("[", [[95,86,55,166,195,201,180,87,215,195,52,47,139,217,63,15,45,141,46,162,122,78,122,23,125,116,208,141,42,68,42,17],[161,64,41,4,78,83,18,198,143,62,242,125,83,51,209,163,175,185,151,165,35,155,134,227,129,132,104,53,87,7,47,253]], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("Capstones", [[68,183,253,161,43,74,230,38,173,178,156,234,93,83,133,49,204,16,87,209,82,29,123,54,96,228,55,84,116,139,93,9],[1,78,3,4,153,17,0,118,6,37,230,244,6,210,218,192,98,68,191,76,114,73,32,85,3,217,93,96,6,92,199,166],[253,66,96,199,173,180,64,113,47,167,93,202,32,76,173,152,146,210,103,5,13,242,39,247,113,253,182,142,43,241,101,3]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(56, "3rcoep", [[213,212,38,78,144,168,233,133,241,13,14,223,40,118,181,76,9,168,227,142,215,34,94,238,117,10,222,108,3,161,246,8],[176,202,40,18,151,29,110,241,83,26,150,169,71,88,106,217,113,13,13,55,45,142,126,171,76,32,73,4,226,214,114,241],[26,250,59,26,229,86,216,198,87,62,14,134,6,129,86,92,59,163,112,43,186,30,238,127,23,232,179,88,28,15,114,241]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(48, "0", [[218,39,99,131,43,96,132,62,11,118,31,16,150,1,105,71,63,37,233,11,23,180,160,86,198,80,96,247,45,147,174,46],[0,90,118,191,252,188,145,8,198,154,85,10,207,179,156,173,65,149,70,1,13,48,183,207,162,147,106,119,22,190,91,112],[211,66,236,71,1,50,1,253,16,198,87,208,77,111,130,231,74,203,138,81,67,3,225,189,44,234,207,91,6,86,158,57]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[22,88,117,111,91,190,21,81,18,210,110,139,77,192,152,222,5,102,168,109,20,26,241,64,90,191,196,123,108,157,62,157],[37,183,253,75,54,110,86,27,148,129,111,129,16,183,17,188,84,218,195,214,94,218,226,242,170,138,83,25,92,222,55,154],[241,253,58,109,101,12,151,55,149,121,227,56,122,246,144,190,74,86,190,126,138,53,126,149,90,230,125,29,164,128,157,116]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("[", [[168,156,177,227,105,217,67,69,183,83,171,130,243,253,251,162,97,4,217,207,207,0,238,61,66,62,184,228,192,187,229,184],[158,60,193,157,178,175,182,5,190,157,99,223,136,59,105,55,176,58,164,206,180,59,15,49,230,112,70,192,73,76,59,24],[136,30,216,210,196,45,221,53,74,11,237,65,20,232,214,165,10,133,162,96,65,42,162,138,118,16,74,195,119,229,114,229],[170,236,134,118,101,216,8,117,14,233,219,176,109,178,21,3,69,147,119,132,106,77,139,179,26,194,237,220,246,180,49,89]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(98, "31sqo", [[57,118,56,34,51,140,212,170,48,120,195,92,226,203,41,71,21,139,255,201,31,151,151,138,158,105,157,133,214,113,200,165],[216,29,111,222,131,106,168,152,195,61,28,135,0,246,159,16,184,225,76,147,35,45,238,43,33,136,173,28,181,15,24,72],[219,32,165,240,115,211,25,63,180,110,220,250,211,199,195,147,36,193,149,220,4,149,86,42,160,1,118,255,252,122,30,124],[118,53,129,41,238,5,48,20,83,194,54,89,152,146,65,38,114,219,179,249,245,22,102,127,242,39,19,43,22,95,208,138]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(160, "P", [[132,96,147,10,221,161,209,6,217,137,119,132,43,19,84,121,202,14,73,49,141,199,35,20,69,149,2,106,220,100,121,38],[68,9,182,95,203,238,217,19,147,41,124,165,71,137,200,85,69,197,112,25,125,142,142,29,199,22,76,23,109,62,223,162],[206,96,229,149,214,197,233,203,85,239,75,194,104,145,45,69,243,175,238,53,169,36,198,55,210,48,140,79,93,151,65,80],[21,34,79,161,152,222,93,184,235,254,188,68,239,13,233,55,99,210,243,232,86,79,49,207,148,143,228,78,224,221,12,199]], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("gfhr2", [[190,2,49,113,67,138,38,35,160,6,51,216,236,137,176,199,101,205,167,214,167,65,164,189,62,149,14,238,23,43,98,209],[57,24,139,161,37,235,137,109,235,52,195,114,241,228,41,234,58,75,192,128,177,195,206,139,202,6,188,232,140,73,58,186],[59,68,73,25,165,229,125,244,194,171,69,140,242,245,53,63,251,14,48,71,47,253,90,249,98,251,245,131,211,25,222,69],[170,116,104,80,198,59,81,164,237,96,170,176,44,51,163,155,67,51,72,7,245,255,150,197,115,111,160,200,85,196,229,218]], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("P", [[195,234,175,142,221,91,200,57,231,102,93,168,143,1,176,34,30,181,166,161,40,127,80,194,120,118,39,120,168,64,225,124],[230,254,218,67,175,41,104,206,133,186,107,33,50,110,83,106,17,81,113,102,152,100,220,254,196,221,143,10,99,120,50,105],[12,171,45,53,163,80,5,222,112,1,237,18,94,41,32,240,250,87,173,80,162,238,224,135,144,93,152,160,164,158,136,220],[50,135,206,225,7,42,203,214,156,212,12,76,97,50,77,235,42,132,110,235,29,148,236,83,252,146,7,160,134,104,183,204],[74,17,194,187,254,111,111,209,141,218,209,135,251,223,161,135,173,146,177,224,169,248,105,144,80,66,247,67,161,66,127,225]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(66, "L", [[92,197,127,34,234,227,111,105,24,254,52,4,158,159,244,44,159,37,9,133,128,161,3,143,198,102,219,218,255,78,14,78],[185,220,35,191,30,158,242,219,177,2,120,208,196,196,22,112,124,103,215,249,208,84,242,90,23,222,66,14,254,117,17,185],[201,226,228,11,58,201,221,22,194,35,225,123,254,141,188,27,71,56,247,216,32,246,78,115,59,225,134,134,65,199,210,53],[11,63,200,41,34,233,73,109,144,211,116,163,152,36,140,52,219,74,226,217,93,74,145,114,155,152,199,237,120,51,79,41],[41,109,212,109,221,220,19,229,190,54,125,248,109,99,9,148,150,52,144,234,146,23,99,241,33,255,232,171,123,205,108,241]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(17, "L", [[198,51,34,108,177,38,200,114,25,80,143,227,137,242,39,97,2,226,29,27,80,33,164,163,2,36,217,96,201,155,185,172],[9,229,148,131,116,146,221,59,202,192,43,82,94,162,113,4,32,117,100,114,85,156,152,123,81,124,91,200,204,76,174,157],[212,117,216,125,128,19,250,103,135,110,67,95,85,71,50,114,45,252,117,47,38,44,128,223,146,128,58,188,209,155,95,154],[167,102,147,205,140,114,254,241,30,134,170,48,104,236,200,81,99,45,243,115,149,30,210,209,52,192,173,43,91,99,30,122],[152,246,221,200,58,55,194,164,41,224,180,227,46,157,2,222,46,147,220,152,40,53,63,34,192,244,187,158,171,155,143,98]], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("31sqo", [[58,189,229,40,144,167,211,14,182,205,73,181,129,97,176,167,162,35,155,217,187,165,18,7,38,172,216,243,127,211,81,55],[77,143,66,63,167,94,217,29,215,214,155,248,246,77,165,11,135,154,195,48,136,169,191,179,183,167,211,116,170,202,76,175],[40,224,212,79,150,174,217,226,215,89,115,64,208,6,11,237,107,20,79,11,204,66,49,188,5,178,155,235,5,54,195,241],[59,20,138,181,5,125,17,170,68,185,144,212,246,236,240,196,229,178,6,34,198,219,146,9,235,233,233,129,211,12,3,129],[28,111,220,129,97,174,225,177,46,48,184,98,186,70,57,107,80,129,110,112,97,74,87,56,242,15,199,109,138,133,196,209]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([166],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[3],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(95,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("si4ooh",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("31sqo", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("si4ooh", "[",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("a3skl6", "Capstones",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "si4ooh", "e4ndgt",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("gfhr2", "31sqo", "0", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("e4ndgt", "ERC1820_ACCEPT_MAGIC", "qpj32e", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "0",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Transaction successfully verified.", 24,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("oklu3a", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("oklu3a",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("qpj32e", 98,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("cr43sa", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(27,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["31sqo","oklu3a","0","a3skl6","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[52,220,4,219,172,124,175,174,45,79,174,38,142,70,233,3,145,253,53,184,48,173,9,144,178,38,19,215,195,100,72,212],[240,147,211,245,51,126,164,239,182,224,6,118,191,177,218,162,103,252,137,178,168,23,56,88,142,125,88,71,114,30,27,5],[242,229,43,107,196,85,161,116,13,35,47,173,13,200,142,184,125,211,151,181,145,38,44,219,2,174,142,242,215,176,40,237],[217,244,105,157,242,15,174,237,113,49,58,173,176,36,19,238,223,158,221,129,161,90,161,132,78,87,216,49,39,39,12,233],[240,170,79,66,57,226,10,102,36,94,54,100,101,175,74,81,58,118,102,76,246,232,118,241,232,250,11,122,120,110,231,158]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(61, 1023, 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([170,31,240,61,108,249,253,113,140,85,107,103,160,37,216,110,58,100,154,188,152,186,161,115,93,79,112,192,45,188,90,9], [172,215,17,202,206,30,234,184,237,184,122,227,155,39,74,220,67,188,64,80,109,79,139,13,182,201,173,161,161,192,223,75],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([180,246,233,202,186,47,39,234,125,215,37,130,133,222,124,45,184,31,19,37,91,12,12,58,26,5,50,126,239,132,123,24], [146,232,110,80,255,199,251,8,46,188,249,233,111,77,183,64,101,138,131,75,140,25,11,143,184,86,122,0,189,175,197,124], [188,61,187,58,47,198,137,95,238,79,33,182,132,86,7,47,251,12,214,189,22,210,85,248,205,1,161,38,243,39,212,153],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([112,203,67,83,17,180,89,185,29,164,30,85,77,213,87,40,82,212,246,35,58,55,98,39,118,61,117,160,215,57,250,247], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([164,105,27,47,33,170,245,144,253,254,34,165,41,170,28,11,240,224,161,45,189,85,28,133,71,230,80,235,48,200,108,133], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([251,66,246,232,121,74,104,166,16,167,170,19,23,117,6,89,3,229,50,182,230,138,88,252,65,11,9,69,104,9,96,96], "\x19Ethereum Signed Message:\n32", [38,97,100,99,182,248,213,205,153,77,221,64,130,196,218,235,135,106,183,165,170,238,64,253,91,75,140,226,37,49,78,227],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([83,151,228,170,48,186,38,156,225,190,152,229,218,92,213,106,201,137,167,206,180,212,235,117,81,168,253,217,52,7,39,23], "Capstones", [246,150,101,251,106,9,220,109,32,180,69,45,211,253,227,155,26,153,33,0,5,24,221,54,195,102,211,176,89,5,15,134],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([72,217,209,166,51,182,66,59,6,191,133,34,29,96,183,90,180,145,204,141,170,94,9,255,119,205,21,212,76,234,13,59], [76,50,63,70,200,76,42,67,191,45,157,254,216,89,51,201,187,239,233,210,11,101,28,207,127,32,218,216,93,253,178,194], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([72,217,209,166,51,182,66,59,6,191,133,34,29,96,183,90,180,145,204,141,170,94,9,255,119,205,21,212,76,234,13,59], [101,21,128,82,158,29,34,80,50,63,177,177,114,226,219,214,254,70,173,247,102,113,58,170,71,52,8,146,133,220,235,15,185], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([58,50,7,11,45,185,99,59,47,82,10,135,243,189,195,179,23,236,233,217,135,29,87,131,36,225,239,103,229,183,246,217], [138,187,134,165,84,237,187,246,168,242,0,55,192,190,13,180,205,83,235,32,56,255,65,124,33,208,86,185,36,185,138,178], [217,237,247,211,204,145,24,131,11,30,12,253,198,75,124,90,229,14,248,114,178,133,53,227,106,152,59,20,159,126,185,85], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([153,228,14,139,66,233,227,232,238,179,210,124,138,96,253,42,103,247,178,252,62,224,211,217,74,101,7,101,73,215,124,175], [114,45,188,224,246,184,63,72,199,1,167,113,77,201,171,249,199,7,55,49,109,97,126,225,57,122,22,171,205,204,138,177], [169,192,32,248,19,10,78,253,207,194,177,142,178,173,170,91,59,55,227,60,55,193,246,252,82,116,222,153,189,166,49,105], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([189,243,113,40,188,192,222,109,181,187,175,155,152,73,174,137,115,156,250,68,81,129,179,63,76,129,40,156,7,202,203,23], [120,25,30,94,193,24,173,25,18,172,29,138,222,152,232,24,113,105,235,216,124,196,98,84,196,3,13,84,42,139,13,156], [136,195,19,170,175,164,175,235,139,77,125,108,113,111,137,172,89,10,62,255,84,230,101,233,110,166,165,94,129,206,18,183], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([173,22,94,250,182,84,117,169,178,218,87,60,162,134,241,129,213,236,155,120,53,14,154,73,103,32,236,147,6,5,183,28], [124,49,202,188,48,224,232,168,250,44,96,195,169,175,118,68,192,17,192,77,28,45,170,48,198,191,74,36,89,201,199,248], [167,170,132,163,168,168,224,188,252,163,240,249,110,54,58,180,179,71,101,234,71,120,243,250,98,200,21,165,27,198,49,71], "a3skl6",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([150,194,5,3,63,116,46,209,90,54,234,75,139,138,89,65,44,244,20,49,2,5,7,197,77,126,199,213,176,143,202,215], [38,134,29,97,85,130,136,100,196,38,232,52,180,206,204,193,68,27,172,255,174,219,127,133,202,248,236,124,60,134,22,90], [198,255,46,82,157,100,148,134,107,4,40,12,220,64,249,218,88,214,175,227,36,197,139,146,104,136,120,228,39,101,118,164], "si4ooh",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([96,148,178,208,61,200,156,155,201,113,56,28,40,242,27,104,159,149,145,140,228,174,69,116,161,113,98,223,132,229,134,16], [41,79,237,142,49,52,178,213,47,130,132,98,137,168,246,235,159,118,2,48,234,120,117,28,235,211,186,146,91,75,37,43], [254,63,111,126,221,112,177,221,215,170,239,171,197,130,38,128,247,164,138,153,32,146,50,85,233,47,48,39,92,246,172,208], "qpj32e",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([197,25,211,117,50,20,151,207,74,153,213,164,241,235,147,133,26,96,103,217,138,80,156,223,189,30,9,147,153,114,168,213], [199,209,218,67,24,9,8,239,232,98,7,0,59,111,38,149,18,239,128,3,0,183,167,234,26,170,43,114,173,200,253,51], [124,47,255,30,111,45,125,204,119,98,55,7,170,253,70,104,184,169,150,73,190,105,72,0,113,6,27,73,77,160,205,193], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([129,237,169,244,4,183,92,30,132,18,144,188,60,10,227,175,114,157,89,221,23,28,66,77,214,66,0,112,164,166,96,219], [126,35,104,239,92,57,49,160,86,29,255,143,203,6,174,10,12,117,188,178,238,31,172,254,104,28,25,220,103,97,102,140], [111,185,133,28,21,165,39,165,34,213,101,205,29,18,223,151,252,120,239,37,160,15,241,72,207,201,113,27,163,212,205,94], "gfhr2",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([71,96,28,16,227,92,51,109,209,188,175,52,113,197,59,171,63,96,121,133,177,111,9,208,174,224,245,250,55,4,153,149], 95, 57, [132,171,85,26,189,222,31,77,57,76,31,70,31,251,229,222,243,169,122,37,112,69,110,211,160,43,216,28,193,114,94,233], 1024,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([62,0,77,229,193,111,135,193,139,34,60,141,152,198,123,158,165,81,211,251,19,200,26,15,5,55,139,106,120,64,156,176], 22, [187,73,212,65,92,98,79,35,168,12,21,163,91,250,123,198,35,12,33,66,28,59,223,187,126,34,6,168,78,1,200,233], [215,157,125,131,187,46,180,196,17,162,14,226,236,250,213,72,152,130,146,122,56,24,224,74,46,157,211,234,47,34,181,27],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([13,245,243,161,44,147,194,140,190,25,183,76,34,199,224,254,103,186,233,254,97,163,206,220,186,31,110,70,241,85,120,107], [216,94,141,16,102,115,235,187,20,106,236,26,116,36,238,18,116,148,223,237,200],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([217,154,172,50,58,27,78,28,212,198,40,169,167,218,69,156,51,217,216,163,248,138,60,42,248,241,167,85,49,255,243,20], [132,146,126,121,57,155,131,65,129,103,165,169,211,186,54,77,203,83,72,243,208,32,202,239,50,247,230,244,23,189,55,5,211,219,151,68,22,90,149,16,248,236,171,160,52,129,161,166,0,203,202,228,80,7,232,140,98,235,191,103,146,122,59,199,150],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
