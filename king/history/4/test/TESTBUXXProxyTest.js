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
    contractTESTBUXX = await TESTBUXX.new(4,"p8x9wh",230,"p8x9wh",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(4,"p8x9wh",230,"p8x9wh",{from:accounts[0]}');
    contractKing = await King.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[2],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(4,"p8x9wh",230,"p8x9wh",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[9], accounts[3], 759, [67,2,129,83,113,23,87,106,30,217,113,95,64,228,0,68,17,107,131,197,100,185,22,103,102,85,97,186,179,240,21,91],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 759, [67,2,129,83,113,23,87,106,30,217,113,95,64,228,0,68,17,107,131,197,100,185,22,103,102,85,97,186,179,240,21,91],{from: accounts[0]}),'revert');
  });
});
