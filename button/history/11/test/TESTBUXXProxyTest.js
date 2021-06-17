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
    contractTESTBUXX = await TESTBUXX.new(230,"ybepa",10,"zncj8",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"ybepa",10,"zncj8",{from:accounts[0]}');
    contractButton = await Button.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[0],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"ybepa",10,"zncj8",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[8], accounts[7], 9, [40,78,11,23,47,110,48,152,2,163,251,91,11,114,225,115,86,222,95,43,52,14,96,50,170,229,206,39,61,24,128,185],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 9, [40,78,11,23,47,110,48,152,2,163,251,91,11,114,225,115,86,222,95,43,52,14,96,50,170,229,206,39,61,24,128,185],{from: accounts[0]}),'revert');
  });
});
