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
    contractState = await State.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[6],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[0],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[2],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(66,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("trade.totalPrice",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("P", 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("Example", "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(48, "", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(28, "ETH", "\x19Ethereum Signed Message:\n32", 4,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("call updateEthPrice", "PayableExample", 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("0", "Oraclize query was sent, standing by for the answer...", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(59, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "0", "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(64, "IsLibrary", "Example", "Oraclize query was sent, standing by for the answer...", 65,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("Oraclize query was sent, standing by for the answer...", "updateEthPrice called", "RevertWithReason", 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("0", ["call updateEthPrice","trade.totalPrice","ETH"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(2014223714, "trade.totalPrice", ["call updateEthPrice","PayableExample","ontzbo","PayableExample","P","call updateEthPrice","Oraclize query was sent, standing by for the answer...","Oraclize query was sent, standing by for the answer...","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(1338, "Example", ["UsesExample","call updateEthPrice","UsesExample","","UsesExample","UsesExample","RevertWithReason","ETH","9t5ehe"], 64,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("P", ["9t5ehe","0"], 1,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("nt1ft6e", ["RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(18, "9t5ehe", ["call updateEthPrice"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(70, "listingID arg", ["call updateEthPrice"], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("", ["Example"], 160,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("PayableExample", ["call updateEthPrice","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(22, "listingID arg", ["","updateEthPrice called"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(61, "tbc359", ["call updateEthPrice","0"], 128,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("P", ["L","0"], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("L", ["trade.totalPrice","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(49, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["RevertWithReason","nt1ft6e","listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(10001, "0", ["trade.totalPrice","0","trade.totalPrice"], 2014223714,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("9t5ehe", ["0","L","9t5ehe"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("costUSD", ["tbc359","","trade.totalPrice","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(56, "\x19Ethereum Signed Message:\n32", ["RevertWithReason","us07sd","P","nt1ft6e"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(161, "UsesExample", ["updateEthPrice called","tbc359","Example","Example"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("ETH", ["ETH","PayableExample","9t5ehe","IsLibrary"], 96,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("UsesExample", ["us07sd","9t5ehe","L","0","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(1023, "", ["ontzbo","UsesExample","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","L","tbc359"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(4, "IsLibrary", ["P","Oraclize query was sent, standing by for the answer...","tbc359","Oraclize query was sent, standing by for the answer...","tbc359"], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("ogk39", ["ontzbo","Example","ontzbo","RevertWithReason","ETH"], 9,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("tbc359", [[184,248,197,66,221,114,219,131,207,185,21,154,116,81,82,198,231,174,27,65,239,37,187,42,218,254,145,59,108,242,16,75],[98,48,145,201,246,86,14,110,20,139,162,1,108,193,106,58,169,176,251,5,67,228,139,206,173,132,236,68,8,142,10,156],[164,221,21,113,128,211,204,241,187,169,241,194,127,205,164,94,244,245,28,204,141,64,212,197,66,79,113,248,159,90,114,176],[243,162,141,119,191,145,81,50,47,105,48,105,204,122,204,125,252,138,204,40,75,227,21,198,130,34,15,212,12,216,186,157],[50,205,191,248,85,3,254,147,215,86,155,234,77,177,119,42,254,33,220,26,200,233,222,9,243,27,199,125,19,203,254,217],[159,17,189,144,31,2,199,173,193,72,71,121,227,201,83,254,73,255,192,241,194,44,23,245,171,154,153,47,122,48,7,221]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(127, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[173,117,42,225,221,71,110,135,66,108,203,112,109,163,64,94,223,154,244,242,28,209,189,176,100,160,194,193,127,114,208,25],[182,99,108,88,185,49,22,34,212,223,113,201,227,102,131,76,241,250,19,36,99,47,253,23,73,157,251,35,152,233,64,140]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(18, "updateEthPrice called", [[225,22,104,80,133,60,218,206,2,0,30,143,132,202,54,127,130,120,172,181,30,63,221,162,178,36,180,213,26,219,173,55],[166,51,213,41,248,164,149,2,168,89,29,7,115,33,80,102,250,210,90,61,97,134,165,91,9,149,251,177,24,177,48,112],[25,175,170,1,167,126,16,1,106,134,123,53,45,36,161,226,52,98,204,225,74,32,155,177,76,205,212,123,54,249,184,177],[137,99,21,71,72,222,49,152,93,243,61,19,178,115,158,175,40,220,57,212,125,147,245,107,201,200,177,31,181,53,217,153],[116,250,142,67,167,166,87,175,174,24,152,49,225,244,147,253,49,122,171,108,235,192,47,103,51,195,158,58,146,21,56,212],[103,253,98,52,169,173,111,108,92,8,81,113,238,164,73,211,204,17,122,211,28,91,208,179,135,159,75,176,241,195,33,121],[74,223,146,3,230,143,190,94,230,161,192,152,210,204,161,6,220,204,94,163,218,164,203,125,17,113,174,1,61,243,162,185],[86,199,100,116,235,13,197,9,190,77,105,152,52,71,164,15,3,157,2,246,15,111,83,25,130,219,152,147,226,118,113,75],[224,5,208,167,203,215,173,195,68,81,241,1,225,93,22,133,4,109,246,224,94,3,154,192,208,103,95,151,176,237,23,213]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("\x19Ethereum Signed Message:\n32", [[35,12,60,140,34,107,227,4,111,46,19,190,152,111,13,15,72,114,55,45,166,82,36,134,77,97,41,135,5,65,56,96],[94,49,158,60,76,93,243,133,106,92,254,137,255,25,64,56,132,10,150,51,152,133,228,194,250,16,170,196,206,176,212,219],[72,231,114,122,10,190,83,214,105,97,210,170,218,154,129,123,17,233,117,95,20,9,125,18,207,48,121,23,233,39,24,171],[141,97,207,22,4,87,53,159,189,244,90,168,101,162,185,41,178,218,101,116,172,149,203,183,44,143,170,86,110,84,107,167],[89,41,3,37,96,154,72,248,161,227,242,102,176,159,154,24,171,126,100,66,53,120,110,78,111,33,17,154,211,205,255,50],[7,53,74,127,111,223,22,78,27,162,185,141,128,39,163,190,91,81,240,221,115,233,39,43,161,135,7,192,194,16,157,34],[67,63,246,75,231,41,167,180,120,49,57,169,237,168,97,51,177,181,32,192,47,61,197,20,56,77,117,229,77,12,112,81]], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("listingID arg", [[184,180,8,149,201,213,205,99,204,151,156,126,21,15,195,97,228,212,249,7,167,128,245,90,185,6,65,152,21,143,1,159]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(9, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[110,78,32,96,204,20,113,10,223,152,82,77,3,217,243,38,248,38,122,196,31,29,160,57,206,228,167,232,161,207,214,23]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(86, "P", [[226,111,201,197,35,66,4,208,209,119,90,222,60,216,188,250,170,79,171,118,30,99,100,85,12,75,144,232,55,201,55,97]], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("IsLibrary", [[29,11,99,9,27,204,132,92,17,166,41,71,90,172,188,203,102,126,84,61,216,53,253,124,84,5,79,211,82,24,174,229]], 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("y65pch", [[216,90,23,210,137,128,198,168,35,100,87,67,236,235,71,236,193,225,169,6,106,251,166,197,1,235,81,145,183,80,1,20],[206,128,163,158,83,58,87,237,223,31,110,77,53,128,117,121,201,66,116,115,32,255,19,70,124,137,88,242,141,145,243,89]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(1338, "updateEthPrice called", [[151,92,96,54,205,172,255,118,207,178,101,205,142,178,38,147,47,74,212,217,162,229,63,26,45,235,206,156,28,202,179,174],[22,4,143,157,197,135,215,220,195,12,105,221,128,78,169,73,24,185,97,222,84,232,182,217,178,54,150,235,234,23,190,229]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(86, "ontzbo", [[160,79,65,196,181,1,83,185,89,39,85,4,233,254,190,71,96,127,128,196,97,40,95,176,52,162,237,86,63,117,117,80],[251,178,61,17,244,19,207,166,149,248,107,176,190,137,38,77,110,12,14,226,45,19,227,108,104,0,146,29,106,123,27,77]], 45,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("nt1ft6e", [[62,6,95,92,70,232,180,198,178,73,230,201,46,181,141,62,49,47,20,226,242,215,189,105,188,14,24,16,159,239,111,5],[130,122,188,213,52,22,203,12,101,14,254,72,254,155,87,42,54,250,84,168,102,219,119,119,202,150,232,91,203,236,88,81]], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("9t5ehe", [[190,53,115,137,183,238,195,110,8,244,190,129,149,255,214,90,19,168,137,190,96,254,140,80,211,41,147,86,187,182,224,110],[158,217,228,34,233,45,112,51,8,31,104,84,214,247,146,248,170,132,108,114,135,213,228,223,46,178,75,122,151,105,116,164],[96,29,82,164,208,50,24,18,183,166,124,46,15,38,159,118,21,54,229,57,41,192,16,100,189,76,138,243,170,148,74,167]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(33, "ontzbo", [[188,159,57,221,241,100,249,221,43,174,231,3,18,246,10,48,179,112,127,113,186,115,104,97,143,34,76,63,193,161,5,65],[23,70,121,39,0,178,69,224,237,6,94,243,135,110,96,63,125,90,89,95,172,62,133,141,51,96,33,155,233,160,22,54],[13,143,254,44,255,222,102,244,214,120,4,168,90,56,120,233,159,30,242,67,78,43,141,89,37,66,236,186,125,225,245,168]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(10000, "UsesExample", [[202,248,45,46,13,252,146,207,156,143,225,77,231,249,126,14,24,187,241,96,65,192,71,113,15,187,244,115,59,202,37,186],[183,218,114,129,101,237,183,90,233,12,189,69,18,251,123,104,98,46,85,105,20,45,136,115,18,218,174,36,169,39,169,206],[155,110,85,45,19,238,216,94,144,170,215,26,195,14,62,40,49,152,243,233,202,207,234,64,56,241,211,148,157,232,114,209]], 6,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("Oraclize query was sent, standing by for the answer...", [[177,6,26,248,167,64,165,90,146,132,246,6,22,214,245,65,44,244,173,69,126,49,224,161,241,125,160,238,154,96,233,139],[85,254,73,84,19,185,224,135,63,109,204,254,100,21,239,96,251,168,176,232,154,36,8,26,122,8,196,15,103,194,169,127],[162,249,52,97,152,32,48,5,180,160,237,103,68,127,185,228,21,241,154,68,3,249,177,107,24,132,84,196,240,215,24,190]], 1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("ogk39", [[42,54,27,121,227,112,33,203,184,176,62,124,168,73,5,192,204,214,67,0,160,184,225,246,172,12,196,179,69,55,196,7],[217,74,138,119,5,127,157,148,170,147,111,186,184,69,195,162,148,189,156,213,65,184,19,56,183,118,227,148,153,52,100,20],[150,176,57,246,215,56,185,10,77,234,48,82,19,103,123,206,218,132,139,102,111,167,115,166,199,30,70,194,15,231,238,247],[253,111,62,183,103,58,247,222,239,147,81,82,79,225,34,237,251,156,47,12,206,6,103,244,44,75,24,37,25,232,231,96]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(200000, "IsLibrary", [[72,68,23,78,221,121,38,83,54,158,89,22,152,194,231,57,13,141,51,74,3,89,255,118,35,16,1,1,211,219,185,239],[209,70,157,162,147,161,95,28,99,215,92,237,17,186,55,82,237,13,133,200,219,149,100,166,21,8,1,202,71,24,43,2],[101,59,140,148,51,192,232,25,150,228,51,113,26,147,118,35,194,10,211,234,48,221,120,51,218,219,125,210,29,39,131,117],[156,246,175,115,192,239,150,86,102,231,214,110,84,188,112,167,89,108,35,13,251,135,112,144,138,197,7,248,57,0,100,198]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(3, "updateEthPrice called", [[240,31,97,9,137,222,112,104,186,130,204,58,169,2,72,74,93,129,104,148,159,50,65,159,101,15,192,203,77,25,189,31],[199,216,113,146,226,147,15,53,112,124,0,227,116,21,53,128,238,116,124,136,6,6,245,116,161,170,172,8,76,21,175,54],[102,96,232,94,10,130,211,107,30,189,96,15,69,98,20,85,192,34,162,255,50,245,27,4,185,207,159,37,246,172,178,201],[210,25,226,120,79,92,69,150,175,101,115,199,217,163,132,214,88,78,52,245,211,181,17,153,133,106,177,57,104,51,66,175]], 48,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("updateEthPrice called", [[162,201,42,21,220,86,231,101,185,74,221,134,111,134,230,236,212,57,188,31,211,87,17,108,174,144,59,185,98,173,40,39],[181,113,241,57,159,115,35,234,172,143,68,11,50,248,25,78,142,87,64,128,222,210,248,25,216,2,73,144,139,255,213,124],[92,89,119,38,115,209,143,166,68,185,190,135,44,206,205,106,238,40,174,41,46,138,144,93,95,66,165,140,66,244,19,185],[20,91,192,17,1,249,88,211,93,102,118,2,94,29,140,113,168,250,141,107,128,52,15,25,222,155,204,104,201,209,97,61]], 17,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("ogk39", [[46,182,243,76,73,71,9,156,103,217,211,181,1,48,167,78,179,9,147,64,75,88,93,34,18,119,167,1,168,156,238,162],[144,98,165,20,144,95,112,35,8,154,137,123,151,12,248,144,52,195,80,40,244,87,234,60,168,63,25,8,190,190,27,184],[166,32,96,216,169,87,101,232,50,35,118,96,91,249,161,170,130,3,236,223,184,110,14,230,229,14,20,196,47,108,112,219],[171,102,35,230,106,28,1,102,227,14,81,85,58,74,26,8,255,228,155,220,61,223,205,216,68,142,177,156,33,117,11,15],[234,246,63,136,68,150,76,77,159,232,127,6,42,168,17,246,142,201,211,89,247,114,143,151,247,145,111,46,27,120,28,233]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(161, "", [[129,244,214,213,141,50,38,142,204,125,154,249,156,80,34,253,74,91,142,52,136,39,68,183,209,5,231,74,166,98,253,7],[26,225,176,108,200,134,76,47,207,203,181,68,156,59,121,17,111,67,26,65,212,84,22,199,13,189,123,110,110,142,78,84],[245,135,17,41,32,104,197,213,88,234,178,47,216,137,119,69,101,190,190,154,223,47,41,75,244,196,255,134,131,81,93,135],[36,37,21,204,74,137,92,22,43,216,15,45,180,4,87,134,156,22,218,62,92,138,148,160,93,89,37,202,174,102,160,247],[142,170,159,67,18,222,130,194,141,161,175,43,178,50,19,124,116,69,108,83,86,4,94,248,73,34,131,216,130,31,45,90]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(58, "trade.totalPrice", [[184,243,51,201,173,193,51,34,245,225,61,104,39,205,169,233,83,54,75,48,234,186,16,23,189,136,95,178,116,57,138,103],[183,214,73,14,176,68,216,152,84,2,115,212,163,109,41,124,136,134,205,42,72,184,4,183,7,233,58,133,15,114,174,30],[186,101,222,82,249,189,67,95,221,242,235,28,82,186,60,110,14,86,16,255,229,9,242,176,24,26,81,152,35,199,49,141],[235,143,117,179,34,11,152,75,43,20,74,85,41,77,244,88,11,7,85,117,196,61,132,33,90,207,190,203,51,199,231,0],[216,155,71,54,122,43,9,216,167,65,194,237,159,157,173,139,191,36,220,18,73,35,170,184,244,152,93,58,102,145,50,96]], 8,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("updateEthPrice called", [[23,54,111,88,101,187,183,97,100,124,216,206,134,60,185,248,18,10,208,215,172,192,49,135,59,102,198,39,203,210,131,144],[23,64,117,247,177,106,145,71,237,200,63,101,96,72,104,239,204,225,56,241,191,30,248,108,50,204,163,28,103,83,73,50],[165,13,95,22,243,241,198,63,78,3,173,31,4,18,219,66,3,23,201,86,228,80,150,139,163,138,35,39,202,185,152,225],[120,238,229,154,28,66,169,38,231,14,41,95,254,88,117,2,207,50,174,24,192,215,191,24,247,181,251,80,94,58,219,155],[156,231,67,90,249,132,194,220,10,225,234,138,242,129,45,188,51,135,178,149,31,237,177,248,238,74,217,67,40,230,76,179]], 20,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([187],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[5],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(17,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("RevertWithReason",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("9t5ehe", "nt1ft6e",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("listingID arg", "daflwak",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("trade.totalPrice", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("ETH", "call updateEthPrice", "y65pch",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("0", "ontzbo", "L", "ontzbo",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("0", "y65pch", "0", "7l0bhc", "y65pch",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("htdiri",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("P", 1024,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("Example", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("us07sd",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("ontzbo", 1337,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("nt1ft6e", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(11,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["ontzbo","trade.totalPrice","y65pch"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[80,17,123,41,24,11,59,209,106,116,43,237,149,124,175,186,135,188,39,1,86,254,110,195,216,255,153,239,118,165,207,89]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(49, 96, 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([152,118,44,91,239,124,56,91,79,232,137,200,176,62,32,75,13,242,45,18,174,139,167,5,129,149,213,174,78,98,15,232], [218,221,54,238,234,79,18,90,129,43,153,190,169,19,79,69,197,31,11,225,129,12,98,180,40,24,86,123,175,145,87,227],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([226,121,145,97,185,202,180,183,127,66,24,48,90,5,201,106,202,150,23,73,159,232,200,178,81,56,107,217,247,85,231,225], [184,128,145,112,128,125,9,217,16,226,141,182,46,55,32,19,60,203,8,57,3,241,59,55,134,114,219,40,218,120,230,105], [200,133,91,85,135,170,201,88,113,232,85,153,37,93,165,18,116,157,27,169,45,216,198,208,227,184,191,63,235,123,252,53],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([162,221,223,242,184,169,82,231,68,7,184,163,228,155,113,126,39,1,191,91,31,158,185,112,201,118,144,43,112,179,130,35], 87,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([207,221,142,184,21,241,119,78,173,211,61,233,222,235,104,34,116,49,48,242,214,88,14,25,254,235,120,236,211,98,213,87], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([226,117,42,13,105,169,106,142,88,9,233,87,114,60,13,170,183,168,171,28,107,53,181,24,75,54,76,191,47,1,55,50], "ETH", [215,128,81,175,34,217,84,72,113,19,164,173,140,159,174,18,104,230,113,145,129,61,46,25,105,143,209,232,198,214,245,62],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([167,108,232,179,148,35,112,141,37,68,76,196,32,190,84,162,106,16,194,96,103,126,114,169,25,118,131,145,241,232,101,203], "daflwak", [42,60,40,181,174,92,171,55,231,37,182,74,247,8,223,94,73,246,182,29,224,75,254,241,102,42,171,101,228,135,146,108],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([5,233,140,225,146,254,122,118,192,182,165,246,158,253,237,184,157,108,90,119,70,45,178,119,83,125,134,141,76,91,37,144], [183,70,20,11,202,80,14,109,119,28,105,101,236,197,230,198,48,211,255,88,26,225,209,43,51,108,42,93,125,191,113,192], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([5,233,140,225,146,254,122,118,192,182,165,246,158,253,237,184,157,108,90,119,70,45,178,119,83,125,134,141,76,91,37,144], [7,128,56,242,162,175,32,121,139,194,232,101,194,55,205,150,191,201,67,121,102,236,50,101,51,234,183,32,16,89,187,127,243], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([40,16,143,200,238,135,219,116,30,47,229,168,153,55,214,249,228,13,194,105,88,127,197,158,29,72,242,87,195,117,133,191], [33,242,154,207,11,152,7,74,146,171,246,61,134,100,105,23,106,236,57,177,86,213,199,138,111,124,122,211,63,0,242,243], [170,183,57,48,89,199,7,219,189,125,70,69,10,164,87,60,140,137,186,58,4,83,37,220,6,138,72,69,64,220,200,157], "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([45,165,151,225,159,245,94,184,223,11,216,193,52,188,220,198,139,67,172,164,127,192,231,122,213,160,46,35,125,251,164,224], [140,246,214,105,60,132,254,77,173,56,70,103,151,165,86,239,154,26,160,194,167,232,201,204,180,101,104,195,210,52,149,236], [206,9,128,79,22,127,174,159,176,79,94,98,64,34,179,176,149,0,206,240,50,69,56,51,57,206,48,200,81,96,122,177], "UsesExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([81,38,52,26,121,250,228,69,168,133,236,63,155,38,92,178,54,181,90,46,59,235,195,140,128,89,159,194,57,6,145,212], [140,79,164,177,82,50,88,226,236,107,82,35,171,20,106,194,198,248,183,160,69,172,229,154,100,44,3,60,128,245,43,122], [209,224,55,215,17,148,236,238,6,216,175,251,246,163,208,30,58,48,118,229,84,18,96,110,251,134,213,216,79,27,209,232], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([50,15,6,54,36,86,150,192,94,34,105,92,23,53,229,228,113,224,18,189,81,200,110,226,210,210,115,230,98,179,230,11], [209,100,45,139,52,82,181,209,229,25,154,47,14,225,6,210,156,27,30,52,253,19,117,84,193,5,197,140,44,8,165,97], [8,189,199,180,97,4,110,191,41,216,45,97,160,143,118,97,94,234,156,125,218,121,90,5,186,193,23,147,123,172,123,61], "RevertWithReason",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([162,114,135,183,53,62,202,121,200,73,120,31,169,108,46,145,60,249,22,126,254,90,125,83,46,219,245,94,26,45,225,0], [209,130,126,21,134,187,223,232,6,247,136,178,60,25,204,49,85,192,130,79,175,101,57,143,27,65,30,195,129,39,236,95], [71,147,37,60,126,122,140,94,44,13,95,127,172,91,131,47,229,55,20,246,55,19,114,129,54,142,13,173,213,80,43,208], "ogk39",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([79,104,198,238,168,234,203,82,87,107,143,37,238,168,247,35,114,97,22,150,160,83,62,126,139,247,233,151,29,18,108,67], [33,117,236,216,59,207,157,42,166,4,32,103,166,58,24,99,244,119,197,209,181,8,70,52,0,118,77,230,25,41,45,219], [225,160,179,171,177,85,96,82,44,72,78,3,7,134,127,9,29,3,243,105,94,78,64,199,218,245,3,220,46,103,215,189], "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([14,239,197,18,18,170,61,98,152,117,171,243,229,3,149,243,175,246,201,195,131,234,230,149,152,117,3,229,237,217,253,246], [76,213,226,41,233,230,134,26,75,74,117,21,25,197,217,40,147,49,185,46,23,71,71,54,54,12,204,126,178,151,32,158], [120,209,13,65,136,241,112,114,142,150,178,250,93,184,99,57,182,120,142,175,245,190,204,239,68,146,125,196,35,127,176,214], "Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([45,213,14,158,201,100,105,67,174,139,232,240,50,8,235,177,133,202,166,64,127,53,90,168,170,201,176,169,26,229,135,105], [142,11,97,223,64,151,9,238,99,107,211,219,5,89,90,149,147,58,27,191,138,141,45,137,63,32,191,57,222,216,203,235], [127,150,168,112,9,155,36,25,150,133,26,219,237,87,83,235,214,214,96,140,72,137,192,121,158,71,3,138,159,76,29,71], "y65pch",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([124,59,34,102,138,189,47,225,170,164,54,31,86,178,190,175,79,220,120,114,107,172,249,178,168,2,58,88,69,212,255,89], 1532892062, 32, [101,6,162,5,37,148,222,59,124,3,6,158,230,124,8,38,104,14,93,39,153,1,61,119,50,253,164,115,157,131,218,151], 49,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([41,2,4,174,212,27,118,20,197,119,188,165,83,131,110,219,116,53,233,125,30,151,1,200,41,165,69,234,26,140,156,117], 48, [128,21,186,103,10,123,60,215,73,107,209,242,243,49,216,239,244,135,63,248,6,45,18,139,218,252,78,192,81,200,176,55], [174,85,180,193,58,59,250,127,0,115,56,215,227,235,24,190,219,192,133,249,84,92,45,41,22,140,200,19,1,235,127,89],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([34,167,223,240,43,146,85,124,95,55,161,159,99,43,194,77,98,220,214,158,179,231,108,8,20,108,222,199,181,241,68,14], [92,54,147,84,137,24,124,82,212,220,140,26,189,34,58,140,56,203,198,236,123,32,181,144,153,241,211,216,92,227,186,232,188,66,177,226,25,204,128,49,208,221,57,161,168],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([76,138,47,219,129,254,148,111,93,87,11,121,167,246,251,194,109,62,196,182,34,118,180,202,134,232,197,154,225,154,166,206], [67,227,203,2,37,64,100,45,212,147,254,108,228,9,26,115,242,41,247,145,193,98,138,213,122,122,144,235,50,88,237,235,130,105,142,14,30,85,219,47,126,148,127,30,185,193,170,123,92,19,23,207,113,3,88,148,195,158,189,184,43,110,0,52,109],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
