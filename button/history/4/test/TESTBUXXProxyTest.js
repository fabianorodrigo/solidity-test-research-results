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
    contractTESTBUXX = await TESTBUXX.new(3,"cader",230,"9crpik",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(3,"cader",230,"9crpik",{from:accounts[0]}');
    contractButton = await Button.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Button.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(3,"cader",230,"9crpik",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[1], accounts[3], 9, [197,26,131,150,241,119,112,124,128,159,85,153,46,107,239,93,172,61,34,201,123,244,159,8,33,219,202,94,121,24,76,254],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[1], "0x0000000000000000000000000000000000000000", 9, [197,26,131,150,241,119,112,124,128,159,85,153,46,107,239,93,172,61,34,201,123,244,159,8,33,219,202,94,121,24,76,254],{from: accounts[0]}),'revert');
  });
});
