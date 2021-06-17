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
    contractTESTBUXX = await TESTBUXX.new(11,"nfs6ik",10,"nfs6ik",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(11,"nfs6ik",10,"nfs6ik",{from:accounts[0]}');
    contractKing = await King.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[6],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(11,"nfs6ik",10,"nfs6ik",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[5], accounts[1], 6, [134,210,2,198,187,243,140,59,121,56,163,30,189,50,237,1,21,214,36,35,64,100,123,143,43,119,13,173,179,201,194,244],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[5], "0x0000000000000000000000000000000000000000", 6, [134,210,2,198,187,243,140,59,121,56,163,30,189,50,237,1,21,214,36,35,64,100,123,143,43,119,13,173,179,201,194,244],{from: accounts[0]}),'revert');
  });
});
