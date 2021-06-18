const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(758,"hcu0ym",231,"hcu0ym",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"hcu0ym",231,"hcu0ym",{from:accounts[0]}');
    contractKing = await King.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[6], 759, [250,49,105,238,139,50,206,214,198,83,17,168,232,76,198,152,123,108,166,120,123,253,21,47,233,211,158,108,214,161,69,87],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[6], 757, [250,49,105,238,139,50,206,214,198,83,17,168,232,76,198,152,123,108,166,120,123,253,21,47,233,211,158,108,214,161,69,87],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
