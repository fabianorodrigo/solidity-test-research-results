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
    contractTESTBUXX = await TESTBUXX.new(231,"6e7ee3",5,"1j7y43",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(231,"6e7ee3",5,"1j7y43",{from:accounts[0]}');
    contractKing = await King.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(231,"6e7ee3",5,"1j7y43",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[1], 11, [180,180,23,107,196,0,211,0,99,76,29,85,28,136,159,43,38,210,25,55,129,40,68,109,240,251,254,33,199,90,107,189],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 11, [180,180,23,107,196,0,211,0,99,76,29,85,28,136,159,43,38,210,25,55,129,40,68,109,240,251,254,33,199,90,107,189],{from: accounts[0]}),'revert');
  });
});
