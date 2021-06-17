const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(1,"k8ds4",10,"hqct4",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"k8ds4",10,"hqct4",{from:accounts[0]}');
    contractButton = await Button.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[8],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[6], 230, [78,6,195,47,243,127,134,146,128,87,174,119,129,25,84,102,242,26,37,244,203,47,238,184,215,128,221,101,240,8,206,21],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[6], 229, [78,6,195,47,243,127,134,146,128,87,174,119,129,25,84,102,242,26,37,244,203,47,238,184,215,128,221,101,240,8,206,21],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
