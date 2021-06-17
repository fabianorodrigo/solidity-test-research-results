const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"4vznx",9,"4vznx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"4vznx",9,"4vznx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[7],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[8], 231, [243,17,191,68,56,134,34,113,15,74,56,127,40,208,67,10,44,67,128,200,47,149,32,124,234,22,98,42,23,3,128,120],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[8], 229, [243,17,191,68,56,134,34,113,15,74,56,127,40,208,67,10,44,67,128,200,47,149,32,124,234,22,98,42,23,3,128,120],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
