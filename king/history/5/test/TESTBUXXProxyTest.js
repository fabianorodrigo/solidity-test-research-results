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
    contractTESTBUXX = await TESTBUXX.new(4,"mehd36",0,"9ahcgv",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(4,"mehd36",0,"9ahcgv",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(4,"mehd36",0,"9ahcgv",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[6], accounts[3], 4, [214,11,214,229,183,186,56,49,41,61,113,180,202,91,21,239,12,100,212,224,0,138,99,112,225,54,145,41,17,121,150,78],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[6], "0x0000000000000000000000000000000000000000", 4, [214,11,214,229,183,186,56,49,41,61,113,180,202,91,21,239,12,100,212,224,0,138,99,112,225,54,145,41,17,121,150,78],{from: accounts[0]}),'revert');
  });
});
