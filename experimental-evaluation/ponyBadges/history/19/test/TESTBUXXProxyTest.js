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
    contractTESTBUXX = await TESTBUXX.new(9,"6b54i",11,"ijbpxw",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"6b54i",11,"ijbpxw",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[9],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(9,"6b54i",11,"ijbpxw",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[3], 758, [13,38,200,122,40,219,131,252,23,173,142,128,102,49,226,26,95,116,135,13,89,251,49,91,250,238,28,183,200,223,73,71],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 758, [13,38,200,122,40,219,131,252,23,173,142,128,102,49,226,26,95,116,135,13,89,251,49,91,250,238,28,183,200,223,73,71],{from: accounts[0]}),'revert');
  });
});
