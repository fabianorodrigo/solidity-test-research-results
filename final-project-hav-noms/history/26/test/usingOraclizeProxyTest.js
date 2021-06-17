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
    contractShartCoin = await ShartCoin.new({from:accounts[3]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[3]}');
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
    contractMortal = await Mortal.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[1],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"RevertWithReason",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"RevertWithReason",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(54,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("ETH", 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("ETH", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(21, "UsesExample", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(46, "P", "L", 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("IsLibrary", "PayableExample", 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("69zanf", "listingID arg", "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(1, "P", "RevertWithReason", "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(128, "qo7ri", "costUSD", "69zanf", 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("\x19Ethereum Signed Message:\n32", "0", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("listingID arg", ["RevertWithReason","69zanf","ETH","trade.totalPrice","0","69zanf","","trade.totalPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(10, "RevertWithReason", ["qo7ri","RevertWithReason","69zanf","PayableExample","Example"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(7, "IsLibrary", ["RevertWithReason","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","costUSD"], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("ETH", ["9o0u8u"], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("RevertWithReason", ["Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(200000, "P", ["updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(60, "P", ["Oraclize query was sent, standing by for the answer..."], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("call updateEthPrice", ["Example"], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["qo7ri","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(200000, "PayableExample", ["9o0u8u","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(18, "PayableExample", ["69zanf","IsLibrary"], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Example", ["L","PayableExample"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("L", ["Example","69zanf","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(57, "ETH", ["RevertWithReason","0","qo7ri"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(15, "costUSD", ["PayableExample","RevertWithReason","updateEthPrice called"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("listingID arg", ["P","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("PayableExample", ["RevertWithReason","9o0u8u","qo7ri","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(101, "updateEthPrice called", ["9o0u8u","RevertWithReason","PayableExample",""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(160, "P", ["IsLibrary","L","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","trade.totalPrice"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("call updateEthPrice", ["L","L","PayableExample","UsesExample"], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("costUSD", ["updateEthPrice called","listingID arg","updateEthPrice called","Oraclize query was sent, standing by for the answer...","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(23, "trade.totalPrice", ["\x19Ethereum Signed Message:\n32","listingID arg","\x19Ethereum Signed Message:\n32","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(1025, "L", ["IsLibrary","call updateEthPrice","RevertWithReason","P","RevertWithReason"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("", ["9o0u8u","listingID arg","ETH","trade.totalPrice","9o0u8u"], 101,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("69zanf", [[77,57,13,125,99,249,82,65,141,196,106,69,187,136,253,119,80,163,153,150,130,237,157,112,39,54,207,250,231,69,46,158],[132,137,242,149,38,144,26,152,34,232,42,152,222,142,141,198,118,219,117,82,205,206,167,97,173,183,127,132,144,25,37,6],[31,6,110,251,62,22,155,19,236,2,76,6,150,40,100,79,215,204,142,95,106,36,110,191,16,113,46,185,232,220,35,177],[56,2,196,164,103,140,102,200,3,113,244,203,102,107,110,198,204,34,40,169,228,240,89,50,235,9,167,123,252,127,185,203],[128,243,98,109,242,19,93,109,31,10,71,255,170,40,152,164,99,95,22,41,20,51,169,80,165,20,63,222,5,148,128,98],[157,30,202,113,187,84,143,18,235,234,89,18,51,8,186,84,157,15,134,209,72,0,174,36,128,25,84,50,35,106,151,130],[190,74,224,137,114,159,239,37,120,63,207,21,97,124,55,165,62,103,149,166,14,200,81,43,37,55,241,68,119,100,101,37]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(11, "updateEthPrice called", [[232,227,164,3,48,4,57,113,151,174,209,184,65,95,193,17,211,199,198,126,44,93,186,82,102,226,87,167,180,236,217,192],[75,42,3,103,105,116,198,76,164,0,101,22,55,172,143,45,245,122,28,249,68,20,27,215,192,47,174,16,210,227,100,142]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(3, "", [[226,32,92,237,144,111,157,88,200,26,158,13,213,78,241,31,12,27,42,175,222,243,238,80,203,248,17,234,173,51,83,55],[223,204,91,63,218,37,96,170,42,221,175,0,70,145,22,197,107,38,147,23,47,68,148,4,232,82,79,239,121,49,118,183],[25,193,220,117,230,140,134,194,80,139,3,228,31,25,11,34,209,234,73,57,231,62,158,226,242,114,128,1,233,239,180,250],[5,47,31,26,47,205,23,149,61,27,242,194,171,89,231,54,41,68,49,29,19,109,195,110,98,65,205,58,28,228,82,194],[193,229,38,96,7,55,228,106,155,49,233,57,140,122,224,158,46,27,78,255,63,177,17,47,155,214,152,33,39,192,205,150],[164,255,12,51,15,165,251,218,55,230,73,70,89,68,199,178,61,69,125,64,197,110,227,77,159,175,3,245,254,28,178,72],[133,31,56,130,227,35,27,23,222,249,7,104,76,144,92,107,31,100,188,30,57,92,189,177,201,16,178,87,228,236,174,44],[183,158,145,251,12,16,94,123,11,189,44,0,18,181,92,66,85,163,193,76,15,229,18,48,9,66,87,24,98,44,150,115],[47,103,128,232,85,238,162,219,133,54,1,50,165,214,246,209,149,223,12,112,89,192,128,84,9,64,162,165,244,106,139,199]], 31,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("call updateEthPrice", [[177,149,226,72,158,30,145,194,18,12,84,139,0,223,139,218,155,121,61,143,89,163,180,97,86,175,80,226,170,149,41,167],[184,176,8,151,235,132,139,215,68,104,223,210,224,199,215,206,139,197,8,110,127,187,138,197,241,71,207,53,44,154,218,133],[173,220,216,218,145,166,141,86,107,141,202,18,80,244,185,47,68,217,2,193,236,228,245,208,97,221,158,55,207,230,41,120],[23,62,114,24,188,198,251,242,167,129,192,42,5,145,127,6,223,202,250,6,219,178,214,145,221,202,164,191,196,188,78,58],[204,196,62,121,26,48,169,170,191,62,142,162,199,252,125,133,196,107,103,33,187,12,57,61,104,97,4,173,138,53,112,184]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("qo7ri", [[170,137,58,35,76,76,67,164,28,73,109,45,83,141,81,86,244,53,29,131,190,3,77,191,70,245,174,173,198,188,204,7]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(1338, "PayableExample", [[174,238,225,5,241,42,140,0,240,133,47,112,65,172,247,116,242,194,229,209,232,100,135,68,12,213,23,252,146,59,246,216]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(22, "P", [[216,98,51,202,113,181,78,179,107,205,135,117,134,205,84,242,155,153,189,179,24,107,7,195,143,57,246,223,217,81,220,111]], 32,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("\x19Ethereum Signed Message:\n32", [[4,130,8,111,142,184,224,225,224,155,77,48,45,171,191,83,23,198,225,226,187,140,32,131,194,169,111,165,63,189,62,9]], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("69zanf", [[170,153,233,203,145,104,191,34,21,187,201,61,90,56,145,228,161,86,221,160,140,230,75,118,184,42,61,74,146,164,48,135],[10,22,108,134,166,142,15,97,50,246,205,201,223,126,181,136,12,234,70,137,224,192,88,66,77,93,133,199,209,51,137,46]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(95, "Example", [[203,235,86,231,179,168,234,131,81,154,136,228,49,230,249,93,92,150,180,194,36,243,168,106,109,160,61,100,1,112,146,36],[179,188,44,50,48,18,64,8,199,59,56,84,182,104,54,11,39,127,177,105,152,28,249,44,139,126,69,105,227,129,82,147]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(16, "IsLibrary", [[2,200,246,74,88,208,212,240,27,95,156,169,85,65,103,136,136,77,179,151,216,109,77,101,97,14,170,99,71,220,114,152],[17,4,55,122,136,245,218,62,190,166,32,244,14,185,108,219,241,217,201,52,243,152,16,153,131,101,234,240,201,107,25,36]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("Example", [[34,62,147,150,53,75,145,28,27,112,84,42,87,18,94,189,3,231,79,171,7,187,77,37,239,57,168,207,165,230,6,86],[206,133,234,212,37,102,245,71,18,158,175,27,169,84,99,117,177,129,174,44,42,95,154,62,84,127,24,124,105,0,190,33]], 24,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("5s8phj", [[164,16,229,8,244,124,168,50,179,243,149,52,40,195,250,241,168,253,52,170,12,143,91,45,233,135,83,75,60,83,92,237],[9,8,207,156,64,132,204,15,53,158,91,105,193,242,82,97,8,50,147,159,177,59,65,239,35,190,54,60,3,185,7,19],[158,199,211,14,189,198,219,106,254,152,212,237,182,103,75,97,108,212,23,10,11,220,78,119,61,91,79,191,124,87,49,154]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(4, "Example", [[44,220,254,235,77,165,50,55,165,23,94,247,231,78,116,232,216,17,175,224,199,36,60,118,18,149,87,75,186,252,74,74],[21,64,62,192,19,210,21,18,141,20,82,67,72,157,94,163,63,108,89,225,192,65,103,246,217,25,109,109,129,126,209,191],[210,38,131,72,227,187,145,96,79,142,233,211,227,230,251,175,168,128,37,171,170,178,93,130,142,55,121,243,180,61,77,133]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(127, "costUSD", [[191,15,42,206,4,124,166,4,121,255,127,138,74,138,159,119,40,69,133,153,130,149,98,185,186,245,207,226,131,2,211,183],[82,72,255,54,175,220,135,131,77,76,150,125,26,185,247,45,192,84,236,188,38,230,131,247,35,98,161,34,209,235,87,251],[120,135,170,5,83,222,54,126,14,153,102,228,40,255,108,148,158,9,35,39,78,245,146,89,213,156,141,211,101,244,123,202]], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("updateEthPrice called", [[44,177,110,190,224,225,201,185,199,201,182,73,103,83,29,246,227,118,232,146,101,100,45,179,236,32,80,130,17,190,89,152],[32,111,218,46,207,180,245,83,75,72,196,250,103,149,229,121,56,242,109,128,154,59,36,189,21,209,176,178,148,79,241,113],[37,148,111,68,8,197,67,1,158,172,8,56,77,69,108,251,51,223,182,39,144,29,167,110,154,51,251,127,84,58,183,199]], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("", [[224,40,8,126,150,141,219,246,155,104,171,68,97,177,7,24,180,176,44,89,251,21,12,205,44,239,244,52,174,235,170,52],[83,86,91,80,35,126,108,197,21,164,254,71,88,106,69,22,34,234,171,20,222,99,127,39,164,234,236,169,136,61,209,234],[70,191,54,80,189,241,240,142,89,4,255,250,234,133,254,32,209,106,199,143,88,189,82,242,8,232,185,190,145,27,60,149],[90,44,57,183,19,156,21,190,39,171,207,121,24,63,204,189,251,1,190,27,154,244,101,52,193,40,179,86,32,157,143,140]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(95, "Oraclize query was sent, standing by for the answer...", [[44,162,244,104,178,13,69,179,17,38,0,32,236,82,180,197,188,179,194,225,107,163,243,31,107,164,107,52,203,47,251,202],[214,123,35,35,201,33,128,133,122,14,196,161,225,137,57,139,110,59,210,213,121,232,110,136,148,182,209,189,218,89,52,244],[199,21,150,46,65,215,76,5,161,28,6,225,231,147,178,56,252,167,52,242,187,62,82,193,162,13,232,1,193,249,2,89],[50,254,103,210,143,134,153,95,74,42,152,253,177,146,105,131,19,238,147,186,175,188,94,165,99,179,203,14,186,119,187,126]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(29, "qo7ri", [[45,187,93,194,96,109,48,73,48,158,79,19,149,103,157,242,154,220,155,5,0,70,236,221,252,244,18,37,99,120,64,110],[24,14,195,145,201,120,222,138,9,82,71,154,160,194,255,44,230,214,210,233,25,144,167,203,90,61,60,29,163,218,54,212],[82,33,37,9,197,184,162,181,240,225,196,10,233,44,103,139,192,194,113,95,116,71,126,93,165,58,123,209,95,214,13,207],[201,212,31,219,173,129,64,153,202,14,117,221,58,25,63,15,80,129,240,54,107,179,123,118,236,165,47,34,69,118,204,184]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("L", [[115,40,1,36,55,97,169,159,149,124,87,30,101,147,61,72,155,101,175,114,70,141,81,53,226,43,183,1,145,167,137,74],[161,147,167,202,131,55,130,119,68,93,204,162,134,152,241,10,195,190,163,4,55,57,254,26,124,95,42,172,5,100,239,192],[156,79,221,243,15,35,112,244,1,106,81,230,65,54,212,89,82,120,254,209,4,228,203,107,48,111,225,18,238,146,171,67],[130,229,100,83,40,201,106,148,174,19,4,145,215,164,17,230,196,207,91,49,96,242,139,8,51,141,238,3,213,158,87,11]], 0,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("P", [[251,78,30,248,145,88,6,225,183,133,22,82,138,145,206,89,212,104,78,169,71,18,180,112,123,213,190,130,136,16,114,53],[176,126,153,209,150,198,162,129,133,9,143,235,228,195,202,227,30,50,183,4,83,80,140,221,67,176,243,220,105,30,211,249],[252,236,96,23,12,40,60,246,10,14,62,138,73,222,218,20,110,206,178,57,150,255,235,56,94,97,200,113,11,198,239,22],[165,227,225,192,16,128,67,211,203,186,17,134,95,34,115,93,87,11,226,131,170,165,249,134,185,116,70,157,197,121,145,133],[131,67,34,80,2,153,23,194,1,240,207,152,219,223,11,151,71,164,180,27,71,113,1,39,170,247,228,112,20,235,189,224]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(26, "P", [[112,10,21,12,148,205,63,105,159,129,121,215,31,11,150,216,66,36,180,193,116,6,149,9,107,207,161,203,111,16,111,97],[226,85,24,245,246,253,85,13,119,224,24,83,205,167,54,82,233,71,143,222,30,228,242,55,66,154,254,139,217,48,146,219],[97,244,143,45,113,4,74,227,240,115,21,53,76,104,125,48,99,35,243,85,4,105,215,181,86,150,103,232,119,190,76,250],[139,124,177,241,72,10,201,117,187,195,104,32,162,8,181,69,12,178,239,137,222,168,243,16,171,179,177,136,50,38,167,226],[15,220,163,49,142,156,81,187,140,13,79,191,108,187,2,55,234,173,153,35,211,142,136,178,166,31,30,215,231,101,216,179]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(57, "qo7ri", [[36,224,205,147,80,180,68,84,157,49,223,43,136,187,14,239,17,44,58,36,0,163,104,181,13,112,243,229,23,226,253,67],[119,192,54,137,253,54,249,175,41,181,201,255,139,156,154,204,171,135,124,121,148,109,173,222,141,76,169,146,89,229,9,140],[159,108,132,225,99,202,160,128,9,19,228,195,216,22,168,246,120,154,34,75,68,48,145,133,229,217,20,225,151,216,196,89],[78,57,89,47,193,120,33,197,76,148,90,184,108,109,130,151,102,118,173,60,81,39,168,163,162,181,106,199,184,243,215,215],[130,228,157,60,79,98,74,90,223,68,10,222,91,151,148,123,218,78,11,187,243,119,141,167,15,163,44,39,69,237,14,202]], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("ETH", [[121,0,164,111,218,248,59,6,10,185,73,137,138,4,21,163,110,182,110,213,215,138,146,72,210,98,228,151,68,18,172,48],[239,206,49,7,219,171,34,82,239,59,90,27,104,191,8,105,113,169,101,102,113,245,149,205,67,7,216,58,79,172,48,234],[8,14,19,171,3,237,147,230,133,57,226,159,162,237,163,88,8,236,74,221,180,232,97,150,17,114,192,217,248,254,230,136],[158,227,47,142,12,12,141,48,253,253,28,95,177,117,244,206,34,148,177,187,38,80,18,34,118,184,205,56,74,253,31,90],[242,49,132,43,92,253,143,180,217,233,245,183,159,69,55,137,48,253,6,79,125,44,166,117,166,243,92,63,37,158,6,134]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([217],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[5],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(23,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("L",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("0", "costUSD",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("5s8phj", "zz8x0m",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("PayableExample", "UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("listingID arg", "PayableExample", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("P", "69zanf", "call updateEthPrice", "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("qo7ri", "listingID arg", "call updateEthPrice", "Oraclize query was sent, standing by for the answer...", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 56,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("0", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("\x19Ethereum Signed Message:\n32", 200001,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("listingID arg", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(129,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["UsesExample","trade.totalPrice","UsesExample","","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[69,242,208,220,229,252,139,211,91,150,54,107,232,192,138,218,182,244,180,236,170,109,58,242,159,51,107,99,191,90,239,18]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(200001, 46, 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([145,232,80,83,223,104,164,139,115,238,77,206,88,182,205,234,202,226,207,27,171,151,234,42,190,130,242,195,165,98,201,208], [182,71,77,64,85,85,7,84,240,129,238,62,189,96,22,41,196,122,7,212,45,38,124,53,111,0,196,135,190,12,73,100],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([169,31,222,247,236,71,56,33,70,61,220,197,254,78,85,233,202,146,141,127,10,161,93,187,61,122,1,76,103,104,88,130], [74,107,0,11,135,219,127,76,247,224,188,91,187,206,210,178,157,11,63,148,12,165,95,109,157,140,156,234,93,206,81,69], [92,105,124,238,121,58,132,71,172,48,225,45,12,70,182,34,154,207,97,86,153,77,188,42,238,31,209,254,29,58,253,13],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([18,80,117,204,184,117,245,90,196,229,146,30,245,130,56,116,64,135,129,43,6,198,49,98,185,179,224,84,175,225,113,112], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([211,73,24,253,27,60,188,86,165,231,149,2,64,43,134,216,45,193,137,51,66,29,243,139,15,112,238,61,107,134,204,205], 1532892064,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([190,132,101,179,146,194,64,28,206,246,151,148,73,93,207,51,153,155,42,3,57,125,40,87,89,81,192,89,200,106,222,97], "5s8phj", [98,111,28,241,190,32,146,242,87,65,187,23,180,192,208,139,160,247,202,230,157,47,188,57,163,216,223,193,81,146,115,156],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([96,34,152,21,69,11,78,57,52,217,36,43,115,96,74,39,77,46,250,91,39,13,222,89,136,115,207,126,147,125,215,96], "blse4j", [201,198,242,168,196,207,64,180,122,113,86,9,52,27,105,160,14,194,116,55,209,158,81,158,2,183,35,12,121,240,212,220],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([242,114,246,41,156,27,174,181,191,193,89,136,31,137,55,139,31,116,227,61,10,220,31,88,246,202,119,187,22,177,251,147], [14,252,125,160,226,130,194,125,163,214,122,204,90,111,10,253,176,89,169,116,172,243,47,87,51,95,123,87,6,203,58,163], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([242,114,246,41,156,27,174,181,191,193,89,136,31,137,55,139,31,116,227,61,10,220,31,88,246,202,119,187,22,177,251,147], [83,49,45,117,79,196,80,144,128,180,227,255,98,250,24,124,195,224,47,95,239,184,127,220,117,40,87,109,103,155,65,108,126], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([60,51,142,139,86,77,41,54,69,228,197,225,130,223,144,204,33,13,145,56,174,1,72,31,198,184,148,156,232,221,228,14], [164,237,66,30,190,174,76,26,167,189,73,39,83,233,108,148,84,111,179,18,239,232,44,13,82,100,75,167,167,197,9,121], [152,87,14,157,146,80,87,122,151,118,161,108,141,128,50,125,36,161,21,228,47,73,20,0,164,184,9,112,238,16,27,39], "9o0u8u",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([56,207,156,14,75,102,45,140,162,136,1,37,152,229,31,83,217,73,113,200,100,28,65,15,92,95,220,180,28,85,180,106], [211,108,127,49,74,220,115,250,202,222,208,140,56,142,159,71,211,70,207,135,55,82,8,161,86,196,139,3,204,76,170,178], [152,232,244,137,61,3,170,133,144,119,237,159,150,128,39,144,198,144,91,140,108,171,117,60,178,38,93,144,62,218,92,129], "9o0u8u",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([157,232,130,59,106,83,115,214,60,142,52,186,54,147,15,111,185,104,182,186,211,44,225,47,38,61,226,202,183,211,216,65], [243,252,90,38,244,195,212,205,113,145,159,192,209,22,233,204,235,152,157,166,179,71,169,209,223,206,33,7,42,184,241,120], [143,96,119,55,98,216,251,113,146,76,91,128,66,37,119,144,117,171,101,68,165,175,187,171,238,85,139,247,55,144,53,119], "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([173,118,214,119,193,85,161,101,146,152,166,19,166,197,255,161,150,107,164,117,226,78,163,25,149,45,206,224,75,181,9,166], [143,251,240,112,199,226,82,251,86,21,65,203,86,236,161,194,166,140,179,116,125,155,160,247,144,200,252,15,240,215,54,105], [114,90,24,64,200,130,114,109,96,254,185,29,74,161,37,119,196,55,153,149,170,38,30,228,97,69,161,5,172,33,91,110], "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([253,140,114,11,180,234,178,249,209,209,195,168,83,82,243,233,137,68,167,143,159,45,182,0,248,31,15,54,192,154,130,234], [133,91,108,222,61,156,86,191,200,36,15,158,160,248,76,200,144,68,226,28,34,64,46,7,145,144,161,70,6,143,174,123], [238,74,116,2,3,184,136,133,32,152,134,176,201,189,121,54,250,16,99,183,118,202,91,23,155,167,210,183,255,44,51,65], "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([236,36,81,27,111,193,53,77,175,89,254,15,241,117,64,42,36,191,230,252,111,71,23,183,2,207,170,60,165,89,229,155], [204,158,115,223,204,114,227,214,80,238,84,74,240,254,2,252,38,136,41,245,201,80,180,29,191,41,23,196,41,101,37,212], [126,85,39,110,186,249,211,151,10,110,36,213,2,207,249,221,104,106,81,53,160,220,167,120,79,190,80,69,52,9,4,189], "qo7ri",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([217,223,124,167,232,171,5,121,106,182,124,205,26,163,100,220,124,196,37,26,232,212,122,250,89,117,95,109,225,202,72,233], [77,224,6,172,121,113,209,38,57,58,147,166,239,228,138,233,237,104,85,195,60,118,171,199,218,176,57,63,123,230,38,85], [191,106,57,18,89,147,120,172,177,16,255,108,157,103,24,189,182,37,55,158,18,205,251,104,236,129,236,221,104,39,120,219], "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([194,170,22,103,130,133,239,56,30,120,86,26,39,22,181,125,139,64,66,106,88,223,53,102,153,65,187,192,184,211,29,7], [247,111,4,247,111,153,72,3,26,2,165,180,85,46,188,65,173,98,204,51,217,102,79,129,61,99,89,57,131,28,209,96], [193,6,156,149,242,45,253,59,235,248,42,26,143,33,201,145,193,1,96,113,78,235,74,96,122,185,79,29,93,43,140,149], "costUSD",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([73,177,184,135,125,201,62,186,117,102,125,10,51,35,6,173,230,121,117,65,177,241,42,175,132,109,201,34,249,158,98,189], 19, 64, [94,77,193,246,23,159,74,237,54,173,122,108,240,24,94,85,221,27,155,104,183,84,124,158,54,113,158,116,90,214,204,8], 127,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([156,57,97,30,6,181,92,67,127,167,166,47,6,121,180,239,195,104,40,219,128,236,77,157,228,62,112,52,144,44,6,234], 28, [12,154,80,197,69,250,31,243,29,228,113,145,212,247,229,112,142,43,138,6,116,166,215,67,131,66,16,164,84,216,213,54], [16,218,157,58,70,4,8,132,144,122,16,106,90,217,180,191,249,242,94,77,129,86,108,22,1,170,71,251,29,0,126,114],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([250,201,8,195,0,206,27,221,2,253,26,6,45,22,140,249,148,190,240,244,62,19,211,51,54,115,55,18,235,80,49,72], [68,212,133,131,208,23,5,239,254,157,253,185,184,89,55,129,241,228,106,141,9,125,246,177,112,7,244,32,51,143,223,136,26,188,7,17,198,60,211,201,139,183,87,23,178,105],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([218,74,5,201,145,247,98,249,72,35,185,164,232,138,15,150,24,142,128,243,192,253,232,45,49,142,152,133,205,184,103,159], [162,16,58,104,194,7,21,54,71,20,24,205,183,91,19,198,190,240,244,33,101,243,46,234,74,169,19,116,223,197,14,89,14,86,50,253,69,46,92,195,141,43,75,36,173,179,128,127,89,57,189,137,175,214,154,46,245,200,173,0,9,124,13,163,157],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
