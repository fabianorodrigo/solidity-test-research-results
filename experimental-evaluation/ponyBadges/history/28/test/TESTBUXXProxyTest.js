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
    contractTESTBUXX = await TESTBUXX.new(10,"ovt8b",0,"ovt8b",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"ovt8b",0,"ovt8b",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"ovt8b",0,"ovt8b",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[7], accounts[9], 10, [255,190,4,193,173,222,90,49,105,59,139,169,244,149,151,43,178,97,49,189,207,200,121,227,57,144,120,229,48,146,205,248],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[7], "0x0000000000000000000000000000000000000000", 10, [255,190,4,193,173,222,90,49,105,59,139,169,244,149,151,43,178,97,49,189,207,200,121,227,57,144,120,229,48,146,205,248],{from: accounts[0]}),'revert');
  });
});
