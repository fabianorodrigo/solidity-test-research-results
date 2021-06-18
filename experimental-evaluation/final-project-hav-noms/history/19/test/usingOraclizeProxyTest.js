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
    contractState = await State.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[4],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[4],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[3],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[5],contractProxy.address,contractTokenExchangeState.address,"trade.totalPrice",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[5],contractProxy.address,contractTokenExchangeState.address,"trade.totalPrice",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(54,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("IsLibrary", 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("IsLibrary", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(2014223714, "RevertWithReason", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(33, "IsLibrary", "0", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("costUSD", "Oraclize query was sent, standing by for the answer...", 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("IsLibrary", "RevertWithReason", "z43hh",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(58, "listingID arg", "L", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(58, "L", "PayableExample", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("ETH", "L", "trade.totalPrice", 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("PayableExample", ["z43hh","listingID arg","RevertWithReason","ETH","call updateEthPrice","P","","Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(162, "PayableExample", ["trade.totalPrice","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(10, "\x19Ethereum Signed Message:\n32", ["PayableExample","PayableExample","costUSD","UsesExample","","RevertWithReason","0"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("PayableExample", ["vtiw2","L","\x19Ethereum Signed Message:\n32","updateEthPrice called","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","L"], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("P", ["vtiw2"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(0, "ETH", ["UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(129, "\x19Ethereum Signed Message:\n32", ["updateEthPrice called"], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("IsLibrary", ["call updateEthPrice"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("UsesExample", ["Example","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(22, "L", ["L","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(1338, "Oraclize query was sent, standing by for the answer...", ["IsLibrary","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("IsLibrary", ["call updateEthPrice","P"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("UsesExample", ["fems9","\x19Ethereum Signed Message:\n32","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(256, "UsesExample", ["UsesExample","Example","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(61, "", ["fems9","\x19Ethereum Signed Message:\n32","RevertWithReason"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("RevertWithReason", ["g34bes","IsLibrary","call updateEthPrice"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("", ["P","call updateEthPrice","costUSD","Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(98, "listingID arg", ["call updateEthPrice","trade.totalPrice","costUSD","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(255, "L", ["vtiw2","","PayableExample","Oraclize query was sent, standing by for the answer..."], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("tqpedg", ["Example","z43hh","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","IsLibrary"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("P", ["alm67w","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","","alm67w",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(1337, "Example", ["z43hh","listingID arg","IsLibrary","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(5, "UsesExample", ["xshjbj","g34bes","","Example","fems9"], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("tqpedg", ["trade.totalPrice","\x19Ethereum Signed Message:\n32","","z43hh","listingID arg"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("listingID arg", [[143,7,89,135,213,176,150,98,133,191,0,224,24,149,136,3,171,231,97,130,201,154,80,22,121,207,183,110,70,220,76,208],[3,148,139,36,171,14,43,2,171,148,209,178,162,187,181,249,63,113,231,47,69,87,38,179,220,142,124,157,93,74,180,102],[24,212,1,99,207,33,50,146,19,194,160,228,234,218,60,88,10,92,168,210,38,93,201,138,226,234,1,26,67,201,100,162],[31,87,39,39,175,175,12,224,146,13,87,188,252,68,21,178,134,203,86,224,59,79,76,83,203,173,113,115,86,9,92,136],[245,136,113,54,92,170,86,170,116,157,255,252,145,210,9,180,11,243,188,221,68,157,107,140,95,14,138,238,75,235,81,11],[147,98,2,127,43,13,109,155,45,223,108,103,197,155,175,251,19,41,40,64,192,64,136,174,45,5,10,88,182,121,110,162],[101,236,188,32,120,209,64,218,63,48,111,208,171,187,49,58,155,75,249,216,173,123,191,54,108,206,75,18,201,135,218,146],[232,41,143,177,110,42,118,214,165,172,69,38,114,160,6,240,222,178,11,131,23,164,61,177,11,93,26,166,88,27,26,220],[4,246,236,89,41,135,223,83,234,205,104,104,101,122,154,146,97,77,142,41,218,237,236,45,59,104,190,254,254,32,63,245]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(162, "trade.totalPrice", [[22,7,138,4,237,187,17,244,168,116,128,62,136,146,65,86,172,98,168,7,246,191,211,253,253,149,45,162,134,27,146,92],[139,2,225,147,79,141,27,207,15,59,196,37,20,24,154,237,82,194,84,62,193,164,171,169,230,223,44,113,216,29,142,211],[170,162,19,49,247,178,99,148,155,173,111,156,219,182,216,155,133,33,60,147,153,51,89,34,109,9,122,57,197,219,108,164],[60,168,127,56,83,103,7,131,106,60,31,123,28,106,139,176,6,232,94,79,210,155,103,157,231,196,126,60,142,63,111,217],[12,143,154,32,1,167,64,185,243,52,16,114,105,254,66,191,75,8,62,69,114,54,177,220,242,160,219,141,74,26,237,59],[201,76,140,217,68,248,238,122,138,250,85,197,34,93,84,85,64,234,105,35,82,26,212,99,44,24,154,28,16,207,157,162],[173,188,191,163,190,176,131,21,60,165,18,201,98,37,242,117,201,26,51,44,226,152,143,91,13,29,29,244,203,160,180,117],[76,79,55,27,25,41,225,61,97,234,11,165,102,248,177,21,16,9,159,104,23,102,249,188,142,153,207,193,183,100,128,163],[111,213,197,51,226,133,167,189,113,82,173,44,229,140,68,168,205,248,140,207,130,190,231,142,145,121,64,127,5,122,32,231]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(54, "Oraclize query was sent, standing by for the answer...", [[60,237,109,12,93,146,6,54,128,195,135,218,171,81,169,17,181,190,82,116,97,4,99,82,58,54,3,60,86,170,139,242],[47,238,74,198,10,18,16,175,1,192,198,108,126,77,237,211,208,16,125,17,62,63,62,156,128,249,12,110,156,41,100,223],[197,51,36,137,20,247,246,172,179,189,176,67,27,157,126,231,88,17,140,191,252,232,61,96,190,255,81,216,100,16,21,183]], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("tqpedg", [[111,199,177,149,86,94,192,169,12,215,157,115,54,26,97,96,141,212,82,151,87,148,246,251,60,53,240,251,142,17,188,134],[137,112,121,178,4,68,81,2,7,79,238,145,60,126,143,151,79,179,239,16,137,7,153,87,27,181,244,103,204,125,224,152],[163,111,83,102,141,115,213,199,53,169,219,212,171,127,130,249,9,197,239,159,25,218,10,68,72,14,212,177,231,136,64,31],[91,87,118,206,147,64,58,34,209,56,30,49,65,10,65,15,135,137,109,50,71,157,81,102,10,49,139,229,94,2,254,199],[76,228,203,109,90,181,226,19,143,63,82,71,243,211,154,187,211,22,96,130,15,100,74,244,79,197,108,95,23,12,219,199],[206,201,249,246,190,168,208,48,65,141,245,13,191,94,181,145,68,51,33,134,202,23,59,188,68,219,6,245,29,207,233,245],[95,179,98,109,122,254,252,175,105,252,114,195,85,79,76,229,78,51,142,85,160,12,74,6,116,66,87,91,197,100,139,181],[195,12,23,235,243,112,164,192,4,186,14,61,117,205,241,172,175,118,18,68,151,11,190,127,91,181,134,200,169,11,131,66],[178,98,36,253,3,77,228,61,108,134,135,16,116,155,243,190,134,131,133,124,239,71,100,32,209,248,144,187,60,248,113,240],[164,111,110,193,121,229,154,145,143,128,75,190,39,59,86,174,36,76,146,158,35,251,197,38,32,239,41,38,120,219,5,80]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("ETH", [[206,199,13,37,220,117,72,47,161,3,152,151,145,91,203,221,52,153,36,245,145,125,70,53,152,33,9,92,1,218,87,80]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(18, "Example", [[60,68,77,109,253,81,137,47,38,98,180,68,240,52,255,243,150,57,160,202,128,227,67,106,253,153,188,88,137,56,6,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(18, "tqpedg", [[239,71,198,119,9,133,193,21,84,105,78,102,42,22,102,142,32,18,150,243,68,175,251,100,236,205,171,69,221,7,194,33]], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("P", [[61,226,189,99,111,13,151,45,92,111,237,43,10,169,64,47,167,173,241,35,212,132,20,98,241,132,121,37,220,188,136,98]], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("fems9", [[72,141,198,155,90,101,252,130,164,254,90,154,160,97,78,150,150,101,105,147,17,201,101,44,214,99,13,70,160,6,161,101],[237,143,41,106,167,90,167,197,172,12,119,58,242,92,13,239,106,20,121,183,11,6,132,126,140,159,147,141,132,88,208,179]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(96, "fems9", [[11,136,138,65,118,36,94,70,223,103,81,222,82,201,29,129,197,240,74,120,82,194,29,10,104,27,150,114,211,163,249,101],[52,188,226,249,203,107,139,208,70,87,95,88,214,151,156,227,114,104,106,113,5,218,186,165,53,173,177,15,113,119,241,77]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(20, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[95,81,68,157,26,102,59,105,52,131,219,203,226,7,146,168,111,170,173,4,33,77,172,117,157,61,127,26,228,17,26,222],[211,164,245,158,103,107,222,94,156,87,47,25,71,248,83,7,201,237,27,239,62,142,97,60,187,219,19,128,130,41,164,212]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("fems9", [[154,234,214,235,186,194,57,121,202,237,30,46,135,50,124,22,167,50,243,102,64,50,220,235,145,129,28,251,45,14,118,213],[90,137,193,6,119,73,248,1,123,202,219,241,215,95,134,83,247,183,153,17,73,115,142,104,94,227,48,44,174,151,11,69]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("clxvec", [[108,162,195,187,0,8,252,237,108,229,66,149,115,133,157,46,191,17,224,94,52,207,216,30,186,221,100,108,90,189,238,161],[234,81,59,41,199,170,73,24,88,45,64,20,130,108,102,195,169,238,175,26,200,217,255,85,198,168,64,59,99,0,103,170],[189,254,97,14,86,39,217,198,96,55,242,70,0,208,228,226,65,6,39,86,196,233,174,126,221,162,249,42,136,68,254,55]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(21, "g34bes", [[50,14,50,45,157,145,71,241,128,188,174,106,191,191,25,142,195,165,53,123,47,79,66,23,124,168,219,142,167,55,62,99],[219,100,239,14,109,202,238,207,43,115,69,174,110,255,27,8,219,86,78,58,42,223,195,6,241,111,153,23,126,153,66,201],[51,73,49,14,118,37,205,49,46,68,181,106,22,234,131,10,247,120,95,44,168,136,11,97,163,134,46,140,156,34,91,242]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(1532892063, "listingID arg", [[220,14,230,80,149,147,78,205,208,226,212,48,35,176,45,126,217,129,83,80,119,221,39,5,50,217,27,8,172,118,169,166],[216,179,123,219,254,240,139,163,247,13,150,80,211,67,176,106,121,50,90,246,12,47,101,245,142,114,128,217,255,8,116,231],[221,151,44,243,51,162,38,5,86,171,103,92,130,38,155,78,70,247,77,81,28,22,120,129,115,110,115,162,13,223,233,171]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("L", [[227,22,47,213,214,159,60,18,142,203,80,31,14,246,75,9,36,125,218,160,89,65,38,135,56,201,180,27,188,163,44,173],[89,105,178,241,156,20,50,188,104,3,133,58,181,149,152,45,115,201,38,51,24,84,104,0,128,135,16,210,26,9,170,209],[135,14,218,126,137,254,155,193,250,176,197,252,102,96,169,218,211,143,27,174,141,213,15,192,210,152,238,62,49,193,255,198]], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("0", [[231,122,233,62,128,236,178,77,71,228,13,144,65,113,205,67,132,236,186,178,38,217,226,62,143,20,119,30,92,61,104,197],[11,177,222,173,160,74,132,35,79,190,22,239,51,129,251,24,185,173,245,111,208,119,89,70,212,230,12,215,23,8,148,180],[113,233,134,143,252,167,130,148,119,194,114,76,26,160,204,29,27,180,98,215,89,180,246,64,211,64,252,17,216,170,125,119],[44,224,220,71,79,84,201,251,210,189,143,73,19,225,132,63,172,160,39,84,152,34,236,123,103,120,197,165,253,169,23,64]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(58, "PayableExample", [[93,21,55,36,238,204,177,239,68,147,254,209,242,167,60,6,7,210,148,81,11,59,134,24,87,169,133,158,114,147,181,137],[62,187,125,228,97,101,149,231,134,88,226,114,77,92,150,213,123,127,186,194,223,193,209,239,51,104,130,105,114,49,53,158],[166,40,33,215,144,165,20,150,201,135,128,160,66,247,85,85,60,150,168,238,68,252,79,159,71,158,171,46,56,63,224,12],[249,128,0,116,130,245,32,40,199,255,207,174,87,39,92,224,139,172,179,118,84,108,43,24,93,54,163,8,162,71,205,224]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(162, "jx542", [[74,238,138,53,31,110,130,191,30,33,67,68,120,219,194,3,7,128,226,248,182,217,199,199,196,70,139,64,125,226,53,208],[79,175,117,190,234,40,23,148,26,217,71,197,66,218,94,184,215,7,74,242,37,128,186,204,145,198,156,107,20,18,15,108],[80,94,119,165,74,219,83,176,236,10,224,244,217,156,199,231,56,216,200,2,45,154,223,49,74,30,168,55,230,221,45,87],[19,68,252,1,221,238,103,158,186,11,248,152,111,232,78,175,9,202,239,39,12,187,188,71,214,7,189,248,220,75,61,182]], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("IsLibrary", [[119,203,4,135,169,174,99,146,107,231,50,172,73,223,114,145,212,234,96,52,68,37,158,221,57,113,223,108,7,150,117,155],[107,220,100,110,252,148,21,107,117,88,26,184,118,89,232,93,185,131,58,239,247,73,63,170,106,29,236,160,126,66,25,196],[104,108,197,96,84,142,82,221,179,222,165,121,116,18,122,176,164,119,139,148,108,171,8,210,4,107,202,235,39,243,113,190],[173,95,122,211,115,56,245,197,74,251,5,60,22,254,254,216,6,195,39,220,255,102,253,89,84,101,18,199,158,30,202,102]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("jx542", [[224,66,150,239,213,134,251,32,48,208,215,67,238,51,156,157,225,4,113,47,81,146,23,22,126,28,104,62,228,154,10,58],[195,38,175,179,4,229,118,48,102,27,195,168,208,72,178,208,97,122,179,203,18,208,181,236,129,28,73,245,163,248,67,1],[192,229,67,9,147,67,68,48,218,36,37,158,77,43,115,95,83,51,65,100,9,44,149,189,12,76,255,195,104,10,58,1],[120,129,103,202,89,72,46,65,159,65,83,26,250,111,204,137,156,120,54,221,16,46,202,190,43,212,94,99,74,13,116,148],[243,13,30,102,104,115,50,34,191,151,194,8,180,153,122,243,200,104,234,122,149,253,105,22,150,76,72,105,169,228,168,161]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(20, "ETH", [[22,145,101,12,89,152,184,41,52,62,206,18,215,228,239,244,141,129,122,208,216,72,80,21,239,93,29,141,143,248,252,187],[165,124,197,37,210,32,28,80,13,5,236,230,62,49,64,78,124,79,9,54,25,139,150,220,10,211,231,81,98,70,28,163],[10,227,71,211,84,97,184,23,37,38,253,75,84,86,138,197,222,161,114,104,63,156,118,149,189,45,103,35,146,116,149,171],[12,111,165,80,117,25,133,77,131,13,175,196,209,244,205,58,176,122,58,165,246,55,141,51,88,21,216,116,98,139,24,243],[68,213,103,141,64,230,243,165,17,83,134,41,29,51,222,40,172,187,111,143,135,179,4,88,23,61,113,70,1,0,50,20]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(17, "alm67w", [[228,77,154,11,105,206,83,246,125,170,45,166,158,57,93,126,110,255,25,143,127,118,36,61,28,240,233,74,188,144,210,137],[76,241,235,10,18,65,193,245,78,87,95,32,153,19,168,255,130,2,53,70,53,71,224,118,66,173,75,173,106,8,176,12],[39,205,85,27,136,16,144,235,46,251,48,174,196,208,186,27,228,171,140,70,178,1,54,29,4,123,47,180,14,80,208,101],[39,191,161,32,89,249,50,34,106,19,152,105,136,32,229,197,228,55,208,123,160,38,130,73,240,71,130,164,179,176,179,152],[35,208,81,249,30,40,238,60,150,34,200,241,145,125,204,136,160,69,134,159,69,54,227,192,12,155,65,250,139,230,76,182]], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("4ilqc4", [[35,10,146,23,15,148,202,124,16,110,15,10,85,215,10,156,224,55,109,198,36,16,241,67,6,185,184,125,206,245,29,157],[138,225,247,131,145,193,197,255,87,57,48,96,178,151,104,6,139,70,7,161,68,177,176,145,52,162,49,82,72,207,158,180],[133,156,25,27,6,37,252,47,205,65,207,91,173,206,235,107,181,156,135,87,122,209,16,115,154,190,74,121,181,46,92,11],[79,24,212,196,240,148,228,184,50,76,227,183,181,224,154,157,189,184,218,150,35,196,22,224,225,10,96,42,82,193,214,238],[251,153,147,229,96,50,8,43,150,235,166,10,18,12,30,214,205,234,136,153,63,65,223,232,178,248,251,107,175,166,225,66]], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([150],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[6],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(49,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("RevertWithReason",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Example", "vblfqo",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("4ilqc4", "tqpedg",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("", "UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("L", "g34bes", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("PayableExample", "trade.totalPrice", "vtiw2", "alm67w",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("xshjbj", "costUSD", "PayableExample", "PayableExample", "PayableExample",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("updateEthPrice called", 1338,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was sent, standing by for the answer...", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("fems9",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Example", 88,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("jx542", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(28,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["\x19Ethereum Signed Message:\n32","0","IsLibrary","\x19Ethereum Signed Message:\n32","0","alm67w","costUSD"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[82,18,40,62,241,148,64,166,24,208,59,235,6,251,240,26,41,62,135,13,201,110,171,220,149,123,86,141,19,72,0,160],[126,22,121,18,68,190,223,33,123,149,15,168,54,94,204,117,46,137,9,85,189,226,110,62,70,29,101,107,110,182,195,253],[178,108,56,102,14,215,247,23,93,189,181,215,24,97,20,104,122,48,218,244,21,67,163,166,249,225,221,252,2,102,207,22],[202,165,159,177,245,33,185,64,179,3,108,119,106,84,96,60,211,163,178,103,248,115,217,64,150,190,38,48,23,189,231,174],[205,247,195,192,254,27,217,97,193,189,12,108,144,198,191,245,234,133,18,96,196,59,93,210,16,18,62,53,16,68,204,46],[90,89,76,39,168,161,222,55,125,113,95,196,13,115,18,123,169,88,42,58,111,33,209,232,220,151,117,25,98,26,111,142],[22,152,205,134,211,245,164,218,35,68,106,154,106,1,41,10,185,155,44,105,115,42,153,71,227,33,203,44,134,38,187,228],[200,135,139,39,132,122,56,251,224,238,60,102,86,90,99,14,249,21,69,42,80,206,127,152,137,108,86,8,2,140,239,94]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(18, 48, 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([36,17,67,232,33,51,141,126,12,186,15,178,186,193,213,204,54,22,5,197,92,116,230,207,176,157,38,184,248,85,47,250], [207,73,186,111,219,65,140,124,94,17,108,190,209,125,210,153,127,97,87,143,158,161,81,215,127,147,9,78,36,202,237,206],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([206,66,127,48,12,76,54,205,116,236,127,79,14,180,19,6,126,115,108,0,201,94,37,50,144,148,243,15,111,39,6,248], [41,252,5,135,135,36,104,222,235,65,231,182,189,213,17,83,61,91,48,7,180,197,108,10,83,247,7,16,150,46,173,180], [168,154,125,161,139,42,127,18,188,140,162,29,213,49,157,12,24,166,31,148,98,225,79,59,138,98,192,58,134,37,57,40],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([115,224,241,229,50,168,10,74,197,131,175,204,196,35,31,243,93,195,72,102,59,75,118,2,193,153,175,254,5,222,62,234], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([79,232,110,219,54,198,171,125,70,3,78,90,162,245,149,200,123,73,247,176,70,227,219,32,111,10,154,66,67,197,80,53], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([142,105,143,126,246,243,217,99,99,234,30,198,169,120,155,171,86,234,62,129,137,220,157,186,220,140,169,37,228,203,65,89], "L", [247,228,161,186,175,101,107,194,166,117,165,75,239,184,168,177,2,22,215,56,219,136,53,31,141,55,84,175,99,134,44,27],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([98,8,4,159,175,183,144,165,51,54,230,64,218,31,173,226,75,205,117,175,237,20,178,143,220,220,246,129,192,219,226,25], "clxvec", [186,225,55,205,95,178,100,69,42,107,150,58,127,57,146,186,237,211,209,63,25,83,204,43,198,17,8,252,201,234,86,70],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([245,8,189,172,241,93,188,206,108,220,48,225,100,69,40,6,94,252,96,36,61,33,8,252,101,148,167,20,220,138,178,139], [149,225,173,30,109,17,17,83,212,11,108,152,182,230,6,191,81,13,82,102,46,255,46,244,37,160,154,245,23,49,163,13], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([245,8,189,172,241,93,188,206,108,220,48,225,100,69,40,6,94,252,96,36,61,33,8,252,101,148,167,20,220,138,178,139], [237,95,239,33,235,237,211,250,13,119,149,205,185,207,49,27,225,21,237,149,200,36,138,107,130,121,28,142,104,50,229,229,5], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([237,167,247,110,190,134,124,38,173,126,74,84,61,106,187,51,75,190,86,25,49,233,52,68,124,224,92,110,159,127,230,227], [125,48,94,157,193,181,205,49,167,216,206,194,50,159,175,148,65,3,144,217,58,49,89,182,89,177,215,169,216,195,174,63], [119,225,65,56,25,111,2,231,196,86,198,227,225,199,144,246,220,162,61,117,180,86,3,217,32,8,54,242,95,248,248,68], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([92,190,197,39,155,96,35,180,22,68,43,68,7,81,105,148,232,214,186,49,9,86,121,150,87,174,205,123,101,235,130,150], [81,2,144,250,207,239,184,27,139,108,35,167,75,130,98,104,190,194,147,67,225,24,63,145,62,150,116,0,122,130,240,15], [254,19,106,206,159,251,80,10,143,110,180,77,55,253,126,233,193,138,52,212,56,79,185,74,251,24,208,253,135,229,60,177], "Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([140,253,212,126,226,65,13,128,111,217,96,208,199,76,242,217,109,183,71,250,187,168,152,93,165,135,25,24,245,19,171,170], [173,202,41,31,32,165,77,32,123,160,228,52,62,251,12,88,253,49,79,76,199,160,145,143,79,90,217,199,190,240,4,11], [192,203,50,59,16,249,240,71,71,18,61,236,226,66,18,39,61,64,87,229,237,189,207,123,47,62,99,236,14,220,100,96], "vtiw2",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([129,5,204,235,142,1,9,3,246,55,91,12,148,41,195,39,97,253,8,89,223,68,189,244,31,237,109,250,251,189,250,165], [45,5,244,198,33,194,50,30,222,233,114,162,223,68,129,195,168,209,215,143,176,86,174,33,138,7,122,229,206,214,31,130], [44,167,135,7,12,26,243,233,126,133,131,82,84,123,180,163,206,29,160,207,43,18,113,34,88,51,60,82,159,38,45,105], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([23,51,135,127,203,222,228,68,167,178,43,199,10,51,78,239,88,12,143,133,135,240,235,165,202,44,103,38,80,206,160,215], [221,86,104,96,37,32,22,93,233,125,107,115,193,171,170,81,45,80,41,52,236,209,132,230,193,182,176,136,24,244,97,40], [111,232,204,44,214,123,20,196,207,232,32,137,8,32,47,229,210,222,112,245,171,50,14,231,115,20,99,240,57,156,22,27], "",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([255,207,191,38,5,51,219,100,97,216,165,123,29,166,196,53,174,208,185,124,2,6,206,222,155,92,228,197,233,93,128,112], [185,7,207,242,158,253,77,112,99,100,226,173,45,147,167,205,138,131,192,175,232,61,1,71,137,186,1,252,75,125,185,216], [145,186,176,183,193,65,91,216,226,79,162,207,68,238,131,95,152,223,42,133,33,178,151,224,153,78,62,117,236,103,104,165], "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([100,56,106,254,77,117,198,163,70,133,132,107,244,147,93,41,51,165,233,92,161,117,110,25,16,241,228,211,81,253,170,137], [97,107,50,107,0,240,162,114,135,39,226,32,237,123,74,59,196,226,124,105,207,188,70,253,37,100,44,224,190,162,38,4], [233,108,131,226,138,27,41,173,135,127,245,212,248,138,157,247,33,126,222,251,96,116,181,29,178,96,237,149,241,179,15,8], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([163,0,177,115,40,105,18,0,174,172,38,239,181,183,201,51,237,46,69,199,55,52,199,170,109,22,229,193,50,229,163,95], [105,127,203,137,50,23,130,50,154,16,58,210,206,154,218,170,135,233,100,112,2,13,60,172,132,161,163,79,192,153,121,174], [132,205,70,192,150,58,2,0,85,243,88,89,59,245,211,180,25,170,171,20,144,5,154,56,10,85,87,10,178,193,2,211], "0",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([70,34,31,155,8,224,29,50,56,192,1,41,51,200,132,44,72,97,183,146,244,163,154,215,86,23,30,37,73,126,104,48], 128, 56, [7,198,197,54,202,157,252,228,195,164,154,71,179,173,233,113,86,35,81,115,205,145,104,168,187,191,174,39,131,146,179,243], 10001,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([230,171,83,231,68,35,164,4,191,194,190,236,200,3,114,61,6,216,87,111,131,215,240,85,254,139,65,146,105,249,1,110], 0, [206,143,16,151,102,180,213,252,151,32,151,214,24,146,93,206,26,242,14,46,17,165,169,185,182,128,148,208,66,37,177,97], [123,71,123,84,88,63,63,34,247,26,16,255,99,11,152,85,188,163,91,178,177,82,109,67,116,222,105,92,6,131,143,248],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([188,22,118,140,203,203,149,144,88,173,0,159,130,172,39,254,182,122,15,231,31,99,81,98,217,236,47,177,88,100,78,193], [191,216,58,185,174,25,32,48,137,69,198,239,204,26,202,185,102,18,190,5,143,153,236,70,58,101,84,193],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([34,167,247,219,72,182,232,51,251,221,113,60,99,74,65,177,26,37,241,72,131,184,193,142,166,252,228,39,39,169,246,33], [60,33,11,182,187,43,3,23,116,29,123,9,183,94,70,101,57,148,84,149,62,223,216,154,54,111,116,223,140,81,198,187,251,79,76,15,209,211,118,127,104,24,221,14,6,226,67,231,173,34,211,26,4,255,238,212,121,127,49,191,203,2,225,97,87],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
