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
    contractShartCoin = await ShartCoin.new({from:accounts[5]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[5]}');
    contractState = await State.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[9],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[7],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[2],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[5],contractProxy.address,contractTokenExchangeState.address,"\x19Ethereum Signed Message:\n32",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[5],contractProxy.address,contractTokenExchangeState.address,"\x19Ethereum Signed Message:\n32",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(97,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("updateEthPrice called", 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("updateEthPrice called", "Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(96, "Oraclize query was sent, standing by for the answer...", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(10001, "listingID arg", "call updateEthPrice", 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Oraclize query was sent, standing by for the answer...", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("P", "trade.totalPrice", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(59, "Example", "ETH", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(31, "ETH", "PayableExample", "9xpxnv", 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("0", "P", "P", 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("\x19Ethereum Signed Message:\n32", ["listingID arg","IsLibrary",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1024, "Oraclize query was sent, standing by for the answer...", ["UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(10000, "RevertWithReason", ["Example","IsLibrary","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","PayableExample"], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("P", ["ETH","0","listingID arg","updateEthPrice called","RevertWithReason","UsesExample",""], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("updateEthPrice called", ["Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(56, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(6, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["cy1m3"], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("9xpxnv", ["RevertWithReason"], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("ETH", ["updateEthPrice called","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(28, "PayableExample", ["P","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(29, "9xpxnv", ["lj69uj","PayableExample"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("L", ["costUSD","P"], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("P", ["9xpxnv","IsLibrary","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1532892063, "", ["L","trade.totalPrice","kkpt3j"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(71, "IsLibrary", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","L","trade.totalPrice"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("PayableExample", ["listingID arg","ETH","q301hp"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("IsLibrary", ["Example","IsLibrary","trade.totalPrice","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(6, "IsLibrary", ["ETH","ETH","cy1m3","q301hp"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(1025, "k1s94t", ["PayableExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","9xpxnv","P"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("Oraclize query was sent, standing by for the answer...", ["ETH","call updateEthPrice","Example","RevertWithReason"], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("PayableExample", ["9xpxnv","9xpxnv","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","call updateEthPrice","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(257, "PayableExample", ["RevertWithReason","Example","trade.totalPrice","ETH","ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(9, "P", ["call updateEthPrice","0","cy1m3","\x19Ethereum Signed Message:\n32","lj69uj"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("k1s94t", ["P","Oraclize query was sent, standing by for the answer...","L","ETH","call updateEthPrice"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("costUSD", [[178,239,111,140,152,34,177,138,62,253,145,167,18,28,86,74,102,186,77,192,140,230,169,56,228,32,42,198,141,170,32,232],[243,152,107,86,113,211,104,30,236,185,201,133,214,238,46,136,249,156,80,215,231,127,36,210,241,97,191,243,178,17,179,42]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(16, "9xpxnv", [[26,85,205,35,116,75,87,101,215,171,126,244,50,239,251,112,171,177,160,116,166,51,97,74,8,6,13,0,67,125,172,245],[211,165,19,227,83,168,139,45,140,17,198,105,61,143,112,11,52,222,153,218,136,76,57,187,149,144,82,178,235,193,185,231]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(1532892064, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[72,53,171,133,51,251,77,42,244,151,40,19,216,187,253,223,94,61,244,202,49,135,191,149,61,73,16,105,185,97,53,62],[191,18,139,70,104,71,68,139,14,162,19,4,40,146,240,64,223,21,71,182,244,103,213,179,238,191,90,255,156,39,83,192]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ETH", [[4,129,78,32,112,183,142,139,87,65,48,74,23,193,193,40,48,164,103,144,182,124,233,81,200,76,199,44,190,61,55,35],[41,18,173,146,115,236,30,92,222,174,164,98,55,5,86,48,30,182,111,23,68,35,175,51,87,171,146,175,105,17,88,251],[96,223,57,177,72,11,38,183,138,93,185,34,0,114,222,174,193,226,70,127,248,75,54,4,54,24,211,141,94,36,150,232],[214,51,151,142,114,147,34,84,194,245,128,197,69,156,126,144,91,90,66,97,22,206,119,65,238,28,118,18,98,203,36,124],[216,122,163,74,104,213,234,85,200,109,7,165,87,146,186,7,132,192,55,121,242,156,74,113,54,177,95,207,104,225,127,146]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[34,170,119,138,215,0,112,144,214,98,55,223,122,71,127,99,80,249,124,66,89,237,190,8,120,28,117,222,225,50,242,144]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(0, "cy1m3", [[25,202,180,5,240,177,189,95,174,200,13,31,221,152,114,89,250,135,238,77,195,225,203,73,117,118,37,89,214,168,43,103]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(2014223715, "9xpxnv", [[139,78,151,115,107,78,188,186,7,37,33,20,88,41,150,241,6,120,179,156,104,231,229,217,85,106,126,218,65,99,55,179]], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("", [[123,150,170,31,27,206,156,123,44,248,173,0,30,215,79,8,199,203,24,65,214,69,235,112,197,242,137,87,79,127,50,41]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("9xpxnv", [[235,242,67,10,205,10,161,16,48,229,200,214,40,23,85,183,14,128,229,76,175,175,201,253,32,80,21,25,20,134,229,129],[117,69,122,208,11,207,126,109,132,36,74,156,97,90,163,234,239,74,217,5,150,25,227,103,157,107,97,248,118,34,50,63]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(254, "listingID arg", [[47,180,98,99,154,94,50,211,89,8,58,212,122,149,48,177,47,158,217,196,147,62,97,122,14,20,232,76,201,231,96,29],[71,244,159,219,58,150,246,192,59,155,164,53,233,182,185,3,108,245,84,165,156,99,119,164,159,175,61,63,141,123,46,196]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(0, "ETH", [[92,27,217,127,83,177,210,253,182,180,178,72,74,236,42,241,52,120,188,15,245,140,101,69,68,58,36,15,38,229,3,237],[81,195,58,139,98,51,163,214,178,157,87,30,128,86,1,242,13,198,128,122,172,218,65,143,34,214,204,159,106,160,44,251]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("lj69uj", [[145,102,47,214,177,145,110,139,89,5,235,72,205,9,177,91,33,13,206,91,180,150,122,235,35,245,118,15,25,197,185,48],[147,221,246,116,221,154,94,132,104,58,219,223,215,133,126,229,203,33,81,181,38,250,238,43,102,188,252,167,107,57,67,250]], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("L", [[167,121,240,65,93,219,154,58,90,114,38,164,154,48,188,76,173,32,149,122,16,156,58,13,209,193,18,221,6,93,218,112],[89,165,235,238,94,146,6,20,159,167,201,12,23,31,219,65,228,21,233,189,81,76,138,171,153,42,100,118,234,147,47,196],[30,47,22,229,144,246,243,15,205,23,200,25,204,241,209,119,253,127,211,164,64,81,198,228,181,117,0,100,91,25,116,94]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(0, "trade.totalPrice", [[5,176,34,166,127,28,103,225,137,111,105,66,16,25,201,246,82,67,1,84,19,78,49,170,3,208,149,145,36,152,1,61],[8,38,152,214,136,116,133,65,223,244,43,78,143,11,117,211,225,57,157,220,14,246,254,79,121,202,176,49,54,46,220,166],[170,162,177,55,166,125,63,168,202,133,108,187,138,161,71,160,246,24,62,250,78,12,31,103,115,74,80,39,59,215,75,29]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(31, "trade.totalPrice", [[146,117,121,205,246,253,109,68,63,229,111,174,160,92,192,166,207,44,226,108,115,19,160,30,175,123,18,20,50,70,224,231],[61,23,52,9,236,79,53,124,155,52,89,43,58,80,0,58,232,78,189,251,20,232,221,19,107,45,179,80,208,130,198,146],[218,152,71,62,34,168,115,65,192,201,193,10,238,23,142,136,195,209,188,11,57,66,20,13,65,46,163,209,244,118,124,82]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("9xpxnv", [[10,80,205,176,27,216,153,29,28,186,118,140,249,222,252,129,5,219,195,239,71,137,88,101,29,196,177,138,42,253,204,27],[101,70,160,81,113,245,86,8,7,27,254,52,48,139,17,102,161,225,248,54,8,212,90,79,206,149,144,7,25,44,231,42],[124,9,196,115,106,234,99,84,179,60,89,67,117,114,164,116,79,116,162,183,212,219,98,55,178,254,133,12,147,196,191,88]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("q301hp", [[245,47,48,114,154,199,86,144,72,99,30,64,193,128,45,144,144,247,18,45,147,161,72,124,74,206,253,82,166,29,182,250],[220,180,151,134,49,52,71,186,211,85,142,231,77,76,109,29,240,149,136,251,45,233,252,200,133,59,215,222,16,220,179,170],[84,104,26,57,185,250,59,246,145,152,56,161,12,178,214,207,74,75,232,7,73,146,51,43,177,30,254,43,192,65,16,217],[179,254,191,248,133,147,74,20,0,39,214,95,119,89,66,0,89,107,89,92,216,6,76,26,91,145,108,217,166,122,116,233]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(1336, "ckjehc", [[204,47,30,58,42,216,28,241,112,65,97,21,55,206,130,101,4,215,249,5,73,202,249,82,193,51,173,191,19,187,146,134],[167,65,243,179,41,96,220,72,123,241,134,126,147,127,33,62,245,87,229,114,197,240,38,19,248,87,158,39,238,167,201,224],[71,78,236,243,181,127,162,154,206,215,178,74,210,162,136,58,64,171,53,28,212,220,82,150,100,35,58,145,67,61,59,89],[109,70,254,139,7,102,128,23,45,47,226,97,164,239,108,215,166,181,164,113,166,150,166,138,186,169,17,96,240,223,28,213]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(1532892064, "trade.totalPrice", [[85,196,105,153,52,244,221,220,228,32,103,180,62,170,60,24,188,198,64,72,88,249,3,207,217,241,146,119,22,233,60,206],[73,9,170,78,75,65,203,198,172,172,131,102,62,129,99,15,125,250,128,35,138,134,248,30,150,89,72,99,180,14,74,203],[231,205,108,121,49,16,27,118,165,62,125,59,246,149,150,103,249,18,173,123,99,83,24,135,226,254,229,58,54,150,21,212],[85,253,160,217,100,227,8,214,173,64,149,233,133,84,216,30,32,144,60,13,38,131,188,97,192,203,233,45,59,43,228,36]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("costUSD", [[119,236,80,220,234,167,81,251,105,65,154,123,237,112,165,165,36,131,66,98,194,248,196,195,145,192,195,165,157,45,24,200],[207,40,50,103,149,4,251,229,183,82,218,232,109,81,171,126,140,214,21,206,243,198,130,187,89,143,123,4,26,197,12,134],[137,34,225,195,218,85,216,199,17,1,138,112,234,92,179,78,208,218,107,168,31,213,191,56,102,211,11,226,77,64,0,45],[216,171,155,144,72,75,89,45,53,16,88,91,190,196,80,130,33,255,8,187,52,112,212,176,97,101,227,7,24,191,165,178]], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("0", [[247,172,52,194,147,128,142,245,24,75,110,152,131,230,239,80,151,246,162,241,200,246,192,60,171,28,80,81,107,208,251,143],[209,99,180,197,9,203,199,100,1,93,119,214,122,247,80,52,119,89,163,114,226,240,79,72,244,91,59,109,212,222,62,106],[211,140,56,245,45,181,76,237,27,67,113,135,87,75,166,195,31,98,75,136,99,53,129,53,222,185,191,162,91,10,102,2],[210,72,241,138,4,247,171,7,151,65,196,234,243,25,225,215,47,197,47,46,94,72,219,166,69,48,47,119,117,171,74,107],[14,209,164,236,213,99,194,71,81,57,161,47,93,254,166,2,170,210,168,29,1,91,114,224,46,132,189,6,106,77,52,128]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(10001, "9xpxnv", [[159,180,211,48,198,36,8,168,73,2,157,131,27,236,240,30,38,243,179,23,128,53,226,184,37,78,143,247,142,103,213,191],[105,186,33,190,69,68,163,118,28,209,164,25,53,185,244,39,231,122,174,42,13,177,148,166,200,204,113,47,152,220,135,126],[83,243,239,52,3,82,244,7,142,204,94,133,86,117,242,66,124,39,195,197,194,9,26,234,251,196,60,228,173,34,97,63],[192,152,28,65,163,7,209,59,59,144,55,207,109,192,132,41,18,6,12,212,158,210,155,199,35,233,216,103,231,46,110,39],[97,41,253,157,125,125,242,72,62,89,95,99,26,43,154,38,243,249,73,255,42,104,250,44,215,158,160,221,174,50,34,85]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(1024, "updateEthPrice called", [[213,143,17,239,9,196,6,102,117,86,209,76,52,189,232,49,114,8,253,61,118,122,51,238,214,121,200,64,29,164,229,128],[8,91,211,122,25,147,38,136,48,13,48,117,159,59,18,91,138,240,80,78,202,163,169,103,41,48,98,93,206,142,158,53],[39,49,58,159,109,46,3,225,222,178,143,75,26,129,61,5,145,115,166,114,34,58,35,209,24,51,1,204,69,160,77,127],[87,136,123,88,201,132,135,50,198,52,43,193,166,198,172,147,46,255,44,151,152,208,59,110,126,98,232,207,151,13,121,203],[22,82,14,171,192,102,96,150,75,221,143,250,226,157,210,214,204,185,28,41,124,69,124,172,72,169,252,87,93,57,135,193]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("\x19Ethereum Signed Message:\n32", [[18,92,58,8,249,104,12,82,251,9,250,145,132,229,121,116,95,249,58,61,27,232,107,156,32,156,133,199,45,202,230,94],[47,115,232,138,248,97,68,204,242,120,122,35,34,241,89,23,125,151,57,17,177,82,43,212,80,175,161,131,126,22,195,25],[38,237,20,80,153,117,227,112,111,62,42,134,189,16,134,124,148,12,213,211,214,58,154,242,22,176,176,108,116,3,231,2],[3,213,236,205,111,13,193,5,73,100,90,88,67,168,26,0,105,89,178,247,176,130,27,200,178,94,194,246,178,115,74,253],[185,44,234,25,223,76,141,175,250,156,232,234,143,64,100,150,106,41,189,105,7,127,139,215,89,148,171,183,84,189,25,119]], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([147],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[4],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(129,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("listingID arg",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Example", "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("trade.totalPrice", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("Example", "ETH",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("0", "costUSD", "q301hp",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("P", "9xpxnv", "k1s94t", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("listingID arg", "costUSD", "ETH", "trade.totalPrice", "9xpxnv",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("cy1m3",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("PayableExample", 61,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("listingID arg", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("\x19Ethereum Signed Message:\n32", 10,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("f79859", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(49,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["lj69uj","trade.totalPrice","PayableExample","RevertWithReason","q301hp","updateEthPrice called","UsesExample","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[209,15,255,115,154,200,175,198,91,61,139,232,99,137,236,150,232,232,155,108,236,3,195,139,160,7,212,7,60,187,247,99],[212,35,67,43,213,127,28,59,246,104,39,204,105,165,234,140,86,147,175,185,22,47,186,247,217,130,117,12,211,88,4,238],[130,247,172,222,121,38,225,172,157,5,2,162,104,193,205,134,123,123,12,49,221,81,6,45,230,112,208,127,202,202,83,113]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(45, 200000, 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([109,12,105,147,162,80,111,90,196,162,119,159,63,154,10,191,144,22,214,109,43,131,44,13,213,96,197,83,81,89,87,45], [247,185,111,168,142,143,170,148,146,220,193,21,249,229,56,10,8,155,173,194,45,110,43,110,115,12,223,3,230,114,144,209],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([252,181,181,44,17,234,80,212,99,38,3,67,56,105,203,155,161,115,110,222,137,100,223,67,114,109,164,30,9,233,87,179], [75,181,124,105,17,184,23,131,67,176,32,249,151,126,64,175,186,204,228,61,18,18,96,62,191,75,110,114,122,155,79,255], [104,151,3,182,0,201,174,248,126,241,102,178,134,167,43,171,112,140,211,78,186,107,52,107,141,240,69,80,48,15,194,226],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([115,86,100,153,144,117,194,230,146,92,98,104,161,161,226,251,183,90,164,76,174,20,12,210,192,103,180,48,209,41,247,145], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([247,100,76,11,4,120,187,53,100,117,11,162,242,222,22,159,100,198,16,23,191,17,220,200,5,184,90,43,192,247,91,83], 10001,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([44,208,99,131,126,128,112,115,205,127,140,69,139,158,33,242,195,3,198,123,2,115,162,73,27,204,179,122,94,79,112,164], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [57,51,178,211,152,199,28,103,114,67,224,135,110,155,239,233,114,141,97,220,90,101,229,57,114,235,9,23,206,149,9,9],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([65,236,110,50,152,24,197,184,211,84,43,159,5,172,114,170,88,34,140,107,47,14,39,156,237,55,62,56,244,122,139,159], "costUSD", [125,109,95,36,124,22,8,161,161,141,159,83,139,248,83,58,92,135,59,14,52,195,107,85,179,225,193,20,248,210,46,153],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([41,36,109,59,126,31,90,211,24,73,166,170,161,186,26,136,227,239,42,203,200,15,237,236,115,108,182,31,127,85,111,243], [37,76,208,108,204,161,13,104,74,69,66,173,111,46,31,14,92,170,215,196,68,185,27,25,183,47,139,255,221,217,83,176], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([41,36,109,59,126,31,90,211,24,73,166,170,161,186,26,136,227,239,42,203,200,15,237,236,115,108,182,31,127,85,111,243], [31,165,214,120,30,65,176,178,179,193,233,181,179,29,104,22,101,173,235,152,141,243,117,49,74,205,7,14,204,188,246,134,231], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([188,126,125,93,29,230,203,228,241,80,251,130,150,243,102,244,159,44,58,196,194,21,71,34,126,104,191,218,144,73,212,170], [1,43,143,58,253,82,59,44,178,196,36,82,145,174,184,54,213,139,242,20,158,78,90,139,53,89,242,24,121,137,56,212], [184,197,232,96,184,58,26,212,158,236,240,6,69,124,201,184,161,88,227,78,21,165,80,12,154,104,192,132,70,68,129,173], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([37,227,12,246,229,144,124,91,64,209,237,206,164,187,119,69,243,187,177,54,92,148,55,106,241,237,168,207,115,133,177,253], [165,251,108,158,39,182,167,11,128,58,12,68,80,248,43,17,33,81,89,231,115,151,59,100,46,150,153,111,155,51,245,1], [46,149,13,237,100,132,110,1,90,76,48,57,178,127,174,152,199,92,16,77,160,15,30,164,93,117,12,73,147,72,30,10], "cy1m3",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([145,147,12,49,162,237,108,101,128,202,170,125,254,145,149,110,3,41,101,108,174,53,48,119,243,26,96,184,45,212,79,94], [69,173,19,242,187,87,67,251,211,113,111,137,115,46,147,130,244,170,204,179,51,201,36,51,78,77,205,4,218,185,6,97], [12,26,96,176,238,66,108,225,11,117,121,124,249,160,229,13,209,151,237,91,90,149,48,193,142,59,10,198,159,175,139,215], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([69,7,215,199,175,29,157,145,86,140,154,152,207,36,89,130,48,113,227,30,173,246,254,247,53,175,20,212,109,103,176,209], [132,30,239,158,208,6,190,217,29,104,249,15,189,85,132,15,95,62,196,140,192,45,20,4,63,251,0,213,198,121,71,54], [178,61,33,249,53,109,198,158,253,195,201,113,163,205,49,11,109,2,160,217,232,89,77,228,229,76,234,209,112,215,170,107], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([232,218,102,30,172,66,61,172,74,18,21,109,68,200,70,158,85,249,103,133,217,248,95,23,83,31,50,107,243,147,156,45], [100,182,205,222,190,34,229,129,237,76,249,28,86,217,151,204,152,156,187,11,36,8,83,125,152,110,79,156,242,167,33,124], [96,149,72,228,91,79,68,208,144,78,49,54,128,86,192,183,73,179,82,66,156,51,121,94,142,186,12,21,103,82,101,113], "ckjehc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([103,220,200,172,33,4,155,24,160,202,144,46,106,215,16,38,138,137,57,24,196,196,95,120,129,45,11,25,117,80,121,131], [118,13,154,53,230,208,93,62,100,110,49,2,69,18,51,140,0,215,130,78,166,92,222,56,38,176,63,17,247,177,221,148], [169,111,216,175,121,251,94,210,123,73,125,95,168,214,178,127,137,140,217,220,179,138,16,0,252,192,140,62,80,254,189,123], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([29,219,255,239,70,239,180,151,55,166,244,90,25,184,77,242,65,235,193,196,137,104,29,165,247,39,40,172,197,116,207,14], [7,50,3,156,31,238,99,76,108,211,122,222,36,79,109,85,229,146,18,132,83,6,170,71,102,48,30,111,96,57,78,216], [203,100,222,143,32,140,152,110,130,2,69,93,55,21,3,163,47,169,126,134,67,104,151,8,178,202,171,12,121,227,209,131], "ckjehc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([196,30,246,187,218,102,208,171,82,139,57,166,102,245,120,172,253,90,213,225,5,93,19,233,116,129,60,115,42,72,251,144], [83,59,109,150,83,5,32,13,192,98,245,123,9,247,151,106,87,209,118,113,7,176,23,108,149,40,206,34,85,173,248,235], [143,61,202,249,36,153,13,146,209,170,211,88,179,23,223,254,234,36,157,219,104,168,20,123,59,125,154,167,239,128,69,180], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([232,180,125,121,39,42,241,76,126,224,50,184,147,246,128,229,110,62,151,219,178,226,23,45,46,101,127,82,102,13,246,207], 128, 56, [71,97,65,161,139,62,27,90,219,227,122,123,167,149,29,142,126,93,120,136,52,240,214,218,18,115,188,15,51,205,22,201], 46,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([111,231,62,241,129,146,149,29,223,70,206,123,194,48,171,116,240,231,0,246,222,41,99,106,45,253,77,104,47,67,146,116], 95, [204,207,136,180,50,52,111,130,184,146,214,54,81,54,150,182,84,239,117,93,124,115,193,81,159,161,9,57,104,0,61,158], [34,108,121,133,149,71,90,70,200,226,215,191,205,204,28,23,52,147,126,65,167,180,25,170,207,138,88,149,186,50,185,31],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([21,124,154,135,222,92,59,193,222,47,206,174,105,154,196,5,35,121,100,139,182,16,250,58,206,248,238,190,62,9,65,247], [232],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([32,141,205,197,135,75,231,152,195,196,189,105,137,125,95,44,36,6,172,177,251,110,152,233,206,188,165,48,105,182,233,202], [88,202,140,61,186,4,97,179,213,17,153,68,39,137,97,242,75,8,27,2,200,171,147,19,3,234,204,226,97,0,141,53,245,224,104,36,23,22,25,194,80,154,15,197,220,231,216,182,144,38,217,144,214,93,29,56,248,64,218,119,48,192,6,119,143],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
