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
    contractTESTBUXX = await TESTBUXX.new(5,"izlblp",4,"nkktv9",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(5,"izlblp",4,"nkktv9",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(5,"izlblp",4,"nkktv9",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[9], accounts[5], 757, [102,185,147,186,57,157,49,180,22,34,133,84,245,181,119,152,212,222,109,23,212,28,115,139,104,226,158,179,160,190,209,245],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 757, [102,185,147,186,57,157,49,180,22,34,133,84,245,181,119,152,212,222,109,23,212,28,115,139,104,226,158,179,160,190,209,245],{from: accounts[0]}),'revert');
  });
});
