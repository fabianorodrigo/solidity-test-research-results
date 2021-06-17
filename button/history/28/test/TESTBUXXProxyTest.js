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
    contractTESTBUXX = await TESTBUXX.new(11,"gjdq5",1,"gjdq5",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"gjdq5",1,"gjdq5",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"gjdq5",1,"gjdq5",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[6], 11, [11,7,122,176,115,107,128,239,208,126,19,148,185,93,11,242,49,157,156,95,229,96,51,52,61,7,12,251,184,131,103,10],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 11, [11,7,122,176,115,107,128,239,208,126,19,148,185,93,11,242,49,157,156,95,229,96,51,52,61,7,12,251,184,131,103,10],{from: accounts[0]}),'revert');
  });
});
