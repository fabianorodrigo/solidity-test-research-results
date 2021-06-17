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
    contractState = await State.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[4],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[0],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[6],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[4],contractProxy.address,contractTokenExchangeState.address,"\x19Ethereum Signed Message:\n32",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[4],contractProxy.address,contractTokenExchangeState.address,"\x19Ethereum Signed Message:\n32",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(60,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("updateEthPrice called", 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Example", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(49, "P", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1336, "0", "Example", 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Oraclize query was sent, standing by for the answer...", "IsLibrary", 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("", "trade.totalPrice", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(199999, "0", "UsesExample", "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(10001, "UsesExample", "\x19Ethereum Signed Message:\n32", "Oraclize query was sent, standing by for the answer...", 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("Oraclize query was sent, standing by for the answer...", "", "PayableExample", 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["listingID arg","listingID arg","trade.totalPrice","Oraclize query was sent, standing by for the answer...","trade.totalPrice","trade.totalPrice","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(2, "\x19Ethereum Signed Message:\n32", ["PayableExample","\x19Ethereum Signed Message:\n32","PayableExample","poey67","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(1532892063, "RevertWithReason", ["listingID arg","L"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("\x19Ethereum Signed Message:\n32", ["RevertWithReason"], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("Oraclize query was sent, standing by for the answer...", ["RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(129, "updateEthPrice called", ["4o14ws"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(128, "b7ss5d", ["costUSD"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("UsesExample", ["PayableExample"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("UsesExample", ["ETH","b7ss5d"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(71, "P", ["P","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(70, "UsesExample", ["updateEthPrice called","b7ss5d"], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("", ["UsesExample","IsLibrary"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["","IsLibrary","b7ss5d"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(57, "", ["L","trade.totalPrice","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(54, "0", ["","","b7ss5d"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("RevertWithReason", ["L","b7ss5d","updateEthPrice called"], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Oraclize query was sent, standing by for the answer...", ["costUSD","4o14ws","UsesExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(255, "0", ["poey67","costUSD","Oraclize query was sent, standing by for the answer...","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(47, "Oraclize query was sent, standing by for the answer...", ["0","IsLibrary","o58k7e","k013tg"], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("trade.totalPrice", ["","Oraclize query was sent, standing by for the answer...","RevertWithReason","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("b7ss5d", ["\x19Ethereum Signed Message:\n32","updateEthPrice called","ETH","trade.totalPrice","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(88, "RevertWithReason", ["b7ss5d","listingID arg","trade.totalPrice","PayableExample","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(255, "k013tg", ["","b7ss5d","PayableExample","Oraclize query was sent, standing by for the answer...","Example"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("P", ["poey67","UsesExample","RevertWithReason","PayableExample","Oraclize query was sent, standing by for the answer..."], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("\x19Ethereum Signed Message:\n32", [[63,167,24,188,199,88,69,105,70,14,97,147,189,59,39,117,144,57,45,41,180,236,62,32,163,237,125,197,56,82,200,175]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(96, "costUSD", [[9,199,154,244,106,0,33,116,37,61,218,89,131,129,140,6,143,44,207,0,51,152,237,113,18,48,220,35,137,155,28,45],[26,46,9,145,79,54,118,232,77,35,78,162,1,102,193,87,165,74,26,12,4,217,64,255,104,131,169,20,65,9,162,231],[231,204,112,145,145,52,227,77,165,153,130,218,26,110,128,175,48,236,108,21,216,97,54,60,16,111,134,89,187,31,36,221],[253,207,12,5,82,220,73,222,245,48,37,86,162,130,188,54,174,30,120,179,160,200,168,204,50,186,95,168,191,75,192,66],[248,26,132,64,244,216,103,35,6,149,1,69,222,141,228,195,27,209,8,57,200,8,177,182,216,171,77,0,51,80,227,184]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(98, "czf25o", [[105,78,135,166,177,111,105,87,90,203,176,13,182,133,102,167,169,117,192,229,200,144,18,138,68,231,254,207,226,30,146,128],[68,61,213,198,219,60,45,0,211,9,162,240,152,101,54,163,56,185,18,123,138,219,124,125,141,141,242,71,159,113,1,79],[39,171,226,187,119,136,234,36,35,34,122,155,119,172,4,107,80,193,45,166,121,247,51,25,226,160,31,87,150,55,146,31],[134,4,10,127,47,6,42,172,225,80,160,107,85,190,80,223,182,94,103,158,242,218,186,112,218,52,71,130,126,243,78,217],[182,28,22,163,207,237,146,18,10,226,91,169,166,97,10,107,106,192,217,39,120,162,190,5,211,214,46,252,226,106,184,252],[16,214,222,67,212,201,214,77,53,71,116,135,147,113,43,197,88,178,50,216,10,197,221,47,73,20,220,148,209,205,171,191],[251,86,173,179,187,214,8,220,131,176,177,211,147,224,84,144,240,189,15,105,17,150,217,136,108,49,154,255,201,155,120,63],[0,100,25,142,227,152,242,141,48,77,52,136,228,12,63,157,36,63,53,131,94,194,6,128,222,212,217,90,209,51,222,96],[107,249,251,27,13,41,136,173,182,27,124,15,69,22,22,149,241,96,134,224,95,232,40,144,42,20,39,27,105,26,228,183]], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("IsLibrary", [[150,82,8,191,18,148,201,176,234,133,110,201,178,117,98,15,127,25,25,228,227,79,222,151,156,21,62,250,210,150,188,178],[172,55,199,76,203,107,254,134,250,67,211,59,90,88,93,110,2,232,137,99,186,190,103,177,156,152,15,65,135,56,170,138],[151,201,58,185,108,216,155,148,142,136,165,206,114,132,146,244,25,187,18,126,195,172,227,111,50,96,102,132,222,144,239,30],[79,57,47,163,111,88,89,125,231,69,18,218,169,163,217,156,219,103,71,229,239,159,237,218,163,4,82,201,164,120,18,195]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("IsLibrary", [[202,6,202,52,179,213,236,161,88,129,193,21,125,215,17,34,68,214,218,27,0,177,86,30,44,22,74,35,209,220,244,66]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(70, "P", [[167,123,197,150,125,195,104,49,121,201,235,32,30,55,182,180,72,67,204,89,33,144,149,209,223,212,35,241,35,71,3,50]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(9, "L", [[115,75,30,205,54,142,210,20,243,248,15,178,0,30,218,79,195,176,149,173,103,29,255,54,116,189,163,216,49,84,238,150]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("PayableExample", [[190,125,245,135,3,19,15,169,70,16,60,57,134,28,89,142,187,192,18,148,28,102,195,118,211,207,61,126,226,25,24,245]], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("k013tg", [[252,237,48,23,44,140,130,69,169,117,32,107,240,88,239,205,152,136,89,36,130,198,25,152,43,97,1,113,41,180,93,248],[125,209,75,55,106,244,255,20,248,91,250,53,137,5,61,149,155,11,0,167,78,135,144,5,117,80,168,114,103,236,161,12]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(102, "mg4z7w", [[206,41,96,29,82,207,140,85,152,251,55,67,245,159,205,109,32,12,69,172,45,214,54,22,13,163,156,225,42,111,207,36],[202,243,213,151,228,51,83,53,246,125,3,176,210,144,208,127,156,31,83,41,25,223,126,69,99,33,124,189,5,202,234,15]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(26, "b7ss5d", [[24,193,158,14,36,68,178,187,183,151,107,233,250,25,134,33,150,99,214,185,126,13,170,103,124,253,53,80,145,65,125,115],[42,218,207,108,127,37,184,1,168,113,20,162,84,234,40,216,134,244,184,133,152,45,108,146,62,225,233,112,203,173,50,248]], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("listingID arg", [[5,71,165,56,127,148,66,155,164,150,33,63,187,88,203,8,217,57,76,129,176,133,129,125,195,22,119,174,142,149,164,161],[215,161,17,146,238,233,244,132,131,149,226,153,225,111,126,227,226,195,147,164,245,238,233,208,33,195,111,238,83,152,171,161]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("PayableExample", [[133,178,61,47,76,150,116,208,216,92,75,55,5,80,205,19,29,135,34,158,116,103,53,103,32,111,188,171,248,50,72,71],[138,153,84,174,12,31,57,48,173,43,176,151,217,120,144,101,155,49,24,180,49,79,134,15,97,205,109,197,35,221,202,203],[117,145,82,220,92,196,133,155,171,207,148,123,244,229,241,83,158,254,0,206,199,124,156,49,10,72,59,45,40,162,24,75]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(102, "IsLibrary", [[127,154,182,11,216,135,209,37,144,100,44,15,153,14,23,47,220,0,69,62,153,68,177,195,4,94,154,158,108,120,211,44],[7,143,108,185,105,221,235,53,81,76,186,245,115,125,26,153,13,146,143,139,202,41,254,87,57,206,25,54,243,120,191,95],[92,214,201,217,206,253,12,24,202,127,4,198,65,238,207,101,61,201,13,161,239,225,224,184,226,42,41,39,160,128,101,127]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(161, "IsLibrary", [[148,238,133,209,176,124,210,6,26,33,255,187,124,183,51,59,184,149,175,126,219,157,86,26,158,76,170,29,170,150,20,180],[127,53,218,57,114,210,152,50,119,100,44,138,231,207,248,0,96,208,60,166,213,191,37,63,131,115,252,69,170,209,72,212],[7,24,65,149,119,194,53,75,178,79,116,70,13,87,139,209,32,78,238,127,104,155,77,154,56,143,176,254,204,81,15,238]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("updateEthPrice called", [[187,4,148,18,149,22,132,164,33,197,178,125,61,172,223,61,17,166,173,156,61,62,194,46,236,229,234,104,248,29,54,84],[78,246,239,62,146,195,39,94,98,239,248,253,31,77,35,142,103,238,71,106,37,13,224,242,100,40,112,50,88,222,208,201],[65,233,39,11,30,161,62,106,219,16,131,7,52,131,4,229,26,168,117,26,40,249,183,167,22,108,96,25,40,214,167,189]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("0", [[53,45,85,29,219,224,209,149,133,212,15,46,49,50,214,213,223,131,176,214,73,127,199,248,31,107,34,30,240,38,34,228],[249,58,185,50,0,48,148,51,221,247,101,121,104,176,45,27,164,185,18,235,217,234,229,44,173,106,50,191,9,201,81,63],[121,65,9,32,220,217,182,29,95,110,147,4,99,85,126,64,72,217,38,88,218,163,20,115,101,78,9,222,243,9,93,209],[110,111,81,205,67,42,171,187,245,80,191,187,47,69,39,231,105,30,49,64,1,49,127,41,187,31,115,167,1,133,176,109]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(1338, "trade.totalPrice", [[41,158,206,96,108,87,147,47,53,179,254,168,166,107,164,108,147,176,238,196,32,30,115,0,41,45,224,7,21,97,179,140],[246,171,12,112,240,219,131,39,168,237,196,181,64,13,184,242,156,75,105,92,48,184,131,197,165,133,119,198,153,196,125,238],[103,254,0,199,197,231,142,215,18,120,119,119,234,191,211,17,230,255,31,196,121,125,161,7,113,122,250,28,27,197,234,115],[75,104,143,142,57,31,169,201,177,34,119,10,56,73,55,37,130,27,30,247,229,39,0,160,20,42,29,154,130,214,4,162]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(16, "IsLibrary", [[138,72,203,8,99,7,120,59,64,229,163,120,109,148,183,219,233,165,173,244,35,56,107,68,81,128,202,144,200,245,6,103],[93,46,240,1,231,191,184,17,93,78,114,185,208,105,142,18,189,223,35,47,77,44,198,160,154,241,147,168,250,219,36,48],[215,155,150,113,149,242,121,106,176,206,12,137,136,217,251,134,241,180,248,171,26,107,94,244,242,146,165,123,216,61,1,214],[209,208,180,167,201,150,178,155,156,189,162,113,176,109,15,231,18,70,0,33,89,22,254,209,186,99,70,152,194,19,152,168]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("Oraclize query was sent, standing by for the answer...", [[253,52,145,125,163,11,20,23,191,252,184,66,111,249,89,242,241,149,247,52,72,52,112,14,221,5,51,241,173,43,207,199],[121,229,215,176,191,193,183,143,241,48,255,18,17,198,56,90,130,88,69,75,163,205,166,89,39,69,82,191,75,157,16,152],[246,229,21,188,148,6,194,87,208,4,240,218,85,249,242,252,91,202,213,244,97,230,177,213,243,68,44,27,85,179,65,137],[50,87,160,187,237,78,160,49,170,33,71,100,194,79,116,160,242,253,163,150,231,212,46,29,60,105,187,139,93,46,35,135]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("0", [[59,157,33,162,162,164,68,18,120,137,164,45,221,234,243,109,75,168,219,201,5,162,153,26,105,100,155,253,53,186,152,214],[43,31,248,155,185,167,84,76,136,185,73,121,12,203,152,81,112,146,64,99,192,99,165,18,45,31,125,36,166,198,190,62],[26,219,124,37,199,51,137,27,114,205,100,62,183,245,51,35,164,248,205,232,253,156,141,57,25,74,247,152,152,104,159,18],[98,16,72,242,47,220,214,245,129,211,238,41,3,238,52,105,63,15,169,146,120,27,168,106,171,96,78,99,57,143,103,15],[131,226,41,19,95,69,232,103,212,145,167,22,42,202,108,89,133,76,199,48,205,215,34,26,169,245,54,27,56,247,84,79]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(1338, "\x19Ethereum Signed Message:\n32", [[228,121,207,40,14,107,88,8,248,198,240,139,106,167,134,23,205,13,63,252,103,16,52,210,221,134,81,203,52,130,238,88],[87,182,82,246,15,162,73,172,10,220,192,87,222,170,77,59,72,59,148,225,36,10,57,5,154,199,177,83,184,189,102,34],[184,39,10,169,200,134,68,241,26,93,116,87,227,134,0,2,96,213,122,231,117,95,231,197,141,115,196,92,95,41,106,201],[38,207,139,61,162,40,238,167,23,51,167,138,189,162,47,148,102,76,129,36,7,116,40,193,51,190,68,227,212,102,27,69],[169,95,141,127,28,152,157,17,141,109,93,150,5,201,235,154,234,248,187,39,205,172,144,233,125,143,181,180,45,157,46,78]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(87, "PayableExample", [[56,122,124,159,207,103,131,56,81,145,18,31,102,153,139,114,118,233,216,71,179,218,27,195,222,88,249,77,1,242,238,46],[57,251,249,126,143,138,47,240,231,197,21,157,186,155,91,238,193,204,51,95,196,174,204,149,77,216,231,220,160,49,25,178],[117,52,114,108,129,235,149,87,102,87,67,133,81,57,88,250,140,227,251,154,126,253,101,101,202,112,252,248,130,24,242,103],[231,211,181,15,181,203,11,111,246,225,46,22,141,96,69,125,128,244,33,222,64,244,107,177,14,223,182,215,97,139,160,117],[45,41,77,25,162,146,116,241,232,175,11,128,253,210,213,14,169,64,70,240,250,123,148,146,21,80,82,243,132,4,234,58]], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("trade.totalPrice", [[165,41,214,59,138,149,247,215,34,184,208,6,78,107,227,232,169,186,71,73,151,1,193,169,140,135,211,20,226,53,216,72],[218,160,255,123,26,32,97,200,16,89,132,202,95,233,49,80,237,245,215,132,135,224,251,129,39,19,57,243,54,169,52,43],[188,198,168,149,242,41,132,179,90,134,70,182,152,147,145,202,233,220,103,244,34,98,48,197,5,30,89,231,14,220,58,180],[41,195,39,140,169,189,242,231,166,45,30,253,253,47,125,3,139,88,74,52,9,105,15,3,71,99,12,97,236,253,249,197],[188,150,89,0,66,255,227,163,56,4,133,133,34,242,130,212,105,169,85,207,94,172,155,46,134,208,155,6,229,216,115,4]], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([18],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[9],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(9,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("PayableExample", "UsesExample",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("IsLibrary", "v619ip",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("call updateEthPrice", "UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("IsLibrary", "RevertWithReason", "11rr5s",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("\x19Ethereum Signed Message:\n32", "listingID arg", "Example", "PayableExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("4o14ws", "czf25o", "11rr5s", "", "Example",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("Example",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("L", 127,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("0", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("poey67",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("0", 8,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("P", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(17,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["listingID arg","PayableExample","v619ip","updateEthPrice called","L","4o14ws","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[254,244,17,136,12,13,93,163,204,125,200,184,88,164,79,118,139,209,217,48,164,233,89,13,117,181,191,131,4,221,85,9],[87,118,32,130,41,240,95,133,184,240,207,165,51,235,193,200,161,87,111,32,2,244,189,47,74,247,236,211,134,173,53,81],[101,84,19,60,249,118,79,28,239,205,209,254,7,10,179,197,201,158,49,15,162,61,34,132,227,149,67,136,134,205,68,6],[219,157,62,35,245,162,15,77,82,160,97,195,89,108,133,139,179,139,231,144,134,80,136,195,137,14,66,212,218,101,163,9],[64,12,174,68,3,231,9,240,162,233,57,227,228,190,241,208,156,235,199,76,70,189,7,61,19,12,185,222,22,117,67,198],[188,210,254,99,118,62,56,148,245,192,28,243,114,181,71,93,148,91,146,57,196,184,245,34,230,49,81,127,118,22,200,203]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(200000, 1532892063, 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([125,152,146,175,101,201,95,43,131,194,49,248,93,111,236,76,119,81,38,35,191,145,158,61,226,192,247,90,215,26,86,93], [139,51,50,124,214,173,173,239,55,68,231,210,85,125,182,43,25,238,22,186,82,66,185,91,182,1,249,63,185,225,1,241],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([166,19,24,211,68,96,172,207,213,132,237,28,242,166,147,160,250,216,40,83,141,17,34,153,31,80,232,248,243,11,101,40], [220,235,183,182,67,221,160,96,55,37,132,231,115,186,82,223,234,207,222,101,93,45,254,221,229,181,221,19,38,207,181,141], [26,44,239,37,211,169,107,174,206,77,187,80,69,82,134,7,173,65,164,91,66,148,116,129,42,111,190,123,183,133,242,183],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([49,126,142,145,9,70,56,140,42,73,114,8,229,108,5,124,91,66,182,21,65,237,35,171,121,236,183,248,243,239,106,56], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([205,124,203,242,230,234,119,14,38,220,128,225,114,202,149,18,96,126,17,249,186,194,47,239,144,250,243,61,241,126,188,216], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([250,146,56,174,223,68,49,233,137,189,220,27,230,75,52,138,207,141,57,60,221,60,17,4,245,218,15,13,120,12,126,37], "11rr5s", [166,68,109,52,78,51,11,153,173,108,138,237,72,73,175,219,19,165,201,98,36,255,183,30,167,44,58,160,0,33,156,182],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([209,149,1,73,226,248,29,6,2,61,55,185,31,13,106,61,68,141,246,196,138,16,0,192,209,51,234,170,160,231,131,238], "P", [75,220,56,73,94,246,30,243,166,69,153,148,232,62,24,35,79,91,47,33,157,43,131,173,206,92,172,141,163,144,47,172],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([122,8,64,122,172,83,179,245,200,226,239,191,220,159,72,160,121,217,150,193,110,197,169,116,95,123,211,28,180,152,81,35], [178,183,234,23,163,252,251,78,218,234,202,56,86,145,72,176,91,104,106,63,17,106,117,212,187,183,26,135,237,94,28,211], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([122,8,64,122,172,83,179,245,200,226,239,191,220,159,72,160,121,217,150,193,110,197,169,116,95,123,211,28,180,152,81,35], [200,5,56,204,218,91,148,61,157,77,204,221,172,52,13,222,99,26,204,216,200,207,192,241,52,250,168,219,236,167,181,28,57], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([77,89,186,229,22,52,168,124,29,58,39,153,1,5,81,183,146,169,81,69,40,89,15,120,162,53,206,45,168,254,228,113], [199,27,195,8,13,8,41,66,167,231,18,174,197,129,137,158,248,73,79,113,250,137,246,21,82,35,202,206,184,236,104,239], [72,140,89,163,246,126,164,97,228,40,220,46,74,56,112,210,236,5,232,178,135,228,155,218,155,119,9,51,188,215,215,20], "Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([169,21,137,87,177,27,194,93,16,149,76,158,32,2,219,127,60,23,228,71,152,208,172,134,186,236,29,125,186,42,63,233], [247,138,226,32,85,231,16,107,163,56,0,73,243,21,164,17,66,16,42,23,27,90,210,175,112,248,199,176,188,21,199,56], [81,140,226,8,23,145,226,20,254,114,191,3,73,37,233,226,50,49,120,88,86,190,115,41,30,222,27,189,235,95,97,109], "o58k7e",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([57,61,42,151,126,125,190,123,101,4,23,145,151,187,27,147,164,27,239,117,182,17,55,51,229,52,105,169,180,112,24,14], [177,85,217,11,49,215,122,164,179,203,105,216,170,207,179,187,98,63,180,196,63,186,3,71,36,92,121,235,140,33,128,88], [110,148,136,104,235,248,163,21,145,15,216,251,47,147,57,52,0,135,122,254,23,253,73,220,56,80,131,175,183,63,88,164], "k013tg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([54,168,81,10,22,99,250,208,187,32,82,93,96,229,42,174,88,188,140,29,82,23,76,154,79,200,204,205,217,104,51,45], [17,203,197,223,90,248,22,189,173,49,11,128,34,76,131,153,115,95,231,141,188,58,145,152,6,133,164,96,35,242,80,58], [243,52,75,179,177,96,142,146,228,183,117,47,45,22,6,48,73,81,244,139,24,31,241,75,44,130,150,140,225,171,39,176], "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([69,176,130,228,135,210,103,171,27,116,100,32,188,83,240,138,252,152,176,6,210,6,177,30,187,193,15,235,247,212,240,40], [162,252,135,176,78,118,227,64,198,70,110,93,200,211,130,146,164,144,174,18,103,92,28,48,32,106,249,113,165,124,51,33], [246,238,254,209,168,252,238,46,187,11,7,189,11,235,54,136,26,159,15,127,149,32,248,7,90,40,251,24,135,248,119,26], "k013tg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([138,131,167,85,252,200,197,117,234,210,10,6,20,148,158,247,59,93,193,125,166,126,231,115,109,118,97,52,246,69,187,35], [64,25,93,36,249,158,211,126,105,210,132,39,190,49,120,66,11,197,172,200,190,16,215,182,58,154,205,165,133,149,203,34], [231,6,124,32,45,208,12,222,8,237,159,227,3,108,8,158,105,192,129,22,203,249,45,46,197,91,84,68,88,172,42,133], "k013tg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([79,130,202,125,1,8,18,66,141,184,236,199,202,115,41,116,209,67,43,208,62,207,168,112,147,253,7,35,141,218,109,207], [34,16,240,154,35,216,52,190,170,228,12,227,103,38,54,23,180,36,76,161,89,19,149,99,174,124,183,109,74,28,100,131], [29,4,202,148,219,103,203,245,36,219,151,231,86,226,135,116,82,23,115,217,198,215,87,34,189,47,19,232,159,230,158,235], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([80,92,22,72,219,139,182,202,211,53,228,113,116,238,85,9,63,52,104,235,91,205,38,13,232,164,84,202,98,191,199,208], [110,236,183,160,113,21,85,69,234,93,252,86,86,6,88,251,21,9,239,182,147,254,149,172,203,170,234,2,192,234,198,19], [237,17,255,48,39,106,24,87,253,182,27,112,147,194,46,211,26,134,199,73,114,81,6,171,224,101,67,215,22,156,196,49], "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([205,139,77,229,247,228,132,136,96,254,155,60,100,207,127,106,46,56,106,168,29,23,155,35,120,4,39,30,130,25,240,32], 20, 48, [226,74,117,85,242,12,42,232,99,246,125,239,23,212,116,168,175,137,78,249,12,160,101,47,147,86,201,62,171,83,99,27], 1,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([173,125,228,2,22,120,104,48,162,108,136,61,91,99,253,7,46,231,15,187,173,159,136,11,134,34,123,191,115,141,191,72], 103, [85,29,131,121,159,253,7,62,117,147,53,31,101,24,219,156,7,67,212,222,43,54,26,96,115,197,125,150,149,14,249,241], [15,221,120,173,251,118,67,87,122,216,112,56,36,155,161,157,208,214,192,57,224,12,56,190,106,9,229,128,87,233,146,127],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([25,28,73,173,186,122,46,22,180,129,188,64,36,138,93,235,250,81,243,181,41,207,180,59,111,11,251,105,24,40,45,212], [230,236,29,145,127,163,208,109,0,164,97,184,190,46,232,40,154,67,196,23,106,98,226,37,244,80,126,14,134,150,176,77,253,56,203,2,74,95,31,97,194,35,168,230,205,167,158,120,120,161,163,236,115,208,48,252,79,85,242,104,17,120,151,86,3,195,228,15,57,64,127,242,138,220,52,115,209,4,88,67,4,240,79,233,88,254,49,175,27,169,238,38,67,192,29,33,122,146,10,252,10,252,125,250,95,167,210,49,233,242,25,186,98,45,200,33,123,237,232,83,106,13,250,97,4,201,153],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([32,128,127,244,97,33,149,155,48,46,45,17,245,233,50,239,106,13,8,99,169,135,47,88,242,61,112,139,114,56,97,128], [149,198,186,240,63,64,68,28,189,205,86,210,236,64,227,26,195,183,29,230,31,114,69,185,0,161,55,238,69,229,8,85,22,94,156,83,31,110,210,164,149,61,108,155,255,217,106,221,47,219,22,54,143,171,176,30,248,61,192,155,250,176,167,0,77],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
