const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(229,"vgg7c",230,"vqcw04",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(229,"vgg7c",230,"vqcw04",{from:accounts[0]}');
    contractKing = await King.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[8],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[5], 758, [119,24,48,6,254,11,176,206,34,206,38,226,175,133,34,23,11,192,201,247,187,167,67,88,221,237,133,37,232,168,141,239],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[5], 757, [119,24,48,6,254,11,176,206,34,206,38,226,175,133,34,23,11,192,201,247,187,167,67,88,221,237,133,37,232,168,141,239],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
