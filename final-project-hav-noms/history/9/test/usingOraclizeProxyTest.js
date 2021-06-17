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
    contractState = await State.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[1],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[7],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[3],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(19,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("UsesExample",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("P", 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("", "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(21, "UsesExample", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(31, "IsLibrary", "\x19Ethereum Signed Message:\n32", 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("", "UsesExample", 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Oraclize query was sent, standing by for the answer...", "PayableExample", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(71, "PayableExample", "costUSD", "",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(29, "ETH", "Oraclize query was sent, standing by for the answer...", "trade.totalPrice", 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("RevertWithReason", "1w2nfw", "tcejbk", 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("L", ["Oraclize query was sent, standing by for the answer...","updateEthPrice called","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(0, "PayableExample", ["RevertWithReason","ETH","0","L","gzoybr","UsesExample","Example","Oraclize query was sent, standing by for the answer...","trade.totalPrice",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(1023, "", ["1w2nfw","L","updateEthPrice called","1w2nfw","\x19Ethereum Signed Message:\n32","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","UsesExample"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("gzoybr", ["listingID arg","costUSD","Oraclize query was sent, standing by for the answer...","IsLibrary"], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("Example", ["\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(101, "P", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1025, "ETH", ["0"], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Example", ["gzoybr"], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("UsesExample", ["updateEthPrice called","ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(1338, "1w2nfw", ["tcejbk","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(128, "trade.totalPrice", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","RevertWithReason"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("costUSD", ["gzoybr","Example"], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("call updateEthPrice", ["ETH","Oraclize query was sent, standing by for the answer...","tcejbk"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(49, "", ["Example","L","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1338, "", ["Oraclize query was sent, standing by for the answer...","updateEthPrice called","PayableExample"], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("P", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","P","ETH"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("gzoybr", ["ETH","0","\x19Ethereum Signed Message:\n32","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(63, "n6trz", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","costUSD","updateEthPrice called","6dgvv"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(2014223715, "P", ["6dgvv","ETH","Example",""], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("updateEthPrice called", ["Example","Oraclize query was sent, standing by for the answer...","0","listingID arg"], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("\x19Ethereum Signed Message:\n32", ["ETH","trade.totalPrice","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","ETH","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(162, "\x19Ethereum Signed Message:\n32", ["n6trz","1w2nfw","gzoybr","L","n6trz"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(60, "Oraclize query was sent, standing by for the answer...", ["1w2nfw","tcejbk","listingID arg","costUSD","UsesExample"], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("n6trz", ["P","L","wzwnwb","ETH",""], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("r3anir", [[2,13,90,65,51,182,104,176,164,225,55,185,121,92,251,1,238,254,218,106,205,107,205,145,228,59,229,147,149,81,200,237]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(22, "1w2nfw", [[52,89,71,224,54,198,165,124,83,216,247,98,217,216,41,178,254,241,110,80,40,196,223,101,225,241,109,229,162,63,130,254],[110,248,138,36,252,83,58,147,63,78,233,233,74,131,213,102,13,120,212,33,170,188,35,229,168,241,145,64,195,37,130,169]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(200001, "UsesExample", [[69,185,21,118,123,193,43,93,143,111,169,178,92,169,14,171,233,216,242,252,56,3,12,135,249,179,167,125,233,182,227,195],[255,247,118,79,248,234,236,211,13,185,116,102,49,253,74,234,19,8,107,250,174,5,43,40,142,229,183,151,28,60,71,4],[14,214,43,183,119,124,32,84,254,60,171,49,188,143,226,17,59,81,41,207,229,110,96,239,242,76,117,54,47,7,207,15],[142,157,235,82,110,186,46,188,140,121,37,138,28,189,242,27,80,102,157,222,112,174,10,143,58,213,123,81,96,27,49,154],[203,153,114,160,240,93,209,49,51,81,110,254,12,31,244,118,112,50,17,20,73,149,195,52,27,118,81,103,11,140,231,141],[137,46,94,38,236,91,53,20,60,227,47,23,222,27,162,48,156,148,166,15,110,88,240,199,140,26,238,47,217,67,216,19],[234,3,255,182,225,227,9,251,71,95,231,52,31,101,11,182,107,31,223,162,251,141,103,151,40,133,77,237,224,103,215,66]], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[140,194,98,103,122,24,115,249,72,125,172,208,177,114,139,166,41,220,114,215,223,127,129,39,95,242,79,28,212,108,71,37],[88,68,50,217,62,86,61,170,39,42,19,41,232,150,216,196,38,109,29,213,234,144,149,180,242,60,198,175,163,148,70,26],[188,100,141,230,248,189,9,56,156,159,207,23,211,130,81,126,232,217,76,180,119,222,55,211,100,150,145,221,213,23,254,156],[39,255,54,170,112,230,194,96,238,212,83,158,160,217,48,223,53,216,10,128,94,137,188,10,24,132,214,217,35,81,198,61],[61,22,231,225,98,170,131,50,238,229,14,10,186,179,113,13,216,189,205,32,0,108,208,146,213,121,148,11,140,189,77,111],[7,253,241,228,103,237,157,106,35,243,222,70,119,213,177,145,204,116,138,135,9,106,225,219,28,79,110,36,157,224,98,227],[144,163,81,225,35,111,55,204,206,64,67,227,137,187,175,165,188,93,237,125,167,65,80,173,90,252,143,190,127,46,56,98],[214,27,179,76,73,182,145,236,86,84,132,241,206,217,51,75,93,222,37,218,124,240,104,236,21,149,205,48,252,91,133,204],[15,189,115,123,41,139,11,204,123,201,124,224,55,103,150,133,145,190,184,197,88,199,248,144,54,246,83,189,31,137,109,56],[130,63,216,247,162,178,194,13,122,100,212,53,179,218,61,126,96,29,133,241,159,15,5,195,168,24,99,213,165,177,156,165]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("P", [[78,85,58,159,20,182,219,7,170,242,50,49,42,209,106,101,109,202,164,107,253,184,9,178,91,39,241,1,15,91,26,84]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(1336, "IsLibrary", [[34,51,178,3,45,153,112,175,185,71,210,0,181,135,140,98,190,76,209,124,34,31,175,49,37,209,179,29,137,157,137,119]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(46, "RevertWithReason", [[110,89,98,44,251,175,245,79,33,144,102,132,231,92,97,140,46,227,181,79,73,53,244,181,138,174,183,146,248,31,183,115]], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("RevertWithReason", [[209,239,188,129,227,217,123,116,199,169,28,23,176,114,122,164,185,240,189,247,175,151,54,168,44,118,1,52,76,69,108,45]], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("P", [[223,113,132,1,57,90,47,184,199,113,41,51,68,221,18,248,129,173,241,140,47,206,3,76,204,109,47,10,218,90,203,112],[51,59,15,70,26,49,245,132,197,23,217,154,26,248,155,155,96,253,76,38,245,163,90,85,183,220,241,163,121,125,217,254]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(255, "", [[151,244,186,110,37,193,129,32,245,35,15,211,224,58,142,52,154,169,247,68,159,97,13,125,248,154,233,236,175,171,23,50],[42,171,99,28,47,11,6,68,254,14,177,134,208,157,140,107,141,169,194,108,148,98,199,186,220,79,253,225,52,157,72,205]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(255, "listingID arg", [[226,249,2,106,150,154,109,113,117,94,45,12,76,118,216,71,192,69,46,38,175,226,110,89,176,31,222,37,108,138,130,126],[68,187,175,88,249,64,80,35,37,193,193,130,98,5,10,226,52,147,18,180,253,24,219,130,172,176,104,122,213,101,206,254]], 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("n6trz", [[95,70,18,186,219,5,214,135,44,183,216,175,70,230,209,246,166,71,92,25,16,251,238,202,66,208,96,167,1,126,84,187],[79,42,16,91,189,32,72,39,115,183,28,56,182,168,118,191,188,248,250,95,183,148,248,109,36,57,215,0,60,95,41,132]], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("r3anir", [[242,45,43,179,213,157,76,220,63,19,136,191,230,78,146,29,71,227,104,213,231,19,41,183,177,5,28,215,52,7,157,31],[56,185,12,64,10,59,39,100,240,14,205,229,96,3,44,163,100,58,87,161,124,163,70,252,204,60,25,35,197,13,70,165],[63,87,74,199,108,224,222,143,96,118,2,249,164,48,77,85,212,146,188,133,183,175,78,128,105,199,169,73,158,48,97,91]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(1338, "1w2nfw", [[182,100,150,166,145,117,174,113,12,151,229,156,68,130,127,232,27,202,7,134,56,134,152,137,155,70,213,12,61,3,187,144],[128,114,215,54,48,83,113,178,237,162,20,187,162,32,10,173,93,247,239,44,76,76,55,27,33,47,35,56,63,228,124,69],[203,108,167,114,91,253,246,57,210,28,172,143,34,179,94,107,77,242,72,161,234,146,216,0,180,16,138,244,32,149,77,14]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(1532892063, "ETH", [[196,99,203,162,76,169,42,112,51,55,157,200,225,75,41,106,165,252,150,211,21,154,204,139,99,167,246,55,99,115,141,238],[43,114,170,162,188,56,22,251,123,55,162,23,205,78,202,81,24,106,92,59,199,78,170,158,108,112,40,73,211,8,50,120],[132,133,72,83,238,59,102,93,114,69,146,16,133,222,1,155,51,8,200,165,169,163,172,158,139,169,105,81,244,3,89,92]], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("P", [[43,14,184,162,47,81,156,136,39,175,151,83,173,94,81,192,37,159,159,96,106,108,119,250,220,100,5,45,220,57,208,231],[159,195,231,11,154,52,249,157,240,2,29,169,209,200,11,251,85,201,167,86,101,146,65,53,134,120,246,127,237,35,38,14],[128,3,99,250,228,79,232,173,178,115,124,143,150,18,174,249,37,27,14,174,73,129,54,218,216,200,27,210,20,49,237,48]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("6dgvv", [[166,2,248,20,54,245,139,110,31,233,116,69,162,54,218,163,205,19,44,121,12,251,140,6,213,154,54,100,213,1,82,95],[67,227,0,45,104,83,20,238,37,64,185,224,53,7,115,221,137,48,72,30,223,110,166,11,107,29,15,128,150,239,130,148],[128,68,127,134,38,241,242,201,23,247,11,221,171,182,46,177,198,139,179,70,87,170,87,210,83,204,250,166,202,193,187,200],[61,96,193,156,103,84,212,129,242,254,198,107,134,254,24,56,31,223,114,78,233,208,209,195,86,81,102,100,29,251,222,42]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(0, "n6trz", [[234,35,214,155,125,74,230,191,0,25,14,78,255,115,77,26,251,164,214,23,112,193,79,52,226,210,186,144,86,165,173,134],[232,150,88,187,174,107,191,126,175,182,230,67,106,90,22,222,197,31,95,86,219,173,140,63,143,164,9,109,167,166,193,176],[115,194,112,129,106,74,35,78,190,135,145,38,32,92,185,89,213,227,57,158,180,247,63,9,161,17,175,2,230,14,228,16],[138,0,115,29,35,151,240,114,109,224,173,81,148,61,236,79,52,8,121,129,160,241,133,59,33,187,46,220,69,96,165,197]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(30, "n6trz", [[121,48,194,76,49,109,188,127,151,217,50,209,253,20,94,73,111,31,32,61,31,243,29,201,217,68,17,250,76,5,12,189],[239,8,60,238,126,64,32,219,148,200,36,208,44,144,83,207,164,225,91,237,167,192,200,235,164,84,135,219,19,105,143,218],[167,238,38,199,3,77,139,15,215,202,88,244,49,121,55,116,102,87,251,83,4,33,212,242,115,231,75,59,121,32,155,169],[231,158,227,139,224,165,153,135,16,13,155,6,51,127,147,53,199,143,73,104,112,195,250,179,198,91,53,98,103,154,167,205]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("call updateEthPrice", [[70,7,99,113,19,222,77,246,10,33,54,200,109,40,200,2,174,168,114,120,26,143,206,130,110,235,48,195,103,30,1,208],[92,157,209,9,79,35,66,41,193,248,222,170,202,72,160,23,36,200,234,94,144,222,204,124,194,157,251,175,115,111,74,67],[56,43,120,143,164,1,104,99,251,55,45,97,214,33,182,57,205,27,128,106,122,136,169,0,138,222,95,169,217,76,113,119],[181,229,243,153,243,146,199,48,14,43,215,158,138,54,92,202,202,199,122,147,221,145,140,31,92,246,220,102,9,185,60,71]], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("listingID arg", [[168,200,74,198,45,115,238,215,74,96,79,8,55,15,216,151,214,162,141,211,122,186,106,245,134,238,61,153,228,251,138,206],[53,152,168,40,196,66,140,235,164,228,64,94,44,23,51,103,248,112,81,245,255,193,99,135,171,161,196,35,162,243,72,178],[253,8,32,55,94,201,162,207,145,152,45,76,86,154,169,245,205,221,202,181,232,28,151,125,72,86,238,114,12,28,66,103],[230,30,206,16,225,28,166,109,227,37,131,158,104,225,77,110,102,187,196,189,208,158,92,171,130,215,15,86,127,12,129,164],[124,114,248,32,110,35,6,19,228,210,196,142,74,164,19,51,99,15,225,233,34,177,129,28,238,178,212,186,3,81,131,119]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(71, "r3anir", [[87,172,183,187,92,22,109,120,50,58,185,73,19,63,140,103,125,32,90,155,63,40,63,129,12,204,129,161,17,90,143,160],[123,115,185,91,36,118,121,52,128,151,43,188,46,210,253,203,219,205,235,60,186,143,198,168,154,168,244,139,76,174,129,22],[122,174,58,88,184,31,185,74,239,135,91,133,252,10,162,128,150,250,198,207,110,144,161,140,84,42,189,51,199,27,52,50],[20,66,90,41,204,224,227,148,230,59,237,213,202,81,233,204,84,171,52,127,121,184,56,65,204,66,25,132,178,82,209,152],[205,116,197,109,31,73,126,231,77,102,208,255,155,190,18,235,107,108,42,173,195,154,181,154,99,4,246,122,220,212,119,81]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(2014223715, "", [[179,158,156,219,40,134,235,183,36,70,44,213,110,131,237,17,197,68,164,90,226,174,102,20,8,7,215,224,84,60,97,5],[224,81,33,63,60,121,218,228,113,107,78,31,173,136,122,174,131,92,72,165,185,143,41,94,35,66,171,87,21,247,195,44],[143,230,191,201,13,186,45,222,42,13,128,23,232,189,130,151,190,182,196,244,68,200,144,97,109,96,185,76,34,108,102,155],[182,176,158,120,41,129,70,46,20,206,0,227,102,29,120,163,64,34,45,108,239,96,36,68,225,247,107,65,88,186,134,81],[214,210,94,202,198,140,78,12,194,92,48,255,248,98,195,179,166,156,72,251,185,220,28,71,136,132,20,116,238,96,218,113]], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("IsLibrary", [[177,113,61,136,108,220,160,236,67,126,120,17,168,213,75,226,20,190,174,16,174,94,151,143,85,232,234,171,61,241,174,183],[65,190,231,1,89,121,60,228,79,105,230,167,98,102,63,11,148,75,7,105,61,185,18,100,194,72,64,131,31,244,201,116],[128,81,102,181,213,83,13,229,242,81,199,150,165,115,200,203,248,77,58,66,205,200,205,84,19,110,53,27,61,92,250,76],[117,63,91,165,213,238,101,212,102,64,41,132,150,175,127,226,231,230,241,17,102,251,18,39,215,155,244,144,2,67,207,203],[157,52,109,197,121,157,129,103,19,130,97,15,164,46,212,150,203,48,232,224,217,61,179,70,133,167,176,31,139,37,188,13]], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([89],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[3],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(22,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("RevertWithReason", "gzoybr",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("0", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("IsLibrary", "Example",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("IsLibrary", "updateEthPrice called", "costUSD",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("Oraclize query was sent, standing by for the answer...", "PayableExample", "wzwnwb", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("listingID arg", "UsesExample", "Oraclize query was sent, standing by for the answer...", "gzoybr", "6dgvv",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("vr3rye",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 199999,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("wzwnwb", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("trade.totalPrice", 23,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(55,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["Oraclize query was sent, standing by for the answer...","\x19Ethereum Signed Message:\n32","6dgvv"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[142,247,193,41,130,43,37,68,152,144,19,252,145,71,204,102,191,91,82,255,183,121,150,185,31,133,225,14,191,49,155,98],[152,121,118,116,174,242,184,177,126,158,189,13,91,29,182,117,123,118,23,139,78,90,64,23,126,186,184,127,232,216,65,44],[246,130,244,112,62,233,141,74,99,149,171,192,66,182,139,253,113,247,108,183,203,244,120,247,232,190,30,140,113,66,152,58],[141,112,36,90,145,145,95,40,192,56,176,137,29,212,238,212,189,88,88,166,34,119,157,83,8,143,119,61,246,148,206,79],[182,133,176,228,154,139,53,195,254,108,3,194,219,154,236,179,14,87,227,122,178,240,234,129,136,72,112,153,82,176,99,43],[110,127,79,138,0,91,80,165,142,177,119,32,76,210,188,244,64,184,241,247,1,255,6,218,1,87,141,99,113,232,225,67],[171,53,188,53,177,239,153,197,108,24,35,164,72,137,169,143,79,154,24,150,147,216,167,141,175,65,14,120,83,217,153,24]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(2014223714, 30, 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([24,172,157,192,27,212,10,84,20,114,90,209,100,246,105,166,0,165,51,105,99,242,230,213,102,214,67,230,114,56,81,74], [94,30,245,13,136,188,78,66,77,127,163,111,30,25,0,166,74,208,42,185,173,120,226,136,153,29,104,235,67,162,235,150],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([103,56,19,50,18,116,131,93,188,185,170,137,52,122,77,22,124,97,51,160,211,80,175,193,155,146,186,207,15,194,37,178], [1,232,201,2,109,92,140,27,160,21,96,90,198,233,149,227,116,39,238,64,101,70,181,125,234,42,161,173,45,38,71,211], [208,122,123,207,7,206,142,235,255,72,8,195,82,255,106,190,235,145,88,107,109,124,196,16,31,212,93,253,117,218,130,37],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([247,59,64,106,79,31,92,250,193,214,132,173,252,44,145,82,152,169,218,222,131,7,194,239,166,153,2,9,36,230,105,6], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([65,183,135,188,194,87,82,200,19,230,12,88,26,66,153,38,84,123,41,97,54,126,81,211,90,153,165,133,42,238,27,11], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([216,179,21,214,112,84,194,56,70,66,77,185,86,179,131,133,225,122,32,226,14,148,227,236,200,112,179,185,21,128,57,10], "Oraclize query was sent, standing by for the answer...", [42,41,130,223,0,186,2,117,130,203,59,136,120,172,143,77,48,75,42,24,85,97,153,6,223,171,78,89,39,186,221,148],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([226,78,56,240,26,216,141,10,206,2,101,239,45,65,233,109,68,197,193,140,246,30,77,88,208,82,120,104,34,21,66,249], "P", [128,43,60,17,72,204,191,136,176,148,252,94,170,126,44,206,134,169,206,20,193,23,81,98,252,7,83,100,136,139,31,197],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([234,71,87,96,61,199,145,110,204,235,68,28,41,117,125,170,89,81,25,116,120,167,233,44,251,41,59,105,120,216,17,246], [29,17,83,184,97,14,59,196,6,235,214,71,76,65,228,177,183,18,155,132,242,156,158,242,180,208,42,10,144,26,178,154], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([234,71,87,96,61,199,145,110,204,235,68,28,41,117,125,170,89,81,25,116,120,167,233,44,251,41,59,105,120,216,17,246], [17,130,116,40,74,137,177,176,42,212,207,201,91,165,121,125,162,35,37,202,174,80,251,221,241,51,105,91,48,50,200,141,122], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([73,231,73,78,131,130,185,177,200,64,203,123,65,122,169,154,103,178,43,191,48,84,249,137,77,151,207,159,246,89,113,155], [125,106,68,181,52,176,248,233,180,208,143,28,27,71,152,175,85,201,132,29,252,137,199,142,161,170,118,252,182,185,188,5], [221,38,36,83,148,236,209,159,60,99,234,90,110,165,65,168,68,172,155,140,84,244,189,36,113,228,250,36,51,198,107,221], "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([225,84,182,112,112,41,231,21,193,222,36,79,70,214,220,211,41,202,134,101,102,6,124,175,196,230,253,127,219,53,45,130], [100,230,98,152,184,219,165,70,151,239,68,32,200,48,170,114,48,42,64,56,127,64,15,60,124,140,235,186,183,68,253,81], [166,56,6,58,74,39,2,60,203,36,50,66,52,213,12,192,193,78,76,152,35,155,155,65,66,207,85,174,32,85,152,61], "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([170,8,238,100,92,227,79,135,75,225,129,66,198,64,227,0,197,5,171,103,246,22,227,3,169,253,85,63,213,88,229,164], [47,26,167,108,161,42,161,18,215,79,156,90,197,243,248,244,83,177,195,199,138,171,124,214,71,106,229,41,97,183,199,74], [239,18,51,127,197,185,72,76,153,163,127,249,48,235,105,165,72,134,165,6,249,194,4,246,113,173,160,221,110,87,15,46], "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([205,190,134,180,102,204,236,200,238,40,167,40,141,127,198,146,64,42,30,97,51,33,22,144,211,164,19,197,207,101,101,122], [186,72,60,188,89,77,189,244,159,151,194,204,118,158,21,211,55,234,160,137,228,232,135,205,127,113,45,175,53,58,243,206], [132,146,149,116,9,86,67,251,166,64,217,88,23,123,41,53,254,191,213,103,230,227,101,66,145,68,91,245,43,198,205,182], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([246,202,110,23,224,45,164,204,189,180,80,129,14,175,49,120,83,158,244,32,102,120,39,70,112,41,200,243,102,165,156,89], [161,64,250,49,208,54,161,220,68,84,173,65,225,4,195,244,105,86,94,113,68,75,177,173,117,5,189,145,14,204,98,160], [251,198,213,120,8,28,219,51,28,238,217,114,253,63,131,186,21,203,175,28,240,66,143,204,161,46,122,254,215,116,136,98], "6dgvv",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([25,173,98,94,150,2,129,216,162,176,0,71,212,58,253,98,249,120,132,237,34,232,161,36,222,252,44,161,182,14,29,199], [88,255,1,180,247,246,39,136,165,192,149,236,237,146,101,20,123,157,154,149,31,49,39,100,252,6,131,163,130,195,247,41], [83,178,123,41,4,33,52,36,87,162,251,49,166,89,63,85,34,157,131,232,139,164,170,11,135,255,188,106,18,200,222,249], "gzoybr",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([172,20,21,153,231,225,244,150,209,181,205,82,15,140,136,164,127,85,96,30,180,230,124,57,92,68,147,40,185,254,51,134], [99,225,231,116,29,152,188,168,116,74,26,77,12,243,157,252,154,108,121,252,254,28,14,66,94,165,247,57,20,86,15,51], [153,244,64,102,128,60,10,241,78,80,198,252,160,113,48,69,182,55,10,70,130,48,71,206,51,116,219,25,250,114,151,192], "",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([115,61,201,243,172,131,135,223,28,58,253,51,194,7,198,5,76,110,214,143,148,104,255,250,176,176,222,90,65,194,239,99], [2,48,70,215,159,87,63,196,251,134,114,209,232,121,129,249,109,78,60,236,237,89,60,212,164,220,237,74,197,131,211,223], [212,243,19,87,127,93,206,35,244,243,91,211,202,66,15,219,172,238,103,213,35,135,16,29,198,242,252,121,179,86,116,7], "L",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([111,114,179,102,180,9,3,22,68,19,248,227,129,173,80,168,162,38,159,240,155,36,138,2,68,211,51,155,42,189,241,21], 4, 10001, [154,132,105,150,26,63,23,104,249,225,159,24,172,94,202,111,180,14,69,243,186,42,69,49,4,144,18,132,72,92,127,183], 1025,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([151,151,243,241,101,149,222,123,55,106,191,209,208,135,65,160,204,143,51,182,160,236,2,167,140,172,243,112,197,35,62,35], 254, [41,177,30,222,240,132,42,221,253,179,117,87,50,125,25,61,131,162,4,203,211,16,249,49,95,210,157,190,219,71,8,223], [124,200,139,26,33,13,113,106,103,253,27,167,245,12,160,165,194,32,192,192,172,213,146,115,228,254,220,178,12,110,234,125],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([34,99,184,188,98,104,204,210,187,109,90,182,78,63,21,54,117,48,172,195,7,38,246,96,195,187,143,194,143,76,144,2], [47,156,92],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([240,245,7,156,71,48,230,101,95,74,205,106,127,127,115,92,21,38,165,44,174,33,10,163,50,202,95,103,147,99,180,208], [119,38,131,228,159,217,93,138,153,56,221,88,81,125,180,235,9,115,155,76,100,208,39,146,62,134,15,95,54,0,219,153,154,62,100,242,197,192,119,101,194,44,32,27,4,92,45,91,94,219,212,152,34,175,228,2,137,83,217,187,70,212,187,98,60],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
