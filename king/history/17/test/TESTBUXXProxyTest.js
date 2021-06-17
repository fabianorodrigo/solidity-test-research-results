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
    contractTESTBUXX = await TESTBUXX.new(6,"gx8ypi",0,"gx8ypi",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(6,"gx8ypi",0,"gx8ypi",{from:accounts[0]}');
    contractKing = await King.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[9],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(6,"gx8ypi",0,"gx8ypi",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[5], 10, [118,230,105,47,40,71,7,131,217,37,108,60,102,140,14,133,9,13,201,226,89,131,160,129,190,228,189,220,19,211,190,177],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 10, [118,230,105,47,40,71,7,131,217,37,108,60,102,140,14,133,9,13,201,226,89,131,160,129,190,228,189,220,19,211,190,177],{from: accounts[0]}),'revert');
  });
});
