const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(758,"0ttptk",0,"bsfhi5",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"0ttptk",0,"bsfhi5",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[2],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[0], 759, [6,46,218,73,188,197,175,25,57,133,135,203,254,115,73,86,8,74,255,191,220,160,138,97,13,64,106,58,189,97,241,57],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[0], 757, [6,46,218,73,188,197,175,25,57,133,135,203,254,115,73,86,8,74,255,191,220,160,138,97,13,64,106,58,189,97,241,57],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractPony.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractPony.withdraw({from: accounts[9]}),'revert');
  });
  it('Should execute getPony(address)', async () => {
    let result = await contractPony.getPony(accounts[9],{from: accounts[0]});
  });
});
