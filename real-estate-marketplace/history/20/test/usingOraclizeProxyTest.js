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
    contractERC721MintableComplete = await ERC721MintableComplete.new("q7wtkxj","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("q7wtkxj","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","L",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","L",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(65,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("0",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("q7wtkxj",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("[", 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("q7wtkxj", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(199999, "Transaction successfully verified.", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(65, "Transaction successfully verified.", "gujk7hp", 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("q7wtkxj", "q7wtkxj", 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("q7wtkxj", "gujk7hp", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(98, "\x19Ethereum Signed Message:\n32", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(88, "ERC1820_ACCEPT_MAGIC", "P", "\x19Ethereum Signed Message:\n32", 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "q7wtkxj", "0", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("q7wtkxj", ["L","Capstones","gujk7hp","P","[","Transaction successfully verified.","Capstones","lonmys"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(17, "\x19Ethereum Signed Message:\n32", ["Transaction successfully verified.","Capstones","[","ERC1820_ACCEPT_MAGIC","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","gujk7hp","q7wtkxj","q7wtkxj"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(16, "lonmys", ["gujk7hp","lonmys","Capstones","\x19Ethereum Signed Message:\n32","q7wtkxj","lonmys","0","[","\x19Ethereum Signed Message:\n32","lonmys"], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("0", ["ERC1820_ACCEPT_MAGIC","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones"], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("q7wtkxj", ["["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(1532892064, "Transaction successfully verified.", ["zfjgew"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(101, "0", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("L", ["\x19Ethereum Signed Message:\n32"], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("Capstones", ["lonmys","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(58, "Transaction successfully verified.", ["Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(28, "L", ["gujk7hp","q7wtkxj"], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("\x19Ethereum Signed Message:\n32", ["0","lonmys"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("L", ["[","gtqvi","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(71, "zfjgew", ["q7wtkxj","P","zfjgew"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(28, "gtqvi", ["0","\x19Ethereum Signed Message:\n32","P"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("ERC1820_ACCEPT_MAGIC", ["gtqvi","P","L"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("P", ["gujk7hp","Transaction successfully verified.","gujk7hp","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(69, "P", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","gujk7hp","zfjgew"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(27, "P", ["L","gtqvi","Transaction successfully verified.","q7wtkxj"], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("[", ["gtqvi","q7wtkxj","Transaction successfully verified.","P"], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["vjaug9","vjaug9","Capstones","0","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(27, "Transaction successfully verified.", ["Transaction successfully verified.","0","\x19Ethereum Signed Message:\n32","Transaction successfully verified.","q8tirn"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(1, "L", ["lonmys","P","Transaction successfully verified.","[","q7wtkxj"], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("ERC1820_ACCEPT_MAGIC", ["gujk7hp","vjaug9","ERC1820_ACCEPT_MAGIC","vjaug9","q8tirn"], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("Transaction successfully verified.", [[65,157,107,186,167,220,106,51,13,41,1,245,126,178,223,19,0,177,236,161,118,145,71,102,201,187,58,20,179,210,27,229],[120,1,162,153,190,104,170,74,181,253,152,31,183,59,129,171,112,244,204,79,135,113,86,125,231,222,193,169,142,118,229,78],[59,153,80,239,109,39,240,49,140,17,45,99,171,8,90,174,52,205,249,222,223,109,28,217,139,71,225,192,129,186,162,184],[58,59,64,22,124,54,38,212,150,76,204,45,72,161,182,75,41,198,202,91,130,208,8,220,18,253,153,144,239,24,34,170],[16,83,91,160,182,22,102,173,243,20,43,143,59,201,82,78,245,125,163,170,42,112,121,86,121,192,172,52,172,154,162,193],[168,253,124,168,48,39,241,210,122,139,90,185,32,242,137,177,209,245,20,226,178,73,50,230,82,128,93,151,81,82,17,89]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(19, "L", [[65,59,168,117,224,83,214,176,172,234,74,154,98,224,131,193,61,30,35,153,201,226,216,236,28,185,191,45,231,198,9,158],[15,2,56,171,160,128,24,225,216,47,145,91,176,75,7,25,115,96,209,159,150,176,155,214,114,74,94,160,213,6,52,233],[129,66,59,169,251,110,155,189,97,62,47,42,103,50,6,20,166,103,86,141,87,134,183,246,16,155,200,156,90,159,96,15]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(26, "vjaug9", [[220,134,243,131,186,178,167,122,58,152,221,4,19,56,214,105,132,17,40,117,127,203,242,194,56,24,120,92,110,21,32,60],[241,103,135,102,93,9,127,198,135,161,34,85,173,212,143,241,170,132,206,33,3,228,57,252,124,174,255,252,155,60,187,72],[130,50,27,159,12,185,209,163,219,137,11,96,224,151,101,63,24,43,30,191,210,104,110,95,79,235,62,149,67,198,58,46]], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("q8tirn", [[237,192,40,212,252,206,141,139,158,234,139,18,127,241,20,71,32,179,248,55,166,162,129,162,103,20,14,151,157,204,81,121],[163,80,28,64,197,70,139,114,25,170,58,46,167,196,120,48,131,71,172,252,233,6,107,170,111,60,72,193,33,151,190,26],[125,18,252,239,25,64,255,152,136,192,91,191,12,9,211,147,51,87,251,211,196,217,38,53,87,237,109,187,178,66,215,73],[153,30,47,66,36,191,44,177,14,205,31,36,64,145,245,223,241,32,46,19,35,190,69,244,138,233,189,128,97,94,146,205],[183,135,40,150,58,154,205,145,220,117,85,213,103,197,198,126,219,22,58,233,17,157,184,44,161,27,210,192,237,185,26,139]], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("Capstones", [[222,27,104,33,62,234,49,136,239,23,94,207,143,43,177,89,178,250,252,63,167,189,179,83,13,62,180,176,67,196,18,229]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(1024, "P", [[165,152,87,161,254,244,59,192,101,32,207,44,190,7,99,20,27,145,14,93,158,207,130,126,184,102,84,77,49,82,62,139]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(20, "lonmys", [[35,175,250,187,151,159,58,234,230,166,11,244,124,84,106,211,105,236,194,221,111,220,241,202,229,200,144,250,124,250,91,193]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("Transaction successfully verified.", [[81,223,95,171,7,163,11,64,0,33,106,20,202,157,91,241,47,99,32,63,226,89,174,20,54,91,8,137,9,71,223,145]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("Capstones", [[251,223,153,34,57,227,224,147,252,125,225,233,233,94,222,30,198,218,242,189,66,84,146,20,246,70,22,74,111,89,200,105],[82,29,110,237,244,254,39,29,84,42,233,172,136,154,55,143,114,106,108,202,17,83,253,162,84,108,187,122,35,185,209,48]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(17, "0", [[187,71,190,219,201,174,235,203,5,171,251,108,110,218,215,244,247,50,123,38,168,229,14,34,248,68,126,111,75,218,56,166],[183,181,158,227,219,240,15,145,71,115,1,128,60,253,97,65,207,239,189,79,140,221,254,5,67,105,99,42,105,123,13,204]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(24, "0", [[140,72,24,222,104,189,117,158,36,52,159,71,177,240,24,43,71,199,229,8,202,100,166,190,224,217,91,233,9,223,92,208],[122,211,72,68,12,104,63,21,131,69,235,9,140,0,219,87,246,80,224,178,200,29,211,249,192,110,107,107,44,41,203,43]], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("zfjgew", [[189,212,119,35,254,71,19,233,150,201,125,53,113,81,145,139,49,116,204,187,115,207,72,208,31,140,239,215,73,78,222,64],[91,144,126,163,186,198,170,108,171,153,133,96,84,88,208,106,23,13,174,71,66,116,187,213,86,186,124,133,144,104,42,152]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("zfjgew", [[132,210,185,75,154,193,72,135,28,247,214,85,80,77,172,32,46,130,203,56,3,189,106,244,166,169,223,57,80,102,122,160],[44,184,110,246,64,24,165,99,78,80,106,41,183,32,216,162,97,182,9,254,80,199,179,120,33,13,245,114,202,221,162,229],[24,251,51,223,169,119,114,103,135,18,37,137,186,29,155,124,45,71,137,93,230,59,175,250,137,180,12,141,65,146,236,61]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(127, "Capstones", [[198,88,169,28,244,186,231,85,59,9,241,2,195,199,27,167,236,213,244,78,94,42,30,253,106,134,17,7,224,137,210,44],[82,213,186,97,37,137,9,150,41,136,73,79,14,146,141,161,226,153,34,0,186,195,102,82,248,107,55,250,19,16,140,86],[129,59,109,185,85,105,32,184,98,115,249,230,202,245,83,51,78,199,103,23,196,222,90,168,0,192,26,229,30,21,33,110]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(45, "m5csgr", [[13,178,181,6,83,251,126,139,91,234,178,233,231,74,59,194,144,44,65,228,145,235,223,188,65,191,44,61,66,111,64,86],[81,20,99,175,14,127,207,211,82,46,91,130,106,160,47,251,145,125,43,208,68,179,197,166,141,180,131,226,17,72,227,236],[110,191,230,108,220,33,205,9,255,167,155,45,32,109,150,213,218,126,162,6,160,9,178,20,90,241,67,122,86,37,140,103]], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("gujk7hp", [[118,252,1,153,15,182,184,105,129,210,53,251,49,55,171,44,75,145,9,250,37,15,62,241,133,187,138,116,202,250,251,220],[40,64,253,154,3,115,203,166,245,131,47,124,226,240,89,246,111,149,11,192,201,245,137,60,7,164,151,124,67,83,82,160],[135,5,20,87,35,37,41,164,120,211,128,148,159,111,124,33,193,95,214,90,179,76,208,2,236,140,188,99,169,170,11,35]], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("vjaug9", [[45,101,25,179,218,133,20,106,36,30,198,57,136,198,100,173,133,61,199,70,38,22,229,185,246,70,125,83,202,241,108,130],[47,171,36,90,87,137,106,115,162,62,179,200,203,94,73,4,121,135,135,70,121,187,198,23,45,249,231,182,181,219,107,123],[58,169,245,56,36,204,197,119,199,102,4,25,81,235,63,164,19,143,247,113,84,79,211,59,89,138,33,7,23,249,113,138],[110,171,80,144,24,251,72,101,168,99,190,124,3,217,46,85,150,66,28,174,99,251,154,85,89,90,41,138,122,141,157,29]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(4, "Capstones", [[75,3,45,99,208,193,185,126,243,252,209,163,68,181,92,106,95,189,56,25,186,81,105,25,247,157,138,66,34,81,81,200],[51,83,107,50,42,48,10,213,83,216,162,104,254,114,166,16,21,75,31,89,103,187,5,66,75,150,171,129,180,84,57,24],[225,195,112,120,175,192,158,31,241,140,84,230,78,130,245,207,94,207,103,64,160,185,77,202,87,206,252,186,246,0,2,248],[29,181,218,183,81,73,73,218,61,217,234,52,172,212,87,105,20,234,59,35,102,1,139,130,3,2,160,88,214,78,213,107]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(31, "Transaction successfully verified.", [[253,132,171,199,125,36,226,132,60,76,61,82,248,158,243,148,242,172,111,106,11,20,73,110,55,113,69,18,218,141,92,168],[79,50,130,78,88,182,219,96,177,28,43,30,177,3,248,182,149,215,5,225,49,54,40,87,132,34,62,132,243,179,247,124],[192,56,110,165,118,168,47,73,71,120,26,246,219,24,146,166,201,115,224,202,99,114,124,69,158,194,6,111,87,212,100,99],[242,133,133,183,99,57,33,54,63,55,110,114,34,199,54,67,30,72,147,198,85,150,101,214,164,133,205,237,5,114,248,169]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("q7wtkxj", [[211,104,80,120,31,101,44,124,223,43,143,131,76,202,44,232,235,44,94,17,100,182,87,109,41,159,125,241,85,162,177,106],[55,54,54,172,130,245,85,87,254,252,133,153,78,192,161,29,239,42,44,136,136,11,94,183,101,30,84,203,251,20,159,225],[27,1,183,30,78,226,83,216,227,157,141,26,218,13,110,170,108,69,143,224,92,162,132,113,176,220,36,56,161,243,68,37],[29,150,75,94,72,99,188,182,193,55,71,11,47,57,154,163,20,19,146,218,206,222,30,111,172,182,18,130,184,194,129,102]], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("\x19Ethereum Signed Message:\n32", [[228,40,53,221,123,144,171,166,142,109,6,254,97,1,185,18,44,255,251,40,28,142,210,208,70,104,167,87,207,4,187,187],[157,161,81,191,80,219,250,118,126,108,85,20,39,166,108,211,99,36,12,109,4,201,36,91,114,194,240,88,203,101,224,62],[196,42,6,120,83,245,182,163,215,18,102,107,24,67,174,177,22,176,82,18,220,162,20,32,121,127,162,191,2,237,184,238],[69,187,70,154,165,143,101,98,187,88,43,155,254,49,236,255,208,224,75,60,120,37,132,151,148,245,73,183,184,23,236,76],[229,9,86,8,105,241,153,172,116,13,66,18,217,69,13,103,62,229,14,156,237,92,8,154,202,158,202,153,229,48,210,203]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(103, "vjaug9", [[104,229,132,204,231,155,168,22,106,52,20,14,175,18,50,36,235,15,232,27,162,115,193,208,130,36,81,25,32,136,241,42],[157,81,243,143,148,202,55,2,35,114,118,187,221,56,15,141,202,119,173,177,152,236,197,35,220,121,174,40,105,88,63,176],[95,3,10,102,125,8,75,169,18,69,145,59,212,227,55,158,110,25,198,119,182,112,157,72,208,34,97,202,255,37,38,217],[48,88,215,216,43,189,16,210,183,103,18,139,129,227,242,121,253,146,91,59,124,122,124,117,3,147,198,192,110,173,4,125],[225,168,168,214,166,235,148,105,251,249,26,84,239,79,75,162,174,67,89,208,239,112,225,190,181,94,176,1,22,182,205,53]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(18, "gtqvi", [[94,165,105,127,6,99,5,90,160,22,251,32,207,108,172,67,120,17,248,245,96,16,95,47,122,174,55,6,177,92,123,245],[18,93,10,211,247,191,86,119,169,251,251,203,21,83,114,87,252,136,131,5,230,127,130,45,48,89,133,19,152,176,14,150],[106,199,127,218,105,125,145,56,224,42,243,113,176,225,226,244,211,160,166,146,182,37,54,127,173,76,9,1,81,191,42,237],[14,212,93,17,188,64,9,80,57,15,148,103,242,173,19,35,58,169,89,181,203,159,61,128,99,10,64,133,62,198,132,143],[218,73,142,19,126,171,77,7,246,111,242,232,54,41,216,173,208,84,6,117,148,55,254,232,196,133,105,235,39,52,88,81]], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("lonmys", [[9,228,59,198,213,149,247,48,95,112,253,119,59,196,137,110,246,196,100,9,139,227,69,180,187,233,152,48,119,17,13,251],[133,140,214,205,142,17,229,209,222,250,134,25,61,244,6,9,174,54,30,138,127,99,38,144,79,160,48,75,151,210,204,233],[152,11,190,62,76,101,235,129,66,242,215,254,223,254,202,80,61,241,48,50,49,247,35,225,53,212,253,181,152,20,15,133],[9,2,117,38,208,186,239,123,163,104,29,21,52,165,17,104,82,209,135,108,137,236,54,44,210,190,123,214,101,86,221,104],[237,71,186,156,235,45,21,108,24,45,26,126,42,41,142,54,224,148,32,64,15,195,170,36,87,146,197,187,195,22,98,46]], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([72],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[0],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(20,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("q7wtkxj",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("gtqvi", "q7wtkxj",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("P", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("\x19Ethereum Signed Message:\n32", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("Capstones", "P", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("L", "\x19Ethereum Signed Message:\n32", "Transaction successfully verified.", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("ERC1820_ACCEPT_MAGIC", "q7wtkxj", "lonmys", "L", "zfjgew",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("gujk7hp",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("P", 102,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("lonmys", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("zfjgew",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ERC1820_ACCEPT_MAGIC", 56,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("\x19Ethereum Signed Message:\n32", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(101,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["0","q7wtkxj","gujk7hp","gujk7hp","L","zfjgew"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[14,231,107,86,152,215,190,112,188,85,94,245,217,240,241,63,96,166,61,146,177,248,251,184,247,114,252,156,221,140,145,104],[180,145,101,18,175,209,41,112,38,34,180,76,115,34,227,191,186,21,70,178,112,214,17,238,27,33,178,165,198,130,89,183],[68,124,13,108,57,252,75,33,132,210,171,90,242,194,224,146,31,109,150,135,158,227,76,88,99,67,105,233,22,239,184,17],[189,29,176,92,98,228,179,86,174,34,50,149,218,48,29,2,69,44,224,214,139,76,158,60,116,41,46,153,49,116,132,89],[36,21,199,247,170,153,124,218,235,241,205,50,114,77,48,177,214,172,207,25,1,204,74,221,199,168,126,151,250,8,212,150],[34,213,98,51,116,78,74,91,221,156,28,75,214,171,156,187,170,94,200,152,110,45,196,19,62,229,39,230,14,110,252,43],[135,86,89,132,116,193,204,161,105,156,56,93,28,225,109,59,65,172,70,203,57,181,145,101,87,187,157,63,168,6,13,71]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(128, 95, 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([160,97,219,158,108,157,152,208,103,35,176,179,214,115,171,234,80,80,157,224,93,44,228,131,213,237,83,70,233,62,13,104], [19,153,155,178,227,67,184,93,58,23,204,221,158,22,227,236,55,219,152,24,139,120,54,91,46,190,10,59,173,68,118,110],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([72,46,244,7,146,211,9,221,167,21,207,71,7,81,26,43,187,226,46,2,236,54,99,60,117,131,51,73,44,87,57,34], [69,13,173,174,18,150,125,188,7,119,116,156,136,155,211,186,146,221,41,61,243,145,247,74,151,27,193,109,177,17,0,4], [251,199,191,119,23,27,115,195,30,62,11,240,192,222,143,50,192,59,175,151,63,202,133,49,52,132,224,206,139,75,25,99],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([76,42,132,64,252,24,144,171,235,33,102,255,140,17,208,112,176,31,154,152,143,20,57,218,126,233,231,80,162,36,200,165], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([201,173,168,203,61,199,91,247,102,176,24,239,154,98,197,193,230,117,178,224,210,65,200,123,52,112,114,97,183,99,22,59], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([165,27,237,203,55,101,249,61,30,77,47,228,137,197,61,170,181,144,123,177,37,14,194,164,196,102,249,56,251,53,69,22], "q7wtkxj", [113,49,104,113,221,152,2,114,49,142,49,136,245,204,225,17,84,144,127,17,130,21,72,192,227,81,125,204,149,209,54,86],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([219,29,100,210,159,147,43,185,220,180,143,176,50,223,210,150,117,16,39,253,241,17,42,164,50,55,242,71,191,167,108,55], "[", [119,126,141,190,36,164,72,92,162,57,163,37,159,175,140,92,11,25,95,13,68,142,26,58,124,16,5,64,6,77,97,209],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([156,220,53,113,118,207,254,38,193,189,167,153,134,1,140,29,241,97,146,62,188,221,157,15,180,213,9,19,46,167,55,178], [4,191,77,243,128,246,196,53,137,116,247,222,110,23,38,34,224,198,128,191,174,220,68,23,149,248,155,246,173,50,188,207], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([156,220,53,113,118,207,254,38,193,189,167,153,134,1,140,29,241,97,146,62,188,221,157,15,180,213,9,19,46,167,55,178], [7,178,45,103,211,145,207,186,58,125,217,173,118,89,65,106,106,184,72,183,232,46,171,105,106,77,203,85,157,40,23,162,142], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([109,213,164,206,107,131,86,38,107,32,240,30,158,27,217,151,128,192,184,76,9,61,44,58,36,217,121,209,5,36,181,213], [236,168,132,19,110,205,59,77,123,118,216,158,130,179,73,251,75,95,174,200,108,212,22,205,156,181,217,165,254,144,48,62], [95,94,116,93,183,138,202,171,172,172,99,19,76,61,118,210,2,163,112,172,139,182,145,199,31,205,187,52,133,37,189,187], "gtqvi",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([43,126,137,7,186,161,43,246,51,150,27,157,195,37,75,10,137,217,53,29,42,94,66,131,208,207,168,97,118,166,183,106], [145,159,201,238,117,49,90,128,160,234,117,185,159,190,176,80,194,7,6,89,160,17,66,50,186,139,153,110,24,221,34,132], [225,181,197,151,188,149,74,8,46,42,161,20,72,234,167,184,159,4,236,144,10,198,92,236,62,4,33,237,163,68,152,161], "ajf24p",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([224,55,111,199,203,217,178,120,180,166,106,199,113,187,201,250,91,181,51,229,170,73,207,110,124,164,42,88,124,141,126,216], [72,158,85,38,202,28,208,135,8,133,183,184,3,23,71,116,0,136,18,154,219,3,190,21,127,105,71,185,237,246,52,175], [222,235,73,254,246,114,152,242,109,198,107,160,54,86,219,251,207,224,206,208,211,59,199,22,86,175,92,31,147,46,253,207], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([208,43,164,99,61,30,47,229,56,68,77,21,223,183,74,162,111,31,233,28,207,74,74,224,134,222,105,171,155,71,156,138], [245,158,201,220,55,78,231,145,138,136,102,163,140,6,155,228,139,174,109,163,127,221,66,216,91,252,38,102,44,40,255,17], [224,229,54,171,130,130,79,171,34,180,170,169,106,2,11,42,250,161,185,74,155,4,122,88,22,54,127,160,127,126,25,196], "bmkc0o",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([29,125,248,221,35,210,85,117,222,210,176,87,126,232,122,115,22,135,167,46,152,201,187,58,209,186,30,215,114,173,156,235], [110,14,76,37,41,62,140,35,167,40,112,58,81,122,62,86,121,184,244,255,174,241,167,45,231,143,248,171,109,212,59,140], [201,140,133,4,204,74,225,190,209,40,77,54,77,147,64,95,25,241,190,72,81,69,61,246,215,251,161,33,200,234,103,153], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([228,179,210,201,243,133,133,191,250,194,137,177,122,38,247,114,78,63,165,214,154,32,156,177,178,43,255,98,203,130,176,210], [104,176,62,58,59,169,163,99,227,109,69,107,168,179,84,82,191,172,99,112,239,110,250,162,244,56,108,18,239,208,223,214], [245,204,111,88,232,34,242,206,81,59,194,10,151,242,73,6,1,32,139,193,73,143,202,67,63,121,192,124,104,189,42,72], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([172,44,186,99,69,0,26,222,215,202,239,173,205,133,91,156,162,178,177,221,73,83,214,31,116,220,207,239,75,101,213,156], [193,79,108,172,14,120,20,249,231,64,226,36,25,244,5,207,187,136,31,33,92,171,208,186,121,102,234,6,183,37,119,72], [174,31,27,16,124,225,140,245,47,138,232,131,87,145,106,181,201,30,68,85,151,173,105,4,154,11,7,66,139,186,224,178], "m5csgr",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([59,221,52,177,57,126,30,27,60,41,30,150,179,106,54,94,155,110,40,139,109,245,158,220,246,47,67,69,250,117,8,2], [101,124,240,94,91,200,79,255,56,103,39,118,161,77,243,22,140,33,183,213,64,71,45,114,121,94,2,0,180,4,86,19], [109,209,158,37,13,249,63,221,150,146,81,115,173,190,81,239,5,76,190,123,196,189,34,161,171,113,221,210,138,217,177,220], "ajf24p",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([19,245,89,204,167,189,181,106,55,182,214,55,128,19,17,201,212,0,167,235,121,139,188,182,181,65,63,82,89,66,73,213], 55, 97, [116,67,203,191,218,92,226,32,232,164,114,84,125,107,75,43,188,102,199,115,136,65,255,237,120,250,123,201,189,133,32,187], 86,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([224,249,175,203,222,96,80,141,177,248,194,180,211,199,189,60,78,205,55,64,17,161,52,252,114,198,181,14,204,61,160,30], 254, [178,69,42,220,95,157,243,149,48,189,37,119,183,28,105,130,31,195,243,203,214,101,42,96,58,12,133,31,88,18,80,47], [198,196,120,125,215,233,144,50,70,55,109,50,197,30,173,212,173,160,134,55,97,12,147,111,134,193,174,76,165,47,253,67],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([39,231,207,191,239,87,88,21,157,117,228,187,60,245,174,120,164,55,160,11,28,59,113,196,152,121,235,165,158,182,206,245], [85,190,94,175,133,251,207,128,75,4,225,7,127,159,147,98,30,50,73,7,192,223,8,52,28,119,125,46,193,113,67,61,125,35,215,166,140,205,22,90,27,250,144,126,104,63,112,41,137,145,251,18,171,181,135,175,159,74,119,184,147,64,166,77,203,68,171,206,179,238,54,167,134,237,25,13,153,74,175,60,81,156,152,107,40,239,115,102,175,123,218,225,97,69,144,95,243,212,50,183,194,91,209,37,226,222,27,163,55,42,189,224,124,48,211,192,100,83,116,12,66,97,191,229,119,91,32,163,218,171,185,31,142,88,76,221,8,164,49,83,152,118,197,102,179,20,70,132,147,7,210,203,37,246,90,155,146,84,37,79,208,125],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([239,220,41,223,196,130,50,232,228,184,177,45,96,207,134,172,161,205,58,167,124,166,16,214,216,231,194,220,53,183,142,133], [70,75,180,252,132,174,239,128,118,132,251,72,115,98,64,202,33,37,243,114,3,148,151,220,153,247,184,216,167,111,221,90,217,3,15,15,61,164,154,178,142,94,233,45,7,251,215,245,82,85,245,174,234,20,124,57,80,108,162,141,28,14,130,21,66],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
