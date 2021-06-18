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
    contractState = await State.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[3],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[7],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[0],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[0],contractProxy.address,contractTokenExchangeState.address,"RevertWithReason",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[0],contractProxy.address,contractTokenExchangeState.address,"RevertWithReason",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(8,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("PayableExample", 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("\x19Ethereum Signed Message:\n32", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(10000, "\x19Ethereum Signed Message:\n32", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1337, "IsLibrary", "costUSD", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("IsLibrary", "call updateEthPrice", 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("46lnjm", "IsLibrary", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(4, "PayableExample", "", "Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(199999, "Example", "0", "RevertWithReason", 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("5cy3a7a", "trade.totalPrice", "46lnjm", 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("PayableExample", ["v4s6o","Example","46lnjm","IsLibrary","updateEthPrice called","0","ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(20, "cm840s", ["updateEthPrice called","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(1024, "cm840s", ["UsesExample","46lnjm","PayableExample","L","\x19Ethereum Signed Message:\n32","Oraclize query was sent, standing by for the answer...","\x19Ethereum Signed Message:\n32","P","0","UsesExample"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("costUSD", ["listingID arg","listingID arg","IsLibrary","Example","trade.totalPrice"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("5cy3a7a", ["RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(255, "5cy3a7a", ["\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(102, "ktjtde", ["IsLibrary"], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("costUSD", ["P"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("L", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(95, "46lnjm", ["UsesExample","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(9999, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["Oraclize query was sent, standing by for the answer...",""], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Oraclize query was sent, standing by for the answer...", ["PayableExample","cm840s"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("RevertWithReason", ["trade.totalPrice","IsLibrary","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(54, "46lnjm", ["ETH","\x19Ethereum Signed Message:\n32","Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(31, "0", ["v4s6o","UsesExample","46lnjm"], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("call updateEthPrice", ["listingID arg","ktjtde","IsLibrary"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("costUSD", ["IsLibrary","ETH","call updateEthPrice","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(24, "PayableExample", ["call updateEthPrice","hzlsob","hzlsob","Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(9, "cm840s", ["UsesExample","46lnjm","ETH","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("updateEthPrice called", ["IsLibrary","call updateEthPrice","","\x19Ethereum Signed Message:\n32"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("46lnjm", ["UsesExample","IsLibrary","v4s6o","n1121m","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(56, "P", ["46lnjm","IsLibrary","Oraclize query was sent, standing by for the answer...","jvt7va","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(26, "5cy3a7a", ["trade.totalPrice","n1121m","n1121m","5cy3a7a","0"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("trade.totalPrice", ["46lnjm","listingID arg","updateEthPrice called","0","IsLibrary"], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("v4s6o", [[116,226,38,131,190,242,157,217,57,199,62,216,239,143,151,240,113,79,68,228,123,25,121,6,3,195,219,131,26,11,171,50],[68,193,62,114,224,58,172,207,48,231,213,69,3,7,43,150,82,235,198,200,122,130,74,193,141,145,146,196,126,167,108,189],[66,240,246,173,246,202,145,125,50,79,201,13,43,98,106,146,253,242,48,75,12,117,27,88,245,239,87,170,229,219,91,60],[37,15,120,244,146,109,215,70,193,231,177,89,225,52,116,69,34,163,235,108,171,121,68,112,55,209,188,247,124,199,26,223],[109,49,248,90,248,168,220,249,132,74,254,237,249,7,132,11,118,81,23,214,242,179,11,43,153,200,218,107,144,31,107,66]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(1336, "P", [[52,41,84,68,156,170,175,0,189,91,43,121,135,82,54,64,19,54,55,79,172,91,118,143,18,78,150,243,50,203,137,60],[97,244,59,217,161,141,108,114,113,41,145,255,154,80,25,152,247,170,254,169,16,190,229,147,172,0,22,250,42,50,90,203],[94,141,50,174,59,126,37,101,16,162,108,40,3,106,74,123,187,4,46,118,249,9,105,23,241,59,192,71,187,179,188,79],[116,88,67,236,11,243,65,119,52,156,6,77,37,208,58,90,112,78,253,229,200,188,188,143,225,178,4,166,173,4,44,6]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(254, "", [[48,25,201,5,241,110,74,155,30,190,18,46,148,68,50,45,181,173,3,39,203,124,171,223,30,28,165,130,183,236,194,56],[127,138,85,34,169,10,92,207,30,182,223,112,236,132,199,182,181,7,70,80,189,191,23,64,129,26,150,0,188,178,136,120],[78,241,80,50,169,28,141,49,133,238,37,208,20,34,240,217,124,89,186,78,170,148,231,178,217,82,190,210,182,78,171,106],[30,223,14,161,121,22,64,186,174,145,47,102,7,71,101,120,95,37,66,17,194,207,97,234,52,186,197,229,207,50,162,26],[38,63,34,218,108,57,46,207,0,52,28,244,129,70,92,89,193,228,176,227,128,251,111,254,98,130,231,34,208,207,229,2],[22,240,138,130,180,220,68,229,158,66,212,146,110,150,86,109,74,92,109,71,38,170,243,122,66,111,169,114,43,30,202,11]], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("v4s6o", [[78,154,104,109,141,204,206,186,220,116,18,96,185,222,105,137,186,243,68,68,36,8,232,147,210,105,237,15,24,24,26,233],[60,253,122,251,88,120,120,171,28,177,250,110,174,165,223,86,51,60,244,251,30,70,42,216,52,235,27,39,131,51,111,91],[238,244,208,156,177,243,102,93,253,174,59,149,17,214,113,135,179,208,172,37,251,43,66,128,224,162,32,245,157,230,192,178],[60,92,191,240,97,168,7,232,72,64,186,192,5,190,144,51,28,81,161,46,230,89,172,167,104,0,199,218,128,62,110,85]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("RevertWithReason", [[127,133,31,203,109,57,159,91,195,56,83,219,150,104,153,246,12,64,89,241,168,89,130,21,162,123,45,96,72,183,122,78]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(9, "trade.totalPrice", [[189,219,208,214,35,237,113,148,51,131,40,157,137,31,115,68,227,45,216,65,159,145,178,91,174,175,225,226,139,165,47,195]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(59, "PayableExample", [[91,70,107,179,137,110,212,41,246,223,36,22,48,172,145,109,90,85,67,118,146,252,148,55,235,220,173,168,24,230,175,110]], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("trade.totalPrice", [[84,16,114,151,53,172,60,42,47,156,18,219,115,172,67,72,119,250,13,110,128,46,186,38,123,109,194,178,191,143,25,177]], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("0", [[240,240,29,9,72,214,52,89,17,6,44,144,89,179,187,36,253,241,18,169,228,50,75,56,189,224,85,245,113,116,122,152],[166,232,52,216,48,102,204,55,34,186,214,154,222,104,233,202,103,204,81,184,4,115,71,120,76,216,181,205,50,16,236,139]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(161, "P", [[56,55,252,237,43,210,138,77,67,149,209,244,187,218,26,14,7,111,138,213,227,144,158,41,181,34,114,99,213,172,197,16],[181,144,182,57,137,210,13,158,247,245,163,59,68,241,41,188,183,225,157,137,79,25,57,84,138,129,214,89,135,184,202,3]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(10000, "5cy3a7a", [[223,166,174,177,214,176,7,103,62,123,94,117,196,74,28,97,140,223,199,15,186,0,218,73,111,160,25,226,186,15,147,138],[23,208,190,38,95,39,118,13,129,136,50,93,82,182,71,72,91,157,251,233,2,227,35,114,10,177,187,231,184,230,113,164]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("\x19Ethereum Signed Message:\n32", [[168,84,7,26,75,78,202,57,243,10,37,67,144,148,132,117,31,119,3,29,203,254,230,137,217,215,90,142,197,194,152,107],[85,19,200,38,196,156,192,174,213,253,66,75,182,244,165,1,101,218,29,23,16,99,242,208,227,76,246,220,247,212,132,114]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("L", [[42,207,4,28,51,247,49,146,217,53,147,250,177,151,213,38,229,239,32,205,172,48,100,192,185,101,147,119,126,199,72,130],[77,145,157,246,75,68,142,162,85,144,175,209,92,239,177,90,148,221,132,191,104,139,94,206,93,174,173,246,182,185,239,27],[158,55,167,111,98,248,157,247,40,161,27,191,51,125,176,89,41,145,188,48,214,5,165,176,195,205,222,10,251,162,92,238]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(29, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[8,236,190,15,20,161,65,225,234,85,194,186,72,193,150,1,198,9,184,18,14,223,120,221,25,142,122,92,21,119,230,86],[210,176,227,106,188,58,208,94,141,120,214,129,59,178,222,200,109,126,190,11,186,169,1,228,91,220,211,120,66,18,173,128],[64,243,13,63,84,199,63,255,220,254,83,184,55,122,199,40,16,7,8,245,54,153,147,189,224,222,250,53,62,143,15,58]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(48, "n1121m", [[50,237,169,172,62,88,190,74,199,160,149,221,18,78,135,16,132,213,243,197,174,170,58,84,215,76,71,178,198,125,150,255],[193,174,109,29,109,124,26,21,42,73,88,148,207,235,252,236,187,242,245,218,247,46,131,243,41,140,10,142,37,132,65,245],[174,171,222,88,127,223,34,221,237,48,255,233,241,73,65,5,29,41,168,252,53,141,41,75,80,198,252,86,62,219,132,53]], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("Example", [[37,93,189,215,16,124,43,11,187,128,168,45,116,151,181,100,167,74,78,205,144,254,228,70,32,166,52,139,200,125,37,104],[60,159,91,1,83,188,179,187,10,156,149,182,22,124,154,165,198,56,187,155,38,161,31,92,133,4,29,17,233,53,97,148],[124,168,36,13,227,165,101,49,150,160,228,166,212,114,115,81,169,243,184,187,233,216,190,211,69,250,9,231,9,36,138,78]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("\x19Ethereum Signed Message:\n32", [[52,8,131,134,10,157,155,65,87,74,11,183,217,58,35,159,7,119,69,245,172,226,216,151,134,114,179,128,62,78,10,238],[58,144,245,171,18,214,116,20,97,254,201,235,20,65,158,188,222,66,192,53,169,22,88,61,16,110,219,53,74,39,173,188],[53,34,152,15,163,101,52,194,54,27,53,209,29,199,55,232,66,24,68,208,189,9,45,124,149,73,96,217,164,67,167,23],[220,54,183,59,235,119,197,182,68,127,134,180,250,71,223,45,130,96,98,150,115,29,148,252,243,120,26,2,80,152,20,124]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(1337, "P", [[85,27,171,17,0,77,254,29,155,71,2,55,218,4,67,48,147,4,17,141,139,219,191,249,240,254,188,46,101,204,105,48],[77,55,226,62,8,123,64,230,187,95,134,238,105,55,138,214,212,78,119,51,60,57,2,210,242,254,133,114,196,240,104,111],[88,237,107,247,63,50,163,194,33,221,179,13,126,240,135,156,82,231,44,44,128,181,118,141,193,185,190,140,239,202,15,210],[210,38,125,103,49,135,43,63,1,120,157,212,82,23,12,145,214,71,164,82,3,106,148,33,124,68,188,43,227,81,55,202]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(1024, "hzlsob", [[99,127,105,242,111,50,41,214,193,64,7,201,4,30,167,109,0,151,109,176,153,122,251,161,166,249,119,155,74,201,202,6],[36,23,109,254,71,42,217,87,229,138,18,239,89,168,81,233,72,108,59,72,207,149,38,76,190,251,156,119,239,91,129,94],[228,10,110,132,167,35,94,227,204,2,111,202,253,53,169,147,46,242,142,28,55,83,32,244,107,50,26,42,246,35,116,46],[19,88,85,125,125,148,166,218,252,169,25,179,191,223,250,39,173,81,152,52,174,215,85,7,212,178,40,88,79,199,58,131]], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("\x19Ethereum Signed Message:\n32", [[121,205,250,78,38,39,40,135,163,236,134,242,250,45,128,72,144,134,148,245,193,204,139,252,190,192,201,183,16,7,147,192],[134,7,241,4,241,34,196,241,106,75,1,160,26,155,220,95,239,237,53,28,12,245,43,95,132,117,42,80,193,88,34,215],[87,224,222,17,3,44,78,177,91,218,204,74,176,64,250,246,60,80,2,33,201,19,64,166,97,168,238,219,151,208,175,232],[229,127,56,86,16,242,122,219,197,139,24,66,211,47,139,25,56,122,3,94,137,135,63,75,14,59,46,197,178,215,188,221]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("4yaqbm", [[220,177,205,39,144,12,80,165,253,233,10,90,0,42,170,23,157,37,241,10,235,48,129,107,7,155,32,227,197,243,181,113],[35,191,215,152,52,185,7,218,3,219,11,114,75,26,223,165,68,42,35,33,15,92,62,93,254,100,211,60,134,243,35,192],[40,121,211,71,145,249,60,215,245,48,105,109,29,28,66,253,164,172,215,127,124,229,230,226,186,110,153,1,197,150,195,134],[236,103,181,248,24,189,252,104,155,103,6,54,9,163,244,70,9,45,72,246,66,79,89,84,20,120,29,86,245,50,125,184],[133,10,4,249,67,199,187,169,153,32,22,32,241,245,127,176,186,226,92,255,141,185,223,147,16,145,108,38,182,208,62,75]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(1338, "\x19Ethereum Signed Message:\n32", [[116,1,178,78,70,48,20,128,245,99,0,246,169,73,120,231,155,217,137,46,201,46,197,102,108,162,212,218,212,104,12,147],[191,198,125,196,70,228,33,189,33,48,154,127,83,167,131,218,151,254,150,59,130,3,64,6,126,70,175,41,196,76,115,131],[43,77,239,203,92,184,95,107,185,187,207,64,234,205,24,34,215,151,144,157,114,91,160,221,186,183,145,167,74,92,208,135],[74,123,41,215,95,152,52,179,176,173,28,87,166,84,133,32,202,85,87,194,72,83,140,85,45,72,44,122,232,120,36,97],[249,135,178,160,9,88,131,104,93,138,176,242,128,182,236,91,46,1,134,189,195,70,183,212,51,148,105,63,106,154,53,175]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(59, "cm840s", [[96,76,30,119,98,179,164,51,95,226,100,217,73,254,172,150,222,145,163,125,107,107,70,206,252,254,135,124,117,64,152,71],[180,87,58,202,16,150,90,214,105,119,106,255,221,100,153,45,162,171,143,128,100,40,176,241,213,97,214,33,23,65,0,194],[225,68,2,33,0,82,232,88,9,25,253,14,182,151,168,55,128,132,177,186,77,244,48,188,21,80,51,206,195,63,163,15],[215,167,70,239,76,207,165,164,228,136,208,74,137,125,24,172,112,102,136,244,186,248,125,54,63,165,24,82,91,161,173,240],[38,187,23,11,85,157,152,28,12,153,3,96,212,87,45,55,226,155,159,78,60,135,57,58,235,86,211,79,135,86,183,223]], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[93,24,133,234,128,76,20,192,8,190,15,245,235,57,78,251,9,49,150,224,13,82,244,128,110,44,228,160,7,178,167,148],[51,192,65,20,121,26,55,180,36,13,83,55,129,245,70,183,16,254,20,15,15,183,150,130,23,123,39,24,211,124,222,67],[236,85,168,188,61,29,126,21,26,180,42,154,72,102,61,114,174,245,185,43,140,108,59,196,176,195,176,69,17,212,14,195],[7,183,250,50,68,199,160,115,163,186,117,42,254,80,155,35,39,160,156,55,229,108,174,250,118,219,41,30,165,184,172,158],[186,40,161,28,180,197,221,105,40,65,131,103,30,224,56,228,197,209,197,155,193,129,221,41,160,118,52,52,214,131,33,55]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([249],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[8],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("costUSD",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("IsLibrary", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("4yaqbm", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("trade.totalPrice", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("trade.totalPrice", "0", "2lv7gk",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("L", "P", "ETH", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("costUSD", "2lv7gk", "hzlsob", "L", "4yaqbm",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("listingID arg",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("46lnjm", 255,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("costUSD",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("\x19Ethereum Signed Message:\n32", 257,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("46lnjm", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(27,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["L","2lv7gk","5cy3a7a","updateEthPrice called","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[179,8,218,233,29,184,101,216,185,88,182,186,117,94,190,240,94,156,23,13,223,215,183,214,30,14,246,157,232,231,108,132]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(30, 32, 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([144,139,97,52,184,250,119,241,41,209,137,30,110,138,28,163,8,10,66,11,120,132,36,76,62,184,89,64,80,69,152,196], [40,251,37,185,63,195,221,220,207,0,30,167,150,99,199,24,99,121,233,170,107,28,23,14,90,123,26,111,76,42,66,61],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([15,214,54,124,254,250,205,15,253,7,18,70,76,8,84,6,42,167,128,130,120,241,219,65,52,162,203,194,251,160,203,18], [224,247,181,209,97,227,20,33,75,2,128,0,1,87,212,228,75,130,112,233,27,180,67,6,58,101,43,178,202,142,109,92], [216,75,185,145,178,72,186,108,148,217,172,219,129,15,100,122,113,91,235,72,113,107,60,218,143,60,175,242,119,210,134,83],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([98,239,83,49,200,205,55,28,233,206,150,184,23,232,99,192,76,224,126,148,32,206,191,189,167,169,225,171,70,79,79,226], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([82,35,173,225,213,23,116,123,195,94,247,40,147,111,209,29,80,245,246,44,236,165,45,158,11,223,225,45,124,39,55,227], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([195,161,69,131,137,73,134,220,21,24,125,172,234,89,239,57,86,192,131,169,100,13,101,111,43,158,78,56,6,138,5,95], "updateEthPrice called", [183,177,252,87,224,183,168,103,77,86,136,195,105,173,85,208,181,7,3,131,68,138,140,197,89,136,133,224,6,46,13,210],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([244,35,1,67,254,6,137,167,60,17,143,183,149,195,152,32,124,68,242,174,199,84,67,78,226,200,118,11,171,22,168,56], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [249,114,142,34,17,173,226,33,18,240,41,131,231,194,223,127,90,244,172,21,235,105,251,8,11,17,114,253,38,197,26,176],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([62,253,162,18,186,28,83,251,164,187,139,52,179,123,63,129,229,63,213,126,3,222,148,93,38,178,89,22,79,75,12,126], [158,250,14,234,142,39,2,204,213,16,168,102,168,97,6,253,216,163,101,130,220,89,198,203,150,162,22,186,102,179,128,129], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([62,253,162,18,186,28,83,251,164,187,139,52,179,123,63,129,229,63,213,126,3,222,148,93,38,178,89,22,79,75,12,126], [69,55,61,157,177,130,151,25,237,8,160,57,125,170,142,134,33,181,83,228,14,95,196,15,45,6,87,58,14,160,37,202,228], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([192,90,156,128,111,185,141,169,235,176,254,126,251,130,27,9,107,209,60,139,165,247,29,168,20,9,144,55,155,11,113,251], [67,54,233,84,88,202,194,18,4,66,239,8,81,228,36,158,11,133,4,65,86,91,14,147,104,92,85,99,224,203,245,186], [128,75,109,100,189,68,22,163,23,39,50,142,255,89,162,95,151,177,32,53,189,27,207,140,47,219,216,14,50,84,103,84], "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([91,175,47,107,27,210,143,255,243,62,98,195,175,19,227,213,196,140,214,138,118,173,104,32,81,150,14,208,97,249,15,166], [226,172,23,148,21,87,75,156,150,214,144,220,205,162,124,224,73,201,241,53,51,178,145,190,136,193,132,183,201,184,208,110], [72,150,117,69,101,247,62,21,243,50,20,121,244,142,26,178,81,21,109,48,100,232,235,92,222,126,167,159,131,215,184,27], "v4s6o",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([35,213,57,103,129,101,232,205,17,2,150,46,96,57,136,198,64,119,241,236,139,102,125,208,147,81,237,90,215,28,99,174], [235,16,122,43,72,75,103,126,112,192,195,238,75,93,237,178,220,192,221,159,0,47,100,252,107,30,201,70,210,71,208,67], [97,243,95,102,122,144,188,28,47,137,126,49,203,244,117,220,255,110,251,168,148,65,190,86,194,133,20,186,134,197,98,230], "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([173,137,153,189,223,193,208,39,211,5,183,80,83,193,36,46,4,133,58,108,208,63,56,226,119,102,120,236,227,126,0,70], [154,185,42,94,190,38,153,172,200,238,114,144,215,221,154,61,150,55,54,235,93,56,165,96,237,20,127,126,40,19,127,87], [168,31,116,136,95,129,152,190,99,2,66,7,248,79,29,254,254,209,195,248,50,249,57,182,28,235,56,135,181,156,252,110], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([25,235,61,150,216,72,53,172,113,27,31,56,50,165,175,159,50,149,136,56,192,252,200,33,113,153,13,127,148,212,166,0], [133,32,81,52,5,23,108,248,97,16,115,6,43,217,143,200,146,245,164,138,118,66,71,193,142,175,38,192,64,134,213,27], [123,168,148,70,153,88,119,214,74,58,98,79,236,166,197,171,91,63,28,209,46,184,63,177,190,122,68,192,145,105,187,122], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([167,74,0,244,159,86,206,208,92,63,148,191,173,12,204,231,160,124,225,22,41,26,60,242,194,246,153,204,58,53,136,199], [14,201,31,174,147,81,68,216,227,33,153,7,83,84,23,245,101,149,236,74,111,77,242,95,209,127,83,117,228,130,187,116], [229,35,33,101,54,121,18,204,144,194,220,41,27,97,213,18,95,57,71,183,176,27,18,122,115,106,139,220,150,48,148,134], "0o961v",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([247,25,150,140,47,177,63,215,207,225,160,226,41,13,153,68,59,72,222,69,223,209,225,54,42,39,248,238,181,172,185,34], [60,179,170,52,103,6,243,53,170,99,158,23,58,190,89,0,253,45,95,15,211,68,22,215,143,236,121,112,61,98,248,245], [24,110,226,141,125,9,27,217,143,145,148,174,46,143,229,166,104,150,79,165,53,90,67,214,177,230,148,149,127,169,82,97], "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([14,44,98,37,89,87,168,32,143,127,85,120,239,17,74,252,220,104,64,198,114,96,70,218,65,235,182,40,159,114,8,108], [219,95,63,195,34,164,7,141,0,84,19,160,201,155,203,159,90,180,252,251,152,176,100,175,64,88,9,133,93,56,67,140], [100,88,140,240,247,0,77,98,21,221,141,221,126,36,131,98,163,83,199,34,102,43,227,121,26,181,239,85,68,0,41,26], "PayableExample",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([252,82,35,105,212,36,235,231,112,120,180,128,5,58,185,102,97,44,23,43,12,189,46,87,255,75,34,244,140,172,247,176], 45, 1023, [100,236,143,79,106,169,159,206,236,67,37,235,186,163,17,222,27,47,10,109,206,209,212,175,97,250,214,50,47,49,89,185], 10,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([78,124,67,200,151,39,36,221,221,74,218,210,114,5,165,55,197,188,78,49,148,246,17,134,147,154,19,45,148,99,197,33], 7, [247,226,0,37,83,156,180,119,79,253,76,57,126,250,226,196,152,29,61,162,170,192,0,101,74,58,69,17,232,246,24,241], [245,67,230,142,131,25,94,65,51,19,211,117,241,137,150,86,162,165,130,27,166,246,223,9,163,117,54,55,24,146,176,164],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([16,96,62,171,31,248,193,59,195,87,220,141,52,191,251,61,23,54,132,26,55,84,88,36,77,64,32,22,218,239,141,238], [7,37,226],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([167,110,174,94,251,126,25,106,46,233,20,79,7,61,245,220,54,145,144,234,81,52,112,170,22,218,7,59,141,186,227,160], [167,143,176,16,79,164,158,220,41,13,40,81,99,95,221,255,95,23,4,168,244,30,31,68,207,178,245,144,110,186,95,20,196,160,102,67,146,221,131,6,103,77,100,253,62,203,29,44,45,54,95,121,151,201,4,169,17,188,66,87,237,232,234,228,70],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
