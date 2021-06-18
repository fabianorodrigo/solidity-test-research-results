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
    contractTESTBUXX = await TESTBUXX.new(11,"yvryrr",9,"xsti7",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"yvryrr",9,"xsti7",{from:accounts[0]}');
    contractKing = await King.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[7],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"yvryrr",9,"xsti7",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[5], 10, [198,29,141,201,109,25,140,136,110,146,176,121,142,52,197,68,186,181,44,197,221,237,247,229,97,90,207,22,220,51,208,80],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 10, [198,29,141,201,109,25,140,136,110,146,176,121,142,52,197,68,186,181,44,197,221,237,247,229,97,90,207,22,220,51,208,80],{from: accounts[0]}),'revert');
  });
});
