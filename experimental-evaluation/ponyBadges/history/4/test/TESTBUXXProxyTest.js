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
    contractTESTBUXX = await TESTBUXX.new(0,"mfhtgg",1,"pbblwr",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"mfhtgg",1,"pbblwr",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(0,"mfhtgg",1,"pbblwr",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[1], accounts[7], 1, [157,111,149,235,154,121,128,160,53,206,90,96,128,45,212,168,219,49,179,159,17,64,121,50,76,252,185,133,190,8,67,123],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[1], "0x0000000000000000000000000000000000000000", 1, [157,111,149,235,154,121,128,160,53,206,90,96,128,45,212,168,219,49,179,159,17,64,121,50,76,252,185,133,190,8,67,123],{from: accounts[0]}),'revert');
  });
});
