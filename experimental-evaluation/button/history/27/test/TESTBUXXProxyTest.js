const truffleAssert = require('truffle-assertions');
const Button = artifacts.require("Button");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractButton = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(0,"6kv4gv",3,"6kv4gv",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"6kv4gv",3,"6kv4gv",{from:accounts[0]}');
    contractButton = await Button.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[4],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(0,"6kv4gv",3,"6kv4gv",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[0], 3, [49,65,118,113,93,80,75,149,8,74,41,44,229,250,11,29,137,167,27,197,118,199,229,134,148,165,112,18,196,78,14,64],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 3, [49,65,118,113,93,80,75,149,8,74,41,44,229,250,11,29,137,167,27,197,118,199,229,134,148,165,112,18,196,78,14,64],{from: accounts[0]}),'revert');
  });
});
