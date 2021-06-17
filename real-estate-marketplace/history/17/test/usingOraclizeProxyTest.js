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
    contractERC721MintableComplete = await ERC721MintableComplete.new("\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(161,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("7sxjze",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("\x19Ethereum Signed Message:\n32", 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Capstones", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(48, "P", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(63, "ERC1820_ACCEPT_MAGIC", "[", 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Capstones", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "7sxjze",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(5, "6rrpb", "L", "7w0zsk",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(57, "ERC1820_ACCEPT_MAGIC", "[", "7w0zsk", 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("P", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "0", 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("\x19Ethereum Signed Message:\n32", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(23, "P", ["0","P","9nny7d"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(20, "0", ["7w0zsk","Transaction successfully verified.","0","Transaction successfully verified.","\x19Ethereum Signed Message:\n32"], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("Capstones", ["\x19Ethereum Signed Message:\n32","L","6rrpb","0","Transaction successfully verified.","ERC1820_ACCEPT_MAGIC","0"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("7w0zsk", ["ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(3, "P", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(49, "L", ["0"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Transaction successfully verified.", ["6rrpb"], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("\x19Ethereum Signed Message:\n32", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","bwof3"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(200001, "ERC1820_ACCEPT_MAGIC", ["9nny7d","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(23, "P", ["P","P"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("0", ["9nny7d","9nny7d"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("Transaction successfully verified.", ["745oxe","6rrpb","9nny7d"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(97, "0", ["9nny7d","affby12","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(64, "bwof3", ["Transaction successfully verified.","bwof3","9nny7d"], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("745oxe", ["\x19Ethereum Signed Message:\n32","L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("\x19Ethereum Signed Message:\n32", ["[","Capstones","bwof3","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(48, "24n2", ["Transaction successfully verified.","0","ERC1820_ACCEPT_MAGIC","7w0zsk"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(33, "bwof3", ["[","[","0","Capstones"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("P", ["Transaction successfully verified.","affby12","L","Capstones"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("bwof3", ["ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32","24n2","\x19Ethereum Signed Message:\n32","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(29, "[", ["ERC1820_ACCEPT_MAGIC","7w0zsk","[","745oxe","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(160, "7sxjze", ["7sxjze","bwof3","9nny7d","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","7sxjze"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("[", ["L","P","[","affby12","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("Transaction successfully verified.", [[35,221,53,11,95,220,66,251,94,248,92,25,182,219,72,222,186,85,40,107,184,222,122,139,159,198,104,32,231,74,228,10]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(11, "Capstones", [[188,130,7,43,75,39,130,35,207,1,212,180,210,65,142,96,230,130,218,244,12,163,219,179,131,23,243,42,2,73,26,37],[103,122,82,15,228,176,29,218,181,183,51,196,183,35,32,232,171,0,121,44,133,129,165,47,213,75,163,140,31,75,135,35],[51,203,223,122,237,108,53,116,210,172,186,55,184,252,247,217,101,206,229,188,139,17,74,42,132,170,140,77,82,124,196,178]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(47, "bwof3", [[155,110,249,186,1,176,223,182,111,32,146,214,11,255,206,130,12,160,216,198,80,29,40,16,26,137,223,109,162,9,164,106],[61,53,132,80,35,96,168,32,43,116,157,46,234,222,254,46,243,97,100,26,27,56,72,199,228,186,57,198,252,113,46,54],[6,230,249,110,186,82,108,20,127,190,30,70,86,217,160,156,123,59,98,219,251,160,64,107,89,13,79,67,179,84,139,161],[25,13,191,182,65,156,83,23,83,81,9,205,146,116,69,63,47,199,50,45,180,135,189,85,60,6,30,83,159,86,78,213],[193,191,48,242,67,109,20,10,137,146,103,66,219,109,4,195,13,194,179,150,129,153,168,177,64,1,75,48,13,40,236,222],[5,133,158,210,169,184,73,188,89,29,34,226,93,0,240,107,150,254,181,84,149,229,237,79,240,3,203,141,93,248,32,157],[98,217,120,4,120,76,0,189,225,116,13,132,3,151,172,45,50,103,10,47,92,111,80,10,234,134,66,81,207,150,62,30]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("0", [[155,39,147,246,29,11,84,7,218,65,227,141,147,208,38,73,3,145,242,96,149,78,173,7,240,64,170,133,71,164,139,246],[16,58,239,39,160,4,66,224,222,240,236,174,61,115,253,236,16,158,56,152,131,205,196,10,152,202,235,239,225,93,35,207]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("745oxe", [[66,57,66,135,130,97,223,238,38,166,21,245,189,69,160,38,250,205,55,62,23,53,184,126,123,42,250,234,239,47,92,86]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(33, "[", [[151,162,247,206,218,32,59,187,7,122,12,191,157,109,4,243,129,236,49,214,169,62,60,33,227,106,206,248,9,159,96,44]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(97, "0", [[157,98,5,196,142,210,186,246,98,205,183,111,138,252,250,11,215,21,8,97,213,118,82,125,159,19,192,143,138,177,219,199]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("7w0zsk", [[163,136,178,38,142,165,233,55,246,237,160,176,232,9,146,111,88,6,125,151,163,126,181,173,74,40,236,186,34,7,4,36]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("7w0zsk", [[117,253,203,195,147,83,145,9,223,250,173,185,179,241,223,60,31,228,90,99,23,157,46,104,15,250,176,58,69,238,52,113],[117,254,62,40,90,206,140,32,218,250,193,31,21,68,197,232,71,144,158,155,127,92,155,204,231,1,183,166,222,238,246,40]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(8, "bwof3", [[33,216,60,85,191,210,189,114,50,151,31,116,35,95,125,2,18,23,213,51,43,198,88,205,231,77,22,161,172,153,74,239],[184,201,252,215,62,248,115,4,222,122,2,250,178,9,2,113,140,3,212,150,114,248,66,53,225,45,30,233,62,151,143,109]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(254, "Capstones", [[220,151,174,164,81,77,68,141,127,202,49,184,133,154,9,40,188,224,174,108,202,115,201,170,68,46,81,120,25,127,60,76],[121,136,50,239,195,162,97,168,22,107,62,185,119,81,144,106,30,226,188,226,208,17,197,40,198,255,141,36,154,206,129,137]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("6rrpb", [[19,152,122,115,208,134,213,174,92,127,39,166,191,100,53,93,24,102,208,171,121,150,230,227,124,73,144,89,107,35,123,138],[67,109,108,230,161,222,226,198,172,187,93,188,234,15,231,219,221,64,186,94,35,63,98,65,241,122,36,55,86,201,142,91]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("Capstones", [[251,199,64,149,57,228,53,230,35,122,29,94,182,145,167,254,61,219,140,211,36,117,116,202,245,220,166,154,2,21,48,61],[193,28,72,43,192,27,149,127,224,206,68,212,182,134,23,150,180,122,140,248,30,41,139,95,150,45,39,86,147,71,153,155],[201,149,108,228,8,81,216,86,164,126,82,223,13,50,147,106,223,201,43,150,190,50,144,177,71,128,235,32,54,64,158,128]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(24, "affby12", [[149,168,231,95,204,194,156,229,44,231,83,39,212,76,191,121,222,174,182,200,50,250,5,240,170,40,209,21,137,132,118,204],[249,194,174,82,169,122,67,103,86,222,131,11,156,178,193,211,104,100,195,133,238,46,229,141,160,64,171,154,137,203,155,112],[227,224,143,240,76,5,236,235,116,218,76,252,8,35,233,114,128,151,21,202,97,192,197,45,21,213,178,40,158,97,156,171]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(1532892062, "Transaction successfully verified.", [[214,120,104,191,165,116,220,66,26,1,200,127,217,229,124,96,232,132,136,103,117,17,189,33,142,104,206,116,139,15,166,242],[199,47,155,42,252,185,146,244,21,56,50,185,166,209,66,125,173,89,227,41,110,246,120,123,31,139,228,59,26,250,179,25],[9,242,127,248,157,80,163,191,132,203,156,70,36,121,165,157,115,39,221,103,87,149,208,173,73,197,29,146,33,97,68,100]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[22,68,199,136,191,56,183,19,38,237,20,247,171,178,178,25,149,219,230,103,119,87,228,228,249,67,102,232,37,245,2,164],[179,36,36,87,246,210,98,157,70,233,240,13,122,229,114,232,159,12,108,66,155,44,34,151,167,192,187,119,255,223,155,191],[238,124,225,0,235,199,201,150,179,215,56,57,187,47,58,84,38,60,217,209,255,106,196,90,8,169,190,143,138,74,234,117]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("c48ra5", [[77,22,99,221,248,57,70,161,169,35,46,163,135,117,54,171,249,129,127,136,53,102,108,137,11,107,142,22,226,51,3,43],[97,249,100,92,105,190,40,226,82,109,222,160,45,166,134,134,43,61,176,121,73,161,62,208,202,141,218,199,232,193,188,34],[47,253,105,157,239,205,40,44,233,187,175,187,162,173,76,231,97,141,242,34,67,112,64,93,212,135,111,231,15,37,0,46],[78,157,30,213,103,151,228,14,174,108,240,232,34,174,230,166,207,160,212,148,150,67,63,181,226,44,51,109,112,123,252,167]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(200001, "Capstones", [[66,238,183,71,107,200,13,102,234,57,163,178,163,56,119,101,11,116,138,240,153,29,3,132,212,246,152,128,125,240,217,24],[254,13,41,110,189,192,18,103,209,88,182,8,242,141,205,186,181,107,197,68,186,215,22,83,92,242,162,90,247,10,100,100],[147,194,35,6,114,150,82,220,121,92,18,19,137,32,33,144,102,229,199,115,169,175,114,215,194,195,60,58,233,151,192,249],[29,42,47,25,161,126,203,183,255,38,33,216,241,51,44,180,254,155,100,31,158,124,50,10,137,163,70,179,119,218,65,10]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(49, "[", [[246,226,160,203,180,254,208,29,130,109,87,74,64,241,112,159,117,89,93,74,18,28,0,148,225,94,32,0,10,138,71,80],[9,198,104,235,29,34,138,184,165,192,36,92,53,48,9,253,133,176,7,55,110,131,85,134,22,56,59,87,18,250,185,195],[171,31,161,13,19,183,38,218,233,73,233,39,93,80,57,211,246,58,170,199,21,87,225,118,146,106,236,76,7,125,60,41],[123,73,227,239,193,245,160,119,183,175,109,175,195,15,125,242,209,200,161,231,189,125,33,36,250,236,239,41,106,119,43,86]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("24n2", [[212,52,11,113,170,58,97,157,242,181,125,138,215,120,156,192,163,243,134,124,18,211,164,176,28,129,34,124,246,246,223,221],[45,144,145,154,13,97,236,48,7,46,38,74,183,214,234,133,255,65,124,244,49,231,232,115,174,6,157,148,143,39,186,57],[120,34,161,62,248,204,162,5,168,240,32,124,53,189,35,8,2,85,8,124,168,157,48,143,114,167,120,157,45,201,48,68],[55,26,163,111,59,42,73,226,144,103,4,104,251,46,69,126,22,28,29,109,172,67,68,181,71,11,119,223,34,39,194,122]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ERC1820_ACCEPT_MAGIC", [[204,58,230,250,244,26,23,90,221,123,234,116,231,63,56,10,218,239,103,238,136,242,154,236,190,117,52,0,171,127,200,143],[101,159,117,141,81,65,3,142,220,94,78,151,61,44,130,102,89,23,70,19,185,67,230,21,197,113,199,85,215,205,229,81],[196,88,168,8,16,129,168,248,96,147,6,152,204,90,20,116,36,170,228,143,89,72,125,96,171,180,44,28,200,131,56,212],[59,64,15,59,29,86,19,33,238,207,166,108,53,243,184,248,63,96,79,141,231,188,118,105,139,84,50,154,4,218,2,43],[174,83,120,40,133,22,19,149,182,30,78,55,155,61,106,165,174,75,206,127,242,98,111,186,181,54,159,230,100,18,193,122]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(11, "Transaction successfully verified.", [[203,198,92,244,128,213,170,199,4,87,117,151,170,121,241,206,87,45,13,152,154,18,87,210,95,99,228,95,215,192,194,189],[102,11,180,41,25,137,116,24,53,245,108,73,173,84,240,132,203,114,63,71,156,198,129,37,53,36,51,133,39,46,36,79],[28,72,76,121,247,74,126,208,243,135,45,148,129,190,202,238,23,167,160,134,70,45,61,114,73,130,85,172,211,188,236,77],[141,100,120,39,195,86,147,61,166,90,95,177,75,210,205,41,43,83,172,210,136,2,249,56,27,100,250,39,238,9,121,153],[4,128,150,74,119,201,226,246,11,71,111,1,176,254,124,204,38,185,188,4,93,82,25,171,66,197,213,103,215,161,62,246]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(63, "6rrpb", [[81,186,141,195,179,233,23,44,46,200,30,97,224,150,171,129,65,29,206,128,183,12,88,7,231,35,203,196,104,9,0,207],[90,143,28,105,143,44,147,219,199,15,136,58,87,147,30,155,159,121,236,174,51,195,140,157,249,49,168,223,49,216,146,217],[49,238,91,74,45,218,135,207,3,168,87,60,251,83,91,58,249,221,1,221,73,195,102,177,107,30,147,152,87,201,242,212],[151,212,232,126,144,129,54,137,66,73,19,141,1,217,1,131,60,162,118,74,58,19,149,32,101,139,235,236,213,135,173,235],[223,242,183,220,196,76,19,118,14,226,120,190,203,79,227,14,249,155,30,47,207,144,205,109,36,170,18,226,226,65,177,85]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("Capstones", [[177,202,176,230,155,91,99,184,140,166,36,41,87,54,98,232,122,13,32,79,47,158,218,35,58,146,187,246,249,76,67,180],[152,192,137,15,199,218,146,185,140,130,27,224,255,120,248,69,0,174,140,131,247,255,190,135,171,126,8,89,24,250,253,158],[232,40,4,252,108,138,71,126,232,170,236,123,50,53,146,42,243,81,220,63,174,218,83,214,1,50,134,73,104,3,56,200],[198,83,225,115,104,20,89,255,64,194,137,116,96,239,122,201,221,181,19,47,246,62,226,248,182,80,239,74,44,7,78,125],[48,131,177,141,120,174,9,17,109,167,174,57,94,176,12,207,34,93,154,15,166,33,3,167,243,81,122,72,56,183,246,65]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([26],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[9],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(24,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("745oxe",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("9nny7d", "0",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("c48ra5", "6rrpb",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("745oxe", "745oxe",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("bwof3", "L", "9nny7d",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("Transaction successfully verified.", "L", "745oxe", "c48ra5",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("9nny7d", "Capstones", "Transaction successfully verified.", "Capstones", "24n2",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("L",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("L", 33,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("0",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("P", 29,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ERC1820_ACCEPT_MAGIC", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(161,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["\x19Ethereum Signed Message:\n32","7w0zsk","745oxe","["],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[199,42,93,56,152,239,63,201,232,213,62,72,110,105,46,146,140,247,54,217,235,149,230,49,25,155,138,6,163,242,32,164],[160,221,231,104,4,23,2,214,123,108,88,246,101,161,16,106,147,108,5,127,34,93,198,147,70,145,158,125,42,149,10,77],[76,88,244,96,20,127,121,161,212,247,121,233,226,27,223,134,79,203,156,90,83,43,87,161,127,120,255,162,68,167,34,15],[197,122,2,175,97,229,244,185,139,47,51,232,175,149,252,0,21,96,12,228,213,192,229,54,186,145,64,221,113,91,239,18]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(96, 59, 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([244,64,158,193,140,72,10,161,35,225,155,211,70,206,176,232,198,202,246,94,137,5,9,226,230,186,235,253,31,114,162,218], [218,207,202,169,170,75,119,65,228,207,156,88,60,249,33,26,201,187,77,86,50,166,151,118,250,230,84,131,236,75,25,116],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([23,22,231,35,124,34,242,165,178,119,213,35,90,87,130,204,28,246,58,144,243,1,59,139,198,99,240,72,183,61,120,234], [71,227,236,174,101,51,28,3,191,209,144,154,203,250,85,194,177,91,147,119,163,171,158,111,168,137,193,221,58,11,206,204], [21,20,76,39,18,20,35,93,246,231,221,168,81,204,216,61,72,114,241,52,27,15,196,145,192,85,58,122,90,222,11,170],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([212,119,231,134,20,200,13,172,108,223,173,74,112,122,212,110,145,56,206,234,78,229,142,169,189,79,16,219,206,210,145,199], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([144,64,42,156,232,211,10,248,253,254,8,118,24,21,87,53,123,138,223,143,60,69,179,222,8,216,113,179,243,226,95,88], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([210,223,230,90,77,129,79,219,46,107,91,191,233,199,232,87,206,8,116,36,70,130,131,79,88,170,87,40,205,26,227,211], "\x19Ethereum Signed Message:\n32", [247,107,73,102,141,109,212,50,155,187,14,158,173,127,133,244,58,162,53,63,36,84,37,32,126,211,234,69,128,50,182,170],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([34,6,227,249,172,109,87,27,249,164,149,176,71,196,182,186,90,125,128,224,241,167,7,11,192,17,4,58,94,56,236,133], "c48ra5", [211,4,174,219,228,245,58,212,136,211,171,93,187,28,88,101,124,209,247,52,214,19,118,26,195,118,134,41,6,3,230,215],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([20,184,107,76,38,209,102,131,138,126,240,64,126,146,253,155,167,105,60,41,122,220,49,101,193,63,224,227,30,5,97,1], [166,163,192,170,28,171,203,195,57,95,231,171,221,83,174,145,200,44,58,177,72,225,24,21,85,87,4,242,6,154,123,37], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([20,184,107,76,38,209,102,131,138,126,240,64,126,146,253,155,167,105,60,41,122,220,49,101,193,63,224,227,30,5,97,1], [75,231,21,194,195,89,21,123,211,142,175,223,92,127,200,4,231,137,127,188,119,76,192,99,116,249,136,51,164,57,241,54,84], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([179,43,136,237,163,90,212,126,109,109,195,253,15,40,9,249,147,63,28,64,87,71,51,89,40,182,107,101,217,148,65,175], [144,0,27,168,21,100,183,188,163,172,92,164,32,108,169,181,65,125,19,39,38,163,164,36,167,214,140,153,239,65,101,146], [65,241,207,130,156,118,237,181,0,100,74,3,229,8,236,19,161,241,135,42,98,90,137,225,25,69,191,112,167,223,22,161], "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([47,147,222,189,16,148,162,222,22,80,160,158,213,103,71,176,118,66,36,124,26,5,216,140,116,215,57,63,89,191,62,131], [101,103,207,94,154,180,90,115,57,214,24,29,217,180,76,25,95,59,42,102,236,136,223,31,229,175,25,156,218,102,213,235], [95,147,185,96,13,14,149,153,191,131,219,24,63,193,187,171,93,218,220,165,237,237,100,19,238,118,79,98,72,229,78,11], "bwof3",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([175,241,23,43,187,218,232,194,59,181,145,79,187,87,57,152,4,157,99,189,4,21,172,48,204,121,53,151,60,242,178,105], [246,185,95,224,194,185,2,35,83,192,36,85,212,64,174,79,206,171,71,92,125,6,47,34,54,156,202,1,21,154,52,11], [162,238,111,115,217,18,79,34,10,124,85,230,46,244,13,100,158,237,117,214,149,104,8,231,229,253,62,143,224,183,238,34], "7w0zsk",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([197,26,85,5,154,214,161,149,43,163,172,72,185,150,127,226,206,60,98,125,144,87,251,134,46,26,188,174,130,171,17,139], [211,112,97,48,204,18,171,155,59,29,181,88,179,169,157,20,107,66,82,213,241,239,215,246,83,29,239,3,186,231,74,244], [10,230,45,189,16,50,239,113,233,122,86,70,16,53,146,146,223,247,169,234,200,114,28,103,206,238,50,93,184,124,197,215], "24n2",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([81,197,92,132,73,202,174,157,182,33,164,254,201,107,112,36,61,245,49,33,58,240,159,14,146,35,188,175,149,169,108,163], [72,252,151,88,204,100,21,90,188,166,125,88,235,209,202,89,146,219,82,100,177,177,29,118,201,240,179,247,220,65,18,121], [106,236,148,140,42,145,201,196,179,190,255,45,208,200,39,131,160,86,154,147,192,99,224,49,226,36,76,98,196,77,52,62], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([116,61,119,71,249,58,7,104,32,146,65,77,15,9,127,203,254,34,140,255,112,232,62,176,149,48,199,91,36,44,114,58], [99,117,184,84,206,96,6,43,207,120,39,92,121,198,99,142,26,44,202,26,75,42,66,106,226,160,12,197,150,63,209,137], [89,98,224,117,219,61,52,219,77,122,10,245,148,7,119,50,55,236,247,76,248,98,131,171,19,30,94,124,180,4,188,85], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([70,117,152,181,108,152,209,43,3,66,9,183,122,224,29,100,171,30,153,32,26,117,225,168,195,182,150,92,8,226,94,175], [145,101,72,190,172,120,55,250,122,201,172,203,253,124,211,6,19,128,129,159,246,117,6,136,196,145,134,36,137,213,186,237], [121,40,85,4,216,181,235,239,5,134,71,20,155,28,150,113,95,195,243,179,127,92,151,73,45,218,166,253,220,153,88,73], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([245,30,25,72,167,251,19,62,93,209,219,175,104,102,132,106,226,182,11,215,190,214,63,90,117,61,219,18,253,255,130,72], [61,197,58,10,71,12,148,59,251,151,14,22,61,115,97,233,77,115,232,246,244,105,93,20,111,229,127,238,38,190,152,241], [226,90,122,189,226,229,74,68,53,2,42,243,11,130,230,241,225,230,52,78,117,5,203,84,97,19,69,141,115,214,81,2], "affby12",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([65,231,201,189,34,187,93,146,188,32,194,53,202,162,40,215,34,38,154,38,10,49,210,183,232,177,201,223,155,59,44,51], 200001, 64, [189,208,165,197,238,18,37,64,124,225,35,183,52,140,100,21,178,191,48,228,175,30,64,175,208,75,104,173,220,12,204,38], 65,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([28,5,195,14,60,5,76,111,43,46,252,224,248,195,219,98,102,67,89,190,110,102,123,65,202,5,19,61,194,177,235,112], 45, [195,119,238,253,15,255,130,254,122,195,99,195,252,153,97,181,53,183,243,138,0,124,39,2,174,251,96,11,33,238,104,207], [58,187,135,238,52,104,133,63,16,50,103,232,94,168,204,75,181,152,227,249,175,240,184,63,109,3,135,243,117,238,75,249],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([243,23,248,71,28,206,225,100,143,45,104,156,201,179,184,104,89,40,84,199,191,63,195,237,159,178,214,78,253,244,3,101], [1,44,176,75,122,182,68,146,36,31,35,20,65,53,168],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([70,207,5,10,225,210,223,245,109,142,93,20,181,69,163,27,116,29,208,221,66,136,60,35,206,176,12,220,41,152,11,72], [87,32,200,139,129,154,216,20,25,71,203,8,242,56,35,162,212,2,89,234,227,80,163,200,34,212,131,87,214,55,99,208,52,85,228,116,109,87,213,85,93,251,145,103,69,119,146,141,214,120,34,142,77,21,150,245,235,0,96,172,188,37,61,88,62],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
