const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(757,"wai9rk",9,"o117fw",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(757,"wai9rk",9,"o117fw",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[5], 759, [76,145,226,79,209,60,169,49,238,157,109,34,178,178,74,12,154,62,210,55,235,109,175,124,126,76,146,130,135,141,245,66],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[5], 757, [76,145,226,79,209,60,169,49,238,157,109,34,178,178,74,12,154,62,210,55,235,109,175,124,126,76,146,130,135,141,245,66],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractPony.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractPony.withdraw({from: accounts[9]}),'revert');
  });
  it('Should execute getPony(address)', async () => {
    let result = await contractPony.getPony(accounts[1],{from: accounts[0]});
  });
});
