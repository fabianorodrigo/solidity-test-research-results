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
    contractDebugCounter = await DebugCounter.new("7fygg1",{from:accounts[0]});
    if(trace) console.log('SUCESSO: DebugCounter.new("7fygg1",{from:accounts[0]}');
      ProxyDebuggable.link('Debuggable', contractDebuggable.address);
    contractProxyDebuggable = await ProxyDebuggable.new({ from: accounts[0] });
});
  
  it('Should execute testdebug0(string)', async () => {
    let result = await contractProxyDebuggable.testdebug0("7fygg1",{from: accounts[0]});
  });
  it('Should execute testdebug1(bytes32)', async () => {
    let result = await contractProxyDebuggable.testdebug1([192,188,216,180,160,153,201,38,131,182,22,239,239,72,54,163,161,79,242,199,219,72,1,254,241,71,92,104,236,227,246,69],{from: accounts[0]});
  });
  it('Should execute testdebug2(uint256)', async () => {
    let result = await contractProxyDebuggable.testdebug2(257,{from: accounts[0]});
  });
  it('Should execute testdebug3(address)', async () => {
    let result = await contractProxyDebuggable.testdebug3(accounts[1],{from: accounts[0]});
  });
  it('Should execute testdebugRevert0()', async () => {
    let result = await contractProxyDebuggable.testdebugRevert0({from: accounts[0]});
  });
  it('Should execute testdebugRevert1(string)', async () => {
    let result = await contractProxyDebuggable.testdebugRevert1("cf39nr",{from: accounts[0]});
  });
  it('Should execute testdebugNoop()', async () => {
    let result = await contractProxyDebuggable.testdebugNoop({from: accounts[0]});
  });
  it('Should execute testdebugNoopConstant()', async () => {
    let result = await contractProxyDebuggable.testdebugNoopConstant({from: accounts[0]});
  });
});
