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
    contractTESTBUXX = await TESTBUXX.new(10,"zj81s",229,"imwz5",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"zj81s",229,"imwz5",{from:accounts[0]}');
    contractKing = await King.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[6],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"zj81s",229,"imwz5",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[2], accounts[8], 757, [171,8,137,39,180,17,7,169,180,30,181,105,218,182,30,167,158,35,100,226,159,166,188,6,201,73,79,115,139,209,172,82],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[2], "0x0000000000000000000000000000000000000000", 757, [171,8,137,39,180,17,7,169,180,30,181,105,218,182,30,167,158,35,100,226,159,166,188,6,201,73,79,115,139,209,172,82],{from: accounts[0]}),'revert');
  });
});
