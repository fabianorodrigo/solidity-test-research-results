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
    contractTESTBUXX = await TESTBUXX.new(11,"6cpu3g",3,"6cpu3g",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"6cpu3g",3,"6cpu3g",{from:accounts[0]}');
    contractButton = await Button.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[7],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"6cpu3g",3,"6cpu3g",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[9], accounts[8], 2, [74,250,52,178,62,159,183,213,96,251,239,192,234,117,203,106,157,18,37,209,201,237,62,203,12,242,221,182,250,219,23,80],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 2, [74,250,52,178,62,159,183,213,96,251,239,192,234,117,203,106,157,18,37,209,201,237,62,203,12,242,221,182,250,219,23,80],{from: accounts[0]}),'revert');
  });
});
