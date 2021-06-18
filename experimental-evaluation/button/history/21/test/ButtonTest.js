const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(3,"0072dq",10,"somepw",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"0072dq",10,"somepw",{from:accounts[0]}');
    contractButton = await Button.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[3],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[1], 231, [218,190,90,62,56,174,47,162,25,220,38,247,124,201,183,81,186,232,217,59,211,134,47,236,174,74,102,114,124,128,65,87],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[1], 229, [218,190,90,62,56,174,47,162,25,220,38,247,124,201,183,81,186,232,217,59,211,134,47,236,174,74,102,114,124,128,65,87],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
