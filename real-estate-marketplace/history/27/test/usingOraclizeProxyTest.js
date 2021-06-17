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
    contractERC721MintableComplete = await ERC721MintableComplete.new("L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("ERC1820_ACCEPT_MAGIC","L","\x19Ethereum Signed Message:\n32",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("ERC1820_ACCEPT_MAGIC","L","\x19Ethereum Signed Message:\n32",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(55,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("0", 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("ERC1820_ACCEPT_MAGIC", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(30, "[", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(15, "P", "Transaction successfully verified.", 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("P", "Transaction successfully verified.", 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Capstones", "Transaction successfully verified.", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(20, "L", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "mekkxj",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(17, "L", "\x19Ethereum Signed Message:\n32", "L", 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("mekkxj", "qolujq", "\x19Ethereum Signed Message:\n32", 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["qolujq","0","L","Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","\x19Ethereum Signed Message:\n32","L","ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1532892064, "\x19Ethereum Signed Message:\n32", ["0","mekkxj","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0","P","3lq0u","0","Capstones","ERC1820_ACCEPT_MAGIC","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(25, "[", ["3lq0u","0","mekkxj","["], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("P", ["P","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","Transaction successfully verified.","mekkxj","P","Capstones","[","Transaction successfully verified."], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("P", ["\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(1532892062, "vdn64", ["Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(162, "qolujq", ["0"], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("qolujq", ["["], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("qolujq", ["qolujq","qolujq"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(101, "L", ["[","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(3, "vdn64", ["xogw2k","Capstones"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("\x19Ethereum Signed Message:\n32", ["L","3lq0u"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("L", ["mekkxj","Capstones","vdn64"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(96, "0", ["[","[","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(59, "ERC1820_ACCEPT_MAGIC", ["mekkxj","ERC1820_ACCEPT_MAGIC","mekkxj"], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("Transaction successfully verified.", ["Transaction successfully verified.","Transaction successfully verified.","\x19Ethereum Signed Message:\n32"], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("0", ["ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC","3lq0u"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(0, "3lq0u", ["vdn64","qolujq","P","qolujq"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(98, "3lq0u", ["Transaction successfully verified.","ERC1820_ACCEPT_MAGIC","[","mekkxj"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("nmuekh", ["L","ERC1820_ACCEPT_MAGIC","vdn64","Transaction successfully verified."], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("P", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","qolujq"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(65, "qolujq", ["L","Capstones","[","ioq77q","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(4, "P", ["ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC","Transaction successfully verified.","ioq77q","Transaction successfully verified."], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("Capstones", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC","qolujq","[","ERC1820_ACCEPT_MAGIC"], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("ERC1820_ACCEPT_MAGIC", [[145,115,241,184,237,183,152,52,14,94,195,38,85,9,229,142,120,121,22,40,119,47,143,30,79,85,97,205,81,227,65,49],[241,65,157,122,207,167,19,176,0,159,47,224,169,14,48,243,170,231,185,250,25,35,160,110,2,182,63,246,2,191,68,171],[75,124,87,216,177,131,218,144,182,203,179,126,21,178,36,198,239,2,162,237,199,197,184,225,180,206,225,12,137,39,176,75],[25,96,147,210,45,125,229,75,190,80,24,134,119,30,155,155,88,37,251,8,228,73,182,153,137,78,240,86,18,2,16,8],[72,204,126,225,42,24,171,233,133,116,210,57,106,31,153,136,95,194,44,84,190,181,159,190,116,0,53,104,128,221,18,156]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(0, "nmuekh", [[7,228,9,172,215,45,165,229,72,226,150,104,254,187,42,42,238,178,91,100,165,28,29,105,230,14,73,185,154,40,47,214],[90,167,208,91,111,35,187,180,149,202,193,58,91,97,9,38,26,98,238,138,115,142,198,216,141,36,114,166,170,7,224,124],[31,32,85,17,78,240,44,75,148,221,42,75,227,56,27,241,112,33,5,69,48,23,216,193,44,112,14,87,62,174,41,252],[254,70,157,89,148,170,29,79,168,76,100,139,155,230,207,78,186,97,69,234,232,252,139,7,76,129,91,174,153,36,75,30],[242,165,135,185,210,234,251,134,172,160,127,8,105,237,184,29,206,113,192,247,51,186,93,234,245,100,244,96,38,42,32,40],[4,103,229,64,101,217,78,251,41,4,129,46,59,131,201,142,169,231,79,49,142,55,235,0,103,126,203,162,90,168,11,253],[59,38,50,197,208,158,249,121,239,181,141,255,142,222,219,88,183,185,53,238,234,17,156,41,12,6,38,20,207,73,93,186],[195,174,49,237,171,235,249,60,224,238,25,72,255,165,149,24,97,108,50,39,34,25,42,48,135,61,190,175,131,43,239,180]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(86, "zom4w", [[61,245,123,39,224,115,248,24,172,4,37,246,251,137,238,210,252,78,196,234,212,25,196,93,58,61,11,127,153,30,39,255],[41,196,128,146,108,187,227,191,196,238,251,92,123,81,148,112,100,203,172,209,102,57,20,210,192,241,214,162,25,250,215,133],[102,196,218,100,70,212,9,2,1,168,242,58,44,89,64,49,239,36,188,104,251,170,206,11,27,213,110,153,126,180,169,91],[245,44,142,153,199,37,105,151,123,53,190,221,160,18,106,157,47,116,48,113,149,15,22,156,112,180,59,53,105,204,89,226],[154,179,141,12,254,164,25,114,4,240,113,140,3,135,26,16,30,224,84,131,148,204,188,183,205,220,149,147,232,57,133,214],[240,71,120,191,49,210,71,171,208,237,20,31,81,123,103,201,103,162,87,134,116,93,251,63,165,219,89,91,44,1,135,18],[221,207,184,35,179,188,235,209,38,112,7,67,160,29,170,9,176,85,101,202,18,105,135,215,203,57,5,237,19,129,186,216],[196,66,229,214,254,35,120,186,134,56,207,242,65,186,71,199,245,86,191,48,188,154,110,99,59,24,228,65,113,91,156,11]], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("Capstones", [[87,149,45,59,60,233,24,245,140,158,28,224,72,168,1,10,227,177,127,107,198,188,53,119,42,124,239,138,158,69,192,89],[88,149,155,195,254,246,47,53,77,176,179,121,87,241,225,30,178,72,202,162,187,10,93,183,182,102,87,201,204,93,219,44],[79,53,106,115,57,97,146,106,87,55,176,121,12,180,240,169,242,197,130,173,34,178,174,235,188,248,245,1,23,209,186,191],[181,173,131,66,163,200,109,51,198,253,164,9,75,101,231,43,176,211,135,70,63,140,111,161,45,203,206,1,215,63,33,85],[94,227,35,45,9,105,216,224,98,21,214,211,90,142,110,65,61,171,132,31,89,182,126,126,221,135,67,65,59,158,227,108],[235,189,12,247,65,116,205,113,252,51,136,216,49,119,202,85,187,175,173,15,168,25,157,6,217,117,193,103,118,136,1,62],[187,194,114,167,94,103,205,72,211,174,73,154,171,4,12,58,0,246,237,135,75,43,67,82,28,46,92,24,70,52,51,132],[124,135,172,143,3,15,94,95,20,39,198,19,40,146,162,183,107,61,45,56,111,124,160,210,86,91,109,121,101,193,217,10],[55,243,136,188,22,155,54,63,3,10,190,146,251,136,144,254,143,39,179,185,240,207,198,217,92,248,73,37,61,229,114,99],[167,167,35,84,191,84,30,238,129,39,199,250,15,222,148,104,149,120,238,200,247,96,26,88,55,187,227,217,183,253,244,134]], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[3,5,40,13,13,39,227,126,158,230,192,244,1,116,228,15,182,87,70,91,194,106,216,30,161,128,111,240,113,156,167,51]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(60, "[", [[70,160,122,85,100,217,155,193,150,232,146,187,194,253,58,20,143,7,106,234,77,88,181,176,17,121,119,181,37,24,70,111]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(69, "3lq0u", [[92,248,93,116,14,113,187,245,0,106,222,27,180,119,196,52,89,191,209,29,75,200,248,167,92,210,22,41,61,242,100,10]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[83,56,34,62,188,229,224,74,192,186,122,159,176,225,240,70,5,231,194,153,252,124,215,146,184,98,172,23,137,142,185,241]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[221,51,42,75,10,201,134,234,2,103,146,59,243,166,119,195,108,177,92,12,214,235,164,94,45,108,121,145,134,41,87,167],[8,166,125,162,213,194,202,242,166,116,103,200,65,200,138,154,93,13,117,213,62,172,227,208,113,64,106,3,93,214,96,45]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(18, "P", [[14,122,134,93,56,70,33,211,48,80,18,183,98,19,97,36,201,48,199,174,175,254,194,124,232,44,191,193,241,119,225,177],[193,196,135,142,31,209,57,2,253,32,14,108,166,248,196,83,142,161,114,231,208,157,43,139,88,69,203,94,176,203,9,31]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(16, "\x19Ethereum Signed Message:\n32", [[238,188,242,69,116,163,15,193,233,35,231,172,203,50,184,147,38,66,145,231,37,22,103,62,147,151,69,20,251,53,243,58],[216,65,163,157,51,103,7,188,38,193,179,143,29,245,14,71,119,38,120,200,126,229,8,138,50,212,18,158,183,224,78,180]], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("qolujq", [[216,53,94,160,151,33,127,179,201,229,0,81,38,228,60,210,29,146,69,138,221,84,57,154,228,16,32,163,120,225,245,29],[48,175,207,189,82,51,65,239,11,57,182,35,35,18,213,44,44,26,10,138,60,183,182,63,149,4,182,129,35,93,136,198]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("Transaction successfully verified.", [[162,33,1,52,231,7,250,62,219,225,83,84,194,54,224,146,168,92,239,199,189,218,92,122,236,196,28,91,13,134,1,102],[11,95,184,198,142,137,97,110,148,86,243,204,225,167,119,120,227,196,104,170,23,97,212,144,151,135,110,13,244,241,172,47],[35,107,97,206,150,8,194,140,2,211,250,24,53,16,247,232,151,34,2,50,230,84,71,236,44,64,173,50,199,5,83,141]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(49, "ERC1820_ACCEPT_MAGIC", [[152,234,128,135,30,36,50,123,50,80,174,241,174,98,247,82,176,11,206,169,192,78,91,222,156,210,140,27,185,214,0,180],[101,55,33,25,83,104,246,128,252,151,157,41,118,135,246,178,206,122,5,108,100,11,85,116,130,47,102,87,170,171,131,151],[162,77,18,94,198,176,221,34,155,25,109,87,229,21,58,167,117,177,140,241,22,23,245,253,254,129,26,12,223,199,12,116]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(33, "xogw2k", [[52,212,144,2,246,207,30,122,184,196,58,26,179,83,226,54,121,231,176,59,42,224,84,39,0,110,166,196,173,190,28,127],[56,87,96,62,56,133,75,189,73,63,197,43,161,76,163,120,26,219,33,177,252,158,204,32,153,154,123,158,134,76,171,5],[35,244,152,231,114,160,48,63,202,21,11,228,16,255,204,45,190,57,140,127,147,247,221,123,56,219,199,150,252,91,113,56]], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("P", [[38,210,88,6,165,164,43,110,30,189,56,239,20,233,90,193,214,245,148,226,243,197,93,147,15,235,57,136,112,17,209,110],[11,151,74,206,42,119,110,20,123,169,224,0,147,60,21,166,80,215,228,56,117,19,146,171,198,113,231,239,208,173,234,196],[195,0,254,192,112,74,170,191,252,118,187,59,11,140,2,13,58,19,89,212,111,117,127,82,43,241,142,146,100,157,101,90]], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("ERC1820_ACCEPT_MAGIC", [[72,230,40,172,44,212,197,200,234,32,172,138,37,65,32,140,44,70,162,29,92,115,140,106,145,109,189,45,228,222,21,152],[14,45,53,249,171,18,208,33,161,218,207,142,28,211,99,42,63,46,236,54,178,216,134,74,116,202,103,36,167,120,219,172],[138,8,14,98,194,66,250,111,207,254,96,41,57,54,218,151,95,74,232,82,86,195,234,59,242,225,17,12,54,136,58,133],[51,117,239,178,91,174,49,46,139,203,217,156,89,211,35,117,222,229,30,240,12,244,64,222,128,235,238,172,136,108,161,102]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(55, "L", [[109,26,210,160,32,243,218,4,67,226,67,15,139,21,103,3,217,81,239,184,105,81,90,89,247,75,112,200,137,158,189,114],[135,102,14,177,189,95,66,119,90,140,194,161,95,96,46,105,67,1,188,31,91,21,219,32,24,85,174,205,238,166,234,8],[227,223,72,248,143,195,229,249,230,13,196,175,19,151,220,160,119,148,105,192,106,254,19,62,223,153,184,116,147,31,199,14],[189,75,212,45,216,166,150,169,74,122,230,49,136,212,198,88,118,46,229,49,105,90,93,15,67,196,190,229,251,125,175,42]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(47, "3lq0u", [[65,10,59,186,187,247,151,152,32,189,68,248,36,245,55,219,149,230,241,136,154,97,32,230,155,61,69,190,24,27,206,91],[41,146,169,98,193,58,154,157,44,251,172,85,198,37,157,208,29,32,43,216,174,89,69,148,154,6,177,214,156,44,44,114],[210,30,134,183,96,15,143,123,176,254,246,235,126,102,168,178,45,73,81,199,65,28,250,182,67,95,160,211,205,126,27,207],[2,194,185,9,90,114,82,8,190,108,205,26,152,137,97,76,20,78,242,196,76,220,162,112,103,13,67,188,1,23,65,34]], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("\x19Ethereum Signed Message:\n32", [[128,81,180,239,146,238,211,122,202,114,26,192,184,61,79,67,137,126,81,13,168,188,33,131,226,208,193,238,103,7,8,148],[27,88,234,237,69,34,118,86,36,221,245,85,50,16,51,251,93,6,100,81,32,173,95,125,47,96,65,125,153,180,40,86],[197,216,67,149,181,169,196,172,72,81,21,126,223,34,148,12,67,111,159,30,36,209,151,41,186,251,64,190,99,253,40,210],[72,84,81,164,144,254,92,27,209,127,94,185,163,24,212,212,104,91,90,87,17,85,69,186,70,37,57,6,33,129,17,1]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("[", [[176,142,38,49,130,180,176,88,182,221,92,253,68,177,10,37,241,228,223,47,227,13,101,172,122,235,123,79,47,230,1,190],[24,21,148,157,218,113,140,208,114,124,46,150,118,74,118,226,175,130,229,178,131,57,160,138,170,195,141,174,126,128,159,137],[54,172,57,199,211,223,78,43,38,146,150,153,143,103,108,9,196,221,128,211,140,194,203,162,50,170,49,162,2,177,151,73],[199,92,103,21,156,219,104,244,40,133,130,7,177,246,235,223,14,15,212,44,101,122,79,251,91,193,7,189,127,16,234,69],[251,246,219,59,179,251,127,134,176,109,130,128,176,185,98,247,253,138,178,203,252,28,56,201,111,201,99,91,195,87,67,202]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(31, "mekkxj", [[85,217,14,90,204,155,1,231,100,183,13,250,236,95,95,136,208,215,247,84,31,160,59,80,253,114,158,169,184,203,193,86],[216,82,50,168,22,53,188,152,160,0,46,124,31,166,212,252,14,59,243,90,4,90,122,148,94,116,253,147,177,120,252,172],[208,174,4,42,109,156,92,50,145,118,120,93,178,215,237,179,123,100,220,197,39,5,182,240,244,129,54,128,197,4,109,240],[220,152,48,76,125,37,155,143,23,57,102,74,170,87,91,84,124,164,232,136,152,188,145,163,249,10,144,95,107,130,43,48],[44,183,84,44,81,174,100,81,18,168,95,181,64,235,37,48,18,28,171,0,179,185,140,155,3,30,206,2,130,126,89,150]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(254, "Capstones", [[85,43,231,186,149,155,254,161,171,255,131,187,18,229,92,44,101,149,139,5,97,147,47,118,187,157,54,196,255,11,228,167],[146,118,156,231,16,168,155,211,167,91,94,119,138,61,8,6,23,151,160,230,17,131,150,204,218,48,2,147,194,53,141,160],[168,103,86,221,224,120,178,39,77,201,106,10,157,86,245,63,60,144,200,95,138,238,37,183,213,149,35,3,182,40,194,206],[171,213,47,143,162,54,232,167,69,247,87,208,85,168,47,52,194,206,2,255,173,182,33,26,175,252,196,86,65,38,21,107],[10,63,213,71,234,100,54,26,80,72,85,130,113,67,203,59,38,190,69,194,64,182,72,32,106,233,191,212,34,72,247,112]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("nmuekh", [[177,100,127,94,200,255,253,104,242,197,34,94,146,164,224,39,101,133,106,226,122,185,133,251,19,19,191,63,208,204,242,39],[179,199,249,141,255,169,30,143,158,33,54,165,77,8,70,101,2,233,192,19,206,85,210,248,121,54,206,186,236,142,207,4],[229,34,212,4,187,126,56,135,132,203,217,235,118,93,84,84,78,47,8,185,48,248,229,165,24,196,34,108,86,231,201,190],[4,216,80,41,106,67,137,211,17,66,210,62,153,145,206,153,249,98,52,195,12,106,185,227,161,173,208,8,30,227,38,197],[212,43,47,113,117,96,203,23,116,96,163,34,19,245,172,200,122,167,41,207,124,224,53,191,116,48,59,238,193,137,90,194]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([132],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[3],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(32,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("zom4w",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("0v1bqo", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("0", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("3lq0u", "[",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("zom4w", "ioq77q", "nmuekh",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("\x19Ethereum Signed Message:\n32", "rmfizb", "xogw2k", "6rcaln",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("ioq77q", "0v1bqo", "xogw2k", "0v1bqo", "6rcaln",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("rmfizb",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("zom4w", 30,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ERC1820_ACCEPT_MAGIC", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Capstones",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Transaction successfully verified.", 1024,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Capstones", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(15,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["Transaction successfully verified.","qolujq","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","zom4w","0v1bqo","zom4w","Transaction successfully verified.","ERC1820_ACCEPT_MAGIC","rmfizb"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[147,21,49,83,2,132,179,128,82,200,220,130,223,11,67,216,254,216,152,205,216,66,216,64,51,205,184,150,254,223,153,92],[149,43,60,90,134,10,36,204,201,36,190,100,229,110,159,68,30,23,153,125,216,0,105,73,92,84,78,79,40,37,208,2],[234,209,7,87,162,27,211,190,50,107,175,141,220,99,217,11,193,249,117,148,108,178,57,94,78,50,193,17,253,159,107,192]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(101, 25, 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([115,221,245,177,91,118,27,99,83,141,250,42,150,163,166,73,162,26,149,215,82,207,113,39,34,79,199,240,113,21,245,243], [247,173,241,95,74,5,226,235,65,112,25,28,106,29,88,111,52,198,84,242,212,140,42,231,216,235,142,131,39,245,201,247],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([14,11,7,144,163,77,43,227,162,247,16,107,223,196,57,189,171,253,251,104,91,227,80,213,2,110,136,217,116,173,237,212], [92,83,182,153,158,31,111,17,139,116,245,164,80,29,97,106,76,135,154,159,158,117,141,113,123,229,238,115,58,68,229,141], [117,189,69,111,226,78,9,56,203,12,183,199,243,74,251,19,209,190,85,39,200,116,111,237,132,39,0,183,88,252,139,127],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([106,171,103,160,31,209,250,97,76,33,172,32,126,35,192,60,78,129,2,49,128,201,179,58,225,42,233,227,145,201,226,188], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([177,138,51,32,166,216,148,197,4,159,47,47,77,141,80,198,119,187,37,199,50,176,104,227,245,46,45,211,176,53,29,152], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([49,193,130,221,100,22,34,214,187,19,107,110,133,16,165,116,76,93,96,69,20,51,106,43,5,138,126,14,222,116,8,75], "rmfizb", [214,193,95,15,160,126,61,236,236,76,10,93,165,118,158,99,233,1,130,246,173,20,8,182,214,29,26,234,43,183,183,44],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([217,26,59,184,162,127,6,59,174,182,57,47,194,201,43,221,181,202,19,48,145,234,15,117,11,64,211,225,61,160,81,35], "\x19Ethereum Signed Message:\n32", [125,140,253,227,97,65,78,106,90,123,175,157,66,140,247,53,96,138,157,61,63,104,208,58,166,225,64,224,126,204,242,206],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([209,96,36,186,68,9,171,27,253,156,78,235,35,99,114,151,116,98,13,117,78,43,217,213,88,211,165,195,14,213,182,76], [158,213,45,135,202,8,23,190,238,234,79,67,68,26,171,209,176,212,59,218,193,26,117,255,76,221,164,152,32,34,205,149], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([209,96,36,186,68,9,171,27,253,156,78,235,35,99,114,151,116,98,13,117,78,43,217,213,88,211,165,195,14,213,182,76], [179,14,117,7,14,52,68,9,26,152,93,226,42,93,122,197,212,224,104,88,153,238,74,240,23,25,196,173,192,33,213,107,56], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([135,176,104,51,255,94,243,196,55,166,69,2,35,45,190,2,132,4,31,198,81,173,220,23,44,32,232,194,129,28,74,0], [185,57,242,151,14,170,217,243,196,151,169,242,140,92,18,45,217,73,214,104,127,55,215,126,213,97,188,209,191,139,62,127], [199,42,101,142,245,71,238,153,224,40,146,87,71,114,195,14,206,87,93,102,238,118,59,181,195,179,47,90,65,32,226,135], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([202,147,168,130,5,249,23,121,202,60,224,210,44,245,172,51,4,228,46,169,180,80,91,231,57,93,131,101,206,27,23,151], [199,33,69,1,6,33,54,111,17,182,164,66,139,110,48,195,166,253,235,231,110,143,32,168,241,193,28,61,223,58,95,166], [171,253,66,87,143,8,48,85,192,253,151,5,241,84,91,42,221,58,86,242,131,125,189,184,195,159,170,170,8,171,133,16], "qolujq",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([116,228,185,251,141,42,215,163,109,66,225,244,140,164,202,21,81,53,135,229,23,55,227,88,192,223,75,38,126,213,196,90], [245,241,227,163,87,165,72,195,3,211,79,116,171,94,80,32,109,77,1,42,129,209,67,74,163,86,142,163,76,191,208,199], [235,0,162,141,34,162,94,149,140,5,204,92,42,48,147,74,148,170,80,8,20,164,200,47,140,165,6,149,248,87,217,125], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([200,180,219,167,184,15,193,16,220,96,186,98,35,120,160,75,91,162,52,237,17,193,146,68,114,237,255,170,246,114,157,196], [225,246,88,192,222,47,103,9,224,97,210,144,32,215,95,142,40,56,195,170,66,55,45,252,12,172,174,44,201,3,182,29], [245,150,46,88,74,29,247,22,161,142,116,138,58,23,207,1,188,51,191,10,118,86,68,101,241,93,136,128,150,122,198,185], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([160,168,93,146,90,178,126,39,190,129,110,228,244,73,166,80,106,122,6,184,98,223,96,149,184,32,170,161,136,107,25,217], [26,59,68,140,19,181,244,143,163,96,235,24,180,251,10,6,104,22,132,66,13,164,46,144,19,108,232,9,79,29,167,17], [167,210,105,128,249,140,62,45,31,85,99,202,145,68,202,144,39,121,51,114,127,217,44,62,13,156,241,248,212,58,228,190], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([28,78,223,174,133,106,114,121,241,241,8,71,8,176,51,191,136,239,177,21,4,104,129,129,137,40,26,121,23,88,8,58], [218,206,51,132,143,122,101,29,66,174,172,28,119,165,114,126,76,155,180,133,184,210,252,47,242,60,68,255,12,75,81,121], [88,250,33,77,203,238,213,188,162,244,107,159,14,116,65,91,32,91,128,108,179,191,92,9,66,118,133,1,193,196,190,102], "xogw2k",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([18,43,2,61,57,247,135,17,78,219,145,86,232,46,48,135,225,84,107,72,223,190,252,21,73,233,178,84,150,208,106,194], [193,202,137,206,166,177,75,83,217,251,75,150,162,129,5,229,117,36,47,226,117,71,52,24,94,26,132,96,28,95,254,173], [206,193,174,173,5,143,28,86,249,20,121,19,59,179,122,221,106,49,24,250,81,165,234,191,170,149,136,196,205,124,97,144], "qolujq",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([243,223,16,201,197,149,53,16,191,55,234,103,86,40,26,84,137,232,78,0,173,210,23,61,243,225,238,29,100,15,144,71], [7,180,180,79,19,232,90,112,193,172,101,105,5,85,71,22,197,113,144,55,181,215,23,72,182,136,24,36,206,120,128,35], [204,218,167,46,134,48,245,228,210,190,4,180,242,229,211,215,209,117,57,231,55,151,81,25,253,12,45,128,95,178,93,89], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([158,162,103,201,237,67,251,51,104,182,31,175,3,156,249,153,96,204,226,25,117,197,58,142,177,79,131,169,153,118,154,95], 2014223715, 2014223716, [161,131,3,26,114,22,47,72,112,183,54,1,157,241,231,156,153,138,175,59,16,236,245,84,53,248,169,193,23,19,239,184], 47,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([155,212,212,79,78,44,66,77,32,229,62,171,162,165,195,124,227,214,122,208,185,0,105,156,200,80,72,186,90,54,232,154], 18, [247,203,137,60,71,193,85,42,172,246,254,100,203,220,184,70,181,195,2,213,157,251,204,73,70,14,13,75,213,133,235,43], [199,147,190,208,99,177,207,215,62,37,39,250,17,161,188,50,98,131,28,102,157,133,166,148,244,31,42,29,37,91,1,217],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([70,177,195,101,103,119,36,164,18,154,219,25,177,145,43,131,111,226,53,227,48,40,219,146,6,129,253,67,254,238,206,165], [247,28,60,192,88,198,100,23,80,216,2,34,90,117,159,213,130,124,43,167,126,143,45,214,67,98,62,44,147,176,202,58,161,126,43,85,249,52,109,234,109,72,253,179,123,239,204,218,76,60,155,163,108,32,241,242,230,119,104,105,104,124,14,188,150,42,3,235,173,175,184,82,81,200,251,125,145,167,192,161,133,43,197,213,45,59,204,122,149,246,228,201,83,195,141,226],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([165,255,109,77,232,184,215,167,10,253,12,55,196,127,71,146,188,149,132,92,158,183,183,227,100,158,250,32,17,104,98,124], [166,194,29,146,220,211,138,49,48,244,226,58,203,158,63,163,51,206,10,37,14,188,109,235,13,92,127,93,79,102,161,127,156,25,148,68,62,140,239,91,223,5,244,102,125,226,151,104,84,74,57,76,92,20,97,175,25,144,53,102,54,55,187,157,194],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
