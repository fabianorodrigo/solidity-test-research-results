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
    contractERC721MintableComplete = await ERC721MintableComplete.new("L","L",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("L","L",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","p7yiu8",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","p7yiu8",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(63,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("p7yiu8",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Transaction successfully verified.", 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("L", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(8, "e7owj8", "w77do",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(128, "\x19Ethereum Signed Message:\n32", "P", 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("p7yiu8", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Capstones", "0", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(7, "[", "w77do", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(2014223716, "Transaction successfully verified.", "\x19Ethereum Signed Message:\n32", "Transaction successfully verified.", 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("e7owj8", "Capstones", "a05a7", 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("L", ["L","Transaction successfully verified.","p7yiu8","at44o","L","p7yiu8","e7owj8","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(128, "L", ["Capstones","w77do","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","p7yiu8","Capstones","ERC1820_ACCEPT_MAGIC","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(18, "e7owj8", ["0","ERC1820_ACCEPT_MAGIC"], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("a05a7", ["at44o","w77do","ERC1820_ACCEPT_MAGIC","Transaction successfully verified.","v2yzfl","0"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("w77do", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(257, "f7327g", ["["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(4, "f7327g", ["\x19Ethereum Signed Message:\n32"], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("p7yiu8", ["ERC1820_ACCEPT_MAGIC"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("Capstones", ["at44o","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(1532892064, "w77do", ["0","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(5, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["L","["], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("p7yiu8", ["\x19Ethereum Signed Message:\n32","v2yzfl"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("[", ["shiiom","0","w77do"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(59, "\x19Ethereum Signed Message:\n32", ["Transaction successfully verified.","0","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(257, "w77do", ["v2yzfl","P","l6e83h"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("f7327g", ["Capstones","at44o","L"], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("shiiom", ["shiiom","gaav5bh","v2yzfl","p7yiu8"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(1, "l6e83h", ["at44o","\x19Ethereum Signed Message:\n32","a05a7","gaav5bh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(2, "p7yiu8", ["P","Transaction successfully verified.","p7yiu8","ERC1820_ACCEPT_MAGIC"], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("gaav5bh", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","L","p7yiu8","p7yiu8"], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("P", ["w77do","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","e7owj8","shiiom"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(29, "e7owj8", ["w77do","P","L","L","at44o"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(86, "L", ["shiiom","[","ERC1820_ACCEPT_MAGIC","Capstones","v2yzfl"], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("r2bkb6", ["p7yiu8","ERC1820_ACCEPT_MAGIC","e7owj8","w77do","Transaction successfully verified."], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("gaav5bh", [[22,220,147,74,183,192,113,172,128,92,210,37,181,71,209,40,46,187,159,216,243,45,128,235,236,216,249,79,234,107,102,229],[201,200,205,126,230,145,117,190,117,175,214,194,71,25,160,44,12,132,220,20,202,65,118,55,211,131,185,35,214,142,65,69],[84,179,27,26,219,132,53,129,22,170,67,224,207,177,35,251,170,102,112,172,236,163,183,136,51,180,51,146,12,226,106,247],[166,46,181,170,156,165,12,198,28,232,119,9,211,241,214,4,26,90,85,111,169,48,116,155,219,185,40,238,185,175,3,80]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(200000, "gaav5bh", [[111,128,190,62,116,2,168,97,141,162,86,90,120,115,67,155,63,160,39,108,186,74,52,181,231,88,88,58,147,16,40,7],[99,40,143,221,176,238,119,178,143,27,140,146,82,116,6,238,7,207,76,87,217,100,208,91,130,6,194,81,206,33,240,26],[52,6,29,210,22,150,39,73,54,130,183,9,25,210,1,122,237,70,3,245,28,12,202,127,106,249,189,254,10,23,252,122],[147,226,248,86,254,129,45,21,38,44,171,148,211,90,69,137,225,0,7,189,218,140,216,11,184,253,101,214,181,23,87,70],[220,88,165,168,166,184,200,90,56,239,117,137,4,139,81,45,194,43,172,194,243,184,62,33,34,81,111,150,69,201,163,60],[254,227,202,26,113,84,172,220,235,28,238,217,215,175,17,35,135,103,147,218,75,126,37,117,152,213,3,53,121,193,124,47],[23,24,56,107,236,28,158,183,227,28,126,98,212,101,69,4,95,47,100,226,118,157,44,248,183,227,64,53,166,236,87,245],[67,203,55,4,80,27,105,184,6,154,215,49,31,50,241,28,10,187,40,242,89,29,17,192,209,176,171,185,92,186,155,104],[248,90,102,183,17,69,147,204,226,140,123,181,5,9,255,35,139,251,81,111,21,220,38,51,148,232,211,1,78,3,121,106]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(55, "L", [[8,99,117,175,43,58,134,97,201,14,172,63,254,221,35,121,30,68,237,53,9,230,14,72,199,161,141,2,144,37,152,114],[207,80,135,22,37,2,243,231,204,250,124,91,56,161,126,213,194,105,203,217,183,211,8,62,36,159,119,169,17,153,83,11]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("P", [[154,20,64,130,11,33,105,147,102,42,186,238,29,156,6,15,233,85,155,77,46,72,235,74,43,111,3,136,160,59,239,34],[178,96,148,169,141,50,18,60,120,201,224,189,188,54,198,227,148,33,132,78,132,137,99,137,250,46,222,229,41,177,25,209],[20,128,135,209,128,210,26,152,222,177,0,60,117,228,201,160,168,235,55,219,103,192,77,9,80,179,81,37,145,197,47,220],[221,191,113,122,29,192,67,160,221,166,60,155,69,21,38,131,168,45,166,68,95,14,238,8,146,125,47,119,202,140,149,27],[66,186,39,27,170,79,159,68,151,21,35,140,183,235,15,35,208,13,254,226,252,71,164,58,250,200,207,61,168,161,106,152],[161,126,172,212,73,189,186,1,112,2,211,144,221,138,47,85,70,178,135,113,19,93,122,121,139,176,83,149,72,146,197,249],[145,5,36,183,60,255,59,129,46,156,118,222,27,181,55,136,55,38,226,73,220,120,220,120,160,14,53,42,160,134,48,224],[115,225,128,225,152,186,231,235,75,65,96,114,54,149,215,64,43,120,211,180,212,236,20,253,105,58,13,69,72,17,220,221],[8,184,118,83,125,82,14,14,146,173,213,229,87,18,39,61,162,109,86,24,107,67,232,30,109,218,125,159,143,228,94,154]], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("w77do", [[217,205,158,45,121,66,54,101,200,177,216,188,112,41,151,133,149,2,244,36,59,235,85,217,31,74,45,119,143,110,222,32]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(15, "a05a7", [[145,226,172,47,123,174,249,238,171,7,5,51,102,121,119,151,19,86,131,144,80,153,124,168,89,141,150,71,36,48,37,204]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(6, "l6e83h", [[131,22,109,192,222,9,165,42,186,102,221,16,214,189,196,14,242,131,27,59,51,173,90,220,25,2,131,13,128,174,132,102]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("0", [[132,21,157,102,124,249,130,82,38,136,5,159,188,227,95,211,251,109,226,101,233,101,72,207,135,127,115,48,135,129,36,21]], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("0", [[145,128,255,70,72,159,104,181,187,28,229,27,150,11,73,77,230,116,127,176,225,86,41,63,242,142,52,180,9,215,145,126],[177,133,35,182,224,44,253,139,154,59,6,79,211,244,227,7,178,80,98,22,232,42,113,217,80,55,21,35,22,7,237,184]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(61, "e7owj8", [[120,78,161,203,161,158,208,158,59,220,229,166,42,241,69,158,114,235,32,92,201,59,108,130,80,102,221,48,40,49,124,126],[22,188,224,223,25,74,12,136,198,169,135,40,174,11,204,59,94,175,154,234,125,11,122,243,106,41,6,169,244,130,141,106]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(9, "at44o", [[63,22,170,0,102,7,15,179,97,111,227,214,165,132,143,74,198,6,88,104,189,142,86,171,83,75,82,56,63,116,119,75],[4,145,14,14,19,184,236,188,140,111,225,48,133,29,188,177,160,99,71,68,80,196,136,205,161,91,208,128,249,180,144,136]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("w77do", [[115,97,18,151,126,103,201,251,215,34,50,105,128,5,86,228,220,200,158,209,228,54,25,105,60,24,73,159,13,116,122,213],[97,137,60,154,160,7,23,211,118,144,113,254,227,27,220,18,36,111,207,36,225,144,202,142,59,71,125,194,77,9,99,175]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("v2yzfl", [[149,232,22,173,92,225,213,93,245,10,141,200,186,49,128,117,117,208,232,57,27,34,58,217,88,211,156,224,143,234,242,31],[241,129,200,244,159,138,210,36,16,52,105,80,58,110,229,142,9,26,133,52,13,11,43,228,34,215,234,11,85,74,9,246],[248,74,194,248,218,69,165,25,219,58,137,88,76,71,61,5,66,217,42,213,178,246,131,231,111,144,119,160,137,214,14,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(5, "a05a7", [[243,185,160,171,71,132,45,50,77,20,10,255,102,50,141,107,83,3,200,194,105,71,184,170,196,45,54,118,217,108,201,121],[80,220,35,160,174,63,240,105,165,43,44,70,44,166,255,115,218,39,229,101,150,68,21,231,171,73,104,95,107,7,246,184],[182,155,40,149,36,194,204,28,195,72,42,249,144,12,179,119,196,188,67,3,6,199,186,200,87,248,77,245,100,239,3,241]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(8, "r2bkb6", [[231,171,38,8,23,101,123,165,25,196,228,227,193,62,61,163,234,240,231,66,164,196,230,10,203,29,91,1,118,218,198,186],[147,239,79,139,27,39,171,174,59,120,52,104,255,116,95,86,59,34,82,233,5,27,210,151,222,224,62,141,118,223,129,53],[84,144,201,116,207,166,213,18,158,37,102,148,75,243,204,17,208,235,151,59,81,70,82,51,115,51,239,98,163,225,41,107]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("Capstones", [[119,31,13,250,196,20,21,141,78,210,135,233,214,121,145,217,246,200,102,15,10,239,43,13,225,28,70,113,53,185,231,147],[133,194,233,43,62,161,123,156,57,30,243,46,47,90,243,34,73,87,82,93,173,152,137,193,106,56,192,103,248,113,95,19],[75,134,249,4,207,139,234,13,107,202,175,237,7,179,6,182,146,134,111,127,149,221,148,141,188,180,78,215,232,236,23,227]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("L", [[223,104,249,56,206,188,56,250,44,22,250,16,75,206,30,24,103,44,167,129,146,109,40,97,4,191,233,35,123,212,24,133],[135,245,196,44,168,214,187,125,242,77,154,206,3,118,44,143,115,157,193,29,168,81,92,194,10,41,117,64,213,7,81,147],[161,26,151,79,77,13,242,68,26,239,64,22,228,252,82,184,202,255,250,52,55,136,27,5,155,181,93,38,137,150,211,207],[191,40,85,116,112,231,63,225,204,172,225,43,139,206,77,151,206,191,115,215,126,77,48,97,184,227,207,12,106,228,60,125]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(1025, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[3,96,150,123,115,5,231,239,193,30,238,96,247,156,141,72,195,204,81,148,204,145,129,220,233,85,22,153,182,137,128,153],[158,178,232,62,17,21,18,113,189,119,159,80,5,185,17,217,159,118,114,18,71,121,125,78,0,186,139,63,223,111,27,188],[197,136,163,189,139,229,152,172,205,69,118,34,167,52,10,46,116,215,109,25,132,127,192,61,152,238,82,64,89,206,0,40],[236,89,36,233,165,38,137,112,56,151,218,224,188,244,162,142,135,241,30,253,198,187,230,134,106,94,129,223,17,180,27,61]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(95, "e7owj8", [[92,222,115,213,61,40,57,58,49,152,97,212,242,178,133,201,209,18,50,6,60,173,217,148,240,151,193,69,137,176,112,170],[61,85,235,25,29,42,81,144,152,8,232,0,177,170,228,62,2,181,175,252,88,223,231,144,24,80,107,213,206,128,208,60],[140,130,254,246,102,2,144,175,176,215,207,51,204,139,198,52,16,102,97,148,202,6,226,170,191,4,125,80,141,178,2,112],[163,95,150,44,88,52,139,38,124,37,150,51,210,11,189,139,156,162,121,181,165,190,63,28,158,191,38,198,194,91,217,246]], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("l6e83h", [[157,220,52,175,77,209,46,234,11,141,69,222,94,158,9,244,40,149,180,25,48,181,111,9,231,170,186,244,24,85,219,215],[219,251,193,67,219,169,143,103,227,132,220,167,148,90,129,104,150,3,148,219,49,59,147,77,162,179,124,184,109,192,152,61],[10,19,244,91,208,250,106,49,97,56,137,252,10,131,163,146,16,22,253,200,137,233,169,39,58,140,222,134,7,251,8,219],[208,75,186,134,82,11,123,104,216,225,225,186,61,55,112,83,128,114,143,137,198,56,59,120,232,149,24,178,70,39,27,243]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("\x19Ethereum Signed Message:\n32", [[234,60,114,246,221,161,118,86,158,68,34,72,13,237,150,12,32,53,92,211,214,41,223,39,126,92,246,5,180,102,158,176],[33,240,227,163,101,77,240,222,177,92,136,72,113,20,79,181,57,115,111,147,37,17,116,203,158,155,58,73,22,2,243,85],[22,230,224,76,162,169,65,247,83,161,145,98,113,126,112,24,25,91,95,135,151,237,102,247,83,218,223,68,2,153,245,164],[241,32,239,193,133,116,6,132,98,204,235,29,170,32,21,21,150,93,172,111,216,176,255,96,161,240,242,192,186,196,88,90],[215,163,59,118,0,100,83,50,62,196,208,76,179,247,156,236,172,91,204,218,125,6,33,242,150,31,179,139,250,46,67,97]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(7, "P", [[68,180,38,22,234,182,204,165,91,79,129,26,177,84,2,1,254,187,147,92,58,222,25,244,78,211,218,84,250,70,223,241],[131,186,141,75,43,171,176,49,155,45,190,64,133,77,58,211,76,240,235,175,9,68,62,169,201,134,141,46,205,237,50,183],[209,31,251,105,47,253,253,66,196,0,83,217,182,198,65,103,120,61,84,184,152,91,29,193,206,150,241,12,106,95,153,254],[93,102,33,201,13,239,103,199,17,75,163,206,180,211,238,253,25,12,80,102,216,38,205,46,251,101,252,16,71,153,69,21],[118,77,142,19,255,198,181,31,231,79,179,135,121,142,185,221,210,25,217,94,214,243,16,118,83,123,95,71,22,233,153,26]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(2014223716, "v2yzfl", [[138,74,219,124,36,184,26,108,37,111,230,45,227,113,51,228,46,153,50,67,170,85,115,167,110,99,201,108,247,225,24,102],[22,157,176,32,108,225,17,163,252,190,1,80,231,3,126,177,216,173,143,215,219,47,195,131,202,75,213,133,103,249,82,110],[5,8,72,163,112,191,254,205,48,187,94,137,196,33,80,229,134,86,46,133,238,58,69,49,153,166,91,255,99,51,175,203],[209,113,47,211,128,14,200,39,67,185,9,36,117,176,142,66,99,71,73,26,114,183,30,111,15,140,165,244,116,134,9,225],[208,221,79,152,106,144,33,51,224,200,119,39,12,247,231,210,24,147,91,234,168,116,229,219,112,175,105,4,69,53,164,133]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("shiiom", [[228,64,57,2,221,227,39,243,254,252,2,171,99,171,211,225,46,103,39,86,186,47,27,140,41,43,164,134,223,205,45,78],[220,151,7,190,67,212,155,96,101,116,230,246,49,67,183,97,56,27,106,198,48,115,157,140,34,75,208,19,194,174,31,100],[85,47,126,68,242,209,210,5,134,40,26,241,241,193,187,149,89,219,91,12,56,169,231,116,45,104,130,86,16,64,88,41],[216,20,226,244,63,82,20,61,182,101,241,90,93,61,52,175,136,202,1,13,161,131,119,221,59,214,67,114,254,174,10,224],[203,112,41,121,218,76,29,155,238,142,147,33,139,46,14,184,50,239,41,145,93,54,205,151,220,152,237,111,87,228,218,20]], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([153],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[6],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(69,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("gx1gr8",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("p7yiu8", "r2bkb6",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("gx1gr8", "r2bkb6",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("w77do", "e7owj8",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("ERC1820_ACCEPT_MAGIC", "shiiom", "e7owj8",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("[", "\x19Ethereum Signed Message:\n32", "v2yzfl", "gaav5bh",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("gx1gr8", "P", "L", "at44o", "cbxtfo",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("at44o",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ERC1820_ACCEPT_MAGIC", 65,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("at44o", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("a05a7", 61,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("e7owj8", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(2014223716,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["ERC1820_ACCEPT_MAGIC","bk5gql","shiiom"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[222,100,244,171,82,160,210,197,140,101,43,246,140,102,106,139,79,30,75,96,161,184,103,213,96,102,7,196,110,212,126,52],[63,59,95,77,96,121,199,17,155,203,180,2,59,66,165,72,115,145,135,88,85,166,178,197,132,32,23,69,74,181,27,64],[84,244,114,1,197,190,121,244,128,230,248,129,171,148,166,120,128,209,200,151,12,134,55,193,172,248,17,190,154,67,200,151],[44,188,27,176,19,53,39,125,147,42,158,178,151,71,168,43,186,83,13,107,235,240,130,17,179,59,112,47,125,76,77,171],[86,218,84,38,161,104,24,8,253,65,12,229,164,156,25,25,87,179,124,248,23,197,230,217,111,58,128,245,235,111,149,208],[58,116,163,21,13,6,228,128,195,126,216,91,63,150,246,157,79,162,249,109,93,85,26,29,36,197,33,146,30,160,45,161],[39,90,151,178,131,221,204,88,183,100,17,26,162,146,9,170,176,79,111,201,38,4,90,180,145,22,39,124,222,198,186,4],[124,80,61,76,219,38,166,249,173,176,79,218,209,97,66,97,243,229,104,222,247,63,51,182,47,164,244,138,1,33,103,158]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(0, 47, 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([122,34,166,40,8,233,22,216,214,59,160,119,146,182,187,47,22,73,93,32,53,107,7,251,29,207,117,206,39,70,29,130], [248,44,200,119,75,206,179,6,159,88,245,156,166,213,57,213,203,76,174,176,177,77,44,63,135,17,207,232,36,190,87,41],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([177,193,237,35,182,80,231,177,43,6,198,243,152,161,80,175,106,153,234,8,87,20,159,17,253,194,195,218,60,23,215,60], [1,199,152,237,83,248,18,145,88,69,114,67,131,136,186,0,79,9,129,255,114,36,198,83,44,162,204,253,137,38,192,160], [14,78,150,127,220,81,162,253,0,145,109,245,76,18,180,76,193,153,82,188,242,35,29,103,133,24,56,11,97,7,237,249],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([187,19,172,118,140,58,169,182,23,198,132,67,59,178,236,55,31,37,71,0,15,165,28,171,81,80,219,160,226,62,177,103], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([227,126,72,186,142,248,102,99,199,202,83,210,141,196,69,93,221,253,196,172,33,182,230,119,174,7,199,76,80,150,173,96], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([163,148,129,128,201,5,39,143,91,41,219,214,35,176,111,244,221,33,137,95,118,41,187,195,82,221,106,79,17,42,118,86], "Capstones", [208,55,1,50,193,74,94,1,3,11,253,232,128,71,165,171,71,51,60,146,92,51,36,1,229,93,76,43,80,110,190,219],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([140,128,10,82,41,221,198,179,187,31,237,56,198,197,115,213,107,154,75,184,209,220,0,246,228,99,139,40,204,14,143,250], "L", [213,134,145,173,248,140,114,59,73,70,20,143,102,200,138,56,246,156,150,220,136,177,82,145,86,124,33,81,32,131,194,63],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([240,194,219,206,182,224,83,239,56,89,136,161,204,218,129,25,186,119,100,89,27,127,214,73,38,138,111,245,7,214,148,28], [118,239,119,152,182,62,3,196,64,105,165,125,119,129,119,204,130,66,115,46,157,109,19,135,119,43,189,199,21,97,35,206], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([240,194,219,206,182,224,83,239,56,89,136,161,204,218,129,25,186,119,100,89,27,127,214,73,38,138,111,245,7,214,148,28], [104,117,91,232,34,55,160,219,122,140,212,140,180,243,134,91,209,100,204,190,121,124,0,3,63,253,31,248,156,192,231,162,105], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([121,53,234,150,210,146,174,222,18,171,186,218,86,0,237,1,80,122,103,114,254,244,72,129,180,68,217,199,229,43,17,173], [113,0,146,9,212,237,150,138,63,247,155,138,229,68,72,55,204,149,228,98,71,254,85,38,61,252,195,132,111,100,201,128], [99,178,17,82,238,70,213,218,93,109,67,21,212,216,167,22,97,106,89,224,114,41,109,247,163,139,236,71,1,219,183,154], "at44o",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([96,140,155,133,40,33,27,161,135,83,35,220,107,58,245,107,105,109,217,3,117,49,90,174,67,148,187,52,200,205,226,194], [138,29,33,112,253,108,175,32,144,145,216,152,136,46,166,189,164,26,145,132,71,191,124,210,3,74,57,143,74,72,201,62], [99,119,169,109,82,41,129,192,53,22,4,143,207,117,70,158,236,186,193,168,183,92,197,253,88,160,175,229,216,70,76,179], "f7327g",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([97,152,107,245,144,131,93,236,84,124,181,124,191,254,218,183,91,55,211,19,94,38,84,86,167,191,208,45,50,220,44,118], [154,82,1,67,59,221,124,198,99,236,1,130,25,245,192,144,142,109,210,202,178,195,199,208,102,154,15,157,213,103,135,45], [145,209,3,105,119,255,18,116,149,49,221,107,149,255,107,53,166,107,102,34,209,23,126,204,160,219,106,108,96,196,204,61], "gx1gr8",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([44,87,137,98,236,118,143,160,164,221,229,245,154,161,40,251,196,73,240,141,158,168,131,195,36,128,10,3,53,40,129,20], [140,3,29,59,140,70,29,146,19,37,70,211,58,73,151,202,90,226,182,253,167,138,109,89,165,58,123,240,41,14,45,221], [235,185,198,26,45,204,141,80,23,70,130,88,218,108,197,179,87,132,41,240,241,169,173,8,246,139,93,0,227,154,42,233], "bk5gql",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([43,149,236,167,73,91,195,151,128,8,206,197,142,14,56,82,88,253,101,251,40,52,83,37,248,220,150,31,243,211,228,172], [197,210,115,179,247,73,182,138,218,47,255,213,72,121,146,132,162,7,201,250,40,105,87,146,223,141,155,19,199,184,160,180], [93,227,118,240,163,92,101,111,158,117,32,142,16,237,57,139,149,159,92,161,113,141,53,229,1,95,98,42,245,15,229,160], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([13,126,213,255,218,91,177,191,55,99,75,245,118,55,14,152,190,201,138,85,48,39,241,223,250,112,154,159,72,77,154,87], [85,110,140,228,104,52,174,63,210,223,105,142,113,253,177,208,190,104,42,53,20,252,32,104,56,179,254,58,3,181,145,244], [160,67,15,235,244,248,73,252,142,64,123,230,162,114,200,238,138,107,80,245,162,220,10,183,41,253,148,178,91,67,145,45], "f7327g",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([71,24,87,255,53,200,65,49,245,180,170,9,34,188,156,113,10,106,25,49,58,41,50,81,92,253,164,154,91,37,199,155], [203,170,24,150,53,133,75,54,186,52,77,185,175,201,239,135,181,207,226,91,87,48,211,18,58,214,250,218,42,108,31,187], [103,124,212,202,33,222,21,121,213,244,4,75,134,220,86,101,152,166,112,155,196,49,253,151,91,103,185,91,160,31,163,120], "shiiom",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([61,52,106,13,21,187,173,193,235,208,55,170,87,209,104,141,136,82,16,30,69,9,194,22,55,207,175,130,34,210,33,117], [89,189,92,219,163,100,197,218,7,112,50,157,44,86,248,24,121,88,93,105,81,51,242,174,162,245,183,235,98,87,186,40], [32,100,14,126,104,252,147,43,48,156,109,249,157,2,247,253,114,111,74,218,55,38,54,98,106,220,103,231,46,33,182,102], "0",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([134,124,101,249,152,217,242,211,241,192,243,99,209,54,16,102,192,54,157,100,131,148,210,75,123,206,229,212,18,95,196,12], 16, 256, [19,20,28,97,111,133,41,91,135,146,142,158,8,130,76,102,128,189,150,10,201,223,148,83,180,155,53,255,82,141,245,49], 71,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([229,233,234,2,4,58,61,204,243,210,6,33,193,66,178,119,197,56,54,214,27,242,61,114,70,216,13,94,250,30,105,120], 47, [196,138,143,52,198,98,124,47,93,249,180,22,59,249,82,128,227,227,73,232,16,32,13,1,121,151,207,230,33,186,147,103], [22,7,13,80,24,26,178,252,2,16,16,244,60,181,88,155,78,0,218,156,121,97,3,79,190,7,108,5,74,124,173,223],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([170,221,3,146,21,171,206,58,220,107,195,175,186,61,27,66,55,220,175,98,69,108,156,142,227,74,186,78,5,46,238,68], [136,103,147,90,94,245,76,15,186,153,79],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([48,218,26,63,250,15,27,244,101,16,114,119,139,50,130,3,8,115,210,104,182,230,107,130,165,158,44,84,233,38,62,177], [122,151,53,185,170,83,245,254,78,58,152,73,242,97,185,91,203,243,1,181,65,178,63,208,207,100,11,233,84,171,42,172,102,125,39,249,196,235,111,157,92,213,200,210,74,11,255,71,143,226,163,188,192,237,244,243,77,91,112,148,201,107,77,59,36],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
