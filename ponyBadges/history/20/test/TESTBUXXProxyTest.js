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
    contractTESTBUXX = await TESTBUXX.new(758,"3y5req",11,"d4dtxx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"3y5req",11,"d4dtxx",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(758,"3y5req",11,"d4dtxx",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[4], 10, [34,122,94,127,205,226,146,182,74,182,250,125,111,12,84,225,168,153,214,33,55,62,31,165,71,163,3,68,240,194,132,225],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 10, [34,122,94,127,205,226,146,182,74,182,250,125,111,12,84,225,168,153,214,33,55,62,31,165,71,163,3,68,240,194,132,225],{from: accounts[0]}),'revert');
  });
});
