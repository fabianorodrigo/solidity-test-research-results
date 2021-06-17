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
    contractShartCoin = await ShartCoin.new({from:accounts[3]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[3]}');
    contractState = await State.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[3],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[0],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[4],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[9],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[9],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(5,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("listingID arg", 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("\x19Ethereum Signed Message:\n32", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(10001, "PayableExample", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(21, "costUSD", "6cd6bc", 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "L", 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("r5pix", "updateEthPrice called", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(16, "UsesExample", "RevertWithReason", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(9999, "L", "updateEthPrice called", "trade.totalPrice", 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("", "updateEthPrice called", "Oraclize query was sent, standing by for the answer...", 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("ETH", ["updateEthPrice called","costUSD","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(24, "listingID arg", ["listingID arg","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(11, "ETH", ["\x19Ethereum Signed Message:\n32","costUSD","RevertWithReason"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("RevertWithReason", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","P","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("IsLibrary", ["UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(10, "updateEthPrice called", ["Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(22, "daedk", ["L"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("0", ["6cd6bc"], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("ETH", ["2v7ge","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(23, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["Oraclize query was sent, standing by for the answer...","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(160, "costUSD", ["r5pix","Oraclize query was sent, standing by for the answer..."], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("2v7ge", ["2v7ge","updateEthPrice called"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("\x19Ethereum Signed Message:\n32", ["0","0","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(128, "PayableExample", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","PayableExample","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(9, "updateEthPrice called", ["PayableExample","\x19Ethereum Signed Message:\n32","UsesExample"], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("Oraclize query was sent, standing by for the answer...", ["\x19Ethereum Signed Message:\n32","ETH","P"], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("\x19Ethereum Signed Message:\n32", ["call updateEthPrice","costUSD","RevertWithReason","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(63, "L", ["UsesExample","call updateEthPrice","P","Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(17, "updateEthPrice called", ["Oraclize query was sent, standing by for the answer...","UsesExample","",""], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("IsLibrary", ["\x19Ethereum Signed Message:\n32","call updateEthPrice","IsLibrary","0"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("PayableExample", ["call updateEthPrice","IsLibrary","listingID arg","2v7ge","r5pix"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(20, "Example", ["6cd6bc","Example","costUSD","0","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(17, "updateEthPrice called", ["L","6cd6bc","2v7ge","Oraclize query was sent, standing by for the answer...","ETH"], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("\x19Ethereum Signed Message:\n32", ["L","call updateEthPrice","2v7ge","updateEthPrice called","daedk"], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("Example", [[142,73,162,110,175,159,115,249,139,124,255,158,71,176,194,201,199,235,175,50,10,231,136,83,62,71,29,221,196,148,229,164],[28,51,87,183,13,76,5,10,160,3,29,49,76,141,234,1,163,38,74,141,253,26,102,8,222,151,171,201,213,241,254,205],[100,98,156,247,202,52,93,41,26,220,42,33,34,91,131,135,253,119,149,20,187,208,223,136,73,189,107,57,247,153,203,224]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(21, "PayableExample", [[211,216,91,227,201,77,40,103,9,55,133,19,197,120,176,79,23,194,109,58,240,130,244,83,185,237,158,207,115,29,1,141],[252,254,130,107,58,224,249,228,88,8,106,120,177,59,209,162,51,96,141,2,175,4,252,159,18,216,103,191,211,233,117,119],[158,198,215,73,52,196,217,91,137,43,164,43,112,224,154,247,28,111,36,68,97,17,250,194,35,18,130,28,142,93,156,11],[83,134,39,124,250,71,206,68,159,139,85,166,156,41,55,24,122,56,57,143,14,191,188,95,107,163,188,215,254,153,164,8],[61,177,60,250,51,163,172,14,35,58,171,48,80,34,101,213,165,156,216,0,39,247,159,222,89,18,72,61,143,40,7,113],[158,174,199,36,65,34,19,90,55,232,99,227,106,217,227,97,109,155,201,201,118,230,144,215,63,78,92,251,218,59,83,73],[127,171,152,192,128,200,70,51,138,241,137,54,130,58,180,63,122,116,205,34,13,90,97,99,20,69,248,191,198,59,159,52],[241,205,109,70,131,223,152,85,133,16,133,133,26,79,156,30,156,61,187,151,27,117,59,172,191,207,241,225,209,221,142,122],[132,102,159,234,241,184,131,106,183,222,43,49,29,22,108,87,177,85,13,253,50,102,102,1,165,203,138,4,14,222,78,146],[20,187,154,239,42,29,168,64,56,144,86,105,110,179,0,107,42,234,57,163,155,2,126,166,191,1,112,103,6,234,185,167]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(199999, "daedk", [[104,253,163,152,45,152,30,103,148,55,19,205,23,88,64,50,249,245,91,116,213,64,9,136,38,228,28,203,32,225,243,116],[70,88,27,121,245,235,19,119,245,254,87,100,25,124,246,126,222,120,183,185,18,67,81,76,110,85,168,44,252,87,250,122],[107,27,9,63,215,51,147,104,14,251,16,95,100,195,118,220,130,189,76,220,165,25,24,194,235,91,57,71,213,152,176,93],[101,86,165,41,6,57,141,218,51,67,133,45,52,44,60,246,243,60,202,7,237,114,36,234,199,249,138,181,218,216,69,159],[118,79,122,121,136,14,182,9,56,132,90,188,33,66,66,160,172,86,77,52,170,88,233,200,115,101,224,198,33,60,136,89],[46,178,69,111,104,61,44,81,8,7,232,146,139,240,205,156,246,187,248,202,163,237,39,25,61,37,44,180,154,102,67,90],[88,115,245,219,52,103,60,199,100,86,20,1,35,201,31,194,144,104,64,216,134,186,57,151,5,115,31,153,104,64,182,233]], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("costUSD", [[132,169,143,48,22,68,148,160,159,248,24,39,160,246,8,229,254,164,7,242,123,216,23,72,49,164,107,32,157,153,242,208],[30,199,191,247,42,57,225,223,160,54,188,25,132,249,18,146,208,20,170,2,227,46,207,30,89,55,242,244,225,58,78,142],[18,235,71,233,97,88,166,8,235,251,219,161,18,136,100,77,247,132,58,214,10,199,161,234,120,14,88,208,125,27,249,149],[6,67,157,231,214,210,116,140,249,26,133,127,64,117,75,58,20,91,225,9,158,35,27,90,146,173,230,203,201,233,181,128],[35,142,167,126,237,205,6,105,208,16,169,126,227,138,27,115,146,168,65,29,11,230,40,164,196,8,94,88,222,243,56,233]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("", [[23,234,13,59,119,116,27,16,36,195,44,66,204,72,99,201,182,200,191,41,226,180,212,53,97,137,226,118,85,213,49,69]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(47, "trade.totalPrice", [[186,120,36,204,143,130,15,77,76,92,148,147,176,241,250,198,125,255,92,172,39,136,70,139,105,58,172,113,19,77,110,21]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(257, "listingID arg", [[47,56,116,140,177,187,209,172,214,214,162,248,134,137,203,118,249,144,32,116,229,40,239,246,81,162,91,56,67,9,194,54]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("r5pix", [[91,246,19,1,250,26,250,0,46,112,117,27,27,69,200,49,173,248,102,107,71,175,95,0,128,144,4,252,242,144,54,55]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("updateEthPrice called", [[48,74,109,110,146,47,13,226,202,228,25,208,83,144,179,232,138,243,246,105,184,123,143,243,232,80,243,219,227,67,216,229],[53,147,4,23,71,65,201,102,144,153,78,214,115,198,243,56,130,17,56,142,160,70,251,82,186,42,166,61,207,204,120,31]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(70, "2o2luj", [[5,19,69,36,106,9,172,179,19,234,230,232,31,75,139,23,66,33,243,147,231,61,236,153,248,87,71,111,229,61,15,142],[118,136,215,218,20,173,254,51,130,78,62,237,63,36,78,93,155,183,10,102,139,165,151,142,60,112,44,114,250,98,140,146]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(7, "2o2luj", [[49,159,126,118,7,193,50,1,13,188,190,56,239,102,7,142,136,77,191,210,76,195,122,245,110,231,17,66,155,91,36,210],[204,226,153,77,14,37,9,233,108,116,250,63,184,187,56,57,41,1,95,219,9,164,239,74,88,131,113,140,12,4,243,130]], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("2v7ge", [[180,57,154,254,237,122,185,83,206,180,244,189,133,146,211,167,130,146,50,13,35,163,102,17,221,65,137,18,245,214,218,54],[95,254,66,47,7,5,185,227,167,214,205,241,131,108,96,149,0,191,47,148,72,23,244,213,246,8,207,231,145,164,237,213]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("call updateEthPrice", [[85,238,217,193,61,158,232,169,33,112,43,53,14,33,147,133,201,127,201,68,192,166,74,12,198,148,23,24,17,93,116,8],[204,210,124,44,249,179,84,192,84,42,225,214,134,27,73,193,88,20,173,135,3,231,50,96,201,223,86,49,42,27,39,88],[228,240,247,171,241,9,246,1,215,185,125,153,249,239,24,41,243,105,22,237,177,133,214,65,146,223,228,98,177,59,139,156]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(9, "", [[89,245,5,49,135,217,130,19,74,234,116,216,171,211,89,177,82,116,120,98,178,134,22,7,170,209,96,89,249,193,31,5],[238,212,189,250,80,94,80,52,65,199,147,152,144,100,3,213,200,167,77,57,255,237,132,99,172,72,60,130,140,173,170,2],[242,45,189,46,72,174,238,216,109,142,60,87,67,66,26,188,129,53,240,136,249,146,4,153,46,79,205,122,189,239,197,14]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(128, "2v7ge", [[95,94,39,143,88,23,153,42,241,62,100,40,1,45,153,188,192,248,33,18,23,238,209,10,154,231,86,194,99,34,126,230],[194,61,152,132,113,230,176,71,244,34,110,246,240,253,208,134,61,79,198,1,212,97,184,146,150,163,45,223,115,156,121,174],[250,227,38,63,126,238,251,126,98,251,113,201,97,2,28,16,185,24,5,2,57,84,160,92,201,80,194,255,185,106,212,253]], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("2o2luj", [[86,2,145,54,220,129,118,248,165,117,38,133,40,173,238,145,22,252,121,72,121,124,131,219,184,218,232,39,216,30,159,204],[121,104,231,18,118,233,23,174,132,159,20,11,185,136,28,125,99,28,11,192,153,250,154,164,152,38,77,246,13,250,211,26],[246,144,33,35,37,131,19,62,72,75,155,148,40,119,233,27,142,77,20,10,151,119,209,143,6,214,246,181,250,40,125,182]], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("IsLibrary", [[39,165,98,115,89,216,91,19,144,125,158,135,9,68,101,246,20,89,84,195,92,54,94,194,194,146,3,54,62,83,106,255],[207,81,221,128,88,6,44,26,111,197,178,187,240,184,236,32,240,58,116,136,231,79,234,27,183,106,65,38,14,172,173,209],[217,92,144,195,129,111,187,162,227,85,176,213,156,114,32,182,91,92,156,35,35,160,249,189,179,242,52,170,36,53,107,6],[211,237,250,4,93,132,106,42,191,135,112,81,67,71,201,118,51,125,15,51,149,223,168,220,38,28,244,158,38,125,21,72]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(98, "call updateEthPrice", [[4,157,67,71,82,208,80,145,51,244,47,48,62,228,183,2,26,33,1,119,9,232,247,102,138,96,53,118,251,96,10,144],[175,234,40,54,134,164,198,230,170,219,236,248,104,219,180,84,133,157,207,43,225,81,84,115,214,253,172,41,190,249,91,28],[7,134,125,40,242,43,202,253,154,27,16,16,20,188,45,207,14,123,57,231,174,190,125,9,89,194,209,203,62,214,159,211],[255,21,229,202,159,88,193,37,75,113,158,109,233,61,175,122,52,85,210,76,231,120,28,209,179,191,42,253,222,162,153,120]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(2014223714, "trade.totalPrice", [[231,98,250,66,35,122,36,205,75,137,195,179,26,65,98,238,243,201,80,164,48,139,215,8,216,217,73,61,92,156,177,123],[158,177,40,9,144,146,37,50,174,177,26,154,119,152,168,54,103,77,219,191,125,193,154,56,173,205,177,5,176,52,238,87],[98,48,180,161,188,89,45,240,157,228,75,122,3,142,131,90,97,16,164,202,163,31,84,90,168,52,173,148,215,82,240,177],[159,11,9,177,38,220,124,63,143,178,9,31,174,46,23,112,8,95,219,154,142,44,32,29,17,61,234,232,0,204,164,58]], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[240,207,136,215,112,196,58,172,20,203,187,194,220,218,236,171,203,74,27,145,26,50,177,223,51,84,85,234,83,142,6,225],[46,59,123,122,49,187,231,173,245,95,146,125,2,0,222,214,155,3,69,52,253,195,13,5,134,120,133,197,208,223,94,105],[222,248,148,20,236,221,104,143,209,235,200,122,173,16,31,219,24,37,169,148,2,40,167,16,184,246,39,240,40,228,99,165],[153,36,35,142,145,255,138,86,142,27,28,0,207,71,89,90,221,5,223,76,13,121,219,152,55,124,117,54,240,26,104,145]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("2v7ge", [[1,73,91,22,211,29,110,16,171,54,137,28,246,249,197,44,208,126,3,43,124,251,184,248,196,118,41,6,21,42,128,10],[86,207,198,123,209,14,219,63,237,31,0,100,11,85,18,14,32,114,171,166,1,153,214,236,109,41,89,46,54,133,180,114],[98,7,7,189,169,35,58,152,49,39,197,163,36,95,14,120,154,211,253,183,206,61,63,167,59,252,198,83,160,136,180,10],[209,78,110,123,65,231,216,97,39,33,150,222,205,64,84,134,98,181,21,252,159,85,175,106,2,79,54,61,71,174,112,25],[16,61,176,225,150,192,62,90,109,192,52,36,84,209,155,151,106,29,108,159,168,14,61,225,191,238,232,216,4,98,148,206]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(16, "RevertWithReason", [[16,22,74,183,14,45,39,63,119,185,182,148,218,153,61,229,148,111,140,68,127,111,46,24,240,31,114,2,190,182,219,228],[75,196,162,139,212,122,221,177,160,215,172,23,120,53,56,27,226,234,4,186,52,126,133,18,24,157,100,217,81,7,75,217],[19,195,13,187,25,164,149,65,134,41,103,36,140,176,6,25,127,104,108,130,221,211,144,146,90,180,136,183,67,65,1,202],[154,24,159,84,35,167,120,188,240,231,24,18,211,192,243,230,251,146,246,70,245,48,199,30,201,155,137,76,136,50,118,134],[27,81,17,191,105,118,84,119,104,56,140,12,247,184,44,55,146,129,25,160,71,237,251,212,122,119,162,150,28,153,184,4]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(1337, "", [[182,210,181,14,130,116,200,26,122,214,81,82,190,154,121,128,153,42,221,46,78,137,167,191,180,15,50,27,181,33,242,75],[242,4,236,80,185,158,101,71,235,72,76,209,49,20,137,252,155,112,16,4,45,225,119,200,239,55,112,79,237,106,148,220],[5,129,125,173,157,153,213,86,112,26,162,104,0,138,255,191,123,135,114,217,237,115,244,202,149,179,153,45,163,141,32,30],[133,24,52,36,28,218,175,212,177,21,56,249,121,217,69,246,49,87,51,75,93,149,185,215,215,191,233,154,107,100,214,159],[36,241,111,254,214,229,102,29,230,125,139,74,207,191,193,215,212,158,146,78,135,23,193,125,187,112,83,161,86,106,219,144]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("\x19Ethereum Signed Message:\n32", [[102,214,159,93,113,128,52,143,231,93,12,195,95,218,192,154,71,225,96,87,86,11,178,196,197,41,192,88,67,199,122,104],[131,252,94,190,5,58,141,64,97,184,141,227,182,47,70,194,143,209,161,104,171,32,245,121,240,239,92,250,82,166,0,26],[29,7,100,138,14,29,187,62,80,58,210,151,108,13,74,165,183,151,172,200,244,210,251,17,80,214,231,63,87,124,237,44],[155,39,173,247,246,123,57,117,23,211,72,74,30,3,237,208,172,39,112,56,78,251,212,255,64,121,250,240,200,174,220,247],[190,211,27,218,170,110,207,122,115,69,221,114,125,147,75,79,50,147,225,29,200,225,86,153,29,21,109,58,215,225,72,171]], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([182],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[7],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(0,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("\x19Ethereum Signed Message:\n32", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("pltpke", "r5pix",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("r5pix", "UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("", "UsesExample", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("0", "dv2zo", "0", "daedk",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("\x19Ethereum Signed Message:\n32", "updateEthPrice called", "L", "r5pix", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("listingID arg",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("pltpke", 1338,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("e30gm5", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("r5pix", 95,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Oraclize query was sent, standing by for the answer...", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(23,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["6cd6bc","","listingID arg","RevertWithReason","RevertWithReason","r5pix","IsLibrary","","Example"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[46,60,204,8,137,149,189,220,234,220,246,33,136,141,150,203,177,63,165,41,165,159,202,13,172,242,160,91,15,168,243,171],[144,170,45,128,161,123,190,107,3,133,159,32,166,76,160,6,101,126,52,56,239,39,117,153,184,178,205,71,244,72,30,179],[221,49,230,57,189,236,0,57,60,57,26,130,209,7,12,117,28,98,90,110,172,226,193,138,27,103,138,174,170,141,63,79],[118,129,98,59,92,224,121,12,253,149,238,10,78,147,29,180,109,145,112,180,237,182,94,182,0,100,185,112,225,46,64,19],[137,193,38,248,159,83,23,3,33,161,221,68,34,157,1,205,112,40,11,0,181,61,179,65,238,11,170,27,139,232,148,231],[249,73,185,97,85,214,186,224,131,100,140,29,253,107,234,54,191,1,237,49,131,235,212,166,1,50,126,255,170,241,192,77],[30,54,244,128,65,35,32,210,23,161,32,244,120,117,141,161,31,157,41,27,198,39,174,75,208,87,99,139,124,218,241,11],[70,164,44,79,142,38,240,241,250,112,10,153,130,173,51,218,28,207,22,24,3,121,14,235,239,66,184,231,216,185,77,22],[99,64,18,208,222,9,11,247,128,215,9,172,67,84,226,255,94,113,204,161,115,88,46,138,45,197,23,145,134,66,97,199],[170,212,151,48,27,140,108,76,162,130,146,12,59,146,84,101,207,179,140,217,197,96,209,14,14,97,186,97,0,38,68,115]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(103, 88, 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([15,226,26,6,101,5,106,111,144,19,6,199,100,79,131,21,231,205,40,71,162,100,129,228,189,30,181,93,22,114,139,20], [248,3,103,253,0,7,121,208,141,236,223,155,216,126,39,188,168,180,232,53,160,129,3,52,24,4,41,119,175,193,40,65],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([75,243,56,16,22,39,246,147,128,166,5,97,165,190,89,120,240,162,84,0,117,120,147,16,80,223,65,100,12,245,44,70], [28,36,86,241,115,139,101,148,122,143,135,41,73,36,112,71,92,195,160,30,8,21,87,140,142,183,194,213,70,63,182,236], [55,194,26,225,59,150,151,234,167,93,251,134,20,163,241,173,113,210,74,9,21,144,207,82,53,66,94,87,46,11,66,205],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([10,219,130,105,158,41,127,190,203,202,164,214,157,225,81,158,24,242,240,49,59,116,150,173,73,222,148,11,153,60,151,165], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([12,95,169,172,168,93,8,157,167,0,129,199,133,49,146,212,83,73,225,218,176,55,26,194,54,242,107,88,225,113,118,17], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([251,120,39,164,16,132,34,24,226,48,118,59,109,177,112,235,184,134,63,106,137,6,101,141,173,124,45,68,144,253,97,184], "call updateEthPrice", [235,109,5,76,36,109,181,247,93,219,119,171,21,207,87,91,163,184,134,42,25,77,234,244,174,86,116,93,22,203,252,182],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([14,168,57,210,253,169,82,0,86,49,206,141,174,26,53,71,193,190,98,137,195,76,27,187,97,82,251,17,173,234,32,106], "L", [216,220,109,223,245,46,193,29,30,14,143,242,162,141,163,30,232,72,10,175,53,211,14,217,228,97,170,206,250,53,40,60],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([100,173,186,168,190,162,94,50,17,108,231,243,174,131,190,237,97,58,170,57,45,181,226,250,142,110,221,56,205,130,161,81], [205,84,165,175,205,172,24,56,143,59,90,202,66,254,170,113,122,97,130,242,247,167,127,35,75,102,68,221,124,149,54,130], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([100,173,186,168,190,162,94,50,17,108,231,243,174,131,190,237,97,58,170,57,45,181,226,250,142,110,221,56,205,130,161,81], [38,91,156,146,172,243,115,173,126,239,150,219,132,102,228,241,133,107,113,77,98,220,218,127,244,25,84,251,205,238,182,124,14], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([231,134,154,255,10,81,54,219,122,127,91,114,51,90,85,120,155,210,113,204,194,179,113,29,71,210,199,236,202,73,234,228], [182,151,83,2,6,62,108,42,69,138,93,255,87,196,135,3,56,175,40,16,169,28,38,197,98,159,0,133,110,36,74,185], [235,14,67,129,64,53,201,207,39,50,138,18,20,234,72,22,152,243,127,131,41,128,224,251,219,164,68,15,185,238,68,232], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([20,97,90,157,32,191,136,58,85,231,43,238,19,13,147,166,180,97,183,81,51,82,104,20,194,1,216,19,110,171,97,155], [220,201,130,186,213,230,112,22,217,23,56,168,38,69,216,157,137,11,224,214,160,35,66,96,117,85,88,24,118,86,143,140], [90,8,110,201,134,50,165,179,214,60,243,40,85,238,124,29,247,130,200,19,81,17,64,33,184,75,72,185,230,95,41,199], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([241,125,9,222,221,7,199,32,239,226,242,235,119,42,50,200,99,147,208,96,189,161,88,213,20,231,160,125,142,156,200,217], [102,193,140,247,226,81,215,10,187,107,206,164,10,15,101,20,58,65,72,141,151,164,166,5,52,103,213,121,74,212,45,29], [39,143,105,17,193,55,78,233,170,141,179,152,124,36,93,99,120,250,206,179,185,36,224,170,88,216,74,77,212,72,87,241], "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([165,157,0,169,221,150,184,176,176,27,185,209,233,233,233,238,48,153,225,246,254,231,180,182,61,170,69,4,253,121,56,151], [112,241,39,98,51,230,5,189,77,35,246,47,205,231,49,42,82,21,103,199,38,226,86,72,118,251,101,254,174,173,244,122], [70,161,87,200,249,105,124,140,132,98,212,83,183,233,113,45,37,54,141,2,155,123,149,203,32,197,167,227,131,143,95,164], "6cd6bc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([159,145,247,123,77,183,22,237,121,12,8,162,197,129,221,213,194,144,120,182,183,237,90,109,129,194,181,65,236,52,147,93], [233,240,49,49,145,112,119,116,147,228,90,228,65,207,101,57,140,174,94,108,165,228,57,254,208,112,145,51,227,81,147,183], [152,243,58,43,128,145,125,125,63,33,229,120,130,131,32,177,75,242,96,189,63,99,233,119,127,89,215,57,86,142,156,15], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([203,9,249,63,139,45,78,144,176,221,116,74,193,213,33,146,139,62,223,156,237,128,61,16,16,142,215,230,206,183,80,134], [7,160,108,191,134,129,135,114,182,114,255,249,139,74,122,192,49,221,5,173,248,200,231,235,201,240,82,59,14,136,242,210], [221,47,181,42,192,249,176,191,185,193,242,67,144,98,121,155,148,98,185,122,94,163,122,40,33,179,7,203,224,116,72,105], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([230,178,89,234,61,18,2,149,88,97,148,38,79,85,214,34,37,60,103,33,143,82,19,29,112,140,69,152,65,88,155,104], [14,186,50,45,28,164,44,83,159,138,92,125,191,149,187,220,89,214,163,64,208,206,130,78,195,199,98,34,40,161,242,47], [253,13,112,83,81,164,148,233,96,45,239,27,27,248,10,141,221,142,204,32,64,169,231,251,143,197,232,253,160,167,85,166], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([25,231,28,160,81,98,171,164,91,152,0,184,203,222,216,74,82,208,249,104,61,176,179,213,76,106,144,64,77,244,129,208], [109,93,206,118,60,144,188,118,127,125,107,138,106,93,12,27,94,51,212,187,19,178,97,180,103,16,208,35,122,71,185,76], [98,43,141,77,82,190,81,117,63,158,45,225,11,88,252,228,152,198,91,68,36,125,189,65,94,253,196,128,86,66,109,108], "rs4sug",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([51,85,210,243,135,71,71,30,35,173,3,178,50,31,241,122,3,254,11,127,107,47,111,31,0,233,252,28,249,198,68,176], 16, 57, [211,254,32,6,114,158,214,22,34,197,212,142,37,110,196,51,71,53,198,176,54,129,79,3,156,242,225,68,93,215,95,64], 23,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([230,142,191,137,88,214,105,49,32,26,237,103,59,48,198,18,248,159,228,17,175,238,44,255,192,95,99,186,159,235,166,154], 255, [82,114,172,33,185,107,42,36,95,236,253,15,54,226,201,86,146,235,25,37,127,0,197,138,60,24,177,164,122,164,36,19], [30,237,201,203,253,64,17,35,77,115,117,179,251,136,39,190,247,186,238,3,208,244,240,103,14,164,12,9,214,111,179,120],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([252,97,169,112,50,239,41,216,252,143,250,88,214,181,142,215,244,177,95,19,28,181,119,184,8,252,126,124,157,248,229,81], [246,26,159,209,144,255,149,234,98,77,214,109,91,135,136,135,165,119,82,200,224,150,213,129,224,144,69,29,142,226,233,236,191,206,215,115,227,211,24,56,133,192,244,76,52,155,105,140,110,225,8,0,169,61,184,170,156,61,240,136,46,101,89,230,140,108,67,52,77,2,10,21,229,110,154,109,167,105,191,236,6,231,94,190,0,4,95],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([255,129,127,114,179,33,134,35,232,193,19,214,150,59,116,248,194,62,121,217,44,94,85,95,115,170,96,202,213,222,55,205], [1,243,167,167,249,166,217,28,190,229,209,206,89,148,198,4,95,143,30,67,234,190,34,89,226,107,121,103,118,39,2,56,1,68,239,220,124,9,73,21,25,213,76,82,187,212,134,47,67,114,183,77,6,171,194,195,253,167,189,49,95,145,116,8,4],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
