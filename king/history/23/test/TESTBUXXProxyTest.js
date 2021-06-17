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
    contractTESTBUXX = await TESTBUXX.new(758,"hcu0ym",231,"hcu0ym",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"hcu0ym",231,"hcu0ym",{from:accounts[0]}');
    contractKing = await King.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[6],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(758,"hcu0ym",231,"hcu0ym",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[5], 4, [91,115,140,208,47,123,234,120,225,95,137,184,200,176,217,12,229,159,160,219,174,46,197,163,37,171,154,150,181,234,5,114],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 4, [91,115,140,208,47,123,234,120,225,95,137,184,200,176,217,12,229,159,160,219,174,46,197,163,37,171,154,150,181,234,5,114],{from: accounts[0]}),'revert');
  });
});
