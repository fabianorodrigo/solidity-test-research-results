const truffleAssert = require('truffle-assertions');
const Pony = artifacts.require("Pony");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractPony = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(9,"cgnar8",11,"cgnar8",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"cgnar8",11,"cgnar8",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(9,"cgnar8",11,"cgnar8",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[8], 9, [37,149,126,44,249,93,36,143,172,184,186,202,142,169,240,34,154,229,163,74,154,22,20,206,176,147,160,125,243,25,172,213],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 9, [37,149,126,44,249,93,36,143,172,184,186,202,142,169,240,34,154,229,163,74,154,22,20,206,176,147,160,125,243,25,172,213],{from: accounts[0]}),'revert');
  });
});
