const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Button",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(230,"6rbw6n",229,"3fdxlx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"6rbw6n",229,"3fdxlx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PUSH_COST', async () => {
    let result = await contractButton.tokenFallback(accounts[4], 230, [178,10,70,190,69,1,82,111,85,250,17,197,94,195,201,148,76,141,128,167,63,49,178,92,33,119,12,156,245,201,16,148],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PUSH_COST', async () => {
    let result = await truffleAssert.fails(contractButton.tokenFallback(accounts[4], 229, [178,10,70,190,69,1,82,111,85,250,17,197,94,195,201,148,76,141,128,167,63,49,178,92,33,119,12,156,245,201,16,148],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractButton.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractButton.withdraw({from: accounts[9]}),'revert');
  });
});
