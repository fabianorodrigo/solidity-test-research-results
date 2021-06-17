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
    contractTESTBUXX = await TESTBUXX.new(3,"m6p5q8",11,"p1m0ja",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"m6p5q8",11,"p1m0ja",{from:accounts[0]}');
    contractButton = await Button.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[6],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(3,"m6p5q8",11,"p1m0ja",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[7], 11, [193,160,174,196,28,33,138,67,167,42,96,241,249,6,51,224,159,126,240,104,168,201,88,184,228,101,75,190,188,153,115,44],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 11, [193,160,174,196,28,33,138,67,167,42,96,241,249,6,51,224,159,126,240,104,168,201,88,184,228,101,75,190,188,153,115,44],{from: accounts[0]}),'revert');
  });
});
