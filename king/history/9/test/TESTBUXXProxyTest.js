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
    contractTESTBUXX = await TESTBUXX.new(1,"ltva9p",1,"ltva9p",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"ltva9p",1,"ltva9p",{from:accounts[0]}');
    contractKing = await King.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(1,"ltva9p",1,"ltva9p",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[1], 6, [214,167,53,249,119,38,52,18,184,102,192,33,7,133,226,199,53,89,180,146,15,82,30,228,203,51,250,162,67,117,93,204],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 6, [214,167,53,249,119,38,52,18,184,102,192,33,7,133,226,199,53,89,180,146,15,82,30,228,203,51,250,162,67,117,93,204],{from: accounts[0]}),'revert');
  });
});
