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
    contractTESTBUXX = await TESTBUXX.new(11,"5wnqan",11,"5wnqan",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"5wnqan",11,"5wnqan",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[4],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"5wnqan",11,"5wnqan",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[8], accounts[1], 0, [74,214,72,151,227,44,70,147,37,120,31,228,200,233,222,173,53,167,236,210,88,51,134,98,89,249,65,109,58,195,150,73],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 0, [74,214,72,151,227,44,70,147,37,120,31,228,200,233,222,173,53,167,236,210,88,51,134,98,89,249,65,109,58,195,150,73],{from: accounts[0]}),'revert');
  });
});
