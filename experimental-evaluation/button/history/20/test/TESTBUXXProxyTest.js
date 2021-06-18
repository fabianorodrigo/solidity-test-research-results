const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(231,"447zkl",2,"yu8tkm",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(231,"447zkl",2,"yu8tkm",{from:accounts[0]}');
    contractButton = await Button.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[4],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(231,"447zkl",2,"yu8tkm",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[8], accounts[2], 10, [194,36,3,236,194,219,8,87,24,239,15,7,229,17,21,140,109,196,8,59,79,159,65,222,179,120,186,176,234,46,242,142],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 10, [194,36,3,236,194,219,8,87,24,239,15,7,229,17,21,140,109,196,8,59,79,159,65,222,179,120,186,176,234,46,242,142],{from: accounts[0]}),'revert');
  });
});
