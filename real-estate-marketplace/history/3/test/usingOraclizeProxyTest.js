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
    contractERC721MintableComplete = await ERC721MintableComplete.new("Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("\x19Ethereum Signed Message:\n32","Transaction successfully verified.","lnr2ym",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("\x19Ethereum Signed Message:\n32","Transaction successfully verified.","lnr2ym",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(17,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("g7ncsh",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("[",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Transaction successfully verified.", 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Transaction successfully verified.", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(160, "[", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(28, "lnr2ym", "jndwnq", 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "[", 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "mz612n", "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(47, "P", "Capstones", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(7, "P", "0", "jndwnq", 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("g7ncsh", "L", "[", 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("[", ["0","Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","g7ncsh","Capstones","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1532892064, "7lq0b1", ["L","\x19Ethereum Signed Message:\n32","P","lnr2ym","Transaction successfully verified.","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(54, "[", ["mz612n","86uz3t","L","Transaction successfully verified.","0","ERC1820_ACCEPT_MAGIC","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","[","P"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["ERC1820_ACCEPT_MAGIC","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","86uz3t","ERC1820_ACCEPT_MAGIC","P","mz612n","mz612n","mz612n","86uz3t","jndwnq"], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("g7ncsh", ["lnr2ym"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(55, "mz612n", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(16, "g7ncsh", ["\x19Ethereum Signed Message:\n32"], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("[", ["ERC1820_ACCEPT_MAGIC"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("g7ncsh", ["Transaction successfully verified.","g7ncsh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(1532892063, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["v7ru4n","mz612n"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(1532892063, "og27p3", ["jndwnq","bplqeq"], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("mz612n", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","7lq0b1"], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("fu35bh", ["g7ncsh","og27p3","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(70, "jndwnq", ["L","bplqeq","mz612n"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(98, "7lq0b1", ["[","fu35bh","\x19Ethereum Signed Message:\n32"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("7lq0b1", ["\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC","7lq0b1"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("jndwnq", ["v7ru4n","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0","og27p3"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(256, "mz612n", ["28pq3b","Capstones","28pq3b","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(96, "ERC1820_ACCEPT_MAGIC", ["0","g7ncsh","28pq3b","og27p3"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("L", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","P","86uz3t","86uz3t"], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("ERC1820_ACCEPT_MAGIC", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","og27p3","lnr2ym","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(55, "jndwnq", ["ERC1820_ACCEPT_MAGIC","og27p3","L","og27p3","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(22, "P", ["jndwnq","[","28pq3b","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","v7ru4n"], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("ERC1820_ACCEPT_MAGIC", ["v7ru4n","fu35bh","7lq0b1","fu35bh","v7ru4n"], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("L", [[175,255,135,192,34,158,29,195,77,155,8,129,233,114,35,248,72,14,248,245,233,171,230,227,86,143,176,195,127,21,68,161],[230,32,199,200,187,161,110,230,250,136,64,197,39,192,171,142,42,132,245,147,114,193,203,73,131,223,62,226,104,102,104,5],[59,50,226,118,145,55,0,201,200,189,194,59,129,57,37,243,165,92,225,160,242,17,35,3,245,42,69,102,110,204,249,211],[203,250,164,215,234,170,56,34,72,245,50,220,220,5,19,1,50,203,101,2,224,143,51,46,95,5,114,76,212,86,111,86],[133,151,74,105,51,82,176,77,66,113,8,246,128,117,170,12,46,22,212,82,252,138,112,233,240,255,165,140,39,97,186,208]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(1024, "0", [[221,43,108,108,48,147,44,84,208,226,65,53,115,54,123,172,23,54,124,162,234,156,189,90,251,83,65,110,190,140,98,29],[164,22,155,198,234,17,55,163,65,12,15,216,91,162,180,40,96,154,79,124,11,98,23,237,90,34,87,62,182,228,166,229],[62,219,60,41,221,63,111,122,124,211,249,4,249,50,188,100,219,69,117,193,173,176,139,238,10,117,82,25,127,156,243,36],[55,31,198,165,37,82,221,1,228,244,45,22,193,181,4,30,203,1,172,35,57,134,90,209,181,93,89,35,216,58,120,225],[107,5,203,76,151,169,14,128,51,229,123,126,19,58,79,212,73,224,136,233,108,94,218,92,229,103,118,164,249,236,202,203],[43,75,155,243,105,48,12,44,231,56,160,44,237,161,46,174,208,251,0,100,38,4,64,163,230,177,254,52,220,155,207,182],[146,205,240,70,220,146,164,145,151,211,163,58,227,78,228,76,195,5,71,31,197,216,24,76,110,109,19,112,230,30,88,212],[238,175,68,143,156,206,86,177,130,20,143,5,3,71,76,4,16,237,19,64,87,230,2,107,111,61,217,213,136,136,74,224]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(88, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[170,186,209,16,131,94,252,43,99,92,145,168,255,22,60,195,231,17,135,13,187,3,170,9,89,69,125,60,225,237,172,231],[72,180,230,73,130,106,159,221,85,38,2,167,48,184,121,173,151,116,190,216,246,184,198,17,253,65,117,41,218,50,229,93]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("\x19Ethereum Signed Message:\n32", [[146,29,139,103,255,171,193,233,39,225,70,63,248,137,247,122,241,176,32,110,173,14,79,213,206,5,0,62,85,76,122,5],[144,142,79,31,183,206,163,159,218,145,133,23,21,72,232,34,179,94,121,160,91,255,73,86,175,226,246,154,130,2,76,167],[99,132,216,134,133,92,0,146,112,75,199,103,55,88,251,161,41,39,248,172,28,99,96,200,246,254,122,117,169,192,104,88]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[103,72,230,75,172,174,92,51,226,248,182,204,65,87,153,2,22,96,143,47,49,190,191,115,72,132,194,2,117,129,172,64]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(58, "3def7ns", [[179,250,123,159,202,189,182,48,124,77,209,123,108,180,97,27,239,128,185,183,221,240,195,243,134,239,167,24,4,91,21,86]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(102, "P", [[236,32,238,177,217,15,173,52,200,65,230,16,0,121,130,22,242,158,148,19,14,141,226,228,250,220,247,72,61,84,250,131]], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("7lq0b1", [[89,48,224,12,176,162,250,229,126,250,81,79,184,166,231,90,22,10,53,205,70,10,228,131,91,141,6,212,46,227,72,80]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("7lq0b1", [[123,230,139,104,183,246,191,201,154,27,87,37,254,82,60,72,170,31,211,240,13,199,136,202,85,101,132,32,158,92,28,49],[100,201,78,220,136,138,141,6,98,179,172,183,148,221,232,240,50,41,13,97,54,220,158,188,121,29,77,48,23,28,45,125]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(21, "fhq9ha", [[25,40,221,17,153,200,153,196,53,152,93,64,58,238,97,21,156,212,34,124,2,216,77,10,38,238,32,242,246,119,123,148],[71,93,2,147,72,188,31,202,218,228,32,225,7,180,22,232,179,146,250,238,249,61,227,15,223,246,86,78,47,144,42,137]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(98, "og27p3", [[116,113,224,169,42,91,90,79,100,130,187,202,67,111,102,138,72,119,121,115,125,106,155,34,64,170,112,211,129,69,241,3],[195,101,30,164,82,162,147,98,215,203,60,172,176,95,185,71,163,151,136,198,11,250,96,220,70,112,49,102,152,42,235,28]], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("L", [[8,35,114,131,233,28,247,179,87,200,246,179,172,97,244,86,175,200,130,44,165,39,50,174,88,78,42,81,83,205,155,213],[106,167,156,114,202,4,56,94,65,145,36,128,87,150,204,210,62,214,100,164,163,151,181,240,111,121,237,180,220,34,199,188]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("\x19Ethereum Signed Message:\n32", [[230,41,81,39,141,89,13,50,47,133,24,154,111,191,166,161,122,109,101,86,45,232,101,128,151,129,41,158,1,118,113,65],[143,242,179,9,173,159,118,148,106,137,7,166,113,225,19,4,243,111,65,118,167,157,240,157,13,78,190,229,101,101,212,244],[241,82,148,183,196,39,173,158,32,187,88,201,203,219,235,63,78,137,241,92,81,150,189,64,201,204,90,38,124,167,93,169]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(10, "Transaction successfully verified.", [[37,240,114,142,109,189,84,145,254,43,16,174,163,152,69,201,13,187,1,228,222,182,9,2,8,99,122,161,146,233,39,63],[214,59,12,163,161,86,159,143,61,239,14,72,144,10,139,195,17,146,218,63,251,55,248,5,7,188,67,100,9,141,220,69],[72,64,155,79,126,246,175,141,255,219,77,111,4,215,16,218,51,8,234,201,22,139,145,36,231,176,183,45,216,65,169,92]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(48, "7lq0b1", [[42,5,245,103,206,174,241,240,113,127,42,213,195,123,196,205,206,74,23,212,125,180,105,106,138,169,119,15,252,166,196,111],[148,37,177,188,81,11,83,27,176,74,136,78,253,232,237,217,181,22,78,157,22,176,121,136,159,178,56,172,228,68,165,27],[44,9,69,207,221,249,201,57,181,165,245,171,28,62,134,177,193,233,39,172,198,192,122,181,182,218,142,211,99,117,91,76]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("[", [[42,55,31,209,126,205,235,85,135,94,220,71,76,140,134,32,38,218,139,10,57,253,16,43,174,225,91,242,196,15,55,253],[189,71,83,212,226,200,6,211,62,172,196,114,7,66,196,119,204,90,79,184,185,163,184,193,71,84,116,245,172,85,93,234],[91,195,140,45,249,5,70,211,130,58,246,62,211,87,24,9,156,94,211,44,181,87,185,2,92,215,75,149,87,189,210,70]], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("28pq3b", [[114,53,216,238,51,57,107,14,45,44,238,217,202,221,180,184,127,76,159,161,140,26,255,72,106,177,78,54,156,251,251,237],[66,162,155,23,151,195,116,19,89,108,7,169,38,51,49,230,191,34,208,52,112,179,239,124,22,177,128,10,192,46,156,75],[180,243,214,200,220,136,254,94,143,98,31,19,190,53,208,206,76,107,142,94,121,71,29,6,84,252,56,146,104,61,141,172],[61,223,7,15,210,244,199,175,165,90,196,182,230,19,234,208,106,251,41,106,227,108,181,19,9,117,146,49,4,122,13,252]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(10, "L", [[141,6,89,56,128,42,115,233,60,84,159,193,0,30,14,218,51,15,34,89,22,210,3,223,220,22,159,233,121,98,207,57],[4,56,66,60,234,185,34,182,35,141,69,168,37,138,31,94,79,118,103,192,194,207,23,255,169,9,107,222,196,184,151,135],[27,239,130,194,66,84,182,226,69,218,204,204,61,137,69,42,68,200,97,70,206,155,228,175,157,177,17,198,101,96,83,170],[27,244,61,227,42,45,86,27,59,210,13,18,4,147,11,64,33,75,201,22,243,28,202,22,53,229,161,192,116,232,186,211]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(60, "[", [[172,164,33,212,137,34,56,82,64,76,234,184,75,10,213,103,79,18,79,94,28,159,93,222,247,226,183,176,120,70,79,236],[155,209,142,20,217,218,176,156,74,19,188,105,73,118,87,75,71,129,162,39,210,60,241,210,0,211,144,104,205,48,59,19],[152,82,215,77,135,27,109,243,99,143,223,202,98,12,244,169,116,68,197,105,55,114,204,25,108,82,172,52,78,190,163,149],[186,211,21,32,99,37,19,161,22,245,192,42,232,76,90,177,163,142,237,118,8,224,106,240,241,163,186,36,227,47,7,51]], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("[", [[89,194,177,119,246,48,139,78,74,131,131,231,65,169,220,6,109,17,160,47,214,14,82,7,38,81,107,103,6,4,190,122],[41,25,204,67,123,5,150,98,43,249,1,244,147,199,133,3,167,175,147,214,224,189,127,145,0,128,142,231,176,113,209,34],[132,208,235,107,133,225,15,13,67,218,176,190,114,53,64,86,60,208,77,156,193,39,177,90,127,194,75,1,101,190,210,11],[122,54,9,234,45,139,14,112,236,205,193,59,132,89,238,19,53,177,42,113,7,149,23,26,23,238,182,71,180,69,146,66]], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[24,192,158,69,37,127,173,183,95,203,137,123,228,230,201,192,118,238,111,104,2,77,57,167,167,87,43,75,243,92,50,188],[219,150,59,2,72,129,113,208,51,252,253,111,78,228,156,111,137,43,121,243,221,49,215,186,199,200,30,231,52,22,62,66],[33,0,165,165,128,151,42,39,36,215,15,128,177,170,121,90,58,176,221,233,189,155,238,42,17,62,216,240,64,252,146,83],[155,174,92,19,96,83,95,31,29,137,223,69,253,136,245,16,56,55,129,194,23,106,254,212,29,166,131,53,217,45,162,80],[119,197,58,120,187,127,39,200,148,63,179,186,29,193,55,146,109,255,129,180,220,213,197,129,175,181,176,111,5,246,122,226]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(1025, "L", [[179,249,80,143,124,73,64,163,93,41,132,223,44,146,81,199,49,7,75,176,183,17,173,240,247,163,69,253,148,73,150,120],[92,125,8,22,64,52,8,177,95,52,243,90,250,27,71,93,64,71,92,112,117,238,67,190,235,14,163,146,210,245,53,214],[230,21,115,115,176,29,58,158,168,32,204,190,229,112,247,132,37,168,112,38,25,227,124,198,201,36,82,60,31,203,200,225],[105,200,103,128,149,58,117,107,86,108,174,220,244,138,223,20,230,101,186,118,90,202,188,88,52,178,57,175,137,131,167,198],[33,122,57,232,234,212,250,98,31,113,14,239,75,85,97,237,53,108,47,166,124,31,204,157,165,3,162,23,49,66,125,155]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(23, "g7ncsh", [[200,137,42,252,149,233,125,19,161,17,71,36,14,207,48,187,16,125,112,120,254,59,217,77,108,229,254,192,187,253,129,110],[71,203,98,63,209,184,16,173,38,90,224,251,137,3,79,105,82,49,99,95,178,158,181,41,91,84,67,19,117,195,235,241],[69,124,168,96,55,24,30,166,243,168,15,170,179,176,189,232,219,49,174,90,153,68,102,85,56,173,50,230,232,205,211,102],[49,110,40,129,129,153,43,251,125,80,111,64,240,92,104,56,28,239,174,177,148,45,58,89,187,222,180,114,136,5,170,19],[33,66,169,200,208,133,246,57,57,197,208,103,133,145,63,52,55,178,18,74,65,225,86,71,22,148,228,4,154,104,206,95]], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("ERC1820_ACCEPT_MAGIC", [[156,19,12,153,2,24,42,224,30,52,71,113,242,186,121,154,99,217,83,102,224,186,23,119,182,104,163,18,211,222,157,101],[39,190,78,62,151,168,246,11,52,76,233,122,147,177,172,104,241,123,63,254,105,213,84,152,115,96,224,16,223,71,246,21],[6,5,128,171,86,70,137,120,113,113,24,191,150,127,202,60,7,13,49,124,212,150,68,124,62,223,83,24,199,0,236,215],[12,245,133,232,231,95,53,136,45,10,48,20,51,50,7,209,29,49,119,172,156,134,246,176,192,180,177,21,200,15,158,93],[65,13,41,168,163,141,231,18,161,5,147,150,244,66,184,196,38,146,55,17,113,212,41,105,41,240,221,4,150,175,16,166]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([174],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[7],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(3,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("fhq9ha",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("lnr2ym", "jndwnq",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("mz612n", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("fhq9ha", "g7ncsh",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("Transaction successfully verified.", "3def7ns", "fu35bh",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("0", "[", "bplqeq", "bplqeq",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("v7ru4n", "v7ru4n", "fhq9ha", "86uz3t", "6k3f8e",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("6k3f8e",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("fu35bh", 46,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("g7ncsh", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("3def7ns",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("86uz3t", 5,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("bplqeq", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(65,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["28pq3b","P","["],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[14,16,214,20,108,30,189,209,177,28,88,248,41,164,36,64,69,94,26,120,214,126,181,52,230,203,222,189,38,187,179,177]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(95, 128, 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([27,89,195,117,171,41,217,140,40,115,16,45,254,243,63,98,118,6,63,123,129,2,98,224,151,109,8,205,204,251,181,235], [161,126,243,229,223,242,169,200,203,91,39,122,129,165,182,213,153,72,51,176,125,15,232,150,46,63,198,141,132,209,249,237],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([10,248,243,58,71,50,107,17,39,87,66,42,12,225,192,96,10,235,71,227,34,12,230,110,114,227,231,174,226,2,27,12], [145,198,41,20,240,117,229,194,41,84,159,228,236,182,247,109,100,84,135,15,23,204,242,247,229,165,150,3,159,248,150,39], [17,160,232,161,206,42,2,128,235,189,150,228,47,220,89,113,123,171,101,243,238,20,211,186,78,152,180,253,48,84,118,21],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([25,102,132,79,136,65,36,46,50,109,202,135,93,2,100,72,63,181,25,22,207,154,142,65,106,105,16,99,215,146,172,173], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([251,188,242,113,219,57,53,92,57,77,174,153,198,137,249,0,13,99,91,9,3,215,155,124,4,158,233,225,137,222,138,105], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([74,179,140,67,22,210,238,185,172,147,202,188,185,162,249,250,124,238,226,143,13,143,191,246,210,114,27,85,255,43,18,45], "fu35bh", [249,176,48,21,239,217,52,21,81,78,80,86,152,223,56,119,197,25,56,108,28,173,249,99,252,216,111,130,125,226,151,227],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([76,247,198,39,217,134,193,145,113,30,253,70,110,80,151,158,172,100,170,18,185,199,215,28,171,245,208,224,182,87,50,76], "7lq0b1", [218,28,222,4,193,99,147,162,25,79,60,106,14,245,25,159,209,116,105,27,82,48,236,17,55,208,51,48,101,138,143,69],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([48,104,151,188,194,104,123,169,8,5,94,123,69,113,101,250,120,198,216,85,143,72,40,239,25,246,205,0,91,86,114,56], [253,158,247,2,94,19,93,226,243,75,173,55,167,4,211,139,60,98,17,84,106,12,71,57,162,136,230,249,248,202,226,191], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([48,104,151,188,194,104,123,169,8,5,94,123,69,113,101,250,120,198,216,85,143,72,40,239,25,246,205,0,91,86,114,56], [26,236,171,68,92,37,150,88,50,239,51,219,154,217,21,241,211,225,134,174,170,226,24,116,113,160,134,88,176,190,88,180,220], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([89,167,47,72,97,4,195,124,229,157,112,21,9,56,103,252,177,213,14,177,42,235,201,78,79,19,74,111,196,30,53,49], [125,211,102,223,135,212,106,153,108,33,48,92,115,58,196,80,27,155,14,26,246,208,213,156,250,217,133,254,29,70,43,205], [132,105,192,149,235,138,107,76,49,96,59,91,178,218,254,246,242,153,88,122,113,66,43,150,129,249,239,241,236,134,230,103], "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([173,217,166,45,153,196,186,181,199,40,0,91,151,18,75,201,95,78,136,180,136,46,147,15,214,22,19,215,70,188,169,243], [1,67,215,179,64,173,142,195,107,243,83,135,170,197,40,217,124,59,66,233,114,164,231,141,91,84,36,21,89,21,19,94], [207,44,94,231,100,59,62,110,109,49,217,240,96,38,207,36,220,123,93,187,90,119,142,116,88,160,187,190,239,95,77,253], "Capstones",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([250,158,169,224,252,212,70,47,219,203,141,151,197,78,160,3,79,194,254,91,25,148,189,92,48,96,156,178,73,81,147,81], [67,53,159,199,113,42,2,228,237,212,133,8,37,206,115,143,21,132,173,128,65,59,227,61,124,99,104,7,219,11,125,32], [6,216,184,151,17,45,63,207,107,101,29,190,59,138,203,36,226,209,14,108,7,27,50,206,37,45,45,218,17,244,226,238], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([110,30,195,96,212,175,13,245,13,183,192,172,19,7,5,159,92,157,149,240,87,139,138,107,230,220,152,192,189,231,51,249], [208,207,213,90,237,163,237,64,194,204,87,245,198,96,13,105,196,240,110,151,226,124,254,207,196,48,244,198,73,46,10,16], [70,25,245,132,158,51,59,53,148,9,92,36,70,224,174,40,123,26,79,49,87,54,196,2,43,255,41,199,95,57,119,237], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([13,39,113,69,57,17,249,120,75,230,126,200,172,8,34,94,246,157,162,91,114,59,65,106,181,35,158,24,115,255,42,177], [162,152,198,67,241,17,243,31,39,153,102,36,116,239,245,224,10,255,124,237,216,90,141,150,125,183,160,201,84,134,130,66], [35,195,188,241,20,87,165,116,133,25,44,200,109,139,43,75,13,232,212,192,37,141,102,39,208,231,223,139,199,174,215,93], "mz612n",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([48,225,77,34,22,5,226,162,96,20,126,47,15,49,18,29,223,27,14,222,98,0,223,181,237,67,123,62,128,21,185,137], [8,226,199,147,68,211,61,222,21,111,156,11,187,82,50,53,109,207,94,126,29,55,38,174,175,125,153,234,167,49,213,171], [192,97,80,163,53,45,105,56,105,203,51,118,96,243,126,63,238,69,9,249,185,144,218,127,14,158,97,109,115,185,66,138], "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([115,167,56,227,41,44,134,148,29,55,159,192,183,105,189,17,42,219,198,104,93,63,26,1,121,225,87,139,1,144,66,194], [74,66,163,8,192,152,15,179,163,69,222,41,251,28,84,152,239,27,146,227,34,208,47,217,113,204,69,214,225,25,247,50], [88,78,88,199,122,238,18,182,166,35,132,216,144,230,113,198,197,33,71,126,141,130,40,14,166,91,46,74,168,21,171,36], "jndwnq",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([194,7,163,84,147,222,177,155,20,83,175,197,120,135,91,32,86,131,182,132,161,217,5,22,125,57,164,233,182,23,200,110], [144,184,227,181,31,61,96,152,114,28,183,120,86,192,144,176,236,255,42,231,86,35,166,48,41,95,93,161,140,218,7,106], [14,99,188,254,150,2,83,134,233,84,79,163,200,112,246,237,14,59,59,31,128,150,243,177,37,48,111,141,93,48,102,253], "jndwnq",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([155,66,51,131,40,26,133,72,52,147,209,136,153,222,65,215,60,239,154,144,125,74,141,118,104,206,84,186,152,48,61,47], 60, 27, [88,88,172,191,198,176,75,128,136,101,127,245,120,30,239,152,124,134,107,56,86,169,221,162,41,14,29,252,122,229,209,146], 200000,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([103,168,48,27,106,72,251,143,96,76,153,111,16,220,96,177,151,17,16,159,108,155,112,207,134,76,37,189,240,183,203,132], 29, [102,111,46,147,80,39,107,233,94,71,194,202,161,68,132,254,131,136,170,123,215,63,1,173,20,238,244,74,104,98,37,185], [26,17,195,230,84,187,100,118,55,73,76,124,105,123,20,7,13,250,26,13,137,148,156,106,7,177,240,10,163,221,123,144],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([87,214,206,5,45,122,35,127,18,5,46,92,213,2,43,6,253,116,215,9,149,89,28,162,20,220,58,143,118,26,201,215], [207,18,255,225,174,253,169,121,1,177,43,24,119,230,194,219,99,228,64,138,220,59,20,88,184,71,94,43,176,119,169,248,125,154,81,112,234,160,158,241,22,211,74,194,91,200,216,52,95,192,104,55,140,25,221,101,103,115,154,180,118,25,50,182,163,153,245,231,86,109,23,113,179,237,243,178,99,48,133,199,214,128,217,105,9,188,248,181,86,221,251,254,30,203,83,44,161,184,69,221,103,213,183,147,224,92,135,82,225,172,63,248,78,63,122,254,80,60,224,202,208,80,37,151,15,184,59,62,120,138,46,255,27,109,118,113,123,3,84,149,23,66,211,205,113,142,20,86,104,36,60,191,96,188,71,103,9,152,52,149,156,215,100,239,216,187,246,129,109,19,204,217,223,252,63,7,68,40,77,45,72,16,120,114,38,61,152,0,92,77,106,169,52,149,108,133,133,240,115,125,31,191,86,119,69,174,34,110,152,79,219,207,170,227,150,184,152,235,97,172,151,88,213,149,33,24,151,74,149,222,167,123,114,161,175,27,245,133,51,0,101,39,41,2,117,217,41,55,226,151,70,41,10,167],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([120,185,68,196,248,210,4,236,57,81,183,179,211,66,81,9,240,194,178,48,19,106,231,223,113,25,121,216,235,233,202,45], [34,80,173,180,141,228,66,72,173,38,118,197,198,206,29,182,111,92,227,157,172,32,86,230,185,235,176,71,127,86,135,132,224,2,173,8,152,190,171,198,240,177,197,59,146,55,140,151,240,81,191,177,174,111,194,71,97,4,3,123,117,108,247,193,17],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
