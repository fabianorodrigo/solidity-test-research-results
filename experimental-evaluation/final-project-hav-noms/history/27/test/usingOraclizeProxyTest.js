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
    contractTokenExchangeState = await TokenExchangeState.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[6],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[2],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(31,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("P",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("ETH", 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("updateEthPrice called", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(63, "IsLibrary", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(28, "PayableExample", "IsLibrary", 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("costUSD", "PayableExample", 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("ETH", "L", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(65, "", "7q8o7y", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(1, "updateEthPrice called", "updateEthPrice called", "costUSD", 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("PayableExample", "Example", "fsufza", 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("IsLibrary", ["P","2jrz8t","updateEthPrice called","0","L","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(95, "7q8o7y", ["Example","RevertWithReason","P","RevertWithReason","Example","fsufza","0","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(66, "costUSD", ["RevertWithReason","call updateEthPrice","L","2jrz8t","listingID arg","trade.totalPrice","listingID arg"], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("0", ["0","7q8o7y","Example"], 7,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("L", ["Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(200000, "PayableExample", ["Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(1338, "6eofq", ["PayableExample"], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("P", ["UsesExample"], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("trade.totalPrice", ["updateEthPrice called","oydon"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(200000, "ETH", ["2jrz8t","6eofq"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(1532892062, "0", ["Oraclize query was sent, standing by for the answer...","L"], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("\x19Ethereum Signed Message:\n32", ["trade.totalPrice","UsesExample"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("Oraclize query was sent, standing by for the answer...", ["0","2jrz8t","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(46, "\x19Ethereum Signed Message:\n32", ["enhwar","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1023, "call updateEthPrice", ["updateEthPrice called","IsLibrary","costUSD"], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("L", ["Oraclize query was sent, standing by for the answer...","","Oraclize query was sent, standing by for the answer..."], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("P", ["P","0","Example","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(1336, "UsesExample", ["call updateEthPrice","costUSD","PayableExample","Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(15, "", ["0","\x19Ethereum Signed Message:\n32","ETH","6eofq"], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("RevertWithReason", ["oydon","L","UsesExample","updateEthPrice called"], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("Example", ["RevertWithReason","enhwar","6eofq","wn7noh","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(128, "enhwar", ["6eofq","RevertWithReason","ETH","P","7q8o7y"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(69, "Oraclize query was sent, standing by for the answer...", ["IsLibrary","","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","L","ETH"], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("Oraclize query was sent, standing by for the answer...", ["PayableExample","Example","P","\x19Ethereum Signed Message:\n32","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("L", [[210,20,27,15,183,13,70,188,21,28,136,106,65,147,132,195,24,110,99,189,207,156,250,70,145,32,206,19,163,106,246,174],[43,0,87,159,68,92,235,154,178,160,153,86,147,35,155,25,132,93,22,192,218,201,206,18,125,167,254,186,205,63,101,56],[254,61,40,181,213,251,13,78,235,187,231,6,224,29,102,73,155,216,69,23,201,251,4,34,175,114,25,25,173,147,70,124],[245,247,141,110,196,206,42,217,85,216,92,224,89,132,40,51,58,250,251,190,190,53,2,51,41,146,133,52,187,214,12,158],[205,92,224,140,70,166,201,155,130,241,146,68,208,142,108,233,188,94,214,42,23,37,181,218,25,249,161,85,152,136,117,76],[159,47,87,189,133,126,196,141,142,202,129,235,247,80,233,35,196,50,137,144,177,155,89,237,153,231,13,106,50,27,96,220],[42,26,36,24,117,33,26,204,186,68,114,38,124,161,177,138,176,98,117,145,18,209,187,98,242,230,208,227,191,211,0,221],[49,2,179,210,142,34,73,4,217,226,212,97,210,199,143,177,145,170,11,241,114,119,223,32,226,156,206,151,205,49,176,240]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(2014223714, "PayableExample", [[73,133,87,171,62,204,31,13,89,139,84,5,74,209,153,190,30,114,247,191,20,181,233,222,161,133,82,112,131,84,37,213],[237,67,26,226,217,23,159,227,244,113,205,230,115,183,226,173,135,232,92,144,36,113,43,134,41,17,113,233,166,73,196,126],[8,4,212,244,194,172,83,140,54,10,2,74,56,130,50,174,185,166,19,80,60,104,228,254,78,15,233,241,225,222,210,203],[168,170,4,204,158,236,202,212,52,7,238,95,98,46,29,147,222,62,121,171,169,230,41,58,64,138,20,100,206,70,149,70],[62,101,247,182,250,86,67,121,133,47,39,56,69,170,135,166,215,97,26,209,44,5,130,236,254,129,0,203,25,82,236,101],[58,7,140,168,160,107,120,81,229,67,86,126,149,200,75,25,83,225,191,63,216,89,218,65,201,22,145,115,67,182,72,219]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(1532892063, "s7koy8", [[238,152,24,188,16,73,90,9,233,213,176,210,234,68,196,226,131,152,0,122,173,12,111,95,58,91,112,31,142,192,130,62],[189,95,43,214,55,74,41,47,254,50,182,60,17,126,133,238,78,216,21,230,182,20,48,87,217,28,210,43,125,120,167,12],[159,19,168,219,27,63,79,168,6,176,224,28,96,179,15,69,206,144,38,24,214,117,57,180,101,122,213,110,14,194,145,85]], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("s7koy8", [[112,70,245,63,220,43,18,78,201,186,16,111,49,68,64,80,25,133,222,145,206,68,115,167,61,39,207,47,246,29,249,157],[130,131,58,158,226,175,8,98,131,220,158,193,164,0,176,56,182,171,8,220,133,182,63,215,45,108,54,8,50,192,212,230],[231,225,248,173,199,89,0,230,98,168,240,5,12,230,25,195,202,240,213,207,252,241,113,186,129,252,104,25,111,17,180,73],[62,124,57,102,93,165,68,167,84,130,169,131,202,48,146,107,178,103,164,104,167,142,225,147,198,172,34,50,37,139,121,120]], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("", [[150,53,253,115,148,102,66,44,22,124,224,153,226,135,243,208,135,196,242,60,235,14,156,72,29,108,54,181,252,4,254,235]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(128, "trade.totalPrice", [[233,98,223,163,202,169,177,17,107,82,53,16,39,203,177,74,134,35,16,114,83,73,60,101,52,35,224,20,191,217,38,176]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(57, "ETH", [[231,167,84,227,92,173,111,65,174,188,146,168,51,195,32,189,104,26,11,10,26,237,35,108,239,222,79,38,228,198,249,56]], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("updateEthPrice called", [[62,78,8,113,228,222,93,226,118,225,137,67,125,89,123,201,101,3,115,103,108,38,92,245,156,147,162,143,173,180,15,253]], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("trade.totalPrice", [[152,111,152,176,104,175,103,188,77,243,141,57,147,7,255,56,128,62,169,166,146,224,159,121,130,82,37,242,61,138,211,85],[1,106,168,90,231,7,40,229,9,195,167,33,107,171,201,38,159,67,211,245,232,243,136,207,38,133,11,100,167,60,8,32]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(24, "PayableExample", [[142,23,146,224,234,6,100,112,71,51,158,116,19,197,133,243,24,99,2,2,26,78,165,23,212,129,227,167,217,175,70,211],[25,219,242,54,180,76,72,243,130,72,204,251,68,34,240,22,17,85,226,127,131,236,139,25,132,166,232,246,90,45,73,108]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(160, "P", [[254,110,119,68,211,68,1,56,121,168,126,183,17,39,229,229,52,105,131,12,199,45,22,138,69,21,117,141,193,236,195,92],[172,212,49,136,72,225,224,105,114,148,28,186,188,130,83,106,142,206,17,115,157,160,88,228,138,22,126,221,44,195,32,51]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("2jrz8t", [[146,82,222,60,130,199,9,67,118,158,185,186,248,227,154,79,14,151,149,91,33,34,247,88,119,81,75,150,157,87,56,229],[246,223,199,16,122,160,221,148,42,249,114,52,191,238,236,113,85,157,54,71,154,224,122,80,4,142,107,167,196,112,100,45]], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("listingID arg", [[155,144,233,95,95,156,99,1,190,27,174,74,171,30,148,159,211,115,119,217,244,102,10,38,85,36,228,218,76,114,57,116],[242,138,120,79,110,204,168,96,141,190,11,109,184,40,153,68,98,5,209,114,11,136,109,75,207,106,52,105,29,90,69,203],[164,69,168,228,0,78,65,1,78,174,96,68,246,70,126,209,237,1,167,211,213,3,53,186,78,139,186,13,17,92,73,247]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(2014223714, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[167,84,102,218,234,238,64,7,80,189,228,53,24,153,162,250,7,124,197,138,112,17,2,115,23,79,152,28,209,212,9,204],[42,106,131,143,28,0,4,255,5,95,20,164,88,144,54,85,255,212,32,47,17,208,194,48,102,95,108,30,193,238,136,112],[164,93,101,142,133,22,138,188,56,201,67,143,188,202,88,169,252,176,178,30,207,145,220,134,160,9,202,121,148,140,112,20]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(255, "7q8o7y", [[146,78,89,5,188,23,56,110,10,223,182,77,197,155,41,113,194,4,94,241,61,218,168,172,206,212,117,52,119,209,124,179],[28,56,123,89,164,230,93,119,22,117,102,129,102,45,32,138,208,214,32,170,217,18,10,6,215,247,22,175,25,221,222,188],[75,126,102,18,58,96,60,48,121,173,218,149,143,88,126,75,158,138,169,76,197,149,98,9,31,8,90,221,82,176,28,83]], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("s7koy8", [[170,66,225,183,197,188,137,137,186,47,27,194,168,151,38,132,130,181,180,124,170,230,11,113,255,5,32,32,134,201,145,62],[43,168,68,92,148,35,167,89,121,46,69,108,116,158,60,151,83,154,193,175,34,47,246,13,10,3,84,83,37,112,161,239],[163,213,154,186,44,122,160,234,78,116,176,59,248,217,16,113,170,250,4,231,142,93,210,56,88,34,66,167,21,173,249,90]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("37uis", [[249,247,236,60,185,41,0,182,174,62,250,40,111,1,122,86,57,219,165,251,123,85,56,166,224,78,113,135,163,254,79,252],[4,114,196,86,188,56,3,222,50,33,89,112,226,35,253,159,144,252,157,234,5,174,88,33,48,250,62,71,237,0,61,198],[56,100,145,43,109,233,207,157,248,237,232,118,107,136,158,44,241,211,155,83,141,253,179,115,213,87,86,230,72,113,115,225],[136,221,210,108,139,218,20,141,14,27,107,224,239,120,185,73,171,2,32,1,204,95,63,80,227,198,24,247,108,29,202,44]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(200001, "2jrz8t", [[102,234,112,10,173,178,64,151,37,211,184,247,115,215,83,118,96,165,196,54,31,45,155,19,233,241,44,128,108,85,210,49],[226,223,36,85,149,215,215,55,161,255,206,139,36,168,95,78,48,49,8,80,241,74,198,205,148,146,63,76,183,22,189,224],[11,133,174,104,43,154,240,6,23,141,95,119,43,227,7,51,137,226,195,130,239,153,26,187,197,117,140,249,146,115,137,203],[97,51,85,249,146,221,24,121,68,12,162,26,252,17,53,165,195,86,78,234,242,90,207,0,131,145,84,58,62,67,121,151]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(86, "ETH", [[93,66,249,43,54,92,159,131,145,127,110,93,141,138,250,164,215,128,2,110,130,127,253,219,101,133,216,27,176,100,153,239],[188,146,116,91,162,220,95,101,240,28,210,146,79,19,203,169,228,250,219,239,26,92,99,110,192,66,179,74,37,244,230,10],[108,77,255,54,131,116,228,10,186,89,48,190,134,25,70,243,75,225,124,174,120,54,218,145,73,228,255,126,121,98,61,100],[143,180,117,192,20,136,59,136,153,34,129,82,163,103,96,100,46,16,64,44,117,147,27,128,102,203,140,188,59,146,63,232]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("ETH", [[187,28,58,173,241,85,139,171,27,71,81,23,218,46,180,251,85,76,171,18,124,124,156,241,158,189,41,116,19,19,98,147],[205,103,216,185,149,84,79,210,191,90,188,13,111,74,66,22,57,92,68,55,19,25,94,135,123,254,251,143,80,63,112,202],[165,107,171,98,100,110,179,91,96,98,145,180,52,100,2,113,192,136,201,211,219,231,183,174,237,40,22,29,90,204,52,45],[0,61,111,121,153,74,123,197,253,237,53,109,172,185,245,124,92,55,85,15,26,219,246,204,191,203,142,255,0,191,135,181]], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("fsufza", [[130,222,225,170,106,63,80,72,100,100,98,67,248,158,24,39,201,11,13,21,78,173,28,240,96,183,250,187,3,51,56,112],[165,168,146,84,177,248,232,52,164,99,2,110,107,39,76,53,120,73,217,97,237,149,37,212,141,22,112,86,151,177,91,164],[192,111,31,116,173,75,88,48,157,116,228,238,66,51,153,144,213,162,10,45,219,250,173,101,175,136,206,9,29,133,57,61],[206,42,128,166,36,56,246,219,202,218,122,13,179,253,145,164,103,233,214,97,2,63,40,32,41,142,74,53,55,141,183,219],[142,163,212,166,12,223,1,107,10,232,254,115,246,182,241,125,5,92,139,182,183,10,157,131,198,10,217,133,72,208,223,1]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(2014223715, "call updateEthPrice", [[227,107,75,10,237,113,55,100,202,193,157,99,206,107,105,90,5,108,225,204,122,13,91,237,174,174,139,220,127,169,192,176],[175,125,148,6,189,75,62,3,106,208,220,14,109,220,58,195,238,171,40,208,29,156,147,90,135,162,178,195,200,223,22,45],[216,126,8,203,207,126,104,77,21,235,189,169,215,121,196,106,68,221,17,163,131,138,139,225,106,239,125,190,241,214,54,93],[55,34,138,157,43,121,121,3,17,98,86,17,125,215,105,183,231,231,252,59,184,145,115,124,164,71,199,231,203,141,244,248],[89,218,222,184,253,208,212,26,74,141,30,119,27,102,84,122,195,168,109,151,173,152,157,142,101,16,37,247,138,86,202,187]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(63, "IsLibrary", [[126,163,101,95,112,7,62,93,102,63,80,34,68,14,162,142,208,138,176,55,97,15,178,56,44,222,145,191,171,231,160,134],[128,57,88,252,237,217,195,112,26,172,245,114,61,123,1,71,50,25,73,245,59,17,225,48,125,213,36,79,140,99,141,205],[239,192,223,212,13,128,152,195,153,120,198,45,211,11,153,94,18,89,169,68,173,234,216,209,63,240,136,193,120,62,120,232],[100,199,4,162,235,254,71,233,45,249,190,128,83,157,94,3,58,101,112,54,205,229,46,48,33,183,179,46,93,70,94,203],[2,54,143,55,218,255,164,121,29,17,177,216,170,53,224,96,226,107,124,188,154,63,228,172,137,58,249,138,13,93,80,175]], 70,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("Oraclize query was sent, standing by for the answer...", [[57,80,66,40,94,24,171,28,244,42,201,144,147,45,197,196,85,81,156,101,168,56,102,34,98,123,24,94,154,22,162,221],[225,80,227,250,156,220,92,79,97,253,138,192,36,92,154,42,230,59,158,61,136,9,7,185,39,162,211,77,233,204,31,96],[206,192,228,244,36,214,53,129,75,154,132,244,77,47,115,221,65,98,9,136,165,216,142,199,74,36,169,84,215,81,96,39],[171,94,235,143,74,124,47,130,251,63,194,195,222,35,149,47,218,21,240,130,84,175,22,58,164,125,19,127,240,223,5,225],[48,239,57,214,174,211,147,145,202,242,143,129,178,102,190,123,205,81,185,2,183,44,169,212,73,251,161,31,152,137,234,214]], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([35],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[4],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(101,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("Oraclize query was sent, standing by for the answer...", "enhwar",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("updateEthPrice called", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("trade.totalPrice", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("call updateEthPrice", "call updateEthPrice", "costUSD",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("ETH", "2jrz8t", "L", "Example",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("6eofq", "37uis", "costUSD", "Oraclize query was sent, standing by for the answer...", "0",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 10,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("oydon", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("oydon",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("trade.totalPrice", 1532892064,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(256,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["6eofq","oydon","RevertWithReason","UsesExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","6eofq"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[165,132,67,235,179,44,24,13,232,22,210,71,242,20,42,139,70,82,220,247,3,176,186,141,166,110,248,173,238,46,98,218],[6,119,65,246,96,12,22,218,209,108,60,51,127,87,84,154,179,64,141,163,191,96,98,151,130,190,59,66,128,51,145,1],[85,150,115,111,205,111,127,216,240,225,193,118,205,74,192,145,212,64,177,234,168,104,224,236,106,88,29,131,126,194,226,86],[221,233,235,194,244,42,147,111,116,101,133,98,178,21,108,148,237,232,153,53,51,29,227,97,97,247,244,143,107,118,243,87],[118,227,50,171,202,3,54,54,70,193,24,186,173,143,159,45,34,53,22,254,145,228,158,3,177,51,193,98,160,81,78,103],[98,71,91,119,78,241,220,249,59,234,35,236,103,249,234,82,94,13,159,34,8,159,28,212,153,154,168,54,246,197,248,147],[27,45,223,192,57,11,54,111,87,140,106,62,87,172,225,110,84,170,33,161,184,211,187,33,253,26,179,174,115,19,37,159]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(98, 88, 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([40,222,11,147,20,192,88,251,142,119,74,217,179,214,236,201,159,237,19,238,25,26,32,94,251,59,103,7,212,28,29,192], [205,232,112,207,246,254,154,103,160,211,255,201,156,89,227,159,179,138,180,52,126,75,198,44,13,101,0,16,159,50,78,54],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([123,84,68,117,31,239,202,8,176,222,23,97,226,47,75,12,50,242,3,253,52,134,206,95,185,229,159,85,193,222,84,232], [73,59,195,70,237,145,196,209,83,90,39,94,253,149,249,121,152,209,197,167,195,144,156,26,184,181,197,220,170,67,230,207], [86,18,144,82,236,254,129,46,225,33,175,210,171,118,103,204,216,68,34,54,166,206,9,225,238,142,180,139,40,108,107,112],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([67,82,32,47,104,252,101,120,50,124,47,114,212,117,108,191,109,238,206,52,206,34,65,168,242,239,166,51,22,39,0,108], 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([224,42,59,149,182,65,79,84,43,138,178,63,149,142,82,93,184,127,177,129,185,90,194,218,237,65,132,153,29,193,128,158], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([85,48,116,149,158,84,239,109,212,215,210,190,229,13,65,156,216,105,242,29,50,191,219,200,88,2,190,131,141,15,209,25], "fsufza", [63,156,217,141,155,246,69,145,102,203,10,131,221,61,224,255,46,211,168,213,85,221,14,244,29,91,65,126,4,126,182,206],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([203,13,190,219,84,64,157,244,213,70,151,145,90,177,240,161,98,114,116,61,42,251,244,181,95,63,102,171,77,198,162,170], "", [222,102,206,179,87,210,69,227,38,9,42,72,22,113,214,11,149,177,68,23,77,138,166,197,151,128,162,81,66,222,236,255],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([101,181,113,212,174,183,136,234,228,64,9,201,30,178,18,6,242,253,100,21,58,233,126,2,85,206,139,86,176,209,170,210], [220,22,206,96,82,143,66,46,177,178,216,90,54,242,31,217,152,33,116,197,234,22,54,121,90,49,165,179,51,98,211,83], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([101,181,113,212,174,183,136,234,228,64,9,201,30,178,18,6,242,253,100,21,58,233,126,2,85,206,139,86,176,209,170,210], [126,88,85,253,115,11,162,99,1,57,230,186,55,13,1,142,3,44,161,162,39,90,211,78,65,86,189,56,193,136,237,46,92], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([233,4,99,187,21,40,142,25,65,245,123,181,144,156,181,138,14,90,89,200,252,157,159,10,208,56,118,121,180,188,67,146], [225,38,71,193,225,241,127,190,191,98,82,144,63,204,39,27,92,82,137,157,59,231,154,151,135,68,81,40,97,176,106,200], [188,5,98,22,177,33,205,21,197,14,136,244,134,62,31,109,163,92,145,137,66,107,243,205,205,224,244,176,82,123,138,80], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([69,153,93,76,206,78,204,175,85,133,114,241,230,76,32,37,56,218,127,215,6,208,222,187,163,47,97,123,104,178,208,82], [196,35,228,235,201,229,52,232,107,121,175,187,74,140,34,61,30,152,3,109,234,128,41,247,110,185,51,197,5,129,17,93], [74,109,107,253,122,240,126,179,252,210,235,31,15,37,153,213,233,141,100,153,84,32,201,69,108,187,241,51,8,181,150,154], "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([209,145,150,233,69,156,132,102,103,245,172,233,107,200,138,149,168,232,64,244,199,155,110,106,106,193,30,153,179,32,113,89], [41,149,88,67,175,210,99,177,224,3,236,151,230,76,213,29,13,154,190,31,4,105,236,128,61,22,202,82,131,177,101,103], [29,87,157,255,97,251,157,248,210,119,206,202,187,219,44,68,25,89,174,95,226,47,167,222,216,247,246,233,79,14,21,165], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([23,193,41,119,38,80,17,172,116,224,15,161,53,56,173,234,221,17,80,87,179,250,74,162,217,122,183,72,29,88,134,79], [43,9,240,202,167,20,237,103,113,27,47,77,212,231,127,108,17,200,156,40,232,25,31,231,128,204,44,32,223,141,121,223], [211,54,128,73,81,85,233,84,213,129,170,48,58,0,3,106,43,159,24,211,157,171,156,238,91,86,233,186,231,44,110,86], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([195,184,110,135,8,242,10,236,59,94,0,145,50,50,218,70,1,79,116,139,146,217,163,100,147,205,250,232,206,82,156,82], [228,124,40,114,246,243,121,30,3,6,127,144,81,197,178,116,88,62,114,126,93,129,252,127,143,59,169,106,210,92,205,21], [15,173,238,159,159,132,21,23,25,29,25,134,137,45,188,180,251,191,36,234,178,60,81,19,129,58,142,210,147,224,32,122], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([204,162,242,180,41,99,244,17,118,2,145,200,78,168,38,39,83,40,198,134,97,244,150,172,104,142,145,213,155,75,136,49], [252,244,83,71,16,118,176,71,251,153,76,46,28,55,207,130,67,165,160,96,6,249,140,74,76,175,129,175,162,159,29,116], [172,69,232,12,68,224,104,108,29,175,17,48,115,139,83,152,45,188,212,251,205,133,124,158,149,148,162,57,90,232,143,204], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([139,67,47,117,253,67,248,255,86,213,227,147,119,112,29,248,121,47,107,28,71,47,168,76,167,175,56,251,83,254,39,69], [52,51,119,56,28,93,178,0,121,228,97,234,48,110,175,139,60,244,148,129,28,31,83,182,180,92,200,248,186,156,38,185], [93,215,70,185,238,170,24,75,117,211,28,91,7,202,22,30,110,192,116,43,97,129,196,20,221,217,229,130,253,157,70,4], "Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([231,66,45,66,116,113,191,148,20,54,121,128,115,219,53,135,206,108,102,141,37,75,26,244,102,209,188,166,49,132,82,83], [83,166,6,100,0,124,230,243,123,79,228,26,116,98,21,148,104,93,199,128,228,217,68,104,23,233,143,216,253,129,49,210], [11,119,93,118,91,48,245,151,144,189,8,239,132,163,224,2,230,61,83,13,254,182,189,161,203,235,90,252,43,4,39,177], "g8i78m",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([45,79,45,129,214,109,144,57,85,153,240,8,149,39,213,124,254,172,11,52,164,166,76,16,60,120,145,55,131,195,48,160], 88, 24, [246,184,142,189,237,193,72,114,116,158,50,163,137,168,120,45,79,123,11,176,229,35,60,132,206,236,85,169,193,237,24,185], 1023,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([5,200,46,141,59,227,248,132,93,158,78,116,0,45,152,86,49,176,103,150,138,168,92,70,68,4,181,113,135,125,100,48], 69, [73,230,122,231,158,166,200,181,62,243,228,104,192,40,15,207,225,229,165,152,211,127,57,119,129,177,248,108,127,141,99,45], [141,147,178,206,96,231,56,107,159,213,71,62,110,26,39,94,125,79,56,113,213,72,124,220,37,57,194,81,253,175,162,135],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([199,233,18,45,229,233,212,112,197,181,30,195,252,125,214,112,150,186,185,205,69,179,12,28,79,235,194,170,3,4,65,22], [188,153,233,235,232,148,139,69,209,39,246,164,76,26,147,112,145,158,249,194,67,230,63,246,237,69,212,174,148,244],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([43,82,111,26,22,47,66,193,112,231,140,189,242,195,247,23,161,195,192,82,111,88,39,195,109,127,122,124,54,109,216,58], [134,248,111,74,205,197,73,228,236,136,146,234,173,72,197,5,103,164,164,21,173,100,170,214,144,143,239,184,87,208,118,143,51,21,52,0,16,93,245,130,8,10,84,247,222,222,22,202,220,183,237,226,86,146,89,240,103,159,196,83,220,99,10,209,239],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
