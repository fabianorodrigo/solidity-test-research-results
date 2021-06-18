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
    contractTESTBUXX = await TESTBUXX.new(9,"eji8b",1,"eji8b",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"eji8b",1,"eji8b",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[6],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(9,"eji8b",1,"eji8b",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[8], 757, [113,95,117,125,13,191,186,50,160,233,118,77,237,184,135,131,138,157,79,191,121,185,100,235,62,232,123,50,131,60,96,220],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 757, [113,95,117,125,13,191,186,50,160,233,118,77,237,184,135,131,138,157,79,191,121,185,100,235,62,232,123,50,131,60,96,220],{from: accounts[0]}),'revert');
  });
});
