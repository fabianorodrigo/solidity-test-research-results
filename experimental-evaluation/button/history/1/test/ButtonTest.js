const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(1,"vkat2x",230,"uu9yx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"vkat2x",230,"uu9yx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[5],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[9], 231, [55,40,21,7,247,46,249,156,159,236,206,75,180,87,44,18,85,9,137,112,95,53,63,148,2,247,149,246,138,105,244,11],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[9], 229, [55,40,21,7,247,46,249,156,159,236,206,75,180,87,44,18,85,9,137,112,95,53,63,148,2,247,149,246,138,105,244,11],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
