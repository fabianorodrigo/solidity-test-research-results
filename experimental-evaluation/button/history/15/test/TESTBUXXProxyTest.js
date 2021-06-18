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
    contractTESTBUXX = await TESTBUXX.new(3,"48l1s",10,"48l1s",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"48l1s",10,"48l1s",{from:accounts[0]}');
    contractButton = await Button.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[9],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(3,"48l1s",10,"48l1s",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[9], 0, [223,102,164,11,225,50,75,200,127,168,208,44,181,203,1,90,138,51,248,225,86,226,107,69,186,243,48,30,42,28,198,61],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 0, [223,102,164,11,225,50,75,200,127,168,208,44,181,203,1,90,138,51,248,225,86,226,107,69,186,243,48,30,42,28,198,61],{from: accounts[0]}),'revert');
  });
});
