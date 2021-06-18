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
    contractTESTBUXX = await TESTBUXX.new(3,"ox1to",11,"ox1to",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"ox1to",11,"ox1to",{from:accounts[0]}');
    contractButton = await Button.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(3,"ox1to",11,"ox1to",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[8], 10, [70,75,84,252,152,79,129,118,151,118,139,190,85,209,78,62,229,122,28,141,131,141,143,212,158,66,171,69,190,123,1,46],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 10, [70,75,84,252,152,79,129,118,151,118,139,190,85,209,78,62,229,122,28,141,131,141,143,212,158,66,171,69,190,123,1,46],{from: accounts[0]}),'revert');
  });
});
