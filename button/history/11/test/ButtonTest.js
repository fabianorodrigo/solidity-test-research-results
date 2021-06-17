const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"ybepa",10,"zncj8",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"ybepa",10,"zncj8",{from:accounts[0]}');
    contractButton = await Button.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[0],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[7], 231, [13,114,61,130,36,139,134,4,167,141,157,15,62,201,3,107,36,40,213,255,92,161,30,86,20,96,219,211,45,216,59,58],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[7], 229, [13,114,61,130,36,139,134,4,167,141,157,15,62,201,3,107,36,40,213,255,92,161,30,86,20,96,219,211,45,216,59,58],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
