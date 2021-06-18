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
    contractState = await State.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[6],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[8],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[4],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[3],contractProxy.address,contractTokenExchangeState.address,"Oraclize query was sent, standing by for the answer...",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[3],contractProxy.address,contractTokenExchangeState.address,"Oraclize query was sent, standing by for the answer...",{from:accounts[0]}');
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("0", 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("0", "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(9999, "L", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1, "updateEthPrice called", "updateEthPrice called", 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Oraclize query was sent, standing by for the answer...", "\x19Ethereum Signed Message:\n32", 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("updateEthPrice called", "call updateEthPrice", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(30, "\x19Ethereum Signed Message:\n32", "Oraclize query was sent, standing by for the answer...", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(24, "0cr5qk", "Oraclize query was sent, standing by for the answer...", "PayableExample", 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("", "P", "0", 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["0","","P","listingID arg","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(102, "", ["updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(64, "P", ["costUSD","RevertWithReason","0","PayableExample","listingID arg"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("listingID arg", ["Example","0","ETH","\x19Ethereum Signed Message:\n32","call updateEthPrice","0","RevertWithReason","Example","","call updateEthPrice"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("0cr5qk", ["Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(28, "costUSD", ["Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(19, "call updateEthPrice", ["costUSD"], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("IsLibrary", ["Oraclize query was sent, standing by for the answer..."], 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("ETH", ["L",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(4, "bw0ukf", ["P",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(86, "listingID arg", ["bw0ukf","costUSD"], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Oraclize query was sent, standing by for the answer...", ["IsLibrary","0"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("Example", ["\x19Ethereum Signed Message:\n32","IsLibrary","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1336, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["trade.totalPrice","0","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(161, "PayableExample", ["Example","ETH","listingID arg"], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("bw0ukf", ["trade.totalPrice","0","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("IsLibrary", ["Oraclize query was sent, standing by for the answer...","","0","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(57, "call updateEthPrice", ["zcc4cr","IsLibrary","Oraclize query was sent, standing by for the answer...","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(2014223714, "trade.totalPrice", ["L","call updateEthPrice","UsesExample","P"], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["call updateEthPrice","\x19Ethereum Signed Message:\n32","updateEthPrice called","\x19Ethereum Signed Message:\n32"], 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("\x19Ethereum Signed Message:\n32", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","trade.totalPrice","IsLibrary","","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(103, "PayableExample", ["listingID arg","call updateEthPrice","0","IsLibrary","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(161, "IsLibrary", ["UsesExample","updateEthPrice called","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","IsLibrary","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("PayableExample", ["listingID arg","listingID arg","\x19Ethereum Signed Message:\n32","updateEthPrice called","trade.totalPrice"], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("PayableExample", [[99,191,98,198,22,6,231,27,241,134,55,211,180,134,112,17,192,143,192,105,62,153,205,133,210,53,230,233,120,188,1,156]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(33, "listingID arg", [[14,106,225,57,63,255,104,71,84,54,7,115,108,255,246,110,251,196,215,250,24,58,100,255,175,66,10,41,70,17,85,56],[37,65,72,112,34,88,58,211,49,5,248,94,193,33,99,28,163,131,135,246,216,42,131,58,141,227,210,82,71,211,88,202]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(49, "L", [[44,235,176,44,247,146,108,151,97,56,130,168,167,8,213,57,181,237,191,78,197,43,136,153,20,61,38,82,250,71,194,66],[75,88,15,51,193,173,149,160,96,1,89,165,73,41,184,21,183,92,252,70,38,67,20,11,191,203,80,87,254,14,234,191],[194,214,215,49,95,250,194,216,179,137,238,107,57,235,133,62,63,89,18,170,94,162,154,44,106,106,251,111,45,79,165,5],[122,126,78,205,153,203,85,158,238,36,218,127,112,70,202,160,215,142,48,86,1,232,41,19,140,48,202,67,172,216,249,81],[21,130,251,158,182,139,197,249,100,196,41,112,254,212,74,181,213,185,60,11,75,132,39,252,150,0,148,4,215,85,232,76]], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("trade.totalPrice", [[182,159,99,52,34,166,29,148,22,166,149,6,110,89,176,167,239,16,95,223,9,43,155,144,244,43,213,207,154,233,7,5]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("trade.totalPrice", [[130,45,27,91,62,167,50,144,159,207,190,177,38,48,153,184,23,174,234,198,147,26,61,127,189,149,18,27,118,33,22,28]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(64, "UsesExample", [[141,58,25,170,115,156,187,61,160,136,114,210,121,232,25,63,219,191,187,86,36,78,6,128,174,191,163,67,85,209,22,178]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(56, "trade.totalPrice", [[128,146,148,135,102,62,141,59,253,127,29,228,5,7,28,175,176,251,137,203,96,159,180,238,97,252,55,49,214,1,194,55]], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("zcc4cr", [[153,22,193,102,155,25,6,249,222,138,159,188,244,169,132,178,16,42,30,94,88,218,201,211,179,171,38,39,88,170,71,17]], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("ETH", [[6,144,5,195,125,5,96,8,227,104,105,142,58,234,19,148,213,169,163,54,104,157,19,236,190,70,76,200,5,27,149,141],[92,85,205,47,154,134,166,9,228,230,218,114,15,63,162,142,219,87,78,227,124,143,69,118,68,67,212,4,228,209,37,244]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(5, "RevertWithReason", [[137,80,81,49,242,69,152,99,140,67,195,147,158,243,104,191,183,110,119,163,153,238,135,108,18,186,245,93,68,25,230,215],[19,46,104,95,6,196,19,124,192,49,149,203,86,24,14,38,13,0,63,233,4,81,105,8,58,136,51,59,150,116,130,240]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(22, "", [[96,46,4,93,211,137,97,83,89,234,148,59,155,220,28,120,95,243,185,192,119,88,255,30,220,139,70,68,73,120,38,211],[209,98,25,123,153,101,11,152,228,234,85,93,145,55,255,116,172,249,94,45,2,95,203,162,237,13,197,167,90,26,211,114]], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("IsLibrary", [[5,212,51,159,64,235,24,22,236,6,118,180,153,165,142,39,176,32,15,76,220,140,253,118,21,88,110,76,41,199,202,14],[183,155,7,189,94,159,11,157,36,191,97,236,248,253,11,1,205,241,229,84,253,155,177,173,171,61,103,7,110,211,118,52]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("", [[247,75,149,57,227,3,219,239,173,180,30,243,232,51,120,241,211,209,171,196,6,70,169,139,16,193,27,224,82,191,2,251],[37,12,189,14,59,244,229,205,237,155,255,210,162,91,249,43,220,119,112,201,39,28,125,19,28,159,55,91,227,127,140,8],[70,80,27,95,215,65,166,127,255,166,79,50,219,31,156,65,136,101,16,4,90,177,220,36,85,63,161,166,143,53,224,248]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(8, "RevertWithReason", [[85,190,46,225,50,7,22,209,153,40,178,160,7,31,185,91,147,178,39,0,176,237,97,85,140,242,213,247,57,1,221,9],[37,26,194,41,149,8,54,59,88,122,192,90,16,69,78,245,100,55,17,221,3,235,179,253,169,14,125,201,201,132,24,150],[39,191,78,199,142,60,164,3,172,8,54,22,224,79,187,19,234,132,228,87,132,239,154,143,181,56,117,142,232,60,37,141]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(5, "0cr5qk", [[114,39,189,59,193,81,56,96,136,1,246,37,187,90,140,214,239,46,139,55,17,93,205,51,6,76,255,111,8,178,238,234],[126,23,88,172,148,235,66,1,62,33,206,47,87,25,150,142,213,7,181,94,3,140,223,196,175,48,62,194,109,219,251,12],[37,105,23,185,36,158,95,167,24,22,75,216,4,179,106,152,165,120,196,244,131,141,55,12,100,205,79,101,162,162,13,128]], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("\x19Ethereum Signed Message:\n32", [[129,223,72,45,185,52,210,53,61,3,64,213,126,226,55,32,203,181,0,247,116,71,253,180,83,180,168,35,228,183,115,1],[84,78,138,154,220,94,86,244,22,193,238,83,201,63,205,95,76,64,152,239,109,191,81,47,160,219,132,147,141,73,82,241],[68,236,47,114,1,111,190,102,58,43,115,68,218,106,109,126,240,149,113,107,174,11,201,116,116,227,135,158,66,108,37,130]], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("ETH", [[248,161,167,10,4,209,225,138,196,190,32,168,152,179,168,242,55,246,163,90,143,213,120,36,252,126,13,123,209,54,129,50],[21,1,90,138,175,164,25,149,165,84,51,105,157,148,44,175,111,108,12,141,66,35,184,78,149,55,201,103,34,50,62,210],[188,114,57,243,114,215,250,177,143,219,72,146,143,94,222,184,242,176,17,183,40,6,220,29,210,76,52,121,167,4,119,98],[200,73,110,31,147,173,9,203,239,62,24,159,11,158,233,239,123,208,240,7,93,139,56,250,32,248,26,183,249,126,13,239]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(3, "Oraclize query was sent, standing by for the answer...", [[172,180,230,83,125,114,191,226,164,82,138,81,149,93,24,22,49,114,186,156,185,207,254,206,108,130,175,221,124,40,137,3],[13,247,135,231,3,140,65,193,115,94,80,48,236,39,227,57,100,214,132,175,38,89,211,137,194,97,79,155,81,197,233,253],[13,164,117,153,230,129,242,158,39,111,113,84,158,166,131,32,110,247,18,125,204,195,178,219,192,166,53,94,72,139,228,168],[248,130,195,145,32,219,86,119,120,197,70,206,214,26,201,228,61,155,60,110,70,235,177,15,58,235,37,193,146,224,107,236]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(48, "L", [[58,102,44,62,51,106,229,87,21,19,150,234,44,9,230,118,153,177,226,56,62,235,228,72,255,15,190,163,163,229,56,91],[61,175,252,241,164,28,39,5,179,199,43,219,59,141,109,107,56,229,7,78,43,3,248,2,183,116,84,210,26,133,36,84],[59,40,151,127,7,202,129,143,68,237,217,233,49,244,14,148,24,161,97,141,135,165,204,12,203,146,95,84,91,142,140,241],[155,155,37,10,104,83,148,128,168,73,150,39,182,184,48,44,60,7,166,15,151,129,215,137,181,44,67,162,47,23,126,133]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("L", [[246,251,145,125,28,238,243,102,155,130,6,140,69,18,72,111,22,131,156,33,240,110,220,85,21,121,33,12,178,17,24,78],[104,115,17,11,172,251,144,243,232,51,5,141,158,124,208,172,70,112,194,162,79,127,185,38,76,119,235,254,95,87,129,88],[192,69,176,79,186,43,12,195,171,10,13,3,73,117,68,108,136,231,175,108,53,194,50,175,224,237,75,245,177,223,144,220],[124,23,123,61,245,210,38,255,147,121,37,165,132,110,140,255,113,163,85,114,40,91,151,101,33,98,11,146,153,142,82,185]], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ETH", [[12,176,181,84,174,187,163,50,71,50,231,196,52,50,213,33,32,134,52,42,223,0,55,241,101,120,11,154,102,36,46,165],[90,232,87,31,10,242,52,87,90,50,230,211,105,59,78,171,3,238,7,34,176,137,212,34,71,176,128,82,59,164,222,165],[83,226,171,33,72,234,33,0,242,190,50,223,222,196,64,52,234,32,141,248,243,50,70,183,220,180,96,111,88,35,138,193],[56,28,228,124,228,24,194,131,123,125,187,223,155,181,182,199,114,173,242,85,169,216,243,6,81,63,124,22,24,58,37,160],[183,41,151,28,89,99,81,253,155,191,96,170,230,101,19,193,253,51,14,224,67,111,14,115,95,88,201,216,95,156,27,33]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(256, "call updateEthPrice", [[163,184,5,192,138,26,64,88,4,236,125,38,142,58,56,214,113,139,159,170,41,148,173,114,176,14,27,193,180,31,113,203],[113,247,194,125,95,176,176,251,146,138,131,109,88,88,0,164,137,138,39,199,219,27,250,42,190,89,114,9,235,35,36,93],[231,50,255,46,251,147,27,50,115,21,240,175,57,119,153,49,183,30,210,81,42,128,226,88,62,35,17,79,30,129,92,144],[138,234,215,8,187,143,116,54,12,205,84,162,194,108,12,161,56,198,69,88,94,30,80,26,190,161,79,42,70,125,253,239],[196,209,243,180,181,205,90,223,32,182,30,229,101,196,8,11,163,92,254,38,183,247,64,50,255,31,116,93,174,5,160,193]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(32, "RevertWithReason", [[39,3,141,143,45,33,191,80,98,184,79,12,43,70,18,48,219,117,167,124,202,237,231,61,210,233,101,52,129,9,35,121],[23,15,126,255,10,229,83,229,231,186,201,254,113,160,205,142,52,87,109,0,39,163,198,139,175,88,236,72,58,89,140,85],[92,100,99,255,124,94,65,97,92,253,230,34,208,55,230,179,4,39,88,33,6,78,191,108,131,131,118,136,84,157,191,14],[63,76,34,204,214,205,207,104,179,61,0,182,128,246,10,97,238,243,79,161,180,46,253,245,223,203,214,138,190,214,247,225],[137,112,176,38,92,110,53,40,8,88,56,38,242,80,74,247,233,236,119,220,23,197,10,166,82,13,77,15,227,150,73,90]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("0", [[65,68,21,8,234,103,222,150,42,166,174,21,43,243,85,220,2,6,160,148,63,106,6,47,77,125,74,149,167,179,138,60],[189,167,157,27,227,217,44,117,115,148,0,15,206,130,80,203,93,62,107,231,100,168,43,39,206,174,169,119,252,77,39,13],[3,204,227,7,117,78,127,254,229,55,5,195,235,128,250,83,10,234,29,118,55,172,9,153,204,21,75,115,104,186,217,184],[225,247,220,117,103,129,151,45,205,190,187,239,224,82,31,164,19,59,205,133,174,192,153,184,116,224,232,75,102,94,6,18],[229,174,239,129,5,208,205,186,133,205,52,115,60,121,43,11,54,218,42,167,87,167,170,142,79,168,31,180,19,254,84,228]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([116],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[2],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(101,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "0",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("bw0ukf", "Example",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("updateEthPrice called", "ETH", "ETH",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("costUSD", "ETH", "L", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("zcc4cr", "958ih", "L", "0cr5qk", "UsesExample",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("0",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("zcc4cr", 162,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("call updateEthPrice", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Example",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Oraclize query was sent, standing by for the answer...", 102,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("958ih", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(17,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["0","updateEthPrice called","zcc4cr","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","updateEthPrice called","IsLibrary",""],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[203,58,239,76,71,43,18,183,174,177,78,118,126,6,208,91,248,54,43,102,186,34,3,79,100,146,87,201,26,85,185,242],[137,2,195,175,177,97,224,143,98,73,0,19,158,72,119,139,69,78,92,53,180,55,183,148,24,50,133,157,105,219,21,157],[119,223,205,143,69,164,118,53,205,57,188,90,8,34,231,238,219,187,236,103,95,50,242,222,178,30,13,45,20,236,4,14],[17,192,104,233,227,104,123,187,154,200,4,80,191,197,82,125,56,74,38,77,30,56,180,178,20,223,158,145,54,111,177,8],[50,116,222,250,211,3,110,40,84,69,149,156,203,203,236,40,122,130,179,167,114,43,90,175,112,251,83,15,166,50,193,168],[34,47,242,190,236,214,186,61,81,10,73,236,42,100,134,216,181,116,179,58,158,139,22,183,146,165,102,18,75,116,60,142],[188,49,125,221,22,82,169,13,101,39,194,18,84,37,126,2,5,42,122,36,18,114,62,91,135,115,194,246,33,33,166,53],[112,149,44,76,21,166,184,126,139,13,138,155,176,108,25,139,90,181,145,114,18,23,116,10,64,55,129,45,30,0,199,63],[165,194,117,206,23,181,166,112,136,249,255,61,21,29,232,211,11,189,125,92,195,156,151,137,100,252,70,166,186,169,23,56]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(27, 9999, 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([231,173,198,39,160,125,191,145,83,109,49,15,30,148,100,92,72,110,11,148,215,148,223,131,240,164,196,115,17,2,98,87], [25,74,101,114,145,2,223,180,94,224,42,153,22,72,24,19,16,215,213,11,7,108,37,253,244,217,251,228,143,145,42,150],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([246,246,30,223,75,82,62,140,118,89,53,174,11,0,83,41,106,101,129,169,198,154,2,109,184,169,246,55,185,9,255,123], [178,188,176,144,93,98,247,164,205,255,37,129,147,60,62,202,247,84,3,2,74,170,170,11,54,10,201,120,52,254,59,194], [123,72,22,148,5,255,75,1,232,210,149,92,154,13,39,106,75,222,188,207,226,250,35,96,46,93,68,211,134,78,151,6],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([12,14,180,42,245,37,197,159,35,248,14,44,154,174,169,55,214,122,82,33,202,27,223,19,118,132,81,195,139,69,143,108], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([238,231,142,161,78,58,171,153,176,46,184,116,33,104,253,28,112,249,28,126,82,190,50,210,63,60,67,212,10,34,65,153], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([170,21,221,69,199,47,187,200,67,140,181,137,215,172,220,14,60,165,222,170,121,58,252,23,210,112,58,250,206,53,123,72], "", [61,170,96,125,230,163,142,226,189,226,93,15,87,243,193,33,144,27,102,68,84,42,145,76,31,34,80,240,246,101,220,51],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([228,104,52,5,6,139,78,206,112,50,250,243,237,243,201,87,58,191,230,123,218,45,73,166,189,232,215,130,251,233,80,141], "L", [221,117,223,88,160,197,156,25,186,138,102,28,210,252,67,31,124,27,93,77,133,220,251,74,234,152,88,176,197,113,160,1],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([185,229,121,23,240,51,113,185,193,202,236,69,136,107,7,173,142,190,225,123,90,28,234,199,206,248,234,115,2,67,125,39], [156,124,92,243,201,139,213,170,135,147,254,144,145,94,24,226,138,210,118,104,174,5,98,17,132,90,24,249,69,68,140,227], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([185,229,121,23,240,51,113,185,193,202,236,69,136,107,7,173,142,190,225,123,90,28,234,199,206,248,234,115,2,67,125,39], [248,121,248,129,152,237,39,18,159,51,114,48,107,199,149,32,82,246,64,198,194,37,58,26,123,243,196,84,186,241,50,88,221], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([226,162,154,37,20,121,132,95,225,174,28,184,37,228,78,211,254,246,9,247,53,93,54,60,201,214,114,51,224,11,238,217], [123,48,107,18,209,60,191,208,25,205,92,24,211,8,30,170,153,65,44,207,82,123,78,241,91,170,83,39,166,243,70,11], [49,104,72,253,245,106,147,17,40,11,244,73,145,160,164,129,245,67,20,26,201,115,34,161,23,74,159,69,112,92,203,211], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([205,149,244,39,173,10,250,229,53,76,189,6,75,113,21,142,144,102,133,18,186,154,182,179,125,93,108,181,4,212,90,172], [24,92,67,139,95,27,87,184,139,214,24,34,123,212,162,59,248,167,10,178,155,51,163,232,75,165,202,249,211,38,102,139], [166,115,137,34,21,77,171,128,219,245,44,227,155,0,44,13,179,226,22,170,64,122,223,13,141,61,59,107,136,236,177,40], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([95,207,115,233,248,100,30,40,119,219,131,234,58,57,39,104,4,103,66,96,28,77,84,121,221,202,136,249,233,129,245,74], [33,193,150,137,142,156,45,38,78,134,170,48,117,79,212,101,62,211,73,2,139,27,232,51,151,5,127,93,49,209,207,164], [239,196,54,213,30,130,239,50,221,224,243,215,219,189,45,112,137,43,120,72,159,150,128,75,111,63,42,87,67,224,76,209], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([113,71,82,47,205,145,179,113,85,170,93,34,65,152,105,144,111,209,234,47,243,126,159,198,60,122,146,90,20,44,178,106], [198,250,125,135,119,231,169,72,225,187,202,8,129,90,44,82,223,187,231,250,200,114,93,134,29,120,235,62,194,86,250,122], [62,55,168,230,104,250,85,188,197,227,127,107,158,92,146,184,44,16,170,194,44,189,126,146,232,166,1,13,94,212,165,99], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([19,144,125,38,95,162,203,96,239,163,189,186,139,2,218,94,221,23,77,30,110,238,109,121,118,41,8,8,128,121,104,170], [77,99,189,93,200,244,183,168,246,139,161,9,61,220,106,240,98,48,158,173,161,40,122,198,69,34,129,183,115,110,147,172], [196,42,206,9,79,51,218,18,205,0,233,116,176,2,202,16,169,148,132,107,103,58,125,241,100,184,60,119,68,187,96,6], "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([67,115,176,51,44,134,162,64,111,40,235,237,156,145,22,182,135,208,87,101,92,14,212,98,95,215,121,105,237,136,44,205], [146,235,50,208,57,80,108,43,148,246,153,243,178,238,158,133,57,201,194,124,25,167,192,185,215,208,107,223,77,174,240,6], [53,178,80,87,149,159,89,156,78,114,10,111,76,10,137,249,57,207,8,45,18,115,160,204,117,86,81,145,153,6,238,229], "",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([118,213,75,87,231,73,157,228,111,8,250,113,197,99,32,241,185,78,119,64,198,157,19,52,196,88,28,45,237,113,97,200], [109,173,150,249,50,40,200,167,20,248,110,184,233,185,80,119,4,193,237,225,79,23,255,161,208,255,88,7,94,193,205,112], [208,119,17,122,182,43,113,90,33,114,242,159,64,227,124,222,150,242,251,110,196,120,178,229,155,7,195,48,77,229,232,8], "0cr5qk",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([97,89,88,225,95,79,155,168,138,190,150,6,199,235,119,110,125,39,107,246,194,56,215,11,51,164,250,85,233,34,157,93], [73,108,43,171,160,51,25,183,182,183,255,250,79,99,225,123,45,39,21,118,37,6,121,36,127,71,178,164,80,38,206,155], [123,148,109,153,41,16,83,166,218,121,227,5,57,25,182,171,31,59,53,114,72,129,133,220,227,216,236,46,250,28,160,109], "zcc4cr",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([95,88,32,126,190,1,38,86,177,98,71,45,6,53,166,192,12,183,182,40,124,228,190,70,33,247,34,249,209,227,80,155], 1, 2014223714, [205,90,170,72,100,132,14,216,79,78,30,23,164,54,157,154,93,250,20,112,220,94,137,3,122,236,67,204,165,184,226,137], 86,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([89,213,55,29,45,226,69,169,56,2,15,171,177,244,252,124,193,21,250,242,168,32,147,76,17,239,7,50,233,192,224,235], 47, [95,133,139,90,62,15,61,200,164,210,179,6,29,85,247,164,115,202,219,41,205,38,124,28,50,181,242,114,225,79,155,152], [215,185,43,113,84,178,228,211,206,252,109,254,171,179,149,131,114,211,154,71,78,10,150,39,210,215,178,220,172,151,76,217],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([74,96,120,253,198,86,9,66,150,106,236,19,26,225,46,154,76,99,251,191,230,237,244,245,165,166,95,183,61,234,48,52], [104,171,152,29,98,151,167,160,136],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([30,163,22,115,235,169,182,58,138,137,60,30,248,42,157,104,70,131,13,97,200,20,47,202,141,127,0,19,220,111,250,212], [81,107,42,194,183,67,157,156,111,212,222,100,48,147,134,174,153,121,8,40,137,247,13,58,199,163,24,167,133,248,124,25,13,142,229,128,120,42,19,125,139,72,18,199,140,24,207,166,81,13,168,158,23,134,63,174,137,139,194,154,251,75,77,181,175],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
