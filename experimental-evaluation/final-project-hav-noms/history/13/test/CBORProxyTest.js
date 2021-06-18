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
      ProxyCBOR.link('CBOR', contractCBOR.address);
    contractProxyCBOR = await ProxyCBOR.new({ from: accounts[0] });
});
  
  it('Should execute testencodeUInt(Buffer.buffer,uint)', async () => {
    let result = await contractProxyCBOR.testencodeUInt({"buf": [205,220,177,35,208,140,80,106,229,46,130,136,79,12,162,157,65,128,132,56,209,95,64,2,86,107,240,47,81,96,137,21],"capacity": 102}, 200000,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value>=0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [7,217,28,57,156,213,244,99,53,148,27,161,114,128,25,203,167,65,218,41,161,239,129,110,142,196,33,126,157,42,175,151],"capacity": 255}, 24,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value<0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [215,18,162,5,247,27,234,84,245,51,8,138,219,240,149,85,93,134,188,156,185,173,15,94,241,14,109,159,199,205,46,203],"capacity": 160}, -1,{from: accounts[0]});
  });
  it('Should execute testencodeBytes(Buffer.buffer,bytes)', async () => {
    let result = await contractProxyCBOR.testencodeBytes({"buf": [121,148,197,216,91,130,200,184,122,133,215,170,117,4,69,86,106,222,143,198,224,40,234,37,174,97,195,158,79,145,235,80],"capacity": 199999}, [26,75,26,202,120,128,4,3,13,91,14,237,40,40,109,210,170,249,255,108,241,67,20,230,193,91,50,157,149,250,185,198],{from: accounts[0]});
  });
  it('Should execute testencodeString(Buffer.buffer,string)', async () => {
    let result = await contractProxyCBOR.testencodeString({"buf": [90,22,219,103,158,54,244,13,84,165,70,110,242,82,144,133,235,149,72,100,151,48,79,167,30,44,70,119,75,214,76,167],"capacity": 95}, "ETH",{from: accounts[0]});
  });
  it('Should execute teststartArray(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartArray({"buf": [117,139,35,118,179,94,93,202,86,119,207,54,244,26,123,205,73,11,138,231,169,38,212,12,157,128,67,211,179,14,170,223],"capacity": 28},{from: accounts[0]});
  });
  it('Should execute teststartMap(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartMap({"buf": [187,145,140,185,204,109,8,37,124,163,205,237,229,109,198,216,7,171,54,126,135,206,153,106,36,116,39,214,78,180,235,193],"capacity": 97},{from: accounts[0]});
  });
  it('Should execute testendSequence(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.testendSequence({"buf": [115,181,124,184,160,102,186,8,83,69,231,190,118,230,236,15,242,227,232,32,61,192,46,210,12,237,52,104,243,202,104,88],"capacity": 256},{from: accounts[0]});
  });
});
