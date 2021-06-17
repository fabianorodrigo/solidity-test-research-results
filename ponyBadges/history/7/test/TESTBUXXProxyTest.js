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
    contractTESTBUXX = await TESTBUXX.new(757,"z7p59",0,"z7p59",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(757,"z7p59",0,"z7p59",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(757,"z7p59",0,"z7p59",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[5], accounts[1], 1, [224,20,3,53,62,28,191,35,77,160,71,98,166,246,221,199,150,249,106,63,53,255,11,151,201,27,223,201,143,40,186,246],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[5], "0x0000000000000000000000000000000000000000", 1, [224,20,3,53,62,28,191,35,77,160,71,98,166,246,221,199,150,249,106,63,53,255,11,151,201,27,223,201,143,40,186,246],{from: accounts[0]}),'revert');
  });
});
