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

contract("contractProxyBuffer",(accounts)=>{
    let contractProxyBuffer = null;
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
    contractShartCoin = await ShartCoin.new({from:accounts[7]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[7]}');
    contractState = await State.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[5],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[3],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[5],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[4],contractProxy.address,contractTokenExchangeState.address,"P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[4],contractProxy.address,contractTokenExchangeState.address,"P",{from:accounts[0]}');
      ProxyBuffer.link('Buffer', contractBuffer.address);
    contractProxyBuffer = await ProxyBuffer.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Buffer.buffer,uint)', async () => {
    let result = await contractProxyBuffer.testinit({"buf": [97,155,38,250,5,105,115,132,248,82,101,238,150,83,161,74,84,65,44,254,66,181,44,218,147,108,16,4,54,203,92,29],"capacity": 17}, 9,{from: accounts[0]});
  });
  it('Should execute testappend0(Buffer.buffer,bytes)', async () => {
    let result = await contractProxyBuffer.testappend0({"buf": [103,144,98,69,88,237,186,69,101,94,123,3,46,177,213,131,130,92,255,31,99,36,38,197,225,218,77,122,193,251,172,54],"capacity": 1025}, [248,165,71,155,18,112,89,38,174,103,160,72,66,121,5,61,45,109,139,146,107,76,47,250,118,37,14,123,232,203,249,97],{from: accounts[0]});
  });
  it('Should execute testappend1(Buffer.buffer,uint8)', async () => {
    let result = await contractProxyBuffer.testappend1({"buf": [26,100,78,166,153,77,76,53,191,124,109,65,184,62,166,162,182,102,251,169,50,33,48,2,0,209,49,14,152,6,109,147],"capacity": 47}, 25,{from: accounts[0]});
  });
  it('Should execute testappendInt(Buffer.buffer,uint,uint)', async () => {
    let result = await contractProxyBuffer.testappendInt({"buf": [147,253,195,124,185,23,224,63,93,197,86,99,18,177,207,67,204,80,234,231,118,68,255,73,77,53,112,202,192,20,68,178],"capacity": 7}, 1023, 101,{from: accounts[0]});
  });
});
