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

contract("TokenExchange",(accounts)=>{
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
    contractShartCoin = await ShartCoin.new({from:accounts[3]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[3]}');
    contractState = await State.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[3],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[0],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[4],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[9],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[9],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]}');
  });
  
  it('Should execute getTradeListingCount()', async () => {
    let result = await contractTokenExchange.getTradeListingCount({from: accounts[0]});
  });
  it('Should execute getTradeList()', async () => {
    let result = await contractTokenExchange.getTradeList({from: accounts[0]});
  });
  it('Should execute getTrade(uint)', async () => {
    let result = await contractTokenExchange.getTrade(18,{from: accounts[0]});
  });
  it('Should execute createTradeListing(uint,uint,address) WHEN paused!=true,amount>0,ethRate>0', async () => {
    let result = await contractTokenExchange.createTradeListing(9, 59, contractShartCoin.address,{from: accounts[0]});
  });
  it('Should fail createTradeListing(uint,uint,address) when NOT comply with: paused != true', async () => {
    await contractPausable.transferOwnership(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractTokenExchange.createTradeListing(9, 59, contractShartCoin.address,{from: accounts[0]}),'revert');
  });
  it('Should fail createTradeListing(uint,uint,address) when NOT comply with: amount > 0', async () => {
    let result = await truffleAssert.fails(contractTokenExchange.createTradeListing(0, 59, contractShartCoin.address,{from: accounts[0]}),'revert');
  });
  it('Should fail createTradeListing(uint,uint,address) when NOT comply with: ethRate > 0', async () => {
    let result = await truffleAssert.fails(contractTokenExchange.createTradeListing(9, 0, contractShartCoin.address,{from: accounts[0]}),'revert');
  });
  it('Should execute withdrawMyDepositedTokens(uint) WHEN paused!=true', async () => {
    let result = await contractTokenExchange.withdrawMyDepositedTokens(1337,{from: accounts[0]});
  });
  it('Should fail withdrawMyDepositedTokens(uint) when NOT comply with: paused != true', async () => {
    await contractPausable.transferOwnership(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractTokenExchange.withdrawMyDepositedTokens(1337,{from: accounts[0]}),'revert');
  });
  it('Should execute exchangeEtherForTokens(uint) WHEN paused!=true,reentrancyLock!=true', async () => {
    let result = await contractTokenExchange.exchangeEtherForTokens(33,{from: accounts[0]});
  });
  it('Should fail exchangeEtherForTokens(uint) when NOT comply with: paused != true', async () => {
    await contractPausable.transferOwnership(accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractTokenExchange.exchangeEtherForTokens(33,{from: accounts[0]}),'revert');
  });
  it('Should execute getTradeCostPriceInUSD(uint)', async () => {
    let result = await contractTokenExchange.getTradeCostPriceInUSD(10000,{from: accounts[0]});
  });
  it('Should execute callOracle()', async () => {
    let result = await contractTokenExchange.callOracle({from: accounts[0]});
  });
  it('Should execute <unamed>()', async () => {
    let result = await contractTokenExchange.sendTransaction({from: accounts[0]});
  });
});
