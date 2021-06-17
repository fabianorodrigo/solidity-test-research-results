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
    contractTokenExchangeState = await TokenExchangeState.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[8],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[5],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"PayableExample",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"PayableExample",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(33,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("P", 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Oraclize query was sent, standing by for the answer...", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(25, "Oraclize query was sent, standing by for the answer...", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(0, "costUSD", "Example", 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("P", "0", 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "costUSD", "",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(29, "Example", "UsesExample", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(58, "listingID arg", "RevertWithReason", "trade.totalPrice", 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("updateEthPrice called", "ETH", "costUSD", 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("P", ["3vg2uq"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(95, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["P","PayableExample","P","3vg2uq","RevertWithReason","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(254, "Example", ["0"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("IsLibrary", ["listingID arg","P","yi645m","UsesExample","L","L","call updateEthPrice","PayableExample","PayableExample","PayableExample"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("L", ["costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(1532892064, "Oraclize query was sent, standing by for the answer...", ["Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(103, "IsLibrary", ["PayableExample"], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("listingID arg", ["RevertWithReason"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("updateEthPrice called", ["RevertWithReason","yi645m"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(1338, "ETH", ["L","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(2014223715, "ETH", ["Example","\x19Ethereum Signed Message:\n32"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["yi645m","Example"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("P", ["updateEthPrice called","0","yi645m"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(88, "RevertWithReason", ["\x19Ethereum Signed Message:\n32","3vg2uq","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(2014223715, "updateEthPrice called", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","L","UsesExample"], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("IsLibrary", ["updateEthPrice called","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was sent, standing by for the answer..."], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("ygkusk", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","ETH","P","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(254, "updateEthPrice called", ["0","L","ETH",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(95, "listingID arg", ["yi645m","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","P"], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("call updateEthPrice", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","\x19Ethereum Signed Message:\n32","IsLibrary","L"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("UsesExample", ["UsesExample","ygkusk","yi645m","\x19Ethereum Signed Message:\n32","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(47, "0", ["P","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","updateEthPrice called","RevertWithReason","3vg2uq"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(17, "", ["ro12xe","L","ETH","ejsei4","yi645m"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("3vg2uq", ["listingID arg","UsesExample","PayableExample","3vg2uq","ejsei4"], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("ygkusk", [[236,131,220,64,107,13,52,57,211,57,89,139,207,76,73,172,143,123,15,181,168,58,164,228,38,100,97,118,51,173,168,219],[239,146,207,133,106,105,56,177,151,153,137,137,66,149,59,57,64,145,246,221,108,26,11,49,238,215,218,211,119,179,179,88],[202,160,87,176,125,203,50,225,161,99,89,87,183,115,211,161,207,128,86,141,99,69,92,196,130,170,48,218,88,163,55,100],[82,137,184,144,185,148,95,246,228,211,245,3,42,20,70,34,156,188,129,74,88,125,205,157,166,110,108,89,68,17,69,99],[235,215,69,172,252,22,89,113,162,136,118,187,78,137,206,146,158,71,1,168,24,216,201,71,120,74,88,72,76,178,37,172],[244,146,57,104,98,20,58,224,30,23,112,246,112,21,165,145,113,130,134,23,230,24,208,21,33,129,10,10,203,143,142,158],[251,214,104,172,21,176,28,33,134,61,211,219,76,116,221,57,96,105,79,141,233,247,55,117,31,63,170,67,152,9,236,120],[178,44,58,247,227,154,134,108,30,138,140,160,32,55,108,192,77,118,128,28,161,64,77,93,116,131,241,13,196,114,144,32]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(95, "ETH", [[50,211,251,51,203,56,23,191,122,40,71,82,188,65,8,5,157,188,10,93,27,214,134,117,51,62,214,30,95,117,197,44],[178,137,234,201,183,253,53,99,151,48,2,15,212,167,192,245,2,213,14,31,16,13,175,150,243,248,188,206,61,242,26,169],[64,110,4,21,119,24,233,158,231,195,238,112,187,241,70,27,13,150,36,105,208,245,62,27,5,22,249,55,30,204,128,174],[7,166,138,218,74,90,99,67,87,235,224,153,43,161,68,221,47,63,128,179,247,148,1,211,217,80,184,57,7,184,154,75],[7,218,58,225,120,106,188,148,160,130,17,6,20,27,160,182,211,255,78,250,46,190,201,121,69,117,154,44,249,41,130,43],[105,6,93,127,134,227,70,100,50,222,218,61,104,44,186,255,75,163,56,113,145,178,182,130,116,30,250,227,245,201,248,91],[41,132,37,225,83,6,238,172,100,38,6,148,28,50,205,58,132,118,145,146,139,25,193,88,177,91,238,205,52,138,223,229],[28,251,7,152,35,57,102,95,7,221,98,224,6,138,208,10,41,56,12,171,208,172,168,222,219,82,165,118,42,236,19,188]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(61, "PayableExample", [[76,168,217,113,189,149,243,40,238,94,46,19,84,234,188,53,239,116,67,127,123,94,197,153,38,112,252,124,240,34,165,121],[230,112,129,243,205,4,77,180,136,120,10,216,28,251,0,96,228,181,67,54,225,70,150,136,222,93,59,85,20,33,197,97],[37,184,176,46,155,203,195,153,155,213,183,93,103,224,154,232,99,208,8,132,175,39,225,25,166,141,170,158,194,96,239,206],[176,115,226,54,222,135,152,93,152,38,204,198,45,136,114,127,106,243,180,33,202,51,77,184,45,210,229,33,65,89,33,213],[109,125,79,195,8,34,109,252,133,27,160,243,104,180,179,178,180,114,46,227,160,54,210,216,127,248,126,9,1,48,204,70]], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("P", [[34,212,183,129,104,142,221,79,66,99,81,251,143,253,9,224,180,195,43,238,214,55,61,140,140,236,76,207,4,50,118,245],[119,150,174,178,35,0,91,161,189,193,175,46,16,31,83,36,188,147,1,227,170,156,1,76,146,99,63,16,22,6,252,226]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("call updateEthPrice", [[101,13,255,4,181,186,188,145,224,26,157,93,9,65,37,166,51,189,54,162,97,56,200,16,92,104,172,232,164,138,206,163]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(10001, "ygkusk", [[119,134,191,50,64,133,248,104,36,105,208,220,148,167,214,144,49,156,212,164,71,240,8,44,183,0,122,203,212,107,243,212]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(103, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[114,75,155,222,218,6,225,220,200,74,239,234,61,30,162,231,78,189,244,3,56,188,58,78,28,57,143,64,123,186,31,22]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("listingID arg", [[11,0,244,253,198,29,75,253,9,6,248,9,42,180,64,80,84,193,180,28,141,142,45,103,55,236,169,20,162,211,35,22]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("Example", [[84,67,11,23,138,91,115,0,9,50,22,227,241,98,71,35,177,220,232,7,77,1,124,166,171,143,163,94,195,73,151,146],[40,109,184,130,234,88,136,192,20,15,40,241,152,181,114,8,231,63,193,42,70,197,103,94,129,106,20,112,139,185,164,173]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(71, "ETH", [[113,121,9,72,158,104,73,26,130,18,20,192,47,42,143,73,227,137,12,24,114,5,142,105,211,213,70,37,228,90,244,225],[252,71,215,254,135,162,115,181,243,203,222,116,215,242,47,240,206,237,174,74,214,99,43,223,47,127,182,212,138,212,165,245]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(255, "RevertWithReason", [[104,30,138,189,80,66,67,47,184,179,49,91,180,193,26,229,59,185,65,73,205,132,192,185,124,126,44,184,140,27,135,117],[109,201,142,106,51,65,227,254,5,124,103,139,68,137,81,54,66,90,181,21,219,105,216,148,253,98,207,9,190,74,121,140]], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("trade.totalPrice", [[131,15,146,239,200,209,141,153,41,73,139,198,255,252,46,30,174,172,205,115,149,18,171,206,224,48,187,255,142,168,48,232],[0,74,137,228,170,131,240,168,3,245,114,108,18,22,154,18,31,161,162,194,246,164,193,5,248,7,246,214,108,119,31,97]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("ygkusk", [[241,129,249,192,247,97,129,134,113,1,143,53,113,233,31,225,106,43,229,107,236,16,145,31,134,144,235,52,146,228,19,124],[89,170,166,66,188,160,41,48,70,203,146,35,93,86,218,46,39,63,20,117,209,151,19,1,212,168,110,216,165,142,37,129],[92,222,77,8,136,29,9,83,133,46,139,185,191,53,87,43,207,239,246,58,22,59,69,21,87,23,112,169,111,181,167,73]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(71, "", [[137,73,204,114,56,197,172,190,224,227,40,6,209,159,23,25,152,204,93,100,159,227,165,125,152,50,131,219,215,173,130,151],[32,59,187,196,243,196,8,51,77,62,90,218,24,32,149,12,219,89,146,22,164,106,67,200,157,59,11,224,91,124,64,228],[82,99,172,107,42,48,56,115,130,65,92,210,60,125,155,136,241,42,189,114,133,37,49,218,254,43,213,212,68,37,112,224]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(58, "PayableExample", [[138,208,82,42,107,217,156,56,68,255,159,98,143,170,150,9,103,239,29,157,120,187,140,162,146,88,218,136,138,123,153,123],[0,253,80,248,108,237,193,145,107,96,248,156,149,2,217,85,144,67,206,221,34,67,197,135,5,93,222,105,80,19,184,231],[169,11,135,119,219,192,191,141,41,217,78,231,106,214,224,253,93,178,39,208,233,156,87,115,248,8,235,152,96,187,142,158]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("", [[2,96,51,240,52,148,31,79,213,66,22,75,205,171,83,91,237,35,162,191,236,65,219,71,173,157,249,73,180,26,137,178],[69,245,242,158,188,187,12,31,227,212,175,36,244,14,139,222,47,44,232,178,41,66,247,70,105,103,202,78,214,91,91,53],[222,101,180,173,240,19,126,130,35,19,212,17,27,137,195,221,232,180,69,203,197,45,129,73,198,80,247,17,235,11,143,145]], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("0", [[153,221,200,148,5,44,11,66,21,175,23,247,12,215,86,254,86,22,124,162,128,16,4,210,91,116,58,188,52,223,167,238],[216,207,72,24,62,113,204,68,82,51,68,120,55,218,147,2,71,62,78,89,246,61,98,58,124,62,76,169,245,237,174,160],[125,214,118,187,4,255,15,16,108,174,63,76,226,189,222,166,50,180,108,17,167,20,215,245,218,17,0,86,136,64,78,23],[114,153,207,144,42,155,145,46,129,112,72,133,143,9,190,246,122,3,1,223,64,35,173,71,108,230,188,165,215,205,163,195]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(1024, "3vg2uq", [[198,105,34,255,35,88,60,30,99,246,176,187,133,147,57,15,93,107,182,233,47,226,55,85,155,162,137,218,155,211,32,161],[186,141,227,19,232,71,17,140,183,159,87,56,215,189,117,102,179,11,250,139,19,177,79,32,25,218,19,217,186,211,82,156],[238,95,143,248,142,41,223,29,50,161,207,221,154,198,226,176,119,180,117,17,200,125,176,33,211,70,178,85,40,231,84,112],[42,84,187,154,230,51,168,56,141,151,195,82,163,131,189,7,197,127,173,24,154,245,202,230,127,62,98,147,160,161,193,252]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(86, "", [[248,127,231,197,230,108,123,72,189,221,112,147,193,206,150,2,121,146,177,27,3,34,72,115,88,235,205,39,243,243,56,104],[32,169,54,135,81,139,68,45,224,205,17,52,234,133,13,73,98,179,116,252,7,120,202,24,246,230,53,211,52,29,53,226],[72,84,146,161,88,100,242,34,18,139,58,86,224,32,223,217,232,48,46,95,13,253,115,214,141,91,13,161,112,149,54,151],[153,5,16,36,175,118,36,123,88,81,207,76,218,207,203,253,161,81,77,219,219,170,99,244,81,196,227,18,132,60,65,192]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("listingID arg", [[35,14,190,14,168,203,176,135,74,61,154,7,173,167,130,190,254,200,81,18,160,216,219,231,17,11,151,242,122,185,204,122],[55,133,160,205,216,24,175,146,251,184,127,34,99,202,59,152,157,46,63,6,150,164,125,237,126,249,155,86,18,184,54,214],[233,255,192,0,94,255,15,120,218,237,94,43,109,209,61,66,255,225,157,2,166,170,140,151,119,174,243,44,13,122,13,20],[81,226,48,212,127,74,54,188,226,211,93,246,207,7,113,29,162,182,190,218,201,116,45,57,41,70,164,73,21,112,56,34]], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[193,233,53,38,216,124,190,247,47,31,93,117,218,153,245,104,83,0,103,89,186,38,117,236,49,238,228,215,235,156,119,225],[182,39,124,142,196,232,24,170,195,40,46,124,182,71,123,59,174,164,244,151,79,190,95,191,138,210,33,191,33,45,133,73],[128,172,145,171,227,14,136,46,141,147,78,41,108,212,231,169,227,48,138,132,233,23,153,4,119,252,173,183,246,193,86,184],[49,78,221,74,205,196,177,10,130,24,104,71,208,225,245,179,25,186,205,91,239,210,84,27,130,170,246,165,35,26,208,192],[232,36,83,68,159,100,121,13,192,182,20,16,73,112,248,2,150,87,50,247,24,40,171,128,49,175,126,174,89,112,61,105]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(1, "ejsei4", [[177,222,49,135,154,50,103,164,62,145,178,70,79,228,175,125,175,131,72,108,65,63,31,42,52,153,88,186,234,176,132,55],[59,233,64,175,156,87,88,88,242,166,234,114,115,167,156,83,62,67,7,78,171,53,136,20,174,73,196,22,162,213,91,64],[76,13,87,201,75,237,29,52,102,173,7,118,117,227,227,24,94,39,17,71,235,168,117,38,10,68,237,16,72,2,115,237],[17,228,234,247,227,164,76,75,54,236,189,121,249,129,4,100,220,138,216,133,132,169,9,125,34,179,81,43,40,165,12,57],[96,125,69,148,62,246,174,55,177,31,193,255,39,51,217,21,25,240,61,6,139,76,105,17,42,214,152,184,91,202,18,158]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(102, "Example", [[125,160,254,206,152,135,53,194,208,96,47,41,164,100,22,93,105,96,25,253,221,34,23,119,238,125,82,211,94,155,45,244],[245,28,28,127,148,238,173,247,242,134,146,13,18,94,20,141,156,200,156,168,0,19,132,250,231,107,141,188,201,131,58,97],[116,11,116,238,105,59,247,203,101,21,46,228,35,119,187,118,113,175,15,222,166,27,127,27,219,90,81,176,165,222,108,110],[126,129,227,44,198,54,93,59,103,188,189,167,209,163,81,139,234,186,250,55,226,157,159,240,232,197,56,1,229,227,81,168],[63,36,123,168,89,97,50,53,230,37,98,134,202,220,68,98,33,68,34,38,124,59,134,104,230,131,56,115,246,84,142,54]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("3vg2uq", [[217,4,18,96,23,154,14,41,126,166,244,80,178,16,92,239,218,21,143,133,143,112,123,199,91,222,108,160,191,51,156,255],[48,212,233,239,197,194,111,182,214,124,81,37,123,203,136,12,88,204,203,40,243,134,182,125,14,148,199,249,18,3,152,112],[23,95,232,171,255,44,52,215,118,124,247,150,66,28,35,27,135,82,234,198,248,93,89,4,58,39,181,167,108,247,248,18],[141,31,226,46,147,253,82,254,242,39,213,91,55,218,46,204,214,123,73,191,85,30,166,150,224,135,70,106,20,195,2,201],[142,178,48,224,8,40,200,252,71,197,24,140,107,84,112,100,56,21,84,184,43,86,238,242,224,189,88,93,124,28,68,116]], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([80],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[7],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(129,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("L",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("ejsei4", "ygkusk",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("yi645m", "listingID arg",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("costUSD", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("IsLibrary", "Oraclize query was sent, standing by for the answer...", "ro12xe",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("yi645m", "\x19Ethereum Signed Message:\n32", "updateEthPrice called", "ejsei4",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("ro12xe", "trade.totalPrice", "RevertWithReason", "yi645m", "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("L",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("L", 101,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("IsLibrary", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("P",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("costUSD", 10001,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(1337,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["\x19Ethereum Signed Message:\n32","P","u3lobh","call updateEthPrice","","\x19Ethereum Signed Message:\n32","ygkusk"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[147,43,50,209,138,159,12,7,110,208,16,97,91,173,212,158,160,99,133,200,254,38,248,64,241,112,179,51,198,104,177,226],[161,174,190,195,161,175,82,203,235,104,249,30,204,26,60,2,204,217,181,130,27,131,159,12,180,58,209,137,236,170,26,206],[203,148,201,15,242,196,54,60,4,205,243,47,67,96,70,156,198,22,185,101,255,2,144,190,239,204,130,17,234,157,203,190],[42,84,162,176,38,8,12,243,179,7,252,156,187,71,96,13,86,184,107,133,183,251,110,94,149,242,230,196,204,93,172,9]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(88, 31, 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([209,246,15,208,33,246,172,130,64,125,142,199,11,166,240,119,180,55,169,4,3,2,132,44,246,114,17,218,156,177,174,126], [134,105,222,221,56,38,190,108,249,185,182,232,242,154,150,218,225,221,9,64,87,14,25,185,164,34,223,200,64,220,156,198],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([205,2,178,72,157,186,67,138,244,10,92,123,151,240,102,142,220,149,63,145,113,241,119,214,44,231,80,111,26,203,223,30], [255,29,139,204,19,110,143,56,133,179,7,13,23,125,7,98,123,195,101,65,238,150,33,127,231,85,180,130,168,120,55,145], [141,195,50,34,27,232,237,152,143,219,65,43,5,3,124,190,196,87,127,145,33,207,234,202,189,2,68,164,0,198,62,153],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([177,200,159,125,147,114,236,233,206,173,113,183,13,222,82,118,183,46,241,222,122,37,218,14,231,148,67,231,45,212,94,208], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([170,33,241,102,63,192,20,128,131,29,125,242,157,191,71,203,133,59,152,169,177,9,218,149,250,122,125,248,54,175,219,254], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([83,174,184,3,169,27,209,125,196,166,97,250,189,120,183,179,234,194,110,98,163,171,165,76,124,167,56,54,166,184,226,232], "costUSD", [128,106,211,171,90,235,85,192,246,178,150,169,176,174,35,127,118,226,204,51,9,235,107,74,47,98,149,201,40,177,108,228],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([138,41,232,108,161,2,62,43,106,222,26,196,145,112,185,207,177,224,19,85,96,102,227,108,217,88,253,83,127,168,149,247], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [98,140,76,21,69,95,68,198,184,161,225,45,84,170,71,164,86,199,157,173,230,167,212,65,220,65,148,98,63,136,162,181],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([29,74,59,77,88,144,16,190,10,35,119,215,138,86,15,187,238,255,15,169,49,64,155,21,133,191,166,62,68,90,236,33], [117,227,108,33,5,235,133,51,44,16,180,16,55,225,31,11,114,74,253,212,104,233,151,249,42,95,56,248,88,160,173,193], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([29,74,59,77,88,144,16,190,10,35,119,215,138,86,15,187,238,255,15,169,49,64,155,21,133,191,166,62,68,90,236,33], [27,202,229,118,52,66,94,68,37,240,242,60,222,4,183,55,92,206,37,207,26,163,107,101,141,107,206,19,152,73,169,4,76], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([103,87,145,159,64,77,159,252,56,42,254,164,102,237,87,74,148,198,192,237,220,31,190,100,184,206,101,203,203,122,137,130], [114,213,2,239,88,88,167,127,204,62,184,33,31,12,74,109,124,58,225,197,181,225,19,196,98,128,253,117,21,209,185,41], [215,225,55,249,186,16,110,238,82,33,32,202,151,97,220,213,57,58,99,148,14,75,79,82,54,95,158,189,138,195,92,129], "g9srip",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([2,150,134,243,21,21,115,214,98,22,131,98,114,34,102,241,43,197,188,200,114,244,102,119,254,94,71,207,111,14,230,3], [174,36,53,227,236,82,193,124,117,129,47,243,144,118,113,200,215,181,155,84,92,194,48,204,197,87,138,120,157,20,251,92], [201,185,84,20,39,90,214,44,155,156,155,178,196,221,164,146,146,200,114,246,114,191,224,243,100,236,191,227,136,6,162,120], "ejsei4",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([12,238,134,178,142,77,95,197,155,186,66,67,235,7,152,16,249,166,156,174,116,250,40,254,190,221,130,146,254,244,120,146], [137,164,164,51,146,36,34,9,249,54,67,53,48,130,6,55,62,66,19,141,181,104,102,81,148,104,160,146,145,177,124,16], [247,122,125,255,173,19,36,61,38,127,247,83,233,168,110,72,209,147,50,240,173,181,24,140,211,3,114,46,129,28,242,62], "ygkusk",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([147,179,127,77,197,165,175,224,89,199,70,24,89,239,167,156,212,223,137,137,150,167,178,200,173,88,152,217,55,5,250,68], [66,169,141,210,45,164,168,231,223,59,31,182,68,239,225,183,161,0,162,191,142,153,47,76,43,65,68,209,199,14,14,197], [202,141,194,230,74,229,212,251,81,60,248,18,248,132,38,72,227,34,50,183,30,131,16,196,189,39,137,163,165,11,155,151], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([83,216,128,103,172,26,155,211,84,105,127,141,227,26,32,130,166,76,144,4,237,25,172,66,80,44,205,192,236,145,13,44], [139,76,88,185,114,135,172,144,75,34,47,11,200,68,215,230,196,239,223,220,105,84,60,70,57,89,102,154,9,169,155,235], [254,141,197,161,153,191,230,84,0,248,192,177,117,93,39,166,55,68,42,155,25,59,183,41,90,234,201,74,46,156,13,172], "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([10,49,215,148,175,107,109,167,198,176,220,76,86,168,109,87,147,223,120,18,153,100,111,37,21,113,229,61,90,185,93,191], [141,71,127,154,85,104,181,206,174,230,59,135,25,173,209,7,235,183,116,28,96,80,89,238,102,139,191,232,230,207,17,188], [223,241,35,19,228,68,230,244,63,170,148,13,34,32,245,52,240,178,133,196,159,131,242,110,146,24,74,166,151,72,4,78], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([70,52,4,133,107,115,57,175,155,139,83,67,126,0,71,90,196,250,189,3,122,65,118,40,3,16,241,156,52,128,104,92], [45,147,130,6,194,248,9,248,104,162,94,69,106,13,239,170,152,115,203,237,10,206,190,60,61,68,34,12,126,99,56,207], [128,124,246,28,15,5,34,161,94,50,118,139,20,146,38,249,10,64,216,210,204,119,149,55,193,44,224,235,233,171,185,194], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([113,121,121,179,69,116,200,156,13,190,196,160,227,118,192,115,213,104,242,18,109,18,10,72,13,221,124,252,74,198,208,22], [30,201,209,175,79,123,215,215,44,229,6,149,110,112,168,54,74,165,19,95,201,232,160,86,125,215,85,221,221,109,114,213], [58,25,155,93,202,188,53,221,75,93,109,78,100,219,122,203,29,43,215,156,70,45,128,64,171,204,210,21,247,194,105,12], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([243,35,149,143,207,22,91,95,46,249,55,160,249,10,154,200,102,177,159,154,228,152,40,96,121,8,114,35,218,86,218,80], 95, 1338, [129,13,208,129,33,219,131,192,227,171,55,221,34,72,156,106,238,210,7,136,219,47,231,193,141,46,137,139,62,29,67,108], 22,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([134,23,61,106,61,239,45,184,42,108,62,172,70,43,73,87,40,14,34,80,255,86,168,22,16,134,76,124,109,91,225,14], 30, [238,151,202,212,44,129,226,59,162,90,44,34,87,117,159,5,100,248,66,140,55,74,150,79,160,83,157,3,28,218,104,109], [82,20,100,5,201,15,63,214,206,173,163,178,126,192,115,42,186,97,27,174,52,108,148,24,178,100,174,129,95,100,88,215],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([121,145,186,112,162,177,93,103,98,10,72,107,145,242,171,6,98,233,248,188,15,215,141,27,49,205,215,163,22,4,127,54], [202,213,41,129,48],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([255,90,196,96,120,155,191,32,29,54,44,154,235,242,123,126,48,21,71,32,36,168,139,206,6,50,249,249,95,74,232,233], [2,225,251,82,212,195,229,195,94,162,18,174,97,127,38,21,127,26,52,175,140,190,88,18,19,72,110,223,104,39,125,179,8,0,8,148,244,190,145,90,87,241,208,253,147,195,213,223,136,101,152,234,154,65,73,250,189,41,14,201,18,204,168,159,230],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
