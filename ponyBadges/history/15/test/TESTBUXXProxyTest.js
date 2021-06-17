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
    contractTESTBUXX = await TESTBUXX.new(758,"0ttptk",0,"bsfhi5",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"0ttptk",0,"bsfhi5",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[2],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(758,"0ttptk",0,"bsfhi5",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[8], accounts[3], 759, [19,229,27,168,95,205,149,241,35,215,44,94,225,188,60,244,252,29,29,53,6,218,17,130,183,203,48,153,136,124,65,93],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 759, [19,229,27,168,95,205,149,241,35,215,44,94,225,188,60,244,252,29,29,53,6,218,17,130,183,203,48,153,136,124,65,93],{from: accounts[0]}),'revert');
  });
});
