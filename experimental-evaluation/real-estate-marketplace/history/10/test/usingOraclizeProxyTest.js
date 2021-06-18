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
    contractERC721MintableComplete = await ERC721MintableComplete.new("Capstones","P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("Capstones","P",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32","L",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("ERC1820_ACCEPT_MAGIC","\x19Ethereum Signed Message:\n32","L",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("0",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Capstones", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(55, "L", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(129, "ERC1820_ACCEPT_MAGIC", "Transaction successfully verified.", 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Capstones", "Transaction successfully verified.", 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("ERC1820_ACCEPT_MAGIC", "P", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(21, "L", "j2nrfk", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(46, "Transaction successfully verified.", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "x4eljo", 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "x4eljo", "0", 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("[", ["w04rw","Capstones","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(5, "[", ["qs4sne","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","w04rw","Capstones","0","[","P","[","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(27, "0", ["\x19Ethereum Signed Message:\n32","qs4sne","qs4sne","ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC","ERC1820_ACCEPT_MAGIC","w04rw","P","Capstones","L"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("L", ["w04rw","Transaction successfully verified.","j2nrfk","w04rw","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("Capstones", ["Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(47, "w04rw", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(65, "P", ["x4eljo"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Capstones", ["L"], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("L", ["ERC1820_ACCEPT_MAGIC","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(32, "3v6p4", ["mkzdal","x4eljo"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(255, "[", ["x4eljo","Capstones"], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("qs4sne", ["x4eljo","w04rw"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("x4eljo", ["P","3v6p4","w04rw"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1532892064, "qs4sne", ["x1wbr","Transaction successfully verified.","3v6p4"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(0, "P", ["0","mkzdal","w04rw"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("[", ["L","mkzdal","\x19Ethereum Signed Message:\n32"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("x4eljo", ["Capstones","[","Transaction successfully verified.","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(10, "x4eljo", ["[","x4eljo","j2nrfk","x1wbr"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(256, "0", ["j2nrfk","P","[","mkzdal"], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("mkzdal", ["x4eljo","L","k9yyu","["], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("qs4sne", ["qs4sne","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","j2nrfk","v917i","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(1024, "mkzdal", ["v917i","Capstones","mkzdal","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","x4eljo"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(1532892063, "3v6p4", ["x4eljo","qs4sne","P","w04rw","x4eljo"], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("\x19Ethereum Signed Message:\n32", ["\x19Ethereum Signed Message:\n32","w04rw","[","mkzdal","jp1pgh"], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("w04rw", [[211,8,146,43,72,154,142,49,249,83,90,223,64,190,28,57,95,15,189,161,12,47,136,144,17,14,102,37,122,202,24,61]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(45, "nxwvz", [[44,33,203,222,85,172,33,70,10,55,61,229,13,36,241,212,72,138,131,67,22,110,159,231,61,208,252,20,198,117,71,56],[200,212,48,127,53,145,148,6,161,175,14,4,35,100,141,115,18,45,108,49,198,1,246,111,56,19,96,242,221,200,113,203],[120,30,82,163,40,244,170,170,87,234,41,82,189,154,249,247,99,12,131,165,60,158,73,184,32,129,178,187,125,186,36,205],[87,142,69,77,142,36,123,106,73,232,201,152,71,81,179,215,185,199,128,151,137,135,129,131,175,125,171,44,204,103,115,63],[219,246,210,177,95,125,177,111,129,107,36,69,119,13,150,62,150,226,208,117,101,23,37,113,140,137,211,80,117,231,242,22],[215,200,60,131,57,3,11,222,203,133,8,255,238,188,177,7,50,225,17,136,0,14,171,99,46,164,208,75,37,228,236,59],[187,45,50,113,82,112,214,131,200,23,112,223,157,1,25,127,3,91,64,75,218,129,77,114,85,81,111,44,142,18,160,232],[105,149,228,150,63,89,88,153,181,194,227,45,252,66,206,211,82,224,165,228,186,165,105,202,241,146,26,152,177,120,123,218]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(15, "Capstones", [[45,197,186,134,124,168,30,14,10,198,142,97,139,212,104,237,57,203,138,97,236,38,192,69,52,78,15,136,142,206,131,83]], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[50,228,145,195,18,158,210,100,160,208,247,87,226,149,160,49,63,92,195,175,27,70,209,85,136,217,165,247,34,78,66,72],[90,71,224,109,250,85,99,49,12,35,230,14,202,71,120,240,216,20,126,176,210,223,100,194,93,177,217,95,183,48,48,185],[143,57,68,126,167,170,234,70,120,179,133,0,95,32,47,87,33,168,78,133,109,142,59,176,50,115,217,100,1,179,204,216],[162,155,21,134,162,238,61,96,211,162,37,187,137,250,85,18,34,35,151,134,228,114,85,34,103,78,113,126,88,223,218,216],[28,119,128,53,2,214,153,173,56,13,201,17,166,28,112,24,88,177,172,54,229,233,166,218,220,1,98,237,92,64,242,233],[183,213,164,153,181,61,107,16,87,178,26,90,158,88,93,210,238,194,173,187,52,90,247,50,208,150,11,95,145,173,28,158],[29,14,70,70,240,151,178,105,74,38,152,16,237,228,145,152,80,180,47,127,55,51,61,45,51,12,29,108,151,72,117,42]], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("L", [[133,73,125,187,34,120,8,29,59,54,32,92,175,59,244,57,189,252,220,120,103,70,134,37,54,100,5,78,57,53,166,92]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(2, "3v6p4", [[78,255,228,67,208,20,202,156,57,84,40,255,124,49,170,90,28,92,31,180,195,11,70,146,52,214,40,53,45,155,43,77]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(128, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[77,16,127,232,19,46,105,70,167,110,206,236,73,32,81,198,204,107,205,225,78,245,176,157,213,150,175,181,39,95,67,164]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("v917i", [[168,186,147,91,58,194,104,185,122,123,233,207,190,90,219,42,27,53,182,146,122,55,167,139,94,243,244,112,161,58,155,75]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("jp1pgh", [[129,16,50,108,40,193,67,16,75,148,153,190,234,5,140,204,120,1,103,194,151,87,25,239,250,135,232,230,193,124,153,174],[215,247,56,215,5,168,131,62,60,130,171,80,123,28,120,163,101,174,83,211,19,5,249,176,163,130,69,250,239,97,94,37]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(87, "L", [[183,45,15,200,72,50,219,40,115,223,1,27,74,40,103,122,194,132,145,81,150,152,91,178,99,188,4,85,48,126,131,112],[176,54,250,17,17,58,213,250,148,27,64,83,223,157,47,75,129,180,18,206,74,232,230,242,98,153,131,55,149,2,80,127]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(101, "[", [[98,217,147,245,102,26,158,105,14,64,190,184,220,174,159,193,74,33,237,86,244,130,250,216,90,228,77,135,122,178,199,129],[181,245,186,208,85,42,75,130,183,102,212,106,89,194,107,49,72,43,200,195,79,108,18,22,156,51,113,57,58,108,131,111]], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[147,195,164,248,70,70,155,112,18,119,107,233,13,241,241,141,235,226,212,188,156,72,240,117,23,200,109,236,246,32,117,188],[183,28,0,77,127,72,20,95,68,165,22,150,160,251,117,17,1,59,206,78,52,198,134,193,108,184,67,121,70,144,96,19]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("nxwvz", [[90,58,153,110,200,178,13,161,2,109,164,253,198,149,228,211,191,180,123,115,23,215,210,220,189,129,239,68,247,185,4,172],[0,244,245,141,143,155,254,61,208,199,249,31,115,185,190,250,139,235,210,144,73,17,255,157,65,111,86,78,56,249,197,89],[23,84,81,199,125,65,163,211,192,180,134,94,241,75,164,182,234,167,113,168,104,40,109,235,188,30,242,113,7,42,214,202]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(88, "v917i", [[198,56,115,80,149,171,248,237,155,0,76,193,173,137,119,98,71,221,197,88,220,83,235,9,185,197,57,160,211,180,110,47],[191,251,67,247,80,31,193,255,199,66,231,15,63,52,205,70,112,9,201,182,38,39,124,129,229,6,79,34,227,143,181,225],[161,169,125,245,179,46,7,78,126,212,166,113,252,221,62,16,249,238,249,44,135,12,172,234,216,40,225,72,90,1,189,29]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(71, "nxwvz", [[203,65,76,172,1,55,104,93,192,17,129,10,89,158,251,91,130,81,250,14,67,39,28,150,56,230,58,187,227,211,123,43],[65,178,91,71,107,35,209,68,158,227,54,20,100,127,125,84,70,81,131,219,160,241,6,188,43,55,165,151,243,238,99,222],[102,54,35,108,236,67,189,199,114,12,147,69,160,123,20,114,124,177,48,47,31,6,20,65,44,48,234,238,153,185,155,98]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("ERC1820_ACCEPT_MAGIC", [[188,187,113,219,53,121,183,133,67,139,65,10,150,70,70,142,211,153,212,101,18,3,105,207,150,241,52,30,87,170,16,13],[173,107,180,196,109,30,6,55,82,90,59,78,21,96,236,9,123,142,3,124,23,148,70,207,140,139,91,193,117,38,127,252],[154,27,42,4,87,15,152,109,239,238,28,173,222,102,135,52,253,188,8,189,189,104,41,71,91,236,5,87,213,67,111,151]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("Capstones", [[108,67,53,52,223,77,187,89,20,25,153,8,30,28,118,103,30,70,116,193,47,6,128,116,203,121,34,121,41,152,80,181],[105,240,152,9,200,90,122,97,117,9,61,34,12,218,217,29,227,87,97,252,100,228,226,205,148,139,158,249,223,6,149,193],[244,191,226,47,72,246,51,36,246,122,59,157,69,143,223,253,145,46,2,14,149,157,198,125,208,128,14,109,220,63,92,82],[179,252,143,199,199,193,199,234,220,15,168,234,87,160,100,128,218,175,125,0,140,49,31,183,174,82,62,174,144,222,98,226]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(88, "Transaction successfully verified.", [[20,10,204,59,131,123,111,57,228,93,75,241,168,213,234,137,85,46,181,66,106,177,88,134,194,13,186,164,100,141,145,246],[213,138,106,0,180,186,139,222,248,71,33,4,41,149,158,240,208,16,213,234,66,216,58,72,244,204,144,253,160,75,117,84],[139,125,239,36,129,42,5,12,164,45,148,22,86,213,107,147,196,159,140,180,37,220,150,61,250,214,21,222,63,141,75,42],[23,111,173,233,49,9,37,115,248,104,16,252,138,185,72,8,102,152,35,195,216,236,187,170,17,9,122,68,180,142,210,97]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(0, "nxwvz", [[213,62,220,224,52,93,22,253,243,204,156,136,64,56,210,35,238,232,183,88,43,55,135,82,99,143,52,83,48,68,99,13],[145,196,95,238,215,254,232,24,197,53,100,134,107,164,241,6,119,99,4,147,224,172,9,12,167,224,86,130,146,151,167,22],[9,201,14,7,192,69,127,103,246,236,20,174,37,132,146,161,161,169,189,222,1,192,118,114,8,139,205,136,169,0,172,243],[22,231,201,217,111,181,234,128,14,63,54,121,139,181,168,215,157,135,185,157,18,52,44,42,171,79,66,229,138,113,31,56]], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("qs4sne", [[188,15,103,111,74,36,246,45,217,108,188,127,233,227,56,191,58,252,110,97,252,37,72,238,4,214,55,36,48,83,182,75],[153,115,88,232,179,185,233,62,156,89,222,127,143,124,169,221,164,133,18,9,81,15,88,49,10,139,156,98,223,147,145,11],[104,229,251,34,228,146,129,160,160,229,64,120,27,7,227,48,37,2,213,111,121,145,213,189,4,193,162,50,153,2,96,25],[100,169,83,232,92,36,221,202,252,97,93,58,197,94,44,213,92,55,2,151,204,103,223,242,239,20,103,3,71,130,97,113]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("x4eljo", [[137,56,82,197,35,41,34,233,88,201,109,242,37,202,176,43,143,99,216,48,40,137,28,110,209,93,186,57,112,170,141,58],[28,17,140,14,230,223,8,109,138,197,74,117,177,168,146,162,170,37,98,200,96,241,75,6,161,199,199,241,187,82,137,139],[12,117,253,86,79,25,4,198,59,237,240,140,142,48,208,179,173,160,172,120,136,113,127,73,98,84,57,42,168,42,55,154],[143,98,234,222,72,182,208,93,1,67,246,206,33,31,96,152,181,90,128,33,9,149,37,39,184,173,231,137,135,105,96,67],[17,226,223,181,212,214,157,239,101,112,239,63,81,208,171,4,251,191,83,112,8,248,111,212,121,138,41,104,250,90,254,245]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(88, "w04rw", [[65,62,84,1,113,255,218,34,166,171,153,183,64,50,130,124,40,96,129,64,138,83,121,102,42,100,41,149,166,113,97,117],[191,208,243,233,40,210,79,2,62,59,166,139,79,185,109,151,60,2,41,68,214,3,213,238,234,179,212,10,6,232,186,173],[91,175,173,13,171,92,71,18,213,50,104,20,63,102,247,179,59,238,215,234,237,184,34,28,220,218,106,171,115,141,227,108],[30,27,26,25,195,240,143,153,112,252,49,123,120,151,144,112,107,109,213,86,26,221,158,90,33,40,176,68,203,121,83,22],[114,78,134,82,116,104,54,114,124,89,250,252,91,89,114,61,207,181,15,247,82,20,124,181,31,230,88,253,194,181,209,241]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(199999, "0", [[91,176,123,36,0,139,144,34,121,15,23,106,54,151,187,76,63,224,57,37,219,112,251,223,109,123,148,117,34,157,203,151],[80,95,102,35,176,121,142,117,14,186,196,92,38,48,196,182,208,176,117,202,173,171,150,251,50,48,81,116,193,53,146,57],[69,143,201,145,29,46,178,86,19,76,31,24,42,61,231,209,193,107,36,9,247,206,178,2,171,4,46,53,94,125,72,139],[212,202,119,134,217,221,228,21,112,189,37,90,223,81,210,107,70,86,127,20,68,249,86,246,212,38,74,33,227,126,111,218],[60,195,193,83,212,127,31,47,221,89,6,99,188,79,135,38,9,29,136,220,38,94,76,100,224,110,201,95,36,142,148,46]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("0", [[18,105,8,240,172,112,223,63,64,123,2,117,221,78,33,142,9,85,68,182,197,6,155,150,223,72,9,214,110,233,62,187],[135,141,19,51,61,6,182,84,56,28,182,38,14,163,74,10,241,66,35,244,39,3,236,77,148,124,68,24,66,153,179,183],[79,134,55,181,3,193,255,63,184,170,1,3,190,123,183,117,44,80,187,76,174,189,102,80,2,232,220,177,107,228,251,2],[121,211,130,34,176,44,180,66,243,117,66,26,22,50,228,187,164,149,166,88,19,183,78,146,137,136,95,178,19,150,169,166],[94,156,31,226,146,86,38,213,198,60,22,65,57,171,83,169,151,8,29,158,97,35,113,169,45,96,69,22,29,192,131,75]], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([72],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[6],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(70,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("w04rw",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("j2nrfk", "x4eljo",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("\x19Ethereum Signed Message:\n32", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("j2nrfk", "jp1pgh",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("w04rw", "j2nrfk", "[",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("Transaction successfully verified.", "w04rw", "jp1pgh", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("Capstones", "x1wbr", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "mkzdal", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("k9yyu",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 255,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Capstones", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("0",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("nxwvz", 1532892062,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ERC1820_ACCEPT_MAGIC", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(64,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["[","L","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","nxwvz"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[65,90,50,226,113,143,105,148,206,79,25,47,169,8,218,179,136,47,25,80,22,254,174,151,165,60,75,25,136,172,188,106],[27,57,93,225,56,99,201,219,116,199,122,128,253,69,108,115,26,232,93,245,173,83,6,235,80,38,58,236,81,233,150,46],[69,141,193,52,238,95,200,219,138,50,207,50,185,68,30,185,200,173,44,246,229,193,3,59,5,242,167,85,16,232,16,141],[211,36,89,178,132,26,125,159,129,143,154,155,43,157,66,28,94,96,7,72,166,137,46,79,26,233,158,17,117,81,6,207],[16,188,79,30,181,86,165,185,246,60,167,204,152,62,227,39,44,162,187,124,51,10,38,213,252,142,41,14,96,2,43,22],[131,58,159,12,212,130,86,109,158,192,244,172,137,81,214,74,220,222,248,106,164,31,28,177,43,155,100,91,170,26,255,161],[128,122,137,93,159,143,195,216,140,221,172,214,21,117,211,79,106,58,236,175,94,18,254,251,17,234,165,194,126,43,150,82],[80,147,238,30,168,39,75,214,109,43,233,119,227,161,12,14,244,166,191,247,161,20,27,127,24,79,87,174,121,113,130,213],[199,27,215,60,72,153,27,43,169,207,160,218,218,158,217,215,244,229,104,24,113,111,58,94,232,221,10,245,47,172,75,240],[136,202,167,169,212,76,141,188,207,98,88,212,242,226,193,58,226,207,130,217,236,16,61,145,28,219,51,188,122,56,95,211]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(4, 63, 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([132,35,147,156,254,220,188,199,125,223,239,197,12,126,97,48,101,206,107,132,212,114,148,139,237,112,184,192,74,43,88,232], [91,88,168,210,119,202,43,28,63,19,57,109,27,65,53,219,164,94,142,200,92,115,0,116,192,119,189,83,215,106,10,2],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([41,9,33,33,101,2,8,28,168,127,94,15,104,39,254,86,242,204,233,79,207,235,244,217,214,29,126,16,242,173,247,64], [137,46,6,1,91,197,192,191,192,108,142,253,76,46,138,176,68,64,97,201,49,43,35,87,228,232,252,244,103,239,255,133], [167,92,248,9,204,63,144,83,1,68,188,165,21,45,75,64,107,197,244,57,220,49,139,149,45,187,184,163,35,98,185,219],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([113,19,139,8,245,12,12,214,178,254,153,163,201,106,2,161,37,35,103,156,250,242,78,95,220,190,225,94,10,209,116,89], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([92,201,246,249,170,206,136,132,113,51,206,230,211,61,221,193,58,35,125,114,187,11,52,0,106,238,81,217,248,28,160,58], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([60,133,103,152,252,144,228,58,238,245,214,155,50,94,169,237,133,38,218,57,180,121,154,117,207,234,231,70,206,106,68,163], "P", [177,139,167,38,126,254,204,117,26,93,71,251,164,213,122,143,194,147,2,170,180,100,59,126,195,221,204,83,41,44,120,229],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([135,34,217,5,132,247,72,122,177,175,58,248,79,105,237,46,140,193,75,89,29,152,156,218,56,170,209,139,46,33,146,90], "x1wbr", [196,72,190,93,28,245,76,93,90,239,26,199,10,150,3,162,114,71,217,155,131,251,120,161,121,167,63,64,122,19,199,161],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([250,115,192,108,61,120,147,58,60,146,92,151,8,85,60,74,30,178,84,104,112,49,147,241,176,69,0,174,5,133,19,200], [26,252,21,150,250,61,170,112,60,81,45,57,54,216,47,146,203,84,34,155,61,26,145,80,76,90,17,182,163,37,143,56], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([250,115,192,108,61,120,147,58,60,146,92,151,8,85,60,74,30,178,84,104,112,49,147,241,176,69,0,174,5,133,19,200], [158,184,125,100,29,62,1,235,62,226,170,216,61,72,218,15,219,226,82,201,95,167,81,60,18,176,207,182,223,99,177,19,84], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([165,237,72,238,242,54,138,206,147,43,182,60,246,9,158,110,64,118,57,164,59,227,186,25,188,97,149,122,69,43,25,109], [200,88,170,203,59,144,121,254,72,117,161,168,100,196,119,224,3,185,67,68,60,91,120,26,220,2,20,94,222,155,95,49], [157,236,103,174,50,175,20,235,244,15,199,51,186,134,107,12,60,158,7,103,218,164,242,153,249,183,57,144,2,181,208,113], "x1wbr",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([100,76,174,214,239,6,6,188,32,27,61,41,146,153,61,178,87,175,171,40,1,181,49,121,120,45,77,250,43,29,101,238], [223,182,49,70,52,120,57,201,120,128,170,253,215,87,92,53,10,208,179,223,176,28,20,20,173,168,225,10,196,61,27,226], [184,4,20,177,165,124,184,172,42,157,126,88,55,57,145,125,41,43,15,36,162,155,32,91,5,100,62,243,120,153,174,189], "x4eljo",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([180,250,6,65,2,135,201,205,14,217,221,20,185,35,146,168,28,70,142,225,170,114,241,66,141,234,217,133,187,26,42,89], [25,152,252,211,82,27,189,31,213,38,145,108,193,86,182,235,123,52,84,195,243,64,178,170,196,234,81,154,36,226,164,23], [76,227,126,62,110,135,63,65,148,113,238,66,78,216,152,108,78,193,72,251,229,192,222,53,63,252,4,233,2,214,92,206], "nxwvz",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([14,164,70,90,160,242,153,79,234,38,107,11,189,213,149,147,149,87,205,94,135,185,91,70,97,209,142,252,53,231,76,11], [70,75,152,178,211,106,20,37,100,3,188,68,182,54,196,21,108,26,15,148,41,211,88,63,232,128,51,192,156,212,174,213], [50,201,154,172,190,30,17,14,92,46,163,207,14,136,186,90,188,74,197,74,89,233,191,202,149,137,55,168,221,24,53,219], "j2nrfk",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([253,184,253,43,104,165,84,46,53,136,173,81,77,97,162,188,107,187,32,71,112,114,138,70,197,71,3,220,45,54,83,106], [156,135,157,145,93,203,151,156,37,140,130,153,180,64,81,229,34,68,45,81,58,97,19,14,254,77,153,49,198,195,157,117], [137,16,113,68,186,199,22,151,115,176,71,181,73,30,124,151,128,241,198,243,220,139,113,2,137,20,168,176,242,153,143,33], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([167,68,156,66,30,84,19,107,234,54,107,169,167,52,53,174,78,186,82,238,199,185,27,190,136,204,26,76,196,159,239,24], [99,11,54,107,111,149,232,98,54,23,75,179,42,141,100,42,209,152,74,192,189,56,188,111,9,46,1,251,128,50,80,179], [15,208,153,77,202,145,58,200,141,83,39,14,102,244,254,199,231,99,182,66,146,31,224,168,142,174,74,211,52,59,70,31], "k9yyu",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([164,45,101,146,255,12,115,154,217,16,202,80,132,251,149,194,207,240,40,157,52,116,62,211,184,136,5,247,82,24,190,229], [213,134,112,194,91,40,82,6,156,247,229,115,5,250,111,201,20,66,45,99,255,184,222,156,172,241,127,229,19,88,178,14], [13,135,7,27,114,34,27,235,150,42,74,167,93,101,196,237,250,171,236,204,126,8,67,220,165,235,0,7,145,79,143,208], "l87gno",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([112,188,213,223,45,251,57,42,124,108,228,162,83,91,107,159,241,196,222,247,244,162,27,173,100,34,248,33,100,179,148,206], [135,164,81,249,96,89,24,81,1,144,19,69,3,145,188,10,104,99,40,168,94,156,147,145,152,148,139,12,221,131,121,210], [14,159,77,182,161,178,126,37,137,61,213,188,104,125,215,100,174,70,186,151,189,153,167,106,145,114,119,42,3,23,144,45], "w04rw",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([109,89,95,149,49,117,132,16,53,146,3,98,162,122,152,165,254,88,178,40,149,10,29,42,238,102,98,22,154,226,252,35], 6, 127, [131,183,255,38,240,227,163,92,200,9,174,178,46,88,3,147,71,218,79,158,236,83,145,40,184,208,104,15,95,154,197,61], 45,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([32,129,131,71,241,163,210,191,77,39,202,118,105,147,63,72,229,166,106,47,18,223,40,42,49,207,175,182,22,45,86,147], 9, [183,123,148,102,117,133,221,27,153,160,142,154,127,223,219,235,139,135,124,76,215,227,40,216,29,135,211,230,226,109,218,72], [225,24,63,88,244,214,253,74,168,215,82,114,39,1,65,143,166,120,64,234,15,68,23,44,155,136,236,74,178,81,180,29],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([74,74,210,126,125,56,7,70,155,152,149,118,12,120,198,176,84,234,120,138,165,166,75,42,183,182,97,135,94,39,199,194], [111],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([93,21,70,173,215,117,104,237,234,247,195,109,185,173,187,96,42,51,7,168,71,126,120,64,18,41,96,22,78,211,135,135], [189,218,52,87,2,111,157,130,243,148,178,113,252,33,143,184,236,228,107,174,44,28,57,23,200,40,210,246,99,116,169,226,7,227,117,98,0,0,216,160,20,63,147,14,106,155,117,118,102,247,32,61,168,220,239,224,145,122,191,217,58,176,162,143,84],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
