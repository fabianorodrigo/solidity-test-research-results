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
    contractTESTBUXX = await TESTBUXX.new(9,"6kc97j",11,"6kc97j",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(9,"6kc97j",11,"6kc97j",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(9,"6kc97j",11,"6kc97j",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[2], 1, [6,238,109,183,60,189,200,206,127,160,47,215,142,189,78,141,172,45,202,135,51,176,76,197,135,169,209,247,85,234,144,158],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 1, [6,238,109,183,60,189,200,206,127,160,47,215,142,189,78,141,172,45,202,135,51,176,76,197,135,169,209,247,85,234,144,158],{from: accounts[0]}),'revert');
  });
});
