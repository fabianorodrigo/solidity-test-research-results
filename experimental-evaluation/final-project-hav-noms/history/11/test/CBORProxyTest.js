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

contract("contractProxyCBOR",(accounts)=>{
    let contractProxyCBOR = null;
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
    contractState = await State.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[1],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[4],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[7],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[3],contractProxy.address,contractTokenExchangeState.address,"PayableExample",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[3],contractProxy.address,contractTokenExchangeState.address,"PayableExample",{from:accounts[0]}');
      ProxyCBOR.link('CBOR', contractCBOR.address);
    contractProxyCBOR = await ProxyCBOR.new({ from: accounts[0] });
});
  
  it('Should execute testencodeUInt(Buffer.buffer,uint)', async () => {
    let result = await contractProxyCBOR.testencodeUInt({"buf": [138,40,141,182,252,74,40,150,78,148,235,252,107,222,141,160,163,225,227,42,196,182,36,148,190,88,41,154,136,198,5,101],"capacity": 97}, 65,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value>=0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [116,173,167,75,161,45,106,89,131,142,178,236,201,90,122,81,207,128,200,234,20,138,73,222,185,51,197,5,128,60,246,98],"capacity": 30}, 71,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value<0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [18,106,165,242,143,239,70,83,92,221,214,243,103,203,166,254,194,115,205,239,102,251,120,148,170,60,146,200,238,23,30,131],"capacity": 1532892062}, -1,{from: accounts[0]});
  });
  it('Should execute testencodeBytes(Buffer.buffer,bytes)', async () => {
    let result = await contractProxyCBOR.testencodeBytes({"buf": [149,0,159,237,108,162,45,214,31,255,58,87,10,41,225,115,111,218,196,246,152,22,178,82,128,229,104,65,247,71,69,114],"capacity": 49}, [94,148,200,117,106,164,76,61,187,82,75,127,224,152,102,50,192,36,224,135,235,255,158,121,242,150,187,74,37,253,159,65],{from: accounts[0]});
  });
  it('Should execute testencodeString(Buffer.buffer,string)', async () => {
    let result = await contractProxyCBOR.testencodeString({"buf": [123,126,165,8,24,113,247,15,64,130,221,189,211,136,16,196,146,119,111,233,129,115,152,189,141,116,51,154,151,41,41,150],"capacity": 1024}, "nabgbp",{from: accounts[0]});
  });
  it('Should execute teststartArray(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartArray({"buf": [255,254,89,130,25,20,242,244,245,200,78,168,229,226,201,80,29,144,99,200,190,47,196,124,231,238,240,5,84,188,192,167],"capacity": 11},{from: accounts[0]});
  });
  it('Should execute teststartMap(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartMap({"buf": [1,70,17,88,81,246,167,164,68,35,130,220,47,186,244,119,84,109,145,238,98,50,118,84,140,14,253,173,9,248,168,147],"capacity": 1532892063},{from: accounts[0]});
  });
  it('Should execute testendSequence(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.testendSequence({"buf": [248,128,73,50,206,132,244,32,155,123,165,159,100,30,137,23,105,0,65,239,169,193,194,237,44,247,185,231,64,236,141,237],"capacity": 95},{from: accounts[0]});
  });
});
