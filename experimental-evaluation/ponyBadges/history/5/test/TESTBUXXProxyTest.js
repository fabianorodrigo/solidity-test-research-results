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
    contractTESTBUXX = await TESTBUXX.new(10,"o1grs",0,"x2z6ji",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"o1grs",0,"x2z6ji",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[7],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"o1grs",0,"x2z6ji",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[0], 758, [136,109,219,192,160,37,128,60,153,10,27,154,101,46,187,51,3,33,223,121,81,236,253,96,52,36,79,227,34,221,132,138],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 758, [136,109,219,192,160,37,128,60,153,10,27,154,101,46,187,51,3,33,223,121,81,236,253,96,52,36,79,227,34,221,132,138],{from: accounts[0]}),'revert');
  });
});
