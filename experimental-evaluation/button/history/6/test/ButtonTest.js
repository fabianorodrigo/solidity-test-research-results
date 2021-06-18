const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"6cpu3g",3,"6cpu3g",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"6cpu3g",3,"6cpu3g",{from:accounts[0]}');
    contractButton = await Button.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[7],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[1], 231, [47,92,27,42,88,192,128,103,205,188,247,32,73,146,47,228,4,84,148,17,135,156,179,102,9,105,43,50,51,227,25,204],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[1], 229, [47,92,27,42,88,192,128,103,205,188,247,32,73,146,47,228,4,84,148,17,135,156,179,102,9,105,43,50,51,227,25,204],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
