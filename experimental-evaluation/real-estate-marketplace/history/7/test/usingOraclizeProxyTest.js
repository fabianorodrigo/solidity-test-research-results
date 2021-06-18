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
    contractERC721MintableComplete = await ERC721MintableComplete.new("L","ERC1820_ACCEPT_MAGIC",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("L","ERC1820_ACCEPT_MAGIC",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("0","P","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("0","P","[",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(101,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("0", 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("[", "mkqw7",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(64, "[", "2y8xy",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(129, "ERC1820_ACCEPT_MAGIC", "Transaction successfully verified.", 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "\x19Ethereum Signed Message:\n32", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("mkqw7", "d4a09", "3jxgks",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(8, "Capstones", "bv3sna", "mkqw7",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(96, "bv3sna", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("ERC1820_ACCEPT_MAGIC", "\x19Ethereum Signed Message:\n32", "\x19Ethereum Signed Message:\n32", 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Capstones", ["d4a09","\x19Ethereum Signed Message:\n32","d4a09","ERC1820_ACCEPT_MAGIC","3jxgks","Capstones","2y8xy"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(63, "Capstones", ["2y8xy","3jxgks","Capstones","L","Capstones","0","L","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(15, "mkqw7", ["2y8xy","[","P","bv3sna","\x19Ethereum Signed Message:\n32","3jxgks"], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("0", ["bv3sna","L","mkqw7","Capstones","["], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("ERC1820_ACCEPT_MAGIC", ["\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(10, "bv3sna", ["d4a09"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(86, "Capstones", ["\x19Ethereum Signed Message:\n32"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("mkqw7", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("mkqw7", ["mkqw7","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(24, "3jxgks", ["\x19Ethereum Signed Message:\n32","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(95, "d4a09", ["mkqw7","0"], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("2y8xy", ["bv3sna","Transaction successfully verified."], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("P", ["ERC1820_ACCEPT_MAGIC","1i754l","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(256, "\x19Ethereum Signed Message:\n32", ["P","3jxgks","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1023, "ERC1820_ACCEPT_MAGIC", ["3jxgks","Capstones","d4a09"], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("6wkqvj", ["Capstones","L","Capstones"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("6wkqvj", ["bv3sna","[","0","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(33, "\x19Ethereum Signed Message:\n32", ["[","L","3jxgks","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(69, "bv3sna", ["d4a09","0","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("\x19Ethereum Signed Message:\n32", ["k4s3uy","2y8xy","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("L", ["\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC","L","mkqw7","k4s3uy"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(1025, "ERC1820_ACCEPT_MAGIC", ["L","6wkqvj","\x19Ethereum Signed Message:\n32","k4s3uy","mkqw7"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(199999, "P", ["mkqw7","pigwm","L","\x19Ethereum Signed Message:\n32","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("Capstones", ["a2wdu","[","pigwm","k4s3uy","sr7fs"], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("bv3sna", [[18,43,37,183,165,209,114,177,131,160,234,203,50,249,62,10,190,85,112,160,81,232,31,53,21,19,104,51,13,2,31,250],[17,106,239,179,161,22,142,86,163,68,76,35,122,154,228,251,235,16,196,45,190,21,135,195,114,134,30,108,142,155,26,234],[112,227,74,50,34,17,198,148,40,235,215,101,237,170,199,60,71,97,253,8,56,6,251,27,191,140,24,134,165,1,159,194],[10,109,10,255,129,229,186,255,156,108,220,119,60,239,181,128,165,142,113,254,63,226,214,171,135,163,55,209,240,214,17,224],[106,235,136,2,206,148,191,125,77,147,2,160,179,85,85,164,183,181,199,172,218,125,140,50,28,62,233,94,144,218,119,108]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(8, "ERC1820_ACCEPT_MAGIC", [[146,109,159,253,152,250,24,198,24,89,162,8,15,47,7,21,254,127,26,207,87,205,34,114,229,201,182,1,231,135,191,210],[216,196,193,98,146,166,221,164,252,224,248,77,47,233,123,215,97,44,108,104,79,199,104,5,19,22,218,7,126,127,65,160]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(162, "[", [[240,154,169,109,250,165,31,245,252,97,31,241,53,156,60,171,181,49,31,90,153,195,246,31,115,195,88,71,195,196,104,62],[217,205,109,146,36,45,145,87,247,1,198,132,172,121,15,235,120,233,223,212,85,193,5,143,187,21,2,29,56,196,8,25],[215,154,140,171,15,41,194,252,20,119,160,77,159,105,2,216,86,47,226,137,70,53,82,248,201,207,197,20,166,71,190,239],[45,160,164,83,222,191,246,249,101,36,145,18,22,85,184,104,109,118,173,131,92,172,172,240,204,23,142,216,103,16,9,114],[14,48,40,170,195,206,236,169,243,2,131,196,86,38,79,91,233,226,20,151,142,64,96,220,149,1,54,73,5,182,148,146]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("1i754l", [[157,6,200,109,2,232,150,128,35,43,54,23,128,9,197,232,117,15,146,98,46,23,30,209,110,25,161,72,222,43,123,20],[126,172,53,92,16,245,96,157,67,54,210,132,146,215,255,150,148,115,82,7,157,7,51,105,28,255,173,126,69,175,27,105],[105,189,62,97,246,92,79,180,211,89,201,245,36,117,164,250,119,200,43,87,47,59,8,114,103,211,33,27,122,158,166,97],[150,226,6,169,204,32,232,21,139,50,220,5,89,235,252,131,41,218,171,59,234,180,238,116,8,58,214,189,99,0,26,160],[196,92,109,91,193,61,173,109,238,74,180,244,168,120,11,71,202,50,176,233,218,143,192,187,181,15,49,98,197,209,18,125],[171,13,180,165,203,26,133,232,61,102,200,178,103,22,52,153,60,215,30,155,140,38,192,152,60,252,9,142,15,203,211,21]], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("Transaction successfully verified.", [[11,101,15,108,45,171,216,173,56,248,169,92,89,150,55,219,202,195,84,251,91,94,67,230,176,249,228,166,198,72,102,77]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(22, "6wkqvj", [[217,33,146,130,27,40,157,86,233,5,74,201,174,65,107,121,52,146,156,81,60,234,150,36,246,222,79,182,128,54,253,7]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(98, "0", [[78,17,207,81,182,124,16,173,124,118,166,123,133,63,27,192,196,27,133,74,112,58,221,191,109,92,131,223,98,57,225,209]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("ERC1820_ACCEPT_MAGIC", [[234,223,67,206,219,172,52,254,81,113,103,175,213,162,178,190,96,147,111,73,177,140,5,246,117,14,126,79,147,60,215,78]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("Capstones", [[57,124,35,238,23,248,201,48,71,56,208,213,33,171,62,215,198,244,136,47,24,12,161,215,5,210,177,220,89,71,149,42],[66,127,191,78,58,158,255,230,86,114,167,195,236,180,79,60,107,233,209,13,230,64,57,218,234,197,3,50,80,145,246,68]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(58, "pigwm", [[24,10,15,112,2,213,199,41,77,164,84,162,138,36,25,140,60,47,197,161,79,151,53,156,61,15,177,120,162,140,44,130],[23,233,1,219,103,142,248,129,36,208,106,177,38,172,74,144,46,129,196,22,10,15,110,182,192,228,148,52,135,61,56,58]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(61, "[", [[160,40,113,74,245,248,163,152,187,6,123,75,197,233,60,169,143,41,52,76,182,1,37,22,49,50,245,93,152,149,142,147],[236,92,48,232,183,80,197,18,0,19,249,166,165,125,91,199,165,105,155,7,4,81,168,130,140,29,77,179,227,17,79,38]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("Capstones", [[99,216,236,216,202,197,0,44,48,126,194,138,163,243,231,254,11,90,209,252,25,73,144,46,147,195,253,206,159,4,121,98],[127,13,199,84,186,38,29,90,189,92,195,248,62,233,121,255,172,74,220,174,33,64,114,59,150,89,123,123,207,201,180,37]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("6wkqvj", [[176,226,0,136,177,1,142,254,40,131,27,66,165,124,188,140,71,175,1,98,148,162,52,17,97,161,13,78,135,74,197,215],[56,233,252,59,81,146,94,39,99,6,32,221,103,128,168,243,159,88,188,226,193,45,205,79,242,187,182,42,142,78,227,243],[14,77,151,244,162,65,214,215,198,5,28,50,236,33,10,254,192,240,81,214,42,130,89,242,222,238,225,2,234,87,9,153]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(0, "bv3sna", [[49,245,162,119,16,255,77,244,226,95,49,148,187,199,192,31,90,32,44,74,57,144,159,234,38,118,119,186,94,180,51,24],[46,37,127,228,14,140,128,18,37,158,196,103,212,221,126,208,67,46,51,205,125,152,27,140,241,132,47,124,163,144,241,241],[121,4,123,209,248,120,7,144,20,46,130,229,114,240,67,2,91,223,21,102,252,162,40,182,88,25,121,83,21,114,109,154]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(20, "[", [[20,179,4,247,100,245,148,35,112,180,254,102,24,87,101,200,159,19,48,53,230,35,57,254,160,62,93,215,204,177,96,159],[213,57,13,79,41,113,173,102,86,166,78,149,109,196,168,96,230,61,58,87,141,6,96,72,145,34,143,163,142,77,103,78],[42,130,109,38,229,62,237,234,9,156,57,180,62,126,209,185,180,168,21,228,14,167,167,104,158,9,135,120,192,149,33,154]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("a2wdu", [[247,152,31,98,137,137,156,54,72,99,113,153,186,189,179,34,230,148,60,111,121,36,77,30,116,247,167,140,181,36,149,26],[211,88,171,118,182,113,171,76,129,194,242,2,224,218,187,162,170,223,63,47,147,106,214,159,235,193,91,191,183,155,60,105],[190,119,159,98,228,58,229,69,92,143,207,228,235,14,16,141,4,241,243,70,201,107,21,49,43,176,43,128,36,253,145,145]], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("\x19Ethereum Signed Message:\n32", [[203,93,142,163,179,218,167,163,24,81,77,223,157,96,26,15,88,103,93,236,87,178,178,15,163,199,197,43,4,82,69,97],[170,36,176,238,250,65,81,230,143,84,225,240,106,213,148,190,241,199,34,141,227,157,167,11,253,231,69,79,59,251,41,177],[215,34,85,155,102,54,51,130,235,202,55,22,85,58,232,233,236,180,185,138,10,124,199,232,94,12,62,148,3,145,151,99],[142,140,17,240,210,56,191,83,170,156,36,10,236,239,236,116,228,88,245,146,170,52,82,86,142,86,167,45,218,108,11,228]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(60, "6wkqvj", [[67,49,67,8,71,230,55,23,83,39,193,117,165,180,196,227,192,227,27,163,192,125,215,11,125,224,9,138,121,49,13,74],[17,217,187,171,136,118,45,172,38,176,132,49,49,69,236,3,124,9,205,10,220,31,19,43,175,7,94,158,120,142,34,2],[249,206,25,151,103,245,112,184,102,80,174,104,249,100,40,245,2,248,101,89,118,227,51,165,55,16,186,105,85,83,47,1],[33,142,93,164,179,246,233,211,158,254,57,206,57,97,217,240,126,251,124,4,196,250,26,171,214,217,129,83,133,240,40,64]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(56, "1i754l", [[189,227,8,216,1,200,209,20,137,42,124,97,82,209,81,2,185,132,19,41,95,198,106,244,158,201,96,213,13,37,148,132],[178,52,238,32,203,136,242,59,231,168,248,151,1,59,90,227,39,125,236,209,57,179,24,120,117,23,2,68,198,21,123,237],[227,44,70,96,1,87,64,132,150,5,46,117,148,106,84,2,21,134,141,209,89,49,252,104,81,96,139,30,202,188,175,34],[144,255,57,37,122,118,119,78,167,139,195,16,64,119,168,141,33,175,239,112,72,38,207,87,135,176,128,189,19,244,223,124]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("\x19Ethereum Signed Message:\n32", [[93,14,223,207,79,137,210,178,174,173,107,211,180,93,77,245,127,48,7,168,85,143,211,112,173,89,116,41,189,212,183,165],[73,9,174,76,219,82,181,254,247,170,36,47,58,110,188,26,251,33,223,135,210,217,206,42,134,155,215,172,175,28,18,156],[165,158,83,123,52,30,124,99,221,70,106,201,109,102,88,217,42,48,51,55,48,93,30,134,182,196,160,112,232,47,116,235],[122,186,157,71,51,142,130,112,186,166,175,77,97,68,231,73,150,2,21,20,221,19,79,107,161,6,42,202,0,221,95,70]], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("k4s3uy", [[0,185,218,105,16,156,91,219,134,240,39,94,5,68,168,136,42,162,158,114,168,70,11,65,161,148,47,150,12,25,209,231],[17,145,53,117,97,36,115,175,46,245,101,70,8,171,88,221,71,153,101,208,132,64,122,109,147,29,88,223,6,120,59,60],[138,237,8,232,12,234,229,185,161,40,207,81,167,215,5,72,191,45,163,46,43,233,3,204,125,11,101,109,44,143,54,55],[140,64,63,71,120,95,10,130,74,124,68,51,37,92,196,124,183,87,75,33,56,38,74,182,247,73,134,244,21,151,205,6],[146,212,243,21,147,145,103,45,157,172,163,121,150,28,39,124,39,85,14,250,143,218,168,149,13,38,156,237,112,189,4,9]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(4, "2y8xy", [[48,94,159,164,222,94,191,184,181,30,189,33,60,244,99,184,211,229,70,134,150,218,59,249,189,194,249,244,196,193,22,157],[99,185,135,96,231,223,243,65,57,79,212,1,175,11,115,49,250,153,222,27,125,92,23,131,187,138,163,198,206,182,196,105],[32,105,226,23,14,63,103,141,133,136,119,179,44,76,36,242,231,66,174,91,56,194,110,69,222,62,161,240,97,174,114,71],[97,234,229,209,74,176,220,3,141,233,219,146,197,143,215,119,6,54,224,116,208,178,3,26,178,215,163,47,14,56,66,191],[252,89,252,57,95,164,106,246,36,132,4,125,161,15,53,96,83,227,245,136,203,88,49,34,30,40,231,218,39,112,199,75]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(2014223716, "P", [[88,209,213,229,244,221,27,38,184,64,120,190,114,10,97,174,208,69,79,71,159,120,223,52,251,15,179,16,103,213,83,222],[196,111,220,243,201,28,36,39,154,23,83,66,83,223,98,120,141,226,41,10,97,78,14,24,218,238,79,109,215,234,32,145],[34,2,99,132,166,21,3,35,229,0,45,65,30,10,77,200,234,189,66,40,12,183,249,196,174,167,179,11,45,174,108,205],[165,85,232,99,159,227,250,54,241,1,146,10,213,1,70,220,232,129,233,105,216,164,37,30,210,21,243,239,17,25,8,135],[7,89,55,105,155,42,80,75,92,154,149,73,217,4,221,18,174,75,209,6,19,0,21,76,113,124,233,191,241,47,114,77]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("k4s3uy", [[144,175,185,6,47,43,165,71,55,143,215,254,196,54,54,197,153,39,208,196,136,46,130,147,92,56,214,49,217,67,235,161],[224,92,41,218,20,222,203,27,192,193,118,246,76,241,121,52,78,16,92,170,181,191,168,233,221,233,29,252,84,253,65,233],[179,187,198,252,2,181,75,232,35,80,40,129,99,248,156,34,132,250,55,191,56,210,151,101,57,53,158,212,56,71,213,75],[181,155,53,37,143,52,12,0,176,178,148,38,222,24,244,153,188,11,200,95,183,107,245,126,10,159,114,14,197,15,122,10],[72,174,51,7,141,133,143,99,216,224,79,79,70,14,251,73,243,176,55,149,33,110,63,80,92,151,97,154,224,82,137,217]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([186],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[6],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(29,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("L",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("ERC1820_ACCEPT_MAGIC", "1i754l",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("a2wdu", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("a2wdu", "Capstones",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("6wkqvj", "Transaction successfully verified.", "bv3sna",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("gwt3nn", "0", "d4a09", "d4a09",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("0", "L", "Capstones", "k4s3uy", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("sr7fs", 23,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("L", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("g97v3", 1,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Transaction successfully verified.", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(69,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["gwt3nn","mkqw7","sr7fs","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[26,150,73,85,40,83,71,12,59,150,189,79,181,8,129,181,129,209,118,25,24,6,247,29,227,94,179,243,59,66,154,135],[165,213,22,190,136,183,205,212,212,219,83,99,66,54,37,44,19,14,238,99,216,46,134,6,28,119,137,188,85,218,51,60],[11,128,175,23,133,204,109,3,24,140,121,227,135,76,21,213,46,152,240,80,238,123,27,3,135,213,48,16,147,184,211,22],[146,174,146,145,251,169,161,70,64,156,236,178,84,249,195,111,118,31,42,225,41,94,25,37,162,185,10,32,178,251,78,65],[177,169,71,239,58,13,217,169,232,254,147,207,121,228,184,225,143,248,206,226,187,205,174,254,156,76,110,119,205,220,219,144],[35,102,229,166,254,25,7,51,99,225,78,172,122,243,218,163,99,15,97,107,209,160,151,59,46,246,12,37,20,236,152,113],[32,150,205,74,115,97,250,157,45,99,21,65,72,225,119,16,8,29,100,206,196,180,36,248,212,194,46,32,5,203,116,130],[211,241,111,89,121,149,244,140,27,92,225,78,96,57,139,7,14,215,87,108,51,79,26,27,160,3,129,223,172,182,126,104],[89,81,119,197,241,49,169,140,120,65,223,33,135,68,92,66,138,26,127,214,107,20,118,192,25,84,253,189,79,9,6,148]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(1532892064, 98, 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([82,122,172,253,173,159,66,140,209,103,33,85,62,189,24,189,16,149,91,67,101,142,163,49,179,51,67,157,95,127,251,201], [121,145,232,64,2,86,81,34,3,251,48,4,218,151,111,55,76,179,227,96,17,242,100,86,77,27,90,194,125,225,100,56],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([86,179,19,34,22,4,183,97,255,72,25,182,207,101,164,135,18,108,214,47,32,215,241,236,47,89,39,150,48,25,88,90], [227,200,198,104,36,193,137,19,89,151,145,79,16,107,227,25,166,203,118,185,252,223,70,215,234,162,191,207,220,241,193,134], [179,208,163,225,44,236,223,226,171,193,62,196,228,75,252,99,27,43,44,122,141,74,206,134,140,218,86,173,171,195,119,135],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([16,127,62,255,136,65,78,172,141,4,224,86,206,35,192,185,167,102,42,69,155,180,157,248,99,54,14,221,146,46,63,39], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([50,41,246,217,117,189,220,254,34,134,119,175,54,59,20,148,238,108,203,200,107,179,159,115,139,211,27,153,104,176,166,112], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([202,188,89,96,167,66,79,141,154,120,184,187,88,15,80,55,188,97,34,62,104,61,183,76,240,44,63,27,221,123,215,153], "pigwm", [222,219,179,35,172,20,65,131,222,214,112,95,111,78,230,54,133,178,152,154,3,204,215,239,15,101,61,166,238,128,131,55],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([230,89,145,240,8,193,176,3,57,27,45,144,46,9,79,72,16,94,218,185,240,121,206,189,185,80,81,128,19,95,120,108], "3jxgks", [194,203,104,23,105,57,69,179,7,235,132,245,230,154,90,224,190,59,146,9,167,214,230,175,250,103,115,53,45,221,81,236],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([91,148,97,13,110,2,51,103,69,180,209,165,73,50,83,250,13,249,89,158,203,224,46,96,91,159,108,163,132,191,106,19], [49,163,130,231,15,186,8,41,37,155,186,153,141,65,59,99,201,64,85,80,189,10,24,143,209,167,0,18,72,27,207,223], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([91,148,97,13,110,2,51,103,69,180,209,165,73,50,83,250,13,249,89,158,203,224,46,96,91,159,108,163,132,191,106,19], [13,142,118,182,114,36,218,166,189,42,120,202,48,124,3,121,158,169,242,6,178,53,64,190,96,186,48,65,116,4,96,110,4], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([155,100,6,233,98,253,86,15,108,161,69,110,57,46,250,49,20,15,188,246,215,81,209,109,198,24,48,73,7,133,28,193], [165,228,123,253,46,203,143,44,136,246,129,42,227,152,189,219,251,71,40,28,229,230,65,49,3,149,74,165,34,38,95,163], [80,40,35,223,227,30,51,242,127,122,156,77,156,160,138,42,63,235,100,60,209,89,244,163,252,135,97,188,242,41,2,135], "bv3sna",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([169,148,160,181,182,47,112,191,126,244,211,139,16,126,145,252,14,153,14,8,1,87,162,17,126,191,44,88,128,115,211,116], [216,229,236,120,80,69,181,37,32,14,15,148,149,56,18,109,195,251,212,248,46,83,219,212,203,90,8,209,150,137,59,129], [29,149,43,111,93,238,174,120,79,6,248,8,106,160,99,2,149,146,193,135,204,237,189,229,54,241,157,57,43,79,37,82], "d4a09",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([181,216,97,132,250,141,166,184,32,80,216,206,210,168,76,213,70,71,199,49,66,79,126,174,243,186,200,229,136,22,90,51], [217,177,133,18,247,172,67,185,81,230,16,118,30,113,38,14,81,189,155,45,67,178,86,172,69,34,102,53,174,217,130,93], [169,226,211,184,51,218,134,227,48,92,207,165,57,110,86,29,16,164,48,109,132,17,232,90,150,63,72,126,237,88,199,189], "sr7fs",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([69,164,182,188,91,225,204,204,102,121,35,117,219,131,191,143,183,123,167,224,69,92,151,40,36,172,65,86,192,87,225,107], [74,172,81,208,245,89,26,243,193,234,109,164,247,233,159,128,119,241,222,78,252,222,37,106,245,202,96,77,75,126,20,236], [204,218,112,106,44,137,143,63,231,100,169,147,235,117,160,180,131,133,11,61,201,154,103,133,225,236,79,182,174,102,7,188], "bv3sna",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([1,234,21,159,55,152,87,222,57,33,1,82,57,5,110,23,92,5,153,231,206,55,252,84,25,254,227,157,90,231,192,19], [198,102,255,26,113,154,238,233,32,247,13,252,151,46,35,182,95,135,215,228,24,191,22,84,168,155,246,168,174,132,170,138], [231,25,210,218,135,13,92,193,233,94,234,241,102,172,93,10,5,95,90,99,127,126,123,127,157,115,75,225,241,149,141,22], "a2wdu",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([63,18,55,183,247,208,25,219,247,10,64,41,167,157,117,255,114,128,225,173,66,36,12,100,158,150,95,117,19,39,15,183], [27,207,227,30,151,51,28,30,217,154,70,37,188,232,89,19,181,245,113,208,130,168,30,88,219,182,158,195,45,115,252,100], [148,252,0,248,217,35,185,12,111,164,31,22,179,121,94,182,65,93,128,159,36,106,129,113,8,195,227,191,86,167,57,139], "pigwm",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([16,151,123,167,172,84,135,156,224,246,228,126,107,157,43,182,107,59,77,247,205,142,110,95,217,176,83,179,112,123,54,101], [204,192,192,50,222,176,183,170,191,103,123,94,149,21,167,82,174,189,226,77,3,246,120,77,244,233,255,124,113,18,210,18], [124,136,196,171,13,114,193,154,41,34,101,100,84,108,6,140,155,245,253,191,241,121,1,95,181,215,218,183,6,196,156,59], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([223,82,162,212,93,190,228,72,61,145,21,169,141,170,107,187,85,165,62,95,249,191,101,124,110,22,240,42,183,219,91,82], [89,213,185,65,91,34,29,5,62,140,233,171,198,129,32,205,68,19,110,240,159,66,33,206,10,213,134,122,232,87,18,142], [248,9,183,165,105,39,126,26,19,84,115,131,61,3,49,213,97,42,189,244,233,90,66,79,41,117,127,86,126,109,214,187], "pigwm",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([171,23,86,182,194,219,105,186,204,118,95,103,166,180,248,244,235,41,80,198,115,223,170,124,126,193,105,42,60,204,99,203], 63, 200000, [174,159,48,65,21,129,127,8,108,253,226,225,115,247,121,234,55,191,121,29,97,180,21,186,88,137,70,77,71,135,254,160], 160,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([238,34,159,225,107,248,31,14,101,156,117,155,77,131,14,172,238,79,123,253,167,194,242,166,165,30,77,132,182,60,146,165], 11, [230,38,153,40,195,131,176,222,21,219,144,200,94,251,87,31,7,206,88,86,160,97,84,175,14,196,166,15,82,36,18,205], [191,21,124,156,163,167,39,132,246,110,127,193,147,101,188,203,116,42,226,217,250,250,196,216,65,82,227,55,183,177,180,178],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([53,185,105,115,218,96,233,0,0,82,210,88,63,193,34,224,207,32,31,230,190,177,43,171,63,210,167,7,23,218,13,138], [13,7,183,136,44,218,142,213,253,154,217,52,91,19,141,43,199,45,164,29,21,213,72,115,17,55,48,37,53,195,205,9,42,22,217,46,109,93,178,20,113,88,245,157,78,216,86,179,124,119,43,109,69,223,1,127,172,106,172,104,103,27,108,197,249,168,26,59,183,63,182],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([156,172,56,77,9,215,23,111,40,139,14,188,202,111,219,25,233,248,145,148,172,195,100,161,36,195,241,67,150,182,93,119], [239,100,247,228,48,251,153,9,145,164,104,154,38,213,193,123,195,209,135,172,195,26,89,255,59,63,28,222,141,238,155,0,134,4,155,208,38,35,34,33,70,24,179,161,97,161,32,201,29,47,72,243,247,216,176,209,141,128,178,26,140,111,108,166,190],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
