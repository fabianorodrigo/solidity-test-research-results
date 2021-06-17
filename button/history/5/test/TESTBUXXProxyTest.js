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
    contractTESTBUXX = await TESTBUXX.new(0,"4ymfcx",0,"hve8al",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"4ymfcx",0,"hve8al",{from:accounts[0]}');
    contractButton = await Button.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[5],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(0,"4ymfcx",0,"hve8al",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[7], accounts[4], 1, [81,199,172,61,148,53,21,168,197,151,25,107,119,40,0,252,242,27,145,133,68,155,156,195,173,198,143,204,149,2,60,66],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[7], "0x0000000000000000000000000000000000000000", 1, [81,199,172,61,148,53,21,168,197,151,25,107,119,40,0,252,242,27,145,133,68,155,156,195,173,198,143,204,149,2,60,66],{from: accounts[0]}),'revert');
  });
});
