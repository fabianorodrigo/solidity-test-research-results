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
    contractERC721MintableComplete = await ERC721MintableComplete.new("P","P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721MintableComplete.new("P","P",{from:accounts[0]}');
    ERC721Metadata.link("Address",contractAddress.address);
     ERC721Metadata.link("Counters",contractCounters.address);
     ERC721Metadata.link("SafeMath",contractSafeMath.address);
     ERC721Metadata.link("Buffer",contractBuffer.address);
     ERC721Metadata.link("CBOR",contractCBOR.address);
    contractERC721Metadata = await ERC721Metadata.new("Capstones","Transaction successfully verified.","L",{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC721Metadata.new("Capstones","Transaction successfully verified.","L",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(48,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("tmj0mc",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("P",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("tmj0mc", 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("\x19Ethereum Signed Message:\n32", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(27, "tmj0mc", "[",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(26, "Capstones", "oklek", 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("[", "tmj0mc", 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("ERC1820_ACCEPT_MAGIC", "Transaction successfully verified.", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(32, "oklek", "L", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(10, "P", "vwxuc", "[", 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("[", "[", "[", 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("[", ["tmj0mc","fzaykd","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(25, "Transaction successfully verified.", ["P","Capstones","0","Capstones","P","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","Capstones","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(48, "Capstones", ["vwxuc","0azm4n","ERC1820_ACCEPT_MAGIC","0","tmj0mc","P","fzaykd","https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("l6givg", ["Transaction successfully verified.","L","oklek","fzaykd","0","kesa3b","fzaykd","vwxuc"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("tmj0mc", ["Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(11, "Transaction successfully verified.", ["l6givg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(58, "0", ["tmj0mc"], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Transaction successfully verified.", ["L"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("oklek", ["l6givg","ERC1820_ACCEPT_MAGIC"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(102, "\x19Ethereum Signed Message:\n32", ["fzaykd","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(59, "0", ["[","fzaykd"], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("kesa3b", ["Transaction successfully verified.","tmj0mc"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("oklek", ["l6givg","l6givg","tmj0mc"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1532892064, "ERC1820_ACCEPT_MAGIC", ["0azm4n","38ksx","rp889"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(54, "vwxuc", ["oklek","olfiwg","l6givg"], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("P", ["l6givg","kesa3b","Transaction successfully verified."], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("ERC1820_ACCEPT_MAGIC", ["fzaykd","rp889","P","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(7, "Capstones", ["oklek","0azm4n","z5hr64","rp889"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(95, "vwxuc", ["L","kesa3b","vwxuc","Transaction successfully verified."], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("38ksx", ["tmj0mc","L","P","["], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("oklek", ["kesa3b","nlek8c","[","dmtnn","Transaction successfully verified."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(2, "l6givg", ["tmj0mc","Capstones","vwxuc","ERC1820_ACCEPT_MAGIC","Capstones"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(1024, "P", ["https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/","L","0","38ksx","0azm4n"], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("Capstones", ["rp889","38ksx","rp889","gf66p","nlek8c"], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("fzaykd", [[241,115,220,132,253,247,94,41,246,107,164,243,191,106,47,254,113,197,217,45,187,178,225,33,34,72,208,172,163,19,120,128],[95,17,196,215,83,218,162,2,103,3,115,42,250,233,138,33,217,67,236,50,164,226,47,244,167,41,98,70,146,99,25,253],[219,12,54,87,181,78,49,27,215,236,40,51,236,221,220,41,1,25,199,131,97,111,86,188,227,144,41,136,247,63,241,157],[189,105,61,127,72,65,220,11,104,2,188,235,213,138,165,100,100,103,183,215,173,152,58,139,212,113,62,187,11,148,40,29],[64,117,160,40,61,139,58,136,55,99,219,155,243,177,121,140,139,122,143,74,170,98,157,59,238,153,114,128,158,86,76,129],[53,24,113,201,68,219,131,182,121,238,54,215,246,218,32,125,201,144,104,49,73,25,155,118,24,184,53,125,3,160,124,155],[105,95,60,38,153,135,153,248,145,234,118,121,28,194,14,169,133,244,16,45,20,226,77,11,9,128,75,53,154,53,104,25],[172,65,21,63,238,92,232,235,1,236,20,195,39,26,158,68,254,254,151,67,210,77,240,218,30,105,134,215,60,85,228,95]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(2014223716, "olfiwg", [[205,16,41,42,207,171,62,141,27,185,169,255,101,180,88,219,31,37,35,207,71,179,147,144,160,163,66,83,42,76,47,68],[95,202,193,67,27,250,94,95,169,97,128,39,9,203,113,78,237,242,138,85,248,147,251,24,116,22,115,221,82,192,1,3],[141,122,132,138,16,148,159,161,144,154,98,7,93,128,254,127,120,140,103,76,167,202,195,100,88,112,119,44,98,193,18,114],[192,251,56,253,42,125,177,254,153,185,223,139,1,83,94,123,184,245,198,107,163,247,151,220,89,190,136,233,42,209,156,105],[102,124,201,94,155,50,120,72,24,194,212,29,16,196,58,55,35,232,23,203,255,190,148,106,53,0,21,85,116,94,54,52],[6,214,31,16,225,145,51,97,172,87,108,255,206,187,31,195,153,115,209,91,28,7,55,135,168,202,215,77,193,189,193,67]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(56, "P", [[3,224,19,169,199,250,91,162,6,149,229,229,162,62,115,180,193,69,44,244,178,119,167,115,193,131,242,80,69,179,236,135],[30,198,235,199,28,149,100,19,88,136,22,106,170,213,188,138,34,74,46,83,61,26,98,171,235,208,79,117,20,190,12,78],[251,209,88,168,112,85,213,159,130,241,44,38,53,140,142,64,106,187,81,32,195,60,165,228,44,157,171,199,116,147,135,82],[171,91,76,120,116,186,14,163,228,132,3,12,109,132,150,218,106,42,64,185,125,194,84,148,184,61,65,99,203,66,154,254],[75,115,165,177,148,119,195,124,221,37,17,165,237,123,63,29,56,149,27,197,217,254,81,72,38,80,35,15,89,220,243,28],[40,139,151,141,113,86,250,249,46,148,41,179,36,79,39,158,76,210,124,43,199,161,215,255,16,110,233,214,16,22,118,188],[115,90,163,50,59,217,97,41,94,133,208,66,196,49,149,161,24,64,110,139,26,229,29,130,246,17,161,1,214,122,235,204],[167,196,235,2,93,139,211,24,162,21,15,45,124,11,188,48,141,245,188,83,247,209,191,179,8,84,75,171,72,70,148,7],[36,107,30,101,7,254,158,18,46,112,90,130,80,211,189,242,52,2,99,123,113,113,87,81,87,99,131,217,98,24,223,156]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ERC1820_ACCEPT_MAGIC", [[161,200,24,154,223,66,100,122,186,194,84,225,192,149,243,205,138,208,142,63,76,143,121,25,141,255,137,246,252,185,5,64],[156,168,22,228,190,134,196,181,117,137,251,255,22,164,99,142,90,233,88,215,18,63,233,183,178,93,154,207,85,87,171,149],[197,166,88,192,157,178,186,247,163,148,22,230,19,193,244,78,35,194,96,216,130,37,172,116,56,160,67,184,22,246,37,218],[235,57,156,229,194,10,123,68,226,34,72,63,22,103,26,208,0,43,192,238,167,198,254,42,230,126,2,32,223,237,140,14],[56,102,167,194,40,246,133,45,189,75,236,177,156,180,82,53,198,31,212,150,137,241,78,23,226,200,197,150,112,192,218,247],[226,250,23,194,112,96,193,24,180,66,231,6,45,0,223,183,229,13,37,84,189,162,134,101,30,97,226,236,37,127,110,207],[39,164,208,22,125,187,161,84,104,167,32,238,149,44,2,81,217,9,209,247,139,47,98,170,52,68,157,5,154,233,229,37],[198,253,115,218,139,62,19,70,134,104,197,21,85,180,93,18,132,103,2,244,73,31,177,42,164,198,220,193,186,45,8,112],[23,235,223,131,122,10,150,195,116,128,57,224,78,132,30,146,87,25,43,170,131,159,190,250,46,10,203,184,136,174,5,239],[142,140,138,212,27,100,110,205,9,72,84,212,88,56,60,173,76,83,43,182,191,46,76,137,233,9,20,130,77,159,215,130]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("0azm4n", [[147,135,207,95,66,205,64,253,89,114,119,178,18,28,11,242,51,99,171,208,60,3,40,210,205,177,207,228,150,78,142,20]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(66, "0", [[180,121,51,45,120,144,90,149,83,43,156,182,205,94,181,179,122,21,184,237,27,106,209,131,170,241,209,166,128,119,63,46]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(19, "Capstones", [[194,32,179,189,237,1,55,141,21,16,116,186,45,121,119,3,171,199,179,209,65,88,116,167,68,2,68,100,185,75,41,44]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("kesa3b", [[39,0,108,150,127,41,253,32,57,36,79,125,1,51,204,0,171,75,160,137,156,128,60,222,178,146,245,107,170,48,177,217]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ERC1820_ACCEPT_MAGIC", [[145,57,158,141,222,81,57,109,206,34,163,114,166,89,24,127,1,140,15,28,148,109,203,63,18,6,198,19,187,190,53,22],[152,138,153,165,207,177,127,28,91,114,227,104,146,214,21,22,123,240,246,200,225,74,97,133,117,60,184,10,225,159,236,38]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(27, "P", [[62,113,105,18,220,240,226,66,122,81,211,216,251,50,142,220,30,247,137,206,69,166,102,15,222,189,181,218,99,248,212,187],[146,167,209,64,195,220,103,83,143,39,182,22,24,1,199,24,247,36,201,187,150,121,229,164,150,229,108,74,116,99,240,238]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(129, "nlek8c", [[35,4,191,64,85,42,139,230,76,249,11,225,0,77,184,17,73,210,213,109,104,117,212,119,109,8,4,142,223,19,72,110],[184,101,81,115,48,45,216,85,222,74,114,32,168,99,158,230,44,192,152,108,174,34,21,133,86,30,51,254,168,193,29,10]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("tmj0mc", [[24,2,230,207,177,59,3,108,157,200,186,132,73,144,160,177,108,192,160,172,150,64,98,255,71,47,234,106,182,255,247,159],[69,207,103,50,120,141,237,177,107,221,21,140,88,68,42,91,27,18,202,116,89,0,219,58,161,140,151,32,111,191,62,191]], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("0", [[9,12,110,48,38,174,42,238,241,16,149,138,10,14,70,224,157,163,131,194,200,174,157,203,204,233,233,217,240,176,198,98],[236,118,110,220,217,249,138,184,168,209,125,8,64,18,169,205,48,36,75,56,192,95,232,106,198,111,154,147,20,204,18,196],[4,101,22,25,47,200,234,7,74,117,5,209,121,20,253,41,7,225,254,156,192,240,229,201,105,147,41,28,158,157,7,156]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(17, "olfiwg", [[229,28,119,127,78,9,231,125,176,39,245,193,1,0,126,59,72,203,32,121,121,193,240,168,100,173,194,74,22,152,153,23],[237,214,234,151,13,57,193,114,223,13,70,26,211,142,204,73,122,167,65,38,210,53,0,119,57,194,47,29,62,45,205,245],[194,159,122,21,119,124,210,129,244,255,143,101,117,231,102,134,188,6,186,230,123,160,215,243,85,235,235,84,143,32,210,55]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(98, "rp889", [[98,204,224,120,137,7,132,4,114,56,174,64,150,216,171,234,64,48,253,96,18,92,3,227,38,246,242,69,16,254,173,229],[55,113,229,59,244,119,75,96,74,19,227,31,129,167,174,13,215,39,14,155,94,5,77,173,204,248,101,74,36,225,197,119],[53,147,39,136,123,201,47,163,204,72,61,187,50,141,151,19,56,142,117,168,127,36,148,127,117,193,196,207,107,123,40,212]], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("38ksx", [[46,58,119,223,180,45,144,87,131,245,168,20,248,110,157,226,48,214,186,189,247,38,59,135,96,17,96,139,220,1,132,199],[194,98,227,111,174,166,63,38,104,178,66,45,56,0,21,174,92,65,10,166,187,146,11,168,234,183,116,101,126,10,42,210],[241,129,194,163,49,160,249,108,13,173,158,168,73,108,83,49,67,117,42,177,13,118,99,83,33,99,119,29,28,172,201,39]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("\x19Ethereum Signed Message:\n32", [[64,113,26,125,204,221,9,236,189,99,22,97,131,148,107,113,99,93,202,221,160,6,235,65,197,58,202,128,152,235,49,176],[158,147,24,158,223,68,246,87,232,137,211,63,35,229,88,29,176,42,80,196,52,150,168,206,95,130,12,121,68,4,116,120],[58,174,116,20,29,211,218,34,244,248,65,175,252,177,249,61,194,76,165,219,182,168,198,142,28,105,197,184,218,200,85,231],[223,103,178,171,98,227,129,168,204,227,65,212,159,234,148,202,188,182,167,118,197,82,25,43,231,229,70,165,211,174,30,223]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(129, "fzaykd", [[172,226,128,94,246,168,31,222,138,104,81,210,50,222,250,105,200,216,64,23,231,211,178,222,168,34,36,50,22,92,230,72],[212,129,24,109,229,212,185,242,169,35,18,253,82,177,14,117,169,25,100,7,17,25,202,171,246,186,142,16,61,157,72,204],[20,15,150,15,159,90,88,83,201,246,148,211,114,81,14,253,136,53,237,69,1,119,108,110,77,11,183,19,67,115,214,109],[89,27,204,97,127,151,187,116,32,104,138,246,218,3,177,198,204,127,56,226,35,210,209,62,47,92,156,249,16,78,89,166]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(19, "ERC1820_ACCEPT_MAGIC", [[140,217,59,225,66,61,218,132,52,212,238,162,94,112,84,53,173,28,253,171,229,200,34,235,126,146,70,132,192,51,191,215],[96,79,118,231,75,65,52,75,247,126,108,16,42,222,78,218,102,89,209,246,21,246,134,242,66,212,188,40,67,229,238,58],[175,156,102,217,162,60,207,86,181,218,243,146,240,60,34,174,242,26,210,179,17,196,180,122,38,166,160,152,154,240,63,229],[45,81,135,6,63,11,191,218,36,32,136,153,194,24,155,180,67,81,208,3,125,177,136,51,76,5,110,68,75,34,170,37]], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("0", [[152,37,224,58,120,229,208,39,134,252,253,56,9,22,15,26,223,250,103,208,245,107,141,25,120,117,237,19,58,34,8,32],[25,88,184,183,53,246,158,62,62,88,160,142,8,247,62,151,174,111,178,58,113,243,174,121,97,110,120,108,23,175,136,68],[224,65,177,91,168,51,150,85,14,189,59,221,106,255,49,243,112,170,29,31,240,133,47,139,47,103,194,199,199,88,66,156],[10,224,243,146,196,81,5,23,97,248,213,118,166,179,46,183,215,131,120,26,0,252,206,63,233,91,3,174,48,165,114,53]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("tmj0mc", [[47,234,94,90,70,195,54,60,104,190,84,153,31,80,155,172,40,79,253,134,165,25,186,177,38,16,114,53,116,117,102,236],[114,176,3,178,60,121,195,173,108,184,215,151,54,165,252,217,241,181,210,183,229,135,24,15,174,49,233,235,237,183,151,20],[186,205,35,168,212,101,226,100,187,128,209,118,89,103,99,7,78,105,248,173,88,146,105,235,131,51,221,72,21,34,240,222],[162,244,97,228,220,140,218,252,37,255,42,138,235,205,183,76,29,73,72,61,145,200,166,153,217,233,61,68,93,31,69,147],[184,13,25,116,227,16,219,80,31,204,24,205,238,0,201,74,171,141,33,91,15,250,66,66,20,28,180,190,130,118,61,144]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(54, "fzaykd", [[69,33,202,53,250,87,61,207,208,222,62,176,168,110,168,225,238,21,231,40,80,142,84,175,221,160,51,207,230,36,15,250],[37,238,68,77,191,77,103,5,43,217,120,175,145,247,194,249,70,149,217,51,177,17,4,201,132,148,206,209,126,206,76,151],[140,182,84,48,111,0,64,246,149,193,150,165,23,113,4,188,0,189,52,234,70,238,155,180,227,42,142,242,13,67,162,252],[167,139,126,147,127,65,25,90,32,124,114,168,49,224,134,43,82,222,218,228,98,12,107,4,84,72,221,247,226,128,29,231],[95,108,23,53,26,8,54,127,72,124,74,106,16,163,211,153,241,35,108,183,241,85,104,60,40,174,9,79,130,21,10,129]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(58, "\x19Ethereum Signed Message:\n32", [[66,173,188,234,65,53,43,173,205,135,52,245,250,37,241,16,38,0,171,134,79,102,192,230,6,153,145,245,228,11,129,169],[40,231,152,113,223,197,67,134,123,103,187,70,96,28,193,168,16,128,95,100,153,38,200,158,90,122,155,210,152,63,21,205],[40,215,56,60,110,226,139,160,179,46,72,100,42,23,39,85,148,228,129,10,68,240,151,43,167,73,12,154,175,248,5,9],[167,221,137,119,82,139,190,225,1,131,139,63,209,95,98,72,11,151,195,243,141,131,141,212,93,138,223,167,223,145,222,212],[106,99,226,172,25,80,223,210,170,179,186,14,183,155,136,32,70,180,101,173,179,39,237,9,95,64,10,227,158,141,218,135]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("ERC1820_ACCEPT_MAGIC", [[90,251,22,45,253,6,207,185,86,223,91,144,204,192,211,196,235,169,233,195,175,199,77,43,17,251,124,225,209,168,243,230],[157,43,189,246,192,28,137,223,226,172,151,19,155,117,163,158,235,66,165,15,162,204,3,46,238,53,205,61,190,154,73,183],[64,66,19,248,217,155,148,180,100,34,83,103,23,192,75,240,231,230,101,100,4,90,91,32,245,91,110,53,235,177,129,8],[34,176,204,106,93,162,97,172,231,222,180,202,35,167,74,33,240,177,210,23,204,31,153,196,220,85,186,29,36,106,0,162],[230,161,252,43,67,61,197,137,219,60,132,209,148,251,100,45,73,86,219,191,95,112,106,149,220,39,18,192,247,225,167,138]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([123],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[0],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("gf66p",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("vwxuc", "oklek",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("fzaykd", "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("gf66p", "z5hr64",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("[", "nlek8c", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("P", "0azm4n", "gf66p", "Capstones",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("z5hr64", "P", "\x19Ethereum Signed Message:\n32", "oklek", "tmj0mc",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("olfiwg",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("38ksx", 8,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("kesa3b", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("rp889",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("oklek", 30,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ERC1820_ACCEPT_MAGIC", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(59,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["tmj0mc","[","\x19Ethereum Signed Message:\n32","L","gf66p","fzaykd","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[9,214,22,155,7,171,107,44,63,130,66,95,84,244,46,158,228,179,206,35,160,98,220,252,143,148,239,25,99,46,118,208],[144,117,113,64,149,196,174,75,148,60,135,164,142,195,34,57,104,236,75,247,19,112,3,145,5,151,117,156,169,30,111,24],[137,120,102,167,54,29,223,10,49,3,113,19,25,26,35,31,223,112,21,207,255,99,218,210,105,112,204,192,5,50,243,5],[67,76,48,220,151,218,13,24,178,211,197,96,162,113,128,68,68,225,52,50,46,35,143,167,109,110,128,77,202,166,1,5],[176,62,114,251,110,217,30,134,207,22,254,214,4,118,138,51,185,247,46,117,182,105,30,68,74,122,68,123,197,85,216,229],[245,50,177,49,49,163,113,242,52,245,218,121,75,178,13,17,33,215,47,96,251,30,31,241,221,179,5,237,242,21,113,18],[175,82,159,50,236,16,74,109,144,94,89,143,44,245,234,222,254,188,53,253,70,44,199,220,186,67,170,112,201,98,55,52],[111,56,179,80,70,127,104,33,0,43,17,171,9,91,127,83,42,239,38,112,0,81,209,198,236,151,221,254,22,216,23,249],[162,153,238,48,184,251,60,51,201,115,145,173,139,17,14,110,101,210,14,177,24,0,62,163,15,190,14,179,63,86,68,32],[129,160,21,95,190,51,47,33,188,158,64,229,197,109,99,28,183,146,255,46,182,99,123,250,246,215,50,73,37,47,163,187]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(48, 256, 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([126,152,191,90,180,40,10,99,38,84,150,0,76,180,72,10,38,162,193,25,184,168,13,137,58,77,196,135,224,65,191,118], [11,177,213,146,92,213,122,243,112,239,3,29,52,182,146,85,166,56,4,192,220,37,82,150,253,184,252,5,89,180,250,253],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([32,85,98,4,133,178,217,137,112,137,195,255,147,206,40,78,93,184,172,36,246,110,233,197,192,15,131,4,29,25,234,40], [157,126,170,4,157,39,71,122,177,149,108,190,91,108,245,190,160,206,76,107,162,40,15,223,47,75,20,148,122,97,240,9], [136,179,196,245,87,1,153,97,234,101,93,104,227,160,120,166,202,66,68,223,245,121,36,201,19,48,208,12,167,153,100,92],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([161,253,166,223,195,97,226,185,70,73,85,150,58,110,8,105,38,89,38,128,220,117,48,255,171,129,15,231,159,68,126,244], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([121,37,155,158,246,65,237,29,250,54,160,128,196,224,65,24,202,231,97,71,78,17,102,172,140,162,199,194,178,2,90,163], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([100,156,49,213,36,32,33,27,241,69,106,84,247,221,235,183,221,248,65,33,3,243,93,128,46,202,221,112,51,210,78,135], "dmtnn", [239,63,231,32,151,186,224,213,47,22,30,100,2,22,114,11,120,219,168,226,194,240,22,3,168,88,197,56,109,130,226,208],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([24,175,249,146,203,81,208,43,55,234,248,74,96,185,95,7,93,196,224,204,242,52,22,49,59,195,106,89,53,20,24,7], "0azm4n", [204,243,40,78,51,7,82,246,144,131,174,183,165,27,52,134,163,211,179,210,229,42,71,208,103,184,199,35,95,206,90,72],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([185,57,177,144,99,245,77,220,197,211,71,227,87,177,240,110,65,50,165,157,243,175,107,118,67,117,111,210,37,49,133,199], [50,146,72,45,17,139,52,170,10,188,105,198,116,44,111,40,13,217,20,41,237,126,141,5,228,218,219,5,110,127,241,108], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([185,57,177,144,99,245,77,220,197,211,71,227,87,177,240,110,65,50,165,157,243,175,107,118,67,117,111,210,37,49,133,199], [3,146,7,197,144,136,111,9,6,216,33,112,88,57,91,75,95,197,175,100,128,224,105,87,48,35,126,74,232,159,125,248,156], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([175,238,3,239,203,126,49,99,223,174,155,107,220,128,149,81,179,71,115,191,57,189,193,214,205,64,175,116,55,229,70,56], [242,228,178,111,112,140,166,130,105,209,223,127,218,33,135,236,51,5,171,242,76,251,223,186,14,101,116,106,119,5,97,141], [156,189,136,235,241,93,225,14,194,43,170,195,122,94,91,99,206,160,220,41,162,252,166,112,43,194,64,160,134,49,86,154], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([152,48,191,241,62,48,130,89,158,90,5,137,196,195,182,17,97,102,180,145,34,117,140,12,212,59,231,4,237,73,52,189], [110,232,30,130,98,141,247,79,248,193,182,104,77,254,176,223,158,38,52,255,250,203,94,21,60,142,151,145,171,66,94,163], [237,74,106,222,19,97,55,213,46,86,218,66,146,130,84,190,57,110,56,61,222,156,133,233,98,86,27,151,121,109,104,51], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([173,183,224,2,200,130,211,70,243,121,133,69,5,33,219,125,222,7,130,98,128,77,6,139,103,143,194,203,227,107,201,35], [147,126,42,255,236,192,72,88,100,129,5,194,118,209,145,168,253,220,151,207,166,184,247,8,139,250,228,31,80,234,88,202], [36,80,70,99,233,146,248,138,194,98,152,42,204,77,138,138,21,61,193,106,155,44,14,115,93,193,109,138,66,176,196,66], "262huj",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([47,186,159,118,243,20,44,54,253,216,195,123,124,155,36,228,153,24,1,239,140,87,218,193,51,126,18,153,186,118,52,33], [5,31,29,135,96,199,36,27,70,222,168,13,6,14,17,19,231,197,120,107,101,12,64,121,201,85,235,189,205,250,190,57], [116,48,156,3,66,17,64,229,13,25,68,56,51,207,61,98,62,116,33,49,152,109,35,188,250,9,184,80,2,12,191,108], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([137,237,102,147,96,128,154,121,230,133,4,6,50,145,105,123,183,176,89,128,18,106,183,107,53,39,192,241,211,119,21,147], [225,152,250,130,220,86,251,47,17,182,28,237,252,251,49,202,148,209,190,57,238,171,174,13,55,37,169,94,36,42,62,209], [206,202,13,33,86,11,181,130,180,177,25,43,250,72,100,178,139,243,232,91,10,109,31,73,242,29,86,10,26,143,56,153], "tmj0mc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([120,71,35,50,228,32,254,215,251,236,209,108,26,191,73,77,205,138,20,22,103,208,87,235,152,175,179,132,213,248,90,104], [204,14,81,68,166,102,185,204,202,200,182,88,208,6,47,120,194,148,112,147,14,213,192,92,194,79,135,30,11,8,82,243], [140,132,2,194,243,214,208,245,2,218,127,217,228,33,169,37,232,60,61,189,164,164,130,129,226,122,93,168,249,201,201,47], "0azm4n",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([220,164,134,158,156,22,153,95,81,59,187,170,10,154,140,93,196,85,38,10,34,137,16,182,127,179,41,89,38,240,168,72], [75,84,101,91,192,87,69,230,52,84,156,151,167,252,93,10,62,111,237,249,93,247,18,38,174,54,191,191,213,192,169,122], [83,215,44,9,97,153,86,37,47,39,20,243,104,204,12,36,233,225,8,225,96,146,196,191,230,164,116,103,149,187,191,48], "Transaction successfully verified.",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([2,83,12,88,120,106,108,3,228,146,233,37,201,97,173,35,112,72,175,161,9,105,123,225,37,207,26,227,104,110,212,129], [14,102,181,125,81,150,130,46,169,102,91,183,91,143,177,187,58,226,126,78,234,1,145,106,129,151,185,68,61,223,41,121], [50,66,180,164,65,186,170,241,11,142,215,205,244,187,66,250,77,32,22,179,84,199,20,124,229,168,134,25,192,115,71,48], "olfiwg",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([145,10,249,3,41,241,125,100,113,84,224,99,101,143,35,71,188,50,3,43,130,26,174,201,102,33,149,207,26,130,250,138], 58, 16, [239,180,138,76,98,97,79,35,172,204,137,92,221,134,159,211,159,161,181,118,63,198,234,89,224,122,168,212,177,47,88,25], 69,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([123,67,187,199,88,91,43,69,146,39,160,134,195,186,206,232,101,242,177,123,87,19,195,134,131,150,102,94,86,124,58,165], 55, [100,207,169,71,238,176,11,213,6,81,110,207,214,214,17,147,16,174,182,247,121,249,222,132,250,0,183,33,167,196,157,2], [185,85,74,104,41,3,240,205,120,28,207,46,167,240,16,165,248,242,139,23,126,112,203,139,108,140,151,182,113,7,135,225],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([73,146,57,186,115,247,161,65,245,150,2,73,220,69,4,3,188,224,155,223,30,191,72,159,231,59,105,254,60,28,85,189], [53,146,237,20,5,10,170,184,15,252,66,71,91,61,128,3,191,47,200,110,230,9,178,222,224,225,72,189,197,45,52,183,40,232,211,189,65,174,56,83,98,116,164,125,56,61,40,188,58,254,48,232,142,7,118,116,171,149,10,36,43,92,254,203,133,14],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([231,209,175,133,105,20,92,75,60,106,19,140,14,168,228,28,106,220,91,4,176,222,181,207,33,70,180,218,142,7,110,75], [243,173,106,242,55,29,146,89,22,237,115,223,38,176,217,35,150,105,149,11,207,173,44,61,238,199,206,32,151,156,110,139,159,18,91,89,121,139,139,119,70,40,30,149,55,190,164,156,128,33,109,35,252,247,3,143,62,87,77,155,34,246,36,229,240],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
