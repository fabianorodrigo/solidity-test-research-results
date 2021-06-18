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
    contractERC721MintableComplete = await ERC721MintableComplete.new("ka3dp","0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("ka3dp","0",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("ka3dp","ka3dp","\x19Ethereum Signed Message:\n32",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("ka3dp","ka3dp","\x19Ethereum Signed Message:\n32",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(255,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("L", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(97, "Capstones", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1025, "L", "bz25ct", 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("ERC1820_ACCEPT_MAGIC", "[", 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "ik16el", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(2014223715, "[", "bz25ct", "bz25ct",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(3, "[", "ka3dp", "\x19Ethereum Signed Message:\n32", 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("aki1xzh", "[", "aki1xzh", 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["P","ka3dp","aki1xzh","ka3dp","ka3dp","bz25ct"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(25, "h63uk8", ["h63uk8","ik16el","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(129, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","h63uk8","7potks"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("0", ["bz25ct","Transaction successfully verified.","aki1xzh","0","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","bz25ct"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("aki1xzh", ["bz25ct"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(64, "Capstones", ["aki1xzh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(10, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["ERC1820_ACCEPT_MAGIC"], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("bz25ct", ["0"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("L", ["Transaction successfully verified.","ka3dp"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(254, "Transaction successfully verified.", ["Capstones","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(87, "Capstones", ["Transaction successfully verified.","0"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("\x19Ethereum Signed Message:\n32", ["ka3dp","\x19Ethereum Signed Message:\n32"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("7potks", ["0","7potks","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(10, "aki1xzh", ["Transaction successfully verified.","L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(59, "ERC1820_ACCEPT_MAGIC", ["h63uk8","bz25ct","0"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("\x19Ethereum Signed Message:\n32", ["7potks","[","0"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("dbumyo", ["bz25ct","L","[","xlhdw5"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(97, "[", ["h63uk8","h63uk8","L","ka3dp"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(64, "ERC1820_ACCEPT_MAGIC", ["h63uk8","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","2rkj83","7potks"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("7potks", ["ka3dp","Transaction successfully verified.","bz25ct","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("aki1xzh", ["dbumyo","7potks","\x19Ethereum Signed Message:\n32","L","aki1xzh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(0, "Capstones", ["ka3dp","\x19Ethereum Signed Message:\n32","dbumyo","Transaction successfully verified.","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(199999, "[", ["Transaction successfully verified.","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","h63uk8","nulhfk"], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("0", ["ik16el","nulhfk","P","L","L"], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("Capstones", [[33,189,170,133,130,133,103,36,126,24,49,151,240,57,232,247,149,216,108,179,221,145,226,48,132,46,201,38,167,177,105,26],[10,109,164,195,73,169,32,76,21,155,196,135,110,163,250,161,204,55,154,200,176,117,234,19,35,62,233,203,188,49,20,97],[172,146,143,90,213,154,101,70,183,221,60,145,103,157,244,248,170,181,77,173,156,154,216,18,42,218,175,123,183,147,191,135],[116,127,76,129,125,229,27,140,209,146,56,7,251,178,49,105,70,67,156,83,191,84,65,93,151,185,51,49,26,1,243,172],[60,151,177,233,66,168,115,185,191,59,94,162,86,198,16,128,50,86,81,254,211,98,119,163,162,248,122,90,148,190,226,245],[26,207,155,14,146,240,167,194,93,157,25,103,182,207,54,25,159,249,230,96,201,43,68,121,32,247,188,190,219,198,52,55],[255,211,64,49,185,101,67,198,37,121,57,180,7,245,25,124,104,189,79,38,244,128,52,15,14,13,2,146,137,70,181,6]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(2014223716, "P", [[39,165,196,52,144,183,250,211,137,139,100,14,212,76,72,177,201,192,104,126,58,116,200,228,189,123,25,130,121,131,46,91],[166,24,120,139,76,184,225,162,56,80,118,187,124,130,157,161,80,134,161,154,237,51,178,168,36,251,226,164,165,0,89,137],[142,206,137,226,237,250,10,159,81,98,35,121,150,209,106,118,56,213,46,123,99,150,245,143,60,163,72,236,223,170,189,65],[3,143,86,52,167,140,239,233,241,126,99,1,57,134,123,194,163,37,188,204,116,121,186,127,70,204,172,123,175,226,86,202],[7,94,153,159,35,54,141,141,240,39,227,224,194,223,254,177,131,33,90,120,166,239,83,86,252,157,10,142,98,142,128,223],[116,187,33,12,221,9,2,56,221,88,66,150,96,102,29,233,110,121,57,61,82,42,188,229,138,116,132,82,91,21,119,119],[115,179,224,80,140,84,192,225,183,161,167,197,53,193,116,163,244,7,52,230,26,16,54,234,123,217,20,120,22,120,94,6],[169,36,169,130,20,114,81,123,176,171,211,21,157,219,191,102,125,170,24,88,81,144,37,82,54,219,254,38,54,125,148,85]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(24, "[", [[100,205,111,18,26,155,77,88,82,152,245,153,57,89,6,22,212,127,80,12,203,153,11,27,169,34,14,147,190,242,207,84],[189,115,100,63,48,100,120,248,46,116,133,30,67,18,39,68,150,48,32,238,230,233,170,169,248,72,154,172,71,164,19,163],[199,145,103,222,199,223,136,151,209,25,54,9,118,31,136,58,28,49,126,107,63,11,63,231,162,181,210,11,27,158,255,191],[106,188,215,101,25,63,157,233,20,179,154,99,60,134,113,114,163,211,153,219,251,80,148,21,161,36,142,159,196,8,99,37],[136,72,202,136,57,192,101,47,219,205,126,200,200,130,116,78,22,245,222,83,164,93,88,152,206,37,168,237,13,159,183,8],[2,68,135,121,146,7,218,133,53,78,239,70,44,255,135,68,244,109,73,220,115,143,236,32,98,5,183,122,239,122,109,6],[229,173,42,230,141,125,125,89,192,11,28,17,7,154,251,187,90,130,124,232,27,70,149,146,158,204,163,80,46,52,121,202]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("[", [[53,65,98,241,131,48,227,68,12,41,9,19,81,253,37,108,250,214,205,187,47,112,167,210,126,255,125,128,179,187,41,232],[107,21,66,106,40,104,39,44,202,20,162,200,105,78,77,229,178,129,176,230,100,119,119,192,19,81,31,210,64,190,121,186]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("L", [[0,57,193,2,46,39,153,146,251,69,129,28,88,231,209,51,140,62,151,237,154,178,117,149,187,22,27,125,47,29,51,23]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(160, "L", [[121,161,36,236,219,151,82,43,36,48,95,116,248,211,243,90,136,139,230,63,77,55,94,119,17,79,21,77,135,109,14,36]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(98, "[", [[113,26,29,216,222,193,99,120,40,241,237,12,15,143,111,111,35,54,134,115,54,193,220,9,155,40,176,15,165,32,189,130]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("0", [[26,54,55,119,137,196,191,195,78,7,107,110,94,113,160,20,153,130,77,82,246,254,74,23,29,119,212,200,252,1,155,233]], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("2rkj83", [[159,181,244,89,118,162,52,224,185,166,168,190,239,199,231,16,71,74,13,91,138,99,158,239,94,13,203,199,82,45,103,166],[237,202,229,16,237,222,85,186,223,102,167,31,67,15,50,47,8,19,85,57,177,232,156,246,31,173,108,255,136,3,114,73]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(2, "0", [[198,110,2,24,100,17,179,84,219,98,138,56,197,248,227,239,141,158,134,118,184,73,60,90,19,152,208,136,96,26,226,137],[11,70,13,47,164,92,82,6,98,76,170,20,61,169,216,235,151,133,184,185,226,231,3,125,224,183,140,159,38,58,52,236]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(49, "dbumyo", [[191,241,58,193,129,107,184,250,252,157,248,16,248,222,0,5,190,253,210,227,76,225,113,48,167,183,253,66,56,4,97,111],[145,171,156,220,69,186,184,111,251,176,88,169,70,244,246,197,238,175,68,14,58,135,255,127,44,210,211,82,70,205,200,174]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("xlhdw5", [[207,12,117,72,50,138,203,125,7,173,109,105,252,203,27,199,151,104,168,13,188,141,62,104,96,13,126,56,206,249,81,27],[175,43,150,53,144,194,131,129,137,39,220,66,182,61,181,73,17,146,175,71,218,172,227,222,12,106,91,130,161,62,115,16]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("dbumyo", [[9,52,118,163,16,192,96,110,166,134,210,139,55,70,67,149,139,253,1,186,131,234,42,26,92,222,69,73,101,115,157,113],[21,92,188,205,182,119,111,10,64,101,31,134,79,4,116,164,80,239,108,220,75,169,207,49,229,37,2,102,117,56,35,46],[42,74,142,158,29,181,8,40,209,100,57,21,70,76,143,173,88,182,74,0,54,241,157,139,49,167,53,249,219,0,146,45]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(102, "aki1xzh", [[225,70,117,36,67,114,168,222,95,241,76,11,123,118,21,76,16,169,177,227,87,225,72,116,162,153,35,78,89,211,5,98],[171,250,156,2,133,191,200,131,148,58,19,105,154,185,179,130,100,17,5,103,193,194,111,32,44,183,30,49,145,55,253,110],[126,0,255,191,42,244,222,116,79,48,48,98,175,12,152,83,169,41,23,247,56,96,46,16,60,167,111,182,4,0,197,184]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(101, "Capstones", [[219,107,205,139,247,82,56,140,29,163,140,184,119,80,119,18,153,203,131,46,134,68,228,238,75,108,199,222,148,64,252,33],[142,179,129,96,20,138,195,109,95,138,225,92,173,146,216,153,25,174,57,132,222,66,109,4,4,14,101,128,12,237,213,42],[144,229,26,141,68,189,166,171,145,119,213,243,168,27,241,219,102,139,188,14,142,100,2,9,243,65,185,50,143,97,56,106]], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("h63uk8", [[168,77,202,136,208,253,49,206,193,38,0,30,186,241,81,96,139,179,44,121,11,4,29,54,156,53,212,49,133,184,67,96],[94,45,21,9,236,130,247,118,141,161,67,31,180,219,213,61,33,237,99,81,68,57,128,147,242,58,34,104,8,30,121,23],[196,18,79,68,10,245,78,32,12,168,178,23,170,209,109,13,121,156,247,145,22,115,125,23,149,5,227,184,199,13,117,209]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("Capstones", [[163,146,248,106,79,125,43,241,195,68,240,164,27,102,157,55,166,168,94,66,82,78,63,196,53,178,58,5,209,191,203,238],[13,162,179,153,234,91,195,32,68,161,220,203,220,29,106,184,194,233,136,103,170,149,239,198,43,5,236,205,192,23,220,1],[10,2,14,223,237,0,135,131,227,123,61,88,51,234,22,139,129,168,249,88,195,120,20,101,107,246,143,219,89,126,185,219],[16,99,71,246,2,227,172,217,79,120,10,108,60,34,244,239,107,120,143,72,6,55,125,140,209,222,105,62,26,205,246,225]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(11, "\x19Ethereum Signed Message:\n32", [[48,105,79,113,176,207,187,194,97,234,207,210,76,173,214,244,163,199,205,118,56,162,218,31,32,199,145,78,144,28,171,232],[94,36,160,192,22,200,9,251,235,4,47,191,166,93,9,34,106,203,13,78,237,11,127,151,152,238,85,212,159,252,104,228],[60,68,114,135,168,96,51,236,201,244,40,97,136,203,76,136,77,122,74,180,68,47,240,145,245,215,8,39,189,22,60,134],[84,81,45,142,17,51,173,200,121,105,54,226,0,53,174,252,40,156,189,188,131,152,100,74,102,151,109,113,144,175,136,166]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(129, "aki1xzh", [[0,87,214,99,195,48,15,77,244,85,195,247,28,171,248,74,26,81,35,108,159,144,91,84,50,80,94,175,193,147,64,233],[252,153,48,167,197,243,96,165,105,181,247,171,236,51,139,102,6,223,242,215,190,25,116,129,242,63,86,31,42,27,135,74],[51,154,13,175,234,253,175,146,1,225,80,134,113,112,233,121,213,203,219,191,242,21,187,176,80,237,159,79,19,15,150,108],[236,92,93,69,244,75,159,51,206,244,52,95,25,218,190,17,191,109,62,190,2,211,228,141,110,10,47,214,127,84,133,4]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("bz25ct", [[64,191,60,92,135,161,151,169,141,0,84,183,194,124,223,44,208,239,96,19,74,59,226,126,28,165,203,20,251,213,22,131],[173,140,100,96,179,213,109,237,127,103,90,89,169,50,193,216,244,180,31,207,86,70,44,26,112,180,123,31,55,35,153,71],[204,168,195,56,220,109,225,124,229,199,188,96,165,233,126,214,147,156,43,130,153,7,70,21,64,22,248,204,86,84,66,144],[220,73,193,48,7,86,38,237,164,243,52,253,197,251,19,232,35,107,203,76,80,49,177,202,69,222,46,172,159,19,41,124]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("P", [[203,129,103,16,9,115,252,95,40,118,119,195,196,249,221,88,173,45,92,141,183,120,212,233,91,140,157,135,103,68,102,243],[108,0,151,2,51,4,0,48,124,243,153,43,23,140,67,41,252,173,192,155,215,80,96,159,196,23,52,77,1,125,178,173],[130,39,19,204,53,63,169,182,135,79,27,63,217,243,153,34,212,13,86,189,110,85,171,236,180,8,195,105,29,86,167,20],[100,185,14,66,194,164,218,240,44,214,126,201,103,226,170,4,33,107,17,136,49,21,131,242,5,252,15,54,172,75,153,161],[45,110,191,254,102,11,73,31,145,2,203,111,101,139,164,162,230,102,112,212,0,57,145,244,63,84,206,3,228,54,121,232]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(45, "0", [[177,227,202,27,154,100,102,102,234,107,202,14,58,194,182,60,124,63,38,226,176,34,252,48,249,171,248,132,35,95,254,33],[202,207,8,215,91,133,196,180,33,75,59,163,144,107,231,74,252,204,44,61,100,74,28,142,9,41,137,148,165,129,121,28],[248,197,159,220,48,170,47,209,194,53,97,185,23,63,140,115,62,2,11,52,201,59,20,141,181,66,66,7,67,121,98,36],[165,140,13,170,98,60,84,180,43,39,210,255,161,63,86,26,40,171,151,208,51,135,221,222,13,141,249,120,251,123,232,9],[103,247,179,254,128,40,158,4,157,255,39,36,113,17,68,9,169,233,113,112,98,174,88,132,173,75,115,230,169,165,114,78]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(27, "ka3dp", [[213,222,31,77,100,252,220,241,249,123,111,231,120,185,15,39,55,220,245,225,115,0,65,15,56,138,249,241,105,83,29,250],[240,20,161,228,171,195,46,229,6,184,59,59,214,15,190,173,21,83,141,206,57,75,221,172,69,61,42,203,245,177,133,19],[172,222,162,15,169,119,27,32,253,191,98,30,88,73,51,76,240,255,79,56,105,76,150,146,241,154,136,142,64,210,193,213],[145,95,174,15,68,215,254,161,172,66,48,11,5,228,52,198,150,47,21,248,157,64,207,95,122,182,229,78,127,203,231,242],[101,146,81,15,211,42,230,54,44,100,150,135,30,142,32,187,221,88,185,27,241,188,3,120,6,21,4,224,9,233,160,141]], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("2rkj83", [[3,190,230,164,126,72,122,222,88,129,236,34,48,219,79,83,112,5,179,162,163,166,245,84,197,139,210,247,132,181,7,85],[225,26,200,79,223,105,1,41,144,163,200,243,161,10,20,28,178,56,164,255,144,164,88,222,237,244,169,193,206,160,6,112],[215,105,40,251,224,65,27,179,243,92,82,30,197,44,28,15,40,159,6,195,211,238,156,39,40,3,224,107,69,203,19,87],[183,100,51,45,175,131,58,232,207,207,57,138,91,43,224,99,98,82,15,184,187,118,101,201,101,212,48,132,35,33,101,80],[172,181,160,187,192,197,232,194,15,236,201,224,244,62,96,249,62,123,218,250,227,180,17,22,226,103,234,23,109,241,225,88]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([30],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[2],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(24,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("2rkj83",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("dbumyo", "7potks",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("ka3dp", "aki1xzh",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("h63uk8", "[",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "P", "xlhdw5",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("aki1xzh", "Capstones", "ka3dp", "xlhdw5",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("Transaction successfully verified.", "dbumyo", "f5f7xj", "aki1xzh", "P",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("Capstones",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("0", 18,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ERC1820_ACCEPT_MAGIC", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("ik16el",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 96,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("nulhfk", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(55,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["2rkj83"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[241,20,225,73,142,22,243,23,111,65,233,16,58,49,249,194,121,38,59,13,86,145,85,254,222,157,195,205,188,162,191,23]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(254, 70, 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([65,80,94,107,190,236,59,8,8,240,196,220,71,9,128,114,131,71,43,32,239,95,162,244,250,209,198,23,20,72,12,218], [32,218,197,126,133,36,20,82,76,176,96,175,151,102,82,171,240,213,220,152,210,79,102,16,86,158,70,205,110,147,101,248],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([142,95,92,71,230,204,47,185,116,35,146,106,242,43,155,13,191,45,193,211,72,138,43,31,1,2,161,127,115,11,48,128], [120,30,164,234,61,124,46,49,43,190,57,224,61,131,147,77,236,39,182,25,10,165,166,250,98,15,163,29,34,121,11,52], [207,229,159,204,117,63,145,62,39,196,110,100,31,46,187,57,101,146,15,127,167,130,5,229,254,62,30,24,219,19,169,59],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([76,10,154,30,5,239,109,137,14,18,129,242,228,63,219,43,211,186,30,3,160,131,146,201,110,203,63,47,239,226,10,68], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([191,119,132,20,123,223,231,3,68,74,10,80,124,66,200,134,118,64,75,247,216,110,247,153,241,86,47,35,158,62,4,197], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([155,155,35,6,130,47,146,107,86,237,216,172,156,2,243,67,216,86,190,151,142,30,38,244,127,135,110,224,100,49,38,226], "ik16el", [106,78,164,48,22,226,228,142,133,227,222,56,24,73,73,48,137,150,229,107,22,106,205,192,70,6,254,18,212,224,10,191],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([184,106,166,93,185,92,197,169,253,30,194,182,205,55,145,79,1,215,193,14,171,199,192,224,48,147,43,108,46,95,135,95], "f5f7xj", [220,197,3,167,67,118,1,92,236,178,160,205,96,177,237,135,245,139,21,128,133,28,132,4,194,99,70,201,121,63,120,128],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([64,152,196,218,104,215,1,21,11,200,43,141,132,149,40,90,17,18,213,61,89,34,198,27,198,244,118,205,185,19,250,246], [163,220,70,176,117,159,180,47,124,184,190,51,7,29,57,62,235,173,128,104,128,148,192,102,210,101,237,31,60,22,21,143], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([64,152,196,218,104,215,1,21,11,200,43,141,132,149,40,90,17,18,213,61,89,34,198,27,198,244,118,205,185,19,250,246], [57,5,106,233,67,34,47,86,172,116,161,48,67,9,64,6,39,145,27,174,207,97,41,22,19,28,247,193,7,229,189,74,208], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([80,229,80,236,170,47,45,15,18,180,171,128,147,82,225,34,224,167,217,164,111,226,229,201,141,81,142,54,181,69,63,54], [247,2,137,105,33,87,132,59,19,108,245,40,198,246,171,149,31,2,93,165,153,208,193,96,175,47,227,195,246,113,4,207], [210,22,108,121,56,64,44,131,197,218,200,62,107,32,58,152,121,123,83,148,223,218,167,195,235,176,224,40,180,173,230,214], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([181,1,219,159,14,59,222,105,162,243,123,185,162,0,24,135,106,221,235,172,145,58,198,185,236,93,214,202,236,179,153,129], [9,69,253,78,79,193,251,134,14,199,162,65,230,190,199,99,198,92,8,172,105,235,31,197,37,151,49,80,130,220,126,87], [175,192,89,231,9,193,206,153,189,116,101,240,21,92,25,209,180,14,76,7,160,102,243,15,244,144,196,131,171,124,109,10], "bz25ct",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([117,4,241,109,138,207,225,204,7,40,150,170,60,139,7,105,247,201,243,163,227,231,106,83,247,239,221,253,221,104,76,32], [219,230,157,109,157,56,225,139,44,90,183,92,206,112,135,252,105,87,208,195,157,157,252,154,1,125,113,69,171,174,54,202], [161,3,232,141,224,143,209,169,226,181,18,1,201,16,226,198,150,190,160,223,34,23,252,85,132,250,244,168,140,202,153,104], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([18,73,235,203,223,155,230,60,32,65,25,115,29,144,185,100,227,213,203,190,232,97,143,106,94,31,231,28,174,62,1,81], [22,159,29,136,200,146,89,251,212,158,114,201,89,218,156,72,135,249,245,58,244,70,91,213,176,134,105,220,50,173,139,27], [85,215,110,112,105,173,45,171,9,220,11,194,171,160,238,36,95,28,133,63,145,119,10,88,156,241,185,127,197,108,171,179], "ka3dp",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([106,86,226,214,39,101,17,75,34,236,193,124,128,4,184,91,217,40,150,166,69,193,112,112,123,211,124,222,105,26,183,51], [120,78,199,81,88,91,122,64,235,216,173,44,255,148,40,177,73,47,51,230,161,53,105,73,100,191,226,96,248,54,190,170], [153,21,249,9,65,197,56,43,150,243,146,87,156,125,148,239,88,37,94,183,238,59,78,197,179,71,154,241,114,99,111,116], "f5f7xj",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([86,179,8,53,150,209,195,189,165,125,215,219,153,35,247,222,209,81,112,49,183,232,97,161,40,233,95,34,41,30,150,42], [135,70,69,238,210,20,24,202,86,22,134,106,203,81,110,155,54,147,206,252,254,224,100,216,202,126,204,56,73,70,185,95], [255,8,180,154,101,218,18,231,12,244,187,16,55,125,117,30,176,104,126,102,78,232,148,108,63,0,58,60,107,111,138,233], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([249,88,5,6,220,24,34,100,189,202,113,5,166,79,137,235,231,157,41,86,141,200,189,64,211,33,56,220,37,65,107,36], [229,44,215,21,237,195,5,241,40,8,65,61,76,169,181,98,38,185,181,129,84,105,218,83,116,231,87,227,246,136,78,170], [68,68,45,228,209,82,113,117,2,27,61,176,154,31,125,166,157,223,165,190,101,98,94,247,47,78,21,197,50,184,140,73], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([115,18,227,159,217,93,175,252,168,225,182,138,213,84,233,209,15,168,4,221,184,58,0,135,83,21,40,184,220,100,201,114], [73,75,242,95,149,55,72,124,22,76,225,46,66,210,99,167,67,237,9,80,79,251,163,252,10,232,154,81,187,242,96,92], [84,78,104,53,235,189,65,254,41,37,45,237,73,22,241,79,203,54,174,41,198,249,13,172,174,50,237,40,7,245,168,89], "h63uk8",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([22,148,43,211,175,87,203,85,3,214,67,169,32,106,143,77,124,136,188,254,21,57,209,121,249,238,65,142,117,31,70,104], 10, 24, [44,36,219,61,133,137,180,89,19,54,51,27,40,141,8,211,103,152,228,212,16,88,140,9,239,4,0,117,223,55,10,232], 102,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([212,92,228,56,36,43,172,190,220,61,190,6,52,219,82,12,70,144,183,192,65,250,181,65,152,68,125,119,193,233,97,160], 160, [87,241,94,230,3,3,158,167,112,92,139,78,60,164,15,203,53,221,150,207,171,6,49,175,151,84,61,146,216,154,40,241], [116,36,219,151,1,104,215,55,168,38,195,248,161,12,116,68,17,41,59,24,14,146,33,111,57,210,249,172,114,81,249,190],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([48,17,42,172,116,239,200,249,218,151,24,165,121,61,214,163,188,130,210,245,101,7,144,130,23,11,249,159,224,193,172,67], [48,164,146,204,232,24,188,105,94,147,63,199,28,168,153,246,182,65,225],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([246,193,74,169,155,34,70,244,255,245,188,176,103,14,198,216,58,77,80,78,181,176,205,252,203,44,3,108,118,198,132,58], [180,207,156,56,56,116,29,239,210,84,1,74,121,92,140,204,164,121,248,0,188,85,214,34,57,173,102,106,200,25,1,175,215,234,58,114,1,58,146,202,35,79,98,179,15,95,136,171,162,137,9,229,163,224,55,11,3,71,108,58,228,6,22,72,104],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
