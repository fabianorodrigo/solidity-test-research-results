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
    contractTESTBUXX = await TESTBUXX.new(759,"gefjyk",11,"gefjyk",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"gefjyk",11,"gefjyk",{from:accounts[0]}');
    contractKing = await King.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"gefjyk",11,"gefjyk",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[9], 231, [95,254,8,223,211,132,54,240,49,193,168,23,187,17,229,233,186,60,97,186,61,168,244,178,196,80,224,108,41,143,4,194],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 231, [95,254,8,223,211,132,54,240,49,193,168,23,187,17,229,233,186,60,97,186,61,168,244,178,196,80,224,108,41,143,4,194],{from: accounts[0]}),'revert');
  });
});
