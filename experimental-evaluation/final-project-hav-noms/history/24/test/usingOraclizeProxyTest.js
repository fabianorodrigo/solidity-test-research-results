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
    contractShartCoin = await ShartCoin.new({from:accounts[1]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[1]}');
    contractState = await State.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[4],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[5],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[9],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(65,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("updateEthPrice called", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("ETH", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(66, "trade.totalPrice", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(9, "trade.totalPrice", "trade.totalPrice", 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("ETH", "Oraclize query was sent, standing by for the answer...", 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("trade.totalPrice", "\x19Ethereum Signed Message:\n32", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(66, "0", "costUSD", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(95, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "\x19Ethereum Signed Message:\n32", "listingID arg", 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("IsLibrary", "", "L", 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("listingID arg", ["RevertWithReason","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(88, "trade.totalPrice", ["0","hwvvlh","IsLibrary","fosxvj","L","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(2014223715, "ETH", ["0","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","PayableExample","hwvvlh","UsesExample","Example","IsLibrary"], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("", ["0","P","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","trade.totalPrice"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("updateEthPrice called", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(3, "L", ["RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(33, "\x19Ethereum Signed Message:\n32", ["\x19Ethereum Signed Message:\n32"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Oraclize query was sent, standing by for the answer...", ["P"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("hwvvlh", ["RevertWithReason","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(96, "updateEthPrice called", ["711mim","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(200000, "updateEthPrice called", ["RevertWithReason","ETH"], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("listingID arg", ["RevertWithReason","711mim"], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("wqtaz7", ["L","\x19Ethereum Signed Message:\n32","hwvvlh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(57, "fosxvj", ["listingID arg","UsesExample","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(96, "Oraclize query was sent, standing by for the answer...", ["L","L","711mim"], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("UsesExample", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was sent, standing by for the answer...","trade.totalPrice"], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("ETH", ["\x19Ethereum Signed Message:\n32","fosxvj","","ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(9, "fosxvj", ["trade.totalPrice","IsLibrary","ETH","wqtaz7"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(96, "trade.totalPrice", ["0","L","RevertWithReason","IsLibrary"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("ETH", ["costUSD","Oraclize query was sent, standing by for the answer...","711mim","\x19Ethereum Signed Message:\n32"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("hwvvlh", ["","qkpaq7","","qkpaq7","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(162, "qkpaq7", ["hwvvlh","711mim","IsLibrary","ETH","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(19, "", ["qkpaq7","ETH","qkpaq7","Oraclize query was sent, standing by for the answer...","\x19Ethereum Signed Message:\n32"], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("ETH", ["RevertWithReason","updateEthPrice called","UsesExample","Oraclize query was sent, standing by for the answer...","call updateEthPrice"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("P", [[4,11,146,173,84,40,141,154,56,218,192,155,66,27,227,36,203,162,226,101,52,195,63,67,93,182,31,225,120,4,229,92],[77,194,211,213,68,31,33,154,165,179,213,248,72,124,57,180,244,142,30,184,64,236,223,6,144,63,67,142,67,179,180,155]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(8, "UsesExample", [[1,59,186,213,215,138,181,82,168,218,104,93,153,58,238,108,201,163,69,10,13,186,88,173,52,247,234,69,206,234,230,72]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(19, "updateEthPrice called", [[180,189,158,114,199,244,23,94,175,190,29,65,65,94,242,180,152,246,184,211,112,72,30,163,169,75,91,85,128,49,170,146],[127,102,82,144,92,201,106,7,127,248,5,164,115,8,180,202,70,154,220,210,13,48,109,37,43,116,127,47,169,13,97,251],[35,13,151,91,187,63,7,153,161,138,83,236,129,162,209,101,91,135,127,245,219,180,118,3,20,208,109,114,169,196,55,33],[117,154,145,222,36,21,172,23,68,167,194,220,140,241,191,239,27,224,59,136,211,186,68,75,1,82,210,177,72,16,127,134],[167,203,21,125,143,51,47,34,86,241,208,16,236,190,32,37,24,47,41,21,111,198,41,122,6,13,234,25,235,80,251,189],[83,14,164,48,107,201,128,88,189,57,210,84,0,11,144,251,141,162,253,76,242,108,37,164,191,50,25,142,166,144,111,213]], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("ETH", [[190,205,81,171,170,78,103,240,142,89,223,224,183,20,199,22,28,251,68,172,115,88,66,242,3,70,251,89,54,220,191,29]], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("PayableExample", [[16,80,85,209,117,117,154,106,215,227,147,246,39,81,211,218,81,100,48,65,29,175,252,107,51,151,26,231,239,241,25,17]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(30, "711mim", [[27,72,55,184,28,206,98,14,45,255,55,91,54,162,7,213,215,69,233,123,229,187,231,73,208,106,125,206,44,57,90,1]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(162, "PayableExample", [[189,19,64,7,235,179,161,244,244,223,151,135,78,106,136,68,166,117,161,39,141,19,147,213,19,228,169,173,169,5,144,28]], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("", [[76,154,183,82,113,171,1,234,95,98,207,5,177,110,217,89,19,63,58,88,168,124,120,15,237,33,60,229,46,164,69,111]], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("qkpaq7", [[76,251,238,45,242,70,100,34,32,195,184,27,188,241,213,157,205,56,213,177,149,250,45,66,135,43,161,152,0,152,90,51],[209,180,19,162,101,174,170,111,213,5,76,10,121,177,14,169,105,77,60,170,158,198,125,34,127,22,25,142,85,87,216,172]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(0, "call updateEthPrice", [[139,253,31,98,40,105,103,10,140,190,161,112,106,46,35,108,176,82,75,64,55,68,171,61,255,154,12,61,77,187,172,134],[90,189,241,34,7,44,1,191,242,102,52,46,26,134,72,120,202,250,194,206,124,216,43,108,106,176,78,112,179,1,43,176]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(31, "\x19Ethereum Signed Message:\n32", [[122,198,159,217,155,95,126,223,127,70,141,89,185,125,110,17,133,105,217,180,33,221,45,143,224,7,64,7,224,192,182,181],[176,50,250,72,79,199,254,165,8,215,116,195,27,23,71,158,37,14,146,69,158,118,15,120,211,134,205,80,27,116,62,210]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("P", [[47,217,91,84,30,101,0,42,215,179,23,54,96,112,57,197,151,30,143,234,76,206,238,195,189,75,30,208,83,124,21,152],[253,133,238,228,171,253,143,89,144,103,160,156,57,23,21,86,30,101,171,7,119,169,54,40,179,141,169,36,26,84,72,231]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("IsLibrary", [[47,151,53,157,52,186,190,228,246,192,132,57,223,41,184,219,149,114,175,139,50,46,134,104,232,146,170,236,58,135,82,149],[197,191,154,215,143,22,14,203,52,150,38,41,127,162,181,175,149,25,73,43,25,27,133,18,3,6,213,119,54,33,205,68],[234,195,96,169,211,173,135,246,149,16,17,36,35,82,238,210,46,16,215,249,89,55,120,199,21,115,107,71,137,219,131,234]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(2014223716, "PayableExample", [[145,247,72,143,137,32,37,101,145,141,5,21,40,7,85,53,110,206,2,131,190,165,17,121,75,164,141,205,84,208,19,237],[198,108,104,74,8,183,181,87,141,9,55,53,66,131,167,48,235,133,70,110,13,4,134,34,224,18,219,86,76,84,71,199],[17,199,220,63,30,139,231,242,205,254,230,143,53,251,114,9,237,245,133,93,62,66,117,155,138,193,160,80,174,203,110,132]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(64, "updateEthPrice called", [[47,165,206,196,231,68,133,134,96,53,17,2,180,211,235,98,132,148,216,178,164,130,12,198,74,246,110,68,246,74,174,224],[142,188,96,128,131,175,136,53,162,243,197,7,135,157,242,239,12,76,73,77,62,95,201,240,103,104,141,13,232,242,177,138],[91,159,194,199,143,143,57,196,110,4,48,227,13,111,219,150,143,112,72,253,110,25,246,51,124,30,20,203,123,31,147,193]], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("hwvvlh", [[2,30,138,18,196,61,204,170,146,162,228,191,225,254,43,140,41,118,146,6,245,48,34,56,192,102,45,65,188,64,163,219],[174,46,14,10,186,149,223,123,4,225,41,116,253,241,46,94,212,137,165,145,212,43,168,83,22,176,168,252,6,161,184,33],[77,63,151,47,176,86,189,19,150,227,173,16,31,101,197,83,102,37,34,233,92,62,10,9,47,128,160,93,63,189,169,76]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("eom53s", [[72,153,188,156,33,127,11,221,5,77,233,64,160,0,40,181,234,89,248,173,142,231,50,70,8,185,75,254,51,103,208,124],[79,217,118,229,230,112,161,183,216,124,9,109,93,119,37,74,123,46,219,132,254,97,191,63,136,117,201,110,107,54,161,19],[88,131,29,72,9,123,151,180,152,168,201,34,164,85,181,20,173,182,103,83,75,24,146,55,75,224,94,140,215,97,47,222],[206,207,219,54,27,185,10,41,253,77,226,135,167,40,217,171,55,137,61,58,197,181,156,180,238,208,210,59,176,181,215,95]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(63, "listingID arg", [[184,218,193,78,129,159,26,37,197,3,225,48,111,217,151,186,49,231,1,92,180,158,197,167,22,71,138,171,161,18,244,194],[178,80,79,129,143,114,157,211,39,16,95,251,152,209,203,59,247,238,30,29,35,211,195,219,27,146,140,231,176,114,98,2],[43,104,183,101,11,36,152,221,173,201,199,21,10,202,149,161,106,70,224,157,190,119,187,243,242,173,144,21,16,87,183,73],[48,229,171,138,73,67,213,176,150,35,150,124,9,154,1,117,121,137,128,48,123,80,231,212,58,231,189,205,124,251,1,236]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(200000, "Oraclize query was sent, standing by for the answer...", [[241,106,176,211,222,218,179,38,28,34,7,68,4,155,103,83,117,123,91,163,116,119,219,68,161,29,201,223,233,244,182,150],[217,229,140,216,125,98,92,82,75,24,157,92,97,17,102,119,179,208,177,63,180,6,153,193,59,77,219,161,141,39,99,97],[15,243,47,61,147,19,1,117,253,98,87,1,212,248,214,64,180,136,98,44,108,196,41,28,246,94,118,25,254,38,74,231],[157,205,182,0,254,68,75,6,28,206,200,108,161,95,221,215,111,65,213,197,160,65,96,109,221,143,110,78,122,23,155,193]], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("listingID arg", [[194,33,67,72,91,197,149,116,34,232,109,201,55,86,46,181,59,35,32,26,106,112,183,47,180,188,210,174,54,63,240,52],[214,225,43,76,78,246,97,23,14,191,251,65,59,207,30,91,49,215,61,173,103,58,112,249,221,116,53,12,78,252,21,123],[20,6,47,26,9,243,150,46,60,252,127,181,29,183,120,144,215,79,32,76,126,72,25,161,60,159,10,225,203,222,55,193],[62,142,120,53,116,20,232,64,135,182,252,188,56,123,38,214,232,239,181,215,170,57,164,36,176,109,125,68,170,244,148,92]], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("Example", [[86,35,113,138,111,67,144,192,214,112,59,175,179,137,101,143,174,86,95,198,220,249,75,141,162,195,56,83,190,188,161,191],[52,89,160,152,79,218,71,200,0,189,242,160,25,54,165,242,179,173,235,117,29,119,97,220,15,218,163,51,25,247,42,88],[12,242,63,182,133,159,192,62,227,17,112,86,112,165,2,142,67,49,137,94,40,90,218,157,112,216,45,32,169,21,225,71],[203,6,97,88,252,123,29,39,31,38,147,219,243,141,161,102,38,22,39,125,118,207,241,86,7,177,233,174,255,38,116,16],[69,194,151,213,253,246,206,104,104,232,224,238,186,1,79,70,77,143,206,219,235,134,89,86,201,8,32,57,99,124,106,123]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(10, "fosxvj", [[83,60,225,10,175,91,164,12,48,161,210,97,130,189,205,198,211,231,229,155,233,106,22,42,151,66,13,255,250,51,187,163],[95,66,109,68,64,249,212,224,181,222,57,182,152,102,9,42,193,38,30,90,138,175,222,57,85,187,92,86,252,58,110,216],[158,105,199,122,6,11,118,34,24,95,42,48,127,249,193,165,23,164,90,28,182,184,220,176,130,80,16,155,231,140,98,67],[112,85,181,196,227,219,240,113,187,122,245,10,188,224,210,90,133,118,202,228,20,153,90,161,214,218,83,12,75,50,170,161],[11,99,232,178,249,113,158,4,224,210,223,213,237,29,214,43,157,198,141,103,231,52,254,180,161,186,226,162,242,40,97,250]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(161, "IsLibrary", [[85,123,13,30,21,17,159,37,175,8,251,8,139,82,160,146,74,131,172,137,203,236,137,76,91,225,246,170,165,237,66,77],[169,158,73,177,54,42,61,82,124,84,224,119,223,167,255,89,53,42,4,248,125,82,27,96,88,131,225,83,88,197,170,242],[72,101,18,2,46,11,110,61,94,157,218,227,203,180,169,219,195,10,180,232,182,72,196,185,235,117,144,234,97,163,205,128],[79,238,169,117,49,60,89,253,65,179,10,206,220,12,186,10,253,99,151,114,211,74,16,223,40,186,191,243,46,132,24,227],[49,181,136,77,240,130,124,34,211,131,251,53,104,147,39,109,136,213,240,234,204,44,249,244,50,246,192,79,52,51,165,174]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("call updateEthPrice", [[0,193,19,103,242,7,220,117,141,165,73,179,99,239,247,101,102,130,241,22,92,243,54,66,108,48,235,188,153,94,175,13],[92,150,134,198,123,229,126,35,2,81,46,14,81,221,137,190,126,193,93,122,198,217,215,191,163,226,65,50,40,155,118,43],[46,233,138,213,250,62,98,199,169,141,225,112,93,130,190,225,142,25,32,122,13,83,48,186,207,1,82,216,107,168,107,119],[90,123,182,97,200,200,88,197,129,226,52,68,137,136,154,243,27,133,27,63,67,185,118,146,209,232,5,13,104,2,151,160],[100,53,19,165,27,113,215,178,71,91,78,47,191,39,108,7,60,44,202,58,46,120,74,241,218,83,150,157,152,199,2,197]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([68],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[1],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(65,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("p9hnhs", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("PayableExample", "UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("qkpaq7", "PayableExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "IsLibrary", "costUSD",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("0", "UsesExample", "9px8vr", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("eom53s", "call updateEthPrice", "ETH", "wqtaz7", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("listingID arg",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ETH", 33,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("ETH",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("wqtaz7", 15,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("0", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(5,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["eom53s","Example","hwvvlh","Example","L","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[20,190,31,152,104,212,47,163,211,133,41,174,224,241,234,58,246,79,6,223,191,254,164,236,212,75,47,112,241,167,35,18],[211,127,193,162,23,206,83,35,137,29,12,98,91,233,153,105,149,70,137,127,235,38,30,172,74,123,56,200,166,244,93,169],[252,218,25,183,108,173,70,174,116,10,210,2,136,69,236,17,112,188,117,124,102,16,124,46,20,236,68,7,179,48,41,39],[117,100,148,35,234,133,182,251,205,158,28,154,220,174,76,210,41,255,186,215,108,233,229,155,21,210,76,135,228,2,39,7]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(160, 1532892062, 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([109,203,28,15,25,76,51,6,241,222,12,211,174,251,72,175,125,178,171,180,68,254,167,251,33,125,163,221,52,9,124,192], [31,4,78,254,43,66,26,8,245,96,153,50,238,105,142,201,82,120,247,165,102,108,74,129,115,82,14,9,4,3,8,41],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([119,209,42,103,204,21,64,170,6,11,69,155,149,205,189,251,137,238,63,143,167,254,245,160,173,49,170,213,19,140,103,203], [161,30,100,74,41,104,180,141,91,137,102,143,136,248,232,137,183,244,250,35,128,216,74,176,197,89,7,15,118,34,242,99], [131,174,89,16,72,151,43,9,40,172,229,152,133,184,43,83,6,28,210,126,222,129,15,58,116,9,84,105,203,242,124,68],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([207,182,204,169,217,125,67,193,122,186,201,116,118,178,47,71,236,102,176,33,247,136,125,162,180,76,201,253,182,117,205,64], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([213,87,181,143,42,219,104,136,157,253,114,107,93,75,72,157,122,65,130,6,187,134,251,113,13,18,198,234,62,218,231,72], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([26,57,253,75,92,169,69,222,111,45,95,163,48,43,135,243,3,208,0,16,17,164,86,164,15,228,16,230,59,159,47,16], "Oraclize query was sent, standing by for the answer...", [9,33,23,249,78,237,188,17,90,101,155,146,152,42,205,83,192,153,132,231,60,227,219,185,203,7,157,104,154,11,197,2],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([118,217,196,223,95,29,39,178,189,100,142,5,161,4,35,209,69,13,151,20,127,227,210,131,174,24,136,122,160,192,180,35], "0", [112,22,196,215,94,67,233,160,32,216,187,90,43,178,26,32,134,102,89,215,69,52,7,148,91,218,106,7,76,9,93,69],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([145,137,230,100,0,251,223,51,44,221,109,60,121,106,108,139,110,151,123,253,182,154,78,187,186,234,150,211,13,238,195,89], [96,102,231,217,189,65,203,123,224,168,32,37,102,209,211,1,95,165,108,123,127,78,0,252,149,34,130,2,17,65,107,84], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([145,137,230,100,0,251,223,51,44,221,109,60,121,106,108,139,110,151,123,253,182,154,78,187,186,234,150,211,13,238,195,89], [175,62,34,159,83,98,154,220,39,126,211,161,125,226,57,99,85,19,196,95,225,252,51,106,9,83,161,89,79,224,170,191,80], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([193,202,223,192,175,206,179,142,82,103,124,222,159,65,157,57,207,94,37,248,205,133,107,176,49,4,135,27,74,142,22,141], [99,166,252,131,86,107,206,148,123,247,155,131,193,133,167,101,219,128,189,108,98,110,55,37,87,210,113,251,243,152,224,179], [131,122,183,195,51,167,30,167,61,83,204,221,68,152,83,92,15,7,21,205,185,4,72,103,59,242,127,170,221,175,186,100], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([142,102,205,190,188,27,40,17,14,192,115,159,168,194,124,133,155,145,10,5,133,141,226,7,189,31,215,56,129,2,156,3], [64,42,181,204,139,65,93,176,74,45,65,38,11,104,151,183,40,117,55,241,193,77,244,56,249,179,221,26,178,224,109,132], [220,212,62,186,20,254,211,35,125,89,239,195,187,202,115,71,182,155,119,173,110,70,112,132,233,175,190,7,100,32,213,107], "hwvvlh",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([23,52,248,237,60,60,87,41,229,65,200,29,124,112,208,193,228,122,92,198,175,11,203,251,180,124,250,53,221,146,175,28], [206,129,218,249,43,71,186,239,81,141,211,98,139,58,117,81,253,197,229,56,6,12,18,111,120,13,215,51,217,228,101,27], [159,236,227,65,61,245,122,167,250,239,154,99,110,30,221,3,134,240,157,235,225,155,164,206,65,94,56,252,150,151,56,95], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([15,85,214,22,129,2,76,83,73,69,146,4,145,212,76,228,187,207,232,105,112,88,81,61,196,147,112,31,44,69,51,37], [74,16,195,6,210,236,196,99,154,228,112,234,172,159,244,84,208,153,33,89,249,232,22,100,216,199,159,108,76,23,231,36], [240,64,27,187,103,47,28,211,92,65,116,17,6,162,17,210,180,154,16,232,167,111,219,23,47,102,158,80,196,83,62,206], "p9hnhs",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([239,189,14,188,183,112,194,199,50,231,158,151,47,174,131,88,151,90,14,211,216,22,92,71,211,254,80,169,146,90,212,210], [97,2,50,208,38,223,198,40,209,158,166,10,10,225,109,110,93,205,189,170,148,173,135,75,44,45,21,0,84,105,106,222], [98,199,250,203,25,167,54,9,37,167,120,223,61,177,192,134,116,144,242,37,136,252,221,251,149,75,90,89,135,103,41,60], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([220,181,122,67,55,42,33,230,230,2,130,233,215,88,188,225,36,178,135,190,156,107,28,161,191,195,0,195,105,135,180,217], [16,155,217,238,174,8,168,43,148,167,220,55,172,87,218,111,55,85,9,74,10,180,158,0,122,166,248,70,85,45,202,87], [157,32,82,233,165,44,188,69,145,31,106,102,65,138,73,125,0,134,52,14,141,195,8,147,36,72,150,111,119,58,90,238], "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([240,172,8,50,105,206,143,162,169,100,139,28,83,62,14,167,47,244,79,21,150,250,244,24,103,96,48,0,251,36,232,22], [57,174,102,105,28,124,163,198,189,109,129,178,240,78,165,207,6,214,138,255,13,252,57,151,240,148,202,205,212,167,22,185], [183,224,30,101,162,173,49,137,243,207,223,221,2,249,116,157,189,253,33,58,7,101,250,247,107,86,217,48,151,48,242,77], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([135,35,114,70,196,9,218,32,134,253,190,164,147,112,79,9,203,185,205,162,72,100,228,11,208,37,71,100,83,196,216,199], [115,153,32,189,228,104,140,123,48,216,70,55,228,246,35,28,155,41,203,102,197,15,167,248,201,96,163,97,213,92,181,11], [182,171,206,204,255,131,193,75,118,239,228,237,232,217,2,96,99,219,80,82,75,124,16,1,17,99,139,26,102,97,245,130], "9px8vr",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([234,45,91,21,230,132,29,205,212,217,54,208,154,72,222,134,68,17,136,113,121,196,132,157,68,104,251,18,156,18,219,20], 200000, 97, [252,21,162,176,138,28,186,221,14,113,200,98,71,76,42,27,115,193,95,128,136,37,164,14,188,180,223,22,45,30,32,40], 1336,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([193,191,34,168,156,47,21,5,67,35,37,106,210,226,152,192,134,40,24,36,53,236,240,63,68,100,35,115,67,111,54,72], 162, [89,168,5,8,251,133,244,204,40,109,54,125,31,40,119,191,186,188,252,247,160,89,200,161,131,43,244,251,199,224,202,7], [58,221,126,245,57,154,8,115,112,65,218,250,123,182,178,151,38,247,142,201,40,222,0,38,121,47,121,92,29,213,2,37],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([245,224,174,169,153,23,208,57,60,124,108,134,211,67,13,117,239,77,192,147,189,63,2,178,40,113,253,118,197,84,236,93], [221,232,111,37,192,82,142,109,32,199,189,72,50,55,232,183,143,176,243,26,170,44,175,59,124,29,115,30,210,139,77,204,131,222,33,133,43,64,163,62,154,250,86,166,201,181,49,211,59,114,252,222,104,45,68,75,9,180,59,149,189,149,39,20,60,57,1,44,143,248,112,39,28,178,179,91,173,54,129,157,147,141,39,177,151,124,106,134,159,67,114,27,132,37,190,202,148,199,40,199,250,169,130,116,43,142,77,59,69,252,240,20,200,179,253,153,94,236,167,64,121,114,141,43,155,254,169,254,18,144,169,188,175,196,177,61,182,147,216,110,116,186,225,144,125,217,14,87,189,90,243,13,53,154,149,66,172,25,253,105,83,176,84,27,194,207,208,151,123,169,71,253,82,220,189,27,53,13,70,199,193,87,182,149,78,147,170,102,61,251,252,47,15,175,199,193,31,118,181,110,113,55,29,196,101,246,123,126,23,153,194,163,186,3,248,249,54,207,56,196,191,165,212,243,86,74,182,14,216,123,90,233,122,58,110,166,180,39,150,251,171,108,52,14,209,230,153,241,205,204,55,37,192,106,208],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([240,18,47,186,102,56,177,139,103,70,11,81,191,232,234,132,187,86,134,182,38,213,161,180,97,190,49,139,136,197,223,254], [220,36,157,230,140,193,72,186,6,77,43,117,196,18,70,222,63,13,207,99,40,136,236,254,45,83,98,40,154,33,91,5,207,128,117,52,248,159,214,10,153,151,227,156,77,30,250,85,199,90,186,63,203,96,120,212,56,99,192,255,207,112,228,227,65],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
