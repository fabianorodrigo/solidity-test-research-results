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
    contractState = await State.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[7],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[9],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[9],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[0],contractProxy.address,contractTokenExchangeState.address,"ETH",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[0],contractProxy.address,contractTokenExchangeState.address,"ETH",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(19,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("0",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("ETH", 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("L", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(61, "UsesExample", "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(255, "IsLibrary", "IsLibrary", 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("P", "vi92a5", 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Oraclize query was sent, standing by for the answer...", "0", "vi92a5",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(10000, "0", "Oraclize query was sent, standing by for the answer...", "vi92a5",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(254, "trade.totalPrice", "vi92a5", "0", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("PayableExample", "Oraclize query was sent, standing by for the answer...", "P", 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("0", ["Oraclize query was sent, standing by for the answer...","P","costUSD","","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(55, "0", ["ETH","Example","updateEthPrice called","z2jn1h","RevertWithReason","\x19Ethereum Signed Message:\n32","Oraclize query was sent, standing by for the answer...","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(65, "Example", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","L","trade.totalPrice","L","","\x19Ethereum Signed Message:\n32","UsesExample","Example","costUSD"], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("L", ["P","updateEthPrice called","costUSD","0","IsLibrary","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","0","vi92a5"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("IsLibrary", ["ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(58, "L", ["lalc4o"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(160, "PayableExample", ["vi92a5"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("z2jn1h", ["lalc4o"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("L", ["Oraclize query was sent, standing by for the answer...","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(10000, "\x19Ethereum Signed Message:\n32", ["Oraclize query was sent, standing by for the answer...","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(162, "vi92a5", ["L","z2jn1h"], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("z2jn1h", ["call updateEthPrice","\x19Ethereum Signed Message:\n32"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("0f7g5", ["vi92a5","","r0kddg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(28, "listingID arg", ["P","z2jn1h","r0kddg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(65, "", ["r0kddg","0f7g5","updateEthPrice called"], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("updateEthPrice called", ["","Example","z2jn1h"], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("call updateEthPrice", ["PayableExample","Oraclize query was sent, standing by for the answer...","\x19Ethereum Signed Message:\n32","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(95, "IsLibrary", ["costUSD","ETH","IsLibrary","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(10, "PayableExample", ["trade.totalPrice","RevertWithReason","RevertWithReason","ETH"], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("", ["vi92a5","UsesExample","IsLibrary","trade.totalPrice"], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("P", ["call updateEthPrice","z2jn1h","r0kddg","L","lalc4o"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(56, "listingID arg", ["hsy1n","P","call updateEthPrice","trade.totalPrice","hsy1n"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(1532892062, "IsLibrary", ["Oraclize query was sent, standing by for the answer...","vi92a5","0f7g5","listingID arg","call updateEthPrice"], 10001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("UsesExample", ["Oraclize query was sent, standing by for the answer...","listingID arg","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","0","costUSD"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("0f7g5", [[54,152,170,58,106,214,30,183,145,246,153,43,174,24,10,61,132,146,5,126,133,63,13,41,94,154,231,54,225,169,34,226]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(10000, "Oraclize query was sent, standing by for the answer...", [[119,239,238,182,48,146,232,29,216,8,55,46,91,234,89,59,71,133,8,142,71,196,244,155,170,90,207,63,36,17,85,94],[62,146,34,218,82,52,152,146,67,11,199,145,79,72,157,78,94,124,195,85,34,39,196,255,42,137,110,192,85,91,226,210],[93,79,190,59,251,9,54,100,59,33,13,45,241,248,35,147,143,23,3,254,229,187,129,175,48,18,11,126,28,190,38,176],[31,152,141,167,64,147,39,141,103,175,146,229,230,219,20,194,139,249,73,46,232,216,211,21,208,89,211,99,123,71,230,42],[169,216,29,236,75,24,90,16,25,46,213,155,120,230,51,133,84,83,235,194,170,190,69,103,36,159,188,55,138,41,58,17],[8,25,29,158,56,70,99,31,112,136,69,210,204,42,186,140,177,181,64,134,127,68,103,39,96,50,205,77,151,79,189,90],[91,91,247,36,130,86,130,213,111,5,99,66,170,73,238,191,177,103,189,223,95,163,154,227,18,181,90,59,5,250,172,59],[249,89,239,157,138,73,77,160,185,86,55,252,233,90,206,252,204,211,187,63,176,175,174,46,198,50,208,208,138,57,226,9],[16,102,216,155,204,68,152,62,135,243,237,219,53,15,145,163,239,7,73,224,12,119,215,142,195,43,243,219,244,237,159,25],[123,106,10,224,17,111,104,165,18,148,18,135,32,23,168,180,64,218,1,237,160,73,180,17,59,178,227,138,91,168,83,210]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(128, "RevertWithReason", [[250,200,33,93,253,179,29,1,148,124,101,133,50,172,249,158,184,60,113,233,23,79,115,148,9,63,209,106,146,199,176,135],[44,161,176,104,170,221,129,39,212,117,239,103,9,20,11,162,232,126,240,138,17,237,54,221,59,231,99,76,144,138,75,208],[41,28,129,74,211,173,169,134,30,141,209,73,18,209,47,200,217,26,225,83,13,96,37,39,184,244,189,245,237,120,81,226],[71,74,34,178,113,249,134,219,203,150,30,251,8,101,34,252,110,69,137,19,54,126,125,173,33,117,172,34,26,106,138,52],[2,70,117,117,221,199,233,245,120,107,143,189,246,244,77,150,162,165,39,254,4,151,88,14,146,73,216,176,49,139,11,59],[21,82,228,210,181,206,75,131,60,236,229,203,3,39,241,38,14,121,15,238,132,17,122,66,142,103,0,66,195,13,168,154],[161,135,152,75,16,139,114,105,187,237,106,235,207,174,29,118,173,195,50,87,185,105,74,162,79,44,33,12,176,76,176,221],[55,93,240,109,93,136,208,141,46,171,9,24,201,62,244,68,188,31,111,227,86,192,233,148,234,37,206,113,231,90,94,125],[251,148,176,219,20,201,180,28,124,240,38,254,45,197,75,176,139,127,56,223,30,82,174,11,222,179,120,149,54,224,194,98]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("hsy1n", [[33,116,189,65,53,179,151,44,222,210,213,202,47,198,216,109,74,18,3,130,33,170,28,225,186,8,215,208,142,42,147,100],[171,196,108,22,249,168,199,60,133,181,236,33,232,89,113,25,70,1,247,154,101,102,81,185,2,9,168,188,174,213,157,249],[174,159,225,25,165,124,168,153,35,87,68,37,150,30,22,163,156,176,222,208,84,237,32,245,227,203,141,80,28,249,43,144]], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("0", [[200,4,181,3,195,106,218,118,98,143,146,143,124,95,129,69,117,190,18,245,32,31,244,153,70,29,124,110,212,200,41,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(18, "\x19Ethereum Signed Message:\n32", [[17,216,75,2,182,178,230,7,5,78,237,61,162,103,156,12,233,159,213,59,178,64,130,210,6,108,68,227,19,166,126,215]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(102, "updateEthPrice called", [[250,182,79,127,119,115,63,69,176,196,149,64,98,73,110,214,140,50,133,78,234,114,98,187,191,214,37,12,113,98,55,37]], 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("ETH", [[64,99,113,206,116,83,214,109,132,114,103,91,78,222,187,222,188,185,11,166,190,164,105,227,162,117,4,122,109,57,41,91]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("0", [[153,140,72,227,252,168,171,178,107,132,107,46,32,44,167,30,48,224,37,7,159,78,87,232,78,149,91,188,16,98,73,9],[21,61,90,202,198,19,80,30,82,111,237,220,84,133,133,101,12,10,255,183,190,142,13,241,170,69,46,249,125,157,64,147]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(27, "0", [[69,214,163,52,86,153,39,63,234,93,113,37,73,147,18,251,241,138,96,138,95,180,62,177,201,197,146,56,178,234,226,110],[15,183,217,225,7,199,57,221,225,84,101,44,210,45,67,125,132,38,88,49,23,135,31,14,0,108,133,103,99,86,12,98]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(1337, "P", [[180,251,46,235,81,88,240,187,101,215,72,113,106,245,18,147,106,152,8,146,211,156,115,12,176,192,43,66,41,208,194,125],[17,40,1,166,26,30,102,80,144,33,30,210,247,25,112,142,67,135,231,23,110,252,246,251,235,57,132,205,172,58,16,81]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("costUSD", [[187,98,139,73,77,113,107,175,217,36,195,10,195,16,151,141,12,149,101,169,33,90,39,226,177,137,126,172,30,107,75,107],[1,27,200,136,144,207,2,87,203,168,159,133,174,133,54,157,114,186,19,176,230,185,177,37,112,92,76,138,7,11,38,34]], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("Example", [[47,30,64,106,97,43,165,204,42,172,157,111,128,81,8,253,22,160,94,11,105,17,1,41,126,61,132,60,119,71,76,185],[247,108,186,75,182,37,193,247,67,11,71,104,119,206,28,51,228,230,166,207,107,40,250,97,156,188,25,244,111,86,51,14],[31,42,84,110,206,57,164,88,94,55,242,201,1,157,183,244,222,189,126,212,120,167,40,41,131,50,163,48,162,56,243,233]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(1337, "UsesExample", [[240,245,201,14,239,128,241,197,159,2,149,142,36,0,175,122,171,119,250,7,205,244,164,12,66,100,229,188,22,181,4,248],[93,8,194,80,28,158,60,115,109,4,214,198,121,62,188,146,225,14,126,16,49,161,66,48,16,170,11,91,203,23,91,237],[77,162,64,101,232,100,4,92,162,1,251,38,4,83,73,67,215,168,199,213,147,56,73,7,229,155,248,10,204,237,29,127]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(65, "updateEthPrice called", [[130,191,111,219,213,111,192,113,26,1,166,1,132,131,181,119,163,166,150,29,150,97,165,119,0,165,20,197,141,133,163,53],[23,229,45,127,191,77,78,219,158,165,202,5,66,138,241,153,133,4,41,123,215,187,156,168,64,6,245,175,122,149,108,103],[51,63,140,83,184,62,99,4,204,143,73,82,205,100,65,144,116,185,86,231,68,93,67,80,251,78,141,168,100,114,86,174]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[93,237,116,100,128,87,45,24,149,226,73,152,242,117,19,220,91,138,9,108,53,167,163,54,73,33,140,36,53,178,11,183],[186,86,148,188,51,204,201,159,208,150,59,97,110,213,235,176,105,254,88,244,167,187,206,147,134,52,47,53,248,161,200,127],[198,213,27,251,29,147,117,204,139,207,65,108,237,3,198,81,86,206,205,170,177,158,121,251,7,49,229,84,135,152,206,151]], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("h6jlfo", [[156,51,156,154,41,135,37,50,101,28,193,150,103,176,161,181,142,93,197,251,85,160,6,244,249,43,61,33,191,120,206,21],[63,102,126,231,1,7,182,80,205,4,116,206,208,167,1,0,177,197,117,80,49,2,165,179,93,168,14,129,234,147,51,31],[161,130,173,240,4,183,11,218,85,215,179,228,254,231,44,38,215,19,6,22,172,226,39,21,26,116,38,231,230,130,121,193],[174,130,135,197,108,97,8,38,182,77,6,112,40,89,9,20,55,123,250,91,70,160,162,32,213,173,228,74,47,243,38,168]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(1532892063, "hsy1n", [[48,25,251,167,207,206,29,29,68,167,213,90,7,177,89,92,160,31,251,219,35,242,228,183,51,252,15,0,56,66,225,124],[130,17,210,84,88,179,248,201,166,194,96,195,187,41,254,179,217,182,49,93,59,225,243,22,157,56,178,195,204,111,110,144],[87,47,193,103,187,246,221,237,25,183,206,36,116,14,249,17,112,73,107,226,17,158,87,80,99,24,188,164,2,166,36,212],[113,76,129,230,52,45,255,50,72,247,226,34,113,218,100,196,227,59,150,247,250,253,255,20,136,70,11,198,159,236,226,180]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(69, "t46vx", [[69,118,22,132,66,217,135,5,94,236,27,124,92,14,99,159,76,233,133,164,81,130,187,24,164,131,128,134,95,152,219,52],[241,161,104,124,79,113,74,214,229,223,173,30,95,100,79,158,73,33,212,82,254,30,32,49,149,231,242,141,168,255,167,2],[15,228,159,186,237,237,99,191,169,106,239,78,172,164,94,122,74,183,87,239,188,98,73,235,104,180,254,105,169,227,46,33],[143,63,59,14,133,70,84,86,42,30,238,42,160,47,212,77,135,116,72,137,176,180,74,195,133,68,185,19,182,115,243,149]], 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("z2jn1h", [[226,59,99,203,173,28,128,15,143,17,111,80,3,20,130,50,59,227,103,165,246,129,39,107,161,114,79,198,141,225,226,92],[83,51,17,193,146,214,17,45,130,43,252,249,230,158,191,109,173,236,9,76,111,47,15,1,31,74,152,30,89,125,201,45],[166,242,98,54,102,33,139,116,170,124,143,239,2,207,102,182,107,216,178,152,46,175,153,230,204,38,242,218,71,214,31,192],[128,232,229,26,115,136,130,169,242,114,96,161,184,164,1,231,188,5,132,166,165,195,233,27,138,33,18,229,96,37,174,54]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ig8bi", [[95,241,86,2,50,239,24,146,52,197,223,54,15,201,182,124,173,112,156,123,27,4,170,119,41,62,210,50,169,232,180,103],[45,253,42,173,240,88,224,128,227,21,98,82,219,84,247,78,113,63,150,186,120,82,130,199,95,182,19,86,193,183,96,13],[122,116,9,183,177,101,61,26,74,14,173,198,144,52,80,28,80,151,1,193,26,85,161,162,226,150,47,177,121,220,15,80],[238,107,243,27,246,25,177,255,132,243,25,47,18,170,185,226,136,160,110,116,143,232,32,29,237,252,220,233,15,37,246,138],[184,103,71,134,166,222,49,249,119,122,78,217,187,176,112,175,99,33,30,236,99,177,207,81,49,91,95,142,235,140,230,163]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(4, "hsy1n", [[58,190,43,47,170,34,138,12,56,222,233,1,114,225,173,33,92,156,38,119,207,113,202,18,222,176,121,55,134,205,191,94],[136,250,175,99,99,224,7,219,103,20,177,128,54,207,233,18,131,214,174,109,9,117,191,242,219,80,163,104,84,141,141,186],[75,201,218,50,54,50,207,69,244,209,37,116,237,42,60,217,226,173,215,117,110,215,225,131,63,140,238,201,39,161,130,83],[80,17,253,45,219,109,156,111,118,190,80,37,117,33,216,153,99,24,37,86,107,190,78,6,19,178,164,165,98,148,106,98],[22,129,173,42,165,175,128,157,135,96,255,110,151,35,220,149,238,107,106,193,167,94,41,26,78,140,62,156,130,2,17,60]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(46, "UsesExample", [[121,77,215,65,112,56,205,123,9,7,101,103,138,30,228,218,69,92,41,210,62,121,240,132,138,247,213,153,116,50,83,86],[222,237,54,127,24,101,140,71,232,191,4,245,129,212,30,249,98,7,172,52,82,40,216,119,223,213,10,106,203,221,101,7],[41,253,204,242,17,42,196,222,250,136,222,191,156,104,92,58,99,111,224,126,121,79,255,89,119,53,85,148,123,202,206,146],[150,175,134,245,78,136,20,179,187,229,220,191,5,32,163,116,142,160,57,247,3,146,14,108,143,122,141,255,84,91,5,175],[24,25,103,204,189,9,233,152,55,252,195,132,11,2,137,57,196,17,8,161,2,195,76,133,148,22,193,191,53,13,196,10]], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("h6jlfo", [[45,223,84,53,178,166,31,214,146,120,143,148,49,200,223,154,55,18,136,210,208,220,145,209,8,71,65,148,247,248,252,200],[156,157,143,253,47,10,224,51,214,10,229,70,226,28,30,81,128,120,98,190,138,247,115,143,11,103,217,113,89,233,80,129],[240,140,130,53,138,226,54,231,93,254,31,129,100,165,178,130,25,119,28,245,62,50,148,188,97,208,146,26,216,103,142,247],[158,75,182,55,53,222,11,116,113,141,87,240,228,212,199,82,212,153,30,70,136,196,94,1,168,102,233,121,160,110,60,79],[179,157,69,110,64,15,192,148,255,145,87,33,231,118,136,173,20,131,78,126,100,113,113,147,192,9,22,92,218,182,247,219]], 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([157],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[1],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(71,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("0f7g5",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("P", "",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("", "hsy1n",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("Example", "ig8bi",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("RevertWithReason", "\x19Ethereum Signed Message:\n32", "L",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("ETH", "listingID arg", "updateEthPrice called", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("call updateEthPrice", "", "z2jn1h", "PayableExample", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("h6jlfo",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("", 70,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("ig8bi", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("0",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("h6jlfo", 255,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(96,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[125,253,83,186,195,153,226,60,36,57,60,240,99,53,145,221,196,97,104,45,209,18,240,74,87,120,142,156,152,138,87,208],[70,44,157,8,212,132,24,242,236,107,82,27,150,106,101,174,131,145,240,153,250,56,194,112,66,101,47,207,165,162,82,91],[94,17,159,148,149,65,115,237,223,208,8,0,123,216,95,134,38,219,84,133,244,186,93,166,83,13,73,138,97,83,239,204],[52,143,41,149,188,162,191,122,239,92,189,67,124,34,73,81,64,175,123,49,164,138,126,254,245,40,116,14,102,238,131,141],[220,13,21,1,22,85,19,229,202,35,155,60,135,175,194,240,154,84,184,68,146,112,75,24,228,85,15,114,252,148,159,216],[211,26,103,222,113,23,173,7,161,235,180,44,250,11,20,254,240,182,108,187,21,222,37,34,240,151,42,167,94,199,221,192],[36,92,213,168,25,95,201,161,11,150,71,147,14,114,246,57,141,149,57,91,59,129,104,198,174,118,109,198,191,27,178,178],[18,153,140,202,7,72,68,164,60,12,148,162,46,33,183,192,191,86,193,57,186,180,172,75,130,114,231,70,31,39,71,146]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(64, 2, 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([175,146,168,142,204,119,74,218,132,187,23,160,188,97,206,77,187,134,68,179,126,3,171,48,152,223,129,10,203,73,1,246], [166,64,153,67,171,128,180,216,88,178,197,208,62,64,142,196,14,167,251,10,97,61,184,66,61,104,175,30,145,41,208,248],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([101,115,177,237,102,134,102,228,39,18,249,97,182,100,43,154,237,148,110,127,205,109,198,91,33,211,220,241,56,245,153,102], [177,47,216,226,229,82,203,47,241,113,212,131,64,121,187,22,123,39,114,130,68,155,40,89,13,80,151,42,109,220,184,95], [88,161,172,54,46,21,76,169,49,31,184,44,102,120,117,229,21,199,43,21,80,205,11,102,98,140,38,244,79,52,22,133],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([122,192,147,212,22,206,184,255,217,124,109,207,159,239,133,131,22,237,130,135,145,125,54,109,210,235,215,215,61,41,23,64], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([185,138,157,14,142,10,161,209,1,186,249,201,28,135,245,52,6,181,243,225,114,234,130,7,230,221,237,157,115,70,208,57], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([206,204,205,183,29,13,117,236,18,166,11,236,194,137,168,92,231,63,169,228,207,185,75,147,169,53,11,186,81,245,1,254], "UsesExample", [226,68,65,101,207,141,37,219,6,251,127,238,143,146,247,182,205,115,212,174,126,205,163,255,175,37,187,115,189,54,157,255],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([150,253,190,238,183,75,89,175,10,204,70,121,125,85,114,104,175,219,252,196,222,62,12,234,71,102,67,185,29,51,138,254], "costUSD", [137,41,78,146,188,168,173,195,241,230,212,62,232,154,94,46,105,217,24,64,101,39,208,17,68,141,18,45,40,81,138,57],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([125,80,120,38,229,194,197,36,41,91,7,226,100,237,248,96,83,41,8,49,37,187,49,79,162,2,211,217,193,57,29,80], [167,36,77,224,202,129,205,66,77,12,211,202,72,36,248,56,86,103,180,226,133,99,53,89,111,45,182,63,167,45,47,215], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([125,80,120,38,229,194,197,36,41,91,7,226,100,237,248,96,83,41,8,49,37,187,49,79,162,2,211,217,193,57,29,80], [46,16,72,196,252,180,126,96,38,87,122,211,102,122,222,75,137,250,41,28,119,193,15,158,142,111,152,3,11,63,219,116,141], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([214,151,93,175,84,2,159,182,109,29,180,102,197,82,33,94,249,54,90,32,10,212,121,196,156,38,217,168,254,139,228,214], [209,111,106,162,88,47,30,143,88,173,118,18,183,21,246,197,46,253,126,102,141,239,88,127,100,25,38,210,116,30,11,74], [119,217,48,125,206,230,38,168,12,31,1,250,115,214,151,211,177,224,211,77,167,0,156,102,95,5,136,74,248,252,199,48], "lalc4o",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([77,60,72,148,219,12,49,88,185,163,107,176,154,208,213,175,13,22,156,215,20,245,60,220,108,163,35,247,109,95,143,218], [250,10,240,10,180,155,62,21,102,37,109,80,219,49,244,75,61,48,236,95,149,30,173,154,108,143,106,68,66,105,224,101], [159,108,18,185,154,69,129,204,30,242,90,66,112,4,100,42,122,135,213,41,32,39,126,146,238,14,172,247,27,34,7,247], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([9,63,71,50,80,21,209,115,87,12,1,52,126,246,21,110,215,54,221,42,230,97,11,46,65,105,0,245,13,114,107,117], [166,113,183,138,51,122,5,46,179,51,163,229,170,102,246,95,57,242,8,214,194,97,191,91,88,42,238,171,34,235,38,27], [99,147,131,8,64,229,173,105,146,216,192,0,223,247,214,107,98,135,219,150,153,82,26,53,108,31,236,75,252,222,61,153], "vjhiqg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([163,26,217,190,6,255,50,39,255,24,40,85,126,218,171,160,97,8,249,211,62,219,224,222,164,83,72,223,100,238,118,170], [134,168,184,226,201,110,151,122,174,116,99,66,124,101,88,53,17,93,114,99,155,253,66,49,97,77,28,180,177,52,123,145], [89,212,157,83,145,7,88,122,22,94,181,226,115,71,119,22,234,3,80,143,254,115,16,142,75,21,105,217,45,66,55,229], "ig8bi",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([28,182,249,20,77,166,138,120,27,230,229,144,4,155,161,170,183,166,251,193,107,255,54,210,48,172,53,255,244,195,124,108], [3,30,37,204,100,102,105,46,221,89,234,218,75,247,202,150,85,4,43,86,43,45,29,142,67,14,134,164,12,142,4,164], [27,249,169,10,91,201,165,212,87,108,188,153,15,92,194,155,4,1,217,82,174,107,6,252,145,28,80,83,59,46,154,141], "h6jlfo",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([22,209,188,209,46,103,203,123,253,180,55,118,97,113,249,87,154,48,24,89,165,204,160,184,63,98,86,160,165,195,250,173], [177,106,20,41,34,133,1,177,171,90,137,173,250,153,47,86,246,184,115,104,162,85,49,16,152,127,207,64,160,112,47,61], [22,22,246,133,231,81,32,16,106,235,181,248,77,185,178,46,254,95,57,74,26,134,209,197,90,66,53,25,76,87,41,162], "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([156,41,51,95,114,3,236,199,182,33,53,177,208,136,102,20,239,142,0,5,145,75,120,211,103,113,247,239,128,94,181,35], [194,115,91,38,174,222,138,181,119,188,91,253,215,73,20,140,184,101,199,61,180,169,95,4,7,96,168,64,1,164,170,1], [4,22,235,95,147,59,107,182,156,67,15,195,58,103,16,47,82,35,192,125,110,226,228,224,116,21,80,129,176,106,244,31], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([33,180,84,214,178,254,2,217,103,150,95,197,189,164,142,1,159,4,117,72,93,117,203,35,105,143,48,50,216,149,29,86], [158,123,128,157,235,58,3,235,52,175,27,220,67,107,254,29,148,61,32,34,165,198,123,48,144,174,24,255,222,107,136,66], [224,69,45,63,56,21,185,149,175,39,79,160,141,228,184,133,100,207,139,83,12,97,109,23,66,30,217,206,60,11,213,174], "vjhiqg",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([191,132,207,76,40,146,211,118,218,196,131,42,195,19,145,34,28,95,89,74,69,25,126,50,177,34,73,186,88,147,244,128], 54, 257, [242,216,212,68,59,26,94,199,254,242,50,170,139,21,89,6,140,166,4,173,238,135,163,232,12,143,236,71,75,62,71,112], 1025,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([98,78,207,5,58,164,166,148,215,213,211,16,217,172,155,138,66,113,38,153,38,26,7,158,149,231,201,221,100,215,51,180], 0, [221,125,84,37,198,134,106,36,128,31,212,203,178,134,244,138,145,199,158,109,212,242,250,133,97,101,145,206,115,86,119,192], [218,191,174,94,27,188,102,104,108,119,108,55,34,198,219,205,67,244,182,225,227,133,12,205,209,9,113,220,208,54,214,192],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([68,73,70,239,140,25,151,217,125,159,112,111,4,34,167,142,182,157,132,192,217,46,62,21,75,14,214,14,229,168,143,151], [2,190,9,145,148,77,102,132,234,239,139,167,224,134,250,155,210,180,76,87,231,124,44,55,3,14,111,38,30,225,208,206,18,112,8,126,134,2,242,16,197,122,71,103,26,64,104,202,24,47,122,25,134,67,222,115,191,234,242],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([107,89,217,70,104,136,51,187,41,232,108,108,165,49,74,176,250,217,0,1,202,105,167,52,119,156,230,31,2,4,74,79], [75,44,35,221,176,239,31,79,238,201,188,26,176,215,138,139,171,194,58,52,145,161,197,82,191,203,82,199,25,122,227,92,27,165,110,187,254,102,42,69,101,46,34,51,144,165,51,231,215,228,208,102,196,180,93,122,155,253,214,4,7,185,100,132,94],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
