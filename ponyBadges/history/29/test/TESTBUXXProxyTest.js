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
    contractTESTBUXX = await TESTBUXX.new(9,"ykkfrs",1,"esf9ae",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"ykkfrs",1,"esf9ae",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[6],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(9,"ykkfrs",1,"esf9ae",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[7], 757, [234,253,26,207,210,68,130,244,118,43,66,69,205,5,122,201,159,5,184,50,42,52,212,247,68,254,14,243,43,200,99,214],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 757, [234,253,26,207,210,68,130,244,118,43,66,69,205,5,122,201,159,5,184,50,42,52,212,247,68,254,14,243,43,200,99,214],{from: accounts[0]}),'revert');
  });
});
