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
    contractTESTBUXX = await TESTBUXX.new(10,"zblixs",6,"6eojfa",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"zblixs",6,"6eojfa",{from:accounts[0]}');
    contractKing = await King.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[2],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"zblixs",6,"6eojfa",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[8], 231, [53,36,240,122,184,89,254,245,46,41,85,84,190,133,39,147,207,135,93,187,88,179,247,169,180,150,181,146,75,40,35,196],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 231, [53,36,240,122,184,89,254,245,46,41,85,84,190,133,39,147,207,135,93,187,88,179,247,169,180,150,181,146,75,40,35,196],{from: accounts[0]}),'revert');
  });
});
