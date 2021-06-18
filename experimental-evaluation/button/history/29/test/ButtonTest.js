const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"k2m926",229,"k2m926",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"k2m926",229,"k2m926",{from:accounts[0]}');
    contractButton = await Button.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[4],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[2], 230, [121,168,39,130,92,248,64,8,193,93,94,69,123,182,63,31,53,55,5,11,148,219,56,189,190,18,125,119,156,4,54,5],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[2], 229, [121,168,39,130,92,248,64,8,193,93,94,69,123,182,63,31,53,55,5,11,148,219,56,189,190,18,125,119,156,4,54,5],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
