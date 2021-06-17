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

contract("Mortal",(accounts)=>{
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
    contractShartCoin = await ShartCoin.new({from:accounts[5]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[5]}');
    contractState = await State.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[8],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[5],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[4],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"P",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[8],contractProxy.address,contractTokenExchangeState.address,"P",{from:accounts[0]}');
  });
  
  it('Should execute setSelfDestructBeneficiary(address) WHEN msg.sender==_owner,_beneficiary!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMortal.setSelfDestructBeneficiary(accounts[2],{from: accounts[0]});
  });
  it('Should fail setSelfDestructBeneficiary(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMortal.setSelfDestructBeneficiary(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should fail setSelfDestructBeneficiary(address) when NOT comply with: _beneficiary != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMortal.setSelfDestructBeneficiary("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute initiateSelfDestruct() WHEN msg.sender==_owner', async () => {
    let result = await contractMortal.initiateSelfDestruct({from: accounts[0]});
  });
  it('Should fail initiateSelfDestruct() when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMortal.initiateSelfDestruct({from: accounts[9]}),'revert');
  });
  it('Should execute terminateSelfDestruct() WHEN msg.sender==_owner', async () => {
    let result = await contractMortal.terminateSelfDestruct({from: accounts[0]});
  });
  it('Should fail terminateSelfDestruct() when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractMortal.terminateSelfDestruct({from: accounts[9]}),'revert');
  });
  it('Should execute selfDestruct() WHEN msg.sender==_owner,selfDestructInitiated==true', async () => {
    await contractMortal.initiateSelfDestruct({from:accounts[0]});
    let result = await contractMortal.selfDestruct({from: accounts[0]});
  });
  it('Should fail selfDestruct() when NOT comply with: msg.sender == _owner', async () => {
    await contractMortal.initiateSelfDestruct({from:accounts[0]});
    let result = await truffleAssert.fails(contractMortal.selfDestruct({from: accounts[9]}),'revert');
  });
  it('Should fail selfDestruct() when NOT comply with: selfDestructInitiated == true', async () => {
    await contractMortal.initiateSelfDestruct({from:accounts[0]});
    await contractMortal.terminateSelfDestruct({from:accounts[0]});
    let result = await truffleAssert.fails(contractMortal.selfDestruct({from: accounts[0]}),'revert');
  });
});
