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
    contractShartCoin = await ShartCoin.new({from:accounts[2]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[2]}');
    contractState = await State.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[2],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[8],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[2],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"updateEthPrice called",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"updateEthPrice called",{from:accounts[0]}');
      ProxyCBOR.link('CBOR', contractCBOR.address);
    contractProxyCBOR = await ProxyCBOR.new({ from: accounts[0] });
});
  
  it('Should execute testencodeUInt(Buffer.buffer,uint)', async () => {
    let result = await contractProxyCBOR.testencodeUInt({"buf": [18,187,175,137,242,174,104,151,212,101,188,200,188,140,85,231,134,168,199,162,23,160,119,214,148,86,164,102,31,26,54,244],"capacity": 30}, 0,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value>=0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [2,209,207,86,160,113,252,174,134,191,146,145,46,146,8,79,97,103,111,158,219,96,245,169,125,59,207,126,73,230,159,244],"capacity": 257}, 32,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value<0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [96,31,165,80,7,109,157,167,117,90,242,234,154,172,14,81,183,171,186,49,141,98,58,45,217,126,146,223,223,219,156,199],"capacity": 46}, -1,{from: accounts[0]});
  });
  it('Should execute testencodeBytes(Buffer.buffer,bytes)', async () => {
    let result = await contractProxyCBOR.testencodeBytes({"buf": [59,242,90,250,165,57,128,50,122,215,99,16,50,76,253,103,74,96,195,20,76,204,60,84,145,28,73,54,133,61,6,237],"capacity": 200000}, [97,170,193,196,174,56,219,198,7,207,145,0,142,81,99,209,43,130,42,237,217,228,149,56,182,184,159,8,201,78,241,83],{from: accounts[0]});
  });
  it('Should execute testencodeString(Buffer.buffer,string)', async () => {
    let result = await contractProxyCBOR.testencodeString({"buf": [82,133,219,117,121,129,195,110,149,231,168,71,88,205,29,153,14,219,219,90,245,55,69,125,6,163,79,132,231,135,234,2],"capacity": 4}, "",{from: accounts[0]});
  });
  it('Should execute teststartArray(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartArray({"buf": [199,199,123,26,228,254,127,146,143,132,18,70,226,225,78,2,70,104,141,119,223,22,116,239,170,131,128,17,181,8,17,166],"capacity": 129},{from: accounts[0]});
  });
  it('Should execute teststartMap(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartMap({"buf": [80,28,41,46,108,6,62,71,123,159,110,197,107,154,20,31,207,232,176,20,154,234,70,88,142,55,23,40,141,247,56,155],"capacity": 10000},{from: accounts[0]});
  });
  it('Should execute testendSequence(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.testendSequence({"buf": [129,98,221,172,135,132,173,106,98,131,241,143,205,91,184,229,23,212,141,63,4,179,82,175,227,137,25,140,146,4,253,141],"capacity": 1024},{from: accounts[0]});
  });
});
