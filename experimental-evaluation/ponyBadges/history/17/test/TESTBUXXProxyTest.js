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
    contractTESTBUXX = await TESTBUXX.new(757,"zb7smy",0,"zb7smy",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(757,"zb7smy",0,"zb7smy",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(757,"zb7smy",0,"zb7smy",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[8], 10, [107,148,149,51,156,72,128,170,22,40,76,56,227,110,239,15,144,68,79,223,85,209,188,158,112,51,163,229,209,172,20,221],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 10, [107,148,149,51,156,72,128,170,22,40,76,56,227,110,239,15,144,68,79,223,85,209,188,158,112,51,163,229,209,172,20,221],{from: accounts[0]}),'revert');
  });
});
