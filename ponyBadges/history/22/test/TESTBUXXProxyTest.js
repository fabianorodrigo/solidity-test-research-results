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
    contractTESTBUXX = await TESTBUXX.new(0,"51f20g",0,"51f20g",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(0,"51f20g",0,"51f20g",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(0,"51f20g",0,"51f20g",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[1], accounts[9], 759, [137,96,45,217,93,213,130,157,36,156,188,221,155,27,204,173,36,217,12,143,58,214,133,157,161,136,71,234,19,82,207,75],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[1], "0x0000000000000000000000000000000000000000", 759, [137,96,45,217,93,213,130,157,36,156,188,221,155,27,204,173,36,217,12,143,58,214,133,157,161,136,71,234,19,82,207,75],{from: accounts[0]}),'revert');
  });
});
