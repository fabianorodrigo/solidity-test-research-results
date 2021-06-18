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
    contractMortal = await Mortal.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[1],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(49,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("costUSD",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("", 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("L", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(17, "listingID arg", "",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(45, "ETH", "ETH", 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("updateEthPrice called", "costUSD", 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("call updateEthPrice", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(87, "\x19Ethereum Signed Message:\n32", "call updateEthPrice", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(87, "call updateEthPrice", "listingID arg", "Oraclize query was sent, standing by for the answer...", 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("IsLibrary", "IsLibrary", "\x19Ethereum Signed Message:\n32", 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("5ju5yn", ["","Example","call updateEthPrice","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(6, "RevertWithReason", ["P","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(66, "", ["trade.totalPrice","UsesExample"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("0", ["","IsLibrary"], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("", ["call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(0, "mobgj", ["5ju5yn"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(25, "Example", ["call updateEthPrice"], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("ETH", ["mobgj"], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("listingID arg", ["UsesExample","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(3, "L", ["","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(160, "fsqere", ["ETH","trade.totalPrice"], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("RevertWithReason", ["Example","L"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("listingID arg", ["costUSD","Example","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(32, "Oraclize query was sent, standing by for the answer...", ["","call updateEthPrice","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(64, "8zjsf9", ["fsqere","costUSD","call updateEthPrice"], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("PayableExample", ["UsesExample","call updateEthPrice","n7u8b8m"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Example", ["5ju5yn","ETH","n7u8b8m","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(59, "updateEthPrice called", ["n7u8b8m","call updateEthPrice","PayableExample","5ju5yn"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(256, "P", ["RevertWithReason","P","call updateEthPrice","updateEthPrice called"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("UsesExample", ["ETH","trade.totalPrice","5ju5yn","n7u8b8m"], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("0", ["\x19Ethereum Signed Message:\n32","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","\x19Ethereum Signed Message:\n32","Example","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(10000, "call updateEthPrice", ["updateEthPrice called","Oraclize query was sent, standing by for the answer...","","trade.totalPrice",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(33, "8zjsf9", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","costUSD","5ju5yn","call updateEthPrice","costUSD"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("Oraclize query was sent, standing by for the answer...", ["L","n7u8b8m","costUSD","g8hot6","IsLibrary"], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("L", [[169,205,197,200,176,36,98,80,212,15,146,36,88,188,247,125,161,50,56,86,105,148,199,241,112,240,237,129,249,91,185,104],[48,163,144,19,203,198,160,197,153,6,16,40,77,16,8,79,67,200,105,79,135,93,9,64,173,134,37,72,64,32,250,236],[31,215,37,139,137,249,59,45,166,34,22,72,214,230,217,215,22,111,50,42,125,142,71,100,27,45,191,88,101,86,247,58],[18,94,214,96,132,208,98,95,198,121,45,240,236,12,111,155,192,102,162,117,211,202,193,126,186,41,216,162,249,121,178,53],[124,82,39,171,188,252,203,217,183,38,78,113,47,111,66,209,19,22,105,185,163,6,3,146,15,29,157,111,220,230,229,182]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(10, "gz0e5g", [[12,17,220,9,164,125,34,234,7,19,129,163,129,235,72,198,84,69,150,218,233,26,151,209,90,25,31,94,141,3,155,163],[70,43,195,163,109,179,37,11,99,37,254,52,226,236,209,80,222,212,91,46,5,48,244,11,245,199,90,126,245,130,205,23],[20,188,41,234,198,97,222,191,103,108,150,19,44,75,232,129,110,244,82,209,248,136,84,211,210,156,133,132,165,202,167,72],[1,85,238,81,64,187,200,125,245,234,144,118,27,192,242,151,183,111,113,97,22,179,241,19,68,228,117,67,204,131,67,66],[7,133,16,119,237,150,184,95,181,201,99,38,204,28,72,132,20,176,250,32,189,74,200,206,11,128,55,149,76,33,225,143],[119,74,79,166,213,183,62,98,151,34,212,201,175,127,145,113,214,8,60,98,113,25,96,142,191,38,174,192,231,56,205,209],[213,158,163,87,107,83,129,11,122,96,52,137,34,20,61,45,201,248,206,217,124,244,4,195,75,205,11,104,86,9,238,31],[0,205,87,204,212,174,76,47,214,212,5,171,61,192,109,122,156,56,53,141,70,213,85,163,181,16,48,46,242,44,110,98],[182,25,187,35,233,13,188,68,227,183,158,50,74,161,211,162,43,154,111,218,149,129,118,2,249,148,238,244,17,78,31,112],[230,82,96,102,133,171,124,107,200,239,96,153,148,251,144,168,182,122,232,245,173,167,15,29,248,183,58,33,236,48,55,73]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(56, "UsesExample", [[142,198,50,33,43,171,200,85,2,168,254,160,244,60,189,63,90,201,193,142,159,11,237,120,167,154,68,44,90,175,172,234],[23,160,237,119,237,8,200,65,167,85,101,128,38,181,184,156,109,65,132,166,221,219,4,216,11,212,181,205,175,104,81,241],[185,220,11,163,118,254,55,22,72,99,180,33,74,120,206,27,35,72,171,6,83,63,14,197,92,26,61,164,43,24,80,29],[94,80,112,124,178,138,230,202,89,7,167,154,116,224,1,179,222,226,160,196,81,202,184,161,66,234,153,15,76,101,106,246],[54,227,212,136,207,198,171,233,206,124,163,221,168,202,193,248,94,58,235,249,54,224,164,145,185,103,94,25,198,52,215,141],[164,108,113,27,103,36,225,50,167,26,169,253,190,212,157,229,249,30,16,216,225,158,19,81,128,86,23,136,39,136,75,38],[177,57,164,41,249,208,23,167,134,87,17,144,212,23,167,130,88,8,141,137,204,123,57,182,154,242,71,176,202,45,216,56],[113,196,13,212,84,193,150,221,207,79,203,203,75,148,144,195,86,203,132,63,240,1,101,102,124,196,148,32,123,235,38,82]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("mobgj", [[160,179,167,43,99,132,74,33,107,227,102,166,123,174,153,147,239,50,193,195,214,102,102,90,71,38,19,99,133,148,153,55],[128,134,101,188,238,203,7,39,69,253,43,253,226,97,145,92,45,5,45,69,239,209,221,247,192,165,131,93,213,131,10,203],[228,11,198,233,122,58,147,8,144,2,238,13,219,217,165,172,154,62,52,199,249,76,56,110,142,64,9,5,212,235,9,29],[148,51,189,201,140,7,89,56,254,220,40,119,107,105,74,0,7,59,60,29,208,220,38,191,9,188,176,34,178,67,128,150]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("P", [[110,125,237,75,26,155,26,137,85,157,18,218,96,76,245,139,16,181,167,95,169,234,82,10,13,217,237,115,203,208,199,87]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(161, "trade.totalPrice", [[94,57,182,148,113,218,28,47,211,8,0,85,255,226,194,4,206,193,131,185,20,13,38,218,139,225,14,198,250,255,207,96]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(60, "mobgj", [[167,54,190,154,116,237,65,81,192,58,105,2,98,225,227,111,227,107,87,241,44,136,176,226,35,144,87,179,81,176,207,116]], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("mobgj", [[187,26,33,111,90,164,180,7,151,190,230,55,250,54,35,5,224,33,79,98,155,100,94,152,99,167,253,50,167,12,20,58]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("listingID arg", [[207,185,25,83,8,245,39,61,134,165,201,163,34,166,110,222,255,108,135,101,173,85,250,240,191,188,12,53,111,185,203,50],[125,6,128,134,5,160,192,89,31,160,16,167,174,3,27,66,35,15,2,192,222,120,143,117,24,183,35,11,90,119,46,146]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(7, "Oraclize query was sent, standing by for the answer...", [[144,46,4,0,20,118,121,42,145,94,147,69,120,239,131,187,98,138,82,79,128,94,247,196,11,255,222,141,166,81,248,19],[82,111,178,14,33,0,212,115,190,107,79,220,199,42,249,15,48,131,110,179,157,170,39,151,28,65,35,33,3,126,120,51]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(11, "", [[94,32,23,69,230,11,170,218,13,55,105,215,246,171,173,105,97,160,16,104,205,218,125,175,6,6,78,102,40,240,207,141],[76,185,119,15,23,110,234,74,30,49,164,7,132,143,37,70,113,14,43,170,56,135,34,217,156,135,186,230,61,224,132,105]], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("UsesExample", [[102,47,68,253,199,3,187,166,111,102,130,103,224,231,221,147,125,108,147,140,136,29,197,3,212,226,33,161,127,192,145,94],[48,131,34,15,64,169,68,63,24,119,159,160,109,134,94,9,218,143,134,166,247,47,142,252,124,200,166,67,62,197,36,165]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("mobgj", [[22,80,250,230,170,126,115,87,254,144,220,171,6,122,14,33,203,25,110,90,94,252,83,93,56,32,130,165,19,30,63,213],[10,244,100,162,43,133,195,84,77,112,97,73,190,249,227,103,221,66,62,144,254,135,111,97,111,233,223,173,252,230,72,73],[0,196,12,254,71,251,164,205,86,206,14,239,225,192,216,245,44,18,215,172,232,63,123,52,218,12,29,112,57,247,141,190]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(200001, "listingID arg", [[158,28,92,251,115,124,138,111,106,68,54,84,241,169,114,212,59,139,155,180,137,50,76,79,141,228,226,199,142,73,198,75],[144,5,117,190,255,220,90,84,241,129,149,13,141,90,97,57,249,171,21,111,20,211,224,105,142,35,181,177,95,7,102,152],[41,35,24,135,126,145,58,79,238,8,2,178,216,18,138,61,37,231,185,149,7,179,146,178,143,253,130,218,114,191,89,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(0, "UsesExample", [[239,121,204,97,180,205,39,71,70,241,5,165,243,65,172,11,66,98,48,161,215,15,117,212,242,48,233,5,84,210,60,252],[105,121,134,38,120,138,81,178,62,185,139,144,130,24,144,79,216,5,240,217,105,145,201,29,195,228,193,177,39,114,126,253],[146,202,185,28,185,171,21,208,17,156,49,58,81,134,63,53,232,242,254,156,30,13,183,55,60,40,104,20,148,63,92,198]], 10001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("0", [[10,232,140,148,5,157,176,239,255,236,72,78,158,201,62,47,127,243,105,234,26,166,32,157,183,71,46,123,106,215,204,35],[53,252,67,104,15,224,15,48,195,154,28,126,232,107,243,251,232,220,224,66,138,1,43,14,209,42,29,77,166,18,44,214],[17,137,235,15,103,41,1,138,54,244,102,113,206,230,10,1,96,103,6,80,107,10,25,171,126,101,27,117,54,42,135,126]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("n7u8b8m", [[14,77,254,150,42,116,93,194,36,67,63,121,147,255,125,140,211,163,125,188,120,163,233,244,115,180,151,56,245,157,120,34],[161,186,50,113,147,208,228,0,83,58,107,198,117,250,60,172,237,104,57,40,114,140,248,180,44,6,234,16,132,81,168,249],[209,162,25,199,25,249,160,10,205,103,198,1,178,240,174,19,128,55,255,14,8,243,223,11,72,44,206,112,205,187,228,74],[237,92,42,53,141,70,84,43,84,71,190,83,43,94,52,136,213,162,87,161,183,140,24,130,75,166,53,27,236,78,196,97]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(98, "P", [[136,55,168,11,40,238,184,204,196,195,91,148,125,132,179,8,248,169,173,85,196,111,101,123,14,72,87,10,197,122,16,90],[49,221,29,132,238,69,235,116,19,238,150,159,35,11,122,88,8,98,215,95,153,75,156,36,143,22,144,43,90,76,1,130],[37,114,203,216,244,209,199,202,168,141,74,63,250,1,80,51,147,218,91,60,171,167,39,174,79,50,211,149,29,122,3,62],[224,168,52,174,176,218,146,97,215,187,117,49,113,112,35,39,25,131,11,120,217,139,34,247,184,176,58,201,164,54,217,227]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(95, "ETH", [[229,159,209,178,45,231,216,183,208,154,94,246,138,41,235,253,180,183,53,45,102,103,244,132,108,239,2,186,87,191,140,198],[174,112,173,47,88,53,249,194,244,44,53,7,243,161,152,9,174,83,208,83,230,130,223,252,239,65,89,226,37,45,229,3],[130,204,191,188,45,26,73,233,23,92,165,29,113,12,232,24,132,82,248,59,86,78,218,188,194,157,40,152,140,235,188,77],[161,205,183,49,55,87,61,17,243,55,121,59,71,220,178,107,49,147,215,174,59,133,10,235,3,56,225,200,161,196,225,95]], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("Oraclize query was sent, standing by for the answer...", [[222,96,70,9,138,14,7,174,1,76,11,56,90,150,2,213,226,155,198,135,103,188,115,93,220,255,162,178,213,155,225,156],[122,149,207,79,214,86,143,224,82,43,201,79,255,86,52,146,239,194,240,73,231,51,52,80,216,248,39,122,107,220,8,34],[238,127,46,66,255,97,186,166,118,214,203,31,170,231,52,53,78,192,196,254,155,120,66,48,235,215,41,114,152,20,201,136],[21,107,160,76,177,185,202,29,211,186,5,139,141,32,190,155,23,121,103,185,255,167,218,34,158,205,87,237,215,5,254,51]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("RevertWithReason", [[242,100,97,63,134,219,105,58,62,169,38,148,115,248,34,150,125,169,163,58,183,162,23,216,243,13,67,242,6,168,209,205],[254,140,123,241,145,24,108,164,31,27,172,218,129,223,220,247,17,76,155,98,227,208,11,24,45,114,80,11,105,202,145,172],[253,192,205,45,115,59,90,191,63,212,68,199,31,78,44,74,192,103,217,160,70,154,181,55,135,67,238,1,224,66,115,96],[225,152,225,229,20,6,197,226,55,102,176,44,20,221,140,80,211,238,247,120,42,187,98,75,249,181,9,111,170,50,2,31],[218,103,56,79,206,70,140,90,66,117,74,156,220,164,174,205,11,25,147,182,62,111,61,65,139,41,126,195,234,9,206,170]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(1532892063, "L", [[227,174,83,106,84,205,153,180,34,99,24,64,53,20,238,70,93,67,249,131,167,98,146,170,68,226,140,189,21,92,56,97],[99,46,58,157,102,27,56,18,85,30,97,174,87,93,194,106,156,165,76,222,137,218,135,243,241,168,211,181,103,140,11,134],[234,36,114,193,213,163,227,52,166,154,232,185,102,200,152,188,148,253,158,174,14,226,123,249,39,95,60,252,152,44,163,64],[94,255,130,188,155,86,248,161,243,13,46,48,162,28,202,182,44,37,103,31,254,122,139,109,69,95,57,63,67,254,70,121],[203,64,38,245,253,69,3,101,231,102,82,193,2,184,37,174,191,50,67,166,162,209,19,141,66,18,76,248,168,198,240,225]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(65, "g8hot6", [[229,7,154,187,170,189,6,92,14,137,104,23,87,130,10,11,154,34,54,229,186,175,252,43,135,150,142,158,138,200,94,211],[185,119,52,148,111,126,88,160,126,20,246,82,27,225,64,254,77,126,179,76,100,178,222,206,20,6,131,131,39,243,72,229],[41,32,157,162,13,57,93,173,14,46,131,194,83,22,50,18,222,153,132,88,75,95,100,82,3,32,16,157,94,36,71,213],[209,204,104,147,240,220,7,77,77,197,205,61,187,163,22,197,69,238,7,156,12,18,124,242,203,78,78,47,182,215,210,182],[167,148,28,1,157,177,163,59,30,32,29,59,134,30,154,196,32,167,6,233,202,186,110,114,177,141,205,125,107,223,144,163]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("0", [[239,8,121,135,6,168,175,7,111,248,69,71,7,8,113,128,143,221,180,122,236,144,117,254,93,156,122,255,126,228,244,172],[166,56,162,165,240,85,71,168,115,33,65,192,200,16,73,242,126,173,117,158,27,250,133,140,113,251,17,57,206,214,173,94],[208,136,83,205,115,195,160,185,72,148,81,237,70,249,162,147,131,219,69,19,6,0,191,122,184,45,26,126,197,121,64,227],[122,219,43,235,30,195,255,183,73,211,207,235,62,54,229,67,223,102,214,197,70,35,43,43,198,144,23,243,39,73,149,133],[253,36,170,139,157,123,142,218,28,99,101,26,146,216,148,109,188,215,19,56,152,39,86,127,60,147,55,183,252,163,178,217]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([200],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[0],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(3,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("o8hfz8", "Example",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("8zjsf9", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("5ju5yn", "UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("5ju5yn", "joc2m", "UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("\x19Ethereum Signed Message:\n32", "ETH", "call updateEthPrice", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("\x19Ethereum Signed Message:\n32", "joc2m", "", "trade.totalPrice", "8zjsf9",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("UsesExample",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 162,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("o8hfz8", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Example",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("IsLibrary", 1025,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("costUSD", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(1336,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["listingID arg","","L","o8hfz8","L"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[72,150,170,153,153,228,124,196,166,169,236,178,113,165,153,22,34,151,137,42,35,246,100,23,75,154,36,22,84,166,183,199],[166,18,82,237,202,48,99,94,67,212,107,231,122,128,189,199,210,92,208,56,149,204,156,104,129,97,7,104,204,204,161,136],[207,213,171,202,241,19,112,145,105,85,134,143,217,177,70,39,67,208,137,38,204,130,170,71,154,204,160,26,53,79,103,168],[66,218,186,251,74,222,255,142,96,200,253,7,187,119,115,56,113,100,99,71,65,78,239,163,199,168,105,202,99,41,56,61]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(19, 65, 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([118,64,10,214,114,229,215,124,156,187,239,90,125,114,140,17,102,238,75,139,157,12,55,194,168,53,130,82,98,172,95,135], [232,35,224,233,111,35,22,129,75,157,245,215,39,113,102,151,45,254,102,114,178,237,135,98,231,184,59,10,234,121,249,227],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([109,193,121,250,75,174,236,120,48,250,206,165,145,182,222,110,182,204,186,208,182,100,154,121,56,253,190,36,74,70,111,3], [43,79,104,96,190,85,79,201,10,252,123,110,170,107,117,3,105,132,13,37,35,205,243,120,43,126,53,131,50,18,79,44], [148,117,209,17,30,173,89,98,133,70,141,74,74,243,255,189,67,144,249,177,80,52,145,197,217,16,219,24,48,180,66,46],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([0,192,231,229,100,82,85,51,67,217,208,192,173,110,235,211,144,61,235,146,129,145,209,35,34,105,214,43,91,54,177,31], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([246,201,175,59,209,73,209,134,4,122,10,155,214,49,90,255,117,190,192,29,165,75,12,198,194,111,3,164,53,39,104,49], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([69,193,93,160,40,164,80,221,103,107,20,126,177,249,215,175,119,188,247,40,19,103,158,94,245,232,121,163,12,159,133,45], "8zjsf9", [225,143,77,221,126,87,119,145,27,244,36,8,36,68,18,132,200,46,8,238,103,211,20,122,39,116,131,0,238,163,127,85],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([104,203,134,6,184,247,73,53,82,117,36,226,148,216,116,51,128,122,104,85,37,199,240,186,101,212,80,252,44,218,44,129], "fsqere", [144,188,246,69,254,5,96,86,14,100,26,247,113,27,0,33,247,83,113,4,217,204,32,212,56,215,188,78,102,91,40,113],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([240,168,215,117,102,248,164,208,32,208,106,79,159,170,31,37,229,123,215,250,186,153,15,206,41,169,210,172,49,107,71,246], [230,224,132,188,61,80,204,131,138,164,11,50,213,225,88,209,5,23,148,246,119,154,22,222,206,102,118,0,96,151,147,156], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([240,168,215,117,102,248,164,208,32,208,106,79,159,170,31,37,229,123,215,250,186,153,15,206,41,169,210,172,49,107,71,246], [210,141,98,133,2,216,189,35,66,3,20,220,19,55,64,139,95,242,206,115,228,150,134,101,226,59,213,172,63,108,2,177,23], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([17,198,169,170,76,9,75,215,230,172,156,139,64,203,200,214,187,77,251,148,153,213,146,202,105,202,56,76,241,144,34,166], [168,153,197,158,95,109,89,2,184,45,138,19,221,253,82,164,233,37,133,2,47,24,171,123,21,202,214,78,236,123,54,62], [63,132,221,88,59,147,149,39,130,212,231,104,83,49,239,24,58,247,106,157,87,9,33,153,36,150,6,142,176,114,0,51], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([246,12,145,10,23,204,138,145,89,60,142,20,183,138,160,38,161,112,8,84,5,134,164,124,81,53,57,242,179,209,116,213], [196,69,226,240,30,52,39,55,165,142,187,210,52,39,176,44,219,142,111,2,186,169,184,132,35,97,22,10,139,242,33,24], [134,220,65,212,52,176,250,200,111,46,53,2,255,106,30,167,22,26,0,21,99,136,24,243,50,109,140,5,27,122,216,191], "o8hfz8",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([186,147,53,65,5,37,36,240,213,154,145,81,146,199,125,93,184,24,243,41,197,223,230,81,170,245,120,179,239,72,142,193], [213,73,144,20,254,189,87,180,90,204,83,33,114,41,36,106,226,76,52,95,207,31,17,237,29,56,75,212,65,16,235,179], [189,60,65,237,124,46,175,114,173,152,203,50,129,147,66,173,199,108,243,239,241,197,107,97,122,119,103,191,177,37,139,126], "n7u8b8m",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([102,117,119,35,8,0,199,162,58,7,55,126,1,99,117,39,25,192,130,175,46,130,174,195,173,228,127,97,111,115,247,126], [106,130,28,39,1,236,163,196,84,41,56,31,102,240,82,161,93,236,117,29,71,190,89,211,176,82,233,135,143,180,76,197], [124,73,132,182,7,207,161,1,18,175,245,21,154,254,79,161,136,44,35,237,15,105,215,247,164,93,165,131,250,204,213,243], "fsqere",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([61,43,168,37,26,64,178,233,91,181,195,178,26,250,126,104,248,140,126,171,149,220,139,33,188,224,157,165,215,208,198,207], [25,66,167,33,69,236,133,50,164,219,151,233,91,18,98,38,235,125,87,188,174,39,201,234,234,203,31,51,28,92,138,57], [213,10,51,81,69,156,114,13,241,154,63,154,15,102,222,22,181,162,237,110,139,223,20,9,160,166,118,145,132,59,127,191], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([37,213,107,234,100,75,119,25,140,96,206,219,155,24,255,139,44,220,43,189,120,143,83,169,213,230,217,94,201,114,181,137], [173,10,163,109,65,53,100,136,4,85,254,33,160,231,228,189,82,232,130,249,34,4,52,13,154,198,216,44,199,199,109,91], [45,0,148,118,15,238,47,106,250,125,237,28,210,128,124,55,238,105,197,120,75,8,234,189,199,134,101,122,156,254,32,244], "o8hfz8",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([173,227,141,231,79,95,59,224,179,69,202,7,0,242,221,160,237,193,205,152,17,97,202,231,6,141,59,187,24,168,194,250], [22,144,194,68,77,65,76,106,157,131,104,10,18,108,108,86,18,33,234,143,133,195,21,92,226,18,108,27,176,189,155,13], [238,28,196,68,248,55,91,153,5,255,72,16,117,1,13,116,209,250,223,203,90,157,96,13,123,177,51,254,64,54,54,226], "joc2m",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([145,124,142,139,194,74,75,86,70,218,35,189,24,152,245,238,133,35,179,251,20,145,11,91,116,100,110,43,4,38,125,244], [96,189,105,195,96,2,130,191,186,164,107,38,87,114,89,45,195,223,64,177,56,23,124,18,77,199,17,202,190,167,109,106], [167,41,133,81,253,78,91,93,230,107,16,181,218,229,141,22,0,150,134,136,24,20,7,188,240,126,183,160,98,55,54,69], "joc2m",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([222,129,168,214,15,79,38,105,191,203,60,5,203,197,153,165,30,135,155,236,96,93,150,221,109,112,247,26,79,72,207,248], 1023, 28, [146,121,147,85,145,83,167,226,5,38,148,206,186,207,229,175,218,240,56,17,90,231,2,94,148,242,86,137,6,30,69,69], 33,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([237,155,77,103,20,201,241,29,162,161,160,119,137,176,42,91,220,114,105,125,34,225,83,141,38,156,128,77,218,182,226,49], 22, [164,32,25,68,107,110,120,58,35,111,150,8,115,82,46,133,113,44,2,183,40,83,95,34,86,39,40,28,153,112,99,247], [171,185,113,230,190,245,119,130,145,201,162,207,19,54,254,96,58,241,3,43,109,190,224,111,155,38,251,254,147,92,98,136],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([176,197,60,128,26,155,60,61,220,198,202,4,161,152,33,63,121,250,4,222,241,116,133,124,101,119,105,59,207,236,123,163], [241,23,250,18,87,79,239,225,106,141,40,10,223,139,219],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([230,210,116,30,180,200,220,99,137,56,54,58,253,221,119,0,195,180,172,33,180,38,93,32,59,83,71,225,213,173,245,154], [33,20,225,202,167,122,58,253,101,160,193,101,119,50,239,243,135,205,242,139,11,43,85,81,192,166,238,37,96,69,12,119,187,110,69,136,53,55,23,238,44,200,153,162,105,206,188,84,229,250,38,52,94,144,58,31,117,156,233,29,69,202,242,123,86],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
