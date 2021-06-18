const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(231,"eov8z",3,"ji9s6",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(231,"eov8z",3,"ji9s6",{from:accounts[0]}');
    contractButton = await Button.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[7],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[3], 230, [76,217,192,80,99,138,206,2,46,6,174,40,106,214,102,38,197,63,106,3,114,119,129,152,67,46,184,6,159,233,255,156],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[3], 229, [76,217,192,80,99,138,206,2,46,6,174,40,106,214,102,38,197,63,106,3,114,119,129,152,67,46,184,6,159,233,255,156],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
