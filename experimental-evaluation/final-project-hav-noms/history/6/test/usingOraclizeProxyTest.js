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
    contractState = await State.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[9],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[9],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[3],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[7],contractProxy.address,contractTokenExchangeState.address,"updateEthPrice called",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[7],contractProxy.address,contractTokenExchangeState.address,"updateEthPrice called",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(61,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("L",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("0", 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("P", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(66, "listingID arg", "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(2014223716, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "\x19Ethereum Signed Message:\n32", 3,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("\x19Ethereum Signed Message:\n32", "trade.totalPrice", 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("updateEthPrice called", "listingID arg", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(87, "RevertWithReason", "ETH", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(21, "P", "ihrtcf", "dqgnua", 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("PayableExample", "IsLibrary", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("Oraclize query was sent, standing by for the answer...", ["Oraclize query was sent, standing by for the answer...","Oraclize query was sent, standing by for the answer...","Oraclize query was sent, standing by for the answer...","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(30, "dqgnua", ["ihrtcf","PayableExample",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(29, "IsLibrary", ["UsesExample","costUSD"], 257,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("avnaep", ["updateEthPrice called","PayableExample","PayableExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","IsLibrary","0","trade.totalPrice","call updateEthPrice"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("PayableExample", ["IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(30, "call updateEthPrice", ["P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(162, "UsesExample", ["ihrtcf"], 10001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("dqgnua", ["avnaep"], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("", ["P","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(161, "", ["","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(16, "dqgnua", ["P","ihrtcf"], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("L", ["dqgnua","0"], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("ihrtcf", ["ihrtcf","ihrtcf","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(57, "ihrtcf", ["","","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(101, "updateEthPrice called", ["updateEthPrice called","Oraclize query was sent, standing by for the answer...","0"], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("RevertWithReason", ["57qx0t","UsesExample","Example"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("UsesExample", ["call updateEthPrice","RevertWithReason","call updateEthPrice","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(257, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["avnaep","Example","","57qx0t"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(200000, "L", ["okyabv","call updateEthPrice","","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 162,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("RevertWithReason", ["trade.totalPrice","fhh4g","trade.totalPrice","trade.totalPrice"], 102,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("costUSD", ["","ihrtcf","\x19Ethereum Signed Message:\n32","xho27j","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(8, "okyabv", ["ETH","P","0gar6","call updateEthPrice","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(8, "\x19Ethereum Signed Message:\n32", ["UsesExample","call updateEthPrice","","fhh4g","\x19Ethereum Signed Message:\n32"], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("o81cas", ["","1g08br","ihrtcf","xho27j","trade.totalPrice"], 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("updateEthPrice called", [[92,78,61,133,243,178,186,3,2,165,70,115,223,246,232,187,47,16,23,230,149,232,185,131,183,10,217,47,211,163,136,89],[139,156,178,169,192,214,123,158,177,1,137,23,79,42,163,162,1,28,193,200,87,247,23,189,128,1,179,167,208,15,53,137],[252,212,44,54,166,4,15,113,99,151,145,179,65,185,34,197,188,239,226,139,101,224,202,38,124,227,203,126,159,96,206,38],[252,96,160,74,169,115,129,30,180,122,138,204,147,124,158,157,86,91,89,59,253,25,126,83,235,142,99,128,55,168,64,171],[74,177,248,95,17,215,19,81,235,112,238,193,147,247,47,172,103,50,158,112,227,25,102,226,108,143,4,58,115,157,71,25],[160,210,94,187,163,63,24,19,239,99,80,1,74,180,176,51,21,202,107,87,228,180,197,217,203,65,188,194,198,252,56,251],[78,162,240,58,206,237,84,88,164,52,130,239,92,228,39,45,221,67,205,81,128,207,14,241,145,235,236,6,14,162,49,165],[17,207,125,168,210,47,113,68,73,202,230,13,81,29,246,229,69,63,126,174,192,47,145,100,248,238,255,54,17,196,34,174],[216,230,118,204,58,139,123,116,130,38,136,132,47,212,150,128,136,108,253,191,201,140,222,146,148,89,193,225,156,156,236,173],[196,155,203,11,30,113,220,155,58,80,52,217,149,164,65,115,171,170,45,62,195,32,200,67,241,254,140,249,233,169,26,0]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(7, "0", [[167,85,224,147,119,22,70,65,84,58,4,249,75,212,207,177,253,55,151,14,111,21,91,1,99,140,123,89,157,26,234,200],[122,228,166,107,129,65,114,79,53,92,119,48,157,27,89,34,204,69,26,46,143,160,253,178,30,28,76,170,130,192,238,182],[171,153,240,17,98,195,35,254,66,21,248,202,233,129,18,234,78,24,33,169,165,6,159,58,242,202,76,228,214,6,9,10],[60,211,247,210,107,124,231,59,125,246,51,219,242,126,26,11,165,182,94,144,95,133,233,88,244,17,151,129,63,152,66,179],[241,91,224,119,51,223,0,201,239,57,15,84,57,25,103,124,46,253,22,81,80,59,222,135,126,43,24,111,83,233,168,164],[197,173,4,108,170,125,127,202,239,193,158,148,165,244,100,248,90,174,146,175,181,249,137,149,180,194,90,214,126,40,216,50]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(2014223716, "RevertWithReason", [[46,121,208,153,176,37,126,163,5,35,85,225,167,185,221,124,9,17,150,29,105,103,55,254,26,60,132,195,65,25,107,5],[115,211,45,34,55,15,215,145,25,203,108,195,7,184,243,136,42,94,204,170,126,186,150,209,245,138,17,59,150,145,161,72],[183,99,111,254,40,10,184,105,30,37,114,247,56,229,121,32,142,191,187,143,184,148,184,94,8,52,255,175,98,59,6,64],[252,82,168,215,46,139,154,135,157,124,118,31,229,53,172,97,35,33,255,223,128,1,92,245,189,224,54,1,139,171,80,192],[63,226,152,62,87,220,38,58,82,106,161,108,173,68,172,230,34,38,244,188,209,245,147,214,217,91,237,72,74,23,85,114],[90,191,39,5,188,36,50,247,225,255,164,236,54,155,40,208,86,120,18,134,35,94,232,76,174,139,120,232,35,149,39,207],[65,165,10,153,123,186,75,82,89,34,118,88,53,160,191,150,78,62,81,3,212,55,2,251,57,141,214,123,220,118,169,238],[183,64,143,155,33,103,155,248,12,138,119,97,62,74,251,30,112,16,117,223,39,202,58,162,253,54,48,14,23,244,195,71],[220,203,128,137,143,230,51,202,199,121,204,27,7,5,252,14,180,231,190,113,4,112,254,237,216,192,164,135,247,207,88,170]], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("0", [[214,39,248,21,143,170,48,177,60,84,88,233,212,195,220,187,165,22,41,120,8,91,175,163,37,70,63,114,48,231,90,167],[197,185,220,125,25,85,230,15,99,177,214,252,223,240,68,142,105,105,113,115,12,90,242,65,240,146,53,76,84,199,71,11],[199,221,61,165,95,59,131,102,178,78,98,31,173,72,136,86,29,248,22,254,70,234,225,16,60,166,29,160,78,9,70,249],[32,237,90,201,81,191,155,251,167,211,54,173,7,212,71,249,162,201,17,73,125,223,107,241,54,215,214,24,225,120,199,21],[183,233,9,88,16,133,160,244,113,234,69,28,253,255,127,33,0,248,120,97,137,149,95,249,64,139,59,28,230,248,82,161],[26,1,161,209,208,42,2,15,68,43,151,173,202,208,15,106,221,253,24,113,254,13,222,214,244,97,101,160,225,167,32,198],[120,49,217,238,241,110,69,109,63,2,140,150,69,201,73,149,153,216,161,9,207,43,224,72,123,85,241,1,158,79,129,205],[31,241,199,49,132,182,53,6,19,120,218,231,177,150,191,64,23,157,1,51,52,137,239,124,97,90,129,72,208,11,135,90],[53,92,43,88,131,146,149,158,91,88,246,231,101,153,228,33,75,121,253,27,27,189,149,2,132,152,26,30,27,72,192,137],[79,215,113,49,233,165,162,61,86,125,255,5,94,33,7,138,86,153,141,239,211,64,145,78,110,132,35,93,200,74,229,148]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("\x19Ethereum Signed Message:\n32", [[207,182,40,184,127,244,233,99,23,71,145,90,117,225,242,5,186,115,126,107,152,254,120,221,113,230,234,76,30,175,127,4]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(160, "avnaep", [[207,51,65,154,199,119,119,204,250,10,252,172,100,165,25,173,236,236,233,165,64,43,138,209,131,19,14,218,104,171,5,128]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(19, "IsLibrary", [[30,20,244,92,192,219,25,229,244,196,149,87,203,24,91,172,170,37,106,165,170,136,47,14,140,152,120,214,243,83,88,31]], 1336,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("trade.totalPrice", [[220,155,18,50,88,121,213,191,67,206,90,173,188,198,17,153,107,88,219,88,189,62,86,159,98,237,82,174,249,8,151,101]], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("", [[242,40,251,162,128,133,79,139,208,163,139,218,180,50,81,181,164,225,192,181,211,215,122,179,180,97,12,106,133,84,160,151],[205,187,166,243,155,88,234,132,16,34,237,219,182,184,158,62,174,130,229,20,98,223,39,100,58,200,71,16,214,100,71,140]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(200000, "RevertWithReason", [[136,53,125,238,60,180,72,74,13,246,57,193,32,224,15,208,87,255,167,68,47,21,175,112,198,199,115,44,62,215,62,227],[85,155,108,250,113,197,98,37,149,53,89,170,249,54,221,227,48,90,23,203,130,66,12,46,108,2,181,48,23,13,159,244]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(162, "IsLibrary", [[233,47,13,132,76,198,254,208,168,74,137,24,67,198,121,188,233,218,153,77,218,30,157,183,16,108,214,157,123,6,0,124],[67,83,71,167,140,249,230,149,154,252,224,245,131,102,154,41,181,118,226,107,110,40,213,187,228,1,70,98,83,112,5,222]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("0", [[222,62,132,210,174,160,141,123,87,181,222,254,156,231,202,58,187,177,144,167,98,50,42,180,77,41,81,91,130,133,141,130],[109,81,228,142,65,95,99,37,229,116,221,232,110,15,201,235,164,56,74,143,90,177,45,80,50,163,33,219,58,25,252,201]], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("fhh4g", [[224,221,29,13,153,109,63,24,168,52,123,190,155,174,228,232,31,236,51,43,220,14,172,235,171,122,90,165,107,78,131,144],[24,25,224,194,171,96,164,14,14,150,233,49,196,14,228,0,239,83,247,194,81,134,3,98,176,172,27,168,148,138,127,1],[74,195,76,95,250,239,209,46,229,67,17,10,13,165,47,123,166,218,15,219,139,224,148,185,17,254,213,37,241,98,225,23]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(66, "IsLibrary", [[2,144,17,209,55,101,161,0,101,86,180,251,157,78,195,15,42,120,36,24,189,49,85,234,133,173,15,73,24,111,186,233],[31,136,139,35,40,187,189,81,158,195,108,223,54,159,218,81,39,185,4,155,141,67,77,23,224,230,81,145,189,218,252,202],[24,173,212,217,236,161,187,229,172,244,124,235,224,41,134,79,165,185,71,21,12,252,39,233,175,121,127,110,188,1,140,206]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(18, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[204,246,189,25,225,60,115,246,191,193,64,148,68,203,139,24,180,186,6,43,249,151,46,98,21,107,12,86,187,88,85,241],[249,35,46,49,86,61,224,109,227,152,209,50,40,206,248,138,66,187,45,142,125,96,155,51,129,44,48,129,168,112,22,180],[220,254,13,211,205,152,246,0,180,201,205,142,65,7,136,217,137,89,10,93,12,205,229,5,32,5,98,130,247,189,34,174]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("xho27j", [[190,119,253,119,19,143,227,255,124,197,42,141,137,202,244,219,153,21,0,161,119,184,178,118,12,249,182,190,185,194,66,67],[186,76,93,142,56,186,54,213,222,128,95,161,130,252,52,121,244,1,148,100,91,82,101,143,79,54,91,43,78,135,84,70],[104,118,83,240,36,54,79,49,19,240,148,218,33,23,204,226,210,55,202,127,13,140,237,215,170,227,212,10,27,222,226,91]], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("yaxrhc", [[180,114,53,25,181,31,6,216,112,95,11,39,230,37,38,174,47,153,164,66,19,165,228,124,230,177,177,185,167,74,141,116],[8,24,175,151,112,220,182,192,8,162,61,222,75,102,15,8,120,67,245,135,59,187,52,7,42,238,166,49,23,209,235,81],[181,24,148,225,54,14,183,129,250,133,10,70,253,224,96,8,109,133,111,108,62,93,11,203,152,226,122,40,251,235,143,150],[188,205,128,84,115,209,71,142,127,181,194,22,105,143,87,241,164,70,220,233,114,81,167,174,86,89,131,134,113,183,16,8]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(48, "ihrtcf", [[0,233,198,89,227,246,63,75,173,193,168,220,205,219,64,195,84,143,206,83,143,77,51,25,69,200,5,51,216,165,5,13],[106,48,95,24,209,165,117,197,49,150,115,38,77,218,60,74,110,177,38,30,195,193,57,217,66,33,155,80,204,106,98,194],[76,158,202,109,46,90,96,195,1,24,143,78,140,135,250,217,209,47,16,88,17,82,230,221,82,197,217,53,92,129,14,120],[91,222,51,188,119,190,237,72,48,2,118,132,12,249,12,200,84,193,153,208,95,152,64,31,73,146,219,215,202,33,168,114]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(101, "47cra", [[107,33,200,104,105,38,40,225,238,243,250,100,47,13,93,133,218,207,125,164,113,181,189,241,50,51,3,134,231,158,64,224],[237,113,198,245,239,99,214,70,138,67,175,115,118,64,156,165,137,46,69,151,126,1,227,36,149,125,72,126,242,113,73,228],[190,48,195,205,144,174,31,215,100,33,9,246,67,92,98,139,103,14,122,65,118,5,250,253,198,238,252,233,179,39,104,243],[13,209,233,161,109,112,122,245,163,119,16,195,0,13,106,62,231,47,250,120,77,52,44,19,130,229,44,148,153,239,116,154]], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("UsesExample", [[207,96,235,119,83,17,232,24,88,143,190,232,247,157,229,42,28,34,81,152,3,230,136,170,219,62,38,91,163,254,7,165],[199,78,121,139,135,246,223,133,26,117,50,76,231,79,227,212,95,41,145,17,79,112,80,16,44,81,29,46,248,117,210,203],[9,133,210,166,83,217,63,188,128,130,203,122,46,157,200,75,199,235,171,26,136,199,32,196,89,62,200,161,120,94,30,90],[110,82,101,107,91,32,244,62,128,59,212,97,170,114,41,124,169,164,90,151,175,252,239,69,7,161,123,186,21,200,122,238]], 2014223716,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("57qx0t", [[135,228,192,254,19,212,172,30,81,103,163,78,48,90,20,23,159,167,89,77,28,122,60,48,146,100,212,81,127,16,4,55],[45,105,3,210,213,47,139,211,90,181,124,138,160,175,178,204,58,230,49,228,75,203,65,105,9,114,82,182,174,115,237,107],[122,248,72,28,171,27,234,238,235,98,15,103,109,57,83,243,104,86,163,32,229,250,159,78,40,138,191,85,170,174,7,217],[74,135,211,24,0,178,65,86,193,98,220,102,23,154,127,174,103,93,71,157,194,105,132,173,31,89,71,23,175,143,18,245],[54,48,19,164,94,73,114,22,233,145,125,102,172,190,193,109,135,80,37,158,173,204,27,243,113,239,189,218,136,247,33,141]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(1532892064, "agb6eh", [[120,47,191,14,191,70,5,42,79,201,233,26,44,201,203,104,141,112,124,96,97,49,19,220,0,117,114,33,88,38,44,1],[81,15,139,57,101,57,179,223,79,180,1,3,94,241,212,124,97,23,160,74,120,44,84,94,246,116,92,43,114,177,179,182],[92,151,113,112,20,220,206,138,114,238,12,35,117,230,218,123,16,194,70,27,188,115,23,124,101,182,3,179,56,255,234,61],[205,211,68,211,226,221,234,51,2,71,167,181,33,222,37,89,229,218,11,161,79,216,134,164,239,48,92,16,17,119,93,200],[129,88,145,164,77,169,220,3,95,191,237,53,31,71,112,67,64,76,30,193,16,87,116,128,210,161,57,126,158,60,83,249]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(1532892063, "ETH", [[114,59,241,21,13,167,195,48,52,117,241,147,64,253,119,157,70,216,234,217,113,249,14,4,115,172,56,59,123,28,129,92],[150,157,1,159,214,121,65,40,173,227,253,190,96,161,98,51,64,199,206,99,204,125,181,244,167,109,141,172,94,201,178,54],[180,246,184,33,123,30,25,137,80,119,35,217,152,190,69,187,243,250,185,171,147,85,2,1,47,47,49,21,178,146,152,69],[245,65,97,53,79,175,160,251,18,12,109,37,113,185,143,109,173,184,208,80,75,208,5,60,162,185,12,215,180,123,209,53],[153,183,97,107,190,117,53,158,178,133,60,242,168,20,9,213,111,184,70,135,148,22,3,83,83,217,192,78,69,223,120,78]], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("fhh4g", [[141,89,163,100,15,224,252,191,179,172,238,176,62,59,221,37,207,56,115,19,101,109,113,189,124,121,26,100,25,103,14,11],[47,32,226,28,100,14,34,82,187,176,216,0,158,148,189,76,224,23,145,17,26,107,156,75,199,111,118,114,133,250,55,20],[92,225,189,132,26,6,186,78,211,161,201,27,167,179,95,156,224,42,119,186,251,83,108,56,85,198,25,134,232,60,55,70],[95,234,228,57,45,59,214,247,152,11,135,100,119,214,39,52,164,203,55,250,193,38,107,113,176,72,114,125,124,100,176,54],[137,117,232,194,115,227,77,85,209,125,156,215,215,1,74,173,208,51,135,205,146,235,245,193,182,159,52,87,23,169,246,1]], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([157],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[9],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(161,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("47cra", "o81cas",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("Oraclize query was sent, standing by for the answer...", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("trade.totalPrice", "yaxrhc",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("updateEthPrice called", "trade.totalPrice", "ihrtcf",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "tzae8q", "47cra", "xho27j",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("o81cas", "PayableExample", "RevertWithReason", "L", "okyabv",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("listingID arg",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("avnaep", 26,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("tzae8q", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("fhh4g",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("UsesExample", 4,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("listingID arg", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(23,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["trade.totalPrice","0gar6","1g08br","L","ihrtcf","P","1g08br","RevertWithReason","Example"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[24,148,121,63,104,64,190,171,87,123,116,38,176,52,5,58,198,12,13,76,231,107,52,112,167,138,209,98,102,242,178,122],[62,105,14,134,108,80,5,40,25,187,168,183,59,79,245,107,195,98,144,216,59,207,30,44,93,201,228,110,115,117,60,174]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(55, 4, 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([189,187,214,63,106,187,73,116,182,95,222,45,79,41,205,120,60,71,126,58,197,10,113,148,251,101,184,128,130,27,116,14], [31,175,189,216,88,140,100,153,213,22,42,126,217,7,27,58,112,219,64,249,222,21,53,153,56,154,104,98,132,245,103,149],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([82,153,236,132,95,148,107,163,126,116,166,154,88,245,174,44,98,249,193,30,76,133,233,161,20,229,197,239,46,243,161,68], [129,47,250,46,204,83,33,39,122,125,10,88,53,207,2,139,61,82,216,39,9,252,152,241,209,203,184,114,199,44,198,55], [15,76,87,175,52,137,45,203,18,47,52,84,137,33,190,121,34,243,101,163,86,43,38,130,180,61,35,202,115,179,204,5],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([66,176,67,199,127,188,128,153,247,21,221,128,221,255,99,91,190,65,99,18,21,193,6,121,97,134,167,70,135,177,133,154], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([97,7,58,22,71,56,210,130,234,171,128,76,167,138,122,160,38,128,70,253,90,158,38,125,162,33,126,85,244,150,80,243], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([157,82,81,134,119,214,185,173,208,94,167,63,171,4,107,172,204,54,213,184,244,3,60,215,211,235,151,237,78,64,127,92], "47cra", [167,255,95,41,177,175,149,29,84,245,11,207,240,185,78,33,242,207,250,201,199,22,74,216,91,185,83,235,72,25,240,145],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([133,84,198,37,150,152,164,219,130,143,236,64,5,241,114,229,26,149,39,240,105,57,41,255,167,176,59,172,127,18,208,164], "0gar6", [126,163,74,214,127,132,214,181,109,157,176,3,198,220,65,212,217,214,112,212,107,86,207,52,49,160,6,144,117,117,152,36],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([65,160,115,214,49,95,33,66,205,67,60,232,208,189,114,111,253,236,49,115,196,84,2,211,86,218,108,141,168,186,103,212], [231,141,80,67,213,98,172,139,163,156,191,29,117,137,96,179,179,142,116,18,107,49,22,146,246,81,4,156,202,114,246,246], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([65,160,115,214,49,95,33,66,205,67,60,232,208,189,114,111,253,236,49,115,196,84,2,211,86,218,108,141,168,186,103,212], [98,131,235,146,12,77,57,113,0,52,147,172,238,162,110,107,160,159,142,102,62,56,163,73,246,72,117,250,197,231,204,22,135], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([46,152,147,37,87,19,110,11,212,220,59,44,52,194,188,161,27,131,4,223,174,95,24,139,76,106,252,239,20,110,249,5], [207,147,83,128,164,117,182,164,120,189,245,3,123,158,152,41,171,188,166,60,178,252,54,132,185,198,43,151,23,149,22,254], [81,106,182,229,204,117,85,234,0,107,14,174,196,244,167,226,38,254,56,211,92,150,50,182,58,243,20,52,151,227,127,205], "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([189,164,228,82,174,180,23,122,82,92,224,152,147,130,49,38,41,25,53,104,102,183,162,36,201,72,72,235,102,222,220,162], [169,162,152,91,68,112,51,250,73,141,232,67,182,15,107,197,23,12,125,183,253,144,247,92,39,235,28,98,52,204,100,105], [251,164,171,66,63,122,154,233,229,77,85,214,72,112,175,13,84,212,56,24,25,126,126,149,115,55,54,11,254,225,244,109], "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([222,20,150,169,160,106,33,235,30,83,34,23,159,106,2,45,193,145,197,190,71,181,74,235,203,164,47,9,3,183,126,223], [249,222,49,240,162,41,125,181,116,64,192,40,38,250,40,176,116,167,188,213,48,7,169,87,91,253,42,162,24,65,6,157], [171,162,70,226,41,238,142,19,34,156,92,57,197,16,241,71,190,31,153,12,131,53,55,113,54,115,78,75,46,164,240,125], "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([38,69,35,167,164,205,61,162,151,142,81,222,158,191,126,21,226,49,141,25,169,57,15,80,189,135,69,15,216,205,13,86], [207,95,162,198,37,222,115,58,212,253,149,1,54,186,40,166,145,107,141,226,130,126,164,217,180,196,176,34,220,160,191,81], [125,121,43,13,60,209,184,122,228,228,178,72,137,242,64,213,52,252,0,120,99,100,221,136,210,112,80,184,234,130,78,98], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([149,185,246,39,13,228,150,171,70,122,57,147,175,73,236,25,23,56,80,107,180,1,16,170,21,30,97,8,153,170,198,147], [11,210,65,83,255,199,213,118,226,22,234,244,200,75,248,4,216,236,242,83,154,99,75,14,235,238,221,176,147,227,230,143], [228,21,95,74,163,72,192,91,247,244,42,0,17,178,2,168,52,198,168,187,56,184,153,18,239,249,246,234,59,116,29,170], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([54,73,175,154,8,207,83,229,249,209,223,67,155,250,165,89,81,160,208,59,23,186,162,53,4,107,148,189,148,187,164,226], [199,64,221,101,86,205,238,34,33,8,85,208,55,103,135,180,15,104,24,243,97,187,170,248,33,203,229,163,190,193,44,120], [140,206,129,53,80,55,35,197,196,112,204,107,175,32,110,163,80,235,160,237,111,117,115,64,87,241,34,224,24,245,156,220], "1g08br",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([194,105,153,208,55,67,31,48,120,36,161,244,189,136,78,67,104,27,139,29,129,58,145,98,210,120,209,55,47,0,85,179], [247,120,117,188,213,12,212,225,73,143,92,107,139,85,249,119,216,153,62,174,92,20,7,18,250,94,71,42,150,39,167,12], [108,244,165,2,77,224,22,82,43,197,192,11,34,79,203,94,127,40,241,40,7,135,226,27,141,202,176,225,211,200,33,189], "1g08br",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([62,189,30,67,18,123,100,121,240,149,12,138,0,248,254,143,138,183,101,234,212,61,63,35,162,250,151,242,133,89,211,214], [92,119,75,207,149,16,156,192,231,37,137,109,220,254,174,76,184,56,92,188,59,10,210,253,142,226,254,105,129,109,91,67], [196,121,214,129,86,84,245,88,212,84,71,220,215,164,5,166,245,33,136,184,166,245,109,57,3,182,132,71,137,104,162,150], "dqgnua",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([27,1,127,137,190,156,19,78,15,17,171,107,187,92,212,204,57,109,56,251,79,184,114,40,107,241,4,138,123,223,16,217], 256, 0, [112,85,171,96,108,227,89,29,245,97,99,233,61,176,204,181,170,91,144,117,38,225,187,146,23,154,39,32,114,201,144,160], 58,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([82,155,11,33,143,240,88,138,125,215,243,118,8,153,227,24,61,208,39,221,4,35,76,115,164,98,67,220,38,248,65,58], 9, [24,228,119,3,1,85,121,24,209,202,72,27,43,43,53,203,73,235,103,183,10,82,171,169,51,160,207,8,36,3,233,251], [171,124,20,145,123,175,145,140,23,66,245,243,74,117,154,226,194,66,222,151,116,38,198,164,243,98,109,230,66,207,82,131],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([186,48,144,40,242,19,162,224,105,92,31,254,26,93,17,42,164,87,25,237,174,79,74,151,70,228,141,128,57,187,215,169], [33,34,246,159,250,164,198,122,155,52,165,110,231,78,190,127,238,132,208,180,210,83,13,145,128,91,157,11,229,152,32,29,213,255,134,160,217,176,68,72,15,189,167,17,64],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([160,234,199,196,150,235,27,113,9,237,255,39,20,214,204,7,54,13,239,148,0,7,134,236,133,57,234,51,172,172,50,51], [234,11,73,7,68,210,133,169,174,145,76,237,40,1,60,53,92,78,25,162,15,204,230,97,88,62,136,197,45,105,96,52,158,245,60,185,188,39,218,21,97,178,170,158,237,90,244,76,236,151,40,153,194,6,123,150,109,38,51,20,158,99,5,105,21],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
