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
    contractTESTBUXX = await TESTBUXX.new(230,"yed4e",2,"yed4e",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"yed4e",2,"yed4e",{from:accounts[0]}');
    contractButton = await Button.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[9],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"yed4e",2,"yed4e",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[5], accounts[3], 0, [195,36,221,90,36,97,170,20,229,168,48,10,125,195,149,87,231,156,211,129,38,1,68,79,234,182,253,194,146,90,242,112],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[5], "0x0000000000000000000000000000000000000000", 0, [195,36,221,90,36,97,170,20,229,168,48,10,125,195,149,87,231,156,211,129,38,1,68,79,234,182,253,194,146,90,242,112],{from: accounts[0]}),'revert');
  });
});
