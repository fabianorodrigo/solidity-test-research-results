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
    contractTESTBUXX = await TESTBUXX.new(230,"6rbw6n",229,"3fdxlx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"6rbw6n",229,"3fdxlx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"6rbw6n",229,"3fdxlx",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[8], 229, [65,74,147,75,102,235,44,114,24,37,148,6,165,113,62,254,7,2,137,15,128,199,29,229,149,167,212,111,65,96,67,204],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 229, [65,74,147,75,102,235,44,114,24,37,148,6,165,113,62,254,7,2,137,15,128,199,29,229,149,167,212,111,65,96,67,204],{from: accounts[0]}),'revert');
  });
});
