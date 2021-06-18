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
    contractTESTBUXX = await TESTBUXX.new(230,"spwes",4,"spwes",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(230,"spwes",4,"spwes",{from:accounts[0]}');
    contractKing = await King.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[2],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(230,"spwes",4,"spwes",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[9], accounts[9], 4, [141,168,140,95,26,246,33,67,112,10,130,160,247,89,150,147,164,150,163,159,38,137,177,40,97,219,145,230,64,194,48,191],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 4, [141,168,140,95,26,246,33,67,112,10,130,160,247,89,150,147,164,150,163,159,38,137,177,40,97,219,145,230,64,194,48,191],{from: accounts[0]}),'revert');
  });
});
