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
    contractTESTBUXX = await TESTBUXX.new(3,"0072dq",10,"somepw",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"0072dq",10,"somepw",{from:accounts[0]}');
    contractButton = await Button.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(3,"0072dq",10,"somepw",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[7], accounts[7], 231, [181,83,240,114,116,81,77,228,91,123,71,0,201,123,131,103,18,21,206,106,37,77,10,240,94,135,206,58,21,72,118,43],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[7], "0x0000000000000000000000000000000000000000", 231, [181,83,240,114,116,81,77,228,91,123,71,0,201,123,131,103,18,21,206,106,37,77,10,240,94,135,206,58,21,72,118,43],{from: accounts[0]}),'revert');
  });
});
