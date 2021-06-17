const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(11,"cljtg",11,"cljtg",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"cljtg",11,"cljtg",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"cljtg",11,"cljtg",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[8], accounts[9], 10, [90,225,100,5,88,253,133,197,103,82,204,49,24,255,19,109,243,26,101,54,115,0,67,92,103,25,147,140,58,144,212,4],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 10, [90,225,100,5,88,253,133,197,103,82,204,49,24,255,19,109,243,26,101,54,115,0,67,92,103,25,147,140,58,144,212,4],{from: accounts[0]}),'revert');
  });
});
