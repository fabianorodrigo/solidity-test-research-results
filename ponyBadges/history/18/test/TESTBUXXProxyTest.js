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
    contractTESTBUXX = await TESTBUXX.new(758,"zxvj1",0,"zxvj1",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"zxvj1",0,"zxvj1",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(758,"zxvj1",0,"zxvj1",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[7], 10, [119,67,120,22,96,210,56,171,34,137,179,239,72,21,80,102,214,6,83,124,192,76,56,191,99,97,127,89,150,178,218,210],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 10, [119,67,120,22,96,210,56,171,34,137,179,239,72,21,80,102,214,6,83,124,192,76,56,191,99,97,127,89,150,178,218,210],{from: accounts[0]}),'revert');
  });
});
