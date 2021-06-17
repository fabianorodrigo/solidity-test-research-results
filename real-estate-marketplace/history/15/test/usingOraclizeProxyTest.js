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
    contractERC721MintableComplete = await ERC721MintableComplete.new("[","[",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("[","[",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("Capstones","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(29,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("\x19Ethereum Signed Message:\n32", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(21, "\x19Ethereum Signed Message:\n32", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(96, "Capstones", "Transaction successfully verified.", 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "[", 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("L", "[", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(22, "[", "Capstones", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(101, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", "0", "[", 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("ERC1820_ACCEPT_MAGIC", "iudfd7", "P", 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["prb1v","5zgtfd","ERC1820_ACCEPT_MAGIC","Capstones","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(199999, "\x19Ethereum Signed Message:\n32", ["prb1v","5zgtfd","5zgtfd","Capstones","P","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(19, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", ["L","5zgtfd","L"], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("3vp277", ["\x19Ethereum Signed Message:\n32","3vp277","5zgtfd","bmtmihm","prb1v"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("0", ["prb1v"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(2, "ERC1820_ACCEPT_MAGIC", ["8g8hbk"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(86, "P", ["\x19Ethereum Signed Message:\n32"], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("L", ["Transaction successfully verified."], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("bmtmihm", ["0","3vp277"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(127, "bmtmihm", ["L","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(128, "8g8hbk", ["5zgtfd","5zgtfd"], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("L", ["Transaction successfully verified.","["], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("2i70hi", ["3vp277","P","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(98, "P", ["iudfd7","2i70hi","["],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(199999, "0", ["pteaao","3vp277","P"], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("2i70hi", ["8g8hbk","0","5zgtfd"], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("\x19Ethereum Signed Message:\n32", ["5zgtfd","L","0","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(256, "Transaction successfully verified.", ["8g8hbk","Transaction successfully verified.","pteaao","8g8hbk"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(33, "8g8hbk", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","3vp277","0","0"], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("5zgtfd", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","bmtmihm","L","Transaction successfully verified."], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("\x19Ethereum Signed Message:\n32", ["3vp277","ERC1820_ACCEPT_MAGIC","L","pteaao","3vp277"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(30, "5zgtfd", ["bmtmihm","bmtmihm","L","ERC1820_ACCEPT_MAGIC","bmtmihm"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(1532892064, "ERC1820_ACCEPT_MAGIC", ["5zgtfd","bmtmihm","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","pteaao"], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("ERC1820_ACCEPT_MAGIC", ["ERC1820_ACCEPT_MAGIC","8g8hbk","pteaao","kr812b","bmtmihm"], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("2i70hi", [[109,182,87,138,96,191,31,55,56,243,199,57,55,196,149,142,80,60,118,179,103,64,194,63,77,221,66,56,64,74,142,46],[108,195,25,230,79,196,116,181,9,74,254,192,1,219,139,105,179,159,105,108,222,241,99,219,98,235,47,210,34,116,194,12],[162,191,129,248,67,233,71,117,180,164,22,159,97,15,5,165,61,100,84,173,174,86,110,166,46,189,200,51,12,172,113,133],[234,27,131,128,114,172,65,46,12,76,31,231,34,194,226,105,244,198,97,153,210,247,171,8,130,129,14,250,63,96,36,183],[179,1,122,85,120,134,142,73,208,118,215,81,99,229,97,63,118,146,89,187,45,191,253,113,182,134,97,220,92,108,241,178],[202,90,135,111,71,241,150,62,241,166,183,22,58,65,7,225,186,103,255,141,148,61,11,106,87,242,88,45,71,43,152,13],[121,216,174,18,140,0,208,104,65,176,2,142,230,81,93,242,139,206,110,223,166,183,245,145,252,181,142,37,53,116,190,0]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(200001, "kr812b", [[78,202,159,85,22,63,114,148,49,151,87,197,179,134,190,13,241,147,77,133,221,2,18,5,46,24,150,48,162,169,11,0],[129,191,213,184,215,15,70,141,227,83,96,70,30,165,21,50,3,178,101,165,12,175,84,39,100,102,169,194,199,216,150,161],[197,66,40,254,231,8,195,43,163,180,241,231,2,219,177,202,3,92,16,236,92,226,220,2,97,68,74,149,235,139,35,46],[148,82,28,140,222,195,202,155,14,40,183,175,166,189,85,127,15,45,63,131,51,34,25,10,70,140,171,79,13,67,192,115],[54,250,25,184,48,28,144,241,230,162,204,188,181,217,60,160,75,50,28,198,85,87,205,167,212,44,139,148,32,246,107,22]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(1025, "kr812b", [[244,8,168,202,176,41,98,236,37,208,139,94,71,232,12,100,177,212,36,119,39,85,97,154,141,75,198,195,116,177,127,130],[178,94,22,76,0,188,121,102,130,86,162,196,70,115,152,192,203,142,46,48,136,90,158,172,143,242,165,156,22,5,92,217],[109,194,162,70,215,235,183,210,59,129,57,41,185,148,169,178,170,155,30,254,255,199,170,116,32,62,198,35,239,249,62,138],[45,103,103,201,80,96,93,4,74,235,210,148,24,223,119,92,5,78,80,191,85,39,250,138,166,53,174,26,236,230,29,116],[53,186,39,230,77,232,149,237,213,46,179,254,176,77,223,58,178,25,128,211,44,86,188,218,60,2,27,48,44,165,240,168]], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("Transaction successfully verified.", [[13,104,200,153,20,201,196,0,245,171,217,185,125,164,247,240,136,3,202,183,145,46,75,50,14,156,144,167,100,127,31,57],[246,116,68,227,20,3,144,108,242,231,175,95,6,27,91,9,165,27,236,150,229,2,28,143,225,105,53,198,5,247,191,243],[254,41,114,246,138,223,247,181,15,136,245,28,59,235,223,111,139,68,181,22,175,110,225,230,223,110,236,185,20,153,115,2],[8,178,214,57,109,18,236,179,79,135,207,138,75,12,41,135,140,229,243,154,21,80,211,104,85,144,76,9,104,64,51,118],[10,181,72,118,77,192,6,39,99,56,30,236,176,103,250,119,34,211,206,47,42,175,243,86,46,172,143,142,92,253,19,219],[131,36,2,40,117,153,147,73,158,45,166,234,121,200,111,219,190,195,81,70,44,92,164,150,214,184,186,87,30,229,80,109],[255,30,34,151,60,53,112,120,17,99,216,240,242,165,106,124,255,161,233,223,235,188,59,51,83,102,17,71,26,104,73,100],[251,40,200,118,235,45,234,232,111,66,192,175,22,36,152,214,47,162,248,213,174,254,172,8,109,176,118,107,100,163,8,150]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("2i70hi", [[46,3,43,24,64,253,161,43,168,105,63,223,132,94,179,3,90,159,237,64,238,226,130,183,98,111,200,118,118,168,73,101]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(10, "0mz7wj", [[29,141,32,137,220,104,165,84,66,64,163,72,181,1,149,111,120,23,64,125,210,62,97,247,225,167,161,171,233,63,255,151]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(20, "0mz7wj", [[224,50,59,41,31,125,146,152,214,43,154,184,226,34,36,64,3,208,152,188,242,13,116,35,89,179,193,90,163,206,141,235]], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("pteaao", [[112,217,29,154,151,189,49,221,192,112,81,84,68,32,9,215,146,65,97,238,224,56,189,241,251,235,3,137,163,212,59,172]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("3vp277", [[120,215,134,243,248,88,162,219,113,45,63,247,122,38,62,173,213,6,156,167,196,39,248,104,172,154,222,129,104,164,28,147],[123,135,86,134,37,85,69,125,13,196,138,228,164,138,72,187,16,66,246,80,173,96,198,254,129,246,124,114,179,34,104,15]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(15, "5zgtfd", [[190,35,196,168,175,219,42,228,48,156,96,11,1,32,6,85,191,65,159,154,109,86,109,143,148,110,63,149,182,45,72,205],[219,232,117,41,85,9,85,76,64,232,162,250,190,54,145,208,225,114,159,68,57,165,206,210,221,186,170,104,200,243,8,63]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(200000, "L", [[212,192,39,173,204,166,196,59,89,55,0,84,26,66,247,9,100,184,15,152,132,53,201,141,65,19,2,127,38,0,53,188],[32,80,177,184,174,72,180,155,56,57,193,202,147,248,81,130,229,161,44,192,173,152,29,199,53,13,50,186,116,26,120,187]], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("pteaao", [[27,60,142,144,236,7,203,140,175,79,180,115,199,41,77,136,196,78,125,149,149,179,69,243,12,251,200,75,90,9,190,110],[26,115,185,236,223,167,110,64,183,191,158,158,171,190,120,91,2,203,221,68,106,27,20,135,62,1,243,113,27,137,77,102]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("3vp277", [[162,22,86,139,237,59,19,171,130,133,25,15,38,111,49,28,251,189,219,152,109,53,201,182,202,132,73,132,50,165,220,81],[26,137,24,83,98,155,176,205,60,213,75,151,35,243,91,58,145,128,45,80,253,173,240,217,154,40,97,198,130,196,51,254],[91,217,218,237,183,134,139,248,133,231,125,103,177,163,74,5,73,173,84,27,239,2,176,179,178,131,231,222,105,65,65,119]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(59, "L", [[77,110,170,85,153,223,235,94,148,161,12,162,16,99,176,34,59,158,63,206,61,203,220,12,230,8,13,185,195,217,99,189],[30,50,125,82,121,23,189,135,219,125,101,75,18,245,56,26,120,165,113,65,35,97,149,237,43,246,104,151,75,226,74,55],[165,30,151,215,114,52,52,221,1,98,151,18,83,65,86,165,28,47,23,251,119,57,181,62,29,146,72,123,135,30,15,184]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(160, "prb1v", [[199,203,221,15,52,130,152,102,222,195,249,132,164,202,202,80,74,29,26,185,60,40,13,135,255,150,166,218,23,142,200,4],[244,42,135,31,61,191,48,12,109,83,65,31,181,196,4,47,184,193,15,221,44,206,22,216,47,231,248,211,239,195,38,67],[147,131,158,8,196,15,188,54,192,159,12,14,61,81,103,131,139,192,87,50,247,122,192,225,48,197,151,49,37,210,24,250]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("2i70hi", [[42,233,77,120,7,145,243,31,231,162,217,47,99,91,135,218,50,201,95,50,217,225,154,99,211,96,58,92,162,129,4,211],[13,219,214,117,231,238,145,155,42,157,234,105,57,109,71,127,72,204,115,181,226,4,33,193,249,128,212,126,185,196,162,196],[201,100,208,29,14,228,182,93,192,143,118,108,164,142,85,225,71,159,142,107,176,156,243,228,161,125,10,1,124,43,163,71]], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("8g8hbk", [[196,119,81,76,132,182,13,19,61,37,240,224,161,187,128,75,193,33,200,225,187,176,172,245,139,27,203,183,90,199,243,38],[117,198,128,2,131,98,101,13,31,153,145,238,30,210,160,211,52,25,59,91,150,96,9,224,68,218,231,209,46,244,86,118],[222,226,80,24,35,140,247,147,113,97,162,152,6,102,159,36,149,230,111,133,147,219,143,17,237,143,137,168,212,147,46,179],[93,231,25,101,217,79,72,222,84,5,115,145,33,167,59,173,37,16,195,190,77,126,51,90,63,61,144,104,133,254,227,65]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(200000, "prb1v", [[187,206,48,231,234,216,71,173,197,103,222,119,137,251,192,171,19,66,104,159,193,173,175,2,172,20,192,47,119,13,239,16],[152,70,11,142,3,35,57,167,65,16,240,28,168,102,104,165,169,183,209,250,37,71,175,252,236,172,200,226,248,205,225,218],[87,181,5,234,198,110,51,119,32,97,226,20,119,242,213,230,1,78,230,71,82,62,121,177,104,20,233,37,152,135,207,141],[90,183,46,137,191,224,249,114,32,198,157,28,70,19,17,56,156,67,99,78,169,84,34,246,27,171,173,143,192,195,224,176]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(87, "hrt7m", [[233,136,225,176,167,148,235,98,234,134,49,239,134,241,126,12,4,174,126,20,23,38,216,129,175,181,28,121,248,162,196,99],[70,191,225,185,42,17,237,235,192,148,50,68,119,28,30,217,127,194,214,101,23,76,47,152,63,110,107,75,206,68,109,139],[35,123,228,175,107,215,98,190,183,73,13,128,152,71,200,44,204,198,250,155,43,243,198,38,37,37,37,147,182,1,37,34],[67,128,71,10,139,213,217,66,158,24,76,99,200,246,2,250,185,182,10,246,38,111,237,9,119,140,121,91,170,147,227,204]], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("7ge65", [[210,179,140,196,215,244,151,49,119,117,70,148,210,85,81,119,251,87,236,251,103,204,127,204,110,219,231,134,104,79,146,145],[176,14,23,196,251,85,151,165,199,238,157,221,63,233,138,103,64,90,178,101,34,158,139,138,102,97,79,115,163,221,24,220],[65,30,80,129,109,199,166,140,172,83,32,44,100,125,226,31,94,137,45,146,253,105,203,167,116,202,3,97,173,179,138,17],[102,35,224,179,7,219,242,217,148,22,74,9,182,244,189,144,222,213,84,117,79,194,10,96,242,10,151,58,119,239,74,143]], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("kr812b", [[206,107,31,247,17,70,78,215,12,107,69,77,247,233,196,17,51,162,81,31,31,28,223,103,84,143,204,79,93,139,186,132],[82,225,10,235,37,230,175,250,176,132,202,251,75,128,181,72,165,156,71,182,58,225,112,153,192,236,235,187,163,58,151,172],[140,16,147,225,82,22,191,240,61,128,50,191,131,222,193,207,71,56,201,102,193,4,132,221,240,24,230,51,204,97,122,233],[71,233,188,121,128,131,244,241,101,118,138,110,196,139,62,81,184,141,5,65,201,219,132,106,183,234,240,47,43,86,57,89],[187,146,232,115,251,232,16,237,52,127,92,113,193,68,208,45,236,21,72,101,4,221,192,237,96,0,97,101,154,233,190,116]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(1532892062, "3vp277", [[25,36,11,76,20,101,69,41,250,54,44,173,163,140,187,106,99,32,142,154,94,239,146,101,242,210,41,177,224,211,113,167],[196,234,65,17,42,17,31,182,38,37,166,196,145,65,205,84,84,95,1,130,191,216,57,16,62,32,184,165,87,98,201,23],[177,63,124,112,124,172,100,32,129,2,13,176,47,120,124,67,39,117,188,116,184,83,242,220,195,204,16,185,222,200,66,3],[65,138,12,220,177,153,119,244,0,54,227,124,28,133,126,52,185,112,170,38,153,232,171,176,150,254,145,185,8,70,82,215],[7,210,108,244,171,0,150,122,68,54,159,168,42,72,219,192,75,173,139,188,149,171,238,165,134,0,69,23,195,110,183,99]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(58, "4qm9uj", [[179,184,174,101,26,65,181,182,241,136,99,218,34,234,26,81,188,114,116,113,86,28,56,218,133,106,110,142,157,94,183,58],[31,95,94,40,132,254,121,63,122,111,195,252,41,218,20,33,226,143,96,121,106,28,239,14,110,234,239,241,155,63,247,247],[42,226,57,52,216,146,142,19,169,21,92,95,187,202,0,79,131,86,88,114,105,41,236,250,105,86,68,160,56,254,165,205],[207,109,186,42,168,109,134,178,208,193,111,31,148,163,32,239,152,177,35,229,24,11,141,154,166,26,142,175,17,158,41,248],[74,175,44,100,50,180,198,35,215,91,37,128,207,169,55,225,97,26,20,76,67,146,134,24,179,182,76,94,123,247,92,11]], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", [[236,11,220,224,42,62,112,119,158,138,243,211,138,98,143,63,6,244,216,133,185,10,203,70,211,71,199,163,100,145,197,157],[26,99,149,42,105,89,112,79,229,231,120,166,23,159,170,138,239,17,150,66,235,235,114,138,207,42,147,29,6,192,158,226],[158,172,16,229,111,193,76,70,136,11,103,225,45,135,180,171,137,218,112,157,207,129,144,19,66,130,58,251,53,220,30,227],[145,8,144,128,17,177,44,128,87,66,196,223,156,52,165,6,41,229,213,121,249,25,46,115,107,123,30,0,253,74,148,111],[85,22,178,0,70,216,86,39,80,118,147,206,51,62,27,83,14,42,14,23,231,150,245,155,93,130,80,156,31,66,29,66]], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([227],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[6],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(102,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("P", "ERC1820_ACCEPT_MAGIC",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("L", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("hrt7m", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("8g8hbk", "pteaao", "hrt7m",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("P", "Transaction successfully verified.", "Capstones", "3vp277",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("\x19Ethereum Signed Message:\n32", "kr812b", "4qm9uj", "P", "0mz7wj",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("jr4lek",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("bmtmihm", 2014223716,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("kr812b", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("3vp277",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("8g8hbk", 16,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("iudfd7", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(1532892064,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["kr812b","8g8hbk","Transaction successfully verified.","0","prb1v","hrt7m","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[221,103,124,25,238,160,84,41,253,191,203,105,133,85,149,77,57,143,142,215,13,137,140,86,254,138,112,22,236,197,174,136],[215,236,111,72,244,175,149,225,228,135,28,206,108,128,23,179,191,118,192,220,218,127,209,86,127,177,122,66,13,152,47,183],[47,141,35,94,205,144,122,196,205,124,0,229,13,4,183,72,165,147,0,178,7,128,95,217,49,194,199,65,201,158,226,115],[210,233,211,23,214,204,37,173,112,50,43,122,95,114,208,186,178,147,67,21,216,213,120,111,41,24,245,209,54,135,114,43]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(86, 101, 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([113,28,48,77,51,193,53,222,190,139,43,199,71,226,255,192,53,156,73,142,165,45,223,159,255,42,26,94,74,75,220,37], [79,159,45,20,223,23,88,197,242,163,107,139,136,21,171,79,213,133,34,146,39,174,27,130,224,203,117,122,2,195,58,238],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([126,238,209,42,176,178,70,202,201,35,67,243,127,39,171,253,166,229,131,164,119,4,226,42,16,57,115,88,36,235,143,91], [186,83,63,57,181,207,4,102,127,117,190,60,192,135,164,242,88,166,25,147,243,80,207,156,131,164,152,6,99,25,185,234], [237,107,227,253,138,202,242,238,101,173,4,88,161,90,142,219,146,130,31,68,225,174,17,239,195,2,200,233,133,139,223,90],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([248,141,228,250,229,174,58,32,245,58,207,127,150,146,160,55,240,237,168,129,33,40,221,117,107,113,152,14,93,56,111,63], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([66,24,154,83,8,51,100,140,190,217,243,189,137,176,148,235,249,113,196,136,224,20,182,125,200,179,252,26,119,135,146,108], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([168,148,163,110,237,96,53,203,103,118,169,35,77,9,123,234,170,139,4,70,203,41,252,162,254,109,87,183,205,102,42,239], "7ge65", [119,145,155,212,181,129,235,245,213,92,146,200,232,202,166,148,184,66,57,37,201,69,157,66,151,163,200,152,85,196,20,146],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([57,96,106,57,219,50,20,97,104,118,233,77,85,131,37,181,37,39,15,194,89,179,213,230,172,165,229,31,68,213,0,215], "4qm9uj", [213,103,200,6,142,202,159,131,130,211,11,15,160,56,116,219,176,91,213,21,19,96,177,220,221,34,120,228,219,71,243,179],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([65,130,231,191,162,173,107,119,48,89,125,101,33,149,211,228,239,109,220,255,125,169,233,244,71,178,30,148,109,39,6,97], [161,135,179,171,103,66,205,242,255,22,197,161,231,46,5,242,240,49,116,32,67,171,151,238,101,200,67,160,145,105,180,169], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([65,130,231,191,162,173,107,119,48,89,125,101,33,149,211,228,239,109,220,255,125,169,233,244,71,178,30,148,109,39,6,97], [63,27,145,176,92,142,9,169,218,38,102,161,59,183,97,162,106,83,101,19,171,130,89,67,183,183,255,159,116,245,78,91,107], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([20,211,237,78,121,54,133,40,13,176,185,210,13,220,24,175,54,48,184,63,13,67,194,86,254,2,36,0,139,122,103,60], [81,221,194,78,82,215,53,113,49,216,164,248,46,186,107,197,55,99,209,11,239,140,157,252,155,111,159,190,21,239,125,75], [133,201,9,177,228,171,52,118,48,193,40,241,152,44,183,201,154,230,203,143,123,105,246,43,89,199,78,31,212,44,24,94], "7ge65",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([158,75,10,87,18,108,66,185,54,12,224,189,116,238,90,162,66,85,122,51,180,106,168,234,162,186,198,108,165,249,122,40], [56,121,52,250,242,10,119,204,48,22,90,92,196,72,151,127,124,145,186,175,114,14,38,136,63,194,214,139,70,87,109,204], [213,121,6,209,81,62,129,118,246,70,77,29,159,107,53,130,91,118,61,197,122,11,125,245,153,48,100,254,64,147,23,202], "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([77,238,201,177,128,4,94,181,90,174,137,96,158,201,29,9,173,153,18,217,175,65,114,202,112,56,40,90,61,144,42,41], [210,85,213,125,155,140,175,74,6,29,27,59,118,100,51,154,23,119,148,29,113,154,18,50,63,121,101,88,48,122,76,139], [231,197,253,204,234,26,57,214,154,5,87,20,189,223,172,227,254,182,202,51,44,170,252,158,167,246,56,82,43,162,157,53], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([178,247,36,100,90,111,12,183,56,238,54,157,100,124,246,229,74,120,80,156,188,158,116,222,29,0,121,43,161,95,68,119], [16,34,7,12,148,35,125,111,151,119,227,85,251,81,160,39,92,45,143,69,39,61,120,236,181,158,30,142,231,144,5,101], [233,198,190,8,217,10,78,170,126,237,48,121,99,160,58,254,142,174,226,69,28,83,154,142,130,193,153,30,151,107,80,97], "jr4lek",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([217,133,150,210,234,144,127,255,223,97,33,94,236,89,186,236,2,174,251,6,51,73,81,149,119,181,209,236,204,105,86,174], [160,145,77,177,1,228,82,9,127,78,109,44,195,216,62,239,190,241,214,45,9,181,236,180,133,46,35,184,179,153,101,247], [217,174,18,65,158,7,99,231,82,167,146,34,44,106,253,215,191,76,157,69,6,49,229,165,4,180,44,149,44,108,235,234], "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([89,32,97,15,123,19,20,87,148,106,70,30,31,105,11,7,102,90,130,107,52,179,227,19,57,33,28,204,175,196,117,172], [82,135,226,213,11,214,239,239,129,161,42,20,111,163,173,239,155,62,13,18,217,1,101,103,170,199,20,14,29,134,181,63], [103,31,60,225,66,17,66,218,235,40,222,239,112,201,46,9,125,81,173,151,33,106,211,63,80,90,32,172,198,216,114,2], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([14,150,23,156,216,148,50,225,57,212,75,1,91,237,226,27,148,244,106,84,139,248,6,216,2,213,178,40,89,3,238,145], [125,246,157,171,104,206,93,194,104,241,75,219,85,225,162,133,5,130,217,29,188,142,141,26,70,37,96,75,19,152,129,236], [150,239,224,169,91,169,121,244,189,25,203,112,6,251,74,91,109,135,143,27,125,13,221,20,2,167,234,17,93,180,163,195], "0mz7wj",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([196,130,5,54,63,6,210,217,255,207,8,142,7,16,128,22,67,120,189,60,162,124,30,164,26,109,142,180,7,162,187,142], [209,249,109,238,53,126,154,154,166,118,6,240,17,134,75,197,62,184,152,201,99,179,209,32,6,38,109,24,185,157,108,177], [32,39,73,168,237,177,229,22,34,69,135,171,168,120,0,50,248,14,108,220,200,217,36,60,31,90,112,177,57,129,28,213], "pteaao",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([225,28,36,148,54,78,81,244,157,146,63,10,105,240,10,7,62,36,59,159,96,73,94,77,244,95,79,108,221,150,116,66], 57, 1, [253,73,34,11,36,139,154,182,131,158,47,72,22,94,143,7,51,198,156,77,25,70,114,124,184,6,128,241,113,223,157,193], 24,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([37,100,206,185,141,32,72,202,7,68,0,46,105,193,88,5,66,202,229,22,222,182,139,55,179,236,201,103,162,50,148,227], 48, [60,23,11,78,176,82,179,115,174,188,7,122,34,191,3,8,145,217,158,177,14,196,187,16,213,138,251,1,134,153,241,217], [11,233,205,28,221,63,205,86,1,173,124,154,217,6,34,60,80,61,185,177,91,187,233,142,23,79,237,175,180,204,147,52],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([24,227,105,12,57,62,148,251,10,3,98,19,64,123,27,174,194,136,0,234,77,247,13,40,147,144,132,74,200,173,154,161], [4,213,214,191,242,213,75,201,228,249,78,190,234,8,226,91,137,29,29,245,100,24,30,110,37,17,226,21,154,13,139,7,251,230,21,245,111,34,247,52,12,219,58,180,152,89,23,238,148,65,239,119,234,4,80,204,83,14,224,231,139,192,202,123,9,85,210,201,91,93,39,1,113,140,190,124,29,178,182,90,248,42,120,131,152,76,137,22,146,19,98,234,37,24,89,73,178,14,117,108,143,43,171],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([197,16,186,7,199,93,43,205,91,109,208,45,6,229,123,108,136,232,218,83,235,198,229,40,234,151,10,246,124,147,95,157], [178,15,143,183,111,46,247,181,206,54,238,209,44,149,152,95,49,166,180,96,117,15,203,100,106,157,165,152,184,243,189,167,66,83,105,23,4,189,75,212,32,199,215,32,29,213,234,138,130,47,121,115,43,253,0,175,128,197,10,212,20,137,97,73,254],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
