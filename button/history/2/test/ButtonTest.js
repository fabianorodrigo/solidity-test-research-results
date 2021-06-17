const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(3,"dhr1r",0,"dhr1r",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"dhr1r",0,"dhr1r",{from:accounts[0]}');
    contractButton = await Button.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[4],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[0], 231, [87,161,237,139,216,219,62,84,20,80,35,28,231,40,127,8,75,73,30,147,165,102,51,187,245,43,65,76,86,9,134,43],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[0], 229, [87,161,237,139,216,219,62,84,20,80,35,28,231,40,127,8,75,73,30,147,165,102,51,187,245,43,65,76,86,9,134,43],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
