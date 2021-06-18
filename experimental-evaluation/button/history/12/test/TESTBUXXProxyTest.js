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
    contractTESTBUXX = await TESTBUXX.new(10,"4vznx",9,"4vznx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"4vznx",9,"4vznx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[7],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"4vznx",9,"4vznx",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[9], 10, [56,230,69,57,252,157,150,121,87,86,244,17,214,158,105,16,16,197,7,208,155,140,250,44,243,81,194,68,158,253,89,205],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 10, [56,230,69,57,252,157,150,121,87,86,244,17,214,158,105,16,16,197,7,208,155,140,250,44,243,81,194,68,158,253,89,205],{from: accounts[0]}),'revert');
  });
});
