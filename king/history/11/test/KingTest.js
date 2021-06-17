const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(231,"6e7ee3",5,"1j7y43",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(231,"6e7ee3",5,"1j7y43",{from:accounts[0]}');
    contractKing = await King.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[3],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[2], 759, [10,98,92,57,173,191,209,92,233,244,106,6,203,132,35,103,228,228,58,192,118,97,244,189,22,227,125,178,79,106,225,133],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[2], 757, [10,98,92,57,173,191,209,92,233,244,106,6,203,132,35,103,228,228,58,192,118,97,244,189,22,227,125,178,79,106,225,133],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
