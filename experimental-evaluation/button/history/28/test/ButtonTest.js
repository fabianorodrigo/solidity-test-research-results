const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"gjdq5",1,"gjdq5",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"gjdq5",1,"gjdq5",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[4], 230, [1,93,160,241,173,117,34,58,178,136,216,143,251,234,232,87,239,70,125,19,188,159,176,187,6,244,136,160,242,44,28,186],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[4], 229, [1,93,160,241,173,117,34,58,178,136,216,143,251,234,232,87,239,70,125,19,188,159,176,187,6,244,136,160,242,44,28,186],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
