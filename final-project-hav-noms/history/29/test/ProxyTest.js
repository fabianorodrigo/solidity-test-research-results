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

contract("Proxy",(accounts)=>{
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
    contractShartCoin = await ShartCoin.new({from:accounts[6]});
    if(trace) console.log('SUCESSO: ShartCoin.new({from:accounts[6]}');
    contractState = await State.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: State.new(accounts[6],{from:accounts[0]}');
    contractProxy = await Proxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxy.new({from:accounts[0]}');
    ETHPriceTicker.link("Buffer",contractBuffer.address);
     ETHPriceTicker.link("CBOR",contractCBOR.address);
    contractETHPriceTicker = await ETHPriceTicker.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ETHPriceTicker.new({from:accounts[0]}');
    contractTokenExchangeState = await TokenExchangeState.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchangeState.new(accounts[0],{from:accounts[0]}');
    contractMortal = await Mortal.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Mortal.new(accounts[2],{from:accounts[0]}');
    contractProxyable = await Proxyable.new(contractProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Proxyable.new(contractProxy.address,{from:accounts[0]}');
    TokenExchange.link("SafeMath",contractSafeMath.address);
     TokenExchange.link("SafeDecimalMath",contractSafeDecimalMath.address);
     TokenExchange.link("Address",contractAddress.address);
    contractTokenExchange = await TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenExchange.new(accounts[2],contractProxy.address,contractTokenExchangeState.address,"Example",{from:accounts[0]}');
  });
  
  it('Should execute setTarget(Proxyable) WHEN msg.sender==_owner', async () => {
    let result = await contractProxy.setTarget(contractProxyable.address,{from: accounts[0]});
  });
  it('Should fail setTarget(Proxyable) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractProxy.setTarget(contractProxyable.address,{from: accounts[9]}),'revert');
  });
  it('Should execute _emit(bytes,uint,bytes32,bytes32,bytes32,bytes32)', async () => {
    let result = await contractProxy._emit([89,4,79,182,202,125,227,186,28,88,5,118,225,51,149,213,44,218,238,212,31,195,237,184,254,107,35,169,214,183,71,146], 4, [59,242,187,56,138,83,175,157,111,107,35,124,68,142,19,2,101,173,68,89,231,31,46,80,139,217,56,114,241,253,240,210], [101,184,197,7,186,35,151,148,150,181,120,95,53,160,65,216,47,131,218,17,40,179,183,99,66,121,44,0,241,202,50,137], [91,132,219,233,214,11,244,165,66,239,142,104,98,192,78,21,98,244,13,225,243,88,125,38,225,197,19,126,134,130,45,62], [203,205,139,238,134,234,181,22,48,50,111,146,96,215,168,122,93,157,129,130,68,179,218,203,248,218,40,128,132,149,86,241],{from: accounts[0]});
  });
  it('Should execute fallback()', async () => {
    let result = await contractProxy.sendTransaction({from: accounts[0]});
  });
});
