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
      ProxyBuffer.link('Buffer', contractBuffer.address);
    contractProxyBuffer = await ProxyBuffer.new({ from: accounts[0] });
});
  
  it('Should execute testinit(Buffer.buffer,uint)', async () => {
    let result = await contractProxyBuffer.testinit({"buf": [49,194,169,137,3,82,118,207,142,140,174,23,125,250,246,254,165,217,219,129,135,209,26,3,40,95,210,68,141,101,44,165],"capacity": 1025}, 49,{from: accounts[0]});
  });
  it('Should execute testappend0(Buffer.buffer,bytes)', async () => {
    let result = await contractProxyBuffer.testappend0({"buf": [187,170,226,202,31,90,25,241,167,102,152,23,104,8,131,14,94,120,198,125,223,85,249,32,91,30,224,49,41,113,179,248],"capacity": 10}, [63,91,242,58,79,231,160,101,148,107,96,83,54,72,174,34,100,77,24,156,246,124,92,165,2,110,97,129,220,115,236,101],{from: accounts[0]});
  });
  it('Should execute testappend1(Buffer.buffer,uint8)', async () => {
    let result = await contractProxyBuffer.testappend1({"buf": [228,219,171,15,127,241,95,254,110,30,108,238,114,236,21,249,26,185,155,108,123,1,250,219,27,138,58,254,24,28,106,106],"capacity": 2}, 161,{from: accounts[0]});
  });
  it('Should execute testappendInt(Buffer.buffer,uint,uint)', async () => {
    let result = await contractProxyBuffer.testappendInt({"buf": [126,26,235,129,24,6,249,113,178,244,65,45,91,59,11,4,53,205,104,169,254,58,121,254,202,150,242,138,125,115,84,136],"capacity": 61}, 11, 20,{from: accounts[0]});
  });
});
