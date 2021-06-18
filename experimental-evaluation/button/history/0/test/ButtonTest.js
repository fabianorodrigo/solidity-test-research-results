const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"z4tef",0,"k8ofx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"z4tef",0,"k8ofx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[2],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[5], 230, [79,179,165,135,106,21,133,114,132,183,205,11,130,3,37,209,109,73,238,85,161,170,9,84,55,221,127,105,173,95,237,20],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[5], 229, [79,179,165,135,106,21,133,114,132,183,205,11,130,3,37,209,109,73,238,85,161,170,9,84,55,221,127,105,173,95,237,20],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
