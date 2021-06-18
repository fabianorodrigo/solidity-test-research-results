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
    contractTESTBUXX = await TESTBUXX.new(230,"zgtz6",229,"28ggah",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"zgtz6",229,"28ggah",{from:accounts[0]}');
    contractKing = await King.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[7],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"zgtz6",229,"28ggah",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[9], 758, [104,43,135,37,188,89,195,219,57,225,123,65,88,169,48,43,185,50,42,10,177,226,15,173,218,59,25,78,225,48,179,158],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 758, [104,43,135,37,188,89,195,219,57,225,123,65,88,169,48,43,185,50,42,10,177,226,15,173,218,59,25,78,225,48,179,158],{from: accounts[0]}),'revert');
  });
});
