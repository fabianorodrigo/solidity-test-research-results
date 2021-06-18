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
    contractTESTBUXX = await TESTBUXX.new(757,"gnd512",9,"gnd512",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(757,"gnd512",9,"gnd512",{from:accounts[0]}');
    contractKing = await King.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[2],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(757,"gnd512",9,"gnd512",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[6], 759, [4,228,59,116,79,138,127,247,166,34,231,32,203,13,124,131,25,21,62,171,65,215,89,31,200,110,229,32,181,174,140,190],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 759, [4,228,59,116,79,138,127,247,166,34,231,32,203,13,124,131,25,21,62,171,65,215,89,31,200,110,229,32,181,174,140,190],{from: accounts[0]}),'revert');
  });
});
