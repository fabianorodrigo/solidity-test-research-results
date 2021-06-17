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
    contractTESTBUXX = await TESTBUXX.new(759,"9ups2w",11,"9ups2w",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"9ups2w",11,"9ups2w",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"9ups2w",11,"9ups2w",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[1], accounts[3], 1, [56,220,252,220,176,171,253,151,131,40,244,87,108,5,136,246,203,49,93,16,252,183,78,158,222,15,113,248,231,84,66,102],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[1], "0x0000000000000000000000000000000000000000", 1, [56,220,252,220,176,171,253,151,131,40,244,87,108,5,136,246,203,49,93,16,252,183,78,158,222,15,113,248,231,84,66,102],{from: accounts[0]}),'revert');
  });
});
