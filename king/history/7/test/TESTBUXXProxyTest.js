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
    contractTESTBUXX = await TESTBUXX.new(759,"i1t2s",4,"i1t2s",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"i1t2s",4,"i1t2s",{from:accounts[0]}');
    contractKing = await King.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"i1t2s",4,"i1t2s",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[6], 0, [113,36,45,241,41,19,158,32,151,252,8,64,101,195,88,8,45,120,86,239,101,245,100,207,199,73,118,227,177,9,222,182],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 0, [113,36,45,241,41,19,158,32,151,252,8,64,101,195,88,8,45,120,86,239,101,245,100,207,199,73,118,227,177,9,222,182],{from: accounts[0]}),'revert');
  });
});
