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
    contractTESTBUXX = await TESTBUXX.new(230,"z4tef",0,"k8ofx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"z4tef",0,"k8ofx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[2],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"z4tef",0,"k8ofx",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[9], accounts[9], 231, [217,157,42,176,13,221,56,79,177,117,164,123,7,18,174,4,188,156,22,107,4,242,47,190,126,167,22,192,197,136,49,75],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 231, [217,157,42,176,13,221,56,79,177,117,164,123,7,18,174,4,188,156,22,107,4,242,47,190,126,167,22,192,197,136,49,75],{from: accounts[0]}),'revert');
  });
});
