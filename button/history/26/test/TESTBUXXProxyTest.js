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
    contractTESTBUXX = await TESTBUXX.new(10,"zc7qck",1,"zc7qck",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"zc7qck",1,"zc7qck",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"zc7qck",1,"zc7qck",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[7], 229, [48,164,114,146,89,168,157,4,169,68,75,136,148,230,97,71,99,248,21,172,174,159,110,130,68,225,26,236,198,248,237,128],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 229, [48,164,114,146,89,168,157,4,169,68,75,136,148,230,97,71,99,248,21,172,174,159,110,130,68,225,26,236,198,248,237,128],{from: accounts[0]}),'revert');
  });
});
