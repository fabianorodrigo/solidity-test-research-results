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
    contractTESTBUXX = await TESTBUXX.new(6,"zjcrx",4,"7s8hr",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(6,"zjcrx",4,"7s8hr",{from:accounts[0]}');
    contractKing = await King.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[1],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(6,"zjcrx",4,"7s8hr",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[9], accounts[5], 10, [204,161,8,152,80,157,123,174,7,184,245,253,194,230,135,20,241,33,3,56,9,226,164,64,228,51,246,42,21,156,133,153],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 10, [204,161,8,152,80,157,123,174,7,184,245,253,194,230,135,20,241,33,3,56,9,226,164,64,228,51,246,42,21,156,133,153],{from: accounts[0]}),'revert');
  });
});
