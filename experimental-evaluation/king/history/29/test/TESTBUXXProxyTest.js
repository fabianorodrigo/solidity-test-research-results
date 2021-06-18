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
    contractTESTBUXX = await TESTBUXX.new(759,"31ol0o",10,"31ol0o",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"31ol0o",10,"31ol0o",{from:accounts[0]}');
    contractKing = await King.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[9],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"31ol0o",10,"31ol0o",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[5], 759, [222,239,108,16,15,12,213,166,149,62,10,43,148,58,105,18,135,86,76,229,18,221,4,165,37,246,185,173,205,12,187,201],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 759, [222,239,108,16,15,12,213,166,149,62,10,43,148,58,105,18,135,86,76,229,18,221,4,165,37,246,185,173,205,12,187,201],{from: accounts[0]}),'revert');
  });
});
