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
    contractTESTBUXX = await TESTBUXX.new(759,"8oodh",11,"8oodh",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"8oodh",11,"8oodh",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"8oodh",11,"8oodh",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[8], 758, [10,161,77,220,78,132,159,216,182,227,244,88,11,217,166,49,147,25,81,208,154,78,51,133,158,200,200,4,224,72,243,201],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 758, [10,161,77,220,78,132,159,216,182,227,244,88,11,217,166,49,147,25,81,208,154,78,51,133,158,200,200,4,224,72,243,201],{from: accounts[0]}),'revert');
  });
});
