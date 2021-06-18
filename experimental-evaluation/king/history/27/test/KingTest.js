const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(758,"g489f9",1,"yyp9g4",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"g489f9",1,"yyp9g4",{from:accounts[0]}');
    contractKing = await King.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[5],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[0], 759, [144,229,168,52,51,212,219,18,214,165,143,188,218,102,3,117,41,241,52,112,48,206,188,157,19,132,241,133,31,18,237,46],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[0], 757, [144,229,168,52,51,212,219,18,214,165,143,188,218,102,3,117,41,241,52,112,48,206,188,157,19,132,241,133,31,18,237,46],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
