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
    contractDebugCounter = await DebugCounter.new("4yhs11",{from:accounts[0]});
    if(trace) console.log('SUCESSO: DebugCounter.new("4yhs11",{from:accounts[0]}');
      ProxyDebuggable.link('Debuggable', contractDebuggable.address);
    contractProxyDebuggable = await ProxyDebuggable.new({ from: accounts[0] });
});
  
  it('Should execute testdebug0(string)', async () => {
    let result = await contractProxyDebuggable.testdebug0("4yhs11",{from: accounts[0]});
  });
  it('Should execute testdebug1(bytes32)', async () => {
    let result = await contractProxyDebuggable.testdebug1([254,218,135,202,19,124,87,225,128,60,154,251,231,235,238,244,174,247,125,26,159,218,69,197,251,132,246,62,240,52,13,148],{from: accounts[0]});
  });
  it('Should execute testdebug2(uint256)', async () => {
    let result = await contractProxyDebuggable.testdebug2(1001,{from: accounts[0]});
  });
  it('Should execute testdebug3(address)', async () => {
    let result = await contractProxyDebuggable.testdebug3(accounts[9],{from: accounts[0]});
  });
  it('Should execute testdebugRevert0()', async () => {
    let result = await contractProxyDebuggable.testdebugRevert0({from: accounts[0]});
  });
  it('Should execute testdebugRevert1(string)', async () => {
    let result = await contractProxyDebuggable.testdebugRevert1("4yhs11",{from: accounts[0]});
  });
  it('Should execute testdebugNoop()', async () => {
    let result = await contractProxyDebuggable.testdebugNoop({from: accounts[0]});
  });
  it('Should execute testdebugNoopConstant()', async () => {
    let result = await contractProxyDebuggable.testdebugNoopConstant({from: accounts[0]});
  });
});
