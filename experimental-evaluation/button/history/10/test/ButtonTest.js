const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"ctz5k",230,"qfuhx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"ctz5k",230,"qfuhx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[5],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[0], 231, [65,221,42,84,219,27,89,204,189,187,97,154,172,72,98,251,154,228,227,27,129,96,151,221,36,168,11,218,104,119,66,14],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[0], 229, [65,221,42,84,219,27,89,204,189,187,97,154,172,72,98,251,154,228,227,27,129,96,151,221,36,168,11,218,104,119,66,14],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
