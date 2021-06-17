const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("contractProxyTESTBUXX",(accounts)=>{
    let contractProxyTESTBUXX = null;
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(5,"lhkpd",6,"lhkpd",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(5,"lhkpd",6,"lhkpd",{from:accounts[0]}');
    contractKing = await King.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[2],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(5,"lhkpd",6,"lhkpd",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[3], 5, [150,142,96,142,54,160,68,52,12,23,60,141,69,3,58,111,240,26,15,36,7,105,98,151,65,89,125,67,120,91,112,211],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 5, [150,142,96,142,54,160,68,52,12,23,60,141,69,3,58,111,240,26,15,36,7,105,98,151,65,89,125,67,120,91,112,211],{from: accounts[0]}),'revert');
  });
});
