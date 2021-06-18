const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(3,"m6p5q8",11,"p1m0ja",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"m6p5q8",11,"p1m0ja",{from:accounts[0]}');
    contractButton = await Button.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[3], 230, [209,111,149,68,194,7,85,30,252,182,150,142,116,110,98,79,209,202,97,1,235,40,22,212,123,79,91,228,196,211,204,177],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[3], 229, [209,111,149,68,194,7,85,30,252,182,150,142,116,110,98,79,209,202,97,1,235,40,22,212,123,79,91,228,196,211,204,177],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
