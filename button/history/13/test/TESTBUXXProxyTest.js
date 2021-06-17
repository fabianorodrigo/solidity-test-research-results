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
    contractTESTBUXX = await TESTBUXX.new(231,"eov8z",3,"ji9s6",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(231,"eov8z",3,"ji9s6",{from:accounts[0]}');
    contractButton = await Button.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[7],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(231,"eov8z",3,"ji9s6",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[1], 230, [156,148,110,210,152,192,9,14,81,109,80,93,138,245,134,149,245,101,52,27,243,7,243,106,147,241,217,31,75,141,196,96],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 230, [156,148,110,210,152,192,9,14,81,109,80,93,138,245,134,149,245,101,52,27,243,7,243,106,147,241,217,31,75,141,196,96],{from: accounts[0]}),'revert');
  });
});
