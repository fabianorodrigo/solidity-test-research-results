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
    contractShartCoin = await ShartCoin.new({from:accounts[4]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[4]}');
    contractState = await State.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[0],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[2],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[3],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"listingID arg",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"listingID arg",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(23,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("0",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("RevertWithReason", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("P", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(10000, "listingID arg", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(71, "call updateEthPrice", "UsesExample", 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("call updateEthPrice", "IsLibrary", 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("trade.totalPrice", "ETH", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(30, "updateEthPrice called", "updateEthPrice called", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(9999, "", "IsLibrary", "UsesExample", 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("PayableExample", "trade.totalPrice", "trade.totalPrice", 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("ETH", ["listingID arg","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(255, "updateEthPrice called", ["L","UsesExample","\x19Ethereum Signed Message:\n32","fxtyud","RevertWithReason","\x19Ethereum Signed Message:\n32","updateEthPrice called","listingID arg","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(199999, "updateEthPrice called", ["ETH","costUSD","0","IsLibrary","lstjquo","P"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("trade.totalPrice", ["P"], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("PayableExample", ["Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(24, "UsesExample", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(59, "", ["fxtyud"], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("Oraclize query was sent, standing by for the answer...", ["IsLibrary"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("costUSD", ["updateEthPrice called","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(0, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["L","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(17, "call updateEthPrice", ["","trade.totalPrice"], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Example", ["trade.totalPrice","IsLibrary"], 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("L", ["costUSD","0","fxtyud"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(15, "L", ["L","call updateEthPrice","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(47, "UsesExample", ["ETH","L","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("call updateEthPrice", ["call updateEthPrice","costUSD","lstjquo"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("lstjquo", ["P","UsesExample","RevertWithReason","lstjquo"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(1024, "fxtyud", ["ETH","ETH","Oraclize query was sent, standing by for the answer...","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(88, "sv8hwr", ["","","lstjquo","sv8hwr"], 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("listingID arg", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","UsesExample","updateEthPrice called","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("PayableExample", ["0","ETH","vpf1ol","fxtyud","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(128, "vpf1ol", ["costUSD","","Example","sv8hwr","lstjquo"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(255, "Oraclize query was sent, standing by for the answer...", ["listingID arg","ETH","pxq1yp","sv8hwr","lstjquo"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("fxtyud", ["costUSD","fxtyud","L","Oraclize query was sent, standing by for the answer...","IsLibrary"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("listingID arg", [[2,198,100,165,74,49,47,121,76,91,24,151,247,46,77,237,225,58,249,173,94,241,216,60,188,50,165,53,2,135,220,99],[174,172,50,118,151,193,241,113,83,169,56,207,94,218,251,231,86,58,173,192,6,188,81,78,6,78,176,214,185,236,239,162],[64,46,58,114,176,9,85,218,58,173,64,138,195,207,159,140,114,79,249,238,135,111,34,197,154,18,154,114,239,107,115,36],[50,178,26,36,40,250,35,188,130,240,158,38,192,104,49,93,33,139,254,66,47,64,36,203,188,44,203,119,206,251,119,86],[104,223,146,217,131,189,250,125,81,96,187,246,8,13,128,173,63,207,92,232,166,40,61,146,153,82,70,97,59,107,243,118],[119,108,127,45,34,40,125,87,180,203,248,87,227,112,98,247,102,14,220,214,76,190,188,37,255,243,163,31,12,188,49,219],[202,21,123,69,250,64,238,175,8,145,217,117,69,92,223,170,11,112,168,106,164,73,31,231,119,169,147,35,5,254,15,240]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(86, "Oraclize query was sent, standing by for the answer...", [[35,192,138,189,31,183,197,175,143,82,241,57,168,249,104,80,246,214,212,133,83,163,177,121,154,185,14,7,61,29,151,252],[86,69,14,250,219,191,126,162,236,144,184,88,72,162,95,240,120,182,203,215,104,74,80,208,18,178,28,89,253,38,18,254],[102,232,225,49,56,147,194,73,203,246,214,103,228,231,62,169,87,9,107,121,247,112,225,86,191,0,6,36,49,181,212,80],[77,80,127,147,249,215,210,105,246,247,101,28,247,212,66,22,104,117,255,144,228,109,133,193,133,83,183,255,45,151,131,216],[140,110,202,138,152,89,122,14,94,84,214,35,245,31,180,73,114,72,169,216,186,201,252,247,150,177,6,88,181,111,123,30],[83,86,236,20,1,105,210,203,25,217,147,115,47,205,91,27,82,47,207,164,77,91,195,63,238,96,201,78,208,119,143,186],[202,194,180,205,243,158,107,118,44,11,194,79,13,199,99,194,61,19,152,12,182,69,152,254,208,48,106,148,110,51,157,111]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(1, "Oraclize query was sent, standing by for the answer...", [[118,34,236,51,46,253,242,46,189,124,139,39,82,10,215,82,156,235,231,27,22,203,75,98,80,50,114,133,91,49,196,43],[60,55,110,245,210,140,23,157,6,53,226,229,210,223,228,33,133,30,79,167,183,100,199,246,194,49,33,12,152,154,120,245],[137,59,22,41,224,104,155,185,244,92,51,174,9,48,41,72,212,30,20,181,130,159,110,52,151,168,4,131,58,196,247,169],[16,194,206,104,116,90,183,187,208,164,104,230,44,222,81,2,153,233,61,158,101,226,42,232,104,51,63,19,7,199,2,216],[207,212,153,15,45,96,60,15,13,120,236,158,59,81,193,17,169,246,231,122,52,195,66,188,193,161,231,233,201,196,43,58],[195,184,73,112,39,39,167,103,113,207,209,49,136,151,80,224,183,153,94,155,172,77,204,34,207,115,126,112,30,40,192,109],[92,244,135,54,116,125,154,9,133,127,143,237,87,235,137,43,195,164,54,181,118,159,145,63,14,194,186,161,176,139,158,131]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("\x19Ethereum Signed Message:\n32", [[100,86,86,6,172,252,37,163,175,157,231,186,168,33,165,14,103,135,135,18,14,235,116,212,133,6,33,96,80,158,226,8],[192,81,231,149,227,102,47,67,156,73,2,9,79,123,23,217,33,202,112,100,3,64,40,169,104,237,87,109,239,157,56,25],[145,206,0,173,29,180,242,225,60,161,80,49,19,248,153,8,91,110,102,69,209,164,99,6,81,163,15,232,82,171,88,102],[54,245,199,19,165,113,114,250,57,216,89,181,38,75,243,41,147,0,211,130,224,146,35,41,107,204,243,36,80,160,9,255],[239,57,81,239,238,203,251,82,81,144,189,181,24,61,135,35,254,235,73,233,133,6,180,170,105,149,108,183,4,115,188,169],[41,254,168,162,224,58,236,115,101,74,105,211,71,131,140,63,168,178,159,98,190,100,151,222,25,159,54,122,111,10,141,223],[39,164,24,35,93,187,86,105,52,143,7,210,193,214,130,244,242,93,68,63,135,219,236,208,226,157,134,202,41,91,6,234],[195,188,137,33,138,78,16,118,232,71,96,113,190,127,248,5,190,67,142,185,82,202,42,119,18,83,69,66,188,199,25,12]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("\x19Ethereum Signed Message:\n32", [[3,21,233,166,96,92,39,32,116,111,238,200,103,104,140,151,239,55,207,16,188,222,177,46,95,155,147,200,11,183,174,124]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(3, "UsesExample", [[37,188,110,91,160,98,27,74,132,69,70,125,116,191,66,171,87,251,223,73,171,153,20,170,217,43,137,83,142,166,51,228]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(128, "trade.totalPrice", [[228,47,146,84,40,156,85,2,36,20,200,192,255,107,106,207,94,63,88,78,131,213,92,59,15,158,25,104,19,111,42,93]], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("costUSD", [[148,249,252,208,160,153,17,71,175,239,61,169,147,131,28,241,188,37,64,64,175,125,114,13,153,148,184,130,37,112,111,244]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("updateEthPrice called", [[215,25,115,175,101,225,136,250,39,72,240,27,233,88,34,43,204,90,40,102,55,219,159,171,144,35,26,163,64,233,85,40],[137,226,88,19,100,228,88,123,17,207,141,185,155,231,125,180,87,225,244,70,250,28,73,165,55,144,104,71,171,236,195,85]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(8, "listingID arg", [[219,225,240,133,65,184,26,149,127,102,179,195,37,118,205,242,108,201,110,171,121,223,85,93,96,116,41,162,98,63,68,205],[99,196,35,189,166,240,161,252,22,10,60,0,80,154,110,173,121,146,119,56,159,103,55,179,45,174,235,88,213,120,9,8]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(47, "", [[31,198,198,224,187,160,130,70,96,48,249,217,133,237,88,254,25,155,113,205,175,25,87,217,153,233,214,145,90,129,86,106],[223,5,188,127,81,148,191,220,3,95,185,110,158,184,120,0,138,174,52,95,31,54,54,182,79,116,33,200,53,136,136,33]], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("UsesExample", [[72,57,144,202,50,3,255,177,94,69,210,193,99,112,123,221,30,161,159,111,11,147,229,34,123,200,34,247,236,231,188,244],[85,180,5,59,21,12,37,108,179,191,60,157,167,13,108,95,146,78,235,75,182,18,123,80,51,183,58,94,167,143,87,189]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("\x19Ethereum Signed Message:\n32", [[75,86,209,129,109,54,249,121,154,5,157,151,204,43,110,193,104,132,4,131,172,231,36,223,61,158,131,89,186,234,73,152],[23,10,45,41,234,88,4,56,3,45,237,27,163,237,234,33,74,222,199,29,212,248,40,251,232,163,39,133,49,125,226,2],[148,37,118,143,87,226,82,163,175,210,239,39,49,149,81,170,234,45,43,65,77,239,9,234,240,233,126,99,100,251,15,133]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(71, "ETH", [[195,90,14,166,88,33,255,86,52,32,88,56,34,167,120,117,249,133,4,103,131,15,241,250,136,169,101,197,187,75,55,232],[129,93,67,166,220,124,127,99,218,237,241,242,4,202,9,29,50,100,25,31,92,253,183,238,208,234,81,199,157,99,158,221],[65,49,168,20,133,71,147,171,66,186,148,193,114,216,123,44,159,37,130,21,0,0,20,252,67,120,163,44,83,83,63,38]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(102, "RevertWithReason", [[98,209,4,170,115,77,206,80,86,138,191,82,34,235,43,177,107,116,43,144,85,122,96,243,209,115,154,223,17,246,175,133],[210,235,62,238,191,67,208,181,21,117,78,212,230,230,59,191,154,173,144,91,9,72,202,29,226,76,221,233,200,66,123,161],[157,120,195,237,18,212,10,141,145,255,140,67,239,255,245,116,24,13,94,253,240,70,198,134,181,17,38,193,122,204,218,32]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("0", [[71,199,56,130,159,30,246,25,84,26,28,88,36,157,176,175,105,149,233,124,85,241,3,79,133,57,176,22,84,174,222,65],[198,172,170,131,97,128,213,111,181,20,48,117,34,62,14,23,179,110,134,102,46,3,17,35,68,220,237,18,249,166,43,112],[181,111,23,19,128,240,166,102,33,133,97,252,86,221,6,250,43,202,62,23,254,159,138,131,197,139,67,141,86,121,82,222]], 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("fxtyud", [[218,168,132,158,96,138,240,30,78,204,223,148,249,86,38,104,49,31,174,146,38,228,120,39,90,212,82,78,63,213,73,76],[74,7,236,175,245,153,173,154,161,9,228,249,19,247,105,153,193,0,95,147,111,191,174,22,228,214,62,126,152,80,247,13],[48,159,61,67,17,209,171,184,120,107,217,110,67,99,225,201,130,153,145,18,33,176,188,22,235,156,65,83,141,205,172,26],[176,200,124,239,51,126,25,180,50,162,228,17,1,214,243,144,230,14,91,225,194,142,60,37,76,25,147,87,0,73,87,165]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(257, "lstjquo", [[67,195,80,62,21,230,111,232,19,34,109,141,133,171,36,133,13,166,68,195,44,14,91,172,110,213,99,89,244,159,222,210],[85,128,64,34,67,29,0,78,178,137,74,77,117,207,192,200,37,217,69,12,186,160,35,0,229,113,211,103,71,123,201,221],[36,93,36,24,1,39,201,193,171,96,118,188,44,219,40,112,0,100,173,60,96,138,167,79,223,78,78,100,209,194,9,9],[156,209,13,143,33,70,203,110,90,133,110,120,121,166,202,42,114,107,141,143,238,252,158,90,195,233,222,113,143,190,167,96]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(10000, "updateEthPrice called", [[60,215,198,35,40,161,59,11,212,203,118,159,226,123,95,222,2,41,158,111,108,210,130,99,4,135,7,65,255,83,154,145],[198,45,150,249,137,22,18,64,61,56,248,168,82,119,55,17,175,227,230,245,202,75,94,168,190,18,47,231,95,231,121,227],[25,39,36,185,73,253,145,88,229,34,181,163,218,228,161,241,3,123,1,105,163,24,178,35,47,100,211,217,67,98,134,171],[94,128,212,56,135,23,21,58,217,214,149,4,46,151,113,135,57,233,49,46,11,118,194,90,13,16,158,104,248,92,244,168]], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[106,102,114,224,12,54,116,163,98,130,178,133,173,194,238,223,41,53,230,146,47,203,44,156,30,5,93,161,128,60,106,164],[58,62,90,125,152,46,3,83,53,218,115,235,193,159,19,75,0,167,237,228,84,187,208,255,127,215,76,235,69,146,51,235],[46,25,73,179,78,204,142,6,184,37,85,120,189,235,159,59,58,116,143,232,212,246,243,31,210,83,243,194,57,166,254,246],[253,236,218,46,234,37,63,169,112,127,124,178,250,100,83,230,118,252,178,208,18,189,210,13,75,247,243,7,109,173,141,161]], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ETH", [[231,185,20,233,226,199,174,7,250,78,222,160,12,121,160,121,165,64,250,35,164,6,6,143,2,213,210,103,177,175,173,28],[229,88,154,5,70,155,209,0,165,100,60,110,45,245,51,179,160,234,93,76,63,121,204,128,167,155,52,211,196,98,111,18],[61,182,81,8,98,35,68,32,178,209,189,206,143,243,32,218,212,222,109,199,172,33,148,158,197,37,242,228,5,74,206,228],[94,25,181,145,210,140,125,157,65,195,89,232,24,55,45,113,187,13,80,245,200,204,75,189,36,54,16,88,176,194,47,211],[67,226,46,7,152,179,175,246,22,150,87,224,8,83,164,34,190,236,223,253,250,157,159,58,53,105,108,96,178,69,169,139]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(18, "ETH", [[131,143,16,187,242,69,72,145,14,178,160,196,143,126,131,69,117,125,175,79,160,105,42,152,20,195,220,243,34,28,238,61],[192,163,31,22,81,209,86,226,209,165,227,89,142,174,38,73,131,31,2,58,86,117,8,244,216,63,226,198,177,94,66,225],[246,123,71,71,140,49,145,93,242,188,26,253,232,206,5,41,181,213,163,60,144,142,74,138,178,83,117,225,222,246,59,19],[227,87,48,232,250,224,122,68,203,187,29,80,215,138,242,131,19,23,178,134,46,107,84,145,143,222,167,63,216,120,254,114],[15,204,239,6,189,214,51,19,205,76,234,172,161,132,140,22,103,114,36,162,227,60,251,150,221,69,156,135,23,73,119,118]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(45, "listingID arg", [[30,227,175,226,112,96,10,213,109,225,159,83,214,18,149,105,120,24,82,104,203,63,69,30,211,171,179,118,128,45,44,237],[22,142,237,118,192,140,237,8,218,56,204,157,145,67,29,235,19,238,211,173,117,7,42,10,100,151,176,233,97,230,194,227],[51,152,151,47,183,235,7,44,58,21,119,255,225,31,245,62,103,87,64,93,212,110,194,159,200,27,190,77,126,155,169,44],[71,136,215,198,96,120,53,189,246,21,225,106,0,224,255,11,6,15,245,190,214,239,146,65,42,53,8,58,208,255,127,85],[14,118,92,124,211,105,43,247,26,163,30,169,176,130,51,147,3,132,249,58,28,242,101,69,99,161,108,55,186,162,144,208]], 1532892062,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("Oraclize query was sent, standing by for the answer...", [[148,241,236,162,75,189,95,30,81,147,152,217,168,128,228,162,92,19,138,214,147,107,234,111,143,119,230,228,197,245,196,199],[254,219,48,159,198,39,44,129,77,175,84,201,33,135,122,166,155,161,226,236,11,208,211,222,184,12,246,167,160,215,59,27],[72,147,194,232,251,107,50,197,196,78,204,117,23,77,144,68,109,237,124,53,39,240,239,163,75,186,116,79,50,245,219,165],[8,83,183,54,39,153,97,86,163,224,32,149,67,18,15,173,182,226,51,82,73,96,113,6,181,135,29,255,178,98,80,71],[248,115,237,220,165,219,203,252,10,0,70,252,176,22,10,98,198,68,204,113,65,219,226,22,230,198,136,176,12,107,71,130]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([118],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[5],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(4,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("fxtyud", "listingID arg",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("ETH", "pxq1yp",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("call updateEthPrice", "0", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("PayableExample", "sv8hwr", "vpf1ol", "wne4oi",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("listingID arg", "costUSD", "vpf1ol", "costUSD", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("nk3dsn", 103,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("lstjquo", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("vpf1ol", 200000,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("sv8hwr", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(200000,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["vpf1ol"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[151,47,172,19,50,16,2,25,238,20,186,198,221,73,239,177,128,8,91,61,48,170,11,35,73,182,201,252,30,209,54,20],[224,78,36,148,242,24,167,242,74,181,51,219,231,67,9,126,98,209,228,121,181,0,53,224,118,30,228,252,252,237,166,66],[57,123,217,99,234,153,246,184,176,88,76,192,35,6,248,144,1,90,77,184,51,245,231,39,40,221,81,184,6,8,78,1],[138,7,57,2,247,86,186,125,250,41,103,212,160,106,133,220,25,105,223,118,212,30,214,21,66,150,18,66,192,174,39,243],[247,191,120,27,17,181,1,86,92,28,169,44,180,143,80,239,169,208,115,122,120,99,119,191,11,112,234,90,227,213,13,27],[113,80,255,241,178,248,160,239,249,85,86,178,48,154,173,15,221,18,13,161,237,243,50,75,181,216,174,13,187,238,140,56]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(10, 8, 54,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([50,230,16,173,51,93,214,136,148,104,151,211,169,62,227,244,6,87,4,115,252,183,231,145,130,229,0,237,240,198,209,54], [236,54,116,127,64,118,174,253,219,181,123,39,160,174,98,41,211,127,240,17,174,165,253,107,178,114,47,67,29,213,177,48],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([5,97,131,94,148,76,203,242,214,141,57,33,182,171,101,179,181,8,63,199,245,140,99,143,27,238,189,193,115,80,207,88], [189,203,126,204,160,151,194,173,166,223,173,169,25,18,237,68,100,147,174,55,39,202,99,100,85,219,105,60,64,224,204,220], [233,159,135,213,52,30,143,75,63,165,132,192,133,120,81,207,175,3,233,32,201,254,63,113,181,94,238,199,117,107,28,154],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([215,169,103,5,160,38,203,182,222,160,75,179,73,173,20,174,124,219,229,16,190,156,171,5,57,196,253,155,212,155,169,203], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([51,70,253,39,198,79,145,114,2,68,231,1,81,8,233,223,63,33,173,207,210,72,95,178,72,150,127,228,64,244,202,133], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([207,118,52,103,69,138,53,144,227,77,135,32,241,91,40,170,128,220,0,138,175,79,93,29,174,50,159,163,146,58,226,141], "lstjquo", [104,120,92,150,170,228,208,235,215,37,42,155,87,61,84,203,35,213,250,119,43,255,244,60,136,18,228,191,254,83,16,175],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([85,162,28,45,112,202,184,20,236,95,73,11,130,155,115,177,227,196,27,35,68,162,81,142,127,223,97,55,136,185,55,142], "listingID arg", [133,44,139,241,142,45,122,46,166,52,199,38,69,100,52,183,178,218,188,185,91,62,124,114,80,221,70,243,13,121,152,95],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([35,124,225,202,191,4,47,8,98,247,35,169,104,154,79,247,89,146,27,193,98,250,166,32,43,85,134,102,180,241,207,52], [143,125,213,143,179,173,60,163,77,30,162,144,142,42,46,179,110,118,222,234,108,242,163,184,205,50,151,121,86,205,195,159], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([35,124,225,202,191,4,47,8,98,247,35,169,104,154,79,247,89,146,27,193,98,250,166,32,43,85,134,102,180,241,207,52], [14,65,39,237,239,121,125,15,110,126,45,229,245,147,206,110,166,133,218,130,90,111,183,157,92,253,237,206,104,167,113,183,125], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([161,183,202,85,244,218,98,104,43,2,70,249,58,50,221,109,144,75,2,152,76,37,62,81,23,129,208,131,86,47,19,245], [122,198,16,45,130,42,90,234,162,104,99,161,55,212,242,213,151,242,72,180,194,214,51,171,53,72,213,153,131,229,219,25], [157,242,108,29,146,207,217,117,5,78,145,217,254,135,12,250,127,127,191,55,35,90,157,133,87,122,90,162,90,71,85,90], "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([7,230,133,51,141,35,67,107,18,3,163,47,30,92,69,237,18,20,80,207,70,149,18,114,69,9,137,176,36,14,54,49], [232,70,31,167,74,178,122,229,173,253,234,115,134,160,104,94,190,109,169,19,216,91,27,175,229,90,157,252,37,67,104,197], [158,220,116,28,131,212,253,69,139,91,147,199,78,235,137,38,9,52,109,170,222,24,195,88,192,48,167,25,138,191,220,17], "g4xkx",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([18,128,96,96,188,38,128,131,61,220,92,132,54,255,77,194,124,10,42,2,0,24,254,98,56,70,172,187,90,55,103,111], [189,176,146,181,205,211,210,86,150,42,59,116,44,152,91,131,3,38,220,242,217,39,249,58,43,210,185,73,120,163,234,89], [43,64,243,101,214,36,32,235,144,157,96,80,63,7,6,7,64,184,243,209,170,6,63,121,103,7,152,183,191,187,153,83], "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([156,33,228,139,74,130,102,196,71,234,178,139,120,166,134,20,31,210,247,217,98,120,157,131,255,179,141,130,125,65,90,243], [13,168,190,212,85,70,167,12,211,69,4,77,12,72,221,40,68,127,212,94,217,78,135,146,27,214,16,252,246,11,76,218], [101,9,143,184,220,58,111,140,255,187,0,150,174,206,61,68,149,51,100,140,233,195,89,182,138,103,200,97,18,148,147,224], "nk3dsn",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([194,170,188,30,127,86,149,77,61,108,245,30,188,90,212,145,221,89,113,23,36,248,251,172,31,10,142,62,78,214,188,250], [55,89,139,30,1,54,18,215,238,154,37,86,228,58,236,181,0,81,188,249,223,212,141,75,224,17,7,82,106,235,222,180], [199,100,146,122,245,128,200,210,219,229,122,99,47,184,252,33,11,75,68,15,115,34,227,215,96,250,156,150,165,233,85,207], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([183,245,96,147,166,131,84,233,2,214,166,4,88,134,178,154,2,239,59,84,46,186,214,175,160,188,224,228,81,74,51,81], [82,182,149,154,245,31,106,136,54,183,17,221,138,0,138,72,191,247,135,201,133,201,193,91,218,245,50,234,108,85,252,93], [202,170,25,80,43,227,14,20,21,189,81,29,248,170,55,86,94,233,201,122,169,223,128,64,44,107,88,209,182,42,176,57], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([215,91,89,110,87,217,195,58,213,57,112,126,180,172,24,183,159,74,75,151,50,48,243,206,163,126,35,76,62,22,65,97], [229,133,84,177,242,130,177,132,33,65,136,56,94,148,196,176,220,148,36,223,152,95,81,215,69,42,76,84,110,169,230,35], [40,5,86,178,215,193,89,140,223,218,251,229,234,56,175,158,41,21,207,93,190,65,63,190,153,209,160,15,95,24,231,126], "sv8hwr",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([149,90,68,28,8,154,120,103,86,89,216,196,57,211,69,92,41,87,112,237,50,154,125,67,170,176,110,226,238,1,159,12], [167,37,192,71,238,19,89,198,74,126,47,195,87,55,7,196,168,175,108,177,46,238,247,201,219,6,30,227,237,160,60,150], [111,190,194,242,173,17,111,197,84,135,127,136,11,172,186,232,26,143,20,24,194,21,24,245,238,197,189,113,234,226,39,44], "pxq1yp",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([90,99,94,236,193,68,103,171,227,0,43,71,155,1,52,139,71,240,187,189,136,46,23,26,77,208,232,94,37,54,174,77], 31, 54, [31,43,105,38,105,46,116,223,118,44,138,154,10,211,71,80,150,201,56,179,213,21,6,156,102,148,122,253,15,249,250,178], 31,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([81,92,47,39,195,31,67,158,40,100,115,11,203,52,84,112,55,197,127,6,197,205,73,35,21,192,196,145,2,146,215,147], 26, [2,17,63,23,11,78,143,62,0,8,157,139,88,17,83,84,57,132,49,119,66,131,12,39,109,173,207,65,166,71,108,104], [247,75,164,98,207,238,64,154,151,57,150,132,53,133,0,180,191,130,159,124,25,125,165,25,255,143,136,210,205,190,112,213],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([56,63,42,175,235,223,214,64,113,35,128,170,61,176,133,232,202,41,123,153,183,149,51,126,167,155,170,130,243,181,108,215], [206,3,209,208,195,189],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([160,121,234,215,207,147,188,205,67,65,218,96,42,189,172,210,99,7,181,172,95,177,185,112,15,95,104,25,222,118,49,57], [77,142,104,6,164,21,184,141,79,245,196,80,148,103,90,201,123,169,217,239,18,224,252,32,129,147,168,119,60,217,180,79,70,9,228,181,100,98,189,198,233,108,196,62,253,18,154,9,26,75,21,195,238,169,14,191,100,178,231,217,15,193,216,199,96],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
