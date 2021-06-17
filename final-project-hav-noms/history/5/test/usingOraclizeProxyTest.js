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
    contractShartCoin = await ShartCoin.new({from:accounts[2]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[2]}');
    contractState = await State.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[5],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[6],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[3],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[7],contractProxy.address,contractTokenExchangeState.address,"0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[7],contractProxy.address,contractTokenExchangeState.address,"0",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(65,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("0", 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("0", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(1338, "\x19Ethereum Signed Message:\n32", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1532892063, "UsesExample", "RevertWithReason", 66,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("IsLibrary", "updateEthPrice called", 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("g181jc", "PayableExample", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(63, "PayableExample", "updateEthPrice called", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(160, "updateEthPrice called", "Example", "costUSD", 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("ETH", "PayableExample", "g181jc", 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("ETH", ["costUSD","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(161, "L", ["","updateEthPrice called","call updateEthPrice","p684zs","Oraclize query was sent, standing by for the answer...","Oraclize query was sent, standing by for the answer...","RevertWithReason","ETH","trade.totalPrice","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(33, "L", ["p684zs"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["call updateEthPrice","PayableExample","0","p684zs","listingID arg"], 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("P", ["g181jc"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(9, "\x19Ethereum Signed Message:\n32", ["Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(255, "UsesExample", ["0"], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("", ["updateEthPrice called"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("PayableExample", ["","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(63, "listingID arg", ["p684zs","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(1, "Oraclize query was sent, standing by for the answer...", ["P","call updateEthPrice"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("trade.totalPrice", ["IsLibrary","p684zs"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("RevertWithReason", ["updateEthPrice called","","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(95, "updateEthPrice called", ["g181jc","P","g181jc"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(2014223714, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["p684zs","p684zs","rphrhz"], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("\x19Ethereum Signed Message:\n32", ["trade.totalPrice","Oraclize query was sent, standing by for the answer...","updateEthPrice called"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["PayableExample","costUSD","trade.totalPrice","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(1337, "P", ["q5xd06","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","IsLibrary","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(18, "Oraclize query was sent, standing by for the answer...", ["\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32","PayableExample","RevertWithReason"], 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("updateEthPrice called", ["listingID arg","PayableExample","RevertWithReason","listingID arg"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("costUSD", ["IsLibrary","g181jc","IsLibrary","PayableExample","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(9999, "RevertWithReason", ["IsLibrary","Example","\x19Ethereum Signed Message:\n32","costUSD","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(127, "g181jc", ["trade.totalPrice","p684zs","p684zs","ETH","q5xd06"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("Oraclize query was sent, standing by for the answer...", ["call updateEthPrice","\x19Ethereum Signed Message:\n32","1jc4b","costUSD","ETH"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("q5xd06", [[94,71,155,240,18,85,234,111,77,76,172,68,104,182,155,180,137,219,101,214,249,123,90,65,135,227,225,141,251,28,56,220],[221,160,79,74,179,247,104,98,231,123,131,100,1,205,187,235,53,122,237,28,201,125,2,135,114,162,112,174,55,26,239,117],[201,37,173,59,2,3,198,137,199,184,246,37,45,209,47,48,20,144,198,178,12,208,48,186,186,109,43,213,73,167,241,180],[27,242,192,18,135,138,15,57,146,170,58,232,158,41,165,72,126,149,220,22,77,170,141,132,7,48,214,134,43,199,24,201],[142,59,196,60,58,142,131,64,65,27,57,174,51,96,202,132,0,226,248,17,197,82,73,245,146,242,226,68,159,17,153,82],[173,243,192,106,5,178,243,198,194,125,103,184,228,224,163,209,225,75,231,18,213,51,151,246,167,46,224,117,166,42,156,34],[236,197,19,14,205,197,222,38,50,114,176,93,215,219,122,76,1,37,9,75,194,74,145,98,89,35,187,75,190,22,181,47],[6,153,17,100,143,108,229,57,95,205,139,152,160,38,34,26,223,116,35,117,39,74,140,82,90,90,57,6,243,145,100,247],[81,62,157,88,242,221,149,107,81,44,99,119,241,59,250,41,164,166,142,151,117,31,47,199,112,113,8,89,15,49,182,153],[199,161,12,194,13,28,100,164,71,7,91,94,128,108,246,8,81,78,140,140,16,168,241,205,42,186,211,107,23,219,151,82]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(47, "\x19Ethereum Signed Message:\n32", [[13,72,78,14,186,76,204,134,72,187,95,209,32,219,89,229,138,251,41,219,181,232,201,34,9,183,26,102,90,243,215,231],[157,248,200,99,218,165,118,204,159,254,82,136,41,139,119,181,166,13,94,56,91,177,50,70,246,89,218,235,2,126,233,152],[108,132,70,5,122,14,45,95,33,156,212,177,40,85,148,88,11,110,59,147,205,197,166,203,187,44,105,148,74,129,68,78],[175,153,167,232,156,26,130,166,195,118,158,89,129,147,80,228,206,218,242,10,44,122,120,59,211,209,78,199,59,164,224,247]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(33, "call updateEthPrice", [[183,135,111,85,109,38,35,233,188,10,32,42,87,175,241,246,135,98,142,25,58,136,227,201,115,167,16,6,199,58,101,223],[222,100,21,46,204,109,54,54,13,45,229,65,80,218,230,0,98,48,59,57,163,243,41,57,113,245,53,236,82,18,28,210],[57,4,53,53,247,8,192,15,36,81,55,11,75,252,244,16,138,139,39,220,123,167,79,63,50,9,32,185,133,255,98,217]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("RevertWithReason", [[2,28,103,113,122,162,104,252,133,148,46,218,206,230,80,247,9,99,21,245,212,94,56,242,110,191,196,191,128,100,17,199],[61,138,87,154,228,154,57,178,204,142,211,12,240,222,133,225,114,44,0,51,87,79,131,2,10,32,61,7,198,182,185,191],[56,115,209,114,57,5,60,23,195,141,79,105,71,213,237,15,186,218,223,165,67,9,36,39,215,165,102,152,73,87,166,117],[166,219,1,73,233,91,10,217,103,235,74,212,159,252,8,68,96,101,113,92,76,28,29,109,216,251,106,174,219,103,10,125],[93,49,221,181,196,235,195,119,170,4,112,167,167,107,18,192,39,242,186,185,82,75,101,77,56,55,229,37,141,35,80,1]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("1jc4b", [[151,11,106,108,227,35,53,32,234,126,129,65,77,97,171,154,209,19,88,94,130,173,130,95,6,239,127,103,124,151,119,152]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(59, "listingID arg", [[35,100,112,18,119,49,21,236,98,48,54,140,191,62,27,150,226,140,219,43,18,113,79,110,193,80,20,30,202,168,0,44]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(1532892063, "listingID arg", [[3,88,112,207,52,177,196,175,210,211,108,0,148,89,2,69,113,142,170,142,79,236,73,24,53,67,33,110,137,226,154,89]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("P", [[4,61,106,90,32,96,181,67,119,231,25,17,1,93,24,5,103,55,118,253,32,252,229,27,78,221,71,172,240,233,122,198]], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("call updateEthPrice", [[240,68,114,43,199,37,138,88,27,177,157,142,123,232,212,58,18,148,131,210,195,74,6,114,233,206,216,84,211,108,189,95],[180,107,165,4,100,208,84,89,203,187,65,127,2,155,64,181,37,64,11,102,101,31,124,64,135,131,136,204,60,165,247,116]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(1, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[237,205,138,240,72,65,22,110,42,65,118,123,168,88,233,37,22,51,160,47,104,84,185,46,46,52,138,97,189,115,175,227],[202,67,131,194,237,186,249,234,111,98,174,59,50,159,160,118,139,50,13,183,255,119,77,122,65,14,19,42,50,180,210,250]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(1338, "P", [[70,157,180,157,47,117,144,147,13,254,213,188,183,117,188,77,153,245,148,38,2,187,181,18,67,153,250,205,58,225,53,72],[15,254,131,24,154,226,84,147,26,118,179,97,95,186,78,116,247,114,231,20,141,135,254,162,214,244,37,4,92,75,174,228]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("costUSD", [[197,158,124,16,103,220,235,119,200,149,240,216,45,122,152,76,47,72,118,166,6,17,232,75,218,73,66,29,184,203,28,223],[4,42,221,104,127,165,137,230,137,100,39,41,2,251,10,132,43,38,16,96,6,246,25,173,140,136,224,46,177,21,240,173]], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("PayableExample", [[255,153,251,22,184,5,199,179,80,38,44,70,186,247,16,112,192,71,142,189,105,15,55,34,241,192,30,243,150,213,202,217],[108,57,149,9,134,24,226,217,141,92,111,177,250,118,123,179,106,20,58,76,114,91,147,174,184,43,159,212,169,47,37,59],[164,69,83,243,8,8,60,196,54,115,69,30,202,51,255,146,216,57,73,234,36,253,197,18,54,131,38,254,49,11,26,15]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(45, "b9uujh", [[242,63,205,158,89,111,222,248,159,191,180,122,241,234,30,212,61,195,230,20,225,80,242,10,181,199,217,12,17,212,180,24],[172,193,184,49,59,149,221,200,73,11,172,56,189,32,244,246,251,109,73,131,66,111,127,123,173,16,79,52,82,76,148,208],[231,3,104,150,241,113,200,20,75,199,153,31,13,149,207,14,121,127,123,59,12,201,74,230,198,110,223,12,247,36,222,113]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(25, "ETH", [[197,22,151,86,122,98,143,68,217,49,108,160,65,187,79,148,132,251,116,231,204,168,16,243,201,74,161,226,52,238,162,39],[16,250,14,209,81,54,67,130,203,71,132,4,67,28,227,96,241,112,28,145,131,68,30,149,52,211,100,63,179,122,14,192],[55,75,201,250,55,218,63,200,175,75,130,85,84,234,48,154,169,41,214,30,223,224,38,96,221,254,185,111,9,79,68,7]], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[137,144,72,176,230,240,104,165,7,140,40,12,74,139,162,126,182,55,30,131,211,86,125,215,124,44,138,163,101,23,213,6],[73,230,0,19,235,170,112,89,250,204,168,160,59,135,104,126,48,155,125,58,156,231,179,34,221,134,156,207,53,111,120,202],[191,176,234,187,243,63,114,168,102,10,70,217,110,38,87,12,214,239,187,212,0,16,108,166,97,6,133,211,158,9,159,158]], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("Example", [[37,52,22,133,129,42,23,243,115,176,191,131,50,51,171,23,26,13,219,188,32,93,31,219,63,230,14,134,37,97,97,64],[21,14,101,88,223,24,222,70,52,173,0,20,150,156,217,179,20,220,194,39,178,98,3,145,57,224,141,252,213,199,92,254],[210,24,251,192,61,105,67,24,140,25,93,160,208,182,78,78,245,14,185,108,205,37,79,118,33,125,248,119,116,103,42,251],[216,208,243,219,157,60,244,107,139,250,166,16,43,152,45,173,196,156,206,159,102,26,50,26,240,70,255,184,246,222,250,166]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(63, "1jc4b", [[144,161,73,132,148,25,188,8,160,150,235,249,22,132,158,155,39,15,47,157,149,161,186,118,1,179,94,121,35,20,233,21],[155,75,83,148,54,209,57,10,253,185,204,238,96,145,65,140,199,27,142,246,219,12,129,44,255,224,96,124,197,4,130,33],[10,236,83,236,42,219,221,197,187,52,208,102,73,164,165,52,77,116,5,66,65,106,249,76,155,141,147,36,214,29,39,239],[218,242,190,85,212,140,233,10,119,193,80,250,96,142,44,250,69,150,111,241,201,69,203,197,14,142,82,241,226,191,69,117]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(65, "RevertWithReason", [[125,174,111,246,100,14,207,1,55,49,4,157,141,185,67,239,247,138,147,163,195,44,215,248,84,205,99,73,184,51,34,153],[150,232,191,86,117,30,99,8,246,253,72,16,252,189,145,55,17,95,85,185,165,66,243,224,28,21,14,191,183,149,95,107],[69,47,113,106,22,186,191,54,191,183,36,111,4,176,239,189,18,182,8,15,148,131,122,13,43,219,53,216,32,206,141,151],[55,194,37,190,96,31,235,96,140,255,117,186,101,185,231,181,197,113,81,27,251,130,155,202,41,207,127,159,171,52,6,152]], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("", [[221,197,148,234,35,248,152,174,91,90,206,27,48,249,100,99,198,253,67,79,166,176,217,59,150,87,124,172,216,70,52,195],[7,100,109,212,156,90,254,206,222,220,13,195,139,74,149,94,37,35,177,185,48,68,167,98,73,205,81,72,205,90,201,14],[222,163,125,10,30,117,226,158,97,32,212,197,18,219,181,176,254,142,28,76,32,126,26,147,217,81,132,100,213,117,142,50],[52,198,37,45,149,224,49,89,193,168,18,239,62,117,30,91,220,236,14,114,127,243,161,207,21,226,42,143,164,159,140,100]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("", [[231,100,51,141,17,246,8,186,192,248,73,116,12,114,230,221,101,55,184,190,29,85,34,136,102,180,41,166,128,70,149,137],[200,14,253,39,95,195,55,159,216,153,56,140,228,249,145,78,200,188,242,15,237,119,254,237,67,195,147,34,19,242,86,137],[87,83,111,208,97,172,126,230,220,104,149,193,175,145,102,123,151,96,41,187,120,208,230,141,68,50,49,128,231,214,153,94],[232,196,137,235,91,26,51,113,211,141,0,230,100,7,50,76,86,162,171,233,125,213,123,80,12,68,152,132,189,223,139,117],[90,65,89,156,255,71,54,162,59,98,238,138,82,101,57,89,19,26,115,35,0,151,224,154,204,139,87,241,70,196,49,238]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(21, "listingID arg", [[133,27,62,185,233,221,97,94,190,100,136,18,146,195,228,160,155,25,172,120,102,110,20,99,112,114,219,210,205,93,226,231],[161,239,48,120,241,188,108,81,77,244,99,49,9,223,115,244,44,194,126,81,252,73,249,88,238,254,94,121,51,172,137,157],[209,121,231,191,109,232,125,70,153,190,171,152,58,66,237,225,199,245,203,160,107,249,184,88,160,22,16,231,92,213,130,212],[221,187,255,134,212,147,58,67,216,105,78,88,205,124,87,92,55,181,180,182,173,65,180,194,132,238,180,110,73,79,160,2],[156,34,87,211,203,223,225,194,74,101,28,39,49,127,53,207,69,184,250,50,230,47,69,69,159,165,50,57,204,216,137,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(96, "IsLibrary", [[49,111,241,24,132,50,238,71,225,221,230,143,210,71,19,250,109,40,240,208,52,2,238,130,142,77,67,248,59,21,236,0],[38,92,30,86,12,193,9,122,111,106,45,124,155,10,39,193,199,72,103,218,96,89,189,215,113,50,109,43,149,17,188,224],[224,138,38,20,207,235,222,241,56,120,24,206,88,44,5,195,85,24,86,28,82,199,56,222,249,72,162,134,84,109,104,198],[133,73,153,217,170,16,135,94,61,149,216,65,158,202,75,97,190,142,62,109,222,223,47,154,161,141,134,214,8,101,134,101],[206,69,132,96,54,57,188,197,224,189,156,180,254,248,100,60,25,213,88,178,58,47,22,82,236,105,64,218,147,123,231,132]], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("0", [[239,226,231,166,80,111,205,238,101,100,62,187,177,115,170,36,255,141,157,224,128,26,176,204,166,226,234,173,103,182,209,3],[12,87,182,222,219,224,231,107,242,174,29,118,229,236,252,177,197,134,191,31,25,18,120,35,193,59,149,20,167,202,86,6],[164,48,78,170,121,237,115,95,180,225,211,213,242,140,119,207,111,172,200,56,115,220,24,10,128,235,133,237,81,65,197,172],[0,224,20,189,176,53,218,74,159,168,20,248,228,93,77,134,253,14,237,220,161,247,229,6,116,157,52,154,93,124,92,146],[228,33,117,47,70,155,37,189,118,0,27,11,168,105,112,190,44,34,100,156,160,5,251,188,109,12,165,208,162,153,112,194]], 10001,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([255],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[4],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(22,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("q5xd06", "ETH",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("q5xd06", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("1jc4b", "costUSD",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("PayableExample", "p684zs", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("jkbpul", "jkbpul", "PayableExample", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("Example", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "rphrhz", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "lyotu",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was sent, standing by for the answer...", 31,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("L", 2014223716,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("p684zs", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(3,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["updateEthPrice called","","jkbpul","UsesExample","g181jc","b9uujh","p684zs","\x19Ethereum Signed Message:\n32","updateEthPrice called","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[195,140,235,201,43,97,247,129,169,120,251,194,206,116,146,117,111,3,248,63,42,97,160,22,62,11,58,157,185,34,14,229],[1,55,182,99,145,44,123,215,175,229,30,151,180,156,93,26,195,185,182,36,247,57,189,8,0,132,214,168,158,69,72,28],[15,65,250,19,24,123,7,235,83,15,195,120,25,97,107,249,248,184,147,122,70,16,96,253,131,65,169,246,38,7,142,13],[106,255,220,154,23,184,223,12,32,131,193,205,90,81,128,142,113,10,251,47,155,175,37,6,55,129,255,90,239,210,67,124],[161,6,49,11,30,141,32,130,38,154,1,12,7,163,70,170,17,172,86,94,15,45,198,218,23,164,88,3,115,35,198,18],[78,149,147,235,103,200,7,114,191,164,50,156,58,128,107,15,229,160,43,122,61,101,95,65,71,220,129,153,11,207,44,92],[135,147,199,80,233,143,228,40,77,131,108,168,202,167,135,200,114,17,198,134,240,50,210,66,46,20,105,59,219,176,83,6],[217,81,105,162,62,173,202,22,100,176,107,240,242,250,164,98,192,83,37,245,158,59,209,136,82,68,222,94,116,236,213,108],[46,250,34,123,112,157,56,92,192,182,232,57,118,217,118,22,32,164,242,111,224,108,18,66,96,58,224,58,85,110,125,23],[16,42,19,211,119,136,185,109,109,29,165,1,219,152,10,44,132,222,223,248,44,55,243,132,153,175,25,162,73,229,60,178]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(200000, 32, 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([36,216,56,37,181,215,45,67,27,144,77,242,47,108,172,113,123,60,42,142,220,55,15,128,246,137,204,57,41,118,13,149], [250,90,150,222,222,233,181,78,37,36,39,43,6,11,96,191,115,219,28,11,85,147,22,164,120,99,252,70,193,82,224,105],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([88,240,70,21,220,89,223,107,130,236,156,148,103,234,81,211,0,99,152,54,65,194,95,57,221,130,134,155,65,187,236,230], [120,59,7,100,182,79,189,27,105,20,246,2,168,233,245,241,13,37,16,115,68,122,65,65,199,91,202,48,97,147,253,35], [64,46,122,213,191,252,177,63,102,26,94,197,232,121,243,84,139,162,50,73,5,245,225,31,104,75,58,194,66,150,44,179],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([11,106,50,11,136,8,241,60,143,138,116,116,162,202,254,180,245,26,254,148,217,106,106,177,69,8,246,11,126,150,235,55], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([198,61,238,251,118,208,202,43,22,29,24,106,197,14,125,4,101,244,242,61,106,111,134,141,211,76,133,158,105,84,37,221], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([80,105,187,252,53,103,151,169,189,26,78,190,202,82,63,223,62,181,126,38,210,88,235,20,132,188,210,89,50,215,65,34], "L", [51,81,41,30,209,24,202,175,129,158,173,96,212,81,168,179,20,91,177,209,8,159,223,140,158,213,12,171,36,156,187,158],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([218,191,36,201,23,171,58,55,87,197,153,69,102,97,149,23,25,113,237,35,121,36,146,90,252,77,86,17,197,59,43,212], "\x19Ethereum Signed Message:\n32", [161,104,20,2,216,169,40,2,247,103,60,208,241,132,36,227,232,134,134,228,29,58,25,217,18,219,63,185,192,206,203,31],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([94,72,84,1,255,176,185,177,120,194,142,82,2,120,183,255,189,14,81,195,109,50,77,57,245,187,22,93,98,195,169,197], [39,217,143,63,235,65,2,116,90,165,57,36,98,77,23,196,79,131,104,143,56,213,11,162,85,59,110,87,154,218,153,94], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([94,72,84,1,255,176,185,177,120,194,142,82,2,120,183,255,189,14,81,195,109,50,77,57,245,187,22,93,98,195,169,197], [130,127,120,82,49,242,237,148,4,55,189,31,99,186,165,53,23,15,80,93,111,60,232,24,104,206,93,204,119,72,175,22,215], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([64,249,228,147,176,209,158,167,143,88,219,163,170,193,229,225,140,72,254,116,35,146,223,56,85,3,155,17,139,148,212,119], [37,92,169,98,183,29,228,125,181,221,120,165,119,227,190,158,64,20,76,155,98,189,209,172,83,65,2,16,21,10,126,134], [74,17,97,67,109,12,144,7,155,201,74,90,78,153,23,25,13,215,100,86,180,78,185,1,238,251,65,134,252,197,203,27], "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([214,111,106,41,209,111,177,184,218,221,143,147,60,103,96,72,233,52,169,56,233,88,45,141,153,7,90,94,219,218,117,94], [227,179,14,201,212,9,58,89,182,1,125,171,40,105,109,70,152,99,202,198,180,74,34,100,62,109,154,149,216,55,137,196], [31,128,223,95,0,68,38,241,94,209,51,171,106,149,112,155,158,152,151,178,48,94,35,183,227,226,205,185,176,35,220,71], "lyotu",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([212,225,25,55,159,9,77,207,91,106,22,155,67,84,76,35,231,209,59,12,254,13,57,125,98,0,174,215,48,191,130,18], [209,62,186,166,90,254,252,56,216,239,59,117,245,199,248,23,147,102,217,124,149,146,5,158,74,100,25,244,112,1,219,248], [173,161,191,248,224,84,172,247,4,134,117,151,76,60,2,212,190,250,176,85,103,82,198,81,120,198,231,163,245,128,209,249], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([117,101,87,235,173,200,100,110,149,160,169,166,26,81,169,220,253,72,213,213,176,152,143,164,216,236,97,202,15,116,35,229], [93,107,166,200,121,37,121,166,134,68,69,188,85,10,235,65,130,150,247,240,172,127,219,241,157,26,171,64,78,224,90,63], [4,83,155,66,227,59,88,54,47,150,235,45,29,21,42,189,22,6,153,212,76,6,231,3,174,20,61,54,241,167,108,238], "rphrhz",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([246,48,222,236,14,211,15,251,249,27,171,200,121,82,150,154,227,175,177,121,93,254,104,163,119,127,236,125,249,67,255,203], [237,250,16,167,204,153,17,83,60,233,126,51,214,65,237,3,125,169,242,197,182,252,23,81,132,128,219,38,134,220,150,191], [202,36,92,15,101,249,239,78,220,8,165,30,88,211,99,49,165,4,193,196,153,198,50,230,220,149,43,33,174,109,210,212], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([196,69,85,5,156,204,142,220,179,190,79,128,208,15,160,133,149,9,36,120,202,177,85,212,4,89,52,255,165,138,207,235], [5,92,193,91,119,215,209,111,226,101,245,139,86,79,161,208,178,25,85,63,16,103,224,201,196,184,38,252,5,118,73,64], [67,228,4,239,238,46,0,47,78,70,30,128,181,184,62,76,112,154,211,70,230,83,6,42,147,24,144,152,229,72,197,107], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([220,207,116,29,158,87,21,74,116,160,106,162,235,187,229,109,247,34,238,77,137,155,6,145,76,188,188,230,122,138,33,249], [154,171,3,15,209,28,198,204,76,206,180,121,117,244,52,44,81,8,175,47,51,149,129,196,64,199,45,149,42,200,151,193], [208,250,96,45,233,147,132,184,63,185,77,163,195,251,244,164,107,51,155,20,16,41,70,104,83,61,152,219,51,193,38,109], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([88,228,114,5,207,206,202,90,12,195,131,1,99,68,198,16,89,173,150,34,212,76,193,225,80,121,24,77,130,254,212,76], [109,52,77,48,190,145,58,225,115,75,197,246,212,133,237,91,157,155,148,210,163,188,243,71,64,165,10,72,244,75,169,20], [0,187,142,5,120,1,185,79,248,197,217,168,147,197,247,80,111,124,53,240,227,100,254,115,247,203,213,116,125,175,240,73], "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([206,129,26,102,186,13,126,67,163,31,147,183,164,193,234,147,189,187,36,5,73,0,135,27,211,193,144,68,71,120,192,20], 102, 9999, [5,135,183,171,240,84,36,89,14,57,98,76,81,20,84,162,236,175,236,125,52,241,10,110,94,72,65,105,40,163,83,144], 9999,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([179,244,223,253,129,65,120,57,149,162,171,232,216,154,85,238,7,215,129,53,108,244,28,59,55,192,130,0,81,38,174,238], 3, [19,74,64,124,231,167,108,39,40,200,63,9,186,235,138,112,0,81,131,248,215,14,105,71,230,55,94,10,74,251,52,248], [2,19,190,79,35,103,243,194,80,171,134,123,204,4,174,91,137,25,78,90,39,184,141,111,10,180,116,210,49,235,214,238],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([11,111,129,30,86,177,105,106,41,105,136,29,235,24,87,206,45,210,45,66,130,239,43,18,98,208,37,237,28,236,125,176], [120,62,51,34,162,21,235,169,161,176,101,175,52,34,201,172,132,125,193,43,161,82,232,18,151,63,165,83,236,52,104,48,206,158,3,151,225,34,44,10,101,80,148,160,109,172,232,225,97,222,80,58,19,182,83,211,137,179,134,79,51,18,132,123,239,84,12,229,139,216,255,113,44,86,115,84,228,171,66,224,44,122,239,44,204,168,183,227,32,70,45,220,147,150,43,239,71,45,86,29,145,221,242,247,226,105,57,89,139,83,15,122,196,77,121,217,175,45,44,93,185,117,79,29,211,167,169,85,59,135,222,23,28,187,220,155,1,254,212,114,29,30,82,138,54,132,130,16,204,46,33,74,251,124,143,54,117,101,155,222,138],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([165,96,160,217,136,174,168,166,97,144,215,8,155,104,130,121,192,32,199,251,100,170,202,145,84,89,17,73,203,222,227,95], [70,4,156,95,235,120,65,122,236,159,115,129,45,178,243,38,144,161,31,210,76,120,205,243,158,20,43,124,245,48,174,68,168,185,52,244,57,212,245,106,184,173,39,60,59,53,12,105,210,29,142,19,151,231,149,174,64,224,125,24,6,245,16,44,34],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
