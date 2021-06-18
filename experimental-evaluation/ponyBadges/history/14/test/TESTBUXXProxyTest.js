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
    contractTESTBUXX = await TESTBUXX.new(1,"g1zhm8",1,"ht4409",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"g1zhm8",1,"ht4409",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[0],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(1,"g1zhm8",1,"ht4409",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[6], 757, [142,164,146,106,236,37,0,32,198,177,219,43,59,150,80,64,167,225,83,160,227,142,145,131,235,156,201,25,21,161,153,193],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 757, [142,164,146,106,236,37,0,32,198,177,219,43,59,150,80,64,167,225,83,160,227,142,145,131,235,156,201,25,21,161,153,193],{from: accounts[0]}),'revert');
  });
});
