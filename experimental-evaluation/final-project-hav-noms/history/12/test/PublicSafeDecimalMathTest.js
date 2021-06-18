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

contract("PublicSafeDecimalMath",(accounts)=>{
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
    contractShartCoin = await ShartCoin.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[0]}');
    contractState = await State.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[7],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[7],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[3],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"jymm4q",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"jymm4q",{from:accounts[0]}');
  });
  
  it('Should execute unit()', async () => {
    let result = await contractPublicSafeDecimalMath.unit({from: accounts[0]});
  });
  it('Should execute preciseUnit()', async () => {
    let result = await contractPublicSafeDecimalMath.preciseUnit({from: accounts[0]});
  });
  it('Should execute multiplyDecimal(uint,uint)', async () => {
    let result = await contractPublicSafeDecimalMath.multiplyDecimal(98, 10001,{from: accounts[0]});
  });
  it('Should execute multiplyDecimalRound(uint,uint)', async () => {
    let result = await contractPublicSafeDecimalMath.multiplyDecimalRound(27, 200000,{from: accounts[0]});
  });
  it('Should execute multiplyDecimalRoundPrecise(uint,uint)', async () => {
    let result = await contractPublicSafeDecimalMath.multiplyDecimalRoundPrecise(10000, 57,{from: accounts[0]});
  });
  it('Should execute divideDecimal(uint,uint)', async () => {
    let result = await contractPublicSafeDecimalMath.divideDecimal(20, 96,{from: accounts[0]});
  });
  it('Should execute divideDecimalRound(uint,uint)', async () => {
    let result = await contractPublicSafeDecimalMath.divideDecimalRound(10001, 63,{from: accounts[0]});
  });
  it('Should execute divideDecimalRoundPrecise(uint,uint)', async () => {
    let result = await contractPublicSafeDecimalMath.divideDecimalRoundPrecise(1025, 88,{from: accounts[0]});
  });
  it('Should execute decimalToPreciseDecimal(uint)', async () => {
    let result = await contractPublicSafeDecimalMath.decimalToPreciseDecimal(45,{from: accounts[0]});
  });
  it('Should execute preciseDecimalToDecimal(uint)', async () => {
    let result = await contractPublicSafeDecimalMath.preciseDecimalToDecimal(5,{from: accounts[0]});
  });
});
