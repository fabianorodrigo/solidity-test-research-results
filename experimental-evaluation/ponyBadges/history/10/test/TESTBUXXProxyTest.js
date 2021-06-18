const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(757,"22sv4",11,"22sv4",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(757,"22sv4",11,"22sv4",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(757,"22sv4",11,"22sv4",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[3], 11, [131,8,188,110,156,196,96,180,138,185,54,46,93,223,248,175,35,128,117,135,41,42,43,80,208,20,182,235,202,67,193,142],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 11, [131,8,188,110,156,196,96,180,138,185,54,46,93,223,248,175,35,128,117,135,41,42,43,80,208,20,182,235,202,67,193,142],{from: accounts[0]}),'revert');
  });
});
