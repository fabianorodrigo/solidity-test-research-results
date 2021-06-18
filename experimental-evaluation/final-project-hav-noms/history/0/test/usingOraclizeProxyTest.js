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
    contractState = await State.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[8],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[5],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[4],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"P",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(2,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("bd9hum", 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("", "",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(98, "updateEthPrice called", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(9999, "ETH", "", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("UsesExample", "UsesExample", 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("costUSD", "Example", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(18, "PayableExample", "Example", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(9999, "L", "", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("costUSD", "Example", "trade.totalPrice", 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("UsesExample", ["PayableExample","L","p6d0k9","Oraclize query was sent, standing by for the answer...","updateEthPrice called","trade.totalPrice","trade.totalPrice","PayableExample","bd9hum","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(0, "PayableExample", ["p6d0k9","bd9hum","RevertWithReason","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(65, "", ["0","0","trade.totalPrice","0"], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("updateEthPrice called", ["Oraclize query was sent, standing by for the answer...","bd9hum","p6d0k9","RevertWithReason","L","Example","listingID arg","\x19Ethereum Signed Message:\n32","0"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("ETH", [""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(1023, "\x19Ethereum Signed Message:\n32", ["L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(11, "Oraclize query was sent, standing by for the answer...", ["RevertWithReason"], 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("", ["call updateEthPrice"], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("Oraclize query was sent, standing by for the answer...", ["bd9hum","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(1025, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["trade.totalPrice","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(27, "Oraclize query was sent, standing by for the answer...", ["bd9hum","listingID arg"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("p6d0k9", ["Example","P"], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("0", ["p6d0k9","Oraclize query was sent, standing by for the answer...","p6d0k9"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(87, "", ["RevertWithReason","IsLibrary","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(33, "", ["P","IsLibrary","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["P","\x19Ethereum Signed Message:\n32","bd9hum"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("v4qlkg", ["PayableExample","Example","bd9hum","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(1532892062, "listingID arg", ["P","ETH","trade.totalPrice","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(55, "\x19Ethereum Signed Message:\n32", ["bd9hum","\x19Ethereum Signed Message:\n32","RevertWithReason","\x19Ethereum Signed Message:\n32"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("costUSD", ["call updateEthPrice","\x19Ethereum Signed Message:\n32","IsLibrary","ETH"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("IsLibrary", ["n3j0zi","","call updateEthPrice","bd9hum","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(127, "UsesExample", ["bd9hum","Oraclize query was sent, standing by for the answer...","L","ETH","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(0, "ETH", ["fpcc0a","bd9hum","0","updateEthPrice called","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("0", ["call updateEthPrice","PayableExample","Oraclize query was sent, standing by for the answer...","costUSD","Oraclize query was sent, standing by for the answer..."], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("updateEthPrice called", [[38,197,10,3,155,14,93,91,118,190,14,13,35,90,162,121,29,246,47,247,144,38,123,9,128,127,91,24,73,221,120,212],[109,2,201,201,36,140,71,55,204,227,198,69,129,1,235,124,166,51,206,147,242,69,187,184,250,44,23,166,22,12,198,64],[208,239,174,182,221,246,223,237,117,0,34,235,53,8,77,231,65,122,120,25,108,200,23,151,88,206,120,220,53,56,6,54],[93,221,55,176,1,141,133,9,27,85,139,253,78,49,157,120,205,71,73,138,20,174,145,99,191,201,196,50,140,104,120,24]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(199999, "Oraclize query was sent, standing by for the answer...", [[112,226,196,186,204,105,126,151,122,96,216,160,125,223,106,230,164,97,123,73,66,219,188,250,181,146,195,190,15,198,138,223],[238,201,136,5,34,234,43,79,130,44,185,71,175,246,236,78,187,167,170,37,30,66,233,67,60,144,80,76,231,54,238,120],[212,231,11,83,13,194,61,243,172,198,197,96,170,128,107,68,163,51,62,127,247,130,119,126,1,68,216,135,55,37,14,180]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(257, "L", [[45,213,84,39,234,196,55,148,172,226,106,218,25,19,31,221,226,6,251,137,175,31,69,18,51,22,102,15,235,21,90,164],[22,191,95,156,79,125,209,159,135,252,213,131,124,203,221,218,233,92,165,44,136,19,247,12,3,222,83,225,7,215,117,29],[165,155,150,65,144,95,71,99,106,156,207,8,180,65,6,65,118,20,190,220,126,29,31,108,241,137,155,194,51,224,193,176],[2,78,34,31,163,94,204,69,244,157,140,88,59,53,90,44,233,169,205,184,115,2,216,132,210,185,95,47,193,151,221,82],[254,167,146,208,68,222,75,131,244,127,9,99,132,212,199,10,150,148,153,57,237,18,70,184,171,190,105,81,42,179,37,61],[112,235,176,202,211,12,77,119,240,131,63,113,59,156,255,42,115,186,196,124,249,40,45,54,225,33,224,227,177,4,210,169],[43,99,159,128,47,9,129,74,65,84,170,54,228,28,165,106,152,131,226,198,148,164,111,60,76,71,92,238,197,28,237,164],[15,10,145,225,185,104,121,181,125,129,199,169,111,75,98,2,156,13,93,243,144,111,31,161,129,35,150,82,158,180,17,110],[116,239,7,245,189,226,218,122,119,195,103,116,162,217,105,77,138,141,93,78,155,230,22,117,149,71,251,242,46,43,193,231],[234,77,178,43,144,86,194,182,98,251,23,175,96,192,214,185,146,56,230,206,31,42,221,148,65,225,119,6,171,128,83,226]], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("IsLibrary", [[92,1,36,249,95,61,241,165,62,246,138,67,130,189,72,69,182,106,154,100,250,197,220,92,203,13,94,252,129,114,229,231],[244,130,192,242,138,37,150,219,219,227,27,163,185,156,1,154,175,227,153,153,226,116,85,154,83,126,52,252,92,174,164,84],[201,2,208,227,84,217,55,251,62,122,84,6,179,49,115,122,137,42,214,160,210,116,167,165,222,59,205,160,42,186,96,252],[214,129,158,121,244,169,22,133,116,3,7,82,10,91,120,61,143,140,188,101,117,128,225,211,218,143,213,248,7,91,250,137]], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("trade.totalPrice", [[63,110,16,63,76,71,95,13,224,161,52,157,110,58,52,236,126,232,4,36,132,192,164,150,7,110,181,149,184,230,231,170]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(101, "UsesExample", [[221,83,19,190,251,143,196,148,42,216,223,225,165,240,203,212,179,251,173,174,147,119,205,130,230,150,255,125,235,182,188,113]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(33, "IsLibrary", [[145,24,223,6,174,105,11,111,63,221,75,252,7,153,92,188,31,231,127,185,55,77,241,113,4,30,30,73,44,4,248,51]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("trade.totalPrice", [[36,133,224,5,109,243,84,47,75,45,2,91,124,168,119,41,63,78,60,208,108,29,4,150,241,212,240,237,169,247,226,219]], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("costUSD", [[141,127,78,80,233,163,200,22,136,178,156,224,109,227,150,234,199,211,51,143,200,130,206,228,160,13,249,34,26,75,217,222],[102,192,224,77,219,138,172,122,28,219,169,37,209,161,198,47,112,254,149,12,94,110,87,112,248,229,231,137,204,47,253,87]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(60, "nombqa", [[144,147,238,15,179,21,36,43,191,157,87,233,4,150,216,121,91,25,171,25,61,108,197,223,155,211,48,104,216,196,238,248],[245,188,156,228,231,170,3,9,19,66,11,50,164,190,39,120,245,182,209,91,127,249,165,149,244,186,108,84,90,190,142,38]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(49, "PayableExample", [[66,123,19,228,35,119,3,51,9,223,123,179,143,119,25,86,146,242,75,143,137,253,164,23,199,166,203,133,200,56,202,18],[166,47,11,187,55,253,212,121,131,232,202,229,72,222,36,191,19,228,234,67,129,157,78,251,205,140,47,245,203,237,135,44]], 10001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("9dxfn7", [[56,9,64,243,228,117,224,89,22,134,67,197,84,108,161,224,119,16,105,249,71,73,187,46,235,130,4,101,126,102,94,1],[222,245,126,75,203,79,178,217,113,199,180,141,252,201,18,91,145,164,207,55,134,233,77,185,172,228,135,143,56,166,4,30]], 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("L", [[110,78,116,8,122,157,190,16,192,138,57,229,124,183,192,162,167,123,161,148,97,13,75,71,0,45,92,181,150,12,241,134],[236,176,237,138,192,186,157,52,23,102,81,223,195,255,252,221,163,29,168,226,53,215,227,249,12,60,89,136,207,59,119,146],[253,120,202,155,212,51,9,2,106,62,97,146,233,59,34,234,75,103,15,241,99,174,83,120,214,20,75,149,149,216,229,192]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(1, "nombqa", [[71,42,100,151,232,210,2,15,156,229,68,148,249,254,83,158,71,56,227,199,199,58,81,172,122,118,155,89,232,87,153,70],[190,73,55,59,152,67,234,98,193,18,208,44,179,33,65,76,36,152,191,194,229,151,225,216,144,168,99,114,180,42,9,93],[63,222,218,93,147,14,109,74,98,134,46,37,133,190,211,253,34,200,97,214,200,225,142,28,192,60,228,87,92,43,27,3]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(129, "PayableExample", [[249,108,111,98,13,230,204,130,33,208,219,139,188,177,92,51,237,152,186,76,116,13,186,242,151,121,171,161,83,22,130,45],[82,24,233,104,190,177,190,22,190,227,22,190,193,111,171,127,74,235,123,59,25,68,165,126,250,5,26,232,114,10,39,209],[149,217,77,125,63,242,103,87,172,40,157,197,42,125,196,9,146,14,90,155,245,23,75,12,187,214,192,16,213,13,76,206]], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("Example", [[239,112,10,19,151,136,122,225,86,237,42,19,102,176,223,149,31,21,23,240,55,186,23,242,190,203,44,114,111,126,155,195],[33,174,103,218,214,18,81,94,21,83,41,255,179,74,75,130,9,176,35,212,237,0,233,118,102,182,40,174,65,159,191,151],[61,55,210,228,169,125,120,207,146,208,135,226,185,151,205,64,190,4,175,205,49,115,38,58,8,94,154,78,59,249,24,66]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("nombqa", [[108,221,50,81,8,168,192,39,238,33,155,98,198,200,186,134,156,137,79,231,45,25,132,138,213,156,19,134,251,49,53,201],[91,233,124,158,15,109,188,143,135,189,7,213,221,103,176,201,29,92,53,7,154,153,20,80,46,175,138,187,122,56,232,253],[59,235,192,208,180,198,195,223,68,141,160,218,68,200,25,247,185,129,243,197,8,144,201,215,40,100,112,0,183,205,216,145],[239,163,215,15,98,242,121,19,62,102,99,113,138,82,12,217,49,130,48,223,2,227,206,152,166,5,241,231,102,228,12,45]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(16, "n3j0zi", [[194,26,102,172,39,195,91,14,13,188,106,215,140,225,123,211,200,191,160,32,107,74,247,206,31,47,255,6,45,27,172,223],[243,73,110,245,253,208,130,136,104,224,9,56,43,13,6,237,179,251,128,72,4,171,148,195,144,176,97,91,200,93,140,227],[49,5,224,73,225,108,47,133,35,78,27,209,13,42,139,178,158,108,144,220,35,229,184,60,166,8,77,149,241,207,91,19],[171,237,139,241,120,122,222,253,104,203,141,188,132,13,11,126,231,149,210,112,227,62,18,193,170,20,17,220,111,182,167,218]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(1025, "updateEthPrice called", [[1,136,39,251,75,128,194,96,246,0,180,97,206,196,212,88,130,80,224,105,125,163,159,225,78,76,152,155,208,120,92,34],[143,119,71,149,40,73,225,35,217,75,148,243,22,98,244,116,61,190,183,195,207,3,42,242,1,35,19,215,178,164,246,82],[12,211,83,191,41,213,175,31,58,136,24,154,21,63,33,154,210,113,132,151,8,109,51,130,244,156,138,245,216,62,8,207],[114,15,31,200,31,113,25,0,28,0,49,126,47,245,109,55,69,247,0,138,124,192,214,253,125,183,80,210,163,236,241,218]], 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("UsesExample", [[237,60,47,214,113,65,237,217,65,198,161,103,209,22,171,212,197,147,142,113,6,31,244,84,116,154,169,190,184,155,215,36],[138,121,160,85,194,179,246,4,19,233,17,83,239,201,69,13,149,253,106,221,93,96,151,64,153,210,174,222,202,44,15,182],[138,243,206,186,185,163,181,123,239,106,168,118,17,19,243,115,56,196,165,253,77,211,236,69,30,49,73,179,114,224,185,139],[154,1,183,243,92,89,178,75,175,214,10,250,36,183,139,115,110,155,177,59,68,194,129,114,160,157,222,208,49,94,125,178]], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("UsesExample", [[98,174,111,204,137,218,56,7,123,37,107,147,177,159,141,196,41,93,125,73,250,42,36,94,215,204,165,173,243,96,162,81],[143,34,82,80,111,182,239,140,91,229,161,194,66,3,22,159,1,184,187,186,59,135,132,108,170,70,103,30,136,47,110,61],[189,121,37,193,108,95,56,81,182,226,216,47,224,136,81,227,230,49,39,106,81,12,34,188,45,230,67,61,98,22,97,51],[40,98,129,65,242,226,236,194,87,47,119,213,177,27,130,202,7,66,167,255,22,145,241,173,42,71,12,153,242,83,106,32],[220,72,162,188,66,26,9,76,128,171,49,193,114,222,47,93,184,250,198,69,139,192,88,149,146,224,76,131,170,45,234,156]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(26, "Oraclize query was sent, standing by for the answer...", [[141,178,186,191,163,200,234,42,79,58,171,53,115,75,199,158,119,233,57,19,127,248,84,32,227,84,111,243,241,92,128,8],[146,144,36,208,91,220,244,61,94,6,204,229,41,201,209,76,211,165,82,114,241,17,186,11,129,237,40,182,115,53,78,226],[11,53,168,144,123,238,122,35,15,9,252,147,152,5,139,101,234,42,146,168,247,45,81,197,216,115,161,214,108,43,138,111],[25,87,43,195,87,21,249,24,254,243,210,121,10,194,120,52,230,59,166,144,213,115,14,157,80,56,7,166,20,117,232,231],[149,21,9,193,205,68,172,6,57,34,190,162,82,224,175,141,156,172,109,250,137,246,48,44,210,243,73,246,237,215,54,165]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(24, "L", [[146,190,91,221,115,153,50,164,27,131,157,153,147,16,213,223,83,118,221,51,93,51,63,147,234,152,42,150,145,129,203,76],[14,253,70,0,77,102,193,1,15,32,58,157,222,216,183,50,157,153,2,9,9,120,144,194,162,172,127,136,240,228,78,29],[108,242,230,28,158,109,227,174,201,189,162,103,204,253,189,172,209,12,68,126,128,141,88,206,13,185,112,192,166,145,166,198],[42,155,181,166,38,183,102,122,139,97,236,222,146,22,44,44,41,242,22,78,71,150,119,102,66,223,221,186,162,227,202,74],[43,177,187,149,101,77,144,208,244,116,44,203,100,116,249,252,88,216,239,219,115,181,28,38,191,144,152,115,100,50,194,11]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("costUSD", [[10,200,124,199,5,19,79,137,118,25,50,28,193,215,120,209,233,112,42,84,26,107,46,142,35,143,131,57,199,230,142,78],[176,245,54,69,10,141,251,66,123,114,65,181,49,163,156,133,200,166,149,95,138,102,224,45,114,58,138,192,126,81,151,191],[48,181,132,9,167,7,179,199,81,48,159,244,168,75,249,122,216,58,81,93,169,145,4,211,230,194,128,164,28,217,152,43],[112,92,214,171,29,123,88,224,11,93,145,193,201,131,190,94,105,65,152,26,121,239,73,102,251,242,201,69,95,140,136,92],[37,80,151,167,34,201,170,30,54,202,113,69,34,28,151,204,116,171,165,249,215,186,153,81,113,46,243,213,168,23,250,33]], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([213],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[3],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(9,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("q6nule",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("9dxfn7", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("v4qlkg", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("L", "n3j0zi",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("q6nule", "IsLibrary", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("n3j0zi", "Oraclize query was sent, standing by for the answer...", "bd9hum", "listingID arg",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("9dxfn7", "p6d0k9", "IsLibrary", "Example", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("p6d0k9",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("9dxfn7", 21,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("costUSD", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("listingID arg",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("IsLibrary", 63,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("nombqa", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(5,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["n3j0zi","updateEthPrice called","v4qlkg","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[147,216,110,146,116,70,60,29,16,200,96,64,72,63,223,152,147,51,58,241,226,8,164,115,91,251,215,152,15,64,99,25],[149,108,137,32,218,164,90,42,113,235,235,65,150,46,188,178,216,7,145,69,247,50,219,230,252,4,88,89,176,162,129,54],[75,237,121,104,50,93,191,76,239,213,52,244,14,7,5,237,209,226,236,178,164,235,2,49,86,91,89,56,74,1,20,189],[154,13,88,183,42,102,225,142,171,216,156,172,120,191,240,53,217,228,136,93,209,150,150,48,103,254,236,210,249,119,97,204],[43,137,130,20,23,25,19,91,50,1,235,13,244,151,145,60,246,43,22,246,231,226,198,44,200,51,62,134,211,80,161,71],[193,254,207,245,95,165,146,5,44,26,60,207,193,255,241,49,20,69,70,164,205,26,70,18,29,20,242,158,161,233,98,63],[174,198,63,199,104,200,153,75,72,228,88,38,40,250,166,199,183,168,101,60,61,252,74,122,35,188,161,153,173,90,209,254],[67,7,77,86,162,44,220,215,110,193,253,4,159,61,54,176,201,206,83,64,225,220,25,238,37,78,250,232,66,67,202,98],[223,40,106,130,240,176,36,168,39,29,42,233,66,86,238,236,155,54,28,183,39,23,53,54,4,108,92,224,113,238,254,15],[209,36,182,189,150,97,6,22,47,67,137,221,55,179,58,23,78,31,111,224,38,93,157,166,151,85,114,218,73,254,113,98]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(2, 1338, 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([176,36,189,157,83,165,185,123,77,166,168,243,44,179,108,146,86,93,85,14,96,14,236,51,232,241,92,96,133,18,168,51], [3,188,184,131,235,201,47,240,235,44,216,78,181,170,218,31,210,66,6,100,36,177,117,246,252,204,68,66,55,207,16,35],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([132,70,118,193,176,84,8,232,100,246,59,147,160,33,156,81,56,169,74,130,216,238,216,212,227,248,74,204,227,96,237,7], [93,235,86,27,19,186,79,6,31,164,18,136,160,118,125,182,149,88,217,197,46,253,26,143,65,108,52,15,125,82,143,207], [110,86,20,206,153,0,253,22,27,219,29,74,241,1,243,215,57,50,91,50,150,228,11,217,221,253,224,83,20,234,157,232],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([71,121,100,12,120,18,249,242,57,33,160,18,48,79,116,35,181,137,188,232,233,194,186,61,8,37,86,120,247,107,162,163], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([152,49,89,13,102,144,136,238,146,239,26,166,73,139,172,17,83,184,157,113,130,124,194,13,250,217,145,11,176,197,168,146], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([18,43,172,115,214,42,69,99,228,31,210,233,122,197,4,149,242,74,213,151,222,17,181,63,9,215,190,95,233,201,144,93], "ETH", [186,252,226,0,128,105,37,174,8,252,165,183,49,39,141,67,11,111,136,222,162,122,231,120,15,89,242,19,111,55,100,111],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([143,120,223,205,150,94,105,199,179,119,251,68,34,175,23,249,96,158,182,93,225,158,16,80,43,127,193,79,169,228,29,156], "djaf1o", [26,23,47,186,164,127,84,92,200,206,47,248,237,36,150,30,48,65,183,230,79,10,225,59,129,124,163,143,124,244,227,103],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([65,233,85,107,10,9,207,229,91,215,170,159,55,71,42,59,43,147,9,124,193,209,81,183,187,195,220,20,131,62,30,197], [164,226,111,122,123,175,129,64,199,10,49,64,69,196,224,221,65,122,16,254,5,24,113,145,180,228,17,41,172,66,143,205], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([65,233,85,107,10,9,207,229,91,215,170,159,55,71,42,59,43,147,9,124,193,209,81,183,187,195,220,20,131,62,30,197], [53,198,198,135,123,208,140,105,38,85,86,106,175,141,118,168,87,75,166,241,166,0,177,199,191,16,4,109,54,166,49,237,99], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([8,250,69,118,103,60,4,42,185,211,72,81,46,219,229,159,182,42,141,77,149,4,244,55,11,169,172,180,58,207,236,163], [34,36,43,236,18,206,153,12,163,191,147,30,78,56,30,61,202,159,156,202,26,166,209,167,80,75,8,130,81,82,181,59], [57,180,251,52,100,88,207,70,45,59,13,144,27,186,167,143,166,208,60,116,66,255,41,191,103,83,59,218,248,207,195,47], "p6d0k9",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([183,144,124,168,88,76,224,155,208,193,182,100,247,97,126,54,188,53,42,201,234,226,138,82,229,12,154,75,105,241,45,75], [211,190,148,169,42,196,41,173,129,126,56,158,126,180,82,85,39,62,166,250,66,88,200,54,245,13,82,249,238,226,37,16], [242,190,211,188,175,99,129,41,222,249,10,172,237,77,224,88,46,53,224,121,96,16,119,170,35,8,195,229,171,154,241,19], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([128,156,106,254,56,70,19,122,170,103,10,65,17,226,32,13,21,242,10,108,234,44,38,143,199,221,165,149,100,65,165,191], [162,198,73,105,112,48,236,155,118,167,19,10,118,69,206,215,174,244,94,227,122,23,23,90,35,202,119,56,197,171,143,184], [36,158,238,12,179,178,155,182,210,223,170,184,212,47,134,90,16,49,85,72,171,127,38,69,158,212,84,206,252,166,107,78], "szimc",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([242,129,137,113,234,65,89,123,246,92,147,6,148,125,134,93,66,213,78,168,46,154,197,46,76,139,121,44,105,118,121,15], [75,242,179,183,19,2,11,123,190,236,163,249,118,105,28,114,87,96,217,155,171,247,249,177,34,239,135,86,84,184,218,248], [211,47,56,136,176,126,33,92,255,238,14,186,241,1,22,0,235,247,230,27,206,46,97,144,126,200,200,153,79,171,15,146], "9dxfn7",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([152,154,145,175,54,109,16,108,242,215,141,128,71,251,130,53,27,38,183,240,153,67,211,221,242,92,35,121,193,183,85,244], [179,224,232,71,163,77,19,77,40,125,102,193,184,142,223,118,34,127,224,85,99,25,134,87,25,136,80,101,199,12,86,214], [89,238,137,119,162,163,19,87,186,4,30,233,222,248,112,198,170,92,113,236,247,96,67,192,122,47,187,234,14,24,181,243], "nombqa",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([62,58,92,29,116,210,64,96,50,131,251,170,234,94,136,20,144,21,31,106,136,199,72,196,152,215,35,84,136,98,137,126], [194,227,18,148,45,227,110,48,240,201,220,232,250,204,56,241,231,118,44,67,88,228,119,129,30,95,65,225,239,62,12,156], [140,99,52,124,157,132,135,168,164,77,7,95,32,194,118,10,187,140,32,152,125,111,18,194,143,115,203,143,64,140,38,140], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([69,32,163,23,54,190,0,201,86,253,178,213,40,203,65,242,103,91,52,6,231,36,138,14,71,122,140,113,160,131,140,13], [105,245,192,245,30,34,211,86,130,124,42,151,210,231,199,10,98,51,39,139,154,145,130,247,242,159,162,230,43,247,18,78], [58,230,151,118,6,142,182,41,53,197,182,114,49,93,215,68,161,17,175,51,7,206,236,253,209,144,13,156,158,202,228,177], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([61,137,133,3,209,45,120,11,44,202,185,49,216,212,48,17,112,244,227,23,92,63,215,7,239,113,69,87,176,12,204,22], [201,228,95,113,207,169,58,211,219,247,254,236,116,224,161,115,30,21,59,249,78,186,157,129,142,101,144,176,113,26,50,171], [212,116,47,137,213,212,180,145,218,235,212,180,249,114,105,116,185,32,21,145,210,67,49,4,226,159,255,247,39,167,202,163], "djaf1o",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([42,170,192,203,22,116,57,180,44,249,214,218,165,15,93,132,142,206,57,99,102,141,167,151,191,14,158,92,85,158,57,90], 20, 11, [8,171,64,245,228,245,251,11,255,104,199,199,27,79,179,172,80,241,249,105,165,213,27,84,30,106,136,108,206,28,10,194], 255,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([111,35,20,108,126,102,156,80,241,101,124,236,104,244,76,104,140,142,10,244,165,239,224,199,201,87,110,235,167,59,175,135], 30, [73,156,90,95,142,200,154,103,185,80,165,149,57,45,63,10,135,240,106,16,250,167,37,170,25,214,121,169,21,193,173,214], [158,243,162,64,136,75,158,225,9,164,163,57,195,61,126,242,122,87,141,50,91,94,180,120,49,217,167,58,244,165,180,145],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([66,49,85,98,47,86,89,209,88,27,81,151,79,157,167,86,113,204,236,232,227,152,213,241,18,231,201,59,161,149,8,239], [202,133,62,237,166,100,97,195,183,204,48,237,176,175,60,212,174,124,55,26,111,19,105,250,101,169,54,223,143,255,133,148,51,177,114,134,81,68,232,64,15,108,108,65,50,182,152,17,233,172,54,157,174,179,69,116,153,240,128,67,241,114,68,216,101,228,17,236,5,230,33,193,128,38,122,152,32,189,206,237,195,49,40,200,46,193,128,251,75,103,88,75,37,178,243,211],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([117,174,68,69,6,47,5,133,203,223,116,77,163,16,9,101,51,247,245,9,162,69,52,58,80,75,38,227,106,226,206,135], [68,134,166,183,175,77,126,112,70,218,214,232,103,97,74,171,69,208,254,218,75,136,234,192,193,62,71,176,141,233,94,170,47,149,254,123,251,90,151,217,171,248,202,46,207,27,20,20,186,220,122,67,228,38,170,228,182,126,48,125,118,59,41,65,80],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
