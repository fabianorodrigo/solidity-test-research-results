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
    contractState = await State.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[5],{from:accounts[0]}');
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
    contractTokenExchange = await TokenExchange.new(accounts[4],contractProxy.address,contractTokenExchangeState.address,"P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[4],contractProxy.address,contractTokenExchangeState.address,"P",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(87,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("7ftu88",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("ETH", 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("\x19Ethereum Signed Message:\n32", "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(19, "listingID arg", "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(10, "pb9s2g", "", 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("Example", "L", 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("PayableExample", "pb9s2g", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(199999, "trade.totalPrice", "P", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(1338, "P", "xdgfvd", "RevertWithReason", 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("RevertWithReason", "updateEthPrice called", "xdgfvd", 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("updateEthPrice called", ["\x19Ethereum Signed Message:\n32","call updateEthPrice","0","call updateEthPrice","","RevertWithReason","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(63, "PayableExample", ["UsesExample","trade.totalPrice","P","\x19Ethereum Signed Message:\n32","UsesExample","pb9s2g","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(200000, "Example", ["Oraclize query was sent, standing by for the answer...","ETH"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("7ftu88", ["xdgfvd","IsLibrary"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("updateEthPrice called", ["pb9s2g"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(103, "\x19Ethereum Signed Message:\n32", ["trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(7, "L", ["ETH"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("ETH", ["5dknu8"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("0", ["Oraclize query was sent, standing by for the answer...","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(9999, "updateEthPrice called", ["\x19Ethereum Signed Message:\n32","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(30, "PayableExample", ["P","Oraclize query was sent, standing by for the answer..."], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("updateEthPrice called", ["\x19Ethereum Signed Message:\n32","L"], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("hy5ulp", ["L","listingID arg","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(31, "L", ["updateEthPrice called","UsesExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(102, "0", ["IsLibrary","xdgfvd","pb9s2g"], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("PayableExample", ["RevertWithReason","","Example"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("listingID arg", ["5dknu8","3h5lm7","xdgfvd","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(63, "costUSD", ["call updateEthPrice","Example","updateEthPrice called","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(95, "UsesExample", ["pb9s2g","5dknu8","updateEthPrice called","0"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("updateEthPrice called", ["\x19Ethereum Signed Message:\n32","costUSD","hy5ulp",""], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("listingID arg", ["0","L","P","\x19Ethereum Signed Message:\n32","xlkqon"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(102, "listingID arg", ["pb9s2g","xdgfvd","\x19Ethereum Signed Message:\n32","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(98, "0", ["L","costUSD","pb9s2g","P","ETH"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("L", ["costUSD","trade.totalPrice","updateEthPrice called","Oraclize query was sent, standing by for the answer...","L"], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("PayableExample", [[238,36,181,170,45,62,252,19,190,59,184,209,53,164,97,166,150,227,149,251,225,36,47,10,178,116,201,134,53,135,146,182],[55,128,151,119,225,10,229,85,208,207,220,86,179,148,73,60,174,118,42,95,36,235,96,224,168,84,169,144,53,175,95,230],[217,150,209,233,2,161,165,166,67,106,58,5,198,63,192,180,20,145,115,183,35,73,225,59,41,194,63,135,32,151,24,80]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(54, "xlkqon", [[169,62,221,184,5,141,202,39,221,7,188,93,25,89,162,240,49,80,2,73,78,193,173,93,48,152,19,11,15,225,153,207]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(7, "ETH", [[143,69,93,223,95,161,49,121,250,105,2,69,167,5,248,74,8,69,156,125,85,166,118,135,8,114,85,22,80,57,162,74],[206,18,58,190,0,168,176,254,244,165,93,25,26,37,239,198,82,45,92,33,145,150,129,253,150,84,43,179,233,43,79,40],[249,118,184,231,158,10,177,45,65,234,99,163,250,5,44,168,7,190,203,69,228,7,82,230,70,1,208,47,62,165,151,103],[24,79,5,134,60,51,14,17,172,132,132,215,28,32,160,176,193,119,5,12,217,202,205,86,85,121,50,189,199,217,62,108],[165,36,1,45,136,210,123,117,46,152,112,26,209,96,162,13,236,25,172,165,5,210,82,96,180,40,164,182,152,26,128,173]], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("call updateEthPrice", [[41,251,5,183,7,156,106,231,191,171,213,176,122,151,101,132,255,187,245,56,65,189,2,228,44,198,51,74,181,92,61,232],[188,61,195,140,143,7,78,226,89,113,57,184,97,6,232,162,50,178,11,188,232,47,252,228,144,240,5,168,1,76,90,20],[6,234,155,55,243,238,175,206,22,0,223,252,197,184,132,120,53,82,100,165,30,79,19,45,106,149,18,48,153,159,202,147],[57,60,214,130,165,76,191,28,13,178,199,96,133,253,195,61,83,36,156,227,229,91,54,195,217,26,79,151,73,85,73,101]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[203,145,247,103,79,54,136,232,41,129,152,186,211,235,118,224,114,13,166,232,64,112,88,130,100,171,142,184,209,38,234,98]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(64, "listingID arg", [[150,121,145,188,167,204,184,232,191,82,254,32,145,134,155,172,214,221,86,14,204,235,139,29,152,106,93,235,28,72,239,132]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(101, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[132,21,89,7,224,242,31,239,56,47,215,83,57,145,83,23,242,7,127,87,163,200,23,152,229,255,81,84,116,210,28,63]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("Oraclize query was sent, standing by for the answer...", [[232,150,70,37,228,231,117,253,151,80,125,56,236,152,19,66,193,174,52,213,74,100,22,138,135,147,111,245,131,71,204,53]], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("P", [[30,181,131,208,45,64,174,180,19,194,198,44,82,116,58,231,223,176,14,206,71,133,30,89,146,133,173,143,218,148,186,247],[150,196,195,218,186,236,92,3,38,98,129,35,15,50,243,172,50,175,49,119,27,66,186,246,17,196,126,71,240,71,25,118]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(1025, "RevertWithReason", [[4,13,192,84,103,146,105,248,253,76,128,147,54,29,89,129,61,168,246,209,186,103,101,104,166,252,144,7,54,44,146,90],[35,154,169,186,120,49,228,22,157,245,96,233,186,103,90,72,108,102,40,82,5,111,21,37,111,147,77,10,208,125,161,120]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(8, "xdgfvd", [[212,19,231,233,77,66,200,234,98,155,207,227,30,234,230,19,13,38,98,23,81,254,158,107,134,66,81,40,137,133,237,53],[103,137,101,119,11,5,75,110,53,196,108,230,130,230,26,151,127,7,107,95,105,143,204,101,227,132,26,152,145,2,150,166]], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("call updateEthPrice", [[248,249,11,204,103,47,41,141,131,244,87,114,142,101,36,136,221,137,82,166,195,254,53,8,172,150,117,114,123,182,30,176],[177,255,17,46,19,158,164,143,149,161,97,205,253,183,122,86,180,115,240,147,138,109,107,20,242,50,206,210,55,255,158,4]], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("IsLibrary", [[83,110,183,30,229,52,153,198,215,140,117,184,233,109,43,117,134,124,230,74,67,179,52,175,250,128,144,210,25,203,251,25],[117,109,225,149,113,151,26,114,218,198,121,248,173,169,82,83,60,72,186,97,182,102,21,60,177,109,181,158,232,238,230,43],[44,140,97,134,12,37,62,118,254,184,54,98,114,218,234,44,229,45,12,58,0,213,115,90,30,165,64,9,37,250,115,198]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(63, "\x19Ethereum Signed Message:\n32", [[146,5,144,32,253,27,101,54,72,146,119,31,6,83,187,118,183,5,97,208,150,226,13,238,134,120,99,79,9,27,227,238],[176,5,203,1,113,216,46,56,70,24,3,163,218,77,212,250,163,168,239,186,30,215,75,116,255,237,71,172,155,54,30,7],[68,153,85,117,236,220,251,47,92,89,82,6,102,107,226,113,39,222,245,129,92,53,203,23,22,75,50,140,223,183,228,124]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(1024, "3h5lm7", [[55,117,137,97,198,236,117,170,202,206,49,52,240,51,129,108,204,61,51,160,231,190,125,204,145,109,11,52,66,17,201,218],[162,136,162,184,166,179,250,43,37,109,99,95,177,210,18,48,129,45,14,70,168,91,190,135,49,179,175,96,7,150,64,151],[116,203,194,194,70,22,40,245,193,117,168,212,135,174,164,106,238,57,51,120,124,119,238,219,97,190,106,63,58,25,112,124]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[38,120,137,43,230,231,179,125,177,24,222,105,124,10,154,1,255,215,192,51,70,236,27,113,129,63,144,242,51,19,222,108],[122,0,43,79,81,180,228,67,7,3,162,250,88,160,101,138,160,111,209,141,201,106,176,101,181,160,186,100,116,223,127,222],[6,194,120,5,106,167,197,135,216,70,88,135,73,131,134,231,205,208,159,74,22,53,128,169,82,132,137,51,6,237,149,236]], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("P", [[211,190,212,237,82,36,48,80,204,8,137,72,111,243,63,33,63,50,159,74,24,74,117,215,249,161,4,13,73,28,21,224],[7,185,23,101,112,97,57,142,138,166,149,158,146,191,102,195,180,73,100,95,25,185,206,21,162,123,223,136,136,232,17,3],[91,113,231,247,105,102,105,140,46,119,120,65,100,39,242,27,218,74,36,33,134,26,92,120,9,43,6,127,237,57,15,151],[184,225,86,34,193,212,69,68,39,93,57,199,28,230,89,122,109,206,238,192,211,165,218,191,228,237,12,8,120,5,56,229]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(97, "P", [[130,187,65,35,212,251,16,15,152,200,185,60,73,146,19,1,247,105,171,213,247,101,8,214,132,114,73,21,171,3,32,72],[140,19,56,120,227,155,182,204,126,29,129,145,190,146,222,137,57,91,190,167,242,169,18,76,253,185,97,60,61,169,119,248],[151,133,57,58,170,174,62,206,130,163,115,233,229,244,98,90,97,213,63,207,224,57,199,141,189,141,188,104,7,228,86,52],[224,169,119,7,27,24,235,0,83,182,18,53,26,38,113,190,46,157,81,164,216,40,143,127,32,49,169,137,207,10,241,105]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(65, "UsesExample", [[119,69,14,60,182,191,104,102,254,61,84,7,248,71,217,45,154,173,244,203,95,118,78,128,152,134,65,139,173,63,138,166],[240,195,23,232,134,66,199,61,196,202,60,161,13,44,154,196,60,22,114,166,129,55,41,70,45,68,209,122,37,197,48,74],[125,0,191,231,22,159,244,125,18,79,117,125,177,255,241,190,235,182,196,149,17,166,253,238,36,194,182,4,127,200,149,98],[80,101,163,202,97,188,250,48,73,179,194,140,125,82,40,162,175,43,113,120,73,15,238,47,213,17,162,183,27,206,46,42]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("2ewtjn", [[26,203,43,82,122,164,206,207,27,176,19,196,9,0,21,135,28,109,205,81,9,99,231,65,115,81,57,232,99,198,23,240],[108,209,138,79,76,19,89,192,221,251,179,189,163,118,160,34,228,33,211,74,14,137,83,69,93,120,160,169,4,40,187,97],[245,253,181,63,80,159,133,18,119,28,134,246,129,168,141,30,254,163,121,133,153,128,76,73,236,247,136,8,112,2,253,46],[107,10,99,249,180,134,244,2,161,113,210,200,192,176,229,7,94,245,233,94,27,111,1,10,209,175,103,45,191,35,167,161]], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("pb9s2g", [[28,94,104,164,143,27,165,217,5,33,198,247,36,170,50,204,142,98,58,67,221,47,46,62,126,26,255,243,110,21,119,175],[254,125,227,144,2,46,168,147,71,247,192,5,165,7,242,229,156,132,60,183,1,51,227,152,37,130,181,153,107,88,137,142],[99,178,105,183,220,150,155,132,233,213,115,115,186,125,207,249,238,229,225,119,159,180,56,36,84,144,155,67,252,167,24,62],[32,190,96,174,38,119,199,193,47,156,166,15,233,47,61,34,237,252,102,110,105,106,232,240,86,157,188,186,149,10,22,200],[72,112,194,158,77,104,75,50,29,34,141,208,201,155,60,61,99,206,2,7,4,148,24,239,178,100,255,245,236,176,128,232]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(45, "pb9s2g", [[101,17,183,149,202,36,43,158,251,1,34,235,176,177,142,121,102,10,59,114,145,78,4,243,6,12,109,131,33,190,59,109],[71,252,68,179,40,93,127,84,86,90,113,163,227,176,34,187,50,254,70,227,31,186,94,12,51,130,163,117,55,239,42,150],[99,252,167,98,217,17,191,8,234,17,100,62,101,205,4,242,233,106,37,241,83,207,159,140,32,114,40,154,215,58,42,187],[186,60,137,71,1,69,183,66,245,156,207,112,181,37,48,79,255,115,43,146,19,32,243,214,127,207,2,133,191,14,30,128],[164,46,214,178,166,139,241,60,127,95,8,29,223,84,215,101,33,243,24,152,91,134,185,181,55,28,126,48,44,116,250,69]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(1336, "RevertWithReason", [[218,255,2,29,55,204,136,146,128,141,200,115,12,248,24,184,148,111,116,64,81,202,181,196,229,79,189,63,212,83,36,240],[169,173,72,207,110,10,191,224,34,204,79,31,24,247,171,90,177,51,220,157,137,144,76,145,83,27,249,207,94,150,93,72],[254,251,15,24,220,46,106,178,169,145,147,185,195,34,195,81,224,1,122,243,90,182,48,242,109,100,67,198,168,164,145,146],[110,1,170,213,68,58,96,130,14,255,37,200,174,191,111,198,62,205,241,6,45,129,104,235,87,189,66,26,108,198,104,240],[5,46,79,195,11,24,3,198,120,99,74,145,231,239,25,236,219,218,14,181,96,178,153,208,220,184,169,79,84,111,77,152]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("dvkq5", [[171,19,225,226,36,231,203,207,188,64,213,45,19,61,48,86,88,96,1,188,71,52,222,32,139,240,136,27,40,98,203,89],[27,32,112,235,89,161,232,185,62,79,59,43,211,243,202,125,190,246,105,187,75,145,59,242,38,69,180,47,185,242,121,42],[166,74,61,173,3,68,199,46,118,120,137,89,158,137,13,120,15,43,116,236,79,213,138,145,11,240,25,212,228,37,106,14],[85,213,97,104,57,180,8,209,202,94,67,49,155,231,190,143,208,197,119,148,149,58,239,31,79,174,202,178,110,113,21,222],[56,96,102,116,94,207,233,127,181,243,143,76,236,101,223,38,9,20,20,224,34,251,193,120,171,69,242,113,197,250,216,57]], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([193],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[4],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(29,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("3h5lm7",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("UsesExample", "7ftu88",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("2ewtjn", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("Oraclize query was sent, standing by for the answer...", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("trade.totalPrice", "trade.totalPrice", "ETH",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "trade.totalPrice", "costUSD", "xlkqon",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("listingID arg", "hy5ulp", "PayableExample", "hy5ulp", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("IsLibrary",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("P", 32,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("dvkq5", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("trade.totalPrice", 65,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("L", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(129,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["","costUSD","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[134,30,191,214,61,227,10,150,165,143,212,242,245,59,67,39,113,164,26,116,55,191,174,56,225,116,162,226,32,57,94,20],[194,254,47,19,253,25,187,80,188,82,1,9,80,11,230,35,67,220,192,69,227,17,160,162,76,131,25,246,201,110,158,51],[9,135,218,222,1,91,51,164,233,117,199,255,50,128,142,114,248,112,103,72,61,206,35,51,35,2,75,223,132,179,5,199],[156,229,13,89,197,230,149,144,115,120,171,47,21,232,129,212,139,48,143,248,187,247,63,117,28,244,69,168,8,191,215,247],[226,210,195,18,179,156,152,184,129,247,104,117,102,114,66,221,170,11,3,77,243,200,128,10,158,165,204,216,86,196,99,129]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(5, 46, 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([175,205,37,48,165,155,49,138,132,68,229,216,157,47,182,77,95,103,57,82,18,18,134,45,185,204,4,99,79,192,15,208], [120,140,13,50,86,38,115,36,187,170,227,46,176,66,62,172,70,91,17,54,117,10,167,122,99,122,229,160,208,166,41,45],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([253,226,225,172,62,39,32,187,6,250,35,227,181,119,54,178,14,18,249,54,158,166,131,199,171,228,78,199,156,134,109,80], [109,210,204,209,97,60,15,17,52,28,135,87,252,58,117,101,243,19,233,13,73,99,211,170,65,223,5,140,139,155,4,182], [205,189,4,100,84,242,145,100,24,212,215,157,12,71,181,111,204,123,215,224,88,165,77,158,246,106,20,69,39,68,68,143],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([241,220,72,78,179,25,64,88,95,81,88,38,116,131,12,161,29,244,25,248,179,222,129,242,11,112,184,226,29,163,23,173], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([10,117,117,233,109,59,119,210,145,189,153,13,64,92,233,156,2,60,141,170,205,138,94,129,31,228,62,170,158,254,75,198], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([185,159,96,57,193,26,84,190,20,17,116,159,242,96,58,218,223,138,63,139,221,60,133,187,110,146,128,107,234,223,68,101], "Oraclize query was sent, standing by for the answer...", [33,216,190,159,31,67,173,121,251,246,133,136,129,159,207,135,81,108,131,208,28,17,207,90,146,244,184,106,229,207,82,44],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([5,118,53,193,149,253,235,89,24,187,245,177,92,77,119,111,222,235,223,180,81,252,99,146,42,46,220,174,249,17,147,234], "trade.totalPrice", [10,152,23,102,170,125,194,97,158,149,112,25,116,153,125,224,196,54,171,189,200,239,188,101,99,134,130,121,231,6,209,185],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([155,197,67,221,47,242,223,170,153,12,200,5,205,245,19,150,170,199,177,159,205,83,174,0,243,172,23,227,240,218,170,80], [65,249,236,127,253,91,117,243,245,227,36,183,203,127,189,42,130,147,144,131,87,46,79,211,43,108,81,2,164,96,30,90], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([155,197,67,221,47,242,223,170,153,12,200,5,205,245,19,150,170,199,177,159,205,83,174,0,243,172,23,227,240,218,170,80], [15,232,19,63,35,219,252,87,219,197,43,198,176,159,229,206,238,27,172,184,11,78,209,217,233,218,212,105,11,114,190,59,75], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([27,237,72,106,234,188,83,173,112,190,102,127,158,160,219,233,184,167,11,113,195,252,204,73,79,77,107,92,91,190,158,78], [190,25,192,156,237,118,151,242,7,85,230,153,217,13,131,60,196,26,240,40,82,171,255,100,31,150,70,187,25,123,45,10], [94,172,71,44,37,156,91,172,39,185,198,237,167,102,177,60,79,40,215,15,159,179,69,20,86,106,251,6,42,109,164,222], "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([91,168,9,80,99,193,34,62,240,198,219,45,50,176,20,150,255,72,157,28,121,14,218,156,13,91,173,130,6,102,78,14], [50,69,138,253,234,227,129,155,53,94,32,99,23,39,202,16,185,152,195,209,206,76,230,43,107,228,117,93,171,224,176,117], [112,49,141,40,132,144,109,245,248,152,10,218,229,39,143,239,253,208,46,194,184,51,24,231,35,48,3,136,64,71,126,162], "hy5ulp",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([46,251,34,104,108,145,215,74,51,30,127,186,18,192,240,236,179,118,1,159,222,149,219,18,145,21,112,54,29,173,164,4], [48,147,131,163,229,179,42,95,86,97,87,85,159,78,188,227,128,118,20,184,120,3,225,124,6,242,55,197,182,69,96,201], [193,254,26,156,106,158,174,164,77,111,52,103,236,149,207,254,80,44,80,111,156,148,77,129,234,111,98,140,169,139,42,188], "",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([14,117,146,194,133,186,207,77,218,132,74,87,226,97,212,140,48,190,176,157,28,238,46,197,169,23,197,36,135,251,125,35], [176,254,166,26,103,190,53,141,81,219,134,28,206,105,159,220,83,0,94,179,180,232,70,155,71,224,146,211,95,106,237,161], [213,7,43,33,109,25,141,85,207,63,206,159,55,152,36,237,249,190,221,193,80,134,195,117,205,253,38,242,62,123,64,84], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([33,98,199,237,49,12,231,252,57,115,83,95,228,144,31,109,64,26,195,248,246,76,11,107,20,145,65,239,151,80,58,12], [54,100,204,153,162,49,10,123,242,66,114,194,181,58,94,199,42,26,107,45,36,143,178,166,88,124,55,14,189,151,170,74], [105,46,21,214,245,247,252,163,150,179,236,10,141,230,74,223,44,133,228,104,138,129,248,114,34,246,1,178,246,118,11,122], "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([213,212,235,234,206,242,105,184,99,116,246,242,197,126,199,97,213,79,2,45,237,120,218,53,42,3,37,214,106,255,233,88], [175,85,31,171,83,228,143,173,231,120,238,90,77,133,206,170,154,177,168,62,48,107,185,34,45,153,251,117,224,221,31,227], [22,111,160,206,105,37,93,204,203,191,122,58,62,252,20,108,131,28,62,139,219,44,63,203,239,139,213,30,45,86,130,100], "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([0,54,71,208,65,109,72,25,60,113,187,95,253,193,174,226,135,147,64,176,38,169,88,116,99,229,73,121,2,40,108,188], [237,5,88,196,17,199,183,209,155,39,136,213,249,27,187,182,121,42,113,176,137,122,174,114,49,46,129,64,55,105,107,195], [76,130,195,171,236,53,32,242,219,42,254,240,99,59,159,166,22,128,179,76,27,38,134,37,151,178,54,69,161,146,2,13], "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([4,37,22,106,120,149,82,9,50,250,200,192,194,71,100,226,106,164,37,47,208,56,140,191,246,233,118,228,232,116,61,131], [167,112,87,109,203,142,231,46,47,32,22,161,198,48,64,37,182,238,163,23,72,130,78,95,231,159,151,16,113,242,96,250], [49,171,42,79,119,104,11,61,157,11,249,164,119,23,212,137,36,81,179,61,149,212,255,131,102,220,64,156,220,176,159,60], "UsesExample",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([118,106,152,249,233,150,255,50,99,135,236,249,109,226,22,4,18,100,187,142,76,92,133,100,215,194,61,205,162,111,11,130], 256, 25, [46,76,232,240,143,125,65,228,174,182,200,228,55,42,121,53,215,6,0,237,43,33,191,163,157,42,182,76,126,49,102,108], 63,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([172,81,199,145,194,57,72,48,125,117,241,209,158,118,126,142,203,88,143,158,124,112,242,37,252,35,106,201,46,69,136,78], 9, [255,139,63,199,245,69,129,136,109,135,253,254,210,132,180,51,160,17,233,251,22,64,213,167,35,119,186,213,148,249,51,71], [74,196,128,48,191,58,40,112,168,125,192,239,110,230,159,108,70,212,132,57,75,129,37,100,164,60,15,140,167,207,243,97],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([140,193,249,226,90,65,40,15,10,199,48,218,21,185,255,81,18,158,211,170,177,215,174,2,173,13,35,26,89,206,15,142], [172,44,109,197,144,136,3,182,196,46,99,167,53,125,60,243,116,100,17,164,71],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([193,165,178,198,218,5,166,71,64,198,132,198,188,245,197,171,157,173,26,158,49,71,160,125,60,205,224,28,174,186,97,72], [35,215,104,252,120,132,181,20,173,236,122,94,244,156,8,63,162,233,199,107,152,4,222,4,100,150,11,24,255,97,242,51,212,145,37,119,230,22,0,165,183,138,253,42,250,92,34,59,93,19,34,194,16,46,50,102,123,22,31,235,106,239,132,143,204],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
