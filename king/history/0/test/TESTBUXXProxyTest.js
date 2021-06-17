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
    contractTESTBUXX = await TESTBUXX.new(757,"tmse3",1,"tmse3",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(757,"tmse3",1,"tmse3",{from:accounts[0]}');
    contractKing = await King.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[7],{from:accounts[0]}');
      contractProxyTESTBUXX = await ProxyTESTBUXX.new(757,"tmse3",1,"tmse3",{from:accounts[0]});
});
  
  it('Should execute test_transfer(address,address,uint,bytes) WHEN to!=0x0,balances_>=value', async () => {
    let result = await contractProxyTESTBUXX.test_transfer(accounts[1], accounts[3], 758, [22,231,164,156,165,52,198,99,93,6,183,112,209,166,52,101,53,73,55,232,196,9,129,194,104,85,31,102,182,178,167,200],{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint,bytes) when NOT comply with: to != 0x0', async () => {
    let result = await truffleAssert.fails(contractProxyTESTBUXX.test_transfer(accounts[1], "0x0000000000000000000000000000000000000000", 758, [22,231,164,156,165,52,198,99,93,6,183,112,209,166,52,101,53,73,55,232,196,9,129,194,104,85,31,102,182,178,167,200],{from: accounts[0]}),'revert');
  });
});
