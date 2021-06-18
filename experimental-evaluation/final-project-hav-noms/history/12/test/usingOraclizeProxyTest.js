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
    contractState = await State.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[7],{from:accounts[0]}');
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
    contractTokenExchange = await TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"jymm4q",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"jymm4q",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(97,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("dlxu3r",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("P", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(10, "dlxu3r", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1532892063, "bfukyb", "P", 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("\x19Ethereum Signed Message:\n32", "UsesExample", 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("IsLibrary", "costUSD", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(0, "PayableExample", "updateEthPrice called", "",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(22, "trade.totalPrice", "RevertWithReason", "P", 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("", "L", "bfukyb", 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("costUSD", ["Oraclize query was sent, standing by for the answer...","bfukyb","dy16wn","Oraclize query was sent, standing by for the answer...","listingID arg","jymm4q","dy16wn"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(63, "UsesExample", ["\x19Ethereum Signed Message:\n32","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(5, "Example", ["0","L","call updateEthPrice","\x19Ethereum Signed Message:\n32","0","L","dy16wn"], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["trade.totalPrice","dy16wn","bfukyb","dlxu3r","Example","IsLibrary","updateEthPrice called","","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","P"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("\x19Ethereum Signed Message:\n32", ["RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(18, "jymm4q", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(31, "\x19Ethereum Signed Message:\n32", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["ETH"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("RevertWithReason", ["Oraclize query was sent, standing by for the answer...","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(48, "L", ["Example","dy16wn"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(95, "ETH", ["RevertWithReason","RevertWithReason"], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("0", ["listingID arg","\x19Ethereum Signed Message:\n32"], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("costUSD", ["trade.totalPrice","P","jymm4q"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(1, "L", ["0","dy16wn","dy16wn"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(24, "PayableExample", ["PayableExample","updateEthPrice called","RevertWithReason"], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("costUSD", ["PayableExample","RevertWithReason","jymm4q"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("P", ["jymm4q","updateEthPrice called","dy16wn","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(57, "UsesExample", ["\x19Ethereum Signed Message:\n32","P","IsLibrary","ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(1532892064, "dy16wn", ["Oraclize query was sent, standing by for the answer...","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","RevertWithReason","updateEthPrice called"], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("", ["costUSD","ETH","ETH","call updateEthPrice"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("UsesExample", ["PayableExample","Example","trade.totalPrice","bfukyb","ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(160, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["call updateEthPrice","0","Example","0","dlxu3r"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(21, "RevertWithReason", ["dy16wn","P","RevertWithReason","costUSD","Oraclize query was sent, standing by for the answer..."], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("dy16wn", ["listingID arg","UsesExample","UsesExample","b5qlo1x","trade.totalPrice"], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("dlxu3r", [[166,211,51,111,91,183,5,107,150,137,145,77,130,68,34,60,223,52,251,240,17,63,222,196,135,159,20,24,76,18,164,98],[93,175,35,91,107,240,90,82,41,81,85,107,139,146,63,110,141,145,145,173,47,205,155,78,139,66,54,176,184,66,9,199],[145,196,75,78,10,154,57,158,170,167,230,88,163,140,33,250,64,45,169,20,59,152,160,156,250,203,173,209,92,240,177,70],[142,163,206,152,19,0,57,206,6,49,220,61,181,90,103,205,119,254,7,63,70,226,56,114,44,69,128,158,199,250,201,192],[201,131,108,69,56,89,9,89,172,226,148,186,13,151,109,161,34,29,67,136,6,167,61,119,60,61,70,6,11,250,56,94],[29,111,33,244,198,181,56,207,33,13,239,5,244,82,53,137,66,230,151,132,25,233,101,36,246,81,122,9,61,223,41,210],[141,149,146,174,28,227,61,245,80,158,166,230,230,206,78,212,168,110,97,56,11,192,127,83,223,227,100,48,148,218,115,86],[132,9,55,52,54,80,81,122,139,154,52,73,102,48,95,83,130,157,37,214,238,197,148,146,166,149,12,88,120,239,50,200]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(65, "UsesExample", [[181,173,223,211,36,153,113,40,67,169,102,77,172,23,61,226,0,134,160,150,45,208,2,75,179,4,215,21,110,114,156,91],[248,130,216,154,47,26,21,104,87,179,100,192,36,54,148,93,126,242,127,49,70,101,123,64,23,255,217,83,141,154,17,204],[93,144,62,178,140,232,135,116,180,15,93,118,38,156,240,201,12,68,170,242,204,10,234,171,132,51,252,133,226,61,139,127]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(1, "UsesExample", [[134,67,127,122,91,115,160,85,123,102,87,188,121,85,95,77,249,180,210,184,97,184,208,130,56,87,145,144,227,208,14,107],[85,50,158,207,65,22,252,156,34,24,155,171,154,81,70,44,230,60,245,64,201,217,128,45,235,182,151,166,115,22,181,22],[147,93,215,106,74,208,148,60,177,218,241,53,197,25,85,231,179,91,6,55,245,149,232,216,253,230,220,158,243,108,217,143],[201,199,143,49,238,76,57,119,160,163,234,114,126,196,52,26,34,75,73,255,190,240,130,208,101,91,253,248,234,60,80,78],[69,35,127,48,210,119,119,3,202,185,209,164,1,177,239,10,177,132,90,159,131,230,179,181,132,109,130,135,195,61,159,249],[155,110,207,121,99,83,112,156,218,25,35,72,89,179,119,125,217,47,104,189,157,189,73,128,243,30,99,157,17,43,255,202],[87,61,161,166,113,196,233,94,250,66,87,8,105,99,234,206,153,159,251,32,13,116,44,57,232,90,134,178,57,3,178,211]], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("IsLibrary", [[29,79,27,25,139,148,201,16,93,221,246,147,181,45,247,47,183,105,217,244,93,127,189,153,35,226,45,150,75,41,203,237],[42,248,110,197,179,189,228,38,203,149,11,220,114,129,24,123,253,187,130,55,43,212,140,55,38,190,62,32,106,51,236,73],[102,25,74,87,210,148,30,170,120,116,37,100,101,245,50,168,153,82,129,177,17,78,58,229,251,201,124,83,227,90,126,61],[146,185,61,213,67,18,102,130,235,2,33,121,216,253,21,189,79,222,207,233,202,206,205,94,93,184,245,124,184,53,229,214],[117,228,45,56,35,196,20,227,214,201,45,202,18,35,2,8,233,133,160,21,153,113,233,185,213,52,41,219,223,243,77,240],[96,192,12,105,195,37,107,188,139,47,198,133,211,31,160,229,153,57,167,5,173,147,150,186,223,0,250,249,46,240,16,83],[223,80,253,227,172,64,250,182,131,7,93,132,12,11,132,113,251,74,40,82,75,137,244,162,211,85,182,181,243,16,49,111],[81,224,102,185,46,24,12,18,59,244,129,199,138,21,84,35,199,204,175,54,55,39,177,224,80,76,90,85,80,156,84,74],[130,56,246,43,8,31,60,190,241,98,144,215,87,6,80,61,53,177,119,236,217,230,51,124,214,59,173,74,121,25,188,16],[66,76,178,216,196,161,11,74,72,56,158,110,200,10,73,50,83,74,212,31,127,129,240,181,116,115,172,3,192,122,137,248]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("call updateEthPrice", [[43,208,71,131,126,27,230,246,48,9,119,177,12,159,239,148,222,199,32,16,244,158,109,74,70,90,51,34,55,109,39,45]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(60, "bfukyb", [[210,147,81,213,206,177,112,223,66,148,51,112,232,20,20,223,253,120,199,68,158,206,28,69,228,150,42,75,165,171,244,92]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(1337, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[83,150,165,27,112,9,89,210,46,71,69,38,136,98,180,247,148,64,13,59,216,55,102,25,33,41,180,177,197,20,213,232]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("UsesExample", [[120,91,226,108,72,250,185,209,88,59,63,15,124,82,36,211,215,145,162,254,212,59,131,108,184,243,22,84,203,114,14,6]], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("dy16wn", [[130,45,206,164,210,126,9,67,18,10,18,81,239,251,41,10,28,196,11,124,225,42,92,109,207,89,135,120,12,224,233,160],[168,80,14,69,107,138,38,194,134,78,46,195,196,205,48,165,118,45,113,32,29,228,40,125,164,156,218,132,17,212,148,13]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(127, "0", [[134,121,172,52,72,63,207,245,4,3,183,87,38,223,136,92,36,107,246,65,106,129,251,253,233,111,66,64,105,131,134,111],[7,170,108,140,88,229,153,138,169,255,18,79,34,205,12,94,87,197,55,157,151,212,157,108,213,12,44,48,39,73,64,219]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(11, "jymm4q", [[54,71,20,41,82,248,99,196,123,180,82,80,32,42,94,124,89,146,212,217,123,72,243,69,120,255,163,197,97,33,152,154],[118,216,1,101,89,83,216,83,71,172,43,71,18,91,127,100,38,75,127,48,8,74,159,188,103,148,221,27,218,203,178,62]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("costUSD", [[4,156,143,48,64,72,57,172,60,101,120,89,232,72,144,142,23,18,67,9,118,24,59,236,223,227,45,122,235,119,255,215],[184,204,162,243,108,40,129,160,27,46,121,219,218,156,227,249,144,4,70,201,242,186,204,190,242,93,62,86,50,29,45,129]], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("RevertWithReason", [[245,67,100,57,200,75,105,4,6,254,249,42,201,167,27,164,187,84,200,183,149,150,16,80,95,27,85,199,12,252,250,100],[158,77,26,71,126,155,121,16,78,83,7,201,88,79,8,224,210,171,25,75,71,56,85,131,188,240,220,148,136,110,212,61],[15,56,216,164,238,230,204,186,56,85,74,68,4,156,218,27,50,166,160,103,198,1,217,93,54,176,58,205,252,80,232,225]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(161, "PayableExample", [[240,109,183,205,1,193,92,3,130,149,121,62,177,188,149,226,235,73,49,165,28,132,167,60,8,113,148,17,107,54,20,80],[43,181,174,146,168,108,189,228,136,188,0,28,241,136,135,243,173,242,2,189,97,215,211,238,150,147,252,13,137,118,76,73],[234,227,156,17,244,164,87,85,252,153,144,227,0,184,83,129,31,213,133,139,146,51,186,187,115,253,233,76,159,201,89,192]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(33, "Example", [[35,205,26,216,192,58,19,198,46,138,198,87,125,152,197,198,37,171,222,198,206,144,108,204,1,125,229,251,49,219,79,208],[208,180,105,8,254,32,139,37,72,28,1,36,232,195,165,169,114,203,34,28,101,171,68,83,144,17,165,226,70,254,64,77],[138,15,241,189,10,201,151,146,101,254,88,216,106,63,51,181,156,65,153,4,136,198,247,122,155,143,246,121,206,118,193,106]], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("bfukyb", [[126,45,95,123,67,141,61,38,14,126,114,217,59,83,193,40,35,150,117,242,38,91,61,87,73,176,229,40,104,91,85,99],[232,146,82,195,3,99,171,166,148,24,3,238,210,176,55,229,45,216,78,210,235,41,248,161,20,215,142,181,82,124,64,84],[153,158,166,119,224,37,231,95,99,113,208,100,182,74,67,112,96,55,186,188,196,44,130,38,159,176,85,126,173,56,28,150]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("costUSD", [[3,209,27,240,125,179,59,96,243,190,92,170,180,26,211,175,13,125,215,82,253,11,177,80,133,117,52,88,119,125,146,71],[63,101,193,30,135,131,74,26,44,46,24,239,171,142,19,157,35,71,157,180,67,130,117,145,168,55,111,248,17,115,97,157],[215,66,238,127,203,19,242,107,60,145,106,180,35,207,173,14,194,118,145,196,168,174,225,43,112,16,147,246,250,15,90,61],[73,204,169,28,187,127,5,117,5,150,222,136,16,170,137,193,38,109,58,219,36,206,140,79,36,109,32,8,39,41,188,240]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(60, "bfukyb", [[47,152,55,6,174,145,235,30,122,62,127,44,17,48,192,141,173,203,133,5,176,114,68,88,188,101,86,4,211,28,91,43],[53,51,161,215,115,163,65,115,53,245,98,8,135,159,204,239,240,72,229,123,27,195,17,85,142,165,98,194,132,216,103,101],[149,166,20,152,214,113,190,9,220,146,226,96,80,239,238,225,123,186,195,30,248,145,191,42,153,115,182,62,103,236,133,184],[134,195,129,220,85,3,64,188,196,189,155,186,88,16,74,168,17,156,152,21,154,220,152,76,20,48,165,213,40,125,16,251]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(54, "PayableExample", [[192,8,220,108,108,161,112,100,104,172,147,205,169,43,176,202,172,137,48,88,65,246,150,125,28,87,235,169,83,29,11,234],[97,92,231,35,88,56,227,4,26,165,18,61,13,125,70,137,167,224,221,228,131,115,253,197,46,192,191,0,239,248,122,36],[96,114,210,147,151,9,159,213,110,34,84,111,237,56,59,66,117,67,181,20,209,8,31,3,39,55,8,12,57,135,30,34],[103,150,9,241,56,206,0,64,62,147,170,44,26,217,227,93,225,149,151,182,242,127,203,240,182,218,181,58,40,186,8,239]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("Oraclize query was sent, standing by for the answer...", [[34,217,17,97,80,35,141,16,146,218,246,98,122,23,179,157,41,38,43,163,250,13,1,246,163,11,73,177,227,164,62,227],[230,58,55,133,182,166,25,169,165,70,136,73,48,204,180,206,123,27,245,196,99,177,120,228,127,157,18,231,75,77,89,243],[1,117,180,151,156,22,29,59,81,73,138,61,193,153,189,175,181,8,32,31,190,175,154,60,114,101,226,23,79,55,232,121],[201,69,26,127,121,144,135,168,152,178,13,213,177,247,88,132,161,92,84,224,226,148,212,117,9,35,161,141,193,248,113,231]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("call updateEthPrice", [[87,155,109,189,14,70,108,79,8,176,12,172,23,99,2,126,35,122,95,141,59,231,176,103,210,117,76,31,87,6,75,107],[3,105,239,69,248,242,164,200,189,234,52,51,78,202,3,7,214,153,89,198,254,205,220,110,202,109,56,84,121,88,213,111],[64,74,115,113,197,31,205,184,244,243,243,99,166,243,19,114,4,75,47,176,136,195,218,229,255,0,168,198,247,78,186,154],[0,230,153,98,64,198,231,121,25,207,67,153,162,37,160,4,0,46,48,37,96,241,90,148,132,103,17,178,156,72,133,142],[34,149,146,135,67,187,98,195,107,172,79,95,252,100,66,6,65,208,35,34,224,174,188,250,201,215,132,167,209,56,126,68]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(71, "listingID arg", [[219,199,90,94,38,244,100,221,249,169,127,216,142,87,231,251,115,106,160,48,52,129,175,80,117,90,186,236,74,64,233,222],[10,47,253,69,70,209,243,210,145,117,202,179,141,66,158,166,148,172,23,139,150,9,28,213,78,177,49,8,190,164,230,149],[111,130,106,139,6,146,160,251,35,88,49,2,2,93,213,175,14,74,158,207,143,104,53,59,146,182,50,168,41,184,142,226],[92,197,129,77,123,237,176,109,172,81,103,152,39,211,76,143,98,138,170,250,134,72,35,174,201,244,179,134,212,192,44,246],[195,228,168,247,109,85,91,45,78,169,41,88,239,49,106,212,164,106,224,40,184,112,174,206,202,44,103,71,161,164,94,170]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(96, "\x19Ethereum Signed Message:\n32", [[59,4,115,13,235,205,175,92,253,71,254,4,60,103,45,224,42,73,82,143,132,116,3,78,150,133,54,206,120,128,254,7],[51,165,97,177,115,150,172,171,11,34,114,200,175,200,186,46,82,162,52,213,63,67,78,124,162,79,3,88,85,224,178,47],[241,159,96,28,241,102,252,5,2,139,154,178,166,102,35,63,229,229,171,15,90,149,13,172,198,142,179,224,125,164,75,236],[73,116,202,125,158,106,161,17,148,61,238,120,253,57,113,155,167,0,146,73,39,163,61,24,78,245,28,47,220,125,216,84],[13,44,74,0,102,3,103,211,176,84,221,142,203,139,199,36,47,159,129,39,228,44,26,79,31,166,104,19,100,185,18,49]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("trade.totalPrice", [[92,91,86,81,20,60,15,221,92,45,250,248,195,23,136,138,123,32,121,116,113,184,160,59,243,68,13,83,78,38,194,190],[249,167,99,21,250,180,81,115,229,18,212,220,220,194,194,170,169,98,137,205,221,222,12,171,8,25,36,82,201,201,97,220],[70,31,236,219,218,162,242,227,235,42,179,93,143,146,210,41,9,213,187,216,178,31,67,56,95,20,202,183,97,244,37,197],[3,52,174,183,242,184,1,155,104,74,91,76,75,135,170,230,246,189,141,189,110,185,8,17,2,124,117,223,78,207,141,192],[97,195,105,99,163,78,162,173,171,154,65,16,127,145,59,171,240,140,157,235,235,244,83,145,67,82,53,125,84,127,12,214]], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([164],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[3],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(10,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("dy16wn",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("PayableExample", "dlxu3r",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("Example", "xazp8d",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("trade.totalPrice", "jymm4q",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("listingID arg", "listingID arg", "Example",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("\x19Ethereum Signed Message:\n32", "IsLibrary", "bfukyb", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("jymm4q", "Example", "Example", "Oraclize query was sent, standing by for the answer...", "PayableExample",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("b5qlo1x",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 31,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("xazp8d", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("L",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("0", 11,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("dy16wn", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(61,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["call updateEthPrice","Example","dy16wn"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[184,217,115,91,80,58,101,144,14,242,134,223,232,174,35,11,9,0,69,68,246,130,161,23,156,1,234,239,49,85,163,58],[251,228,240,25,182,194,106,104,154,222,85,183,219,12,8,21,16,228,82,90,10,174,230,117,151,182,82,215,122,90,129,154],[255,97,67,205,6,85,57,133,177,104,99,24,101,187,116,114,111,46,23,162,192,37,94,252,207,185,209,174,200,210,183,133],[121,41,17,109,83,29,48,93,36,70,110,167,232,165,88,80,12,92,55,95,195,207,41,137,16,190,155,152,196,76,238,112],[76,148,2,140,8,69,161,121,155,117,7,174,113,104,185,253,128,52,233,167,171,151,162,60,14,37,173,103,131,84,215,125],[117,17,229,147,8,97,124,101,51,171,142,152,43,204,188,234,217,217,120,122,103,29,29,89,231,158,60,224,161,166,60,46],[59,252,217,26,178,252,216,169,163,182,73,104,210,161,242,203,114,53,76,199,50,55,195,190,22,185,43,141,96,249,119,194]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(6, 2014223714, 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([242,55,82,12,120,163,98,113,152,2,144,61,143,163,239,142,66,244,5,0,94,79,61,1,215,150,171,59,219,154,175,57], [236,161,232,146,69,247,128,188,4,179,249,89,153,196,97,113,153,217,161,159,187,5,72,217,99,61,135,15,137,233,107,180],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([175,61,121,79,72,216,23,49,219,254,120,39,125,163,132,62,117,63,197,49,127,184,92,217,201,78,18,208,195,5,2,238], [66,107,206,234,255,75,47,253,129,122,46,158,221,57,0,44,226,118,182,48,29,53,247,144,13,100,145,109,154,154,192,73], [99,145,180,189,193,253,239,58,196,145,178,119,102,204,87,33,109,100,160,217,116,165,247,169,211,187,5,14,243,109,92,22],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([128,255,239,14,62,69,195,214,186,60,73,234,2,233,179,32,79,168,155,15,71,94,89,234,150,203,68,216,57,76,123,171], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([238,128,189,42,140,71,64,82,183,117,139,208,246,85,134,174,72,236,221,11,10,98,45,89,135,220,147,60,224,252,21,201], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([70,63,113,173,143,35,55,198,171,94,247,194,170,8,174,106,27,109,114,175,99,148,204,72,72,40,183,74,172,198,8,98], "costUSD", [129,84,160,5,97,233,242,238,67,130,136,44,251,235,3,195,69,43,200,247,16,105,247,38,221,57,14,188,6,76,161,83],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([2,20,75,15,22,69,193,92,156,73,39,244,31,81,59,8,96,54,252,46,71,54,154,11,116,60,101,171,88,89,68,204], "call updateEthPrice", [69,144,25,60,106,83,244,120,35,234,153,226,45,83,23,151,29,165,59,121,193,69,161,242,194,141,86,116,12,109,253,244],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([64,69,81,203,154,22,127,205,214,177,55,113,90,113,156,109,195,139,13,13,174,127,19,218,207,202,29,43,159,156,210,182], [136,77,104,198,114,175,209,137,144,203,29,179,96,246,13,117,56,248,56,220,104,186,7,111,34,215,6,67,182,245,213,169], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([64,69,81,203,154,22,127,205,214,177,55,113,90,113,156,109,195,139,13,13,174,127,19,218,207,202,29,43,159,156,210,182], [205,89,90,211,142,2,179,223,137,123,127,42,9,17,165,104,67,231,234,36,5,72,176,125,171,16,159,71,186,216,72,76,51], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([101,187,8,199,153,180,164,166,205,45,205,137,250,133,61,127,76,10,24,216,237,162,234,183,214,209,29,253,180,41,124,158], [42,115,89,148,137,221,61,28,102,95,17,212,190,254,235,26,125,252,131,0,204,249,24,93,104,196,222,52,11,223,55,178], [31,165,251,119,26,151,47,213,46,153,222,240,201,138,94,91,103,208,219,47,36,246,228,212,19,98,66,131,214,69,91,225], "dy16wn",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([37,206,206,205,84,180,38,186,197,67,33,239,129,246,128,36,244,67,106,210,23,42,146,152,65,34,112,171,56,6,0,243], [188,89,237,246,64,10,252,90,99,101,239,37,201,67,94,135,37,181,84,164,103,63,121,20,114,183,230,62,152,48,37,183], [62,92,220,181,99,54,248,67,21,108,244,135,78,99,132,85,188,146,81,82,202,182,35,16,9,129,246,182,78,232,134,186], "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([155,22,177,21,151,25,230,240,63,192,208,173,189,6,217,128,91,213,59,234,37,27,63,237,238,41,81,193,187,144,8,144], [67,225,80,98,94,120,74,65,194,51,114,114,45,151,64,166,177,12,243,227,237,165,196,255,192,48,208,68,63,155,15,170], [142,165,248,131,2,244,150,149,91,149,101,45,99,194,100,106,145,194,139,178,182,164,37,131,46,134,244,222,206,90,174,120], "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([11,100,6,186,5,83,181,154,221,210,35,2,239,196,111,178,227,205,96,175,163,148,43,115,195,227,141,63,253,253,133,47], [36,68,74,9,222,44,140,231,173,118,29,66,5,199,169,141,224,227,168,35,28,21,136,21,226,63,210,116,18,74,14,37], [227,103,148,31,108,214,182,66,29,183,54,162,92,184,126,146,205,72,185,139,45,29,157,0,36,117,191,157,54,147,39,34], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([41,60,168,41,132,44,190,127,246,150,130,80,213,255,53,98,14,211,12,238,241,141,7,67,20,58,255,248,151,250,28,245], [171,43,137,158,203,112,52,74,200,145,200,80,72,19,191,230,6,193,180,220,151,203,92,105,160,142,9,183,96,8,251,100], [231,125,72,154,114,229,47,69,119,118,220,85,144,10,194,103,65,157,8,33,29,94,195,33,247,18,201,126,192,56,196,31], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([123,200,88,25,185,233,191,245,28,57,250,158,161,191,14,14,212,190,118,183,156,95,77,89,129,93,153,68,187,159,16,103], [109,125,111,218,197,195,30,69,205,112,27,235,242,63,232,227,97,232,208,76,108,51,90,163,32,54,246,61,241,79,131,12], [39,129,72,232,67,71,14,114,181,38,238,178,42,31,240,130,86,88,140,62,213,108,44,180,5,49,70,81,247,252,45,27], "bfukyb",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([182,127,100,181,210,155,200,151,218,223,126,43,252,177,64,25,63,14,30,251,179,189,144,1,109,88,1,219,9,254,239,220], [188,174,213,204,136,187,1,88,235,181,132,121,13,141,223,12,230,10,168,2,236,88,15,193,182,81,8,159,12,13,94,163], [220,34,15,84,94,1,227,243,46,50,70,77,30,248,87,105,174,240,163,12,148,65,182,126,180,199,145,171,146,144,17,168], "dlxu3r",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([179,239,137,37,157,96,40,68,105,195,119,18,27,110,209,202,209,197,158,250,26,42,181,65,113,179,133,175,133,109,42,243], [247,22,29,5,57,205,167,172,79,167,233,252,109,120,218,126,99,221,61,112,184,76,71,163,54,175,75,191,244,112,15,133], [222,38,46,37,90,48,31,16,188,12,29,95,190,181,141,199,29,33,240,194,119,168,21,150,117,56,173,14,188,130,125,141], "bfukyb",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([148,235,196,22,41,221,33,8,44,34,55,20,37,81,37,254,201,244,156,91,138,226,18,69,218,26,4,158,195,208,188,149], 19, 47, [130,56,165,197,41,84,159,240,249,225,78,36,16,185,44,69,194,101,185,247,44,207,227,148,249,43,124,184,18,208,185,235], 2,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([63,55,98,188,59,215,8,83,36,157,74,53,241,206,192,186,103,181,7,235,158,217,140,220,169,10,212,55,61,108,159,221], 57, [76,2,89,207,187,176,227,28,113,239,183,101,68,55,194,205,83,109,124,170,155,23,103,56,228,100,58,204,213,239,102,150], [17,207,79,170,5,174,45,161,52,155,171,46,51,46,148,216,25,206,239,122,222,11,159,147,114,151,189,100,179,190,2,68],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([1,25,185,150,29,181,8,46,47,163,53,100,17,206,213,248,115,27,52,143,29,210,106,194,89,166,213,85,236,113,191,22], [252,144,244,95,75,97,232],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([26,80,145,149,128,119,91,229,57,177,104,173,64,177,97,101,189,55,30,156,13,227,32,124,117,17,67,155,7,43,129,236], [41,205,11,157,234,239,183,182,50,141,240,25,94,171,147,128,187,164,47,255,68,212,125,27,158,52,12,194,37,169,137,205,136,62,201,148,187,15,64,66,102,25,25,225,34,88,116,51,170,220,245,196,70,1,138,10,204,241,8,44,92,238,245,224,138],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
