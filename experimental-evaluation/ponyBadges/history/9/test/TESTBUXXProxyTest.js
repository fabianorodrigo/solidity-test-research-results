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
    contractTESTBUXX = await TESTBUXX.new(759,"11d6c",11,"11d6c",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"11d6c",11,"11d6c",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"11d6c",11,"11d6c",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[5], accounts[5], 757, [24,153,4,108,204,235,85,82,193,42,169,21,96,28,228,251,223,30,77,142,191,167,182,199,208,36,26,24,141,127,75,23],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[5], "0x0000000000000000000000000000000000000000", 757, [24,153,4,108,204,235,85,82,193,42,169,21,96,28,228,251,223,30,77,142,191,167,182,199,208,36,26,24,141,127,75,23],{from: accounts[0]}),'revert');
  });
});
