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
    contractState = await State.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[5],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[9],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[1],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[3],contractProxy.address,contractTokenExchangeState.address,"RevertWithReason",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[3],contractProxy.address,contractTokenExchangeState.address,"RevertWithReason",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(5,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("updateEthPrice called",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("", "",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(10, "IsLibrary", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(47, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "IsLibrary", 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("P", "UsesExample", 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "PayableExample", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(7, "ETH", "", "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(87, "costUSD", "0", "IsLibrary", 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("Oraclize query was sent, standing by for the answer...", "UsesExample", "RevertWithReason", 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("P", ["PayableExample","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(61, "call updateEthPrice", ["Example","PayableExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(10001, "n7ugkh", ["hdfxgb","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","PayableExample","IsLibrary","UsesExample"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("Oraclize query was sent, standing by for the answer...", ["","UsesExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","","\x19Ethereum Signed Message:\n32","hdfxgb","hdfxgb","","\x19Ethereum Signed Message:\n32"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("", ["call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(60, "costUSD", ["P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(5, "Example", ["Example"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["PayableExample"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("PayableExample", ["ETH","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(1337, "L", ["PayableExample","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(10000, "UsesExample", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!",""], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("costUSD", ["hdfxgb","PayableExample"], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("hdfxgb", ["UsesExample","P","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(256, "L", ["ETH","PayableExample","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1336, "Example", ["costUSD","L","IsLibrary"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("", ["PayableExample","ETH","\x19Ethereum Signed Message:\n32"], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("L", ["\x19Ethereum Signed Message:\n32","uk2h94","call updateEthPrice","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(10001, "ETH", ["P","Example","sexr7i","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(255, "\x19Ethereum Signed Message:\n32", ["Example","costUSD","listingID arg","sexr7i"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("listingID arg", ["ETH","hdfxgb","Oraclize query was sent, standing by for the answer...","ETH"], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("L", ["call updateEthPrice","PayableExample","ETH","UsesExample","hdfxgb"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(59, "sexr7i", ["0","PayableExample","uk2h94","ETH","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(46, "RevertWithReason", ["updateEthPrice called","ETH","L","call updateEthPrice","uk2h94"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("listingID arg", ["costUSD","8dnq8j","uk2h94","uk2h94","UsesExample"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("sexr7i", [[17,15,111,56,122,188,14,108,189,156,190,87,62,209,93,14,153,173,76,45,40,219,133,143,251,30,71,225,137,194,120,106],[252,195,84,113,63,111,153,179,80,77,10,30,97,174,179,199,168,2,119,170,42,89,42,68,85,73,32,243,243,82,248,255],[86,141,153,1,50,207,163,99,138,75,169,107,84,233,171,202,150,216,218,121,193,106,251,16,134,144,24,165,254,62,110,237],[194,130,17,127,199,192,57,215,123,139,123,164,186,219,37,153,125,24,214,27,102,157,194,199,232,30,159,188,206,156,180,209],[74,137,251,121,21,197,126,102,243,5,53,72,210,162,46,68,90,48,38,160,81,50,27,147,159,174,54,23,52,79,26,232],[227,68,155,37,192,73,187,242,192,84,246,189,49,211,215,201,24,31,200,10,140,133,4,176,104,218,60,107,125,234,247,141],[142,212,76,15,73,247,155,169,100,100,69,35,124,156,141,147,215,38,55,21,224,76,105,140,236,222,188,100,219,52,89,62]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(4, "n7ugkh", [[177,86,16,31,5,116,9,213,36,57,48,182,198,215,138,160,102,251,35,144,138,190,139,36,56,152,29,3,22,117,171,72],[175,190,130,79,174,29,31,160,70,2,118,76,171,151,200,167,251,154,164,199,118,25,242,126,217,59,86,134,29,107,170,172],[32,238,166,73,69,78,209,193,113,131,252,235,213,120,50,57,225,135,161,86,37,80,104,168,121,168,215,214,233,22,46,93],[6,255,191,56,120,73,252,41,42,219,160,49,60,18,180,191,160,76,30,41,237,19,218,137,252,62,40,212,128,88,36,56],[28,243,110,181,196,243,115,214,171,157,246,160,145,114,203,99,107,24,46,252,73,122,206,230,3,41,82,42,95,246,193,192]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(95, "fzz64", [[173,69,134,30,205,190,171,245,151,13,200,169,240,156,63,191,46,4,238,149,186,10,102,156,171,76,18,10,38,95,238,182],[68,132,166,202,61,82,35,35,97,74,100,97,26,125,10,192,247,161,245,148,218,114,22,250,189,119,196,103,181,156,126,181],[237,178,104,167,67,165,95,1,87,179,221,40,232,184,149,40,175,21,139,115,77,237,127,196,187,221,40,174,51,215,69,204],[138,191,112,131,203,209,59,147,11,35,67,99,176,250,207,224,205,12,147,90,53,212,95,214,151,91,214,85,136,7,191,163],[137,218,127,116,113,212,192,12,44,143,77,253,86,246,135,157,200,211,183,25,78,118,232,148,43,91,70,28,70,60,197,241],[96,120,251,133,62,28,53,187,108,187,5,165,36,187,254,98,154,39,250,50,206,217,36,188,237,38,199,105,139,136,149,180]], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("8dnq8j", [[93,29,0,166,196,172,207,68,15,176,63,80,6,233,229,134,119,83,86,182,78,13,47,141,174,227,126,109,69,135,32,211],[99,149,95,145,128,136,99,12,43,157,164,230,87,38,128,147,241,2,125,250,162,164,22,17,219,148,68,31,88,32,45,73],[132,55,250,206,26,76,74,151,200,65,67,51,174,44,174,193,124,54,120,216,156,235,98,204,88,93,203,251,35,183,183,154],[147,188,12,185,56,146,112,149,2,22,228,255,2,193,207,4,118,147,252,100,24,3,133,254,132,61,96,17,174,27,111,214]], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("RevertWithReason", [[57,62,5,237,164,173,232,61,248,109,95,220,144,235,241,220,79,143,201,144,119,61,17,158,76,181,51,61,173,246,170,182]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(1025, "fzz64", [[230,36,190,49,200,68,11,33,61,101,233,171,192,211,149,202,81,204,172,83,136,30,118,19,166,62,19,146,141,168,225,223]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(15, "", [[211,38,108,125,118,138,163,35,21,11,16,9,34,195,167,209,176,128,113,34,192,82,129,2,217,3,184,109,81,240,0,123]], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("Example", [[9,58,95,179,129,20,20,239,152,255,20,109,136,48,7,94,63,151,85,62,184,112,94,135,107,254,159,8,208,202,132,92]], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("P", [[18,24,210,53,88,114,20,32,172,162,16,94,110,21,135,48,173,210,228,144,198,0,234,106,247,35,37,159,40,219,232,12],[10,84,31,172,129,245,106,14,222,215,164,206,240,178,177,159,57,201,239,12,6,176,33,230,147,145,178,232,134,212,150,19]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(200001, "Example", [[61,171,183,67,180,84,12,40,74,189,99,71,195,236,190,234,100,106,134,179,51,82,255,157,78,87,203,58,14,248,209,67],[172,2,86,32,51,154,197,152,70,39,189,104,136,46,38,143,183,148,13,246,204,114,19,92,220,46,226,234,13,132,118,32]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(199999, "hdfxgb", [[241,232,201,113,55,84,87,255,250,102,131,203,58,108,190,4,174,118,110,106,252,225,146,207,200,241,208,0,103,129,35,142],[29,0,77,218,227,118,47,22,252,223,222,245,212,152,132,103,40,32,164,178,149,169,239,149,101,114,96,146,8,38,46,153]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[79,17,165,183,84,83,212,143,164,21,173,214,134,27,174,196,97,8,152,115,138,255,219,215,242,65,8,102,100,234,206,171],[165,166,135,48,133,80,76,105,242,48,223,158,127,182,154,12,5,242,31,138,234,164,142,98,98,155,201,70,149,86,133,51]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("uk2h94", [[118,227,82,236,205,53,38,99,178,238,155,218,123,98,10,216,133,42,121,40,186,253,22,124,213,52,16,12,127,194,224,233],[50,40,136,133,133,193,63,45,115,122,169,124,49,27,84,157,119,8,38,233,141,116,212,226,77,124,74,97,221,163,44,102],[57,63,164,227,115,244,67,161,2,58,158,19,90,223,142,28,187,97,77,10,60,145,113,26,37,201,195,200,116,122,34,168]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(200000, "fzz64", [[16,137,237,129,170,237,10,67,95,219,118,212,80,125,238,165,165,100,35,138,107,116,236,117,70,120,47,139,235,67,172,114],[152,17,210,59,153,47,12,214,42,138,67,64,145,253,6,52,18,149,64,147,163,195,112,157,59,251,144,16,68,137,118,75],[249,243,248,158,173,231,217,229,31,102,107,42,1,34,208,57,202,148,100,72,187,19,188,228,236,11,176,174,186,167,15,94]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(48, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[155,208,238,117,253,91,239,194,19,213,209,26,37,98,56,115,2,143,23,88,25,125,234,23,141,167,246,237,51,49,137,247],[192,72,146,215,245,16,1,69,185,110,142,104,245,143,213,210,98,61,213,144,0,16,200,29,216,204,26,233,211,78,219,244],[88,32,255,24,100,211,44,114,14,20,69,38,90,60,60,6,49,237,228,142,41,86,136,218,40,253,136,191,157,32,165,217]], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[164,158,151,205,240,196,118,75,143,42,139,17,90,75,100,69,93,220,46,82,150,123,233,92,215,228,141,11,3,20,53,227],[76,62,218,28,57,196,196,71,174,210,41,148,223,212,224,99,58,192,91,48,193,28,150,160,21,241,56,9,196,97,13,194],[212,215,83,231,180,67,227,146,213,111,19,56,38,20,161,226,87,87,133,221,44,21,48,128,97,157,208,197,36,202,208,62]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("updateEthPrice called", [[187,60,170,251,71,50,198,64,181,118,91,189,216,213,25,22,37,185,107,239,3,88,191,21,253,10,28,96,247,204,68,148],[191,53,143,11,56,101,82,196,125,120,191,193,194,164,46,49,185,155,67,250,55,241,117,172,198,224,241,32,191,243,164,253],[255,17,138,82,4,127,78,11,139,114,102,221,229,184,38,33,26,236,11,137,33,179,185,83,95,169,147,3,221,189,182,226],[240,119,186,61,209,7,177,11,222,212,133,81,156,221,72,162,138,69,138,101,29,79,164,94,217,120,172,24,51,201,46,91]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(257, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[65,16,166,61,138,165,10,208,141,207,31,206,218,197,212,18,141,41,205,201,32,118,113,47,155,51,186,198,154,240,219,45],[233,175,165,160,240,131,18,195,212,125,86,219,91,171,8,236,34,124,45,79,138,17,6,188,115,186,13,201,230,86,169,253],[126,194,14,97,161,134,167,133,202,41,93,216,79,147,122,21,161,27,126,122,169,88,230,163,148,157,34,40,17,120,216,224],[180,201,176,125,59,215,175,181,47,70,50,135,73,9,199,93,203,44,46,248,16,35,168,20,107,34,152,81,7,70,252,210]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(1023, "fzz64", [[141,255,198,250,175,201,132,34,223,146,74,60,48,91,110,106,227,147,62,204,200,55,88,86,164,93,166,190,9,126,6,72],[229,245,12,175,147,94,60,74,123,103,117,122,32,205,88,92,217,37,176,33,225,60,53,227,130,171,190,76,5,235,221,48],[111,56,127,193,42,76,140,31,189,140,82,180,27,163,129,147,243,127,35,58,162,199,153,117,15,156,23,246,22,39,252,206],[223,174,105,110,201,52,99,137,4,100,252,23,113,71,146,149,227,216,250,52,25,8,148,164,119,32,133,16,121,116,179,140]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("L", [[237,51,211,250,73,12,177,13,10,28,181,192,61,10,151,133,82,128,118,184,194,136,79,84,209,102,208,208,13,123,229,7],[117,116,7,250,222,93,115,198,20,39,113,213,108,40,252,37,226,171,161,184,95,92,218,201,251,143,222,194,94,249,212,253],[140,253,51,244,173,110,19,66,8,26,63,38,57,243,62,156,1,235,233,124,96,31,123,209,36,94,227,152,139,2,146,55],[11,133,65,78,102,22,29,17,222,194,253,77,206,94,234,178,64,203,140,20,59,241,146,124,146,154,195,194,67,34,101,168]], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("", [[142,141,115,129,243,139,191,107,101,59,166,249,118,157,215,168,27,24,55,14,10,155,30,251,42,50,107,197,115,233,198,31],[31,128,101,164,235,200,115,27,69,222,32,222,129,39,186,102,196,138,217,95,11,2,115,217,83,202,138,7,24,139,28,48],[193,209,73,162,245,1,39,166,16,187,31,12,141,175,193,244,28,167,114,35,68,72,102,11,59,253,200,182,10,83,243,39],[152,202,52,210,218,44,4,39,60,153,167,132,2,54,34,25,25,202,108,47,213,148,140,152,86,142,216,239,221,101,138,91],[214,2,123,75,130,149,43,204,194,224,186,197,200,158,38,196,63,126,3,18,154,164,153,18,105,85,219,180,109,189,67,69]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(103, "IsLibrary", [[124,70,134,160,13,56,243,209,35,175,58,11,4,165,221,7,232,224,231,228,24,208,39,96,254,163,109,21,30,18,228,7],[240,228,185,31,0,84,177,71,193,193,232,247,229,65,216,180,101,105,170,88,66,142,201,201,250,179,205,185,56,162,158,144],[53,109,22,60,94,44,142,99,216,58,206,7,242,58,152,179,71,226,94,204,248,212,220,211,192,100,35,57,195,89,152,20],[218,117,99,194,114,145,98,243,232,32,249,138,85,53,254,95,32,150,237,91,8,25,134,108,10,162,15,148,82,185,152,49],[228,58,112,117,136,96,233,9,113,27,93,190,148,71,86,74,181,180,51,88,206,174,18,40,113,210,190,221,141,20,230,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(64, "sexr7i", [[74,236,69,184,237,93,27,175,51,139,183,50,84,140,117,251,59,178,60,134,75,92,143,102,116,67,45,89,174,68,34,83],[155,157,131,30,76,17,182,68,8,160,199,220,197,233,134,175,25,6,105,132,192,0,203,139,30,71,21,80,243,86,14,206],[101,133,40,116,203,186,185,187,47,93,233,56,42,191,12,171,210,146,16,58,192,185,132,16,82,18,97,130,39,220,164,47],[82,110,87,246,248,206,175,69,176,251,119,111,124,190,77,56,176,47,218,79,203,214,177,89,180,91,239,29,93,244,67,150],[47,183,136,170,220,42,250,0,248,165,27,93,183,65,243,224,145,24,226,54,204,39,126,243,156,170,253,130,87,228,134,96]], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("Example", [[92,162,157,58,42,177,58,11,114,100,46,99,70,48,126,133,172,165,16,195,169,80,89,37,48,136,171,136,8,122,213,9],[222,246,149,215,6,45,211,224,97,58,66,0,198,64,232,203,123,215,152,98,67,186,137,51,197,156,78,226,197,57,36,165],[130,12,194,36,8,14,109,217,76,185,176,244,76,202,125,39,17,213,48,1,82,88,56,209,91,177,73,246,123,51,31,245],[10,122,16,119,246,101,93,95,216,19,97,179,238,222,94,115,91,92,192,106,213,219,0,222,119,23,91,237,234,78,189,145],[143,120,122,165,182,107,159,76,102,94,93,16,99,76,97,55,241,235,183,96,119,75,61,40,179,202,26,135,23,84,174,110]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([253],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[5],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("L",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("L", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("IsLibrary", "PayableExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("8dnq8j", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("UsesExample", "costUSD", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("\x19Ethereum Signed Message:\n32", "IsLibrary", "", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("lgdafg", "RevertWithReason", "RevertWithReason", "RevertWithReason", "ETH",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("uk2h94",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("hdfxgb", 30,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("PayableExample", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("listingID arg",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("PayableExample", 11,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ETH", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(10000,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["fzz64","IsLibrary","zgwgsk","","call updateEthPrice","uk2h94","sexr7i","ETH","","fzz64"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[62,205,59,232,97,67,107,226,213,32,192,121,30,15,120,124,179,109,110,103,130,183,36,34,52,150,248,185,215,57,120,145],[237,232,24,251,115,51,67,105,96,102,98,155,213,219,20,172,242,157,84,176,245,241,11,38,22,121,81,182,73,201,46,134],[18,152,68,99,82,135,151,153,163,169,149,86,22,55,193,23,192,194,75,78,205,20,186,145,102,39,144,60,214,89,131,155],[37,206,115,165,65,68,245,247,168,84,9,40,249,127,205,10,245,97,30,23,254,244,115,59,235,157,138,167,246,229,135,140],[155,139,231,167,32,131,160,99,94,126,122,238,179,232,223,61,109,178,197,17,223,240,243,68,214,79,68,204,21,143,3,149],[152,121,198,55,27,212,125,80,226,162,233,70,122,253,138,66,218,201,225,123,229,149,108,89,89,203,90,0,110,68,36,14],[167,197,247,72,23,250,148,96,64,114,168,139,235,139,94,0,106,212,26,245,198,152,157,110,54,138,9,38,167,148,17,32],[131,84,122,158,196,39,142,32,228,29,65,11,246,68,247,203,243,238,252,254,172,131,64,183,90,114,148,198,203,112,93,38],[38,62,196,155,149,226,102,62,131,216,37,175,238,172,194,170,42,95,132,155,203,60,101,29,177,107,22,78,92,86,45,114],[188,111,241,19,67,200,203,139,129,175,6,106,26,199,23,11,115,160,61,110,32,9,243,95,196,139,209,120,244,117,121,127]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(70, 257, 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([228,253,8,133,63,134,107,176,180,110,28,117,224,195,96,125,3,212,168,15,97,100,158,76,130,181,198,27,72,88,118,207], [90,41,7,204,56,213,246,227,147,240,108,211,178,163,198,80,216,149,204,195,115,223,224,230,253,56,195,7,205,72,128,217],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([117,16,89,12,13,113,213,198,107,127,186,33,122,189,202,226,24,120,117,167,2,56,141,156,96,201,127,44,246,249,157,4], [235,106,209,172,0,54,223,115,134,79,109,235,194,220,226,76,176,86,46,204,7,187,183,230,148,218,71,48,252,141,136,98], [62,219,42,134,127,178,2,85,18,92,194,6,114,218,119,97,158,68,81,98,230,165,211,25,10,244,169,56,50,48,165,254],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([149,54,155,69,60,169,31,69,12,52,191,1,142,200,53,61,176,243,245,196,55,120,130,224,43,186,37,21,198,252,195,96], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([56,230,253,116,109,179,251,5,191,179,197,204,255,124,151,137,68,90,49,196,27,61,161,103,200,31,195,139,250,185,42,160], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([108,35,216,174,122,36,176,235,143,59,173,231,114,180,178,30,199,3,148,120,176,61,120,19,172,71,88,83,241,165,80,160], "PayableExample", [172,144,40,107,213,166,172,81,5,67,95,101,155,2,243,196,101,143,168,211,100,229,145,50,120,182,240,131,74,216,222,20],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([17,114,164,203,118,60,84,94,103,227,0,115,56,26,233,127,10,63,91,59,126,194,4,193,149,227,170,106,149,196,108,248], "costUSD", [148,114,60,110,216,138,82,142,145,246,206,110,189,93,197,114,160,192,75,157,25,38,187,180,186,156,6,167,172,171,199,245],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([222,167,86,168,245,156,202,1,101,221,49,246,51,104,62,200,243,99,219,213,109,83,248,232,51,103,34,143,77,253,246,99], [188,168,83,126,160,196,220,137,194,21,60,163,227,243,172,220,133,170,77,77,175,50,144,106,243,19,28,247,151,202,230,45], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([222,167,86,168,245,156,202,1,101,221,49,246,51,104,62,200,243,99,219,213,109,83,248,232,51,103,34,143,77,253,246,99], [26,178,16,38,243,164,200,84,217,237,49,36,125,227,145,12,52,79,97,32,101,162,49,198,121,129,4,235,81,153,135,231,240], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([177,124,37,72,96,99,116,212,104,86,191,39,140,91,238,251,233,50,160,246,178,34,156,161,58,203,199,163,2,142,72,222], [209,65,36,118,229,150,19,242,88,230,81,155,66,203,103,103,7,107,63,197,17,141,74,22,58,186,167,181,227,138,181,182], [221,75,51,214,68,249,140,203,227,179,36,118,234,9,201,5,45,61,84,34,222,68,128,207,93,255,147,199,127,191,72,5], "fzz64",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([156,161,67,246,17,38,3,242,242,64,231,209,203,196,254,239,131,33,37,108,67,174,82,190,86,224,19,153,246,79,228,64], [76,41,225,11,53,171,75,183,249,168,60,169,37,236,224,222,63,84,38,202,160,38,250,7,50,139,204,46,237,225,218,120], [204,237,155,72,236,241,8,76,130,209,190,193,204,68,98,211,181,245,235,9,31,194,103,230,132,16,202,116,110,132,115,175], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([114,94,24,228,230,73,154,249,97,150,54,223,107,251,20,248,54,130,19,235,73,210,64,85,88,206,34,14,190,164,122,135], [54,168,64,103,241,65,8,220,100,181,49,33,30,5,2,126,12,2,180,38,205,118,90,224,5,154,28,244,49,186,207,50], [178,118,177,32,91,93,229,135,75,175,161,218,251,225,17,95,108,233,180,248,111,244,208,99,6,57,251,10,107,37,211,77], "lgdafg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([143,194,29,122,6,230,24,3,116,123,215,148,99,3,247,149,228,44,105,226,152,103,26,246,244,40,132,193,198,159,150,172], [7,159,79,65,116,109,119,182,201,147,90,95,225,174,227,150,133,152,193,233,120,67,121,33,88,65,199,33,220,145,154,197], [236,113,250,107,122,16,139,145,157,129,221,132,21,12,234,193,198,193,241,67,17,93,90,98,144,226,53,196,219,53,37,138], "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([115,227,55,79,234,247,253,212,198,139,151,36,39,129,214,247,89,45,142,129,83,76,204,227,220,78,130,36,231,230,211,134], [173,234,27,78,253,69,251,103,213,153,10,199,189,2,75,152,45,65,131,135,189,188,5,17,110,126,76,23,66,96,249,184], [191,79,24,100,148,136,136,50,190,135,118,239,248,161,110,217,87,177,0,54,192,69,230,207,150,95,244,16,148,231,61,146], "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([61,211,202,243,122,233,209,11,83,76,142,255,227,136,41,252,130,41,17,238,194,61,124,248,103,134,34,47,84,168,88,220], [161,76,214,175,168,53,112,253,153,153,225,97,190,92,251,200,107,208,203,204,135,237,84,214,118,203,48,164,114,71,149,213], [18,97,179,87,180,84,12,148,223,133,152,155,102,181,110,244,223,48,174,14,94,182,39,81,242,129,149,249,85,138,112,180], "lgdafg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([2,176,15,218,40,81,59,190,230,88,80,174,102,128,227,230,17,179,130,15,193,83,178,139,177,113,70,64,255,39,52,135], [41,0,172,204,178,164,178,61,97,243,51,201,185,114,164,233,5,83,66,84,73,11,170,216,131,46,7,171,180,56,89,131], [189,15,119,133,27,124,44,217,80,107,73,255,238,0,146,46,7,20,224,107,119,137,1,74,51,113,100,170,121,74,233,71], "fzz64",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([186,124,38,97,225,105,228,183,76,105,147,122,231,235,183,22,48,246,192,3,209,152,115,55,66,9,151,97,121,200,27,126], [240,154,148,86,64,85,13,231,239,246,180,79,212,173,109,141,237,118,106,55,151,234,232,89,157,56,43,113,246,232,43,180], [72,226,195,20,53,226,208,105,103,231,244,233,99,131,213,106,150,232,198,198,39,205,166,245,216,90,169,52,134,50,37,90], "L",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([185,214,61,251,116,134,44,232,160,135,125,170,2,97,90,254,124,16,15,156,165,53,59,38,199,80,205,173,254,68,85,5], 160, 26, [75,38,90,185,24,168,201,239,149,107,196,181,187,142,120,197,60,26,29,95,244,135,203,61,44,211,13,204,152,34,187,237], 160,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([179,51,10,200,71,154,81,217,140,124,224,199,35,255,185,142,12,119,43,172,202,76,176,94,167,176,173,236,62,204,211,191], 254, [11,24,74,187,252,28,148,243,45,191,211,128,10,127,206,166,128,137,42,168,245,218,10,225,227,239,197,92,31,118,205,168], [110,54,97,192,19,180,69,20,13,64,215,114,218,12,63,240,42,121,40,48,238,105,177,62,81,160,77,21,55,247,197,27],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([49,127,171,222,223,244,167,49,111,118,102,94,43,230,193,76,40,107,46,7,208,41,246,94,201,249,7,2,158,156,116,197], [124,169,99,56,127,34,73,123,123,39,91,108,89,211,117,251,204,131,111,53,10,117,69,174,190,162,122,159,104,31,61,143,153,127,216,254,220,76,21,47,45,68,115,227,190,61,2,184,219,175,167,122,106,237,6,163,145,24,166,97,195,102,16,87,102,178,121,7,79,123,208,144,174,111,50,170,88,18,81,0,185,78,91,76,178,131,128,29,225,159,118,40,218,34,244],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([165,125,205,44,246,13,166,106,179,163,157,140,33,18,118,105,214,0,238,252,13,180,86,245,21,128,96,69,146,7,132,147], [115,145,214,147,31,207,17,7,184,4,47,146,30,101,117,125,187,160,31,128,45,30,66,15,93,177,72,69,145,167,7,239,222,15,20,233,141,243,153,92,136,209,255,103,4,157,171,213,159,108,216,123,1,38,174,105,42,63,119,179,106,214,217,152,1],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
