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
    contractTESTBUXX = await TESTBUXX.new(0,"r73o9k",1,"r89rqm",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"r73o9k",1,"r89rqm",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(0,"r73o9k",1,"r89rqm",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[7], accounts[8], 0, [124,92,254,142,152,17,37,240,179,244,60,241,164,230,102,202,238,181,154,216,57,227,90,53,51,254,198,120,206,81,114,134],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[7], "0x0000000000000000000000000000000000000000", 0, [124,92,254,142,152,17,37,240,179,244,60,241,164,230,102,202,238,181,154,216,57,227,90,53,51,254,198,120,206,81,114,134],{from: accounts[0]}),'revert');
  });
});
