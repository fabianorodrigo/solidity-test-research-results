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
    contractTESTBUXX = await TESTBUXX.new(229,"vgg7c",230,"vqcw04",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(229,"vgg7c",230,"vqcw04",{from:accounts[0]}');
    contractKing = await King.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[8],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(229,"vgg7c",230,"vqcw04",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[2], 230, [15,171,187,17,137,149,110,149,248,92,239,30,117,68,55,118,214,197,211,114,84,206,224,151,68,167,190,93,184,73,114,237],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 230, [15,171,187,17,137,149,110,149,248,92,239,30,117,68,55,118,214,197,211,114,84,206,224,151,68,167,190,93,184,73,114,237],{from: accounts[0]}),'revert');
  });
});
