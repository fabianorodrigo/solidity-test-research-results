const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(9,"6b54i",11,"ijbpxw",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"6b54i",11,"ijbpxw",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[9],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[4], 758, [191,77,127,84,167,3,116,136,214,217,51,139,44,49,60,68,177,193,95,181,134,99,78,8,198,35,97,44,129,191,44,153],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[4], 757, [191,77,127,84,167,3,116,136,214,217,51,139,44,49,60,68,177,193,95,181,134,99,78,8,198,35,97,44,129,191,44,153],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractPony.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractPony.withdraw({from: accounts[9]}),'revert');
  });
  it('Should execute getPony(address)', async () => {
    let result = await contractPony.getPony(accounts[7],{from: accounts[0]});
  });
});
