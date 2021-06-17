const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"nfs6ik",10,"nfs6ik",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"nfs6ik",10,"nfs6ik",{from:accounts[0]}');
    contractKing = await King.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[3], 759, [151,162,19,67,251,15,11,250,183,12,237,16,22,124,100,139,111,129,215,121,144,169,85,170,80,150,216,124,31,42,89,23],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[3], 757, [151,162,19,67,251,15,11,250,183,12,237,16,22,124,100,139,111,129,215,121,144,169,85,170,80,150,216,124,31,42,89,23],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
