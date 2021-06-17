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
    contractTESTBUXX = await TESTBUXX.new(11,"vv4w3r",9,"vv4w3r",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"vv4w3r",9,"vv4w3r",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[9],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"vv4w3r",9,"vv4w3r",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[9], 11, [143,142,112,3,218,54,150,87,168,33,157,232,183,142,104,250,23,148,251,78,240,166,238,89,221,100,44,40,14,180,183,215],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 11, [143,142,112,3,218,54,150,87,168,33,157,232,183,142,104,250,23,148,251,78,240,166,238,89,221,100,44,40,14,180,183,215],{from: accounts[0]}),'revert');
  });
});
