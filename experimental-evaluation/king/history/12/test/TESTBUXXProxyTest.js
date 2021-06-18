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
    contractTESTBUXX = await TESTBUXX.new(10,"mxuv0p",6,"mxuv0p",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"mxuv0p",6,"mxuv0p",{from:accounts[0]}');
    contractKing = await King.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[0],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"mxuv0p",6,"mxuv0p",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[7], 1, [19,242,105,34,228,3,124,199,216,97,91,102,163,199,62,248,170,181,45,111,250,59,215,202,214,108,41,197,241,92,154,139],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 1, [19,242,105,34,228,3,124,199,216,97,91,102,163,199,62,248,170,181,45,111,250,59,215,202,214,108,41,197,241,92,154,139],{from: accounts[0]}),'revert');
  });
});
