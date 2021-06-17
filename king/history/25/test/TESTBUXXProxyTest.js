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
    contractTESTBUXX = await TESTBUXX.new(10,"3ct23",11,"3ct23",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"3ct23",11,"3ct23",{from:accounts[0]}');
    contractKing = await King.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[4],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"3ct23",11,"3ct23",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[1], 1, [160,224,22,64,216,217,39,210,60,162,109,73,4,148,72,108,7,189,113,13,26,148,62,172,4,125,106,89,78,231,169,42],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 1, [160,224,22,64,216,217,39,210,60,162,109,73,4,148,72,108,7,189,113,13,26,148,62,172,4,125,106,89,78,231,169,42],{from: accounts[0]}),'revert');
  });
});
