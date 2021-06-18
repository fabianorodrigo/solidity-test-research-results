const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"yed4e",2,"yed4e",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"yed4e",2,"yed4e",{from:accounts[0]}');
    contractButton = await Button.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[9],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[1], 231, [3,180,238,145,49,236,105,32,40,60,69,17,173,137,184,56,129,255,222,234,30,146,252,123,145,78,85,115,105,233,198,237],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[1], 229, [3,180,238,145,49,236,105,32,40,60,69,17,173,137,184,56,129,255,222,234,30,146,252,123,145,78,85,115,105,233,198,237],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
