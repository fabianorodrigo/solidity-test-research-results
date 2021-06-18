const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(3,"cader",230,"9crpik",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"cader",230,"9crpik",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[7], 231, [154,165,96,212,237,38,9,247,206,18,28,238,138,228,200,50,62,248,88,231,182,208,92,122,153,72,141,209,10,72,11,43],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[7], 229, [154,165,96,212,237,38,9,247,206,18,28,238,138,228,200,50,62,248,88,231,182,208,92,122,153,72,141,209,10,72,11,43],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
