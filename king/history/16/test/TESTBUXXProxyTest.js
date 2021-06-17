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
    contractTESTBUXX = await TESTBUXX.new(759,"jltrxn",230,"wzxpvq",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"jltrxn",230,"wzxpvq",{from:accounts[0]}');
    contractKing = await King.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[0],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"jltrxn",230,"wzxpvq",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[3], accounts[1], 230, [164,226,177,96,3,229,195,156,170,213,55,11,219,184,2,220,76,209,82,246,214,51,117,70,193,202,114,204,206,21,144,117],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[3], "0x0000000000000000000000000000000000000000", 230, [164,226,177,96,3,229,195,156,170,213,55,11,219,184,2,220,76,209,82,246,214,51,117,70,193,202,114,204,206,21,144,117],{from: accounts[0]}),'revert');
  });
});
