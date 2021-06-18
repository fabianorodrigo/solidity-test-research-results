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
    contractTESTBUXX = await TESTBUXX.new(758,"ntopbj",4,"lyx20p",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"ntopbj",4,"lyx20p",{from:accounts[0]}');
    contractKing = await King.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[7],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(758,"ntopbj",4,"lyx20p",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[0], accounts[7], 1, [94,129,177,191,222,125,69,254,246,106,18,35,33,81,38,244,18,156,32,48,134,41,247,229,164,190,47,224,255,192,235,238],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[0], "0x0000000000000000000000000000000000000000", 1, [94,129,177,191,222,125,69,254,246,106,18,35,33,81,38,244,18,156,32,48,134,41,247,229,164,190,47,224,255,192,235,238],{from: accounts[0]}),'revert');
  });
});
