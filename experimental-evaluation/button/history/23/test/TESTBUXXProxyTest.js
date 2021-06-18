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
    contractTESTBUXX = await TESTBUXX.new(2,"wodx1",11,"wodx1",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(2,"wodx1",11,"wodx1",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(2,"wodx1",11,"wodx1",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[9], 231, [164,149,244,5,175,23,33,9,69,185,125,41,212,246,206,75,163,59,89,185,106,73,63,45,175,14,27,165,70,142,30,57],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 231, [164,149,244,5,175,23,33,9,69,185,125,41,212,246,206,75,163,59,89,185,106,73,63,45,175,14,27,165,70,142,30,57],{from: accounts[0]}),'revert');
  });
});
