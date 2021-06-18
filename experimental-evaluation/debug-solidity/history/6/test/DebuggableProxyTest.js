const truffleAssert = require('truffle-assertions');
const DebugCounter = artifacts.require("DebugCounter");
const Debuggable = artifacts.require("Debuggable");
const ProxyDebuggable = artifacts.require("ProxyDebuggable");

contract("contractProxyDebuggable",(accounts)=>{
    let contractProxyDebuggable = null;
  let trace = false;
  let contractDebuggable = null;
  let contractDebugCounter = null;
  beforeEach(async () => {
    contractDebuggable = await Debuggable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Debuggable.new({from: accounts[0]}');
    contractDebugCounter = await DebugCounter.new("apu0as",{from:accounts[0]});
    if(trace) console.log('SUCESSO: DebugCounter.new("apu0as",{from:accounts[0]}');
      ProxyDebuggable.link('Debuggable', contractDebuggable.address);
    contractProxyDebuggable = await ProxyDebuggable.new({ from: accounts[0] });
});
  
  it('Should execute testdebug0(string)', async () => {
    let result = await contractProxyDebuggable.testdebug0("apu0as",{from: accounts[0]});
  });
  it('Should execute testdebug1(bytes32)', async () => {
    let result = await contractProxyDebuggable.testdebug1([41,209,128,81,56,234,57,39,187,135,21,73,62,105,224,194,233,184,210,248,208,38,163,5,169,74,165,113,181,175,0,197],{from: accounts[0]});
  });
  it('Should execute testdebug2(uint256)', async () => {
    let result = await contractProxyDebuggable.testdebug2(1,{from: accounts[0]});
  });
  it('Should execute testdebug3(address)', async () => {
    let result = await contractProxyDebuggable.testdebug3(accounts[1],{from: accounts[0]});
  });
  it('Should execute testdebugRevert0()', async () => {
    let result = await contractProxyDebuggable.testdebugRevert0({from: accounts[0]});
  });
  it('Should execute testdebugRevert1(string)', async () => {
    let result = await contractProxyDebuggable.testdebugRevert1("apu0as",{from: accounts[0]});
  });
  it('Should execute testdebugNoop()', async () => {
    let result = await contractProxyDebuggable.testdebugNoop({from: accounts[0]});
  });
  it('Should execute testdebugNoopConstant()', async () => {
    let result = await contractProxyDebuggable.testdebugNoopConstant({from: accounts[0]});
  });
});
