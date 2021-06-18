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
    contractMortal = await Mortal.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[3],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"0",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(128,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("hirbpp",{from: accounts[0]});
  });
  it('Should execute testoraclize_getNetworkName()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getNetworkName({from: accounts[0]});
  });
  it('Should execute testoraclize_setNetwork1()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork1({from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice0(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("v03m5l", 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("v03m5l", "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(47, "UsesExample", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(128, "\x19Ethereum Signed Message:\n32", "call updateEthPrice", 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("trade.totalPrice", "0", 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("0", "0", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(87, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "ETH", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(17, "UsesExample", "\x19Ethereum Signed Message:\n32", "IsLibrary", 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("IsLibrary", "0", "5r9xr", 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("0", ["ETH","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1532892064, "v03m5l", ["listingID arg","v03m5l"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(256, "5r9xr", ["updateEthPrice called",""], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("ETH", ["Example","IsLibrary","\x19Ethereum Signed Message:\n32","PayableExample","PayableExample","Oraclize query was sent, standing by for the answer...","Example"], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(95, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(47, "L", ["L"], 2,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("P", ["hirbpp"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("updateEthPrice called", ["PayableExample","hirbpp"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(95, "hirbpp", ["ETH","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(22, "P", ["RevertWithReason",""], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("call updateEthPrice", ["ssz99","call updateEthPrice"], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("ssz99", ["PayableExample","P","call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(9, "5r9xr", ["RevertWithReason","P","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(61, "", ["updateEthPrice called","Example","L"], 1025,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("trade.totalPrice", ["v03m5l","Example","ssz99"], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("hirbpp", ["P","P","vyaiez","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(71, "L", ["Example","ssz99","","PayableExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(61, "PayableExample", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was sent, standing by for the answer...","hirbpp","Example"], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("Example", ["Example","L","Oraclize query was sent, standing by for the answer...","Oraclize query was sent, standing by for the answer..."], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("\x19Ethereum Signed Message:\n32", ["39d6g","ETH","","call updateEthPrice","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(95, "ETH", ["Example","","\x19Ethereum Signed Message:\n32","39d6g","kizr3q"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(23, "Example", ["listingID arg","Example","P","v03m5l","trade.totalPrice"], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("PayableExample", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","ssz99","P","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 15,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("ssz99", [[217,85,64,28,192,156,154,252,235,226,66,212,170,26,130,170,156,228,152,216,54,115,41,244,229,188,10,12,186,109,7,158],[114,165,95,147,206,23,74,110,6,135,191,26,89,43,53,70,176,205,227,143,0,83,109,127,110,123,210,15,202,125,129,253],[249,225,218,140,65,12,90,100,144,149,52,187,60,21,19,220,119,19,140,53,171,192,142,229,92,52,203,127,223,88,185,180]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(71, "PayableExample", [[149,112,174,52,164,151,177,246,205,180,29,93,218,205,41,97,251,56,39,169,124,202,88,191,153,168,57,162,2,101,28,23],[12,83,252,13,221,89,121,120,175,113,40,200,74,195,122,248,83,108,150,3,17,223,115,60,145,102,232,177,129,200,26,41],[199,141,220,46,162,99,201,255,237,39,197,114,121,106,115,111,155,246,253,53,56,177,158,9,95,252,168,82,91,52,218,194],[133,231,164,110,58,202,160,72,63,7,110,134,205,205,201,85,131,74,195,219,171,181,84,174,168,124,40,84,15,197,123,83]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(49, "costUSD", [[94,92,244,136,198,110,151,164,192,200,101,42,16,118,186,195,194,37,163,41,160,165,44,61,185,16,70,2,167,108,193,253]], 23,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("", [[163,105,194,138,255,61,1,207,219,82,242,13,254,164,130,145,22,61,22,71,216,108,104,147,157,67,249,212,245,35,43,20],[47,176,218,158,57,181,129,49,149,56,215,106,106,84,134,85,165,48,117,24,13,240,231,232,138,106,89,214,53,20,38,161],[150,205,58,136,65,197,89,222,14,155,77,14,52,99,11,220,178,119,150,108,248,183,15,35,43,128,156,246,9,129,96,235],[115,198,153,43,197,185,88,160,172,186,122,140,19,185,233,202,60,244,45,219,41,155,41,158,181,216,90,12,122,164,47,203],[89,134,95,35,44,117,29,28,55,149,152,169,182,133,241,104,159,243,199,57,52,5,92,19,78,232,200,238,149,36,213,217],[73,78,97,136,1,242,173,234,164,119,62,220,57,98,230,76,43,47,167,98,168,4,176,76,43,120,141,150,55,231,9,150]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("vyaiez", [[221,94,142,69,100,134,231,254,165,55,247,252,108,9,24,72,247,118,118,79,247,129,133,99,185,81,125,5,213,114,20,51]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(97, "RevertWithReason", [[42,46,108,86,75,3,68,80,34,145,170,14,84,145,18,10,188,239,14,48,243,32,24,146,243,142,183,168,223,112,10,33]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(26, "trade.totalPrice", [[151,79,199,215,158,7,87,6,207,114,146,185,35,67,189,98,103,130,54,54,16,246,218,93,38,87,139,32,69,47,119,169]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[59,50,140,145,101,25,38,38,31,79,238,56,80,145,229,135,95,99,123,92,111,76,35,88,191,52,194,53,47,224,105,254]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("updateEthPrice called", [[49,226,63,119,222,208,179,90,193,1,149,119,114,82,159,152,230,196,134,18,9,209,47,171,84,122,196,109,206,30,127,38],[154,242,144,36,94,159,71,3,192,48,132,234,109,23,74,116,116,4,0,103,176,178,225,154,32,12,91,50,112,222,84,148]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(71, "vyaiez", [[241,207,19,19,85,57,3,236,67,127,73,122,205,106,94,204,75,200,172,116,193,143,126,221,86,157,9,46,152,139,85,46],[153,32,69,82,195,144,127,193,88,160,83,140,25,73,3,149,171,53,109,84,155,246,154,155,141,51,4,177,218,6,29,238]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(101, "trade.totalPrice", [[121,219,254,186,249,116,19,130,240,192,156,149,49,165,141,15,74,229,179,36,70,167,11,101,69,147,13,226,130,138,231,54],[78,87,43,104,16,91,74,187,192,126,94,243,221,30,38,24,37,77,68,241,150,167,46,171,133,97,133,217,202,24,101,217]], 255,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("IsLibrary", [[22,60,68,242,220,23,103,157,96,192,243,238,224,88,77,253,89,61,146,241,126,224,194,79,51,217,132,211,244,79,96,169],[149,121,79,65,10,99,31,0,6,187,157,206,215,197,60,108,28,150,34,224,178,57,244,172,110,140,143,232,17,56,152,164]], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("trade.totalPrice", [[245,142,154,31,244,97,15,234,27,199,194,210,66,20,99,27,110,68,5,205,10,177,182,117,88,153,247,171,223,26,185,102],[47,243,4,245,94,115,46,229,212,112,30,9,3,215,252,155,83,38,97,158,221,183,235,224,222,182,215,137,199,32,202,115],[117,58,160,21,229,128,140,103,238,111,74,53,21,146,30,94,94,141,44,151,246,78,144,165,186,117,185,79,126,249,24,39]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(66, "39d6g", [[90,166,245,64,60,11,125,62,228,82,99,1,86,99,55,70,109,27,126,143,3,134,129,61,151,86,180,223,132,39,230,162],[137,47,205,149,223,222,41,60,91,179,72,193,214,165,70,35,135,228,198,159,215,125,251,148,68,183,223,99,69,128,239,215],[55,194,247,142,80,47,117,162,146,55,176,120,24,15,3,76,65,237,152,94,200,174,180,191,9,198,213,12,134,12,76,87]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(59, "0", [[26,17,248,15,218,28,182,238,142,29,174,35,147,219,102,215,46,18,221,230,72,175,124,169,35,18,31,168,98,96,195,143],[114,199,204,56,31,174,116,47,105,192,100,195,210,20,142,205,56,11,97,106,23,59,65,213,103,55,107,10,119,5,124,184],[3,53,224,57,128,125,7,223,253,96,110,69,111,67,196,103,9,223,124,231,45,25,130,14,3,178,78,55,251,156,47,247]], 256,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("", [[88,157,228,178,186,227,133,9,144,20,94,29,117,142,115,113,158,233,251,97,82,232,231,186,18,118,245,99,64,209,162,108],[61,65,60,0,39,60,17,42,68,94,17,154,78,191,30,128,104,139,238,216,187,184,242,169,154,105,86,195,253,49,70,65],[151,149,67,154,21,223,159,107,16,239,84,19,77,227,250,161,206,6,194,255,103,51,39,221,211,27,5,222,108,94,223,170]], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("Example", [[107,238,26,233,38,34,75,129,13,238,41,81,206,59,219,170,116,152,82,241,121,206,107,69,96,102,6,93,153,83,42,113],[84,9,3,153,110,224,195,157,42,243,23,166,39,240,208,99,88,91,119,213,247,204,78,6,120,104,68,124,169,78,141,127],[229,27,196,3,192,143,250,38,208,178,17,180,188,18,115,32,152,141,49,76,59,141,201,235,168,192,110,61,72,145,189,128],[85,23,106,186,181,70,125,60,207,208,190,26,199,137,128,122,105,114,239,35,193,29,75,202,232,62,24,47,197,232,129,206]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(18, "hirbpp", [[153,149,187,249,134,201,146,90,201,124,135,194,232,182,136,106,206,160,129,120,63,103,156,92,59,83,20,197,3,100,219,147],[74,74,197,58,12,152,168,119,89,117,43,170,9,228,172,227,144,165,30,244,42,53,220,32,200,148,29,115,148,122,88,117],[119,27,53,228,209,19,196,162,1,93,139,165,230,3,106,229,82,140,244,17,86,88,128,3,63,28,67,233,165,93,164,154],[95,210,59,39,244,65,46,159,21,205,126,116,103,220,221,15,245,76,21,25,162,196,176,84,194,153,78,192,34,39,157,196]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(56, "listingID arg", [[119,238,198,208,171,116,192,141,234,68,84,8,168,142,107,209,157,120,18,203,40,84,112,73,79,82,57,61,151,144,17,215],[43,212,213,240,44,229,191,204,35,16,30,155,123,96,139,99,87,67,17,103,239,115,222,251,248,244,234,204,161,17,81,38],[165,15,255,188,161,207,33,136,207,32,87,47,60,156,192,83,140,206,82,97,59,137,142,77,177,226,146,76,226,17,194,34],[93,146,89,111,18,231,116,154,12,51,146,51,205,123,108,181,20,89,131,129,224,60,161,102,50,49,178,2,102,208,206,46]], 71,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("ssz99", [[210,93,18,169,192,39,44,197,240,196,45,6,246,121,84,128,97,188,68,76,90,40,182,19,157,249,114,112,13,196,93,235],[197,189,70,130,1,36,84,27,57,52,133,121,92,226,147,16,241,207,89,172,209,60,13,184,68,33,49,40,83,133,79,213],[211,238,248,136,11,113,186,215,181,197,250,225,175,146,130,71,53,236,32,9,69,176,5,25,137,134,33,222,145,15,81,229],[218,8,37,39,19,183,118,77,238,59,129,166,25,210,96,201,73,108,6,176,65,208,106,194,26,138,219,98,31,148,174,174]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ETH", [[178,243,208,141,174,104,61,63,48,131,83,65,68,2,191,211,48,14,168,45,173,12,8,244,253,48,73,30,251,156,61,82],[166,209,63,239,189,152,94,187,206,16,14,130,53,91,46,28,84,154,134,78,83,125,179,216,150,208,65,160,62,165,118,37],[252,3,107,211,16,7,44,158,90,199,26,170,232,252,37,33,89,226,106,235,146,80,81,210,190,236,245,226,166,120,178,31],[194,136,176,80,162,239,195,112,116,235,140,181,74,85,38,55,0,10,95,107,19,219,19,4,72,199,134,75,202,202,22,12],[178,51,182,9,86,221,24,176,40,116,205,189,227,28,127,74,233,30,139,165,95,9,154,66,115,90,47,218,204,105,215,76]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(86, "39d6g", [[185,138,31,230,6,41,54,196,35,71,244,10,253,3,86,23,15,200,73,179,209,35,253,84,51,85,7,80,246,107,54,231],[132,135,40,216,244,206,203,75,185,39,137,167,153,130,166,108,108,194,49,33,206,247,202,114,167,126,2,156,8,178,13,14],[186,128,113,23,244,10,97,104,181,45,120,168,243,16,17,83,201,250,1,73,82,254,59,245,75,4,32,61,30,66,189,215],[181,80,152,229,57,196,12,16,176,229,150,134,175,103,249,32,75,93,29,95,213,219,250,44,208,46,60,165,152,3,231,198],[12,29,127,232,177,179,68,95,255,36,208,92,179,136,185,133,215,172,202,124,212,65,193,80,159,228,218,232,114,49,97,192]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(10001, "", [[40,140,215,170,228,124,176,8,135,68,96,34,172,105,122,111,173,117,140,196,1,99,143,153,160,123,244,38,252,111,46,88],[207,57,76,218,116,6,153,218,233,2,128,184,162,139,48,193,217,29,119,102,199,105,83,8,26,207,33,167,167,54,41,146],[249,223,103,182,102,66,190,64,168,241,98,23,145,236,138,19,81,18,142,232,210,168,45,96,72,77,204,51,98,26,67,13],[232,80,253,33,113,10,127,157,219,130,30,17,143,61,19,230,42,62,161,151,5,18,133,1,63,103,64,179,250,160,232,146],[127,212,134,127,155,164,173,22,248,116,138,143,170,113,195,118,102,42,40,105,249,90,138,56,102,199,6,234,139,217,28,191]], 29,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("kizr3q", [[202,52,68,156,52,108,139,100,68,52,200,16,95,194,24,36,73,77,17,184,67,75,9,163,78,145,13,34,126,230,113,60],[212,96,248,251,52,14,23,151,173,235,209,123,170,213,209,232,232,69,108,22,29,243,250,127,200,152,52,166,14,146,61,228],[161,158,94,180,191,178,184,179,215,233,19,50,73,110,147,211,59,145,23,197,34,149,244,220,106,30,218,219,30,212,39,71],[243,163,112,97,218,150,120,128,9,112,14,168,166,214,157,147,102,244,62,246,87,136,12,220,116,186,146,114,152,60,89,187],[89,29,15,240,84,254,59,35,126,113,71,57,25,230,52,209,157,225,106,253,127,143,47,213,77,162,172,94,88,94,92,112]], 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([179],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[6],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(128,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("ssz99",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("listingID arg", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("ETH", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("vyaiez", "call updateEthPrice",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("5r9xr", "IsLibrary", "39d6g",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("updateEthPrice called", "9wcdv", "ssz99", "UsesExample",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("trade.totalPrice", "RevertWithReason", "updateEthPrice called", "listingID arg", "PayableExample",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("ETH",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("kizr3q", 161,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("zc1wqw", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("listingID arg",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("P", 48,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("zc1wqw", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(21,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","39d6g"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[153,44,152,87,3,247,212,102,206,48,25,178,4,132,6,111,240,70,139,250,113,206,86,249,138,157,172,69,126,248,112,245],[230,46,190,158,119,142,119,31,141,191,209,230,252,126,118,237,92,142,181,215,35,123,92,141,226,75,241,54,117,234,229,159],[133,250,56,164,221,108,243,145,253,135,86,16,82,8,11,67,130,199,24,222,20,214,222,86,54,147,91,181,74,170,196,77],[29,130,45,193,91,73,110,247,165,127,185,222,146,22,176,76,156,168,6,68,229,215,58,123,247,86,37,232,83,149,231,100],[150,185,223,215,7,229,221,75,15,49,237,6,251,131,6,27,133,254,201,78,97,79,103,243,144,106,179,56,183,125,144,211],[14,98,201,107,156,79,34,42,154,135,176,150,42,163,110,132,141,155,98,4,86,161,118,24,52,96,149,161,65,173,17,2],[16,37,99,10,99,18,79,196,85,212,158,47,50,173,164,72,164,158,63,234,251,3,178,103,211,121,152,99,143,10,71,84],[33,238,197,1,75,170,67,222,46,122,172,52,149,120,23,92,32,80,75,135,182,189,161,161,77,163,71,170,176,136,221,207]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(102, 70, 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([253,108,129,138,92,146,232,64,69,86,150,8,23,198,84,208,4,191,46,8,180,255,54,53,62,187,136,46,162,86,159,126], [131,71,26,169,38,193,76,44,100,88,35,88,100,49,27,208,123,116,52,99,208,116,110,243,150,92,103,9,147,113,247,18],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([3,69,58,206,136,114,37,16,91,1,249,61,243,10,254,28,40,171,79,149,11,150,217,29,123,123,194,201,143,26,237,2], [85,12,152,78,208,147,36,157,226,65,114,37,118,212,158,149,95,203,135,137,163,0,153,143,19,135,198,6,208,7,105,132], [90,25,86,29,116,130,91,89,51,142,70,181,246,179,103,44,45,141,102,127,155,236,136,106,110,168,86,154,254,52,131,249],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([192,99,57,163,31,234,143,231,46,147,189,234,93,205,146,89,244,5,221,235,187,84,123,168,163,252,204,32,219,2,235,89], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([61,218,86,195,135,252,51,242,72,97,253,12,85,192,248,217,126,170,255,196,6,87,128,227,8,6,254,43,142,38,25,162], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([182,173,16,15,80,241,128,48,89,237,243,37,118,148,127,223,86,250,20,102,60,12,240,47,155,39,16,185,91,134,17,84], "Oraclize query was sent, standing by for the answer...", [163,21,75,88,95,8,47,163,43,147,247,189,6,73,41,184,169,223,27,87,90,30,106,77,164,67,195,113,14,153,63,248],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([55,231,21,13,179,32,254,133,209,10,126,158,78,13,216,71,137,185,120,77,37,63,180,133,226,202,150,63,221,228,86,234], "5mrwu8q", [216,217,8,165,17,58,217,55,204,109,114,65,185,182,106,70,110,194,128,38,33,242,163,133,103,65,57,236,167,117,79,25],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([3,149,16,21,251,187,17,70,141,38,112,247,222,187,239,236,30,95,130,69,134,119,134,86,150,124,13,195,11,1,162,69], [182,118,6,232,178,240,181,74,168,202,247,198,198,95,103,197,146,114,212,136,57,88,13,215,148,36,8,65,244,123,58,186], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([3,149,16,21,251,187,17,70,141,38,112,247,222,187,239,236,30,95,130,69,134,119,134,86,150,124,13,195,11,1,162,69], [44,36,181,189,122,173,139,78,33,203,157,101,29,11,118,157,52,63,45,3,216,81,99,98,9,108,145,100,70,140,239,231,41], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([129,192,202,120,121,123,98,247,189,96,244,182,121,133,169,151,189,29,1,124,22,129,143,145,7,35,130,36,190,225,140,215], [8,23,22,72,180,184,76,240,188,21,240,167,87,207,142,123,206,5,225,76,55,135,153,50,180,88,251,112,132,24,137,185], [14,158,226,32,229,255,116,0,102,119,82,212,223,159,113,217,49,48,15,132,95,154,39,196,120,18,22,213,124,48,147,174], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([35,11,208,176,31,65,47,112,2,225,67,177,120,85,182,196,36,9,252,4,153,71,201,22,180,230,171,186,70,145,216,29], [226,32,120,228,48,143,182,40,80,163,189,71,171,34,55,81,54,199,102,202,221,75,206,100,217,157,40,30,16,150,19,196], [154,135,179,88,47,133,190,36,60,78,120,105,247,50,115,232,46,69,180,182,49,225,68,159,166,204,235,122,146,71,170,85], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([196,147,204,6,98,146,109,36,138,112,47,60,202,194,230,51,185,244,223,62,140,79,162,75,196,106,170,114,168,255,162,88], [62,140,126,144,212,159,138,30,236,17,241,40,184,58,148,76,224,31,197,86,178,215,227,75,245,147,59,120,58,195,133,175], [91,156,75,191,175,113,236,162,206,214,91,85,164,24,225,135,123,41,237,203,92,157,140,78,249,225,119,9,8,187,99,28], "vyaiez",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([249,209,100,129,87,86,234,248,56,99,123,75,101,30,192,94,66,194,43,68,82,129,151,140,111,96,135,4,252,83,44,116], [97,86,79,37,128,95,172,208,127,45,50,160,32,168,28,233,23,141,19,51,196,9,150,128,198,242,3,140,21,121,0,25], [12,73,255,71,90,232,18,241,53,10,125,238,137,200,246,78,69,53,37,78,108,184,149,206,181,224,192,193,127,243,2,11], "0",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([74,22,80,35,162,13,209,91,65,7,100,104,46,25,76,144,77,91,224,100,154,161,16,192,231,184,48,14,92,212,162,34], [32,85,151,50,135,176,212,94,48,244,208,166,189,41,90,205,147,49,232,44,80,101,242,108,14,222,255,198,78,255,245,184], [209,11,193,37,106,65,19,126,216,173,204,135,61,92,63,132,228,49,150,34,131,89,137,104,111,201,40,127,131,15,25,125], "",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([112,128,158,2,185,110,0,243,67,195,72,208,148,5,17,183,111,249,48,94,51,45,159,111,224,203,168,11,74,15,151,0], [11,207,223,212,152,110,81,1,45,22,96,209,82,234,104,59,217,220,213,141,149,122,114,151,183,151,207,99,125,103,35,163], [44,164,27,28,132,80,85,30,227,145,238,241,182,185,200,111,120,122,248,94,215,113,254,38,228,91,69,105,244,181,83,36], "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([106,124,87,138,44,52,56,9,103,177,124,255,107,35,246,236,203,153,255,208,55,190,18,38,29,40,205,204,36,156,242,196], [88,253,131,166,183,80,181,169,26,253,207,20,210,147,100,162,116,140,106,179,91,171,165,223,125,76,240,178,210,22,15,72], [249,114,21,69,147,126,138,92,171,43,132,143,172,76,155,94,0,199,182,156,219,143,223,117,86,168,75,47,77,3,92,154], "vyaiez",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([158,35,243,25,235,4,218,66,116,248,206,0,119,228,155,111,179,164,198,31,149,47,232,111,200,234,207,208,71,119,133,106], [110,245,214,27,45,232,141,102,33,155,50,218,54,246,3,92,126,70,205,240,251,158,116,235,114,23,243,146,245,164,154,214], [243,197,78,168,60,77,196,112,59,0,5,159,55,144,205,46,60,141,60,86,120,220,192,82,164,125,196,150,20,208,130,255], "",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([105,20,45,75,85,47,190,157,134,108,242,39,17,32,245,159,106,11,7,220,193,188,38,2,17,50,37,112,161,61,142,190], 5, 2014223714, [132,210,41,150,66,62,87,130,150,68,85,221,51,58,156,177,38,34,71,89,101,138,93,147,220,186,84,28,181,64,119,37], 161,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([148,186,207,87,52,201,100,253,49,142,218,32,179,249,146,231,200,106,182,78,39,78,28,25,113,160,188,31,230,225,177,82], 63, [7,140,143,240,33,231,64,209,130,77,155,180,9,141,249,21,25,66,70,253,197,163,75,196,62,48,194,95,244,93,56,115], [93,162,93,112,201,115,249,161,153,222,127,27,115,203,111,232,191,212,116,164,247,235,205,145,220,7,246,51,25,250,71,9],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([115,178,204,220,60,89,220,144,115,97,134,187,253,217,244,185,5,196,20,80,132,92,70,88,211,54,232,104,21,1,160,177], [188,68,122,189,189,95,124,44,199,79,12,0,219,216,128,96,171,26,186,234,237,246,128,220,90,36,7,228,46,52,129,38,125,128,209,86,90,169,82,103,215,130,180,180,202,52],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([146,75,207,62,200,55,157,120,63,154,101,45,16,90,153,173,28,60,80,187,84,214,195,60,96,102,224,114,249,81,14,247], [35,111,183,44,177,212,123,12,100,10,74,26,240,39,109,224,128,35,106,71,121,186,189,138,109,43,5,11,60,164,130,126,161,37,128,61,137,161,60,82,247,44,50,177,27,200,236,208,141,228,45,97,164,224,237,181,69,72,0,80,35,168,31,167,93],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
