const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"k2m926",229,"k2m926",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"k2m926",229,"k2m926",{from:accounts[0]}');
    contractButton = await Button.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[4],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"k2m926",229,"k2m926",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[8], accounts[9], 230, [118,28,141,14,170,175,63,97,188,213,236,212,69,11,60,59,230,163,110,171,42,72,39,156,26,231,233,112,226,0,27,235],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 230, [118,28,141,14,170,175,63,97,188,213,236,212,69,11,60,59,230,163,110,171,42,72,39,156,26,231,233,112,226,0,27,235],{from: accounts[0]}),'revert');
  });
});
