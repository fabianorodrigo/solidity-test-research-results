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
    contractShartCoin = await ShartCoin.new({from:accounts[8]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[8]}');
    contractState = await State.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[6],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[1],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[1],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[1],contractProxy.address,contractTokenExchangeState.address,"0",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[1],contractProxy.address,contractTokenExchangeState.address,"0",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(127,{from: accounts[0]});
  });
  it('Should execute testoraclize_setNetworkName(string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetworkName("IsLibrary",{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("RevertWithReason", 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("L", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(46, "IsLibrary", "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(1, "P", "RevertWithReason", 26,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("0", "RevertWithReason", 33,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("Oraclize query was sent, standing by for the answer...", "call updateEthPrice", "P",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(129, "UsesExample", "0", "listingID arg",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(65, "trade.totalPrice", "", "listingID arg", 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("updateEthPrice called", "Oraclize query was sent, standing by for the answer...", "Oraclize query was sent, standing by for the answer...", 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("L", ["RevertWithReason","costUSD","Example","0","","Oraclize query was sent, standing by for the answer...","0","P","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(18, "ETH", ["s9df8","s9df8","s9df8","PayableExample","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(21, "IsLibrary", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","ETH","RevertWithReason","PayableExample"], 30,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("RevertWithReason", ["mc0cif","mc0cif"], 88,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("call updateEthPrice", ["0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(20, "call updateEthPrice", [""],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(11, "\x19Ethereum Signed Message:\n32", ["updateEthPrice called"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("RevertWithReason", ["costUSD"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("costUSD", ["call updateEthPrice","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(31, "trade.totalPrice", ["UsesExample","8in64o"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(45, "m0kujj", ["trade.totalPrice","mw1q4xg"], 86,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", ["","mw1q4xg"], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("UsesExample", ["IsLibrary","mw1q4xg","L"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(199999, "\x19Ethereum Signed Message:\n32", ["","costUSD","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1532892062, "\x19Ethereum Signed Message:\n32", ["IsLibrary","8in64o","updateEthPrice called"], 59,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("L", ["fzsuq","ETH","Example"], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("s9df8", ["","mw1q4xg","s9df8","mw1q4xg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(6, "costUSD", ["UsesExample","PayableExample","\x19Ethereum Signed Message:\n32","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(5, "UsesExample", ["PayableExample","trade.totalPrice","L","RevertWithReason"], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("updateEthPrice called", ["RevertWithReason","fzsuq","0","RevertWithReason"], 11,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("\x19Ethereum Signed Message:\n32", ["mc0cif","costUSD","costUSD","fzsuq","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(19, "UsesExample", ["IsLibrary","L","costUSD","fzsuq","UsesExample"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(23, "P", ["PayableExample","PayableExample","call updateEthPrice","ETH","Example"], 9999,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("P", ["Oraclize query was NOT sent, please add some ETH to cover for the query fee!","costUSD","0","\x19Ethereum Signed Message:\n32","mc0cif"], 254,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("IsLibrary", [[171,14,102,69,23,49,55,176,43,46,27,59,201,190,123,87,137,42,92,85,173,188,57,198,177,24,78,38,83,49,55,252],[231,21,166,113,249,179,23,135,3,15,1,50,226,129,138,174,232,242,92,4,230,41,214,181,17,205,143,219,209,198,236,195],[173,200,39,118,201,100,251,56,128,76,143,200,39,60,103,60,0,184,187,71,154,97,25,70,139,239,221,149,4,9,216,50],[160,175,76,128,42,252,208,28,227,72,220,228,252,228,153,113,122,47,21,52,189,159,61,73,180,162,43,124,99,149,157,127],[214,48,152,87,112,159,169,226,115,193,202,213,240,46,105,199,93,10,253,35,156,243,100,238,12,87,225,185,0,3,59,61],[233,16,21,137,203,36,194,238,61,46,139,36,212,219,222,216,107,71,75,55,107,153,255,54,140,21,62,195,73,39,143,162],[98,88,41,26,99,237,100,94,108,112,99,91,216,235,170,11,148,138,244,184,14,87,121,205,134,206,118,3,44,246,138,208],[187,211,60,76,31,254,4,136,220,180,1,85,143,137,72,22,123,38,125,214,5,7,145,222,47,35,14,209,216,226,254,32]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(2014223715, "PayableExample", [[216,10,57,70,86,255,167,106,54,20,221,48,10,52,160,174,210,25,220,114,60,26,22,236,7,36,170,81,84,89,40,251],[195,207,149,100,160,242,176,132,82,153,11,165,95,148,74,74,221,246,44,93,132,61,202,100,140,251,110,118,68,103,49,229],[150,107,159,126,81,92,22,242,182,80,76,139,77,113,186,54,196,74,214,24,74,80,77,130,97,146,252,240,92,86,204,201],[77,134,142,36,216,191,51,187,13,176,213,170,117,26,136,192,56,73,116,22,185,232,163,200,170,128,134,208,116,189,11,16],[154,4,45,174,229,130,26,194,227,99,240,132,5,242,171,158,10,93,48,36,94,122,103,188,144,180,98,51,80,35,108,31],[185,96,200,124,178,205,253,238,2,237,167,137,187,238,150,167,214,138,147,3,144,177,17,229,34,52,237,141,202,133,34,211]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(18, "Example", [[80,12,30,51,138,69,6,110,32,138,94,208,236,194,146,24,46,91,45,68,121,34,217,132,19,7,194,182,197,133,206,42],[190,84,157,29,67,154,104,223,39,154,51,223,15,166,16,217,203,1,204,209,135,218,65,193,113,89,69,135,171,124,200,99]], 129,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("qtyv1", [[157,29,195,139,84,92,35,73,202,24,221,239,134,178,121,105,47,192,111,238,66,32,165,134,48,112,17,208,171,228,86,247],[124,54,12,46,139,204,219,219,26,191,36,31,92,182,234,180,43,194,209,11,125,163,116,56,26,252,35,178,251,245,14,213]], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("mc0cif", [[77,204,136,26,208,134,44,59,158,0,36,117,21,162,197,166,26,71,77,102,70,197,182,23,244,146,130,215,201,122,82,128]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(29, "qtyv1", [[15,106,191,84,47,33,140,149,102,34,197,211,111,103,238,178,231,165,141,45,7,20,109,107,233,180,40,153,7,168,175,189]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(22, "P", [[218,61,67,6,118,12,253,51,104,56,201,108,58,247,175,179,206,162,163,62,213,228,195,64,199,7,106,142,158,188,187,185]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("mc0cif", [[187,77,37,55,220,78,69,233,132,161,148,157,248,62,170,20,144,79,71,216,72,154,88,215,158,42,229,152,238,111,145,89]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("qtyv1", [[47,132,25,194,216,127,251,96,82,9,17,25,51,65,37,217,40,150,162,17,59,170,53,136,71,182,70,65,2,188,75,14],[138,138,111,254,236,212,184,155,59,159,165,41,87,99,61,197,108,86,11,181,20,213,69,169,156,216,141,31,241,51,11,223]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(255, "UsesExample", [[175,69,172,118,110,213,52,100,115,137,85,163,174,235,234,62,37,211,208,70,92,24,207,32,159,242,4,101,168,165,142,174],[252,151,231,48,158,143,6,215,146,44,23,31,55,146,56,175,33,216,247,210,80,177,187,112,30,98,75,105,165,107,233,164]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(98, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[142,1,53,122,60,24,9,199,27,136,204,207,39,50,217,151,125,33,155,58,201,217,207,186,141,41,93,56,225,109,168,244],[218,174,88,138,14,109,126,78,155,203,254,194,253,187,245,131,137,103,216,143,117,100,124,237,164,189,230,139,246,216,166,34]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("listingID arg", [[141,170,102,220,246,101,60,124,89,221,241,60,0,135,200,128,217,122,31,180,84,91,46,215,118,217,199,50,88,209,67,201],[247,185,228,80,82,227,48,116,104,143,165,120,197,107,181,228,118,206,160,2,21,134,251,163,97,123,166,200,104,102,204,230]], 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("mc0cif", [[170,238,85,120,83,85,169,143,67,205,195,175,5,174,95,228,134,88,69,55,231,208,69,154,31,66,167,195,253,138,206,168],[138,93,105,128,29,73,179,137,97,8,148,55,89,83,89,170,37,176,243,241,47,195,155,217,49,136,184,147,203,188,193,153],[30,75,223,113,9,50,255,12,237,170,210,74,148,59,152,202,82,7,166,200,8,158,44,92,38,157,24,222,136,151,241,129]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(9999, "RevertWithReason", [[68,5,16,217,59,134,103,131,70,204,74,182,68,189,137,74,32,218,165,174,73,242,174,72,225,52,43,245,203,223,40,224],[75,224,85,112,236,191,64,194,131,2,205,6,139,72,87,74,153,207,28,137,120,52,168,109,117,49,107,41,145,136,59,66],[202,141,168,186,236,208,152,225,223,57,197,250,228,131,193,104,202,209,68,219,172,222,31,155,104,56,169,235,215,249,164,21]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(129, "8in64o", [[166,10,50,218,186,16,182,38,39,54,115,114,246,53,190,255,201,153,254,222,86,119,255,93,193,234,213,225,178,31,108,6],[93,168,103,106,48,145,229,36,166,236,185,79,23,124,36,104,25,210,171,195,71,11,135,145,135,50,140,38,134,150,88,53],[41,200,165,64,248,69,192,229,113,103,41,254,208,116,242,93,214,121,249,1,19,176,175,143,65,51,140,25,174,130,203,208]], 16,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("", [[226,237,163,11,7,238,193,142,92,198,126,45,235,141,132,66,79,140,152,168,171,93,65,204,152,151,120,4,116,143,102,165],[130,202,60,84,142,42,231,207,168,223,65,32,144,250,192,32,169,179,25,234,55,168,79,113,189,5,139,148,84,51,18,171],[53,198,65,18,88,127,104,222,78,30,198,16,7,115,176,129,204,13,113,142,174,36,230,237,244,59,97,146,12,170,180,75]], 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("m0kujj", [[121,133,98,139,225,97,78,43,221,11,80,228,227,54,198,111,248,33,244,255,213,182,28,254,206,234,155,139,69,120,50,229],[192,21,21,101,215,72,157,27,34,80,20,137,92,177,93,244,25,223,93,176,213,22,99,123,117,193,75,128,191,62,92,78],[139,20,134,27,205,53,37,62,17,38,34,7,203,201,125,116,0,102,217,216,198,140,42,246,176,218,170,200,176,196,76,54],[13,161,236,141,25,226,155,177,151,208,137,12,128,69,52,75,20,206,251,13,129,144,34,48,149,51,233,246,151,29,120,219]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(88, "L", [[70,250,82,151,76,138,242,7,218,4,113,235,69,87,18,61,81,26,102,228,89,197,223,210,73,156,193,98,178,171,31,68],[188,77,72,9,161,198,157,178,136,171,235,255,1,146,178,236,43,127,145,95,94,238,86,187,238,117,67,72,59,31,23,205],[117,89,152,84,96,31,42,107,173,5,87,26,173,108,192,171,55,108,20,163,31,48,225,35,176,224,227,145,44,94,12,106],[168,111,124,2,86,173,204,61,99,242,82,34,103,92,193,185,2,76,169,203,132,175,220,73,32,137,12,13,21,177,109,156]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(10000, "Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[63,199,211,8,196,25,94,12,206,206,184,138,133,64,170,195,85,245,237,247,160,13,54,152,122,66,191,57,105,176,43,146],[142,205,105,170,20,20,120,39,244,229,183,142,128,3,77,202,11,67,208,122,21,124,170,209,150,24,201,34,201,153,49,168],[96,163,36,216,36,122,254,128,214,198,12,74,254,63,143,204,33,32,213,208,70,220,248,67,137,77,236,188,21,142,200,77],[17,124,74,49,133,158,196,135,164,68,193,99,213,149,11,141,103,85,142,136,3,75,183,170,61,100,84,23,165,166,251,244]], 63,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("ETH", [[143,66,180,37,227,246,47,103,47,201,220,147,105,94,99,130,161,234,66,196,58,31,101,167,97,231,20,155,199,115,185,224],[168,63,188,223,72,168,126,152,174,176,184,211,177,185,232,93,168,203,17,55,194,138,152,85,240,218,144,109,244,82,96,2],[120,184,242,254,255,218,151,198,6,166,197,17,169,19,188,244,138,235,8,132,248,178,15,56,154,46,194,217,191,128,123,230],[126,18,26,61,191,142,252,138,193,144,136,66,150,26,13,84,231,166,206,227,35,213,192,165,11,29,238,188,62,92,214,80]], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("costUSD", [[58,247,163,20,225,150,248,70,143,53,97,72,125,103,81,162,72,167,60,155,145,173,143,184,22,149,166,199,234,191,131,93],[251,210,202,61,16,9,191,150,63,71,206,193,27,141,146,19,196,172,79,234,42,15,128,125,151,130,206,208,177,8,7,169],[113,66,120,174,86,255,9,74,233,55,20,41,101,4,208,103,137,1,134,214,114,90,188,158,114,163,194,200,190,238,87,154],[241,206,155,143,131,53,209,227,131,179,161,225,117,121,3,19,251,91,78,7,175,242,254,215,225,194,138,159,153,4,129,95],[201,120,202,127,245,206,8,226,174,49,126,150,235,175,17,219,139,58,52,146,235,219,74,185,3,202,45,136,12,145,207,138]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(16, "mw1q4xg", [[170,68,13,16,167,159,154,42,203,63,129,109,112,130,101,155,15,59,174,227,175,94,45,54,137,176,10,108,200,167,101,91],[56,104,194,255,94,152,211,40,218,122,54,246,212,111,214,199,106,226,132,172,123,174,113,68,57,252,158,113,37,249,21,74],[232,143,117,50,49,134,56,9,16,116,117,144,40,28,82,120,173,141,167,36,33,135,127,135,183,241,63,246,246,198,240,49],[216,218,35,153,168,48,172,103,226,176,245,30,56,82,14,101,72,148,241,70,132,34,115,132,111,156,147,252,156,16,208,117],[149,183,138,113,33,40,247,168,156,139,128,143,67,215,118,230,236,9,239,105,21,25,55,132,155,155,102,96,157,20,159,130]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(29, "costUSD", [[208,231,241,191,172,58,185,97,139,149,104,106,97,249,50,127,31,202,158,227,196,36,194,236,129,61,218,68,134,251,142,122],[191,38,0,105,72,158,180,155,58,122,219,21,157,86,55,193,17,10,39,43,17,109,64,108,162,138,122,190,206,200,123,49],[138,39,113,217,10,222,40,90,38,25,197,155,145,136,195,130,240,164,129,210,208,203,64,23,98,106,37,43,175,73,162,50],[65,1,243,197,221,45,216,229,83,244,184,16,32,86,169,54,21,209,136,74,118,110,240,77,196,186,88,146,165,2,72,233],[83,196,73,126,235,204,57,120,25,214,238,134,186,21,119,250,179,237,76,37,66,202,58,91,158,215,15,29,19,75,161,28]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("Example", [[74,9,152,140,18,29,218,132,64,172,171,54,41,227,202,25,77,132,35,188,51,151,237,49,17,205,189,72,238,74,250,227],[193,107,233,38,217,72,88,242,71,235,60,74,89,114,135,100,174,145,221,100,91,247,187,173,69,60,195,254,119,11,164,215],[188,234,233,151,217,144,182,25,176,139,122,38,131,119,86,184,249,138,65,22,77,216,162,202,43,100,79,57,37,175,135,116],[5,242,134,170,93,78,82,197,233,159,23,125,56,233,114,33,139,149,86,201,206,55,221,61,48,206,165,38,228,150,162,230],[252,233,114,20,183,137,65,228,245,95,226,125,77,38,56,80,34,137,44,28,1,71,74,77,20,168,174,67,249,253,11,21]], 22,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([85],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[9],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(1024,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("m0kujj", "UsesExample",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("qtyv1", "0",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("updateEthPrice called", "P",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("call updateEthPrice", "UsesExample", "Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("L", "UsesExample", "qtyv1", "ETH",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "fzsuq", "P", "updateEthPrice called", "8in64o",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("Oraclize query was NOT sent, please add some ETH to cover for the query fee!",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("mc0cif", 28,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("P", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("P",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("s9df8", 64,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("RevertWithReason", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(162,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["mw1q4xg","L","L","","RevertWithReason","\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[161,212,246,129,62,11,78,163,249,54,76,250,224,13,199,79,142,210,187,191,128,139,77,52,14,1,95,200,133,50,184,185],[93,151,95,56,203,142,171,146,94,231,175,62,229,51,125,152,102,114,176,247,159,73,58,136,186,162,51,19,143,114,16,234],[182,218,255,206,16,133,93,145,252,117,180,226,119,171,234,38,35,39,124,225,55,129,199,192,109,113,239,89,179,253,30,202],[38,214,217,147,161,120,36,139,195,240,211,110,88,207,57,165,143,129,177,13,45,176,114,214,229,153,73,193,142,71,156,46],[200,17,213,242,242,184,35,37,164,195,238,103,84,203,217,6,1,197,198,232,102,179,45,233,66,177,141,170,118,173,22,6],[206,42,125,4,91,183,16,247,141,103,220,88,95,216,187,204,187,189,184,5,151,154,149,202,27,4,0,137,150,170,72,201]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(10, 28, 56,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([77,179,196,7,36,68,64,122,58,71,15,170,25,225,117,100,101,185,217,51,134,161,39,30,211,222,28,158,79,149,225,63], [100,19,8,162,104,7,5,120,230,126,70,213,206,22,51,243,246,86,223,145,175,163,56,30,7,18,108,81,62,177,251,16],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([226,135,219,53,164,70,175,238,11,58,40,92,209,192,158,224,212,34,107,6,174,113,197,46,228,167,102,57,39,194,22,154], [102,32,90,102,182,82,94,53,207,108,244,185,23,123,215,167,216,193,66,153,18,93,82,124,99,38,185,22,174,5,198,207], [139,63,184,200,245,138,204,53,235,249,40,135,255,93,144,171,53,68,194,110,135,43,171,141,137,62,1,188,56,79,78,38],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([201,140,202,189,254,108,149,126,135,125,228,230,140,150,158,191,28,185,190,93,201,19,239,60,53,250,245,31,227,60,175,46], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([101,178,77,53,159,112,153,93,143,134,169,21,220,3,106,171,192,55,60,149,161,226,107,139,28,85,50,235,85,10,63,52], 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([44,186,255,239,129,241,229,142,208,185,38,10,239,205,8,22,235,60,236,66,252,5,178,222,190,51,173,208,7,79,69,121], "m0kujj", [230,83,145,104,18,116,13,245,227,13,176,139,214,47,194,217,121,28,201,191,76,205,147,250,161,113,86,127,53,202,128,55],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([212,114,132,114,197,120,150,237,6,83,111,165,166,156,54,233,50,244,1,50,251,96,98,213,187,152,208,174,86,13,118,228], "costUSD", [1,102,132,233,113,160,54,65,73,54,196,128,143,203,106,174,65,250,92,221,180,194,148,250,98,194,178,223,94,193,48,13],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([121,104,36,146,77,199,121,219,177,220,252,36,223,156,9,12,66,152,192,1,67,115,233,233,103,91,36,10,175,36,113,193], [143,9,107,216,58,80,133,116,179,96,230,245,49,13,185,189,75,127,111,181,107,239,3,244,136,228,199,162,81,4,131,206], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([121,104,36,146,77,199,121,219,177,220,252,36,223,156,9,12,66,152,192,1,67,115,233,233,103,91,36,10,175,36,113,193], [247,84,250,152,72,228,121,27,166,36,35,191,228,215,219,207,175,192,49,132,59,102,197,198,113,236,60,244,15,28,45,150,81], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([191,121,251,202,187,18,163,37,45,146,20,206,254,95,134,22,141,124,185,183,101,203,230,5,248,125,69,61,237,185,133,29], [189,248,147,157,89,120,100,46,215,118,91,47,253,156,215,187,102,93,18,153,212,125,171,7,187,180,132,169,79,152,235,197], [171,23,97,110,146,123,156,3,236,233,213,90,111,219,192,236,8,240,34,49,231,193,247,27,79,160,151,117,178,128,56,243], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([56,189,210,127,101,89,191,94,114,9,144,77,141,77,102,65,35,226,35,92,147,252,201,42,161,85,175,32,204,103,221,95], [255,181,63,71,251,214,36,155,175,212,237,3,25,193,196,52,119,166,184,123,228,183,145,209,52,189,34,198,192,200,252,122], [111,205,198,253,90,234,223,65,178,148,237,134,194,73,134,38,110,240,147,58,124,252,125,105,63,100,55,22,104,229,109,151], "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([113,177,137,208,104,213,186,17,244,77,232,141,13,165,197,112,84,116,137,45,66,183,239,23,57,246,32,16,147,93,143,30], [21,224,196,134,185,154,3,42,0,25,223,219,113,60,119,13,186,245,222,198,32,170,171,203,140,39,195,195,83,126,160,161], [48,210,213,134,31,142,235,211,161,212,71,80,71,15,14,97,159,133,223,189,3,184,86,20,255,218,130,107,220,193,200,75], "costUSD",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([187,48,51,179,172,8,255,238,136,121,233,159,252,210,137,51,228,93,106,84,234,19,152,130,227,114,35,95,228,78,252,130], [150,130,213,175,26,18,237,128,144,196,248,3,74,38,121,121,151,81,250,105,38,41,104,98,167,190,217,219,232,225,192,94], [100,22,73,135,144,107,88,68,94,60,115,8,228,217,54,3,43,152,34,42,117,163,103,50,143,29,52,242,105,99,80,226], "PayableExample",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([64,25,112,172,65,229,121,5,176,215,86,99,239,65,84,254,184,165,183,186,32,230,103,167,22,102,172,103,109,229,106,53], [200,251,243,217,230,130,4,248,48,230,144,174,84,25,125,91,215,105,114,4,86,241,8,209,8,68,145,223,7,176,223,70], [125,40,201,41,3,175,11,157,30,32,254,62,195,73,117,53,17,184,174,192,49,83,74,54,251,139,81,211,154,20,13,27], "j6ofrp",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([54,233,76,156,211,252,230,253,170,228,64,110,149,131,154,11,198,142,103,202,212,184,173,232,49,169,9,15,180,134,45,125], [139,128,117,161,190,129,142,222,137,166,55,189,133,143,71,176,161,126,173,231,221,188,186,112,163,107,69,117,69,183,77,180], [52,220,33,148,128,171,119,237,136,92,153,0,255,210,183,253,209,6,50,91,238,67,95,126,177,114,42,81,14,229,1,185], "ETH",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([194,34,121,48,24,168,107,8,46,206,5,155,164,0,230,204,191,6,1,213,233,77,192,226,193,232,109,100,249,5,160,102], [125,162,105,19,70,179,92,126,94,92,186,119,157,50,223,61,23,250,194,199,235,137,58,138,241,107,123,37,176,102,13,44], [46,202,79,243,31,23,214,137,190,75,171,163,162,113,231,96,17,55,209,101,148,119,80,102,239,26,163,244,22,72,157,86], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([210,239,43,163,22,216,30,24,70,104,78,246,176,199,187,136,109,205,46,76,191,48,147,123,188,213,182,133,141,41,148,61], [163,204,126,118,163,51,129,129,230,230,146,59,141,136,144,166,175,125,175,254,237,174,4,65,251,221,42,115,223,186,4,79], [175,236,86,14,11,232,54,157,230,0,157,108,101,95,122,166,148,132,227,145,24,241,50,149,196,170,221,178,156,140,81,1], "5ojbre",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([180,180,143,87,8,124,34,205,11,9,202,93,67,24,5,167,29,228,174,94,154,13,44,23,137,61,28,191,70,223,178,128], 1, 70, [235,204,43,126,130,11,212,164,117,191,41,18,0,244,99,37,159,66,29,96,176,241,193,2,162,94,239,53,228,131,188,92], 59,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([0,246,34,32,78,4,20,187,86,173,3,89,239,3,110,54,236,133,125,25,71,211,54,100,17,45,59,169,98,90,207,154], 160, [1,0,22,6,6,29,33,110,40,70,34,39,101,186,177,16,182,199,137,138,152,246,76,121,158,26,9,120,233,20,2,211], [170,244,196,211,140,186,127,181,0,215,124,138,233,7,249,244,244,181,254,59,192,134,217,119,250,242,48,255,185,201,223,149],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([231,251,13,102,151,12,146,172,104,124,242,200,149,32,47,245,119,156,145,155,71,116,105,38,231,220,169,234,86,136,211,139], [226],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([253,237,155,229,185,192,51,97,166,61,156,17,15,209,66,144,254,224,186,130,5,140,177,172,234,49,19,199,6,130,81,216], [95,209,251,63,32,185,211,255,64,244,64,248,174,245,240,126,82,105,98,169,24,163,31,157,130,3,41,209,226,58,143,119,157,167,127,165,140,6,70,31,191,78,140,15,202,95,229,37,1,226,124,76,129,152,142,0,227,79,211,58,171,223,148,13,128],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
