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
    contractState = await State.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[6],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[3],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[4],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"UsesExample",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[6],contractProxy.address,contractTokenExchangeState.address,"UsesExample",{from:accounts[0]}');
      contractProxyusingOraclize = await ProxyusingOraclize.new({ from: accounts[0] });
});
  
  it('Should execute testoraclize_setNetwork0(uint8)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setNetwork0(49,{from: accounts[0]});
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
    let result = await contractProxyusingOraclize.testoraclize_getPrice0("Example",{from: accounts[0]});
  });
  it('Should execute testoraclize_getPrice1(string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_getPrice1("updateEthPrice called", 21,{from: accounts[0]});
  });
  it('Should execute testoraclize_query0(string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query0("efn1a", "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_query1(uint,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query1(256, "efn1a", "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_query2(uint,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query2(26, "h34xi", "Example", 98,{from: accounts[0]});
  });
  it('Should execute testoraclize_query3(string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query3("costUSD", "listingID arg", 200001,{from: accounts[0]});
  });
  it('Should execute testoraclize_query4(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query4("ETH", "costUSD", "Oraclize query was sent, standing by for the answer...",{from: accounts[0]});
  });
  it('Should execute testoraclize_query5(uint,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query5(47, "efn1a", "listingID arg", "updateEthPrice called",{from: accounts[0]});
  });
  it('Should execute testoraclize_query6(uint,string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query6(47, "\x19Ethereum Signed Message:\n32", "", "trade.totalPrice", 10000,{from: accounts[0]});
  });
  it('Should execute testoraclize_query7(string,string,string,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query7("L", "IsLibrary", "costUSD", 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query8(string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query8("P", ["h34xi","P","\x19Ethereum Signed Message:\n32","L","0","0"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query9(uint,string,string[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query9(1337, "UsesExample", ["costUSD","RevertWithReason","Oraclize query was NOT sent, please add some ETH to cover for the query fee!","IsLibrary","RevertWithReason","PayableExample","P"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query10(uint,string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query10(1532892064, "ETH", ["call updateEthPrice","wgh89"], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query11(string,string[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query11("uej51e", ["L","uej51e","costUSD","efn1a","P","call updateEthPrice","trade.totalPrice","L","UsesExample"], 1337,{from: accounts[0]});
  });
  it('Should execute testoraclize_query12(string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query12("h34xi", ["costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query13(uint,string,string[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query13(256, "uej51e", ["listingID arg"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query14(uint,string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query14(56, "updateEthPrice called", ["UsesExample"], 46,{from: accounts[0]});
  });
  it('Should execute testoraclize_query15(string,string[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query15("rp8bq", ["0"], 55,{from: accounts[0]});
  });
  it('Should execute testoraclize_query16(string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query16("updateEthPrice called", ["efn1a","uej51e"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query17(uint,string,string[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query17(25, "UsesExample", ["call updateEthPrice","\x19Ethereum Signed Message:\n32"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query18(uint,string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query18(4, "rp8bq", ["Example","L"], 60,{from: accounts[0]});
  });
  it('Should execute testoraclize_query19(string,string[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query19("costUSD", ["0","lrcdib"], 47,{from: accounts[0]});
  });
  it('Should execute testoraclize_query20(string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query20("UsesExample", ["L","Example","IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query21(uint,string,string[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query21(127, "IsLibrary", ["h34xi","0","costUSD"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query22(uint,string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query22(1337, "tpmofl", ["tpmofl","Oraclize query was sent, standing by for the answer...","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 28,{from: accounts[0]});
  });
  it('Should execute testoraclize_query23(string,string[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query23("Example", ["IsLibrary","efn1a","Example"], 27,{from: accounts[0]});
  });
  it('Should execute testoraclize_query24(string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query24("uej51e", ["costUSD","wgh89","","wgh89"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query25(uint,string,string[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query25(1024, "listingID arg", ["costUSD","y0wnx","trade.totalPrice","Oraclize query was sent, standing by for the answer..."],{from: accounts[0]});
  });
  it('Should execute testoraclize_query26(uint,string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query26(11, "tpmofl", ["lrcdib","","PayableExample","\x19Ethereum Signed Message:\n32"], 19,{from: accounts[0]});
  });
  it('Should execute testoraclize_query27(string,string[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query27("uej51e", ["tpmofl","Oraclize query was sent, standing by for the answer...","\x19Ethereum Signed Message:\n32","UsesExample"], 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_query28(string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query28("PayableExample", ["PayableExample","","RevertWithReason","costUSD","h34xi"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query29(uint,string,string[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query29(45, "costUSD", ["listingID arg","wgh89","efn1a","efn1a","RevertWithReason"],{from: accounts[0]});
  });
  it('Should execute testoraclize_query30(uint,string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query30(20, "Oraclize query was sent, standing by for the answer...", ["efn1a","0","ETH","L","Oraclize query was NOT sent, please add some ETH to cover for the query fee!"], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_query31(string,string[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query31("IsLibrary", ["UsesExample","P","costUSD","efn1a","lrcdib"], 161,{from: accounts[0]});
  });
  it('Should execute testoraclize_query32(string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query32("L", [[0,23,213,169,172,42,24,51,225,189,142,234,181,219,0,8,6,96,86,187,155,220,159,233,210,4,132,203,198,99,0,86],[232,210,84,219,68,60,223,121,213,117,181,186,130,97,110,9,253,188,165,51,106,209,229,61,247,219,223,212,61,144,170,89],[135,183,173,109,94,67,133,175,224,244,2,75,76,186,29,201,6,232,51,141,18,183,211,129,84,176,81,74,59,90,84,66],[81,241,193,170,152,21,70,25,107,216,132,53,17,14,19,48,64,34,191,61,154,62,215,160,96,186,240,75,81,99,180,221]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query33(uint,string,bytes[])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query33(9, "lrcdib", [[146,179,79,81,48,233,173,230,102,143,71,50,27,67,62,11,215,100,158,188,114,164,97,47,40,241,26,187,103,68,240,176],[168,2,179,128,180,118,78,116,75,1,41,114,223,146,13,128,155,55,14,98,8,198,109,108,25,148,140,169,191,178,211,160],[11,164,71,110,36,214,30,171,182,52,28,141,174,61,238,34,244,245,45,107,183,108,46,65,253,155,76,188,25,28,85,173],[215,165,137,92,212,50,156,210,190,59,100,126,62,168,212,87,114,170,62,65,254,43,36,231,7,10,15,98,117,244,130,75],[12,138,248,222,69,132,92,179,63,121,176,203,70,100,181,114,214,207,19,142,150,182,126,165,140,237,17,235,146,179,200,253],[89,134,83,239,149,177,142,251,106,16,112,27,124,73,98,5,123,86,231,27,17,145,43,122,171,34,189,236,244,155,225,196],[212,20,112,152,175,160,34,136,23,173,226,13,243,154,226,109,125,180,138,185,79,168,82,32,162,192,15,229,230,10,16,193],[200,185,208,58,147,234,221,230,219,207,98,215,103,77,120,195,34,162,32,230,238,210,207,36,100,116,198,245,69,245,141,106],[231,24,235,205,110,79,192,203,31,161,32,84,170,239,39,168,3,220,210,156,172,218,206,98,15,158,147,200,87,94,40,161],[117,21,193,11,202,31,34,153,208,249,2,177,179,89,187,149,9,84,134,115,40,164,237,45,63,107,54,55,36,213,106,47]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query34(uint,string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query34(257, "RevertWithReason", [[67,244,173,200,124,68,246,223,67,69,183,101,75,204,22,212,46,206,222,194,5,168,1,59,42,33,94,141,157,138,216,35],[53,55,172,91,221,81,168,250,59,193,155,156,186,43,156,67,14,85,3,73,192,81,208,138,50,96,38,99,139,186,95,101],[244,82,225,157,238,179,14,219,23,112,124,68,230,103,94,180,126,77,87,238,168,164,202,229,127,235,112,23,241,54,211,51],[21,25,179,7,78,5,112,152,229,92,58,64,52,110,241,221,34,252,77,32,178,20,93,58,79,173,249,51,223,72,177,165],[67,107,119,38,58,146,4,90,203,127,23,133,76,178,219,207,191,17,65,68,32,249,180,196,82,79,215,237,17,195,223,247],[199,28,189,233,3,33,210,143,7,50,43,104,232,239,84,168,133,81,147,141,29,230,184,153,101,253,171,241,34,2,122,37],[46,233,241,200,93,217,210,117,213,140,215,170,69,113,152,108,228,254,133,137,63,238,45,219,46,23,166,0,161,8,166,160],[196,238,88,104,60,128,93,120,55,185,224,213,42,73,120,98,116,101,169,37,49,93,90,98,26,11,229,193,42,37,185,126],[161,5,205,245,216,102,65,193,107,134,182,202,165,173,229,178,165,234,190,176,192,5,225,65,18,62,42,237,137,247,13,105],[26,83,27,70,70,102,93,164,42,255,40,88,33,143,143,166,56,95,174,43,242,200,26,179,212,195,247,184,157,237,85,244]], 49,{from: accounts[0]});
  });
  it('Should execute testoraclize_query35(string,bytes[],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query35("costUSD", [[194,188,129,172,71,138,79,243,172,195,185,220,204,135,217,95,204,251,62,54,109,126,132,142,164,12,102,1,40,189,21,204],[173,63,116,236,197,100,143,50,82,252,75,107,190,225,32,104,219,44,168,155,150,98,251,201,157,194,42,232,199,55,150,153],[163,132,201,166,131,27,242,156,148,199,242,246,20,56,145,190,98,230,158,119,145,205,118,31,117,31,227,154,214,75,229,178],[203,5,208,37,114,169,87,205,112,37,226,18,224,124,174,131,71,184,42,181,193,230,157,186,33,36,52,189,97,130,77,237],[76,193,67,244,36,184,135,96,230,143,184,141,209,225,187,103,150,124,251,163,17,195,174,224,228,53,79,205,71,75,224,127],[69,20,62,121,214,60,245,21,185,222,32,180,91,82,77,138,195,246,49,86,188,100,34,217,242,228,133,250,240,95,201,28],[94,148,19,162,173,29,32,189,22,205,53,239,252,61,72,222,3,217,171,246,179,70,90,128,219,227,135,132,253,63,64,176]], 25,{from: accounts[0]});
  });
  it('Should execute testoraclize_query36(string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query36("L", [[60,180,111,106,190,89,88,45,108,125,244,148,91,226,56,34,28,107,115,72,138,21,14,162,5,61,81,210,218,74,172,242]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query37(uint,string,bytes[1])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query37(98, "PayableExample", [[35,241,37,120,239,255,144,208,181,251,17,162,8,189,10,98,29,109,23,18,0,204,89,128,3,134,44,21,32,236,89,69]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query38(uint,string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query38(255, "PayableExample", [[140,175,222,125,135,187,174,63,41,109,77,10,99,213,187,29,29,252,64,244,138,140,197,59,88,138,136,133,92,141,202,199]], 95,{from: accounts[0]});
  });
  it('Should execute testoraclize_query39(string,bytes[1],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query39("trade.totalPrice", [[196,58,227,104,6,87,182,40,161,238,231,75,200,69,95,61,129,37,4,72,186,164,114,2,113,31,21,92,154,77,146,0]], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query40(string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query40("updateEthPrice called", [[53,153,51,231,242,191,27,154,179,165,24,113,34,126,81,205,226,219,46,105,46,133,35,164,27,27,223,151,255,175,93,95],[226,27,146,10,17,14,166,26,8,235,69,5,154,234,225,191,36,84,130,195,88,255,198,9,178,9,203,229,204,201,30,245]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query41(uint,string,bytes[2])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query41(101, "\x19Ethereum Signed Message:\n32", [[14,170,84,175,0,58,10,64,60,145,30,94,109,198,71,29,30,69,202,245,88,100,205,135,70,11,66,32,41,217,63,71],[37,31,121,93,4,170,206,242,117,43,174,170,101,31,31,192,111,34,200,5,161,12,210,144,216,78,156,172,253,71,183,67]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query42(uint,string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query42(57, "lrcdib", [[0,110,253,162,254,219,217,8,247,130,165,150,46,162,130,248,86,209,101,129,3,116,123,126,216,229,73,61,103,144,134,124],[164,37,44,17,190,170,24,47,140,29,28,191,198,146,38,5,219,191,116,110,193,204,7,221,245,89,160,250,61,61,78,160]], 5,{from: accounts[0]});
  });
  it('Should execute testoraclize_query43(string,bytes[2],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query43("0", [[147,149,159,149,189,158,78,80,191,227,239,138,179,115,18,112,6,109,95,137,114,168,98,166,146,67,194,128,61,56,205,94],[199,125,189,47,168,51,208,159,8,187,112,194,199,21,203,59,172,88,57,113,222,211,253,167,48,97,207,171,224,97,7,151]], 2014223715,{from: accounts[0]});
  });
  it('Should execute testoraclize_query44(string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query44("PayableExample", [[164,111,118,47,68,98,96,101,188,16,142,108,180,190,33,239,94,203,68,205,232,137,8,197,66,189,215,183,200,148,156,245],[91,89,2,50,254,239,180,241,116,196,136,213,141,122,61,56,229,240,254,29,157,175,202,251,60,7,114,54,100,152,75,174],[28,60,60,113,4,224,167,211,249,150,126,170,138,191,0,73,10,165,176,212,196,193,143,95,13,81,120,116,139,0,12,213]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query45(uint,string,bytes[3])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query45(4, "Oraclize query was sent, standing by for the answer...", [[203,214,7,133,246,99,26,202,100,23,239,147,207,249,51,253,30,121,45,181,66,60,228,19,94,60,71,253,41,75,121,29],[206,218,127,49,51,229,161,205,153,145,207,159,93,190,98,56,69,94,186,8,217,228,4,225,199,232,241,127,45,16,161,87],[243,118,22,71,1,112,143,60,2,20,67,26,191,46,70,215,125,83,172,2,189,129,227,108,191,19,82,94,65,207,18,85]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query46(uint,string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query46(55, "L", [[8,129,104,88,16,179,211,165,158,32,237,125,169,209,13,95,175,5,116,175,139,92,39,58,81,103,45,128,181,198,187,220],[193,181,8,161,175,152,110,174,248,110,102,21,193,152,106,229,237,142,83,232,233,56,85,6,44,208,192,105,50,110,146,200],[148,55,162,74,229,155,8,152,64,246,184,133,203,175,173,173,63,120,116,136,225,231,108,203,170,122,206,162,66,234,16,208]], 18,{from: accounts[0]});
  });
  it('Should execute testoraclize_query47(string,bytes[3],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query47("biyuu6", [[99,114,44,125,137,250,126,171,233,33,33,199,139,220,0,180,133,27,199,111,134,236,132,240,18,83,48,186,242,167,32,98],[226,78,231,202,138,197,142,162,41,12,23,149,31,244,86,15,9,185,113,253,20,146,223,153,4,82,165,237,102,110,50,53],[60,233,154,203,103,187,67,143,234,148,206,147,165,54,159,8,139,12,195,204,16,121,83,204,14,164,59,94,60,214,13,140]], 1532892063,{from: accounts[0]});
  });
  it('Should execute testoraclize_query48(string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query48("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", [[225,117,26,61,67,241,63,67,137,57,47,64,187,232,53,30,46,173,86,5,106,115,248,136,147,104,167,188,157,39,16,34],[73,76,216,47,57,248,70,35,172,36,228,107,7,52,115,39,70,130,107,177,232,239,187,246,200,150,13,197,18,126,152,121],[50,64,12,26,76,190,119,199,194,76,128,122,219,214,54,238,241,50,58,43,29,178,16,25,71,245,149,91,32,179,12,200],[136,33,110,207,8,109,166,142,85,52,47,77,49,0,20,118,120,4,93,154,188,81,55,85,144,11,210,180,223,241,117,146]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query49(uint,string,bytes[4])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query49(200001, "RevertWithReason", [[166,215,134,108,252,214,76,146,82,239,4,111,197,143,111,152,71,73,167,31,88,17,204,15,189,87,201,239,51,239,97,146],[13,59,0,85,229,73,69,108,82,58,153,228,114,42,155,143,230,159,73,184,123,161,44,162,203,33,3,34,243,173,84,179],[85,27,172,153,176,157,225,147,170,204,130,69,234,112,89,229,69,159,46,144,165,158,109,184,11,114,184,63,197,80,97,23],[179,216,36,51,93,45,8,166,48,164,237,42,136,198,37,81,17,252,82,209,42,16,103,127,215,197,212,194,191,125,133,158]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query50(uint,string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query50(86, "wgh89", [[217,113,248,231,33,228,247,157,142,209,217,199,81,244,207,123,193,243,139,83,15,102,29,39,139,130,208,179,193,6,238,46],[184,211,30,134,92,121,144,216,161,193,123,210,219,32,124,177,114,145,248,38,1,90,127,80,176,58,171,135,132,177,42,14],[134,107,112,51,209,166,183,17,222,145,49,34,247,2,213,60,123,136,101,16,195,12,95,8,193,9,163,7,60,120,2,15],[124,158,131,202,36,5,228,204,122,179,90,162,16,197,132,74,227,232,109,222,147,198,34,147,250,244,49,3,186,188,215,121]], 69,{from: accounts[0]});
  });
  it('Should execute testoraclize_query51(string,bytes[4],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query51("ETH", [[109,101,158,152,150,127,152,235,203,84,95,106,34,84,142,200,234,128,162,224,28,70,167,120,35,1,149,23,214,254,34,150],[57,225,242,213,236,211,13,126,112,129,96,248,222,128,66,209,171,53,211,205,168,252,10,254,98,157,161,115,169,79,113,9],[57,12,193,57,131,144,164,151,172,21,144,56,196,69,234,63,143,185,191,18,10,182,106,78,46,125,241,218,35,150,104,100],[111,231,199,137,74,93,2,242,8,164,164,5,87,187,238,1,153,8,43,139,86,206,238,33,17,166,59,205,185,112,223,95]], 97,{from: accounts[0]});
  });
  it('Should execute testoraclize_query52(string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query52("PayableExample", [[164,62,103,17,69,96,93,63,244,86,203,45,142,118,124,93,153,196,147,203,221,227,254,129,207,82,112,9,56,34,187,227],[183,101,96,49,151,14,31,131,241,64,120,247,221,193,184,124,184,209,38,187,169,136,154,149,126,57,66,92,99,174,67,228],[231,48,217,140,168,57,45,71,54,152,219,198,77,201,141,122,43,186,84,91,73,198,62,114,131,1,132,48,252,150,194,139],[177,180,47,29,99,69,224,47,52,39,13,20,141,165,71,23,196,215,97,186,61,121,222,84,46,76,67,202,233,51,84,138],[239,209,177,226,194,100,51,110,109,107,221,216,168,169,227,125,92,227,201,229,207,13,172,192,5,158,129,38,103,4,116,132]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query53(uint,string,bytes[5])', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query53(127, "biyuu6", [[199,159,201,23,123,34,1,19,96,215,13,2,169,198,132,63,199,230,138,188,232,118,143,129,107,96,136,198,138,75,125,43],[170,235,37,201,218,200,51,236,63,151,28,79,25,62,193,169,213,153,240,139,159,100,166,145,219,95,184,189,150,227,134,200],[4,93,114,219,144,203,150,77,134,50,166,116,139,126,77,91,125,255,110,74,146,102,39,81,236,25,249,231,147,139,159,248],[156,16,217,171,103,246,243,105,132,246,126,131,106,242,139,113,225,100,91,117,26,44,173,201,2,6,134,159,25,15,186,187],[218,189,215,99,249,210,63,28,97,10,116,220,93,246,47,44,77,12,208,166,170,92,197,174,7,64,56,185,63,58,248,36]],{from: accounts[0]});
  });
  it('Should execute testoraclize_query54(uint,string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query54(254, "costUSD", [[37,27,143,249,12,101,255,153,33,220,20,221,89,140,60,242,87,31,201,98,203,73,79,179,148,246,194,98,100,4,14,237],[83,107,95,198,209,130,72,127,233,14,175,8,11,245,232,1,30,187,212,150,4,2,239,162,52,246,157,188,111,183,106,42],[241,61,125,21,125,7,134,42,28,32,246,89,123,235,74,105,139,51,105,42,246,164,183,193,79,191,208,203,67,244,182,148],[25,57,240,178,177,181,12,137,222,34,104,116,36,1,77,156,132,93,7,211,86,114,138,235,11,43,24,203,127,11,206,173],[50,147,133,149,173,209,16,222,9,146,1,9,84,165,203,95,190,9,50,124,51,230,172,206,6,57,54,163,15,249,207,90]], 1338,{from: accounts[0]});
  });
  it('Should execute testoraclize_query55(string,bytes[5],uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_query55("ETH", [[97,117,19,31,185,132,41,252,134,19,96,26,67,31,37,112,188,102,113,117,50,91,234,187,219,53,168,42,17,93,190,172],[78,71,140,214,241,252,245,129,42,76,39,239,128,75,246,56,124,214,137,235,231,86,98,229,61,28,189,112,139,62,255,65],[230,165,31,91,196,228,225,131,3,199,154,160,17,60,44,170,62,29,171,150,73,219,217,63,243,4,136,64,79,205,121,192],[199,148,15,36,221,233,157,251,92,27,205,2,234,43,28,132,237,249,12,49,18,104,75,161,239,22,14,223,175,6,29,71],[170,98,42,220,140,177,131,224,48,158,191,115,21,13,219,23,24,137,174,139,105,167,143,117,133,182,104,99,116,16,227,241]], 127,{from: accounts[0]});
  });
  it('Should execute testoraclize_setProof(byte)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setProof([130],{from: accounts[0]});
  });
  it('Should execute testoraclize_cbAddress()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_cbAddress({from: accounts[0]});
  });
  it('Should execute testgetCodeSize(address)', async () => {
    let result = await contractProxyusingOraclize.testgetCodeSize(accounts[5],{from: accounts[0]});
  });
  it('Should execute testoraclize_setCustomGasPrice(uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_setCustomGasPrice(61,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_getSessionPubKeyHash()', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_getSessionPubKeyHash({from: accounts[0]});
  });
  it('Should execute testparseAddr(string)', async () => {
    let result = await contractProxyusingOraclize.testparseAddr("costUSD",{from: accounts[0]});
  });
  it('Should execute teststrCompare(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrCompare("wgh89", "efn1a",{from: accounts[0]});
  });
  it('Should execute testindexOf(string,string)', async () => {
    let result = await contractProxyusingOraclize.testindexOf("Example", "IsLibrary",{from: accounts[0]});
  });
  it('Should execute teststrConcat0(string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat0("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", "wgh89",{from: accounts[0]});
  });
  it('Should execute teststrConcat1(string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat1("PayableExample", "updateEthPrice called", "ETH",{from: accounts[0]});
  });
  it('Should execute teststrConcat2(string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat2("rp8bq", "efn1a", "call updateEthPrice", "rp8bq",{from: accounts[0]});
  });
  it('Should execute teststrConcat3(string,string,string,string,string)', async () => {
    let result = await contractProxyusingOraclize.teststrConcat3("call updateEthPrice", "tpmofl", "ogtcur", "Oraclize query was sent, standing by for the answer...", "ogtcur",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt0("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("0", 7,{from: accounts[0]});
  });
  it('Should execute testsafeParseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testsafeParseInt1("wgh89", 0,{from: accounts[0]});
  });
  it('Should execute testparseInt0(string)', async () => {
    let result = await contractProxyusingOraclize.testparseInt0("h34xi",{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b>0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("Oraclize query was NOT sent, please add some ETH to cover for the query fee!", 59,{from: accounts[0]});
  });
  it('Should execute testparseInt1(string,uint) WHEN _b<=0', async () => {
    let result = await contractProxyusingOraclize.testparseInt1("rp8bq", 0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i==0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(0,{from: accounts[0]});
  });
  it('Should execute testuint2str(uint) WHEN _i!=0', async () => {
    let result = await contractProxyusingOraclize.testuint2str(87,{from: accounts[0]});
  });
  it('Should execute teststra2cbor(string[])', async () => {
    let result = await contractProxyusingOraclize.teststra2cbor(["IsLibrary"],{from: accounts[0]});
  });
  it('Should execute testba2cbor(bytes[])', async () => {
    let result = await contractProxyusingOraclize.testba2cbor([[41,197,182,197,192,41,47,123,40,248,19,120,166,23,89,223,234,4,75,94,160,248,212,206,54,88,61,62,8,141,3,50],[136,226,100,231,108,255,86,35,152,228,219,176,73,57,233,112,121,28,187,245,139,191,106,40,36,2,7,230,110,146,164,251],[71,145,177,181,102,88,9,188,54,171,104,201,40,45,150,200,158,93,102,215,92,26,178,241,200,234,34,109,152,127,77,39],[132,3,1,222,163,100,174,246,126,132,156,202,2,176,87,240,49,70,52,100,118,95,140,16,159,86,62,219,67,237,127,159],[133,216,194,189,162,13,0,169,28,3,175,211,211,116,46,0,253,208,67,222,104,115,255,48,148,230,102,127,15,51,29,52],[173,50,61,165,189,58,14,206,240,171,28,162,62,125,206,70,49,174,230,89,66,141,196,124,60,119,24,117,200,151,6,177],[134,224,219,53,72,119,57,98,237,101,175,210,93,133,184,63,248,10,199,44,22,6,144,127,211,91,222,134,58,94,74,87]],{from: accounts[0]});
  });
  it('Should execute testoraclize_newRandomDSQuery(uint,uint,uint)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_newRandomDSQuery(1337, 257, 103,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_setCommitment(bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_setCommitment([109,197,200,94,115,182,124,163,54,120,145,68,130,193,71,83,251,126,22,82,72,118,31,73,82,161,231,4,74,121,202,112], [182,33,57,233,154,22,160,107,56,67,225,16,252,113,122,54,86,49,68,194,46,98,144,23,134,183,207,142,105,47,159,92],{from: accounts[0]});
  });
  it('Should execute testverifySig(bytes32,bytes,bytes)', async () => {
    let result = await contractProxyusingOraclize.testverifySig([153,39,11,171,236,207,36,232,146,202,20,71,104,220,93,48,59,151,134,140,215,75,165,104,156,208,198,135,201,175,147,209], [64,244,119,248,25,158,10,5,251,182,201,223,133,147,182,43,38,219,200,44,126,16,18,69,127,102,119,72,155,125,57,41], [162,180,194,90,224,49,226,255,249,10,213,235,31,102,182,43,37,215,213,208,33,239,140,125,32,127,176,60,109,3,122,137],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([111,236,154,226,142,99,192,138,187,157,33,96,76,135,190,152,234,182,149,22,200,109,95,159,75,174,165,206,220,113,74,9], 199999,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__sessionKeyValidity(bytes,uint) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__sessionKeyValidity([76,43,88,248,97,8,63,124,62,167,152,241,60,155,85,160,122,200,183,93,213,37,46,114,8,88,240,19,91,176,5,113], 58,{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([8,117,116,181,65,189,67,120,89,65,179,163,106,201,60,3,169,224,250,16,122,148,15,221,115,250,190,66,145,222,72,187], "0", [135,30,115,239,18,140,29,128,248,139,63,135,190,219,11,63,208,23,128,136,244,89,153,210,22,60,131,101,240,38,239,165],{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__returnCode(bytes32,string,bytes) WHEN Identifier==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__returnCode([187,58,82,104,59,228,220,202,99,83,67,136,212,62,180,183,254,61,40,168,232,140,7,128,20,99,108,222,175,106,101,208], "updateEthPrice called", [89,188,7,158,157,52,247,159,23,145,31,126,138,159,127,106,254,249,5,115,215,69,212,243,118,169,48,46,41,249,247,249],{from: accounts[0]});
  });
  it('Should execute testmatchBytes32Prefix(bytes32,bytes,uint) WHEN _prefix.length==_nRandomBytes', async () => {
    let result = await contractProxyusingOraclize.testmatchBytes32Prefix([130,61,106,239,184,90,246,75,232,107,247,31,57,31,140,206,221,122,87,196,93,22,128,4,201,134,65,222,97,222,210,6], [49,188,154,167,212,65,26,157,212,91,6,96,134,8,141,48,232,60,124,145,248,99,38,98,46,0,203,211,139,242,75,139], 32,{from: accounts[0]});
  });
  it('Should fail testmatchBytes32Prefix(bytes32,bytes,uint) when NOT comply with: _prefix.length == _nRandomBytes', async () => {
    let result = await truffleAssert.fails(contractProxyusingOraclize.testmatchBytes32Prefix([130,61,106,239,184,90,246,75,232,107,247,31,57,31,140,206,221,122,87,196,93,22,128,4,201,134,65,222,97,222,210,6], [144,11,224,61,197,147,6,171,32,100,82,172,111,0,191,86,108,88,93,9,226,155,180,102,127,136,31,127,191,120,27,212,108], 32,{from: accounts[0]}),'revert');
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([55,186,94,237,53,46,151,8,248,121,129,64,143,96,55,249,241,75,52,73,182,130,55,90,123,242,10,161,24,155,77,55], [190,70,75,117,60,66,223,231,229,130,205,49,177,29,127,223,67,100,123,182,235,119,250,86,134,12,249,245,186,167,113,127], [47,188,67,104,186,191,121,197,51,81,206,80,60,252,188,44,39,152,102,201,180,244,96,117,194,132,142,233,170,241,11,203], "trade.totalPrice",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall == FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([5,57,242,197,197,24,70,176,148,127,50,198,166,64,131,168,199,122,234,131,191,191,34,21,1,40,32,113,101,44,26,104], [136,152,192,228,228,181,110,187,132,179,216,24,63,215,6,28,63,65,129,8,192,118,3,112,225,120,236,74,96,250,92,167], [220,35,147,250,183,75,57,191,131,14,193,137,75,132,240,127,79,224,133,71,6,162,249,228,29,202,243,155,183,132,187,208], "lrcdib",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([236,85,156,109,35,11,105,245,156,183,242,133,237,55,26,110,4,65,191,17,64,177,186,110,132,188,167,121,145,17,67,121], [40,183,189,60,188,49,78,58,121,81,13,251,150,69,30,9,207,63,72,121,169,249,22,232,44,205,162,241,55,38,158,20], [32,47,95,212,48,89,42,46,86,181,250,3,235,129,180,131,234,213,118,2,26,22,197,255,94,204,67,98,21,13,135,39], "IsLibrary",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([126,62,98,250,13,155,45,192,113,3,167,124,172,90,184,3,18,49,25,19,224,132,148,179,210,130,36,140,232,181,197,230], [176,111,71,211,203,210,236,47,172,214,128,123,8,111,230,88,168,9,195,85,159,106,143,180,172,164,64,110,33,250,196,82], [27,152,107,239,16,143,183,122,183,65,114,143,128,69,186,98,9,248,202,41,206,218,21,131,44,165,145,55,25,180,150,86], "rp8bq",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([225,51,219,74,80,134,235,200,118,27,115,187,255,202,132,89,207,244,200,95,87,45,85,3,169,21,35,238,238,24,61,229], [95,115,65,163,184,66,2,161,255,238,189,151,63,152,165,133,54,36,92,55,79,155,115,225,63,184,73,15,179,182,212,208], [41,43,130,57,140,101,89,125,220,162,216,133,237,38,154,23,109,106,194,36,72,74,32,174,178,227,99,104,140,12,208,124], "\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN FunctionCall==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([84,251,221,156,6,193,34,136,217,207,173,212,50,27,82,126,63,117,93,150,149,203,193,14,221,92,69,237,152,143,33,131], [182,230,218,174,125,177,134,227,254,247,220,12,32,182,94,167,89,55,60,35,225,91,229,81,85,152,252,69,167,233,160,230], [141,55,9,53,8,58,151,250,111,44,102,37,85,149,250,160,108,122,214,236,54,161,98,164,200,217,168,250,87,78,146,107], "L",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified!=true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([27,220,148,112,18,95,16,90,5,145,253,39,50,125,45,125,13,236,156,100,124,49,211,220,46,173,136,61,187,21,111,232], [86,239,73,232,46,118,165,32,125,61,199,100,232,144,157,175,138,1,92,178,177,147,153,191,137,235,239,97,101,216,78,124], [209,52,219,201,14,110,102,217,170,105,241,232,78,47,248,196,249,156,254,232,183,73,170,164,26,255,53,214,54,107,56,112], "tpmofl",{from: accounts[0]});
  });
  it('Should execute testoraclize_randomDS_proofVerify__main(bytes,bytes32,bytes,string) WHEN oraclize_randomDS_sessionKeysHashVerified==true', async () => {
    let result = await contractProxyusingOraclize.testoraclize_randomDS_proofVerify__main([50,100,211,123,235,154,188,124,247,130,166,32,236,44,235,150,174,134,66,202,96,71,96,100,27,8,39,95,187,140,7,54], [166,53,247,107,235,80,222,253,0,52,40,231,208,197,94,159,43,184,2,189,55,176,228,33,149,233,0,131,61,181,148,134], [154,138,17,227,201,58,113,134,60,201,156,113,244,121,8,223,65,31,193,127,94,34,147,206,254,226,141,143,112,72,158,234], "h34xi",{from: accounts[0]});
  });
  it('Should execute testcopyBytes(bytes,uint,uint,bytes,uint)', async () => {
    let result = await contractProxyusingOraclize.testcopyBytes([6,80,132,74,46,69,175,135,134,200,71,245,147,48,146,40,23,229,169,35,205,147,64,175,45,197,99,82,230,12,55,150], 1532892063, 200001, [15,29,94,224,72,65,105,133,103,178,8,188,78,212,244,171,181,48,102,139,208,56,202,101,146,158,48,127,211,67,195,246], 60,{from: accounts[0]});
  });
  it('Should execute testsafer_ecrecover(bytes32,uint8,bytes32,bytes32)', async () => {
    let result = await contractProxyusingOraclize.testsafer_ecrecover([112,46,167,166,71,125,203,141,250,36,168,27,107,132,235,190,229,157,47,140,218,195,80,29,218,97,54,93,252,110,231,32], 88, [126,46,54,228,81,100,98,18,185,237,23,130,157,25,195,88,203,230,203,35,39,215,170,127,229,63,57,212,196,196,247,157], [225,43,35,111,142,104,83,81,96,210,63,113,124,48,18,223,132,157,236,23,201,93,89,170,219,219,238,174,241,83,28,143],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length!=65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([22,48,1,44,106,182,117,232,10,60,97,114,242,23,95,206,35,12,69,40,30,5,160,179,18,242,221,141,91,212,40,248], [35,112,246,87,24,233,24,59,144,35],{from: accounts[0]});
  });
  it('Should execute testecrecovery(bytes32,bytes) WHEN _sig.length==65', async () => {
    let result = await contractProxyusingOraclize.testecrecovery([112,232,93,135,204,134,109,124,24,31,199,21,103,48,13,45,51,160,64,247,169,252,133,175,63,145,43,11,191,141,47,164], [66,225,40,138,253,157,119,2,247,24,157,67,85,94,28,150,114,212,255,129,11,125,15,30,90,144,157,201,175,156,44,21,158,235,85,94,94,118,108,131,109,58,102,142,60,98,52,73,16,149,33,48,221,22,249,107,117,4,75,62,166,104,184,223,193],{from: accounts[0]});
  });
  it('Should execute testsafeMemoryCleaner()', async () => {
    let result = await contractProxyusingOraclize.testsafeMemoryCleaner({from: accounts[0]});
  });
});
