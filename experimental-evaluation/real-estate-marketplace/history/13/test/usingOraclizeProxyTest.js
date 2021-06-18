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
    contractERC721MintableComplete = await ERC721MintableComplete.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Transaction successfully verified.",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Transaction successfully verified.",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("0","[","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("0","[","[",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(60,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("P",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("[", 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("L", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(46, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(3, "P", "\x19Ethereum Signed Message:\n32", 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Transaction successfully verified.", "L", 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "P", "5di08",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(1532892064, "L", "P", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(30, "0", "ERC1820_ACCEPT_MAGIC", "0", 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "Capstones", "Transaction successfully verified.", 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("5di08", ["L","\x19Ethereum Signed Message:\n32","Capstones","vwib7i","0","\x19Ethereum Signed Message:\n32","c69zji","Capstones","ERC1820_ACCEPT_MAGIC","c69zji"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(88, "0", ["P","P","lnnbxm","ERC1820_ACCEPT_MAGIC","P","c69zji","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","P","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(8, "5di08", ["\x19Ethereum Signed Message:\n32","Transaction successfully verified.","Transaction successfully verified.","P","[","0","c69zji"], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("c69zji", ["Capstones"], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("L", ["Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(2014223715, "0", ["5di08"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1532892063, "Capstones", ["["], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Capstones", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("[", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(95, "ERC1820_ACCEPT_MAGIC", ["ERC1820_ACCEPT_MAGIC","vwib7i"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(17, "1wmgh", ["Capstones","1wmgh"], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Transaction successfully verified.", ["\x19Ethereum Signed Message:\n32","1wmgh"], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("lnnbxm", ["0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(54, "\x19Ethereum Signed Message:\n32", ["vwib7i","c69zji","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(47, "0", ["i2p5oj","Capstones","5di08"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("[", ["lnnbxm","c69zji","0"], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("\x19Ethereum Signed Message:\n32", ["0","1wmgh","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(2014223714, "lnnbxm", ["L","71o1qh","i2p5oj","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(101, "P", ["vwib7i","vwib7i","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","i2p5oj"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("P", ["lnnbxm","lnnbxm","lnnbxm","lnnbxm"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("i2p5oj", ["ol7y9n","i2p5oj","L","P","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(23, "ERC1820_ACCEPT_MAGIC", ["vwib7i","Transaction successfully verified.","78mr36","c69zji","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(15, "78mr36", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","78mr36","5di08","5di08","ol7y9n"], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("lnnbxm", ["5di08","ERC1820_ACCEPT_MAGIC","Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","lnnbxm"], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("78mr36", [[89,238,17,207,28,32,67,184,191,185,184,243,12,215,97,43,237,189,31,125,103,182,27,20,33,234,24,25,202,192,64,34],[230,88,136,83,223,242,229,58,64,187,177,151,153,45,64,111,116,22,213,211,185,77,25,201,227,63,129,174,38,57,30,15],[71,202,202,0,198,210,42,134,67,194,49,101,58,108,192,51,109,66,16,236,130,25,108,183,161,17,88,143,184,209,79,203],[61,226,247,123,245,138,134,104,37,227,190,145,244,198,173,63,87,0,97,249,45,153,12,74,132,201,82,65,100,163,131,62]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(199999, "Capstones", [[144,179,82,90,138,107,176,33,81,212,179,40,205,253,128,205,40,115,109,92,215,248,162,26,98,244,191,89,114,94,30,31],[142,40,9,146,110,14,251,4,165,93,227,23,104,51,141,59,112,249,83,96,28,43,175,201,241,171,29,85,204,53,87,4],[162,248,251,115,129,158,246,107,155,44,223,201,255,133,110,129,173,69,91,199,63,184,64,252,234,124,239,245,175,47,1,171],[173,193,133,167,163,50,202,32,214,120,245,63,49,210,150,50,65,204,34,163,139,119,69,182,148,203,146,249,107,215,110,149],[186,137,218,67,186,201,174,70,0,219,216,74,71,199,77,185,95,106,193,104,112,54,2,150,223,122,32,212,66,14,150,91],[111,18,207,55,238,30,51,205,165,78,192,238,70,134,227,245,22,234,66,199,68,159,157,121,2,1,16,45,173,98,189,213],[152,34,85,51,49,168,95,77,207,206,108,131,35,172,217,42,206,206,175,71,142,86,143,12,16,56,192,225,160,171,4,54],[28,84,155,179,184,113,66,215,60,155,91,224,236,54,111,45,82,43,108,229,119,181,195,109,50,237,226,235,116,129,230,1],[115,25,133,253,191,142,65,171,209,93,226,143,200,62,102,67,55,3,231,104,55,196,240,159,105,123,1,181,11,220,28,179],[175,115,247,74,145,227,141,51,97,134,14,77,4,206,169,71,65,237,156,255,85,189,121,29,173,109,241,252,219,120,38,140]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(22, "71o1qh", [[230,213,74,154,46,107,32,10,186,88,108,201,3,82,57,94,134,26,198,54,32,86,6,70,119,139,212,149,149,248,243,237],[125,234,226,146,220,68,201,94,249,118,195,48,52,70,27,226,58,188,207,129,226,160,56,179,72,227,169,87,184,166,122,203],[189,168,173,204,24,159,10,166,64,96,82,103,234,229,246,21,86,161,216,205,186,99,8,16,210,236,158,156,140,54,199,242],[25,47,222,223,155,139,243,197,85,88,245,14,22,72,247,31,22,74,90,5,64,190,87,162,14,158,255,81,50,21,110,54],[179,18,124,195,148,124,118,5,238,145,16,130,108,230,66,27,167,233,252,40,25,230,143,229,7,105,170,47,29,123,117,222],[229,2,8,149,36,188,216,119,105,182,106,135,20,54,5,237,44,235,172,149,219,104,15,145,220,213,44,121,90,108,32,151]], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ol7y9n", [[226,87,148,154,130,90,200,28,100,170,74,37,160,26,19,114,70,99,170,210,166,203,89,68,103,100,145,21,123,13,86,37]], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("ol7y9n", [[179,26,148,168,68,224,104,167,52,115,24,163,197,167,18,235,103,171,142,91,205,146,122,214,172,11,184,151,166,218,22,118]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(96, "Transaction successfully verified.", [[119,247,246,144,107,147,15,202,81,252,0,193,184,95,134,28,123,192,11,169,157,233,126,150,200,202,119,45,25,213,104,83]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(70, "c69zji", [[92,143,103,73,141,60,160,12,31,34,138,155,181,100,170,39,189,167,144,43,53,55,229,182,172,211,18,250,179,224,9,245]], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("ol7y9n", [[219,82,18,127,110,178,113,50,165,188,1,126,160,50,88,142,32,245,33,8,216,19,108,53,185,61,13,87,145,77,61,115]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("1wmgh", [[111,183,26,146,231,211,88,118,138,229,150,125,144,124,118,212,90,180,42,60,193,183,148,199,184,46,28,31,255,242,151,32],[64,15,252,169,189,25,48,226,111,46,116,38,61,249,212,158,53,171,219,199,47,55,204,29,7,134,51,105,141,50,169,202]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(60, "Transaction successfully verified.", [[67,236,106,252,85,75,0,179,166,202,39,70,51,225,7,79,10,250,156,194,234,219,132,6,35,115,90,253,195,155,44,54],[127,135,68,230,130,41,178,137,183,254,233,198,219,189,100,87,223,40,190,130,69,225,144,124,255,70,120,212,159,147,226,187]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(49, "Transaction successfully verified.", [[79,102,227,226,200,23,132,36,138,43,141,16,198,167,159,64,121,58,159,184,74,78,179,31,58,180,233,165,233,240,55,224],[107,141,117,55,60,169,24,123,206,55,82,107,19,93,26,101,15,222,171,134,207,222,135,15,187,114,112,27,219,228,226,69]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("78mr36", [[170,229,110,89,10,34,155,5,172,136,182,105,245,91,65,53,248,56,218,62,25,23,209,27,254,110,50,121,164,112,183,84],[240,2,76,190,166,248,211,231,233,251,80,50,89,145,41,182,15,239,211,35,201,127,189,110,96,197,80,6,126,194,196,94]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("5di08", [[18,223,152,66,72,89,219,19,98,114,38,160,205,152,169,25,215,103,31,98,62,188,99,142,142,67,140,143,155,163,83,49],[104,235,16,235,58,115,197,171,48,120,12,29,243,36,11,24,167,202,21,184,110,99,69,65,136,253,111,174,147,33,9,63],[239,229,29,60,11,53,78,213,0,112,128,241,160,169,178,106,92,115,78,203,173,50,33,98,29,200,69,223,31,155,251,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(2014223714, "P", [[238,7,63,149,42,200,18,245,0,43,239,161,155,24,229,210,100,61,56,204,9,94,241,158,221,114,106,114,164,233,193,70],[114,83,139,74,16,246,185,136,52,76,105,136,143,117,4,77,45,42,100,217,231,234,52,243,78,94,111,191,24,155,246,125],[197,192,30,75,195,246,158,99,243,243,238,247,108,204,70,127,205,199,210,103,60,138,196,129,108,243,14,200,14,225,78,220]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(87, "P", [[239,160,63,183,208,50,183,118,247,63,209,219,123,79,17,7,33,64,101,160,85,55,82,172,32,242,61,175,142,141,166,16],[109,31,206,187,71,154,57,100,69,224,34,178,245,78,72,171,17,154,176,93,149,94,97,188,193,229,121,200,143,223,12,87],[225,205,186,225,37,174,213,187,255,84,106,66,111,2,71,135,173,3,24,127,123,233,154,205,65,160,3,63,87,209,65,102]], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("i2p5oj", [[43,213,105,180,82,179,57,54,50,15,184,189,168,179,180,117,226,101,192,20,46,33,111,131,36,151,9,175,208,120,181,179],[45,244,64,210,205,30,191,88,226,58,27,41,230,60,210,102,236,93,119,195,168,12,114,39,236,20,250,253,221,138,154,17],[150,221,174,143,48,125,25,155,168,69,244,202,190,185,181,45,45,15,47,241,20,95,94,65,237,116,59,187,64,55,161,190]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("ol7y9n", [[172,143,7,64,250,238,131,59,155,188,48,57,197,138,33,40,64,137,155,22,1,147,129,224,193,47,112,254,222,248,194,133],[79,45,205,103,31,249,201,1,192,4,77,240,227,45,130,43,192,22,254,122,44,2,44,218,212,64,180,139,125,119,37,174],[9,235,70,47,215,218,151,186,253,219,110,252,139,117,15,212,27,191,207,16,117,72,182,242,3,225,215,220,5,191,245,91],[222,223,141,127,73,91,13,135,22,88,52,206,34,46,139,95,109,119,71,75,146,202,174,98,145,45,164,69,171,94,18,149]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(64, "i2p5oj", [[122,251,57,6,189,186,48,2,198,134,91,195,100,58,53,129,95,28,188,247,150,224,76,53,69,15,187,59,178,153,173,51],[206,144,22,1,62,93,253,206,89,113,232,116,249,174,225,118,184,43,62,205,100,241,110,157,157,121,242,25,28,244,120,167],[35,11,73,13,79,229,51,104,56,252,142,161,195,146,224,101,197,91,208,216,63,104,9,111,67,188,240,38,3,135,239,22],[204,144,52,232,4,77,96,107,182,104,234,29,155,144,217,146,113,64,4,58,135,230,244,141,68,145,21,83,239,63,70,171]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(1532892062, "5di08", [[235,166,219,75,233,113,109,137,217,120,217,78,75,0,189,248,108,173,138,89,218,197,15,214,183,20,72,252,12,88,186,175],[34,213,86,167,5,221,206,19,248,62,98,88,131,184,111,40,74,167,214,216,115,129,229,173,200,103,157,231,112,127,57,67],[3,27,103,145,37,188,126,222,2,132,50,68,0,223,51,45,147,180,14,243,235,31,101,160,128,12,23,103,219,35,120,246],[15,83,62,32,229,234,108,84,69,89,221,23,104,185,224,213,171,208,248,206,138,167,234,27,35,4,199,126,194,75,242,125]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[166,6,167,25,87,253,97,21,235,89,52,95,37,79,65,114,57,92,0,82,169,185,175,192,26,67,236,131,187,32,127,236],[180,36,17,61,103,32,99,211,0,135,39,213,117,109,159,80,254,252,131,78,219,35,18,10,137,34,84,127,77,99,211,34],[141,34,5,80,2,175,68,57,113,207,26,76,221,208,178,61,76,115,199,32,198,170,228,15,7,230,62,20,170,11,35,127],[250,174,195,1,131,218,94,96,74,238,14,35,120,169,237,46,171,84,82,148,60,204,238,176,120,90,108,190,193,235,237,115]], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("Capstones", [[84,36,145,230,81,157,123,253,156,219,9,201,240,130,46,103,23,25,238,155,79,64,4,72,152,50,65,43,27,88,249,70],[236,66,6,46,113,111,165,208,176,135,166,199,160,154,73,217,47,231,96,119,216,140,138,162,166,42,28,21,238,26,131,61],[203,161,196,65,40,4,175,137,160,72,0,46,177,25,143,216,31,118,48,110,17,131,199,4,236,196,166,29,29,243,136,21],[95,226,248,101,178,10,23,77,241,198,245,176,143,15,242,113,65,110,167,112,131,209,4,121,56,17,183,4,55,27,84,128],[201,217,38,46,230,183,101,50,69,152,48,102,196,200,178,132,175,26,81,199,139,47,133,1,68,171,98,245,206,107,69,1]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(11, "vwib7i", [[169,110,174,33,249,186,203,136,22,107,2,82,69,249,58,195,254,233,151,163,1,94,232,169,56,180,152,85,72,238,191,90],[199,203,149,155,185,233,119,38,87,194,179,99,9,47,99,138,253,128,100,2,26,202,6,123,188,236,232,155,22,108,185,231],[49,97,238,40,59,131,186,0,102,84,120,155,134,102,6,215,175,141,230,11,183,86,123,51,25,78,168,242,243,56,245,146],[108,14,133,40,109,135,83,143,59,163,105,34,81,209,216,195,7,137,228,174,129,132,3,189,79,172,178,97,176,25,154,193],[14,61,233,142,81,109,224,225,3,96,98,39,221,146,47,23,72,243,56,241,202,146,219,92,216,174,223,197,61,75,82,41]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(10, "5di08", [[204,182,221,209,150,197,104,219,199,116,58,6,121,130,148,239,56,100,199,17,15,26,149,157,33,186,102,138,191,10,176,22],[6,241,71,219,36,99,128,147,108,157,222,107,11,96,139,115,148,180,252,30,220,117,215,243,212,169,179,239,24,0,179,26],[163,31,103,24,94,70,55,218,47,236,242,138,174,124,30,216,253,70,234,13,94,3,35,148,94,119,130,208,162,208,183,21],[2,153,77,140,200,13,24,24,196,243,105,219,203,241,187,77,81,51,12,144,85,152,254,108,251,215,88,197,104,163,80,196],[100,230,98,122,123,73,246,112,126,193,154,191,201,122,82,235,175,124,160,213,247,156,199,84,174,177,15,254,243,235,58,213]], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("78mr36", [[35,170,104,114,172,221,184,151,95,122,234,101,178,246,179,105,71,59,181,118,255,205,80,115,234,74,85,179,188,249,77,157],[235,117,153,6,153,70,128,222,10,92,244,8,191,123,151,131,224,121,202,121,248,148,104,93,170,78,220,150,220,221,120,49],[199,100,59,114,201,146,127,162,148,51,103,79,2,78,102,74,83,223,166,41,246,5,92,97,16,106,39,85,120,249,130,236],[243,32,28,78,133,246,221,182,61,61,10,162,206,237,130,30,40,163,244,45,180,234,190,96,199,14,53,115,121,96,165,115],[70,172,235,109,139,210,92,76,14,194,125,33,36,151,53,192,141,237,20,228,149,143,254,113,197,166,59,95,163,229,233,219]], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([137],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[9],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(26,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("ol7y9n",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("[", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("ol7y9n", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("vwib7i", "5di08",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("\x19Ethereum Signed Message:\n32", "1wmgh", "c69zji",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("L", "5di08", "71o1qh", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("1wmgh", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "s5089", "L", "lnnbxm",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("1wmgh",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("[", 24,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("L", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("i2p5oj",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("0", 2014223716,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("[", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(27,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","s5089","P"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[85,15,234,109,49,124,60,41,128,215,104,238,220,56,255,22,71,2,38,202,248,21,165,196,224,78,237,163,94,160,141,43],[59,239,217,140,118,83,36,205,165,229,129,93,103,177,191,224,129,86,179,152,236,191,237,32,243,214,91,22,58,99,171,49],[155,81,136,22,34,230,25,215,83,54,223,13,208,47,57,131,142,217,194,130,169,239,130,24,205,85,34,141,162,11,109,50],[210,193,128,79,63,2,54,229,78,227,48,181,50,131,218,245,62,147,33,173,71,53,131,246,254,118,244,197,50,30,178,59]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(69, 23, 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([205,15,5,73,91,57,110,15,13,101,115,232,156,153,68,179,233,231,113,86,157,132,207,63,99,7,2,137,212,212,239,0], [85,151,127,22,52,217,187,99,178,120,98,127,143,29,212,45,139,52,243,12,66,66,243,60,208,113,68,89,22,161,188,69],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([64,53,173,166,0,48,164,146,87,142,231,148,32,20,253,147,47,170,232,35,92,188,236,116,7,53,115,248,117,2,109,102], [8,29,75,28,122,169,166,130,230,17,245,86,222,197,161,13,175,127,22,121,41,149,203,3,47,238,176,124,177,191,177,106], [180,15,60,66,165,174,255,8,94,123,203,19,215,165,83,220,134,234,62,20,60,54,28,13,247,62,56,107,13,84,226,54],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([107,176,193,51,75,44,3,135,208,39,77,1,168,49,98,249,236,208,189,84,73,184,44,197,254,41,19,153,83,67,196,93], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([142,138,189,245,255,128,79,246,128,79,169,15,58,127,166,53,18,189,89,21,21,65,141,175,76,232,177,169,213,25,156,136], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([255,67,72,214,168,120,218,91,106,176,141,143,124,229,225,171,197,17,62,6,208,194,111,160,157,31,163,249,143,147,203,57], "s5089", [200,229,71,126,76,48,31,197,192,51,73,61,201,45,90,132,175,245,18,198,204,39,176,131,200,179,41,102,114,134,10,104],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([128,110,117,248,194,28,135,136,113,95,152,187,231,79,251,255,133,52,181,70,42,48,135,248,83,2,150,92,158,19,212,139], "\x19Ethereum Signed Message:\n32", [126,246,93,206,88,98,156,200,54,156,135,242,85,73,84,225,25,135,117,215,236,235,186,180,150,247,85,86,237,9,115,49],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([159,218,198,0,61,87,194,251,226,224,97,164,229,13,112,98,202,130,212,171,193,59,95,231,61,229,27,103,140,28,175,191], [54,120,123,80,202,243,3,81,180,172,69,121,61,87,135,59,234,18,243,207,1,0,207,47,211,187,186,141,17,235,47,218], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([159,218,198,0,61,87,194,251,226,224,97,164,229,13,112,98,202,130,212,171,193,59,95,231,61,229,27,103,140,28,175,191], [168,201,166,19,94,144,112,241,103,25,226,176,185,134,51,183,9,84,204,117,239,249,129,161,229,43,75,210,229,144,159,120,101], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([194,65,219,138,222,134,61,123,192,169,141,238,172,197,166,179,179,200,155,31,231,174,54,131,190,87,244,240,225,219,45,216], [215,252,160,122,1,75,29,18,210,104,173,212,108,214,188,105,48,50,200,201,172,48,193,231,204,16,65,198,98,92,232,121], [63,37,254,75,3,95,91,207,84,247,148,84,181,125,236,103,81,109,51,31,87,185,4,30,106,237,39,13,197,199,114,209], "vwib7i",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([176,217,13,60,232,145,27,221,16,209,121,56,72,41,247,54,3,110,79,246,98,65,186,192,107,64,107,234,124,139,84,181], [30,162,186,10,152,118,27,194,115,16,150,30,254,39,101,184,65,30,61,178,34,99,126,124,220,178,202,180,83,209,9,46], [90,143,110,119,132,35,110,214,75,104,5,180,216,247,43,68,89,224,69,94,230,100,221,196,189,10,120,55,74,120,180,182], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([186,243,215,139,208,74,74,91,73,90,249,10,215,2,196,96,184,82,226,6,225,239,81,119,13,164,231,214,53,45,147,241], [143,93,2,149,53,43,7,254,60,124,216,171,40,138,128,188,222,79,81,4,125,102,82,96,227,35,118,110,80,97,173,61], [227,199,4,164,0,61,143,224,88,128,182,218,115,189,45,220,246,205,117,131,193,23,231,137,108,147,111,89,13,136,67,36], "lnnbxm",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([86,29,136,16,167,242,207,131,162,222,218,11,253,230,54,47,73,172,149,173,249,70,14,150,105,187,176,220,89,56,86,231], [111,54,36,113,237,54,152,75,62,158,150,104,14,14,29,23,93,103,172,231,235,254,76,202,82,169,240,205,253,141,57,248], [139,166,193,32,76,85,215,76,138,218,194,152,185,161,58,68,57,30,83,96,62,170,111,91,176,69,37,179,228,129,217,57], "1wmgh",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([16,151,175,50,178,198,161,29,190,91,167,133,132,196,79,53,227,1,64,118,231,117,35,17,127,166,120,146,154,82,88,249], [4,194,196,186,226,29,110,28,24,123,66,77,247,6,205,94,23,77,113,195,129,159,195,205,205,209,154,151,122,63,191,44], [13,10,60,126,79,0,71,225,40,56,3,217,124,228,88,136,154,121,215,121,244,207,98,65,105,51,232,91,185,41,80,22], "s5089",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([215,187,26,88,238,38,89,210,144,38,30,143,55,57,15,245,152,139,190,152,163,67,55,77,61,217,46,15,40,110,20,67], [183,163,177,242,208,242,152,171,26,151,220,132,183,128,22,86,19,248,155,238,14,7,202,77,219,43,116,134,81,70,184,172], [50,180,130,80,255,8,91,197,170,253,57,34,28,106,100,43,104,55,199,12,192,153,156,85,3,169,11,211,23,103,228,235], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([77,165,114,250,137,117,201,94,115,8,163,228,221,157,174,0,58,92,202,231,244,41,240,31,35,99,49,192,100,205,68,66], [80,26,148,97,87,216,137,13,156,198,83,171,176,61,42,175,255,158,130,111,3,28,238,128,15,145,240,11,141,8,220,36], [176,141,38,252,79,0,242,121,86,115,74,250,170,75,104,173,64,182,233,200,125,118,124,71,53,29,170,208,211,232,79,118], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([30,250,17,80,0,239,224,3,194,198,192,8,21,196,205,61,29,113,197,75,196,203,39,48,85,143,206,223,216,238,112,60], [227,205,22,208,101,195,20,97,182,198,61,228,49,200,61,171,159,85,174,213,56,178,164,168,174,75,27,206,123,19,164,81], [113,182,79,133,107,172,26,47,125,68,41,219,146,152,35,107,125,208,207,159,136,138,199,136,161,127,2,101,54,23,111,96], "s5089",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([19,33,182,109,50,241,219,16,99,175,44,6,120,167,24,47,102,27,213,175,15,97,108,148,0,45,222,181,249,73,178,10], 1532892063, 1, [202,131,119,157,174,129,45,126,164,252,90,236,132,131,168,87,3,225,48,114,202,131,99,240,1,136,156,2,129,16,242,217], 101,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([64,76,238,47,253,210,95,67,121,130,118,83,174,72,218,98,36,35,225,140,80,128,198,220,219,196,96,56,225,39,114,238], 31, [213,212,176,100,199,173,42,144,2,168,93,150,79,118,46,52,133,237,135,196,150,95,0,108,89,228,176,123,244,24,180,163], [147,169,217,41,39,58,187,16,243,202,236,79,185,163,1,115,98,38,66,8,32,76,16,34,244,82,119,105,207,173,12,87],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([232,227,135,176,60,179,244,50,97,247,196,43,3,80,11,228,19,144,67,240,224,111,247,77,130,32,244,19,91,180,224,126], [232,179,46,204,50,240,215,18,124,68,239,20,109,133,228,136,63,142,226,184,94,179,24,16,24,65,3,82,162,29,197,51,57,213,107,199,94,114,11,49,248,197,63,111,196,71,14,141],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([136,211,88,123,37,185,240,211,17,2,127,245,149,100,79,29,67,176,84,106,134,50,230,39,205,167,45,169,204,148,236,64], [83,16,10,214,115,250,71,81,198,252,8,237,134,131,196,201,90,148,24,78,188,15,141,80,30,204,1,38,29,157,126,152,145,193,123,238,96,104,224,113,58,90,227,131,27,70,201,80,225,80,224,172,76,203,245,234,51,127,32,168,241,231,142,58,34],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
