const truffleAssert = require('truffle-assertions');
const Address = artifacts.require("Address");
const EternalStorage = artifacts.require("EternalStorage");
const ETHPriceTicker = artifacts.require("ETHPriceTicker");
const Mortal = artifacts.require("Mortal");
const Buffer = artifacts.require("Buffer");
const CBOR = artifacts.require("CBOR");
const usingOraclize = artifacts.require("usingOraclize");
const Pausable = artifacts.require("Pausable");
const Proxy = artifacts.require("Proxy");
const Proxyable = artifacts.require("Proxyable");
const SafeDecimalMath = artifacts.require("SafeDecimalMath");
const ShartCoin = artifacts.require("ShartCoin");
const State = artifacts.require("State");
const PublicSafeDecimalMath = artifacts.require("PublicSafeDecimalMath");
const TokenExchange = artifacts.require("TokenExchange");
const TokenExchangeState = artifacts.require("TokenExchangeState");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20.sol");
const ERC20Detailed = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol");
const ProxyAddress = artifacts.require("ProxyAddress");
const ProxyBuffer = artifacts.require("ProxyBuffer");
const ProxyCBOR = artifacts.require("ProxyCBOR");
const ProxySafeDecimalMath = artifacts.require("ProxySafeDecimalMath");
const ProxyusingOraclize = artifacts.require("ProxyusingOraclize");

