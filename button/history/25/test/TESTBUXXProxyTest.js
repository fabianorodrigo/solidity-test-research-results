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
    contractTESTBUXX = await TESTBUXX.new(231,"j194nn",11,"r5ssyg",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(231,"j194nn",11,"r5ssyg",{from:accounts[0]}');
    contractButton = await Button.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(231,"j194nn",11,"r5ssyg",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[7], accounts[9], 1, [94,240,17,218,1,215,163,200,243,226,230,83,127,13,221,160,226,33,110,3,241,76,140,142,123,0,16,188,53,133,2,19],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[7], "0x0000000000000000000000000000000000000000", 1, [94,240,17,218,1,215,163,200,243,226,230,83,127,13,221,160,226,33,110,3,241,76,140,142,123,0,16,188,53,133,2,19],{from: accounts[0]}),'revert');
  });
});
