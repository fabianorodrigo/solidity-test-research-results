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
    contractERC721MintableComplete = await ERC721MintableComplete.new("Transaction successfully verified.","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("Transaction successfully verified.","[",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("\x19Ethereum Signed Message:\n32","Capstones","P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("\x19Ethereum Signed Message:\n32","Capstones","P",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("L",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("L", 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("L", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(87, "ERC1820_ACCEPT_MAGIC", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(2014223716, "L", "P", 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "[", 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("L", "L", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(4, "ag385z", "Transaction successfully verified.", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(254, "Transaction successfully verified.", "0", "[", 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("[", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Capstones", ["L","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(256, "\x19Ethereum Signed Message:\n32", ["dmluc","dmluc","dmluc","L","P","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(160, "ag385z", ["\x19Ethereum Signed Message:\n32","P","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC","[","P","ERC1820_ACCEPT_MAGIC"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["ERC1820_ACCEPT_MAGIC","[","ERC1820_ACCEPT_MAGIC"], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(7, "L", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(10, "Capstones", ["0"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("P", ["P"], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("L", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","hzv7ek"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(21, "0", ["[","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(59, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["[","P"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("0", ["Capstones","\x19Ethereum Signed Message:\n32"], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("ERC1820_ACCEPT_MAGIC", ["L","\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(28, "ERC1820_ACCEPT_MAGIC", ["P","Transaction successfully verified.","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(128, "Transaction successfully verified.", ["dmluc","P","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("Capstones", ["dq6ekk","Transaction successfully verified.","["], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("dq6ekk", ["dmluc","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P","hzv7ek"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(5, "L", ["[","ERC1820_ACCEPT_MAGIC","dmluc","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(32, "ERC1820_ACCEPT_MAGIC", ["50vpdr","Transaction successfully verified.","wl2ydf","Capstones"], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("dmluc", ["ERC1820_ACCEPT_MAGIC","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("jiqcyk", ["P","dq6ekk","P","L","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(57, "7txgxc", ["[","Transaction successfully verified.","tifqa","\x19Ethereum Signed Message:\n32","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(129, "Transaction successfully verified.", ["ag385z","ERC1820_ACCEPT_MAGIC","[","jh0sv","ERC1820_ACCEPT_MAGIC"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("dmluc", ["1jihn4","49dj8","ag385z","Capstones","tifqa"], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("7txgxc", [[115,118,109,129,5,101,239,24,107,105,137,26,244,114,82,226,204,63,113,116,35,128,195,204,44,76,57,249,72,53,145,154],[82,206,31,137,114,2,199,20,138,86,135,119,185,68,85,30,34,175,141,75,22,165,209,102,227,97,62,112,159,201,67,170],[81,181,206,65,129,228,17,73,178,44,188,180,166,215,153,0,60,120,137,42,21,31,73,179,56,47,115,99,58,237,74,100]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(98, "tifqa", [[179,56,160,132,116,150,190,206,234,209,191,58,206,76,86,208,151,189,149,88,219,136,212,170,41,206,95,206,172,111,173,77],[98,116,171,33,108,163,105,59,167,201,79,93,86,231,121,222,98,217,68,161,213,82,172,163,244,204,217,1,179,187,173,214],[131,175,228,59,236,33,63,1,104,58,73,10,73,234,63,133,54,232,7,14,97,234,147,103,120,185,117,3,59,205,213,40],[148,103,108,93,127,116,194,199,165,209,150,12,161,64,18,26,100,242,71,89,37,161,94,98,196,41,133,31,178,33,85,57],[219,206,3,209,101,80,130,254,50,47,254,4,254,121,65,133,107,227,216,20,51,71,64,27,128,26,11,87,133,156,132,68],[2,202,97,34,15,181,82,145,192,87,59,35,79,80,183,100,74,113,205,232,82,90,254,173,222,63,135,15,217,1,94,78],[230,99,203,27,97,200,221,7,169,219,195,219,24,193,114,231,93,59,133,200,0,18,228,207,46,151,219,159,94,44,48,82],[172,122,150,93,154,200,60,32,45,29,53,103,84,68,98,175,169,28,68,21,142,65,11,215,200,122,196,55,173,83,164,109],[64,35,125,117,160,188,99,21,134,93,127,255,233,6,152,111,147,110,157,79,25,130,20,23,251,169,216,162,83,158,53,152],[138,30,103,243,212,222,254,93,134,40,205,237,237,5,100,215,129,188,135,26,136,162,34,216,215,170,67,9,174,74,250,137]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(1532892063, "dq6ekk", [[8,61,247,35,200,23,188,48,32,71,210,215,207,240,123,87,185,233,114,143,37,103,142,200,33,31,134,143,26,251,234,138],[174,254,66,242,162,94,13,79,106,7,50,139,160,41,174,160,181,190,124,194,183,158,116,153,21,86,119,1,162,69,221,153],[227,196,149,164,183,174,31,150,237,114,180,180,33,41,219,63,141,89,81,34,129,45,174,188,8,103,22,232,236,177,3,187],[142,78,107,160,60,224,248,197,100,122,43,146,199,167,155,211,219,207,129,224,44,190,64,218,59,189,145,194,139,4,62,196],[233,11,203,54,190,201,167,102,43,36,15,253,157,12,252,47,185,193,231,103,185,146,214,178,231,63,58,139,107,171,226,40],[68,161,208,0,50,249,161,54,221,123,206,199,134,163,103,182,56,147,179,123,165,148,101,7,20,191,96,184,231,119,88,77],[229,14,1,190,63,45,202,48,213,12,232,197,81,215,27,126,229,202,175,28,182,124,115,65,121,140,86,223,94,2,191,194],[130,138,105,120,162,153,178,83,57,72,215,203,3,14,193,136,178,77,151,140,163,164,128,179,51,216,170,54,13,87,93,33],[69,190,206,219,239,56,71,174,68,12,68,133,210,111,106,245,195,27,171,69,175,75,55,113,47,164,74,72,214,16,229,189],[105,42,135,130,9,13,63,4,254,222,216,23,216,87,245,166,179,66,1,105,196,206,84,139,179,138,131,229,231,91,215,172]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("wl2ydf", [[194,223,102,118,105,114,57,59,185,37,253,90,4,69,159,43,206,49,215,118,110,240,142,155,162,24,165,84,110,23,158,93],[187,79,48,69,153,160,48,0,221,24,237,242,209,226,171,179,203,172,242,141,229,22,148,176,140,55,142,148,74,19,159,19],[232,181,179,102,7,119,203,236,248,105,185,96,227,10,14,19,181,222,245,149,236,38,183,59,190,190,97,3,70,114,26,231],[180,160,33,196,91,107,158,242,220,251,174,132,147,240,240,172,53,109,185,96,14,42,49,96,44,57,130,218,2,136,75,54],[159,244,43,121,154,75,141,200,37,221,151,213,97,33,249,30,97,177,183,181,37,103,172,12,66,86,28,137,130,160,56,203],[147,187,126,141,247,38,201,255,246,16,100,178,102,238,26,182,75,241,100,156,191,55,218,110,159,12,252,108,252,20,10,63],[187,24,254,116,116,91,93,30,40,33,165,91,171,214,221,19,185,91,219,181,105,110,41,188,165,37,22,129,24,39,104,238],[94,7,218,125,25,27,106,169,202,163,114,89,155,141,156,228,87,66,162,177,150,203,47,164,234,34,23,245,33,18,156,228],[214,71,94,125,71,156,91,165,109,22,7,47,125,63,60,129,105,28,91,244,31,91,208,26,102,39,98,109,69,2,69,101]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("wl2ydf", [[222,78,238,238,25,38,58,73,45,61,133,175,229,248,33,73,23,226,1,133,166,116,134,44,37,77,115,254,24,131,178,106]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(6, "Transaction successfully verified.", [[164,201,61,143,239,29,187,222,45,187,174,131,193,173,250,170,130,49,182,70,186,69,47,30,174,224,186,139,181,255,117,222]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(25, "7txgxc", [[134,35,111,147,59,150,89,16,148,8,101,237,45,96,156,2,96,124,125,189,252,238,165,19,21,253,76,127,201,76,161,75]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("L", [[227,72,248,248,162,14,196,203,70,200,91,76,7,85,110,149,26,237,156,221,250,236,243,57,30,76,57,253,246,97,94,209]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("tifqa", [[157,217,20,234,115,65,91,177,244,190,151,123,199,60,225,163,142,45,153,212,117,208,205,137,212,36,228,115,87,118,82,33],[32,48,182,250,117,248,151,199,45,167,98,39,38,155,167,82,115,151,163,8,202,89,148,67,139,211,71,159,105,130,8,76]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(49, "P", [[170,80,99,51,222,160,201,47,187,98,192,184,45,251,147,179,239,187,136,167,171,22,173,95,125,208,177,48,106,25,176,210],[50,35,31,200,7,41,86,79,186,20,141,113,75,236,5,9,67,150,56,127,80,253,74,213,176,145,142,116,10,70,197,90]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(256, "\x19Ethereum Signed Message:\n32", [[171,250,16,229,173,55,2,3,183,205,93,137,10,97,221,65,126,233,86,100,111,121,54,186,200,105,147,169,193,29,236,235],[128,214,35,75,158,165,82,128,222,89,58,104,33,163,97,174,41,204,252,216,79,219,73,67,173,22,241,208,103,133,249,214]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("dmluc", [[99,101,22,4,126,25,128,186,128,102,171,115,58,8,174,182,34,21,207,231,201,156,249,43,114,54,91,147,159,129,194,193],[56,97,244,64,175,93,206,228,230,157,94,227,250,2,80,85,254,156,115,23,141,104,117,43,114,131,123,94,85,50,79,9]], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("wl2ydf", [[46,74,148,184,97,149,107,153,57,131,95,36,140,2,65,176,13,150,12,103,234,113,104,87,29,72,11,103,232,55,45,16],[195,207,133,136,203,114,118,255,54,65,225,77,219,23,252,212,228,48,148,107,239,177,54,162,73,103,14,244,252,48,70,145],[153,92,138,202,91,187,23,224,233,200,128,41,117,33,124,3,89,193,77,43,231,75,116,68,251,143,172,98,91,252,171,236]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(200000, "50vpdr", [[109,155,87,172,61,83,110,210,74,11,15,206,94,24,75,211,124,88,59,241,34,29,1,202,225,231,178,67,181,223,144,124],[183,56,246,106,17,51,115,229,194,204,200,203,145,4,188,149,42,84,59,178,153,167,91,219,17,248,38,12,153,107,112,160],[83,0,30,54,243,250,63,59,186,201,166,254,47,100,116,249,68,124,88,220,70,170,213,166,150,97,226,180,239,147,252,208]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(46, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[235,139,245,163,112,182,26,23,13,28,206,251,254,84,2,179,83,103,190,175,224,91,50,242,112,25,146,184,78,121,3,215],[109,242,149,254,91,156,160,207,146,206,59,12,224,102,107,219,99,65,158,219,226,232,226,38,183,221,252,73,12,85,24,207],[251,207,230,64,241,16,22,169,43,123,36,186,100,244,175,129,39,53,203,116,17,96,38,19,79,8,109,43,224,195,42,21]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("L", [[162,230,228,71,208,194,134,150,42,212,82,127,154,186,132,124,93,7,221,162,163,113,95,109,135,175,29,116,224,241,229,161],[196,182,65,11,249,4,218,141,244,7,176,247,20,47,49,42,193,237,142,147,209,92,6,215,141,4,67,130,56,78,207,77],[134,185,52,187,135,152,215,7,223,90,29,13,9,45,169,192,159,94,185,237,245,182,107,52,99,76,135,148,20,107,213,31]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("\x19Ethereum Signed Message:\n32", [[38,122,56,69,213,251,92,69,234,75,187,66,149,125,112,126,193,220,32,69,26,30,37,186,131,209,9,174,185,84,105,145],[121,31,229,12,166,177,118,183,225,148,0,146,94,190,14,133,175,108,16,109,114,95,121,3,166,199,216,64,36,102,100,160],[55,131,82,106,77,110,105,192,248,81,46,170,102,200,227,249,102,202,28,250,57,192,188,65,99,51,249,18,187,190,208,61],[152,181,23,51,228,13,177,140,255,239,251,36,35,190,4,212,70,170,10,80,246,168,210,167,131,45,122,128,172,173,105,83]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(255, "Capstones", [[71,11,233,156,212,107,90,142,6,35,155,54,177,187,63,151,246,187,235,176,182,30,109,148,254,108,117,196,101,254,147,199],[10,81,179,158,9,132,223,185,160,134,218,214,172,112,157,150,73,151,168,203,89,59,125,179,164,240,108,129,241,15,226,53],[33,255,9,171,53,52,23,13,208,254,7,248,24,128,121,29,209,39,108,65,243,194,214,95,144,52,206,46,89,31,88,197],[182,136,44,47,24,179,175,149,224,185,104,21,29,202,255,56,122,63,155,80,187,150,152,227,116,86,78,233,115,164,132,25]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(28, "hzv7ek", [[56,242,90,171,164,200,133,51,198,211,68,186,78,109,29,177,238,190,89,132,87,138,28,231,0,87,90,102,88,80,80,81],[104,193,143,47,70,177,123,45,159,248,30,207,206,199,10,179,178,123,127,88,121,76,11,47,186,229,228,104,149,198,7,155],[22,213,69,4,113,245,69,207,242,154,235,214,19,77,17,227,137,82,12,229,92,53,242,61,45,69,18,231,55,93,144,95],[94,75,46,43,216,101,114,113,0,247,41,143,128,27,236,131,106,72,161,152,84,69,4,4,7,96,137,194,43,95,196,106]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("P", [[161,93,58,5,174,193,201,222,119,111,194,11,97,155,231,212,192,6,211,23,149,209,60,31,162,50,22,57,91,25,132,99],[129,24,221,142,167,248,158,117,114,249,153,231,214,185,94,54,115,112,22,182,151,18,204,67,215,53,32,2,226,89,225,18],[89,217,76,57,175,112,218,226,27,51,47,138,35,250,203,62,21,197,187,87,157,235,194,205,200,132,155,86,82,235,202,48],[59,81,232,139,227,23,43,56,17,205,124,86,29,226,140,135,187,237,33,130,140,95,133,70,197,210,159,182,152,218,218,246]], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("dq6ekk", [[136,120,4,206,58,173,246,187,8,46,69,158,58,165,119,8,245,226,152,161,8,234,52,90,235,128,21,18,144,88,174,155],[12,215,123,47,177,184,247,133,152,221,189,137,243,156,97,23,118,199,125,220,87,227,37,99,46,103,16,12,151,255,241,81],[48,125,110,116,227,44,76,25,144,26,65,169,162,104,15,187,106,58,232,69,146,87,232,113,202,214,128,201,45,139,42,100],[218,165,101,131,239,179,142,4,42,183,206,107,255,225,120,131,153,34,83,84,71,122,166,228,62,200,101,60,62,250,192,100],[6,39,225,209,161,123,51,157,153,3,0,152,23,140,105,34,189,3,114,110,150,219,202,30,249,243,186,250,80,85,91,181]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(45, "jiqcyk", [[121,161,191,238,202,250,3,94,248,209,5,5,114,146,226,164,221,41,144,25,112,47,94,224,43,110,20,231,231,209,169,0],[8,133,212,158,190,251,248,22,50,109,26,34,188,18,129,193,231,111,150,90,234,88,7,181,163,45,164,65,168,34,63,237],[254,193,75,33,227,72,189,188,12,28,214,86,208,241,245,137,216,82,206,247,85,210,237,126,39,223,106,114,196,91,122,70],[193,225,100,151,204,202,237,88,114,39,241,150,205,181,104,26,107,253,162,3,81,15,127,205,26,174,234,63,61,114,46,28],[222,241,127,141,195,76,172,150,83,93,158,68,1,52,170,14,244,82,148,252,22,199,74,151,134,167,105,59,9,149,106,98]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(55, "0", [[75,32,97,235,166,250,223,164,142,58,159,227,204,49,35,124,96,183,228,45,128,185,94,19,78,66,31,215,220,114,97,0],[161,241,121,54,188,180,217,61,34,186,135,62,136,70,157,239,78,124,114,3,102,190,140,210,109,122,248,9,241,121,58,180],[198,137,198,180,216,71,65,193,222,39,111,118,59,111,186,6,139,116,203,112,130,179,44,69,87,119,109,132,79,212,253,136],[78,186,135,38,167,143,90,38,132,14,8,24,130,246,162,175,32,131,60,212,194,71,86,200,113,104,28,163,112,251,68,88],[182,10,176,158,89,52,219,34,53,9,157,217,4,177,248,33,220,163,89,45,141,85,102,15,94,99,89,193,181,213,149,248]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("dmluc", [[194,19,199,204,21,141,6,181,163,22,123,238,51,17,140,97,123,232,235,223,233,185,131,42,174,47,85,88,201,222,231,152],[2,32,55,59,28,205,39,223,137,125,137,62,160,170,172,219,254,153,212,215,134,232,214,76,248,69,185,43,134,166,174,177],[206,155,62,174,190,151,172,26,237,44,47,117,48,169,168,53,108,49,158,69,182,195,101,25,10,232,51,134,3,25,194,27],[44,223,153,150,145,52,72,196,218,95,255,214,235,174,222,50,190,11,13,95,87,225,176,127,195,47,104,47,246,11,246,124],[200,219,114,217,71,34,152,205,225,177,169,16,125,65,235,188,47,118,44,183,179,164,94,182,46,143,61,236,1,85,108,181]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([128],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[8],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(21,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("dmluc",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("wl2ydf", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("tifqa", "dq6ekk",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("Transaction successfully verified.", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("P", "dq6ekk", "jiqcyk",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("Transaction successfully verified.", "1nb2a4", "jiqcyk", "hzv7ek",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("1jihn4", "49dj8", "1jihn4", "hzv7ek", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("1nb2a4",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("dmluc", 87,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("P", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("0",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("dmluc", 48,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("L", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(9,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["z4f686","tifqa","1nb2a4","0","Capstones","wl2ydf","0","wl2ydf"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[230,107,0,173,153,233,98,4,119,219,205,180,116,242,148,159,220,99,40,20,196,6,29,157,164,186,230,208,191,91,159,63],[169,254,140,218,158,191,125,232,103,58,155,66,230,214,193,15,254,89,206,247,178,100,100,171,56,143,12,99,83,47,25,50],[243,66,8,182,200,75,159,195,152,217,76,116,221,76,183,231,123,8,84,226,239,191,37,184,18,182,144,87,160,129,172,226],[50,235,202,215,72,148,164,223,121,154,13,2,101,49,208,108,50,124,199,156,248,179,64,2,239,116,214,212,16,228,130,178],[55,198,249,37,222,38,130,167,57,37,2,253,103,249,70,9,83,192,240,219,28,8,72,186,200,238,201,149,250,183,136,159],[130,33,93,24,200,58,224,123,17,228,115,49,241,215,80,216,212,138,23,55,126,186,194,32,72,58,194,225,60,58,121,71],[74,178,72,89,8,172,10,46,26,199,63,238,158,160,249,124,15,48,199,127,122,174,151,38,202,167,6,206,77,96,202,29]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(9, 56, 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([24,77,110,57,166,148,45,25,40,43,171,84,129,204,135,158,87,125,177,28,50,169,164,106,126,108,48,28,95,204,65,233], [50,165,207,84,95,185,174,0,69,20,251,32,17,70,182,144,147,153,75,33,11,119,94,137,46,9,164,41,0,177,33,136],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([202,119,76,46,24,134,45,67,216,108,63,35,252,214,184,229,217,248,7,63,124,161,191,57,144,97,71,12,20,184,153,78], [162,74,226,34,109,141,2,253,191,81,178,245,145,193,138,87,88,234,231,75,208,241,146,214,206,37,211,174,63,29,130,193], [180,233,188,61,130,217,88,157,66,136,199,158,218,103,251,164,246,181,71,13,228,96,191,31,206,19,205,207,80,101,224,146],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([152,34,148,136,199,42,87,18,187,155,253,124,219,72,29,233,36,110,173,229,58,186,231,197,133,122,105,168,150,78,71,18], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([129,193,205,236,152,128,227,53,104,118,223,84,45,207,60,83,92,225,3,253,67,17,240,39,131,15,199,208,56,208,206,37], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([64,130,42,63,27,214,151,140,252,67,41,189,56,62,47,248,100,18,106,42,13,233,115,1,181,11,163,146,132,86,126,216], "50vpdr", [68,53,30,205,124,246,111,111,166,140,31,57,16,247,90,234,22,98,120,222,149,88,237,109,80,162,74,89,72,143,228,193],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([23,23,207,217,152,26,220,7,16,120,254,237,134,235,35,51,128,52,58,188,233,61,104,208,4,245,36,4,92,185,115,40], "z4f686", [135,56,6,230,197,49,108,142,34,39,128,43,33,245,40,54,111,34,218,4,86,74,69,36,27,59,211,31,235,56,122,173],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([180,226,189,9,244,200,18,35,215,230,223,23,102,254,110,217,133,107,3,210,171,125,72,65,19,48,149,80,122,50,16,183], [244,118,42,230,206,139,36,22,197,171,18,172,145,244,6,58,92,110,85,122,176,82,233,138,14,76,120,255,152,102,226,90], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([180,226,189,9,244,200,18,35,215,230,223,23,102,254,110,217,133,107,3,210,171,125,72,65,19,48,149,80,122,50,16,183], [91,60,37,84,69,81,200,25,190,70,128,84,232,125,127,1,127,117,188,190,127,159,79,245,8,162,142,21,101,75,192,11,32], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([59,99,238,77,28,254,15,56,207,84,166,156,194,226,6,231,102,236,252,48,180,204,11,50,170,66,60,139,235,40,29,194], [226,106,70,175,57,198,215,160,74,187,16,173,75,233,98,185,20,200,38,202,78,159,30,93,247,248,124,83,142,8,94,223], [99,192,230,5,137,190,40,65,202,220,48,27,40,209,206,108,225,149,202,2,19,246,246,40,182,167,128,6,232,87,86,147], "1jihn4",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([126,224,63,170,55,211,79,99,171,147,12,168,234,217,131,34,201,111,4,89,62,193,236,242,95,218,191,56,205,150,5,232], [135,114,132,56,133,155,79,115,4,122,75,131,137,135,58,41,87,13,196,1,108,104,0,42,6,25,24,180,180,203,173,235], [180,201,75,213,220,115,202,243,122,135,119,45,210,44,41,156,141,139,226,194,118,246,154,66,164,203,68,203,87,234,195,125], "dmluc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([231,212,208,57,21,189,102,45,73,154,104,240,74,3,105,93,232,91,31,62,250,142,67,140,202,24,174,159,132,53,109,91], [72,57,185,45,65,100,20,160,136,87,99,235,153,169,219,173,132,175,78,149,180,73,120,228,255,11,80,218,92,126,16,64], [221,187,233,152,196,124,232,216,49,30,245,191,51,86,228,65,193,253,94,181,95,78,59,189,103,210,239,7,139,18,92,252], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([225,158,80,190,201,38,249,172,186,220,146,22,71,95,52,28,240,31,87,247,192,124,56,245,120,50,189,165,78,11,55,114], [252,42,29,178,204,84,141,31,220,144,174,74,77,48,216,87,255,123,135,223,191,240,194,84,252,95,247,79,226,148,212,220], [134,143,74,78,75,179,138,199,184,50,209,71,212,102,251,36,130,191,198,70,128,203,115,56,18,50,127,66,114,128,11,31], "jh0sv",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([34,51,2,27,215,60,252,109,33,23,12,198,14,85,246,18,124,191,43,111,23,158,59,240,51,3,253,204,230,170,124,199], [227,100,24,54,97,128,154,189,209,240,168,122,97,30,59,169,62,29,62,20,180,176,230,250,84,132,70,125,34,219,204,18], [84,17,165,191,177,105,205,10,79,175,222,148,8,208,214,227,17,205,0,79,97,66,190,248,252,109,93,132,74,173,95,247], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([209,102,107,153,105,29,64,111,45,28,52,187,214,168,188,37,169,9,91,83,52,165,77,119,220,36,218,143,243,129,33,222], [63,176,162,170,211,19,177,79,127,124,246,208,133,38,62,232,7,7,210,172,241,239,138,27,128,215,244,75,122,99,14,75], [74,102,199,166,79,242,250,93,9,229,249,105,17,217,57,118,173,249,76,226,50,250,90,226,133,218,255,159,134,20,65,127], "50vpdr",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([75,177,185,63,76,88,234,111,134,188,63,115,220,177,177,247,50,216,187,37,223,220,39,88,187,47,232,194,136,203,173,170], [254,147,102,129,2,80,247,107,148,117,176,147,177,247,56,42,11,91,184,156,161,119,161,55,77,193,240,201,2,179,10,141], [102,215,37,82,253,132,156,90,37,44,23,71,98,61,174,186,206,66,127,94,196,179,240,120,238,18,122,174,185,7,223,209], "cpjnh8",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([35,212,63,217,224,208,190,133,89,145,254,77,90,158,121,136,114,20,249,165,115,74,152,177,118,42,58,153,48,87,145,54], [40,25,94,69,162,253,79,99,119,158,115,150,127,239,96,139,117,14,97,210,143,45,177,146,66,170,14,179,95,97,17,132], [187,18,18,242,9,75,85,206,107,82,64,197,106,17,156,195,102,97,108,176,192,161,158,189,219,79,176,126,102,110,80,148], "jiqcyk",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([117,55,49,89,46,120,254,29,182,110,253,2,112,5,92,123,226,148,111,29,143,245,255,182,87,115,166,139,231,167,184,158], 199999, 59, [33,66,218,234,131,169,150,237,199,84,95,8,230,135,92,134,193,220,71,152,113,176,47,69,150,254,213,144,121,198,116,151], 3,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([223,173,81,151,168,89,67,203,103,59,37,90,42,35,197,108,68,229,64,219,215,46,64,35,44,14,236,84,170,139,204,194], 162, [23,211,86,101,32,242,71,156,60,244,80,0,133,49,24,175,251,143,215,38,3,122,181,55,239,196,129,157,153,46,200,162], [245,216,47,207,72,193,138,105,54,119,35,6,77,44,157,202,122,152,97,66,244,70,3,75,22,34,64,114,251,19,59,37],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([137,146,123,93,218,244,98,134,60,26,6,32,235,31,113,45,137,198,151,92,6,65,145,148,106,151,128,55,85,240,180,132], [151,228,161,21,219,45,114,16,16,179,243,133,73,172,178,181,20,242,28,73,78,131,219,139,77,188,208,136,211,18,190,233,179,169,214,161,75,229,251,0,32,125,43,210,22,236,72,209,204,250,46,205,50,97,59,97,56,123,100,54,105,34,115,126,19,114,223,124,235,103,151,175,206,142,211,122,60,163,81,28,53,214,13,76,233,32,194,170,19,103,201,135,103,51,18,28,65,230,139,205,67,48,200,23,100,249,87,25,177,111,233,40,19,240,13,10,141,238,4,116,133,104,254,109,199,190,99,141,142,154,217,105,93,101,25,44,19,22,225,170,230,99,2,72,78,191,64,60,210,223,166,15,196,66,233,123,199,112,30,184,188,216],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([93,83,107,102,230,98,175,133,177,169,229,11,114,212,206,253,4,196,75,170,83,212,255,147,119,201,118,208,29,156,104,217], [127,35,29,46,116,239,234,189,207,139,69,179,33,4,150,61,243,115,9,158,82,125,158,72,127,57,91,69,42,239,141,165,178,238,24,55,22,187,72,167,12,130,135,121,174,200,123,120,64,235,191,20,136,6,28,198,233,102,163,56,200,117,192,220,247],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
