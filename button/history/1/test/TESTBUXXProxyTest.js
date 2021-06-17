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
    contractTESTBUXX = await TESTBUXX.new(1,"vkat2x",230,"uu9yx",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"vkat2x",230,"uu9yx",{from:accounts[0]}');
    contractButton = await Button.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(1,"vkat2x",230,"uu9yx",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[5], accounts[7], 3, [125,207,182,139,34,254,32,64,253,81,177,116,139,75,248,74,245,249,90,147,63,122,179,217,172,105,166,246,94,230,107,107],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[5], "0x0000000000000000000000000000000000000000", 3, [125,207,182,139,34,254,32,64,253,81,177,116,139,75,248,74,245,249,90,147,63,122,179,217,172,105,166,246,94,230,107,107],{from: accounts[0]}),'revert');
  });
});
