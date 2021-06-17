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
    contractShartCoin = await ShartCoin.new({from:accounts[6]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[6]}');
    contractState = await State.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[0],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[8],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[6],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[5],contractProxy.address,contractTokenExchangeState.address,"Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[5],contractProxy.address,contractTokenExchangeState.address,"Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(18,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("costUSD", 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("ETH", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(160, "IsLibrary", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1532892063, "RevertWithReason", "ETH", 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("trade.totalPrice", "P", 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("t61cho", "\x19Ethereum Signed Message:\n32", "t61cho",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(16, "UsesExample", "L", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(200001, "\x19Ethereum Signed Message:\n32", "ETH", "PayableExample", 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("call updateEthPrice", "UsesExample", "L", 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(28, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["Oraclize query was sent, standing by for the answer...","RevertWithReason","u04xef","8s1ugh","q4usrb"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(28, "UsesExample", ["costUSD","PayableExample","","P","RevertWithReason","call updateEthPrice"], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("P", ["IsLibrary","RevertWithReason","q4usrb","costUSD","trade.totalPrice","8s1ugh","call updateEthPrice","RevertWithReason","\x19Ethereum Signed Message:\n32"], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("gwofoa", ["IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(23, "q4usrb", ["78g949"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1025, "UsesExample", ["Example"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("updateEthPrice called", ["78g949"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("PayableExample", ["q4usrb","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(32, "u04xef", ["UsesExample","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(1023, "P", ["L","costUSD"], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("q4usrb", ["UsesExample","IsLibrary"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("bpveg", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(47, "q4usrb", ["0","8s1ugh","78g949"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(20, "Example", ["listingID arg","78g949","q4usrb"], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("L", ["","\x19Ethereum Signed Message:\n32","gwofoa"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("trade.totalPrice", ["0","q4usrb","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(127, "L", ["RevertWithReason","P","Oraclize query was sent, standing by for the answer...","8s1ugh"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(87, "P", ["t61cho","RevertWithReason","8s1ugh","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("updateEthPrice called", ["8s1ugh","call updateEthPrice","\x19Ethereum Signed Message:\n32","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("Oraclize query was sent, standing by for the answer...", ["P","RevertWithReason","RevertWithReason","78g949","q4usrb"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(257, "trade.totalPrice", ["Example","L","0","trade.totalPrice","z59u3t"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(8, "PayableExample", ["bpveg","gwofoa","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","UsesExample"], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("trade.totalPrice", ["0","78g949","trade.totalPrice","listingID arg","P"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("8s1ugh", [[229,1,152,21,219,143,94,7,45,215,60,27,238,65,160,68,167,93,62,82,159,200,138,74,18,195,190,103,186,220,77,64],[97,116,23,71,107,232,143,59,136,5,216,89,243,100,247,216,223,95,72,16,220,3,46,141,143,248,214,170,190,155,242,238],[103,212,124,5,250,206,247,197,229,175,7,56,145,192,106,6,103,163,13,54,246,146,104,241,101,247,5,189,13,51,62,177],[37,152,253,129,12,233,189,7,65,255,215,111,216,190,76,162,37,237,163,152,31,80,220,119,142,201,240,76,255,172,144,44],[85,121,118,234,223,129,0,75,132,33,206,214,230,7,75,54,114,231,251,132,0,33,247,86,21,74,134,22,171,73,88,59],[101,147,54,6,36,9,2,40,201,231,54,171,88,249,132,1,6,189,164,53,198,102,206,76,2,62,194,170,65,31,141,62]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(71, "me8tm", [[102,131,130,146,64,235,55,11,116,226,131,32,55,127,199,149,205,234,79,128,172,222,255,28,211,53,169,40,74,248,220,125],[200,59,136,188,229,99,193,184,67,27,6,63,136,174,107,61,224,119,95,225,244,24,37,87,121,108,27,254,234,204,160,225],[14,118,249,217,103,167,224,242,54,160,33,150,46,135,188,129,200,119,58,10,162,211,27,160,89,24,139,254,182,145,241,236],[186,79,112,75,116,205,124,121,94,90,157,137,23,212,146,118,69,84,251,231,72,10,248,27,217,254,99,10,52,207,49,106],[38,242,135,55,252,161,145,75,197,193,227,31,158,211,20,245,217,200,28,127,34,228,64,187,163,185,254,76,27,103,101,215],[214,76,241,58,244,231,87,66,13,68,136,71,31,8,68,71,102,51,145,139,9,187,95,60,147,163,229,32,38,17,22,22],[146,98,251,199,82,7,171,115,36,11,2,43,26,176,100,121,246,162,218,251,177,158,12,129,49,190,172,133,126,233,142,55],[102,210,7,111,82,28,92,217,164,176,225,184,190,69,96,45,3,245,15,193,177,190,60,227,96,244,82,163,110,108,225,85]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(64, "P", [[85,199,198,244,210,77,238,211,145,192,98,156,163,106,119,114,40,32,88,151,82,131,246,42,142,102,242,36,74,251,34,205],[8,219,196,30,66,239,16,104,198,148,108,175,37,205,186,94,247,67,161,252,85,141,85,143,227,11,161,80,222,141,235,15],[121,153,112,229,117,249,155,171,200,227,48,167,36,210,208,0,52,50,136,16,55,121,241,114,7,194,1,26,149,28,139,0],[248,190,21,141,27,62,0,193,67,178,40,35,78,216,89,182,57,66,229,166,225,174,136,1,1,137,213,85,33,223,232,183],[166,110,156,193,110,201,131,128,63,51,238,126,81,136,83,34,145,45,166,155,248,169,160,234,3,98,57,131,175,61,126,76],[142,129,19,200,207,186,136,45,35,218,245,50,237,112,164,129,60,199,211,232,17,157,122,141,10,177,95,146,185,203,18,175],[122,14,13,75,185,2,157,242,235,41,103,254,42,246,8,255,53,35,123,213,87,64,148,178,109,134,68,182,217,103,18,68],[15,242,195,49,69,91,216,154,86,222,25,235,238,227,153,60,255,146,55,129,39,138,231,14,121,23,58,0,151,90,12,86]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("call updateEthPrice", [[191,210,115,76,123,141,64,177,163,247,78,192,68,178,37,193,204,155,104,95,118,31,2,80,26,88,21,2,102,130,180,165]], 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("t61cho", [[27,157,252,91,31,136,174,218,126,16,97,184,76,95,144,192,175,62,50,131,192,239,191,242,187,155,92,51,232,96,234,28]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(2014223716, "z59u3t", [[136,48,212,14,95,71,119,139,55,161,45,7,131,191,128,203,156,180,120,251,119,128,115,70,237,204,80,236,180,73,230,252]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(25, "PayableExample", [[222,127,217,200,243,69,231,30,7,13,104,103,87,205,126,48,178,147,249,132,191,135,163,4,46,72,171,182,131,208,26,152]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("0", [[245,83,237,234,224,102,7,12,149,61,198,76,27,80,65,180,155,41,158,203,145,207,32,216,187,169,19,115,253,242,234,146]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("q4usrb", [[13,213,204,200,111,250,10,193,8,180,143,201,227,78,172,61,129,179,102,148,116,94,242,51,226,192,156,16,173,74,251,204],[138,217,244,247,0,175,174,95,48,202,209,12,105,9,252,87,158,94,222,139,6,13,160,141,178,63,127,128,69,161,56,214]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(10, "78g949", [[230,234,4,199,50,188,173,225,50,26,189,159,221,127,244,90,167,252,248,195,212,157,253,28,122,168,129,40,133,67,253,146],[184,15,237,46,210,154,224,79,229,50,0,21,124,176,71,224,185,83,2,254,67,28,94,109,163,92,252,89,241,165,246,100]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(69, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[200,15,123,111,187,81,117,17,176,238,66,60,236,71,221,144,83,40,182,16,238,120,232,238,137,183,120,92,12,127,21,109],[134,253,79,83,234,145,233,40,139,62,253,1,133,1,62,94,205,213,110,206,83,179,223,200,233,1,223,108,127,217,96,223]], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("costUSD", [[100,181,184,237,26,157,60,245,32,98,194,5,22,84,81,109,7,160,133,235,156,46,2,159,87,243,85,188,179,54,139,240],[51,159,140,49,182,75,66,33,248,222,38,126,8,2,186,52,132,15,214,17,118,27,59,127,58,45,16,41,68,37,179,133]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("updateEthPrice called", [[122,23,83,111,82,100,109,111,223,43,53,95,165,137,55,6,107,105,73,69,202,150,0,171,199,99,78,170,12,128,31,37],[154,223,76,129,5,43,226,5,19,55,249,205,70,87,221,103,72,1,176,161,210,18,239,199,114,94,204,49,164,7,149,70],[175,15,89,13,41,67,8,56,84,231,106,155,205,43,188,252,99,243,68,35,100,19,142,124,145,118,152,181,19,203,174,190]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(98, "PayableExample", [[106,179,185,177,88,21,184,184,42,38,35,21,192,182,176,231,158,138,42,182,149,71,146,155,14,102,30,25,127,224,35,87],[76,222,223,167,121,17,227,106,106,84,41,171,215,51,135,35,180,88,198,222,74,163,135,84,25,144,78,3,187,173,106,242],[46,69,116,27,241,199,110,97,77,84,0,79,247,63,207,237,192,170,183,67,35,9,96,100,198,247,233,111,61,130,56,121]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(26, "78g949", [[48,149,231,237,46,122,47,54,79,182,64,19,199,28,85,83,25,63,47,243,125,2,22,249,106,208,253,191,92,195,159,50],[211,229,96,132,197,60,42,40,251,144,108,186,118,29,196,235,33,175,119,235,59,183,33,34,165,94,41,128,179,91,131,126],[14,254,132,70,192,252,233,160,117,27,187,200,255,196,140,253,148,160,66,106,162,108,83,234,250,80,211,5,83,36,175,186]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("me8tm", [[86,117,215,147,9,7,106,175,114,44,222,100,174,215,26,188,127,22,237,188,1,205,125,22,242,202,152,255,132,100,143,166],[201,30,241,78,162,0,135,202,188,183,99,36,119,45,124,4,52,124,167,53,164,219,94,254,5,255,162,76,8,214,156,51],[59,191,110,224,216,176,23,47,246,183,155,219,145,161,43,163,120,77,198,138,1,117,13,189,105,68,57,70,70,39,156,33]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("UsesExample", [[111,200,127,170,64,165,87,197,102,242,205,8,119,21,14,75,235,136,237,73,89,143,135,96,113,110,122,87,207,117,29,130],[47,4,132,227,95,20,154,49,250,196,175,130,3,208,254,204,50,7,230,252,128,135,191,127,46,228,1,153,115,42,72,132],[141,235,123,167,179,4,112,92,115,33,87,84,14,88,94,154,116,182,186,86,3,242,179,67,4,217,128,162,107,251,70,213],[185,122,115,106,174,87,115,208,92,49,233,194,44,195,254,226,45,32,67,247,130,208,230,70,131,222,206,170,80,183,94,70]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(70, "0", [[9,202,101,57,92,13,4,177,158,152,223,82,46,225,152,176,100,140,221,6,36,159,242,11,122,47,65,89,55,243,51,10],[62,222,207,182,132,189,167,145,144,109,135,187,147,54,168,35,192,233,199,188,139,51,159,106,101,227,9,142,149,149,148,174],[22,66,207,162,106,216,25,219,96,193,230,46,155,235,198,250,167,10,37,60,197,194,149,242,147,153,59,174,239,23,228,143],[166,35,205,1,77,193,195,98,29,76,180,127,137,171,212,252,202,112,13,134,159,47,126,87,161,141,127,47,41,10,228,5]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(86, "t61cho", [[236,70,115,55,48,97,14,30,132,226,152,98,34,163,95,20,63,48,8,97,62,97,192,114,38,134,209,138,152,92,218,132],[184,53,107,100,227,197,217,165,170,178,154,243,73,76,197,177,144,10,228,168,65,17,31,243,247,227,124,93,224,96,222,45],[5,174,127,136,115,127,255,154,54,8,121,234,76,162,22,208,106,84,233,158,129,136,219,30,162,238,111,38,233,183,191,194],[172,241,105,114,197,37,139,19,134,166,171,32,209,237,224,192,235,227,98,148,198,138,192,50,6,91,35,235,203,164,31,104]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("Oraclize query was sent, standing by for the answer...", [[230,141,117,233,200,198,80,195,115,220,96,101,79,176,137,0,152,155,104,71,180,9,40,183,123,45,53,114,81,226,150,104],[172,115,139,16,163,31,198,10,180,95,54,147,121,177,178,189,140,229,161,187,215,140,97,2,73,110,6,174,215,153,145,13],[212,162,108,251,138,236,49,22,130,207,97,165,64,56,194,185,16,155,21,118,116,74,184,148,46,80,24,152,233,252,155,129],[114,53,155,216,179,246,158,242,237,214,219,97,49,39,89,149,115,236,134,154,180,9,60,158,138,57,214,111,38,235,26,248]], 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[171,161,115,153,137,83,57,142,72,237,145,6,1,77,109,41,245,103,219,48,45,94,235,5,85,171,186,192,58,100,20,39],[1,215,183,154,207,209,203,155,176,20,14,238,112,14,180,242,250,227,206,134,207,179,54,17,145,88,98,175,176,205,64,26],[222,51,135,34,88,31,76,69,4,131,105,110,183,12,46,248,8,190,2,247,192,32,100,87,230,120,107,63,198,145,200,39],[151,140,218,30,246,177,213,113,31,29,196,48,95,23,50,20,180,143,3,172,58,169,22,124,106,102,152,106,181,157,217,131],[121,219,185,90,113,187,17,217,95,139,43,77,187,111,213,255,193,16,243,189,165,66,74,147,47,71,239,131,121,1,1,111]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(21, "Example", [[241,238,235,91,240,193,8,178,96,228,139,171,51,120,215,18,211,238,19,113,47,192,140,138,185,90,135,135,107,206,140,125],[3,125,117,141,37,167,245,32,142,177,195,70,61,90,29,14,167,69,62,109,59,77,193,106,233,3,145,187,232,217,18,169],[42,245,243,16,104,51,178,159,159,67,2,126,28,24,208,161,144,32,60,102,179,58,109,140,67,88,66,82,16,129,4,13],[107,239,79,121,193,248,102,7,38,19,131,69,44,147,64,91,103,96,198,97,249,81,121,50,66,85,192,236,146,184,212,135],[196,61,210,197,156,135,16,226,102,203,159,203,148,212,39,81,118,38,111,5,212,121,106,239,122,209,36,134,94,53,152,255]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(10, "IsLibrary", [[185,163,157,171,84,132,218,69,43,145,184,244,29,182,59,133,89,182,39,36,247,44,133,151,226,208,71,131,56,239,183,81],[131,157,138,55,42,100,244,6,69,195,207,158,131,122,217,236,99,133,189,177,245,92,217,137,202,171,65,201,81,101,151,218],[70,205,29,213,218,12,99,78,208,225,235,226,138,66,167,83,208,160,93,194,233,64,57,95,24,132,72,50,185,67,133,74],[193,46,59,211,72,38,131,239,90,144,38,43,205,230,222,47,116,110,104,94,19,1,168,122,44,224,40,216,233,46,66,37],[64,177,15,182,32,39,199,140,52,30,180,30,76,150,101,138,155,54,16,220,93,13,109,112,162,178,93,161,103,228,218,10]], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("t61cho", [[132,11,135,34,224,168,245,92,218,112,217,63,9,134,217,23,200,169,104,157,159,0,80,67,246,104,225,94,107,115,91,46],[183,69,27,192,84,122,241,83,197,157,27,30,2,28,22,73,141,191,132,222,181,253,39,181,60,43,8,131,118,130,15,55],[198,97,234,68,184,215,23,251,221,77,25,2,129,29,237,97,250,185,94,224,149,192,201,137,0,71,235,6,229,12,234,100],[169,23,117,56,49,152,19,16,8,73,188,64,104,115,102,79,84,157,83,222,46,209,60,70,136,203,230,10,250,93,194,99],[246,213,69,61,224,142,133,208,169,162,197,126,22,94,74,147,154,118,161,139,13,133,188,142,136,232,128,41,153,150,182,30]], 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([113],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[6],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(26,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("RevertWithReason", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("\x19Ethereum Signed Message:\n32", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("ETH", "",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("listingID arg", "78g949", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("PayableExample", "gwofoa", "trade.totalPrice", "t61cho",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("ETH", "P", "78g949", "P", "me8tm",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("UsesExample",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("trade.totalPrice", 45,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("costUSD", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("PayableExample",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("78g949", 95,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("PayableExample", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(87,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["\x19Ethereum Signed Message:\n32","z59u3t","ETH","trade.totalPrice","8s1ugh","me8tm","UsesExample","58w66n"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[120,12,158,73,253,33,73,5,213,118,156,129,60,151,25,32,243,249,223,242,172,85,49,45,227,175,88,128,150,148,196,250],[87,201,141,42,248,202,170,128,70,123,99,0,143,196,20,232,248,244,165,2,208,77,174,154,42,238,250,106,167,164,149,82],[220,32,148,88,13,122,114,190,220,56,134,41,151,43,210,202,59,114,254,226,7,136,55,109,9,154,127,138,21,244,116,192]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(200000, 11, 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([37,117,66,177,43,109,36,43,181,19,0,234,127,42,118,252,9,99,136,1,164,161,146,64,23,59,112,80,243,218,56,217], [251,91,189,21,99,249,217,83,193,86,139,66,158,241,126,51,204,142,76,96,252,98,24,205,242,20,252,115,13,203,155,128],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([175,91,46,147,93,11,123,170,139,230,58,231,217,128,253,204,118,201,215,245,109,35,244,117,151,47,94,71,131,111,74,182], [41,141,121,12,232,138,111,31,157,39,245,235,242,39,148,243,164,161,167,161,210,140,88,109,144,82,139,253,67,17,38,146], [79,146,197,69,58,17,63,184,200,34,140,59,212,127,145,56,38,17,72,235,178,49,184,157,222,241,6,191,123,190,96,85],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([71,141,1,115,222,104,120,132,79,251,198,197,18,69,76,233,73,97,116,67,220,45,128,107,199,150,91,59,165,15,204,213], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([5,200,22,31,111,65,109,165,64,241,21,66,154,88,137,174,208,88,146,85,212,243,198,67,144,44,191,207,112,234,123,9], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([238,212,0,185,26,55,104,125,109,15,190,58,131,252,212,5,40,15,23,107,58,3,157,149,98,247,161,73,14,173,48,238], "t61cho", [214,38,166,196,192,87,55,202,50,224,220,116,73,248,170,203,49,101,79,101,183,120,138,216,21,214,184,239,89,22,203,252],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([164,0,73,168,61,72,54,174,53,250,203,45,211,255,211,36,13,218,50,113,92,170,224,252,152,203,92,221,247,192,57,68], "gwofoa", [135,205,136,147,35,134,139,47,154,62,23,101,170,74,128,74,71,67,25,17,228,238,208,146,35,0,236,186,208,52,32,147],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([47,9,159,11,233,34,242,212,110,92,249,243,185,22,83,169,24,26,2,202,254,174,135,55,8,58,232,35,3,132,142,114], [78,77,196,121,223,99,170,223,193,199,60,187,113,120,18,88,83,9,220,107,67,221,248,111,172,223,207,251,30,155,208,5], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([47,9,159,11,233,34,242,212,110,92,249,243,185,22,83,169,24,26,2,202,254,174,135,55,8,58,232,35,3,132,142,114], [96,171,177,192,32,19,253,18,133,97,62,77,178,250,146,190,88,54,241,209,184,69,162,135,42,112,26,133,197,19,232,45,253], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([127,58,156,110,19,175,183,124,130,147,177,176,123,213,58,242,149,207,107,186,60,249,182,226,253,145,18,21,224,82,35,54], [243,69,58,94,104,10,219,153,70,153,5,17,141,152,5,117,192,15,121,139,20,243,95,163,198,145,202,192,189,242,92,22], [168,201,249,26,148,161,74,105,194,9,20,71,106,150,243,210,242,176,169,55,10,232,30,96,244,190,85,0,38,229,250,157], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([39,177,70,189,10,137,184,169,138,112,66,201,145,241,131,12,254,4,6,200,118,85,10,233,166,217,117,162,49,188,222,252], [101,201,184,65,98,121,29,17,125,54,171,229,176,145,217,22,203,110,36,35,5,182,151,199,223,38,157,7,203,59,191,29], [175,73,10,112,65,209,85,40,87,27,14,155,114,9,17,161,193,16,211,86,120,251,48,174,240,156,4,118,199,46,112,193], "gwofoa",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([0,192,169,195,16,165,157,116,190,215,73,146,149,111,232,149,86,41,8,187,130,95,164,131,29,111,23,34,186,91,134,207], [66,112,220,229,111,230,40,3,67,2,149,108,205,253,231,47,98,27,112,78,251,1,248,11,232,196,80,177,61,12,225,224], [93,68,18,178,30,105,240,47,209,169,96,90,41,129,115,142,94,127,87,52,135,87,108,142,124,214,198,159,158,46,167,95], "Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([220,105,100,20,75,242,216,194,16,16,131,33,83,21,246,169,182,15,97,199,185,76,137,58,60,14,1,133,113,29,112,92], [144,13,111,186,87,232,67,55,27,199,46,133,122,88,138,198,240,66,236,218,180,164,161,219,8,147,91,122,178,180,7,52], [243,86,46,10,223,215,206,34,100,161,76,201,34,78,153,201,19,51,121,121,66,45,64,83,123,127,76,32,115,13,91,41], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([114,252,69,116,24,134,156,31,214,248,111,5,132,25,229,90,229,155,152,97,140,64,14,49,101,109,123,124,197,148,114,255], [206,210,62,191,51,159,246,54,228,0,4,197,248,35,113,181,225,92,3,52,255,216,215,8,115,64,122,113,18,255,111,83], [165,101,79,198,178,237,244,239,2,205,93,147,54,227,213,224,239,130,204,41,215,106,99,238,213,3,215,190,83,152,246,7], "qxjgln",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([247,112,76,67,126,91,190,72,94,12,109,215,69,238,153,154,12,89,99,29,23,251,103,25,152,231,129,4,114,60,182,151], [145,166,169,55,10,198,163,201,225,156,135,212,43,109,114,157,231,234,243,191,150,192,232,144,39,96,249,238,214,245,125,65], [231,164,239,126,23,253,66,183,21,223,169,121,156,220,69,250,137,12,88,202,155,19,14,24,166,74,231,194,219,226,57,123], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([151,98,106,88,60,222,53,237,10,151,69,5,158,204,155,214,191,249,232,238,96,218,58,10,9,169,225,80,141,31,55,130], [64,97,196,171,125,180,210,179,115,174,170,8,103,29,202,192,106,116,94,47,215,213,99,32,227,184,52,132,217,131,192,99], [80,90,221,5,131,181,27,237,134,53,79,132,40,245,139,153,163,139,90,94,183,63,146,115,165,203,230,43,238,15,131,92], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([121,13,73,82,63,179,158,125,118,4,123,91,91,199,183,225,223,108,213,72,58,95,253,59,201,195,79,25,120,234,231,211], [8,42,203,176,229,38,32,29,131,5,164,68,129,134,254,71,6,222,30,235,147,246,127,153,84,23,196,2,40,247,214,69], [97,250,63,14,16,162,117,167,96,210,98,82,56,160,130,45,39,202,134,2,195,26,37,239,17,96,198,28,105,51,15,8], "L",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([192,81,165,15,114,39,215,119,74,19,191,214,42,97,160,171,160,199,100,153,123,171,89,53,7,115,136,102,235,173,51,127], 25, 25, [234,125,93,63,198,207,16,98,27,82,189,30,26,145,102,243,151,81,145,168,183,233,82,143,5,207,97,0,214,234,81,136], 103,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([7,164,207,166,135,109,101,72,235,94,170,40,53,61,139,137,171,248,94,217,110,6,165,43,33,30,8,231,171,208,92,134], 25, [152,151,39,157,36,58,64,218,10,56,135,48,133,86,24,216,186,130,217,192,223,70,181,248,92,211,222,225,149,163,172,74], [121,157,53,60,237,2,70,0,199,116,113,244,37,71,22,143,203,223,160,45,26,223,147,166,121,148,90,11,240,195,1,151],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([83,55,53,244,57,82,254,147,67,224,32,5,166,253,135,35,101,136,20,4,139,160,175,26,159,209,162,147,232,239,36,109], [218,0,219,42,131,242,102,219,186,83,84,102,7,232,214,213,97,130,69,104,1,92,34,191,205,29,162,168,158,120,31,53,199,119,187,207,151,131,174,186,29,139,36,43,98,141,33,153,197,163,90,154,156,247,195,20,110,124,73,153,80,110,172,235,3,240,21,121,79,203,225,120,33,142,219,28,160,225,217,108,24,39,136,168,234,194,7,31,184,20,173,75,149,180,207,81,191,107,139,134,210,191,2,217,183,208,110,184,159,79,1,150,145,3,217,119,67,88,142,251,221,66,240,250,159,41,131,172,144,138,45,120,5,110,84,221,241,45,64,168,197,251,94,170,79,132,187,131,56,102,19,32,91,209,204,201,5,223,164,198,204,65,182,236,105,86,0,227,37,63,89,73,190,14,22,23,196,76,164,25,192,209,100,206,113,141,6,82,216,60,197,202,41,3,119,26,154,209,178,33,103,169,153,211,133,211,198,96,190,103,191,202,97,83,15,166,222,63,85,41,174,220,230,223,28,18,69,198,125,186,107,65,184,19,186,217,61,96,106,216,170,221,76,204,106,90,123,95,70,208,100,159,180,79],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([198,1,61,77,97,35,3,81,16,46,33,112,178,81,120,225,109,166,69,144,144,202,116,230,34,156,207,64,231,115,49,37], [106,136,84,241,32,37,20,175,243,39,41,33,101,109,44,237,134,99,41,195,155,195,6,130,150,129,234,107,205,18,108,150,124,6,234,130,85,209,233,7,239,245,238,197,210,2,36,178,232,57,40,116,92,201,215,253,211,203,218,177,248,11,107,130,13],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
