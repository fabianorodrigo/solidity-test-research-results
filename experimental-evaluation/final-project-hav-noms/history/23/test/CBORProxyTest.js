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
      ProxyCBOR.link('CBOR', contractCBOR.address);
    contractProxyCBOR = await ProxyCBOR.new({ from: accounts[0] });
});
  
  it('Should execute testencodeUInt(Buffer.buffer,uint)', async () => {
    let result = await contractProxyCBOR.testencodeUInt({"buf": [128,233,68,63,232,31,57,16,118,7,212,71,233,117,226,226,146,103,222,29,31,202,234,164,165,212,19,157,208,200,108,165],"capacity": 10}, 66,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value>=0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [41,94,69,37,120,252,124,31,194,165,136,115,53,91,27,133,43,122,33,196,155,104,22,113,32,139,78,204,212,115,128,170],"capacity": 55}, 57,{from: accounts[0]});
  });
  it('Should execute testencodeInt(Buffer.buffer,int) WHEN _value<0', async () => {
    let result = await contractProxyCBOR.testencodeInt({"buf": [90,144,215,253,223,3,35,238,206,120,247,13,93,31,161,17,16,237,194,182,159,91,0,159,73,2,228,67,89,60,41,129],"capacity": 5}, -1,{from: accounts[0]});
  });
  it('Should execute testencodeBytes(Buffer.buffer,bytes)', async () => {
    let result = await contractProxyCBOR.testencodeBytes({"buf": [57,93,203,80,91,38,1,21,62,62,144,39,212,194,121,150,86,137,123,146,132,125,18,58,232,237,43,31,182,85,195,3],"capacity": 70}, [39,62,238,131,124,109,71,113,203,214,73,25,136,114,90,239,130,191,155,160,177,160,82,194,136,235,201,130,79,47,245,188],{from: accounts[0]});
  });
  it('Should execute testencodeString(Buffer.buffer,string)', async () => {
    let result = await contractProxyCBOR.testencodeString({"buf": [87,40,138,194,219,136,143,110,39,156,155,30,59,221,239,109,31,145,127,153,198,27,240,117,92,142,236,33,126,170,59,86],"capacity": 9999}, "P",{from: accounts[0]});
  });
  it('Should execute teststartArray(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartArray({"buf": [46,54,14,4,13,117,194,21,140,123,224,150,21,3,48,40,188,76,40,155,201,115,28,18,204,200,152,112,17,235,178,4],"capacity": 61},{from: accounts[0]});
  });
  it('Should execute teststartMap(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.teststartMap({"buf": [90,209,242,238,88,174,200,75,8,89,214,209,61,10,217,235,164,216,179,133,209,127,47,67,241,108,5,237,123,95,99,55],"capacity": 3},{from: accounts[0]});
  });
  it('Should execute testendSequence(Buffer.buffer)', async () => {
    let result = await contractProxyCBOR.testendSequence({"buf": [227,214,114,122,76,160,159,199,186,90,100,232,137,219,92,197,154,198,207,110,16,48,197,214,181,13,194,153,28,42,102,71],"capacity": 21},{from: accounts[0]});
  });
});
