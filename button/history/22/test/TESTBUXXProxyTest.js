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
    contractTESTBUXX = await TESTBUXX.new(230,"jxa52h",11,"3jjj8h",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"jxa52h",11,"3jjj8h",{from:accounts[0]}');
    contractButton = await Button.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[9],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"jxa52h",11,"3jjj8h",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[0], 2, [134,60,23,43,50,144,195,171,120,45,22,84,83,110,134,148,203,160,72,22,152,12,119,136,162,95,240,59,254,108,61,0],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 2, [134,60,23,43,50,144,195,171,120,45,22,84,83,110,134,148,203,160,72,22,152,12,119,136,162,95,240,59,254,108,61,0],{from: accounts[0]}),'revert');
  });
});
