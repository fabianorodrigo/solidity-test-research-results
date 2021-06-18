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
    contractShartCoin = await ShartCoin.new({from:accounts[7]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[7]}');
    contractState = await State.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[1],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[3],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[5],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[1],contractProxy.address,contractTokenExchangeState.address,"PayableExample",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[1],contractProxy.address,contractTokenExchangeState.address,"PayableExample",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(2,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("L", 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("P", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(103, "P", "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(0, "", "call updateEthPrice", 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("PayableExample", "0", 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("L", "\x19Ethereum Signed Message:\n32", "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(95, "RevertWithReason", "Oraclize query was sent, standing by for the answer...", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(2014223715, "IsLibrary", "Example", "\x19Ethereum Signed Message:\n32", 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("0", "costUSD", "RevertWithReason", 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("\x19Ethereum Signed Message:\n32", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","IsLibrary","trade.totalPrice","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(5, "P", ["ETH","trade.totalPrice","PayableExample","0","costUSD","call updateEthPrice","0","RevertWithReason","call updateEthPrice","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(22, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","call updateEthPrice","Example","ETH","RevertWithReason","RevertWithReason","PayableExample"], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("IsLibrary", ["RevertWithReason","PayableExample","UsesExample","trade.totalPrice"], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("RevertWithReason", ["RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(61, "Example", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(17, "costUSD", ["trade.totalPrice"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("costUSD", ["Oraclize query was sent, standing by for the answer..."], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("listingID arg", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(10000, "PayableExample", ["","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(20, "IsLibrary", ["Example","costUSD"], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("P", ["UsesExample","Oraclize query was sent, standing by for the answer..."], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("", ["\x19Ethereum Signed Message:\n32","trade.totalPrice",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(87, "updateEthPrice called", ["Oraclize query was sent, standing by for the answer...","L","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(18, "costUSD", ["Example","IsLibrary","IsLibrary"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["updateEthPrice called","0","UsesExample"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("0", ["\x19Ethereum Signed Message:\n32","PayableExample","\x19Ethereum Signed Message:\n32",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(56, "UsesExample", ["","UsesExample","L","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(10, "RevertWithReason", ["ETH","PayableExample","updateEthPrice called",""], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("", ["trade.totalPrice","ETH","0","P"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("costUSD", ["L","0","RevertWithReason","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(47, "UsesExample", ["RevertWithReason","Example","UsesExample","ETH","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(23, "P", ["","Example","Oraclize query was sent, standing by for the answer...","izzibk","Example"], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("L", ["call updateEthPrice","trade.totalPrice","call updateEthPrice","ETH","Example"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("listingID arg", [[18,41,175,129,233,67,132,153,253,175,5,111,221,94,169,6,205,226,62,17,240,154,63,246,63,136,3,114,135,94,48,140],[179,238,239,1,184,8,190,35,213,101,212,45,114,204,78,149,210,112,113,221,60,95,134,56,156,148,199,7,132,49,62,175],[159,13,122,155,158,248,85,181,64,186,41,153,96,182,108,6,4,51,226,171,81,64,171,2,55,16,49,63,198,18,137,99],[170,14,87,71,84,142,139,213,2,198,144,71,159,57,13,91,171,26,158,138,107,210,195,131,188,11,68,101,70,195,66,182],[221,50,253,23,244,86,223,74,159,69,160,223,159,116,20,164,116,133,27,202,163,161,203,27,167,239,89,16,66,211,38,16]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(61, "IsLibrary", [[10,217,172,221,132,61,74,56,245,237,176,16,248,201,84,69,54,172,200,25,77,67,249,48,68,242,137,247,58,8,118,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(102, "", [[148,183,88,239,216,82,159,129,42,90,152,163,232,46,145,17,120,82,148,19,42,82,253,234,214,5,155,112,88,203,201,97],[116,82,31,17,9,8,1,52,54,249,84,5,213,82,139,133,132,25,38,83,79,13,248,143,238,221,54,101,240,111,170,68],[235,183,207,15,75,184,239,222,210,0,1,58,119,140,142,176,3,199,218,165,40,5,176,202,49,50,190,244,6,144,131,57],[40,68,134,156,185,225,165,148,79,65,90,106,61,242,116,17,18,25,16,128,109,51,161,129,177,162,200,173,191,19,10,43],[37,222,146,119,25,131,108,25,156,186,163,254,199,234,120,98,104,193,125,126,225,179,200,234,59,152,203,3,16,13,29,18],[247,16,30,77,129,125,121,86,107,29,74,123,11,255,78,166,7,174,208,177,169,176,253,84,107,26,20,113,103,40,165,114],[131,137,174,183,173,6,129,81,84,104,200,142,94,205,6,22,118,144,1,89,23,58,62,80,38,153,224,29,210,12,45,190]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("xsyfrf", [[150,182,68,190,95,1,167,124,9,60,211,156,215,214,72,2,2,151,47,88,173,77,66,46,118,248,93,110,201,8,218,23],[103,188,167,215,181,167,25,148,213,200,81,189,234,138,161,185,245,169,102,1,17,184,62,217,170,173,192,86,216,203,19,62],[151,152,139,10,193,85,220,127,238,188,242,113,225,135,120,192,21,231,213,3,0,20,37,131,171,91,240,18,45,163,199,145],[67,54,187,210,175,18,86,203,118,50,122,50,169,134,72,181,151,210,166,232,221,174,38,205,53,19,68,212,185,103,184,15],[150,100,90,6,190,234,237,58,140,15,182,84,213,210,158,54,78,63,203,171,202,174,252,236,131,113,212,237,213,132,145,30],[37,125,75,11,48,209,43,222,119,31,71,174,210,64,2,36,39,3,63,80,172,183,127,11,205,6,140,65,17,94,118,198],[138,9,28,209,240,2,2,76,27,65,166,179,126,153,213,56,152,143,21,16,67,115,181,225,242,137,209,38,6,79,158,101],[244,204,190,99,245,55,202,188,29,153,241,216,250,171,147,76,181,154,255,63,8,0,187,2,217,51,229,114,14,202,28,35],[67,176,192,172,187,41,181,125,180,250,50,33,46,106,154,121,105,240,247,79,73,151,223,196,227,114,103,52,72,224,171,74],[250,129,102,35,249,92,149,198,58,221,239,104,48,254,123,1,74,15,62,181,81,119,124,190,196,180,6,199,136,215,206,31]], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("trade.totalPrice", [[233,195,108,106,202,137,63,19,209,215,155,198,99,151,183,75,71,224,147,95,252,197,60,23,252,163,100,231,64,186,132,238]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(60, "", [[231,208,108,66,162,250,1,7,2,184,179,117,125,130,81,120,149,17,29,197,118,128,253,4,175,123,38,24,78,20,114,168]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(5, "\x19Ethereum Signed Message:\n32", [[249,231,138,254,215,123,41,50,117,107,239,244,241,194,87,99,141,49,124,155,108,5,77,117,112,231,32,144,120,82,141,102]], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("Example", [[178,60,243,138,236,170,179,218,110,19,20,135,24,128,0,31,239,188,126,138,211,31,99,119,32,245,228,182,122,29,239,16]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("", [[61,108,10,219,163,58,125,203,15,78,66,128,196,94,88,255,255,43,116,252,151,29,73,208,205,3,73,215,161,151,186,64],[198,58,57,18,5,172,167,94,90,205,105,172,243,232,216,180,221,82,154,171,163,194,17,85,89,234,162,83,69,58,195,73]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(257, "RevertWithReason", [[27,108,214,28,207,236,253,178,124,134,54,186,149,152,53,100,214,254,177,203,124,110,204,98,58,82,181,14,43,71,0,91],[22,163,165,237,234,155,253,200,67,115,98,150,50,130,29,80,74,73,148,197,137,192,81,171,157,88,162,48,130,15,239,136]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(103, "ETH", [[161,214,252,225,182,200,199,128,17,209,135,202,231,187,61,82,37,234,34,97,150,94,234,88,187,223,25,148,64,66,37,11],[71,130,161,75,214,234,253,33,44,32,138,56,109,34,21,210,112,2,199,184,14,125,247,162,111,155,174,117,193,55,206,145]], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("Example", [[186,183,130,135,21,14,93,113,7,121,7,202,165,227,124,21,38,247,253,60,25,168,82,31,80,43,77,88,77,221,47,209],[211,157,103,253,69,121,251,163,132,196,43,234,216,96,18,250,67,204,213,243,199,20,178,129,32,43,134,212,181,238,247,216]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("Example", [[174,24,115,64,188,91,211,14,57,130,145,127,141,227,134,224,166,104,245,197,205,107,19,252,241,50,37,96,213,109,129,51],[142,164,110,191,27,121,112,158,65,109,179,4,96,175,45,207,234,224,33,86,18,103,171,57,153,82,137,61,159,2,155,205],[143,75,86,176,40,253,76,183,36,239,162,118,224,42,203,35,180,32,196,62,132,149,10,164,216,66,21,80,134,120,0,42]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(95, "UsesExample", [[206,239,64,227,86,159,44,27,140,233,245,34,100,242,16,49,199,66,80,30,77,105,233,105,219,48,77,2,219,35,133,65],[185,195,123,232,228,5,49,16,180,42,237,28,190,95,44,175,94,131,252,102,25,224,202,106,107,123,117,239,248,126,170,190],[18,198,196,45,164,136,0,127,215,191,210,209,202,242,194,145,54,129,101,50,44,47,223,164,242,3,88,111,57,56,83,98]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(26, "Oraclize query was sent, standing by for the answer...", [[70,138,240,217,192,119,95,74,217,198,191,123,99,1,190,36,190,80,41,131,245,126,195,115,54,243,144,248,174,57,71,223],[29,136,12,238,186,85,117,67,139,17,29,249,25,15,135,222,109,191,64,166,76,112,212,175,64,166,245,240,59,136,133,188],[7,189,154,201,225,88,204,2,1,56,252,209,236,130,105,40,84,123,28,91,180,7,39,113,143,83,179,175,13,144,204,21]], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("L", [[110,185,33,62,175,219,97,160,28,26,175,74,220,71,242,251,199,72,63,26,148,41,250,71,113,45,101,161,100,85,106,193],[198,102,81,185,141,116,195,11,144,208,152,112,76,214,223,24,18,157,162,69,61,56,179,1,148,212,229,139,23,179,223,30],[239,155,171,188,186,233,233,191,206,115,146,74,203,129,174,43,203,178,102,135,181,16,5,191,30,77,64,44,2,44,115,209]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("trade.totalPrice", [[23,59,123,89,113,50,167,35,209,149,148,109,214,170,41,156,36,22,108,113,112,109,252,181,93,113,89,44,65,107,251,121],[131,150,180,223,199,255,101,118,241,185,243,139,89,254,91,208,210,189,1,219,81,96,250,87,213,212,83,82,22,182,115,2],[44,101,116,61,97,225,50,179,67,121,16,124,199,12,162,12,182,98,60,255,133,51,103,174,2,184,61,236,168,184,3,146],[212,198,180,176,61,180,13,112,33,172,180,11,155,107,1,46,32,88,66,253,36,29,245,125,51,115,174,125,115,51,40,229]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(9, "17r2p", [[102,134,205,63,249,57,247,211,204,162,39,185,219,95,183,175,189,62,201,66,206,22,135,198,206,51,82,156,238,237,25,92],[6,187,89,64,62,133,241,26,70,97,236,84,240,115,24,122,231,70,71,174,241,125,106,218,132,42,15,92,165,77,85,221],[12,80,248,190,0,80,244,20,54,89,177,139,3,4,31,97,3,253,135,95,97,22,59,14,144,5,54,44,165,187,214,67],[220,6,112,123,91,119,111,28,153,214,187,141,21,224,161,62,148,81,79,172,175,60,99,144,112,200,120,150,118,24,172,120]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(160, "updateEthPrice called", [[65,151,185,205,195,68,192,25,165,255,153,75,240,105,151,242,109,58,111,8,214,95,31,136,166,204,111,29,111,50,146,221],[105,30,49,32,236,87,157,16,100,27,170,211,186,151,8,201,9,238,154,13,75,57,52,154,75,67,147,255,75,162,54,141],[166,159,28,160,47,185,237,247,246,142,78,69,169,167,148,49,93,107,96,190,149,208,197,117,250,60,150,218,123,255,24,195],[114,210,192,241,214,47,76,161,218,19,77,239,84,178,186,181,235,54,43,60,76,87,11,163,227,206,31,247,134,47,118,248]], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("gb0gwi", [[187,44,212,170,130,17,23,100,194,78,143,22,47,132,101,113,88,103,85,240,100,134,151,251,136,117,146,88,70,194,19,157],[179,140,18,200,139,88,97,161,211,122,78,80,28,114,21,70,71,180,76,23,12,145,43,79,104,48,254,158,5,36,216,18],[145,215,177,59,212,189,53,177,164,7,212,154,141,196,62,179,175,197,27,79,39,223,225,154,78,28,214,51,239,125,85,61],[251,152,182,121,35,171,238,111,42,73,250,155,114,239,173,47,60,17,182,76,163,109,232,149,19,190,183,126,0,135,235,255]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("UsesExample", [[75,146,51,10,128,210,164,229,188,73,56,38,103,47,102,252,54,198,223,93,4,47,115,246,144,225,141,122,22,207,146,161],[196,35,219,249,159,154,149,158,60,103,207,186,119,180,128,187,29,115,172,101,148,98,166,148,30,47,113,43,89,173,167,48],[4,208,135,163,48,67,18,241,103,16,89,160,111,3,65,127,48,30,215,83,101,19,169,164,37,22,133,249,181,239,205,252],[30,56,67,145,156,90,249,201,240,104,76,186,123,2,233,155,109,148,200,176,188,59,180,140,61,246,208,39,233,101,236,171],[123,190,25,127,34,226,158,249,112,113,251,27,44,237,210,235,134,107,232,33,67,188,18,217,12,236,103,253,122,181,151,223]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(257, "P", [[72,201,57,105,225,10,196,2,160,113,50,90,30,12,236,181,50,254,134,231,77,32,126,196,182,185,8,184,75,166,61,217],[90,57,8,135,119,24,42,112,248,150,3,131,192,189,214,125,31,171,217,60,150,193,209,8,77,168,222,14,219,39,141,174],[96,88,68,34,15,91,211,69,240,30,56,9,16,48,83,32,243,224,154,63,127,49,58,0,124,244,120,201,109,232,200,1],[49,68,248,215,0,164,116,83,199,124,176,193,127,205,17,237,246,51,11,139,247,63,106,46,45,144,143,1,2,86,158,141],[31,223,235,254,153,50,22,207,171,172,236,135,33,153,117,163,18,182,106,203,148,95,214,247,230,150,207,72,139,218,61,46]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(30, "17r2p", [[47,79,85,208,209,114,140,68,229,128,34,70,156,6,65,65,91,156,96,145,21,119,207,222,96,80,227,229,84,111,225,156],[43,247,108,57,104,232,221,108,21,63,100,62,120,78,234,39,11,35,208,198,41,65,11,133,183,77,235,222,91,209,45,235],[51,28,73,242,194,168,24,134,254,28,103,119,172,244,190,66,118,168,15,173,88,109,124,164,14,94,5,55,4,84,91,226],[62,231,248,202,152,140,71,31,80,99,225,209,172,55,253,16,37,187,80,154,96,203,83,184,34,160,4,148,91,146,205,7],[19,9,244,182,54,230,66,78,200,240,108,233,105,20,103,48,219,150,252,195,208,114,4,199,210,184,158,154,36,186,244,74]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("UsesExample", [[122,71,205,78,130,182,224,236,92,169,161,78,1,32,218,2,215,112,226,84,233,239,201,34,101,115,196,58,175,111,26,193],[17,164,142,216,4,232,221,166,248,220,178,141,138,104,38,211,91,233,159,40,78,25,144,84,182,224,245,172,186,32,228,11],[139,95,119,22,115,104,212,37,174,206,14,142,58,245,183,193,204,16,254,57,230,144,142,221,96,1,116,13,1,173,194,5],[64,138,59,109,170,152,221,173,177,196,26,132,16,146,202,88,153,108,167,219,22,156,126,202,115,2,76,21,57,213,119,54],[215,220,27,231,107,78,80,172,87,250,28,10,144,121,46,252,204,121,18,131,242,64,199,226,49,171,41,189,167,137,134,254]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([52],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[7],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(23,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("0", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("trade.totalPrice", "costUSD",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("UsesExample", "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("P", "updateEthPrice called", "P", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("2dmos5a", "Example", "updateEthPrice called", "L", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ETH", 1337,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("L", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("2dmos5a",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("qzcq77", 3,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("listingID arg", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(1025,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["ETH","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[148,198,164,35,84,75,156,115,114,159,173,59,20,15,254,64,245,71,148,253,29,217,237,51,98,44,194,222,62,132,44,170],[11,242,10,132,47,192,5,88,192,61,167,225,28,172,140,216,226,105,122,13,189,174,253,40,29,54,50,122,169,128,111,89],[251,164,2,96,87,145,78,248,25,222,218,125,213,197,102,50,128,173,22,229,72,128,158,125,47,213,192,70,150,90,166,127],[110,27,192,66,148,168,179,82,255,235,70,30,84,126,135,61,95,186,22,191,135,170,152,174,212,13,56,121,146,95,141,199],[137,55,155,151,15,113,234,185,96,83,12,18,209,184,138,26,207,144,18,39,32,72,24,77,219,128,197,61,78,214,221,243],[71,185,158,148,136,31,26,190,89,32,126,104,121,85,112,76,248,81,47,171,107,218,69,23,169,105,212,57,151,225,184,162],[21,171,229,99,23,42,211,201,227,62,213,193,55,158,101,243,178,115,37,181,124,250,90,146,80,137,228,35,82,165,8,198],[104,107,184,88,58,172,66,193,39,84,251,217,197,94,126,162,176,90,111,113,190,33,124,12,201,223,5,96,210,170,44,83],[230,88,165,7,215,223,122,181,242,201,172,143,204,149,180,30,6,187,235,169,30,77,225,192,14,104,10,81,202,172,9,66],[0,5,229,61,190,218,34,250,98,135,98,127,130,22,129,219,101,25,69,43,151,247,64,217,189,73,72,221,128,23,54,191]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(15, 4, 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([205,28,245,91,14,53,48,205,166,216,49,129,169,81,26,84,118,240,20,78,200,242,93,233,177,115,62,138,56,229,4,38], [179,220,220,163,91,3,191,95,92,149,134,244,115,241,133,119,12,47,101,246,241,203,51,80,216,202,4,216,33,88,69,245],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([239,175,114,85,123,15,92,152,151,221,18,115,233,83,198,74,74,185,203,131,1,9,222,179,174,63,251,123,20,231,191,37], [27,118,190,204,19,115,40,113,81,116,107,244,212,44,232,139,217,102,204,59,71,197,152,92,111,174,98,0,190,115,236,203], [186,130,253,120,105,71,142,136,211,226,127,112,0,166,208,50,46,127,151,179,155,241,16,163,12,224,99,141,127,122,219,156],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([207,79,96,14,133,65,100,211,251,229,223,29,81,159,199,241,124,235,103,17,187,171,163,115,177,38,46,152,136,99,109,128], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([180,250,148,16,35,42,32,30,41,38,217,90,237,240,156,36,165,19,33,2,223,26,164,81,210,91,159,30,184,56,199,190], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([130,200,206,33,181,12,45,179,121,31,157,167,191,171,163,44,155,164,30,237,173,138,201,141,26,47,214,223,225,70,30,178], "gb0gwi", [141,177,164,79,63,37,51,212,187,178,21,241,195,66,159,22,124,18,105,174,236,209,167,133,202,71,225,30,29,52,161,46],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([123,175,112,167,233,31,54,116,24,150,4,74,194,81,164,57,68,27,247,170,244,121,139,128,175,207,101,148,5,98,218,190], "", [141,106,121,32,167,100,23,56,40,0,220,82,73,154,74,212,12,174,56,69,71,133,139,249,74,27,62,50,241,231,76,25],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([121,217,15,23,73,41,105,172,138,163,74,14,32,151,59,107,126,107,210,24,151,179,49,158,125,172,77,223,32,76,34,149], [105,216,129,230,17,71,240,133,166,255,52,23,93,70,240,34,230,40,53,191,139,232,172,14,139,254,105,218,15,171,27,69], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([121,217,15,23,73,41,105,172,138,163,74,14,32,151,59,107,126,107,210,24,151,179,49,158,125,172,77,223,32,76,34,149], [219,233,89,47,165,73,54,218,202,20,120,214,245,224,180,209,191,113,5,201,106,34,38,71,218,22,196,28,142,135,121,239,89], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([153,112,156,204,252,82,203,36,45,210,87,43,191,29,84,236,176,236,16,241,40,94,94,203,175,91,226,219,175,0,232,249], [32,1,96,151,157,220,141,185,204,195,134,161,145,41,223,92,28,21,62,146,231,53,84,118,66,191,124,16,38,161,206,223], [196,110,148,215,196,141,85,212,44,80,69,217,51,115,170,125,253,75,164,217,99,147,110,35,196,209,235,129,139,141,50,240], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([191,94,106,75,229,59,214,191,53,165,203,57,64,185,99,237,167,51,80,253,135,237,71,97,34,164,199,80,208,42,113,223], [181,202,232,201,115,144,52,129,44,159,208,89,83,154,34,36,26,218,235,205,85,72,147,115,4,251,232,44,91,119,134,125], [146,92,103,155,163,196,84,145,45,116,166,229,234,241,102,195,113,133,29,214,208,96,31,46,49,71,91,158,250,155,28,161], "qzcq77",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([84,113,224,245,218,206,95,135,187,95,203,46,97,99,162,7,17,79,249,177,89,126,102,17,33,133,111,42,174,250,62,207], [160,90,166,113,76,220,103,223,223,99,0,67,87,137,47,64,90,48,17,103,86,243,239,61,71,238,11,105,56,17,25,231], [66,229,111,124,137,53,165,105,205,126,0,144,169,82,183,70,112,220,19,117,103,167,139,67,2,252,253,214,255,54,215,59], "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([59,34,236,213,87,91,96,108,207,32,189,69,44,168,112,88,149,105,94,36,178,140,3,224,57,174,51,213,117,169,26,217], [95,84,61,249,72,218,12,41,165,113,5,94,125,112,200,250,2,212,114,118,237,230,113,138,237,233,139,64,211,169,41,250], [248,57,112,26,69,118,8,157,5,228,118,137,84,188,169,152,38,187,15,185,132,93,87,223,57,54,251,102,87,3,142,3], "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([16,97,100,249,212,201,9,239,128,165,44,251,238,169,152,139,12,62,136,54,227,140,81,154,18,102,255,18,223,177,137,207], [87,232,86,107,166,223,178,81,76,251,231,124,97,235,13,51,102,201,127,4,76,168,87,101,184,12,97,29,160,112,172,16], [177,232,46,114,248,10,166,8,45,20,149,14,78,54,252,136,132,12,195,234,12,144,32,49,63,250,239,52,57,224,149,163], "2dmos5a",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([163,124,7,221,67,15,128,137,92,120,14,18,88,190,30,53,91,91,11,231,134,174,207,192,242,248,193,9,6,147,72,235], [35,68,127,136,229,21,174,141,170,81,210,60,109,137,255,132,190,52,107,248,171,248,128,114,102,193,184,255,161,165,147,240], [98,26,230,68,4,202,110,184,59,66,219,125,163,98,57,39,36,112,48,24,62,130,109,221,178,245,79,114,51,149,50,62], "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([243,187,91,144,245,221,20,225,130,164,165,170,3,71,17,116,174,145,145,154,31,163,23,132,113,247,148,238,92,65,64,15], [190,41,48,142,158,122,73,83,155,15,172,122,76,194,88,70,135,2,44,6,225,56,9,119,60,75,180,239,16,116,131,166], [173,20,190,35,137,222,189,74,230,89,201,121,111,74,141,215,79,81,102,79,226,105,69,134,134,82,177,66,162,174,213,3], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([210,56,219,225,155,254,202,123,27,10,114,73,252,254,161,172,235,227,254,136,148,53,61,86,49,247,173,182,207,25,128,189], [244,253,222,180,4,133,5,65,21,143,74,230,153,125,239,112,18,12,107,59,116,247,57,5,83,36,54,254,166,244,236,127], [173,173,179,126,183,136,100,225,52,12,88,145,191,64,100,228,159,20,24,19,86,37,95,132,189,81,218,32,140,109,138,70], "17r2p",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([26,200,209,21,78,84,144,6,231,233,23,28,101,22,17,40,85,240,194,91,197,7,149,141,145,144,139,215,209,244,161,229], 59, 128, [120,96,146,3,99,65,115,99,55,48,177,131,0,6,197,190,113,112,190,16,77,74,61,193,174,15,1,125,76,232,230,49], 0,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([32,182,85,126,222,153,96,220,160,178,164,150,248,98,138,185,100,48,17,163,93,143,122,96,58,34,139,156,154,92,48,72], 96, [66,102,134,156,227,187,133,41,43,182,180,228,2,9,183,245,221,66,22,173,132,81,171,158,140,156,136,228,21,160,210,13], [17,176,119,79,18,42,179,62,241,214,105,154,249,38,205,201,48,189,50,138,176,160,203,0,176,226,56,117,250,227,120,8],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([50,11,211,57,253,30,1,77,30,208,192,10,197,131,243,79,151,104,119,49,85,67,20,123,67,116,52,231,27,188,252,2], [7,194,187,122,136,78,242,72,68,62,250,138,12,178,142,177,144,254,169,104,69,232,72,106,75,245,219,82,91,190,34,235,127,94,248,68,51,53,8,165,36,255,9,44,252,202,213,219,158,194,229,163,6,245,42,8,213,136,62,142,183,22,161,98,49,204,114,132,52,196,198],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([100,58,236,192,68,129,80,27,131,172,246,17,173,35,202,48,230,82,10,23,92,216,169,13,37,174,138,138,74,144,113,102], [113,144,127,147,115,68,46,55,172,68,72,53,18,46,162,46,231,236,71,188,45,168,154,134,36,107,68,5,232,116,175,4,193,62,135,1,78,245,6,169,251,62,138,29,230,24,184,148,41,5,223,253,122,205,148,229,180,122,60,141,90,215,52,34,147],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
