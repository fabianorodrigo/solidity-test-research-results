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
    contractERC721MintableComplete = await ERC721MintableComplete.new("r95zk","0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("r95zk","0",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("ge2l74","sq85ic","zovzcfi",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("ge2l74","sq85ic","zovzcfi",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(10,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("[",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("zovzcfi", 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("P", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(21, "ge2l74", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(96, "ERC1820_ACCEPT_MAGIC", "Capstones", 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("[", "nawo6m", 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("i2k8e", "r95zk", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(56, "Capstones", "ge2l74", "ge2l74",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(59, "sq85ic", "P", "r95zk", 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("ge2l74", "ERC1820_ACCEPT_MAGIC", "Transaction successfully verified.", 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("i2k8e", ["\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","L","nawo6m","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(95, "[", ["[","sq85ic","zovzcfi","ge2l74","zovzcfi","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(1, "zovzcfi", ["nawo6m","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","u08v0j","u79yhp","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","ERC1820_ACCEPT_MAGIC","ty4kz7","6tu5rr","u08v0j"], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("i2k8e", ["39qewm","zovzcfi","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","6tu5rr","h33qhw","Transaction successfully verified.","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","i2k8e"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("gt5k2n", ["L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(96, "L", ["ge2l74"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(70, "u79yhp", ["u08v0j"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("39qewm", ["u79yhp"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("u79yhp", ["0","6tu5rr"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(98, "xdah", ["\x19Ethereum Signed Message:\n32","ge2l74"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(101, "u08v0j", ["u79yhp","39qewm"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("mw9pmh", ["6tu5rr","["], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("\x19Ethereum Signed Message:\n32", ["ty4kz7","ERC1820_ACCEPT_MAGIC","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(56, "nawo6m", ["zovzcfi","ERC1820_ACCEPT_MAGIC","6tu5rr"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(33, "mw9pmh", ["6tu5rr","r95zk","i2k8e"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("u08v0j", ["zovzcfi","xdah","h33qhw"], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Transaction successfully verified.", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","0","nawo6m","ty4kz7"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(17, "mw9pmh", ["u79yhp","zovzcfi","ge2l74","u79yhp"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(2014223714, "r95zk", ["gt5k2n","i2k8e","nawo6m","["], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("u08v0j", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","nawo6m","ge2l74","sq85ic"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("nawo6m", ["Capstones","xdah","ERC1820_ACCEPT_MAGIC","i2k8e","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(160, "sq85ic", ["\x19Ethereum Signed Message:\n32","ERC1820_ACCEPT_MAGIC","P","h33qhw","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(19, "L", ["L","0","i2k8e","ge2l74","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("zovzcfi", ["39qewm","6tu5rr","sq85ic","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","gt5k2n"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("5n1vxs", [[104,105,135,110,153,129,59,157,124,20,82,53,40,155,201,146,29,15,149,215,35,12,29,6,103,156,191,52,186,89,115,65],[188,104,100,172,66,131,100,188,67,52,137,37,249,115,226,26,200,254,106,51,237,186,60,54,20,111,173,226,124,47,227,29],[48,249,59,98,239,28,166,187,230,230,210,248,15,196,113,89,246,99,41,65,198,229,214,208,248,4,35,86,0,162,128,75],[85,129,14,2,152,169,240,205,0,253,189,86,231,237,146,111,101,217,159,201,88,19,18,0,63,167,210,95,184,227,79,36],[163,254,132,109,14,46,67,147,251,106,168,55,169,22,113,18,114,233,250,14,101,61,50,117,217,250,158,128,199,123,18,67],[30,47,38,37,238,135,76,4,236,135,39,22,98,136,111,185,27,100,33,134,163,73,184,250,239,12,118,254,241,191,210,209],[177,21,247,214,57,144,159,125,63,167,99,10,146,13,130,118,176,233,225,101,11,223,28,126,23,94,3,11,17,244,144,58],[5,106,208,251,4,239,138,62,193,169,140,107,0,166,148,43,60,28,233,20,93,127,50,253,11,62,234,72,83,240,35,225],[46,46,29,136,128,236,182,72,84,148,133,230,25,31,40,138,210,115,134,85,179,26,80,189,150,170,82,113,254,232,53,21],[193,179,67,52,239,64,248,195,170,250,110,44,90,184,59,114,204,105,119,230,82,132,6,44,246,117,41,221,45,116,3,48]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(1023, "r95zk", [[176,49,4,170,52,19,112,139,132,243,203,240,164,23,186,100,180,224,21,147,116,47,78,107,78,225,43,251,6,105,63,1],[72,240,184,42,96,188,106,119,39,130,108,235,124,37,201,95,6,9,24,109,134,30,155,199,124,128,222,45,89,217,253,140],[12,204,143,64,60,60,209,143,73,176,198,242,201,48,86,162,129,248,41,143,74,162,27,100,234,105,146,69,142,122,138,21],[202,199,110,86,40,229,254,106,246,178,120,119,70,165,45,234,192,72,42,129,32,120,81,21,235,198,164,77,185,56,173,249]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(24, "5n1vxs", [[22,53,141,73,117,38,234,144,116,77,101,130,116,183,184,44,218,192,11,34,175,236,144,235,107,80,177,112,58,36,99,146],[119,42,78,240,52,99,25,237,47,44,179,53,58,35,63,119,5,234,26,101,107,171,33,88,127,213,60,234,21,4,133,118],[109,155,252,253,178,26,241,62,173,166,166,128,166,26,152,99,12,61,222,167,222,237,7,143,43,218,82,39,102,117,96,78],[185,39,155,64,150,105,237,71,168,212,110,30,250,229,253,35,113,35,157,145,238,175,98,63,115,20,62,194,118,163,199,238],[235,44,1,252,143,225,69,242,148,155,191,95,161,88,32,81,149,157,10,128,32,16,237,83,146,188,73,82,164,35,129,237],[112,166,160,52,35,195,172,232,155,154,206,73,19,236,151,99,254,229,194,57,7,73,160,165,67,125,244,112,125,0,40,59],[28,186,230,248,173,81,52,13,126,205,105,65,240,241,108,108,100,95,190,75,31,112,52,110,197,110,10,94,61,38,156,53],[244,148,146,88,166,81,45,103,71,87,49,234,64,88,177,175,253,36,52,52,81,233,141,56,131,45,73,194,217,137,150,50],[233,93,80,68,238,44,16,54,20,187,235,145,161,79,243,130,11,52,36,141,94,152,177,62,46,6,78,33,243,34,55,106]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ge2l74", [[124,149,205,125,24,221,105,120,122,147,220,69,54,69,172,240,107,202,80,190,73,209,69,221,53,39,162,43,205,118,177,251],[132,151,56,71,229,162,8,4,11,13,219,34,110,113,84,239,4,220,113,12,193,85,177,253,81,155,183,105,120,100,41,114],[89,196,202,53,18,62,104,135,85,81,7,71,128,175,202,245,6,40,109,100,195,46,167,22,129,12,46,121,166,73,109,208],[94,18,114,254,160,193,155,55,101,108,131,128,144,240,180,233,36,200,150,208,247,20,134,68,43,254,198,37,206,46,41,148],[54,19,169,179,104,203,2,18,120,130,27,90,177,59,37,141,13,184,60,216,14,8,138,203,247,239,187,218,8,37,21,228],[230,147,99,242,222,243,239,195,168,117,4,162,239,49,169,249,105,217,210,239,82,191,241,253,3,141,207,145,76,233,153,59]], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("6tu5rr", [[50,96,16,200,221,168,137,170,233,69,35,58,169,55,71,246,30,42,115,141,28,62,235,148,22,101,158,70,6,94,179,106]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(28, "zovzcfi", [[63,145,171,63,246,125,231,101,172,145,230,182,179,21,255,133,46,24,86,142,175,211,75,16,35,29,4,14,154,211,179,1]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(27, "r95zk", [[25,14,133,12,178,159,116,35,126,86,233,227,127,172,148,246,28,35,214,34,150,111,14,152,0,120,37,188,35,87,128,130]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("L", [[105,218,83,227,91,63,4,238,239,82,243,230,169,233,86,124,91,150,68,58,32,127,179,157,64,79,231,161,180,163,204,214]], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ty4kz7", [[17,30,113,42,107,59,135,93,209,75,230,236,165,15,125,98,194,189,132,78,226,225,224,105,97,165,251,57,177,40,177,139],[66,23,252,36,65,6,93,121,96,150,101,43,253,196,196,174,144,169,221,155,203,2,66,218,80,115,145,243,248,18,245,190]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(2, "sq85ic", [[85,46,160,245,5,85,37,222,94,198,199,84,77,255,226,4,71,144,63,184,142,217,243,206,184,60,40,204,254,66,110,154],[236,18,141,178,157,68,221,246,88,59,6,86,180,161,239,75,255,122,61,197,82,23,71,48,162,0,64,69,250,254,123,221]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(15, "5n1vxs", [[43,148,104,80,156,162,93,221,247,211,93,23,201,162,113,108,152,206,214,9,5,220,130,131,15,222,127,223,43,213,181,232],[89,135,202,146,86,49,72,94,37,178,190,1,226,22,182,198,110,231,42,135,234,221,122,112,100,149,95,67,33,113,125,4]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("h33qhw", [[244,18,188,30,28,40,126,0,34,37,185,186,18,1,95,174,187,133,83,189,148,115,76,83,128,83,220,195,96,74,52,177],[9,107,121,43,108,193,17,248,191,165,109,7,199,171,143,121,16,8,206,38,105,118,62,224,180,63,107,180,74,82,45,57]], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("nawo6m", [[134,115,44,201,225,121,112,202,177,253,22,45,128,180,35,23,35,176,146,65,216,230,192,50,130,210,76,38,213,247,178,90],[128,11,76,45,231,236,64,45,19,60,111,193,122,124,208,71,238,70,138,27,230,165,185,63,245,18,41,157,229,39,123,156],[135,141,226,106,136,60,68,75,43,52,153,242,124,122,230,49,179,91,197,133,15,123,73,86,156,185,88,188,242,162,127,245]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(11, "P", [[37,252,134,153,247,97,181,116,236,16,32,81,239,18,74,250,253,38,220,128,189,170,131,171,41,249,79,16,89,58,150,119],[0,11,70,150,35,178,118,199,237,218,150,159,113,27,23,211,236,202,201,217,147,229,189,151,240,59,86,211,27,63,249,232],[207,32,158,125,27,249,49,167,150,207,238,89,154,3,101,31,99,142,100,174,60,213,251,23,159,23,181,38,189,134,217,102]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(61, "u08v0j", [[0,229,186,91,42,74,3,184,132,230,13,67,83,226,71,92,7,72,131,230,238,26,63,52,236,119,131,247,168,63,175,128],[134,213,202,235,207,162,162,114,183,221,215,186,91,172,86,11,80,107,99,163,180,243,95,171,203,62,216,247,111,53,252,110],[12,13,133,93,114,241,18,139,63,154,85,233,253,168,215,235,248,236,243,3,17,112,124,186,160,66,144,206,12,195,106,159]], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("gaxkqs", [[253,133,25,123,6,234,228,137,229,251,241,66,141,195,140,6,9,77,231,59,78,230,8,66,205,204,58,176,136,170,42,115],[24,187,172,53,94,208,195,130,59,156,70,95,12,187,94,3,245,75,103,220,1,249,226,148,54,60,188,54,55,9,2,25],[85,116,29,24,143,164,34,71,135,202,179,21,240,254,137,167,119,75,234,182,78,11,39,235,59,122,38,182,204,182,148,18]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("ty4kz7", [[16,131,204,236,188,149,22,98,41,57,34,132,47,192,64,4,167,72,234,45,107,105,111,135,167,8,72,123,221,153,236,238],[255,74,63,201,163,136,33,48,148,47,238,8,132,237,230,208,211,39,119,218,194,239,149,134,69,218,199,109,230,82,230,50],[249,129,69,228,181,107,210,237,111,159,45,110,91,185,90,66,86,72,49,137,230,102,57,96,76,101,237,213,239,71,85,160],[58,153,184,71,180,138,6,208,212,223,64,221,65,74,21,4,119,171,137,216,153,85,90,169,95,80,236,162,242,100,121,253]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(2014223715, "\x19Ethereum Signed Message:\n32", [[74,75,17,11,156,142,55,209,6,255,47,237,237,48,128,170,19,75,58,49,2,166,107,84,183,226,60,88,250,225,224,99],[1,140,81,209,88,60,127,240,225,199,240,217,195,39,189,94,109,143,232,62,196,17,222,215,71,219,221,233,213,83,228,215],[64,253,63,22,233,203,7,195,230,196,201,244,26,124,25,195,166,220,102,89,217,110,161,213,214,8,138,53,5,54,199,48],[206,151,222,63,213,192,224,67,96,128,253,57,107,239,190,161,118,152,86,162,75,115,252,70,94,87,66,254,234,88,48,18]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(88, "6tu5rr", [[62,181,111,23,191,15,175,216,30,211,176,167,48,99,102,240,218,174,254,110,159,135,87,48,15,239,115,163,145,209,31,115],[219,11,14,194,106,213,153,105,162,81,123,0,136,238,132,49,199,244,151,49,157,12,165,64,54,237,66,194,182,22,7,202],[50,162,128,99,43,238,142,10,96,181,244,18,58,79,235,122,54,176,111,197,122,134,200,49,125,45,237,232,231,119,164,1],[111,9,124,205,243,124,239,154,97,231,243,67,249,40,202,67,70,140,253,169,27,186,97,145,7,104,176,64,204,91,126,141]], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("5n1vxs", [[37,74,251,210,142,25,158,250,166,147,3,105,72,232,252,90,251,158,135,228,247,187,127,148,21,204,141,146,114,20,38,238],[200,249,180,65,245,177,3,217,84,34,198,8,215,67,253,184,221,132,7,154,183,36,90,234,138,65,169,241,124,253,102,198],[186,155,184,71,177,18,98,100,0,178,74,218,56,119,226,226,128,62,122,50,72,68,79,184,200,46,103,202,28,143,129,157],[214,4,72,59,247,247,8,191,177,38,142,163,171,191,22,207,98,108,114,184,13,19,39,232,145,110,2,230,183,69,157,103]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ty4kz7", [[161,149,225,34,198,227,161,203,183,161,62,233,16,139,72,60,163,191,110,206,69,155,122,4,197,36,146,15,111,135,44,214],[65,242,94,208,2,215,86,226,207,248,192,62,105,17,93,227,79,85,181,158,127,5,250,74,172,96,238,61,9,143,50,182],[246,31,239,41,63,189,217,229,98,5,112,10,76,89,255,140,139,66,110,99,98,50,93,249,204,30,191,1,221,9,27,135],[60,221,135,61,95,200,229,101,64,150,199,23,244,224,114,184,230,214,123,97,50,188,95,205,223,0,15,62,187,41,97,70],[179,174,98,201,159,113,151,38,167,201,3,47,94,12,228,246,40,91,18,59,108,91,187,231,210,42,46,201,22,17,255,128]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(0, "i2k8e", [[76,53,42,117,168,220,235,77,221,47,243,89,165,77,162,183,158,199,60,211,245,97,123,198,64,76,2,171,148,113,118,79],[31,225,15,38,220,228,100,44,66,242,223,253,206,225,67,214,3,44,8,224,168,183,49,227,132,2,140,212,21,222,157,101],[229,219,24,252,58,129,210,70,97,97,188,173,115,28,198,96,31,118,62,234,58,77,248,244,95,92,37,141,95,25,32,31],[223,102,22,184,97,8,224,38,138,231,12,3,34,156,181,155,111,253,217,31,115,13,113,85,62,227,131,38,89,168,70,89],[56,237,190,210,251,9,118,198,220,214,209,115,101,248,30,44,231,22,82,128,145,254,20,152,123,53,151,157,192,170,32,201]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(30, "ERC1820_ACCEPT_MAGIC", [[230,65,251,94,249,126,102,145,96,127,126,25,192,37,31,174,5,17,37,11,204,7,117,179,244,12,15,71,3,231,119,79],[128,227,111,68,174,185,215,211,205,54,47,230,157,177,105,244,50,234,30,142,191,36,56,253,12,42,30,52,232,31,154,168],[159,43,34,130,153,66,185,156,148,143,108,84,51,102,37,141,85,200,243,160,142,131,214,145,161,88,173,40,204,180,39,180],[140,72,9,92,75,181,70,13,111,19,105,44,234,168,136,202,42,28,74,230,90,126,37,190,236,135,0,14,70,133,60,218],[36,140,179,169,91,46,182,128,186,25,187,188,84,239,142,210,21,94,129,112,46,29,173,103,195,129,250,44,126,146,198,193]], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("\x19Ethereum Signed Message:\n32", [[115,81,57,100,134,245,36,249,109,70,213,84,213,33,180,208,113,242,161,63,187,86,110,91,249,141,219,234,167,144,180,37],[105,252,228,137,227,60,179,183,149,165,105,71,86,158,193,1,154,107,68,230,203,175,131,240,14,68,6,204,105,254,150,64],[86,172,154,157,169,170,237,5,175,186,117,142,236,147,162,232,98,0,137,173,241,122,46,142,188,133,189,57,114,84,44,25],[153,29,2,192,140,219,225,104,0,215,239,114,229,89,131,80,39,162,96,153,91,31,139,143,62,252,183,207,11,27,210,213],[200,199,147,70,45,208,102,214,16,137,209,169,154,34,116,248,168,96,104,249,123,250,85,38,118,2,51,134,134,206,176,73]], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([94],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[7],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(19,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("r95zk", "iso3kl",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("ERC1820_ACCEPT_MAGIC", "sq85ic",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("ERC1820_ACCEPT_MAGIC", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("h33qhw", "u79yhp", "ty4kz7",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("Transaction successfully verified.", "\x19Ethereum Signed Message:\n32", "gaxkqs", "h33qhw",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("u08v0j", "gt5k2n", "u79yhp", "u08v0j", "6tu5rr",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("i2k8e",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("mw9pmh", 102,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("u08v0j", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("gaxkqs",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("P", 22,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("gaxkqs", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(61,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["iso3kl"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[233,214,210,46,72,170,230,150,114,172,23,190,245,229,42,86,101,208,156,168,214,185,85,239,7,166,99,205,56,161,7,107],[28,82,113,155,40,87,250,7,128,23,5,82,252,196,38,232,37,179,67,55,150,110,231,65,110,239,153,8,57,45,155,80]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(87, 18, 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([112,100,196,129,163,232,156,81,79,186,144,213,28,6,154,175,50,76,78,174,177,117,11,226,200,157,214,152,201,153,215,88], [3,168,12,42,229,135,65,236,45,139,135,206,66,242,144,150,31,18,111,95,139,144,16,69,102,215,69,93,16,48,117,16],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([60,140,167,221,226,197,216,154,194,88,226,18,85,98,200,11,61,225,251,73,146,101,16,35,111,237,136,133,19,163,92,92], [1,189,154,194,186,147,2,218,169,236,144,139,172,219,144,86,188,248,24,99,87,210,6,100,226,50,42,118,147,246,202,145], [106,167,234,217,82,210,29,162,102,166,190,255,48,81,234,10,114,44,38,56,201,213,122,1,52,217,187,204,156,33,120,69],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([132,248,206,78,235,200,58,12,72,82,8,138,243,192,239,45,184,219,5,214,167,90,132,208,240,78,239,73,91,113,43,40], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([56,71,29,183,200,155,73,25,78,195,142,140,44,39,229,219,171,22,81,93,63,112,217,86,231,40,138,104,92,184,30,55], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([247,173,36,109,232,77,84,166,140,27,145,156,61,1,16,71,230,79,92,37,249,27,203,207,244,166,94,229,92,87,91,88], "u08v0j", [41,147,178,184,133,111,17,47,150,180,98,152,50,231,245,186,52,209,65,34,35,88,53,78,198,98,134,225,64,26,136,122],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([79,50,0,142,9,212,75,204,192,126,71,139,82,46,142,211,38,193,36,32,160,55,33,31,230,167,230,78,108,138,115,129], "[", [114,8,34,59,165,170,215,82,102,86,139,212,23,122,34,179,16,13,186,43,228,85,185,183,114,115,96,127,110,187,162,214],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([39,76,155,85,141,166,2,121,210,67,49,50,125,114,78,200,16,138,210,222,148,87,130,79,32,206,49,205,49,97,223,193], [134,114,173,35,165,251,82,28,24,53,33,73,223,127,162,151,253,181,34,199,83,89,252,98,242,37,173,149,26,69,196,254], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([39,76,155,85,141,166,2,121,210,67,49,50,125,114,78,200,16,138,210,222,148,87,130,79,32,206,49,205,49,97,223,193], [199,148,11,43,2,245,191,63,140,211,78,62,210,54,106,42,252,92,45,204,243,37,206,246,58,140,81,84,233,169,141,55,102], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([86,12,29,18,205,123,198,247,133,189,171,77,101,218,13,227,101,20,149,249,33,149,179,37,72,117,81,151,204,242,171,51], [23,89,248,3,65,77,87,35,152,130,185,244,144,159,152,102,216,177,71,215,117,180,153,162,124,139,253,253,82,255,125,180], [103,250,240,161,166,251,28,159,22,200,94,175,134,134,40,221,67,178,91,186,115,156,147,197,10,127,90,244,197,115,244,94], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([118,93,185,108,11,24,6,77,121,89,17,10,149,212,41,64,125,237,103,252,133,47,195,181,92,190,147,243,161,59,238,254], [142,184,134,237,140,225,233,196,93,23,106,98,150,178,132,3,203,83,213,35,199,247,105,250,115,152,248,90,61,235,103,179], [145,70,77,186,190,225,31,221,238,97,121,215,123,60,203,56,15,68,73,162,191,193,141,22,232,101,66,252,203,28,131,180], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([26,137,6,18,213,198,20,179,168,250,145,230,27,193,173,1,75,95,221,237,80,90,24,147,60,73,136,146,209,65,21,26], [85,5,125,52,203,66,162,130,38,9,226,209,17,36,120,5,238,22,24,203,37,10,164,251,8,149,97,202,132,126,66,135], [50,218,225,130,163,250,237,173,216,91,45,34,212,169,169,39,204,170,157,65,14,105,190,65,129,210,191,96,85,143,75,252], "xdah",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([50,150,116,91,165,0,221,209,3,193,74,63,22,92,67,41,114,220,33,133,235,174,173,82,198,195,144,98,115,103,152,108], [247,148,66,20,183,105,146,160,143,83,54,54,91,200,114,245,59,80,249,169,113,2,94,42,33,168,80,147,58,61,51,217], [112,55,35,192,241,233,173,19,194,11,91,177,203,75,206,245,251,80,202,187,108,31,143,176,167,38,199,8,6,79,115,73], "6tu5rr",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([241,36,19,229,221,196,127,230,2,205,121,49,52,73,67,48,197,251,228,49,65,65,22,232,31,63,52,80,108,59,51,228], [135,133,116,254,141,77,115,129,47,190,180,5,80,215,241,69,237,127,197,222,235,157,49,40,93,157,178,99,38,254,109,137], [180,248,205,173,92,208,18,179,16,231,220,40,116,250,167,234,73,183,169,81,13,182,177,187,22,229,131,233,160,127,125,247], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([69,92,47,233,68,88,171,66,65,232,5,170,241,247,177,6,126,47,226,187,150,79,65,8,247,188,241,222,201,190,75,146], [142,38,44,74,125,1,27,104,185,168,241,107,45,18,169,43,211,67,107,141,142,124,229,189,192,87,27,90,79,95,10,16], [26,221,18,189,123,227,185,137,193,139,255,7,27,49,93,99,141,43,221,188,185,225,220,107,135,247,121,92,73,163,213,206], "r95zk",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([28,196,197,170,198,32,9,213,77,38,192,161,201,67,232,92,87,101,14,228,43,4,204,199,137,192,12,190,8,63,48,204], [8,255,58,54,163,177,200,116,178,253,197,129,36,153,240,220,60,130,78,242,119,22,23,190,173,163,43,140,62,232,236,54], [68,110,63,63,50,159,139,128,254,255,235,107,43,34,176,199,99,130,119,83,53,201,102,41,241,154,141,255,230,55,47,79], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([0,170,177,170,244,137,92,237,201,190,251,84,115,36,93,91,177,47,113,87,61,156,38,170,70,95,87,2,228,185,188,150], [84,82,102,212,190,233,92,31,206,145,37,83,83,100,113,7,168,114,102,67,74,96,90,161,231,136,58,207,99,92,5,198], [99,214,62,227,172,169,191,6,119,23,225,74,9,160,211,88,148,11,1,210,39,47,44,112,207,246,102,157,196,208,140,146], "xdah",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([110,145,2,252,167,146,128,148,5,24,222,245,254,95,32,218,79,147,241,62,15,232,140,75,45,75,119,125,57,11,196,248], 21, 97, [218,102,4,86,21,206,47,47,40,173,252,110,109,96,153,44,206,181,197,167,252,185,183,47,180,59,180,210,9,63,128,9], 2,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([188,81,123,134,100,166,93,244,60,119,207,119,142,229,142,67,48,197,165,19,46,112,231,3,4,222,253,74,171,90,130,211], 16, [145,82,177,222,167,25,193,162,56,119,52,209,197,71,116,40,152,199,11,229,99,88,229,249,151,67,143,125,30,122,1,112], [156,206,247,210,250,74,125,128,127,108,55,216,200,189,162,155,40,37,55,200,109,252,102,171,117,158,139,103,99,184,176,254],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([75,248,169,36,11,209,231,78,177,162,71,142,129,120,129,229,139,220,235,76,0,154,236,126,98,32,173,208,164,202,176,243], [],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([167,124,124,237,100,20,70,141,19,84,88,218,27,122,123,139,117,212,86,96,165,71,6,103,20,249,229,235,211,10,172,194], [178,90,130,19,225,57,88,245,39,55,104,175,249,179,251,28,189,23,142,154,124,82,140,56,230,198,76,39,130,29,13,208,151,135,41,116,2,37,238,162,196,107,126,163,65,197,144,0,148,229,254,179,139,241,253,99,139,33,31,142,44,207,19,136,210],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
