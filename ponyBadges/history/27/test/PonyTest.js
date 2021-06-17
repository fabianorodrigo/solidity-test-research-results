const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("Pony",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(9,"eji8b",1,"eji8b",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"eji8b",1,"eji8b",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[6],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractPony.tokenFallback(accounts[7], 759, [235,168,151,11,46,149,75,58,144,208,168,54,247,116,55,43,132,171,113,246,211,230,41,14,148,108,177,221,27,203,195,90],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractPony.tokenFallback(accounts[7], 757, [235,168,151,11,46,149,75,58,144,208,168,54,247,116,55,43,132,171,113,246,211,230,41,14,148,108,177,221,27,203,195,90],{from: accounts[0]}),'revert');
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
