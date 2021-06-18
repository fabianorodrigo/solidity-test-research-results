const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(0,"bwnvle",11,"t7k7ik",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"bwnvle",11,"t7k7ik",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(0,"bwnvle",11,"t7k7ik",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[6], 11, [141,107,173,205,164,33,157,71,156,87,143,75,206,31,73,204,210,164,118,116,195,24,247,23,33,124,205,58,240,127,48,63],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 11, [141,107,173,205,164,33,157,71,156,87,143,75,206,31,73,204,210,164,118,116,195,24,247,23,33,124,205,58,240,127,48,63],{from: accounts[0]}),'revert');
  });
});
