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
    contractDebugCounter = await DebugCounter.new("mgc1y7",{from:accounts[0]});
    if(trace) console.log('SUCESSO: DebugCounter.new("mgc1y7",{from:accounts[0]}');
      ProxyDebuggable.link('Debuggable', contractDebuggable.address);
    contractProxyDebuggable = await ProxyDebuggable.new({ from: accounts[0] });
});
  
  it('Should execute testdebug0(string)', async () => {
    let result = await contractProxyDebuggable.testdebug0("diy5nl",{from: accounts[0]});
  });
  it('Should execute testdebug1(bytes32)', async () => {
    let result = await contractProxyDebuggable.testdebug1([199,104,154,178,85,97,159,61,144,185,98,222,184,238,62,36,42,157,99,53,232,9,125,122,47,203,38,196,146,15,147,202],{from: accounts[0]});
  });
  it('Should execute testdebug2(uint256)', async () => {
    let result = await contractProxyDebuggable.testdebug2(257,{from: accounts[0]});
  });
  it('Should execute testdebug3(address)', async () => {
    let result = await contractProxyDebuggable.testdebug3(accounts[6],{from: accounts[0]});
  });
  it('Should execute testdebugRevert0()', async () => {
    let result = await contractProxyDebuggable.testdebugRevert0({from: accounts[0]});
  });
  it('Should execute testdebugRevert1(string)', async () => {
    let result = await contractProxyDebuggable.testdebugRevert1("diy5nl",{from: accounts[0]});
  });
  it('Should execute testdebugNoop()', async () => {
    let result = await contractProxyDebuggable.testdebugNoop({from: accounts[0]});
  });
  it('Should execute testdebugNoopConstant()', async () => {
    let result = await contractProxyDebuggable.testdebugNoopConstant({from: accounts[0]});
  });
});
