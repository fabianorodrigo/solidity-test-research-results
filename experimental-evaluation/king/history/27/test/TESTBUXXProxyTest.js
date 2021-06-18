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
    contractTESTBUXX = await TESTBUXX.new(758,"g489f9",1,"yyp9g4",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"g489f9",1,"yyp9g4",{from:accounts[0]}');
    contractKing = await King.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(758,"g489f9",1,"yyp9g4",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[4], 231, [244,230,156,239,112,74,52,99,49,98,205,41,70,220,137,54,223,6,237,152,32,129,193,84,133,126,49,76,106,72,233,14],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 231, [244,230,156,239,112,74,52,99,49,98,205,41,70,220,137,54,223,6,237,152,32,129,193,84,133,126,49,76,106,72,233,14],{from: accounts[0]}),'revert');
  });
});
