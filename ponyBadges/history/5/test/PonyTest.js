const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"o1grs",0,"x2z6ji",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"o1grs",0,"x2z6ji",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[7],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[3], 759, [37,6,122,163,112,232,110,187,189,141,224,13,238,213,179,207,28,126,109,187,186,195,82,228,204,109,19,118,196,198,129,205],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[3], 757, [37,6,122,163,112,232,110,187,189,141,224,13,238,213,179,207,28,126,109,187,186,195,82,228,204,109,19,118,196,198,129,205],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractPony.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractPony.withdraw({from: accounts[9]}),'revert');
  });
  it('Should execute getPony(address)', async () => {
    let result = await contractPony.getPony(accounts[2],{from: accounts[0]});
  });
});
