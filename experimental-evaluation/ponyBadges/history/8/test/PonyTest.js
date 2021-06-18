const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(10,"rg5a4",11,"rg5a4",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"rg5a4",11,"rg5a4",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[3], 759, [203,124,214,63,211,1,158,246,234,12,165,232,29,189,73,16,136,81,165,59,91,45,238,52,139,246,137,73,148,99,160,112],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[3], 757, [203,124,214,63,211,1,158,246,234,12,165,232,29,189,73,16,136,81,165,59,91,45,238,52,139,246,137,73,148,99,160,112],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractPony.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractPony.withdraw({from: accounts[9]}),'revert');
  });
  it('Should execute getPony(address)', async () => {
    let result = await contractPony.getPony(accounts[3],{from: accounts[0]});
  });
});
