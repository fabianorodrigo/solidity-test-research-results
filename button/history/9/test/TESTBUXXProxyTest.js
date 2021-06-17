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
    contractTESTBUXX = await TESTBUXX.new(231,"k0k0cs",2,"k0k0cs",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(231,"k0k0cs",2,"k0k0cs",{from:accounts[0]}');
    contractButton = await Button.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[6],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(231,"k0k0cs",2,"k0k0cs",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[6], 2, [254,200,203,159,199,162,54,207,250,157,228,103,182,219,33,127,106,16,147,162,26,219,1,133,79,101,33,185,69,118,221,36],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 2, [254,200,203,159,199,162,54,207,250,157,228,103,182,219,33,127,106,16,147,162,26,219,1,133,79,101,33,185,69,118,221,36],{from: accounts[0]}),'revert');
  });
});
