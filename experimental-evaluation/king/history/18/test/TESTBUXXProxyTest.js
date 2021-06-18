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
    contractTESTBUXX = await TESTBUXX.new(10,"g4j9xe",230,"g4j9xe",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"g4j9xe",230,"g4j9xe",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"g4j9xe",230,"g4j9xe",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[4], 5, [104,90,158,153,213,82,6,151,183,14,166,37,53,37,165,226,104,202,252,44,204,173,124,212,145,93,232,149,242,81,252,9],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 5, [104,90,158,153,213,82,6,151,183,14,166,37,53,37,165,226,104,202,252,44,204,173,124,212,145,93,232,149,242,81,252,9],{from: accounts[0]}),'revert');
  });
});