contract("contractProxyusingOraclize",(accounts)=>{
    let contractProxyusingOraclize = null;
  let trace = false;
  let contractSafeMath = null;
  let contractERC20 = null;
  let contractERC20Detailed = null;
  let contractAddress = null;
  let contractBuffer = null;
  let contractCBOR = null;
  let contractSafeDecimalMath = null;
  let contractPublicSafeDecimalMath = null;
  let contractusingOraclize = null;
  let contractEternalStorage = null;
  let contractPausable = null;
  let contractShartCoin = null;
  let contractState = null;
  let contractProxy = null;
  let contractETHPriceTicker = null;
  let contractTokenExchangeState = null;
  let contractMortal = null;
  let contractProxyable = null;
  let contractTokenExchange = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractAddress = await Address.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Address.new({from: accounts[0]}');
    contractBuffer = await Buffer.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Buffer.new({from: accounts[0]}');
    contractCBOR = await CBOR.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: CBOR.new({from: accounts[0]}');
    contractSafeDecimalMath = await SafeDecimalMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeDecimalMath.new({from: accounts[0]}');
    PublicSafeDecimalMath.link("SafeDecimalMath",contractSafeDecimalMath.address);
    contractPublicSafeDecimalMath = await PublicSafeDecimalMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: PublicSafeDecimalMath.new({from: accounts[0]}');
    contractusingOraclize = await usingOraclize.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: usingOraclize.new({from: accounts[0]}');
    contractPausable = await Pausable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Pausable.new({from:accounts[0]}');
    contractShartCoin = await ShartCoin.new({from:accounts[2]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[2]}');
    contractState = await State.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[2],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[8],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[2],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"updateEthPrice called",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"updateEthPrice called",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(95,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("RevertWithReason",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("41xhfk", 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("0", "41xhfk",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(10000, "listingID arg", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(58, "IsLibrary", "41xhfk", 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "0", 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Oraclize query was sent, standing by for the answer...", "IsLibrary", "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(162, "costUSD", "PayableExample", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(64, "", "41xhfk", "Oraclize query was sent, standing by for the answer...", 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("UsesExample", "RevertWithReason", "Example", 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("", ["call updateEthPrice","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Example","0","updateEthPrice called","costUSD","IsLibrary","costUSD","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1025, "\x19Ethereum Signed Message:\n32", ["IsLibrary","ETH","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(70, "", ["updateEthPrice called","41xhfk","listingID arg","P","409m2i","0","call updateEthPrice"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("P", ["P","RevertWithReason","Example","call updateEthPrice","updateEthPrice called"], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("IsLibrary", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(6, "0", ["P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1025, "IsLibrary", ["RevertWithReason"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("0", ["costUSD"], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("jt0fyr", ["RevertWithReason","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(66, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["L","qgz88c"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(129, "fmakip", ["\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32"], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("0", ["updateEthPrice called","UsesExample"], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("mjw2aj", ["qgz88c","UsesExample","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(128, "call updateEthPrice", ["trade.totalPrice","","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(97, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["PayableExample","","0"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("IsLibrary", ["call updateEthPrice","Oraclize query was sent, standing by for the answer...","jt0fyr"], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("\x19Ethereum Signed Message:\n32", ["0","41xhfk","mjw2aj","fmakip"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(69, "ETH", ["sqxwpm","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","fmakip","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(255, "updateEthPrice called", ["sqxwpm","\x19Ethereum Signed Message:\n32","fmakip","fmakip"], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("qgz88c", ["0","\x19Ethereum Signed Message:\n32","PayableExample","UsesExample"], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("ETH", ["PayableExample","","call updateEthPrice","Oraclize query was sent, standing by for the answer...","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(200000, "costUSD", ["PayableExample","","updateEthPrice called","kjr4wt","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(57, "jt0fyr", ["kjr4wt","UsesExample","41xhfk","P","fmakip"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("updateEthPrice called", ["qgz88c","sqxwpm","fmakip","fmakip","UsesExample"], 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("qgz88c", [[69,82,213,153,13,107,246,206,51,141,22,44,59,239,176,197,47,163,147,10,151,62,143,129,120,242,42,186,193,75,20,29],[37,183,72,191,233,67,240,110,77,172,201,242,102,76,202,98,204,200,1,136,25,215,39,65,139,128,167,250,222,16,253,103]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(32, "P", [[90,122,36,35,177,148,172,218,165,8,4,109,153,227,248,114,253,51,203,130,233,174,129,3,15,119,49,121,232,112,245,248],[155,42,198,75,131,50,255,38,11,159,254,169,245,140,234,103,139,121,164,64,233,17,20,22,103,91,53,129,146,210,195,27],[183,226,32,55,5,4,1,248,218,172,64,234,87,238,148,38,165,51,72,89,60,227,99,102,218,15,48,24,62,246,119,248],[251,87,56,96,122,241,116,193,3,230,228,244,28,68,98,187,151,38,124,112,120,6,201,87,49,171,28,200,132,177,55,92],[172,238,149,40,227,205,22,150,70,134,29,190,118,246,212,216,90,124,130,109,69,211,221,194,22,235,62,125,183,127,209,127]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(46, "trade.totalPrice", [[125,74,189,237,43,105,87,142,15,136,78,51,202,84,36,17,85,201,35,86,12,119,229,100,154,120,220,0,190,101,231,9],[232,97,174,39,81,144,85,124,128,238,64,79,91,27,182,25,50,200,155,250,73,6,0,193,67,15,175,44,172,11,219,35],[255,171,97,56,67,86,223,84,189,127,189,233,187,108,250,148,95,9,218,98,51,255,156,110,102,120,106,29,226,37,163,225],[119,153,187,73,210,226,65,227,72,149,131,20,36,208,55,84,245,12,149,192,176,111,118,111,20,156,234,68,6,140,239,41],[23,37,82,196,83,74,137,222,115,86,94,161,252,217,130,135,200,228,35,197,225,152,211,243,185,40,190,142,151,173,94,218],[238,19,161,184,139,242,154,32,169,140,204,185,212,39,178,16,101,240,41,12,85,154,220,249,107,14,57,152,5,134,171,40],[102,166,68,190,51,228,214,116,38,36,106,146,242,104,21,225,109,177,58,172,232,182,96,110,2,178,1,212,192,23,168,194]], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("costUSD", [[103,225,180,186,125,130,91,226,69,108,73,102,0,87,129,146,17,179,30,28,102,181,152,217,12,138,58,116,75,43,129,173],[124,87,46,148,165,125,131,68,34,247,142,201,23,120,69,158,19,239,69,114,10,123,118,49,11,152,9,214,245,254,178,176]], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("\x19Ethereum Signed Message:\n32", [[42,133,207,16,233,99,72,224,211,124,144,217,54,198,186,161,138,255,42,123,71,55,38,18,7,97,105,131,76,87,19,90]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(1, "updateEthPrice called", [[137,51,142,247,91,183,203,240,121,212,220,199,150,116,188,111,27,254,9,165,55,139,89,69,81,122,132,101,60,136,237,72]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(64, "updateEthPrice called", [[202,138,170,187,122,209,84,221,45,84,62,179,34,106,10,230,158,185,13,132,16,160,74,154,31,122,221,231,154,10,74,249]], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("Oraclize query was sent, standing by for the answer...", [[237,0,44,156,158,133,54,112,196,83,27,158,167,116,244,42,35,80,196,105,158,126,118,251,16,135,213,247,221,183,30,48]], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[21,14,77,133,29,12,156,24,188,189,211,227,40,81,251,83,247,235,148,216,126,222,178,123,56,200,102,173,88,122,181,202],[141,28,166,19,139,126,226,89,162,227,86,81,4,125,213,143,31,1,201,144,146,159,137,6,50,54,83,244,59,149,116,49]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(256, "IsLibrary", [[67,126,146,79,86,22,130,203,241,206,117,200,243,228,29,173,44,89,167,198,165,226,52,165,41,157,198,197,10,183,137,7],[1,115,45,171,106,210,196,229,117,87,144,74,167,214,28,237,122,165,145,180,87,140,175,35,187,242,90,90,92,144,123,182]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(102, "call updateEthPrice", [[177,144,44,158,112,51,92,196,41,253,151,194,229,8,198,0,38,81,159,93,34,85,255,224,60,120,193,216,96,141,129,176],[47,109,242,82,195,199,125,201,88,157,162,15,69,214,151,76,218,253,40,156,98,26,144,57,13,163,164,150,47,158,57,67]], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("costUSD", [[51,115,95,250,100,65,179,132,172,237,28,59,97,229,5,53,117,89,156,160,84,230,48,177,128,82,209,72,106,204,206,66],[201,13,86,58,148,126,174,62,232,132,200,186,214,199,211,89,237,204,36,48,179,83,241,142,200,188,140,186,118,227,132,89]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("sqxwpm", [[2,147,241,26,129,132,233,162,32,7,41,129,145,4,11,56,38,116,192,254,43,192,82,88,55,245,150,112,117,216,188,68],[94,42,122,115,135,22,89,190,243,134,79,225,236,234,161,2,196,92,74,250,82,94,139,115,62,1,248,217,252,192,121,199],[0,166,94,100,249,131,203,20,152,97,2,135,48,46,158,19,112,141,29,145,165,71,154,19,125,94,104,154,72,56,129,121]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(87, "listingID arg", [[61,246,153,18,247,165,100,40,171,199,132,245,107,92,150,85,105,11,79,8,18,127,227,97,116,196,41,160,49,9,165,30],[78,177,179,121,141,213,40,178,44,87,69,7,102,99,153,144,110,62,167,160,96,125,246,255,1,46,132,173,82,106,246,24],[148,218,17,153,131,95,224,106,239,122,225,91,174,174,132,155,86,156,217,61,22,85,2,224,111,41,207,143,191,204,109,79]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(58, "\x19Ethereum Signed Message:\n32", [[145,57,131,220,194,145,194,138,214,236,155,158,191,161,219,238,93,30,244,110,155,235,15,246,234,43,111,169,222,55,43,243],[187,17,99,9,5,178,197,156,238,169,133,39,198,113,180,222,29,84,156,21,155,116,76,68,38,199,161,62,200,168,9,89],[222,20,83,158,252,247,0,214,250,18,91,167,157,151,142,22,23,143,48,17,53,147,123,107,228,250,19,187,4,128,241,29]], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("RevertWithReason", [[205,125,13,189,246,42,9,232,49,196,98,246,178,36,193,44,36,212,251,166,144,104,233,184,119,56,123,132,163,31,199,173],[137,69,208,221,231,86,207,159,194,231,88,251,147,225,236,88,130,236,241,4,42,234,108,218,22,242,207,240,24,128,138,157],[76,194,94,250,198,229,120,96,61,218,5,109,251,58,254,14,24,91,155,128,5,177,246,170,65,44,73,109,81,43,202,92]], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("IsLibrary", [[224,153,1,189,244,76,211,125,70,96,9,173,45,17,249,232,11,211,45,182,122,30,39,135,28,199,3,69,114,252,229,48],[38,140,27,134,34,178,127,206,206,45,255,237,126,116,218,7,200,136,179,104,72,106,29,229,5,33,127,39,139,78,2,5],[142,39,181,250,56,136,19,45,27,253,25,59,204,200,130,72,154,77,245,107,234,229,64,126,27,49,36,31,99,65,131,4],[233,179,80,225,27,185,179,8,101,239,67,135,2,200,167,134,122,25,184,168,139,84,127,53,208,135,171,154,66,209,135,69]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(45, "", [[95,110,1,52,61,222,253,51,250,186,187,125,67,118,190,112,21,247,113,128,18,14,50,168,74,69,71,38,236,194,178,71],[241,133,55,210,87,187,229,52,211,162,195,89,52,59,178,202,226,19,16,160,86,86,30,239,148,70,71,94,192,50,232,102],[123,61,192,15,109,243,249,109,131,39,138,49,131,184,209,62,29,229,53,193,75,155,59,150,181,89,184,185,85,202,173,244],[229,42,245,25,108,157,94,235,181,39,11,184,19,16,42,193,46,50,146,112,35,42,221,136,106,251,154,153,248,87,54,24]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(2014223714, "P", [[71,66,238,152,17,86,68,83,145,25,239,109,117,94,107,85,186,172,187,191,152,192,208,70,196,28,4,8,139,53,158,18],[57,248,148,84,94,153,184,44,38,146,93,249,131,233,122,248,46,1,23,3,135,95,55,22,70,236,10,68,138,117,31,243],[129,104,10,8,193,119,37,145,80,227,27,54,3,192,73,70,212,20,180,179,183,59,16,244,178,165,135,99,220,184,39,98],[102,109,234,187,241,87,181,232,190,111,39,45,144,124,213,144,250,123,111,116,18,229,86,250,252,106,2,85,152,175,21,34]], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("41xhfk", [[159,238,17,114,133,195,208,47,224,22,70,151,123,214,77,62,26,49,68,191,99,246,81,141,52,34,215,130,117,187,29,190],[59,99,0,94,10,193,71,216,60,100,120,134,133,19,95,226,241,218,110,37,28,59,45,177,134,185,215,9,26,129,210,250],[93,179,124,150,21,126,136,166,179,23,214,76,4,89,24,212,13,149,253,127,151,223,174,227,89,128,202,58,206,202,230,146],[88,173,254,169,111,224,201,90,30,225,41,195,111,102,35,199,129,85,113,194,123,125,75,154,182,227,70,140,187,225,239,209]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("PayableExample", [[112,192,251,117,162,113,64,182,137,209,115,75,135,123,230,184,153,199,148,96,68,176,198,233,150,232,85,9,235,22,104,59],[68,72,206,208,189,100,11,245,11,173,111,243,157,138,154,185,6,41,39,159,6,64,113,194,205,114,14,43,56,184,239,226],[21,250,136,158,84,90,32,72,215,232,1,36,235,194,87,139,89,25,63,149,11,214,242,72,241,168,129,3,205,231,66,247],[0,160,222,43,211,151,190,71,128,0,193,164,16,173,101,228,131,219,22,110,163,246,135,243,19,101,198,102,131,31,178,187],[94,14,222,222,84,3,39,130,245,220,3,136,69,202,100,237,178,97,147,42,163,2,113,109,185,35,212,250,7,29,149,90]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(32, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[128,42,125,62,208,217,225,37,156,191,103,19,225,1,193,216,73,218,126,174,170,242,255,10,66,1,184,72,203,190,152,111],[21,73,209,11,65,202,85,96,95,83,228,42,207,67,135,159,50,125,229,231,11,19,190,160,129,68,45,223,72,184,51,195],[42,153,176,4,54,197,116,9,119,31,242,113,210,225,180,236,245,233,86,25,88,171,167,114,151,129,128,110,172,123,0,28],[150,92,79,179,205,20,142,56,132,174,119,200,57,89,213,162,157,184,123,150,163,112,196,44,144,153,57,21,22,241,84,244],[184,110,142,125,158,198,46,206,26,228,226,148,91,231,185,162,8,216,0,236,77,13,75,63,209,58,240,160,81,50,84,219]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(55, "41xhfk", [[94,38,94,11,172,33,224,213,14,129,22,192,134,22,166,32,158,180,107,0,112,85,237,222,209,152,121,20,76,118,226,189],[39,247,218,200,235,13,149,160,96,74,48,237,41,184,121,99,226,222,155,31,202,233,161,157,174,245,113,174,229,209,86,165],[60,136,206,33,26,32,66,88,135,231,20,186,58,15,156,64,148,164,112,122,190,200,130,245,168,28,180,189,34,111,79,45],[184,186,248,239,168,201,255,125,129,103,233,79,171,28,110,152,41,123,175,13,40,165,55,117,148,167,21,232,92,239,172,39],[68,46,5,213,251,194,189,181,34,242,157,10,45,37,145,52,239,183,43,20,26,179,226,241,40,168,204,220,101,3,52,42]], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("sqxwpm", [[143,72,131,119,111,103,88,134,3,251,116,23,100,84,237,131,132,122,112,211,178,113,208,128,48,170,34,27,249,99,89,189],[100,251,95,169,105,221,118,85,229,14,153,221,189,126,218,42,188,182,41,86,211,186,182,108,119,218,221,184,7,140,72,28],[82,91,107,243,163,120,253,141,190,239,188,110,159,127,176,112,74,222,161,64,184,193,237,34,111,91,52,107,137,77,84,36],[200,145,76,224,19,243,2,224,177,236,125,89,148,116,140,174,73,96,208,168,220,152,246,160,133,57,6,38,38,176,165,136],[20,169,144,79,138,212,212,0,73,255,133,109,105,53,90,44,141,184,72,234,111,50,66,124,211,197,51,230,229,115,198,245]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([223],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[1],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("jt0fyr",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("0", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("trade.totalPrice", "ETH",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("RevertWithReason", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("trade.totalPrice", "UsesExample", "qgz88c",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("costUSD", "409m2i", "409m2i", "fmakip",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("41xhfk", "6ojidi", "0", "IsLibrary", "kjr4wt",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was sent, standing by for the answer...", 17,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("\x19Ethereum Signed Message:\n32", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("mjw2aj", 66,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Oraclize query was sent, standing by for the answer...", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(61,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["\x19Ethereum Signed Message:\n32","Example","updateEthPrice called","Example","PayableExample","fmakip","6ojidi","jt0fyr","call updateEthPrice","fmakip"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[224,14,225,130,47,2,181,141,55,81,91,194,57,11,119,11,206,217,52,167,159,23,229,248,69,135,21,238,185,106,62,217],[246,17,74,189,186,192,116,108,171,52,197,207,27,89,69,196,52,4,109,75,147,157,28,111,240,193,80,190,96,223,164,160],[35,201,126,220,252,241,188,66,81,184,161,123,96,117,77,99,183,141,185,199,44,208,27,157,201,241,104,24,7,85,109,192],[60,1,49,237,160,108,163,61,179,136,205,228,19,187,40,199,55,248,228,116,85,222,87,92,165,107,119,75,96,139,225,197],[163,205,122,148,190,40,39,52,175,96,17,16,203,198,151,109,152,72,188,120,22,120,157,145,128,249,154,85,239,144,243,57]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(7, 1532892062, 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([117,169,30,40,240,172,47,162,251,174,97,201,103,119,204,181,155,87,216,135,221,172,203,37,164,208,37,117,107,49,168,51], [70,233,181,141,96,170,157,139,208,179,100,104,51,136,245,15,207,179,128,253,169,19,179,172,105,198,159,147,153,167,86,197],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([239,4,141,93,150,230,111,32,226,146,47,140,162,99,95,50,36,10,207,230,227,238,48,65,99,199,152,22,245,119,147,93], [213,150,44,198,85,119,138,130,221,21,134,130,203,203,25,61,99,24,21,201,0,225,190,200,165,221,240,168,5,147,102,33], [246,128,203,154,108,82,33,221,38,222,200,160,91,17,106,4,137,220,152,236,76,201,168,196,31,81,181,227,73,46,117,89],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([12,49,199,128,66,155,65,43,196,118,55,44,242,146,45,126,119,74,11,41,208,41,224,131,179,43,144,144,226,12,224,65], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([41,224,89,191,204,248,16,65,189,211,115,154,223,199,38,26,149,76,4,132,51,10,128,158,71,44,65,129,192,143,173,48], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([129,45,96,2,64,51,201,160,144,125,62,94,74,251,46,89,64,29,40,148,95,223,242,69,253,86,93,24,154,209,192,97], "409m2i", [137,218,187,24,16,14,43,61,158,143,161,96,80,33,239,25,201,209,35,124,177,145,134,237,47,211,97,214,23,135,41,82],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([156,174,118,12,92,181,99,230,31,128,102,151,143,164,59,90,120,46,109,150,201,51,45,112,135,47,164,192,113,13,225,112], "Oraclize query was sent, standing by for the answer...", [2,227,60,94,162,246,214,178,211,26,245,224,1,167,109,222,99,78,90,174,135,247,74,230,213,253,41,253,64,61,84,183],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([184,66,83,169,9,118,183,49,248,124,187,142,246,146,73,196,222,34,32,118,153,136,43,222,175,0,22,143,215,234,27,245], [130,72,231,146,187,213,63,122,84,74,51,53,142,181,76,177,187,188,101,111,159,212,87,79,73,208,145,115,198,94,95,161], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([184,66,83,169,9,118,183,49,248,124,187,142,246,146,73,196,222,34,32,118,153,136,43,222,175,0,22,143,215,234,27,245], [121,101,161,251,94,40,206,154,232,202,182,206,180,166,147,203,173,53,143,207,217,75,196,192,49,87,4,83,115,195,180,141,81], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([175,198,72,149,66,192,57,211,52,97,93,133,82,228,27,123,54,132,248,0,47,25,18,205,242,222,106,42,52,193,27,215], [191,237,35,247,190,97,223,13,21,239,11,225,86,111,8,213,173,253,178,142,31,18,2,29,234,48,84,110,115,141,211,13], [80,130,209,66,181,98,66,25,109,40,132,221,167,39,252,62,174,21,141,96,211,143,175,72,120,191,236,15,51,194,52,147], "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([170,181,37,107,171,112,183,123,233,249,117,137,64,168,195,38,6,127,210,146,210,183,75,85,46,116,138,76,83,47,105,198], [197,83,173,9,167,44,7,221,169,246,28,96,59,70,233,210,166,137,142,34,229,50,142,240,158,164,220,117,110,41,169,119], [23,149,129,159,22,0,244,125,139,239,144,43,215,173,22,56,247,81,84,73,5,214,248,152,38,165,180,247,253,37,32,49], "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([88,142,22,177,71,191,74,176,91,32,191,89,180,81,117,109,239,140,76,24,209,219,162,92,219,110,215,212,73,106,194,137], [48,207,0,129,117,172,42,39,160,224,90,140,10,35,124,135,226,130,9,142,188,50,22,174,25,150,78,152,16,218,178,166], [116,250,116,167,61,177,141,220,16,170,217,3,220,89,130,87,71,154,126,5,5,190,114,73,65,168,0,80,8,35,238,192], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([156,229,251,160,102,81,125,63,247,40,144,29,231,130,81,59,170,49,141,83,188,59,133,38,199,181,36,90,72,116,192,112], [255,226,5,149,187,216,220,14,53,181,91,77,13,28,226,35,242,240,145,8,90,211,51,184,199,207,162,51,51,212,205,76], [203,240,173,254,244,186,83,64,171,123,212,180,255,128,255,253,77,144,202,12,86,85,134,202,161,251,128,30,204,230,84,77], "41xhfk",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([40,48,2,224,32,229,10,192,184,18,2,22,40,32,82,198,38,125,80,155,193,56,10,102,54,142,80,97,139,40,42,166], [222,84,6,94,102,229,195,74,49,247,103,98,212,163,212,24,41,59,0,123,47,0,83,142,239,162,178,49,112,166,51,54], [214,17,194,25,45,88,35,185,140,56,200,114,3,175,167,64,183,125,63,55,220,70,220,47,44,13,214,100,240,129,247,229], "sqxwpm",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([95,169,192,115,215,107,6,46,242,158,0,238,208,190,127,20,55,184,78,58,50,133,79,168,102,179,169,128,210,192,230,143], [158,138,112,232,52,3,144,183,42,171,23,121,238,213,20,195,246,68,54,121,122,126,191,73,34,206,96,194,119,41,64,154], [80,28,146,191,152,72,181,227,31,147,223,120,82,25,31,34,245,50,211,101,78,226,167,244,117,240,39,196,71,82,52,254], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([167,105,107,87,253,101,185,3,159,49,245,19,92,150,11,45,37,12,34,183,236,225,166,160,202,145,144,201,118,198,148,172], [92,121,175,251,255,168,82,25,14,147,181,180,11,76,111,69,115,171,216,43,135,211,206,28,99,90,151,130,126,252,64,94], [139,63,162,40,24,178,131,36,1,94,242,20,6,234,52,163,74,14,52,43,6,146,59,238,46,14,162,240,125,88,150,45], "flxyzc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([205,16,39,74,158,224,132,155,26,153,252,208,254,205,177,87,17,196,71,48,122,78,65,128,86,107,196,161,18,221,64,139], [158,111,50,4,166,109,64,34,122,53,104,168,90,4,133,66,180,31,133,103,98,173,139,121,171,252,163,148,29,157,177,107], [249,178,172,10,31,172,195,29,129,94,192,53,123,87,56,54,110,95,84,109,186,245,204,235,4,153,165,60,239,207,38,55], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([135,13,47,156,167,182,9,106,152,125,41,67,23,218,227,42,155,238,223,234,156,25,168,50,24,63,44,131,96,52,58,180], 1532892063, 69, [131,22,23,122,44,205,128,220,35,247,210,187,172,40,10,254,218,184,141,184,21,26,185,109,214,80,159,191,118,221,45,179], 8,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([211,16,187,209,139,175,134,86,157,8,180,209,17,182,151,155,57,192,55,213,13,194,0,184,64,185,131,87,239,198,235,174], 30, [26,243,153,38,141,208,118,174,167,135,32,101,127,199,118,163,92,186,198,29,67,169,250,54,132,244,37,46,165,218,112,255], [123,238,4,139,42,167,103,81,118,153,115,129,191,143,166,118,69,23,236,217,104,117,147,245,100,22,41,74,78,89,41,30],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([53,252,10,23,60,84,161,9,58,114,147,86,249,247,229,235,96,216,69,53,100,192,53,233,65,176,126,255,38,86,67,103], [57,181,30,171,80,53,208,151,35,167,127,0,160,175,205,30,49,207,19,81,110,68,137,197,254,27,190,224,177,8,30,182,129,197,161,20,24,143,123,97,166,6,5,108,233],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([63,90,149,114,125,59,39,159,113,134,127,71,140,72,189,130,68,102,224,169,202,97,164,34,218,164,142,146,149,219,187,56], [119,119,65,57,244,195,55,176,126,42,66,236,107,155,79,127,118,60,85,131,13,25,121,55,133,40,199,109,231,80,133,127,244,12,130,38,59,243,92,29,253,82,114,23,172,183,247,4,239,36,60,128,91,132,254,17,253,149,165,250,147,150,23,58,209],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
