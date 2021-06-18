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
    contractTESTBUXX = await TESTBUXX.new(10,"ixn91i",2,"ixn91i",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"ixn91i",2,"ixn91i",{from:accounts[0]}');
    contractButton = await Button.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[0],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"ixn91i",2,"ixn91i",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[5], 231, [152,93,113,167,188,221,112,174,179,168,37,82,183,193,159,189,26,230,193,254,35,157,166,182,22,68,76,102,165,226,189,77],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 231, [152,93,113,167,188,221,112,174,179,168,37,82,183,193,159,189,26,230,193,254,35,157,166,182,22,68,76,102,165,226,189,77],{from: accounts[0]}),'revert');
  });
});
