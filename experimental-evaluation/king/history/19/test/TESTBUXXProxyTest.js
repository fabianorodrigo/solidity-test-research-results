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
    contractTESTBUXX = await TESTBUXX.new(759,"6eloo7",5,"6eloo7",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(759,"6eloo7",5,"6eloo7",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(759,"6eloo7",5,"6eloo7",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[9], accounts[1], 757, [176,43,247,25,218,58,170,25,107,137,192,242,87,124,213,208,157,2,171,188,68,136,77,214,220,106,242,185,165,51,35,38],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 757, [176,43,247,25,218,58,170,25,107,137,192,242,87,124,213,208,157,2,171,188,68,136,77,214,220,106,242,185,165,51,35,38],{from: accounts[0]}),'revert');
  });
});
