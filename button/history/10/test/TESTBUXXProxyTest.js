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
    contractTESTBUXX = await TESTBUXX.new(230,"ctz5k",230,"qfuhx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"ctz5k",230,"qfuhx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"ctz5k",230,"qfuhx",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[1], accounts[3], 230, [65,206,142,53,34,245,40,192,190,233,245,112,11,19,85,215,161,240,229,242,111,48,108,46,45,72,64,122,11,236,78,143],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[1], "0x0000000000000000000000000000000000000000", 230, [65,206,142,53,34,245,40,192,190,233,245,112,11,19,85,215,161,240,229,242,111,48,108,46,45,72,64,122,11,236,78,143],{from: accounts[0]}),'revert');
  });
});
