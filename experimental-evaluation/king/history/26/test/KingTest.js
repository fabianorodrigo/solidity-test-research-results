const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(759,"gefjyk",11,"gefjyk",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"gefjyk",11,"gefjyk",{from:accounts[0]}');
    contractKing = await King.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[5],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[9], 758, [128,135,37,9,2,3,93,34,103,225,113,227,218,22,62,180,19,16,238,49,220,80,136,214,156,59,10,134,63,223,236,128],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[9], 757, [128,135,37,9,2,3,93,34,103,225,113,227,218,22,62,180,19,16,238,49,220,80,136,214,156,59,10,134,63,223,236,128],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
