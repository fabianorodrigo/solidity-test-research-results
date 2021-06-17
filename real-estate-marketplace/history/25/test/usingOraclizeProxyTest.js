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
    contractERC721MintableComplete = await ERC721MintableComplete.new("\x19Ethereum Signed Message:\n32","Transaction successfully verified.",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("\x19Ethereum Signed Message:\n32","Transaction successfully verified.",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("Capstones","ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("Capstones","ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(22,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("0", 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(64, "5jcv5v", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(21, "1wc5ib", "1wc5ib", 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("ki5kle", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("gwa4r8", "ERC1820_ACCEPT_MAGIC", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(58, "0", "l6uok", "l6uok",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(5, "brpgzg", "1wc5ib", "5jcv5v", 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("P", "[", "brpgzg", 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("P", ["[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Transaction successfully verified.","0haugd","Capstones","brpgzg","5jcv5v","l6uok"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(61, "gwa4r8", ["\x19Ethereum Signed Message:\n32","Capstones","0","L","\x19Ethereum Signed Message:\n32","Capstones","L","ki5kle","l6uok","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(23, "l6uok", ["brpgzg","l6uok","\x19Ethereum Signed Message:\n32","[","Transaction successfully verified.","Capstones","zh10vy","zh10vy","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("L", ["l6uok"], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("ki5kle", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(70, "0haugd", ["6fmrch"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["\x19Ethereum Signed Message:\n32"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("\x19Ethereum Signed Message:\n32", ["ERC1820_ACCEPT_MAGIC"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("ki5kle", ["brpgzg","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(54, "l6uok", ["1wc5ib","l6uok"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(98, "1wc5ib", ["ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC"], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("zh10vy", ["zh10vy","L"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("ERC1820_ACCEPT_MAGIC", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0","brpgzg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(2014223716, "[", ["P","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1532892063, "[", ["0haugd","[","["], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("\x19Ethereum Signed Message:\n32", ["gwa4r8","ki5kle","mjdkp"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("\x19Ethereum Signed Message:\n32", ["[","brpgzg","[","gwa4r8"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(200001, "5jcv5v", ["[","0haugd","L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(58, "Transaction successfully verified.", ["[","L","\x19Ethereum Signed Message:\n32","6fmrch"], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("l6uok", ["6fmrch","\x19Ethereum Signed Message:\n32","Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("gwa4r8", ["ki5kle","0haugd","e5wi2j","ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(97, "ERC1820_ACCEPT_MAGIC", ["L","P","1wc5ib","gwa4r8","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(160, "1wc5ib", ["l6uok","zh10vy","brpgzg","ki5kle","1wc5ib"], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("1wc5ib", ["Transaction successfully verified.","Capstones","e5wi2j","0haugd","0"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("0", [[92,149,45,196,161,124,31,90,140,79,86,160,101,56,192,62,212,13,110,156,224,239,242,239,166,122,140,182,43,210,228,158],[79,242,147,237,65,8,53,220,163,127,203,157,9,114,239,123,8,173,210,122,40,236,179,187,170,65,240,174,175,37,9,35],[253,186,58,230,95,38,17,81,203,80,254,4,93,243,146,133,106,70,33,81,82,75,87,194,210,106,188,44,254,183,162,120],[136,239,90,33,151,250,94,81,6,112,156,134,42,72,24,45,242,175,231,185,200,4,43,212,134,210,251,99,99,11,96,233],[67,82,120,207,229,212,233,35,170,108,141,112,78,225,244,36,93,141,192,145,3,217,110,19,88,249,9,133,4,73,177,17],[210,146,118,143,14,131,13,167,119,0,61,116,204,237,230,226,146,81,141,131,167,90,184,248,92,46,13,214,66,241,221,80],[65,233,29,44,46,22,18,80,234,103,19,148,136,179,127,245,209,153,137,14,47,11,14,67,24,115,101,102,81,208,80,193],[53,234,47,203,228,44,87,89,247,136,145,110,145,52,168,141,77,224,77,113,80,138,21,127,125,12,184,71,158,217,113,134],[199,41,169,140,105,233,145,52,213,63,57,149,53,248,170,120,125,152,161,231,125,51,169,170,107,7,164,59,88,200,28,72],[78,205,187,89,27,83,235,245,181,96,130,57,38,103,11,58,44,49,120,136,191,217,224,108,115,191,132,220,246,152,252,198]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(98, "\x19Ethereum Signed Message:\n32", [[107,227,197,16,248,85,2,10,67,220,26,97,154,188,49,23,149,205,104,75,112,105,166,252,245,194,18,0,247,252,159,118],[170,123,225,209,198,183,38,171,199,186,117,100,245,41,112,244,137,55,175,66,117,202,44,215,80,25,104,251,133,60,27,50],[43,170,88,132,172,231,110,3,251,253,22,133,143,144,223,144,37,24,108,118,83,227,79,179,214,75,27,126,47,181,75,132],[25,66,15,117,93,124,36,159,249,112,237,32,10,6,201,66,129,216,85,20,199,88,131,78,192,141,220,127,89,245,14,94],[106,48,198,109,158,107,202,11,179,32,114,187,208,166,116,167,66,108,148,160,201,10,1,94,115,10,250,167,241,180,54,246],[17,169,75,41,248,113,149,57,31,3,252,132,49,182,92,244,3,231,164,251,106,113,174,162,130,21,245,35,42,133,52,204]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(2014223716, "Transaction successfully verified.", [[192,84,201,124,60,204,177,243,206,114,161,48,231,34,68,168,196,115,238,33,31,193,237,97,179,143,12,242,140,57,24,18],[46,248,199,7,167,74,116,6,182,223,23,241,202,141,110,61,224,80,175,235,152,144,240,204,82,14,11,139,168,76,255,146],[209,54,64,186,35,31,56,230,80,15,218,164,203,21,4,133,12,183,156,210,224,1,227,132,126,13,33,243,180,84,224,189],[204,59,139,96,148,42,154,70,252,110,15,132,242,201,18,171,124,239,8,67,17,18,7,164,129,12,9,236,203,251,188,148],[145,83,210,114,65,39,220,69,246,68,244,66,50,62,44,124,239,179,183,138,188,226,131,52,55,122,180,235,2,43,48,144],[156,92,215,21,99,140,36,142,173,7,145,92,212,78,204,212,52,62,188,166,227,230,118,18,229,77,23,166,177,37,112,85],[197,176,147,37,167,42,139,1,171,92,138,184,86,132,250,218,148,81,108,60,241,61,131,171,17,202,135,153,24,201,77,56],[171,6,126,11,118,131,134,173,159,213,238,210,70,192,119,0,53,5,50,216,129,171,115,64,15,81,107,142,197,2,52,195]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("5jcv5v", [[43,248,244,188,69,217,126,134,43,101,214,7,252,252,147,243,14,54,215,11,89,28,92,10,88,178,103,75,144,150,63,106],[127,61,220,41,170,113,52,203,151,211,48,128,69,212,124,106,219,230,203,172,19,152,119,113,8,21,192,230,31,12,78,120],[229,184,136,209,234,222,108,12,245,195,181,142,147,0,153,177,229,94,136,101,98,112,75,239,33,83,100,159,24,62,238,86],[156,137,175,22,119,94,91,78,94,163,106,77,7,214,207,249,147,27,180,66,142,79,154,40,28,75,43,111,247,69,182,234],[245,71,244,250,179,177,101,82,172,49,190,43,107,204,244,249,20,98,33,125,122,198,40,184,111,144,251,144,60,201,168,10],[119,73,3,225,203,117,227,147,224,225,255,35,129,92,23,203,120,188,10,162,72,52,0,252,180,255,96,218,223,9,90,112]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[189,102,199,224,246,251,27,183,219,91,220,10,117,220,253,166,43,61,230,146,61,46,99,34,143,118,6,173,198,231,71,106]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(102, "5jcv5v", [[66,111,201,123,47,170,65,212,223,183,30,234,249,85,204,33,87,22,166,148,142,103,100,54,54,159,192,177,37,41,159,155]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(1532892064, "mjdkp", [[199,120,150,239,92,112,98,200,74,192,176,221,59,41,62,76,235,251,15,147,0,238,93,4,79,103,208,4,102,120,202,20]], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("e5wi2j", [[150,238,126,226,152,116,108,204,117,209,192,158,91,25,13,68,14,197,154,86,107,108,81,221,110,188,98,187,245,78,43,84]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("Capstones", [[83,186,31,119,28,213,102,102,165,62,137,79,127,173,112,203,174,77,74,140,55,78,21,203,148,182,141,45,176,218,74,219],[31,71,222,20,191,161,142,69,255,184,226,142,151,207,225,7,140,225,194,25,111,27,103,7,23,178,255,133,16,93,133,97]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(2014223715, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[149,111,20,110,161,35,172,169,109,241,186,39,28,109,188,207,92,50,101,169,41,43,170,153,150,182,33,144,64,252,105,49],[255,223,213,28,61,41,224,89,48,99,80,137,244,29,82,68,30,105,51,136,40,44,59,89,162,66,124,47,12,108,10,73]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(162, "0haugd", [[122,71,186,45,229,159,70,230,165,131,225,200,193,67,108,220,212,4,163,50,60,128,117,66,134,156,80,75,244,6,5,67],[48,78,197,39,48,85,117,196,69,129,79,101,145,157,124,194,32,159,188,133,71,162,170,170,25,147,32,197,96,133,205,219]], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("l6uok", [[129,38,154,6,84,196,247,212,106,153,170,67,148,38,82,193,23,236,6,66,156,65,170,94,220,78,161,124,184,39,127,254],[162,218,88,37,235,185,250,33,27,96,60,46,223,69,77,120,220,179,30,220,224,74,127,0,247,133,86,58,187,243,186,41]], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("P", [[174,174,110,241,151,195,165,230,191,228,243,26,100,16,248,165,27,146,166,100,116,207,68,76,249,109,100,150,9,2,107,104],[181,19,95,141,234,32,249,118,79,78,252,201,139,166,164,8,160,73,154,163,242,15,117,99,32,90,203,84,237,188,181,12],[25,35,10,67,177,170,135,98,185,175,66,124,156,151,103,128,20,126,179,90,17,60,231,254,187,134,16,111,69,188,88,50]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(64, "ERC1820_ACCEPT_MAGIC", [[112,232,1,50,164,105,99,228,56,78,76,194,227,154,72,83,51,194,224,23,88,171,136,167,224,58,232,82,211,108,62,92],[94,36,56,4,70,230,248,211,203,75,17,114,110,154,253,66,113,105,91,104,3,47,143,162,50,75,160,59,36,157,97,242],[235,216,118,168,52,151,153,199,221,64,204,23,243,221,106,142,181,121,109,20,102,43,223,6,236,221,103,18,26,191,127,37]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(64, "1wc5ib", [[208,169,37,106,89,99,206,96,54,83,126,145,21,95,47,156,229,95,21,217,240,224,103,45,152,186,16,45,210,178,64,49],[185,243,202,87,113,139,61,138,254,170,36,73,155,72,14,123,0,157,245,14,78,181,203,199,99,57,187,87,224,64,244,40],[69,243,239,66,39,207,108,102,117,125,94,88,198,18,80,150,181,208,129,59,82,187,109,161,124,242,124,41,13,22,242,155]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("e5wi2j", [[120,203,160,131,113,155,73,209,231,133,51,169,78,78,141,15,212,155,55,194,34,22,226,165,124,97,82,216,188,66,142,39],[155,40,187,15,202,117,3,118,100,64,196,107,110,40,150,204,218,228,183,139,243,236,214,64,38,224,236,66,203,87,136,43],[166,229,163,124,94,253,206,136,203,220,194,63,183,218,164,136,255,28,140,245,250,186,133,227,185,201,114,239,84,46,239,213]], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("ERC1820_ACCEPT_MAGIC", [[89,212,198,122,119,42,36,228,89,252,64,106,69,169,202,231,191,64,162,114,177,74,36,87,50,216,20,249,125,179,48,200],[104,138,96,203,32,94,91,34,77,194,202,49,160,34,22,56,72,154,229,117,230,253,126,88,152,53,103,32,186,172,141,237],[228,93,55,44,123,218,239,122,178,211,63,5,184,52,10,245,124,218,21,10,179,112,29,42,241,108,212,101,184,127,144,103],[149,26,155,189,12,199,120,93,131,39,86,92,245,38,88,138,237,142,112,53,233,163,122,128,53,148,93,138,119,46,156,206]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(29, "1wc5ib", [[200,60,249,210,141,18,71,123,161,236,182,97,25,57,229,203,184,173,197,233,68,91,239,5,21,71,67,82,72,3,51,216],[171,232,238,215,195,126,66,130,30,9,177,40,20,221,165,247,196,81,139,126,105,69,212,207,144,71,181,174,241,232,220,57],[112,82,24,82,224,244,89,19,117,179,72,44,42,95,250,10,233,245,247,127,250,204,182,41,26,27,239,22,194,227,195,201],[151,178,158,240,75,142,226,29,211,97,76,106,14,10,172,28,125,62,113,151,135,205,119,122,118,192,132,40,83,49,182,209]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(1025, "Capstones", [[140,102,193,108,0,31,184,58,233,38,118,234,111,81,96,60,127,193,13,193,157,21,217,206,24,27,127,151,193,210,157,10],[5,22,211,26,34,93,118,179,7,92,193,184,110,47,71,34,58,250,162,115,117,50,40,205,7,74,129,122,71,215,152,57],[193,101,106,77,243,243,164,140,251,60,184,229,233,41,27,200,17,0,218,218,57,22,81,158,180,134,140,17,195,109,39,195],[115,191,150,120,181,162,214,240,153,123,166,126,224,162,121,37,150,16,250,51,250,127,248,108,91,55,61,47,245,2,33,135]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("6fmrch", [[94,57,234,139,229,56,25,125,228,128,44,178,34,246,106,157,77,136,240,150,245,167,71,69,238,233,124,241,3,68,173,48],[38,13,188,201,225,8,61,201,126,17,8,15,103,132,2,50,78,100,122,244,34,155,117,168,9,146,71,153,25,31,32,79],[60,99,169,228,74,86,91,253,249,11,158,84,19,163,174,224,50,84,130,108,105,11,83,113,131,83,130,95,58,81,39,218],[162,148,48,218,63,193,220,172,39,105,46,24,4,214,84,77,85,35,154,110,223,221,252,102,114,25,138,7,189,23,213,5]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ERC1820_ACCEPT_MAGIC", [[3,15,102,108,150,211,55,30,121,179,203,152,127,221,39,66,98,165,235,17,150,168,200,133,13,184,210,182,207,157,142,212],[217,28,100,239,231,22,179,168,50,255,134,8,41,247,145,102,240,193,232,228,204,36,250,216,151,245,194,208,46,85,176,172],[116,205,159,11,170,228,43,247,81,207,114,128,112,22,222,36,170,180,88,103,8,235,223,58,10,158,156,81,202,190,220,77],[103,148,233,103,21,104,143,119,113,204,148,231,246,148,28,100,206,236,119,242,64,121,20,185,36,63,177,197,57,121,7,203],[155,183,30,129,145,178,188,93,55,8,184,133,91,213,71,41,158,153,62,59,162,176,13,74,73,148,53,20,73,92,230,37]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(66, "l6uok", [[111,60,185,155,17,60,228,28,216,153,219,45,97,2,209,2,43,176,60,159,130,96,244,100,221,11,204,181,52,229,54,118],[42,23,116,168,39,60,219,49,151,76,100,95,80,21,233,43,133,42,101,45,135,145,171,9,82,213,205,157,70,25,69,245],[30,96,88,190,49,246,79,82,135,122,66,7,214,147,27,165,42,57,69,66,182,73,205,228,140,184,191,75,216,251,88,1],[200,195,11,232,221,92,92,31,26,187,31,216,30,236,224,130,45,247,192,105,240,230,175,187,155,183,0,141,122,129,85,36],[19,204,138,174,231,48,160,157,151,18,246,148,175,228,13,74,51,66,133,57,83,203,32,152,48,229,83,108,42,138,1,201]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(28, "Transaction successfully verified.", [[220,238,72,27,201,138,150,121,48,193,109,208,251,71,198,112,62,67,176,93,249,117,148,34,170,36,199,121,200,245,105,3],[76,128,162,107,243,25,145,234,7,151,249,95,241,92,200,247,215,90,14,48,128,224,114,136,180,209,82,253,118,173,54,108],[196,137,132,192,203,113,125,0,107,55,3,20,41,94,60,190,250,220,147,74,180,130,154,56,161,218,55,178,93,77,116,104],[230,172,140,42,41,11,84,193,252,164,138,249,169,149,71,117,156,82,32,173,51,31,59,151,150,190,122,156,19,123,141,42],[55,22,180,56,89,246,43,116,255,59,63,105,112,108,2,239,1,183,20,126,23,99,31,24,90,172,195,225,84,69,181,69]], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("5jcv5v", [[226,192,219,236,19,148,179,186,223,131,40,57,58,29,202,87,34,39,216,85,14,180,31,191,190,135,105,27,136,3,253,144],[211,45,213,88,82,33,20,152,92,1,183,43,64,159,36,73,19,38,24,156,182,68,32,122,57,24,158,15,244,7,233,109],[51,211,39,211,73,145,86,113,126,101,128,130,220,175,51,69,14,88,115,15,32,104,50,249,172,91,121,20,58,41,195,43],[9,210,183,221,174,158,219,228,109,75,165,94,19,68,135,149,16,76,57,95,66,0,184,180,123,90,2,243,183,91,193,164],[70,70,157,107,17,163,123,203,71,58,88,134,157,177,252,160,94,41,163,41,118,18,248,214,6,253,182,235,193,172,33,255]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([151],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[5],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(30,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("brpgzg",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("L", "0haugd",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("ERC1820_ACCEPT_MAGIC", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("0", "l6uok",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("P", "0", "gwa4r8",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("[", "6fmrch", "ERC1820_ACCEPT_MAGIC", "gwa4r8",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("P", "P", "[", "5jcv5v", "e5wi2j",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("l6uok",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("zh10vy", 55,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("gwa4r8", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("L", 95,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("l6uok", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(49,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["6fmrch","w8puli","[","\x19Ethereum Signed Message:\n32","l6uok","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","6fmrch"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[1,70,181,107,149,115,226,101,35,197,50,137,207,154,85,168,244,150,141,26,194,34,104,217,212,217,248,4,193,39,111,185],[24,5,254,89,142,153,139,101,146,157,161,5,64,115,58,140,111,243,85,8,11,225,19,124,213,128,13,113,245,124,245,177],[144,52,246,209,103,174,170,214,177,187,245,201,135,80,241,148,235,142,167,99,138,35,53,150,101,72,161,249,172,37,137,7]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(16, 20, 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([138,81,191,25,79,165,156,79,195,55,120,214,76,166,79,50,97,109,114,109,134,121,167,35,128,170,107,134,13,61,37,153], [170,38,195,189,157,126,15,208,7,11,113,171,179,198,240,56,236,132,154,238,131,108,153,255,183,189,166,49,10,41,73,197],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([160,131,118,37,42,98,192,100,175,157,124,50,72,251,237,180,185,195,68,242,57,71,23,158,200,95,43,212,74,32,211,97], [207,59,138,220,235,7,43,245,247,12,57,197,191,12,158,35,88,190,230,84,10,152,14,172,9,26,166,134,211,96,179,135], [187,142,16,164,2,165,8,208,34,189,111,158,52,24,191,226,63,140,155,71,192,241,51,53,220,229,25,13,69,184,25,15],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([10,206,216,187,31,186,27,116,135,55,109,6,65,40,157,127,134,34,238,237,242,29,129,96,8,119,45,234,182,50,1,42], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([98,164,82,220,87,156,128,166,5,24,136,214,194,60,143,236,220,255,217,62,82,71,116,28,252,67,94,110,222,165,192,75], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([130,66,179,160,19,179,202,237,170,235,254,221,34,0,92,19,17,193,12,120,165,75,121,46,119,122,142,60,45,138,32,100], "Transaction successfully verified.", [57,44,88,169,240,210,190,106,113,45,128,12,3,62,225,253,231,190,228,19,149,94,200,207,151,59,31,230,5,0,139,204],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([247,20,208,0,209,208,141,222,113,205,135,237,45,75,222,169,192,154,40,188,173,101,61,206,253,247,220,237,170,56,31,191], "ki5kle", [42,230,252,172,157,148,48,22,131,175,123,114,141,33,63,234,238,247,23,247,243,255,102,254,167,131,110,193,161,3,208,138],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([213,53,187,19,116,220,238,162,69,199,15,248,137,114,72,150,78,92,209,96,224,212,160,77,249,32,156,179,207,118,0,234], [124,177,68,208,19,233,122,149,85,36,246,115,245,161,117,186,202,31,206,6,246,179,115,198,2,231,253,214,241,91,7,135], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([213,53,187,19,116,220,238,162,69,199,15,248,137,114,72,150,78,92,209,96,224,212,160,77,249,32,156,179,207,118,0,234], [48,203,32,254,100,155,160,141,201,136,175,103,96,43,162,200,146,254,44,207,10,107,178,165,178,16,175,208,77,127,79,3,199], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([51,57,12,34,130,42,233,170,130,133,32,190,32,211,177,119,211,230,213,56,148,62,239,230,141,113,6,230,173,200,97,239], [199,25,228,88,97,102,132,199,195,247,198,122,66,112,119,171,155,62,186,162,64,98,253,73,226,154,198,144,237,179,216,244], [236,3,61,93,126,93,57,179,14,207,127,90,112,35,110,254,233,237,152,84,125,115,56,32,91,188,110,98,69,173,80,92], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([1,44,160,168,1,70,195,195,31,57,50,113,74,192,216,234,124,193,122,173,67,231,179,3,254,38,222,194,240,215,203,32], [38,238,228,85,72,53,15,62,17,141,180,93,11,10,173,177,255,149,81,189,140,138,164,110,192,203,137,113,12,165,121,241], [207,116,142,104,192,150,166,206,108,230,54,169,104,80,152,156,150,228,45,93,239,42,132,130,70,62,157,68,101,20,217,201], "1wc5ib",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([36,149,122,43,234,113,38,13,188,153,163,201,143,89,130,100,140,51,54,32,197,50,240,134,74,136,156,9,206,170,22,125], [88,148,78,149,125,134,113,86,253,133,147,165,221,13,212,207,101,24,13,161,58,197,229,0,60,11,103,187,199,229,131,67], [110,152,160,243,78,202,36,180,237,146,120,143,84,240,181,81,82,172,220,63,68,28,34,218,209,42,166,135,0,189,12,88], "1wc5ib",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([14,226,145,186,162,8,156,202,163,32,138,118,37,97,146,225,216,250,231,69,162,49,101,177,198,28,29,104,159,249,237,28], [84,18,92,244,240,13,21,204,189,251,222,194,225,166,14,123,28,218,92,168,80,92,70,160,26,139,79,244,22,40,246,33], [115,56,8,36,190,64,246,152,114,52,210,184,174,103,151,41,207,56,195,196,246,126,251,71,204,163,59,100,68,169,61,87], "l6uok",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([183,79,35,84,225,150,253,62,184,14,192,139,117,83,58,1,223,185,137,5,23,201,210,186,83,22,95,143,95,111,185,116], [230,30,100,216,27,97,104,235,120,90,160,103,60,31,27,185,31,108,29,6,72,159,11,117,16,67,189,149,223,245,107,253], [215,199,243,116,173,148,117,96,41,143,90,8,230,160,209,184,92,207,47,216,107,71,0,78,75,229,194,73,136,60,147,197], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([78,196,139,224,254,58,211,102,182,67,136,240,58,33,91,212,52,114,65,207,84,118,18,110,151,41,98,28,45,112,19,173], [34,137,156,76,225,18,129,158,98,7,69,49,178,167,58,13,128,233,124,107,206,47,213,16,206,138,255,194,252,19,223,42], [129,116,165,191,53,242,105,29,207,152,234,161,7,106,11,213,65,68,61,156,171,10,248,52,96,101,80,253,62,157,164,37], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([185,61,172,89,129,167,24,46,14,45,206,182,215,11,116,231,106,59,95,193,231,76,159,255,152,170,64,218,133,161,14,170], [87,97,81,94,118,62,128,178,105,113,205,246,60,157,7,15,248,66,215,222,99,157,66,227,232,56,202,40,146,54,85,126], [13,35,160,221,178,20,185,7,41,27,78,48,182,245,15,196,255,129,80,5,211,51,197,158,217,236,60,27,10,91,99,222], "w8puli",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([49,126,82,231,161,45,58,11,0,243,237,24,126,173,192,90,235,182,213,113,222,182,184,156,245,155,59,97,73,14,188,141], [172,201,113,169,25,105,161,0,80,217,130,115,14,98,33,85,6,224,90,152,138,212,242,172,200,78,33,0,180,0,131,104], [186,112,31,107,69,222,13,72,116,3,54,235,188,218,133,124,75,139,122,243,65,41,226,226,66,147,18,216,161,109,12,27], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([182,22,171,11,18,68,65,166,118,79,67,219,119,103,50,153,7,199,51,29,151,69,238,30,123,229,82,229,247,166,162,249], 162, 61, [158,22,240,110,170,140,48,121,158,191,206,4,44,193,104,231,200,121,207,232,131,231,81,135,194,12,185,151,88,135,121,247], 0,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([190,72,137,11,251,150,229,29,219,24,244,245,142,113,181,248,192,211,204,110,142,82,55,107,24,45,4,231,217,43,92,129], 96, [99,92,206,127,105,213,94,152,24,254,9,34,98,179,193,208,162,82,129,62,85,232,165,116,138,147,134,87,145,31,121,150], [171,67,254,113,106,143,170,14,115,105,0,228,166,14,143,23,20,0,99,106,25,85,6,104,159,192,173,201,128,128,188,249],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([13,170,123,66,112,59,80,37,16,240,182,225,246,99,180,125,147,227,188,218,26,43,204,5,233,123,48,79,159,124,34,27], [57,204,206,113,174,164,195,113,210,50,143,120,98,64,96,17,37,190,207,209,158,193,213,129,120,194,249,85,1,78,103,234,248,175,176,201,129,141,73,25,116,9,59,43,25,13,44,224,164,116,222,202,183,26,112,170,135,113,211,105,97,110,149,235,150,242,81,243,94,169,96,181,145,254,64,63,31,229,124,55,220,143,24,213,17,167,128,17,44,1,15,248,211,208,221],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([44,31,179,215,196,44,145,23,87,236,250,224,82,61,198,29,247,227,31,104,217,93,155,81,246,30,228,228,96,16,130,248], [17,62,59,25,202,39,120,69,74,40,58,172,65,45,168,235,90,109,64,133,24,197,100,225,51,245,6,94,154,111,140,212,62,38,103,16,118,221,135,214,253,63,1,18,130,49,250,191,32,200,124,19,184,251,81,241,113,16,208,81,151,26,75,177,60],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
