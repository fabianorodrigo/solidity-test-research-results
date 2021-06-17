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
    contractShartCoin = await ShartCoin.new({from:accounts[9]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[9]}');
    contractState = await State.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[3],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[2],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[4],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[9],contractProxy.address,contractTokenExchangeState.address,"listingID arg",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[9],contractProxy.address,contractTokenExchangeState.address,"listingID arg",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(45,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("djc3ll",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 57,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("IsLibrary", "4lrwa",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(30, "UsesExample", "6kxqu",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(200000, "trade.totalPrice", "0", 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("RevertWithReason", "djc3ll", 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("L", "\x19Ethereum Signed Message:\n32", "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(59, "IsLibrary", "L", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(49, "P", "Oraclize query was sent, standing by for the answer...", "6kxqu", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("ETH", "djc3ll", "1fx9jg", 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("RevertWithReason", ["4lrwa","Oraclize query was sent, standing by for the answer...","1fx9jg","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(60, "", ["Example","djc3ll","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","L","Oraclize query was sent, standing by for the answer...","call updateEthPrice","0jygyp"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(58, "RevertWithReason", ["costUSD","djc3ll","updateEthPrice called","1fx9jg"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("costUSD", ["4lrwa","IsLibrary","listingID arg","updateEthPrice called","P","RevertWithReason","Oraclize query was sent, standing by for the answer..."], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("3riygk", ["L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(30, "djc3ll", ["Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(95, "", ["updateEthPrice called"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("P", ["0"], 10,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("1fx9jg", ["costUSD","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(16, "0jygyp", ["djc3ll","nbrb9"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(18, "call updateEthPrice", ["call updateEthPrice","P"], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("1fx9jg", ["trade.totalPrice","RevertWithReason"], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("costUSD", ["PayableExample","Example","djc3ll"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(45, "2gttk8", ["costUSD","call updateEthPrice","Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(66, "RevertWithReason", ["RevertWithReason","1fx9jg","\x19Ethereum Signed Message:\n32"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("PayableExample", ["Example","IsLibrary","PayableExample"], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("costUSD", ["ETH","UsesExample","0","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(127, "djc3ll", ["djc3ll","P","Example","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(58, "4lrwa", ["","PayableExample","listingID arg","RevertWithReason"], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("1fx9jg", ["L","4lrwa","1fx9jg","0"], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("PayableExample", ["Oraclize query was sent, standing by for the answer...","L","costUSD","3riygk","1fx9jg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(160, "\x19Ethereum Signed Message:\n32", ["IsLibrary","updateEthPrice called","listingID arg","2xb8o5","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(98, "2xb8o5", ["P","costUSD","4lrwa","\x19Ethereum Signed Message:\n32","call updateEthPrice"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("2gttk8", ["6kxqu","","P","nbrb9","P"], 1023,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[90,249,26,73,208,7,135,208,210,51,115,205,90,105,0,199,116,134,34,154,245,172,31,134,235,167,145,252,210,43,125,247],[3,120,82,194,81,76,167,121,153,191,196,201,20,15,64,107,213,198,219,217,148,58,16,186,92,114,122,31,119,136,28,66],[33,99,209,72,190,220,237,17,210,144,224,193,25,142,52,204,253,71,237,43,96,86,207,185,68,187,48,203,216,50,65,131],[214,162,3,182,144,245,155,160,148,177,73,238,220,246,86,231,12,225,149,102,49,100,82,96,203,238,232,16,61,174,223,242],[244,50,103,187,76,240,14,154,28,20,65,212,152,236,157,97,33,66,61,249,86,49,238,184,216,31,114,160,234,169,52,81]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(1338, "4lrwa", [[233,224,122,188,101,55,239,50,116,163,172,138,211,192,40,160,155,208,187,115,75,254,70,29,44,40,243,9,51,1,160,210],[170,220,52,85,4,212,34,103,121,20,109,207,92,11,212,30,185,166,137,32,114,190,171,215,161,52,86,231,124,61,60,59],[241,196,205,166,200,210,200,139,182,177,4,134,237,23,162,191,120,196,248,23,21,109,193,223,54,72,242,183,217,95,8,242],[67,61,108,57,216,216,191,199,170,203,95,159,221,33,206,26,118,210,179,56,179,115,206,116,140,218,28,157,77,162,212,51],[163,50,109,199,140,95,250,230,66,119,217,83,152,67,27,134,90,197,11,167,89,117,129,160,189,229,21,40,193,254,17,119],[25,163,148,19,158,204,155,34,214,98,38,43,101,254,196,22,208,206,199,13,50,215,223,77,5,200,246,115,37,118,36,220],[144,136,81,166,227,229,62,187,26,228,115,243,149,181,169,45,198,210,171,126,195,78,106,38,193,69,199,6,130,228,33,124]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(88, "listingID arg", [[152,215,97,101,252,18,252,147,161,61,197,111,228,209,92,182,198,239,83,175,93,209,200,229,83,63,250,255,231,197,163,144],[146,139,154,59,26,27,62,1,163,39,1,180,173,241,98,236,212,130,60,13,233,221,119,87,216,224,230,205,93,89,6,2],[13,166,99,59,15,234,222,187,200,163,24,197,53,105,117,59,227,39,77,134,254,128,187,68,206,254,234,155,69,203,91,203],[221,111,126,61,149,132,83,48,3,49,129,56,205,27,181,43,241,239,93,64,128,60,192,200,180,199,206,89,32,17,232,18]], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("P", [[202,169,134,195,4,106,86,255,161,144,174,57,47,72,124,197,107,198,239,50,157,81,178,188,16,36,96,252,66,233,254,175],[7,81,179,141,233,163,198,107,240,234,185,110,140,135,108,211,106,173,109,37,26,24,102,90,38,118,96,105,13,235,39,97],[249,25,43,49,74,90,235,15,122,32,178,116,228,125,68,169,250,99,124,141,105,149,194,105,5,134,176,147,186,51,227,109],[145,77,77,67,92,138,66,82,115,250,213,83,51,151,250,2,216,235,123,112,30,26,148,85,56,15,99,184,38,219,155,29],[210,19,234,215,25,94,8,133,24,196,14,1,156,129,100,213,225,239,193,249,52,175,90,18,253,19,142,20,37,216,165,79],[43,191,253,139,121,29,43,212,66,183,0,94,36,214,101,179,98,210,231,83,12,106,205,212,1,54,108,250,40,197,161,55]], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("4lrwa", [[119,169,141,16,104,14,194,164,86,202,116,20,80,71,28,159,85,157,44,26,9,113,251,200,40,120,41,161,127,107,243,159]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(4, "UsesExample", [[209,109,253,6,252,180,241,104,176,185,94,166,21,65,78,3,196,55,63,254,23,144,174,150,101,242,54,14,106,205,246,112]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(88, "costUSD", [[192,1,178,32,85,223,94,205,192,198,217,74,77,30,202,14,81,148,139,235,235,41,79,171,251,217,220,24,213,95,223,162]], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("PayableExample", [[5,241,84,130,61,42,92,95,185,49,251,46,33,155,211,192,170,225,193,48,6,34,66,64,78,70,127,7,52,83,29,67]], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("", [[88,116,138,16,39,225,227,13,212,253,216,16,208,159,69,243,165,111,33,180,66,132,161,153,177,238,231,56,125,123,84,223],[179,165,12,86,170,100,138,113,244,23,140,109,107,197,120,218,71,37,93,139,100,191,190,45,2,25,101,166,83,43,137,75]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(103, "call updateEthPrice", [[159,77,149,122,41,117,166,158,9,163,232,119,31,113,100,0,115,116,97,144,84,241,178,21,187,54,5,192,36,74,134,113],[23,131,194,60,106,182,112,23,254,110,163,237,90,21,252,48,205,33,177,114,85,140,126,53,154,253,187,232,130,124,73,111]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(16, "call updateEthPrice", [[72,96,178,26,95,15,164,224,139,200,46,116,95,115,60,111,51,127,57,164,189,170,31,249,34,206,95,61,227,127,254,168],[86,145,140,15,7,66,89,86,232,140,188,96,16,195,166,135,70,245,62,247,209,115,105,83,121,17,151,69,87,237,31,104]], 61,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("Oraclize query was sent, standing by for the answer...", [[132,238,130,46,213,42,147,194,200,137,156,197,94,223,130,98,115,248,223,58,141,0,18,246,167,185,39,147,238,243,80,78],[76,254,252,110,82,72,121,131,228,16,106,35,21,49,166,216,110,115,117,140,25,109,204,155,115,118,130,30,100,225,110,53]], 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("2gttk8", [[160,144,79,232,242,230,89,140,78,83,64,145,101,183,105,141,224,219,163,209,16,173,14,176,171,41,164,168,49,97,167,41],[243,174,167,138,122,131,117,127,173,18,28,221,145,14,92,49,53,107,74,14,199,122,18,141,63,233,1,68,231,166,248,68],[3,176,208,196,136,201,83,164,144,236,231,99,129,166,98,201,251,24,249,173,108,147,6,154,73,95,234,80,82,55,83,190]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(88, "listingID arg", [[91,212,122,206,72,33,81,126,96,72,246,45,4,168,85,80,143,252,230,191,161,74,234,233,86,107,56,178,83,238,0,21],[25,61,22,94,249,144,91,93,151,129,23,83,63,77,185,141,121,6,122,253,238,94,183,16,69,181,210,167,64,207,7,141],[185,137,227,212,58,118,49,61,75,220,23,184,230,188,251,117,9,160,90,164,36,142,32,196,235,255,129,248,252,164,210,7]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(31, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[236,137,68,164,47,2,127,30,201,27,199,67,39,100,200,28,192,142,6,107,69,252,239,46,192,122,105,3,151,104,130,157],[2,145,24,97,236,244,41,49,233,11,112,12,190,169,19,44,106,125,1,136,38,94,60,227,180,66,169,235,243,152,215,95],[112,176,46,130,218,204,193,45,21,52,16,246,230,31,215,33,50,176,246,65,56,68,142,226,149,32,173,244,48,105,243,25]], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("2gttk8", [[118,128,22,65,31,233,164,106,5,86,19,149,178,208,84,232,60,64,223,237,217,214,250,83,75,117,189,24,46,218,75,249],[113,205,230,23,180,112,61,103,255,26,5,198,117,106,128,212,16,192,64,240,189,173,67,230,13,128,195,24,96,28,174,230],[64,10,182,96,180,252,88,26,127,129,83,231,165,211,216,254,187,192,146,100,126,254,181,107,79,131,47,129,101,155,76,64]], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("IsLibrary", [[28,255,235,49,232,146,131,175,88,54,227,150,69,183,126,248,206,159,114,180,53,188,242,17,216,26,185,33,194,226,33,94],[92,1,28,206,81,158,229,39,161,190,154,113,112,80,193,16,50,104,122,180,205,51,156,171,128,68,248,167,89,206,86,42],[199,236,191,85,166,222,201,226,188,89,49,1,50,252,72,221,122,242,99,108,34,167,75,36,124,222,211,225,76,57,70,182],[109,92,195,72,16,80,192,173,61,98,58,234,154,64,113,46,59,27,155,214,194,23,7,193,46,195,133,207,226,211,169,130]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(97, "PayableExample", [[94,254,206,13,155,62,58,173,120,99,159,58,183,105,184,84,52,139,61,80,235,48,133,166,134,137,164,78,46,222,213,107],[70,224,70,125,46,229,24,153,105,69,107,127,251,122,98,190,76,246,84,243,53,69,126,195,207,186,109,171,154,30,115,3],[100,230,217,46,96,163,76,25,154,102,69,110,34,49,59,114,228,143,189,37,170,143,204,88,67,177,254,15,28,147,195,3],[153,63,217,124,138,134,26,123,189,164,111,250,143,158,77,176,151,85,245,14,111,4,133,23,12,232,84,201,157,190,46,157]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(1532892062, "1fx9jg", [[71,89,43,150,23,176,172,247,99,70,79,62,201,118,185,175,37,57,36,199,118,1,91,199,171,103,74,92,130,209,49,21],[113,53,99,34,172,255,132,206,39,195,92,140,102,136,187,52,19,210,249,214,218,57,100,137,215,249,167,79,166,115,60,236],[218,228,60,87,136,100,187,180,243,41,30,74,4,138,242,28,176,224,65,164,41,200,224,157,237,91,137,85,91,99,98,122],[120,234,204,248,228,2,12,35,164,140,218,21,142,195,21,89,10,212,227,51,169,82,221,207,66,122,244,107,207,212,53,41]], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("updateEthPrice called", [[128,241,7,234,88,34,181,63,20,170,86,174,69,230,3,141,73,108,88,250,238,241,147,203,221,187,200,184,107,46,77,245],[151,38,117,67,96,109,110,227,106,169,28,145,213,36,28,128,232,164,237,96,30,195,26,74,57,152,126,234,221,178,124,47],[39,100,128,229,79,55,174,8,85,13,129,105,20,240,47,207,68,151,159,150,30,24,27,20,13,49,107,21,83,92,66,15],[211,114,250,188,63,171,57,140,49,97,21,154,212,236,152,131,65,250,249,125,44,235,23,150,119,101,5,37,230,135,185,91]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("2xb8o5", [[178,152,211,12,40,172,63,145,201,53,74,144,54,130,88,223,199,39,98,28,173,116,45,202,99,61,35,147,152,36,231,92],[238,217,233,46,97,213,245,122,17,50,45,12,15,208,224,216,20,119,16,92,128,188,139,221,89,39,133,159,173,145,81,78],[97,177,62,137,175,99,94,77,1,83,243,59,29,122,33,123,85,162,211,183,229,10,131,103,190,212,190,234,141,129,220,109],[158,12,27,74,201,74,20,43,51,251,16,13,81,128,43,79,78,139,199,65,28,46,170,127,126,176,234,136,65,77,112,139],[130,123,196,217,18,47,77,12,19,39,92,147,36,111,149,182,178,150,119,201,140,70,67,129,49,52,179,24,151,137,146,191]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(10001, "2gttk8", [[23,46,92,241,76,140,173,160,78,103,83,244,95,59,168,106,137,18,253,139,167,23,65,4,5,202,131,109,29,102,36,123],[108,38,116,98,214,195,239,58,54,137,52,95,110,179,106,153,126,93,179,53,107,158,42,122,19,168,14,228,15,80,101,102],[244,238,0,30,183,127,130,82,39,80,19,59,13,195,94,217,120,18,14,123,109,209,167,54,152,237,120,116,238,162,47,119],[37,239,229,167,254,83,22,208,217,222,180,221,201,15,154,169,122,190,228,228,194,247,17,199,160,249,172,219,241,197,54,74],[174,12,127,152,240,121,126,239,140,165,133,81,129,159,193,84,72,141,74,106,253,147,184,8,92,110,101,70,237,120,99,80]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(10000, "UsesExample", [[113,188,7,190,248,242,198,171,52,134,101,232,231,48,44,40,173,166,25,219,64,133,68,200,120,226,132,238,235,78,222,217],[46,180,179,145,233,75,130,198,20,127,220,2,208,70,66,221,115,215,110,96,22,69,171,90,9,157,77,26,39,155,43,149],[83,78,192,165,58,161,129,54,213,32,228,94,119,171,231,137,206,195,22,143,37,80,58,245,114,140,196,41,137,238,161,33],[1,138,233,23,11,217,192,246,81,15,221,176,148,73,247,187,27,172,52,245,171,30,106,154,143,149,146,17,85,183,245,125],[220,182,137,113,117,90,249,155,93,91,245,121,70,174,33,8,68,36,49,12,67,71,247,21,161,100,144,40,132,33,30,124]], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("ETH", [[255,205,69,73,9,173,21,51,223,226,241,252,70,216,14,69,171,69,37,114,26,162,125,254,118,30,221,206,169,143,204,228],[117,199,241,60,227,246,152,114,22,124,82,113,184,254,174,235,141,75,29,222,147,218,203,67,43,127,100,14,32,80,14,75],[92,216,218,237,135,243,186,156,107,116,104,117,210,222,132,144,137,198,7,180,12,132,26,78,118,156,138,238,220,43,66,55],[51,184,39,22,139,43,51,206,93,253,38,240,197,110,217,101,38,16,254,184,42,227,155,146,219,192,58,12,232,99,176,123],[181,70,232,7,101,230,224,38,142,199,70,137,17,3,202,109,167,137,145,60,2,143,83,197,202,31,186,35,181,30,22,71]], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([235],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[2],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(19,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("Example",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("RevertWithReason", "L",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("trade.totalPrice", "2xb8o5",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("RevertWithReason", "PayableExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("listingID arg", "listingID arg", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("1fx9jg", "RevertWithReason", "Oraclize query was sent, standing by for the answer...", "",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("updateEthPrice called", "\x19Ethereum Signed Message:\n32", "L", "RevertWithReason", "4lrwa",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("costUSD",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("2xb8o5", 65,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("0", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("", 7,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("\x19Ethereum Signed Message:\n32", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(1338,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["2gttk8","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","2gttk8","4oy7y4","0jygyp","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[52,156,73,173,73,179,231,105,171,7,192,226,97,31,107,226,41,50,240,192,113,31,237,198,153,218,69,131,136,41,66,30],[124,24,181,51,160,222,238,40,66,253,104,206,150,215,166,255,193,233,120,153,96,183,17,205,240,255,140,7,187,145,171,100],[125,224,160,178,216,36,89,62,176,35,83,156,34,43,100,227,182,121,191,200,238,37,167,29,144,75,92,202,40,171,121,3],[52,241,111,86,109,214,219,151,225,151,112,251,122,39,72,33,12,102,37,43,254,143,234,133,11,30,46,198,43,104,149,66],[206,236,10,207,132,126,103,138,40,68,169,139,233,114,8,68,172,47,91,220,24,74,183,15,224,180,244,165,224,187,240,228]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(58, 256, 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([235,97,175,68,172,174,245,45,201,150,254,179,129,225,121,166,79,52,22,92,216,242,186,133,161,141,42,82,165,3,10,128], [164,125,63,70,89,107,151,11,79,196,219,180,247,129,67,233,44,233,76,170,173,243,86,104,234,167,228,57,15,34,107,252],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([161,36,166,141,15,148,248,251,51,213,43,16,66,155,156,172,130,212,143,159,97,117,157,179,218,119,145,114,84,167,68,237], [56,86,240,174,98,132,136,65,206,224,167,203,203,168,127,6,38,98,231,247,218,243,156,88,14,221,119,242,99,182,235,137], [43,55,162,48,211,32,64,6,115,28,214,217,158,196,164,152,235,180,17,53,20,54,91,64,110,72,82,60,62,80,22,157],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([132,112,29,71,253,58,230,88,64,98,239,42,118,136,171,174,15,188,103,232,123,134,90,95,216,54,221,61,96,83,34,89], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([237,17,10,206,245,185,70,172,238,17,53,68,170,243,182,92,106,192,102,56,127,83,4,22,220,113,6,12,123,57,68,190], 200000,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([242,4,84,7,93,91,37,60,75,85,22,230,133,143,107,137,184,60,91,99,211,64,66,103,209,33,198,174,15,19,205,102], "2xb8o5", [37,221,47,62,235,154,51,1,147,237,172,113,123,55,167,97,246,183,53,135,172,169,14,109,207,11,21,202,124,126,187,101],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([165,219,147,116,43,209,2,22,61,109,160,32,100,150,113,250,129,227,120,122,164,29,192,143,181,74,147,90,187,212,50,151], "RevertWithReason", [72,163,76,229,38,178,112,243,121,104,206,95,189,154,101,103,178,232,228,82,205,248,147,68,90,52,214,197,63,10,64,213],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([16,218,17,94,46,50,229,26,145,243,119,185,36,253,114,143,52,255,73,223,58,38,42,88,200,114,223,102,130,44,45,25], [231,180,39,52,224,203,75,16,202,244,192,64,202,89,85,96,188,93,217,80,209,226,174,33,53,162,223,71,37,241,116,174], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([16,218,17,94,46,50,229,26,145,243,119,185,36,253,114,143,52,255,73,223,58,38,42,88,200,114,223,102,130,44,45,25], [229,36,11,32,189,2,145,245,146,247,65,135,224,77,117,71,197,170,230,55,45,18,32,252,6,149,114,59,20,14,230,255,232], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([142,87,127,232,8,38,202,31,158,117,12,233,228,168,153,243,113,179,56,185,167,33,130,200,71,194,188,102,60,2,58,204], [232,18,13,98,102,101,72,18,81,38,15,245,243,133,231,81,235,123,51,232,189,188,192,168,13,188,111,72,166,161,88,119], [109,143,170,97,20,191,118,118,128,211,74,8,121,208,59,116,26,205,250,156,82,46,59,229,231,61,201,89,159,139,132,191], "3riygk",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([135,57,147,145,95,158,94,115,96,148,118,95,42,157,131,119,23,157,242,57,180,234,237,32,251,110,132,16,129,41,66,100], [224,38,200,24,86,70,22,170,212,37,140,252,48,224,71,102,119,128,51,135,181,131,19,206,222,133,97,145,104,118,160,71], [24,132,149,59,189,20,67,129,149,120,139,56,189,12,113,161,91,252,128,12,63,228,164,224,7,8,164,190,214,136,5,129], "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([185,79,190,207,101,88,116,60,149,139,196,166,91,13,183,25,224,207,142,32,253,26,209,49,136,42,201,132,245,25,189,161], [218,145,153,136,143,2,224,16,128,235,55,138,148,147,205,174,176,193,182,136,144,227,115,180,238,250,144,179,63,252,55,3], [250,203,202,254,68,81,16,219,202,1,32,237,132,169,116,219,177,203,6,59,230,152,51,154,155,156,73,227,244,250,44,219], "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([188,158,224,74,199,230,61,198,196,167,245,11,136,110,206,153,36,95,40,66,227,129,104,203,134,175,94,2,103,133,23,175], [6,102,69,93,41,7,99,9,168,13,57,9,223,5,191,21,229,120,144,172,113,159,216,29,42,69,166,208,126,112,117,131], [160,187,110,131,151,66,10,152,0,231,251,242,142,18,42,236,98,161,63,39,68,222,190,13,9,35,247,70,161,129,51,218], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([179,124,191,228,119,78,56,231,167,135,226,144,152,84,62,107,239,182,137,109,27,163,64,155,73,154,197,254,53,140,55,204], [27,168,20,195,175,4,50,117,105,133,204,102,40,236,173,10,171,61,157,224,5,176,62,25,118,255,131,0,94,60,27,201], [147,247,24,30,252,200,113,57,212,145,247,59,91,76,190,238,30,101,60,152,186,85,113,70,128,90,107,255,244,59,238,82], "2xb8o5",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([102,245,253,254,242,56,22,253,3,26,92,132,112,6,145,255,237,17,10,236,77,131,57,15,255,40,232,81,146,40,40,29], [128,60,17,142,153,13,163,48,164,176,222,165,89,24,219,123,150,169,186,26,200,42,143,5,170,161,241,121,19,235,148,21], [125,216,67,186,240,228,209,9,207,233,41,138,76,74,43,61,245,78,53,145,168,142,94,58,155,133,193,42,183,1,218,252], "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([20,81,93,193,233,237,101,4,58,54,68,153,26,245,74,82,77,161,97,106,148,235,115,131,233,188,130,19,101,32,97,224], [116,160,171,203,145,37,106,148,84,197,124,81,173,80,3,97,24,145,245,129,225,115,15,113,236,93,66,223,8,24,166,209], [223,191,195,150,139,31,240,49,251,244,202,97,102,93,247,59,138,236,160,174,84,12,10,244,55,17,89,73,150,201,126,246], "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([143,120,187,29,41,119,0,49,30,191,176,152,251,134,162,152,0,63,236,42,205,115,250,31,124,125,44,12,44,132,42,237], [33,50,225,200,82,9,116,9,228,254,249,183,135,8,171,217,150,177,53,35,64,16,31,247,150,115,6,86,113,14,107,86], [139,95,172,154,181,167,57,37,116,122,239,154,238,124,66,55,129,193,213,67,76,177,120,6,180,93,137,225,125,174,11,214], "0",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([185,33,127,242,217,169,191,142,118,37,154,125,234,190,22,188,176,223,157,247,125,49,235,20,88,255,236,243,250,45,99,85], 65, 101, [57,166,146,117,165,82,118,233,59,173,116,16,7,80,154,248,54,218,220,235,88,252,138,133,155,162,63,128,253,186,231,79], 10,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([98,142,115,128,92,8,2,11,99,24,188,150,225,65,85,129,250,111,81,54,177,80,104,113,203,62,74,25,46,143,89,0], 28, [193,177,212,130,148,79,173,99,150,251,42,25,214,108,96,230,32,132,145,19,212,184,218,82,115,146,104,70,12,103,65,196], [129,73,52,23,86,192,101,251,49,9,23,111,177,73,115,85,34,40,205,49,157,161,243,197,174,109,157,17,221,90,97,118],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([147,100,141,92,199,142,166,179,99,151,145,219,69,218,10,221,192,140,43,181,171,113,155,44,51,224,142,88,43,171,186,112], [185,24,128,171,156,150,171,254,98,95,171,127,36,151,74,176,226,206,27,35,49],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([230,12,97,134,206,230,39,151,211,170,0,38,254,241,215,56,245,90,246,127,145,142,48,137,175,245,204,43,51,252,165,89], [135,149,3,1,50,8,246,81,76,124,109,120,18,202,84,116,6,18,111,111,68,103,231,13,236,231,179,144,126,24,85,71,100,57,180,2,89,147,137,226,240,65,67,212,210,32,247,222,106,33,17,205,157,120,19,15,255,61,51,154,100,24,19,25,79],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
