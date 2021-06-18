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
    contractTESTBUXX = await TESTBUXX.new(230,"q5gses",9,"q5gses",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"q5gses",9,"q5gses",{from:accounts[0]}');
    contractButton = await Button.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"q5gses",9,"q5gses",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[5], accounts[3], 1, [175,188,116,189,255,109,219,201,48,164,36,247,69,231,254,28,11,87,2,61,76,253,252,130,164,226,217,111,177,162,93,127],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[5], "0x0000000000000000000000000000000000000000", 1, [175,188,116,189,255,109,219,201,48,164,36,247,69,231,254,28,11,87,2,61,76,253,252,130,164,226,217,111,177,162,93,127],{from: accounts[0]}),'revert');
  });
});
