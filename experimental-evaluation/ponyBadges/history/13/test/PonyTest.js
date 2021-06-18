const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"xs29eh",10,"xs29eh",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"xs29eh",10,"xs29eh",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[8], 758, [247,140,224,22,74,49,178,17,25,238,50,198,195,26,219,165,144,30,48,26,29,30,120,246,40,16,149,83,43,184,34,155],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[8], 757, [247,140,224,22,74,49,178,17,25,238,50,198,195,26,219,165,144,30,48,26,29,30,120,246,40,16,149,83,43,184,34,155],{from: accounts[0]}),'revert');
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
