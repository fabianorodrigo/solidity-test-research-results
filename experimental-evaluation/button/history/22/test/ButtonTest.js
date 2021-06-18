const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"jxa52h",11,"3jjj8h",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"jxa52h",11,"3jjj8h",{from:accounts[0]}');
    contractButton = await Button.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[9],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[7], 230, [183,211,151,153,1,56,26,40,168,201,97,152,95,85,250,185,94,78,12,37,149,245,145,233,213,185,154,96,183,93,182,82],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[7], 229, [183,211,151,153,1,56,26,40,168,201,97,152,95,85,250,185,94,78,12,37,149,245,145,233,213,185,154,96,183,93,182,82],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
