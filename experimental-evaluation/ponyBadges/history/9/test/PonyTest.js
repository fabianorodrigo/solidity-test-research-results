const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(759,"11d6c",11,"11d6c",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"11d6c",11,"11d6c",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[5],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[2], 758, [133,116,167,4,2,248,200,45,196,171,59,95,177,63,54,134,202,40,223,133,153,243,178,37,225,96,145,7,151,163,120,203],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[2], 757, [133,116,167,4,2,248,200,45,196,171,59,95,177,63,54,134,202,40,223,133,153,243,178,37,225,96,145,7,151,163,120,203],{from: accounts[0]}),'revert');
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
