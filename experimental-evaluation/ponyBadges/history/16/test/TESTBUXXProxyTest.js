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
    contractTESTBUXX = await TESTBUXX.new(759,"ivswy",0,"770igs",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"ivswy",0,"770igs",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[4],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"ivswy",0,"770igs",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[8], accounts[9], 757, [158,145,98,223,47,45,214,60,97,51,232,171,70,78,67,75,202,148,95,45,70,73,75,6,201,169,156,108,81,37,245,31],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 757, [158,145,98,223,47,45,214,60,97,51,232,171,70,78,67,75,202,148,95,45,70,73,75,6,201,169,156,108,81,37,245,31],{from: accounts[0]}),'revert');
  });
});
