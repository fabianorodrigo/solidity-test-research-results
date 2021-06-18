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
    contractTESTBUXX = await TESTBUXX.new(757,"wai9rk",9,"o117fw",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(757,"wai9rk",9,"o117fw",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(757,"wai9rk",9,"o117fw",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[4], 1, [100,139,11,119,19,245,207,254,198,216,56,186,90,209,188,5,82,173,43,133,218,167,148,229,146,179,136,92,206,227,241,68],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 1, [100,139,11,119,19,245,207,254,198,216,56,186,90,209,188,5,82,173,43,133,218,167,148,229,146,179,136,92,206,227,241,68],{from: accounts[0]}),'revert');
  });
});
