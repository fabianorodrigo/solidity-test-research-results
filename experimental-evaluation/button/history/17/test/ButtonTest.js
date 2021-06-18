const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(2,"3q53dtm",11,"3q53dtm",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(2,"3q53dtm",11,"3q53dtm",{from:accounts[0]}');
    contractButton = await Button.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[3],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[5], 230, [187,219,244,95,207,14,139,28,105,109,141,78,206,33,2,172,11,61,58,6,187,49,237,165,152,208,99,109,255,11,41,157],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[5], 229, [187,219,244,95,207,14,139,28,105,109,141,78,206,33,2,172,11,61,58,6,187,49,237,165,152,208,99,109,255,11,41,157],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
