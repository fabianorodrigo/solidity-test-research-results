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
    contractTESTBUXX = await TESTBUXX.new(3,"dhr1r",0,"dhr1r",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"dhr1r",0,"dhr1r",{from:accounts[0]}');
    contractButton = await Button.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[4],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(3,"dhr1r",0,"dhr1r",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[3], 231, [111,130,149,196,185,159,23,232,72,31,146,188,86,10,208,97,153,51,132,188,60,250,125,118,38,34,165,129,7,82,60,233],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 231, [111,130,149,196,185,159,23,232,72,31,146,188,86,10,208,97,153,51,132,188,60,250,125,118,38,34,165,129,7,82,60,233],{from: accounts[0]}),'revert');
  });
});
