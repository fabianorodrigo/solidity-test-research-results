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
    contractTESTBUXX = await TESTBUXX.new(1,"k8ds4",10,"hqct4",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(1,"k8ds4",10,"hqct4",{from:accounts[0]}');
    contractButton = await Button.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(1,"k8ds4",10,"hqct4",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[3], 231, [173,52,150,107,68,202,172,46,2,89,171,37,62,233,158,171,123,4,120,185,225,83,16,212,141,162,77,113,29,7,165,80],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 231, [173,52,150,107,68,202,172,46,2,89,171,37,62,233,158,171,123,4,120,185,225,83,16,212,141,162,77,113,29,7,165,80],{from: accounts[0]}),'revert');
  });
});
