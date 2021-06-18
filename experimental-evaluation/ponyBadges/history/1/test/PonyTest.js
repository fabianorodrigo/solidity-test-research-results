const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"5wnqan",11,"5wnqan",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"5wnqan",11,"5wnqan",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[4],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[7], 759, [212,95,211,96,150,57,24,159,202,98,74,230,1,119,56,252,9,128,183,167,121,182,226,149,88,91,83,250,165,13,197,182],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[7], 757, [212,95,211,96,150,57,24,159,202,98,74,230,1,119,56,252,9,128,183,167,121,182,226,149,88,91,83,250,165,13,197,182],{from: accounts[0]}),'revert');
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
