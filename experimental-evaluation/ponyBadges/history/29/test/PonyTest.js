const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(9,"ykkfrs",1,"esf9ae",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"ykkfrs",1,"esf9ae",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[0], 758, [185,129,212,211,219,4,238,22,93,69,153,212,158,224,76,45,124,57,16,104,52,218,154,140,45,26,221,29,182,52,130,7],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[0], 757, [185,129,212,211,219,4,238,22,93,69,153,212,158,224,76,45,124,57,16,104,52,218,154,140,45,26,221,29,182,52,130,7],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractPony.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractPony.withdraw({from: accounts[9]}),'revert');
  });
  it('Should execute getPony(address)', async () => {
    let result = await contractPony.getPony(accounts[4],{from: accounts[0]});
  });
});
