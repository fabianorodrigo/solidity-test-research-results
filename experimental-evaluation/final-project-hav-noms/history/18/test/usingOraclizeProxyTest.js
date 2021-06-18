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
    contractShartCoin = await ShartCoin.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[0]}');
    contractState = await State.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[5],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[2],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[2],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"3nbv5d",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"3nbv5d",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(96,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("listingID arg", 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("\x19Ethereum Signed Message:\n32", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(69, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(9, "0", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Oraclize query was sent, standing by for the answer...", "IsLibrary", 10001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("\x19Ethereum Signed Message:\n32", "updateEthPrice called", "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(87, "updateEthPrice called", "call updateEthPrice", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(255, "UsesExample", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "RevertWithReason", 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("RevertWithReason", "UsesExample", "costUSD", 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("3nbv5d", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1532892063, "call updateEthPrice", ["P","ETH","PayableExample","","ETH","P","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(60, "a0evd", ["listingID arg","a0evd","0","costUSD","Oraclize query was sent, standing by for the answer...","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","call updateEthPrice","3nbv5d",""], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("\x19Ethereum Signed Message:\n32", ["RevertWithReason","Oraclize query was sent, standing by for the answer...","costUSD",""], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(162, "trade.totalPrice", ["listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1532892062, "P", ["Example"], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("\x19Ethereum Signed Message:\n32", ["UsesExample"], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("3nbv5d", ["P","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(10001, "UsesExample", ["ETH","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(257, "\x19Ethereum Signed Message:\n32", ["IsLibrary","listingID arg"], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("costUSD", ["UsesExample","listingID arg"], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("costUSD", ["IsLibrary","PayableExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(26, "listingID arg", ["PayableExample","3nbv5d","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1336, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["IsLibrary","costUSD","\x19Ethereum Signed Message:\n32"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("IsLibrary", ["costUSD","updateEthPrice called","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("trade.totalPrice", ["PayableExample","Oraclize query was sent, standing by for the answer...","costUSD","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(87, "trade.totalPrice", ["0","RevertWithReason","call updateEthPrice","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(200001, "updateEthPrice called", ["0","listingID arg","IsLibrary","Example"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("0", ["ETH","updateEthPrice called","updateEthPrice called","0"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("updateEthPrice called", ["a0evd","PayableExample","call updateEthPrice","0","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(64, "call updateEthPrice", ["trade.totalPrice","Example","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","trade.totalPrice","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(45, "ETH", ["ETH","Example","trade.totalPrice","listingID arg","UsesExample"], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("L", ["\x19Ethereum Signed Message:\n32","trade.totalPrice","RevertWithReason","call updateEthPrice","listingID arg"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("IsLibrary", [[30,223,57,56,99,4,99,120,136,174,181,91,143,168,221,136,231,103,115,104,211,11,43,54,172,25,217,43,126,178,210,28],[232,93,232,236,147,241,125,55,215,173,203,89,174,210,121,103,133,107,72,86,177,54,116,176,99,230,2,108,156,1,230,88]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(22, "Example", [[238,155,7,225,63,77,164,235,82,160,253,118,90,55,44,213,80,156,140,89,40,135,68,21,109,58,210,173,143,189,55,152],[10,227,232,165,103,120,52,84,96,122,140,41,230,67,47,248,24,176,63,139,178,48,162,113,133,75,246,202,94,174,28,144],[126,42,88,107,154,141,56,102,97,23,40,99,46,116,141,101,250,72,180,148,94,56,32,231,232,152,126,124,152,63,192,138],[122,16,107,163,176,117,140,71,81,222,127,98,105,36,167,116,134,80,192,198,226,228,236,243,243,7,16,171,12,131,7,68],[166,230,25,151,83,83,69,41,117,53,64,19,114,53,7,222,24,155,212,141,181,65,61,52,86,94,205,93,30,108,151,23],[224,63,8,107,188,240,226,227,234,116,222,24,215,143,171,172,18,223,43,44,249,113,155,48,207,79,171,74,235,145,86,244],[75,21,99,234,173,211,63,209,75,164,119,197,228,41,162,82,102,46,243,174,28,77,110,132,74,90,74,194,222,225,155,185],[228,26,169,241,156,230,30,122,114,46,251,241,63,50,131,255,95,194,121,209,214,197,110,101,81,168,200,60,223,216,160,15],[249,101,229,45,147,2,133,225,205,214,15,80,176,92,14,64,119,107,207,139,10,231,134,103,76,159,227,4,64,99,50,138],[97,16,154,91,115,152,226,60,71,199,107,238,101,165,37,135,120,243,99,192,252,31,11,48,30,220,116,143,65,228,126,49]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(101, "Example", [[50,241,4,109,135,73,227,109,1,251,152,212,155,58,8,104,149,234,55,2,183,127,247,66,98,203,212,31,16,92,148,121],[173,107,79,28,204,140,224,38,58,251,9,161,239,61,169,137,82,129,249,69,229,41,14,224,111,93,57,137,202,160,173,206],[3,123,239,156,147,31,12,122,251,233,75,249,185,151,53,90,230,95,100,111,135,111,86,233,239,83,87,27,137,152,61,106],[67,241,9,61,154,245,32,240,66,9,16,134,179,169,35,216,48,31,23,64,209,18,98,185,125,132,45,134,11,42,227,180],[199,129,73,165,81,253,156,167,149,105,209,136,46,241,112,88,17,57,207,10,83,73,48,70,54,60,181,92,58,75,241,39]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("3nbv5d", [[85,30,114,101,252,71,255,85,177,177,121,212,108,148,70,224,218,80,35,238,134,201,93,243,103,66,177,133,116,248,218,57],[190,249,172,104,236,97,92,107,1,212,107,58,141,203,133,11,67,107,143,40,215,34,144,19,17,6,56,180,214,32,131,73],[228,91,168,165,53,50,194,67,209,124,122,123,254,97,72,226,69,20,112,183,182,27,36,145,104,179,2,74,133,147,57,26],[161,177,176,0,236,147,184,74,90,47,57,135,37,140,32,43,161,74,100,159,108,27,201,119,137,224,248,146,97,55,40,56]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("PayableExample", [[224,12,244,181,224,151,177,12,124,232,64,51,48,20,243,169,78,156,106,40,6,12,201,105,179,129,239,192,180,245,29,68]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(66, "0", [[67,70,235,86,2,177,139,120,235,208,175,151,147,205,146,220,12,246,167,174,26,13,74,144,238,147,69,1,250,42,235,57]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(9, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[226,230,36,71,41,210,146,26,161,115,107,8,3,153,20,236,59,250,185,139,52,13,46,223,222,96,56,61,190,55,243,185]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("trade.totalPrice", [[164,12,18,58,133,3,156,49,46,168,76,19,161,189,226,86,186,3,249,164,113,47,214,92,194,151,0,246,93,222,79,207]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("jqv0dy", [[41,176,0,54,131,1,147,198,161,37,235,237,144,19,209,249,164,46,128,196,82,207,83,236,98,38,32,45,61,249,80,254],[51,245,7,138,254,119,23,113,133,146,66,119,190,133,239,156,57,59,160,163,106,72,6,101,245,195,17,38,201,135,108,138]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(7, "\x19Ethereum Signed Message:\n32", [[142,102,167,157,150,80,8,212,186,220,189,217,60,82,178,231,171,23,122,202,13,224,77,140,66,153,24,81,196,194,191,164],[32,165,187,247,215,55,167,226,111,229,111,123,144,176,201,233,122,135,211,183,198,239,15,46,106,199,164,146,249,101,66,242]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(1336, "ETH", [[230,186,205,5,127,145,35,99,141,90,73,67,251,231,109,197,158,158,238,73,188,76,192,34,71,188,100,178,197,92,22,243],[116,217,111,124,9,169,239,138,254,130,54,58,0,140,241,54,158,106,158,240,159,227,193,32,212,156,63,172,145,130,196,224]], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("trade.totalPrice", [[87,241,197,81,56,251,137,138,94,62,138,128,207,77,179,129,157,51,1,161,44,3,238,127,48,56,226,191,186,100,225,5],[104,18,176,238,170,219,205,179,111,243,13,142,12,180,59,210,208,41,241,157,37,2,8,199,188,235,243,199,40,183,99,0]], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("3nbv5d", [[55,91,158,58,200,222,81,98,3,145,243,124,107,175,175,125,203,102,246,71,120,104,181,4,216,129,38,67,57,159,177,157],[57,231,188,128,250,22,0,135,157,133,180,189,38,23,37,169,112,14,162,222,33,95,67,126,248,124,178,82,183,16,132,251],[175,139,145,169,102,79,50,160,1,185,5,86,237,107,105,40,198,108,129,189,57,251,192,241,71,104,88,61,28,143,79,35]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(47, "0", [[76,86,210,194,212,116,215,38,146,99,154,222,235,81,228,8,26,249,203,121,20,200,119,53,21,164,244,230,214,6,90,152],[209,197,43,5,135,165,144,120,3,227,98,211,28,76,19,8,153,136,218,163,87,234,126,96,73,23,92,106,147,218,51,220],[238,65,163,191,28,248,188,229,255,39,73,57,196,11,65,81,42,235,198,128,242,108,242,183,180,85,9,24,205,251,131,140]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(0, "PayableExample", [[237,97,59,184,189,2,155,43,10,82,38,53,5,72,229,149,205,29,45,229,42,23,181,86,232,164,53,132,230,157,154,249],[23,216,168,83,39,97,22,6,203,222,236,75,236,242,60,168,233,15,218,162,134,184,43,254,141,77,89,154,194,203,79,95],[25,194,215,178,176,214,33,165,193,188,134,225,15,244,200,29,122,167,211,187,63,48,110,202,5,118,159,88,32,8,216,125]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("PayableExample", [[23,61,117,192,134,135,255,97,39,25,91,51,124,221,253,197,114,209,141,11,75,142,111,26,183,88,132,169,154,237,110,75],[30,217,74,54,128,141,59,172,249,110,115,227,23,52,116,35,6,39,240,241,42,251,192,210,45,20,61,151,209,91,158,194],[26,28,38,235,101,226,197,158,229,102,218,216,220,71,65,115,29,69,87,254,111,214,113,46,106,160,136,57,217,160,72,80]], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("a0evd", [[110,136,0,197,46,164,222,204,202,209,80,42,186,228,1,19,177,46,36,92,222,147,98,147,79,76,93,29,89,147,12,126],[206,218,194,40,121,108,245,137,184,236,251,67,56,49,102,71,233,172,145,138,168,133,134,232,155,151,68,38,152,109,95,246],[122,166,228,76,221,123,202,85,136,215,78,91,124,192,93,112,76,92,255,76,227,117,140,226,146,115,253,84,70,138,197,131],[62,209,112,46,64,72,113,124,218,95,0,130,20,13,202,250,112,247,37,238,99,113,160,126,160,39,25,203,155,9,106,5]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(1023, "Example", [[191,174,117,24,209,122,171,114,75,93,92,145,65,56,177,138,7,100,35,214,207,192,24,208,171,163,101,200,29,112,189,253],[172,79,88,118,240,154,161,180,242,249,105,180,122,29,196,248,213,33,107,195,247,112,165,233,129,124,214,229,163,195,43,213],[247,208,164,156,105,54,254,67,145,124,112,36,137,36,151,147,238,70,240,159,253,174,171,97,45,191,148,182,109,194,207,34],[6,157,166,155,19,112,37,17,180,71,231,137,111,252,190,139,168,247,242,212,245,120,146,49,124,249,255,54,169,249,8,201]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(29, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[107,250,243,176,109,183,216,140,187,95,185,187,33,34,1,103,166,35,163,17,130,69,135,122,213,32,205,175,110,7,235,8],[212,170,219,90,239,233,211,54,140,244,2,201,23,250,92,243,75,114,19,140,36,12,155,163,142,9,100,169,245,105,236,189],[12,81,53,223,180,162,157,79,243,94,158,33,47,191,197,164,72,58,2,145,138,98,102,69,74,106,139,127,245,72,241,217],[194,130,44,70,176,239,206,170,74,174,45,130,41,135,44,171,30,99,111,38,233,67,59,196,255,189,169,200,166,72,94,227]], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("P", [[82,216,217,125,250,226,56,36,97,187,141,9,235,238,68,201,184,158,210,99,131,213,143,165,231,122,42,255,242,217,2,7],[10,40,202,165,21,130,75,10,106,5,234,18,143,142,171,139,92,107,188,116,70,88,182,32,121,30,40,147,155,61,148,65],[120,99,209,208,27,185,93,172,37,247,114,194,204,64,244,84,215,250,140,11,68,44,131,25,181,49,241,40,82,238,93,37],[2,129,239,106,16,11,147,133,41,99,21,24,67,208,212,252,146,40,185,19,26,100,107,113,196,155,100,159,66,30,163,103]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("PayableExample", [[245,207,170,95,20,222,166,69,222,184,19,174,111,245,102,49,177,89,137,246,201,56,36,122,232,139,58,250,86,151,59,201],[198,210,96,232,78,17,99,24,222,137,149,92,255,114,213,130,3,80,169,14,71,54,85,237,175,175,109,153,176,237,177,136],[75,22,79,135,212,109,129,87,207,43,63,248,127,17,84,198,9,236,236,197,248,210,106,203,61,173,137,28,61,101,152,209],[64,125,155,199,25,199,41,233,153,183,45,232,4,36,232,165,64,10,120,12,212,132,196,207,117,102,192,197,170,170,195,167],[219,88,222,245,99,22,48,114,244,93,105,6,44,231,193,44,42,17,134,168,175,83,231,165,189,53,151,117,148,233,14,201]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(1338, "", [[168,203,242,163,170,153,210,218,113,141,208,20,160,137,87,34,213,60,155,20,180,183,142,53,42,116,119,181,41,104,155,164],[161,84,145,106,48,91,41,233,116,164,128,84,213,114,251,236,91,100,28,21,2,218,83,3,99,136,2,68,68,250,215,16],[67,215,69,197,116,124,185,160,66,213,202,191,220,49,230,83,57,167,194,231,59,180,120,32,150,72,150,67,249,79,220,221],[63,251,224,122,144,239,248,83,218,145,12,236,92,63,244,11,162,181,98,59,112,6,59,233,100,249,220,251,88,78,159,32],[116,129,176,45,214,195,230,40,84,247,118,75,122,49,173,2,150,229,102,110,82,6,25,223,52,92,81,116,31,0,165,236]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(9999, "costUSD", [[205,63,196,241,127,110,255,183,147,26,150,137,127,16,13,186,16,219,108,33,6,175,141,45,142,176,134,237,71,118,120,40],[244,195,107,162,159,120,197,58,54,90,103,242,87,97,153,11,169,48,186,46,179,206,27,163,88,138,246,60,10,135,98,102],[27,127,96,218,127,127,78,141,70,218,54,85,21,205,107,59,135,140,220,45,165,83,194,91,115,195,63,223,98,218,152,11],[19,10,80,64,84,186,62,217,153,178,44,108,232,159,150,121,3,215,195,59,101,82,41,143,62,231,213,138,215,162,239,32],[47,215,23,228,114,92,129,245,13,2,90,193,49,100,239,84,186,101,121,221,97,20,38,224,68,130,211,235,237,125,54,5]], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("\x19Ethereum Signed Message:\n32", [[190,99,102,147,181,70,134,149,178,65,205,236,222,166,140,192,204,60,9,116,124,251,172,158,138,67,17,191,247,156,118,36],[112,60,73,54,65,184,97,20,125,51,224,145,162,75,228,184,88,92,190,209,48,86,194,146,49,48,21,78,191,202,33,247],[217,111,157,57,251,106,68,145,157,70,32,96,122,86,173,56,233,104,34,135,243,66,191,105,164,17,0,145,156,55,53,240],[255,11,41,199,226,31,216,59,243,189,156,178,210,219,92,69,143,96,149,13,190,246,139,118,122,149,8,33,124,53,189,11],[172,174,109,78,231,162,199,11,136,203,4,33,89,167,123,132,8,105,128,101,127,195,19,176,198,125,150,253,21,154,114,240]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([65],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[2],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(18,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Oraclize query was sent, standing by for the answer...", "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("jqv0dy", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("\x19Ethereum Signed Message:\n32", "costUSD",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("costUSD", "PayableExample", "ETH",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("L", "P", "IsLibrary", "",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("costUSD", "a0evd", "trade.totalPrice", "\x19Ethereum Signed Message:\n32", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("listingID arg", 29,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("trade.totalPrice", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("listingID arg",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ETH", 256,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("a0evd", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(5,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["L","pbn0jr"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[160,161,88,55,61,133,156,66,231,252,132,96,180,14,149,137,163,204,153,161,152,73,160,35,69,87,163,67,221,244,75,114]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(47, 97, 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([104,148,26,170,190,208,172,152,153,136,85,233,64,25,124,157,205,162,148,155,39,152,33,125,248,144,57,148,187,127,40,125], [87,117,222,185,190,246,33,215,57,101,4,91,136,92,188,217,184,0,145,224,55,175,241,41,122,31,76,182,156,193,128,200],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([98,185,193,217,69,148,44,202,197,15,112,56,75,182,85,16,154,70,172,4,28,168,205,13,215,130,223,216,39,2,26,199], [205,229,189,34,96,215,10,104,2,103,73,178,129,249,3,116,234,204,193,91,90,113,192,247,244,173,71,156,79,213,22,192], [200,115,215,220,46,105,145,158,110,189,47,187,22,110,4,127,162,169,185,182,104,177,144,51,112,4,68,234,182,239,31,44],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([123,150,169,162,130,163,94,144,238,90,92,102,196,249,200,163,238,184,198,199,4,243,166,203,15,158,175,157,144,92,210,110], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([211,188,194,108,188,129,89,99,165,164,203,102,59,51,143,69,103,200,139,155,59,117,136,228,32,28,74,139,10,95,114,178], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([127,194,184,166,134,148,98,96,193,42,84,223,68,234,60,53,148,62,217,200,87,50,197,12,249,200,232,54,134,45,233,222], "ETH", [60,205,255,184,33,151,216,0,181,238,22,238,16,81,207,33,116,22,193,252,161,201,28,235,242,251,50,60,143,7,31,179],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([48,13,4,42,89,161,6,221,173,5,11,73,125,26,77,249,126,80,193,35,67,149,92,197,233,165,131,180,80,196,166,15], "pbn0jr", [97,251,98,156,207,188,62,244,9,156,115,69,202,132,164,134,177,202,113,37,31,154,75,15,174,14,84,92,106,233,39,173],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([57,152,228,101,154,2,219,159,3,167,129,208,6,226,196,67,142,163,210,239,120,70,32,136,210,209,9,199,179,58,237,71], [227,59,44,86,81,79,247,252,25,115,219,189,208,103,249,80,73,170,247,8,234,197,233,144,148,114,22,190,99,201,201,48], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([57,152,228,101,154,2,219,159,3,167,129,208,6,226,196,67,142,163,210,239,120,70,32,136,210,209,9,199,179,58,237,71], [145,32,13,100,238,107,152,230,209,76,111,168,220,18,4,163,170,126,249,159,104,176,235,174,49,74,164,46,170,71,28,48,132], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([171,171,55,189,112,46,111,242,61,116,182,115,15,84,26,193,142,240,115,6,96,251,189,223,251,70,13,168,35,111,119,54], [230,46,145,175,216,224,13,6,125,189,214,207,112,96,172,67,88,157,120,63,110,130,42,72,96,104,138,97,223,13,253,153], [228,77,136,129,151,78,145,66,16,25,233,52,42,146,217,127,128,237,65,228,165,160,111,137,233,95,155,5,237,229,66,134], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([106,71,29,253,240,49,190,47,147,251,101,69,167,45,85,82,148,10,88,205,117,196,75,32,215,95,58,105,33,175,223,18], [220,124,22,212,202,94,76,118,103,214,183,125,113,215,218,145,2,253,125,254,207,75,73,222,1,90,65,248,222,59,40,104], [98,228,247,111,93,238,232,174,136,112,253,203,27,248,202,169,211,147,136,53,201,48,50,3,208,86,157,122,14,150,208,173], "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([95,179,166,107,43,183,178,247,93,98,221,49,235,206,127,48,88,242,114,106,23,91,157,212,51,145,15,149,185,22,32,138], [62,19,97,238,70,171,114,99,195,224,244,85,35,85,118,215,129,200,44,166,68,223,149,226,42,32,150,147,71,34,142,163], [171,65,118,100,139,116,111,3,194,90,226,80,219,174,127,147,234,64,58,41,89,26,89,138,2,244,96,10,239,230,7,144], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([18,78,126,163,219,227,63,166,6,56,88,205,1,165,195,44,255,101,65,14,112,159,88,149,48,104,236,98,29,22,245,111], [60,66,130,252,196,125,140,92,192,62,222,85,113,54,77,100,232,54,193,191,131,69,115,243,61,230,82,89,180,229,1,35], [184,192,20,87,148,140,169,164,146,189,175,68,253,117,9,219,24,183,17,125,231,152,191,124,4,104,134,30,16,186,154,99], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([108,123,24,164,238,207,185,245,235,13,2,147,47,233,69,81,155,196,226,56,27,197,48,217,112,75,41,32,69,211,91,170], [38,105,24,50,110,14,140,150,102,223,232,135,243,170,135,161,95,181,201,123,197,100,189,202,88,30,49,135,143,48,30,188], [246,81,140,226,233,149,172,60,179,221,102,197,104,93,231,116,103,115,227,235,15,126,103,180,192,176,14,118,101,12,232,54], "Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([203,191,247,80,236,153,174,29,35,66,129,41,177,137,119,180,153,181,167,205,51,181,32,226,182,85,33,123,17,36,241,88], [36,167,35,36,147,143,27,107,166,114,238,217,153,222,196,187,250,204,79,156,46,150,210,186,35,49,167,220,7,246,238,126], [99,137,142,163,31,133,130,113,141,198,155,211,101,41,17,148,104,79,233,53,60,223,169,232,69,108,158,184,122,134,166,212], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([37,76,84,169,245,86,212,247,162,231,16,207,42,237,151,250,206,221,52,93,96,250,54,203,216,116,188,136,58,137,217,75], [135,55,119,251,79,250,6,95,227,132,215,29,68,255,115,174,172,248,104,95,154,219,249,210,141,103,74,194,36,145,224,216], [33,86,94,151,233,143,33,226,247,30,33,6,247,198,109,167,209,179,210,62,123,217,57,252,116,245,130,233,248,91,48,6], "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([89,92,9,56,132,198,48,65,141,64,101,154,169,222,255,8,47,167,39,13,137,186,78,52,134,58,187,202,212,71,34,214], [13,116,123,215,101,163,46,200,49,32,228,3,202,16,86,239,82,77,203,99,228,200,237,244,228,177,22,139,235,234,166,190], [252,176,211,22,80,3,168,156,233,255,167,209,84,182,206,187,64,83,232,249,163,171,97,146,129,195,159,141,71,156,152,21], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([155,112,143,200,178,166,113,198,232,71,201,172,62,235,76,32,156,28,161,251,157,108,146,196,185,43,9,2,25,243,50,246], 9999, 66, [142,86,126,123,226,218,71,72,25,242,182,241,59,49,195,73,187,109,189,108,178,47,197,98,176,218,214,207,116,240,186,159], 2,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([216,19,248,15,12,205,32,180,24,162,157,55,138,64,57,110,210,62,33,208,118,129,122,82,125,98,59,51,82,183,221,125], 95, [57,21,43,161,210,162,114,69,230,57,220,143,66,175,95,53,176,184,216,2,13,26,85,243,56,12,139,180,90,15,37,71], [194,169,120,202,83,139,77,0,86,229,222,40,58,36,78,222,65,81,203,96,166,239,173,174,43,116,56,54,54,86,228,221],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([10,82,238,115,149,80,231,3,38,60,127,159,88,116,136,105,216,33,211,20,30,165,228,2,32,171,66,69,55,11,72,89], [133,221,15,111,226,201,243,199,168,250,19,138,99,245,139,162,3,175,173,14,231,76,117,111,80],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([42,148,29,155,125,254,90,197,132,22,91,123,22,59,175,133,225,98,153,218,119,21,131,89,224,204,83,94,22,134,185,190], [168,62,239,118,163,144,169,96,250,130,237,120,94,65,221,180,200,77,193,31,237,199,188,253,16,119,69,174,210,69,124,35,40,26,152,224,54,128,254,61,38,123,209,144,103,150,239,16,35,72,82,27,110,221,129,168,123,20,240,29,85,46,26,140,159],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
