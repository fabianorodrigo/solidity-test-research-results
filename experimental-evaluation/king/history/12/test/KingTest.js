const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"mxuv0p",6,"mxuv0p",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"mxuv0p",6,"mxuv0p",{from:accounts[0]}');
    contractKing = await King.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[0],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[2], 758, [70,7,50,105,203,146,73,8,203,214,22,237,39,156,123,140,49,246,84,118,183,66,243,100,232,50,1,137,196,178,187,241],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[2], 757, [70,7,50,105,203,146,73,8,203,214,22,237,39,156,123,140,49,246,84,118,183,66,243,100,232,50,1,137,196,178,187,241],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
