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
    contractTESTBUXX = await TESTBUXX.new(1,"k17ikn",2,"k17ikn",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"k17ikn",2,"k17ikn",{from:accounts[0]}');
    contractButton = await Button.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[2],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(1,"k17ikn",2,"k17ikn",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[9], accounts[7], 0, [7,179,248,167,147,98,208,248,12,18,128,157,81,207,216,67,205,169,217,217,172,122,207,172,163,247,45,73,233,148,170,174],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 0, [7,179,248,167,147,98,208,248,12,18,128,157,81,207,216,67,205,169,217,217,172,122,207,172,163,247,45,73,233,148,170,174],{from: accounts[0]}),'revert');
  });
});
