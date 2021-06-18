const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"3ct23",11,"3ct23",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"3ct23",11,"3ct23",{from:accounts[0]}');
    contractKing = await King.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[4],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[0], 758, [34,67,155,255,121,6,178,139,75,34,196,141,215,101,217,46,243,99,11,86,32,123,32,247,122,160,102,114,254,88,168,157],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[0], 757, [34,67,155,255,121,6,178,139,75,34,196,141,215,101,217,46,243,99,11,86,32,123,32,247,122,160,102,114,254,88,168,157],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
