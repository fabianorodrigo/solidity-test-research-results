const truffleAssert = require('truffle-assertions');
const DebugCounter = artifacts.require("DebugCounter");
const Debuggable = artifacts.require("Debuggable");
const ProxyDebuggable = artifacts.require("ProxyDebuggable");

contract("DebugCounter",(accounts)=>{
  let trace = false;
  let contractDebuggable = null;
  let contractDebugCounter = null;
  beforeEach(async () => {
    contractDebuggable = await Debuggable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Debuggable.new({from: accounts[0]}');
    contractDebugCounter = await DebugCounter.new("rgwhcx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: DebugCounter.new("rgwhcx",{from:accounts[0]}');
  });
  
  it('Should execute <unamed>()', async () => {
    let result = await contractDebugCounter.sendTransaction({from: accounts[0]});
  });
  it('Should execute increment()', async () => {
    let result = await contractDebugCounter.increment({from: accounts[0]});
  });
});
