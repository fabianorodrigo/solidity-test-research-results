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
    contractTESTBUXX = await TESTBUXX.new(11,"nbvn4",1,"iay1fe",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"nbvn4",1,"iay1fe",{from:accounts[0]}');
    contractPony = await Pony.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Pony.new(accounts[3],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"nbvn4",1,"iay1fe",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[7], 758, [194,51,9,124,176,220,191,209,153,77,97,79,186,125,22,73,237,252,63,38,146,92,126,50,136,94,136,54,27,44,199,136],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 758, [194,51,9,124,176,220,191,209,153,77,97,79,186,125,22,73,237,252,63,38,146,92,126,50,136,94,136,54,27,44,199,136],{from: accounts[0]}),'revert');
  });
});
