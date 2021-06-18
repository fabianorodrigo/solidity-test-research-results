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
    contractTESTBUXX = await TESTBUXX.new(11,"xs29eh",10,"xs29eh",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"xs29eh",10,"xs29eh",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"xs29eh",10,"xs29eh",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[8], accounts[5], 759, [239,204,51,237,150,222,188,251,56,69,82,201,202,67,134,194,39,124,36,11,14,149,49,211,35,41,105,42,4,251,79,95],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 759, [239,204,51,237,150,222,188,251,56,69,82,201,202,67,134,194,39,124,36,11,14,149,49,211,35,41,105,42,4,251,79,95],{from: accounts[0]}),'revert');
  });
});
