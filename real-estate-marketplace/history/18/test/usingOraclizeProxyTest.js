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
    contractERC721MintableComplete = await ERC721MintableComplete.new("L","Capstones",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("L","Capstones",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(11,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("L", 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "q0j2bv",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(2, "P", "sdy38",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(56, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "P", 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Capstones", "0", 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("0", "[", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(101, "\x19Ethereum Signed Message:\n32", "\x19Ethereum Signed Message:\n32", "q0j2bv",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(1532892063, "ERC1820_ACCEPT_MAGIC", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Capstones", 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("Transaction successfully verified.", "q0j2bv", "sdy38", 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Capstones", ["L","\x19Ethereum Signed Message:\n32","0","0","q0j2bv","Capstones","P","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(63, "[", ["P","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","\x19Ethereum Signed Message:\n32","Capstones","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","Capstones","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(65, "Capstones", ["Capstones","0","L","0","\x19Ethereum Signed Message:\n32"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("sdy38", ["0","q3xgd","L","[","Transaction successfully verified.","q0j2bv","ERC1820_ACCEPT_MAGIC","sdy38","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P"], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("0", ["ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(2014223715, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(21, "Transaction successfully verified.", ["L"], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("ERC1820_ACCEPT_MAGIC", ["ERC1820_ACCEPT_MAGIC"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("L", ["0","ucgnji"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(69, "\x19Ethereum Signed Message:\n32", ["ucgnji","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(6, "P", ["q0j2bv","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Transaction successfully verified.", ["L","sdy38"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("Transaction successfully verified.", ["P","ucgnji","q0j2bv"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(87, "Capstones", ["[","Transaction successfully verified.","ucgnji"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(2014223716, "P", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","6jvwbc"], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("ERC1820_ACCEPT_MAGIC", ["P","Capstones","ucgnji"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("ERC1820_ACCEPT_MAGIC", ["q3xgd","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(54, "0", ["ucgnji","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(1, "Capstones", ["q0j2bv","ERC1820_ACCEPT_MAGIC","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("q3xgd", ["[","0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","sdy38"], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("ucgnji", ["Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","6jvwbc","6jvwbc","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(6, "L", ["6jvwbc","6jvwbc","sdy38","[","3px1e6"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(200000, "Transaction successfully verified.", ["Transaction successfully verified.","l2by4i","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","q0j2bv","sdy38"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("6jvwbc", ["ucgnji","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P","sdy38"], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("ucgnji", [[4,124,87,159,227,57,47,35,208,69,129,114,247,135,110,127,1,201,85,224,42,131,19,150,61,254,243,59,176,218,45,219],[84,63,139,25,55,239,141,174,17,71,124,245,225,236,9,128,62,80,121,150,0,149,242,16,1,149,227,250,215,138,113,83],[193,223,58,102,29,165,136,104,163,38,89,122,232,4,247,58,138,226,97,88,135,48,41,25,236,110,94,42,21,119,147,124],[121,120,34,16,59,251,192,57,124,153,41,149,130,80,136,53,14,63,206,135,113,127,131,167,145,178,84,209,228,150,200,150],[108,151,124,132,131,153,218,201,33,167,174,199,232,34,41,199,93,236,144,183,96,15,69,122,246,20,70,131,231,167,47,66],[184,164,240,252,39,22,227,138,250,142,55,57,247,114,72,1,11,228,116,78,221,21,191,169,20,147,67,76,52,142,255,168],[223,140,239,225,87,86,29,227,219,247,235,108,188,91,97,78,167,218,22,43,246,250,219,219,245,38,14,127,250,253,107,31]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(27, "ERC1820_ACCEPT_MAGIC", [[217,180,205,106,159,186,165,72,224,22,122,72,37,253,123,135,178,29,209,243,221,204,252,222,242,170,168,180,251,128,235,183],[152,142,0,171,54,101,227,232,78,113,42,80,55,52,214,20,104,20,45,199,109,242,83,167,183,58,161,151,252,244,206,50],[79,215,107,175,165,117,215,152,200,98,118,3,216,202,30,159,45,92,13,47,193,242,191,253,197,58,24,174,70,248,0,11],[194,108,141,181,171,83,205,142,63,181,251,192,180,24,96,92,56,6,206,226,46,97,117,18,105,201,115,96,81,253,33,124],[139,107,72,84,44,212,98,48,186,249,81,61,55,199,86,110,51,132,86,121,34,98,156,211,185,192,213,70,134,61,161,205],[249,107,40,91,125,207,163,131,63,70,31,102,223,181,185,78,215,87,156,76,33,18,184,140,167,92,55,16,53,186,15,4],[149,13,99,93,75,92,30,106,80,41,163,202,159,255,21,207,163,177,56,159,190,173,220,124,147,220,133,166,15,91,224,93]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(46, "ucgnji", [[89,143,162,137,99,158,24,20,113,96,88,185,139,229,172,61,140,121,121,26,10,128,183,216,16,222,48,79,187,140,105,42],[243,78,146,8,161,254,120,87,115,95,38,73,190,69,164,249,117,122,24,224,4,205,253,222,181,211,30,153,147,255,197,83],[189,70,32,61,11,250,19,95,59,47,180,173,46,37,39,16,35,167,41,5,145,233,41,41,41,223,161,1,241,95,49,157],[4,44,138,129,18,146,196,81,62,148,142,207,100,241,103,63,51,87,202,255,136,238,38,17,241,209,237,177,206,189,208,165],[206,208,226,18,145,180,18,14,134,43,28,86,75,36,55,204,105,59,245,217,41,15,30,87,96,68,42,251,49,10,87,160],[235,115,27,188,151,216,230,155,43,42,225,2,127,87,119,173,128,252,89,126,60,226,99,37,33,30,61,211,236,143,186,125],[19,141,33,65,235,39,95,243,184,42,92,170,81,138,46,60,185,79,33,156,179,10,123,154,64,1,67,86,142,72,234,131],[34,108,219,164,104,108,228,92,12,66,116,97,143,187,205,149,224,181,197,149,197,109,93,180,19,45,20,53,238,167,83,250]], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("6jvwbc", [[86,102,51,96,5,135,82,115,105,203,235,157,168,78,241,167,94,100,223,66,232,84,7,132,47,73,199,136,64,169,242,121],[53,42,210,155,105,87,71,31,216,212,68,92,149,30,51,244,38,198,56,28,53,129,74,173,121,221,36,99,89,119,54,188],[163,222,125,145,58,220,174,8,21,118,76,247,246,210,226,128,251,222,154,122,21,135,51,68,23,20,238,61,75,174,151,122],[227,2,36,159,165,187,230,243,98,174,28,198,201,186,67,195,12,180,54,177,195,4,75,44,111,7,97,24,212,4,236,192],[75,126,53,53,233,28,204,254,172,225,145,245,203,165,171,41,99,136,178,145,124,137,39,60,242,72,74,3,182,12,96,51],[18,185,154,236,207,49,194,131,179,41,157,97,170,189,191,215,189,173,64,254,85,23,155,172,206,118,99,241,147,41,145,104],[183,75,229,44,29,31,42,176,172,246,185,103,221,151,106,136,86,153,82,236,40,71,57,190,107,105,80,8,36,78,15,77],[78,102,80,11,178,65,170,128,135,137,76,8,3,145,35,72,72,74,62,229,30,181,213,172,135,199,184,204,158,13,236,169],[122,247,167,250,176,181,78,136,54,94,182,228,116,249,55,240,59,213,8,33,204,24,142,96,20,171,23,152,215,242,87,227]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("ucgnji", [[208,88,69,243,134,131,59,19,135,255,218,49,25,43,132,92,93,42,163,57,5,169,36,117,89,21,162,169,174,214,52,243]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(45, "l2by4i", [[230,135,3,162,166,173,239,201,197,130,117,233,106,161,110,237,14,172,212,215,241,246,82,87,7,87,240,103,131,229,123,162]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(103, "Capstones", [[138,53,253,115,108,147,199,82,185,25,40,91,113,247,48,184,58,124,138,41,211,212,43,145,218,164,30,21,93,162,85,157]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("P", [[156,207,93,109,59,34,167,11,253,114,151,73,79,253,44,2,127,94,202,187,240,57,168,92,175,208,22,92,124,198,249,118]], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ERC1820_ACCEPT_MAGIC", [[95,158,103,30,192,44,229,26,153,96,239,4,54,13,220,237,44,148,30,155,232,124,2,199,211,254,30,223,13,145,22,166],[160,231,136,206,122,25,153,235,13,75,247,66,197,246,144,239,15,99,153,204,140,87,139,236,53,6,181,16,49,58,126,216]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(255, "ucgnji", [[150,127,14,21,183,139,115,100,128,156,59,188,45,203,193,222,222,186,7,71,33,121,78,168,103,223,204,141,147,241,138,41],[198,77,160,110,207,24,54,50,41,177,164,199,213,163,23,41,156,57,204,92,120,175,222,86,43,255,250,59,220,63,137,185]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(46, "l2by4i", [[187,90,6,215,201,51,78,173,217,239,84,34,170,39,253,70,29,164,227,14,68,207,228,40,122,215,143,114,173,164,91,97],[28,209,85,138,155,55,210,30,18,73,151,142,228,60,171,193,83,123,230,7,68,134,26,250,215,1,214,47,14,81,237,218]], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("L", [[119,62,119,75,177,238,146,26,61,240,74,115,128,248,15,75,215,236,122,27,142,204,71,2,234,74,90,167,50,139,231,70],[247,4,134,163,213,124,37,194,80,187,224,248,204,118,116,229,78,163,34,76,192,224,66,172,91,106,151,195,178,119,31,140]], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[253,115,129,198,242,50,73,178,95,227,98,110,57,62,252,234,211,231,133,177,11,211,220,246,170,123,15,163,5,27,219,85],[110,86,187,175,203,161,244,212,217,246,61,79,36,12,228,220,233,173,126,135,42,207,144,162,212,238,57,251,57,214,210,112],[133,183,209,242,179,69,218,41,4,91,225,5,39,7,12,130,106,76,163,58,115,244,72,161,91,255,182,16,18,224,172,199]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(24, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[132,105,240,52,223,85,123,121,97,202,102,231,105,165,32,70,80,112,50,165,74,218,234,157,19,62,114,199,191,242,242,44],[241,68,170,54,47,103,143,150,29,2,93,3,144,222,101,189,74,68,194,16,234,240,70,0,200,191,43,113,185,35,15,29],[154,60,112,87,76,72,109,155,73,147,18,44,101,76,163,64,55,114,255,26,88,95,66,146,144,1,131,36,96,104,127,18]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(103, "ERC1820_ACCEPT_MAGIC", [[75,115,226,143,7,117,60,213,130,83,32,70,146,219,44,198,175,221,87,236,30,97,59,17,186,42,27,178,201,31,96,56],[34,113,125,155,146,192,157,189,66,134,20,118,217,113,176,168,247,29,222,226,250,106,54,116,138,244,111,29,104,87,199,53],[44,174,141,15,202,95,210,39,155,216,149,249,85,148,71,181,51,143,146,79,224,240,72,159,116,232,182,60,141,128,168,137]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("q3xgd", [[56,246,159,50,120,51,216,85,203,120,239,122,118,84,255,50,49,79,63,250,123,248,157,141,218,180,6,16,101,151,138,208],[187,76,224,237,106,216,61,95,164,31,134,141,33,221,232,52,83,121,100,255,145,92,185,45,198,105,32,198,53,2,61,122],[139,51,79,213,100,170,88,68,25,57,208,126,68,245,118,249,23,222,15,203,231,216,163,61,246,67,1,255,86,86,248,167]], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("sdy38", [[86,40,29,96,241,129,227,132,255,190,153,55,91,239,244,12,17,91,165,83,247,47,179,150,238,118,148,64,132,109,228,94],[70,224,167,83,225,75,198,76,134,146,166,123,126,62,155,225,80,251,6,23,122,15,246,148,115,104,224,216,68,75,141,105],[124,174,171,246,252,79,159,53,48,71,168,48,98,101,129,18,188,255,142,177,53,81,93,205,159,142,31,233,133,124,35,78],[159,226,3,185,210,48,92,243,183,250,141,24,177,79,199,242,226,181,167,108,22,213,26,62,36,241,155,110,63,247,128,154]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(256, "Transaction successfully verified.", [[181,13,76,217,248,188,26,83,31,242,40,51,29,172,66,123,176,228,86,1,197,204,51,238,198,255,38,129,3,169,25,10],[197,105,237,32,189,238,193,149,44,133,142,117,17,153,241,40,197,48,111,32,17,100,158,24,176,45,168,119,238,243,210,107],[157,17,116,86,10,17,161,191,111,136,19,117,154,136,225,195,106,180,207,39,16,120,122,248,190,80,128,112,65,136,146,101],[164,249,0,23,27,216,198,215,14,119,59,148,180,184,24,90,140,44,142,129,129,174,98,137,78,127,110,147,150,112,57,101]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(6, "0", [[158,102,182,162,236,23,73,59,155,216,45,113,245,91,67,96,8,8,71,248,170,94,185,91,210,251,255,229,4,156,175,119],[192,141,223,93,4,155,216,240,22,99,239,128,106,175,69,107,84,108,4,249,113,132,115,247,175,75,53,120,244,72,17,91],[82,109,14,195,255,176,117,203,153,114,202,77,159,50,120,116,181,230,150,89,114,12,92,174,202,46,109,237,44,3,31,216],[169,94,195,203,84,139,148,29,46,196,68,164,160,97,79,3,94,142,24,229,147,24,129,79,84,239,80,64,160,75,5,13]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("ERC1820_ACCEPT_MAGIC", [[55,169,233,197,89,66,115,26,35,66,153,219,245,83,242,148,21,122,230,4,205,35,181,95,170,224,246,208,152,242,197,64],[233,150,110,182,116,141,55,74,129,184,79,114,160,93,238,26,1,52,223,116,19,94,24,143,187,208,47,70,79,81,33,56],[95,97,208,242,191,167,165,175,226,68,71,159,112,222,71,47,139,93,225,68,4,208,142,202,178,130,39,35,52,62,178,172],[93,82,176,181,61,2,55,152,189,40,255,112,217,38,143,7,150,152,14,30,6,145,105,196,121,182,91,32,120,232,38,45]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("3px1e6", [[68,9,97,41,4,55,220,83,159,166,51,114,18,172,102,0,72,190,26,128,251,20,35,227,194,72,149,39,114,1,190,157],[214,13,44,158,110,40,42,93,2,137,231,131,134,228,149,104,89,121,33,238,42,238,14,194,197,3,210,54,49,97,151,209],[166,115,118,11,184,14,87,138,106,246,184,207,73,86,18,234,171,90,73,199,13,73,219,200,198,135,119,188,130,186,79,102],[201,147,18,156,11,53,129,93,56,219,174,133,194,168,238,98,188,249,48,22,164,244,121,54,114,9,50,36,132,69,4,178],[150,185,235,5,123,108,246,37,251,4,54,43,229,143,54,123,153,166,235,61,175,55,94,246,186,115,156,243,203,54,154,60]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(87, "sdy38", [[109,123,232,153,202,213,134,211,140,137,93,251,47,202,148,131,200,211,217,54,114,62,240,248,74,115,173,205,104,114,120,74],[221,0,57,135,226,123,143,189,27,122,103,236,18,24,46,182,6,203,106,178,14,182,193,93,166,63,54,97,194,104,71,46],[251,11,120,60,92,7,116,194,141,222,69,36,46,175,207,232,243,208,254,175,11,122,141,6,245,101,93,93,52,117,216,149],[204,220,219,79,0,56,26,16,206,219,111,150,230,127,36,169,100,108,83,6,76,2,1,233,79,124,118,142,70,86,92,34],[1,30,206,212,38,91,159,196,31,237,35,15,88,175,48,195,96,238,178,107,217,122,198,52,67,5,10,8,44,123,34,239]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(15, "l2by4i", [[210,153,200,60,99,171,52,15,177,186,138,129,5,29,110,242,190,184,21,18,64,247,10,103,53,251,38,185,178,217,228,219],[223,44,156,156,121,144,1,247,171,194,24,25,225,77,71,226,5,33,116,172,242,48,5,47,156,98,66,181,36,18,184,167],[46,237,13,40,85,140,239,21,166,129,133,74,241,176,116,69,184,228,14,3,83,73,116,20,155,174,255,99,87,221,148,11],[209,0,244,133,70,34,12,254,43,16,53,62,40,177,226,45,210,232,149,16,135,115,18,63,123,55,112,197,169,6,89,219],[199,70,154,16,192,27,23,73,184,116,60,208,79,138,177,44,255,140,38,50,42,128,35,237,238,197,6,5,147,129,127,142]], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("sdy38", [[240,32,103,90,64,134,35,197,156,216,198,199,70,104,152,177,177,229,29,83,233,61,80,143,12,129,230,211,45,123,251,18],[186,154,139,122,52,118,69,71,174,186,161,118,105,84,231,111,75,191,168,88,85,195,206,86,102,83,53,88,157,204,231,106],[40,118,166,7,79,45,120,12,103,67,225,87,137,122,233,177,40,167,22,241,120,6,233,84,148,118,75,194,220,255,18,159],[206,239,241,151,114,230,202,39,110,51,221,119,90,204,156,125,85,60,231,168,155,23,34,83,168,169,66,213,211,188,140,92],[18,110,220,44,13,107,34,150,210,203,148,178,3,146,248,163,10,197,206,169,7,13,237,77,222,201,77,190,93,208,65,188]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([81],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[5],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(101,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("[", "P",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("q3xgd", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("l2by4i", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("sdy38", "3px1e6", "l2by4i",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("Capstones", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "0", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("0", "6jvwbc", "6jvwbc", "[", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("P",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("3px1e6", 97,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("vnyt9q", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("3px1e6",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("q3xgd", 15,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("6jvwbc", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(161,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","\x19Ethereum Signed Message:\n32","[","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[45,246,87,114,65,97,94,52,49,169,9,177,20,252,152,96,228,90,254,33,79,42,20,187,237,209,216,56,115,144,43,112],[134,158,244,64,238,52,160,153,10,14,83,17,139,149,247,3,76,95,24,69,190,250,247,91,68,6,101,170,153,161,81,173],[35,165,26,26,134,179,236,114,195,220,26,209,191,63,189,30,143,205,39,117,143,116,95,30,65,240,177,118,71,230,152,61],[103,17,149,24,64,152,231,118,184,215,24,153,114,242,84,167,173,223,72,174,184,184,27,75,36,212,106,87,236,157,45,79],[240,104,230,192,130,141,82,253,80,71,11,171,6,125,76,26,30,238,241,98,120,96,230,248,126,111,115,65,208,26,123,4],[184,113,200,209,186,61,54,110,88,156,23,94,72,129,152,26,193,197,81,1,11,77,61,213,22,36,171,150,221,111,180,89],[31,80,218,122,66,149,115,90,179,68,146,21,15,130,248,67,24,38,211,67,115,29,19,85,59,52,5,217,26,116,114,128],[154,35,3,148,7,16,86,189,254,19,68,123,150,42,145,145,56,155,49,155,117,211,234,31,175,184,200,88,29,5,237,26],[193,14,88,35,95,87,250,200,30,6,104,14,208,2,0,16,43,196,99,168,56,140,237,241,20,197,20,64,14,241,91,65],[221,194,180,37,89,44,45,164,79,227,110,238,81,161,221,24,97,127,34,212,145,100,64,75,180,156,114,154,173,143,92,62]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(27, 24, 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([30,74,218,45,125,207,236,81,201,164,183,161,33,202,247,90,87,179,64,6,203,96,113,222,65,249,243,84,96,91,39,124], [77,52,242,163,177,23,155,130,148,29,188,232,250,154,57,113,202,75,13,199,251,164,147,95,91,46,244,77,188,176,170,75],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([236,187,80,20,247,252,104,150,196,54,82,106,137,164,252,84,253,198,200,34,94,234,219,194,253,127,159,18,15,221,111,181], [69,204,76,108,0,27,1,223,243,42,242,233,95,92,78,176,47,202,200,112,189,38,168,224,48,35,119,83,103,174,233,245], [159,138,113,131,101,213,187,156,174,3,229,240,70,131,8,148,200,79,51,1,104,222,98,175,162,144,110,148,109,187,79,185],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([245,59,128,134,239,182,186,19,53,43,181,60,126,165,68,4,219,61,19,137,194,119,130,88,75,124,143,48,154,55,138,68], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([129,54,189,209,173,16,149,166,19,116,127,75,149,249,239,186,0,210,68,15,130,80,7,66,140,46,253,189,83,35,254,81], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([217,17,178,33,82,250,169,226,73,139,81,30,234,11,142,205,5,155,124,141,87,50,122,183,52,158,179,214,19,121,243,205], "P", [0,202,242,75,206,81,41,39,253,91,95,95,128,60,76,181,202,81,90,103,54,57,56,226,136,252,67,139,57,189,154,196],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([115,124,58,81,92,198,150,166,143,123,74,237,81,245,183,109,216,44,27,216,155,16,113,27,194,96,229,57,26,200,84,47], "6jvwbc", [52,166,57,194,78,156,84,36,80,79,201,37,98,213,32,163,124,222,11,189,95,150,38,199,61,219,105,219,201,115,104,126],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([37,30,134,216,222,217,240,199,182,159,151,130,38,50,111,54,63,174,59,45,89,228,154,132,7,56,247,203,3,133,237,9], [95,211,73,2,8,205,59,22,253,228,121,32,73,127,154,85,255,98,229,205,241,135,67,201,170,79,54,76,4,131,237,241], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([37,30,134,216,222,217,240,199,182,159,151,130,38,50,111,54,63,174,59,45,89,228,154,132,7,56,247,203,3,133,237,9], [84,49,239,147,182,49,240,215,164,129,183,69,86,94,225,61,196,203,249,247,223,105,79,170,166,115,138,109,26,58,228,233,53], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([72,226,108,253,188,193,167,25,175,198,108,153,71,76,184,55,121,233,208,94,94,52,80,190,121,176,147,171,145,154,198,34], [73,55,165,230,24,44,133,207,230,122,97,140,210,163,27,87,80,225,105,229,171,121,216,192,228,54,173,90,92,146,156,114], [105,211,66,202,235,122,193,74,68,164,140,46,150,6,104,115,12,16,76,60,125,235,216,43,84,178,224,48,38,134,140,57], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([224,87,248,79,182,232,22,236,101,48,1,172,134,250,239,11,142,92,254,224,226,166,85,10,10,176,50,34,94,149,243,28], [167,237,186,17,164,58,57,56,30,203,119,156,40,171,220,11,36,108,141,77,189,181,56,232,86,125,57,231,14,233,146,97], [104,67,105,172,139,14,42,12,240,2,209,13,32,23,97,84,213,189,132,225,33,73,5,226,18,108,105,154,243,35,132,249], "6jvwbc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([191,182,178,232,26,22,245,198,81,160,166,168,143,239,165,240,254,124,54,123,168,172,183,18,191,43,217,105,181,151,144,130], [5,128,3,9,59,221,246,110,253,174,196,248,136,166,122,211,166,127,20,68,125,169,58,164,217,70,137,109,204,160,127,194], [31,74,223,43,196,64,186,68,166,110,208,199,213,28,204,169,220,60,94,150,108,90,198,229,21,29,90,119,104,166,251,177], "3px1e6",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([16,189,6,34,164,230,156,170,117,174,241,73,223,156,90,81,119,225,117,102,100,84,147,23,72,97,97,192,231,164,78,148], [221,212,166,142,53,128,9,62,23,31,134,101,123,156,169,199,250,253,5,145,232,29,125,120,0,229,170,107,96,113,165,233], [213,238,152,211,250,85,74,85,32,223,13,198,40,92,105,114,145,58,159,47,14,45,203,190,219,206,123,89,195,12,219,34], "q3xgd",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([49,228,219,227,55,35,203,162,192,134,32,149,126,246,71,133,132,210,233,72,125,126,245,234,11,124,49,19,240,153,251,97], [206,6,73,138,211,139,165,79,240,233,88,157,44,225,4,209,142,127,98,16,157,39,98,69,89,208,101,178,24,9,32,81], [96,110,241,52,151,102,194,45,118,91,200,224,4,70,202,33,119,233,86,71,192,57,0,180,14,240,3,69,150,128,154,25], "j8pjf",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([254,210,32,192,164,163,194,158,243,14,118,229,5,150,110,129,130,227,198,96,230,146,80,159,32,180,227,201,183,17,27,155], [182,64,231,84,55,42,36,182,69,56,10,67,151,13,132,105,138,91,244,245,251,195,194,149,131,220,99,132,217,99,59,100], [146,44,103,109,168,241,44,174,229,109,51,75,23,118,107,37,26,202,232,240,176,224,162,91,123,158,180,115,100,9,163,189], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([119,135,164,67,48,147,130,46,219,153,163,197,192,148,80,169,8,66,24,251,216,186,153,254,132,149,229,181,103,247,245,246], [212,104,170,44,252,190,74,46,179,68,82,100,43,81,6,156,96,247,189,191,196,132,30,186,228,174,45,106,99,131,124,78], [71,50,123,215,76,249,55,233,88,156,199,57,211,237,253,89,18,111,78,164,41,162,124,14,221,188,76,68,76,156,237,235], "3px1e6",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([138,86,62,214,198,192,215,126,22,96,151,119,174,239,49,143,237,233,75,139,85,54,214,116,194,200,140,204,37,44,253,96], [36,91,120,136,49,31,110,171,201,149,216,118,221,191,212,3,30,235,36,223,210,208,170,102,123,188,72,153,38,194,181,5], [139,47,10,162,1,243,154,157,219,144,77,79,220,13,12,156,85,32,95,122,161,17,155,143,82,237,129,186,93,238,66,212], "j8pjf",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([248,12,73,60,162,89,198,12,207,134,193,70,71,252,136,184,205,117,68,60,211,150,59,227,138,160,181,97,84,31,88,48], 6, 87, [130,113,78,227,249,91,120,195,151,134,40,25,1,130,113,78,203,27,171,235,101,46,52,99,89,118,162,154,134,77,105,107], 1532892064,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([42,152,147,91,200,125,20,38,142,105,228,159,248,70,8,238,177,120,134,54,122,2,19,121,54,186,247,139,46,232,112,115], 98, [2,17,103,254,71,63,236,8,237,57,168,7,38,29,125,119,64,7,230,239,113,22,34,93,53,248,234,217,89,204,71,118], [221,59,83,218,178,128,20,215,121,248,51,7,249,230,82,198,170,83,119,138,234,9,162,8,180,157,205,14,131,87,30,141],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([102,9,181,92,105,73,171,157,144,1,143,220,96,188,248,47,159,80,14,107,227,187,245,210,43,127,69,180,229,172,184,201], [185,170,64,73,108,138,103,106,153,101,185,113,147,80,85,12,25,29,216,175,64,73,118,232,109,240,189],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([176,132,134,229,32,73,22,231,195,227,98,105,131,117,0,184,182,233,64,166,44,212,59,102,156,108,253,197,80,133,180,199], [201,225,16,98,121,79,24,147,94,79,0,102,134,48,19,123,167,170,238,156,91,198,50,35,47,48,180,63,7,183,24,135,17,201,9,72,124,235,201,173,193,76,83,230,119,39,175,169,77,124,50,82,171,49,45,226,244,95,168,41,68,255,21,19,82],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
