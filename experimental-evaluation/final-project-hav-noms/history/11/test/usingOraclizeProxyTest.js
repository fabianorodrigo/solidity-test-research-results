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
    contractShartCoin = await ShartCoin.new({from:accounts[8]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[8]}');
    contractState = await State.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[1],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[4],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[7],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[3],contractProxy.address,contractTokenExchangeState.address,"PayableExample",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[3],contractProxy.address,contractTokenExchangeState.address,"PayableExample",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(161,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("yroxxq",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("listingID arg", 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Oraclize query was sent, standing by for the answer...", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(200000, "L", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(18, "nabgbp", "PayableExample", 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("call updateEthPrice", "Oraclize query was sent, standing by for the answer...", 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("updateEthPrice called", "updateEthPrice called", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(21, "updateEthPrice called", "", "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(97, "PayableExample", "RevertWithReason", "trade.totalPrice", 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("UsesExample", "costUSD", "\x19Ethereum Signed Message:\n32", 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("L", ["ETH","RevertWithReason","Example","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","call updateEthPrice","listingID arg","P","trade.totalPrice","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(7, "nabgbp", ["RevertWithReason","0","jiioh","","listingID arg",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(10, "UsesExample", ["hfdx6v","hfdx6v","costUSD"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("listingID arg", ["0","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was sent, standing by for the answer...","trade.totalPrice"], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("Oraclize query was sent, standing by for the answer...", ["8ps32q"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(86, "hfdx6v", ["wbh5rh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(25, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["trade.totalPrice"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("ietqt", ["8ps32q"], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("PayableExample", ["Example",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(97, "trade.totalPrice", ["L","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(254, "Example", ["","listingID arg"], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("\x19Ethereum Signed Message:\n32", ["jiioh","costUSD"], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("nabgbp", ["yroxxq","nabgbp","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1336, "jiioh", ["L","0","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(2, "", ["\x19Ethereum Signed Message:\n32","0","ietqt"], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("hfdx6v", ["","ietqt","PayableExample"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("ucrb6x", ["listingID arg","yroxxq","RevertWithReason","nabgbp"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(2014223716, "jiioh", ["\x19Ethereum Signed Message:\n32","PayableExample","yroxxq","ietqt"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(257, "\x19Ethereum Signed Message:\n32", ["listingID arg","nabgbp","\x19Ethereum Signed Message:\n32",""], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("trade.totalPrice", ["8ps32q","","RevertWithReason","costUSD"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("Example", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","updateEthPrice called","UsesExample","ucrb6x","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(255, "trade.totalPrice", ["yroxxq","ucrb6x","Example","trade.totalPrice","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(63, "costUSD", ["listingID arg","yroxxq","ucrb6x","0","hfdx6v"], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("jiioh", ["listingID arg","wbh5rh","\x19Ethereum Signed Message:\n32","0","0"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("jyqmqa", [[172,184,202,164,255,35,78,24,37,49,169,177,106,145,145,181,195,34,206,115,175,54,132,253,27,204,217,170,141,70,20,33],[78,42,145,117,61,225,182,161,186,182,164,121,144,105,177,140,82,16,43,253,66,114,175,71,243,170,136,115,185,169,193,195],[252,125,105,185,173,22,134,124,15,252,86,101,226,226,224,128,137,197,166,119,231,50,119,101,63,91,133,127,67,252,171,71],[31,159,75,61,27,190,7,54,226,222,18,57,152,185,86,114,243,162,184,150,30,151,45,182,195,176,103,255,82,175,139,73],[213,54,22,209,57,127,49,178,163,200,165,17,141,70,106,146,16,217,35,171,8,183,37,44,85,152,159,84,114,140,12,129],[150,114,159,234,81,217,141,145,5,203,64,126,5,1,21,184,134,56,22,105,26,193,236,101,110,182,43,40,90,161,140,239],[117,20,188,236,177,167,18,230,63,181,85,170,144,90,134,66,211,89,204,210,157,123,105,20,29,124,121,170,144,201,252,145],[222,218,153,95,74,1,136,1,116,108,18,57,190,151,8,192,156,218,222,189,105,129,233,63,214,69,117,103,31,149,139,3]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(27, "UsesExample", [[184,32,32,49,7,161,88,57,73,17,131,85,177,131,157,236,126,37,164,106,51,129,253,208,154,174,206,99,15,172,118,33],[229,169,116,211,34,100,27,74,245,101,1,113,110,253,60,178,123,169,179,178,179,35,228,150,106,128,41,230,170,200,113,28],[58,153,2,140,161,37,60,27,221,175,48,77,120,39,204,225,47,183,70,122,145,112,239,97,54,147,160,158,25,175,3,38],[124,10,236,230,101,28,41,51,170,167,223,18,76,171,93,43,185,35,49,30,4,162,177,204,85,111,3,96,125,35,45,223],[164,243,83,7,219,3,192,203,15,163,110,65,46,3,203,155,193,145,41,153,38,162,104,206,110,185,153,83,42,47,2,231],[156,50,168,250,144,78,129,41,204,109,124,192,84,202,254,25,22,85,206,6,116,144,241,241,183,150,32,246,84,217,167,61]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(58, "nabgbp", [[92,230,134,83,189,39,140,204,110,124,129,178,161,189,51,108,178,190,88,31,164,146,83,181,180,253,19,31,193,61,22,137]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("listingID arg", [[237,157,116,211,138,70,188,70,173,64,115,26,228,144,68,208,126,93,66,228,128,195,34,192,152,230,98,202,16,24,103,103],[122,153,31,213,47,167,47,243,59,116,221,80,160,4,234,156,131,101,162,35,97,127,85,134,245,135,73,254,151,112,206,128],[149,87,116,207,71,200,48,142,217,75,16,52,231,224,236,83,32,228,126,230,159,114,126,65,137,113,46,134,235,7,65,156],[153,18,31,117,142,204,46,202,183,17,71,226,223,99,43,182,226,61,164,66,75,197,224,74,19,171,180,25,76,150,116,216],[51,156,66,115,215,12,252,188,241,184,215,64,63,77,37,134,223,67,146,193,202,159,71,21,80,8,212,72,201,65,129,162],[206,238,128,174,233,128,9,105,89,86,253,124,191,58,131,125,227,209,240,10,118,150,199,194,255,40,105,5,180,142,171,19]], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("yroxxq", [[209,233,157,95,74,233,227,145,62,73,204,32,88,253,101,210,156,26,77,26,161,235,30,210,158,45,34,210,87,52,222,255]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(88, "Example", [[179,28,196,169,164,17,34,203,255,83,62,162,124,8,221,180,121,197,50,28,4,123,21,104,8,70,26,198,98,143,53,134]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(9999, "jiioh", [[59,145,190,94,66,161,220,104,102,66,193,213,164,195,160,215,213,103,204,254,233,1,254,253,73,163,151,29,11,243,18,68]], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[11,98,249,195,94,161,198,32,248,65,25,141,6,247,209,76,139,16,195,7,156,238,178,50,38,251,82,252,45,234,219,8]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ETH", [[56,212,246,230,62,149,160,193,182,58,217,122,175,81,116,134,219,95,14,231,115,44,98,223,36,109,254,122,197,7,56,17],[212,234,130,255,133,54,138,55,189,251,135,42,106,205,179,37,125,46,225,113,50,31,223,125,123,10,178,25,50,217,24,186]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(4, "costUSD", [[129,104,55,3,99,216,152,149,99,202,87,212,134,200,34,253,127,243,130,144,62,248,248,158,82,17,47,201,54,231,30,78],[254,112,182,159,75,101,60,225,238,9,79,246,81,12,37,170,143,15,194,38,25,160,119,230,2,201,132,158,170,29,136,34]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(254, "IsLibrary", [[5,92,147,6,90,150,155,21,173,114,172,158,114,150,185,98,107,92,215,195,51,125,1,42,186,19,55,162,23,31,183,4],[185,25,125,72,235,186,42,15,28,246,188,64,139,197,131,59,49,1,35,72,34,218,9,198,12,118,185,142,104,133,82,57]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("RevertWithReason", [[62,148,179,240,223,94,116,18,165,57,74,188,83,191,242,119,93,147,110,20,206,130,101,199,194,143,225,93,3,48,85,66],[33,79,246,208,107,5,187,93,185,230,204,88,229,226,46,20,21,50,126,20,185,166,196,1,181,56,136,8,151,61,173,171]], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("\x19Ethereum Signed Message:\n32", [[57,159,20,148,180,205,198,173,160,14,194,174,234,82,78,11,218,3,174,11,91,86,10,170,138,96,64,240,249,162,218,119],[40,88,200,71,14,225,211,149,233,190,170,194,37,28,1,15,232,245,244,217,137,89,69,248,243,215,100,157,75,141,96,229],[10,110,80,203,199,124,69,200,222,131,19,31,162,220,194,15,170,172,193,228,132,142,218,136,128,247,161,150,190,77,182,65]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(29, "8ps32q", [[228,115,23,190,185,36,62,110,59,207,72,162,185,60,44,118,32,80,1,218,106,231,81,190,219,54,238,20,190,129,72,31],[206,116,8,190,49,182,100,169,31,193,251,124,108,31,127,134,170,24,2,20,148,174,35,23,59,243,9,252,135,170,76,240],[29,164,12,235,51,95,203,63,64,181,66,56,56,21,29,33,114,208,74,77,105,224,90,210,77,178,235,146,190,29,91,178]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(0, "", [[35,97,97,53,131,147,204,24,135,132,210,222,217,197,172,167,143,9,102,22,104,194,148,141,232,10,82,225,156,118,123,10],[228,106,128,3,135,229,136,230,191,29,5,25,56,126,255,20,1,183,253,113,15,50,10,189,242,222,64,61,42,127,4,251],[195,186,10,81,106,10,174,72,210,144,197,100,245,146,174,122,212,115,126,163,65,35,156,74,121,87,69,0,162,75,173,14]], 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("0", [[74,38,204,17,232,91,35,174,87,135,120,54,195,199,217,230,28,241,29,25,1,197,247,149,163,195,130,118,187,138,101,17],[182,142,183,17,140,237,137,0,111,63,49,167,74,186,164,207,207,100,153,199,36,212,194,181,29,110,79,37,135,231,32,29],[210,166,226,248,161,42,119,220,117,137,132,99,145,176,243,139,6,129,101,56,3,169,69,83,250,168,143,41,83,163,213,38]], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("ietqt", [[136,67,3,194,168,147,253,232,136,160,186,87,46,85,57,20,37,35,129,152,253,206,100,109,116,191,180,25,63,129,72,145],[34,236,187,144,225,120,43,21,241,70,12,66,167,78,6,29,217,163,138,242,110,199,17,92,120,68,102,56,186,122,70,168],[98,39,202,23,84,45,133,77,133,1,5,82,195,183,239,91,254,8,98,180,101,56,50,126,245,41,136,150,42,40,30,126],[222,1,84,24,116,37,182,54,7,193,189,133,9,225,182,94,132,195,135,51,233,61,15,127,33,212,204,156,89,114,105,34]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(28, "", [[119,199,173,145,194,158,214,238,231,249,123,254,127,155,38,102,233,17,4,226,253,92,227,228,238,50,0,245,59,138,100,187],[148,228,80,236,148,71,241,125,50,68,187,79,241,218,247,168,204,76,230,233,163,47,210,158,129,44,19,14,252,247,186,236],[121,237,88,114,122,230,95,153,86,9,255,33,178,70,186,181,251,175,6,30,140,76,153,164,247,143,81,127,45,197,223,159],[64,220,26,4,49,235,151,210,30,148,86,47,45,119,33,149,166,240,147,115,99,157,46,222,183,212,239,26,43,242,78,73]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(11, "listingID arg", [[44,197,36,182,217,182,118,88,199,72,58,225,46,8,28,159,10,91,69,86,36,189,227,199,106,193,212,47,112,82,182,155],[192,90,39,89,245,101,192,235,24,121,226,173,124,15,47,20,250,252,10,132,200,94,225,92,255,163,229,214,123,105,203,60],[44,174,148,137,132,152,161,27,96,207,249,189,162,219,176,1,180,107,156,124,70,224,97,121,62,159,73,14,156,164,81,0],[8,209,218,92,17,18,45,30,243,242,140,43,122,223,85,194,62,128,4,63,240,72,116,83,36,210,88,112,173,241,9,190]], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("0", [[215,53,137,170,112,44,223,226,18,197,249,146,46,156,209,203,233,255,180,7,149,63,88,215,49,86,253,47,37,17,241,244],[167,55,229,168,124,217,103,117,153,98,183,32,176,223,85,13,233,115,245,151,217,33,99,127,235,253,138,182,178,81,199,243],[137,26,36,198,54,113,232,43,41,131,33,199,89,181,162,89,75,91,102,38,214,130,206,177,37,210,216,12,159,253,81,35],[54,14,57,35,224,247,48,217,53,67,236,99,42,48,50,178,214,102,209,206,60,14,202,249,93,3,197,224,252,96,135,192]], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[175,71,29,183,141,88,106,143,194,90,131,201,3,138,115,107,30,25,228,94,159,216,225,202,0,8,129,229,185,178,170,61],[200,82,117,24,107,205,157,167,158,143,242,157,244,106,74,29,66,175,184,23,196,244,179,120,240,255,215,187,173,114,63,193],[138,23,123,157,3,200,50,94,15,92,45,184,110,133,6,211,191,36,91,175,70,180,196,104,130,91,95,21,135,137,13,52],[10,139,224,236,101,205,198,170,105,25,83,96,128,191,242,152,234,42,88,126,165,5,15,190,139,89,83,25,45,13,238,99],[178,78,157,236,55,7,146,188,44,170,225,22,59,138,40,42,139,124,231,155,102,65,147,215,113,29,190,230,142,236,225,118]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(7, "yroxxq", [[179,134,12,105,56,110,238,104,183,162,218,153,41,218,165,176,120,178,192,186,201,78,34,56,126,98,27,57,177,248,201,174],[228,106,242,214,128,91,24,77,221,207,55,181,149,128,164,181,147,206,90,117,118,130,141,104,86,241,52,140,247,197,193,30],[232,24,30,129,224,218,160,87,251,225,170,141,16,0,237,227,12,5,209,132,172,117,96,32,50,150,157,218,221,136,23,129],[96,222,48,100,1,157,113,19,97,175,209,106,200,221,219,65,145,123,63,149,209,124,134,223,237,17,97,212,85,247,93,27],[10,211,82,52,81,13,64,13,242,133,159,162,129,6,160,79,184,177,217,248,201,174,63,13,40,96,172,86,102,249,75,213]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(95, "Oraclize query was sent, standing by for the answer...", [[13,61,154,74,43,7,62,181,135,203,183,13,171,188,23,154,231,209,226,96,147,34,140,139,215,99,195,28,125,15,107,100],[19,219,114,71,150,47,26,179,109,190,203,105,69,85,95,186,222,222,244,165,155,86,200,118,46,56,115,141,27,172,214,118],[53,36,9,174,128,184,158,128,65,254,241,98,215,142,45,198,166,129,160,48,25,59,84,166,188,0,213,137,18,254,62,60],[121,5,67,142,40,154,11,160,227,114,128,79,189,106,201,35,14,77,185,110,225,46,139,106,153,112,109,232,198,184,201,33],[192,205,8,57,117,168,107,49,204,181,71,245,57,134,129,94,181,197,198,237,190,112,7,10,80,30,25,184,56,142,69,116]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("nabgbp", [[27,146,97,46,182,46,193,45,95,202,139,160,75,78,105,83,233,127,5,40,104,240,18,244,72,197,118,205,228,226,215,70],[43,33,8,49,119,69,139,252,88,118,128,15,107,178,135,230,99,241,18,152,117,207,156,191,226,150,50,52,198,26,105,156],[114,97,15,47,40,161,50,202,27,168,229,205,185,23,177,128,179,160,166,141,7,138,3,169,50,81,72,171,68,215,202,241],[56,153,96,247,237,51,148,19,188,208,136,54,143,172,160,153,252,59,155,163,49,93,131,48,203,13,173,145,213,204,1,227],[196,147,173,230,67,180,173,129,176,245,164,111,59,109,240,77,108,167,220,130,74,29,33,231,31,11,223,105,72,205,135,131]], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([214],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[2],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(16,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("nabgbp",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("updateEthPrice called", "costUSD",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("call updateEthPrice", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("Example", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("jiioh", "8ps32q", "nabgbp",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("jiioh", "costUSD", "ietqt", "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("v4b4f8", "trade.totalPrice", "", "updateEthPrice called", "costUSD",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("8ps32q",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("updateEthPrice called", 254,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ietqt", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("IsLibrary",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("jiioh", 254,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("v4b4f8", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(95,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["trade.totalPrice","P","","\x19Ethereum Signed Message:\n32","L","yroxxq","\x19Ethereum Signed Message:\n32","RevertWithReason","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[175,154,247,142,232,31,106,244,10,33,44,208,120,244,205,53,196,180,149,110,6,150,220,175,1,175,246,159,120,41,154,15],[14,243,161,97,64,195,44,159,238,161,203,8,135,129,163,224,10,32,254,191,113,35,139,206,105,185,144,237,71,190,7,166],[231,11,121,60,120,36,191,205,63,210,139,87,242,31,146,171,101,220,202,17,211,19,83,63,159,72,246,194,158,146,176,100],[135,211,13,98,36,90,246,197,233,175,223,6,121,116,139,96,187,74,203,218,159,122,217,114,87,251,73,176,178,171,233,188],[218,231,101,58,230,159,55,66,112,73,218,120,146,209,112,103,95,166,91,69,253,189,78,96,96,26,17,106,186,206,214,155],[247,130,155,237,236,25,13,131,38,75,204,156,74,246,154,112,139,11,73,194,71,227,39,195,145,41,178,99,174,228,121,32]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(71, 162, 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([10,65,208,64,207,92,89,172,236,74,244,14,233,51,143,154,175,209,53,227,140,162,232,63,156,180,189,189,76,221,81,193], [45,119,95,8,234,241,235,174,84,130,38,143,41,188,218,15,115,60,131,164,240,212,12,26,108,93,90,10,161,120,35,54],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([30,7,164,141,134,241,19,254,50,133,255,82,145,228,204,172,28,77,125,26,242,110,69,163,247,147,188,27,94,97,190,149], [174,186,193,144,254,109,49,186,229,74,40,114,240,222,193,175,198,184,67,111,190,51,136,83,56,25,169,33,37,77,152,170], [214,80,63,31,111,137,202,100,135,162,87,193,69,234,120,133,204,117,220,92,195,49,173,234,111,191,158,240,217,94,73,237],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([243,216,50,120,159,99,16,239,177,68,58,141,139,75,126,176,18,179,157,214,176,136,187,146,101,92,2,34,31,44,66,182], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([255,171,122,242,133,2,14,231,119,205,165,92,179,44,101,87,211,190,243,190,126,168,183,208,116,242,122,66,254,161,140,142], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([162,204,216,161,232,74,166,251,100,148,235,192,186,67,149,152,159,202,46,74,95,207,112,72,67,107,201,62,174,235,191,73], "jyqmqa", [210,81,173,239,247,70,96,198,102,116,192,132,164,249,94,134,110,94,210,147,60,2,57,184,108,122,9,153,59,106,209,171],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([111,163,33,127,196,143,105,145,104,186,148,3,142,230,81,70,62,220,146,221,101,111,69,235,124,224,92,189,183,7,194,140], "ietqt", [112,56,241,71,194,128,122,217,5,95,207,182,154,244,219,32,114,70,222,120,222,190,232,213,179,204,138,154,116,229,111,78],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([31,15,3,145,3,84,183,191,240,4,157,184,123,162,254,28,29,142,7,34,43,255,99,107,123,23,153,119,244,80,14,231], [141,103,214,123,231,100,176,117,229,41,143,186,132,203,29,119,170,239,177,123,132,96,219,88,14,199,182,30,25,90,214,158], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([31,15,3,145,3,84,183,191,240,4,157,184,123,162,254,28,29,142,7,34,43,255,99,107,123,23,153,119,244,80,14,231], [147,245,134,174,238,69,117,142,45,168,227,112,76,162,99,149,140,114,21,45,97,90,155,111,254,148,202,29,239,113,228,96,224], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([244,248,180,175,149,226,17,241,214,255,112,73,183,61,233,36,224,238,228,174,80,172,240,3,152,248,241,131,72,97,2,127], [81,252,119,7,154,114,123,214,177,22,31,48,226,222,149,250,188,172,220,35,22,18,14,120,50,126,34,114,209,99,202,56], [91,10,138,94,51,109,71,92,105,20,214,131,180,26,199,100,137,108,14,195,187,31,186,134,216,62,62,164,66,224,10,145], "hfdx6v",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([110,197,73,115,76,166,249,47,203,6,37,130,120,68,187,64,137,225,146,226,36,27,199,175,149,231,84,108,69,74,199,105], [168,2,181,31,10,99,207,42,22,56,125,157,136,209,250,73,173,176,50,167,0,157,170,245,11,252,86,0,10,198,145,126], [71,172,73,96,159,45,216,157,37,218,29,224,152,141,157,176,77,103,146,192,39,46,119,144,60,154,254,228,206,254,84,137], "wbh5rh",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([221,166,42,197,45,107,43,210,91,47,86,36,128,170,73,21,211,222,190,56,10,217,61,189,54,0,154,118,177,88,79,223], [3,108,66,52,114,144,173,156,169,179,224,169,0,164,227,215,134,130,39,221,75,248,216,12,245,123,232,129,185,217,235,53], [230,151,193,100,4,161,81,67,49,183,122,231,27,151,117,109,227,160,149,160,130,53,185,35,197,121,103,181,72,1,131,139], "ietqt",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([223,175,86,111,211,104,15,157,55,80,68,28,89,164,71,101,241,48,3,182,83,178,29,60,86,52,207,50,104,251,43,51], [197,113,229,164,130,152,180,206,50,83,252,130,65,238,127,176,18,191,169,74,226,76,214,51,109,87,133,158,252,89,42,39], [91,150,147,38,202,245,85,13,229,47,230,90,101,80,0,246,79,78,223,233,72,37,148,253,15,191,192,34,9,224,79,149], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([137,213,87,134,175,114,132,250,236,220,7,235,255,40,48,174,217,1,169,152,243,210,135,85,90,50,4,191,131,117,33,142], [7,72,43,2,3,157,81,188,196,112,162,101,84,252,0,188,243,36,130,121,195,175,169,231,120,184,133,33,247,254,116,238], [147,230,80,200,90,183,145,24,54,99,249,56,119,233,217,28,0,131,227,87,212,217,156,222,237,134,19,133,109,245,253,106], "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([140,250,26,121,80,131,229,216,103,114,157,18,233,27,18,213,65,27,89,142,107,140,6,28,144,196,194,216,66,11,111,23], [228,154,27,187,228,225,63,234,251,21,99,36,130,210,118,169,143,159,170,171,225,254,40,130,113,191,130,6,50,155,241,8], [155,16,66,52,39,77,123,98,251,68,212,20,217,54,168,179,142,176,133,82,43,172,181,160,247,36,136,1,236,29,167,237], "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([168,220,220,179,193,11,26,167,34,180,198,166,89,242,92,120,116,45,164,191,21,58,157,38,37,61,10,14,122,186,92,127], [44,3,176,250,118,25,26,205,127,153,75,216,54,161,216,148,191,161,249,163,118,46,137,33,151,167,193,39,39,75,65,7], [19,62,239,42,213,178,71,80,224,39,212,25,35,10,205,75,54,186,142,178,73,136,184,108,207,128,129,83,117,164,15,84], "",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([64,44,199,171,160,144,194,34,38,69,243,183,174,140,129,152,184,152,22,138,113,200,127,250,24,167,215,15,164,35,49,153], [218,40,232,244,117,56,165,193,189,21,113,166,116,5,49,50,77,240,195,32,53,146,44,61,248,228,81,45,252,155,75,228], [81,253,142,189,82,82,84,182,212,254,187,98,124,246,117,165,14,253,70,163,117,223,25,242,163,206,215,199,183,78,96,178], "costUSD",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([25,31,45,84,216,188,202,57,150,55,241,224,7,28,103,103,201,94,218,216,44,22,173,66,1,37,174,236,125,146,118,101], 27, 2, [189,69,109,77,121,226,95,252,36,220,19,16,142,204,12,34,228,169,76,83,231,180,130,91,11,67,228,119,180,207,26,52], 1025,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([152,242,61,155,182,90,51,60,119,191,132,108,237,149,65,38,130,151,82,193,9,41,93,235,97,74,115,2,247,7,71,224], 10, [213,139,204,142,79,75,160,82,181,162,54,62,3,220,242,169,242,176,222,181,145,65,88,193,167,140,23,11,84,34,7,74], [110,122,57,155,246,104,243,19,74,153,89,229,149,7,239,219,130,74,150,211,54,209,131,63,160,220,240,199,171,16,255,194],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([70,17,170,219,55,58,94,36,12,184,144,112,49,20,2,162,70,5,7,182,101,10,106,159,150,77,106,20,89,83,1,80], [72,36,167,223,202,245,175,56,12,180,253,223,150,104,82,168,237,12,88,131,17,203,161,113,44,99,252,24,149,1,25,42,9,162,61,151,236,193,110,251,22,232,125,4,179,239,133,184,141,100,157,254,224,0,195,165,130,204,188,116,182,61,48,247,55,147,76,145,196,149,79,220,7,120,74,133,117,45,19,58,124,187,5,136,43,177,103,171,127,201,50,136,8,210,107,57,3,168,100,71,20,188,248],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([71,162,19,17,8,220,44,183,182,46,253,148,77,70,13,244,46,245,29,184,171,236,140,200,196,93,148,70,88,31,228,103], [126,25,89,17,82,58,201,195,196,240,125,198,59,122,20,62,21,194,90,190,234,161,113,11,215,217,78,59,105,245,243,237,9,180,198,97,43,225,155,155,229,41,133,25,110,143,67,122,12,94,31,219,36,251,43,156,60,229,85,254,127,69,127,157,50],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
