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
    contractTESTBUXX = await TESTBUXX.new(10,"rg5a4",11,"rg5a4",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"rg5a4",11,"rg5a4",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"rg5a4",11,"rg5a4",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[4], 1, [70,97,21,43,163,67,139,81,63,127,50,209,75,31,72,71,12,231,107,124,120,247,40,222,79,61,63,234,3,207,193,166],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 1, [70,97,21,43,163,67,139,81,63,127,50,209,75,31,72,71,12,231,107,124,120,247,40,222,79,61,63,234,3,207,193,166],{from: accounts[0]}),'revert');
  });
});
