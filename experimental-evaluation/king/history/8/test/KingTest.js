const truffleAssert = require('truffle-assertions');
const King = artifacts.require("King");
const TESTBUXX = artifacts.require("TESTBUXX");
const ProxyTESTBUXX = artifacts.require("ProxyTESTBUXX");

contract("King",(accounts)=>{
  let trace = false;
  let contractTESTBUXX = null;
  let contractKing = null;
  beforeEach(async () => {
    contractTESTBUXX = await TESTBUXX.new(758,"ntopbj",4,"lyx20p",{from:accounts[0]});
    if(trace) console.log('SUCESSO: TESTBUXX.new(758,"ntopbj",4,"lyx20p",{from:accounts[0]}');
    contractKing = await King.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: King.new(accounts[7],{from:accounts[0]}');
  });
  
  it('Should execute tokenFallback(address,uint256,bytes) WHEN value>=PLAY_COST', async () => {
    let result = await contractKing.tokenFallback(accounts[5], 759, [254,70,213,130,169,46,93,15,230,116,99,15,218,221,163,187,160,116,76,160,252,104,14,28,37,166,116,247,11,154,201,147],{from: accounts[0]});
  });
  it('Should fail tokenFallback(address,uint256,bytes) when NOT comply with: value >= PLAY_COST', async () => {
    let result = await truffleAssert.fails(contractKing.tokenFallback(accounts[5], 757, [254,70,213,130,169,46,93,15,230,116,99,15,218,221,163,187,160,116,76,160,252,104,14,28,37,166,116,247,11,154,201,147],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw() WHEN msg.sender==admin', async () => {
    let result = await contractKing.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: msg.sender == admin', async () => {
    let result = await truffleAssert.fails(contractKing.withdraw({from: accounts[9]}),'revert');
  });
});
