const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(9,"6kc97j",11,"6kc97j",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"6kc97j",11,"6kc97j",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[3], 759, [84,131,156,189,29,170,117,193,218,34,32,151,165,12,163,35,103,203,210,128,79,196,245,161,99,206,27,26,51,78,113,233],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[3], 757, [84,131,156,189,29,170,117,193,218,34,32,151,165,12,163,35,103,203,210,128,79,196,245,161,99,206,27,26,51,78,113,233],{from: accounts[0]}),'revert');
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
