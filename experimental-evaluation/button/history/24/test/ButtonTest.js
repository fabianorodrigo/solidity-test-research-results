const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"ixn91i",2,"ixn91i",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"ixn91i",2,"ixn91i",{from:accounts[0]}');
    contractButton = await Button.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[0],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[2], 231, [198,241,171,132,232,214,251,199,95,229,2,21,74,147,136,121,167,51,175,229,42,0,56,26,68,34,12,178,81,19,218,13],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[2], 229, [198,241,171,132,232,214,251,199,95,229,2,21,74,147,136,121,167,51,175,229,42,0,56,26,68,34,12,178,81,19,218,13],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
