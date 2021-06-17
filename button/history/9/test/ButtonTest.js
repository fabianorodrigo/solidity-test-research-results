const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(231,"k0k0cs",2,"k0k0cs",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(231,"k0k0cs",2,"k0k0cs",{from:accounts[0]}');
    contractButton = await Button.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[4], 230, [13,0,235,8,89,91,55,60,219,148,11,110,132,223,87,247,46,209,230,214,238,63,241,245,184,46,41,30,17,123,107,47],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[4], 229, [13,0,235,8,89,91,55,60,219,148,11,110,132,223,87,247,46,209,230,214,238,63,241,245,184,46,41,30,17,123,107,47],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
