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
    contractDebugCounter = await DebugCounter.new("d7uglr",{from:accounts[0]});
    if(trace) console.log('SUCESSO: DebugCounter.new("d7uglr",{from:accounts[0]}');
      ProxyDebuggable.link('Debuggable', contractDebuggable.address);
    contractProxyDebuggable = await ProxyDebuggable.new({ from: accounts[0] });
});
  
  it('Should execute testdebug0(string)', async () => {
    let result = await contractProxyDebuggable.testdebug0("d7uglr",{from: accounts[0]});
  });
  it('Should execute testdebug1(bytes32)', async () => {
    let result = await contractProxyDebuggable.testdebug1([219,221,247,184,4,150,167,145,208,209,40,106,18,15,63,200,163,234,251,211,45,155,135,75,229,129,238,88,92,139,63,100],{from: accounts[0]});
  });
  it('Should execute testdebug2(uint256)', async () => {
    let result = await contractProxyDebuggable.testdebug2(10000,{from: accounts[0]});
  });
  it('Should execute testdebug3(address)', async () => {
    let result = await contractProxyDebuggable.testdebug3(accounts[7],{from: accounts[0]});
  });
  it('Should execute testdebugRevert0()', async () => {
    let result = await contractProxyDebuggable.testdebugRevert0({from: accounts[0]});
  });
  it('Should execute testdebugRevert1(string)', async () => {
    let result = await contractProxyDebuggable.testdebugRevert1("rvlu14",{from: accounts[0]});
  });
  it('Should execute testdebugNoop()', async () => {
    let result = await contractProxyDebuggable.testdebugNoop({from: accounts[0]});
  });
  it('Should execute testdebugNoopConstant()', async () => {
    let result = await contractProxyDebuggable.testdebugNoopConstant({from: accounts[0]});
  });
});
