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
    contractTESTBUXX = await TESTBUXX.new(757,"jikdn",11,"8cero6",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(757,"jikdn",11,"8cero6",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(757,"jikdn",11,"8cero6",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[9], 0, [191,4,1,7,137,33,83,31,237,254,206,138,88,52,25,90,221,8,218,254,223,114,201,70,222,197,3,222,47,132,246,34],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 0, [191,4,1,7,137,33,83,31,237,254,206,138,88,52,25,90,221,8,218,254,223,114,201,70,222,197,3,222,47,132,246,34],{from: accounts[0]}),'revert');
  });
});
