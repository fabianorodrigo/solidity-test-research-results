const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(1,"k17ikn",2,"k17ikn",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"k17ikn",2,"k17ikn",{from:accounts[0]}');
    contractButton = await Button.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[2],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[3], 231, [150,89,122,56,223,18,3,98,32,210,117,28,132,113,190,121,13,69,22,56,75,126,155,164,183,10,7,195,232,112,96,246],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[3], 229, [150,89,122,56,223,18,3,98,32,210,117,28,132,113,190,121,13,69,22,56,75,126,155,164,183,10,7,195,232,112,96,246],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
