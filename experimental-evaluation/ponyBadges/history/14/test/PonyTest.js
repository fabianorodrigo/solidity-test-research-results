const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(1,"g1zhm8",1,"ht4409",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"g1zhm8",1,"ht4409",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[0],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[2], 759, [126,41,225,153,5,135,68,95,106,78,84,58,201,138,242,196,46,169,128,230,117,35,38,228,226,67,176,232,227,40,39,83],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[2], 757, [126,41,225,153,5,135,68,95,106,78,84,58,201,138,242,196,46,169,128,230,117,35,38,228,226,67,176,232,227,40,39,83],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractPony.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractPony.withdraw({from: accounts[9]}),'revert');
  });
  it('Should execute getPony(address)', async () => {
    let result = await contractPony.getPony(accounts[5],{from: accounts[0]});
  });
});
