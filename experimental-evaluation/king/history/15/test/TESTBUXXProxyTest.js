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
    contractTESTBUXX = await TESTBUXX.new(10,"0nlptn",10,"kp37go",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(10,"0nlptn",10,"kp37go",{from:accounts[0]}');
    contractKing = await King.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[0],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(10,"0nlptn",10,"kp37go",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[4], accounts[9], 230, [184,131,42,210,198,29,9,41,20,82,172,58,83,22,109,238,142,167,166,147,42,92,204,105,213,176,183,52,71,50,76,52],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[4], "0x0000000000000000000000000000000000000000", 230, [184,131,42,210,198,29,9,41,20,82,172,58,83,22,109,238,142,167,166,147,42,92,204,105,213,176,183,52,71,50,76,52],{from: accounts[0]}),'revert');
  });
});
